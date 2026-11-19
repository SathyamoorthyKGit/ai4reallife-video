const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 960, z: 1.03, r: -1.5 }, { t: 2.8, from: 0.2, cx: 540, cy: 960, z: 1.0, r: 0 }, { t: 4.1, cx: 540, cy: 960, z: 1.0 }, { t: 4.4, from: 4.1, cx: 540, cy: 1250, z: 2.3, ease: kit.ei }];
kit.scene('close', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words cl-a" style="left:0;top:290px;width:1080px;align-items:center;gap:0"><p class="sub" style="margin-bottom:10px">The exchange’s vault</p><h1 class="line cl-a1" style="font-size:100px">Isn’t yours</h1><p class="sub" style="margin-top:12px">to secure</p></div>' +
      '<div class="words cl-b" style="left:0;top:300px;width:1080px;align-items:center;gap:0"><h1 class="line cl-b1" style="font-size:110px">The laptop</h1><h1 class="line cl-b2" style="font-size:150px;color:var(--main)">is.</h1></div>' +
      '<div class="cl-open">' + UI.img(kit, 'laptop.webp', '', 'left:90px;top:820px;width:900px') + '</div>' +
      '<div class="cl-closed" style="position:absolute;left:90px;top:1130px;width:900px">' + UI.img(kit, 'closelap.webp', '', 'left:0;top:0;width:900px') + '</div>', 2000, '', 'window', '<div class="ghost" style="left:-60px;top:1560px">Laptop</div>' + '<div class="stripe" style="left:300px;top:700px;width:150px;height:880px;transform:skewX(-28deg)"></div><div class="stripe" style="left:560px;top:760px;width:90px;height:800px;transform:skewX(-28deg)"></div>');
    const q = this.v.q;
    this.a = q('.cl-a').style; this.open = q('.cl-open').style; this.closed = q('.cl-closed').style;
    this.A = UI.letters(q('.cl-a1'), 15, 0.15, 0.45);
    this.B = UI.letters(q('.cl-b1'), 16, 2.95, 0.3).concat(UI.letters(q('.cl-b2'), 17, 3.25, 0.12));
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.005);
    UI.reveal(this.A, t); UI.reveal(this.B, t);
    const out = ei(seg(t, 2.6, 2.85));
    this.a.opacity = (1 - out); this.a.transform = 'translateX(' + (-60 * out) + 'px)';
    const shut = t >= 2.9;
    this.open.opacity = shut ? 0 : 1; this.closed.opacity = shut ? 1 : 0;
    this.closed.transform = 'translateY(' + lerp(-20, 0, eob(seg(t, 2.9, 3.2), 1.5)) + 'px)';
    const jolt = shut ? Math.exp(-(t - 2.9) * 9) : 0;
    this.v.roll.transform = 'scale(' + (1 + 0.035 * jolt) + ')';
    UI.glitch(kit, t, 0, 55);
  },
});
