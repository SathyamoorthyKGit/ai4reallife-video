const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 960, z: 1.08, r: 0 }, { t: 2.9, from: 0.0, cx: 540, cy: 975, z: 1.0, r: -1, ease: kit.eio }, { t: 3.21, from: 2.9, cx: 540, cy: 2700, z: 1.05, r: 3, ease: kit.ei }];
kit.scene('proof', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:330px;width:1080px;align-items:center;gap:8px"><p class="sub pf-k">Robots up, jobs down</p><h1 class="line pf-l" style="font-size:150px">Two lines</h1></div>' +
      '<svg class="art" viewBox="0 0 1080 2000" style="height:2000px">' +
        '<path class="stroke" d="M130 560 L130 1260 L960 1260" style="stroke-width:6"/>' +
        '<path class="pf-a" d="M140 1150 C 300 1120 380 1000 520 960 S 760 760 900 640" style="fill:none;stroke:var(--accent);stroke-width:16;stroke-linecap:round"/>' +
        '<path class="pf-b" d="M140 700 C 300 720 400 820 520 860 S 760 1060 900 1140" style="fill:none;stroke:var(--main);stroke-width:16;stroke-linecap:round"/>' +
      '</svg>' +
      '<div class="words pf-ra" style="left:640px;top:560px"><span class="blk bluet" style="font-size:56px">Robots</span></div>' +
      '<div class="words pf-rb" style="left:660px;top:1150px"><span class="blk pink" style="font-size:56px">Jobs</span></div>' +
      '<div class="pf-mg" style="position:absolute;left:0;top:0;width:230px">' + UI.img(kit, 'magnifier.webp', '', 'left:0;top:0;width:230px') + '</div>' +
      '<div class="stamp pf-s" style="left:230px;top:1360px;font-size:100px;transform-origin:50% 50%">Not proof</div>',
      2000, '', 'soft', UI.ghost('Proof', -60, 1560));
    const q = this.v.q;
    this.k = q('.pf-k').style; this.L = UI.letters(q('.pf-l'), 91, 0.2, 0.4);
    this.a = UI.draw(q('.pf-a')); this.b = UI.draw(q('.pf-b'));
    this.ra = q('.pf-ra').style; this.rb = q('.pf-rb').style; this.mg = q('.pf-mg').style; this.s = q('.pf-s').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.15, 0.45)); UI.reveal(this.L, t);
    this.a(eio(seg(t, 0.2, 1.1))); this.b(eio(seg(t, 0.35, 1.25)));
    this.ra.opacity = eo(seg(t, 1.0, 1.2)); this.rb.opacity = eo(seg(t, 1.15, 1.35));
    const mp = eio(seg(t, 0.6, 2.4));
    this.mg.opacity = t >= 0.6 ? 1 : 0;
    this.mg.transform = 'translate(' + lerp(60, 640, mp) + 'px,' + (lerp(1000, 760, mp) + Math.sin(mp * Math.PI * 2) * 60) + 'px) rotate(' + lerp(-25, 10, mp) + 'deg)';
    UI.slam(this.s, t, 2.1, 0.24, -6, 1.9);
    if (t < 0.45) UI.roll(this.v.roll, t, 3.21, -12, 0); else UI.punch(this.v.roll, t, [2.1], 0.045);
  },
});
