/**
 * 闪电档逻辑 · 2 分钟三件套（PRD + UI + Demo）
 */

import { callDeepSeekStream, callDeepSeek, collectStreamText } from './deepseek.js';
import { loadSpell, loadIndustryExpert } from './spell-loader.js';
import { parseOutputFiles, saveFilesToR2 } from './output-parser.js';
import { createRun, createBatch, markRunComplete, pushBatchEvent, genId, getRun } from './state.js';

// 闪电档 spell 路径
const SPELLS = {
  analyze: 'spells/桃子分析咒语.md',
  prd:     'spells/lightning/prd_agent.md',
  ui:      'spells/lightning/ui_agent.md',
  demo:    'spells/lightning/demo_agent.md',
  flow:    'spells/lightning/flow_agent.md',
};

/**
 * 处理 /api/run（分析阶段）
 * 返回 SSE 流
 */
export async function handleRun(request, env) {
  const body = await request.json();
  const { product, industry, slug, mode } = body;

  if (!product) {
    return jsonResp({ error: '缺少 product 参数' }, 400);
  }

  const runId = genId();
  const analysisSlug = slug || product.replace(/\s+/g, '_').slice(0, 20);

  // 创建运行记录
  await createRun(env, runId, {
    agentKey: 'analyze',
    spellPath: SPELLS.analyze,
    product,
    industry,
    mode: mode || 'lightning',
  });

  // 加载分析 spell
  const industryContext = await loadIndustryExpert(env, industry);
  const today = new Date().toISOString().split('T')[0];

  const { system, user } = await loadSpell(env, SPELLS.analyze, {
    PRODUCT_REQUEST: product,
    INDUSTRY: industry || '通用',
    PROJECT_SLUG: analysisSlug,
    TODAY: today,
    INDUSTRY_EXPERT_CONTEXT: industryContext,
    USER_INPUT: `请分析以下产品方向：${product}${industry ? '，行业：' + industry : ''}`,
  }, { injectKnowledge: false });

  // 流式调用 DeepSeek
  const stream = await callDeepSeekStream(env, system, user);

  // 返回 SSE 流 + run_id header
  return new Response(transformToFrontendSSE(stream, runId), {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Run-Id': runId,
      'X-Slug': analysisSlug,
      'Access-Control-Allow-Origin': '*',
    },
  });
}

/**
 * 处理 /api/generate（生成阶段 · 闪电档）
 * 并发 PRD + UI → 串行 Demo
 */
export async function handleGenerate(request, env) {
  const body = await request.json();
  const { analyze_run_id, analysis_text, product, industry, slug, mode } = body;

  const batchId = genId();
  const today = new Date().toISOString().split('T')[0];
  const analysisSlug = slug || product?.replace(/\s+/g, '_').slice(0, 20) || 'project';
  const industryContext = await loadIndustryExpert(env, industry);

  const baseVars = {
    PRODUCT_REQUEST: product || '',
    INDUSTRY: industry || '通用',
    PROJECT_SLUG: analysisSlug,
    TODAY: today,
    ANALYSIS_CONTEXT: analysis_text || '',
    INDUSTRY_EXPERT_CONTEXT: industryContext,
  };

  if (mode === 'lightning' || !mode) {
    return await runLightning(env, batchId, baseVars);
  }

  // 标准档先返回 batch_id，后续通过 /api/batch-status 查进度
  return jsonResp({ batch_id: batchId, mode: 'standard', message: '标准档暂未实现' });
}

/**
 * 闪电档：并发 PRD + UI → 串行 Demo
 */
async function runLightning(env, batchId, vars) {
  const prdRunId = genId();
  const uiRunId = genId();
  const demoRunId = genId();

  // 创建批次
  await createBatch(env, batchId, {
    phase: 'lightning',
    mode: 'lightning',
    product: vars.PRODUCT_REQUEST,
    industry: vars.INDUSTRY,
    slug: vars.PROJECT_SLUG,
    runIds: [prdRunId, uiRunId, demoRunId],
  });

  // 创建运行记录
  await createRun(env, prdRunId, { agentKey: 'prd', spellPath: SPELLS.prd, batchId, ...vars });
  await createRun(env, uiRunId, { agentKey: 'ui', spellPath: SPELLS.ui, batchId, ...vars });
  await createRun(env, demoRunId, { agentKey: 'demo', spellPath: SPELLS.demo, batchId, ...vars });

  // 并发执行 PRD + UI
  const knowledgeTypes = ['prd', 'html'];
  const [prdSpell, uiSpell] = await Promise.all([
    loadSpell(env, SPELLS.prd, vars, { knowledgeTypes: ['prd'] }),
    loadSpell(env, SPELLS.ui, vars, { knowledgeTypes: ['html'] }),
  ]);

  await pushBatchEvent(env, batchId, { type: 'lightning_start', agents: ['prd', 'ui'] });

  const [prdText, uiText] = await Promise.all([
    runAgent(env, prdRunId, batchId, prdSpell),
    runAgent(env, uiRunId, batchId, uiSpell),
  ]);

  await pushBatchEvent(env, batchId, { type: 'prd_ui_done' });

  // 串行执行 Demo（需要 PRD + UI 的输出作为上下文）
  const demoVars = {
    ...vars,
    PRD_CONTEXT: prdText.slice(0, 6000),
    UI_CONTEXT: uiText.slice(0, 4000),
    USER_INPUT: `基于以上 PRD 和 UI 规格，生成一个可交互的 HTML Demo。产品：${vars.PRODUCT_REQUEST}`,
  };

  const demoSpell = await loadSpell(env, SPELLS.demo, demoVars, { knowledgeTypes: ['html', 'demo'] });
  const demoText = await runAgent(env, demoRunId, batchId, demoSpell);

  await pushBatchEvent(env, batchId, { type: 'lightning_done' });

  return jsonResp({
    batch_id: batchId,
    mode: 'lightning',
    run_ids: { prd: prdRunId, ui: uiRunId, demo: demoRunId },
    status: 'completed',
  });
}

/**
 * 执行单个 Agent：调 DeepSeek → 解析输出 → 存 R2 → 更新状态
 */
async function runAgent(env, runId, batchId, spell) {
  try {
    const stream = await callDeepSeekStream(env, spell.system, spell.user);
    const fullText = await collectStreamText(stream);

    // 解析输出文件并存 R2
    const files = parseOutputFiles(fullText);
    await saveFilesToR2(env, batchId, files);

    // 更新状态
    await markRunComplete(env, runId, batchId, fullText);

    return fullText;
  } catch (err) {
    await markRunComplete(env, runId, batchId, `ERROR: ${err.message}`);
    throw err;
  }
}

/**
 * 处理 /api/stream/{runId}（流式输出 · 用于分析阶段实时展示）
 */
export async function handleStream(runId, env) {
  const run = await getRun(env, runId);
  if (!run) return jsonResp({ error: 'Run not found' }, 404);

  // 如果已完成，直接返回结果（Claude CLI 兼容格式）
  if (run.status === 'completed') {
    const encoder = new TextEncoder();
    const msgId = 'msg_' + runId;
    const body = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(formatClaudeSSE(msgId, run.output_text)));
        controller.enqueue(encoder.encode(`event: done\ndata: {}\n\n`));
        controller.close();
      },
    });
    return new Response(body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  return jsonResp({ error: 'Streaming only available for analyze phase', run_status: run.status });
}

// ── 辅助函数 ──

/**
 * 将 DeepSeek SSE 流转换成前端期望的 Claude CLI stream-json 兼容格式
 *
 * 前端期望格式（es.onmessage）：
 *   { type: "assistant", message: { id: "msg_xxx", content: [{ type: "text", text: "累积全文" }] } }
 *
 * 前端用 lastText 做增量：c.text.slice(lastText.length) 取新增部分
 * 所以每条 SSE 的 text 必须是累积全文，不是增量。
 */
function transformToFrontendSSE(deepseekStream, runId) {
  const reader = deepseekStream.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = '';
  let fullText = '';
  let sentHello = false;
  const msgId = 'msg_' + runId;

  return new ReadableStream({
    async pull(controller) {
      if (!sentHello) {
        // hello 事件不用 event: 前缀，前端不监听它（analyze 阶段用 onmessage）
        sentHello = true;
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          if (buffer.trim()) {
            fullText = extractText(buffer, fullText);
          }
          // 发最终完整文本
          controller.enqueue(encoder.encode(formatClaudeSSE(msgId, fullText)));
          // done 事件
          controller.enqueue(encoder.encode(`event: done\ndata: {}\n\n`));
          controller.close();
          return;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        let hasNew = false;
        for (const line of lines) {
          if (!line.startsWith('data: ') || line === 'data: [DONE]') continue;
          try {
            const json = JSON.parse(line.slice(6));
            const text = json.choices?.[0]?.delta?.content || '';
            if (text) {
              fullText += text;
              hasNew = true;
            }
          } catch (_) {}
        }

        if (hasNew) {
          // 发送累积全文（匹配前端的 lastText 增量逻辑）
          controller.enqueue(encoder.encode(formatClaudeSSE(msgId, fullText)));
          return; // 让浏览器处理
        }
      }
    },
    cancel() {
      reader.cancel();
    },
  });
}

/**
 * 格式化成 Claude CLI stream-json 兼容的 SSE 数据行
 */
function formatClaudeSSE(msgId, fullText) {
  const payload = {
    type: 'assistant',
    message: {
      id: msgId,
      content: [{ type: 'text', text: fullText }],
    },
  };
  return `data: ${JSON.stringify(payload)}\n\n`;
}

function extractText(buf, currentText) {
  for (const line of buf.split('\n')) {
    if (!line.startsWith('data: ') || line === 'data: [DONE]') continue;
    try {
      const json = JSON.parse(line.slice(6));
      const text = json.choices?.[0]?.delta?.content || '';
      if (text) currentText += text;
    } catch (_) {}
  }
  return currentText;
}

function jsonResp(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

