const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: -500, z: 1.05, r: -3 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 4.7, from: 0.4, cx: 540, cy: 980, z: 1.04, r: 1 }, { t: 5.95, from: 4.75, cx: 550, cy: 985, z: 1.04, r: -1 }, { t: 6.31, from: 5.95, cx: 540, cy: 990, z: 2.2, r: 0, ease: kit.ei }];
kit.scene('leap', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:330px;width:1080px;align-items:center;gap:6px"><p class="sub lp-k">Those who resist adapting</p><h1 class="line pink lp-l" style="font-size:130px">Left behind</h1></div>' +
      '<div style="position:absolute;left:60px;top:1460px;width:960px;height:6px;background:var(--second)"></div>' +
      UI.img(kit, 'manager.webp', 'lp-m', 'left:560px;top:890px;width:265px') +
      UI.img(kit, 'junior.webp', 'lp-j', 'left:0;top:0;width:380px') +
      '<div class="words" style="left:110px;top:1500px"><span class="tag lp-g">Adaptable, hands-on workers</span></div>' +
      '<div class="words" style="left:590px;top:830px"><span class="tag lp-r" style="background:var(--main);color:#fff;border-color:var(--main)">Resists AI</span></div>',
      2000, '', 'window', UI.ghost('Leapfrog', -60, 1600, 300));
    const q = this.v.q;
    this.k = q('.lp-k').style; this.L = UI.letters(q('.lp-l'), 541, 2.1, 0.4); this.m = q('.lp-m').style; this.j = q('.lp-j').style; this.g = q('.lp-g').style; this.r = q('.lp-r').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.25, 0.55)) * (1 - eo(seg(t, 5.85, 6.0))); this.k.visibility = t > 6.0 ? 'hidden' : 'visible'; UI.reveal(this.L, t);
    const sink = eo(seg(t, 2.2, 3.2));
    this.m.opacity = t >= 0.4 ? lerp(1, 0.55, sink) : 0; this.m.transform = 'translateY(' + (lerp(260, 0, eob(seg(t, 0.4, 0.9), 1.2)) + 40 * sink) + 'px)';
    this.m.filter = 'drop-shadow(20px 28px 16px rgba(0,0,0,.3)) brightness(' + lerp(1, 1.25, sink) + ')';
    UI.slam(this.r, t, 0.6, 0.22, 3, 1.5);
    // the junior runs in, then leapfrogs over the manager on "leapfrog past them"
    const run = eo(seg(t, 3.1, 3.7)), jp = seg(t, 4.9, 5.75);
    const x = lerp(-420, 80, run) + lerp(0, 760, eio(jp)), y = 1050 - Math.sin(jp * Math.PI) * 560;
    this.j.opacity = t >= 3.1 ? 1 : 0; this.j.transform = 'translate(' + x + 'px,' + y + 'px) rotate(' + lerp(0, -10, Math.sin(jp * Math.PI)) + 'deg)';
    this.g.opacity = eo(seg(t, 3.2, 3.5)) * (1 - eo(seg(t, 5.0, 5.3)));
    UI.punch(this.v.roll, t, [0.6, 5.75], 0.035);
  },
});
