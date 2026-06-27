/* =========================================================
 * Peach Studio · cases.html v1.1 案例库 v1.0
 * =========================================================
 * 挂载点：<section id="peach-cases-v11"></section>
 * 展示：Prior Art 成功模式 + Anti-Pattern 失败教训 + 可复用案例
 * 2026-04-23
 * ========================================================= */

(function() {
  'use strict';

  const STYLE = `
    .pcs-section { padding: 60px 0; background: linear-gradient(180deg, var(--paper, #faf5ea), var(--paper-light, #f4ede0)); border-top: 2px solid var(--paper-dark, #e8dfd0); }
    .pcs-container { max-width: 1240px; margin: 0 auto; padding: 0 24px; }
    .pcs-header { text-align: center; margin-bottom: 40px; }
    .pcs-hand { font-family: var(--font-hand, 'Caveat', cursive); color: var(--peach, #d16a4e); font-size: 16px; letter-spacing: 2px; }
    .pcs-title { font-family: var(--font-serif, 'Instrument Serif', serif); font-size: 40px; color: var(--ink-deep, #2a2520); margin: 8px 0; }
    .pcs-title .it { font-style: italic; color: var(--peach, #d16a4e); }
    .pcs-sub { font-family: var(--font-serif); font-style: italic; color: var(--ink-soft); max-width: 680px; margin: 0 auto; line-height: 1.6; }

    .pcs-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 32px; }
    .pcs-col { background: white; border-radius: 16px; padding: 24px; }
    .pcs-col.prior { border: 2px solid var(--sage, #9aa889); background: linear-gradient(135deg, white, rgba(154,168,137,0.04)); }
    .pcs-col.anti { border: 2px solid var(--peach, #d16a4e); background: linear-gradient(135deg, white, rgba(209,106,78,0.04)); }
    .pcs-col-title { font-family: var(--font-serif); font-size: 22px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
    .pcs-col.prior .pcs-col-title { color: var(--sage-deep, #7a8868); }
    .pcs-col.anti .pcs-col-title { color: var(--peach, #d16a4e); }
    .pcs-col-sub { font-size: 13px; color: var(--ink-soft); margin-bottom: 16px; font-style: italic; }

    .pcs-case { padding: 14px; background: var(--paper, #faf5ea); border-radius: 10px; margin-bottom: 10px; }
    .pcs-case-name { font-family: var(--font-serif); font-size: 15px; color: var(--ink-deep); margin-bottom: 6px; }
    .pcs-case-desc { font-size: 12px; color: var(--ink-soft); line-height: 1.6; }
    .pcs-case-meta { display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap; }
    .pcs-meta-tag { padding: 2px 8px; background: white; border-radius: 8px; font-size: 11px; color: var(--ink-faint); border: 1px solid var(--paper-dark); }

    .pcs-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 24px 0; }
    .pcs-stat { background: white; padding: 18px; border-radius: 12px; text-align: center; border: 1.5px solid var(--paper-dark, #e8dfd0); transform: rotate(-0.3deg); }
    .pcs-stat:nth-child(2n) { transform: rotate(0.4deg); }
    .pcs-stat-num { font-family: var(--font-serif); font-size: 32px; color: var(--peach, #d16a4e); line-height: 1; }
    .pcs-stat-label { font-size: 12px; color: var(--ink-faint); margin-top: 6px; }

    .pcs-framework { background: white; border: 1.5px dashed var(--warm-tan, #c9a878); border-radius: 16px; padding: 24px; margin-top: 32px; }
    .pcs-framework-title { font-family: var(--font-serif); font-size: 20px; margin-bottom: 12px; }
    .pcs-framework-flow { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; align-items: center; }
    .pcs-framework-step { background: var(--paper, #faf5ea); padding: 10px; border-radius: 8px; text-align: center; font-size: 12px; color: var(--ink-soft); }

    @media (max-width: 768px) {
      .pcs-two-col { grid-template-columns: 1fr; }
      .pcs-stats { grid-template-columns: repeat(2, 1fr); }
      .pcs-framework-flow { grid-template-columns: 1fr; }
    }
  `;

  const STATS = [
    { num: '∞', label: '随跑随长' },
    { num: '4 问', label: 'BadCase 分析法' },
    { num: '0', label: '丢弃案例' },
    { num: '100%', label: '回流 Obsidian' }
  ];

  const PRIOR = [
    {
      name: 'N34 AI 边界一次通过',
      desc: 'AI 训练师先单独跑 · 4 标签填满 · 产品总监 + 技术总监联审仅补 1 项 · 节省 5 min 返工',
      meta: ['教育 K12', 'MVP', 'v1.0']
    },
    {
      name: '闪电档 2 分钟三件套',
      desc: '快速 CEO + Product Brief + Design-Tech Brief + 全栈 Demo 并发 · 无 Manifest 直接跑 · 面试场景必用',
      meta: ['面试档', '闪电', '铁律']
    },
    {
      name: '规则 + AI 混合架构',
      desc: '老板奇瑞汽金 · 合规部分规则引擎兜底 · 模糊判断 AI 处理 · 45 min → 3 min 52s · 误拒 15% → 2-4%',
      meta: ['金融', 'B 端', '实战']
    },
    {
      name: '跨文档 Demo 双向反查',
      desc: 'QA 一致性审 · Demo 每按钮追溯 PRD 某节 · PRD 每功能 Demo 能点 · 避免"为 Demo 做 Demo"',
      meta: ['铁律 6', 'QA 核心']
    },
    {
      name: '并发 L3 4 总监审',
      desc: '产品 + 技术 + 设计 + 增长 总监同时审各自管辖 · 节省 60% 时长 · 客户档 22 min P50',
      meta: ['铁律 10', '并发']
    }
  ];

  const ANTI = [
    {
      name: 'PRD 反指标只写 1 个',
      desc: 'N11 第 1 轮被 L5 反指标监控打回 · 原因：PM prompt Self-Check 未明确"≥ 2 个" · 已升级 v1.1 · 回归通过率 85% → 92%',
      meta: ['铁律 9', '高频']
    },
    {
      name: 'JTBD 5 元素瞎编',
      desc: '需求分析师未做 5 Whys 追问 · 直接推断用户动机 · 产品定位漂移 · 打回回炉重做 P2',
      meta: ['铁律 9', '必避']
    },
    {
      name: 'B 端金融推 GPT',
      desc: 'N21 模型选型违反合规红线 · 技术总监 + L6 3 法合规审一票否决 · 返工 · Anti-Pattern 入库',
      meta: ['铁律 5', '红线']
    },
    {
      name: 'ABC 菜单问老板',
      desc: 'CEO prompt 第 1 轮测试 · 老板输入"做个 AI"· CEO 回"A/B/C 三选一"· 违反"有主见搭档"铁律 · 已修',
      meta: ['协作铁律', '已修']
    },
    {
      name: '用 PPT 大词',
      desc: '初版员工 prompt 出现"赋能 / 闭环 / leverage"· 被语言润色师打回 · 桃子 PPT 禁词表扩容',
      meta: ['铁律 8', '禁词']
    },
    {
      name: '跳过 CEO Gate 强行推进',
      desc: 'V1.0 早期 · CEO 把 P1-P2 跑完直接进 P3 · 定位不清导致 N11 PRD 反复返工 · 浪费 30 min · 已强制 Gate',
      meta: ['铁律 2', '已防']
    }
  ];

  const FRAMEWORK = [
    '线上 BadCase',
    '→',
    '4 问分析',
    '→',
    '入 Anti-Pattern / Prior Art · prompt +1'
  ];

  function el(tag, a, k) {
    const e = document.createElement(tag);
    if (a) for (const key in a) { if (key === 'className') e.className = a[key]; else e.setAttribute(key, a[key]); }
    if (k) (Array.isArray(k) ? k : [k]).forEach(c => { if (typeof c === 'string') e.appendChild(document.createTextNode(c)); else if (c) e.appendChild(c); });
    return e;
  }

  function init() {
    const mount = document.getElementById('peach-cases-v11');
    if (!mount) return;
    if (!document.getElementById('pcs-styles')) {
      const s = document.createElement('style'); s.id = 'pcs-styles'; s.textContent = STYLE; document.head.appendChild(s);
    }

    const section = el('section', { className: 'pcs-section' });
    const c = el('div', { className: 'pcs-container' });

    const h = el('div', { className: 'pcs-header' });
    h.appendChild(el('div', { className: 'pcs-hand' }, '可迭代信条 · 每跑一次更聪明'));
    const t = el('h2', { className: 'pcs-title' });
    t.innerHTML = '📂 案例库 · <span class="it">Prior Art + Anti-Pattern</span>';
    h.appendChild(t);
    h.appendChild(el('p', { className: 'pcs-sub' }, '桃子每跑一次任务 · 成功模式入 Prior Art（下次自动复用）· 失败教训入 Anti-Pattern（下次自动避）· 版本管理员主责 · 回流 Obsidian'));

    const stats = el('div', { className: 'pcs-stats' });
    STATS.forEach(s => {
      const st = el('div', { className: 'pcs-stat' });
      st.appendChild(el('div', { className: 'pcs-stat-num' }, s.num));
      st.appendChild(el('div', { className: 'pcs-stat-label' }, s.label));
      stats.appendChild(st);
    });
    h.appendChild(stats);
    c.appendChild(h);

    // 4 问分析框架
    const fw = el('div', { className: 'pcs-framework' });
    fw.appendChild(el('div', { className: 'pcs-framework-title' }, '🔄 BadCase 4 问分析法 · 标准回流流程'));
    const fwFlow = el('div', { className: 'pcs-framework-flow' });
    FRAMEWORK.forEach(step => {
      fwFlow.appendChild(el('div', { className: 'pcs-framework-step' }, step));
    });
    fw.appendChild(fwFlow);
    const fwNote = el('div', { style: 'margin-top: 16px; font-size: 13px; color: var(--ink-soft); line-height: 1.7;' });
    fwNote.innerHTML = '4 问：<strong>1. 错在哪</strong>（Role / Context / Constraints / Output / Self-Check）· <strong>2. 根本原因</strong>（prompt 缺陷 / 模型边界 / 数据问题）· <strong>3. 解决方案</strong>（改 prompt / 换模型 / 补数据 / 扩评测集）· <strong>4. 预防</strong>（回归 + 入库）';
    fw.appendChild(fwNote);
    c.appendChild(fw);

    // 两列
    const twoCol = el('div', { className: 'pcs-two-col' });

    // Prior Art
    const prior = el('div', { className: 'pcs-col prior' });
    prior.appendChild(el('div', { className: 'pcs-col-title' }, '✅ Prior Art · 成功模式 · 可复用'));
    prior.appendChild(el('div', { className: 'pcs-col-sub' }, '老板 + 桃子跑过的成功模式 · 下次同类型任务自动引用'));
    PRIOR.forEach(p => {
      const cs = el('div', { className: 'pcs-case' });
      cs.appendChild(el('div', { className: 'pcs-case-name' }, p.name));
      cs.appendChild(el('div', { className: 'pcs-case-desc' }, p.desc));
      const meta = el('div', { className: 'pcs-case-meta' });
      p.meta.forEach(m => meta.appendChild(el('span', { className: 'pcs-meta-tag' }, m)));
      cs.appendChild(meta);
      prior.appendChild(cs);
    });
    twoCol.appendChild(prior);

    // Anti-Pattern
    const anti = el('div', { className: 'pcs-col anti' });
    anti.appendChild(el('div', { className: 'pcs-col-title' }, '❌ Anti-Pattern · 失败教训 · 下次必避'));
    anti.appendChild(el('div', { className: 'pcs-col-sub' }, '打回返工的案例 · 根因 + 预防 · 员工 prompt 自动注入 Anti-Pattern 段'));
    ANTI.forEach(p => {
      const cs = el('div', { className: 'pcs-case' });
      cs.appendChild(el('div', { className: 'pcs-case-name' }, p.name));
      cs.appendChild(el('div', { className: 'pcs-case-desc' }, p.desc));
      const meta = el('div', { className: 'pcs-case-meta' });
      p.meta.forEach(m => meta.appendChild(el('span', { className: 'pcs-meta-tag' }, m)));
      cs.appendChild(meta);
      anti.appendChild(cs);
    });
    twoCol.appendChild(anti);

    c.appendChild(twoCol);

    section.appendChild(c); mount.appendChild(section);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
