/* =========================================================
 * Peach Studio · results.html v1.1 任务结果演示 v1.0
 * =========================================================
 * 日期：2026-04-23
 * 挂载点：<section id="peach-result-showcase-v11"></section>
 * 样本任务：教育 K12 "小桃学习" MVP · 多阶段 × 工作档
 * ========================================================= */

(function() {
  'use strict';

  const STYLE = `
    .prs-section { padding: 60px 0; background: linear-gradient(180deg, var(--paper, #faf5ea), var(--paper-light, #f4ede0)); border-top: 2px solid var(--paper-dark, #e8dfd0); }
    .prs-container { max-width: 1240px; margin: 0 auto; padding: 0 24px; }
    .prs-header { text-align: center; margin-bottom: 40px; }
    .prs-hand { font-family: var(--font-hand, 'Caveat', cursive); color: var(--peach, #d16a4e); font-size: 16px; letter-spacing: 2px; }
    .prs-title { font-family: var(--font-serif, 'Instrument Serif', serif); font-size: 40px; color: var(--ink-deep, #2a2520); margin: 8px 0; }
    .prs-title .it { font-style: italic; color: var(--peach, #d16a4e); }
    .prs-sub { font-family: var(--font-serif, 'Instrument Serif', serif); font-style: italic; color: var(--ink-soft, #5a534a); font-size: 17px; max-width: 680px; margin: 0 auto; line-height: 1.6; }

    .prs-manifest { background: white; border: 1.5px solid var(--paper-dark, #e8dfd0); border-radius: 16px; padding: 28px; margin-bottom: 32px; transform: rotate(-0.3deg); }
    .prs-manifest-title { font-family: var(--font-serif); font-size: 22px; color: var(--ink-deep); margin-bottom: 16px; }
    .prs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: start; }
    .prs-kv { display: grid; grid-template-columns: 110px 1fr; gap: 10px 16px; font-size: 14px; }
    .prs-kv strong { color: var(--ink-soft, #5a534a); font-weight: 500; }
    .prs-kv span { color: var(--ink-deep, #2a2520); }

    .prs-folder { background: white; border: 1.5px solid var(--paper-dark, #e8dfd0); border-radius: 16px; padding: 24px; margin-bottom: 24px; transform: rotate(0.4deg); }
    .prs-folder-title { font-family: var(--font-serif); font-size: 20px; color: var(--ink-deep); margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
    .prs-tree { font-family: var(--font-mono, 'JetBrains Mono', monospace); font-size: 13px; line-height: 1.9; color: var(--ink-soft, #5a534a); background: var(--paper, #faf5ea); padding: 16px; border-radius: 10px; overflow-x: auto; }
    .prs-tree .folder { color: var(--peach, #d16a4e); font-weight: 600; }
    .prs-tree .star { color: var(--warm-tan, #c9a878); }
    .prs-tree .own { color: var(--sage-deep, #7a8868); font-weight: 600; }

    .prs-gate { background: linear-gradient(135deg, rgba(209,106,78,0.06), rgba(154,168,137,0.06)); border: 2px dashed var(--peach, #d16a4e); border-radius: 16px; padding: 24px; margin-bottom: 24px; }
    .prs-gate-title { font-family: var(--font-serif); font-size: 22px; color: var(--peach, #d16a4e); margin-bottom: 12px; }
    .prs-gate-score { font-family: var(--font-serif); font-size: 18px; color: var(--ink-deep); margin-bottom: 16px; }
    .prs-gate-q { background: white; border-radius: 10px; padding: 12px 16px; margin-bottom: 10px; display: grid; grid-template-columns: 1fr auto; gap: 12px; align-items: center; }
    .prs-gate-q-text { font-size: 14px; color: var(--ink-soft); }
    .prs-gate-q-score { font-family: var(--font-serif); font-size: 16px; color: var(--peach, #d16a4e); white-space: nowrap; }

    .prs-audit { background: white; border: 1.5px solid var(--paper-dark, #e8dfd0); border-radius: 16px; padding: 24px; margin-bottom: 24px; transform: rotate(-0.2deg); }
    .prs-audit-title { font-family: var(--font-serif); font-size: 20px; color: var(--ink-deep); margin-bottom: 16px; }
    .prs-layers { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
    .prs-layer { padding: 12px; background: var(--paper, #faf5ea); border-radius: 10px; text-align: center; border-left: 3px solid var(--sage-deep, #7a8868); }
    .prs-layer-num { font-family: var(--font-serif); font-size: 18px; color: var(--ink-deep); }
    .prs-layer-name { font-size: 12px; color: var(--ink-soft); margin: 4px 0; }
    .prs-layer-status { font-size: 12px; color: var(--sage-deep, #7a8868); }
    .prs-layer.warn { border-left-color: var(--warm-tan, #c9a878); }
    .prs-layer.warn .prs-layer-status { color: var(--warm-tan, #c9a878); }

    .prs-retro { background: white; border: 1.5px solid var(--paper-dark, #e8dfd0); border-radius: 16px; padding: 24px; }
    .prs-retro-title { font-family: var(--font-serif); font-size: 20px; color: var(--ink-deep); margin-bottom: 16px; }
    .prs-retro-col { padding: 14px; border-radius: 10px; margin-bottom: 12px; }
    .prs-retro-col.prior { background: linear-gradient(135deg, rgba(154,168,137,0.08), rgba(201,168,120,0.08)); border-left: 3px solid var(--sage-deep, #7a8868); }
    .prs-retro-col.anti { background: linear-gradient(135deg, rgba(209,106,78,0.06), rgba(184,76,62,0.06)); border-left: 3px solid var(--peach, #d16a4e); }
    .prs-retro-col h4 { font-family: var(--font-serif); font-size: 16px; margin-bottom: 6px; color: var(--ink-deep); }
    .prs-retro-col p { font-size: 13px; color: var(--ink-soft); line-height: 1.7; }

    @media (max-width: 768px) {
      .prs-grid { grid-template-columns: 1fr; }
      .prs-layers { grid-template-columns: repeat(2, 1fr); }
    }
  `;

  const SAMPLE = {
    taskName: '教育 K12 · 小桃学习 MVP',
    date: '2026-04-23',
    manifest: {
      input: '我想做个教育产品 · 看值不值得做',
      jtbd: '家长 + K12 学生 · 作业辅导场景 · AI 替代家长讲解',
      ppain: '家长无时间辅导 · 孩子作业不会 · 家教贵',
      mkt: 'TAM 5000 亿 / SAM 1500 亿 / SOM 50 亿（艾瑞 2024）',
      ctype: 'C 端（K12 默认）',
      industry: '教育 · K12 细分',
      stage: 'MVP',
      dang: '多阶段 P1+P2+Gate+P3+P4+P5 × 工作档',
      time: '25 min · 并发后 18 min',
      nodes: '12 节点 + N34 AI 边界 + N35 Demo + N36 回流'
    },
    gate: {
      total: 430,
      questions: [
        { q: '1. 市场空间够大吗？', score: '100 / 100 ★★★★★' },
        { q: '2. 竞品壁垒能打穿吗？', score: '50 / 100 ★★★' },
        { q: '3. AI 边界清不清？（N34 · 12 功能 · AI 占 50%）', score: '100 / 100 ★★★★★' },
        { q: '4. 用户画像痛点对齐？', score: '100 / 100 ★★★★★' },
        { q: '5. 产品定位一句话讲清？', score: '80 / 100 ★★★★' }
      ]
    }
  };

  function el(tag, attrs, kids) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'className') e.className = attrs[k];
      else if (k === 'onclick') e.onclick = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    if (kids) (Array.isArray(kids) ? kids : [kids]).forEach(c => {
      if (typeof c === 'string') e.appendChild(document.createTextNode(c));
      else if (c) e.appendChild(c);
    });
    return e;
  }

  function init() {
    const mount = document.getElementById('peach-result-showcase-v11');
    if (!mount) return;

    if (!document.getElementById('prs-styles')) {
      const style = document.createElement('style');
      style.id = 'prs-styles';
      style.textContent = STYLE;
      document.head.appendChild(style);
    }

    const section = el('section', { className: 'prs-section' });
    const container = el('div', { className: 'prs-container' });

    // Header
    const header = el('div', { className: 'prs-header' });
    header.appendChild(el('div', { className: 'prs-hand' }, 'Vol. 1 · Issue 1 · 2026-04-23'));
    const t = el('h2', { className: 'prs-title' });
    t.innerHTML = '📦 v1.1 完整任务产出 · <span class="it">样本案例</span>';
    header.appendChild(t);
    header.appendChild(el('p', { className: 'prs-sub' },
      '老板扔一句话 "我想做个教育产品 · 看值不值得做" · 桃子 18 分钟跑出 12 份大厂级文档 + Demo + 审批 + 回流 · 下方是完整产出'));
    container.appendChild(header);

    // Task Manifest
    const m = el('div', { className: 'prs-manifest' });
    m.appendChild(el('div', { className: 'prs-manifest-title' }, '🎯 Task Manifest · ' + SAMPLE.taskName));
    const mGrid = el('div', { className: 'prs-grid' });
    const mLeft = el('div', { className: 'prs-kv' });
    [
      ['老板输入', SAMPLE.manifest.input],
      ['JTBD', SAMPLE.manifest.jtbd],
      ['真痛点', SAMPLE.manifest.ppain],
      ['市场数据', SAMPLE.manifest.mkt]
    ].forEach(([k, v]) => {
      mLeft.appendChild(el('strong', {}, k));
      mLeft.appendChild(el('span', {}, v));
    });
    mGrid.appendChild(mLeft);
    const mRight = el('div', { className: 'prs-kv' });
    [
      ['端类型', SAMPLE.manifest.ctype],
      ['行业', SAMPLE.manifest.industry],
      ['产品阶段', SAMPLE.manifest.stage],
      ['档位', SAMPLE.manifest.dang],
      ['总时长', SAMPLE.manifest.time],
      ['节点', SAMPLE.manifest.nodes]
    ].forEach(([k, v]) => {
      mRight.appendChild(el('strong', {}, k));
      mRight.appendChild(el('span', {}, v));
    });
    mGrid.appendChild(mRight);
    m.appendChild(mGrid);
    container.appendChild(m);

    // 文档包目录
    const folder = el('div', { className: 'prs-folder' });
    folder.appendChild(el('div', { className: 'prs-folder-title' }, '📁 文档包目录（固定框架 · 内容按档位动态填充）'));
    const tree = el('div', { className: 'prs-tree' });
    tree.innerHTML = `outputs/202604231500_小桃学习_MVP/
├─ 00_TASK_MANIFEST.md
├─ <span class="folder">01_P1_市场洞察/</span>
│  ├─ 01_市场数据报告.md
│  ├─ 02_竞品深度体验报告.md <span class="star">★</span>
│  ├─ 03_商业计划书BP.md
│  ├─ 04_项目立项报告.md
│  ├─ 05_SWOT分析报告.md
│  └─ <span class="own">N34_AI赋能边界分析.md 🍑 桃子独家</span>
├─ <span class="folder">02_P2_用户研究/</span>
│  ├─ 06_用户调研报告.md <span class="star">★</span>
│  ├─ 07_用户画像文档.md
│  ├─ 08_问卷设计与数据报告.md
│  ├─ 09_用户访谈记录与洞察报告.md
│  └─ 10_用户旅程地图.md
├─ <span class="folder">03_P3_产品规划/</span>
│  ├─ 11_PRD产品需求文档.md <span class="star">★</span>
│  ├─ 13_功能清单FeatureList.md
│  └─ （其他按需）
├─ <span class="folder">04_P4_设计体验/</span>
│  ├─ 17_交互原型文档.md
│  ├─ 18_UI设计规范DesignSystem.md
│  └─ 19_设计走查清单.md
├─ <span class="folder">05_P5_技术开发/</span>
│  ├─ 20_技术报告.md <span class="star">★</span>
│  ├─ 21_模型选型评估报告.md
│  └─ 22_API接口文档.md
├─ <span class="folder">07_demo/</span>
│  ├─ index.html <span class="own">[ 在线预览 ]</span>
│  └─ DESIGN.md
├─ 08_AUDIT_REPORT.md <span class="own">[ 8 层审批详情 ]</span>
├─ 09_VERSION_LOG.md
└─ 10_RETRO.md <span class="own">[ Prior Art / Anti-Pattern 回流 ]</span>`;
    folder.appendChild(tree);
    container.appendChild(folder);

    // CEO Gate 评分卡
    const gate = el('div', { className: 'prs-gate' });
    gate.appendChild(el('div', { className: 'prs-gate-title' }, '🚨 CEO Gate 1 决策书 · P1-P2 完成强制检查'));
    gate.appendChild(el('div', { className: 'prs-gate-score' }, '总分：' + SAMPLE.gate.total + ' / 500 · ✅ 通过 · 进 P3'));
    SAMPLE.gate.questions.forEach(({ q, score }) => {
      const qEl = el('div', { className: 'prs-gate-q' });
      qEl.appendChild(el('div', { className: 'prs-gate-q-text' }, q));
      qEl.appendChild(el('div', { className: 'prs-gate-q-score' }, score));
      gate.appendChild(qEl);
    });
    container.appendChild(gate);

    // 8 层审批链
    const audit = el('div', { className: 'prs-audit' });
    audit.appendChild(el('div', { className: 'prs-audit-title' }, '🛡 8 层审批链 · 全过（第 4 轮完成）'));
    const layers = el('div', { className: 'prs-layers' });
    [
      ['L1', '员工自检', '✅ 12/12 过'],
      ['L2', '同线 Peer', '✅ 全过'],
      ['L3', '4 总监', '✅ 并发'],
      ['L4', 'QA 一致性', '✅ Demo-PRD 双向通'],
      ['L5', '反指标监控', '✅ ≥ 2 counter'],
      ['L6', '3 法合规', '⚠ 未成年专项'],
      ['L7', '数据真伪', '✅ 10 白名单'],
      ['L8', 'CEO 终审', '✅ 5 终问答']
    ].forEach(([n, name, s], i) => {
      const lay = el('div', { className: 'prs-layer' + (i === 5 ? ' warn' : '') });
      lay.appendChild(el('div', { className: 'prs-layer-num' }, n));
      lay.appendChild(el('div', { className: 'prs-layer-name' }, name));
      lay.appendChild(el('div', { className: 'prs-layer-status' }, s));
      layers.appendChild(lay);
    });
    audit.appendChild(layers);
    container.appendChild(audit);

    // RETRO 回流
    const retro = el('div', { className: 'prs-retro' });
    retro.appendChild(el('div', { className: 'prs-retro-title' }, '🔁 RETRO 回流 · 下次更聪明'));

    const prior = el('div', { className: 'prs-retro-col prior' });
    prior.appendChild(el('h4', {}, '✅ 成功模式 → Prior Art'));
    prior.appendChild(el('p', {}, 'N34 AI 边界一次通过：AI 训练师先单独跑 · 4 标签填满 · 产品总监 + 技术总监联审仅补 1 项 · 节省 5 min 返工。可复用 · 已入 prior_art/ai_boundary/'));
    retro.appendChild(prior);

    const anti = el('div', { className: 'prs-retro-col anti' });
    anti.appendChild(el('h4', {}, '❌ 失败教训 → Anti-Pattern'));
    anti.appendChild(el('p', {}, 'N11 PRD 第 1 轮反指标只写 1 个被 L5 打回。原因：PM prompt 的 Self-Check 未明确"≥ 2 个"。已升级 PM prompt v1.1 · 回归测试通过率 85% → 92%。'));
    retro.appendChild(anti);

    container.appendChild(retro);

    section.appendChild(container);
    mount.appendChild(section);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
