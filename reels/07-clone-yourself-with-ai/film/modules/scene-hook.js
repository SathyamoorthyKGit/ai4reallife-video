const { seg, eo, ei, eio, eob, lerp } = kit;
// frame 0 is already moving: the copier is running and the scan line is on its way down
const KEYS = [{ t: 0, cx: 420, cy: 880, z: 1.3, r: -3 }, { t: 0.35, from: 0.2, cx: 540, cy: 900, z: 1.0, r: 0, ease: kit.eox }, { t: 2.25, from: 0.4, cx: 540, cy: 920, z: 1.04, r: 1 }, { t: 2.6, from: 2.25, cx: 540, cy: 2060, z: 1.0, r: -1 }, { t: 4.4, from: 2.65, cx: 540, cy: 2065, z: 1.03, r: 0 }, { t: 4.75, from: 4.4, cx: 1800, cy: 2065, z: 1.05, r: 5, ease: kit.ei }];
const MEN = [90, 320, 550, 780];
kit.scene('hook', {
  init(kit) {
    const men = MEN.map((x, i) => UI.anim(kit, 'worker', 'hk-m', 'left:' + x + 'px;top:1600px', 190)).join('');
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:300px;width:1080px;align-items:center;gap:6px"><h1 class="line hk-l" style="font-size:92px">Clone yourself</h1><h1 class="line pink hk-l2" style="font-size:130px">with AI</h1></div>' +
      UI.anim(kit, 'copier', 'hk-cp', 'left:60px;top:600px', 440) +
      UI.anim(kit, 'worker', 'hk-w', 'left:600px;top:620px', 190) +
      '<div class="scan hk-sc" style="left:560px;top:0;width:280px"></div>' +
      men +
      '<div class="words" style="left:0;top:1410px;width:1080px;align-items:center"><span class="stamp hk-s1" style="position:relative;font-size:110px;transform-origin:50% 50%">3 steps</span></div>' +
      '<div class="words" style="left:0;top:2250px;width:1080px;align-items:center"><span class="stamp solid hk-s2" style="position:relative;font-size:110px;transform-origin:50% 50%">10 min</span></div>',
      2700, '', 'window', UI.ghost('Clone', -60, 1250, 440));
    const q = this.v.q;
    this.L = UI.letters(q('.hk-l'), 701, 0.5, 0.45).concat(UI.letters(q('.hk-l2'), 702, 1.2, 0.35));
    this.cp = q('.hk-cp').style; this.w = q('.hk-w').style; this.sc = q('.hk-sc').style;
    this.m = [...kit.stage.querySelectorAll('.hk-m')].map(e => e.style); this.s1 = q('.hk-s1').style; this.s2 = q('.hk-s2').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.0001);
    UI.reveal(this.L, t);
    UI.frame(this.cp, t, 0.12); UI.frame(this.w, t);
    this.cp.transform = 'rotate(-2deg) translateY(' + (t > 1.0 && t < 1.7 ? Math.sin(t * 70) * 3 : 0) + 'px)';
    // one scan pass down the man, then the copies shoot out of the tray and land in a row below
    const sp = seg(t, 0.0, 0.9); this.sc.opacity = t < 0.95 ? 0.9 : 0; this.sc.transform = 'translateY(' + lerp(560, 1150, eio(sp)) + 'px)';
    this.m.forEach((st, i) => {
      const p = seg(t, 1.05 + i * 0.14, 1.75 + i * 0.14); st.opacity = p > 0 ? 1 : 0;
      st.transform = 'translate(' + lerp(420 - MEN[i], 0, eo(p)) + 'px,' + lerp(-640, 0, eob(p, 1.1)) + 'px) rotate(' + lerp(-40 + i * 20, [-3, 2, -2, 3][i], eo(p)) + 'deg) scale(' + lerp(0.4, 1, eo(p)) + ')';
      UI.frame(st, t, i * 0.3);
    });
    UI.slam(this.s1, t, 2.47, 0.22, -5, 1.8);
    UI.slam(this.s2, t, 3.52, 0.22, 4, 1.8);
    UI.punch(this.v.roll, t, [1.2, 2.47, 3.52], 0.045);
  },
});
