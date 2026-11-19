const { seg, eo, eox, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 760, z: 1.0 }, { t: 1.1, from: 0.45, cx: 480, cy: 760, z: 1.08 }, { t: 2.5, from: 1.45, cx: 540, cy: 1250, z: 1.05 }, { t: 4.1, from: 3.05, cx: 540, cy: 1170, z: 0.78 }];
kit.scene('rule1', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="line r1-num" style="position:absolute;left:450px;top:250px;font-size:760px;line-height:.9;color:var(--main)">1</div>' +
      '<div class="words r1-tw" style="left:120px;top:400px;gap:18px"><p class="tag r1-k">Three rules</p><span class="tape r1-t1" style="font-size:130px">No</span><span class="tape r1-t2" style="font-size:110px">Passwords</span></div>' +
      '<div class="r1-key" style="position:absolute;left:310px;top:1080px;width:460px;transform-origin:50% 0">' + UI.img(kit, 'key.webp', '', 'left:0;top:0;width:460px') + '</div>' +
      '<svg class="art" viewBox="0 0 1080 2400" style="height:2400px"><path class="redline r1-x1" d="M280 1140 C 440 1360 600 1600 770 1850" style="stroke-width:28"/><path class="redline r1-x2" d="M780 1150 C 630 1380 460 1620 290 1840" style="stroke-width:28"/></svg>' +
      '<div class="words" style="left:80px;top:1900px;width:760px"><p class="b7 r1-body" style="font-size:50px;line-height:1.15">Never give an AI your banking password.</p></div>', 2400);
    const q = this.v.q;
    this.num = q('.r1-num').style; this.k = q('.r1-k').style; this.t1 = q('.r1-t1').style; this.t2 = q('.r1-t2').style; this.key = q('.r1-key').style; this.body = q('.r1-body').style;
    this.tw = q('.r1-tw').style; this.x1 = UI.draw(q('.r1-x1')); this.x2 = UI.draw(q('.r1-x2'));
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.01);
    this.num.transform = 'translateY(' + lerp(-200, 0, eob(seg(t, -0.3, 0.25), 1.4)) + 'px)';
    this.k.opacity = eo(seg(t, -0.1, 0.25));
    UI.slam(this.t1, t, 0.5, 0.22, -3, 1.6); UI.slam(this.t2, t, 0.8, 0.22, 2, 1.6);
    const kp = seg(t, 1.35, 1.9), kt = Math.max(0, t - 1.9);
    this.key.opacity = t >= 1.35 ? 1 : 0;
    this.key.transform = 'translateY(' + (1 - eox(kp)) * -1500 + 'px) rotate(' + (lerp(-35, 8, eo(kp)) + Math.exp(-kt * 1.5) * Math.sin(kt * 5) * 9) + 'deg)';
    this.tw.opacity = this.num.opacity = 1 - eo(seg(t, 1.5, 1.8)) + eo(seg(t, 3.1, 3.5));
    this.x1(eo(seg(t, 2.5, 2.8))); this.x2(eo(seg(t, 2.8, 3.1)));
    this.body.opacity = eo(seg(t, 3.3, 3.7)); this.body.transform = 'translateX(' + lerp(30, 0, eo(seg(t, 3.3, 3.8))) + 'px)';
    UI.glitch(kit, t, 0, 31);
  },
});