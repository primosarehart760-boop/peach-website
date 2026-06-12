/**
 * 输出解析器 · 从 AI 输出中提取文档
 */

/**
 * 解析输出，按 ===FILE: xxx=== 分隔符拆分
 */
export function parseOutputFiles(text, defaultFilename = '文档.md') {
  const FILE_SEP = /^===FILE:\s*(.+?)\s*===\s*$/gm;
  const markers = [];
  let match;
  while ((match = FILE_SEP.exec(text)) !== null) {
    markers.push({ filename: match[1], index: match.index, end: match.index + match[0].length });
  }

  if (markers.length === 0) {
    return [{ filename: defaultFilename, content: text.trim() }];
  }

  const files = [];
  const preContent = text.slice(0, markers[0].index).trim();
  if (preContent) files.push({ filename: defaultFilename, content: preContent });

  for (let i = 0; i < markers.length; i++) {
    const start = markers[i].end;
    const end = i + 1 < markers.length ? markers[i + 1].index : text.length;
    const content = text.slice(start, end).trim();
    if (content) files.push({ filename: markers[i].filename, content });
  }

  return files;
}

/**
 * 存文件到 R2（如果有 R2 绑定）
 */
export async function saveFilesToR2(env, batchId, files) {
  if (!env?.R2) return files.map(f => ({ ...f, path: `projects/${batchId}/${f.filename}`, size: f.content.length }));
  const saved = [];
  for (const file of files) {
    const key = `projects/${batchId}/${file.filename}`;
    try { await env.R2.put(key, file.content); } catch (_) {}
    saved.push({ path: key, filename: file.filename, size: file.content.length });
  }
  return saved;
}

/**
 * 列出文件（R2 可选）
 */
export async function listBatchFiles(env, batchId) {
  if (!env?.R2) return [];
  try {
    const list = await env.R2.list({ prefix: `projects/${batchId}/` });
    return (list.objects || []).map(obj => ({
      path: obj.key, filename: obj.key.replace(`projects/${batchId}/`, ''),
      size: obj.size, uploaded: obj.uploaded,
    }));
  } catch (_) { return []; }
}

export async function readFile(env, path) {
  if (!env?.R2) return null;
  try { const obj = await env.R2.get(path); return obj ? await obj.text() : null; } catch (_) { return null; }
}
