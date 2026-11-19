const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: -500, z: 1.05, r: 3 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 7.3, from: 0.4, cx: 540, cy: 975, z: 1.03, r: -1 }, { t: 7.65, from: 7.3, cx: 1800, cy: 975, z: 1.05, r: 5, ease: kit.ei }];
kit.scene('max', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:300px;width:1080px;align-items:center"><p class="sub mx-k">This is</p></div>' +
      UI.anim(kit, 'stage', 'mx-st', 'left:250px;top:380px', 580) +
      '<div class="lt mx-lt" style="left:110px;top:1010px"><b>Adobe MAX</b><span>Miami Beach · Nov 10-12</span></div>' +
      '<div class="words" style="left:0;top:1250px;width:1080px;align-items:center;gap:4px"><p class="sub mx-k3" style="font-size:40px">Nearly everything was about</p><h1 class="line pink mx-l" style="font-size:150px">AI agents</h1></div>' +
      UI.anim(kit, 'robomouse', 'mx-rb', 'left:700px;top:860px', 300),
      2400, '<div class="bdg mx-sl" style="left:790px;top:870px"><div class="bpin"></div><div class="bclip"></div><div class="hd"><span class="hole"></span></div><b>Adobe</b><i>MAX</i><small>Pass · 2026</small></div>', 'spot', UI.ghost('Stage', -60, 1550, 460));
    const q = this.v.q;
    this.k = q('.mx-k').style; this.st = q('.mx-st').style; this.lt = q('.mx-lt').style; this.sl = q('.mx-sl').style;
    this.k3 = q('.mx-k3').style; this.L = UI.letters(q('.mx-l'), 911, 6.4, 0.4); this.rb = q('.mx-rb').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.2, 0.45)) * (1 - seg(t, 4.0, 4.2));
    UI.pop(this.st, t, 0.3, -2); UI.frame(this.st, t);
    const lp = seg(t, 1.0, 1.35); this.lt.opacity = lp > 0 ? 1 : 0; this.lt.transform = 'translateX(' + lerp(-700, 0, eo(lp)) + 'px)';
    // the pass drops onto its pin and swings to rest
    const bp = seg(t, 1.2, 1.55), bo = seg(t, 3.9, 4.1), sw = t > 1.2 ? 16 * Math.exp(-(t - 1.2) * 1.5) * Math.cos((t - 1.2) * 6.5) : 0;
    this.sl.opacity = bp > 0 && bo < 1 ? 1 - bo : 0; this.sl.transform = 'translateY(' + lerp(-560, 0, eob(bp, 1.2)) + 'px) rotate(' + sw + 'deg) scale(' + (1 - 0.2 * ei(bo)) + ')';
    // the line drops to the second half: the year is about agents
    const up = eio(seg(t, 4.0, 4.5));
    this.st.transform += ' translateY(' + (-120 * up) + 'px)'; this.lt.opacity *= 1 - seg(t, 3.9, 4.1);
    this.k3.opacity = eo(seg(t, 4.3, 4.6)); UI.reveal(this.L, t);
    this.k3.transform = this.v.q('.mx-l').style.transform = 'translateY(' + (-300 * up) + 'px)';
    UI.pop(this.rb, t, 6.6, 6); UI.frame(this.rb, t);
    UI.punch(this.v.roll, t, [1.0, 6.6], 0.04);
  },
});
