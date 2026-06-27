/**
 * 输出解析器 · 从 DeepSeek 返回文本中提取文档
 */

/**
 * 解析 AI 输出，按 ===FILE: xxx=== 分隔符拆分成多个文件
 * @param {string} text - AI 的完整输出文本
 * @param {string} defaultFilename - 没有分隔符时的默认文件名
 * @returns {Array<{filename: string, content: string}>}
 */
export function parseOutputFiles(text, defaultFilename = '文档.md') {
  const FILE_SEP = /^===FILE:\s*(.+?)\s*===\s*$/gm;

  // 找到所有分隔符位置
  const markers = [];
  let match;
  while ((match = FILE_SEP.exec(text)) !== null) {
    markers.push({ filename: match[1], index: match.index, end: match.index + match[0].length });
  }

  // 没有分隔符 → 整个输出当作一个文件
  if (markers.length === 0) {
    return [{ filename: defaultFilename, content: text.trim() }];
  }

  const files = [];

  // 分隔符前面的内容（如果有）→ 作为主文档
  const preContent = text.slice(0, markers[0].index).trim();
  if (preContent) {
    files.push({ filename: defaultFilename, content: preContent });
  }

  // 按分隔符拆分
  for (let i = 0; i < markers.length; i++) {
    const start = markers[i].end;
    const end = i + 1 < markers.length ? markers[i + 1].index : text.length;
    const content = text.slice(start, end).trim();
    if (content) {
      files.push({ filename: markers[i].filename, content });
    }
  }

  return files;
}

/**
 * 将解析出的文件存到 R2
 * @param {object} env - Worker 环境
 * @param {string} batchId - 批次 ID
 * @param {Array<{filename: string, content: string}>} files - 文件列表
 */
export async function saveFilesToR2(env, batchId, files) {
  const saved = [];
  for (const file of files) {
    const key = `projects/${batchId}/${file.filename}`;
    await env.R2.put(key, file.content, {
      customMetadata: {
        created: new Date().toISOString(),
        batch_id: batchId,
      },
    });
    saved.push({ path: key, filename: file.filename, size: file.content.length });
  }
  return saved;
}

/**
 * 列出某批次下的所有文件
 */
export async function listBatchFiles(env, batchId) {
  const list = await env.R2.list({ prefix: `projects/${batchId}/` });
  const files = [];
  for (const obj of list.objects || []) {
    files.push({
      path: obj.key,
      filename: obj.key.replace(`projects/${batchId}/`, ''),
      size: obj.size,
      uploaded: obj.uploaded,
    });
  }
  return files;
}

/**
 * 读取某个文件的内容
 */
export async function readFile(env, path) {
  const obj = await env.R2.get(path);
  if (!obj) return null;
  return await obj.text();
}
