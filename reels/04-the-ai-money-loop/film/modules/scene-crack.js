const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 1000, z: 2.4, r: 0 }, { t: 0.5, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 2.6, from: 0.55, cx: 540, cy: 975, z: 1.05, r: -1 }, { t: 3.05, from: 2.65, cx: 540, cy: 1720, z: 1.0, r: 1 }, { t: 4.82, from: 3.1, cx: 540, cy: 1730, z: 1.05, r: 0 }];
kit.scene('crack', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:330px;width:1080px;align-items:center;gap:6px"><p class="sub ck-k">Every loan rests on</p><h1 class="line ck-l" style="font-size:170px">One thing</h1></div>' +
      UI.img(kit, 'datacenter.webp', 'ck-dc', 'left:120px;top:690px;width:840px') +
      UI.img(kit, 'chain.webp', 'ck-ch', 'left:150px;top:900px;width:780px') +
      '<div class="ck-lk" style="position:absolute;left:420px;top:860px;width:240px;transform-origin:50% 0">' + UI.img(kit, 'padlock.webp', '', 'left:0;top:0;width:240px') + '</div>' +
      '<div class="words" style="left:110px;top:1330px"><span class="tape pk ck-t" style="font-size:62px">One demand source</span></div>' +
      '<div class="ck-v" style="position:absolute;left:110px;top:1500px;width:860px;height:500px"></div>' +
      '<div class="words" style="left:0;top:2040px;width:1080px;align-items:center;gap:8px"><span class="tape bl ck-t2" style="align-self:center;font-size:58px">Constant demand</span><p class="sub ck-k2" style="font-size:38px">for those chips</p></div>',
      2400, '', 'dark', UI.ghost('Demand', -60, 1250));
    const q = this.v.q;
    this.k = q('.ck-k').style; this.L = UI.letters(q('.ck-l'), 431, 0.3, 0.4);
    this.dc = q('.ck-dc').style; this.ch = q('.ck-ch').style; this.lk = q('.ck-lk').style; this.t = q('.ck-t').style;
    this.vid = UI.vid(kit, q('.ck-v'), 'clip-data.mp4', 71); this.vs = q('.ck-v').style; this.t2 = q('.ck-t2').style; this.k2 = q('.ck-k2').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.005);
    this.k.opacity = eo(seg(t, 0.15, 0.4)); UI.reveal(this.L, t);
    this.dc.transform = 'scale(' + (1 + 0.01 * Math.sin(t * 2)) + ')';
    const cp = seg(t, 0.95, 1.3); this.ch.opacity = cp > 0 ? 1 : 0; this.ch.transform = 'rotate(-8deg) translateX(' + lerp(-900, 0, eo(cp)) + 'px)';
    const lp = seg(t, 1.1, 1.45), sw = t > 1.45 ? Math.sin((t - 1.45) * 9) * 7 * Math.exp(-(t - 1.45) * 3) : 0;
    this.lk.opacity = lp > 0 ? 1 : 0; this.lk.transform = 'translateY(' + lerp(-700, 0, ei(lp)) + 'px) rotate(' + sw + 'deg)';
    UI.slam(this.t, t, 2.3, 0.22, -3, 1.6);
    kit.seek(this.vid, Math.max(0, t - 2.6));
    const vp = seg(t, 2.6, 3.0); this.vs.opacity = vp > 0 ? 1 : 0; this.vs.transform = 'translateY(' + lerp(200, 0, eob(vp, 1.2)) + 'px) rotate(' + lerp(4, -1, eo(vp)) + 'deg)';
    UI.slam(this.t2, t, 3.15, 0.22, 2, 1.5); this.k2.opacity = eo(seg(t, 3.5, 3.75));
    if (t > 4.45) UI.roll(this.v.roll, t, 4.82, 0, 12); else UI.punch(this.v.roll, t, [1.45, 2.3, 3.15], 0.04);
  },
});
