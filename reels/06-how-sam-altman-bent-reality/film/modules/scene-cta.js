const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 1700, cy: 960, z: 1.05, r: 5 }, { t: 0.32, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 3.55, from: 0.35, cx: 540, cy: 975, z: 1.04, r: -1 }, { t: 3.95, from: 3.55, cx: 540, cy: 1880, z: 1.0, r: 1 }, { t: 7.52, from: 4.0, cx: 540, cy: 1890, z: 1.03, r: 0 }];
kit.scene('cta', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:300px;width:1080px;align-items:center"><p class="sub ct-k" style="font-size:52px">Are you</p></div>' +
      '<div class="ct-m" style="position:absolute;left:270px;top:420px;width:540px;transform-origin:50% 0">' + UI.img(kit, 'masks.webp', '', 'left:0;top:0;width:540px') + '</div>' +
      '<div class="words ct-o" style="left:60px;top:990px;width:460px;align-items:center"><span class="node" style="font-size:46px;background:var(--accent)">Optimistic</span></div>' +
      '<div class="words ct-p" style="left:520px;top:990px;width:480px;align-items:center"><span class="node" style="font-size:46px;background:var(--main)">Pessimistic</span></div>' +
      '<div class="words" style="left:0;top:1110px;width:1080px;align-items:center"><p class="sub ct-k2">about AI’s impact?</p></div>' +
      '<div class="words" style="left:0;top:1270px;width:1080px;align-items:center;gap:6px"><h1 class="line ct-l" style="font-size:120px">Drop your</h1><h1 class="line pink ct-l2" style="font-size:140px">thoughts</h1></div>' +
      '<div class="ct-pt" style="position:absolute;left:560px;top:1540px;width:440px;transform-origin:0 50%">' + UI.img(kit, 'point.webp', '', 'left:0;top:0;width:440px') + '</div>' +
      '<div class="words" style="left:0;top:2110px;width:1080px;align-items:center;gap:14px"><span class="tape bl ct-t" style="position:relative;align-self:center;font-size:70px;transform-origin:50% 50%">Save this</span><p class="sub ct-k3" style="font-size:38px">for your next big idea</p></div>',
      2600, '', 'window', UI.ghost('You?', -60, 1580));
    const q = this.v.q;
    this.k = q('.ct-k').style; this.m = q('.ct-m').style; this.o = q('.ct-o').style; this.p = q('.ct-p').style; this.k2 = q('.ct-k2').style;
    this.L = UI.letters(q('.ct-l'), 691, 3.96, 0.35).concat(UI.letters(q('.ct-l2'), 692, 4.4, 0.35));
    this.pt = q('.ct-pt').style; this.t = q('.ct-t').style; this.k3 = q('.ct-k3').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.2, 0.45));
    const mp = seg(t, 0.3, 0.65), sw = Math.sin(t * 2.4) * 4 * (t > 0.65 ? 1 : 0);
    this.m.opacity = mp > 0 ? 1 : 0; this.m.transform = 'translateY(' + lerp(-500, 0, eob(mp, 1.3)) + 'px) rotate(' + sw + 'deg)';
    UI.slam(this.o, t, 0.65, 0.22, -3, 1.5); UI.slam(this.p, t, 1.59, 0.22, 3, 1.5);
    this.k2.opacity = eo(seg(t, 2.3, 2.55)); const g = 1 - seg(t, 3.55, 3.8); this.k2.opacity *= g; this.o.opacity *= g; this.p.opacity *= g; this.k.opacity *= g; this.m.opacity *= g;
    UI.reveal(this.L, t);
    const pp = seg(t, 4.5, 4.85), tap = Math.max(0, Math.sin((t - 4.85) * 7)) * 18 * seg(t, 4.85, 5.2);
    this.pt.opacity = pp > 0 ? 1 : 0; this.pt.transform = 'rotate(90deg) translateX(' + (lerp(-240, 0, eob(pp, 1.3)) + tap) + 'px)';
    UI.slam(this.t, t, 5.25, 0.22, -3, 1.5); this.k3.opacity = eo(seg(t, 6.0, 6.3));
    UI.punch(this.v.roll, t, [0.65, 1.59, 3.96, 5.25], 0.035);
  },
});
