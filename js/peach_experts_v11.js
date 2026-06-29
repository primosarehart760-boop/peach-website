/**
 * Peach Studio · 专家团数据 + 交互逻辑
 * 42 员工 + 21 行业专家，按角色/行业/能力分类展示
 */

// ── 员工数据（来自 agents/ 目录）──
const EMPLOYEES = [
  // 决策层
  { id: 'ceo',       name: 'CEO',           emoji: '👑', dept: '决策层', tags: ['路由', '终审', 'Gate'],           desc: '接单路由 · Task Manifest · CEO Gate · 终审决策' },
  { id: 'fast-ceo',  name: '快速CEO',       emoji: '⚡', dept: '决策层', tags: ['闪电', '2分钟', 'Brief'],         desc: '闪电档 2 分钟三件套 · Product Brief + Design-Tech Brief + Demo' },
  { id: 'strategist',name: '战略分析师',     emoji: '🎯', dept: '决策层', tags: ['BP', 'SWOT', '立项'],            desc: 'BP/立项/SWOT/Gate 辅助 · 市场空间与竞品壁垒判断' },
  { id: 'cmo',       name: '首席方法论官',   emoji: '📐', dept: '决策层', tags: ['VELA', '铁律', '守门'],           desc: 'VELA + 铁律守门 · 确保所有产出符合方法论标准' },

  // 总监层
  { id: 'pd',  name: '产品总监',       emoji: '📋', dept: '总监层', tags: ['产品', '审查', 'L3'],  desc: 'P3 产品规划审查 · PRD/功能清单/路线图质量把关' },
  { id: 'td',  name: '技术总监',       emoji: '🔧', dept: '总监层', tags: ['技术', '架构', 'L3'],  desc: 'P5 技术方案审查 · 模型选型/API设计/安全合规' },
  { id: 'dd',  name: '设计总监',       emoji: '🎨', dept: '总监层', tags: ['设计', 'UI', 'L3'],    desc: 'P4 设计体验审查 · 交互原型/设计系统/走查' },
  { id: 'gd',  name: '增长运营总监',   emoji: '📈', dept: '总监层', tags: ['增长', '运营', 'L3'],  desc: 'P6 上线运营审查 · ASO/运营策略/商业化' },

  // 质量守门
  { id: 'qa',       name: 'QA一致性审查员', emoji: '🔍', dept: '质量守门', tags: ['QA', '一致性', 'L4'],  desc: '跨文档一致性审查 · Demo-文档双向追溯' },
  { id: 'counter',  name: '反指标监控员',   emoji: '⚠️', dept: '质量守门', tags: ['反指标', 'L5'],         desc: '每文档 ≥ 2 条反指标 · 防止盲目乐观' },
  { id: 'linguist', name: '语言润色师',     emoji: '✍️', dept: '质量守门', tags: ['润色', '表达'],          desc: '去 AI 味 · 口语化表达 · 符合老板风格' },
  { id: 'version',  name: '版本管理员',     emoji: '📦', dept: '质量守门', tags: ['版本', '归档', 'L8'],   desc: '变更日志 · 归档清单 · 版本控制' },

  // 产品线
  { id: 'pm',       name: 'PM（通用）',      emoji: '📝', dept: '产品线', tags: ['PRD', 'MVP', '路线图'],   desc: 'PRD 15 板块 · 功能清单 · MVP 方案 · 产品路线图' },
  { id: 'pm-ind',   name: 'PM（行业向）',    emoji: '🏢', dept: '产品线', tags: ['行业', '垂直'],           desc: '行业定制 PM · 结合行业专家深度分析' },
  { id: 'ra',       name: '需求分析师',      emoji: '🔬', dept: '产品线', tags: ['需求', '立项', 'SWOT'],   desc: '项目立项报告 · SWOT 分析 · 需求拆解' },
  { id: 'ur',       name: '用户研究员',      emoji: '👤', dept: '产品线', tags: ['用户', '画像', '旅程'],   desc: '用户调研 · 用户画像 · 用户旅程地图' },
  { id: 'dpm',      name: '数据PM',          emoji: '📊', dept: '产品线', tags: ['指标', '埋点', '数据'],   desc: '数据指标体系 · 埋点需求 · 北极星指标' },

  // AI 研发线
  { id: 'algo',     name: '算法工程师',      emoji: '🧮', dept: 'AI研发线', tags: ['模型', '选型', '评估'],  desc: '模型选型评估 · AI 选型需求单 · 技术可行性' },
  { id: 'trainer',  name: 'AI训练师',        emoji: '🎓', dept: 'AI研发线', tags: ['训练', '评测', '调优'],  desc: '评测集设计 · BadCase 分析 · Prompt 调优' },
  { id: 'prompter', name: 'Prompt工程师',    emoji: '💬', dept: 'AI研发线', tags: ['Prompt', '优化'],        desc: 'VELA 8+1 段式 · Prompt 工程 · 6 层设计' },
  { id: 'rag',      name: 'RAG工程师',       emoji: '🗄️', dept: 'AI研发线', tags: ['RAG', '知识库'],         desc: 'RAG 四项决策门 · 知识库架构 · 检索增强' },
  { id: 'agent-e',  name: 'Agent编排工程师', emoji: '🔗', dept: 'AI研发线', tags: ['Agent', '编排', '多Agent'], desc: '多 Agent 编排 · 工作流设计 · Handoff 机制' },
  { id: 'eval',     name: '模型评测专家',    emoji: '📏', dept: 'AI研发线', tags: ['评测', 'Benchmark'],     desc: '评测集 500 × 5 × 3 · 自动化测试 · 指标监控' },

  // 设计线
  { id: 'ux',       name: 'UX设计师',       emoji: '🖱️', dept: '设计线', tags: ['交互', '原型', 'UX'],     desc: '交互原型文档 · 用户流 · 信息架构' },
  { id: 'figma',    name: 'Figma设计师',    emoji: '🎨', dept: '设计线', tags: ['UI', '设计系统'],          desc: 'UI 设计规范 · Design System · Design Token' },
  { id: 'motion',   name: '动效设计师',     emoji: '✨', dept: '设计线', tags: ['动效', '微交互'],          desc: '动效规范 · 微交互设计 · 转场动画' },
  { id: 'brand',    name: '品牌插画师',     emoji: '🖼️', dept: '设计线', tags: ['插画', '品牌'],            desc: '品牌视觉 · 插画风格 · Excalidraw 手绘' },

  // 工程线
  { id: 'full',     name: '全栈工程师',     emoji: '🛠️', dept: '工程线', tags: ['全栈', '快速'],            desc: '快速原型 · 全栈实现 · Demo 开发' },
  { id: 'fe',       name: '前端工程师',     emoji: '🌐', dept: '工程线', tags: ['前端', 'HTML', 'CSS'],     desc: '前端开发 · 响应式 · 5 主题实时切换' },
  { id: 'be',       name: '后端工程师',     emoji: '⚙️', dept: '工程线', tags: ['后端', 'API', '数据库'],   desc: 'API 接口文档 · 数据库设计 · 技术报告' },
  { id: 'devops',   name: 'DevOps工程师',   emoji: '🚀', dept: '工程线', tags: ['部署', 'CI/CD'],           desc: '部署流程 · CI/CD · 监控告警' },
  { id: 'test',     name: '测试工程师',     emoji: '🧪', dept: '工程线', tags: ['测试', '用例', '回归'],    desc: '测试用例文档 · AI 评测报告 · 回归测试' },

  // 数据运营线
  { id: 'da',       name: '数据分析师',     emoji: '📉', dept: '数据运营线', tags: ['分析', '报告'],         desc: '数据分析周报月报 · 业务洞察' },
  { id: 'bi',       name: 'BI看板工程师',   emoji: '📊', dept: '数据运营线', tags: ['BI', '看板'],           desc: 'BI 看板设计 · 数据可视化' },
  { id: 'content',  name: '内容运营',       emoji: '📝', dept: '数据运营线', tags: ['内容', '运营'],         desc: '内容策略 · 分发运营 · 公众号/小红书' },
  { id: 'aso',      name: 'ASO运营',        emoji: '📱', dept: '数据运营线', tags: ['ASO', '应用商店'],      desc: 'ASO 材料 · 应用商店优化 · 上架策略' },

  // 商务合规线
  { id: 'cs',       name: '客户成功',       emoji: '🤝', dept: '商务合规线', tags: ['客户', '满意度'],       desc: '客户成功管理 · 续约 · NPS 提升' },
  { id: 'legal',    name: '商务法务',       emoji: '⚖️', dept: '商务合规线', tags: ['法务', '合同'],         desc: '商务合同 · 法律风险 · 知识产权' },
  { id: 'comply',   name: '合规隐私专员',   emoji: '🛡️', dept: '商务合规线', tags: ['合规', 'GDPR', '个保法'], desc: 'AI 合规与隐私文档 · 三法对照 · 等保' },
];

// ── 行业专家数据（来自 industry-experts/ 目录）──
const INDUSTRY_EXPERTS = [
  { id: 'general',  name: '通用平台专家',   emoji: '🌐', industry: '通用',     tags: ['平台', 'OS', '超级App'],         desc: '平台型产品 · 双边网络效应 · 工具→平台转型' },
  { id: 'medical',  name: '医疗专家',       emoji: '🏥', industry: '医疗',     tags: ['三甲', '互联网医疗', 'HIPAA'],   desc: 'AI 辅诊 · 医学影像 · 药物研发 · 健康管理' },
  { id: 'finance',  name: '金融专家',       emoji: '💰', industry: '金融',     tags: ['信贷', '风控', '反洗钱'],        desc: '智能信贷 · 风控模型 · 合规审查 · 支付' },
  { id: 'edu',      name: '教育专家',       emoji: '🎓', industry: '教育',     tags: ['K12', '职培', '在线'],           desc: 'AI 陪练 · 个性化学习 · 错题诊断 · 自适应' },
  { id: 'video',    name: '短视频专家',     emoji: '📱', industry: '短视频',   tags: ['推荐', '剪辑', '理解'],          desc: '推荐算法 · AI 剪辑 · 内容理解 · 创作者工具' },
  { id: 'drama',    name: '短剧专家',       emoji: '🎬', industry: '短剧',     tags: ['剧本', '生图', '配音'],          desc: 'AI 剧本生成 · 角色生图 · 智能配音 · 投放' },
  { id: 'ecom',     name: '电商专家',       emoji: '🛍️', industry: '电商',     tags: ['客服', '选品', '推荐'],          desc: 'AI 客服 · 智能选品 · 个性化推荐 · 价格优化' },
  { id: 'mfg',      name: '制造专家',       emoji: '🏭', industry: '制造',     tags: ['质检', 'MES', '预测'],           desc: 'AI 质检 · 预测性维护 · 产线优化 · 数字孪生' },
  { id: 'auto',     name: '汽车专家',       emoji: '🚗', industry: '汽车',     tags: ['座舱', '智驾', '车联'],          desc: '座舱大模型 · 智能驾驶 · 车联网 · OTA' },
  { id: 'gov',      name: '政企专家',       emoji: '🏛️', industry: '政企',     tags: ['政务', '信创', '等保'],          desc: '政务助手 · 合规审查 · 国产化 · 信创适配' },
  { id: 'home',     name: '家装专家',       emoji: '🏡', industry: '家装',     tags: ['设计', '效果图', '报价'],        desc: 'AI 设计 · 效果图生成 · 智能报价 · 材料推荐' },
  { id: 'media',    name: '内容专家',       emoji: '✍️', industry: '内容',     tags: ['创作', '选题', '分发'],          desc: 'AI 写作 · 选题推荐 · 多平台分发 · SEO/GEO' },
  { id: 'emotion',  name: '情感陪伴专家',   emoji: '💝', industry: '情感陪伴', tags: ['陪伴', '角色扮演', '付费'],      desc: '情感 AI · 角色人格 · 记忆系统 · 付费设计' },
  { id: 'game',     name: '游戏专家',       emoji: '🎮', industry: '游戏',     tags: ['NPC', '美术', 'UGC'],            desc: 'AI NPC · 智能美术 · UGC 工具 · 动态叙事' },
  { id: 'saas',     name: '企业SaaS专家',   emoji: '🏢', industry: '企业SaaS', tags: ['CRM', 'ERP', 'NRR'],            desc: '企业 SaaS · CRM/ERP · NRR > 110% · PLG' },
  { id: 'cross',    name: '跨境电商专家',   emoji: '🌍', industry: '跨境电商', tags: ['出海', '多语种', 'GDPR'],        desc: '跨境出海 · 多语种 · 合规 · 本地化运营' },
  { id: 'pet',      name: '宠物专家',       emoji: '🐾', industry: '宠物',     tags: ['问诊', '焦虑', '社区'],          desc: 'AI 问诊 · 新手焦虑解决 · 宠物社区' },
  { id: 'fortune',  name: '占卜专家',       emoji: '🔮', industry: '占卜',     tags: ['娱乐', '灰色', '付费'],          desc: '娱乐化定位 · 付费设计 · 合规边界' },
  { id: 'agri',     name: '农业专家',       emoji: '🌾', industry: '农业',     tags: ['乡村', '无人机', '精准'],        desc: '精准农业 · 无人机 · 乡村振兴 · G+B 端' },
  { id: 'energy',   name: '新能源专家',     emoji: '⚡', industry: '新能源',   tags: ['双碳', '储能', '光伏'],          desc: '双碳政策 · 储能管理 · 光伏优化 · 电力交易' },
  { id: 'digital',  name: '数字化项目专家', emoji: '🏗️', industry: '数字化',   tags: ['项目制', '集成', '咨询'],        desc: '大 B 项目 · 系统集成 · 数字化转型咨询' },
];

// ── 所有部门（用于筛选）──
const ALL_DEPTS = ['全部', '决策层', '总监层', '质量守门', '产品线', 'AI研发线', '设计线', '工程线', '数据运营线', '商务合规线'];

// ── 所有行业（用于筛选）──
const ALL_INDUSTRIES = ['全部', ...INDUSTRY_EXPERTS.map(e => e.industry)];

// ── 渲染逻辑 ──
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    renderFilters();
    renderExperts('全部', 'employee');
  });

  function renderFilters() {
    const tabBar = document.getElementById('expert-tabs');
    if (!tabBar) return;

    // 员工/行业 切换
    tabBar.innerHTML = `
      <button class="expert-tab active" data-type="employee">🏢 公司员工 <span class="count">${EMPLOYEES.length}</span></button>
      <button class="expert-tab" data-type="industry">🌍 行业专家 <span class="count">${INDUSTRY_EXPERTS.length}</span></button>
    `;

    tabBar.querySelectorAll('.expert-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        tabBar.querySelectorAll('.expert-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const type = btn.dataset.type;
        renderSubFilters(type);
        renderExperts('全部', type);
      });
    });

    renderSubFilters('employee');
  }

  function renderSubFilters(type) {
    const subBar = document.getElementById('expert-sub-filters');
    if (!subBar) return;

    const items = type === 'employee' ? ALL_DEPTS : ALL_INDUSTRIES;
    subBar.innerHTML = items.map((item, i) =>
      `<button class="sub-filter${i === 0 ? ' active' : ''}" data-filter="${item}">${item}</button>`
    ).join('');

    subBar.querySelectorAll('.sub-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        subBar.querySelectorAll('.sub-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderExperts(btn.dataset.filter, type);
      });
    });
  }

  function renderExperts(filter, type) {
    const grid = document.getElementById('expert-grid');
    if (!grid) return;

    let list;
    if (type === 'employee') {
      list = filter === '全部' ? EMPLOYEES : EMPLOYEES.filter(e => e.dept === filter);
    } else {
      list = filter === '全部' ? INDUSTRY_EXPERTS : INDUSTRY_EXPERTS.filter(e => e.industry === filter);
    }

    grid.innerHTML = list.map(expert => `
      <div class="expert-card" data-id="${expert.id}">
        <div class="expert-emoji">${expert.emoji}</div>
        <div class="expert-name">${expert.name}</div>
        <div class="expert-dept">${type === 'employee' ? expert.dept : expert.industry}</div>
        <div class="expert-desc">${expert.desc}</div>
        <div class="expert-tags">
          ${expert.tags.map(t => `<span class="expert-tag">${t}</span>`).join('')}
        </div>
      </div>
    `).join('');

    // 更新计数
    const countEl = document.getElementById('expert-count');
    if (countEl) countEl.textContent = `${list.length} 位专家`;
  }

  // 搜索
  window.searchExperts = function (query) {
    const grid = document.getElementById('expert-grid');
    if (!grid) return;

    const q = query.toLowerCase().trim();
    if (!q) {
      const activeTab = document.querySelector('.expert-tab.active');
      const type = activeTab?.dataset.type || 'employee';
      renderExperts('全部', type);
      return;
    }

    const allExperts = [...EMPLOYEES.map(e => ({ ...e, _type: 'employee' })), ...INDUSTRY_EXPERTS.map(e => ({ ...e, _type: 'industry' }))];
    const results = allExperts.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.desc.toLowerCase().includes(q) ||
      e.tags.some(t => t.toLowerCase().includes(q)) ||
      (e.dept || '').toLowerCase().includes(q) ||
      (e.industry || '').toLowerCase().includes(q)
    );

    grid.innerHTML = results.map(expert => `
      <div class="expert-card" data-id="${expert.id}">
        <div class="expert-emoji">${expert.emoji}</div>
        <div class="expert-name">${expert.name}</div>
        <div class="expert-dept">${expert._type === 'employee' ? expert.dept : expert.industry}</div>
        <div class="expert-desc">${expert.desc}</div>
        <div class="expert-tags">
          ${expert.tags.map(t => `<span class="expert-tag">${t}</span>`).join('')}
        </div>
      </div>
    `).join('');

    const countEl = document.getElementById('expert-count');
    if (countEl) countEl.textContent = `${results.length} 位专家`;
  };
})();
