const { seg, eo, eox, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 760, z: 1.0 }, { t: 1.75, from: 1.2, cx: 1620, cy: 900, z: 1.0 }, { t: 3.9, from: 3.35, cx: 1620, cy: 1880, z: 1.05 }, { t: 6, from: 5.2, cx: 1600, cy: 1800, z: 0.95 }];
kit.scene('rule2', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="line r2-num" style="position:absolute;left:450px;top:250px;font-size:760px;line-height:.9;color:var(--main)">2</div>' +
      '<div class="words" style="left:120px;top:400px;gap:18px"><p class="tag r2-k">Analyse spending?</p><span class="tape r2-t1" style="font-size:130px">Read</span><span class="tape r2-t2" style="font-size:130px">Only</span></div>' +
      '<div class="words" style="left:1160px;top:300px;gap:0"><p class="sub r2-k2" style="margin-bottom:10px">Give it a downloaded</p><h2 class="line m r2-line">Statement</h2></div>' +
      '<div class="r2-st" style="position:absolute;left:1220px;top:560px;width:760px">' + UI.img(kit, 'statement.webp', '', 'left:0;top:0;width:760px') + '</div>' +
      '<div class="words" style="left:1180px;top:1400px"><p class="sub r2-not" style="color:var(--main)">Not your login</p></div>' +
      '<div class="words" style="left:1150px;top:1600px;gap:30px"><div class="r2-c1" style="display:flex;align-items:center;gap:30px"><svg width="120" height="110" viewBox="0 0 120 110"><path class="r2-ck" d="M12 60 L46 94 L110 14" style="fill:none;stroke:var(--accent);stroke-width:18;stroke-linecap:round;stroke-linejoin:round"/></svg><h2 class="blk" style="font-size:110px;color:var(--accent)">It can see</h2></div>' +
      '<div class="r2-c2" style="display:flex;align-items:flex-start;gap:30px"><svg width="120" height="110" viewBox="0 0 120 110"><path class="r2-x1" d="M16 14 L104 96" style="fill:none;stroke:var(--main);stroke-width:18;stroke-linecap:round"/><path class="r2-x2" d="M104 14 L16 96" style="fill:none;stroke:var(--main);stroke-width:18;stroke-linecap:round"/></svg><h2 class="blk" style="font-size:90px;color:var(--main);white-space:normal;width:620px">Can&#39;t move money</h2></div></div>', 2400,
      '<div class="r2-mag" style="position:absolute;left:0;top:0">' + UI.img(kit, 'magnifier.webp', '', 'left:0;top:0;width:480px') + '</div>');
    const q = this.v.q;
    this.num = q('.r2-num').style; this.k = q('.r2-k').style; this.t1 = q('.r2-t1').style; this.t2 = q('.r2-t2').style; this.k2 = q('.r2-k2').style;
    this.st = q('.r2-st').style; this.not = q('.r2-not').style; this.mag = q('.r2-mag').style; this.c1 = q('.r2-c1').style; this.c2 = q('.r2-c2').style;
    this.L = UI.letters(q('.r2-line'), 12, 1.6, 0.4);
    this.ck = UI.draw(q('.r2-ck')); this.x1 = UI.draw(q('.r2-x1')); this.x2 = UI.draw(q('.r2-x2'));
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.01);
    this.num.transform = 'translateY(' + lerp(-200, 0, eob(seg(t, -0.3, 0.25), 1.4)) + 'px)';
    this.k.opacity = eo(seg(t, -0.1, 0.25));
    UI.slam(this.t1, t, 0.45, 0.22, -3, 1.6); UI.slam(this.t2, t, 0.7, 0.22, 2, 1.6);
    this.k2.opacity = eo(seg(t, 1.5, 1.8)); UI.reveal(this.L, t);
    const sp = seg(t, 1.55, 2.0); this.st.opacity = sp > 0 ? 1 : 0;
    this.st.transform = 'translateY(' + lerp(-300, 0, eob(sp, 1.3)) + 'px) rotate(' + lerp(-14, -3, eo(sp)) + 'deg)';
    this.not.opacity = eo(seg(t, 2.7, 3.0));
    const mp = eio(seg(t, 2.0, 3.6));
    this.mag.opacity = t >= 2.0 && t < 3.7 ? 1 : 0;
    this.mag.transform = 'translate(' + (lerp(-500, 1100, mp)) + 'px,' + (lerp(1250, 700, mp) + Math.sin(mp * 7) * 60) + 'px) rotate(' + lerp(-35, 20, mp) + 'deg)';
    this.c1.opacity = t >= 3.95 ? 1 : 0; this.ck(eo(seg(t, 3.95, 4.25)));
    this.c2.opacity = t >= 4.8 ? 1 : 0; this.x1(eo(seg(t, 4.8, 5.0))); this.x2(eo(seg(t, 5.0, 5.2)));
  },
});