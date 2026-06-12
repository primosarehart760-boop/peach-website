/**
 * 桃子公司 Cloudflare Pages Function · /api/* 统一路由
 *
 * 文件名 [[catchall]].js 表示匹配 /api/ 下的所有路径
 * 参考：https://developers.cloudflare.com/pages/functions/routing/
 */

import { handleRun, handleGenerate, handleStream } from './lib/lightning.js';
import { listBatchFiles, readFile } from './lib/output-parser.js';
import { getBatch, getRun } from './lib/state.js';

export async function onRequest(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);
  // params.catchall 是数组，如 ['stream', 'abc123']
  const subPath = (params.catchall || []).join('/');
  const path = `/api/${subPath}`;

  // CORS 预检
  if (request.method === 'OPTIONS') {
    return corsResponse();
  }

  try {
    const response = await route(path, request, env);
    return addCors(response);
  } catch (err) {
    console.error('API error:', err);
    return addCors(jsonResp({ error: err.message }, 500));
  }
}

async function route(path, request, env) {
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

    const encoder = new TextEncoder();
    const body = new ReadableStream({
      start(controller) {
        for (const evt of (batch.events || [])) {
          controller.enqueue(encoder.encode(`event: ${evt.type}\ndata: ${JSON.stringify(evt)}\n\n`));
        }
        if (batch.status === 'completed') {
          controller.enqueue(encoder.encode(`event: done\ndata: ${JSON.stringify({ batch_id: batch.batch_id })}\n\n`));
        }
        controller.close();
      },
    });

    return new Response(body, {
      headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
    });
  }

  // GET /api/files/:id · 文件列表
  const filesMatch = path.match(/^\/api\/files\/([a-z0-9]+)$/);
  if (filesMatch && request.method === 'GET') {
    const id = filesMatch[1];
    const batch = await getBatch(env, id);
    if (batch) {
      const files = await listBatchFiles(env, id);
      return jsonResp({ batch_id: id, files });
    }
    const run = await getRun(env, id);
    if (run && run.batch_id) {
      const files = await listBatchFiles(env, run.batch_id);
      return jsonResp({ batch_id: run.batch_id, files });
    }
    return jsonResp({ error: 'Not found' }, 404);
  }

  // GET /api/file-content?path=xxx · 读取文件
  if (path === '/api/file-content' && request.method === 'GET') {
    const filePath = new URL(request.url).searchParams.get('path');
    if (!filePath) return jsonResp({ error: '缺少 path 参数' }, 400);
    const content = await readFile(env, filePath);
    if (content === null) return jsonResp({ error: 'File not found' }, 404);
    return new Response(content, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
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

  // GET /api/ping · 兼容旧前端的 ping 检查
  if (path === '/api/ping') {
    return jsonResp({ status: 'ok', bridge: 'cloudflare-worker', model: 'deepseek-chat' });
  }

  return jsonResp({ error: 'Not found', path }, 404);
}

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
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

function addCors(response) {
  const h = new Headers(response.headers);
  h.set('Access-Control-Allow-Origin', '*');
  return new Response(response.body, { status: response.status, headers: h });
}
