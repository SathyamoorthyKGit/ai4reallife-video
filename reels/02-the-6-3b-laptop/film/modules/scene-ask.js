const { seg, eo, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 160, z: 1.1, r: 3 }, { t: 0.4, cx: 540, cy: 900, z: 1.0, r: 0, ease: kit.eox }, { t: 2.9, from: 2.3, cx: 540, cy: 1960, z: 1.0, r: -1.5 }];
kit.scene('ask', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:280px;width:1080px;align-items:center;gap:0"><p class="sub ak-k1" style="font-size:38px;margin-bottom:10px">The attacker didn’t need</p><h1 class="line ak-l1" style="font-size:150px">The key</h1></div>' +
      '<div class="ak-key" style="position:absolute;left:370px;top:640px;width:340px">' + UI.img(kit, 'key.webp', '', 'left:0;top:0;width:340px') + '</div>' +
      '<svg class="art" viewBox="0 0 1080 2600" style="height:2600px"><path class="redline ak-x1" d="M330 660 L760 1220" style="stroke-width:26"/><path class="redline ak-x2" d="M760 670 L330 1210" style="stroke-width:26"/>' +
      '<path class="ak-sig" d="M372 2150 C 400 2110 420 2190 450 2150 C 480 2110 500 2200 540 2160 C 570 2130 600 2120 620 2165 C 650 2210 700 2120 740 2150 C 770 2172 800 2150 830 2140" style="fill:none;stroke:var(--second);stroke-width:7;stroke-linecap:round;stroke-linejoin:round"/></svg>' +
      '<div class="words" style="left:0;top:1460px;width:1080px;align-items:center;gap:14px"><p class="sub ak-k2" style="font-size:38px">They needed something</p><span class="tape ak-t1" style="font-size:70px;align-self:center">Allowed to ask</span><span class="tape ak-t2" style="font-size:70px;align-self:center;background:var(--main)">for a signature</span></div>' +
      '<div class="ak-pen" style="position:absolute;left:280px;top:1800px;width:420px">' + UI.img(kit, 'pen.webp', '', 'left:0;top:0;width:460px') + '</div>', 2600, '', 'spot', '<div class="ghost" style="left:-80px;top:1180px">Key</div>');
    const q = this.v.q;
    this.k1 = q('.ak-k1').style; this.k2 = q('.ak-k2').style; this.t1 = q('.ak-t1').style; this.t2 = q('.ak-t2').style; this.key = q('.ak-key').style; this.pen = q('.ak-pen').style;
    this.L = UI.letters(q('.ak-l1'), 10, 1.0, 0.45);
    this.x1 = UI.draw(q('.ak-x1')); this.x2 = UI.draw(q('.ak-x2')); this.sig = UI.draw(q('.ak-sig'));
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.008);
    this.k1.opacity = eo(seg(t, -0.1, 0.25));
    UI.reveal(this.L, t);
    this.key.transform = 'rotate(' + (Math.sin(t * 1.3) * 4) + 'deg)';
    this.x1(eo(seg(t, 1.65, 1.9))); this.x2(eo(seg(t, 1.9, 2.15)));
    this.k2.opacity = eo(seg(t, 2.6, 2.9));
    UI.slam(this.t1, t, 3.05, 0.22, -2, 1.6); UI.slam(this.t2, t, 3.6, 0.22, 2, 1.6);
    const s = eio(seg(t, 3.7, 4.7));
    this.sig(s);
    this.pen.transform = 'translate(' + s * 400 + 'px,' + Math.sin(s * 28) * 10 + 'px)';
    UI.roll(this.v.roll, t, 5.1, 0, 26);
  },
});
