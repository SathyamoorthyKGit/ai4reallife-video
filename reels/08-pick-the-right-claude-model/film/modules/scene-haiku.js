const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 1700, cy: 960, z: 1.05, r: 5 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 5.55, from: 0.4, cx: 540, cy: 975, z: 1.03, r: -1 }, { t: 5.9, from: 5.55, cx: 540, cy: 1960, z: 1.0, r: 1 }, { t: 8.55, from: 5.95, cx: 540, cy: 1970, z: 1.03, r: 0 }, { t: 8.9, from: 8.55, cx: 540, cy: 2960, z: 1.05, r: 3, ease: kit.ei }];
const TASKS = [{ l: 'Rewrite a text', a: 2.16 }, { l: 'Sort a list', a: 3.29 }, { l: 'Pull details', a: 4.4 }];
kit.scene('haiku', {
  init(kit) {
    const tasks = TASKS.map((k, i) => '<div class="words" style="left:500px;top:' + (770 + i * 120) + 'px"><span class="node hk-t" style="font-size:40px;padding-left:66px">' + k.l + '</span></div>').join('');
    const ticks = TASKS.map((k, i) => '<path class="pk-line hk-x" d="M520 ' + (802 + i * 120) + ' l14 16 l26 -32" style="stroke-width:9"/>').join('');
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:340px;width:1080px;align-items:center;gap:14px"><h1 class="line hk-l" style="font-size:190px">Haiku</h1><span class="tape pk hk-g" style="position:relative;align-self:center;font-size:58px;transform-origin:50% 50%">Quick tasks</span></div>' +
      UI.anim(kit, 'knife', 'hk-k', 'left:70px;top:720px', 400) +
      tasks + '<svg class="art" viewBox="0 0 1080 1200" style="height:1200px">' + ticks + '</svg>' +
      '<div class="words" style="left:0;top:1320px;width:1080px;align-items:center"><h1 class="line hk-l2" style="font-size:110px">Fast answers</h1></div>' +
      UI.anim(kit, 'bird', 'hk-b', 'left:380px;top:1470px', 340) +
      '<div class="words" style="left:0;top:1960px;width:1080px;align-items:center"><span class="tape bl hk-z" style="position:relative;align-self:center;font-size:56px;transform-origin:50% 50%">Zero overthinking</span></div>',
      2400, '', 'window', UI.ghost('Quick', -60, 1250, 460));
    const q = this.v.q;
    this.L = UI.letters(q('.hk-l'), 811, 0.25, 0.4); this.g = q('.hk-g').style; this.k = q('.hk-k').style;
    this.t = [...kit.stage.querySelectorAll('.hk-t')].map(e => e.style); this.x = [...kit.stage.querySelectorAll('.hk-x')].map(e => UI.draw(e));
    this.L2 = UI.letters(q('.hk-l2'), 812, 6.0, 0.4); this.b = q('.hk-b').style; this.z = q('.hk-z').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.reveal(this.L, t); UI.slam(this.g, t, 1.0, 0.22, -3, 1.6);
    // the knife flicks open
    const kp = seg(t, 0.55, 0.9); this.k.opacity = kp > 0 ? 1 : 0; UI.frame(this.k, t);
    this.k.transform = 'rotate(' + lerp(-120, -6, eob(kp, 1.5)) + 'deg) scale(' + lerp(0.5, 1, eo(kp)) + ')';
    TASKS.forEach((k, i) => { UI.slam(this.t[i], t, k.a, 0.2, [-2, 1, -1][i], 1.4); this.t[i].opacity *= 1 - seg(t, 5.5, 5.7); this.x[i](eio(seg(t, k.a + 0.3, k.a + 0.5))); });
    UI.reveal(this.L2, t);
    // the hummingbird zips across and hovers
    const bp = seg(t, 6.0, 6.5); this.b.opacity = bp > 0 ? 1 : 0; UI.frame(this.b, t);
    this.b.transform = 'translate(' + (lerp(-800, 0, eo(bp)) + Math.sin(t * 9) * 6) + 'px,' + Math.sin(t * 7) * 10 + 'px)';
    UI.slam(this.z, t, 7.22, 0.22, -2, 1.6);
    UI.punch(this.v.roll, t, [1.0, 2.16, 3.29, 4.4, 7.22], 0.035);
  },
});
