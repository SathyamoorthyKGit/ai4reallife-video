const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 960, z: 1.12, r: 0 }, { t: 4.7, from: 0.0, cx: 540, cy: 980, z: 1.0, r: -1, ease: kit.eio }, { t: 5.02, from: 4.7, cx: -700, cy: 980, z: 1.05, r: -5, ease: kit.ei }];
const C = { x: 540, y: 1010 }, R = 270;
// the loop spins down: angle is the integral of a speed that decays as lenders pull back
const ang = t => { const w0 = 70, w1 = 4, k = 0.9; return w1 * t + (w0 - w1) * (1 - Math.exp(-k * t)) / k; };
kit.scene('slow', {
  init(kit) {
    const node = (cls, inner) => '<div class="' + cls + '" style="position:absolute;left:0;top:0">' + inner + '</div>';
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:330px;width:1080px;align-items:center;gap:6px"><p class="sub sl-k">When lenders</p><h1 class="line sl-l" style="font-size:140px">Pull back</h1></div>' +
      '<div class="sl-ring" style="position:absolute;left:' + (C.x - R) + 'px;top:' + (C.y - R) + 'px;width:' + 2 * R + 'px;height:' + 2 * R + 'px;border-radius:50%;border:10px dashed color-mix(in srgb, var(--main) 70%, var(--ground));box-sizing:border-box"></div>' +
      node('sl-n sl-n0', '<span class="node" style="display:block;transform:translate(-50%,-50%)">Nvidia</span>') +
      node('sl-n sl-n1', UI.img(kit, 'founder.webp', '', 'left:-80px;top:-130px;width:160px')) +
      node('sl-n sl-n2', UI.img(kit, 'gpu.webp', '', 'left:-130px;top:-80px;width:260px')) +
      node('sl-n sl-n3', UI.img(kit, 'bank.webp', '', 'left:-130px;top:-72px;width:260px')) +
      '<div class="words" style="left:140px;top:1380px"><span class="stamp solid sl-s1" style="position:relative;font-size:56px;transform-origin:50% 50%">↓ Fewer loans</span></div>' +
      '<div class="words" style="left:140px;top:1500px"><span class="stamp solid sl-s2" style="position:relative;font-size:56px;transform-origin:50% 50%">↓ Fewer chips bought</span></div>',
      2000, '', 'spot', UI.ghost('Slows', -60, 1560));
    const q = this.v.q;
    this.k = q('.sl-k').style; this.L = UI.letters(q('.sl-l'), 441, 0.2, 0.4);
    this.ring = q('.sl-ring').style; this.n = [...kit.stage.querySelectorAll('.sl-n')].map(e => e.style);
    this.s1 = q('.sl-s1').style; this.s2 = q('.sl-s2').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.05, 0.3)); UI.reveal(this.L, t);
    const a = ang(t);
    this.ring.transform = 'rotate(' + a + 'deg)'; this.ring.opacity = lerp(1, 0.45, eo(seg(t, 0.4, 3.5)));
    const back = eo(seg(t, 0.5, 1.4)), grey = eo(seg(t, 0.4, 3.0));
    this.n.forEach((st, i) => {
      const th = (a - 90 + i * 90) * Math.PI / 180, ox = i === 3 ? -120 * back : 0, oy = i === 3 ? 700 * ei(seg(t, 0.5, 1.6)) : 0;
      st.transform = 'translate(' + (C.x + Math.cos(th) * R + ox) + 'px,' + (C.y + Math.sin(th) * R + oy) + 'px)';
      st.opacity = i === 3 ? 1 - 0.85 * back : 1 - 0.35 * grey;
    });
    UI.slam(this.s1, t, 2.9, 0.22, -4, 1.7); UI.slam(this.s2, t, 3.98, 0.22, 3, 1.7);
    UI.punch(this.v.roll, t, [2.9, 3.98], 0.045);
  },
});
