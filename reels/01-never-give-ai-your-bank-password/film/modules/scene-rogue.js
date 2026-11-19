const { seg, eo, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 1430, z: 1.35 }, { t: 2.8, from: 2.15, cx: 540, cy: 1000, z: 0.95 }];
kit.scene('rogue', {
  init(kit) {
    kit.css('.rg-w .sub{color:color-mix(in srgb, var(--ground) 70%, var(--second))} .rg-w .line{color:color-mix(in srgb, var(--ground) 25%, #fff)}');
    this.v = UI.build(kit,
      UI.img(kit, 'beam.webp', 'rg-beam', 'left:-110px;top:120px;width:1300px') +
      '<div class="words rg-w" style="left:0;top:360px;width:1080px;align-items:center;gap:0"><span class="tag rg-sub" style="align-self:center;margin-bottom:16px">The bank</span><h1 class="tape rg-line" style="align-self:center;font-size:120px">Can&#39;t tell</h1></div>' +
      '<div class="rg-a" style="position:absolute;left:250px;top:1050px;width:280px">' + UI.img(kit, 'noir.webp', '', 'left:0;top:0;width:280px') + '</div>' +
      '<div class="rg-b" style="position:absolute;left:550px;top:1050px;width:280px">' + UI.img(kit, 'noir.webp', 'rg-bi', 'left:0;top:0;width:280px') + '</div>' +
      '<div class="words" style="left:200px;top:940px;width:380px;align-items:center"><span class="tag rg-t1">Approved</span></div>' +
      '<div class="words" style="left:500px;top:940px;width:380px;align-items:center"><span class="tag rg-t2">Rogue</span></div>', 2200);
    const q = this.v.q;
    this.beam = q('.rg-beam').style; this.a = q('.rg-a').style; this.b = q('.rg-b').style; this.bi = q('.rg-bi').style;
    this.t1 = q('.rg-t1'); this.t2 = q('.rg-t2'); this.sub = q('.rg-sub').style;
    this.L = UI.letters(q('.rg-line'), 11, 2.55, 0.4);
    this.n = kit.vnoise(5);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.012);
    const on = eo(seg(t, 0.05, 0.6));
    this.beam.filter = 'brightness(' + lerp(0.3, 1, on) + ') drop-shadow(20px 28px 16px rgba(0,0,0,.36))';
    const rogue = t >= 1.55 && t < 2.6;
    this.bi.filter = rogue ? 'drop-shadow(10px 0 0 var(--main)) drop-shadow(-8px 0 0 var(--accent))' : 'drop-shadow(20px 28px 16px rgba(0,0,0,.36))';
    const jit = rogue ? this.n(t * 9) * 9 : 0;
    const unknown = t >= 2.6;
    this.t1.textContent = unknown ? '?' : 'Approved'; this.t2.textContent = unknown ? '?' : 'Rogue';
    this.t2.style.color = rogue ? 'var(--main)' : '';
    const pop = (el, a, rot) => { const p = seg(t, a, a + 0.25), f = seg(t, 2.6, 2.8); el.style.opacity = p > 0 ? 1 : 0; el.style.transform = 'rotate(' + rot + 'deg) scale(' + lerp(1.4, 1, eob(p, 1.7)) * (unknown ? lerp(1.3, 1, eob(f, 1.6)) : 1) + ')'; };
    pop(this.t1, 1.1, -3); pop(this.t2, 1.5, 3);
    this.sub.opacity = eo(seg(t, 2.4, 2.7));
    UI.reveal(this.L, t);
    const s1 = eio(seg(t, 3.1, 3.55)), s2 = eio(seg(t, 3.7, 4.15));
    const pos = s2 > 0 ? 1 - s2 : s1, arc = Math.sin(pos * Math.PI) * 50;
    this.a.transform = 'translate(' + pos * 300 + 'px,' + (-arc) + 'px)';
    this.b.transform = 'translate(' + (-pos * 300 + jit) + 'px,' + arc + 'px)';
    UI.glitch(kit, t, 0, 20);
    UI.glitch(kit, t, 5, 21);
  },
});