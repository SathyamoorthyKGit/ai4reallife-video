const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: -500, z: 1.05, r: 3 }, { t: 0.32, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 3.1, from: 0.35, cx: 540, cy: 975, z: 1.03, r: 1 }, { t: 3.45, from: 3.1, cx: 540, cy: 1960, z: 1.0, r: -1 }, { t: 8.05, from: 3.5, cx: 540, cy: 1970, z: 1.03, r: 0 }, { t: 8.4, from: 8.05, cx: -700, cy: 1970, z: 1.05, r: -5, ease: kit.ei }];
const USE = [{ n: 'typist', x: 50, w: 320, l: 'Writing', a: 3.72, anim: 1 }, { n: 'books', x: 410, w: 250, l: 'Research', a: 4.43, anim: 1 }, { n: 'computer.webp', x: 700, w: 310, l: 'Coding', a: 5.11 }];
kit.scene('daily', {
  init(kit) {
    const use = USE.map(u => (u.anim ? UI.anim(kit, u.n, 'dy-u', 'left:' + u.x + 'px;top:1500px', u.w) : UI.img(kit, u.n, 'dy-u', 'left:' + u.x + 'px;top:1520px;width:' + u.w + 'px')) +
      '<div class="words dy-ul" style="left:' + (u.x + u.w / 2 - 160) + 'px;top:1890px;width:320px;align-items:center"><span class="node" style="font-size:38px">' + u.l + '</span></div>').join('');
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:330px;width:1080px;align-items:center;gap:4px"><h1 class="line dy-l" style="font-size:120px">Sonnet 5.5</h1><p class="sub dy-k">and</p><h1 class="line pink dy-l2" style="font-size:120px">Opus 5.5</h1></div>' +
      UI.anim(kit, 'car', 'dy-c', 'left:220px;top:720px', 640) +
      '<div class="words" style="left:0;top:1050px;width:1080px;align-items:center"><span class="tape bl dy-t" style="position:relative;align-self:center;font-size:70px;transform-origin:50% 50%">Daily drivers</span></div>' +
      use +
      '<div class="words" style="left:0;top:2010px;width:1080px;align-items:center;gap:16px"><span class="stamp solid dy-s" style="position:relative;font-size:52px;transform-origin:50% 50%">Unsure? Start with Opus</span><span class="tag dy-f" style="position:relative;align-self:center;font-size:28px">Free plan? Start with Sonnet</span></div>',
      2400, '', 'soft', UI.ghost('Drive', -60, 1250, 460));
    const q = this.v.q;
    this.L = UI.letters(q('.dy-l'), 821, 0.15, 0.4).concat(UI.letters(q('.dy-l2'), 822, 0.9, 0.4)); this.k = q('.dy-k').style;
    this.c = q('.dy-c').style; this.t = q('.dy-t').style;
    this.u = [...kit.stage.querySelectorAll('.dy-u')].map(e => e.style); this.ul = [...kit.stage.querySelectorAll('.dy-ul')].map(e => e.style);
    this.s = q('.dy-s').style; this.f = q('.dy-f').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.reveal(this.L, t); this.k.opacity = eo(seg(t, 0.7, 0.9));
    // the daily driver rolls in and settles on its springs
    const cp = seg(t, 1.6, 2.3), bob = t > 2.3 ? Math.sin((t - 2.3) * 12) * 4 * Math.exp(-(t - 2.3) * 3) : 0;
    this.c.opacity = cp > 0 ? 1 : 0; this.c.transform = 'translate(' + lerp(-1100, 0, eo(cp)) + 'px,' + bob + 'px)'; UI.frame(this.c, t);
    UI.slam(this.t, t, 2.3, 0.22, -3, 1.6); this.t.opacity *= 1 - seg(t, 3.05, 3.25);
    USE.forEach((u, i) => {
      const p = seg(t, u.a - 0.1, u.a + 0.25); this.u[i].opacity = p > 0 ? 1 : 0;
      this.u[i].transform = 'translateY(' + lerp(300, 0, eob(p, 1.3)) + 'px) rotate(' + [-3, 2, 3][i] + 'deg)'; if (u.anim) UI.frame(this.u[i], t, i * 0.3);
      UI.slam(this.ul[i], t, u.a + 0.1, 0.2, [-3, 2, -2][i], 1.5);
    });
    UI.slam(this.s, t, 6.04, 0.22, -3, 1.7); UI.slam(this.f, t, 7.9, 0.2, 2, 1.4);
    UI.punch(this.v.roll, t, [2.3, 3.72, 4.43, 5.11, 6.04], 0.035);
  },
});
