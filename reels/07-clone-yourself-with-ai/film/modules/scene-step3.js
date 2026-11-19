const { seg, eo, ei, eio, eob, lerp } = kit;
// part 2 holds dead still so the two logo slots can be overlaid in an editor
const KEYS = [{ t: 0, cx: 1700, cy: 960, z: 1.05, r: 5 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 2.0, from: 0.4, cx: 540, cy: 975, z: 1.03, r: -1 }, { t: 2.4, from: 2.0, cx: 540, cy: 1960, z: 1.0, r: 0 }, { t: 6.9, from: 2.45, cx: 540, cy: 1962, z: 1.01, r: 0 }, { t: 7.25, from: 6.9, cx: 540, cy: 2960, z: 1.0, r: 1 }, { t: 11.7, from: 7.3, cx: 540, cy: 2970, z: 1.03, r: 0 }, { t: 12.05, from: 11.7, cx: 540, cy: 3960, z: 1.0, r: -1 }, { t: 14.9, from: 12.1, cx: 540, cy: 3970, z: 1.04, r: 0 }, { t: 15.25, from: 14.9, cx: 1800, cy: 3970, z: 1.05, r: 5, ease: kit.ei }];
const TASKS = [{ l: 'Replies', a: 12.06, c: '' }, { l: 'First drafts', a: 13.28, c: 'bl' }, { l: 'Meeting notes', a: 14.25, c: 'pk' }];
kit.scene('step3', {
  init(kit) {
    const tasks = TASKS.map((k, i) => '<div class="words" style="left:0;top:' + (3290 + i * 100) + 'px;width:1080px;align-items:center"><span class="tape ' + k.c + ' s3-tk" style="position:relative;align-self:center;font-size:58px;transform-origin:50% 50%">' + k.l + '</span></div>').join('');
    this.v = UI.build(kit,
      // save it
      '<div class="num-b s3-n" style="left:130px;top:330px">3</div><div class="words" style="left:240px;top:342px"><p class="sub s3-k" style="font-size:52px">Step three</p></div>' +
      '<div class="words" style="left:0;top:450px;width:1080px;align-items:center"><h1 class="line pink s3-l" style="font-size:170px">Save it</h1></div>' +
      UI.anim(kit, 'cabinet', 's3-cb', 'left:330px;top:680px', 420) +
      // Claude = a Project, ChatGPT = a custom GPT
      '<div class="words" style="left:0;top:1300px;width:1080px;align-items:center"><p class="sub s3-k2">Where it lives</p></div>' +
      '<div class="words" style="left:580px;top:1530px"><span class="node s3-p1" style="font-size:40px">= a Project</span></div>' +
      '<div class="words" style="left:580px;top:1870px"><span class="node s3-p2" style="font-size:40px;background:var(--accent)">= a custom GPT</span></div>' +
      // paste in, every chat starts as you
      '<div class="chat s3-ch" style="left:90px;top:2330px;width:900px;height:300px"><div class="hd">Instructions</div><div style="display:flex;gap:16px;flex-wrap:wrap"><span class="chip s3-c1">Style guide</span><span class="chip s3-c2">Your rules</span></div></div>' +
      '<div class="words" style="left:0;top:2770px;width:1080px;align-items:center;gap:6px"><p class="sub s3-k3">Now every chat</p><h1 class="line s3-l3" style="font-size:100px">Starts as you</h1></div>' +
      UI.anim(kit, 'worker', 's3-w', 'left:800px;top:2360px', 150) +
      // delegate
      tasks +
      UI.anim(kit, 'typist', 's3-ty', 'left:270px;top:3600px', 540),
      4400, UI.slot('Claude', 110, 500, 420, 130, 's3-sl1') + UI.slot('ChatGPT', 110, 840, 420, 130, 's3-sl2'), 'soft', UI.ghost('Save', -60, 1240, 420));
    const q = this.v.q;
    this.n = q('.s3-n').style; this.k = q('.s3-k').style; this.L = UI.letters(q('.s3-l'), 741, 1.5, 0.35); this.cb = q('.s3-cb').style;
    this.k2 = q('.s3-k2').style; this.p1 = q('.s3-p1').style; this.p2 = q('.s3-p2').style; this.sl1 = q('.s3-sl1').style; this.sl2 = q('.s3-sl2').style;
    this.ch = q('.s3-ch').style; this.c1 = q('.s3-c1').style; this.c2 = q('.s3-c2').style;
    this.k3 = q('.s3-k3').style; this.L3 = UI.letters(q('.s3-l3'), 743, 9.62, 0.45); this.w = q('.s3-w').style;
    this.tk = [...kit.stage.querySelectorAll('.s3-tk')].map(e => e.style); this.ty = q('.s3-ty').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.0001);
    UI.slam(this.n, t, 0.47, 0.2, 0, 1.8); this.k.opacity = eo(seg(t, 0.5, 0.8)); UI.reveal(this.L, t);
    const cp = seg(t, 1.45, 1.8); this.cb.opacity = cp > 0 ? 1 : 0; this.cb.transform = 'translateY(' + lerp(-500, 0, eob(cp, 1.3)) + 'px)'; UI.frame(this.cb, t);
    this.k2.opacity = eo(seg(t, 2.4, 2.65));
    UI.slotAnim(this.sl1, t, 2.61, 6.9); UI.slotAnim(this.sl2, t, 4.42, 6.9);
    UI.slam(this.p1, t, 3.3, 0.2, -2, 1.4); UI.slam(this.p2, t, 5.6, 0.2, 2, 1.4);
    const chp = seg(t, 7.2, 7.5); this.ch.opacity = chp > 0 ? 1 : 0; this.ch.transform = 'translateY(' + lerp(300, 0, eob(chp, 1.2)) + 'px) rotate(-1deg)';
    UI.slam(this.c1, t, 7.6, 0.2, -3, 1.6); UI.slam(this.c2, t, 8.5, 0.2, 3, 1.6);
    this.k3.opacity = eo(seg(t, 9.6, 9.85)); UI.reveal(this.L3, t);
    const wp = seg(t, 10.5, 10.85); this.w.opacity = wp > 0 ? 1 : 0; this.w.transform = 'translateY(' + lerp(200, 0, eob(wp, 1.3)) + 'px) rotate(4deg)'; UI.frame(this.w, t);
    TASKS.forEach((k, i) => UI.slam(this.tk[i], t, k.a, 0.22, [-3, 2, -2][i], 1.6));
    const tp = seg(t, 12.0, 12.4); this.ty.opacity = tp > 0 ? 1 : 0; this.ty.transform = 'translateY(' + lerp(400, 0, eob(tp, 1.2)) + 'px)'; UI.frame(this.ty, t);
    if (t > 2.4 && t < 6.95) this.v.roll.transform = 'none'; else UI.punch(this.v.roll, t, [0.47, 1.5, 7.6, 8.5, 12.06, 13.28, 14.25], 0.04);
  },
});
