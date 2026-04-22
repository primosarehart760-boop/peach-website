/**
 * 桃子公司 · AI 启动器
 * - 首页大输入框逻辑 + 行业 chip 填充
 * - 全站浮动 CHAT 按钮（右下角 · 任何页可用）
 * - 后端桥接（Round 4 接 server/bridge.py · 目前先占位跳转）
 */

// ─── 行业 chip 填充输入框 ─────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('peach-input');
  document.querySelectorAll('.industry-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const industry = chip.dataset.chip;
      if (input) {
        input.value = input.value.trim() || `${industry}行业 · `;
        input.focus();
        // 光标放末尾
        input.selectionStart = input.selectionEnd = input.value.length;
      }
    });
  });

  // 键盘快捷键：⌘/Ctrl + Enter 提交
  if (input) {
    input.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        document.getElementById('peach-launcher')?.requestSubmit();
      }
    });
  }

  // 注入全站浮动 Chat 按钮
  injectFloatingChat();
});

// ─── 启动公司（首页大输入框提交）────────────────────
function launchCompany(e) {
  e.preventDefault();
  const input = document.getElementById('peach-input');
  const requirement = input.value.trim();
  if (!requirement) {
    input.focus();
    input.style.animation = 'shake 0.3s';
    setTimeout(() => input.style.animation = '', 300);
    return false;
  }

  // 保存需求到 sessionStorage · 跳 office.html 开工
  sessionStorage.setItem('peach_requirement', requirement);
  sessionStorage.setItem('peach_requirement_time', Date.now());

  // 转场动画 + 跳转
  const btn = e.target.querySelector('button[type="submit"]');
  if (btn) btn.textContent = '🚀 员工整队中...';

  setTimeout(() => {
    window.location.href = `office.html?launch=1`;
  }, 600);

  return false;
}

// ─── 全站浮动 CHAT 按钮 ──────────────────────────
function injectFloatingChat() {
  // 不在当前页已有启动器主输入框时（首页）也注入 · 作为快捷入口
  const btn = document.createElement('button');
  btn.id = 'peach-float-chat';
  btn.innerHTML = '<span class="float-chat-icon">💬</span><span class="float-chat-label">需求入口</span>';
  btn.setAttribute('aria-label', '打开桃子公司需求入口');
  btn.addEventListener('click', openChatDrawer);
  document.body.appendChild(btn);

  // Drawer 容器
  const drawer = document.createElement('div');
  drawer.id = 'peach-chat-drawer';
  drawer.innerHTML = `
    <div class="chat-drawer-backdrop" onclick="closeChatDrawer()"></div>
    <div class="chat-drawer-panel">
      <div class="chat-drawer-header">
        <div>
          <div class="chat-drawer-title">🏢 桃子公司 · 需求入口</div>
          <div class="chat-drawer-subtitle">告诉我你要做什么产品 · 整个公司立即开工</div>
        </div>
        <button class="chat-drawer-close" onclick="closeChatDrawer()" aria-label="关闭">✕</button>
      </div>
      <div class="chat-drawer-body">
        <form onsubmit="return submitDrawerForm(event)">
          <textarea id="drawer-input" rows="3" placeholder="例：招商银行 · 智能信贷审核"></textarea>
          <div class="drawer-chip-row">
            <button type="button" class="drawer-chip" data-chip="金融">💰 金融</button>
            <button type="button" class="drawer-chip" data-chip="教育">🎓 教育</button>
            <button type="button" class="drawer-chip" data-chip="医疗">🏥 医疗</button>
            <button type="button" class="drawer-chip" data-chip="短剧">🎬 短剧</button>
            <button type="button" class="drawer-chip" data-chip="电商">🛍 电商</button>
            <button type="button" class="drawer-chip" data-chip="短视频">📱 短视频</button>
            <button type="button" class="drawer-chip" data-chip="制造">🏭 制造</button>
            <button type="button" class="drawer-chip" data-chip="汽车">🚗 汽车</button>
          </div>
          <div class="drawer-mode-row">
            <label><input type="radio" name="mode" value="flash" checked> ⚡ 闪电（2 分钟）</label>
            <label><input type="radio" name="mode" value="deep"> 🏢 深度（30-60 分）</label>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 12px;">✨ 启动公司</button>
        </form>
        <p class="chat-drawer-hint">
          员工会进入办公室开工 · 右侧实时看文档产出 · 75 秒后 CEO 整合报告
        </p>
      </div>
    </div>
  `;
  document.body.appendChild(drawer);

  // Drawer chip 绑定
  drawer.querySelectorAll('.drawer-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const input = document.getElementById('drawer-input');
      input.value = input.value.trim() || `${chip.dataset.chip}行业 · `;
      input.focus();
    });
  });

  // ⌘K 快捷键打开
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openChatDrawer();
    }
    if (e.key === 'Escape') closeChatDrawer();
  });
}

function openChatDrawer() {
  const drawer = document.getElementById('peach-chat-drawer');
  if (drawer) {
    drawer.classList.add('open');
    setTimeout(() => document.getElementById('drawer-input')?.focus(), 200);
  }
}

function closeChatDrawer() {
  const drawer = document.getElementById('peach-chat-drawer');
  if (drawer) drawer.classList.remove('open');
}

function submitDrawerForm(e) {
  e.preventDefault();
  const requirement = document.getElementById('drawer-input').value.trim();
  if (!requirement) return false;
  const mode = document.querySelector('input[name="mode"]:checked').value;
  sessionStorage.setItem('peach_requirement', requirement);
  sessionStorage.setItem('peach_mode', mode);
  sessionStorage.setItem('peach_requirement_time', Date.now());
  closeChatDrawer();
  setTimeout(() => window.location.href = 'office.html?launch=1', 300);
  return false;
}
