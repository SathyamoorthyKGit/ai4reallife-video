const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 2700, z: 1.05, r: 3 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 5.7, from: 0.4, cx: 540, cy: 975, z: 1.02, r: -1 }];
const C = [{ x: 60, n: 'cyborg.webp', w: 240, l: 'Cyborg?', a: 0.57 }, { x: 400, n: 'centaur.webp', w: 270, l: 'Centaur?', a: 1.58 }, { x: 720, n: 'strings.webp', w: 240, l: 'Meat interface?', a: 2.58 }];
kit.scene('cta', {
  init(kit) {
    const cards = C.map((c, i) => '<div class="ct-c" style="position:absolute;left:' + c.x + 'px;top:560px;width:280px">' + UI.img(kit, c.n, '', 'left:' + (140 - c.w / 2) + 'px;top:0;width:' + c.w + 'px') +
      '<div class="words" style="left:0;top:330px;width:280px;align-items:center"><span class="node" style="font-size:' + (i === 2 ? 26 : 36) + 'px;' + (i === 2 ? 'background:var(--main)' : '') + '">' + c.l + '</span></div></div>').join('');
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:330px;width:1080px;align-items:center"><p class="sub ct-k" style="font-size:52px">Are you a</p></div>' + cards +
      '<div class="words" style="left:0;top:1060px;width:1080px;align-items:center;gap:4px"><h1 class="line ct-l" style="font-size:86px">Drop it in</h1><h1 class="line ct-l2" style="font-size:86px">the comments</h1></div>' +
      '<div class="ct-pt" style="position:absolute;left:560px;top:1310px;width:340px;transform-origin:0 50%">' + UI.img(kit, 'point.webp', '', 'left:0;top:0;width:340px') + '</div>',
      2000, '', 'window', UI.ghost('You?', -60, 1580));
    const q = this.v.q;
    this.k = q('.ct-k').style; this.c = [...kit.stage.querySelectorAll('.ct-c')].map(e => e.style);
    this.L = UI.letters(q('.ct-l'), 561, 3.85, 0.3).concat(UI.letters(q('.ct-l2'), 562, 4.1, 0.35)); this.pt = q('.ct-pt').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.2, 0.45));
    C.forEach((c, i) => { const p = seg(t, c.a - 0.1, c.a + 0.3); this.c[i].opacity = p > 0 ? 1 : 0; this.c[i].transform = 'translateY(' + lerp(200, 0, eob(p, 1.4)) + 'px) rotate(' + ([-4, 2, 5][i] + Math.sin(t * 1.5 + i) * 1.5) + 'deg)'; });
    UI.reveal(this.L, t);
    const pp = seg(t, 4.3, 4.7), tap = Math.max(0, Math.sin((t - 4.7) * 7)) * 16 * seg(t, 4.7, 5.0);
    this.pt.opacity = pp > 0 ? 1 : 0; this.pt.transform = 'rotate(90deg) translateX(' + (lerp(-240, 0, eob(pp, 1.3)) + tap) + 'px)';
    UI.punch(this.v.roll, t, C.map(c => c.a).concat([3.85]), 0.03);
  },
});
