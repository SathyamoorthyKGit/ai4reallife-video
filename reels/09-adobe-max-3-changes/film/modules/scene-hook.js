const { seg, eo, ei, eio, eob, lerp } = kit;
// frame 0 is already busy: the MAX stage is up and headline strips are flying out of the ticker
const KEYS = [{ t: 0, cx: 540, cy: 860, z: 1.22, r: -2 }, { t: 0.4, from: 0.1, cx: 540, cy: 900, z: 1.0, r: 0, ease: kit.eox }, { t: 4.5, from: 0.45, cx: 540, cy: 920, z: 1.04, r: 1 }, { t: 4.85, from: 4.5, cx: 540, cy: 2600, z: 1.05, r: 3, ease: kit.ei }];
const HEAD = ['Creative Agent', 'Firefly AI Assistant', 'Plan Mode', 'Model Selector', 'Partner models', 'Local MCP', 'AI Assistant: Premiere', 'AI Assistant: Illustrator', 'AI Assistant: InDesign', 'AI Assistant: After Effects'];
const PICK = [{ l: '01 · An agent in every app', c: 'var(--main)' }, { l: '02 · Pick your model', c: 'var(--accent)' }, { l: '03 · MCP', c: 'var(--main)' }];
kit.scene('hook', {
  init(kit) {
    const r = kit.rng(901);
    this.H = HEAD.map((h, i) => ({ h, at: -0.15 + i * 0.26, x: 80 + r() * 300, y: 520 + r() * 560, rot: (r() - 0.5) * 24 }));
    const strips = this.H.map(s => '<div class="hs hk-st" style="left:' + s.x + 'px;top:' + s.y + 'px">' + s.h + '</div>').join('');
    const picks = PICK.map((p, i) => '<div class="words hk-pk" style="left:110px;top:' + (430 + i * 110) + 'px"><span class="tape" style="position:relative;font-size:46px;background:' + p.c + ';transform-origin:0 50%">' + p.l + '</span></div>').join('');
    this.v = UI.build(kit,
      '<div class="hk-g">' +
        UI.anim(kit, 'maxstage', 'hk-mx', 'left:90px;top:420px', 900) +
        '<div class="hk-mt" style="position:absolute;left:272px;top:648px;font-family:\'Regarn-900\';font-size:150px;line-height:1;color:#fff8ec;letter-spacing:.02em">MAX</div>' +
        UI.anim(kit, 'ticker', 'hk-tk', 'left:690px;top:1170px', 320) + strips +
      '</div>' + picks +
      UI.anim(kit, 'grab', 'hk-gr', 'left:560px;top:220px', 300) +
      '<div class="words" style="left:0;top:290px;width:1080px;align-items:center"><span class="stamp solid hk-s" style="position:relative;font-size:62px;transform-origin:50% 50%">3 changes that matter</span></div>',
      2700, '', 'spot', UI.ghost('MAX', -40, 1500, 520));
    const q = this.v.q;
    this.g = q('.hk-g').style; this.mx = q('.hk-mx').style; this.mt = q('.hk-mt').style; this.tk = q('.hk-tk').style;
    this.st = [...kit.stage.querySelectorAll('.hk-st')].map(e => e.style); this.pk = [...kit.stage.querySelectorAll('.hk-pk')].map(e => e.style);
    this.gr = q('.hk-gr').style; this.s = q('.hk-s').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.0001);
    UI.frame(this.mx, t); UI.frame(this.tk, t, 0.3);
    this.mt.transform = 'rotate(-2deg) scale(' + (1 + 0.02 * Math.sin(t * 5)) + ')';
    // headlines pile up, then everything freezes grey on "three of them"
    this.H.forEach((s, i) => {
      const p = seg(t, s.at, s.at + 0.45); this.st[i].opacity = p > 0 ? 1 : 0;
      this.st[i].transform = 'translate(' + lerp(760 - s.x, 0, eo(p)) + 'px,' + lerp(1240 - s.y, 0, eo(p)) + 'px) rotate(' + lerp(-60, s.rot, eo(p)) + 'deg) scale(' + lerp(0.3, 1, eo(p)) + ')';
      if ([0, 4, 5].indexOf(i) >= 0) this.st[i].opacity *= 1 - seg(t, 3.15, 3.3);
    });
    const fz = seg(t, 3.0, 3.15); this.g.filter = fz > 0 ? 'grayscale(' + fz + ') brightness(' + (1 - 0.25 * fz) + ')' : 'none';
    // a hand pulls out the three that matter
    const gp = seg(t, 2.95, 3.25), gu = seg(t, 3.25, 3.6); this.gr.opacity = gp > 0 && gu < 1 ? 1 : 0;
    this.gr.transform = 'translateY(' + (lerp(-400, 300, eo(gp)) - 700 * ei(gu)) + 'px)'; UI.frame(this.gr, t);
    this.pk.forEach((st, i) => { const p = seg(t, 3.25 + i * 0.12, 3.55 + i * 0.12); st.opacity = p > 0 ? 1 : 0; st.transform = 'translateX(' + lerp(-300, 0, eob(p, 1.4)) + 'px) rotate(' + [-2, 1, -1][i] + 'deg)'; });
    UI.slam(this.s, t, 3.75, 0.22, -3, 1.7);
    UI.punch(this.v.roll, t, [3.03, 3.75], 0.05);
  },
});
