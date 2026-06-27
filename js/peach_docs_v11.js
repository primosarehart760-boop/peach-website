/* =========================================================
 * Peach Studio · docs.html v1.1 资产层 v1.0
 * =========================================================
 * 挂载点：<section id="peach-docs-v11"></section>
 * 展示：桃子完整资产树 · 从项目文档到员工 prompt
 * 2026-04-23
 * ========================================================= */

(function() {
  'use strict';

  const STYLE = `
    .pdc-section { padding: 60px 0; background: linear-gradient(180deg, var(--paper, #faf5ea), var(--paper-light, #f4ede0)); border-top: 2px solid var(--paper-dark, #e8dfd0); }
    .pdc-container { max-width: 1240px; margin: 0 auto; padding: 0 24px; }
    .pdc-header { text-align: center; margin-bottom: 40px; }
    .pdc-hand { font-family: var(--font-hand, 'Caveat', cursive); color: var(--peach, #d16a4e); font-size: 16px; letter-spacing: 2px; }
    .pdc-title { font-family: var(--font-serif, 'Instrument Serif', serif); font-size: 40px; color: var(--ink-deep, #2a2520); margin: 8px 0; }
    .pdc-title .it { font-style: italic; color: var(--peach, #d16a4e); }
    .pdc-sub { font-family: var(--font-serif); font-style: italic; color: var(--ink-soft); max-width: 680px; margin: 0 auto; line-height: 1.6; }

    .pdc-stats { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin: 24px 0 32px; }
    .pdc-stat { background: white; padding: 16px; border-radius: 12px; text-align: center; border: 1.5px solid var(--paper-dark, #e8dfd0); }
    .pdc-stat:nth-child(odd) { transform: rotate(-0.4deg); }
    .pdc-stat:nth-child(even) { transform: rotate(0.4deg); }
    .pdc-stat-num { font-family: var(--font-serif); font-size: 28px; color: var(--peach, #d16a4e); line-height: 1; }
    .pdc-stat-label { font-size: 11px; color: var(--ink-faint); margin-top: 4px; }

    .pdc-group { background: white; border: 1.5px solid var(--paper-dark, #e8dfd0); border-radius: 14px; padding: 20px; margin-bottom: 16px; }
    .pdc-group-title { font-family: var(--font-serif); font-size: 18px; color: var(--ink-deep); margin-bottom: 12px; display: flex; justify-content: space-between; align-items: baseline; }
    .pdc-group-count { font-family: var(--font-hand); color: var(--peach, #d16a4e); font-size: 14px; }

    .pdc-files { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 8px; }
    .pdc-file { padding: 8px 12px; background: var(--paper, #faf5ea); border-radius: 8px; font-family: var(--font-mono, monospace); font-size: 12px; color: var(--ink-soft); border-left: 3px solid var(--sage, #9aa889); }
    .pdc-file.new { border-left-color: var(--peach, #d16a4e); background: linear-gradient(135deg, rgba(209,106,78,0.04), white); }
    .pdc-file.core { border-left-color: var(--warm-tan, #c9a878); font-weight: 500; color: var(--ink-deep); }

    @media (max-width: 768px) {
      .pdc-stats { grid-template-columns: repeat(2, 1fr); }
    }
  `;

  const STATS = [
    { num: '4', label: '宪法蓝图' },
    { num: '41', label: '员工 prompt' },
    { num: '60', label: 'VELA + S 支撑' },
    { num: '7', label: '主题摘要' },
    { num: '10+', label: 'html + js' }
  ];

  const GROUPS = [
    {
      name: '📜 宪法蓝图（v1.1 核心）',
      count: 4,
      files: [
        { n: 'PEACH_MASTER_FLOW.md · v1.1', c: 'core' },
        { n: 'SOP_FLOW_BLUEPRINT.md · 34 节点', c: 'core' },
        { n: 'ROUTING_RULES.md · CEO 6 步', c: 'core' },
        { n: 'AUDIT_LOOP.md · 8 层审批', c: 'core' },
        { n: 'STAGE_4_FRONTEND_BLUEPRINT.md', c: 'new' },
        { n: 'CLAUDE.md · v1.1 项目入口', c: 'core' }
      ]
    },
    {
      name: '👥 员工 Prompt（agents/）· VELA 8+1 段式',
      count: 41,
      files: [
        { n: '00_CEO.md · 6 步路由 + Gate', c: 'core' },
        { n: '00_快速CEO.md · 闪电档', c: 'core' },
        { n: '战略分析师.md · BP + SWOT', c: 'new' },
        { n: '首席方法论官.md · 铁律守门', c: 'new' },
        { n: '11-14 总监 × 4', c: 'core' },
        { n: 'QA_一致性审查员.md', c: 'new' },
        { n: '反指标监控员.md', c: 'new' },
        { n: '语言润色师.md', c: 'new' },
        { n: '版本管理员.md', c: 'new' },
        { n: '01_PM.md + PM_行业向.md', c: 'core' },
        { n: '需求分析师.md + 用户研究员.md', c: 'new' },
        { n: '数据PM.md', c: 'new' },
        { n: '03-04 + Prompt + RAG + Agent + 模型评测 × 6', c: 'core' },
        { n: 'UX + Figma + 动效 + 品牌 + Editorial × 5', c: 'new' },
        { n: '全栈 + 05-06 + DevOps + 28 测试 × 5', c: 'core' },
        { n: '07 数据分析师 + BI + 内容 + ASO × 4', c: 'new' },
        { n: '15 客户成功 + 16 商务 + 合规隐私 × 3', c: 'core' }
      ]
    },
    {
      name: '📚 方法论资产（VELA + 支撑 + 7 师父摘要）',
      count: 67,
      files: [
        { n: 'templates/01-33_*.md · VELA 33 主模板（软链）', c: 'core' },
        { n: 'templates/product-brief-模板.md · 老板亲笔', c: 'core' },
        { n: 'templates/design-tech-brief-模板.md · 老板亲笔', c: 'core' },
        { n: 'supports/S01-S27 · 支撑文档 27 份', c: 'core' },
        { n: 'supports/ai_trainer_notes/raw/（38 份师父原笔记）', c: 'new' },
        { n: 'supports/ai_trainer_notes/by_topic/评测.md ⭐', c: 'new' },
        { n: 'supports/ai_trainer_notes/by_topic/prompt自动化.md ⭐', c: 'new' },
        { n: 'supports/ai_trainer_notes/by_topic/工作流.md', c: 'new' },
        { n: 'supports/ai_trainer_notes/by_topic/训练/多模态/项目深度.md', c: 'new' },
        { n: 'supports/ai_trainer_notes/INDEX.md · 总索引', c: 'new' }
      ]
    },
    {
      name: '🌐 前端 site/ · 10 html + 工程 js',
      count: 20,
      files: [
        { n: 'site/index.html · 需求入口 + v1.1 宪法', c: 'core' },
        { n: 'site/methodology.html + peach_7col_methodology.js', c: 'new' },
        { n: 'site/results.html + peach_result_showcase.js', c: 'new' },
        { n: 'site/team.html + peach_team_v11.js', c: 'new' },
        { n: 'site/workspace.html + peach_workspace_v11.js', c: 'new' },
        { n: 'site/industries.html + peach_industries_v11.js', c: 'new' },
        { n: 'site/cases.html + peach_cases_v11.js', c: 'new' },
        { n: 'site/office.html + peach_office_v11.js', c: 'new' },
        { n: 'site/collaboration.html + peach_collaboration_v11.js', c: 'new' },
        { n: 'site/docs.html + peach_docs_v11.js（本页）', c: 'new' },
        { n: 'site/js/vela_docforge_docs.js · 60 × 5 类资源', c: 'new' },
        { n: 'site/js/peach_prompts.js · 72 份 Prompt 库', c: 'core' },
        { n: 'site/js/peach_excalidraw.js · 图表引擎', c: 'core' }
      ]
    },
    {
      name: '🧠 记忆系统（~/.claude/projects/-Users-a1/memory/）',
      count: 75,
      files: [
        { n: 'MEMORY.md · 总索引（75+ 铁律）', c: 'core' },
        { n: 'feedback_peach_three_capabilities_constitution.md 🧬', c: 'new' },
        { n: 'feedback_peach_master_flow_v1_1_addendum.md · 10 铁律', c: 'new' },
        { n: 'feedback_peach_prompt_vela_8_segment_standard.md', c: 'new' },
        { n: 'feedback_peach_alignment_gate.md · 6 维核验', c: 'new' },
        { n: 'feedback_peach_auto_advance_no_stop.md · 自动推进', c: 'new' },
        { n: 'feedback_peach_eval_and_badcase.md · 评测集+BadCase', c: 'new' },
        { n: 'feedback_peach_site_naming_locked.md · 命名锁死', c: 'core' },
        { n: 'feedback_aesthetic_editorial_peach.md · 视觉禁区', c: 'core' },
        { n: 'project_peach_studio_site_progress.md · 进度索引', c: 'new' }
      ]
    }
  ];

  function el(tag, a, k) {
    const e = document.createElement(tag);
    if (a) for (const key in a) { if (key === 'className') e.className = a[key]; else e.setAttribute(key, a[key]); }
    if (k) (Array.isArray(k) ? k : [k]).forEach(c => { if (typeof c === 'string') e.appendChild(document.createTextNode(c)); else if (c) e.appendChild(c); });
    return e;
  }

  function init() {
    const mount = document.getElementById('peach-docs-v11');
    if (!mount) return;
    if (!document.getElementById('pdc-styles')) {
      const s = document.createElement('style'); s.id = 'pdc-styles'; s.textContent = STYLE; document.head.appendChild(s);
    }

    const section = el('section', { className: 'pdc-section' });
    const c = el('div', { className: 'pdc-container' });

    const h = el('div', { className: 'pdc-header' });
    h.appendChild(el('div', { className: 'pdc-hand' }, 'Peach Studio资产层 · v1.1'));
    const t = el('h2', { className: 'pdc-title' });
    t.innerHTML = '📖 完整资产树 · <span class="it">从宪法到员工到前端</span>';
    h.appendChild(t);
    h.appendChild(el('p', { className: 'pdc-sub' }, '桃子不是"几个 prompt 拼起来" · 是 4 蓝图 + 41 员工 + 60 VELA + 7 师父摘要 + 10 html + 75 铁律 一整套系统 · 每份都归档 · 每份都版本化'));

    const stats = el('div', { className: 'pdc-stats' });
    STATS.forEach(s => {
      const st = el('div', { className: 'pdc-stat' });
      st.appendChild(el('div', { className: 'pdc-stat-num' }, s.num));
      st.appendChild(el('div', { className: 'pdc-stat-label' }, s.label));
      stats.appendChild(st);
    });
    h.appendChild(stats);
    c.appendChild(h);

    GROUPS.forEach(g => {
      const grp = el('div', { className: 'pdc-group' });
      const head = el('div', { className: 'pdc-group-title' });
      head.appendChild(el('span', {}, g.name));
      head.appendChild(el('span', { className: 'pdc-group-count' }, g.count + ' 份'));
      grp.appendChild(head);

      const files = el('div', { className: 'pdc-files' });
      g.files.forEach(f => {
        files.appendChild(el('div', { className: 'pdc-file ' + (f.c || '') }, f.n));
      });
      grp.appendChild(files);
      c.appendChild(grp);
    });

    section.appendChild(c); mount.appendChild(section);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
