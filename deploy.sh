#!/bin/bash
# 桃子公司 · 一键部署（任何电脑可用）
# 用法：bash deploy.sh

cd "$(dirname "$0")"

echo "🍑 桃子公司部署"
echo ""

# 绕过代理
export NO_PROXY="localhost,127.0.0.1"
unset HTTP_PROXY HTTPS_PROXY http_proxy https_proxy ALL_PROXY all_proxy

# 检查 wrangler
if ! command -v npx &> /dev/null; then
  echo "❌ 需要 Node.js，请先安装：https://nodejs.org"
  exit 1
fi

# 登录检查
echo "检查 Cloudflare 登录状态..."
if ! npx wrangler whoami 2>&1 | grep -q "logged in"; then
  echo "需要登录 Cloudflare..."
  npx wrangler login
fi

# 准备干净部署目录
echo ""
echo "准备文件..."
DEPLOY=$(mktemp -d)
cp -R *.html css/ js/ prompts/ _worker.js _worker.full.js wrangler.toml "$DEPLOY/" 2>/dev/null
# 删除可能的断链
find "$DEPLOY" -type l ! -exec test -e {} \; -delete 2>/dev/null

echo "部署到 Cloudflare Pages..."
npx wrangler pages deploy "$DEPLOY" --project-name=peach-website --commit-dirty=true

# 清理
rm -rf "$DEPLOY"

echo ""
echo "✅ 部署完成！打开 https://peach-website.pages.dev"
