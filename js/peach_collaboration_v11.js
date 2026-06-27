/* =========================================================
 * Peach Studio · 42 员工全链路 Handoff 可视化 v2.0
 * =========================================================
 * 挂载点：<section id="peach-collaboration-v11"></section>
 * 功能：42 员工网格 · YAML Handoff Contract 查看器 · 8 层审批链 · 任务流动画
 * 2026-04-26
 * ========================================================= */

(function () {
  'use strict';

  /* ── 1. 员工数据（Handoff Contract 格式） ─────────────── */
  const DEPTS = [
    {
      id: 'ceo', label: '决策层', color: '#d16a4e', bg: '#fff5ef',
      members: [
        { id: 'ceo', name: 'CEO 分诊官', emoji: '👑', role: '接单路由 · Task Manifest · 终审',
          inputs: ['用户自然语言需求', '行业标签', '档位参数'],
          outputs: ['Task Manifest', 'AUDIT_REPORT', '交付包'],
          gate_out: '启动所有阶段', downstream: ['产品总监', '技术总监', '设计总监', '增长运营总监'],
          triggers_back: ['任何 L3+ 总监打回'] },
        { id: 'fast_ceo', name: '快速 CEO', emoji: '⚡', role: '闪电档 2 分钟三件套',
          inputs: ['需求一句话', '行业'],
          outputs: ['Product Brief', 'Design-Tech Brief', 'HTML Demo'],
          gate_out: '闪电交付', downstream: ['直接交付老板'],
          triggers_back: [] },
        { id: 'strategist', name: '战略分析师', emoji: '🧭', role: 'BP · SWOT · Gate 辅助',
          inputs: ['市场数据', '竞品信息'],
          outputs: ['BP 商业计划书', 'SWOT 分析报告', 'BRD', 'MRD'],
          gate_out: 'CEO Gate 1', downstream: ['产品总监', 'PM'],
          triggers_back: ['市场数据不足→重新调研'] },
        { id: 'cmo', name: '首席方法论官', emoji: '📐', role: 'VELA 铁律守门',
          inputs: ['所有产出文档'],
          outputs: ['合规标记', '格式审查报告'],
          gate_out: 'L4 QA', downstream: ['QA一致性审查员'],
          triggers_back: ['段式不完整→员工返工'] },
      ]
    },
    {
      id: 'director', label: '总监层', color: '#7a8868', bg: '#f0faf2',
      members: [
        { id: 'pm_dir', name: '产品总监', emoji: '👩‍💼', role: 'L3 并发审 · 产品策略把关',
          inputs: ['PRD', '路线图', '功能清单', 'IA'],
          outputs: ['L3 审查意见', '优先级决策'],
          gate_out: 'L3 通过→L4', downstream: ['QA一致性审查员'],
          triggers_back: ['PRD 缺失章节→PM 返工', '反指标不够→PM 补充'] },
        { id: 'tech_dir', name: '技术总监', emoji: '👨‍💻', role: 'L3 并发审 · 技术可行性',
          inputs: ['技术方案', '模型选型', 'API 设计', 'AI 边界分析'],
          outputs: ['技术可行性报告', 'N34 审查意见'],
          gate_out: 'L3 通过→L4', downstream: ['QA一致性审查员'],
          triggers_back: ['模型选型不合规→算法工程师重选', 'AI 边界模糊→训练师重做'] },
        { id: 'design_dir', name: '设计总监', emoji: '🎨', role: 'L3 并发审 · 视觉体验',
          inputs: ['UI 设计规范', '交互原型', 'Demo HTML'],
          outputs: ['设计走查报告', 'Editorial 合规标记'],
          gate_out: 'L3 通过→L4', downstream: ['QA一致性审查员'],
          triggers_back: ['违反 Editorial 规范→设计师重做', 'Demo 按钮死→前端返工'] },
        { id: 'growth_dir', name: '增长运营总监', emoji: '🌱', role: 'L3 并发审 · 增长策略',
          inputs: ['数据指标体系', '运营策略', '上线 Checklist'],
          outputs: ['增长可行性意见', '指标合理性判断'],
          gate_out: 'L3 通过→L4', downstream: ['QA一致性审查员'],
          triggers_back: ['北极星指标偏离→数据PM重做'] },
      ]
    },
    {
      id: 'qa', label: '质量守门', color: '#c9a878', bg: '#faf3e7',
      members: [
        { id: 'qa_checker', name: 'QA 一致性审查员', emoji: '🔍', role: 'L4 四方交叉对比',
          inputs: ['PRD', '技术方案', 'UI 规范', 'Demo HTML'],
          outputs: ['一致性审查报告', '交叉矛盾清单'],
          gate_out: 'L4 通过→L5', downstream: ['反指标监控员'],
          triggers_back: ['PRD↔Demo 不一致→相关员工同时返工'] },
        { id: 'anti_metric', name: '反指标监控员', emoji: '📊', role: 'L5 每文档 ≥2 反指标',
          inputs: ['所有产出文档'],
          outputs: ['反指标审查报告', '5 级 Rubric 打分'],
          gate_out: 'L5 通过→L6', downstream: ['合规隐私专员'],
          triggers_back: ['反指标缺失→原员工补充'] },
        { id: 'writer', name: '语言润色师', emoji: '✍️', role: '辅助 · 禁用词检查',
          inputs: ['所有对外文档'],
          outputs: ['润色版本', '禁用词报告'],
          gate_out: '辅助交付', downstream: ['版本管理员'],
          triggers_back: [] },
        { id: 'version_mgr', name: '版本管理员', emoji: '📋', role: 'L8 后归档',
          inputs: ['所有已审批交付物'],
          outputs: ['VERSION_LOG', '归档清单', 'CHANGELOG'],
          gate_out: '归档完成', downstream: ['老板'],
          triggers_back: [] },
      ]
    },
    {
      id: 'product', label: '产品线', color: '#d16a4e', bg: '#fff5ef',
      members: [
        { id: 'pm', name: 'PM · 通用', emoji: '🧑‍🎤', role: 'PRD · 路线图 · 功能清单',
          inputs: ['CEO Task Manifest', '竞品数据', '用户研究报告'],
          outputs: ['PRD (15 板块)', '产品路线图', '功能清单 FeatureList', 'IA', '业务流程图', '数据指标体系'],
          gate_out: 'L1 自检→产品总监 L3', downstream: ['产品总监', 'UX设计师', '数据PM'],
          triggers_back: ['设计总监: UI 与 PRD 矛盾→回修'] },
        { id: 'pm_industry', name: 'PM · 行业向', emoji: '🏭', role: '行业定制 PRD',
          inputs: ['行业专家知识包', '通用 PM 产出'],
          outputs: ['行业定制 PRD', '行业 KPI 体系'],
          gate_out: 'L1→产品总监', downstream: ['产品总监'],
          triggers_back: [] },
        { id: 'req_analyst', name: '需求分析师', emoji: '🔎', role: '三步分析 · 痛点拆解',
          inputs: ['用户自然语言需求'],
          outputs: ['需求分析报告', '痛点优先级矩阵', '数据佐证'],
          gate_out: 'CEO 三步分析完→路由', downstream: ['PM', '用户研究员'],
          triggers_back: [] },
        { id: 'user_researcher', name: '用户研究员', emoji: '👤', role: '用研 · 旅程地图',
          inputs: ['用户画像假设', '访谈提纲'],
          outputs: ['用户调研报告', '用户画像', '访谈记录', '用户旅程地图', '问卷设计'],
          gate_out: 'L1→P3 PM', downstream: ['PM', '数据PM'],
          triggers_back: [] },
        { id: 'data_pm', name: '数据 PM', emoji: '📈', role: '指标体系 · 埋点需求',
          inputs: ['PRD', '北极星指标'],
          outputs: ['数据指标体系文档', '埋点需求文档'],
          gate_out: 'L1→增长运营总监 L3', downstream: ['增长运营总监', 'BI看板工程师'],
          triggers_back: [] },
      ]
    },
    {
      id: 'ai_dev', label: 'AI 研发线', color: '#7a8868', bg: '#f0faf2',
      members: [
        { id: 'algo', name: '算法工程师', emoji: '🧠', role: '模型选型 · N34 AI 边界',
          inputs: ['产品功能清单', '行业合规要求'],
          outputs: ['模型选型报告', 'N34 AI 边界分析', 'AI 选型需求单'],
          gate_out: 'L1→技术总监 L3', downstream: ['技术总监', '后端工程师'],
          triggers_back: ['合规顾问: 模型违规→重选'] },
        { id: 'trainer', name: 'AI 训练师', emoji: '🎯', role: '评测集 · BadCase · Golden Set',
          inputs: ['PRD AI 功能清单', '模型选型报告'],
          outputs: ['评测集 ≥20 条', 'BadCase 分析库', 'Golden Set 设计', 'LLM-as-Judge 方案'],
          gate_out: 'L1→技术总监 L3', downstream: ['技术总监', '模型评测专家'],
          triggers_back: ['评测通过率<85%→重新调优'] },
        { id: 'prompt_eng', name: 'Prompt 工程师', emoji: '💬', role: '13 段式 Prompt 设计',
          inputs: ['功能需求', 'AI 能力边界'],
          outputs: ['系统提示词 (13 段)', 'Few-shot 示例集', '温度参数建议'],
          gate_out: 'L1→AI 训练师复审', downstream: ['AI 训练师'],
          triggers_back: ['LLM-as-Judge 分<3.5→迭代'] },
        { id: 'rag_eng', name: 'RAG 工程师', emoji: '🗃️', role: 'RAG 四门决策 · 知识库设计',
          inputs: ['知识库范围', '检索需求'],
          outputs: ['RAG 架构方案', '向量化策略', '检索评测报告 (召回率@20 ≥0.8)'],
          gate_out: 'L1→技术总监 L3', downstream: ['后端工程师'],
          triggers_back: ['召回率不达标→重新调参'] },
        { id: 'agent_eng', name: 'Agent 编排工程师', emoji: '🕸️', role: 'Agent 工作流 · Tool 设计',
          inputs: ['多 Agent 需求', '工具清单'],
          outputs: ['Agent 编排方案', 'Tool 接口定义', 'HITL 触发规则'],
          gate_out: 'L1→技术总监 L3', downstream: ['后端工程师'],
          triggers_back: ['Agent 越权→安全专员介入'] },
        { id: 'eval_expert', name: '模型评测专家', emoji: '📏', role: '三层评测体系',
          inputs: ['模型输出样本', 'Golden Set'],
          outputs: ['AI 评测报告', '加权综合分 ≥3.5', '迭代建议'],
          gate_out: 'L1→AI训练师', downstream: ['AI 训练师', '技术总监'],
          triggers_back: ['综合分<3.0→人工复核'] },
      ]
    },
    {
      id: 'design', label: '设计线', color: '#c9a878', bg: '#faf3e7',
      members: [
        { id: 'ux', name: 'UX 设计师', emoji: '🖌️', role: '交互原型 · 用户路径',
          inputs: ['PRD 功能清单', '用户旅程地图'],
          outputs: ['交互原型文档', '核心路径 ≤3 步', '边界异常矩阵'],
          gate_out: 'L1→设计总监 L3', downstream: ['Figma设计师', '设计总监'],
          triggers_back: ['设计总监: 核心路径超3步→重做'] },
        { id: 'figma', name: 'Figma 设计师', emoji: '🎨', role: 'UI 规范 · 设计走查',
          inputs: ['交互原型', 'Editorial Design Token'],
          outputs: ['UI 设计规范 Design System', 'design_tokens.json', '设计走查报告'],
          gate_out: 'L1→设计总监 L3', downstream: ['设计总监', '前端工程师'],
          triggers_back: ['违反 Paper/Peach/Sage 色板→返工'] },
        { id: 'motion', name: '动效设计师', emoji: '✨', role: '微动效 · 骨架屏',
          inputs: ['UI 规范', '交互原型'],
          outputs: ['动效规范文档', '骨架屏设计', 'loading 方案'],
          gate_out: 'L1→设计总监 L3', downstream: ['前端工程师'],
          triggers_back: [] },
        { id: 'brand', name: '品牌插画师', emoji: '🖼️', role: '空状态 · 品牌插画',
          inputs: ['品牌规范', '行业视觉调色板'],
          outputs: ['空状态插画', '品牌图形素材'],
          gate_out: 'L1→设计总监', downstream: ['前端工程师'],
          triggers_back: [] },
        { id: 'demo_eng', name: 'Demo 工程师', emoji: '🚀', role: '单文件 HTML Demo',
          inputs: ['UI 规范', 'Design Token', '核心功能清单'],
          outputs: ['可交互 HTML Demo (单文件)', '行业视觉定制', '死按钮 = 0'],
          gate_out: 'L1→设计总监 L3 + QA L4', downstream: ['设计总监', 'QA一致性审查员'],
          triggers_back: ['QA: Demo 与 PRD 不一致→返工', '有死按钮→立即修复'] },
      ]
    },
    {
      id: 'eng', label: '工程线', color: '#5b7fa6', bg: '#eff4fb',
      members: [
        { id: 'fullstack', name: '全栈工程师', emoji: '💻', role: '端到端技术方案',
          inputs: ['技术报告', '模型选型', 'API 设计'],
          outputs: ['技术实现方案', '架构图', '技术选型矩阵'],
          gate_out: 'L1→技术总监 L3', downstream: ['技术总监'],
          triggers_back: [] },
        { id: 'frontend', name: '前端工程师', emoji: '🖥️', role: '响应式开发 · 1440/375',
          inputs: ['UI 规范', 'Design Token', '交互原型'],
          outputs: ['前端实现', '1440px + 375px 响应式', 'WCAG AA 对比度'],
          gate_out: 'L1→设计总监 L3', downstream: ['测试工程师'],
          triggers_back: ['文字溢出容器→返工'] },
        { id: 'backend', name: '后端工程师', emoji: '⚙️', role: 'API · 数据库设计',
          inputs: ['API 接口文档', '数据库设计'],
          outputs: ['后端实现', '等保三级方案（G端）', 'RESTful API'],
          gate_out: 'L1→技术总监 L3', downstream: ['测试工程师'],
          triggers_back: [] },
        { id: 'devops', name: 'DevOps 工程师', emoji: '🔧', role: '部署 · 灰度 · 回滚',
          inputs: ['上线 Checklist', '灰度策略'],
          outputs: ['部署方案', '灰度 5%→20%→100%', '回滚方案 ≤30min'],
          gate_out: 'L1→增长运营总监', downstream: ['上线运营'],
          triggers_back: ['错误率>5%→立即回滚'] },
        { id: 'tester', name: '测试工程师', emoji: '🧪', role: '测试用例 · P95 压测',
          inputs: ['功能清单', '边界异常矩阵'],
          outputs: ['测试用例文档', 'P95 延迟报告', 'AB 实验方案'],
          gate_out: 'L3→上线', downstream: ['DevOps'],
          triggers_back: ['P95>目标值×2→后端优化'] },
      ]
    },
    {
      id: 'ops', label: '数据运营 + 合规', color: '#8e6fad', bg: '#f5f0fb',
      members: [
        { id: 'data_analyst', name: '数据分析师', emoji: '📊', role: '数据分析报告 · 归因',
          inputs: ['埋点数据', '指标体系'],
          outputs: ['数据分析周报/月报', 'DAU/转化/留存趋势'],
          gate_out: 'L1→增长运营总监', downstream: ['增长运营总监'],
          triggers_back: [] },
        { id: 'bi', name: 'BI 看板工程师', emoji: '📉', role: '可视化看板',
          inputs: ['数据指标定义', 'BI 需求'],
          outputs: ['数据看板', '实时监控配置'],
          gate_out: 'L1→增长运营总监', downstream: ['增长运营总监'],
          triggers_back: [] },
        { id: 'content_ops', name: '内容运营', emoji: '📰', role: '内容策略 · SEO',
          inputs: ['产品定位', '目标用户'],
          outputs: ['内容运营策略', 'SEO/GEO 方案'],
          gate_out: 'L1→增长运营总监', downstream: ['增长运营总监'],
          triggers_back: [] },
        { id: 'compliance', name: '合规隐私专员', emoji: '⚖️', role: '三法对照 L6',
          inputs: ['产品方案', '数据处理逻辑'],
          outputs: ['合规风险评估报告', 'GDPR+个保法+AI办法取严对照'],
          gate_out: 'L6 通过→L7', downstream: ['数据真伪校核'],
          triggers_back: ['B端金融医疗用外国模型→强制阻断'] },
        { id: 'launch_ops', name: '上线运营专家', emoji: '🚀', role: '上线 SOP · T-7→T+3',
          inputs: ['功能验收报告', '灰度方案'],
          outputs: ['上线 Checklist', '灰度发布记录', '应急预案'],
          gate_out: 'L1→CEO 终审', downstream: ['CEO'],
          triggers_back: ['用户投诉量>基线×3→立即回滚'] },
      ]
    },
  ];

  /* ── 2. 样式 ───────────────────────────────────────────── */
  const CSS = `
    .pcv2 { font-family: var(--font-sans, Inter, sans-serif); }
    .pcv2-hero { text-align: center; padding: 56px 0 32px; }
    .pcv2-hero .hand { font-family: var(--font-hand,'Caveat',cursive); color: var(--peach,#d16a4e); font-size:15px; letter-spacing:2px; }
    .pcv2-hero h2 { font-family: var(--font-serif,'Instrument Serif',serif); font-size: clamp(28px,4vw,40px); color: var(--ink-deep,#2a2520); margin: 8px 0 10px; }
    .pcv2-hero p { color: var(--ink-soft,#7a6e65); font-size: 14px; max-width: 640px; margin: 0 auto; line-height: 1.7; }

    .pcv2-stats { display: flex; justify-content: center; gap: 32px; flex-wrap: wrap; margin: 24px 0 40px; }
    .pcv2-stat { text-align: center; }
    .pcv2-stat .n { font-family: var(--font-serif); font-size: 38px; color: var(--peach,#d16a4e); font-style: italic; line-height: 1; }
    .pcv2-stat .l { font-size: 12px; color: var(--ink-faint,#b0a89e); margin-top: 4px; }

    .pcv2-dept { margin-bottom: 32px; }
    .pcv2-dept-head { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
    .pcv2-dept-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
    .pcv2-dept-name { font-family: var(--font-serif); font-size: 18px; color: var(--ink-deep,#2a2520); }
    .pcv2-dept-count { font-size: 12px; color: var(--ink-faint); margin-left: 2px; }

    .pcv2-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 10px; }
    .pcv2-card {
      background: white; border: 1.5px solid var(--paper-dark,#e8dfd0);
      border-radius: 12px; padding: 14px 14px 12px;
      cursor: pointer; transition: all 0.18s; position: relative;
      border-top: 3px solid transparent;
    }
    .pcv2-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
    .pcv2-card.active { box-shadow: 0 0 0 2px var(--peach,#d16a4e); transform: translateY(-3px); }
    .pcv2-card-emoji { font-size: 22px; line-height: 1; margin-bottom: 6px; }
    .pcv2-card-name { font-size: 13px; font-weight: 600; color: var(--ink-deep,#2a2520); margin-bottom: 3px; line-height: 1.3; }
    .pcv2-card-role { font-size: 11px; color: var(--ink-faint,#b0a89e); line-height: 1.4; }
    .pcv2-card-badge {
      position: absolute; top: 8px; right: 8px;
      font-size: 9px; padding: 2px 6px; border-radius: 4px;
      background: var(--paper,#faf5ea); color: var(--ink-faint);
    }

    /* Handoff Panel */
    .pcv2-panel-wrap {
      position: sticky; top: 80px; max-height: 80vh; overflow-y: auto;
    }
    .pcv2-panel {
      background: white; border: 2px solid var(--peach,#d16a4e);
      border-radius: 16px; padding: 20px; margin-bottom: 20px;
      animation: panelIn 0.22s ease;
    }
    @keyframes panelIn { from { opacity:0; transform: scale(0.97); } to { opacity:1; transform: scale(1); } }
    .pcv2-panel-head { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 14px; }
    .pcv2-panel-emoji { font-size: 32px; }
    .pcv2-panel-title { font-family: var(--font-serif); font-size: 20px; color: var(--ink-deep); }
    .pcv2-panel-role { font-size: 12px; color: var(--ink-soft); margin-top: 2px; }

    .pcv2-yaml { background: #1f1a14; color: #f4ede0; border-radius: 12px; padding: 16px; font-family: 'SF Mono', 'JetBrains Mono', monospace; font-size: 12px; line-height: 1.8; overflow-x: auto; }
    .pcv2-yaml .k { color: #d4a574; }
    .pcv2-yaml .v { color: #9dcfa0; }
    .pcv2-yaml .v2 { color: #f4ede0; opacity: 0.8; }
    .pcv2-yaml .arr { color: #7cbee0; }
    .pcv2-yaml .cmt { color: #6b6456; font-style: italic; }

    /* 8-Layer Chain */
    .pcv2-chain { background: white; border: 1.5px solid var(--paper-dark,#e8dfd0); border-radius: 16px; padding: 24px; margin-top: 32px; }
    .pcv2-chain h3 { font-family: var(--font-serif); font-size: 22px; color: var(--ink-deep); margin-bottom: 20px; text-align: center; }
    .pcv2-chain-row {
      display: grid; grid-template-columns: 56px 1fr 100px; gap: 14px;
      align-items: center; padding: 12px 16px; border-radius: 10px;
      margin-bottom: 8px; background: var(--paper,#faf5ea);
      border-left: 4px solid var(--peach,#d16a4e);
      transition: all 0.18s;
    }
    .pcv2-chain-row:hover { transform: translateX(4px); }
    .pcv2-chain-row.parallel { border-left-color: var(--sage-deep,#7a8868); background: linear-gradient(90deg,rgba(154,168,137,0.08),var(--paper)); }
    .pcv2-chain-lnum { font-family: var(--font-serif); font-size: 22px; color: var(--peach,#d16a4e); }
    .pcv2-chain-row.parallel .pcv2-chain-lnum { color: var(--sage-deep,#7a8868); }
    .pcv2-chain-name { font-size: 14px; font-weight: 500; color: var(--ink-deep); }
    .pcv2-chain-desc { font-size: 12px; color: var(--ink-soft); margin-top: 3px; line-height: 1.5; }
    .pcv2-chain-time { text-align: right; }
    .pcv2-chain-time strong { font-family: var(--font-serif); font-size: 16px; color: var(--peach); display: block; }
    .pcv2-chain-time span { font-size: 11px; color: var(--ink-faint); }
    .pcv2-parallel-badge { display:inline-block; background: var(--sage-deep,#7a8868); color: white; font-size: 10px; padding: 1px 7px; border-radius: 6px; margin-left: 6px; vertical-align: middle; }

    /* Dang boxes */
    .pcv2-dang { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-top: 24px; }
    .pcv2-dang-box { background: var(--paper,#faf5ea); border-radius: 12px; padding: 16px; border-top: 3px solid var(--peach,#d16a4e); transform: rotate(-0.3deg); }
    .pcv2-dang-box:nth-child(2n) { transform: rotate(0.3deg); }
    .pcv2-dang-name { font-family: var(--font-serif); font-size: 15px; color: var(--ink-deep); margin-bottom: 5px; }
    .pcv2-dang-layers { font-size: 12px; color: var(--ink-soft); line-height: 1.6; }
    .pcv2-dang-time { font-family: var(--font-serif); font-size: 18px; color: var(--peach); margin-top: 8px; }

    @media (max-width: 900px) {
      .pcv2-main-layout { flex-direction: column !important; }
      .pcv2-panel-wrap { position: static; max-height: none; }
      .pcv2-dang { grid-template-columns: 1fr; }
      .pcv2-chain-row { grid-template-columns: 44px 1fr; }
      .pcv2-chain-time { display: none; }
    }
    @media (max-width: 600px) {
      .pcv2-grid { grid-template-columns: repeat(2, 1fr); }
      .pcv2-stats { gap: 20px; }
    }
  `;

  /* ── 3. YAML 渲染 ─────────────────────────────────────── */
  function renderYaml(emp, deptColor) {
    const lines = [
      `<span class="cmt"># Handoff Contract · ${emp.name}</span>`,
      `<span class="k">role_id:</span> <span class="v">${emp.id}</span>`,
      `<span class="k">name:</span> <span class="v2">${emp.name}</span>`,
      `<span class="k">dept_color:</span> <span class="v">${deptColor}</span>`,
      ``,
      `<span class="k">inputs:</span>`,
      ...emp.inputs.map(i => `  <span class="arr">-</span> <span class="v2">${i}</span>`),
      ``,
      `<span class="k">outputs:</span>`,
      ...emp.outputs.map(o => `  <span class="arr">-</span> <span class="v2">${o}</span>`),
      ``,
      `<span class="k">gate_out:</span> <span class="v">${emp.gate_out}</span>`,
      ``,
      `<span class="k">downstream:</span>`,
      ...emp.downstream.map(d => `  <span class="arr">-</span> <span class="v2">${d}</span>`),
    ];
    if (emp.triggers_back && emp.triggers_back.length) {
      lines.push(``, `<span class="k">triggers_backwards:</span>`);
      emp.triggers_back.forEach(t => lines.push(`  <span class="arr">-</span> <span class="v">${t}</span>`));
    } else {
      lines.push(``, `<span class="k">triggers_backwards:</span> <span class="v2">[]</span>`);
    }
    return lines.join('\n');
  }

  /* ── 4. 主渲染 ─────────────────────────────────────────── */
  function init() {
    const mount = document.getElementById('peach-collaboration-v11');
    if (!mount) return;

    if (!document.getElementById('pcv2-style')) {
      const s = document.createElement('style');
      s.id = 'pcv2-style';
      s.textContent = CSS;
      document.head.appendChild(s);
    }

    const totalEmps = DEPTS.reduce((s, d) => s + d.members.length, 0);
    const totalOutputs = DEPTS.reduce((s, d) => s + d.members.reduce((ss, m) => ss + m.outputs.length, 0), 0);

    let activeEmp = null;
    let activeCard = null;

    const wrap = document.createElement('div');
    wrap.className = 'pcv2';
    wrap.innerHTML = `
      <div style="background: linear-gradient(180deg, var(--paper-light,#f4ede0), var(--paper,#faf5ea)); padding: 0 0 60px; border-top: 2px solid var(--paper-dark,#e8dfd0);">
        <div style="max-width:1400px; margin:0 auto; padding: 0 24px;">
          <div class="pcv2-hero">
            <div class="hand">可调度 · 可审查 · 可迭代</div>
            <h2>🤝 42 员工全链路 <em style="color:var(--peach)">Handoff</em> 可视化</h2>
            <p>点击任意员工 → 查看 YAML Handoff Contract（输入/输出/闸/下游/反向触发）· 比任何纯文字矩阵都清晰</p>
          </div>

          <div class="pcv2-stats">
            <div class="pcv2-stat"><div class="n">${totalEmps}</div><div class="l">常驻员工</div></div>
            <div class="pcv2-stat"><div class="n">200+</div><div class="l">行业专家（按需激活）</div></div>
            <div class="pcv2-stat"><div class="n">8</div><div class="l">层审批链</div></div>
            <div class="pcv2-stat"><div class="n">${totalOutputs}</div><div class="l">种标准交付物</div></div>
            <div class="pcv2-stat"><div class="n">22<em style="font-size:16px">min</em></div><div class="l">客户档 P50 全链路</div></div>
          </div>

          <div class="pcv2-main-layout" style="display:flex; gap:24px; align-items:flex-start;">
            <div id="pcv2-left" style="flex:1; min-width:0;"></div>
            <div id="pcv2-right" style="width:320px; flex-shrink:0;">
              <div id="pcv2-hint" style="background:white; border: 1.5px dashed var(--paper-dark,#e8dfd0); border-radius:14px; padding:24px; text-align:center; color:var(--ink-faint);">
                <div style="font-size:32px; margin-bottom:10px;">👆</div>
                <div style="font-family: var(--font-serif); font-size:16px; color:var(--ink-soft); margin-bottom:6px;">点击左侧任意员工</div>
                <div style="font-size:12px; line-height:1.7;">查看该员工的 YAML Handoff Contract<br>包含：输入·输出·下游·反向触发</div>
              </div>
              <div id="pcv2-panel-container" class="pcv2-panel-wrap" style="display:none;"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    mount.appendChild(wrap);

    const leftEl = wrap.querySelector('#pcv2-left');
    const rightHint = wrap.querySelector('#pcv2-hint');
    const rightPanel = wrap.querySelector('#pcv2-panel-container');

    // 渲染每个部门
    DEPTS.forEach(dept => {
      const deptEl = document.createElement('div');
      deptEl.className = 'pcv2-dept';
      deptEl.innerHTML = `
        <div class="pcv2-dept-head">
          <div class="pcv2-dept-dot" style="background:${dept.color}"></div>
          <div class="pcv2-dept-name">${dept.label}</div>
          <div class="pcv2-dept-count">${dept.members.length} 人</div>
        </div>
        <div class="pcv2-grid" id="pcv2-grid-${dept.id}"></div>
      `;
      leftEl.appendChild(deptEl);

      const grid = deptEl.querySelector(`#pcv2-grid-${dept.id}`);
      dept.members.forEach(emp => {
        const card = document.createElement('div');
        card.className = 'pcv2-card';
        card.style.borderTopColor = dept.color;
        card.innerHTML = `
          <div class="pcv2-card-emoji">${emp.emoji}</div>
          <div class="pcv2-card-name">${emp.name}</div>
          <div class="pcv2-card-role">${emp.role}</div>
          <div class="pcv2-card-badge">${emp.outputs.length} 产出</div>
        `;

        card.addEventListener('click', () => {
          // 取消上一个激活
          if (activeCard) activeCard.classList.remove('active');
          card.classList.add('active');
          activeCard = card;
          activeEmp = emp;

          // 渲染 Handoff Panel
          rightHint.style.display = 'none';
          rightPanel.style.display = 'block';
          rightPanel.innerHTML = `
            <div class="pcv2-panel">
              <div class="pcv2-panel-head">
                <div class="pcv2-panel-emoji">${emp.emoji}</div>
                <div>
                  <div class="pcv2-panel-title">${emp.name}</div>
                  <div class="pcv2-panel-role" style="color:${dept.color}">${dept.label}</div>
                  <div class="pcv2-panel-role">${emp.role}</div>
                </div>
              </div>
              <div class="pcv2-yaml"><pre style="margin:0;white-space:pre-wrap;">${renderYaml(emp, dept.color)}</pre></div>
            </div>
          `;

          // 滚动到面板（移动端）
          if (window.innerWidth < 900) {
            rightPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });

        grid.appendChild(card);
      });
    });

    // 8层审批链
    const chainWrap = document.createElement('div');
    chainWrap.style.cssText = 'max-width:1400px; margin:0 auto; padding: 0 24px 60px;';
    chainWrap.innerHTML = `
      <div class="pcv2-chain">
        <h3>🔗 L1 → L8 完整审批链 · 每份交付物必过</h3>
        <div id="pcv2-layers"></div>
        <div style="margin-top:24px; text-align:center; font-size:12px; color:var(--ink-faint); padding: 10px; background: var(--paper,#faf5ea); border-radius:8px; font-family: monospace;">
          L1 串行 → L2 串行 → <strong>L3 4总监并发</strong> → <strong>L4-L7 4审查员并发</strong> → L8 串行 &nbsp;·&nbsp; 并发节省 60%+ 时长
        </div>
        <div style="margin-top: 20px;">
          <div style="font-family: var(--font-serif); font-size:16px; color:var(--ink-deep); text-align:center; margin-bottom:14px;">🎛 3 档位审批差异</div>
          <div class="pcv2-dang">
            <div class="pcv2-dang-box"><div class="pcv2-dang-name">⚡ 面试档</div><div class="pcv2-dang-layers">L1 + L4 + L7（精简 3 层）</div><div class="pcv2-dang-time">约 1 min</div></div>
            <div class="pcv2-dang-box"><div class="pcv2-dang-name">📊 工作档</div><div class="pcv2-dang-layers">L1 + L2 + L3 + L4 + L5 + L8（按需 L6）</div><div class="pcv2-dang-time">约 10 min</div></div>
            <div class="pcv2-dang-box"><div class="pcv2-dang-name">💼 客户档</div><div class="pcv2-dang-layers">8 层全跑 · L6 全启 · 无跳过</div><div class="pcv2-dang-time">约 22 min (P50)</div></div>
          </div>
        </div>
      </div>
    `;
    mount.appendChild(chainWrap);

    const layersEl = chainWrap.querySelector('#pcv2-layers');
    [
      { n:'L1', name:'员工自检 (Self-Check 第 9 段)', desc:'每员工交付前对照 Constraints + Rubric 逐条打勾 · 不过自己返工', time:'3 min', parallel:false },
      { n:'L2', name:'同线 Peer Review', desc:'5 产线内互审（产品 / AI研发 / 设计 / 工程 / 数据运营）', time:'2 min', parallel:false },
      { n:'L3', name:'4 总监并发审查', desc:'产品 / 技术 / 设计 / 增长 同时审各自管辖 · 桃子进度快的核心', time:'5 min', parallel:true },
      { n:'L4', name:'QA 一致性审查', desc:'PRD ↔ 技术 ↔ UI ↔ Demo 四方交叉矩阵 + Demo 双向反查', time:'3 min', parallel:true },
      { n:'L5', name:'反指标监控审', desc:'每份文档 ≥2 个 counter-metrics · 5 级 Rubric 打分 · 正交性检查', time:'2 min', parallel:true },
      { n:'L6', name:'3 法合规审（按端触发）', desc:'GDPR + 个保法 + AI 管理办法 取严 · 模型选型合规红线', time:'3 min', parallel:true },
      { n:'L7', name:'数据真伪校核', desc:'VELA 10 数据白名单验证 + 非白名单数据标可信度', time:'2 min', parallel:true },
      { n:'L8', name:'CEO 终审', desc:'全局 5 终问 + 打包 AUDIT_REPORT + 交付老板', time:'2 min', parallel:false },
    ].forEach(l => {
      const row = document.createElement('div');
      row.className = 'pcv2-chain-row' + (l.parallel ? ' parallel' : '');
      row.innerHTML = `
        <div class="pcv2-chain-lnum">${l.n}</div>
        <div>
          <div class="pcv2-chain-name">${l.name}${l.parallel ? '<span class="pcv2-parallel-badge">并发</span>' : ''}</div>
          <div class="pcv2-chain-desc">${l.desc}</div>
        </div>
        <div class="pcv2-chain-time"><strong>${l.time}</strong><span>${l.parallel ? '可并发' : '必串行'}</span></div>
      `;
      layersEl.appendChild(row);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
