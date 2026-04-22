// 主题切换
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('peach-theme') || 'editorial';
  applyTheme(savedTheme);

  document.querySelectorAll('.theme-btn').forEach(btn => {
    if (btn.dataset.theme === savedTheme) btn.classList.add('active');
    else btn.classList.remove('active');

    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      applyTheme(theme);
      localStorage.setItem('peach-theme', theme);
      document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});

function applyTheme(theme) {
  document.body.className = document.body.className
    .split(' ')
    .filter(c => !c.startsWith('theme-'))
    .join(' ');
  if (theme !== 'editorial') {
    document.body.classList.add('theme-' + theme);
  }
}
