/* =========================================================
 * Peach Studio · team.html v1.1 42 员工组织展示 v1.0
 * =========================================================
 * 日期：2026-04-23
 * 挂载点：<section id="peach-team-v11"></section>
 * 数据源：agents/*.md（硬编码清单 · 和实际 prompt 文件对齐）
 * ========================================================= */

(function() {
  'use strict';

  const STYLE = `
    .ptv-section { padding: 60px 0; background: linear-gradient(180deg, var(--paper-light, #f4ede0), var(--paper, #faf5ea)); border-top: 2px solid var(--paper-dark, #e8dfd0); }
    .ptv-container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
    .ptv-header { text-align: center; margin-bottom: 40px; }
    .ptv-hand { font-family: var(--font-hand, 'Caveat', cursive); color: var(--peach, #d16a4e); font-size: 16px; letter-spacing: 2px; }
    .ptv-title { font-family: var(--font-serif, 'Instrument Serif', serif); font-size: 44px; color: var(--ink-deep, #2a2520); margin: 8px 0; }
    .ptv-title .it { font-style: italic; color: var(--peach, #d16a4e); }
    .ptv-sub { font-family: var(--font-serif); font-style: italic; color: var(--ink-soft); font-size: 17px; max-width: 680px; margin: 0 auto; line-height: 1.6; }
    .ptv-stats { display: flex; justify-content: center; gap: 32px; margin: 24px 0; flex-wrap: wrap; }
    .ptv-stat { text-align: center; }
    .ptv-stat-num { font-family: var(--font-serif); font-size: 36px; color: var(--peach, #d16a4e); line-height: 1; }
    .ptv-stat-label { font-size: 12px; color: var(--ink-faint, #8a8278); margin-top: 4px; }

    .ptv-layer { margin-bottom: 40px; }
    .ptv-layer-title {
      font-family: var(--font-serif); font-size: 28px; color: var(--ink-deep);
      padding: 10px 20px;
      background: linear-gradient(90deg, rgba(209,106,78,0.08), transparent);
      border-left: 4px solid var(--peach, #d16a4e);
      margin-bottom: 20px;
      display: flex; justify-content: space-between; align-items: baseline;
    }
    .ptv-layer-count { font-family: var(--font-hand); color: var(--peach, #d16a4e); font-size: 18px; }

    .ptv-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 16px;
    }
    .ptv-card {
      background: white; border: 1.5px solid var(--paper-dark, #e8dfd0);
      border-radius: 14px; padding: 18px;
      transition: all 0.2s;
      position: relative;
    }
    .ptv-card:nth-child(3n+1) { transform: rotate(-0.5deg); }
    .ptv-card:nth-child(3n) { transform: rotate(0.5deg); }
    .ptv-card:hover {
      border-color: var(--peach, #d16a4e);
      box-shadow: 0 6px 20px rgba(209,106,78,0.1);
      transform: translateY(-2px) rotate(0);
    }
    .ptv-card.new { background: linear-gradient(135deg, rgba(209,106,78,0.04), rgba(154,168,137,0.04)); }
    .ptv-card-emoji { font-size: 28px; margin-bottom: 8px; }
    .ptv-card-name { font-family: var(--font-serif); font-size: 17px; color: var(--ink-deep); margin-bottom: 4px; }
    .ptv-card-no { font-size: 11px; color: var(--ink-faint); font-family: var(--font-mono, monospace); margin-bottom: 8px; }
    .ptv-card-duty { font-size: 12px; color: var(--ink-soft); line-height: 1.6; }
    .ptv-card-new-tag { position: absolute; top: -6px; right: 12px; background: var(--peach, #d16a4e); color: white; font-family: var(--font-hand); font-size: 12px; padding: 1px 8px; border-radius: 8px; }

    .ptv-industry-pool { background: white; border: 2px dashed var(--warm-tan, #c9a878); border-radius: 16px; padding: 28px; margin-top: 40px; }
    .ptv-industry-title { font-family: var(--font-serif); font-size: 24px; color: var(--ink-deep); margin-bottom: 8px; }
    .ptv-industry-sub { font-size: 14px; color: var(--ink-soft); margin-bottom: 20px; }
    .ptv-industry-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
    .ptv-industry-item { padding: 10px 14px; background: var(--paper, #faf5ea); border-radius: 10px; font-size: 13px; color: var(--ink-soft); }
    .ptv-industry-item strong { color: var(--ink-deep); display: block; font-size: 13px; margin-bottom: 2px; }
    .ptv-industry-item span { font-size: 11px; color: var(--ink-faint); }

    @media (max-width: 768px) {
      .ptv-title { font-size: 32px; }
      .ptv-stats { gap: 20px; }
    }
  `;

  const TEAM_DATA = {
    stats: [
      { num: '41', label: '常驻员工' },
      { num: '8', label: '审批层级' },
      { num: '200', label: '行业细分专家池' },
      { num: '34', label: '可调度节点' }
    ],
    layers: [
      {
        name: '🏢 决策层',
        count: '5 位',
        agents: [
          { no: '00', emoji: '👑', name: 'CEO', duty: '接单路由 + Task Manifest + CEO Gate + L8 终审', new: false },
          { no: '00', emoji: '⚡', name: '快速 CEO', duty: '闪电档 2 分钟三件套专用 · 走老板亲笔 Brief 模板', new: false },
          { no: '—', emoji: '🎯', name: '战略分析师', duty: 'N03 BP · N04 立项 · N05 SWOT · Gate 5 问辅助', new: true },
          { no: '—', emoji: '📐', name: '首席方法论官', duty: 'VELA + 10 铁律守门 · RETRO 入库判定', new: true },
          { no: '—', emoji: '🤖', name: 'Jarvis（独立项目）', duty: '对外接待 · 面试官第一触点', new: false }
        ]
      },
      {
        name: '👔 总监层 · L3 并发审',
        count: '4 位',
        agents: [
          { no: '11', emoji: '📋', name: '产品总监', duty: 'P1+P2+P3 + N28+N31 · 三阶段评审专长', new: false },
          { no: '12', emoji: '🔧', name: '技术总监', duty: 'P5 + N34 AI 边界联审 + 模型选型合规红线', new: false },
          { no: '13', emoji: '🎨', name: '设计总监', duty: 'P4 + N35 视觉审 · Editorial 守门 · 5 禁区', new: false },
          { no: '14', emoji: '📈', name: '增长运营总监', duty: 'P6 + N16 + N24 · AARRR + 反指标质量', new: false }
        ]
      },
      {
        name: '🛡 质量守门 · 桃子独创',
        count: '4 位',
        agents: [
          { no: '—', emoji: '🛡', name: 'QA 一致性审查员', duty: 'L4 · PRD↔技术↔UI↔Demo 四方对齐 · 双向反查', new: true },
          { no: '—', emoji: '🚦', name: '反指标监控员', duty: 'L5 · 每文档 ≥ 2 counter-metrics · 5 级 Rubric', new: true },
          { no: '—', emoji: '✍️', name: '语言润色师', duty: '辅助 · 口语/大厂/投标 3 模式 + PPT 禁词表', new: true },
          { no: '—', emoji: '🔖', name: '版本管理员', duty: 'L8 后 · semver + RETRO + Obsidian 回流', new: true }
        ]
      },
      {
        name: '📝 产品线',
        count: '5 位',
        agents: [
          { no: '01', emoji: '🧑‍🎤', name: 'PM · 通用', duty: 'N11 PRD 主笔 · 11 节点覆盖 · PRD 四铁律', new: false },
          { no: '—', emoji: '🏭', name: 'PM · 行业向', duty: '20 细分调度 + 6 维壁垒分析', new: true },
          { no: '—', emoji: '🔍', name: '需求分析师', duty: 'N00 接单 · JTBD 5 元素 + 5 Whys + 真伪痛点', new: true },
          { no: '—', emoji: '👥', name: '用户研究员', duty: 'N06-N10 · 3 画像 60/30/10 + 旅程情绪曲线', new: true },
          { no: '—', emoji: '📊', name: '数据 PM', duty: 'N16 指标体系 + N24 埋点 · 三层指标 + AARRR', new: true }
        ]
      },
      {
        name: '🧠 AI 研发线 · 喂 7 师父笔记',
        count: '6 位',
        agents: [
          { no: '03', emoji: '⚙️', name: '算法工程师', duty: '训不训决策树 · SFT/LoRA/DPO/RLHF 全栈', new: false },
          { no: '04', emoji: '🧠', name: 'AI 训练师', duty: 'N34 AI 边界主笔 · sop 10 份产出', new: false },
          { no: '—', emoji: '🎯', name: 'Prompt 工程师', duty: '清华姐独家 · 10 模式 + 测试集', new: true },
          { no: '—', emoji: '📚', name: 'RAG 工程师', duty: 'RAG 四决策门 + Hybrid 检索', new: true },
          { no: '—', emoji: '🤖', name: 'Agent 编排工程师', duty: 'LangGraph 5 编排模式 + 熔断', new: true },
          { no: '—', emoji: '📊', name: '模型评测专家', duty: '7 师 5 课 · 8 维评测 + BadCase 库', new: true }
        ]
      },
      {
        name: '🎨 设计线 · 风格矩阵',
        count: '4 + N（矩阵扩展）',
        agents: [
          { no: '—', emoji: '🎨', name: 'UX 设计师', duty: 'N17 原型 · IA 3 层 + 流程 3 步 + 5 态', new: true },
          { no: '08', emoji: '🎭', name: 'Figma 设计师', duty: 'N18 DS · tokens + 10 组件 + shadcn 对齐', new: false },
          { no: '—', emoji: '✨', name: '动效设计师', duty: 'Framer Motion 参数级 · 3-5 Wow · a11y', new: true },
          { no: '—', emoji: '🎭', name: '品牌插画师', duty: 'Logo 4 原则 + 吉祥物 5 表情 + 品牌指南', new: true },
          { no: '—', emoji: '✨', name: '设计师 · Editorial', duty: '风格矩阵样本 · Paper/Peach/Sage + 手绘', new: true }
        ]
      },
      {
        name: '🛠 工程线',
        count: '5 位',
        agents: [
          { no: '—', emoji: '🛠', name: '全栈工程师', duty: 'N35 Demo 主力 · Next.js + Tailwind + Framer', new: true },
          { no: '06', emoji: '💻', name: '前端工程师', duty: 'React/Next · TypeScript strict · Core Web Vitals', new: false },
          { no: '05', emoji: '⚙️', name: '后端工程师', duty: 'N22 API + N23 DB · OpenAPI + 范式 + 索引', new: false },
          { no: '—', emoji: '🚀', name: 'DevOps 工程师', duty: 'N27 上线 · 国内云 + 灰度 5 档 + 回滚 5min', new: true },
          { no: '28', emoji: '🧪', name: '测试工程师', duty: 'N25 + AI 评测集 100+ + BadCase 库', new: false }
        ]
      },
      {
        name: '📊 数据运营线',
        count: '4 位',
        agents: [
          { no: '07', emoji: '📉', name: '数据分析师', duty: 'N33 周报 · 异动归因 4 象限 · AB 严谨', new: false },
          { no: '—', emoji: '📊', name: 'BI 看板工程师', duty: '4 层看板 + 5 原则 + 告警接入', new: true },
          { no: '—', emoji: '✏️', name: '内容运营', duty: 'N29 + N30 · 平台化 + AIDA + 爆款 5 公式', new: true },
          { no: '—', emoji: '📱', name: 'ASO 运营', duty: 'N30 · 关键词 3 维 + 截图 6 黄金', new: true }
        ]
      },
      {
        name: '⚖️ 商务合规线',
        count: '3 位',
        agents: [
          { no: '15', emoji: '🤝', name: '客户成功', duty: 'N26 + Aha 时刻 + Onboarding 5 步 + FAQ 20+', new: false },
          { no: '16', emoji: '📜', name: '商务法务', duty: '10 核心条款 + AI 产出归属 + 风险评估', new: false },
          { no: '—', emoji: '🔒', name: '合规隐私专员', duty: 'L6 · 3 法 8 维度 + 模型选型红线', new: true }
        ]
      }
    ],
    industries: [
      { name: '医疗', sub: '10 细分（三甲/互联网/器械/药研/中医/口腔/眼科等）' },
      { name: '金融', sub: '6（零售/对公/消金/财富/支付/跨境）' },
      { name: '教育', sub: '6（K12/高教/职培/语言/少儿/特教）' },
      { name: '电商', sub: '6（淘系/京东/拼多多/私域/直播/跨境）' },
      { name: '汽车', sub: '5（新势力/传统/后市场/二手/汽金）' },
      { name: '家装', sub: '5（硬装/软装/定制/旧改/工装）' },
      { name: '游戏', sub: '6（休闲/重度/二游/SLG/卡牌/小游戏）' },
      { name: '跨境', sub: '6（TikTok Shop/亚马逊/独立站等）' },
      { name: '短视频', sub: '按需' }, { name: '短剧', sub: '按需' },
      { name: '制造', sub: '按需' }, { name: '政企', sub: 'G 端严审' },
      { name: '内容', sub: '公众号/知乎/小红书' }, { name: '情感陪伴', sub: '古风/乙女' },
      { name: '企业 SaaS', sub: 'CRM/HR/OA' }, { name: '宠物', sub: '按需' },
      { name: '占卜', sub: '塔罗/八字' }, { name: '农业', sub: '按需' },
      { name: '新能源', sub: '光伏/储能' }, { name: '数字化', sub: '智慧城市' }
    ]
  };

  function el(tag, attrs, kids) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'className') e.className = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    if (kids) (Array.isArray(kids) ? kids : [kids]).forEach(c => {
      if (typeof c === 'string') e.appendChild(document.createTextNode(c));
      else if (c) e.appendChild(c);
    });
    return e;
  }

  function init() {
    const mount = document.getElementById('peach-team-v11');
    if (!mount) return;

    if (!document.getElementById('ptv-styles')) {
      const style = document.createElement('style');
      style.id = 'ptv-styles';
      style.textContent = STYLE;
      document.head.appendChild(style);
    }

    const section = el('section', { className: 'ptv-section' });
    const container = el('div', { className: 'ptv-container' });

    // Header
    const header = el('div', { className: 'ptv-header' });
    header.appendChild(el('div', { className: 'ptv-hand' }, 'Vol. 1 · Issue 1 · 2026-04-23'));
    const t = el('h2', { className: 'ptv-title' });
    t.innerHTML = '👥 桃子 42 员工 + 200 行业细分专家 · <span class="it">真一人公司</span>';
    header.appendChild(t);
    header.appendChild(el('p', { className: 'ptv-sub' },
      '不是"19 员工 + 20 专家" 的糊弄版 · v1.1 真实规模：5 层 41 常驻 + 200 行业池按需激活 · 每位按 VELA 8+1 段式建 · 8 层审批把关'));

    const stats = el('div', { className: 'ptv-stats' });
    TEAM_DATA.stats.forEach(s => {
      const stat = el('div', { className: 'ptv-stat' });
      stat.appendChild(el('div', { className: 'ptv-stat-num' }, s.num));
      stat.appendChild(el('div', { className: 'ptv-stat-label' }, s.label));
      stats.appendChild(stat);
    });
    header.appendChild(stats);
    container.appendChild(header);

    // 9 层组织
    TEAM_DATA.layers.forEach(layer => {
      const layerDiv = el('div', { className: 'ptv-layer' });
      const title = el('div', { className: 'ptv-layer-title' });
      title.appendChild(el('span', {}, layer.name));
      title.appendChild(el('span', { className: 'ptv-layer-count' }, layer.count));
      layerDiv.appendChild(title);

      const cards = el('div', { className: 'ptv-cards' });
      layer.agents.forEach(agent => {
        const card = el('div', { className: 'ptv-card' + (agent.new ? ' new' : '') });
        if (agent.new) card.appendChild(el('span', { className: 'ptv-card-new-tag' }, 'v1.1 新增'));
        card.appendChild(el('div', { className: 'ptv-card-emoji' }, agent.emoji));
        card.appendChild(el('div', { className: 'ptv-card-name' }, agent.name));
        card.appendChild(el('div', { className: 'ptv-card-no' }, '编号：' + agent.no));
        card.appendChild(el('div', { className: 'ptv-card-duty' }, agent.duty));
        cards.appendChild(card);
      });
      layerDiv.appendChild(cards);
      container.appendChild(layerDiv);
    });

    // 行业池
    const pool = el('div', { className: 'ptv-industry-pool' });
    pool.appendChild(el('div', { className: 'ptv-industry-title' }, '🏭 200 行业细分专家池 · 按需激活'));
    pool.appendChild(el('div', { className: 'ptv-industry-sub' },
      '20 一级行业 × 平均 10 细分 = 约 200 行业专家 · CEO 路由时自动调用对应细分 · 老板说"家装产品"→ 自动调家装·旧改专家'));
    const grid = el('div', { className: 'ptv-industry-grid' });
    TEAM_DATA.industries.forEach(ind => {
      const item = el('div', { className: 'ptv-industry-item' });
      item.appendChild(el('strong', {}, ind.name));
      item.appendChild(el('span', {}, ind.sub));
      grid.appendChild(item);
    });
    pool.appendChild(grid);
    container.appendChild(pool);

    section.appendChild(container);
    mount.appendChild(section);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
