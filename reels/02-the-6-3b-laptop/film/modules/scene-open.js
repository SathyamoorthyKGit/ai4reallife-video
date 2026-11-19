const { seg, eo, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 980, z: 1.05, r: -1.5 }, { t: 1.0, cx: 540, cy: 980, z: 1.0, r: 0 }, { t: 2.0, from: 1.45, cx: 555, cy: 1025, z: 1.75, r: 1.5 }, { t: 3.9, from: 3.3, cx: 540, cy: 980, z: 1.0, r: 0 }, { t: 5.3, from: 4.95, cx: 540, cy: 1900, z: 1.15, r: 4, ease: kit.ei }];
kit.scene('open', {
  init(kit) {
    kit.css('.op-card{position:absolute;left:329px;top:881px;width:453px;height:289px;background:color-mix(in srgb, var(--ground) 8%, #fff);padding:22px 26px;box-sizing:border-box;display:flex;flex-direction:column;gap:10px;border-radius:4px}' +
      '.op-hl{font-family:"Regarn-900", var(--sans, system-ui, sans-serif);font-size:34px;line-height:1.02;text-transform:uppercase}');
    this.v = UI.build(kit,
      '<div class="words op-hw" style="left:0;top:300px;width:1080px;align-items:center;gap:6px"><p class="sub op-sub" style="font-size:36px">The biggest crypto heist ever</p><h1 class="line op-line" style="font-size:110px">One laptop</h1></div>' +
      '<svg class="art" viewBox="0 0 1080 2000" style="height:2000px"><path class="redline op-ul" d="M120 470 C 360 456 700 468 960 452" style="stroke-width:12"/></svg>' +
      '<div class="op-open">' + UI.img(kit, 'laptop.webp', '', 'left:90px;top:820px;width:900px') +
      '<div class="op-card"><span class="lbl">CNBC · Oct 29, 2026</span><span class="op-hl">$6.3 billion Binance hack is largest crypto theft on record</span></div></div>' +
      '<div class="op-closed" style="position:absolute;left:90px;top:1060px;width:900px;transform-origin:20% 80%">' + UI.img(kit, 'closelap.webp', '', 'left:0;top:0;width:900px') + '</div>', 2000, '', 'window', '<div class="ghost" style="left:-60px;top:1560px">Laptop</div>' + '<div class="stripe" style="left:300px;top:700px;width:150px;height:880px;transform:skewX(-28deg)"></div><div class="stripe" style="left:560px;top:760px;width:90px;height:800px;transform:skewX(-28deg)"></div>');
    const q = this.v.q;
    this.hw = q('.op-hw').style; this.open = q('.op-open').style; this.closed = q('.op-closed').style; this.card = q('.op-card').style;
    this.L = UI.letters(q('.op-line'), 3, -0.6, 0.45);
    this.ul = UI.draw(q('.op-ul'));
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.01);
    UI.reveal(this.L, t);
    this.hw.opacity = 1 - eo(seg(t, 1.4, 1.7)) + eo(seg(t, 3.4, 3.8));
    const shut = t < 1.1;
    this.closed.opacity = shut ? 1 : 0; this.open.opacity = shut ? 0 : 1;
    this.closed.transform = 'translateY(' + lerp(30, 0, eo(seg(t, -0.2, 0.4))) + 'px) rotate(' + (-1.5 * eo(seg(t, 0.5, 1.05))) + 'deg)';
    this.card.opacity = eo(seg(t, 1.2, 1.45));
    this.ul(eo(seg(t, 4.0, 4.4)));
    UI.glitch(kit, t, 1.1, 41);
    UI.punch(this.v.roll, t, [1.1, 4.0], 0.05);
  },
});
