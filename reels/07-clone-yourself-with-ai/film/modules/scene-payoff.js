const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 960, z: 1.7, r: -3 }, { t: 0.4, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 5.5, from: 0.45, cx: 540, cy: 980, z: 1.04, r: 1 }, { t: 5.85, from: 5.5, cx: 540, cy: 2700, z: 1.05, r: 3, ease: kit.ei }];
const STEPS = [{ l: 'Review', a: 3.62, x: 80, c: '' }, { l: 'Adjust', a: 4.26, x: 390, c: 'background:var(--accent)' }, { l: 'Send', a: 5.1, x: 700, c: 'background:var(--main)' }];
kit.scene('payoff', {
  init(kit) {
    const steps = STEPS.map((s, i) => '<div class="words" style="left:' + s.x + 'px;top:1100px"><span class="node po-s" style="font-size:48px;' + s.c + '">' + s.l + '</span></div>').join('');
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:320px;width:1080px;align-items:center;gap:6px"><p class="sub po-k">Your job</p><h1 class="line po-l" style="font-size:150px">Changes</h1></div>' +
      UI.anim(kit, 'crumple', 'po-cr', 'left:80px;top:620px', 380) +
      '<svg class="art" viewBox="0 0 1080 1300" style="height:1300px"><path class="redline po-x1" d="M90 640 L450 990" style="stroke-width:20"/><path class="redline po-x2" d="M450 640 L90 990" style="stroke-width:20"/></svg>' +
      '<div class="words" style="left:80px;top:1000px;width:380px;align-items:center"><span class="tag po-z" style="position:relative;align-self:center;font-size:30px">Writing from zero</span></div>' +
      '<div class="panel po-d" style="left:560px;top:620px;width:420px;height:380px;padding:40px 36px;display:flex;flex-direction:column;gap:26px">' +
        [0.9, 0.75, 0.95, 0.6, 0.85].map(w => '<div style="height:14px;border-radius:7px;width:' + w * 100 + '%;background:color-mix(in srgb, var(--second) 35%, var(--ground))"></div>').join('') + '</div>' +
      '<div class="po-pn" style="position:absolute;left:640px;top:560px;width:380px;transform-origin:20% 80%">' + UI.img(kit, 'redpen.webp', '', 'left:0;top:0;width:380px') + '</div>' +
      '<svg class="art" viewBox="0 0 1080 1300" style="height:1300px"><path class="pk-line po-m" d="M610 760 C 680 740 760 790 840 760 C 880 745 910 760 930 770" style="stroke-width:9"/></svg>' +
      steps +
      UI.anim(kit, 'plane', 'po-pl', 'left:620px;top:820px', 300),
      2000, '', 'window', UI.ghost('Review', -60, 1300, 400));
    const q = this.v.q;
    this.k = q('.po-k').style; this.L = UI.letters(q('.po-l'), 751, 0.25, 0.4);
    this.cr = q('.po-cr').style; this.x1 = UI.draw(q('.po-x1')); this.x2 = UI.draw(q('.po-x2')); this.z = q('.po-z').style;
    this.d = q('.po-d').style; this.pn = q('.po-pn').style; this.m = UI.draw(q('.po-m'));
    this.s = [...kit.stage.querySelectorAll('.po-s')].map(e => e.style); this.pl = q('.po-pl').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.15, 0.4)); UI.reveal(this.L, t);
    const cp = seg(t, 1.6, 1.9); this.cr.opacity = cp > 0 ? 1 : 0; this.cr.transform = 'scale(' + lerp(0.4, 1, eob(cp, 1.6)) + ') rotate(-5deg)'; UI.frame(this.cr, t);
    this.x1(eio(seg(t, 2.55, 2.75))); this.x2(eio(seg(t, 2.7, 2.9))); UI.slam(this.z, t, 2.0, 0.2, -2, 1.4);
    const dp = seg(t, 3.3, 3.6); this.d.opacity = dp > 0 ? 1 : 0; this.d.transform = 'translateY(' + lerp(300, 0, eob(dp, 1.2)) + 'px) rotate(2deg)';
    const pp = seg(t, 3.5, 3.85), wig = t > 3.85 && t < 4.9 ? Math.sin(t * 16) * 5 : 0;
    this.pn.opacity = pp > 0 ? 1 - seg(t, 4.9, 5.05) : 0; this.pn.transform = 'translate(' + lerp(400, 0, eo(pp)) + 'px,' + lerp(-300, 0, eo(pp)) + 'px) rotate(' + (-20 + wig) + 'deg)';
    this.m(eio(seg(t, 3.85, 4.7)));
    STEPS.forEach((s, i) => UI.slam(this.s[i], t, s.a, 0.2, [-3, 2, -2][i], 1.5));
    // send: the draft folds into a paper plane and takes off
    this.d.opacity *= 1 - seg(t, 5.0, 5.15);
    const fp = seg(t, 5.05, 5.85); this.pl.opacity = fp > 0 ? 1 : 0; UI.frame(this.pl, t);
    this.pl.transform = 'translate(' + lerp(0, 700, ei(fp)) + 'px,' + lerp(0, -700, ei(fp)) + 'px) rotate(-12deg) scale(' + lerp(0.6, 1.1, eo(fp)) + ')';
    UI.punch(this.v.roll, t, [2.0, 2.6, 3.62, 4.26, 5.1], 0.04);
  },
});
