/**
 * 标准模式 + 补全接口 · Tier 1 + Tier 2
 * 对应 _worker.js 中模块 8
 */

import { callDeepSeekStream, collectStreamText } from './deepseek.js';
import { loadSpell, loadIndustryExpert } from './spell-loader.js';
import { parseOutputFiles, saveFilesToR2, listBatchFiles, readFile } from './output-parser.js';
import { createRun, updateRun, getRun, getBatch, updateBatch, pushBatchEvent, genId, markRunComplete } from './state.js';

// 标准模式 Agent spell 路径映射
export const STANDARD_SPELL_MAP = {
  market:     { spell: 'spells/standard/market_agent.md', phase: 'p1' },
  competitor: { spell: 'spells/standard/competitor_deep_agent.md', phase: 'p1' },
  n34:        { spell: 'spells/standard/n34_agent.md', phase: 'p1' },
  user:       { spell: 'spells/standard/user_agent.md', phase: 'p2' },
  user_persona: { spell: 'spells/standard/user_persona_agent.md', phase: 'p2' },
  user_journey: { spell: 'spells/standard/user_journey_agent.md', phase: 'p2' },
  prd:        { spell: 'spells/standard/p3_prd_agent.md', phase: 'p3' },
  mvp:        { spell: 'spells/standard/p3_mvp_agent.md', phase: 'p3' },
  feature:    { spell: 'spells/standard/p3_feature_list_agent.md', phase: 'p3' },
  ia:         { spell: 'spells/standard/p3_ia_agent.md', phase: 'p3' },
  flow:       { spell: 'spells/standard/p3_business_flow_agent.md', phase: 'p3' },
  roadmap:    { spell: 'spells/standard/roadmap_agent.md', phase: 'p3' },
  ai_select:  { spell: 'spells/standard/p3_ai_select_agent.md', phase: 'p3' },
  proto:      { spell: 'spells/standard/p4_proto_agent.md', phase: 'p4' },
  ui_system:  { spell: 'spells/standard/p4_ui_system_agent.md', phase: 'p4' },
  metrics:    { spell: 'spells/standard/p4_metrics_agent.md', phase: 'p4' },
  design_qa:  { spell: 'spells/standard/p4_design_qa_agent.md', phase: 'p4' },
  tech:       { spell: 'spells/standard/p5_tech_report_agent.md', phase: 'p5' },
  model_selection: { spell: 'spells/standard/p5_model_selection_agent.md', phase: 'p5' },
  launch:     { spell: 'spells/standard/p6_launch_checklist_agent.md', phase: 'p6' },
  ops:        { spell: 'spells/standard/p6_ops_strategy_agent.md', phase: 'p6' },
  aso:        { spell: 'spells/standard/p6_aso_materials_agent.md', phase: 'p6' },
  monetization: { spell: 'spells/standard/p6_monetization_agent.md', phase: 'p6' },
  retro:      { spell: 'spells/standard/p6_retro_report_agent.md', phase: 'p6' },
  reviewer:   { spell: 'spells/standard/reviewer_agent.md', phase: 'review' },
  cko:        { spell: 'spells/standard/cko_agent.md', phase: 'review' },
  demo:       { spell: 'spells/lightning/demo_agent.md', phase: 'lightning' },
};

export const PHASE_AGENT_MAP = {
  p1: ['market', 'competitor', 'n34'],
  p2: ['user', 'user_persona', 'user_journey'],
  p3: ['prd', 'mvp', 'feature', 'ia', 'flow', 'roadmap', 'ai_select'],
  p4: ['proto', 'ui_system', 'metrics', 'design_qa'],
  p5: ['tech', 'model_selection'],
  p6: ['launch', 'ops', 'aso', 'monetization', 'retro'],
};

// ── Tier 1 ──

export async function handleAnalyzeCards(runId, env) {
  const run = await getRun(env, runId);
  if (!run) return jsonResp({ error: 'Run not found' }, 404);
  let text = run.output_text || '';
  if (text.length < 200 && run.batch_id) {
    const fullText = await readFile(env, `projects/${run.batch_id}/${runId}.log`);
    if (fullText) text = fullText;
  }
  if (!text) return jsonResp({ error: 'No analysis text found' }, 404);
  const cards = extractCogCards(text);
  return cards ? jsonResp({ cards }) : jsonResp({ error: 'Cards not found', cards: [] });
}

function extractCogCards(text) {
  const jsonMatch = text.match(/<!--\s*COGNITIVE_CARDS_JSON\s*([\s\S]*?)-->/);
  if (jsonMatch) { try { return JSON.parse(jsonMatch[1].trim()); } catch (_) {} }
  const codeMatch = text.match(/```json\s*([\s\S]*?)```/);
  if (codeMatch) {
    try {
      const p = JSON.parse(codeMatch[1].trim());
      return Array.isArray(p) ? p : p.cards || null;
    } catch (_) {}
  }
  return null;
}

export async function handleFeedback(request, env) {
  const body = await request.json();
  const entry = { ...body, timestamp: Date.now(), date: new Date().toISOString() };
  if (env?.KV) await env.KV.put(`feedback:${entry.timestamp}`, JSON.stringify(entry));
  return jsonResp({ ok: true });
}

export async function handleGate(request, env) {
  const { batch_id, scores } = await request.json();
  if (!scores) return jsonResp({ error: 'scores required' }, 400);
  const labels = ['市场空间', '竞品壁垒', 'AI边界', '用户画像', '产品定位'];
  const keys = ['q1', 'q2', 'q3', 'q4', 'q5'];
  const detail = {};
  let total = 0, hasZero = false;
  for (let i = 0; i < 5; i++) {
    const val = Math.max(0, Math.min(100, parseInt(scores[keys[i]]) || 0));
    detail[labels[i]] = val;
    total += val;
    if (val === 0) hasZero = true;
  }
  let decision, msg;
  if (total >= 400 && !hasZero) { decision = 'pass'; msg = `总分 ${total}/500 · 通过`; }
  else if (total < 300) { decision = 'stop'; msg = `总分 ${total}/500 · 终止`; }
  else { decision = 'redo'; msg = `总分 ${total}/500 · 回炉`; }
  if (batch_id && env?.KV) await updateBatch(env, batch_id, { gate_result: { decision, total, detail } });
  return jsonResp({ decision, total, detail, msg, can_proceed: decision === 'pass' });
}

export async function handleProjectType(request) {
  const { product, industry } = await request.json();
  const text = `${product || ''} ${industry || ''}`.toLowerCase();
  let end_type = 'C';
  if (/政[企务]|公安|军工|信创/.test(text)) end_type = 'G';
  else if (/[企bB]端|saas|crm|erp|mes|oa|管理系统/.test(text)) end_type = 'B';
  let ai_risk = 'low';
  if (/金融|信贷|医疗|法律|军工/.test(text)) ai_risk = 'high';
  else if (/教育|汽车|保险/.test(text)) ai_risk = 'medium';
  return jsonResp({ id: `${end_type.toLowerCase()}_auto`, name: `${end_type}端`, end_type, ai_risk,
    recommended_model: end_type === 'G' ? 'Qwen2-72B（国产）' : 'DeepSeek-V3',
    compliance_focus: ['个保法', 'AI管理办法'], model_hard_rule: end_type === 'G',
    north_star_candidates: ['DAU', 'MAU', '留存率'],
    phase_priority: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'],
  });
}

// ── Tier 2 (handlers exported, see _worker.js for full implementations) ──
// Note: The bundled _worker.js contains the full implementations inline.
// This source file serves as the modular reference.

export { collectProjectContext };

async function collectProjectContext(env, batchId) {
  const files = await listBatchFiles(env, batchId);
  if (files.length === 0) return '';
  let context = '';
  for (const file of files.slice(0, 10)) {
    const content = await readFile(env, file.path);
    if (content) {
      const truncated = content.length > 3000 ? content.slice(0, 3000) + '\n...' : content;
      context += `\n\n### ${file.filename}\n${truncated}`;
    }
  }
  return context;
}

function jsonResp(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}
