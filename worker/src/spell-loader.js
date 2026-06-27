/**
 * Spell 加载器 · 从 R2 读取 spell → 替换占位符 → 自动注入模板和知识库
 */

/**
 * 加载 spell 并注入所有依赖内容
 * @param {object} env - Worker 环境（含 R2 binding）
 * @param {string} spellPath - R2 中的 spell 路径，如 "spells/lightning/prd_agent.md"
 * @param {object} variables - 占位符变量 { PRODUCT_REQUEST: "...", INDUSTRY: "...", ... }
 * @param {object} opts - 可选参数
 * @returns {Promise<{system: string, user: string}>}
 */
export async function loadSpell(env, spellPath, variables = {}, opts = {}) {
  // 1. 从 R2 读 spell 文件
  const obj = await env.R2.get(spellPath);
  if (!obj) throw new Error(`Spell not found: ${spellPath}`);
  let text = await obj.text();

  // 2. 替换所有 {{占位符}}
  for (const [k, v] of Object.entries(variables)) {
    text = text.replaceAll(`{{${k}}}`, v || '');
  }

  // 3. 自动注入引用的模板
  text = await injectTemplateRefs(env, text);

  // 4. 自动注入引用的支撑文档
  text = await injectSupportRefs(env, text);

  // 5. 注入知识库（如果有）
  if (opts.injectKnowledge !== false) {
    const knowledgeBlock = await loadKnowledgeBlock(env, opts.knowledgeTypes || []);
    if (knowledgeBlock) {
      text += '\n\n' + knowledgeBlock;
    }
  }

  // 6. 添加输出格式约束（让 DeepSeek 用文件分隔符标记输出）
  const outputConstraint = `

---
## 输出格式要求（必须遵守）

你的输出中如果包含多份文档或文件，请用以下分隔符标记每份文件的开始：

\`\`\`
===FILE: 文件名.md===
文件内容...

===FILE: 另一个文件名.excalidraw===
文件内容...
\`\`\`

如果只有一份主文档，直接输出内容即可，不需要分隔符。
`;

  return {
    system: text + outputConstraint,
    user: variables.USER_INPUT || variables.PRODUCT_REQUEST || '请按以上要求执行任务。',
  };
}

/**
 * 检测 spell 中的模板引用（Read templates/XXX.md）并注入内容
 */
async function injectTemplateRefs(env, text) {
  // 匹配各种 Read 模板的写法
  const patterns = [
    /Read\s+(?:.*?)templates\/([\w\-_.（）\u4e00-\u9fff]+\.md)/g,
    /读取\s+(?:.*?)templates\/([\w\-_.（）\u4e00-\u9fff]+\.md)/g,
    /加载\s+(?:.*?)templates\/([\w\-_.（）\u4e00-\u9fff]+\.md)/g,
  ];

  const refs = new Set();
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      refs.add(match[1]);
    }
  }

  if (refs.size === 0) return text;

  // 读取所有引用的模板
  let injected = '\n\n---\n## 以下是已加载的 VELA 模板（直接参考，无需再读取文件）\n';
  for (const filename of refs) {
    const tmpl = await env.R2.get(`templates/${filename}`);
    if (tmpl) {
      const content = await tmpl.text();
      // 截断过长的模板（避免超出上下文）
      const truncated = content.length > 8000 ? content.slice(0, 8000) + '\n\n... (模板内容已截断)' : content;
      injected += `\n### ${filename}\n${truncated}\n`;
    }
  }

  // 替换原文中的 Read 指令
  for (const pattern of patterns) {
    text = text.replace(new RegExp(pattern.source, 'g'), '（模板已注入到 prompt 末尾，请直接参考）');
  }

  return text + injected;
}

/**
 * 检测 spell 中的支撑文档引用并注入
 */
async function injectSupportRefs(env, text) {
  const pattern = /Read\s+(?:.*?)supports\/([\w\-_.（）\u4e00-\u9fff]+\.md)/g;
  const refs = new Set();
  let match;
  while ((match = pattern.exec(text)) !== null) {
    refs.add(match[1]);
  }

  if (refs.size === 0) return text;

  let injected = '\n\n---\n## 以下是已加载的支撑文档\n';
  for (const filename of refs) {
    const doc = await env.R2.get(`supports/${filename}`);
    if (doc) {
      const content = await doc.text();
      const truncated = content.length > 5000 ? content.slice(0, 5000) + '\n\n... (内容已截断)' : content;
      injected += `\n### ${filename}\n${truncated}\n`;
    }
  }

  text = text.replace(new RegExp(pattern.source, 'g'), '（支撑文档已注入到 prompt 末尾，请直接参考）');
  return text + injected;
}

/**
 * 加载知识库条目（html/prd/prompt/badcase/demo/retro）
 */
async function loadKnowledgeBlock(env, types) {
  if (!types || types.length === 0) return '';

  // 读知识库索引
  const indexObj = await env.R2.get('knowledge/index.json');
  if (!indexObj) return '';

  let index;
  try {
    index = JSON.parse(await indexObj.text());
  } catch (_) {
    return '';
  }

  const MAX_PER_TYPE = 3;
  const MAX_CHARS = 3000;
  let block = '\n\n---\n## 知识库参考（Prior Art）\n';
  let hasContent = false;

  for (const type of types) {
    const entries = (index.entries || [])
      .filter(e => e.type === type)
      .sort((a, b) => (b.updated || 0) - (a.updated || 0))
      .slice(0, MAX_PER_TYPE);

    for (const entry of entries) {
      const obj = await env.R2.get(entry.path);
      if (!obj) continue;
      const content = await obj.text();
      const truncated = content.length > MAX_CHARS ? content.slice(0, MAX_CHARS) + '\n...' : content;
      block += `\n### [${type}] ${entry.name || entry.path}\n${truncated}\n`;
      hasContent = true;
    }
  }

  return hasContent ? block : '';
}

/**
 * 加载行业专家上下文
 */
export async function loadIndustryExpert(env, industry) {
  if (!industry) return '';

  // 尝试精确匹配和模糊匹配
  const candidates = [
    `industry-experts/${industry}.md`,
    `industry-experts/${industry}专家.md`,
  ];

  for (const path of candidates) {
    const obj = await env.R2.get(path);
    if (obj) {
      return await obj.text();
    }
  }

  // 列出所有行业专家，找最接近的
  const list = await env.R2.list({ prefix: 'industry-experts/' });
  for (const item of list.objects || []) {
    if (item.key.includes(industry)) {
      const obj = await env.R2.get(item.key);
      if (obj) return await obj.text();
    }
  }

  return '';
}
