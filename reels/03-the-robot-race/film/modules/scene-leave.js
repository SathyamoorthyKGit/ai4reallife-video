const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 555, cy: 1025, z: 3.4, r: 0 }, { t: 0.7, cx: 540, cy: 1000, z: 1.0, r: 0, ease: kit.eox }, { t: 4.23, from: 0.75, cx: 555, cy: 1020, z: 1.25, r: 2 }];
const SC = { x: 329, y: 881, w: 453, h: 289 };
kit.scene('leave', {
  init(kit) {
    kit.css('.lv-scr{position:absolute;background:#161616;overflow:hidden}.lv-scr::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 2px, transparent 2px 5px)}' +
      '.lv-p{position:absolute;overflow:hidden;filter:drop-shadow(0 20px 30px rgba(0,0,0,.4))}');
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:340px;width:1080px;align-items:center;gap:8px"><p class="sub lv-k">AI is leaving</p><h1 class="line lv-l" style="font-size:150px">The screen</h1></div>' +
      UI.img(kit, 'laptop.webp', '', 'left:90px;top:820px;width:900px') +
      '<div class="lv-scr" style="left:' + SC.x + 'px;top:' + SC.y + 'px;width:' + SC.w + 'px;height:' + SC.h + 'px"></div>' +
      UI.img(kit, 'robot3.webp', 'lv-rb', 'left:370px;top:560px;width:380px;transform-origin:50% 100%'),
      2000,
      '<div class="lv-p"><div class="lv-pv" style="position:absolute;left:0;top:0;width:1120px;height:1980px"></div></div>' +
      '<div class="words" style="left:80px;top:1240px;gap:14px"><span class="tape lv-t1" style="font-size:80px">Off the screen</span><span class="tape pk lv-t2" style="font-size:80px">Into the factory</span></div>',
      'window', UI.ghost('Screen', -60, 1560));
    const q = this.v.q;
    this.k = q('.lv-k').style; this.hw = q('.lv-l').parentElement.style; this.L = UI.letters(q('.lv-l'), 71, 0.6, 0.45);
    this.rb = q('.lv-rb').style; this.p = q('.lv-p').style;
    const host = q('.lv-pv'); this.host = host.style; this.vid = UI.vid(kit, host, 'clip-arm.mp4', 33);
    this.t1 = q('.lv-t1').style; this.t2 = q('.lv-t2').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.006);
    const hide = 1 - eo(seg(t, 2.2, 2.5)); this.k.opacity = eo(seg(t, 0.45, 0.7)) * hide; UI.reveal(this.L, t); this.hw.opacity = hide;
    const rp = seg(t, 0.75, 1.6);
    this.rb.opacity = rp > 0 ? 1 : 0;
    this.rb.transform = 'translateY(' + lerp(330, 0, eob(rp, 1.3)) + 'px) scale(' + lerp(0.3, 1, eob(rp, 1.3)) + ') rotate(' + (lerp(-12, 0, eo(rp)) + Math.sin(t * 2.2) * 2) + 'deg)';
    // the screen opens into the real factory: a torn portal grows from the laptop screen to the whole frame
    kit.seek(this.vid, Math.max(0, t - 1.7));
    const a = UI.toScreen(KEYS, t, SC.x, SC.y, 0.006), z = a.z, pp = eio(seg(t, 2.1, 2.7));
    const x0 = a.x, y0 = a.y, w0 = SC.w * z, h0 = SC.h * z;
    const L = lerp(x0, -20, pp), T = lerp(y0, -30, pp), W = lerp(w0, 1120, pp), H = lerp(h0, 1980, pp);
    this.p.opacity = t >= 1.85 ? (t < 2.1 ? eo(seg(t, 1.85, 2.1)) : 1) : 0;
    this.p.left = L + 'px'; this.p.top = T + 'px'; this.p.width = W + 'px'; this.p.height = H + 'px';
    this.host.transform = 'translate(' + (-(1120 - W) / 2) + 'px,' + (-(1980 - H) / 2) + 'px)';
    this.rb.filter = pp > 0.3 ? 'blur(' + ((pp - 0.3) * 8).toFixed(1) + 'px)' : '';
    UI.slam(this.t1, t, 2.85, 0.22, -3, 1.25); UI.slam(this.t2, t, 3.2, 0.22, 2, 1.25);
    UI.punch(this.v.roll, t, [1.6], 0.03);
  },
});
