const { seg, eo, ei, eio, eob, lerp } = kit;
// part 2: three step cards flip down and arrows pass the job from app to app
const KEYS = [{ t: 0, cx: 1700, cy: 960, z: 1.05, r: 5 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 7.85, from: 0.4, cx: 540, cy: 975, z: 1.03, r: 1 }, { t: 8.2, from: 7.85, cx: 540, cy: 1960, z: 1.0, r: 0 }, { t: 13.05, from: 8.25, cx: 540, cy: 1962, z: 1.01, r: 0 }, { t: 13.3, from: 13.05, cx: -700, cy: 1962, z: 1.05, r: -5, ease: kit.ei }];
const LAYERS = ['Title', 'Logo', 'Subject', 'Background'];
const CHAIN = [{ l: 'Google Docs', x: 90, a: 8.4, n: 'Read the brief' }, { l: 'Premiere', x: 400, a: 10.6, n: 'Build the edit' }, { l: 'Slack', x: 710, a: 12.1, n: 'Post it' }];
kit.scene('chain', {
  init(kit) {
    const layers = LAYERS.map((l, i) => '<div class="ch-ly" style="position:absolute;left:560px;top:' + (800 + i * 76) + 'px;width:420px;height:64px;border-radius:8px;background:#fff;border:3px solid var(--second);box-sizing:border-box;display:flex;align-items:center;gap:16px;padding:0 18px;font-family:\'Regarn-700\';font-size:30px"><span class="ch-eye" style="width:22px;height:22px;border-radius:50%;background:var(--main)"></span>' + l + '</div>').join('');
    const XS = [90, 415, 740];
    const slots = CHAIN.map((c, i) => '<div class="dc ch-sl' + (i % 2 ? ' b' : '') + '" style="left:' + XS[i] + 'px;top:560px"><div class="pp"><div class="st"></div><small>Step ' + (i + 1) + '</small><b>' + c.l.replace(' ', '<br>') + '</b></div><div class="fold"></div></div>').join('') +
      '<svg class="art ch-sv" viewBox="0 0 1080 1920" style="width:1080px;height:1920px"><path class="pk-line ch-a" d="M342 640 Q378 596 408 636" style="stroke-width:8"/>' + UI.arrowHead(408, 636, 53, 'pk-line ch-h') + '<path class="pk-line ch-a" d="M667 640 Q703 596 733 636" style="stroke-width:8"/>' + UI.arrowHead(733, 636, 53, 'pk-line ch-h') + '</svg>';
    const nodes = CHAIN.map(c => '<div class="words ch-n" style="left:' + c.x + 'px;top:1750px;width:280px;align-items:center"><span class="node" style="font-size:30px">' + c.n + '</span></div>').join('');
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:300px;width:1080px;align-items:center;gap:6px"><p class="sub ch-k" style="font-size:40px">The assistant you already use</p><h1 class="line ch-l" style="font-size:82px">Edits your files</h1></div>' +
      UI.img(kit, 'computer.webp', 'ch-pc', 'left:70px;top:720px;width:440px') +
      '<div class="panel ch-pn" style="left:540px;top:700px;width:460px;height:420px"><div class="lbl" style="position:absolute;left:24px;top:30px">Layers</div></div>' + layers +
      '<div class="words" style="left:0;top:1150px;width:1080px;align-items:center"><span class="tape pk ch-t" style="position:relative;align-self:center;font-size:52px;transform-origin:50% 50%">Still editable</span></div>' +
      // the chain
      '<div class="words" style="left:0;top:1290px;width:1080px;align-items:center"><p class="sub ch-k2" style="font-size:40px">For example</p></div>' +
      UI.anim(kit, 'dominoes', 'ch-dm', 'left:260px;top:1830px', 560) + nodes +
      '<div class="words" style="left:0;top:2190px;width:1080px;align-items:center"><span class="tag ch-pv" style="position:relative;align-self:center;font-size:28px">Preview · reported for early 2027</span></div>',
      3100, slots, 'window', UI.ghost('Chain', -60, 1240, 440));
    const q = this.v.q;
    this.k = q('.ch-k').style; this.L = UI.letters(q('.ch-l'), 941, 1.9, 0.4); this.pc = q('.ch-pc').style; this.pn = q('.ch-pn').style;
    this.ly = [...kit.stage.querySelectorAll('.ch-ly')].map(e => e.style); this.t = q('.ch-t').style;
    this.k2 = q('.ch-k2').style; this.sl = [...kit.stage.querySelectorAll('.ch-sl')].map(e => e.style); this.dm = q('.ch-dm').style;
    this.n = [...kit.stage.querySelectorAll('.ch-n')].map(e => e.style); this.sv = q('.ch-sv').style;
    this.ar = [...kit.stage.querySelectorAll('.ch-a')].map(e => UI.draw(e)); this.hh = [...kit.stage.querySelectorAll('.ch-h')].map(e => e.style); this.pv = q('.ch-pv').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.0001);
    this.k.opacity = eo(seg(t, 0.2, 0.5)); UI.reveal(this.L, t);
    UI.pop(this.pc, t, 0.6, -3); UI.pop(this.pn, t, 1.0, 2, 200); const gA = 1 - seg(t, 7.9, 8.1); this.pc.opacity *= gA; this.pn.opacity *= gA;
    // the layers stay live: each one is edited in turn and keeps its row
    this.ly.forEach((st, i) => { const p = seg(t, 1.2 + i * 0.1, 1.45 + i * 0.1), hit = Math.exp(-Math.max(0, t - (5.3 + i * 0.45)) * 5) * (t > 5.3 + i * 0.45 ? 1 : 0); st.opacity = p > 0 ? 1 : 0; st.transform = 'translateX(' + lerp(200, 0, eo(p)) + 'px) scale(' + (1 + 0.06 * hit) + ')'; st.opacity *= gA; st.background = hit > 0.05 ? 'color-mix(in srgb, var(--main) ' + Math.round(45 * hit) + '%, #fff)' : '#fff'; });
    UI.slam(this.t, t, 5.6, 0.22, -2, 1.6); this.t.opacity *= 1 - seg(t, 7.8, 8.0);
    this.k2.opacity = eo(seg(t, 8.0, 8.3));
    const co = seg(t, 13.05, 13.25);
    [10.25, 11.75].forEach((a, i) => { const p = eio(seg(t, a, a + 0.3)); this.ar[i](p); this.hh[i].opacity = p > 0.9 ? 1 : 0; }); this.sv.opacity = 1 - co;
    CHAIN.forEach((c, i) => { const fp = seg(t, c.a, c.a + 0.4); this.sl[i].opacity = fp > 0 && co < 1 ? 1 - co : 0; this.sl[i].transform = 'perspective(900px) rotateX(' + lerp(-95, 0, eob(fp, 1.5)) + 'deg) scale(' + (1 - 0.2 * ei(co)) + ')'; UI.slam(this.n[i], t, c.a + 0.1, 0.2, [-2, 2, -2][i], 1.4); });
    UI.pop(this.dm, t, 8.3, 0, 200); UI.frame(this.dm, t);
    UI.slam(this.pv, t, 12.3, 0.2, 0, 1.3);
    if (t > 8.2 && t < 13.05) this.v.roll.transform = 'none'; else UI.punch(this.v.roll, t, [5.6], 0.04);
  },
});
