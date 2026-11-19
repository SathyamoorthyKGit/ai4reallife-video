const { seg, eo, ei, eio, eob, lerp } = kit;
// part 1: Resolve and Canva wear race bibs, already over the finish line
const KEYS = [{ t: 0, cx: 540, cy: -500, z: 1.05, r: 3 }, { t: 0.32, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 3.4, from: 0.35, cx: 540, cy: 962, z: 1.01, r: 0 }, { t: 3.75, from: 3.4, cx: 540, cy: 1960, z: 1.0, r: 1 }, { t: 8.35, from: 3.8, cx: 540, cy: 1970, z: 1.03, r: 0 }, { t: 8.7, from: 8.35, cx: 1800, cy: 1970, z: 1.05, r: 5, ease: kit.ei }];
kit.scene('late', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:300px;width:1080px;align-items:center;gap:6px"><p class="sub lt-k" style="font-size:40px">Already connect AI this way</p></div>' +
      '<svg class="art" viewBox="0 0 1080 1300" style="height:1300px"><path class="stroke lt-fl" d="M120 1080 L960 1080" style="stroke-width:6;stroke-dasharray:18 14"/></svg>' +
      '<div class="words" style="left:0;top:1110px;width:1080px;align-items:center"><span class="stamp lt-ck" style="position:relative;font-size:64px;transform-origin:50% 50%">Already there</span></div>' +
      // adobe is late
      '<div class="words" style="left:0;top:1300px;width:1080px;align-items:center"><h1 class="line pink lt-l" style="font-size:100px">Adobe is late</h1></div>' +
      UI.anim(kit, 'snail', 'lt-sn', 'left:300px;top:1560px', 480) +
      '<div class="words" style="left:0;top:1900px;width:1080px;align-items:center;gap:10px"><p class="sub lt-k2" style="font-size:40px">But it’s bringing it to</p><span class="tape bl lt-t" style="position:relative;align-self:center;font-size:60px;transform-origin:50% 50%">Millions of creators</span></div>',
      2400, [['DaVinci Resolve', '01', 120], ['Canva', '02', 580]].map(([l, n, x], i) => '<div class="bib lt-sl' + (i ? ' b' : '') + '" style="left:' + x + 'px;top:560px"><div class="bd">MCP ready</div><i>' + n + '</i><b>' + l + '</b>' + [[14, 70], [350, 70], [14, 270], [350, 270]].map(([a, b]) => '<span class="pn" style="left:' + a + 'px;top:' + b + 'px"></span>').join('') + '</div>').join(''), 'soft', UI.ghost('Slow', -60, 1240, 460));
    const q = this.v.q;
    this.k = q('.lt-k').style; this.sl = [...kit.stage.querySelectorAll('.lt-sl')].map(e => e.style); this.fl = UI.draw(q('.lt-fl')); this.ck = q('.lt-ck').style;
    this.L = UI.letters(q('.lt-l'), 951, 3.95, 0.4); this.sn = q('.lt-sn').style; this.k2 = q('.lt-k2').style; this.t = q('.lt-t').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.0001);
    this.k.opacity = eo(seg(t, 0.4, 0.7));
    [0.3, 1.0].forEach((a, i) => { UI.card(this.sl[i], t, a, 3.4, i ? 5 : -5); this.sl[i].transform += ' rotate(' + Math.sin((t - a) * 2.4 + i * 2) * 1.2 + 'deg)'; });
    this.fl(eio(seg(t, 1.3, 2.2))); UI.slam(this.ck, t, 2.4, 0.22, -4, 1.7); this.ck.opacity *= 1 - seg(t, 3.4, 3.6);
    UI.reveal(this.L, t);
    // the snail inches across, late but moving
    const sp = seg(t, 3.9, 4.2); this.sn.opacity = sp > 0 ? 1 : 0; UI.frame(this.sn, t);
    this.sn.transform = 'translateX(' + (lerp(-500, -120, eo(sp)) + 40 * seg(t, 4.2, 8.6)) + 'px)';
    this.k2.opacity = eo(seg(t, 5.1, 5.35)); UI.slam(this.t, t, 6.6, 0.22, -2, 1.6);
    if (t > 0.32 && t < 3.4) this.v.roll.transform = 'none'; else UI.punch(this.v.roll, t, [3.95, 6.6], 0.04);
  },
});
