const { seg, eo, ei, eio, eob, lerp } = kit;
// part 1: each model maker drops in as a spinning record next to the jukebox
const KEYS = [{ t: 0, cx: 1700, cy: 960, z: 1.05, r: 5 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 9.5, from: 0.4, cx: 540, cy: 962, z: 1.01, r: 0 }, { t: 9.85, from: 9.5, cx: 540, cy: 1960, z: 1.0, r: 1 }, { t: 14.4, from: 9.9, cx: 540, cy: 1970, z: 1.03, r: 0 }, { t: 14.75, from: 14.4, cx: 540, cy: 2960, z: 1.0, r: -1 }, { t: 19.65, from: 14.8, cx: 540, cy: 2970, z: 1.03, r: 0 }, { t: 20.0, from: 19.65, cx: 540, cy: 3960, z: 1.05, r: 3, ease: kit.ei }];
const MAKERS = [{ l: 'Google', a: 4.13 }, { l: 'OpenAI', a: 4.79 }, { l: 'Kling', a: 5.76 }, { l: 'ElevenLabs', a: 6.42 }];
const STEPS = ['Read the brief', 'Draft three looks', 'Resize for Reels', 'Export'];
kit.scene('models', {
  init(kit) {
    const slots = MAKERS.map((m, i) => '<div class="vin md-sl" style="left:' + (610 + (i % 2) * 215) + 'px;top:' + (640 + Math.floor(i / 2) * 175) + 'px;--lab:' + (i % 3 ? 'var(--accent)' : 'var(--main)') + '"><div class="d"><b></b></div><div class="sh"></div><div class="vt"><span class="tape">' + m.l + '</span></div></div>').join('');
    const steps = STEPS.map((s, i) => '<div class="md-r" style="position:absolute;left:470px;top:' + (2620 + i * 90) + 'px;font-family:\'Regarn-700\';font-size:40px;white-space:nowrap">' + s + '</div>').join('');
    const ticks = STEPS.map((s, i) => '<path class="pk-line md-x" d="M396 ' + (2648 + i * 90) + ' l14 16 l28 -32" style="stroke-width:9"/>').join('');
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:300px;width:1080px;align-items:center;gap:10px"><span class="tape bl md-t" style="position:relative;align-self:center;font-size:52px;transform-origin:50% 50%">02 · Pick your model</span><p class="sub md-k" style="font-size:40px">Firefly runs other models</p></div>' +
      UI.anim(kit, 'jukebox', 'md-jb', 'left:80px;top:600px', 470) +
      '<div class="words" style="left:600px;top:1010px"><span class="node md-p" style="font-size:40px">You pick</span></div>' +
      '<div class="words" style="left:600px;top:1085px"><span class="node md-a" style="font-size:40px;background:var(--accent)">or auto</span></div>' +
      // not stuck with one model
      '<div class="words" style="left:0;top:1300px;width:1080px;align-items:center;gap:6px"><p class="sub md-k2">Not stuck with one model</p><h1 class="line md-l" style="font-size:86px">Best for the job</h1></div>' +
      '<div class="words" style="left:150px;top:1620px"><span class="tape pk md-v" style="position:relative;font-size:80px;transform-origin:50% 50%">Video</span></div>' +
      '<div class="words" style="left:600px;top:1620px"><span class="tape bl md-o" style="position:relative;font-size:80px;transform-origin:50% 50%">Voice</span></div>' +
      // plan mode
      '<div class="words" style="left:0;top:2300px;width:1080px;align-items:center"><h1 class="line md-pl" style="font-size:150px">Plan Mode</h1></div>' +
      UI.anim(kit, 'clipboard', 'md-cb', 'left:60px;top:2520px', 320) + steps + '<svg class="art" viewBox="0 0 1080 3200" style="height:3200px">' + ticks + '</svg>' +
      '<div class="md-hd" style="position:absolute;left:520px;top:2900px;width:440px;transform-origin:90% 10%">' + UI.img(kit, 'stamp.webp', '', 'left:0;top:0;width:440px') + '</div>' +
      '<div class="stamp md-ap" style="left:430px;top:3020px;font-size:84px;transform-origin:50% 50%">Approve</div>',
      3400, slots, 'soft', UI.ghost('Pick', -60, 1250, 460));
    const q = this.v.q;
    this.t = q('.md-t').style; this.k = q('.md-k').style; this.jb = q('.md-jb').style; this.sl = [...kit.stage.querySelectorAll('.md-sl')].map(e => e.style);
    this.p = q('.md-p').style; this.a = q('.md-a').style; this.k2 = q('.md-k2').style; this.L = UI.letters(q('.md-l'), 931, 10.0, 0.45);
    this.vv = q('.md-v').style; this.o = q('.md-o').style; this.L2 = UI.letters(q('.md-pl'), 932, 15.15, 0.4); this.cb = q('.md-cb').style;
    this.r = [...kit.stage.querySelectorAll('.md-r')].map(e => e.style); this.x = [...kit.stage.querySelectorAll('.md-x')].map(e => UI.draw(e));
    this.hd = q('.md-hd').style; this.dk = [...kit.stage.querySelectorAll('.md-sl .d')].map(e => e.style); this.tp = [...kit.stage.querySelectorAll('.md-sl .tape')].map(e => e.style); this.ap = q('.md-ap').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.0001);
    UI.slam(this.t, t, 0.42, 0.22, -2, 1.6); this.k.opacity = eo(seg(t, 1.2, 1.5));
    UI.pop(this.jb, t, 1.5, -3); UI.frame(this.jb, t);
    MAKERS.forEach((m, i) => {
      const st = this.sl[i], p = seg(t, m.a - 0.05, m.a + 0.25), o = seg(t, 9.45, 9.65);
      st.opacity = p > 0 && o < 1 ? 1 - o : 0; st.transform = 'translateY(' + (1 - eob(p, 1.3)) * -300 + 'px) scale(' + (1 - 0.2 * ei(o)) + ')';
      this.dk[i].transform = 'rotate(' + (t - m.a) * 210 + 'deg)'; UI.slam(this.tp[i], t, m.a + 0.15, 0.18, i % 2 ? 4 : -4, 1.5);
    });
    UI.slam(this.p, t, 7.6, 0.2, -3, 1.4); UI.slam(this.a, t, 8.45, 0.2, 2, 1.4); const gA = 1 - seg(t, 9.45, 9.65); this.p.opacity *= gA; this.a.opacity *= gA;
    this.k2.opacity = eo(seg(t, 9.9, 10.15)); UI.reveal(this.L, t);
    UI.slam(this.vv, t, 13.2, 0.22, -4, 1.7); UI.slam(this.o, t, 13.8, 0.22, 3, 1.7);
    UI.reveal(this.L2, t); UI.pop(this.cb, t, 15.6, -4); UI.frame(this.cb, t);
    // the plan lists its steps; nothing runs until it is approved
    this.r.forEach((st, i) => { st.opacity = eo(seg(t, 16.3 + i * 0.25, 16.5 + i * 0.25)); });
    const hp = seg(t, 18.0, 18.45), lift = seg(t, 18.75, 19.2);
    this.hd.opacity = hp > 0 ? 1 - lift : 0; this.hd.transform = 'translate(' + lerp(500, 0, eo(hp)) + 'px,' + (lerp(-500, 0, ei(hp)) - 300 * eo(lift)) + 'px) rotate(' + lerp(-20, 0, eo(hp)) + 'deg)';
    UI.slam(this.ap, t, 18.45, 0.12, -6, 1.3);
    this.x.forEach((f, i) => f(eio(seg(t, 18.6 + i * 0.12, 18.75 + i * 0.12))));
    if (t > 0.35 && t < 9.5) UI.punch(this.v.roll, t, [7.6, 8.45], 0.0001); else UI.punch(this.v.roll, t, [13.2, 13.8, 18.45], 0.04);
  },
});
