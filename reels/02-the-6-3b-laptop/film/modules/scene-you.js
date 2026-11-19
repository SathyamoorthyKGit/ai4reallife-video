const { seg, eo, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 250, z: 1.08, r: -3 }, { t: 0.4, cx: 540, cy: 940, z: 1.0, r: 0, ease: kit.eox }, { t: 6.3, from: 0.5, cx: 540, cy: 960, z: 1.02 }];
kit.scene('you', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:280px;width:1080px;align-items:center;gap:0"><p class="sub yo-k" style="margin-bottom:10px">For your own accounts</p><h1 class="line yo-l1" style="font-size:120px">Your weak</h1><h1 class="line yo-l2" style="font-size:120px;color:var(--main)">point</h1></div>' +
      '<div class="yo-desk" style="position:absolute;left:140px;top:1010px;width:800px">' + UI.img(kit, 'desk.webp', '', 'left:0;top:0;width:800px') + '</div>' +
      '<svg class="art" viewBox="0 0 1080 2000" style="height:2000px"><path class="stroke yo-a1" d="M400 900 C 470 1010 560 1060 612 1180" style="stroke-width:6"/><path class="stroke yo-h1" d="M588 1160 L614 1188 L626 1150" style="stroke-width:6"/>' +
      '<path class="stroke yo-a2" d="M880 990 C 900 1060 820 1110 780 1180" style="stroke-width:6"/><path class="stroke yo-h2" d="M770 1146 L778 1184 L812 1168" style="stroke-width:6"/></svg>' +
      '<div class="words" style="left:90px;top:830px"><span class="tag yo-t1" style="font-size:36px">The device you log in from</span></div>' +
      '<div class="words" style="left:90px;top:920px"><span class="tag yo-t2" style="font-size:36px">The email that resets everything</span></div>', 2000, '', 'soft', '<div class="ghost" style="left:-60px;top:1520px">Device</div>');
    const q = this.v.q;
    this.k = q('.yo-k').style; this.desk = q('.yo-desk').style; this.t1 = q('.yo-t1').style; this.t2 = q('.yo-t2').style; this.h1 = q('.yo-h1').style; this.h2 = q('.yo-h2').style;
    this.L = UI.letters(q('.yo-l1'), 13, 1.25, 0.4).concat(UI.letters(q('.yo-l2'), 14, 1.6, 0.3));
    this.a1 = UI.draw(q('.yo-a1')); this.a2 = UI.draw(q('.yo-a2'));
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.05, 0.35));
    UI.reveal(this.L, t);
    this.desk.transform = 'translateY(' + lerp(80, 0, eo(seg(t, 0, 0.6))) + 'px)';
    UI.slam(this.t1, t, 2.0, 0.22, -2, 1.5); UI.slam(this.t2, t, 3.95, 0.22, 2, 1.5);
    this.a1(eo(seg(t, 2.2, 2.6))); this.h1.opacity = t >= 2.58 ? 1 : 0;
    this.a2(eo(seg(t, 4.15, 4.55))); this.h2.opacity = t >= 4.53 ? 1 : 0;
    UI.punch(this.v.roll, t, [2.0, 3.95], 0.04);
  },
});
