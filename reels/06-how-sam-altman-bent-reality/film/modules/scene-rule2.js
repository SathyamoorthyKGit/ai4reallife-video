const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: -700, cy: 960, z: 1.05, r: -5 }, { t: 0.32, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 4.25, from: 0.35, cx: 540, cy: 975, z: 1.05, r: -1 }, { t: 4.6, from: 4.25, cx: 540, cy: 2700, z: 1.05, r: 3, ease: kit.ei }];
kit.scene('rule2', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="num-b r2-n" style="left:130px;top:330px">2</div>' +
      '<div class="words" style="left:240px;top:342px"><p class="sub r2-k" style="font-size:52px">Focus on</p></div>' +
      '<div class="words" style="left:0;top:440px;width:1080px;align-items:center;gap:6px"><h1 class="line r2-l" style="font-size:80px">Asking the right</h1><h1 class="line pink r2-l2" style="font-size:130px">questions</h1></div>' +
      '<div class="r2-h" style="position:absolute;left:150px;top:720px;width:380px;transform-origin:50% 100%">' + UI.img(kit, 'hand.webp', '', 'left:0;top:0;width:380px') + '</div>' +
      '<div class="qm r2-q" style="left:640px;top:750px;width:220px;height:220px;font-size:160px">?</div>' +
      '<div class="words" style="left:560px;top:1030px"><span class="tag r2-g" style="position:relative;font-size:32px">Not just answers</span></div>' +
      '<svg class="art" viewBox="0 0 1080 1200" style="height:1200px"><path class="pk-line r2-x" d="M570 1062 L930 1062" style="stroke-width:9"/></svg>',
      2000, '', 'window', UI.ghost('Why?', -60, 1520));
    const q = this.v.q;
    this.n = q('.r2-n').style; this.k = q('.r2-k').style;
    this.L = UI.letters(q('.r2-l'), 661, 1.1, 0.45).concat(UI.letters(q('.r2-l2'), 662, 1.7, 0.35));
    this.h = q('.r2-h').style; this.q = q('.r2-q').style; this.g = q('.r2-g').style; this.x = UI.draw(q('.r2-x'));
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.slam(this.n, t, 0.26, 0.2, 0, 1.8); this.k.opacity = eo(seg(t, 0.6, 0.9));
    UI.reveal(this.L, t);
    const hp = seg(t, 1.0, 1.4), wave = Math.sin(t * 3) * 3;
    this.h.opacity = hp > 0 ? 1 : 0; this.h.transform = 'translateY(' + lerp(600, 0, eob(hp, 1.2)) + 'px) rotate(' + (-6 + wave) + 'deg)';
    UI.slam(this.q, t, 1.9, 0.22, 12, 1.9); if (t > 2.2) this.q.transform += ' rotate(' + Math.sin((t - 2.2) * 4) * 6 + 'deg)';
    UI.slam(this.g, t, 2.95, 0.2, -2, 1.4); this.x(eio(seg(t, 3.6, 3.9)));
    UI.punch(this.v.roll, t, [0.26, 1.9, 2.95], 0.04);
  },
});
