const { seg, eo, ei, eio, eob, lerp } = kit;
// part 2: each app plugs into the one MCP strip, and its light comes on
const KEYS = [{ t: 0, cx: 540, cy: -500, z: 1.05, r: 3 }, { t: 0.32, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 9.2, from: 0.35, cx: 540, cy: 975, z: 1.03, r: -1 }, { t: 9.55, from: 9.2, cx: 540, cy: 1960, z: 1.0, r: 0 }, { t: 14.05, from: 9.6, cx: 540, cy: 1962, z: 1.01, r: 0 }, { t: 14.4, from: 14.05, cx: 1800, cy: 1962, z: 1.05, r: 5, ease: kit.ei }];
const APPS = [{ l: 'Photoshop', a: 11.18 }, { l: 'Illustrator', a: 12.06 }, { l: 'Premiere', a: 12.83 }, { l: 'After<br>Effects', a: 13.4 }];
kit.scene('mcp', {
  init(kit) {
    const slots = APPS.map((p, i) => '<div class="plg mc-sl' + (i % 2 ? ' p' : '') + '" style="left:' + (70 + i * 240) + 'px"><div class="cd"></div><div class="pr" style="left:62px"></div><div class="pr" style="left:122px"></div><div class="bd">' + p.l + '</div></div>').join('') +
      '<div class="sock mc-sk">' + APPS.map((p, i) => '<i class="led" style="left:' + (113 + i * 240) + 'px"></i>').join('') + '</div>';
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:300px;width:1080px;align-items:center;gap:8px"><span class="tape pk mc-t" style="position:relative;align-self:center;font-size:60px;transform-origin:50% 50%">03 · MCP</span><p class="sub mc-k" style="font-size:40px">Model Context Protocol</p></div>' +
      UI.anim(kit, 'adapter', 'mc-ad', 'left:100px;top:600px', 380) +
      UI.anim(kit, 'strip', 'mc-sp', 'left:520px;top:740px', 470) +
      '<div class="words" style="left:100px;top:1060px"><span class="node mc-n1" style="font-size:40px">An open standard</span></div>' +
      '<div class="words" style="left:100px;top:1140px"><span class="node mc-n2" style="font-size:40px;background:var(--accent)">A shared language</span></div>' +
      // in Adobe's apps
      '<div class="words" style="left:0;top:1290px;width:1080px;align-items:center"><p class="sub mc-k2" style="font-size:40px">Coming to</p></div>' +
      UI.anim(kit, 'mcpstage', 'mc-st', 'left:180px;top:1370px', 720),
      2400, slots, 'spot', UI.ghost('MCP', -40, 1500, 520));
    const q = this.v.q;
    this.t = q('.mc-t').style; this.k = q('.mc-k').style; this.ad = q('.mc-ad').style; this.sp = q('.mc-sp').style;
    this.n1 = q('.mc-n1').style; this.n2 = q('.mc-n2').style; this.k2 = q('.mc-k2').style; this.st = q('.mc-st').style;
    this.sl = [...kit.stage.querySelectorAll('.mc-sl')].map(e => e.style); this.sk = q('.mc-sk').style; this.led = [...kit.stage.querySelectorAll('.mc-sk .led')].map(e => e.style);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.slam(this.t, t, 0.4, 0.22, -2, 1.6); this.k.opacity = eo(seg(t, 1.8, 2.1));
    UI.pop(this.ad, t, 4.5, -6); UI.frame(this.ad, t);
    // the adapter plugs into the strip: one plug, many apps
    const plug = eio(seg(t, 6.95, 7.7)); this.ad.transform += ' translate(' + 60 * plug + 'px,' + 40 * plug + 'px)';
    UI.pop(this.sp, t, 6.8, 3); UI.frame(this.sp, t, 0.4);
    UI.slam(this.n1, t, 4.6, 0.2, -2, 1.4); UI.slam(this.n2, t, 6.0, 0.2, 2, 1.4); const gA = 1 - seg(t, 9.2, 9.4); this.n1.opacity *= gA; this.n2.opacity *= gA;
    this.k2.opacity = eo(seg(t, 9.55, 9.8));
    UI.pop(this.st, t, 9.6, 0, 300); UI.frame(this.st, t);
    const sk = seg(t, 10.7, 11.0), so = seg(t, 14.05, 14.25);
    this.sk.opacity = sk > 0 && so < 1 ? 1 - so : 0; this.sk.transform = 'scaleX(' + eob(sk, 1.2) + ')';
    APPS.forEach((p, i) => {
      const m = seg(t, p.a - 0.32, p.a), jolt = t > p.a ? 7 * Math.exp(-(t - p.a) * 12) * Math.sin((t - p.a) * 40) : 0;
      this.sl[i].opacity = m > 0 && so < 1 ? 1 - so : 0; this.sl[i].transform = 'translateY(' + (lerp(720, 0, eo(m)) + jolt) + 'px)';
      this.led[i].background = t >= p.a ? 'var(--main)' : ''; this.led[i].boxShadow = t >= p.a ? '0 0 14px var(--main)' : '';
    });
    if (t > 9.55 && t < 14.05) this.v.roll.transform = 'none'; else UI.punch(this.v.roll, t, [0.4, 4.6, 6.0, 7.3], 0.04);
  },
});
