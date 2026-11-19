const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 960, z: 1.03, r: -1.5 }, { t: 5.5, from: 0.2, cx: 540, cy: 980, z: 1.0, r: 0 }, { t: 6.0, from: 5.5, cx: 540, cy: 1900, z: 1.0, r: 1 }, { t: 8.85, from: 6.05, cx: 540, cy: 1910, z: 1.06, r: -1 }, { t: 9.21, from: 8.85, cx: 1700, cy: 1910, z: 1.05, r: 5, ease: kit.ei }];
kit.scene('hook', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:300px;width:1080px;align-items:center;gap:4px"><p class="sub hk-k" style="font-size:36px">Harvard Business School professor</p><h1 class="line hk-l" style="font-size:96px">Karim R. Lakhani</h1></div>' +
      UI.img(kit, 'campus.webp', 'hk-cp', 'left:40px;top:1080px;width:520px') +
      UI.img(kit, 'mortar.webp', 'hk-mb', 'left:700px;top:1130px;width:300px') +
      '<div class="stamp solid hk-s" style="left:360px;top:1320px;font-size:76px;transform-origin:50% 50%">AI warning</div>' +
      '<div class="words" style="left:0;top:1480px;width:1080px;align-items:center;gap:6px"><p class="sub hk-k2">The group most at risk</p><h1 class="line hk-l2" style="font-size:150px">Isn’t who</h1><h1 class="line pink hk-l3" style="font-size:150px">you think</h1></div>' +
      '<div class="qm hk-q" style="left:690px;top:2080px">?</div>' +
      UI.img(kit, 'manager.webp', 'hk-mg', 'left:150px;top:2010px;width:200px'),
      2600, UI.slot('Prof. Karim R.<br>Lakhani · photo', 300, 520, 480, 520, 'photo hk-ph') + UI.slot('HBS', 300, 1070, 480, 110, 'hk-lg') + '<div class="pulse hk-pu"></div>', 'window', UI.ghost('Harvard', -80, 1240, 340));
    const q = this.v.q;
    this.k = q('.hk-k').style; this.L = UI.letters(q('.hk-l'), 501, 0.0, 0.3);
    this.ph = q('.hk-ph').style; this.lg = q('.hk-lg').style; this.pu = q('.hk-pu').style;
    this.cp = q('.hk-cp').style; this.mb = q('.hk-mb').style; this.s = q('.hk-s').style;
    this.k2 = q('.hk-k2').style; this.L2 = UI.letters(q('.hk-l2'), 502, 7.6, 0.4).concat(UI.letters(q('.hk-l3'), 503, 8.1, 0.35));
    this.qq = q('.hk-q').style; this.mg = q('.hk-mg').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.005);
    this.k.opacity = 1; UI.reveal(this.L, t + 0.3);
    UI.slotAnim(this.ph, t, 0.15, 5.35); UI.slotAnim(this.lg, t, 0.45, 5.35);
    // a slow warning pulse, under one beat a second (never a flash)
    this.pu.opacity = t < 5.5 ? (0.25 + 0.35 * (0.5 + 0.5 * Math.sin(t * Math.PI * 1.6))) * eo(seg(t, 0, 0.3)) * (1 - eo(seg(t, 5.2, 5.5))) : 0;
    const gone = 1 - eo(seg(t, 5.5, 5.9)); this.cp.opacity = (t >= 0.5 ? 1 : 0) * gone; this.cp.transform = 'translateY(' + lerp(300, 0, eob(seg(t, 0.5, 1.0), 1.2)) + 'px) rotate(-2deg)';
    this.mb.opacity = (t >= 0.9 ? 1 : 0) * gone; this.mb.transform = 'translate(' + lerp(300, 0, eo(seg(t, 0.9, 1.4))) + 'px,' + lerp(-500, 0, eob(seg(t, 0.9, 1.4), 1.3)) + 'px) rotate(' + lerp(40, 12, eo(seg(t, 0.9, 1.4))) + 'deg)';
    UI.slam(this.s, t, 3.75, 0.24, -7, 1.9); this.s.opacity *= gone;
    this.k2.opacity = eo(seg(t, 6.0, 6.3)); UI.reveal(this.L2, t);
    UI.slam(this.qq, t, 8.0, 0.22, 12, 1.9);
    this.mg.opacity = t >= 6.8 ? 1 : 0; this.mg.transform = 'translateY(' + lerp(300, 0, eob(seg(t, 6.8, 7.3), 1.2)) + 'px)';
    UI.punch(this.v.roll, t, [3.75, 8.0], 0.04);
  },
});
