const { seg, eo, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 1700, cy: 960, z: 1.05, r: 5 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 2.3, from: 0.4, cx: 540, cy: 960, z: 1.06, r: -1 }, { t: 2.65, from: 2.3, cx: 540, cy: 1000, z: 2.6, r: 0, ease: kit.ei }];
kit.scene('food', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="fd-v" style="position:absolute;left:120px;top:330px;width:840px;height:1230px"></div>' +
      '<div class="words" style="left:140px;top:430px"><span class="tape fd-t" style="font-size:80px">Food &amp; drink</span></div>' +
      '<div class="stamp solid fd-s" style="left:330px;top:1180px;font-size:190px;transform-origin:50% 50%">+30%</div>' +
      '<div class="words" style="left:0;top:1440px;width:1080px;align-items:center"><span class="tag fd-g" style="align-self:center">2,900 new US robots</span></div>',
      2000, '', 'spot', UI.ghost('Food', -60, 1500) + '<div class="stripe" style="left:60px;top:200px;width:80px;height:1500px;opacity:.75;transform:skewX(-18deg)"></div>');
    const q = this.v.q;
    this.vid = UI.vid(kit, q('.fd-v'), 'clip-bottles.mp4', 21);
    this.t1 = q('.fd-t').style; this.s = q('.fd-s').style; this.g = q('.fd-g').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.008);
    kit.seek(this.vid, t + 0.3);
    UI.slam(this.t1, t, 0.4, 0.22, -3, 1.6);
    UI.slam(this.s, t, 0.85, 0.24, -8, 2.0);
    this.g.opacity = eo(seg(t, 1.3, 1.55)); this.g.transform = 'rotate(2deg) translateY(' + lerp(26, 0, eo(seg(t, 1.3, 1.55))) + 'px)';
    UI.punch(this.v.roll, t, [0.4, 0.85], 0.04);
  },
});
