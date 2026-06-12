/**
 * 桃子公司全局配置 · 自动检测环境
 *
 * 本地开发：Worker 跑在 localhost:8787
 * 生产环境：Worker 部署到 Cloudflare（URL 在这里配置）
 */
(function() {
  'use strict';

  // Worker 生产 URL（部署后替换）
  const WORKER_PROD_URL = '';  // 留空表示同源（Pages Functions 模式）

  // 自动检测：本地开发 vs 生产
  const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

  // 全局 BRIDGE 地址
  // - 本地开发：指向本地 Worker dev server
  // - 生产环境：空字符串（同源）或 Worker URL
  window.PEACH_BRIDGE = isLocal ? 'http://localhost:8787' : WORKER_PROD_URL;

  // 兼容旧代码中直接用 BRIDGE 变量的页面
  // 各页面可以 const BRIDGE = window.PEACH_BRIDGE; 来获取
})();
