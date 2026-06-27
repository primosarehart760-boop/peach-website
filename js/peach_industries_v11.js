/* =========================================================
 * Peach Studio · industries.html v1.1 行业库 v1.0
 * =========================================================
 * 挂载点：<section id="peach-industries-v11"></section>
 * 展示：20 一级行业 × 平均 10 细分 = 200 专家池
 * 2026-04-23
 * ========================================================= */

(function() {
  'use strict';

  const STYLE = `
    .pin-section { padding: 60px 0; background: linear-gradient(180deg, var(--paper-light, #f4ede0), var(--paper, #faf5ea)); border-top: 2px solid var(--paper-dark, #e8dfd0); }
    .pin-container { max-width: 1240px; margin: 0 auto; padding: 0 24px; }
    .pin-header { text-align: center; margin-bottom: 40px; }
    .pin-hand { font-family: var(--font-hand, 'Caveat', cursive); color: var(--peach, #d16a4e); font-size: 16px; letter-spacing: 2px; }
    .pin-title { font-family: var(--font-serif, 'Instrument Serif', serif); font-size: 40px; color: var(--ink-deep, #2a2520); margin: 8px 0; }
    .pin-title .it { font-style: italic; color: var(--peach, #d16a4e); }
    .pin-sub { font-family: var(--font-serif); font-style: italic; color: var(--ink-soft); max-width: 680px; margin: 0 auto; line-height: 1.6; }

    .pin-legend { display: flex; gap: 24px; justify-content: center; margin: 24px 0 32px; flex-wrap: wrap; font-size: 13px; }
    .pin-legend-item { display: flex; align-items: center; gap: 6px; color: var(--ink-soft); }
    .pin-legend-dot { width: 12px; height: 12px; border-radius: 50%; }

    .pin-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
    .pin-ind { background: white; border: 1.5px solid var(--paper-dark, #e8dfd0); border-radius: 14px; padding: 20px; transition: all 0.2s; }
    .pin-ind:nth-child(3n) { transform: rotate(0.4deg); }
    .pin-ind:nth-child(3n+1) { transform: rotate(-0.4deg); }
    .pin-ind:hover { border-color: var(--peach, #d16a4e); box-shadow: 0 6px 20px rgba(209,106,78,0.1); transform: translateY(-2px) rotate(0); }

    .pin-ind-head { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
    .pin-ind-emoji { font-size: 28px; }
    .pin-ind-name { font-family: var(--font-serif); font-size: 20px; color: var(--ink-deep); }
    .pin-ind-count { font-family: var(--font-hand); color: var(--peach, #d16a4e); font-size: 16px; margin-left: auto; }

    .pin-subs { display: flex; flex-wrap: wrap; gap: 6px; }
    .pin-sub-chip { padding: 4px 10px; background: var(--paper, #faf5ea); border-radius: 12px; font-size: 12px; color: var(--ink-soft); border: 1px solid var(--paper-dark, #e8dfd0); }
    .pin-sub-chip.done { background: linear-gradient(135deg, rgba(154,168,137,0.15), rgba(201,168,120,0.1)); border-color: var(--sage, #9aa889); color: var(--ink-deep); font-weight: 500; }
    .pin-sub-chip.pending { background: white; color: var(--ink-faint); border-style: dashed; }

    .pin-ind-note { font-size: 11px; color: var(--ink-faint); margin-top: 10px; font-style: italic; }

    .pin-sample { background: linear-gradient(135deg, rgba(209,106,78,0.04), rgba(154,168,137,0.04)); border: 2px dashed var(--sage, #9aa889); border-radius: 16px; padding: 28px; margin-top: 40px; }
    .pin-sample-title { font-family: var(--font-serif); font-size: 22px; color: var(--ink-deep); margin-bottom: 8px; }
    .pin-sample-sub { font-size: 14px; color: var(--ink-soft); margin-bottom: 16px; }
    .pin-sample-flow { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; align-items: center; gap: 12px; }
    .pin-sample-box { background: white; padding: 14px; border-radius: 10px; text-align: center; font-size: 13px; color: var(--ink-deep); }
    .pin-sample-arrow { font-size: 24px; color: var(--peach, #d16a4e); }

    @media (max-width: 768px) {
      .pin-grid { grid-template-columns: 1fr; }
      .pin-sample-flow { grid-template-columns: 1fr; }
    }
  `;

  const INDUSTRIES = [
    { e: '🏥', name: '医疗', count: 11, subs: [
      { n: '三甲医院 AI 医生工作站', d: 'done' }, { n: '互联网医疗', d: 'pending' },
      { n: '医疗器械（影像 IoT）', d: 'pending' }, { n: '医药研发', d: 'pending' },
      { n: '基层诊所', d: 'pending' }, { n: '中医辨证', d: 'pending' },
      { n: '口腔', d: 'pending' }, { n: '眼科', d: 'pending' },
      { n: '肿瘤精准', d: 'pending' }, { n: '体检', d: 'pending' }, { n: '医美', d: 'pending' }
    ], note: '已建 1 份 · 其他 10 份 P2 推进' },
    { e: '💰', name: '金融', count: 6, subs: [
      { n: '银行零售', d: 'pending' }, { n: '银行对公', d: 'pending' },
      { n: '消金信贷', d: 'done' }, { n: '财富管理', d: 'pending' },
      { n: '支付', d: 'pending' }, { n: '跨境', d: 'pending' }
    ], note: '已建 1 份（老板奇瑞汽金经验）· 其他 5 份 P2' },
    { e: '📚', name: '教育', count: 6, subs: [
      { n: 'K12', d: 'done' }, { n: '高教', d: 'pending' },
      { n: '职业培训', d: 'pending' }, { n: '语言学习', d: 'pending' },
      { n: '少儿启蒙', d: 'pending' }, { n: '特教', d: 'pending' }
    ], note: '已建 1 份（小桃学习 MVP）· 其他 5 份 P2' },
    { e: '🛒', name: '电商', count: 6, subs: [
      { n: '淘系', d: 'pending' }, { n: '京东系', d: 'pending' },
      { n: '拼多多系', d: 'pending' }, { n: '私域', d: 'pending' },
      { n: '直播电商', d: 'pending' }, { n: '跨境', d: 'pending' }
    ], note: '0/6 · P2 全推' },
    { e: '🚗', name: '汽车', count: 5, subs: [
      { n: '新势力', d: 'pending' }, { n: '传统主机厂', d: 'pending' },
      { n: '后市场', d: 'pending' }, { n: '二手车', d: 'pending' },
      { n: '汽金（信贷/租赁）', d: 'done' }
    ], note: '已建 1 份（老板奇瑞汽金主场）· 其他 4 份' },
    { e: '🏠', name: '家装', count: 5, subs: [
      { n: '硬装', d: 'pending' }, { n: '软装', d: 'pending' },
      { n: '定制柜', d: 'pending' }, { n: '旧改', d: 'pending' },
      { n: '工装', d: 'pending' }
    ], note: '0/5 · 有千达成面试经验可蒸馏' },
    { e: '🎮', name: '游戏', count: 6, subs: [
      { n: '休闲', d: 'pending' }, { n: '重度 MMO', d: 'pending' },
      { n: '二游', d: 'pending' }, { n: 'SLG', d: 'pending' },
      { n: '卡牌', d: 'pending' }, { n: '小游戏', d: 'pending' }
    ], note: '0/6' },
    { e: '🌍', name: '跨境', count: 6, subs: [
      { n: 'TikTok Shop', d: 'pending' }, { n: '亚马逊', d: 'pending' },
      { n: 'Shopee / Lazada', d: 'pending' }, { n: '独立站', d: 'pending' },
      { n: 'Temu', d: 'pending' }, { n: '海外 SaaS', d: 'pending' }
    ], note: '0/6' },
    { e: '📱', name: '短视频', count: 3, subs: [
      { n: '创作工具', d: 'pending' }, { n: '直播电商', d: 'pending' }, { n: '平台运营', d: 'pending' }
    ], note: '0/3' },
    { e: '🎬', name: '短剧', count: 3, subs: [
      { n: '剧本', d: 'pending' }, { n: '翻译', d: 'pending' }, { n: '分发', d: 'pending' }
    ], note: '0/3' },
    { e: '🏭', name: '制造', count: 4, subs: [
      { n: 'MES 工业', d: 'pending' }, { n: 'IoT 设备', d: 'pending' },
      { n: '智能产线', d: 'pending' }, { n: '质检', d: 'pending' }
    ], note: '0/4' },
    { e: '🏛', name: '政企', count: 5, subs: [
      { n: '政务门户', d: 'pending' }, { n: '智慧城市', d: 'pending' },
      { n: '党建', d: 'pending' }, { n: '税务', d: 'pending' }, { n: '国防', d: 'pending' }
    ], note: 'G 端严审 · 100% 国产模型 · 0/5' },
    { e: '✍️', name: '内容', count: 4, subs: [
      { n: '公众号 / 知乎', d: 'pending' }, { n: '小红书', d: 'pending' },
      { n: '播客', d: 'pending' }, { n: '自媒体 MCN', d: 'pending' }
    ], note: '0/4 · 老板小红书有积累可蒸馏' },
    { e: '💕', name: '情感陪伴', count: 4, subs: [
      { n: '古风（拾梦样本）', d: 'done' }, { n: '乙女向', d: 'pending' },
      { n: '通用虚拟人', d: 'pending' }, { n: '心理陪伴', d: 'pending' }
    ], note: '已 1（拾梦）· 其他 3 份' },
    { e: '💼', name: '企业 SaaS', count: 5, subs: [
      { n: 'CRM', d: 'pending' }, { n: 'HR', d: 'pending' },
      { n: 'OA 协同', d: 'pending' }, { n: 'ERP', d: 'pending' }, { n: '开发者工具', d: 'pending' }
    ], note: '0/5' },
    { e: '🐱', name: '宠物', count: 3, subs: [
      { n: '养宠助手', d: 'pending' }, { n: '宠物医疗', d: 'pending' }, { n: '宠物电商', d: 'pending' }
    ], note: '0/3' },
    { e: '🔮', name: '占卜', count: 3, subs: [
      { n: '塔罗', d: 'pending' }, { n: '星座', d: 'pending' }, { n: '八字 / 命理', d: 'pending' }
    ], note: '0/3' },
    { e: '🌾', name: '农业', count: 3, subs: [
      { n: '农产品', d: 'pending' }, { n: '农机 IoT', d: 'pending' }, { n: '种植 / 养殖', d: 'pending' }
    ], note: '0/3' },
    { e: '⚡', name: '新能源', count: 4, subs: [
      { n: '光伏', d: 'pending' }, { n: '储能', d: 'pending' },
      { n: '氢能', d: 'pending' }, { n: '碳中和', d: 'pending' }
    ], note: '0/4' },
    { e: '📊', name: '数字化项目', count: 3, subs: [
      { n: '数据中台', d: 'pending' }, { n: '数字孪生', d: 'pending' }, { n: '智慧园区', d: 'pending' }
    ], note: '0/3' }
  ];

  function el(tag, a, k) {
    const e = document.createElement(tag);
    if (a) for (const key in a) { if (key === 'className') e.className = a[key]; else e.setAttribute(key, a[key]); }
    if (k) (Array.isArray(k) ? k : [k]).forEach(c => { if (typeof c === 'string') e.appendChild(document.createTextNode(c)); else if (c) e.appendChild(c); });
    return e;
  }

  function init() {
    const mount = document.getElementById('peach-industries-v11');
    if (!mount) return;
    if (!document.getElementById('pin-styles')) {
      const s = document.createElement('style'); s.id = 'pin-styles'; s.textContent = STYLE; document.head.appendChild(s);
    }

    const totalSubs = INDUSTRIES.reduce((sum, i) => sum + i.count, 0);
    const doneSubs = INDUSTRIES.reduce((sum, i) => sum + i.subs.filter(s => s.d === 'done').length, 0);

    const section = el('section', { className: 'pin-section' });
    const c = el('div', { className: 'pin-container' });

    const h = el('div', { className: 'pin-header' });
    h.appendChild(el('div', { className: 'pin-hand' }, '行业细分专家池 · v1.1'));
    const t = el('h2', { className: 'pin-title' });
    t.innerHTML = `🏭 20 一级行业 × ${totalSubs} 细分 · <span class="it">${doneSubs} 份已建 · ${totalSubs - doneSubs} 份待补</span>`;
    h.appendChild(t);
    h.appendChild(el('p', { className: 'pin-sub' }, '老板说"医疗产品"→ 调三甲医生工作站。老板说"家装"→ 调家装旧改细分。桃子不是 "通用 AI 医生" · 是行业细分专家池 · 每细分一份 prompt'));

    const legend = el('div', { className: 'pin-legend' });
    const d1 = el('div', { className: 'pin-legend-item' });
    d1.appendChild(el('span', { className: 'pin-legend-dot', style: 'background: var(--sage, #9aa889);' }));
    d1.appendChild(el('span', {}, '已建'));
    legend.appendChild(d1);
    const d2 = el('div', { className: 'pin-legend-item' });
    d2.appendChild(el('span', { className: 'pin-legend-dot', style: 'background: white; border: 1.5px dashed var(--paper-dark);' }));
    d2.appendChild(el('span', {}, '待补（P2）'));
    legend.appendChild(d2);
    h.appendChild(legend);

    c.appendChild(h);

    // 20 行业网格
    const grid = el('div', { className: 'pin-grid' });
    INDUSTRIES.forEach(ind => {
      const card = el('div', { className: 'pin-ind' });
      const head = el('div', { className: 'pin-ind-head' });
      head.appendChild(el('div', { className: 'pin-ind-emoji' }, ind.e));
      head.appendChild(el('div', { className: 'pin-ind-name' }, ind.name));
      head.appendChild(el('div', { className: 'pin-ind-count' }, ind.count + ' 细分'));
      card.appendChild(head);

      const subsDiv = el('div', { className: 'pin-subs' });
      ind.subs.forEach(s => {
        subsDiv.appendChild(el('span', { className: 'pin-sub-chip ' + s.d }, s.n));
      });
      card.appendChild(subsDiv);
      card.appendChild(el('div', { className: 'pin-ind-note' }, ind.note));
      grid.appendChild(card);
    });
    c.appendChild(grid);

    // 触发示例
    const sample = el('div', { className: 'pin-sample' });
    sample.appendChild(el('div', { className: 'pin-sample-title' }, '🎯 触发示例 · CEO 自动路由'));
    sample.appendChild(el('div', { className: 'pin-sample-sub' }, '老板输入 → CEO 识别一级行业 + 细分 → 调对应专家 prompt'));
    const flow = el('div', { className: 'pin-sample-flow' });
    flow.appendChild(el('div', { className: 'pin-sample-box' }, '老板说：<br>"做个家装旧改 AI 助手"'));
    flow.appendChild(el('div', { className: 'pin-sample-arrow' }, '→'));
    flow.appendChild(el('div', { className: 'pin-sample-box' }, 'CEO 识别：<br>行业 = 家装 · 细分 = 旧改'));
    flow.appendChild(el('div', { className: 'pin-sample-arrow' }, '→'));
    flow.appendChild(el('div', { className: 'pin-sample-box' }, '自动调：<br>agents/家装_旧改专家.md'));
    sample.appendChild(flow);
    c.appendChild(sample);

    section.appendChild(c); mount.appendChild(section);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
