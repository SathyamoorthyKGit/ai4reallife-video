const { seg, eo, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 960, z: 1.7, r: -4 }, { t: 0.55, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }];
kit.scene('brand', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="brand" style="left:-1200px;top:-1200px;width:3480px;height:4320px;right:auto;bottom:auto"></div>' +
      '<div class="br-logo" style="position:absolute;left:130px;top:690px;width:820px;transform-origin:50% 50%"><img src="' + kit.assets.url('logo.webp') + '" style="display:block;width:820px;filter:drop-shadow(16px 22px 18px rgba(0,0,0,.28))"></div>', 1920,
      '<img class="paper" src="' + kit.assets.url('paper2.webp') + '" style="opacity:.5">', 'soft');
    this.logo = this.v.q('.br-logo').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.01);
    const p = seg(t, 0.15, 0.6);
    this.logo.opacity = p > 0 ? 1 : 0;
    this.logo.transform = 'scale(' + lerp(0.35, 1, eob(p, 1.7)) + ') rotate(' + (lerp(-8, 0, eo(p)) + Math.sin(t * 2) * 0.6) + 'deg)';
    UI.punch(this.v.roll, t, [0.55], 0.04);
  },
});
