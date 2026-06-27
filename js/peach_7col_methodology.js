/* =========================================================
 * Peach Studio · methodology.html 7 栏卡片渲染 v1.0
 * =========================================================
 * 日期：2026-04-23 · 阶段 4 前端界面升级
 * 依赖：window.VELA_DOCFORGE（vela_docforge_docs.js · 必先加载）
 * 挂载点：需在 methodology.html 加 <section id="peach-7col-v11-section"></section>
 * 铁律：命名锁死 · 视觉严守 Editorial · 不动现有 72 prompt 卡片
 * ========================================================= */

(function() {
  'use strict';

  // ============ 样式注入（Editorial 风 · 不学 SaaS）============
  const STYLE = `
    .p7c-section {
      padding: 60px 0;
      background: linear-gradient(180deg, var(--paper-light, #f4ede0) 0%, var(--paper, #faf5ea) 100%);
      border-top: 2px solid var(--paper-dark, #e8dfd0);
    }
    .p7c-container { max-width: 1240px; margin: 0 auto; padding: 0 24px; }
    .p7c-header { text-align: center; margin-bottom: 48px; }
    .p7c-masthead {
      font-family: var(--font-hand, 'Caveat', cursive);
      color: var(--peach, #d16a4e);
      font-size: 16px;
      letter-spacing: 2px;
      margin-bottom: 8px;
    }
    .p7c-title {
      font-family: var(--font-serif, 'Instrument Serif', serif);
      font-size: 44px;
      color: var(--ink-deep, #2a2520);
      margin: 8px 0 12px;
      line-height: 1.15;
    }
    .p7c-title .it { font-style: italic; color: var(--peach, #d16a4e); }
    .p7c-subtitle {
      font-family: var(--font-serif, 'Instrument Serif', serif);
      font-size: 17px;
      color: var(--ink-soft, #5a534a);
      font-style: italic;
      max-width: 680px;
      margin: 0 auto;
      line-height: 1.5;
    }
    .p7c-rule {
      display: block;
      width: 120px;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--warm-tan, #c9a878), transparent);
      margin: 24px auto;
    }

    .p7c-phase-nav {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
      margin-bottom: 32px;
    }
    .p7c-phase-btn {
      padding: 8px 16px;
      background: white;
      border: 1.5px solid var(--paper-dark, #e8dfd0);
      border-radius: 20px;
      cursor: pointer;
      font-family: inherit;
      font-size: 13px;
      color: var(--ink-soft, #5a534a);
      transition: all 0.2s;
    }
    .p7c-phase-btn:hover {
      border-color: var(--peach, #d16a4e);
      color: var(--peach, #d16a4e);
    }
    .p7c-phase-btn.active {
      background: var(--peach, #d16a4e);
      color: white;
      border-color: var(--peach, #d16a4e);
    }

    .p7c-phase-group { margin-bottom: 40px; }
    .p7c-phase-title {
      font-family: var(--font-serif, 'Instrument Serif', serif);
      font-size: 28px;
      color: var(--ink-deep, #2a2520);
      margin-bottom: 20px;
      padding-left: 16px;
      border-left: 4px solid var(--peach, #d16a4e);
    }

    .p7c-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 20px;
    }

    .p7c-card {
      background: white;
      border: 1.5px solid var(--paper-dark, #e8dfd0);
      border-radius: 14px;
      padding: 20px;
      transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
      cursor: pointer;
      position: relative;
    }
    .p7c-card:nth-child(3n) { transform: rotate(0.4deg); }
    .p7c-card:nth-child(3n+1) { transform: rotate(-0.5deg); }
    .p7c-card:hover {
      border-color: var(--peach, #d16a4e);
      box-shadow: 0 6px 24px rgba(209,106,78,0.12);
      transform: translateY(-2px) rotate(0);
    }
    .p7c-card.highlight {
      background: linear-gradient(135deg, rgba(209,106,78,0.04), rgba(154,168,137,0.04));
      border-color: rgba(209,106,78,0.3);
    }
    .p7c-card-badge {
      position: absolute;
      top: -8px;
      right: 16px;
      background: var(--peach, #d16a4e);
      color: white;
      font-size: 11px;
      padding: 2px 10px;
      border-radius: 10px;
      font-family: var(--font-hand, 'Caveat', cursive);
    }
    .p7c-card-no {
      font-family: var(--font-serif, 'Instrument Serif', serif);
      font-size: 12px;
      color: var(--ink-faint, #8a8278);
      letter-spacing: 2px;
      margin-bottom: 4px;
    }
    .p7c-card-name {
      font-family: var(--font-serif, 'Instrument Serif', serif);
      font-size: 20px;
      color: var(--ink-deep, #2a2520);
      margin-bottom: 12px;
      line-height: 1.3;
    }
    .p7c-card-cols {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 6px;
      margin-top: 12px;
    }
    .p7c-col-dot {
      aspect-ratio: 1;
      border-radius: 50%;
      background: var(--paper, #faf5ea);
      border: 1.5px solid var(--paper-dark, #e8dfd0);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      color: var(--ink-faint, #8a8278);
      transition: all 0.15s;
    }
    .p7c-col-dot.has {
      background: var(--peach, #d16a4e);
      border-color: var(--peach, #d16a4e);
      color: white;
    }
    .p7c-col-dot.peach-own {
      background: var(--sage-deep, #7a8868);
      border-color: var(--sage-deep, #7a8868);
      color: white;
    }

    /* 详情面板 */
    .p7c-detail {
      display: none;
      background: white;
      border: 2px solid var(--peach, #d16a4e);
      border-radius: 16px;
      padding: 28px;
      margin-top: 20px;
      position: relative;
    }
    .p7c-detail.open { display: block; animation: p7c-fade-in 0.3s ease-out; }
    @keyframes p7c-fade-in {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .p7c-detail-close {
      position: absolute; top: 16px; right: 16px;
      background: var(--paper, #faf5ea); border: none;
      width: 30px; height: 30px; border-radius: 50%;
      cursor: pointer; font-size: 16px;
    }
    .p7c-detail-close:hover { background: var(--paper-dark, #e8dfd0); }
    .p7c-detail-title {
      font-family: var(--font-serif, 'Instrument Serif', serif);
      font-size: 26px; color: var(--ink-deep, #2a2520);
      margin-bottom: 6px;
    }
    .p7c-detail-phase {
      font-family: var(--font-hand, 'Caveat', cursive);
      color: var(--peach, #d16a4e); font-size: 15px;
      margin-bottom: 20px;
    }
    .p7c-col {
      padding: 16px;
      background: var(--paper, #faf5ea);
      border-radius: 10px;
      margin-bottom: 12px;
    }
    .p7c-col-title {
      font-family: var(--font-serif, 'Instrument Serif', serif);
      font-size: 15px;
      color: var(--ink-deep, #2a2520);
      margin-bottom: 8px;
      display: flex; align-items: center; gap: 8px;
    }
    .p7c-col-items {
      display: flex; flex-wrap: wrap; gap: 6px;
    }
    .p7c-item-chip {
      padding: 4px 12px;
      background: white;
      border: 1px solid var(--paper-dark, #e8dfd0);
      border-radius: 14px;
      font-size: 12px;
      color: var(--ink-soft, #5a534a);
      text-decoration: none;
      transition: all 0.15s;
    }
    .p7c-item-chip:hover {
      border-color: var(--peach, #d16a4e);
      color: var(--peach, #d16a4e);
    }
    .p7c-model-tier-1 { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; border: none; }
    .p7c-model-tier-2 { background: #3b82f6; color: white; border: none; }
    .p7c-model-tier-3 { background: #9ca3af; color: white; border: none; }

    .p7c-peach-own {
      background: linear-gradient(135deg, rgba(209,106,78,0.08), rgba(154,168,137,0.08));
      border: 1.5px dashed var(--peach, #d16a4e);
    }
    .p7c-peach-own .p7c-col-title::after {
      content: ' · 桃子独家';
      font-family: var(--font-hand, 'Caveat', cursive);
      color: var(--peach, #d16a4e);
      font-size: 14px;
    }

    @media (max-width: 768px) {
      .p7c-title { font-size: 32px; }
      .p7c-cards { grid-template-columns: 1fr; }
    }
  `;

  // ============ 桃子独家数据（5 段增强 + 3 法合规 硬编码）============
  const PEACH_AUGMENT = {
    meta: [
      '5 类读者：老板 / 员工 / 审查员 / 面试官 / 客户',
      '审批链 8 层：L1 自检 → L8 CEO 终审',
      '黑话：档位 · Gate · N 节点 · L 层 · 真 PM 三步 · JTBD'
    ],
    priorArt: [
      'PEACH_MASTER_FLOW.md v1.1',
      'SOP_FLOW_BLUEPRINT.md',
      'ROUTING_RULES.md',
      'AUDIT_LOOP.md',
      'product-brief-模板（老板亲笔）'
    ],
    antiPattern: [
      '反指标 < 2 个（QA 打回）',
      'JTBD 5 元素瞎编',
      '档位识别错 · 审查形同虚设',
      '跳 CEO Gate 强行继续',
      'ABC 菜单问老板',
      '用 PPT 大词（赋能/闭环）',
      'B/G 端选外国模型'
    ],
    crossDoc: ['PRD ↔ 技术 ↔ UI ↔ Demo 四方对齐', '北极星 + 反指标跨节点一致', '功能列表完全映射'],
    rubric: ['L4 卓越：首次通过 · 触发 Prior Art 入库', 'L3 良好：1-2 处微调', 'L2 合格：基础过关', 'L1 不及格：打回重做']
  };

  const COMPLIANCE_3LAW = {
    cText: 'C 端：GPT/Claude/Gemini 可（脱敏 + 代理 + 告知）',
    bText: 'B 端：金融/医疗/军工 禁外国 · 其他可',
    gText: 'G 端：100% 禁外国 · 必须国产 + 信创 + 等保'
  };

  // ============ 工具函数 ============
  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'className') e.className = attrs[k];
      else if (k === 'onclick') e.onclick = attrs[k];
      else if (k === 'href') e.href = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach(c => {
        if (typeof c === 'string') e.appendChild(document.createTextNode(c));
        else if (c) e.appendChild(c);
      });
    }
    return e;
  }

  function cleanName(name) { return name.replace(/^\d{2}_/, ''); }

  // ============ 渲染卡片栅格 ============
  function renderCards(mountEl, phaseFilter) {
    if (!window.VELA_DOCFORGE || !window.VELA_DOCFORGE.docs) {
      mountEl.innerHTML = '<p style="text-align:center;color:#888;">VELA DocForge 数据未加载</p>';
      return;
    }

    mountEl.innerHTML = '';
    const phases = window.VELA_DOCFORGE.phases;
    const docs = window.VELA_DOCFORGE.docs;

    phases.forEach(phase => {
      if (phaseFilter !== 'all' && phaseFilter != phase.id) return;
      const phaseDocs = docs.filter(d => d.phase === phase.id);
      if (!phaseDocs.length) return;

      const group = el('div', { className: 'p7c-phase-group' });
      group.appendChild(el('h3', { className: 'p7c-phase-title' }, phase.name + ' · ' + phaseDocs.length + ' 份'));

      const cards = el('div', { className: 'p7c-cards' });
      phaseDocs.forEach(doc => {
        const card = el('div', {
          className: 'p7c-card' + (doc.highlight ? ' highlight' : ''),
          onclick: () => openDetail(doc)
        });
        if (doc.highlight) card.appendChild(el('span', { className: 'p7c-card-badge' }, '核心'));
        card.appendChild(el('div', { className: 'p7c-card-no' }, 'No. ' + doc.name.substring(0, 2)));
        card.appendChild(el('div', { className: 'p7c-card-name' }, cleanName(doc.name)));

        const cols = el('div', { className: 'p7c-card-cols' });
        ['模', '支', '源', '工', '型'].forEach((label, i) => {
          const dot = el('span', { className: 'p7c-col-dot has' }, label);
          cols.appendChild(dot);
        });
        ['🍑', '🔒'].forEach(emoji => {
          cols.appendChild(el('span', { className: 'p7c-col-dot peach-own' }, emoji));
        });
        card.appendChild(cols);
        cards.appendChild(card);
      });
      group.appendChild(cards);
      mountEl.appendChild(group);
    });
  }

  // ============ 渲染详情（7 栏展开）============
  function openDetail(doc) {
    const detailEl = document.getElementById('p7c-detail-mount');
    if (!detailEl) return;

    detailEl.innerHTML = '';
    detailEl.className = 'p7c-detail open';
    detailEl.appendChild(el('button', { className: 'p7c-detail-close', onclick: closeDetail }, '✕'));

    const phase = window.VELA_DOCFORGE.phases.find(p => p.id === doc.phase);
    detailEl.appendChild(el('div', { className: 'p7c-detail-title' }, cleanName(doc.name)));
    detailEl.appendChild(el('div', { className: 'p7c-detail-phase' }, phase.name));

    // 栏 1 · 通用模板（直接指向 VELA 原件软链 · 不包装）
    const col1 = el('div', { className: 'p7c-col' });
    col1.appendChild(el('div', { className: 'p7c-col-title' }, '1️⃣ 通用模板（VELA 原件 · 老板指定 · 直接用）'));
    // 把 DocForge 的路径前缀"模板/"改成桃子软链路径"prompts/vela/"
    const velaPath = 'prompts/vela/' + doc.tplFile.replace(/^模板\//, '');
    const tplChip = el('a', {
      className: 'p7c-item-chip',
      href: velaPath,
      target: '_blank'
    }, '📄 ' + cleanName(doc.name) + '.md（VELA 原件）');
    col1.appendChild(el('div', { className: 'p7c-col-items' }, tplChip));
    detailEl.appendChild(col1);

    // 栏 2 · 支撑文档
    const col2 = el('div', { className: 'p7c-col' });
    col2.appendChild(el('div', { className: 'p7c-col-title' }, '2️⃣ 补充支撑文档（' + (doc.support?.length || 0) + ' 份）'));
    const col2Items = el('div', { className: 'p7c-col-items' });
    (doc.support || []).forEach(s => {
      col2Items.appendChild(el('a', { className: 'p7c-item-chip', href: s.url, target: '_blank' }, s.name));
    });
    col2.appendChild(col2Items);
    detailEl.appendChild(col2);

    // 栏 3 · 数据源
    const col3 = el('div', { className: 'p7c-col' });
    col3.appendChild(el('div', { className: 'p7c-col-title' }, '3️⃣ 数据源白名单（' + (doc.sites?.length || 0) + ' 个）'));
    const col3Items = el('div', { className: 'p7c-col-items' });
    (doc.sites || []).forEach(s => {
      col3Items.appendChild(el('a', { className: 'p7c-item-chip', href: s.url, target: '_blank' }, '🌐 ' + s.name));
    });
    col3.appendChild(col3Items);
    detailEl.appendChild(col3);

    // 栏 4 · 工具
    const col4 = el('div', { className: 'p7c-col' });
    col4.appendChild(el('div', { className: 'p7c-col-title' }, '4️⃣ 推荐工具（' + (doc.tools?.length || 0) + ' 个）'));
    const col4Items = el('div', { className: 'p7c-col-items' });
    (doc.tools || []).forEach(t => {
      col4Items.appendChild(el('a', { className: 'p7c-item-chip', href: t.url, target: '_blank' }, '🛠 ' + t.name));
    });
    col4.appendChild(col4Items);
    detailEl.appendChild(col4);

    // 栏 5 · 推荐模型（tier 分级）
    const col5 = el('div', { className: 'p7c-col' });
    col5.appendChild(el('div', { className: 'p7c-col-title' }, '5️⃣ 推荐模型（3-tier 分级）'));
    const col5Items = el('div', { className: 'p7c-col-items' });
    const sortedModels = [...(doc.models || [])].sort((a, b) => a.tier - b.tier);
    sortedModels.forEach(m => {
      col5Items.appendChild(el('a', {
        className: 'p7c-item-chip p7c-model-tier-' + m.tier,
        href: m.url,
        target: '_blank'
      }, (m.tier === 1 ? '⭐ ' : '') + m.name + ' · tier-' + m.tier));
    });
    col5.appendChild(col5Items);
    detailEl.appendChild(col5);

    // 栏 6 · 🍑 桃子 5 段增强
    const col6 = el('div', { className: 'p7c-col p7c-peach-own' });
    col6.appendChild(el('div', { className: 'p7c-col-title' }, '6️⃣ 🍑 桃子 5 段增强'));
    const col6Content = el('div', {}, [
      el('p', { style: 'font-size:12px;color:#5a534a;margin-bottom:6px;' }, '所有 VELA 模板自动追加 · 扛大厂评审'),
      el('ul', { style: 'font-size:12px;color:#5a534a;margin-left:18px;line-height:1.8;' }, [
        el('li', {}, 'Meta Context · ' + PEACH_AUGMENT.meta.join(' / ')),
        el('li', {}, 'Prior Art · 先验阅读 ' + PEACH_AUGMENT.priorArt.length + ' 份'),
        el('li', {}, 'Anti-Pattern · ' + PEACH_AUGMENT.antiPattern.length + ' 条真打回'),
        el('li', {}, 'Cross-Doc · 对齐矩阵 PRD↔技术↔UI↔Demo'),
        el('li', {}, 'Evaluation Rubric · 4 级（L1-L4）')
      ])
    ]);
    col6.appendChild(col6Content);
    detailEl.appendChild(col6);

    // 栏 7 · 🔒 3 法合规
    const col7 = el('div', { className: 'p7c-col p7c-peach-own' });
    col7.appendChild(el('div', { className: 'p7c-col-title' }, '7️⃣ 🔒 3 法合规（按端触发）'));
    col7.appendChild(el('div', {}, [
      el('p', { style: 'font-size:12px;color:#5a534a;margin-bottom:6px;' }, 'GDPR + 个保法 + AI 办法 取严'),
      el('ul', { style: 'font-size:12px;color:#5a534a;margin-left:18px;line-height:1.8;' }, [
        el('li', {}, COMPLIANCE_3LAW.cText),
        el('li', {}, COMPLIANCE_3LAW.bText),
        el('li', {}, COMPLIANCE_3LAW.gText)
      ])
    ]));
    detailEl.appendChild(col7);

    detailEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function closeDetail() {
    const el = document.getElementById('p7c-detail-mount');
    if (el) {
      el.className = 'p7c-detail';
      el.innerHTML = '';
    }
  }

  // ============ 主渲染 ============
  function init() {
    const mountId = 'peach-7col-v11-section';
    const mountEl = document.getElementById(mountId);
    if (!mountEl) return;

    // 注入样式
    if (!document.getElementById('p7c-styles')) {
      const style = document.createElement('style');
      style.id = 'p7c-styles';
      style.textContent = STYLE;
      document.head.appendChild(style);
    }

    // 构建 DOM
    const section = el('section', { className: 'p7c-section' });
    const container = el('div', { className: 'p7c-container' });

    // Header
    const header = el('div', { className: 'p7c-header' });
    header.appendChild(el('div', { className: 'p7c-masthead' }, 'Vol. 1 · Issue 1 · 2026-04-23'));
    const title = el('h2', { className: 'p7c-title' });
    title.innerHTML = '📚 VELA 60 文档 × <span class="it">7 栏生产资源</span>';
    header.appendChild(title);
    header.appendChild(el('div', { className: 'p7c-rule' }));
    header.appendChild(el('p', { className: 'p7c-subtitle' },
      '每份 VELA 文档 · 配齐通用模板 + 支撑 + 数据源 + 工具 + 推荐模型 + 🍑 桃子 5 段增强 + 🔒 3 法合规 · 7 栏全家桶 · 复制粘贴即用'));
    container.appendChild(header);

    // 阶段导航
    const nav = el('div', { className: 'p7c-phase-nav' });
    const allBtn = el('button', {
      className: 'p7c-phase-btn active',
      'data-phase': 'all',
      onclick: (e) => switchPhase(e, 'all')
    }, '全部阶段 · ' + (window.VELA_DOCFORGE?.docs?.length || 0) + ' 份');
    nav.appendChild(allBtn);
    (window.VELA_DOCFORGE?.phases || []).forEach(p => {
      const btn = el('button', {
        className: 'p7c-phase-btn',
        'data-phase': p.id,
        onclick: (e) => switchPhase(e, p.id)
      }, p.name.replace(/^P\d\s/, 'P' + p.id + ' '));
      nav.appendChild(btn);
    });
    container.appendChild(nav);

    // 卡片挂载点
    const cardsMount = el('div', { id: 'p7c-cards-mount' });
    container.appendChild(cardsMount);

    // 详情挂载点
    container.appendChild(el('div', { id: 'p7c-detail-mount', className: 'p7c-detail' }));

    section.appendChild(container);
    mountEl.appendChild(section);

    renderCards(cardsMount, 'all');
  }

  function switchPhase(e, phase) {
    document.querySelectorAll('.p7c-phase-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    const mount = document.getElementById('p7c-cards-mount');
    if (mount) renderCards(mount, phase);
    closeDetail();
  }

  // 启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
