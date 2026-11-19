const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 960, z: 1.7, r: -3 }, { t: 0.4, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 4.75, from: 0.45, cx: 540, cy: 975, z: 1.03, r: 1 }, { t: 5.1, from: 4.75, cx: 540, cy: 1960, z: 1.0, r: -1 }, { t: 7.73, from: 5.15, cx: 540, cy: 1965, z: 1.03, r: 0 }];
// start small, move up: knife on the bottom rung, drill in the middle, crane at the top
const RECAP = [{ n: 'knife', x: 60, y: 1620, w: 220, l: 'Haiku', c: '' }, { n: 'car', x: 330, y: 1680, w: 330, l: 'Sonnet / Opus', c: 'background:var(--accent)' }, { n: 'crane', x: 720, y: 1580, w: 290, l: 'Fable', c: 'background:var(--main)' }];
const RUNG = [{ n: 'knife', x: 330, y: 1000, w: 170, a: 1.29 }, { n: 'drill', x: 420, y: 790, w: 200, a: 2.7 }, { n: 'crane', x: 520, y: 520, w: 260, a: 3.6 }];
kit.scene('cta', {
  init(kit) {
    const rung = RUNG.map(r => UI.anim(kit, r.n, 'ct-r', 'left:' + r.x + 'px;top:' + r.y + 'px', r.w)).join('');
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:290px;width:1080px;align-items:center;gap:12px"><p class="sub ct-k">Rule of thumb</p><span class="tag ct-g" style="position:relative;align-self:center;font-size:32px">Move up only if it isn’t good enough</span></div>' +
      UI.anim(kit, 'ladder', 'ct-ld', 'left:260px;top:480px', 520) + rung +
      '<svg class="art" viewBox="0 0 1080 1300" style="height:1300px"><path class="pk-line ct-ar" d="M860 1150 C 900 950 900 760 850 560" style="stroke-width:12"/>' + UI.arrowHead(850, 560, -100, 'pk-line ct-ah') + '</svg>' +
      '<div class="words" style="left:110px;top:1150px"><span class="tape pk ct-s" style="position:relative;font-size:50px;transform-origin:50% 50%">Start small</span></div>' +
      '<div class="words" style="left:0;top:1320px;width:1080px;align-items:center"><span class="tape bl ct-t" style="position:relative;align-self:center;font-size:110px;transform-origin:50% 50%">Save this</span></div>' +
      RECAP.map(r => UI.anim(kit, r.n, 'ct-c', 'left:' + r.x + 'px;top:' + r.y + 'px', r.w) + '<div class="words ct-cl" style="left:' + (r.x + r.w / 2 - 190) + 'px;top:1900px;width:380px;align-items:center"><span class="node" style="font-size:38px;' + r.c + '">' + r.l + '</span></div>').join('') +
      '<div class="words" style="left:0;top:2010px;width:1080px;align-items:center"><p class="sub ct-k2" style="font-size:40px">Right model. Every time.</p></div>',
      2400, '', 'window', UI.ghost('Up', -60, 1600, 460));
    const q = this.v.q;
    this.k = q('.ct-k').style; this.g = q('.ct-g').style; this.ld = q('.ct-ld').style;
    this.r = [...kit.stage.querySelectorAll('.ct-r')].map(e => e.style); this.ar = UI.draw(q('.ct-ar')); this.ah = q('.ct-ah').style;
    this.c = [...kit.stage.querySelectorAll('.ct-c')].map(e => e.style); this.cl = [...kit.stage.querySelectorAll('.ct-cl')].map(e => e.style);
    this.s = q('.ct-s').style; this.t = q('.ct-t').style; this.k2 = q('.ct-k2').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.2, 0.45)); UI.slam(this.g, t, 2.29, 0.2, -2, 1.4);
    const lp = seg(t, 0.3, 0.65); this.ld.opacity = lp > 0 ? 1 : 0; this.ld.transform = 'translateY(' + lerp(400, 0, eob(lp, 1.2)) + 'px)'; UI.frame(this.ld, t);
    RUNG.forEach((r, i) => { const p = seg(t, r.a - 0.05, r.a + 0.3); this.r[i].opacity = p > 0 ? 1 : 0; this.r[i].transform = 'translateY(' + lerp(-300, 0, eob(p, 1.4)) + 'px) rotate(' + [-8, 4, 0][i] + 'deg)'; UI.frame(this.r[i], t, i * 0.3); });
    this.ar(eio(seg(t, 2.4, 3.7))); this.ah.opacity = t >= 3.6 ? 1 : 0;
    UI.slam(this.s, t, 1.29, 0.22, -3, 1.6); this.s.opacity *= 1 - seg(t, 4.7, 4.9);
    UI.slam(this.t, t, 5.13, 0.22, -3, 1.6);
    RECAP.forEach((r, i) => { const p = seg(t, 5.3 + i * 0.15, 5.6 + i * 0.15); this.c[i].opacity = p > 0 ? 1 : 0; this.c[i].transform = 'scale(' + lerp(0.4, 1, eob(p, 1.6)) + ')'; UI.frame(this.c[i], t, i * 0.3); UI.slam(this.cl[i], t, 5.45 + i * 0.15, 0.2, [-3, 2, -2][i], 1.5); }); this.k2.opacity = eo(seg(t, 5.7, 6.0));
    UI.punch(this.v.roll, t, [1.29, 2.7, 3.6, 5.13], 0.04);
  },
});
