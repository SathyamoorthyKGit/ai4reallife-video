const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: -500, z: 1.05, r: 3 }, { t: 0.32, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 2.8, from: 0.35, cx: 540, cy: 975, z: 1.03, r: 1 }, { t: 3.15, from: 2.8, cx: 540, cy: 1960, z: 1.0, r: -1 }, { t: 9.0, from: 3.2, cx: 540, cy: 1970, z: 1.03, r: 0 }, { t: 9.35, from: 9.0, cx: 540, cy: 2960, z: 1.0, r: 1 }, { t: 12.75, from: 9.4, cx: 540, cy: 2965, z: 1.03, r: 0 }, { t: 13.1, from: 12.75, cx: 540, cy: 3960, z: 1.05, r: 3, ease: kit.ei }];
const P = 'Interview me. Ask 10 questions about how I make decisions.';
const BARS = 9;
kit.scene('step2', {
  init(kit) {
    let bars = ''; for (let i = 0; i < BARS; i++) bars += '<div class="wave s2-b" style="left:' + (560 + i * 40) + 'px;top:2280px;height:120px;transform-origin:50% 50%"></div>';
    this.v = UI.build(kit,
      '<div class="num-b s2-n" style="left:130px;top:330px">2</div><div class="words" style="left:240px;top:342px"><p class="sub s2-k" style="font-size:52px">Step two</p></div>' +
      '<div class="words" style="left:0;top:450px;width:1080px;align-items:center;gap:6px"><h1 class="line s2-l" style="font-size:100px">Capture how</h1><h1 class="line pink s2-l2" style="font-size:150px">you think</h1></div>' +
      UI.img(kit, 'brain.webp', 's2-br', 'left:110px;top:760px;width:440px') +
      UI.anim(kit, 'lamp', 's2-lp', 'left:560px;top:700px', 440) +
      // interview me
      '<div class="chat s2-ch" style="left:90px;top:1290px;width:900px;height:640px"><div class="hd">New chat</div>' +
        '<div class="msg me s2-me"></div><div class="msg ai s2-ai">Q1. What do you always say no to?</div></div>' +
      UI.anim(kit, 'mic', 's2-mc', 'left:150px;top:1960px', 260) + bars +
      '<div class="words" style="left:480px;top:2440px"><span class="tag s2-g" style="position:relative;font-size:36px">Answer out loud</span></div>' +
      // priorities, rules, red lines
      '<div class="words" style="left:0;top:2300px;width:1080px;align-items:center"><p class="sub s2-k3">Now it knows your</p></div>' +
      '<div class="words" style="left:110px;top:2420px"><span class="tape s2-t1" style="position:relative;font-size:72px;transform-origin:50% 50%">Priorities</span></div>' +
      UI.anim(kit, 'rulebook', 's2-rb', 'left:620px;top:2470px', 330) +
      '<div class="words" style="left:110px;top:2620px"><span class="tape bl s2-t2" style="position:relative;font-size:72px;transform-origin:50% 50%">Rules</span></div>' +
      '<div class="words" style="left:110px;top:2820px"><span class="tape pk s2-t3" style="position:relative;font-size:72px;transform-origin:50% 50%">Red lines</span></div>' +
      '<svg class="art" viewBox="0 0 1080 3200" style="height:3200px"><path class="pk-line s2-rl" d="M100 2960 L960 2930" style="stroke-width:14"/></svg>',
      3800, '', 'spot', UI.ghost('Think', -60, 1240, 420));
    const q = this.v.q;
    this.n = q('.s2-n').style; this.k = q('.s2-k').style; this.L = UI.letters(q('.s2-l'), 731, 1.25, 0.35).concat(UI.letters(q('.s2-l2'), 732, 1.75, 0.3));
    this.br = q('.s2-br').style; this.lp = q('.s2-lp').style;
    this.ch = q('.s2-ch').style; this.me = q('.s2-me'); this.ai = q('.s2-ai').style;
    this.mc = q('.s2-mc').style; this.b = [...kit.stage.querySelectorAll('.s2-b')].map(e => e.style); this.g = q('.s2-g').style;
    this.k3 = q('.s2-k3').style; this.t1 = q('.s2-t1').style; this.t2 = q('.s2-t2').style; this.t3 = q('.s2-t3').style; this.rb = q('.s2-rb').style; this.rl = UI.draw(q('.s2-rl'));
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.slam(this.n, t, 0.28, 0.2, 0, 1.8); this.k.opacity = eo(seg(t, 0.35, 0.65)); UI.reveal(this.L, t);
    const bp = seg(t, 1.8, 2.15); this.br.opacity = bp > 0 ? 1 : 0; this.br.transform = 'scale(' + lerp(0.4, 1, eob(bp, 1.6)) + ') rotate(' + (-4 + Math.sin(t * 1.6) * 2) + 'deg)';
    const lp = seg(t, 2.3, 2.65); this.lp.opacity = lp > 0 ? 1 : 0; this.lp.transform = 'translateX(' + lerp(500, 0, eob(lp, 1.2)) + 'px)'; UI.frame(this.lp, t);
    const cp = seg(t, 3.0, 3.35); this.ch.opacity = cp > 0 ? 1 : 0; this.ch.transform = 'translateY(' + lerp(300, 0, eob(cp, 1.2)) + 'px) rotate(1deg)';
    UI.type(this.me, P, t, 3.15, 13); this.me.style.opacity = t >= 3.1 ? 1 : 0;
    const aip = seg(t, 7.6, 7.8); this.ai.opacity = aip > 0 ? 1 : 0; this.ai.transform = 'translateY(' + lerp(30, 0, eo(aip)) + 'px)';
    // answer out loud: the mic and a voice wave
    const mp = seg(t, 7.95, 8.3); this.mc.opacity = mp > 0 ? 1 : 0; this.mc.transform = 'translateY(' + lerp(300, 0, eob(mp, 1.2)) + 'px)'; UI.frame(this.mc, t);
    const r = kit.rng(733);
    this.b.forEach((st, i) => { const ph = r() * 6; st.opacity = t >= 8.1 ? 1 : 0; st.transform = 'scaleY(' + (0.25 + 0.75 * Math.abs(Math.sin(t * 7 + ph)) * seg(t, 8.1, 8.4) * (1 - 0.7 * seg(t, 8.8, 9.0))) + ')'; });
    UI.slam(this.g, t, 8.1, 0.2, -2, 1.4); const gB = 1 - seg(t, 9.0, 9.2); this.g.opacity *= gB; this.mc.opacity *= gB; this.b.forEach(st => { st.opacity *= gB; });
    this.k3.opacity = eo(seg(t, 9.3, 9.55));
    UI.slam(this.t1, t, 9.6, 0.22, -3, 1.6);
    UI.slam(this.t2, t, 10.97, 0.22, 2, 1.6);
    const rp = seg(t, 11.0, 11.35); this.rb.opacity = rp > 0 ? 1 : 0; this.rb.transform = 'translateX(' + lerp(400, 0, eob(rp, 1.2)) + 'px) rotate(6deg)'; UI.frame(this.rb, t);
    UI.slam(this.t3, t, 11.87, 0.22, -2, 1.6); this.rl(eio(seg(t, 12.0, 12.4)));
    UI.punch(this.v.roll, t, [0.28, 7.6, 9.6, 10.97, 11.87], 0.04);
  },
});
