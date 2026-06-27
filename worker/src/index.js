/**
 * 桃子公司 Cloudflare Worker · 入口 + 路由
 * 替代本地 Flask 桥，连接 DeepSeek API
 */

import { handleRun, handleGenerate, handleStream } from './lightning.js';
import { listBatchFiles, readFile } from './output-parser.js';
import { getBatch, getRun } from './state.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS 预检
    if (request.method === 'OPTIONS') {
      return corsResponse();
    }

    try {
      // ── API 路由 ──
      const response = await route(path, request, env, ctx);
      return addCors(response);
    } catch (err) {
      console.error('Worker error:', err);
      return addCors(jsonResp({ error: err.message }, 500));
    }
  },
};

async function route(path, request, env, ctx) {
  // POST /api/run · 启动分析
  if (path === '/api/run' && request.method === 'POST') {
    return handleRun(request, env);
  }

  // POST /api/generate · 启动生成
  if (path === '/api/generate' && request.method === 'POST') {
    return handleGenerate(request, env);
  }

  // GET /api/stream/:runId · SSE 实时流
  const streamMatch = path.match(/^\/api\/stream\/([a-z0-9]+)$/);
  if (streamMatch && request.method === 'GET') {
    return handleStream(streamMatch[1], env);
  }

  // GET /api/batch-status/:batchId · 批次状态
  const batchStatusMatch = path.match(/^\/api\/batch-status\/([a-z0-9]+)$/);
  if (batchStatusMatch && request.method === 'GET') {
    const batch = await getBatch(env, batchStatusMatch[1]);
    if (!batch) return jsonResp({ error: 'Batch not found' }, 404);
    return jsonResp(batch);
  }

  // GET /api/batch-events/:batchId · 批次事件（SSE）
  const batchEventsMatch = path.match(/^\/api\/batch-events\/([a-z0-9]+)$/);
  if (batchEventsMatch && request.method === 'GET') {
    const batch = await getBatch(env, batchEventsMatch[1]);
    if (!batch) return jsonResp({ error: 'Batch not found' }, 404);

    // 返回已收集的事件作为 SSE
    const encoder = new TextEncoder();
    const body = new ReadableStream({
      start(controller) {
        for (const evt of (batch.events || [])) {
          controller.enqueue(encoder.encode(`event: ${evt.type}\ndata: ${JSON.stringify(evt)}\n\n`));
        }
        // 如果批次已完成，关闭流
        if (batch.status === 'completed') {
          controller.enqueue(encoder.encode(`event: done\ndata: ${JSON.stringify({ batch_id: batch.batch_id })}\n\n`));
        }
        controller.close();
      },
    });

    return new Response(body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    });
  }

  // GET /api/files/:id · 文件列表（支持 run_id 或 batch_id）
  const filesMatch = path.match(/^\/api\/files\/([a-z0-9]+)$/);
  if (filesMatch && request.method === 'GET') {
    const id = filesMatch[1];
    // 尝试 batch
    const batch = await getBatch(env, id);
    if (batch) {
      const files = await listBatchFiles(env, id);
      return jsonResp({ batch_id: id, files });
    }
    // 尝试 run → 找其 batch_id
    const run = await getRun(env, id);
    if (run && run.batch_id) {
      const files = await listBatchFiles(env, run.batch_id);
      return jsonResp({ batch_id: run.batch_id, files });
    }
    return jsonResp({ error: 'Not found' }, 404);
  }

  // GET /api/file-content?path=xxx · 读取单个文件
  if (path === '/api/file-content' && request.method === 'GET') {
    const filePath = new URL(request.url).searchParams.get('path');
    if (!filePath) return jsonResp({ error: '缺少 path 参数' }, 400);
    const content = await readFile(env, filePath);
    if (content === null) return jsonResp({ error: 'File not found' }, 404);
    return new Response(content, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Access-Control-Allow-Origin': '*' },
    });
  }

  // GET /api/model-config · 模型配置
  if (path === '/api/model-config' && request.method === 'GET') {
    return jsonResp({
      model: env.DEEPSEEK_MODEL || 'deepseek-chat',
      max_tokens: parseInt(env.MAX_TOKENS || '8192'),
      provider: 'deepseek',
    });
  }

  // GET /api/health · 健康检查
  if (path === '/api/health') {
    return jsonResp({ status: 'ok', version: '1.0.0', provider: 'deepseek' });
  }

  // 未匹配 → 404
  return jsonResp({ error: 'Not found', path }, 404);
}

// ── 辅助函数 ──

function jsonResp(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function corsResponse() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

function addCors(response) {
  const newHeaders = new Headers(response.headers);
  newHeaders.set('Access-Control-Allow-Origin', '*');
  newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
