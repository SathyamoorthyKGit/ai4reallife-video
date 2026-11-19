const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: -600, cy: 960, z: 1.05, r: -5 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 4.5, from: 0.4, cx: 540, cy: 980, z: 1.02, r: 1 }, { t: 4.87, from: 4.5, cx: 220, cy: 940, z: 3.0, r: 0, ease: kit.ei }];
const P = [{ x: 85, n: 'cyborg.webp', w: 240, l: 'Cyborgs' }, { x: 395, n: 'centaur.webp', w: 260, l: 'Centaurs' }, { x: 705, n: 'automan.webp', w: 250, l: 'Self-automators' }];
kit.scene('modes', {
  init(kit) {
    const panels = P.map((p, i) => '<div class="panel md-p" style="left:' + p.x + 'px;top:690px;width:290px;height:480px;transform-origin:50% 100%">' +
      UI.img(kit, p.n, '', 'left:' + (145 - p.w / 2) + 'px;top:90px;width:' + p.w + 'px') + '<div class="num-b" style="left:10px;top:-26px">' + (i + 1) + '</div>' +
      '<div class="words" style="left:0;top:404px;width:290px;align-items:center"><span class="node" style="font-size:' + (i === 2 ? 22 : 32) + 'px">' + p.l + '</span></div></div>').join('');
    this.v = UI.build(kit,
      '<div class="words" style="left:100px;top:330px;width:660px;gap:6px"><p class="sub md-k">Three ways humans</p><h1 class="line md-l" style="font-size:84px">work with AI</h1></div>' + panels,
      2000, UI.slot('Lakhani<br>photo', 790, 250, 220, 260, 'photo md-ph'), 'soft', UI.ghost('3 ways', -60, 1300));
    const q = this.v.q;
    this.ph = q('.md-ph').style; this.k = q('.md-k').style; this.L = UI.letters(q('.md-l'), 511, 0.3, 0.4);
    this.p = [...kit.stage.querySelectorAll('.md-p')].map(e => e.style);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.slotAnim(this.ph, t, 0.15, 999);
    this.k.opacity = eo(seg(t, 0.1, 0.35)); UI.reveal(this.L, t);
    this.p.forEach((st, i) => { const a = 1.75 + i * 0.3, p = seg(t, a, a + 0.4); st.opacity = p > 0 ? 1 : 0; st.transform = 'translateY(' + lerp(260, 0, eob(p, 1.3)) + 'px) rotate(' + [-3, 1, 3][i] + 'deg)'; });
    UI.punch(this.v.roll, t, [1.75, 2.05, 2.35], 0.025);
  },
});
