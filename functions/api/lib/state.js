/**
 * 状态管理 · 轻量版（KV 可选，没有也能跑）
 */

const RUNS = new Map();
const BATCHES = new Map();

export async function createRun(env, runId, data) {
  const run = {
    run_id: runId, status: 'running', agent_key: data.agentKey || '',
    batch_id: data.batchId || '', product: data.product || '',
    industry: data.industry || '', mode: data.mode || 'lightning',
    created_at: Date.now(), completed_at: null, output_text: '',
  };
  RUNS.set(runId, run);
  if (env?.KV) { try { await env.KV.put(`run:${runId}`, JSON.stringify(run)); } catch (_) {} }
  return run;
}

export async function updateRun(env, runId, updates) {
  let run = RUNS.get(runId);
  if (!run && env?.KV) { try { const r = await env.KV.get(`run:${runId}`); if (r) run = JSON.parse(r); } catch (_) {} }
  if (!run) return null;
  Object.assign(run, updates);
  RUNS.set(runId, run);
  if (env?.KV) { try { await env.KV.put(`run:${runId}`, JSON.stringify(run)); } catch (_) {} }
  return run;
}

export async function getRun(env, runId) {
  let run = RUNS.get(runId);
  if (!run && env?.KV) { try { const r = await env.KV.get(`run:${runId}`); if (r) run = JSON.parse(r); } catch (_) {} }
  return run || null;
}

export async function createBatch(env, batchId, data) {
  const batch = {
    batch_id: batchId, status: 'running', phase: data.phase || 'lightning',
    mode: data.mode || 'lightning', product: data.product || '',
    industry: data.industry || '', slug: data.slug || '',
    run_ids: data.runIds || [], completed_runs: [], created_at: Date.now(), events: [],
  };
  BATCHES.set(batchId, batch);
  if (env?.KV) { try { await env.KV.put(`batch:${batchId}`, JSON.stringify(batch)); } catch (_) {} }
  return batch;
}

export async function updateBatch(env, batchId, updates) {
  let batch = BATCHES.get(batchId);
  if (!batch && env?.KV) { try { const r = await env.KV.get(`batch:${batchId}`); if (r) batch = JSON.parse(r); } catch (_) {} }
  if (!batch) return null;
  Object.assign(batch, updates);
  BATCHES.set(batchId, batch);
  if (env?.KV) { try { await env.KV.put(`batch:${batchId}`, JSON.stringify(batch)); } catch (_) {} }
  return batch;
}

export async function getBatch(env, batchId) {
  let batch = BATCHES.get(batchId);
  if (!batch && env?.KV) { try { const r = await env.KV.get(`batch:${batchId}`); if (r) batch = JSON.parse(r); } catch (_) {} }
  return batch || null;
}

export async function pushBatchEvent(env, batchId, event) {
  let batch = BATCHES.get(batchId) || await getBatch(env, batchId);
  if (!batch) return;
  batch.events = batch.events || [];
  batch.events.push({ ...event, timestamp: Date.now() });
  BATCHES.set(batchId, batch);
  if (env?.KV) { try { await env.KV.put(`batch:${batchId}`, JSON.stringify(batch)); } catch (_) {} }
}

export async function markRunComplete(env, runId, batchId, outputText) {
  await updateRun(env, runId, { status: 'completed', completed_at: Date.now(), output_text: outputText.slice(0, 500) });
  if (batchId) {
    const batch = await getBatch(env, batchId);
    if (batch) {
      const completed = batch.completed_runs || [];
      if (!completed.includes(runId)) completed.push(runId);
      await updateBatch(env, batchId, { completed_runs: completed, status: completed.length >= batch.run_ids.length ? 'completed' : 'running' });
    }
  }
}

export function genId() {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 12);
}
