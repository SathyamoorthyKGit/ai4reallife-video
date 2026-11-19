const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: -600, cy: 960, z: 1.05, r: -5 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 3.85, from: 0.4, cx: 540, cy: 990, z: 1.05, r: 1 }, { t: 4.15, from: 3.85, cx: 540, cy: 2700, z: 1.05, r: -3, ease: kit.ei }];
kit.scene('anth', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:630px;width:1080px;align-items:center;gap:10px"><span class="tag an-g" style="align-self:center">S-1 filed · Oct 26, 2026</span></div>' +
      '<div class="an-v" style="position:absolute;left:110px;top:760px;width:560px;height:860px"></div>' +
      '<svg class="art" viewBox="0 0 1080 2000" style="height:2000px"><path class="pk-line an-ln" d="M150 1000 L260 940 L330 1060 L420 990 L500 1180 L580 1120 L660 1380 L760 1330 L900 1620" style="stroke-width:14"/></svg>' +
      '<div class="words" style="left:430px;top:880px"><span class="tape an-t" style="font-size:64px">AI financing</span></div>' +
      '<div class="stamp solid an-s" style="left:150px;top:1450px;font-size:110px;transform-origin:50% 50%">Shaky</div>',
      2000, UI.slot('Anthropic', 240, 330, 600, 260, 'an-slot'), 'spot', UI.ghost('IPO', -40, 1500) + '<div class="stripe" style="left:820px;top:700px;width:70px;height:1000px;opacity:.7;transform:skewX(-20deg)"></div>');
    const q = this.v.q;
    this.slot = q('.an-slot').style; this.g = q('.an-g').style;
    this.vid = UI.vid(kit, q('.an-v'), 'clip-trade.mp4', 51); this.vs = q('.an-v').style;
    this.ln = UI.draw(q('.an-ln')); this.t = q('.an-t').style; this.s = q('.an-s').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.005);
    UI.slotAnim(this.slot, t, 0.2, 3.95);
    this.g.opacity = eo(seg(t, 0.8, 1.1)); this.g.transform = 'rotate(-2deg) translateY(' + lerp(20, 0, eo(seg(t, 0.8, 1.1))) + 'px)';
    kit.seek(this.vid, Math.max(0, t - 1.3));
    const vp = seg(t, 1.35, 1.85); this.vs.opacity = vp > 0 ? 1 : 0; this.vs.transform = 'translateY(' + lerp(500, 0, eob(vp, 1.1)) + 'px) rotate(' + lerp(6, -2, eo(vp)) + 'deg)';
    UI.slam(this.t, t, 1.75, 0.22, 4, 1.6);
    this.ln(eio(seg(t, 2.0, 3.2)));
    UI.slam(this.s, t, 3.2, 0.24, -8, 1.9);
    UI.punch(this.v.roll, t, [1.75, 3.2], 0.04);
  },
});
