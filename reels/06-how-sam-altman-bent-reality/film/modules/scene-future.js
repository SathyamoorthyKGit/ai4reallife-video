const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: -700, cy: 960, z: 1.05, r: -5 }, { t: 0.32, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 3.7, from: 0.35, cx: 540, cy: 975, z: 1.04, r: 1 }, { t: 4.1, from: 3.7, cx: 540, cy: 1960, z: 1.0, r: -1 }, { t: 7.15, from: 4.15, cx: 540, cy: 1970, z: 1.03, r: 0 }, { t: 7.5, from: 7.15, cx: 540, cy: 2960, z: 1.0, r: 1 }, { t: 9.1, from: 7.55, cx: 540, cy: 2950, z: 1.04, r: 0 }];
kit.scene('future', {
  init(kit) {
    this.v = UI.build(kit,
      // part 1: not just chatbots
      '<div class="words" style="left:0;top:330px;width:1080px;align-items:center;gap:18px"><p class="sub fu-k">The ultimate goal</p><span class="tag fu-g" style="position:relative;align-self:center;font-size:40px">Not just chatbots</span></div>' +
      '<svg class="art" viewBox="0 0 1080 1200" style="height:1200px"><path class="pk-line fu-x" d="M350 440 L730 440" style="stroke-width:10"/></svg>' +
      '<div class="words" style="left:0;top:530px;width:1080px;align-items:center"><h1 class="line fu-l" style="font-size:120px">AI machines</h1></div>' +
      UI.img(kit, 'robot3.webp', 'fu-r', 'left:350px;top:700px;width:380px') +
      // part 2: science, math, medicine
      '<div class="words" style="left:0;top:1310px;width:1080px;align-items:center"><span class="tape bl fu-t" style="position:relative;align-self:center;font-size:70px;transform-origin:50% 50%">That discover</span></div>' +
      '<div class="fu-a" style="position:absolute;left:70px;top:1480px;width:340px">' + UI.img(kit, 'atom.webp', '', 'left:0;top:0;width:340px') + '</div>' +
      '<div class="words fu-al" style="left:80px;top:1850px;width:320px;align-items:center"><span class="node" style="font-size:36px">New science</span></div>' +
      '<div class="fu-m" style="position:absolute;left:600px;top:1500px;width:400px;height:300px">' +
        '<div class="eq" style="left:0;top:0;font-size:70px">x² + y² = ?</div><div class="eq" style="left:30px;top:100px;font-size:62px">n × 2 = ?</div><div class="eq" style="left:0;top:190px;font-size:66px">f(x) = ?</div></div>' +
      '<svg class="art fu-ms" viewBox="0 0 1080 2000" style="height:2000px"><path class="pk-line fu-u" d="M590 1810 C 700 1830 860 1815 990 1795" style="stroke-width:9"/></svg>' +
      '<div class="words fu-ml" style="left:640px;top:1850px;width:320px;align-items:center"><span class="node" style="font-size:36px">Math</span></div>' +
      '<div class="fu-p" style="position:absolute;left:330px;top:1930px;width:420px">' + UI.img(kit, 'pills.webp', '', 'left:0;top:0;width:420px') + '</div>' +
      '<div class="words fu-pl" style="left:380px;top:2280px;width:320px;align-items:center"><span class="node" style="font-size:36px;background:var(--main)">Medicine</span></div>' +
      // part 3: transform humanity
      '<div class="words" style="left:0;top:2290px;width:1080px;align-items:center;gap:6px"><p class="sub fu-k3">To transform</p><h1 class="line pink fu-l3" style="font-size:160px">Humanity</h1></div>' +
      '<div class="fu-rk" style="position:absolute;left:340px;top:2620px;width:400px">' + UI.img(kit, 'rocket.webp', '', 'left:0;top:0;width:400px') + '</div>',
      3500, '', 'spot', UI.ghost('Future', -60, 1560));
    const q = this.v.q;
    this.k = q('.fu-k').style; this.g = q('.fu-g').style; this.x = UI.draw(q('.fu-x')); this.L = UI.letters(q('.fu-l'), 681, 2.75, 0.4); this.r = q('.fu-r').style;
    this.t = q('.fu-t').style; this.a = q('.fu-a').style; this.al = q('.fu-al').style; this.m = q('.fu-m').style; this.u = UI.draw(q('.fu-u')); this.ml = q('.fu-ml').style;
    this.p = q('.fu-p').style; this.pl = q('.fu-pl').style;
    this.k3 = q('.fu-k3').style; this.L3 = UI.letters(q('.fu-l3'), 683, 7.75, 0.4); this.rk = q('.fu-rk').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.2, 0.45)); UI.slam(this.g, t, 1.37, 0.2, -2, 1.4); this.x(eio(seg(t, 1.9, 2.2)));
    UI.reveal(this.L, t);
    const rp = seg(t, 2.8, 3.15); this.r.opacity = rp > 0 ? 1 : 0; this.r.transform = 'translateY(' + lerp(300, 0, eob(rp, 1.2)) + 'px) rotate(' + Math.sin(t * 2) * 2 + 'deg)';
    UI.slam(this.t, t, 4.2, 0.22, -2, 1.5);
    const ap = seg(t, 4.85, 5.15); this.a.opacity = ap > 0 ? 1 : 0; this.a.transform = 'scale(' + lerp(0.3, 1, eob(ap, 1.6)) + ') rotate(' + (t * 20) + 'deg)';
    this.al.opacity = eo(seg(t, 5.0, 5.2));
    const mp = seg(t, 5.6, 5.9); this.m.opacity = mp; this.m.clipPath = 'inset(0 ' + (100 - 100 * eio(mp)) + '% 0 0)'; this.u(eio(seg(t, 5.8, 6.1))); this.ml.opacity = eo(seg(t, 5.75, 5.95));
    const pp = seg(t, 6.2, 6.5); this.p.opacity = pp > 0 ? 1 : 0; this.p.transform = 'translateY(' + lerp(260, 0, eob(pp, 1.3)) + 'px) rotate(-4deg)';
    this.pl.opacity = eo(seg(t, 6.4, 6.6));
    const gone = 1 - seg(t, 7.1, 7.3); this.p.opacity *= gone; this.pl.opacity *= gone;
    this.k3.opacity = eo(seg(t, 7.4, 7.65)); UI.reveal(this.L3, t);
    const lift = ei(seg(t, 8.0, 9.1)), sh = t > 7.7 && t < 8.1 ? Math.sin(t * 80) * 3 : 0;
    this.rk.transform = 'translate(' + sh + 'px,' + (-1600 * lift) + 'px)'; this.rk.opacity = t >= 7.2 ? 1 : 0;
    if (t > 8.75) UI.roll(this.v.roll, t, 9.1, 0, -12); else UI.punch(this.v.roll, t, [1.37, 4.2, 4.97, 5.7, 6.25], 0.035);
  },
});
