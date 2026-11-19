const { seg, eo, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 900, z: 1.0 }, { t: 1.5, from: 0.7, cx: 451, cy: 1057, z: 1.6 }, { t: 5.7, from: 4.75, cx: 540, cy: 1020, z: 1.08 }];
kit.scene('paste', {
  init(kit) {
    kit.css('.paste-scr{position:absolute;width:290px;height:700px;transform:rotate(-15deg);transform-origin:50% 50%;color:color-mix(in srgb, var(--ground) 10%, #fff);font-size:24px;line-height:1.3}' +
      '.paste-me{position:absolute;right:16px;top:100px;width:222px;background:var(--accent);border-radius:18px 18px 4px 18px;padding:14px 16px}' +
      '.paste-ai{position:absolute;left:16px;top:300px;width:222px;min-height:32px;background:color-mix(in srgb, var(--ground) 30%, #fff);color:var(--second);border-radius:20px 20px 20px 4px;padding:14px 16px}' +
      '.paste-in{position:absolute;left:16px;right:16px;bottom:120px;height:54px;border:2px solid color-mix(in srgb, var(--ground) 40%, transparent);border-radius:14px;display:flex;align-items:center;padding:0 12px;font-size:17px;white-space:nowrap;overflow:hidden}' +
      '.paste-sel{background:color-mix(in srgb, var(--accent) 60%, transparent)}');
    this.v = UI.build(kit,
      '<div class="ghost" style="left:-90px;top:1700px">Paste</div>' +
      '<div class="words paste-hw" style="left:0;top:270px;width:1080px;align-items:center;gap:0"><p class="sub paste-sub" style="margin-bottom:14px">Most people set it up</p><h1 class="line m paste-l1">The easy</h1><h1 class="line m paste-l2">way</h1></div>' +
      '<div class="paste-ph" style="position:absolute;left:140px;top:640px;width:900px;height:1060px">' + UI.img(kit, 'phonehand.webp', '', 'left:0;top:0;width:900px') +
      '<div class="paste-scr" style="left:166px;top:67px"><div class="b7" style="position:absolute;left:18px;top:34px;display:flex;gap:12px;align-items:center"><span style="width:14px;height:14px;border-radius:50%;background:var(--accent)"></span><span>AI Assistant</span></div>' +
      '<div class="paste-me"><div>Username: alex.m</div><div>Password: sunflower22</div></div>' +
      '<svg class="art" viewBox="0 0 290 700"><path class="redline paste-ring" d="M150 140 C 240 136 288 150 282 170 C 276 194 160 198 82 190 C 40 186 46 150 98 144 C 122 141 146 141 170 144" style="stroke-width:6"/></svg>' +
      '<div class="paste-ai"><span class="paste-dots" style="letter-spacing:.2em">•••</span><span class="paste-txt"></span></div>' +
      '<div class="paste-in"><span class="paste-sel">alex.m  sunflower22</span></div></div></div>' +
      '<div class="words paste-tw" style="left:150px;top:1330px;gap:16px"><span class="tape paste-t1" style="font-size:80px">Copy</span><span class="tape paste-t2" style="font-size:80px">Paste</span></div>', 2400);
    const q = this.v.q;
    this.sub = q('.paste-sub').style; this.hw = q('.paste-hw').style; this.tw = q('.paste-tw').style; this.ph = q('.paste-ph').style;
    this.L = UI.letters(q('.paste-l1'), 3, -0.5, 0.45).concat(UI.letters(q('.paste-l2'), 5, -0.3, 0.3));
    this.me = q('.paste-me').style; this.dots = q('.paste-dots').style; this.txt = q('.paste-txt'); this.ai = q('.paste-ai').style; this.inp = q('.paste-sel').style;
    this.t1 = q('.paste-t1').style; this.t2 = q('.paste-t2').style;
    this.ring = UI.draw(q('.paste-ring'));
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.01);
    UI.roll(this.v.roll, t, 6, -22, 26);
    UI.reveal(this.L, t);
    this.hw.opacity = this.tw.opacity = 1 - eo(seg(t, 0.8, 1.2)) + eo(seg(t, 4.9, 5.4));
    this.ph.transform = 'translateY(' + lerp(120, 0, eo(seg(t, 0, 0.6))) + 'px) rotate(' + Math.sin(t * 1.1) * 0.8 + 'deg)';
    UI.slam(this.t1, t, 0.75, 0.22, -4, 1.6); UI.slam(this.t2, t, 1.05, 0.22, 3, 1.6);
    this.inp.opacity = t >= 1.6 && t < 2.3 ? 1 : 0;
    const mp = seg(t, 2.3, 2.6); this.me.opacity = mp > 0 ? eo(mp) : 0; this.me.transform = 'translateY(' + lerp(30, 0, eo(mp)) + 'px)';
    this.ai.opacity = t >= 2.7 ? 1 : 0;
    this.dots.display = t < 3.15 ? 'inline' : 'none';
    this.dots.opacity = 0.4 + 0.6 * Math.abs(Math.sin(t * 4));
    this.txt.textContent = t < 3.15 ? '' : kit.streamed('Got it. I’ll log in and handle the rest.', t, 3.15, 32, 4);
    this.ring(eo(seg(t, 4.3, 4.75)));
  },
});