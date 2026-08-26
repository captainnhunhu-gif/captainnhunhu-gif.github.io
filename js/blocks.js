/* ============================================================
   Toy-block physics. Hand-rolled, ~200 lines, zero libraries.

   Blocks are square but collide as circles — cheap, stable, and
   at this size nobody can tell. Gravity, floor/wall bounce,
   pairwise impulse resolution with a little tangential spin,
   grab-and-fling, knock-down, and a restack that eases home.

   Runs a fixed 1/120s timestep so it behaves the same on a
   120Hz laptop and a tired old phone.
   ============================================================ */
(function () {
  var stage  = document.getElementById('stage');
  var canvas = document.getElementById('c');
  var hint   = document.getElementById('hint');
  if (!stage || !canvas) return;

  var ctx  = canvas.getContext('2d');
  var root = document.documentElement;

  var LETTERS = (window.SITE && window.SITE.blocks) || ['Q','U','Ỳ','N','H','♥'];
  // real toy-block colours, every one outlined in ink like a marker drawing
  var SCHEME  = ['--pink','--powder','--olive','--cream','--pink','--powder'];

  var W = 0, H = 0, DPR = 1, floorY = 0;
  var blocks = [];
  var state = 'static';                       // static | live | rebuild | rested
  var held = null;
  var pointer = { x:0, y:0, px:0, py:0, down:false };

  function css(v) { return getComputedStyle(root).getPropertyValue(v).trim(); }

  function makeBlocks() {
    blocks = [];
    for (var i = 0; i < LETTERS.length; i++) {
      blocks.push({
        x:0, y:0, vx:0, vy:0, a:0, va:0, size:0, r:0,
        letter: LETTERS[i], col: SCHEME[i % SCHEME.length],
        tx:0, ty:0, ta:0,
      });
    }
  }

  /* Lay the tower out as a pyramid that always fits the stage. */
  function layout() {
    var rect = stage.getBoundingClientRect();
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width; H = rect.height;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    floorY = H - Math.max(9, Math.min(38, H * 0.13));

    // A tall stage stacks a pyramid. A short one (the little nameplate in the
    // header) lays the letters out in a single row instead.
    var rows = [], i = 0;
    if (H < 150) {
      var one = [];
      for (; i < blocks.length; i++) one.push(i);
      rows.push(one);
    } else {
      var want = 3;
      while (i < blocks.length) {
        var row = [];
        for (var k = 0; k < want && i < blocks.length; k++, i++) row.push(i);
        rows.push(row);
        if (want > 1) want--;
      }
    }

    var widest = 0;
    for (var q = 0; q < rows.length; q++) widest = Math.max(widest, rows[q].length);
    var gap = Math.max(3, Math.round(W / 90));
    var pad = Math.max(10, Math.round(W / 22));
    var byWidth  = (W - pad * 2 - gap * (widest - 1)) / widest;
    var byHeight = ((floorY - pad) - gap * (rows.length - 1)) / rows.length;
    var size = Math.max(16, Math.min(92, byWidth, byHeight));
    var step = size + gap;
    var cx = W / 2;

    for (var r = 0; r < rows.length; r++) {
      var n = rows[r].length;
      var y = floorY - size / 2 - r * step;
      var startX = cx - ((n - 1) * step) / 2;
      for (var j = 0; j < n; j++) {
        var b = blocks[rows[r][j]];
        b.size = size; b.r = size * 0.5;
        b.tx = startX + j * step; b.ty = y; b.ta = 0;
      }
    }

    if (state === 'static') {
      for (var m = 0; m < blocks.length; m++) {
        var q = blocks[m];
        q.x = q.tx; q.y = q.ty; q.a = q.ta; q.vx = q.vy = q.va = 0;
      }
    }
  }

  function wake() {
    if (state !== 'live') { state = 'live'; stage.setAttribute('data-live', '1'); }
  }

  function knock() {
    wake();
    for (var i = 0; i < blocks.length; i++) {
      var b = blocks[i];
      b.vx = (Math.random() * 2 - 1) * 160 + 120;
      b.vy = -(120 + Math.random() * 180) - (blocks.length - i) * 10;
      b.va = (Math.random() * 2 - 1) * 6;
    }
    if (hint) hint.textContent = 'timber! → build it back.';
  }

  function build() {
    state = 'rebuild';
    stage.removeAttribute('data-live');
    if (hint) hint.textContent = 'good as new.';
    var start = performance.now(), dur = 650;
    var from = blocks.map(function (b) { return { x:b.x, y:b.y, a:b.a }; });

    (function anim(t) {
      var p = Math.min(1, (t - start) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      for (var i = 0; i < blocks.length; i++) {
        var b = blocks[i], f = from[i];
        b.x = f.x + (b.tx - f.x) * e;
        b.y = f.y + (b.ty - f.y) * e;
        b.a = f.a + (b.ta - f.a) * e;
        b.vx = b.vy = b.va = 0;
      }
      draw();
      if (p < 1) requestAnimationFrame(anim);
      else {
        state = 'static';
        setTimeout(function () { if (hint) hint.textContent = 'psst — grab a block and fling it.'; }, 1400);
      }
    })(start);
  }

  function step(dt) {
    var g = 2100, rest = 0.34, wallRest = 0.42, fr = 0.86;

    for (var i = 0; i < blocks.length; i++) {
      var b = blocks[i];
      if (held === b) continue;
      b.vy += g * dt;
      b.vx *= 0.995; b.va *= 0.985;
      b.x += b.vx * dt; b.y += b.vy * dt; b.a += b.va * dt;

      if (b.y + b.r > floorY) {
        b.y = floorY - b.r;
        if (b.vy > 0) b.vy = -b.vy * rest;
        b.vx *= fr; b.va += b.vx * 0.0015; b.va *= 0.9;
        if (Math.abs(b.vy) < 30) b.vy = 0;
      }
      if (b.x - b.r < 0) { b.x = b.r; b.vx = Math.abs(b.vx) * wallRest; }
      if (b.x + b.r > W) { b.x = W - b.r; b.vx = -Math.abs(b.vx) * wallRest; }
    }

    for (var a1 = 0; a1 < blocks.length; a1++) {
      for (var j = a1 + 1; j < blocks.length; j++) {
        var A = blocks[a1], C = blocks[j];
        var dx = C.x - A.x, dy = C.y - A.y;
        var d = Math.hypot(dx, dy), min = A.r + C.r;
        if (d > 0 && d < min) {
          var nx = dx / d, ny = dy / d, ov = min - d;
          var aHeld = held === A, cHeld = held === C;
          var pa = aHeld ? 0 : (cHeld ? 1 : 0.5);
          var pc = cHeld ? 0 : (aHeld ? 1 : 0.5);
          A.x -= nx * ov * pa; A.y -= ny * ov * pa;
          C.x += nx * ov * pc; C.y += ny * ov * pc;

          var rvx = C.vx - A.vx, rvy = C.vy - A.vy;
          var vn = rvx * nx + rvy * ny;
          if (vn < 0) {
            var e = 0.28, jimp = -(1 + e) * vn / 2;
            if (!aHeld) { A.vx -= jimp * nx; A.vy -= jimp * ny; }
            if (!cHeld) { C.vx += jimp * nx; C.vy += jimp * ny; }
            var tang = rvx * (-ny) + rvy * nx;
            A.va -= tang * 0.0016; C.va += tang * 0.0016;
          }
        }
      }
    }
  }

  function allSleeping() {
    for (var i = 0; i < blocks.length; i++) {
      var b = blocks[i];
      if (Math.abs(b.vx) > 4 || Math.abs(b.vy) > 4 || Math.abs(b.va) > 0.05) return false;
    }
    return true;
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  /* A marker-drawn frame: walk the perimeter of an inset rectangle and push
     each point in and out on a sine wave, so the line wobbles like a pen. */
  function drawFrame() {
    var scale = Math.max(0.42, Math.min(1, W / 700));
    var inset = 8 * scale + 4, amp = 6.5 * scale, wave = 34 * scale;
    var x0 = inset, y0 = inset, x1 = W - inset, y1 = H - inset;
    var w = x1 - x0, h = y1 - y0;
    if (w <= 0 || h <= 0) return;
    var per = 2 * (w + h);
    var steps = Math.max(120, Math.round(per / 5));

    ctx.beginPath();
    for (var i = 0; i <= steps; i++) {
      var d = (i / steps) * per, x, y, nx, ny;
      if (d < w)                { x = x0 + d;             y = y0;                 nx = 0;  ny = -1; }
      else if (d < w + h)       { x = x1;                 y = y0 + (d - w);       nx = 1;  ny = 0;  }
      else if (d < 2 * w + h)   { x = x1 - (d - w - h);   y = y1;                 nx = 0;  ny = 1;  }
      else                      { x = x0;                 y = y1 - (d - 2*w - h); nx = -1; ny = 0;  }
      var off = Math.sin((d / wave) * Math.PI * 2) * amp;
      var px = x + nx * off, py = y + ny * off;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.strokeStyle = css('--maroon') || '#5C1F22';
    ctx.lineWidth = Math.max(2, 4 * scale);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    drawFrame();
    var ink = css('--ink') || '#241F1E';

    for (var i = 0; i < blocks.length; i++) {
      var b = blocks[i], s = b.size;
      ctx.save();
      ctx.translate(b.x, b.y); ctx.rotate(b.a);

      // flat pastel fill, then a heavy ink outline — no gloss, no gradients
      ctx.fillStyle = css(b.col) || '#F3D3DA';
      roundRect(-s/2, -s/2, s, s, Math.max(3, s * 0.17)); ctx.fill();

      ctx.strokeStyle = ink;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round';
      roundRect(-s/2, -s/2, s, s, Math.max(3, s * 0.17)); ctx.stroke();

      ctx.fillStyle = ink;
      ctx.font = '600 ' + Math.round(s * 0.46) + 'px ' + css('--hand');
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(b.letter, 0, s * 0.04);
      ctx.restore();
    }
  }

  var restackTimer = null;
  var last = performance.now(), acc = 0;
  function loop(t) {
    var dt = Math.min(0.033, (t - last) / 1000); last = t;
    if (state === 'live') {
      acc += dt;
      var stepDt = 1/120, guard = 0;
      while (acc >= stepDt && guard < 6) { step(stepDt); acc -= stepDt; guard++; }
      draw();
      if (allSleeping() && !pointer.down) {
        state = 'rested';
        clearTimeout(restackTimer);
        restackTimer = setTimeout(function () { if (state === 'rested') build(); }, 2600);
      }
    } else if (state === 'static' || state === 'rested') {
      draw();
    }
    requestAnimationFrame(loop);
  }

  function localPt(ev) {
    var r = stage.getBoundingClientRect();
    var p = ev.touches ? ev.touches[0] : ev;
    return { x: p.clientX - r.left, y: p.clientY - r.top };
  }
  function pick(x, y) {
    var best = null, bd = 1e9;
    for (var i = 0; i < blocks.length; i++) {
      var b = blocks[i], d = Math.hypot(x - b.x, y - b.y);
      if (d < b.r * 1.15 && d < bd) { bd = d; best = b; }
    }
    return best;
  }
  function onDown(ev) {
    var p = localPt(ev);
    pointer.down = true; pointer.x = pointer.px = p.x; pointer.y = pointer.py = p.y;
    var b = pick(p.x, p.y);
    if (b) {
      ev.preventDefault(); wake();
      held = b; b.vx = b.vy = b.va = 0;
    } else {
      ev.preventDefault();
      knock();
    }
  }
  function onMove(ev) {
    if (!pointer.down) return;
    var p = localPt(ev);
    pointer.px = pointer.x; pointer.py = pointer.y;
    pointer.x = p.x; pointer.y = p.y;
    if (held) { ev.preventDefault(); held.x = p.x; held.y = p.y; }
  }
  function onUp() {
    if (held) {
      var vx = pointer.x - pointer.px, vy = pointer.y - pointer.py;
      held.vx = Math.max(-1600, Math.min(1600, vx * 60));
      held.vy = Math.max(-1600, Math.min(1600, vy * 60));
      held = null;
      if (state === 'rested') state = 'live';
    }
    pointer.down = false;
  }

  stage.addEventListener('mousedown', onDown);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);
  stage.addEventListener('touchstart', onDown, { passive:false });
  window.addEventListener('touchmove', onMove, { passive:false });
  window.addEventListener('touchend', onUp);

  var kb = document.getElementById('knock');
  var bb = document.getElementById('build');
  if (kb) kb.addEventListener('click', knock);
  if (bb) bb.addEventListener('click', build);

  window.addEventListener('resize', layout);

  makeBlocks(); layout(); requestAnimationFrame(loop);
  if (document.fonts && document.fonts.load) {
    document.fonts.load('600 40px Playpen', LETTERS.join('')).then(draw).catch(function(){});
  }
})();
