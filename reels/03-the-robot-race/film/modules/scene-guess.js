const { seg, eo, ei, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 2300, z: 1.05, r: 4 }, { t: 0.4, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 1.6, from: 0.45, cx: 540, cy: 960, z: 1.06, r: -1 }, { t: 2.15, from: 1.6, cx: 540, cy: 1640, z: 1.0, r: 0 }, { t: 6.4, from: 2.2, cx: 540, cy: 1640, z: 1.12, r: 1 }, { t: 6.75, from: 6.42, cx: -700, cy: 1640, z: 1.1, r: -5, ease: kit.ei }];
kit.scene('guess', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:290px;width:1080px;align-items:center;gap:8px"><p class="sub gs-k">You’d guess</p><h1 class="line gs-l" style="font-size:130px">Car plants</h1></div>' +
      UI.img(kit, 'robot1.webp', 'gs-rb', 'left:200px;top:600px;width:520px') +
      '<div class="qm gs-q" style="left:760px;top:600px">?</div>' +
      '<div class="gs-v" style="position:absolute;left:140px;top:1060px;width:800px;height:1150px"></div>' +
      '<div class="words" style="left:150px;top:1150px;gap:16px"><span class="tape gs-t" style="font-size:80px">Automotive</span><span class="tag gs-g">13,500 new US robots</span></div>' +
      '<div class="stamp solid gs-s" style="left:470px;top:1820px;font-size:150px;transform-origin:50% 50%">−1%</div>',
      2600, '', 'window', UI.ghost('Cars', -40, 880) + '<div class="stripe" style="left:820px;top:300px;width:60px;height:900px;opacity:.7;transform:skewX(-24deg)"></div>');
    const q = this.v.q;
    this.k = q('.gs-k').style; this.L = UI.letters(q('.gs-l'), 51, 0.3, 0.45);
    this.rb = q('.gs-rb').style; this.qm = q('.gs-q').style;
    this.host = q('.gs-v'); this.vs = this.host.style; this.vid = UI.vid(kit, this.host, 'clip-cars.mp4', 12);
    this.t1 = q('.gs-t').style; this.g = q('.gs-g').style; this.s = q('.gs-s').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.006);
    this.k.opacity = eo(seg(t, 0.15, 0.4)); UI.reveal(this.L, t);
    this.rb.opacity = t >= 0.35 ? 1 : 0; this.rb.transform = 'translateY(' + lerp(260, 0, eob(seg(t, 0.35, 0.85), 1.2)) + 'px) rotate(' + (-4 + Math.sin(t * 1.6) * 1.5) + 'deg)';
    UI.slam(this.qm, t, 1.0, 0.22, 10, 1.9);
    kit.seek(this.vid, Math.max(0, t - 1.2));
    const vp = seg(t, 1.45, 2.05);
    this.vs.opacity = vp > 0 ? 1 : 0; this.vs.transform = 'translateY(' + lerp(300, 0, eob(vp, 1.1)) + 'px) rotate(' + lerp(5, -1.5, eo(vp)) + 'deg)';
    UI.slam(this.t1, t, 2.45, 0.22, -3, 1.6);
    this.g.opacity = eo(seg(t, 2.9, 3.2)); this.g.transform = 'rotate(-2deg) translateX(' + lerp(-40, 0, eo(seg(t, 2.9, 3.2))) + 'px)';
    UI.slam(this.s, t, 3.7, 0.24, -7, 1.9);
    UI.punch(this.v.roll, t, [1.0, 2.45, 3.7], 0.035);
  },
});
