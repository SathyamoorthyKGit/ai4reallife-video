const { seg, eo, ei, eio, eob, lerp } = kit;
// part 1: the agent's cursor visits each app window and switches the agent on
const KEYS = [{ t: 0, cx: 540, cy: -500, z: 1.05, r: 3 }, { t: 0.32, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 7.6, from: 0.35, cx: 540, cy: 962, z: 1.01, r: 0 }, { t: 7.95, from: 7.6, cx: 540, cy: 1960, z: 1.0, r: 1 }, { t: 16.65, from: 8.0, cx: 540, cy: 1970, z: 1.03, r: 0 }, { t: 17.0, from: 16.65, cx: -700, cy: 1970, z: 1.05, r: -5, ease: kit.ei }];
const APPS = [{ l: 'Photoshop', a: 2.94 }, { l: 'Premiere', a: 3.77 }, { l: 'Illustrator', a: 4.59 }, { l: 'InDesign', a: 5.64 }, { l: 'After Effects', a: 6.27 }];
const CLIPS = [[110, 140], [260, 190], [460, 120], [590, 210], [810, 170]];
kit.scene('agent', {
  init(kit) {
    const slots = APPS.map((p, i) => '<div class="awin ag-sl' + (i % 2 ? ' b' : '') + '" style="left:' + (110 + (i % 3) * 300) + 'px;top:' + (640 + Math.floor(i / 3) * 210) + 'px"><div class="wbar"><i></i><i></i><i></i></div><b style="font-size:' + (p.l.length > 11 ? 26 : p.l.length > 9 ? 29 : 32) + 'px">' + p.l + '</b><div class="row">Agent<span class="tg"><i></i></span></div></div>').join('') +
      '<div class="cring ag-rg"></div><svg class="cur ag-cu" viewBox="0 0 40 56"><path d="M3 3 L3 45 L13 35 L21 52 L29 48 L21 32 L36 32 Z" style="fill:var(--accent);stroke:#fff;stroke-width:3;stroke-linejoin:round"/></svg><span class="curtag ag-ct">AI agent</span>';
    const clips = CLIPS.map(([x, w], i) => '<div class="tclip ag-c" style="left:' + x + 'px;top:' + (1600 + (i % 2) * 140) + 'px;width:' + (w - 10) + 'px"></div>').join('');
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:300px;width:1080px;align-items:center;gap:10px"><span class="tape pk ag-t" style="position:relative;align-self:center;font-size:46px;transform-origin:50% 50%">01 · An agent in every app</span><p class="sub ag-k">Adobe’s Creative Agent</p></div>' +
      '<div class="words" style="left:0;top:1110px;width:1080px;align-items:center"><span class="stamp ag-b" style="position:relative;font-size:72px;transform-origin:50% 50%">In beta</span></div>' +
      // in Premiere: a paper timeline
      '<div class="words" style="left:0;top:1300px;width:1080px;align-items:center;gap:6px"><p class="sub ag-k2">In Premiere, ask it to</p></div>' +
      '<div class="panel ag-tl" style="left:80px;top:1560px;width:920px;height:330px"></div>' + clips +
      '<div class="ag-pl" style="position:absolute;left:100px;top:1570px;width:6px;height:310px;background:var(--main)"></div>' +
      '<div class="ag-tr" style="position:absolute;left:600px;top:1610px;width:110px;height:100px;border:5px dashed var(--accent);box-sizing:border-box"></div>' +
      '<div class="words" style="left:110px;top:1930px"><span class="node ag-n1" style="font-size:38px;background:var(--main)">Effect on every clip</span></div>' +
      '<div class="words" style="left:110px;top:2010px"><span class="node ag-n2" style="font-size:38px;background:var(--accent)">Track a masked subject</span></div>' +
      '<div class="words" style="left:110px;top:2090px"><span class="node ag-n3" style="font-size:38px">Fix colour + exposure</span></div>' +
      '<div class="ag-sb" style="position:absolute;left:640px;top:2110px;width:340px;height:10px;border-radius:5px;background:color-mix(in srgb, var(--second) 30%, var(--ground))"></div><div class="ag-kn" style="position:absolute;left:640px;top:2098px;width:34px;height:34px;border-radius:50%;background:var(--main)"></div>',
      2400, slots, 'window', UI.ghost('Agent', -60, 1240, 440));
    const q = this.v.q;
    this.t = q('.ag-t').style; this.k = q('.ag-k').style; this.sl = [...kit.stage.querySelectorAll('.ag-sl')].map(e => e.style); this.b = q('.ag-b').style;
    this.k2 = q('.ag-k2').style; this.tl = q('.ag-tl').style; this.c = [...kit.stage.querySelectorAll('.ag-c')].map(e => e.style);
    this.pl = q('.ag-pl').style; this.tr = q('.ag-tr').style; this.n = ['.ag-n1', '.ag-n2', '.ag-n3'].map(s => q(s).style);
    this.tg = [...kit.stage.querySelectorAll('.ag-sl .tg')].map(e => e.style); this.tk = [...kit.stage.querySelectorAll('.ag-sl .tg i')].map(e => e.style);
    this.cu = q('.ag-cu').style; this.ct = q('.ag-ct').style; this.rg = q('.ag-rg').style; this.sb = q('.ag-sb').style; this.kn = q('.ag-kn').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.0001);
    UI.slam(this.t, t, 0.3, 0.22, -2, 1.6); this.k.opacity = eo(seg(t, 1.0, 1.3));
    let cx = 1160, cy = 1260, last = -9, rx = 0, ry = 0;
    APPS.forEach((p, i) => {
      UI.card(this.sl[i], t, p.a, 7.6, i % 2 ? 3 : -3, 0);
      const on = eo(seg(t, p.a + 0.3, p.a + 0.5)); this.tg[i].background = on > 0 ? 'color-mix(in srgb, var(--main) ' + Math.round(100 * on) + '%, #c9c9c9)' : ''; this.tk[i].transform = 'translateX(' + 28 * on + 'px)';
      const tx = 110 + (i % 3) * 300 + 183, ty = 640 + Math.floor(i / 3) * 210 + 140, m = eio(seg(t, p.a - 0.42, p.a - 0.04));
      cx = lerp(cx, tx, m); cy = lerp(cy, ty, m); if (t >= p.a + 0.25) { last = p.a + 0.25; rx = tx; ry = ty; }
    });
    const gone = eio(seg(t, 7.2, 7.6)); cx = lerp(cx, 1250, gone); cy = lerp(cy, 1300, gone);
    const click = APPS.some(p => t > p.a + 0.2 && t < p.a + 0.32) ? 0.82 : 1, vis = t > 2.4 && t < 7.6 ? 1 : 0;
    this.cu.opacity = this.ct.opacity = vis; this.cu.transform = 'translate(' + (cx - 4) + 'px,' + (cy - 4) + 'px) scale(' + click + ')'; this.ct.transform = 'translate(' + (cx - 160) + 'px,' + (cy + 46) + 'px)';
    const rp = seg(t, last, last + 0.4); this.rg.opacity = rp > 0 && rp < 1 && t < 7.6 ? 1 - rp : 0; this.rg.transform = 'translate(' + rx + 'px,' + ry + 'px) scale(' + lerp(0.3, 1.5, eo(rp)) + ')';
    UI.slam(this.b, t, 7.35, 0.2, -6, 1.8); this.b.opacity *= 1 - seg(t, 7.75, 7.95);
    this.k2.opacity = eo(seg(t, 8.2, 8.5));
    const tp = seg(t, 8.0, 8.35); this.tl.opacity = tp > 0 ? 1 : 0;
    // effect cascades clip to clip, then a tracking box, then colour corrects across the sequence
    this.c.forEach((st, i) => {
      const p = seg(t, 8.3 + i * 0.06, 8.6 + i * 0.06), fx = seg(t, 9.85 + i * 0.12, 10.05 + i * 0.12), cc = seg(t, 13.4 + i * 0.1, 13.7 + i * 0.1);
      st.opacity = p > 0 ? 1 : 0; st.transform = 'scaleY(' + eob(p, 1.4) + ')';
      st.background = cc > 0 ? 'color-mix(in srgb, var(--accent) ' + Math.round(55 * cc) + '%, #fff)' : fx > 0 ? 'color-mix(in srgb, var(--main) ' + Math.round(70 * fx) + '%, #fff)' : '';
    });
    this.pl.opacity = t >= 9.7 ? 1 : 0; this.pl.transform = 'translateX(' + 860 * eio(seg(t, 9.75, 10.5)) + 'px)';
    const trp = seg(t, 11.7, 12.1); this.tr.opacity = trp > 0 && t < 13.3 ? 1 : 0; this.tr.transform = 'translate(' + (Math.sin((t - 11.7) * 3) * 60) + 'px,' + (Math.cos((t - 11.7) * 4) * 10) + 'px)';
    UI.slam(this.n[0], t, 9.85, 0.2, -2, 1.4); UI.slam(this.n[1], t, 11.7, 0.2, 1, 1.4); UI.slam(this.n[2], t, 13.3, 0.2, -1, 1.4);
    this.sb.opacity = this.kn.opacity = t >= 13.3 ? 1 : 0; this.kn.transform = 'translateX(' + 260 * eio(seg(t, 13.5, 15.0)) + 'px)';
    if (t > 0.35 && t < 7.6) this.v.roll.transform = 'none'; else UI.punch(this.v.roll, t, [7.35, 9.85, 11.7, 13.3], 0.035);
  },
});
