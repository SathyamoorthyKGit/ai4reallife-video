const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 1700, cy: 960, z: 1.05, r: 5 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 4.3, from: 0.4, cx: 540, cy: 980, z: 1.03, r: 0 }, { t: 4.9, from: 4.35, cx: 590, cy: 900, z: 1.05, r: -2 }, { t: 7.55, from: 5.0, cx: 580, cy: 910, z: 1.07, r: -1 }, { t: 7.89, from: 7.55, cx: 540, cy: 2700, z: 1.05, r: 3, ease: kit.ei }];
kit.scene('gap', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:330px;width:1080px;align-items:center;gap:6px"><p class="sub gp-k">A massive</p><h1 class="line gp-l" style="font-size:76px">Performance gap</h1></div>' +
      '<svg class="art" viewBox="0 0 1080 2000" style="height:2000px">' +
        '<path class="stroke" d="M110 640 L110 1460 L980 1460" style="stroke-width:6"/>' +
        '<path class="gp-tr" d="M120 1300 C 260 1280 380 1240 500 1180" style="fill:none;stroke:var(--second);stroke-width:16;stroke-linecap:round"/>' +
        '<path class="bl-line gp-up1" d="M500 1180 C 600 1100 660 1000 720 900" style="stroke-width:16"/>' +
        '<path class="bl-line gp-up2" d="M720 900 C 790 790 860 700 960 600" style="stroke-width:16"/>' +
        '<path class="pk-line gp-dn" d="M500 1180 C 640 1230 800 1260 960 1280" style="stroke-width:16"/>' +
      '</svg>' +
      '<div class="words" style="left:300px;top:1320px"><span class="tape gp-t" style="font-size:44px">Inside organisations</span></div>' +
      UI.img(kit, 'cyborg.webp', 'gp-c', 'left:830px;top:470px;width:170px') +
      '<div class="words" style="left:470px;top:620px"><span class="tape bl gp-u" style="font-size:44px">Top AI power users</span></div>' +
      '<div class="words" style="left:470px;top:720px"><span class="tag gp-pk" style="font-size:34px">Peak productivity</span></div>',
      2000, '', 'soft', UI.ghost('Gap', -60, 1520));
    const q = this.v.q;
    this.k = q('.gp-k').style; this.L = UI.letters(q('.gp-l'), 531, 0.9, 0.45);
    this.tr = UI.draw(q('.gp-tr')); this.u1 = UI.draw(q('.gp-up1')); this.u2 = UI.draw(q('.gp-up2')); this.dn = UI.draw(q('.gp-dn'));
    this.t = q('.gp-t').style; this.c = q('.gp-c').style; this.u = q('.gp-u').style; this.pk = q('.gp-pk').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.3, 0.6)); UI.reveal(this.L, t);
    this.tr(eio(seg(t, 0.4, 1.2))); this.u1(eio(seg(t, 1.2, 1.9))); this.dn(eio(seg(t, 1.2, 2.2)));
    UI.slam(this.t, t, 2.5, 0.22, -3, 1.5);
    this.u2(eio(seg(t, 4.4, 5.1)));
    this.c.opacity = t >= 5.0 ? 1 : 0; this.c.transform = 'scale(' + lerp(0.3, 1, eob(seg(t, 5.0, 5.4), 1.7)) + ') rotate(8deg)';
    UI.slam(this.u, t, 4.5, 0.22, -2, 1.5);
    this.pk.opacity = eo(seg(t, 6.7, 6.95)); this.pk.transform = 'rotate(-2deg)';
    UI.punch(this.v.roll, t, [2.5, 4.5, 6.7], 0.035);
  },
});
