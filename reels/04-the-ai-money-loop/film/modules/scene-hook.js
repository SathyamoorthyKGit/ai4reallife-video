const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 900, z: 1.18, r: -2 }, { t: 2.4, from: 0.3, cx: 540, cy: 920, z: 1.04, r: 0 }, { t: 2.95, from: 2.5, cx: 540, cy: 1250, z: 1.0, r: 1 }, { t: 4.65, from: 3.0, cx: 540, cy: 1260, z: 1.05, r: 0 }, { t: 5.03, from: 4.68, cx: 1700, cy: 1260, z: 1.05, r: 5, ease: kit.ei }];
kit.scene('hook', {
  init(kit) {
    let pages = '';
    for (let i = 0; i < 7; i++) pages += UI.img(kit, 'page.webp', 'hk-fl', 'left:' + (230 + (i % 3) * 20) + 'px;top:620px;width:620px;transform-origin:50% 120%');
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:330px;width:1080px;align-items:center;gap:6px"><p class="sub hk-k">Pages of risk factors</p></div>' +
      '<div class="hk-pg" style="position:absolute;left:0;top:0;width:1080px;height:1400px">' + pages +
      UI.img(kit, 'page.webp', 'hk-main', 'left:220px;top:600px;width:640px') +
      '<div class="stamp hk-94" style="left:250px;top:700px;font-size:330px;padding:0 40px 10px;border-width:16px;transform-origin:50% 50%">94</div></div>' +
      '<div class="words" style="left:0;top:640px;width:1080px;align-items:center;gap:6px"><p class="sub hk-k2">One AI company’s</p><h1 class="line hk-l" style="font-size:170px">IPO filing</h1></div>' +
      UI.img(kit, 'docstack.webp', 'hk-st', 'left:170px;top:1160px;width:740px') +
      '<div class="words" style="left:560px;top:1250px"><span class="tape pk hk-t" style="font-size:64px">S-1</span></div>' +
      UI.img(kit, 'rstamp.webp', 'hk-rs', 'left:120px;top:1060px;width:250px'),
      2400, '', 'window', UI.ghost('Risk', -60, 1560) + '<div class="stripe" style="left:780px;top:520px;width:70px;height:1100px;opacity:.7;transform:skewX(-22deg)"></div>');
    const q = this.v.q;
    this.k = q('.hk-k').style; this.pg = q('.hk-pg').style; this.s94 = q('.hk-94').style;
    this.fl = [...kit.stage.querySelectorAll('.hk-fl')].map(e => e.style);
    this.k2 = q('.hk-k2').style; this.L = UI.letters(q('.hk-l'), 401, 2.9, 0.4);
    this.st = q('.hk-st').style; this.t = q('.hk-t').style; this.rs = q('.hk-rs').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.006);
    // the 94 is already slammed at frame 0 (thumbnail); pages riffle behind it while the line reads
    const st = seg(t, -0.12, 0.12); this.s94.opacity = 1; this.s94.transform = 'rotate(-8deg) scale(' + lerp(1.35, 1, eob(st, 1.7)) + ')';
    this.k.opacity = eo(seg(t, 0.35, 0.65));
    this.fl.forEach((s, i) => { const a = 0.55 + i * 0.2, p = seg(t, a, a + 0.3); s.opacity = p > 0 && p < 1 ? 1 : 0; s.transform = 'translate(' + lerp(0, -900, ei(p)) + 'px,' + lerp(0, -260, p) + 'px) rotate(' + lerp(0, -38, ei(p)) + 'deg)'; });
    const out = seg(t, 2.45, 2.85);
    this.pg.opacity = out < 1 ? 1 : 0; this.pg.transform = 'translate(' + lerp(0, -1200, ei(out)) + 'px,' + lerp(0, -200, out) + 'px) rotate(' + lerp(0, -18, out) + 'deg)';
    this.k.opacity *= 1 - out;
    this.k2.opacity = eo(seg(t, 2.75, 3.0)); UI.reveal(this.L, t);
    this.st.opacity = t >= 2.6 ? 1 : 0; this.st.transform = 'translateY(' + lerp(300, 0, eob(seg(t, 2.6, 3.1), 1.2)) + 'px)';
    const sp = seg(t, 3.3, 3.55), up = seg(t, 3.75, 4.1);
    this.rs.opacity = t >= 3.05 && up < 1 ? 1 : 0;
    this.rs.transform = 'translate(' + lerp(-300, 330, eo(seg(t, 3.05, 3.3))) + 'px,' + (lerp(-500, 0, ei(sp)) + lerp(0, -700, ei(up))) + 'px) rotate(' + lerp(-20, 0, sp) + 'deg)';
    this.t.opacity = t >= 3.55 ? 1 : 0; this.t.transform = 'rotate(-6deg) scale(' + lerp(1.4, 1, eob(seg(t, 3.55, 3.75), 1.6)) + ')';
    UI.punch(this.v.roll, t, [3.55], 0.045);
  },
});
