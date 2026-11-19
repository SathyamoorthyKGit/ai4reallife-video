const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 960, z: 1.7, r: -3 }, { t: 0.4, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 7.8, from: 0.45, cx: 540, cy: 980, z: 1.04, r: 1 }];
kit.scene('payoff', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:310px;width:1080px;align-items:center;gap:6px"><p class="sub po-k" style="font-size:40px">The clicking moves to</p><h1 class="line po-l" style="font-size:150px">AI</h1></div>' +
      UI.anim(kit, 'robomouse', 'po-rb', 'left:90px;top:620px', 340) +
      UI.anim(kit, 'pen', 'po-pn', 'left:600px;top:620px', 380) +
      '<div class="words" style="left:560px;top:1000px;width:460px;align-items:center"><span class="node po-n1" style="font-size:40px;background:var(--main)">A clear brief</span></div>' +
      UI.anim(kit, 'handmouse', 'po-hm', 'left:80px;top:920px', 420) +
      '<div class="words" style="left:80px;top:1100px;width:420px;align-items:center"><span class="node po-n2" style="font-size:40px;background:var(--accent)">Judgement</span></div>' +
      '<div class="words" style="left:0;top:1250px;width:1080px;align-items:center"><span class="stamp solid po-s" style="position:relative;font-size:58px;transform-origin:50% 50%">Brief + judgement</span></div>',
      2000, '', 'window', UI.ghost('Skill', -60, 1550, 460));
    const q = this.v.q;
    this.k = q('.po-k').style; this.L = UI.letters(q('.po-l'), 961, 1.95, 0.2); this.rb = q('.po-rb').style; this.pn = q('.po-pn').style;
    this.n1 = q('.po-n1').style; this.hm = q('.po-hm').style; this.n2 = q('.po-n2').style; this.s = q('.po-s').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.2, 0.45)); UI.reveal(this.L, t);
    UI.pop(this.rb, t, 0.6, -4); UI.frame(this.rb, t);
    // the robot lets go of the mouse; a human hand takes it back
    const go = ei(seg(t, 5.3, 5.8)); this.rb.transform += ' translate(' + (-400 * go) + 'px,' + (-200 * go) + 'px)'; this.rb.opacity *= 1 - go;
    UI.pop(this.pn, t, 2.75, 4); UI.frame(this.pn, t); UI.slam(this.n1, t, 4.9, 0.2, -2, 1.4);
    const hp = seg(t, 5.5, 5.85); this.hm.opacity = hp > 0 ? 1 : 0; this.hm.transform = 'translateX(' + lerp(-600, 0, eo(hp)) + 'px)'; UI.frame(this.hm, t);
    UI.slam(this.n2, t, 6.0, 0.2, 2, 1.4);
    UI.slam(this.s, t, 6.6, 0.22, -3, 1.7);
    UI.punch(this.v.roll, t, [1.95, 4.9, 6.0, 6.6], 0.04);
  },
});
