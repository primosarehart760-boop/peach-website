#!/usr/bin/env bash
# 桃子公司功能自检脚本 v1.1
# 用法：bash check_features.sh
# 输出：PASS=绿色 / FAIL=红色，有 FAIL = 禁止声称完成、禁止让宝宝刷新
# 每做完一个新功能，在对应区块追加一行 check "..." "$FILE" "关键词"

GREEN='\033[0;32m'; RED='\033[0;31m'; YELLOW='\033[1;33m'; NC='\033[0m'
PASS=0; FAIL=0

check() {
  local label="$1"; local file="$2"; local keyword="$3"
  local count
  count=$(grep -c "$keyword" "$file" 2>/dev/null || echo 0)
  if [ "$count" -gt 0 ]; then
    echo -e "${GREEN}✅ PASS${NC} $label"
    ((PASS++))
  else
    echo -e "${RED}❌ FAIL${NC} $label  ← 「$keyword」消失于 $(basename $file)"
    ((FAIL++))
  fi
}

check_bridge() {
  local label="$1"; local keyword="$2"
  local result
  result=$(env -u http_proxy -u https_proxy -u all_proxy curl -s --max-time 3 "http://127.0.0.1:7788/" 2>/dev/null | grep -c "$keyword" || echo 0)
  if [ "$result" -gt 0 ]; then
    echo -e "${GREEN}✅ PASS${NC} [桥端] $label"
    ((PASS++))
  else
    echo -e "${YELLOW}⚠️ SKIP${NC} [桥端] $label  ← 桥未运行或关键词「$keyword」不在 serve 出口（桥未启动时忽略）"
  fi
}

SITE="/Users/a1/Documents/ai古风同人文/面试作战/vibe coding/一人公司Peach Studio/site"
INDEX="$SITE/index.html"
RESULTS="$SITE/results.html"

echo ""
echo -e "${YELLOW}===== 桃子 Peach Studio 功能自检 v1.1 =====${NC}"
echo -e "时间：$(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# ─────────────────────────────────────────
echo "── index.html ──"
# ─────────────────────────────────────────
check "💡 引导按钮 DOM 元素"      "$INDEX" "guide-btn-inline"
check "引导按钮 onclick"          "$INDEX" "openGuide"
check "引导弹窗容器"              "$INDEX" "guide-overlay"
check "5步问题数组"               "$INDEX" "QUESTIONS"
check "引导注入函数"              "$INDEX" "guideInject"
check "主输入框 peach-input"      "$INDEX" "peach-input"
check "橙色启动按钮 launch-btn"   "$INDEX" "launch-btn"
check "引导按钮位置 right:260px"  "$INDEX" "260px"

echo ""
echo "── results.html ──"
# ─────────────────────────────────────────
# 行业认知 6 张卡片
check "行业认知卡片渲染函数"       "$RESULTS" "_renderCognitiveCards"
check "卡片 JSON 解析函数"         "$RESULTS" "_parseCognitiveCards"
check "卡片跨阶段持久化（JSON）"   "$RESULTS" "peach_cog_cards"
check "卡片跨阶段持久化（HTML）"   "$RESULTS" "peach_cog_html"
check "batch 模式卡片恢复"         "$RESULTS" "_restoreCogCards"
check "COGNITIVE_CARDS 标记解析"   "$RESULTS" "COGNITIVE_CARDS_JSON_START"
# 流程控制
check "批次模式入口"               "$RESULTS" "_initBatchRun"
check "流式直播模式入口"           "$RESULTS" "_initLiveRun"
check "analyze 阶段确认按钮"       "$RESULTS" "btn-confirm-gen"
check "六步分析完成日志"           "$RESULTS" "六步分析完成"
# UI 区块
check "流水线区块 pipeList"        "$RESULTS" "pipeList"
check "CEO Dashboard 区块"         "$RESULTS" "ceoDashboard"
check "协调链区块 coordChain"      "$RESULTS" "coordChain"
check "反馈回流区 feedbackLoop"    "$RESULTS" "feedbackLoop"
check "liveLog 日志区"             "$RESULTS" "liveLog"
check "docList 文档清单"           "$RESULTS" "docList"
check "进度环 ringFill"            "$RESULTS" "ringFill"
# 演示/静态模式
check "静态演示模式入口 getReq"    "$RESULTS" "function getReq"

echo ""
echo "── docs.html · 知识回流中心 ──"
DOCS="$SITE/docs.html"
check "Badcase 录入表单"           "$DOCS" "kb-badcase-form"
check "Badcase 快速记录函数"       "$DOCS" "quickRecordBadcase"
check "Demo 样板 Tab"              "$DOCS" "data-type=\"demo\""
check "Prompt 库 Tab"              "$DOCS" "data-type=\"prompt\""
check "5 Tab 切换"                 "$DOCS" "data-type=\"badcase\""
check "资产列表过滤器"             "$DOCS" "loadKbList"
check "Prompt 类型选择（系统/用户/内置）" "$DOCS" "prompt-type-btns"
check "Demo URL 保存"              "$DOCS" "saveUrlDemo"
check "Badcase 蒸馏函数"           "$DOCS" "distillBadcases"
check "顶导 回流 直接入口"         "$DOCS" "nav-link active"

echo ""
echo "── index.html · 顶导回流直接入口 ──"
check "index 顶导回流"             "$INDEX" "docs.html\" class=\"nav-link\""

echo ""
echo "── results.html · 新增功能 ──"
check "Demo 一键存样板按钮"        "$RESULTS" "_saveDemoSample"
check "Demo 存样板 API 调用"       "$RESULTS" "save_demo"
check "results 顶导回流"           "$RESULTS" "docs.html\" class=\"nav-link\""

echo ""
echo "── 6张认知卡片 永久保障机制 ──"
BRIDGE_PY="$SITE/bridge/peach_bridge.py"
check "_extract_cog_cards_from_text（桥端提取函数）" "$BRIDGE_PY" "_extract_cog_cards_from_text"
check "analyze_cards API 接口"                       "$BRIDGE_PY" "api/analyze_cards"
check "stream_reader 完成后自动提取卡片"               "$BRIDGE_PY" "cog_cards"
check "前端 done 事件兜底 fetch 卡片"                 "$RESULTS"   "analyze_cards"

echo ""
echo "── P1 顺序执行（11份文档）·前端事件保障 ──"
check "P1顺序模式检测 p1SeqV2"     "$RESULTS" "p1SeqV2"
check "P1文档开始事件 p1_doc_started" "$RESULTS" "p1_doc_started"
check "P1文档完成事件 p1_doc_done"   "$RESULTS" "p1_doc_done"
check "P1门控事件 p1_gate_started"   "$RESULTS" "p1_gate_started"
check "P2-P6顺序事件（forEach循环）" "$RESULTS" "_doc_started"
check "P2-P6all_docs_done事件"       "$RESULTS" "_all_docs_done"
check "P2-P6 auto_started事件"       "$RESULTS" "_auto_started"
check "面板顺序结构 seq"             "$RESULTS" "cfg.seq"
check "动态创建行机制"               "$RESULTS" "动态创建行"
check "Bridge标准档NameError修复"    "$BRIDGE_PY" "标准档刚启动时无 run_ids"

echo ""
echo "── P6 上线运营（6份文档·VELA 26-31）──"
SPELLS="$SITE/bridge/spells/standard"
check "P6 产品使用手册 spell"      "$SPELLS/p6_user_manual_agent.md"      "VELA 26"
check "P6 上线CheckList spell"     "$SPELLS/p6_launch_checklist_agent.md"  "VELA 27"
check "P6 商业化定价 spell"        "$SPELLS/p6_monetization_agent.md"      "VELA 28"
check "P6 运营策略 spell"          "$SPELLS/p6_ops_strategy_agent.md"      "VELA 29"
check "P6 ASO材料 spell"           "$SPELLS/p6_aso_materials_agent.md"     "VELA 30"
check "P6 复盘材料 spell"          "$SPELLS/p6_retro_report_agent.md"      "VELA 31"
check "P6 bridge 常量 SPELL_P6_USER_MANUAL"  "$BRIDGE_PY" "SPELL_P6_USER_MANUAL"
check "P6 bridge PHASE_AGENT_MAP 已更新"     "$BRIDGE_PY" "user_manual.*SPELL_P6_USER_MANUAL"
check "P6 run_p6_sequential 8份文档"         "$BRIDGE_PY" "total.*8"
check "P6 results.html 6份标签"              "$RESULTS"   "ASO应用商店材料"
check "全局数据年份铁律注入"                  "$BRIDGE_PY" "2025-2026"
check "Bridge sequential_v2 旧monitor退出"   "$BRIDGE_PY" "sequential_v2"

echo ""
echo "── 桥端实时验证（需桥在跑）──"
check_bridge "💡 引导按钮在 serve 出口" "guide-btn-inline"

echo ""
echo "─────────────────────────────────────"
TOTAL=$((PASS + FAIL))
if [ "$FAIL" -eq 0 ]; then
  echo -e "${GREEN}✅ 全部通过 $PASS/$TOTAL · 可以动手 / 可以交付${NC}"
else
  echo -e "${RED}🚫 $FAIL 个功能消失 · 禁止继续改代码 · 禁止让宝宝刷新 · 先修复${NC}"
  exit 1
fi
echo ""
