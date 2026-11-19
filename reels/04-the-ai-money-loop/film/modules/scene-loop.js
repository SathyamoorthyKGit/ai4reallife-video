const { seg, eo, ei, eio, eob, lerp } = kit;
// the camera holds still here (no push, no tilt) so the Nvidia logo slot can sit on the diagram's top node
const KEYS = [{ t: 0, cx: 540, cy: -400, z: 1.0, r: 2 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 8.75, cx: 540, cy: 960, z: 1.0, r: 0 }, { t: 9.14, from: 8.75, cx: 545, cy: 1020, z: 3.2, r: 0, ease: kit.ei }];
const ARROWS = ['M700 610 Q 860 640 885 790', 'M905 1235 Q 900 1380 735 1430', 'M335 1430 Q 190 1400 200 1150', 'M200 905 Q 200 690 335 620'];
const HEADS = [[885, 790, 80], [735, 1430, 163], [200, 1150, -88], [335, 620, -27]];
const STEPS = [0.21, 2.04, 4.21, 6.62];
const CAPS = ['Invests', 'Buys GPUs', 'Borrows against them', 'Rental income looks steady'];
kit.scene('loop', {
  init(kit) {
    const svg = '<svg class="art" viewBox="0 0 1080 2000" style="height:2000px">' + ARROWS.map((d, i) => '<path class="pk-line lp-a" d="' + d + '"/>').join('') +
      HEADS.map(h => '<g class="lp-h">' + UI.arrowHead(h[0], h[1], h[2], 'pk-line') + '</g>').join('') +
      '<path class="bl-line lp-steady" d="M410 1150 L470 1150 L485 1132 L500 1150 L560 1150 L575 1132 L590 1150 L670 1150"/></svg>';
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:330px;width:1080px;align-items:center"><h1 class="line lp-l" style="font-size:130px">The loop</h1></div>' +
      '<div class="lp-v" style="position:absolute;left:400px;top:820px;width:280px;height:280px"></div>' + svg +
      UI.img(kit, 'founder.webp', 'lp-f', 'left:770px;top:820px;width:250px') +
      UI.img(kit, 'gpu.webp', 'lp-g', 'left:330px;top:1330px;width:420px') +
      UI.img(kit, 'bank.webp', 'lp-b', 'left:30px;top:935px;width:370px') +
      UI.img(kit, 'tokens.webp', 'lp-tk', 'left:0;top:0;width:150px') +
      UI.img(kit, 'chain.webp', 'lp-ch', 'left:130px;top:1250px;width:300px') +
      '<div class="words" style="left:780px;top:760px"><span class="node lp-n1">Startup</span></div>' +
      '<div class="words" style="left:470px;top:1605px"><span class="node lp-n2">GPUs</span></div>' +
      '<div class="words" style="left:110px;top:870px"><span class="node lp-n3">Banks</span></div>' +
      '<div class="stamp solid lp-s" style="left:70px;top:1285px;font-size:56px;transform-origin:50% 50%">Collateral</div>' +
      CAPS.map((c, i) => '<div class="words lp-c" style="left:0;top:1190px;width:1080px;align-items:center"><span class="tag" style="align-self:center;font-size:36px">' + c + '</span></div>').join(''),
      2000, UI.slot('Nvidia', 330, 500, 420, 180, 'lp-slot'), 'soft', UI.ghost('Loop', -60, 1500));
    const q = this.v.q, all = s => [...kit.stage.querySelectorAll(s)];
    this.slot = q('.lp-slot').style; this.L = UI.letters(q('.lp-l'), 421, 0.1, 0.35);
    this.vid = UI.vid(kit, q('.lp-v'), 'clip-chip.mp4', 61); this.vs = q('.lp-v').style;
    this.paths = all('.lp-a'); this.a = this.paths.map(p => UI.draw(p)); this.h = all('.lp-h').map(e => e.style);
    this.steady = UI.draw(q('.lp-steady'));
    this.f = q('.lp-f').style; this.g = q('.lp-g').style; this.b = q('.lp-b').style; this.tk = q('.lp-tk').style; this.ch = q('.lp-ch').style;
    this.n = ['.lp-n1', '.lp-n2', '.lp-n3'].map(s => q(s).style); this.s = q('.lp-s').style; this.c = all('.lp-c').map(e => e.style);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.0001);
    UI.slotAnim(this.slot, t, 0.15, 8.7);
    UI.reveal(this.L, t);
    STEPS.forEach((a, i) => { const p = eio(seg(t, a + 0.15, a + 0.8)); this.a[i](p); this.h[i].opacity = p > 0.95 ? 1 : 0; });
    const pop = (st, a, r) => { const p = seg(t, a, a + 0.4); st.opacity = p > 0 ? 1 : 0; st.transform = 'translateY(' + lerp(160, 0, eob(p, 1.4)) + 'px) rotate(' + (r + Math.sin(t * 1.3 + r) * 1.2) + 'deg)'; };
    pop(this.f, 0.45, 3); pop(this.g, 2.25, -4); pop(this.b, 4.45, 2);
    [0.6, 2.45, 4.6].forEach((a, i) => { const p = seg(t, a, a + 0.25); this.n[i].opacity = p > 0 ? 1 : 0; this.n[i].transform = 'scale(' + lerp(1.4, 1, eob(p, 1.6)) + ')'; });
    // tokens ride arrow 1 from Nvidia to the startup
    const tp = seg(t, 0.4, 1.1), P = this.paths[0], L = P.getTotalLength(), pt = P.getPointAtLength(L * eio(tp));
    this.tk.opacity = tp > 0 && tp < 1 ? 1 : 0; this.tk.transform = 'translate(' + (pt.x - 75) + 'px,' + (pt.y - 50) + 'px) rotate(' + (tp * 40) + 'deg)';
    kit.seek(this.vid, Math.max(0, t - 2.0));
    const vp = seg(t, 2.05, 2.45); this.vs.opacity = vp > 0 ? 1 : 0; this.vs.transform = 'scale(' + lerp(0.3, 1, eob(vp, 1.5)) + ') rotate(-2deg)';
    const cp = seg(t, 4.45, 4.8); this.ch.opacity = cp > 0 ? 1 : 0; this.ch.transform = 'rotate(-62deg) scale(' + lerp(1.5, 1, eob(cp, 1.6)) + ')';
    UI.slam(this.s, t, 4.9, 0.22, -8, 1.8);
    this.steady(eo(seg(t, 7.0, 7.8)));
    this.c.forEach((st, i) => { const a = STEPS[i] + 0.3, b = i < 3 ? STEPS[i + 1] + 0.1 : 9; const p = seg(t, a, a + 0.25); st.opacity = (p > 0 ? 1 : 0) * (1 - eo(seg(t, b, b + 0.15))); st.transform = 'translateY(' + lerp(20, 0, eo(p)) + 'px)'; });
    UI.punch(this.v.roll, t, [0.6, 2.45, 4.9, 6.9], 0.025);
  },
});
