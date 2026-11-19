const { seg, eo, ei, eio, eob, lerp } = kit;
// part 1 holds nearly still so the launch-clip slot can be filled in an editor
const KEYS = [{ t: 0, cx: 1700, cy: 960, z: 1.05, r: 5 }, { t: 0.32, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 2.65, from: 0.35, cx: 540, cy: 962, z: 1.01, r: 0 }, { t: 3.0, from: 2.65, cx: 540, cy: 1960, z: 1.0, r: 1 },
  { t: 8.1, from: 3.05, cx: 540, cy: 1970, z: 1.03, r: 0 }, { t: 8.45, from: 8.1, cx: 540, cy: 2960, z: 1.0, r: -1 }, { t: 10.3, from: 8.5, cx: 540, cy: 2965, z: 1.03, r: 0 }, { t: 10.65, from: 10.3, cx: 540, cy: 3960, z: 1.0, r: 1 }, { t: 13.95, from: 10.7, cx: 540, cy: 3970, z: 1.04, r: 0 }, { t: 14.3, from: 13.95, cx: 540, cy: 4960, z: 1.05, r: 3, ease: kit.ei }];
const JOBS = [{ n: 'yarn', x: 60, w: 300, a: 3.5, l: 'Messy' }, { n: 'cabinet', x: 400, w: 260, a: 5.75, l: 'Big codebases' }, { n: 'brain.webp', x: 720, w: 270, a: 6.93, l: 'Deep analysis' }];
kit.scene('fable', {
  init(kit) {
    const jobs = JOBS.map(j => (j.n.endsWith('.webp') ? UI.img(kit, j.n, 'fb-j', 'left:' + j.x + 'px;top:1960px;width:' + j.w + 'px') : UI.anim(kit, j.n, 'fb-j', 'left:' + j.x + 'px;top:1960px', j.w)) +
      '<div class="words fb-jl" style="left:' + (j.x + j.w / 2 - 170) + 'px;top:1900px;width:340px;align-items:center"><span class="node" style="font-size:30px;background:var(--main)">' + j.l + '</span></div>').join('');
    this.v = UI.build(kit,
      // the heavy lifter
      '<div class="words" style="left:0;top:290px;width:1080px;align-items:center"><h1 class="num fb-n" style="font-size:140px;transform-origin:50% 50%;color:var(--main)">Fable 5.2</h1></div>' +
      '<div class="words" style="left:0;top:1270px;width:1080px;align-items:center"><span class="tape pk fb-t" style="position:relative;align-self:center;font-size:62px;transform-origin:50% 50%">The heavy lifter</span></div>' +
      // the hardest jobs
      '<div class="words" style="left:0;top:1300px;width:1080px;align-items:center"><span class="tag fb-g" style="position:relative;align-self:center;font-size:40px">Long, multi-step projects</span></div>' +
      UI.anim(kit, 'crane', 'fb-c', 'left:260px;top:1390px', 560) + jobs +
      // when the others get stuck
      '<div class="words" style="left:0;top:2290px;width:1080px;align-items:center;gap:6px"><p class="sub fb-k">When the other models</p><h1 class="line fb-l" style="font-size:150px">Get stuck</h1></div>' +
      UI.anim(kit, 'car', 'fb-car', 'left:240px;top:2620px', 600) + UI.anim(kit, 'yarn', 'fb-y', 'left:420px;top:2560px', 320) +
      // priciest
      '<div class="words" style="left:0;top:3290px;width:1080px;align-items:center;gap:6px"><h1 class="line pink fb-l2" style="font-size:160px">Priciest</h1><p class="sub fb-k2">on your usage</p></div>' +
      UI.anim(kit, 'pump', 'fb-p', 'left:340px;top:3600px', 340) +
      '<div class="stamp fb-d" style="left:690px;top:3700px;font-size:110px;transform-origin:50% 50%">$$$</div>' +
      '<div class="words" style="left:0;top:4160px;width:1080px;align-items:center"><span class="tape fb-w" style="position:relative;align-self:center;font-size:66px;transform-origin:50% 50%">Don’t waste it</span></div>',
      5000, UI.slot('Fable 5.2<br>launch clip', 330, 470, 420, 746, 'photo fb-sl'), 'dark', UI.ghost('Heavy', -60, 1250, 460));
    const q = this.v.q;
    this.n = q('.fb-n').style; this.t = q('.fb-t').style; this.sl = q('.fb-sl').style;
    this.g = q('.fb-g').style; this.c = q('.fb-c').style; this.j = [...kit.stage.querySelectorAll('.fb-j')].map(e => e.style); this.jl = [...kit.stage.querySelectorAll('.fb-jl')].map(e => e.style);
    this.k = q('.fb-k').style; this.L = UI.letters(q('.fb-l'), 831, 9.0, 0.4); this.car = q('.fb-car').style; this.y = q('.fb-y').style;
    this.L2 = UI.letters(q('.fb-l2'), 832, 10.75, 0.4); this.k2 = q('.fb-k2').style; this.p = q('.fb-p').style; this.d = q('.fb-d').style; this.w = q('.fb-w').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.0001);
    UI.slam(this.n, t, 0.22, 0.22, -2, 1.6); UI.slotAnim(this.sl, t, 0.3, 2.7);
    UI.slam(this.t, t, 1.5, 0.22, -3, 1.6); this.t.opacity *= 1 - seg(t, 2.7, 2.9);
    UI.slam(this.g, t, 3.0, 0.2, -2, 1.4);
    const cp = seg(t, 2.95, 3.3); this.c.opacity = cp > 0 ? 1 : 0; this.c.transform = 'translateY(' + lerp(-400, 0, eob(cp, 1.2)) + 'px)'; UI.frame(this.c, t);
    JOBS.forEach((j, i) => {
      const p = seg(t, j.a - 0.1, j.a + 0.25); this.j[i].opacity = p > 0 ? 1 : 0;
      this.j[i].transform = 'translateY(' + lerp(300, 0, eob(p, 1.3)) + 'px) rotate(' + [-4, 2, 4][i] + 'deg)'; if (i < 2) UI.frame(this.j[i], t, i * 0.4);
      UI.slam(this.jl[i], t, j.a + 0.1, 0.2, [-3, 2, -2][i], 1.5); const gB = 1 - seg(t, 8.15, 8.35); this.j[i].opacity *= gB; this.jl[i].opacity *= gB;
    });
    // a smaller model stuck in the tangle
    this.k.opacity = eo(seg(t, 8.45, 8.7)); UI.reveal(this.L, t);
    const sh = t > 8.5 && t < 10.3 ? Math.sin(t * 38) * 6 : 0;
    this.car.opacity = t >= 8.3 ? 1 : 0; this.car.transform = 'translateX(' + sh + 'px)'; UI.frame(this.car, t);
    this.y.opacity = t >= 8.3 ? 1 : 0; this.y.transform = 'scale(' + (1 + 0.04 * Math.sin(t * 6)) + ')'; UI.frame(this.y, t, 0.4);
    UI.reveal(this.L2, t); this.k2.opacity = eo(seg(t, 11.3, 11.55));
    const pp = seg(t, 10.7, 11.0); this.p.opacity = pp > 0 ? 1 : 0; this.p.transform = 'translateY(' + lerp(300, 0, eob(pp, 1.2)) + 'px)'; UI.frame(this.p, t);
    UI.slam(this.d, t, 11.9, 0.22, 10, 1.9);
    UI.slam(this.w, t, 13.0, 0.22, -3, 1.6);
    if (t > 0.35 && t < 2.65) this.v.roll.transform = 'none'; else UI.punch(this.v.roll, t, [3.0, 5.75, 6.93, 11.9, 13.0], 0.04);
  },
});
