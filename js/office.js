// Peach Studio办公室仿真 · 2 分钟流水线动画
// 120 秒 · 7 Scene · JS 状态机驱动

const SCENES = [
  { id: 1, start: 0, end: 5, text: '接需求', desc: 'CEO 接单' },
  { id: 2, start: 5, end: 20, text: '三步真实分析', desc: '需求 / 痛点 / 数据' },
  { id: 3, start: 20, end: 30, text: '任务派发', desc: '10 员工收单' },
  { id: 4, start: 30, end: 80, text: '并发产出', desc: '10 员工开工' },
  { id: 5, start: 80, end: 100, text: '总监审查', desc: '3 总监质检' },
  { id: 6, start: 100, end: 115, text: 'CEO 整合', desc: '3 决策 3 风险 1 Next' },
  { id: 7, start: 115, end: 120, text: '交付归档', desc: 'Obsidian 归档' },
];

const EXECUTORS = ['pm', 'data', 'algo', 'trainer', 'backend', 'frontend', 'backend-dev', 'frontend-dev', 'designer', 'figma'];
const DIRECTORS = ['pm-director', 'tech-director', 'design-director'];

let currentTime = 0;  // 0-120 秒
let speed = 1;
let playing = false;
let animationFrame = null;
let lastTimestamp = 0;

function $(sel) { return document.querySelector(sel); }
function $$(sel) { return Array.from(document.querySelectorAll(sel)); }

function getAgent(name) { return document.querySelector(`[data-agent="${name}"]`); }

function resetAllAgents() {
  $$('.agent').forEach(el => {
    el.classList.remove('working', 'show-status', 'done', 'has-doc', 'rejected');
  });
  $('#archive-count').textContent = '等待交付...';
  removeFlyingDocs();
}

function showStatus(agent, text) {
  const el = getAgent(agent);
  if (!el) return;
  const status = el.querySelector('.agent-status');
  if (status) status.textContent = text;
  el.classList.add('show-status');
}

function hideStatus(agent) {
  const el = getAgent(agent);
  if (el) el.classList.remove('show-status');
}

function setWorking(agent, yes = true) {
  const el = getAgent(agent);
  if (!el) return;
  if (yes) el.classList.add('working');
  else el.classList.remove('working');
}

function setDone(agent) {
  const el = getAgent(agent);
  if (!el) return;
  el.classList.add('done', 'has-doc');
  el.classList.remove('working');
  hideStatus(agent);
}

function removeFlyingDocs() {
  $$('.flying-doc').forEach(el => el.remove());
}

function createFlyingDoc(fromEl, toEl, duration = 1000) {
  const office = $('#office');
  const officeRect = office.getBoundingClientRect();
  const fromRect = fromEl.getBoundingClientRect();
  const toRect = toEl.getBoundingClientRect();

  const doc = document.createElement('div');
  doc.className = 'flying-doc';
  doc.textContent = '📄';
  doc.style.left = (fromRect.left - officeRect.left + fromRect.width / 2 - 14) + 'px';
  doc.style.top = (fromRect.top - officeRect.top + fromRect.height / 2 - 18) + 'px';
  office.appendChild(doc);

  setTimeout(() => {
    doc.style.left = (toRect.left - officeRect.left + toRect.width / 2 - 14) + 'px';
    doc.style.top = (toRect.top - officeRect.top + toRect.height / 2 - 18) + 'px';
    doc.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
  }, 20);

  setTimeout(() => doc.remove(), duration + 500);
}

function updateSceneIndicator(sceneId) {
  const scene = SCENES.find(s => s.id === sceneId);
  if (!scene) return;
  $('#current-scene').textContent = `${scene.text}`;
  $('#scene-number').textContent = `Scene ${scene.id}`;
  $('#scene-text').textContent = scene.text;

  const indicator = $('#scene-indicator');
  indicator.classList.add('show');
  setTimeout(() => indicator.classList.remove('show'), 1500);

  $$('.side-panel-item').forEach(el => {
    if (el.dataset.scene == sceneId) el.classList.add('active');
    else el.classList.remove('active');
  });
}

function triggerScene(sceneId) {
  if (sceneId === 1) {
    // Scene 1 · CEO 接需求
    showStatus('ceo', '收到需求...');
    setWorking('ceo', true);
  }
  else if (sceneId === 2) {
    // Scene 2 · 三步分析
    showStatus('ceo', '需求/痛点/数据分析...');
  }
  else if (sceneId === 3) {
    // Scene 3 · 任务派发 · 文件飞向 10 员工
    hideStatus('ceo');
    setWorking('ceo', false);
    const ceoEl = getAgent('ceo');
    EXECUTORS.forEach((name, i) => {
      setTimeout(() => {
        const target = getAgent(name);
        if (target) createFlyingDoc(ceoEl, target, 800);
      }, i * 60);
    });
    setTimeout(() => {
      EXECUTORS.forEach(name => showStatus(name, '收到派单'));
    }, EXECUTORS.length * 60 + 800);
  }
  else if (sceneId === 4) {
    // Scene 4 · 10 员工并发工作
    EXECUTORS.forEach(name => {
      setWorking(name, true);
      const texts = {
        pm: '写 PRD · JTBD · STAR',
        data: '三层指标 · 反指标',
        algo: 'AI vs 传统 · 选 Qwen',
        trainer: '写 Prompt · 建评测集',
        backend: 'API · DB · 部署',
        frontend: 'Next.js · shadcn · 组件',
        'backend-dev': 'Flask Mock · SSE',
        'frontend-dev': 'HTML Demo · 5 tab',
        designer: '色板 · UI Skill',
        figma: '原型 · Auto Layout',
      };
      showStatus(name, texts[name] || '工作中');
    });
  }
  else if (sceneId === 5) {
    // Scene 5 · 3 总监审查
    const pmDirector = getAgent('pm-director');
    const techDirector = getAgent('tech-director');
    const designDirector = getAgent('design-director');

    // 文件飞向对应总监
    setTimeout(() => {
      createFlyingDoc(getAgent('pm'), pmDirector, 600);
      createFlyingDoc(getAgent('data'), pmDirector, 650);
      setTimeout(() => setDone('pm'), 700);
      setTimeout(() => setDone('data'), 750);
    }, 100);

    setTimeout(() => {
      ['algo', 'trainer', 'backend', 'frontend', 'backend-dev', 'frontend-dev'].forEach((name, i) => {
        createFlyingDoc(getAgent(name), techDirector, 600);
        setTimeout(() => setDone(name), 700 + i * 50);
      });
    }, 200);

    setTimeout(() => {
      createFlyingDoc(getAgent('designer'), designDirector, 600);
      createFlyingDoc(getAgent('figma'), designDirector, 650);
      setTimeout(() => setDone('designer'), 700);
      setTimeout(() => setDone('figma'), 750);
    }, 300);

    // 3 总监审查动画
    setTimeout(() => {
      DIRECTORS.forEach((name, i) => {
        setWorking(name, true);
        showStatus(name, '审查中...');
      });
    }, 1000);

    setTimeout(() => {
      DIRECTORS.forEach(name => {
        setWorking(name, false);
        getAgent(name).classList.add('done');
        hideStatus(name);
      });
    }, 3000);
  }
  else if (sceneId === 6) {
    // Scene 6 · 所有文件飞向 CEO
    const ceoEl = getAgent('ceo');
    EXECUTORS.forEach((name, i) => {
      setTimeout(() => {
        createFlyingDoc(getAgent(name), ceoEl, 800);
      }, i * 50);
    });
    setTimeout(() => {
      showStatus('ceo', '整合 3 决策 3 风险...');
      setWorking('ceo', true);
    }, EXECUTORS.length * 50 + 800);
  }
  else if (sceneId === 7) {
    // Scene 7 · CEO 交付到归档室
    setWorking('ceo', false);
    getAgent('ceo').classList.add('done');
    hideStatus('ceo');

    const archive = $('.archive-room');
    setTimeout(() => {
      createFlyingDoc(getAgent('ceo'), archive, 1000);
    }, 100);
    setTimeout(() => {
      $('#archive-count').textContent = '✅ 已归档 · 15 份文档 + Demo';
    }, 1300);
  }
}

function update(timestamp) {
  if (!lastTimestamp) lastTimestamp = timestamp;
  const delta = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  if (playing) {
    const prevTime = currentTime;
    currentTime += delta * speed;

    if (currentTime >= 120) {
      currentTime = 120;
      playing = false;
      $('#play-btn').textContent = '▶ 播放';
    }

    // 检查 Scene 触发
    for (const scene of SCENES) {
      if (prevTime < scene.start && currentTime >= scene.start) {
        updateSceneIndicator(scene.id);
        triggerScene(scene.id);
      }
    }

    // 更新进度
    $('#progress-fill').style.width = (currentTime / 120 * 100) + '%';
    $('#timer').textContent = `${currentTime.toFixed(1)} / 120s`;
  }

  animationFrame = requestAnimationFrame(update);
}

function togglePlay() {
  playing = !playing;
  if (playing) {
    $('#play-btn').textContent = '⏸ 暂停';
    if (currentTime >= 120) {
      resetAnimation();
      playing = true;
      $('#play-btn').textContent = '⏸ 暂停';
    }
  } else {
    $('#play-btn').textContent = '▶ 播放';
  }
  lastTimestamp = 0;
}

function resetAnimation() {
  playing = false;
  currentTime = 0;
  $('#play-btn').textContent = '▶ 播放';
  $('#progress-fill').style.width = '0%';
  $('#timer').textContent = '0 / 120s';
  $('#current-scene').textContent = '准备开始';
  resetAllAgents();
  $$('.side-panel-item').forEach(el => el.classList.remove('active'));
}

function setSpeed(s) {
  speed = s;
  $$('.pipeline-btn[data-speed]').forEach(btn => {
    if (parseFloat(btn.dataset.speed) === s) btn.classList.add('active');
    else btn.classList.remove('active');
  });
}

// 启动
animationFrame = requestAnimationFrame(update);

// 页面加载后自动播放一次
window.addEventListener('load', () => {
  setTimeout(() => {
    togglePlay();
  }, 1000);
});
