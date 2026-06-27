/**
 * KV 状态管理 · 任务/批次/运行状态
 */

/**
 * 创建新的运行记录
 */
export async function createRun(env, runId, data) {
  const run = {
    run_id: runId,
    status: 'running',
    agent_key: data.agentKey || '',
    spell_path: data.spellPath || '',
    batch_id: data.batchId || '',
    product: data.product || '',
    industry: data.industry || '',
    mode: data.mode || 'lightning',
    created_at: Date.now(),
    completed_at: null,
    output_text: '',
    error: null,
  };
  await env.KV.put(`run:${runId}`, JSON.stringify(run));
  return run;
}

/**
 * 更新运行状态
 */
export async function updateRun(env, runId, updates) {
  const raw = await env.KV.get(`run:${runId}`);
  if (!raw) return null;
  const run = { ...JSON.parse(raw), ...updates };
  await env.KV.put(`run:${runId}`, JSON.stringify(run));
  return run;
}

/**
 * 获取运行记录
 */
export async function getRun(env, runId) {
  const raw = await env.KV.get(`run:${runId}`);
  return raw ? JSON.parse(raw) : null;
}

/**
 * 创建新的批次
 */
export async function createBatch(env, batchId, data) {
  const batch = {
    batch_id: batchId,
    status: 'running',
    phase: data.phase || 'lightning',
    mode: data.mode || 'lightning',
    product: data.product || '',
    industry: data.industry || '',
    slug: data.slug || '',
    run_ids: data.runIds || [],
    completed_runs: [],
    created_at: Date.now(),
    events: [],
  };
  await env.KV.put(`batch:${batchId}`, JSON.stringify(batch));
  return batch;
}

/**
 * 更新批次状态
 */
export async function updateBatch(env, batchId, updates) {
  const raw = await env.KV.get(`batch:${batchId}`);
  if (!raw) return null;
  const batch = { ...JSON.parse(raw), ...updates };
  await env.KV.put(`batch:${batchId}`, JSON.stringify(batch));
  return batch;
}

/**
 * 获取批次
 */
export async function getBatch(env, batchId) {
  const raw = await env.KV.get(`batch:${batchId}`);
  return raw ? JSON.parse(raw) : null;
}

/**
 * 向批次追加事件
 */
export async function pushBatchEvent(env, batchId, event) {
  const raw = await env.KV.get(`batch:${batchId}`);
  if (!raw) return;
  const batch = JSON.parse(raw);
  batch.events = batch.events || [];
  batch.events.push({ ...event, timestamp: Date.now() });
  await env.KV.put(`batch:${batchId}`, JSON.stringify(batch));
}

/**
 * 标记某个 run 完成并更新批次
 */
export async function markRunComplete(env, runId, batchId, outputText) {
  // 更新 run
  await updateRun(env, runId, {
    status: 'completed',
    completed_at: Date.now(),
    output_text: outputText.slice(0, 500), // KV 只存摘要，完整内容在 R2
  });

  // 更新 batch 的 completed_runs
  if (batchId) {
    const batch = await getBatch(env, batchId);
    if (batch) {
      const completed = batch.completed_runs || [];
      if (!completed.includes(runId)) {
        completed.push(runId);
      }
      const allDone = completed.length >= batch.run_ids.length;
      await updateBatch(env, batchId, {
        completed_runs: completed,
        status: allDone ? 'completed' : 'running',
      });
    }
  }
}

/**
 * 生成唯一 ID
 */
export function genId() {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 12);
}
