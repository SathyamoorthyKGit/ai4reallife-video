const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 1700, cy: 960, z: 1.05, r: 5 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 5.3, from: 0.4, cx: 540, cy: 975, z: 1.03, r: -1 }, { t: 5.65, from: 5.3, cx: 540, cy: 1960, z: 1.0, r: 1 }, { t: 10.45, from: 5.7, cx: 540, cy: 1970, z: 1.03, r: 0 }, { t: 10.8, from: 10.45, cx: 540, cy: 2960, z: 1.0, r: -1 }, { t: 12.4, from: 10.85, cx: 540, cy: 2965, z: 1.03, r: 0 }, { t: 12.7, from: 12.4, cx: -700, cy: 2965, z: 1.05, r: -5, ease: kit.ei }];
const P = 'Study how I write. Build me a style guide.';
kit.scene('step1', {
  init(kit) {
    this.v = UI.build(kit,
      // capture your voice
      '<div class="num-b s1-n" style="left:130px;top:330px">1</div><div class="words" style="left:240px;top:342px"><p class="sub s1-k" style="font-size:52px">Step one</p></div>' +
      '<div class="words" style="left:0;top:450px;width:1080px;align-items:center;gap:6px"><h1 class="line s1-l" style="font-size:100px">Capture your</h1><h1 class="line pink s1-l2" style="font-size:160px">voice</h1></div>' +
      UI.anim(kit, 'letters', 's1-lt', 'left:300px;top:790px', 480) +
      '<div class="disc s1-5" style="left:760px;top:720px">5</div>' +
      '<div class="words" style="left:0;top:1230px;width:1080px;align-items:center"><span class="tag s1-g" style="position:relative;align-self:center;font-size:34px">Your best emails or reports</span></div>' +
      // paste them in, then say
      '<div class="chat s1-ch" style="left:90px;top:1300px;width:900px;height:700px"><div class="hd">New chat</div>' +
        '<div style="display:flex;gap:12px;align-self:flex-end" class="s1-at"><span class="chip">email 1</span><span class="chip">email 2</span><span class="chip">report</span><span class="chip">+2</span></div>' +
        '<div class="msg me s1-me"></div><div class="msg ai s1-ai">Got it. Here’s your style guide.</div></div>' +
      // now it knows how you sound
      '<div class="words" style="left:0;top:2300px;width:1080px;align-items:center;gap:6px"><p class="sub s1-k3">Now it knows</p><h1 class="line s1-l3" style="font-size:96px">How you sound</h1></div>' +
      '<div class="s1-mr" style="position:absolute;left:330px;top:2520px;width:420px;height:683px">' + UI.anim(kit, 'mirror', 's1-mi', 'left:0;top:0', 420) +
        '<div style="position:absolute;left:62px;top:52px;width:296px;height:410px;border-radius:50%;overflow:hidden">' + UI.anim(kit, 'worker', 's1-rf', 'left:58px;top:20px;filter:none;opacity:.8', 180) + '</div></div>',
      3400, '', 'window', UI.ghost('Voice', -60, 1240, 420));
    const q = this.v.q;
    this.n = q('.s1-n').style; this.k = q('.s1-k').style; this.L = UI.letters(q('.s1-l'), 721, 1.3, 0.35).concat(UI.letters(q('.s1-l2'), 722, 1.8, 0.3));
    this.lt = q('.s1-lt').style; this.five = q('.s1-5').style; this.g = q('.s1-g').style;
    this.ch = q('.s1-ch').style; this.at = q('.s1-at').style; this.me = q('.s1-me'); this.ai = q('.s1-ai').style;
    this.k3 = q('.s1-k3').style; this.L3 = UI.letters(q('.s1-l3'), 723, 11.0, 0.4); this.mr = q('.s1-mr').style; this.mi = q('.s1-mi').style; this.rf = q('.s1-rf').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.slam(this.n, t, 0.35, 0.2, 0, 1.8); this.k.opacity = eo(seg(t, 0.4, 0.7)); UI.reveal(this.L, t);
    const lp = seg(t, 3.1, 3.45); this.lt.opacity = lp > 0 ? 1 : 0; UI.frame(this.lt, t);
    // the letters fly into the chat on "paste them in"
    const fly = ei(seg(t, 5.3, 5.9));
    this.lt.transform = 'translate(0,' + (lerp(-500, 0, eob(lp, 1.2)) + fly * 760) + 'px) scale(' + lerp(1, 0.3, fly) + ') rotate(' + lerp(-6, 30, fly) + 'deg)';
    this.lt.opacity *= 1 - seg(t, 5.8, 5.95);
    UI.slam(this.five, t, 3.5, 0.22, 8, 1.8); UI.slam(this.g, t, 4.3, 0.2, -2, 1.4); const gA = 1 - seg(t, 5.2, 5.4); this.five.opacity *= gA; this.g.opacity *= gA;
    const cp = seg(t, 5.4, 5.75); this.ch.opacity = cp > 0 ? 1 : 0; this.ch.transform = 'translateY(' + lerp(300, 0, eob(cp, 1.2)) + 'px) rotate(-1deg)';
    const ap = seg(t, 5.85, 6.1); this.at.opacity = ap > 0 ? 1 : 0; this.at.transform = 'scale(' + lerp(0.5, 1, eob(ap, 1.6)) + ')';
    UI.type(this.me, P, t, 7.6, 15); this.me.style.opacity = t >= 7.5 ? 1 : 0;
    const aip = seg(t, 10.2, 10.4); this.ai.opacity = aip > 0 ? 1 : 0; this.ai.transform = 'translateY(' + lerp(30, 0, eo(aip)) + 'px)';
    this.k3.opacity = eo(seg(t, 10.85, 11.1)); UI.reveal(this.L3, t);
    const mp = seg(t, 10.9, 11.3); this.mr.opacity = mp > 0 ? 1 : 0; this.mr.transform = 'translateY(' + lerp(400, 0, eob(mp, 1.2)) + 'px) rotate(' + Math.sin(t * 1.5) * 2 + 'deg)';
    UI.frame(this.mi, t); UI.frame(this.rf, t, 0.5);
    UI.punch(this.v.roll, t, [0.35, 3.5, 4.3, 10.2], 0.04);
  },
});
