/* =========================================================
 * Peach Studio · Prompt Runner MVP v1.0
 * =========================================================
 * 目的：网站填参数 → 一键复制完整 Prompt → 贴到 Claude Code 跑
 * 不接 API · 利用老板已有的 Claude Code · 零成本
 *
 * 挂载方式：methodology.html 已加载 → 自动监听弹窗 Open → 注入"🚀 填参数"按钮
 * 2026-04-23
 * ========================================================= */

(function() {
  'use strict';

  const STYLE = `
    .ppr-launch-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 18px;
      background: linear-gradient(135deg, var(--peach, #d16a4e), #c25a3f);
      color: white;
      border: none;
      border-radius: 20px;
      font-family: var(--font-serif, 'Instrument Serif', serif);
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(209,106,78,0.3);
      transition: all 0.2s;
      margin-right: 8px;
    }
    .ppr-launch-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(209,106,78,0.4); }
    .ppr-launch-btn:active { transform: translateY(0); }

    /* 填参数 Modal */
    .ppr-modal { display: none; position: fixed; inset: 0; z-index: 9999; background: rgba(42,37,32,0.6); backdrop-filter: blur(4px); justify-content: center; align-items: center; }
    .ppr-modal.show { display: flex; animation: ppr-fade-in 0.3s; }
    @keyframes ppr-fade-in { from { opacity: 0; } to { opacity: 1; } }
    .ppr-box {
      background: var(--paper, #faf5ea);
      border-radius: 16px;
      max-width: 720px; width: 92%;
      max-height: 85vh;
      overflow-y: auto;
      padding: 32px;
      box-shadow: 0 24px 60px rgba(0,0,0,0.25);
      position: relative;
    }
    .ppr-box h3 {
      font-family: var(--font-serif, 'Instrument Serif', serif);
      font-size: 26px;
      color: var(--ink-deep, #2a2520);
      margin: 0 0 8px;
    }
    .ppr-box .sub {
      font-family: var(--font-hand, 'Caveat', cursive);
      color: var(--peach, #d16a4e);
      font-size: 15px;
      margin-bottom: 24px;
    }
    .ppr-close {
      position: absolute; top: 16px; right: 20px;
      background: none; border: none;
      font-size: 24px; color: var(--ink-soft, #5a534a);
      cursor: pointer; line-height: 1;
    }

    .ppr-row { margin-bottom: 18px; }
    .ppr-label {
      display: block;
      font-weight: 600;
      color: var(--ink-deep, #2a2520);
      margin-bottom: 6px;
      font-size: 14px;
    }
    .ppr-label .var { color: var(--peach, #d16a4e); font-family: monospace; font-size: 13px; font-weight: 400; margin-left: 6px; }
    .ppr-input, .ppr-textarea {
      width: 100%;
      padding: 10px 14px;
      border: 1.5px solid var(--paper-dark, #e8dfd0);
      border-radius: 8px;
      font-family: inherit;
      font-size: 14px;
      background: white;
      box-sizing: border-box;
      transition: border-color 0.15s;
    }
    .ppr-input:focus, .ppr-textarea:focus { outline: none; border-color: var(--peach, #d16a4e); }
    .ppr-textarea { min-height: 70px; resize: vertical; }

    .ppr-hint {
      font-size: 12px; color: var(--ink-faint, #8a8278);
      margin-top: 4px;
      font-style: italic;
    }

    .ppr-actions {
      display: flex; gap: 10px; justify-content: flex-end;
      margin-top: 20px;
      padding-top: 18px;
      border-top: 1px solid var(--paper-dark, #e8dfd0);
    }
    .ppr-btn {
      padding: 10px 22px;
      border: none; border-radius: 20px;
      font-family: inherit;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .ppr-btn-primary { background: var(--peach, #d16a4e); color: white; }
    .ppr-btn-primary:hover { background: #b95838; }
    .ppr-btn-secondary { background: white; color: var(--ink-soft, #5a534a); border: 1.5px solid var(--paper-dark, #e8dfd0); }
    .ppr-btn-secondary:hover { border-color: var(--peach, #d16a4e); color: var(--peach, #d16a4e); }

    /* 结果预览 */
    .ppr-result { display: none; }
    .ppr-result.show { display: block; }
    .ppr-result pre {
      background: #2a2520; color: #f4ede0;
      padding: 16px;
      border-radius: 10px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      max-height: 360px;
      overflow-y: auto;
      white-space: pre-wrap;
      word-break: break-word;
      line-height: 1.55;
    }
    .ppr-success-tip {
      margin-top: 14px; padding: 14px 18px;
      background: linear-gradient(135deg, rgba(154,168,137,0.12), rgba(201,168,120,0.08));
      border-left: 3px solid var(--sage-deep, #7a8868);
      border-radius: 8px;
      font-size: 14px;
      color: var(--ink-deep, #2a2520);
      line-height: 1.7;
    }
    .ppr-success-tip strong { color: var(--peach, #d16a4e); }

    .ppr-empty {
      padding: 40px 20px; text-align: center;
      color: var(--ink-faint, #8a8278);
      font-style: italic;
    }
  `;

  function el(tag, attrs, kids) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'className') e.className = attrs[k];
      else if (k === 'onclick') e.onclick = attrs[k];
      else if (k === 'innerHTML') e.innerHTML = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    if (kids) (Array.isArray(kids) ? kids : [kids]).forEach(c => {
      if (typeof c === 'string') e.appendChild(document.createTextNode(c));
      else if (c) e.appendChild(c);
    });
    return e;
  }

  // 注入样式
  function injectStyle() {
    if (document.getElementById('ppr-style')) return;
    const s = document.createElement('style');
    s.id = 'ppr-style';
    s.textContent = STYLE;
    document.head.appendChild(s);
  }

  // 从 md 文本提取所有 {{占位符}}
  function extractVariables(text) {
    if (!text) return [];
    const re = /\{\{\s*([^{}\s]+(?:\s+[^{}\s]+)*)\s*\}\}/g;
    const seen = new Set();
    const vars = [];
    let m;
    while ((m = re.exec(text)) !== null) {
      const name = m[1].trim();
      if (!seen.has(name)) { seen.add(name); vars.push(name); }
    }
    return vars;
  }

  // 替换变量
  function fillVariables(text, values) {
    if (!text) return '';
    return text.replace(/\{\{\s*([^{}\s]+(?:\s+[^{}\s]+)*)\s*\}\}/g, (match, name) => {
      const v = values[name.trim()];
      return (v !== undefined && v !== '') ? v : match;
    });
  }

  // 复制到剪贴板
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); return true; }
      catch (e2) { return false; }
      finally { document.body.removeChild(ta); }
    }
  }

  // 建 Modal
  function buildModal(promptText, meta) {
    const vars = extractVariables(promptText);
    const modal = el('div', { className: 'ppr-modal', id: 'ppr-modal-instance' });
    const box = el('div', { className: 'ppr-box' });

    box.appendChild(el('button', { className: 'ppr-close', onclick: closeModal }, '✕'));
    box.appendChild(el('h3', {}, '🚀 填参数 · 一键生成可跑 Prompt'));
    box.appendChild(el('div', { className: 'sub' }, meta.title + ' · 填完复制 · 贴到 Claude Code 即跑'));

    const form = el('div', { id: 'ppr-form' });

    if (vars.length === 0) {
      form.appendChild(el('div', { className: 'ppr-empty' },
        '这份 Prompt 没有 {{占位符}}，不需填参数。点"生成并复制"直接用。'
      ));
    } else {
      vars.forEach(name => {
        const row = el('div', { className: 'ppr-row' });
        const label = el('label', { className: 'ppr-label' });
        label.appendChild(document.createTextNode(name));
        label.appendChild(el('span', { className: 'var' }, '{{' + name + '}}'));
        row.appendChild(label);

        const useTextarea = name.length > 6 || /描述|定位|用户|场景|目标|需求|上游|约束|规则|背景/.test(name);
        const input = el(useTextarea ? 'textarea' : 'input', {
          className: useTextarea ? 'ppr-textarea' : 'ppr-input',
          'data-var': name,
          placeholder: '请填入 ' + name
        });
        if (!useTextarea) input.setAttribute('type', 'text');
        row.appendChild(input);
        form.appendChild(row);
      });
    }

    box.appendChild(form);

    // 按钮
    const actions = el('div', { className: 'ppr-actions' });
    actions.appendChild(el('button', {
      className: 'ppr-btn ppr-btn-secondary',
      onclick: closeModal
    }, '取消'));
    actions.appendChild(el('button', {
      className: 'ppr-btn ppr-btn-primary',
      onclick: () => generateAndCopy(promptText, meta)
    }, '📋 生成完整 Prompt 并复制'));
    box.appendChild(actions);

    // 结果预览
    const result = el('div', { className: 'ppr-result', id: 'ppr-result-block' });
    box.appendChild(result);

    modal.appendChild(box);
    modal.onclick = (e) => { if (e.target === modal) closeModal(); };
    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('show'));
  }

  function closeModal() {
    const m = document.getElementById('ppr-modal-instance');
    if (m) { m.classList.remove('show'); setTimeout(() => m.remove(), 200); }
  }

  async function generateAndCopy(promptText, meta) {
    // 收集表单值
    const inputs = document.querySelectorAll('#ppr-form [data-var]');
    const values = {};
    inputs.forEach(inp => { values[inp.getAttribute('data-var')] = inp.value.trim(); });

    const filled = fillVariables(promptText, values);
    const ok = await copyToClipboard(filled);

    const result = document.getElementById('ppr-result-block');
    result.innerHTML = '';
    result.classList.add('show');

    const tip = el('div', { className: 'ppr-success-tip' });
    if (ok) {
      tip.innerHTML =
        '✅ <strong>已复制到剪贴板</strong><br>' +
        '👉 下一步：打开 <strong>Claude Code</strong>（或任何 LLM 窗口）· 粘贴即跑<br>' +
        '💡 贴给 Claude Code 时可以加一句："按这个 Prompt 产出完整文档 · 归档到 Obsidian"';
    } else {
      tip.innerHTML = '⚠️ 自动复制失败 · 下方预览可手动复制';
    }
    result.appendChild(tip);

    const preview = el('pre', {}, filled.length > 8000 ? filled.substring(0, 8000) + '\n\n... (已复制完整内容 · 预览截断)' : filled);
    result.appendChild(preview);
  }

  // 向外暴露主函数
  window.PeachPromptRunner = {
    launch: function(promptText, meta) {
      injectStyle();
      buildModal(promptText || '', meta || { title: 'Prompt' });
    }
  };

  // 监听 methodology 原有弹窗 · 自动注入"🚀 填参数"按钮
  function injectLaunchButton() {
    injectStyle();
    // 找弹窗的操作区（methodology.html 的 .prompt-btn 附近）
    const modal = document.getElementById('promptModal');
    if (!modal) return false;

    // 监听 modal 内部变化 · 每次 open 时注入按钮
    const observer = new MutationObserver(() => {
      if (!modal.classList.contains('show')) return;
      // 避免重复注入
      if (modal.querySelector('.ppr-launch-btn')) return;

      // 找到 "复制模板" 按钮 · 在其旁边插入 "🚀 填参数"
      const templateCopyBtns = modal.querySelectorAll('.prompt-btn');
      let anchor = null;
      templateCopyBtns.forEach(b => {
        if (b.textContent.includes('复制模板') || b.textContent.includes('复制 Prompt')) {
          anchor = b;
        }
      });

      // 提取当前 Prompt 内容（从 modal DOM 中找到 markdown 渲染后的源文本）
      // 策略：用 fetch 的原文 · 如果没有就从 DOM 重建
      const titleEl = modal.querySelector('#pmTitle');
      const bodyEl = modal.querySelector('#pmBody');
      if (!bodyEl) return;

      // 从 modal 的 link 提取 md 路径 · 再 fetch 原文
      const mdLink = modal.querySelector('a.prompt-btn[href*=".md"]');
      const mdPath = mdLink ? mdLink.getAttribute('href') : null;

      const btn = el('button', {
        className: 'ppr-launch-btn',
        onclick: async () => {
          // 重新 fetch md 原文 · 拿到含 {{占位符}} 的纯文本
          let text = '';
          if (mdPath) {
            try {
              const resp = await fetch(mdPath);
              if (resp.ok) text = await resp.text();
            } catch (e) { /* 忽略 */ }
          }
          // fallback：直接用 body 的 textContent（没占位符也能走通）
          if (!text) text = bodyEl.innerText || bodyEl.textContent || '';

          window.PeachPromptRunner.launch(text, {
            title: titleEl ? titleEl.textContent : 'Prompt'
          });
        }
      }, '🚀 填参数开跑');

      // 插在第一个按钮前
      if (anchor && anchor.parentNode) {
        anchor.parentNode.insertBefore(btn, anchor);
      } else {
        // 兜底：插在 body 顶部
        const firstH3 = bodyEl.querySelector('h3');
        if (firstH3 && firstH3.parentNode) {
          firstH3.parentNode.insertBefore(btn, firstH3.nextSibling);
        }
      }
    });

    observer.observe(modal, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
    return true;
  }

  // 启动
  function init() {
    if (!injectLaunchButton()) {
      // 若 modal 还没加载 · 延迟重试
      setTimeout(init, 500);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
