const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: -500, z: 1.05, r: 3 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 1.75, from: 0.4, cx: 560, cy: 990, z: 1.07, r: -2 }, { t: 2.15, from: 1.8, cx: 540, cy: 960, z: 1.0, r: 0 }, { t: 3.06, from: 2.75, cx: 540, cy: 2600, z: 1.05, r: 3, ease: kit.ei }];
kit.scene('bubble', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words bb-a" style="left:0;top:360px;width:1080px;align-items:center;gap:6px"><p class="sub bb-k">So is the bubble</p><h1 class="line bb-l" style="font-size:150px">Popping?</h1></div>' +
      '<div class="bb-b" style="position:absolute;left:250px;top:720px;width:580px;height:580px;transform-origin:50% 50%">' + UI.img(kit, 'bubble.webp', '', 'left:0;top:0;width:580px') + '</div>' +
      '<div class="bb-p" style="position:absolute;left:742px;top:458px;width:520px;transform-origin:100% 0">' + UI.img(kit, 'pin.webp', '', 'left:0;top:0;width:520px') + '</div>' +
      '<div class="words" style="left:0;top:1420px;width:1080px;align-items:center"><span class="tape bl bb-t" style="align-self:center;font-size:66px">Here’s the loop</span></div>',
      2000, '', 'soft', UI.ghost('Bubble', -60, 1560));
    const q = this.v.q;
    this.k = q('.bb-k').style; this.L = UI.letters(q('.bb-l'), 411, 0.2, 0.45);
    this.b = q('.bb-b').style; this.p = q('.bb-p').style; this.t = q('.bb-t').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.006);
    this.k.opacity = eo(seg(t, 0.05, 0.3)); UI.reveal(this.L, t);
    const inf = eo(seg(t, 0.1, 1.6)), wob = Math.sin(t * 7) * 0.02 * (1 - seg(t, 0, 2.5));
    this.b.transform = 'scale(' + (lerp(0.55, 1, inf) + wob) + ',' + (lerp(0.55, 1, inf) - wob) + ')';
    // the pin creeps in and stops a hair short of the bubble
    const pp = eio(seg(t, 0.4, 1.6)), sh = t > 1.6 ? Math.sin(t * 40) * 2 * Math.exp(-(t - 1.6) * 6) : 0;
    this.p.transform = 'translate(' + (lerp(500, 0, pp) + sh) + 'px,' + lerp(-400, 0, pp) + 'px)';
    UI.slam(this.t, t, 2.2, 0.22, -3, 1.6);
    UI.punch(this.v.roll, t, [2.2], 0.04);
  },
});
