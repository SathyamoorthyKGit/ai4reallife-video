const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 900, z: 1.0 }, { t: 2.6, from: 2.2, cx: 554, cy: 900, z: 1.6 }, { t: 3.55, from: 2.85, cx: 540, cy: 2560, z: 1.0 }, { t: 7, from: 3.6, cx: 540, cy: 2620, z: 1.1 }];
kit.scene('lock', {
  init(kit) {
    kit.css('.lk-floor{position:absolute;left:-600px;top:2540px;width:2280px;height:900px;background:linear-gradient(color-mix(in srgb, var(--second) 75%, var(--ground)), color-mix(in srgb, var(--second) 92%, var(--ground)))}' +
      '.lk-fw .sub{color:color-mix(in srgb, var(--ground) 65%, var(--second))} .lk-fw .line{color:color-mix(in srgb, var(--ground) 25%, #fff)}');
    this.v = UI.build(kit,
      '<div class="stripe" style="left:270px;top:640px;width:170px;height:900px;transform:skewX(-28deg)"></div><div class="stripe" style="left:560px;top:700px;width:100px;height:820px;transform:skewX(-28deg)"></div>' +
      '<div class="words lk-hw" style="left:0;top:250px;width:1080px;align-items:center;gap:0"><p class="sub" style="margin-bottom:12px">The bank can&#39;t tell</p><h1 class="line m lk-a1">Your AI</h1><h1 class="line m lk-a2">from you</h1></div>' +
      UI.img(kit, 'laptop.webp', '', 'left:110px;top:700px;width:860px') +
      '<div class="lk-scr">' + UI.screen(336, 756) + '</div>' +
      '<div class="lk-pad" style="position:absolute;left:384px;top:640px;width:340px">' + UI.img(kit, 'padlock.webp', '', 'left:0;top:0;width:340px') + '</div>' +
      '<div class="ghost" style="left:-60px;top:1500px">Keys</div>' +
      '<div class="lk-floor"></div>' +
      UI.img(kit, 'noir.webp', 'lk-sh', 'left:560px;top:1850px;width:300px;filter:brightness(0);opacity:.5;transform-origin:50% 100%;transform:skewX(58deg) scaleY(-0.42)') +
      UI.img(kit, 'noir.webp', 'lk-noir', 'left:560px;top:1850px;width:300px') +
      '<div class="words lk-fw" style="left:200px;top:2600px;gap:0;transform:skewX(-22deg) rotate(-5deg);transform-origin:0 0"><p class="sub lk-fs" style="margin-bottom:10px;font-size:36px;color:color-mix(in srgb, var(--ground) 30%, #fff)">So don&#39;t hand it</p><h1 class="line lk-fl" style="font-size:120px">The keys</h1></div>' +
      '<div class="lk-key" style="position:absolute;left:560px;top:2800px;width:200px">' + UI.img(kit, 'key.webp', '', 'left:0;top:0;width:200px') + '</div>', 3300);
    const q = this.v.q;
    this.pw = q('.lg-pw'); this.caret = q('.lg-caret').style; this.scr = q('.lk-scr').style; this.pad = q('.lk-pad').style;
    this.fs = q('.lk-fs').style; this.hw = q('.lk-hw').style; this.key = q('.lk-key').style;
    this.A = UI.letters(q('.lk-a1'), 13, -0.6, 0.4).concat(UI.letters(q('.lk-a2'), 14, -0.5, 0.4));
    this.F = UI.letters(q('.lk-fl'), 15, 3.75, 0.45);
    this.typ = kit.typist('xxxxxxx', 0.25, 7, 8);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.006);
    UI.roll(this.v.roll, t, 7, -28, 0);
    UI.reveal(this.A, t);
    this.hw.opacity = 1 - eo(seg(t, 2.2, 2.45));
    this.pw.textContent = t < 2.2 ? '•'.repeat(Math.min(this.typ.count(t), 6)) : '';
    this.caret.opacity = t >= 1.3 ? 0 : (Math.floor(t / 0.53) % 2 ? 0.15 : 1);
    this.scr.opacity = 1 - 0.8 * eo(seg(t, 1.9, 2.2));
    const lp = seg(t, 1.85, 2.2);
    this.pad.opacity = lp > 0 ? 1 : 0;
    this.pad.transform = 'translateY(' + lerp(-1000, 0, eob(lp, 1.5)) + 'px) rotate(' + lerp(-16, 3, eo(lp)) + 'deg)';
    this.fs.opacity = eo(seg(t, 3.5, 3.8));
    UI.reveal(this.F, t);
    const kp = seg(t, 4.3, 4.7), kt = Math.max(0, t - 4.7);
    this.key.opacity = kp > 0 ? 1 : 0;
    this.key.transform = 'translateY(' + lerp(-500, 0, eob(kp, 1.4)) + 'px) rotate(' + (70 + Math.exp(-kt * 2) * Math.sin(kt * 7) * 10) + 'deg)';
  },
});