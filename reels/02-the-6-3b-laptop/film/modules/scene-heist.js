const { seg, eo, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 60, z: 1.08, r: -4 }, { t: 0.4, cx: 540, cy: 780, z: 1.0, r: 0, ease: kit.eox }, { t: 2.5, from: 2.05, cx: 540, cy: 1600, z: 1.0, r: -2 }, { t: 5.3, from: 4.85, cx: 540, cy: 2560, z: 1.0, r: 1 }];
kit.scene('heist', {
  init(kit) {
    kit.css('.hs-hl{font-family:"Regarn-900", var(--sans, system-ui, sans-serif);font-size:54px;line-height:1.02;text-transform:uppercase}' +
      '.hs-bar{position:absolute;transform-origin:50% 100%}');
    this.v = UI.build(kit,
      '<div class="words hs-ga" style="left:0;top:370px;width:1080px;align-items:center;gap:4px"><p class="sub hs-k1">About</p><h1 class="line hs-num" style="font-size:220px">$6.3B</h1><p class="sub hs-k2">affected</p></div>' +
      '<div class="clip hs-clip" style="left:140px;top:860px;width:760px"><span class="lbl">CNBC · Oct 29, 2026</span><span class="hs-hl">$6.3 billion Binance hack is largest crypto theft on record</span></div>' +
      '<div class="hs-gb words" style="left:130px;top:1180px"><span class="tape hs-tape" style="font-size:66px">4× the old record</span></div>' +
      '<div class="hs-gb hs-bar hs-b1" style="left:230px;top:1810px;width:200px;height:150px;background:color-mix(in srgb, var(--second) 45%, var(--ground))"></div>' +
      '<div class="hs-gb hs-bar hs-b2" style="left:540px;top:1360px;width:260px;height:600px;background:var(--main)"></div>' +
      '<div class="hs-gb" style="position:absolute;left:180px;top:1960px;width:700px;height:6px;background:var(--second)"></div>' +
      '<div class="hs-gb words" style="left:230px;top:1745px;width:200px;align-items:center"><span class="blk hs-v1" style="font-size:48px">$1.5B</span></div>' +
      '<div class="hs-gb words" style="left:540px;top:1296px;width:260px;align-items:center"><span class="blk hs-v2" style="font-size:52px;color:var(--main)">$6.3B</span></div>' +
      '<div class="hs-gb words" style="left:230px;top:1980px;width:200px;align-items:center"><span class="lbl">Old record</span></div>' +
      '<div class="hs-gb words" style="left:540px;top:1980px;width:260px;align-items:center"><span class="lbl" style="color:var(--main)">This hack</span></div>' +
      '<div class="words" style="left:0;top:2160px;width:1080px;align-items:center;gap:4px"><p class="sub hs-k3" style="font-size:40px">Most of it moved in about</p><h1 class="line hs-min" style="font-size:180px">20 min</h1></div>' +
      UI.img(kit, 'coins.webp', 'hs-coins', 'left:220px;top:2440px;width:640px'), 3000, '', 'soft', '<div class="ghost" style="left:-60px;top:1000px">Record</div>');
    const q = this.v.q;
    this.ga = q('.hs-ga').style; this.gb = [...kit.stage.querySelectorAll('.hs-gb')].map(e => e.style); this.num = q('.hs-num'); this.k1 = q('.hs-k1').style; this.k2 = q('.hs-k2').style; this.clip = q('.hs-clip').style; this.tape = q('.hs-tape').style;
    this.b1 = q('.hs-b1').style; this.b2 = q('.hs-b2').style; this.v1 = q('.hs-v1').style; this.v2 = q('.hs-v2').style;
    this.k3 = q('.hs-k3').style; this.min = q('.hs-min'); this.coins = q('.hs-coins').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.008);
    this.k1.opacity = eo(seg(t, -0.1, 0.2));
    const c = eo(seg(t, 0.1, 1.5));
    this.num.textContent = '$' + lerp(3.2, 6.3, c).toFixed(1) + 'B';
    this.num.style.transform = 'scale(' + lerp(1.12, 1, eob(seg(t, 1.4, 1.7), 1.6)) + ')';
    this.k2.opacity = eo(seg(t, 1.5, 1.8));
    UI.slam(this.clip, t, 0.6, 0.25, -3, 1.35);
    const fa = 1 - eo(seg(t, 2.0, 2.35)); this.ga.opacity = fa; if (t >= 2.0) this.clip.opacity = fa;
    const fb = 1 - eo(seg(t, 4.8, 5.15)); this.gb.forEach(s => s.opacity = fb);
    UI.slam(this.tape, t, 2.55, 0.22, -2, 1.6);
    const g1 = eo(seg(t, 2.6, 3.0)), g2 = eob(seg(t, 2.9, 3.6), 1.2);
    this.b1.transform = 'scaleY(' + g1 + ')'; this.b2.transform = 'scaleY(' + g2 + ')';
    this.v1.opacity = eo(seg(t, 3.0, 3.2)); this.v2.opacity = eo(seg(t, 3.55, 3.75));
    this.k3.opacity = eo(seg(t, 5.0, 5.3));
    const m = eo(seg(t, 5.3, 6.4));
    this.min.textContent = Math.round(lerp(1, 20, m)) + ' min';
    this.min.style.opacity = t >= 5.25 ? 1 : 0;
    this.coins.transform = 'translateY(' + lerp(160, 0, eob(seg(t, 5.1, 5.7), 1.3)) + 'px)';
    this.coins.opacity = t >= 5.1 ? 1 : 0;
    UI.punch(this.v.roll, t, [1.45, 2.55, 6.35], 0.045);
    UI.glitch(kit, t, 7.7, 44);
  },
});
