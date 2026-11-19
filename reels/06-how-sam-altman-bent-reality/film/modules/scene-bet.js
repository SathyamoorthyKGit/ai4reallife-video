const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: -500, z: 1.05, r: -3 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 3.6, from: 0.4, cx: 540, cy: 975, z: 1.05, r: 1 }, { t: 4.0, from: 3.6, cx: 540, cy: 1960, z: 1.0, r: -1 }, { t: 7.2, from: 4.05, cx: 540, cy: 1975, z: 1.02, r: 0 }, { t: 7.6, from: 7.2, cx: 540, cy: 2960, z: 1.0, r: 1 }, { t: 10.85, from: 7.65, cx: 540, cy: 2975, z: 1.02, r: 0 }, { t: 11.2, from: 10.85, cx: 540, cy: 3960, z: 1.05, r: 3, ease: kit.ei }];
kit.scene('bet', {
  init(kit) {
    this.v = UI.build(kit,
      // part 1: August 2022, GPT-4 done
      '<div class="words" style="left:0;top:300px;width:1080px;align-items:center;gap:8px"><p class="sub bt-k">In</p><h1 class="num bt-d" style="font-size:150px;transform-origin:50% 50%">Aug 2022</h1></div>' +
      '<div class="words" style="left:0;top:600px;width:1080px;align-items:center"><span class="tape bl bt-g" style="position:relative;align-self:center;font-size:62px;transform-origin:50% 50%">GPT-4 finished</span></div>' +
      UI.img(kit, 'altman.webp', 'bt-a', 'left:330px;top:760px;width:420px') +
      // part 2: bet the entire company on compute
      '<div class="words" style="left:0;top:1290px;width:1080px;align-items:center;gap:4px"><p class="sub bt-k2">OpenAI bet</p><h1 class="line bt-l" style="font-size:130px">The entire</h1><h1 class="line pink bt-l2" style="font-size:150px">company</h1></div>' +
      '<div class="bt-c" style="position:absolute;left:200px;top:1780px;width:640px;transform-origin:50% 100%">' + UI.img(kit, 'chips.webp', '', 'left:0;top:0;width:640px') + '</div>' +
      '<div class="bt-s" style="position:absolute;left:760px;top:1880px;width:260px">' + UI.img(kit, 'server.webp', '', 'left:0;top:0;width:260px') + '</div>' +
      '<div class="words" style="left:120px;top:2330px"><span class="tape bt-t" style="position:relative;font-size:62px;transform-origin:50% 50%">Massive compute</span></div>' +
      // part 3: before the world knew
      '<div class="words" style="left:0;top:2310px;width:1080px;align-items:center;gap:6px"><p class="sub bt-k3">Before the world knew</p><h1 class="line bt-l3" style="font-size:120px">What GPT-4</h1></div>' +
      '<div class="bt-v" style="position:absolute;left:110px;top:2580px;width:860px;height:500px"></div>' +
      '<div class="words" style="left:0;top:3110px;width:1080px;align-items:center"><span class="tape pk bt-t2" style="position:relative;align-self:center;font-size:62px;transform-origin:50% 50%">could do</span></div>' +
      '<div class="qm bt-q" style="left:830px;top:2490px">?</div>',
      4000, '', 'dark', UI.ghost('All in', -60, 1500, 360));
    const q = this.v.q;
    this.k = q('.bt-k').style; this.d = q('.bt-d').style; this.g = q('.bt-g').style; this.a = q('.bt-a').style;
    this.k2 = q('.bt-k2').style; this.L = UI.letters(q('.bt-l'), 631, 4.4, 0.4).concat(UI.letters(q('.bt-l2'), 632, 4.95, 0.4));
    this.c = q('.bt-c').style; this.s = q('.bt-s').style; this.t = q('.bt-t').style;
    this.k3 = q('.bt-k3').style; this.L3 = UI.letters(q('.bt-l3'), 633, 8.6, 0.4);
    this.vid = UI.vid(kit, q('.bt-v'), 'clip-data.mp4', 81); this.vs = q('.bt-v').style; this.t2 = q('.bt-t2').style; this.q = q('.bt-q').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.15, 0.35)); UI.slam(this.d, t, 0.4, 0.22, -2, 1.5);
    UI.slam(this.g, t, 2.6, 0.22, -3, 1.6);
    const ap = seg(t, 1.6, 2.0); this.a.opacity = ap > 0 ? 1 : 0; this.a.transform = 'translateY(' + lerp(300, 0, eob(ap, 1.2)) + 'px) rotate(' + (2 + Math.sin(t * 1.2)) + 'deg)';
    this.k2.opacity = eo(seg(t, 3.95, 4.25)); UI.reveal(this.L, t);
    // all the chips pushed in on "company"
    const cp = seg(t, 5.0, 5.5); this.c.opacity = t >= 4.1 ? 1 : 0;
    this.c.transform = 'translateY(' + (lerp(420, 0, eo(seg(t, 4.1, 4.6))) + lerp(0, -60, eob(cp, 1.6))) + 'px) scale(' + lerp(1, 1.08, eob(cp, 1.6)) + ')';
    const sp = seg(t, 6.4, 6.75); this.s.opacity = sp > 0 ? 1 : 0; this.s.transform = 'translateX(' + lerp(500, 0, eob(sp, 1.3)) + 'px) rotate(4deg)';
    UI.slam(this.t, t, 6.57, 0.22, -3, 1.6); const gone = 1 - seg(t, 7.25, 7.5); this.t.opacity *= gone; this.c.opacity *= gone; this.s.opacity *= gone;
    this.k3.opacity = eo(seg(t, 7.7, 8.0)); UI.reveal(this.L3, t);
    kit.seek(this.vid, Math.min(4.4, Math.max(0, t - 7.5)));
    const vp = seg(t, 7.5, 7.9); this.vs.opacity = vp > 0 ? 1 : 0; this.vs.transform = 'translateY(' + lerp(220, 0, eob(vp, 1.2)) + 'px) rotate(' + lerp(4, -1, eo(vp)) + 'deg)';
    UI.slam(this.t2, t, 10.1, 0.22, -2, 1.5);
    UI.slam(this.q, t, 9.6, 0.22, 10, 1.8);
    UI.punch(this.v.roll, t, [0.4, 2.6, 5.0, 6.57, 10.1], 0.04);
  },
});
