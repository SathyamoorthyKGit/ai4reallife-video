const { seg, eo, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 300, cy: 1060, z: 1.45 }, { t: 1.5, from: 0.95, cx: 780, cy: 1060, z: 1.45 }, { t: 2.85, from: 2.1, cx: 540, cy: 1110, z: 0.92 }];
kit.scene('twins', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="stripe tw-s1" style="left:230px;top:600px;width:200px;height:1200px;transform:skewX(-26deg)"></div><div class="stripe tw-s2" style="left:610px;top:660px;width:120px;height:1100px;transform:skewX(-26deg)"></div>' +
      '<div class="words" style="left:0;top:440px;width:1080px;align-items:center;gap:0"><p class="sub tw-sub" style="margin-bottom:12px">Same password =</p><h1 class="line m tw-line" style="font-size:118px">Same person</h1></div>' +
      '<div class="tw-a" style="position:absolute;left:110px;top:600px;width:380px">' + UI.img(kit, 'man.webp', '', 'left:0;top:0;width:380px') +
      '<div class="words" style="left:60px;top:400px"><span class="tag tw-t1">You</span></div></div>' +
      '<div class="tw-b" style="position:absolute;left:590px;top:600px;width:380px">' + UI.img(kit, 'man2.webp', '', 'left:0;top:0;width:380px') +
      '<div class="words" style="left:40px;top:400px"><span class="tag tw-t2">AI agent</span></div></div>' +
      '<div class="words" style="left:110px;top:1700px"><span class="tag tw-c1 b7" style="font-size:32px">alex.m · ••••••</span></div>' +
      '<div class="words" style="left:590px;top:1700px"><span class="tag tw-c2 b7" style="font-size:32px">alex.m · ••••••</span></div>', 2300);
    const q = this.v.q;
    this.a = q('.tw-a').style; this.b = q('.tw-b').style; this.t1 = q('.tw-t1').style; this.t2 = q('.tw-t2').style;
    this.c1 = q('.tw-c1').style; this.c2 = q('.tw-c2').style; this.sub = q('.tw-sub').style;
    this.s1 = q('.tw-s1').style; this.s2 = q('.tw-s2').style;
    this.L = UI.letters(q('.tw-line'), 8, 2.85, 0.45);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.01);
    UI.roll(this.v.roll, t, 6, -26, 0);
    const sp = eo(seg(t, 0.1, 0.8));
    this.s1.transform = 'translateY(' + (1 - sp) * -1300 + 'px) skewX(-26deg)'; this.s2.transform = 'translateY(' + (1 - sp) * 1300 + 'px) skewX(-26deg)';
    UI.slam(this.t1, t, 0.45, 0.22, -4, 1.6); UI.slam(this.t2, t, 1.45, 0.22, 4, 1.6);
    UI.slam(this.c1, t, 0.75, 0.2, -2, 1.4); UI.slam(this.c2, t, 1.7, 0.2, 2, 1.4);
    this.sub.opacity = eo(seg(t, 2.55, 2.85));
    UI.reveal(this.L, t);
    const m = eio(seg(t, 4.1, 4.8));
    this.a.transform = 'translateX(' + 240 * m + 'px)';
    this.b.transform = 'translateX(' + -240 * m + 'px)';
    this.b.opacity = 1 - 0.3 * m;
    this.c1.transform += ' translateX(' + 230 * m + 'px)'; this.c2.transform += ' translateX(' + -250 * m + 'px)';
  },
});