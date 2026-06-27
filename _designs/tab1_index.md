# Tab 1 · 需求入口（index.html 改写）· 多角色构思

> **定位**：桃子公司的正门。用户打开网站第一件事 = 输入需求 + 选行业 + 选模式 + 启动。不再是"展示桃子公司是什么"· 是"用桃子公司做事"。
> **改造原则**：保留现有骨架和桃子调性 · 加法不减法 · 修补铁律违反点 + 补模式切换 + 补依据感。

---

## 👑 CEO 定位

- 这是桃子公司的**正门**（PDF §15.1 指出的"任务入口"· 之前完全没有）
- 60 秒内让访客完成：打开 → 理解是什么 → 输入 → 选行业 → 选模式 → 启动
- 首页视觉 85vh 是入口 · 剩下 15vh 是品牌延展（三重身份 / 产出清单 / 资产基础）· **入口优先**
- 核心硬指标：启动按钮点击前 · 用户必须完成 3 件事（需求描述 + 行业 + 模式）· 缺一不启动

## 🧑‍🎤 PM 视角 · 交互逻辑表（5 态铁律）

| 状态 | 触发条件 | 系统行为 | 展示内容 | 操作反馈 |
|---|---|---|---|---|
| **正常** | 输入内容 + 选行业 + 选模式 + 点启动 | 跳转 workspace.html?q={需求}&industry={行业}&mode={模式} | Loading 1s | 平滑过渡 |
| **空状态** | 未输入点启动 | 拦截 + 输入框聚焦 + 抖动 | 橙色气泡"先告诉我你要做什么产品" | 输入框边框变橙 |
| **加载中** | 启动后 | 按钮变"🎬 正在调度全员..." + Spinner | 灰化其他元素 | 1-2s 内必完成跳转 |
| **首次使用** | 第一次访问 localStorage 无记录 | 顶部浮条"第一次来？2 分钟出方案"+ 引导光标 | 气泡指向输入框 → 行业 → 模式 → 启动 | 可关闭 · 可重看 |
| **禁用态** | 输入超 500 字 | 按钮灰 + 红字"字数超限" | 字数计数转红 | 点启动无反应 |

## 🧑‍🎤 PM 视角 · 边界异常矩阵（6 类铁律）

| 类型 | 触发 | 处理 | 提示 | 恢复 | 优先级 |
|---|---|---|---|---|---|
| 网络断开 | 跳转时网络挂 | localStorage 存输入 | "已保存草稿 · 联网后继续" | 自动重试 | P1 |
| 数据为空 | 没选行业 | 拦截启动 | "请选一个行业 · 20 个都支持" | 行业区高亮 | P0 |
| 并发冲突 | N/A（无后端） | - | - | - | - |
| 权限不足 | N/A（全开）| - | - | - | - |
| 输入超限 | 字数 > 500 | 截断 + 提示 | "500 字内说清你的产品方向" | 截断末尾 | P1 |
| 服务端错误 | N/A（纯前端）| - | - | - | - |

## 🎨 设计视角 · 布局与桃子调性

### 顶部导航（大改 · 加 5 新 tab）
```
🏢 桃子公司        [需求入口 · active] [分析工作台] [协作台] [行业专家库] [结果工作台] [方法论] [办公室] [团队] [案例] [资产层]  🍑🏠⚡📌💳
```
10 个 tab 太挤 · 分两级：
- 一级（常用）：需求入口 / 分析工作台 / 协作台 / 行业库 / 结果工作台（产品心脏 5 个）
- 二级（更多 ▾ 下拉）：方法论 / 办公室 / 团队 / 案例 / 资产层（展示层 5 个）

### Hero 段（占 85vh）
- 手写 eyebrow："一个人 · 一家 AI 产品公司"
- 大标题：`🏢 <i>桃子公司</i>`（Instrument Serif 斜体）
- 一句话定位（新）：「输入一个需求 · 调用方法论 + 行业知识 + AI 训练师经验 · **2 分钟内出 3 份核心文档 · 或 30 分钟内出 70 分方案包**」
- **模式切换器**（新 · 核心）：
  - ⚡ 闪电 · 2 分钟 3 文档 + 1 demo（默认）
  - 📦 标准 · 30 分钟 70 分方案包 10 件套
- 大输入框（改 placeholder · 去真实公司名）：
  - placeholder: 「例：某金融机构 · 智能信贷审核    或    某教育平台 · AI 口语陪练」
- 行业选择区（扩到 20 个 · 2 行布局）：
  - 医疗 🏥 / 金融 💰 / 教育 🎓 / 短视频 🎬 / 短剧 🎭 / 电商 🛍 / 制造 🏭 / 汽车 🚗 / 政企 🏛 / 家装 🏡
  - 内容 📰 / 情感陪伴 💝 / 游戏 🎮 / 企业 SaaS 🏢 / 跨境电商 🌏 / 宠物 🐶 / 占卜 🔮 / 农业 🌾 / 新能源 🔋 / 数字化 📡
- 启动按钮（动态文案）：
  - 闪电模式 → 「✨ 启动 · 2 分钟出方案」
  - 标准模式 → 「✨ 启动 · 30 分钟出方案包」
- 底部小字 · **依据感声明**（新 · 反"像在瞎编"）：
  - 「产出基于 · VELA 34 份大厂模板 / Obsidian 64 份 AI PM 知识库 / 6 位 AI 训练师真实笔记 / 5+ 真实项目样板」

### 下方 sections（保留结构 · 更新文案）
- Section 2 · 「真公司 3 重身份」→ 改为「真·产品公司 3 件产出」（Brief / PRD / AI 落地）
- Section 3 · 「怎么工作」→ 9 层流水线极简图（7 主链 + 3 总监 + QA）
- Section 4 · 「资产基础」→ 5 大资产层展示（数字卡片）
- Section 5 · 「核心哲学 · Harness Engineering」→ 小普一句话 + 三件事简介
- 去掉所有「面试 / 应试 / 预测 / 复盘」字眼

### 颜色应用
- 主视觉：Paper (#f4ede0) 背景 · Peach (#d16a4e) CTA 按钮 · Sage (#9aa889) 辅助
- 模式切换：Peach active / Paper-light inactive
- 行业 chip：Paper-light 底 + Peach 悬浮 + Peach active
- 输入框聚焦：边框变 Peach + 轻阴影

### 字体
- 标题：Instrument Serif（现有）
- 手写：Caveat（现有）
- 正文：Inter（现有）
- 不改字体规则

## 🎭 前端视角 · 实现

### 技术栈
- 纯 HTML + CSS + 原生 JS（保持现有）
- 共享 `css/main.css`（桃子调性）+ `css/launcher.css`
- 内联样式放 `<style>` 块 · 不再新建 css 文件（小改动）
- JS：沿用现有 `js/launcher.js` 的 industry-chip 逻辑 · 新增模式切换和启动跳转

### 模式切换实现
```js
// 默认闪电模式
let currentMode = localStorage.getItem('peach-mode') || 'lightning';

document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentMode = btn.dataset.mode;
    localStorage.setItem('peach-mode', currentMode);
    updateModeUI();
  });
});

function updateModeUI() {
  document.querySelectorAll('.mode-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.mode === currentMode));
  const cta = document.getElementById('launch-btn');
  cta.textContent = currentMode === 'lightning'
    ? '✨ 启动 · 2 分钟出方案'
    : '✨ 启动 · 30 分钟出方案包';
}
```

### 启动跳转实现
```js
function launchCompany(e) {
  e.preventDefault();
  const need = document.getElementById('peach-input').value.trim();
  const industry = document.getElementById('selected-industry').value; // hidden input
  if (!need) { showEmpty(); return false; }
  if (!industry) { showIndustryHint(); return false; }
  const url = `workspace.html?q=${encodeURIComponent(need)}&industry=${encodeURIComponent(industry)}&mode=${currentMode}`;
  window.location.href = url;
  return false;
}
```

### 行业选择单选
- 行业 chip 点击 → 选中态（Peach 底 + 白字）· 其他取消选中
- hidden input 存当前选择
- 启动前校验必选 1 个

## 🤖 AI 训练师视角

- Tab 1 不直接调 AI · 是入口
- 但要**为未来接入留钩子**：
  - `data-action="launch"` 属性在启动按钮上
  - `launchCompany()` 函数可被替换为 fetch 调 Claude Agent SDK 或豆包 API
- 现阶段跳转到 workspace.html 走纯前端分析展示

## 🧪 QA 审查点（5 字总纲对标）

### 约束
- [ ] 输入框字数上限 500
- [ ] 行业必选 1 个才能启动
- [ ] 模式必选（默认闪电）

### 审核
- [ ] 所有文案不含「面试 / 预测 / 复盘 / 加分 / demo 应试」等元层词
- [ ] 所有示例不用 **招商银行 / 字节跳动 / 硅基万物 / 品达 / 冲天 / 慕康 / 法本 / 千达成 / 苏州超集 / 奇瑞汽金** 等真实面过的公司
- [ ] 20 行业一个不落（之前 13 个）

### 依据
- [ ] 底部必显"产出基于"声明
- [ ] 5 大资产层 section 必有（不是空说辞）

### 反馈
- [ ] localStorage 存用户选过的模式 + 上次输入草稿
- [ ] 首次访问 onboarding 可关可重看

### 版本
- [ ] HTML 头部注释写版本号 + 最后修改日期
- [ ] 重大改动 git commit message 标清楚

## 📝 变更清单（对照现有 index.html）

| # | 位置 | 动作 | 原因 |
|---|---|---|---|
| 1 | nav 链接 | 加 5 新 tab · 改为两级菜单 | 10 tab 太挤 |
| 2 | hero placeholder | 换虚构公司名 | 铁律 · 去应试化 |
| 3 | hero 下面加模式切换器 | 新增 | 北极星硬指标核心 |
| 4 | 行业 chip | 13 → 20 | 她要求保留 20 |
| 5 | 启动按钮 | 文案动态跟模式变 | 反映硬指标 |
| 6 | hero 底部 | 加依据感声明 | 5 字总纲依据 |
| 7 | 所有 section | 去应试字眼 · 改表达 | 铁律 |
| 8 | 三重身份 section | 改为 3 件产出 | 对齐新定位 |
| 9 | 文案细节 | 19 员工 → 19 员工 + 20 专家 + 3 总监 + QA | 架构清楚 |
| 10 | JS | 加启动跳转函数 | 入口 → 工作台联通 |

## ✅ 自审红线（通过才能交付）

- [ ] 视觉：桃子三色没跑偏 · Instrument Serif 斜体大标题保留
- [ ] 交互：5 态 + 6 异常都实现或有合理降级
- [ ] 内容：去应试化 100% · 真实公司名 0 处
- [ ] 功能：启动按钮 → 跳转 workspace.html 带参数（即使 workspace.html 还没做 · 也先留好 URL）
- [ ] 依据：5 大资产层声明有
- [ ] 模式：默认闪电 · 切换标准 · CTA 文案跟着变
- [ ] 行业：20 个齐

---

**下一步**：按此文档改写 index.html · 不改骨架只改内容 + 加模式切换器 + 扩展行业 + 修铁律违反。
