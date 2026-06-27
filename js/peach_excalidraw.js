/* =========================================================
 * Peach Studio · Excalidraw 风图表引擎 v1.0（2026-04-23）
 * =========================================================
 * 双轨：
 *  1. 网页内 SVG 渲染（手绘温暖风 · 嵌 methodology）
 *  2. 导出 Excalidraw JSON（Obsidian Excalidraw 插件能打开编辑）
 *
 * 用法：
 *  renderPeachDiagram('containerId', data)
 *  const json = exportToExcalidrawJSON(data)
 *
 * data 格式：
 *  {
 *    title: '产品架构',
 *    layout: 'layered' | 'flow' | 'swimlane',
 *    nodes: [ {id, label, desc?, color?, layer?} ],
 *    edges: [ {from, to, label?, dashed?} ]
 *  }
 * ========================================================= */

(function() {
  'use strict';

  // ─── 桃子色板（温暖手绘风）─────────────────────────
  const PEACH_COLORS = {
    peach:   { fill: '#fff5ef', stroke: '#d16a4e', text: '#b05234' },
    sage:    { fill: '#ecf3e4', stroke: '#9aa889', text: '#7a8868' },
    pink:    { fill: '#fde4e9', stroke: '#c47a86', text: '#8c4855' },
    rose:    { fill: '#fff0ea', stroke: '#b56d50', text: '#8c4a30' },
    paper:   { fill: '#fff8e7', stroke: '#d4a574', text: '#8c6a3a' },
    sky:     { fill: '#e6f0fa', stroke: '#6b87c4', text: '#4a6ba8' },
    plum:    { fill: '#f3e9f8', stroke: '#8b6eb8', text: '#6c4a9e' },
    cream:   { fill: '#fff6d9', stroke: '#c9a453', text: '#8c6a25' }
  };

  const LAYER_COLORS = ['cream', 'sage', 'pink', 'paper']; // 4 层架构推荐色

  // ─── 布局算法 ─────────────────────────
  // 节点尺寸默认
  const NODE_W = 180;
  const NODE_H = 70;
  const GAP_X = 60;
  const GAP_Y = 40;
  const PAD = 30;

  function computeLayout(data) {
    if (data.layout === 'layered') {
      return layoutLayered(data);
    }
    if (data.layout === 'swimlane') {
      return layoutSwimlane(data);
    }
    return layoutFlow(data);
  }

  // 分层布局（如 4 层架构图）
  function layoutLayered(data) {
    const layers = {};
    data.nodes.forEach(n => {
      const l = n.layer || 0;
      (layers[l] = layers[l] || []).push(n);
    });
    const positions = {};
    const layerKeys = Object.keys(layers).sort();
    let y = PAD;
    layerKeys.forEach((lk, li) => {
      const nodes = layers[lk];
      const totalW = nodes.length * NODE_W + (nodes.length - 1) * GAP_X;
      let x = Math.max(PAD, (1000 - totalW) / 2);
      nodes.forEach(n => {
        positions[n.id] = { x, y, w: NODE_W, h: NODE_H, color: n.color || LAYER_COLORS[li % LAYER_COLORS.length] };
        x += NODE_W + GAP_X;
      });
      y += NODE_H + GAP_Y;
    });
    return { positions, width: 1000, height: y + PAD };
  }

  // 流程布局（横向）
  function layoutFlow(data) {
    const positions = {};
    let x = PAD;
    const y = PAD + 40;
    data.nodes.forEach(n => {
      positions[n.id] = { x, y, w: NODE_W, h: NODE_H, color: n.color || 'peach' };
      x += NODE_W + GAP_X;
    });
    return { positions, width: x + PAD, height: y + NODE_H + PAD };
  }

  // 泳道布局
  function layoutSwimlane(data) {
    const lanes = {};
    data.nodes.forEach(n => {
      const l = n.lane || '默认';
      (lanes[l] = lanes[l] || []).push(n);
    });
    const positions = {};
    let y = PAD + 40;
    const laneKeys = Object.keys(lanes);
    laneKeys.forEach(lk => {
      const nodes = lanes[lk];
      let x = PAD + 180;
      nodes.forEach(n => {
        positions[n.id] = { x, y, w: NODE_W, h: NODE_H, color: n.color || 'peach', lane: lk };
        x += NODE_W + GAP_X;
      });
      y += NODE_H + GAP_Y + 20;
    });
    return { positions, width: 1200, height: y + PAD, lanes: laneKeys };
  }

  // ─── 网页 SVG 渲染 ─────────────────────────
  window.renderPeachDiagram = function(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const { positions, width, height, lanes } = computeLayout(data);
    const bgColor = '#fafaf5';

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" style="max-width:${width}px; background:${bgColor}; border-radius:16px; font-family:'Caveat','Noto Serif SC',cursive;">`;

    // 滤镜：手绘感（SVG turbulence 微扰）
    svg += `<defs>
      <filter id="sketchy" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="3"/>
        <feDisplacementMap in="SourceGraphic" scale="1.5"/>
      </filter>
      <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
        <feOffset dx="0" dy="2" result="offsetblur"/>
        <feFlood flood-color="#000" flood-opacity="0.08"/>
        <feComposite in2="offsetblur" operator="in"/>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>`;

    // 泳道背景
    if (lanes) {
      let laneY = PAD + 40;
      lanes.forEach((lk, li) => {
        const color = PEACH_COLORS[LAYER_COLORS[li % LAYER_COLORS.length]];
        svg += `<rect x="${PAD}" y="${laneY - 10}" width="${width - PAD * 2}" height="${NODE_H + GAP_Y + 20}" fill="${color.fill}" opacity="0.4" rx="10"/>`;
        svg += `<text x="${PAD + 20}" y="${laneY + NODE_H / 2 + 6}" font-size="18" fill="${color.text}" font-weight="600" font-family="'Caveat',cursive">${lk}</text>`;
        laneY += NODE_H + GAP_Y + 20;
      });
    }

    // 标题
    if (data.title) {
      svg += `<text x="${width / 2}" y="${PAD}" text-anchor="middle" font-size="22" font-family="'Instrument Serif','Noto Serif SC',serif" fill="#2c2c2c" font-style="italic">${data.title}</text>`;
    }

    // 连线（先画 · 在节点下面）
    if (data.edges) {
      data.edges.forEach(e => {
        const from = positions[e.from];
        const to = positions[e.to];
        if (!from || !to) return;
        const x1 = from.x + from.w / 2;
        const y1 = from.y + from.h / 2;
        const x2 = to.x + to.w / 2;
        const y2 = to.y + to.h / 2;
        const stroke = e.color || '#d16a4e';
        const dash = e.dashed ? 'stroke-dasharray="6,4"' : '';
        svg += `<path d="M ${x1} ${y1} L ${x2} ${y2}" stroke="${stroke}" stroke-width="2" fill="none" ${dash} filter="url(#sketchy)"/>`;
        // 箭头
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const ah = 8;
        svg += `<path d="M ${x2} ${y2} L ${x2 - ah * Math.cos(angle - Math.PI / 6)} ${y2 - ah * Math.sin(angle - Math.PI / 6)} L ${x2 - ah * Math.cos(angle + Math.PI / 6)} ${y2 - ah * Math.sin(angle + Math.PI / 6)} Z" fill="${stroke}"/>`;
        // 连线标签
        if (e.label) {
          svg += `<text x="${(x1 + x2) / 2}" y="${(y1 + y2) / 2 - 6}" text-anchor="middle" font-size="14" fill="${stroke}" font-family="'Caveat',cursive">${e.label}</text>`;
        }
      });
    }

    // 节点
    data.nodes.forEach(n => {
      const p = positions[n.id];
      if (!p) return;
      const c = PEACH_COLORS[p.color] || PEACH_COLORS.peach;
      const isDiamond = n.shape === 'diamond';

      if (isDiamond) {
        const cx = p.x + p.w / 2;
        const cy = p.y + p.h / 2;
        const hw = p.w / 2;
        const hh = p.h / 2;
        svg += `<path d="M ${cx} ${p.y} L ${p.x + p.w} ${cy} L ${cx} ${p.y + p.h} L ${p.x} ${cy} Z" fill="${c.fill}" stroke="${c.stroke}" stroke-width="2.5" filter="url(#softShadow)"/>`;
      } else {
        svg += `<rect x="${p.x}" y="${p.y}" width="${p.w}" height="${p.h}" rx="12" fill="${c.fill}" stroke="${c.stroke}" stroke-width="2.5" filter="url(#softShadow)"/>`;
      }

      // 主标签
      const cx = p.x + p.w / 2;
      const mainY = n.desc ? p.y + p.h / 2 - 4 : p.y + p.h / 2 + 6;
      svg += `<text x="${cx}" y="${mainY}" text-anchor="middle" font-size="16" font-weight="600" fill="${c.text}" font-family="'Noto Serif SC',serif">${n.label}</text>`;

      // 副描述
      if (n.desc) {
        svg += `<text x="${cx}" y="${p.y + p.h / 2 + 14}" text-anchor="middle" font-size="11" fill="${c.text}" opacity="0.75" font-family="'Inter',sans-serif">${n.desc}</text>`;
      }
    });

    svg += `</svg>`;
    container.innerHTML = svg;
  };

  // ─── 导出 Excalidraw JSON（Obsidian 插件直开）─────────────
  window.exportToExcalidrawJSON = function(data) {
    const { positions } = computeLayout(data);
    const elements = [];
    let idCounter = 1;
    const nextId = () => 'el-' + (idCounter++);

    // 节点
    data.nodes.forEach(n => {
      const p = positions[n.id];
      if (!p) return;
      const c = PEACH_COLORS[p.color] || PEACH_COLORS.peach;
      const nodeId = nextId();

      const shape = n.shape === 'diamond' ? 'diamond' : 'rectangle';

      elements.push({
        id: nodeId,
        type: shape,
        x: p.x,
        y: p.y,
        width: p.w,
        height: p.h,
        angle: 0,
        strokeColor: c.stroke,
        backgroundColor: c.fill,
        fillStyle: 'solid',
        strokeWidth: 2,
        strokeStyle: 'solid',
        roughness: 1,  // 手绘感
        opacity: 100,
        roundness: shape === 'rectangle' ? { type: 3 } : null,
        groupIds: [],
        frameId: null,
        boundElements: [{ type: 'text', id: nodeId + '-text' }],
        updated: Date.now(),
        link: null,
        locked: false,
        seed: Math.floor(Math.random() * 2147483647),
        version: 1,
        versionNonce: Math.floor(Math.random() * 2147483647),
        isDeleted: false
      });

      // 文字
      elements.push({
        id: nodeId + '-text',
        type: 'text',
        x: p.x + 10,
        y: p.y + (n.desc ? 18 : p.h / 2 - 10),
        width: p.w - 20,
        height: n.desc ? p.h - 30 : 20,
        angle: 0,
        strokeColor: c.text,
        backgroundColor: 'transparent',
        fillStyle: 'solid',
        strokeWidth: 1,
        strokeStyle: 'solid',
        roughness: 1,
        opacity: 100,
        groupIds: [],
        frameId: null,
        roundness: null,
        boundElements: null,
        updated: Date.now(),
        link: null,
        locked: false,
        fontSize: 18,
        fontFamily: 1,  // Virgil（手绘字体）
        text: n.desc ? `${n.label}\n${n.desc}` : n.label,
        textAlign: 'center',
        verticalAlign: 'middle',
        containerId: nodeId,
        originalText: n.desc ? `${n.label}\n${n.desc}` : n.label,
        lineHeight: 1.2,
        baseline: 18,
        seed: Math.floor(Math.random() * 2147483647),
        version: 1,
        versionNonce: Math.floor(Math.random() * 2147483647),
        isDeleted: false
      });
    });

    // 箭头
    if (data.edges) {
      data.edges.forEach(e => {
        const from = positions[e.from];
        const to = positions[e.to];
        if (!from || !to) return;
        const x1 = from.x + from.w / 2;
        const y1 = from.y + from.h / 2;
        const x2 = to.x + to.w / 2;
        const y2 = to.y + to.h / 2;

        elements.push({
          id: nextId(),
          type: 'arrow',
          x: x1,
          y: y1,
          width: x2 - x1,
          height: y2 - y1,
          angle: 0,
          strokeColor: '#d16a4e',
          backgroundColor: 'transparent',
          fillStyle: 'solid',
          strokeWidth: 2,
          strokeStyle: e.dashed ? 'dashed' : 'solid',
          roughness: 1,
          opacity: 100,
          groupIds: [],
          frameId: null,
          roundness: { type: 2 },
          boundElements: null,
          updated: Date.now(),
          link: null,
          locked: false,
          points: [[0, 0], [x2 - x1, y2 - y1]],
          lastCommittedPoint: null,
          startBinding: null,
          endBinding: null,
          startArrowhead: null,
          endArrowhead: 'arrow',
          seed: Math.floor(Math.random() * 2147483647),
          version: 1,
          versionNonce: Math.floor(Math.random() * 2147483647),
          isDeleted: false
        });
      });
    }

    const payload = {
      type: 'excalidraw',
      version: 2,
      source: 'peach-studio',
      elements: elements,
      appState: {
        gridSize: null,
        viewBackgroundColor: '#fafaf5'
      },
      files: {}
    };

    return JSON.stringify(payload, null, 2);
  };

  window.downloadExcalidrawJSON = function(data, filename = 'peach-diagram.excalidraw') {
    const json = window.exportToExcalidrawJSON(data);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // ─── 预置示例数据（桃子风格示范）─────────────────
  window.PEACH_DIAGRAM_SAMPLES = {
    architecture4Layer: {
      title: '4 层 AI 产品架构（桃子 Excalidraw 风）',
      layout: 'layered',
      nodes: [
        { id: 'u1', label: '业务场景', desc: '案件审核 · 合规检查', layer: 0, color: 'cream' },
        { id: 'u2', label: '用户端', desc: '审核员 · PM', layer: 0, color: 'cream' },
        { id: 'a1', label: 'LangGraph Agent', desc: '总管 / 研判 / 报告', layer: 1, color: 'sage' },
        { id: 'a2', label: 'RAG 知识库', desc: 'bge-m3 + Milvus', layer: 1, color: 'sage' },
        { id: 'a3', label: '外部数据源', desc: '征信 API · 黑名单', layer: 1, color: 'sage' },
        { id: 'm1', label: 'LLM · Qwen3', desc: '主模型', layer: 2, color: 'pink' },
        { id: 'm2', label: '小模型 Embedding', desc: 'bge-m3', layer: 2, color: 'pink' },
        { id: 'b1', label: '模型服务', desc: 'GPU · 弹性伸缩', layer: 3, color: 'paper' },
        { id: 'b2', label: '向量数据库', desc: 'Milvus · PG · 对象存储', layer: 3, color: 'paper' }
      ],
      edges: [
        { from: 'u1', to: 'a1' }, { from: 'u2', to: 'a1' },
        { from: 'a1', to: 'a2' }, { from: 'a1', to: 'a3' },
        { from: 'a1', to: 'm1' }, { from: 'a2', to: 'm2' },
        { from: 'm1', to: 'b1' }, { from: 'm2', to: 'b2' }
      ]
    },

    productFlow: {
      title: 'Peach Studio 9 层流水线（闪电档示例）',
      layout: 'flow',
      nodes: [
        { id: 'n1', label: '需求入口', color: 'peach' },
        { id: 'n2', label: 'CEO 调度', color: 'cream' },
        { id: 'n3', label: 'PM 分析', color: 'sage' },
        { id: 'n4', label: 'AI 训练师', color: 'pink' },
        { id: 'n5', label: 'QA + 归档', color: 'paper' }
      ],
      edges: [
        { from: 'n1', to: 'n2' },
        { from: 'n2', to: 'n3' },
        { from: 'n3', to: 'n4' },
        { from: 'n4', to: 'n5' }
      ]
    }
  };

})();
