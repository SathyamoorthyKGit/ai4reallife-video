window.UI = {
  push(t, d, a, b) { a = a || 1; b = b || 1.06; return 'scale(' + (a + (b - a) * Math.max(0, Math.min(1, t / d))) + ')'; },
  wall(kit) { return '<img class="paper" src="' + kit.assets.url('paper2.webp') + '">'; },
  img(kit, name, cls, style) { return '<img class="cut ' + (cls || '') + '" src="' + kit.assets.url(name) + '" style="' + (style || '') + '">'; },
  MODES: { '0': 'window', '5': 'soft', '9.5': 'spot', '14': 'window', '20': 'window', '26': 'dark', '31': 'soft', '38': 'spot', '43': 'window', '49': 'soft', '53': 'spot' },
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
  build(kit, worldHtml, h, fgHtml) {
    const mode = UI.MODES[String(kit.start)] || 'soft';
    kit.stage.append(kit.h('<div class="ground">' + UI.wall(kit) + '<div class="roll"><div class="world" style="height:' + h + 'px">' + worldHtml + '</div></div>' + UI.lights(mode) + '<div class="fg">' + (fgHtml || '') + '</div></div>'));
    const q = s => kit.stage.querySelector(s);
    const world = q('.world').style;
    world.__lite = { el: q('.lite') };
    return { roll: q('.roll').style, world, q };
  },
  track(keys, t) {
    if (t <= keys[0].t) return keys[0];
    for (let i = 0; i < keys.length - 1; i++) {
      const A = keys[i], B = keys[i + 1];
      if (t <= B.t) {
        const a = B.from != null ? B.from : A.t;
        const p = t <= a ? 0 : Math.min(1, (t - a) / (B.t - a)), e = (B.ease || kit.eio)(p);
        return { cx: A.cx + (B.cx - A.cx) * e, cy: A.cy + (B.cy - A.cy) * e, z: Math.exp(Math.log(A.z) + (Math.log(B.z) - Math.log(A.z)) * e), r: (A.r || 0) + ((B.r || 0) - (A.r || 0)) * e };
      }
    }
    return keys[keys.length - 1];
  },
  view(st, keys, t, drift) {
    if (st.__lite) UI.lit(st.__lite, t);
    const v = UI.track(keys, t), p = UI.track(keys, t - 1 / 30);
    const z = v.z * (1 + (drift || 0.012) * t);
    st.transform = 'translate(' + (540 - v.cx * z) + 'px,' + (960 - v.cy * z) + 'px) scale(' + z + ')';
    const sp = Math.hypot((v.cx - p.cx) * v.z, (v.cy - p.cy) * v.z) + Math.abs(Math.log(v.z / p.z)) * 900;
    st.filter = sp > 18 ? 'blur(' + Math.min(9, (sp - 18) * 0.12).toFixed(1) + 'px)' : 'none';
    return v;
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
  draw(path) { const L = path.getTotalLength(); path.style.strokeDasharray = L; path.style.strokeDashoffset = L; return p => { path.style.strokeDashoffset = L * (1 - p); }; },
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
};