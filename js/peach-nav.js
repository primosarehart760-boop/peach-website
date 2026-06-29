/**
 * Peach Studio · 共享导航栏组件
 * 所有页面引入此 JS，导航栏自动渲染，加页面/改链接只改这一处
 *
 * 用法：在 HTML 中放 <nav id="peach-nav"></nav>，然后 <script src="js/peach-nav.js"></script>
 */
(function () {
  const NAV_LINKS = [
    { href: 'index.html',         icon: '🎯', label: '需求入口' },
    { href: 'methodology.html',   icon: '📚', label: '方法论' },
    { href: 'workspace.html',     icon: '📊', label: '分析工作台' },
    { href: 'collaboration.html', icon: '🤝', label: '协作台' },
    { href: 'industries.html',    icon: '🏭', label: '行业库' },
    { href: 'experts.html',       icon: '🧠', label: '专家团' },
    { href: 'results.html',       icon: '📦', label: '结果工作台' },
    { href: 'docs.html',          icon: '🔄', label: '回流' },
  ];

  const NAV_MORE = [
    { href: 'projects.html', icon: '📁', label: '项目历史' },
    { href: 'manual.html',   icon: '📘', label: '使用手册' },
    { href: 'cases.html',    icon: '📂', label: '案例库' },
    { href: 'team.html',     icon: '👥', label: '团队' },
    { href: 'office.html',   icon: '🎬', label: '办公室' },
  ];

  const THEMES = [
    { key: 'editorial',  icon: '🍑', title: 'Editorial Peach' },
    { key: 'airbnb',     icon: '🏠', title: 'Airbnb' },
    { key: 'linear',     icon: '⚡', title: 'Linear' },
    { key: 'pinterest',  icon: '📌', title: 'Pinterest' },
    { key: 'stripe',     icon: '💳', title: 'Stripe' },
  ];

  function currentPage() {
    const path = location.pathname.split('/').pop() || 'index.html';
    return path;
  }

  function render() {
    const nav = document.getElementById('peach-nav');
    if (!nav) return;

    const cur = currentPage();

    const mainLinks = NAV_LINKS.map(l =>
      `<a href="${l.href}" class="nav-link${l.href === cur ? ' active' : ''}">${l.icon} ${l.label}</a>`
    ).join('\n      ');

    const moreLinks = NAV_MORE.map(l =>
      `<a href="${l.href}"${l.href === cur ? ' class="active"' : ''}>${l.icon} ${l.label}</a>`
    ).join('\n          ');

    const themeButtons = THEMES.map((t, i) =>
      `<button class="theme-btn${i === 0 ? ' active' : ''}" data-theme="${t.key}" title="${t.title}">${t.icon}</button>`
    ).join('\n        ');

    nav.className = 'nav';
    nav.innerHTML = `
  <div class="container nav-content">
    <a href="index.html" class="nav-logo"><span class="emoji">🏢</span>Peach Studio</a>
    <div class="nav-links">
      ${mainLinks}
      <div class="nav-more-wrap">
        <button class="nav-more-trigger" aria-haspopup="true" onclick="this.closest('.nav-more-wrap').classList.toggle('open')">更多 ▾</button>
        <div class="nav-dropdown">
          ${moreLinks}
        </div>
      </div>
      <div class="theme-switcher">
        ${themeButtons}
      </div>
    </div>
  </div>`;
  }

  // DOM ready 时渲染
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
