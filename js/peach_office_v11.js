/* =========================================================
 * Peach Studio · office.html v1.1 办公室地图 v1.0
 * =========================================================
 * 挂载点：<section id="peach-office-v11"></section>
 * 展示：41 工位 · 9 分区 · 实时状态
 * 2026-04-23
 * ========================================================= */

(function() {
  'use strict';

  const STYLE = `
    .pof-section { padding: 60px 0; background: linear-gradient(180deg, var(--paper-light, #f4ede0), var(--paper, #faf5ea)); border-top: 2px solid var(--paper-dark, #e8dfd0); }
    .pof-container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
    .pof-header { text-align: center; margin-bottom: 40px; }
    .pof-hand { font-family: var(--font-hand, 'Caveat', cursive); color: var(--peach, #d16a4e); font-size: 16px; letter-spacing: 2px; }
    .pof-title { font-family: var(--font-serif, 'Instrument Serif', serif); font-size: 40px; color: var(--ink-deep, #2a2520); margin: 8px 0; }
    .pof-title .it { font-style: italic; color: var(--peach, #d16a4e); }
    .pof-sub { font-family: var(--font-serif); font-style: italic; color: var(--ink-soft); max-width: 680px; margin: 0 auto; line-height: 1.6; }

    .pof-legend { display: flex; justify-content: center; gap: 20px; margin: 24px 0 32px; flex-wrap: wrap; font-size: 13px; }
    .pof-legend-item { display: flex; align-items: center; gap: 6px; color: var(--ink-soft); }
    .pof-dot { width: 12px; height: 12px; border-radius: 50%; }
    .pof-dot.idle { background: #d4cab8; }
    .pof-dot.exec { background: var(--peach, #d16a4e); box-shadow: 0 0 0 4px rgba(209,106,78,0.2); }
    .pof-dot.audit { background: var(--warm-tan, #c9a878); }

    .pof-floor { background: white; border: 1.5px solid var(--paper-dark, #e8dfd0); border-radius: 16px; padding: 24px; }
    .pof-floor-title { font-family: var(--font-serif); font-size: 20px; color: var(--ink-deep); margin-bottom: 16px; text-align: center; }
    .pof-zones { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

    .pof-zone { background: var(--paper, #faf5ea); border-radius: 14px; padding: 16px; border-top: 3px solid var(--peach, #d16a4e); }
    .pof-zone.decision { border-top-color: var(--peach, #d16a4e); }
    .pof-zone.director { border-top-color: var(--sage-deep, #7a8868); }
    .pof-zone.quality { border-top-color: var(--warm-tan, #c9a878); }
    .pof-zone.product { border-top-color: #b48ead; }
    .pof-zone.ai-dev { border-top-color: #6a8caf; }
    .pof-zone.design { border-top-color: #d08770; }
    .pof-zone.eng { border-top-color: #a3be8c; }
    .pof-zone.data-op { border-top-color: #ebcb8b; }
    .pof-zone.legal { border-top-color: #88c0d0; }

    .pof-zone-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
    .pof-zone-name { font-family: var(--font-serif); font-size: 15px; color: var(--ink-deep); }
    .pof-zone-count { font-family: var(--font-hand); color: var(--peach, #d16a4e); font-size: 14px; }

    .pof-seats { display: flex; flex-wrap: wrap; gap: 6px; }
    .pof-seat {
      width: calc(50% - 3px);
      background: white;
      border-radius: 8px;
      padding: 8px 10px;
      font-size: 11px;
      color: var(--ink-soft);
      display: flex;
      align-items: center;
      gap: 6px;
      border: 1px solid var(--paper-dark, #e8dfd0);
      position: relative;
    }
    .pof-seat .pof-dot { flex-shrink: 0; }
    .pof-seat-name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11px; }

    .pof-activity { margin-top: 32px; background: white; border: 1.5px dashed var(--sage, #9aa889); border-radius: 16px; padding: 24px; }
    .pof-activity-title { font-family: var(--font-serif); font-size: 20px; color: var(--ink-deep); margin-bottom: 12px; }
    .pof-activity-log { font-family: var(--font-mono, 'JetBrains Mono', monospace); font-size: 12px; color: var(--ink-soft); background: var(--paper, #faf5ea); padding: 14px; border-radius: 10px; line-height: 1.9; }
    .pof-activity-log .time { color: var(--peach, #d16a4e); }
    .pof-activity-log .agent { color: var(--sage-deep, #7a8868); font-weight: 500; }
    .pof-activity-log .action { color: var(--ink-deep); }

    @media (max-width: 768px) {
      .pof-zones { grid-template-columns: 1fr; }
      .pof-seat { width: 100%; }
    }
  `;

  const ZONES = [
    { cls: 'decision', name: '🏢 决策层', count: 4, seats: [
      { n: 'CEO', s: 'exec' }, { n: '快速 CEO', s: 'idle' },
      { n: '战略分析师', s: 'audit' }, { n: '首席方法论官', s: 'idle' }
    ]},
    { cls: 'director', name: '👔 总监层', count: 4, seats: [
      { n: '产品总监', s: 'audit' }, { n: '技术总监', s: 'audit' },
      { n: '设计总监', s: 'idle' }, { n: '增长运营总监', s: 'audit' }
    ]},
    { cls: 'quality', name: '🛡 质量守门', count: 4, seats: [
      { n: 'QA 一致性', s: 'exec' }, { n: '反指标监控', s: 'idle' },
      { n: '语言润色师', s: 'idle' }, { n: '版本管理员', s: 'idle' }
    ]},
    { cls: 'product', name: '📝 产品线', count: 5, seats: [
      { n: 'PM 通用', s: 'exec' }, { n: 'PM 行业向', s: 'exec' },
      { n: '需求分析师', s: 'idle' }, { n: '用户研究员', s: 'exec' },
      { n: '数据 PM', s: 'idle' }
    ]},
    { cls: 'ai-dev', name: '🧠 AI 研发', count: 6, seats: [
      { n: '算法工程师', s: 'idle' }, { n: 'AI 训练师', s: 'exec' },
      { n: 'Prompt 工程师', s: 'idle' }, { n: 'RAG 工程师', s: 'idle' },
      { n: 'Agent 编排', s: 'idle' }, { n: '模型评测', s: 'idle' }
    ]},
    { cls: 'design', name: '🎨 设计线', count: 5, seats: [
      { n: 'UX', s: 'idle' }, { n: 'Figma', s: 'idle' },
      { n: '动效', s: 'idle' }, { n: '品牌插画', s: 'idle' },
      { n: 'Editorial', s: 'idle' }
    ]},
    { cls: 'eng', name: '🛠 工程线', count: 5, seats: [
      { n: '全栈', s: 'idle' }, { n: '前端', s: 'idle' },
      { n: '后端', s: 'idle' }, { n: 'DevOps', s: 'idle' },
      { n: '测试', s: 'idle' }
    ]},
    { cls: 'data-op', name: '📊 数据运营', count: 4, seats: [
      { n: '数据分析师', s: 'idle' }, { n: 'BI 看板', s: 'idle' },
      { n: '内容运营', s: 'idle' }, { n: 'ASO', s: 'idle' }
    ]},
    { cls: 'legal', name: '⚖️ 商务合规', count: 3, seats: [
      { n: '客户成功', s: 'idle' }, { n: '商务法务', s: 'idle' },
      { n: '合规隐私', s: 'idle' }
    ]}
  ];

  const ACTIVITY = [
    { t: '10:03:22', a: 'CEO', act: '接收老板需求 "做个教育产品" → 启动真 PM 三步分析' },
    { t: '10:03:45', a: '需求分析师', act: '输出 JTBD 5 元素笺 + 真痛点 Top3' },
    { t: '10:04:10', a: 'CEO', act: '识别档位 · 多阶段 P1+P2+Gate × 工作档 · 调度 12 节点' },
    { t: '10:04:12', a: 'PM-数据 + PM-行业', act: '并发启动 N01 + N02（市场 + 竞品）' },
    { t: '10:07:30', a: 'AI 训练师', act: '启动 N34 AI 边界分析 · 12 功能 × 4 标签' },
    { t: '10:09:45', a: '用户研究员', act: 'N06-N10 并发 · 3 画像 60/30/10 + 旅程情绪曲线' },
    { t: '10:12:08', a: 'CEO', act: '🚨 CEO Gate 1 启动 · 5 硬问题评分中...' },
    { t: '10:12:40', a: 'CEO', act: '✅ Gate 通过 430/500 · 进 P3 产品规划' },
    { t: '10:13:10', a: 'PM-通用', act: '启动 N11 PRD · 四铁律章节 + 交互 5 态 + 异常 6 类' },
    { t: '10:16:22', a: 'QA 一致性', act: 'L4 审 · PRD↔技术↔UI↔Demo 四方对齐矩阵' },
    { t: '10:17:05', a: '反指标监控', act: 'L5 审 · N11 PRD 反指标 2 个 · ≥ 1 ★★★★ · 通过' }
  ];

  function el(tag, a, k) {
    const e = document.createElement(tag);
    if (a) for (const key in a) { if (key === 'className') e.className = a[key]; else e.setAttribute(key, a[key]); }
    if (k) (Array.isArray(k) ? k : [k]).forEach(c => { if (typeof c === 'string') e.appendChild(document.createTextNode(c)); else if (c) e.appendChild(c); });
    return e;
  }

  function init() {
    const mount = document.getElementById('peach-office-v11');
    if (!mount) return;
    if (!document.getElementById('pof-styles')) {
      const s = document.createElement('style'); s.id = 'pof-styles'; s.textContent = STYLE; document.head.appendChild(s);
    }

    const section = el('section', { className: 'pof-section' });
    const c = el('div', { className: 'pof-container' });

    const h = el('div', { className: 'pof-header' });
    h.appendChild(el('div', { className: 'pof-hand' }, '办公室实时状态 · v1.1'));
    const t = el('h2', { className: 'pof-title' });
    t.innerHTML = '🎬 桃子办公室 · <span class="it">41 工位 · 9 分区 · 实时</span>';
    h.appendChild(t);
    h.appendChild(el('p', { className: 'pof-sub' }, '老板像看飞书工作台一样看桃子 · 谁空闲 / 谁在审 / 谁执行中 · 42 员工并发跑 · 8 层审批链层层可见'));

    const legend = el('div', { className: 'pof-legend' });
    [['idle', '空闲'], ['exec', '执行中'], ['audit', '审查中']].forEach(([s, n]) => {
      const it = el('div', { className: 'pof-legend-item' });
      it.appendChild(el('span', { className: 'pof-dot ' + s }));
      it.appendChild(el('span', {}, n));
      legend.appendChild(it);
    });
    h.appendChild(legend);
    c.appendChild(h);

    // 工位地图
    const floor = el('div', { className: 'pof-floor' });
    floor.appendChild(el('div', { className: 'pof-floor-title' }, '📍 9 分区 · 41 工位布局'));
    const zones = el('div', { className: 'pof-zones' });
    ZONES.forEach(z => {
      const zone = el('div', { className: 'pof-zone ' + z.cls });
      const zh = el('div', { className: 'pof-zone-head' });
      zh.appendChild(el('div', { className: 'pof-zone-name' }, z.name));
      zh.appendChild(el('div', { className: 'pof-zone-count' }, z.count + ' 人'));
      zone.appendChild(zh);

      const seats = el('div', { className: 'pof-seats' });
      z.seats.forEach(s => {
        const seat = el('div', { className: 'pof-seat' });
        seat.appendChild(el('span', { className: 'pof-dot ' + s.s }));
        seat.appendChild(el('span', { className: 'pof-seat-name' }, s.n));
        seats.appendChild(seat);
      });
      zone.appendChild(seats);
      zones.appendChild(zone);
    });
    floor.appendChild(zones);
    c.appendChild(floor);

    // 活动日志
    const act = el('div', { className: 'pof-activity' });
    act.appendChild(el('div', { className: 'pof-activity-title' }, '⚡ 实时活动日志 · 教育 K12 任务示例'));
    const log = el('div', { className: 'pof-activity-log' });
    ACTIVITY.forEach(entry => {
      const line = el('div', {});
      const timeSpan = el('span', { className: 'time' }, '[' + entry.t + '] ');
      const agentSpan = el('span', { className: 'agent' }, entry.a + ' ');
      const actSpan = el('span', { className: 'action' }, '· ' + entry.act);
      line.appendChild(timeSpan);
      line.appendChild(agentSpan);
      line.appendChild(actSpan);
      log.appendChild(line);
    });
    act.appendChild(log);
    c.appendChild(act);

    section.appendChild(c); mount.appendChild(section);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
