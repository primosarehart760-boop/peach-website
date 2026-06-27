#!/usr/bin/env node
/**
 * R2 资产上传脚本
 * 使用 wrangler r2 object put 逐个上传 spell/模板/知识库文件
 *
 * 用法：node upload-assets.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BUCKET = 'peach-assets';
const SITE_ROOT = path.resolve(__dirname, '..');
const PEACH_ROOT = path.resolve(SITE_ROOT, '..');

// 上传目录映射：本地路径 → R2 前缀
const UPLOAD_MAP = [
  // Spell 文件
  { local: path.join(SITE_ROOT, 'bridge/spells/lightning'), r2Prefix: 'spells/lightning' },
  { local: path.join(SITE_ROOT, 'bridge/spells/standard'), r2Prefix: 'spells/standard' },
  // 顶层 spell（分析/启动/闪电咒语）
  { local: path.join(SITE_ROOT, 'bridge/spells'), r2Prefix: 'spells', filesOnly: true },
  // VELA 模板（通过软链接解析）
  { local: path.join(PEACH_ROOT, 'templates'), r2Prefix: 'templates' },
  // 支撑文档
  { local: path.join(PEACH_ROOT, 'supports'), r2Prefix: 'supports', optional: true },
  // 行业专家
  { local: path.join(PEACH_ROOT, 'industry-experts'), r2Prefix: 'industry-experts' },
  // 知识库
  { local: path.join(SITE_ROOT, 'bridge/knowledge'), r2Prefix: 'knowledge', optional: true },
];

const WRANGLER = path.join(__dirname, 'node_modules/.bin/wrangler');

let uploaded = 0;
let skipped = 0;
let errors = 0;

function uploadFile(localPath, r2Key) {
  try {
    // 跳过非 .md / .json / .excalidraw 文件
    const ext = path.extname(localPath).toLowerCase();
    if (!['.md', '.json', '.excalidraw', '.txt', '.html'].includes(ext)) {
      skipped++;
      return;
    }

    console.log(`  📤 ${r2Key}`);
    execSync(`"${WRANGLER}" r2 object put "${BUCKET}/${r2Key}" --file="${localPath}" --content-type="text/plain; charset=utf-8"`, {
      stdio: 'pipe',
      timeout: 30000,
    });
    uploaded++;
  } catch (err) {
    console.error(`  ❌ 失败: ${r2Key} - ${err.message}`);
    errors++;
  }
}

function uploadDir(localDir, r2Prefix, filesOnly = false) {
  if (!fs.existsSync(localDir)) {
    console.log(`  ⚠️  目录不存在，跳过: ${localDir}`);
    return;
  }

  const entries = fs.readdirSync(localDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(localDir, entry.name);
    if (entry.isDirectory()) {
      if (!filesOnly) {
        uploadDir(fullPath, `${r2Prefix}/${entry.name}`);
      }
    } else if (entry.isFile()) {
      uploadFile(fullPath, `${r2Prefix}/${entry.name}`);
    }
  }
}

// ── 主流程 ──
console.log('🍑 桃子公司 R2 资产上传\n');

for (const mapping of UPLOAD_MAP) {
  const dirName = path.basename(mapping.local);
  console.log(`\n📁 ${mapping.r2Prefix}/`);

  if (!fs.existsSync(mapping.local) && mapping.optional) {
    console.log(`  ⚠️  可选目录不存在，跳过`);
    continue;
  }

  uploadDir(mapping.local, mapping.r2Prefix, mapping.filesOnly);
}

console.log(`\n✅ 完成：上传 ${uploaded} 个文件，跳过 ${skipped} 个，失败 ${errors} 个`);
