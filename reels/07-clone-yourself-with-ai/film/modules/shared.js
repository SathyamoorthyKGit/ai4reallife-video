window.UI = {
  push(t, d, a, b) { a = a || 1; b = b || 1.06; return 'scale(' + (a + (b - a) * Math.max(0, Math.min(1, t / d))) + ')'; },
  wall(kit) { return '<img class="paper" src="' + kit.assets.url('paper2.webp') + '">'; },
  img(kit, name, cls, style) { return '<img class="cut ' + (cls || '') + '" src="' + kit.assets.url(name) + '" style="' + (style || '') + '">'; },
  lights(mode) {
    const m = { window: '<div class="lt-win"></div><div class="lt-hot"></div>', spot: '<div class="lt-beam"></div><div class="lt-hot" style="top:4%"></div>', soft: '<div class="lt-leak"></div>', dark: '<div class="lt-dark"></div>' };
    return '<div class="lite">' + (m[mode] || m.soft) + '<div class="lt-vig"></div></div>';
  },
  lit(L, t) {
    const q = s => L.el.querySelector(s);
    if (!L.parts) L.parts = { win: q('.lt-win'), hot: q('.lt-hot'), beam: q('.lt-beam'), leak: q('.lt-leak') };
    const P = L.parts;
    if (P.win) P.win.style.transform = 'rotate(-32deg) translateX(' + (t * 16) + 'px)';
    if (P.hot) P.hot.style.opacity = 0.75 + 0.25 * Math.sin(t * 0.8);
    if (P.beam) { P.beam.style.opacity = 0.8 + 0.2 * Math.sin(t * 1.1); P.beam.style.transform = 'rotate(' + Math.sin(t * 0.5) * 3 + 'deg)'; }
    if (P.leak) P.leak.style.transform = 'translate(' + Math.sin(t * 0.45) * 90 + 'px,' + Math.cos(t * 0.35) * 70 + 'px)';
  },
  build(kit, worldHtml, h, fgHtml, mode, backHtml) {
    mode = mode || 'soft';
    kit.stage.append(kit.h('<div class="ground">' + UI.wall(kit) + '<div class="roll"><div class="world back" style="height:' + h + 'px">' + (backHtml || '') + '</div><div class="world" style="height:' + h + 'px">' + worldHtml + '</div></div>' + UI.lights(mode) + '<div class="fg">' + (fgHtml || '') + '</div></div>'));
    const q = s => kit.stage.querySelector(s);
    const ws = kit.stage.querySelectorAll('.world'), world = ws[1].style;
    world.__lite = { el: q('.lite') }; world.__back = ws[0].style; world.__n = [kit.vnoise(11), kit.vnoise(23), kit.vnoise(37)];
    return { roll: q('.roll').style, world, q };
  },
  ease(p) { return p < 0.5 ? 8 * p * p * p * p : 1 - Math.pow(-2 * p + 2, 4) / 2; },
  track(keys, t) {
    if (t <= keys[0].t) return { r: 0, ...keys[0] };
    for (let i = 0; i < keys.length - 1; i++) {
      const A = keys[i], B = keys[i + 1];
      if (t <= B.t) {
        const a = B.from != null ? B.from : A.t;
        const p = t <= a ? 0 : Math.min(1, (t - a) / (B.t - a)), e = (B.ease || UI.ease)(p);
        return { cx: A.cx + (B.cx - A.cx) * e, cy: A.cy + (B.cy - A.cy) * e, z: Math.exp(Math.log(A.z) + (Math.log(B.z) - Math.log(A.z)) * e), r: (A.r || 0) + ((B.r || 0) - (A.r || 0)) * e };
      }
    }
    return { r: 0, ...keys[keys.length - 1] };
  },
  view(st, keys, t, drift) {
    if (st.__lite) UI.lit(st.__lite, t);
    const v = UI.track(keys, t), p = UI.track(keys, t - 1 / 30), k0 = keys[0];
    const z = v.z * (1 + (drift || 0.012) * t);
    const N = st.__n, hx = N ? N[0](t * 0.55) * 5 : 0, hy = N ? N[1](t * 0.5) * 6 : 0, hr = (N ? N[2](t * 0.4) * 0.35 : 0) + (v.r || 0);
    const T = (cx, cy, zz) => 'translate(540px,960px) rotate(' + hr.toFixed(3) + 'deg) translate(-540px,-960px) translate(' + (540 - cx * zz + hx) + 'px,' + (960 - cy * zz + hy) + 'px) scale(' + zz + ')';
    st.transform = T(v.cx, v.cy, z);
    const sp = Math.hypot((v.cx - p.cx) * v.z, (v.cy - p.cy) * v.z) + Math.abs(Math.log(v.z / p.z)) * 900 + Math.abs((v.r || 0) - (p.r || 0)) * 30;
    const blur = sp > 18 ? 'blur(' + Math.min(10, (sp - 18) * 0.12).toFixed(1) + 'px)' : 'none';
    st.filter = blur;
    if (st.__back) { const d = 0.55; st.__back.transform = T(k0.cx + (v.cx - k0.cx) * d, k0.cy + (v.cy - k0.cy) * d, 1 + (z - 1) * 0.5); st.__back.filter = blur; }
    return v;
  },
  punch(st, t, times, amt) {
    let s = 1; for (const a of times) if (t >= a) s = 1 + (amt || 0.05) * Math.exp(-(t - a) * 10) * (t - a < 0.03 ? (t - a) / 0.03 : 1);
    st.transform = 'scale(' + s + ')'; st.filter = 'none';
  },
  roll(st, t, dur, inA, outA) {
    let r = 0, s = 1, b = 0;
    if (inA) { const p = 1 - kit.eo(kit.seg(t, 0, 0.4)); r += inA * p; s += 0.35 * p; b += 10 * p; }
    if (outA) { const p = kit.ei(kit.seg(t, dur - 0.4, dur)); r += outA * p; s += 0.4 * p; b += 10 * p; }
    st.transform = 'rotate(' + r + 'deg) scale(' + s + ')';
    st.filter = b > 0.3 ? 'blur(' + b.toFixed(1) + 'px)' : 'none';
  },
  letters(el, seed, t0, span) {
    const txt = el.textContent, r = kit.rng(seed || 1);
    el.innerHTML = [...txt].map(c => '<span>' + (c === ' ' ? '&nbsp;' : c) + '</span>').join('');
    return [...el.children].map(s => ({ s: s.style, at: t0 + r() * span }));
  },
  reveal(list, t) { for (const L of list) L.s.opacity = t >= L.at ? 1 : 0; },
  draw(path) { const L = path.getTotalLength(); path.style.strokeDasharray = L; path.style.strokeDashoffset = L; return p => { path.style.strokeDashoffset = L * (1 - p); path.style.opacity = p > 0.002 ? 1 : 0; }; },
  slam(st, t, a, d, rot, from) { const p = kit.seg(t, a, a + (d || 0.22)); st.opacity = p > 0 ? 1 : 0; st.transform = 'rotate(' + (rot || 0) + 'deg) scale(' + ((from || 1.5) + (1 - (from || 1.5)) * kit.eob(p, 1.6)) + ')'; },
  screen(left, top) {
    return '<div class="scr" style="left:' + left + 'px;top:' + top + 'px;width:436px;height:282px">' +
      '<span class="b7" style="font-size:26px">Online Banking</span>' +
      '<div class="field"><span>alex.m</span></div>' +
      '<div class="field"><span class="lg-pw" style="letter-spacing:.1em"></span><span class="lg-caret" style="display:inline-block;width:3px;height:32px;background:var(--second)"></span></div>' +
      '<div class="btn lg-btn">Sign in</div></div>';
  },
  login(user, extra) { return '<div class="card" style="width:780px"><span>' + user + '</span>' + (extra || '') + '</div>'; },
  you(cls) { return '<svg class="' + (cls || '') + '" viewBox="0 0 220 560"></svg>'; },
  agent(cls) { return '<svg class="' + (cls || '') + '" viewBox="0 0 220 560"></svg>'; },
  glitch(kit, t, at, seed) {
    const d = t - at; if (Math.abs(d) > 0.1) return;
    const r = kit.rng(seed || 3), c = kit.fx, W = kit.W, H = kit.H;
    c.save();
    for (let i = 0; i < 7; i++) {
      const w = 160 + r() * 520, h = 40 + r() * 170, x = r() * W - 80 + d * (r() - .5) * 2400, y = r() * H;
      c.fillStyle = i % 3 ? 'rgba(24,24,24,.92)' : 'rgba(150,150,150,.9)';
      c.fillRect(x, y, w, h);
    }
    c.restore();
  },

  num(n) { const v = Math.round(Math.abs(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); return (n < -0.5 ? '−' : '') + v; },
  jag(w, h, seed, amp, step) {
    const r = kit.rng(seed || 5), a = amp || 9, st = step || 46, P = [];
    const j = () => (r() * a).toFixed(1);
    for (let x = 0; x < w; x += st) P.push((x + r() * 8).toFixed(1) + 'px ' + j() + 'px');
    for (let y = 0; y < h; y += st) P.push((w - j()) + 'px ' + (y + r() * 8).toFixed(1) + 'px');
    for (let x = w; x > 0; x -= st) P.push((x - r() * 8).toFixed(1) + 'px ' + (h - j()) + 'px');
    for (let y = h; y > 0; y -= st) P.push(j() + 'px ' + (y - r() * 8).toFixed(1) + 'px');
    return 'polygon(' + P.join(',') + ')';
  },
  /* a torn-paper framed B&W clip: host is an absolutely placed div with inline width/height */
  vid(kit, host, name, seed) {
    const w = parseFloat(host.style.width), h = parseFloat(host.style.height), b = 16;
    host.classList.add('vf');
    host.innerHTML = '<div class="vf-o" style="clip-path:' + UI.jag(w, h, seed, 10) + '"><div class="vf-i" style="left:' + b + 'px;top:' + b + 'px;width:' + (w - 2 * b) + 'px;height:' + (h - 2 * b) + 'px;clip-path:' + UI.jag(w - 2 * b, h - 2 * b, (seed || 5) + 9, 7) + '"></div></div>';
    const v = kit.video(name, { style: 'position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover' });
    const inner = host.querySelector('.vf-i'); inner.append(v);
    inner.insertAdjacentHTML('beforeend', '<img class="vf-pp" src="' + kit.assets.url('paper2.webp') + '"><div class="vf-ht"></div>');
    return v;
  },
  ghost(txt, x, y, size) { return '<div class="ghost" style="left:' + x + 'px;top:' + y + 'px' + (size ? ';font-size:' + size + 'px' : '') + '">' + txt + '</div>'; },
  /* screen-space position of a world point under the current camera (ignores handheld + tilt) */
  toScreen(keys, t, x, y, drift) { const v = UI.track(keys, t), z = v.z * (1 + (drift || 0.012) * t); return { x: 540 + (x - v.cx) * z, y: 960 + (y - v.cy) * z, z }; },

  /* a still logo slot in the foreground: holds dead steady (no camera, no wobble) so a logo can be laid over it in an editor */
  slot(name, x, y, w, h, cls) { return '<div class="slot ' + (cls || '') + '" style="left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + h + 'px"><span>' + name + '</span></div>'; },
  slotAnim(st, t, a, b) {
    const pin = kit.seg(t, a, a + 0.25), out = kit.seg(t, b, b + 0.2);
    st.opacity = pin > 0 && out < 1 ? 1 - out : 0;
    st.transform = 'scale(' + (out > 0 ? 1 - 0.2 * kit.ei(out) : 0.6 + 0.4 * kit.eob(pin, 1.6)) + ')';
  },
  arrowHead(x, y, ang, cls) { const a = ang * Math.PI / 180, L = 34, s = 0.5; const p = (d) => (x - L * Math.cos(a + d)).toFixed(1) + ' ' + (y - L * Math.sin(a + d)).toFixed(1); return '<path class="' + cls + '" d="M' + p(s) + ' L' + x + ' ' + y + ' L' + p(-s) + '"/>'; },

  /* animated stickers: a 6-frame sprite strip from Sathya's GIFs, frame picked from t (4 per second) */
  SPR: {"copier": [430, 544], "worker": [192, 539], "typist": [480, 504], "papers": [412, 397], "wheel": [424, 430], "catalog": [419, 419], "letters": [425, 362], "mic": [269, 413], "lamp": [496, 532], "rulebook": [445, 431], "cabinet": [386, 453], "floppy": [379, 387], "plane": [438, 287], "clock": [341, 459], "mirror": [336, 546], "crumple": [436, 443]},
  anim(kit, name, cls, style, w) { const m = UI.SPR[name], h = Math.round(w * m[1] / m[0]); return '<div class="cut spr ' + (cls || '') + '" style="' + (style || '') + ';width:' + w + 'px;height:' + h + 'px;overflow:hidden"><img src="' + kit.assets.url(name + '.webp') + '" style="position:absolute;left:0;top:0;width:600%;height:100%;max-width:none;transform:translateX(calc(var(--f, 0) * -16.6667%))"></div>'; },
  frame(st, t, off) { const i = ((Math.floor((t + (off || 0)) / 0.24) % 6) + 6) % 6; st.setProperty('--f', i); },
  type(el, full, t, a, cps) { const n = Math.max(0, Math.min(full.length, Math.floor((t - a) * (cps || 22)))); el.textContent = t < a ? '' : full.slice(0, n); return n >= full.length; },
};
