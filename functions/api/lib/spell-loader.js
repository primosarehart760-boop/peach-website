/**
 * Spell 加载器 · 从打包的 bundle 中读取（无需 R2）
 */

import { BUNDLE } from './spells-bundle.js';

/**
 * 加载 spell 并注入所有依赖内容
 */
export async function loadSpell(env, spellPath, variables = {}, opts = {}) {
  let text = BUNDLE[spellPath];
  if (!text) throw new Error(`Spell not found: ${spellPath}`);

  for (const [k, v] of Object.entries(variables)) {
    text = text.replaceAll(`{{${k}}}`, v || '');
  }

  text = injectTemplateRefs(text);
  text = injectSupportRefs(text);

  const outputConstraint = `

---
## 输出格式要求（必须遵守）

你的输出中如果包含多份文档或文件，请用以下分隔符标记每份文件的开始：

\`\`\`
===FILE: 文件名.md===
文件内容...
\`\`\`

如果只有一份主文档，直接输出内容即可，不需要分隔符。
`;

  return {
    system: text + outputConstraint,
    user: variables.USER_INPUT || variables.PRODUCT_REQUEST || '请按以上要求执行任务。',
  };
}

function injectTemplateRefs(text) {
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

  let injected = '\n\n---\n## 以下是已加载的 VELA 模板（直接参考，无需再读取文件）\n';
  for (const filename of refs) {
    const content = BUNDLE[`templates/${filename}`];
    if (content) {
      const truncated = content.length > 8000 ? content.slice(0, 8000) + '\n\n... (模板内容已截断)' : content;
      injected += `\n### ${filename}\n${truncated}\n`;
    }
  }

  for (const pattern of patterns) {
    text = text.replace(new RegExp(pattern.source, 'g'), '（模板已注入到 prompt 末尾，请直接参考）');
  }

  return text + injected;
}

function injectSupportRefs(text) {
  const pattern = /Read\s+(?:.*?)supports\/([\w\-_.（）\u4e00-\u9fff]+\.md)/g;
  const refs = new Set();
  let match;
  while ((match = pattern.exec(text)) !== null) {
    refs.add(match[1]);
  }

  if (refs.size === 0) return text;

  let injected = '\n\n---\n## 以下是已加载的支撑文档\n';
  for (const filename of refs) {
    const content = BUNDLE[`supports/${filename}`];
    if (content) {
      const truncated = content.length > 5000 ? content.slice(0, 5000) + '\n\n... (内容已截断)' : content;
      injected += `\n### ${filename}\n${truncated}\n`;
    }
  }

  text = text.replace(new RegExp(pattern.source, 'g'), '（支撑文档已注入到 prompt 末尾，请直接参考）');
  return text + injected;
}

export async function loadIndustryExpert(env, industry) {
  if (!industry) return '';

  for (const [key, content] of Object.entries(BUNDLE)) {
    if (key.startsWith('industry-experts/') && key.includes(industry)) {
      return content;
    }
  }

  return BUNDLE['industry-experts/00_通用平台专家.md'] || '';
}
