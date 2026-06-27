/* =========================================================
 * Peach Studio · workspace.html v1.1 分析工作台 v1.0
 * =========================================================
 * 挂载点：<section id="peach-workspace-v11"></section>
 * 样本：展示 CEO 6 步路由 + Task Manifest + Gate 5 问评分卡
 * 2026-04-23
 * ========================================================= */

(function() {
  'use strict';

  const STYLE = `
    .pws-section { padding: 60px 0; background: linear-gradient(180deg, var(--paper, #faf5ea), var(--paper-light, #f4ede0)); border-top: 2px solid var(--paper-dark, #e8dfd0); }
    .pws-container { max-width: 1240px; margin: 0 auto; padding: 0 24px; }
    .pws-header { text-align: center; margin-bottom: 40px; }
    .pws-hand { font-family: var(--font-hand, 'Caveat', cursive); color: var(--peach, #d16a4e); font-size: 16px; letter-spacing: 2px; }
    .pws-title { font-family: var(--font-serif, 'Instrument Serif', serif); font-size: 40px; color: var(--ink-deep, #2a2520); margin: 8px 0; }
    .pws-title .it { font-style: italic; color: var(--peach, #d16a4e); }
    .pws-sub { font-family: var(--font-serif); font-style: italic; color: var(--ink-soft); max-width: 680px; margin: 0 auto; line-height: 1.6; }

    .pws-flow { background: white; border: 1.5px solid var(--paper-dark, #e8dfd0); border-radius: 16px; padding: 28px; margin-bottom: 24px; transform: rotate(-0.3deg); }
    .pws-flow-title { font-family: var(--font-serif); font-size: 22px; color: var(--ink-deep); margin-bottom: 20px; }
    .pws-steps { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; position: relative; }
    .pws-step { background: var(--paper, #faf5ea); border-radius: 12px; padding: 14px; border-top: 3px solid var(--peach, #d16a4e); text-align: center; transition: all 0.2s; }
    .pws-step:nth-child(2n) { transform: translateY(-6px); }
    .pws-step-num { font-family: var(--font-serif); font-size: 24px; color: var(--peach, #d16a4e); }
    .pws-step-name { font-size: 13px; color: var(--ink-deep); margin: 6px 0; font-weight: 500; }
    .pws-step-desc { font-size: 11px; color: var(--ink-soft); line-height: 1.5; }

    .pws-gate { background: linear-gradient(135deg, rgba(209,106,78,0.05), rgba(154,168,137,0.05)); border: 2px dashed var(--peach, #d16a4e); border-radius: 16px; padding: 28px; margin-bottom: 24px; }
    .pws-gate-title { font-family: var(--font-serif); font-size: 26px; color: var(--peach, #d16a4e); margin-bottom: 8px; }
    .pws-gate-sub { font-size: 14px; color: var(--ink-soft); margin-bottom: 20px; }
    .pws-q-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
    .pws-q { background: white; border-radius: 12px; padding: 16px 20px; display: grid; grid-template-columns: 40px 1fr 120px; align-items: center; gap: 16px; }
    .pws-q-id { font-family: var(--font-serif); font-size: 28px; color: var(--peach, #d16a4e); }
    .pws-q-text { font-size: 14px; color: var(--ink-deep); line-height: 1.5; }
    .pws-q-pass { text-align: center; font-size: 12px; color: var(--ink-soft); line-height: 1.4; }
    .pws-q-pass strong { display: block; font-family: var(--font-serif); color: var(--sage-deep, #7a8868); font-size: 18px; }

    .pws-dec { background: white; border: 1.5px solid var(--paper-dark, #e8dfd0); border-radius: 16px; padding: 24px; transform: rotate(0.2deg); }
    .pws-dec-title { font-family: var(--font-serif); font-size: 20px; color: var(--ink-deep); margin-bottom: 16px; }
    .pws-dec-row { display: grid; grid-template-columns: 100px 1fr 80px; padding: 12px 0; border-bottom: 1px dashed var(--paper-dark); align-items: center; gap: 16px; }
    .pws-dec-row:last-child { border-bottom: none; }
    .pws-dec-score { font-family: var(--font-serif); font-size: 16px; }
    .pws-dec-score.pass { color: var(--sage-deep, #7a8868); }
    .pws-dec-score.warn { color: var(--warm-tan, #c9a878); }
    .pws-dec-score.fail { color: var(--peach, #d16a4e); }

    @media (max-width: 768px) {
      .pws-steps { grid-template-columns: 1fr 1fr; }
      .pws-q { grid-template-columns: 1fr; text-align: center; gap: 8px; }
    }
  `;

  const STEPS = [
    { num: 1, name: '真 PM 三步', desc: '需求 / 痛点 / 数据分析 · 需求分析师辅助' },
    { num: 2, name: '产品类型', desc: 'C/B/G + 20 行业 + MVP/V1.0/迭代' },
    { num: 3, name: '档位识别', desc: '范围 × 用途 · 12 组合' },
    { num: 4, name: '节点调度', desc: '34 节点选子集 + 员工分派 + 审查链' },
    { num: 5, name: 'Task Manifest', desc: '交老板确认（闪电档例外）' },
    { num: 6, name: '推进执行', desc: 'P2 完成暂停 CEO Gate' }
  ];

  const GATE_Q = [
    { id: 1, q: '市场空间够大吗？', pass: 'TAM ≥ 10 亿 / SAM ≥ 1 亿 / SOM ≥ 1000 万' },
    { id: 2, q: '竞品壁垒能打穿吗？', pass: '≥ 1 项差异化（数据/技术/渠道/资源）' },
    { id: 3, q: 'AI 边界清不清？', pass: 'N34 · 4 标签 · AI 占 30-70%' },
    { id: 4, q: '用户画像和真痛点对齐？', pass: 'Top3 真痛点 · 可量化 · 一一对应' },
    { id: 5, q: '产品定位一句话讲清？', pass: '5 元素完整：为谁/在场景/提供X/解决Y/区别Z' }
  ];

  const DECISIONS = [
    { score: '≥ 400', status: 'pass', text: '通过 · 进 P3 产品规划' },
    { score: '300-399', status: 'warn', text: '回炉 · 标"第 2 轮"· 重跑缺失项' },
    { score: '< 300', status: 'fail', text: '老板人工介入 · 或终止项目' },
    { score: '连续 2 轮', status: 'fail', text: '强制终止 · 节省资源' }
  ];

  function el(tag, a, k) {
    const e = document.createElement(tag);
    if (a) for (const key in a) { if (key === 'className') e.className = a[key]; else e.setAttribute(key, a[key]); }
    if (k) (Array.isArray(k) ? k : [k]).forEach(c => { if (typeof c === 'string') e.appendChild(document.createTextNode(c)); else if (c) e.appendChild(c); });
    return e;
  }

  function init() {
    const mount = document.getElementById('peach-workspace-v11');
    if (!mount) return;
    if (!document.getElementById('pws-styles')) {
      const s = document.createElement('style'); s.id = 'pws-styles'; s.textContent = STYLE; document.head.appendChild(s);
    }
    const section = el('section', { className: 'pws-section' });
    const c = el('div', { className: 'pws-container' });

    const h = el('div', { className: 'pws-header' });
    h.appendChild(el('div', { className: 'pws-hand' }, 'CEO 分析工作台 · v1.1'));
    const t = el('h2', { className: 'pws-title' });
    t.innerHTML = '📊 CEO 6 步路由 + <span class="it">Gate 5 问评分</span>';
    h.appendChild(t);
    h.appendChild(el('p', { className: 'pws-sub' }, '老板扔一句话 · CEO 6 步识别 · 输出 Task Manifest · P1-P2 完成后 Gate 5 硬问题打分 · 通过进 P3 · 不通过回炉 · 省下后续 10+ 节点浪费'));
    c.appendChild(h);

    // 6 步流程
    const flow = el('div', { className: 'pws-flow' });
    flow.appendChild(el('div', { className: 'pws-flow-title' }, '🎯 CEO 6 步路由算法'));
    const steps = el('div', { className: 'pws-steps' });
    STEPS.forEach(s => {
      const st = el('div', { className: 'pws-step' });
      st.appendChild(el('div', { className: 'pws-step-num' }, String(s.num)));
      st.appendChild(el('div', { className: 'pws-step-name' }, s.name));
      st.appendChild(el('div', { className: 'pws-step-desc' }, s.desc));
      steps.appendChild(st);
    });
    flow.appendChild(steps);
    c.appendChild(flow);

    // Gate 5 问
    const g = el('div', { className: 'pws-gate' });
    g.appendChild(el('div', { className: 'pws-gate-title' }, '🚨 CEO Gate 1 · 5 硬问题评分卡'));
    g.appendChild(el('div', { className: 'pws-gate-sub' }, 'P1-P2 完成后强制检查 · 每项 0/50/100 分 · 总 500 分 · 老板手动拍板（CEO 辅助打分 · 老板终审）'));
    const qGrid = el('div', { className: 'pws-q-grid' });
    GATE_Q.forEach(q => {
      const qEl = el('div', { className: 'pws-q' });
      qEl.appendChild(el('div', { className: 'pws-q-id' }, String(q.id)));
      qEl.appendChild(el('div', { className: 'pws-q-text' }, q.q));
      const pass = el('div', { className: 'pws-q-pass' });
      pass.appendChild(el('strong', {}, '通过标准'));
      pass.appendChild(el('div', {}, q.pass));
      qEl.appendChild(pass);
      qGrid.appendChild(qEl);
    });
    g.appendChild(qGrid);
    c.appendChild(g);

    // 决策规则
    const d = el('div', { className: 'pws-dec' });
    d.appendChild(el('div', { className: 'pws-dec-title' }, '⚖️ Gate 决策规则'));
    DECISIONS.forEach(dec => {
      const row = el('div', { className: 'pws-dec-row' });
      row.appendChild(el('div', { className: 'pws-dec-score ' + dec.status }, dec.score));
      row.appendChild(el('div', {}, dec.text));
      row.appendChild(el('div', { className: 'pws-dec-score ' + dec.status }, dec.status === 'pass' ? '✅' : dec.status === 'warn' ? '⚠️' : '❌'));
      d.appendChild(row);
    });
    c.appendChild(d);

    section.appendChild(c); mount.appendChild(section);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
