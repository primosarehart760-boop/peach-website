#!/usr/bin/env node
/**
 * 打包 spell/模板/行业专家 到一个 JS 模块
 * 运行后生成 spells-bundle.js，Pages Functions 直接 import
 *
 * 用法：node functions/api/lib/bundle-spells.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.resolve(__dirname, '../../..');
const PEACH_ROOT = path.resolve(SITE_ROOT, '..');

const bundle = {};

function readDir(dir, prefix) {
  if (!fs.existsSync(dir)) {
    console.log(`  ⚠️  跳过: ${dir}`);
    return;
  }
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      readDir(fullPath, `${prefix}/${entry.name}`);
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.json'))) {
      const key = `${prefix}/${entry.name}`;
      try {
        bundle[key] = fs.readFileSync(fullPath, 'utf-8');
        console.log(`  ✅ ${key}`);
      } catch (err) {
        console.log(`  ❌ ${key}: ${err.message}`);
      }
    }
  }
}

function readDirFlat(dir, prefix) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.md')) {
      const fullPath = path.join(dir, entry.name);
      const key = `${prefix}/${entry.name}`;
      try {
        bundle[key] = fs.readFileSync(fullPath, 'utf-8');
        console.log(`  ✅ ${key}`);
      } catch (_) {}
    }
  }
}

console.log('🍑 打包 spell/模板资产\n');

// Spell 文件
console.log('📁 spells/');
readDirFlat(path.join(SITE_ROOT, 'bridge/spells'), 'spells');
readDir(path.join(SITE_ROOT, 'bridge/spells/lightning'), 'spells/lightning');
readDir(path.join(SITE_ROOT, 'bridge/spells/standard'), 'spells/standard');

// VELA 模板（通过软链接解析）
console.log('\n📁 templates/');
readDirFlat(path.join(PEACH_ROOT, 'templates'), 'templates');

// 行业专家
console.log('\n📁 industry-experts/');
readDirFlat(path.join(PEACH_ROOT, 'industry-experts'), 'industry-experts');

// 输出 JS 模块
const outPath = path.join(__dirname, 'spells-bundle.js');
const content = `// 自动生成 · 运行 node functions/api/lib/bundle-spells.js 更新
// 生成时间: ${new Date().toISOString()}
// 文件数: ${Object.keys(bundle).length}

export const BUNDLE = ${JSON.stringify(bundle, null, 0)};
`;

fs.writeFileSync(outPath, content, 'utf-8');
console.log(`\n✅ 打包完成: ${Object.keys(bundle).length} 个文件 → spells-bundle.js (${(content.length / 1024).toFixed(0)} KB)`);
