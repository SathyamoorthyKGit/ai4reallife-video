const { seg, eo, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 3150, z: 1.0 }, { t: 0.4, cx: 540, cy: 2650, z: 1.0, ease: kit.eo }, { t: 1.3, from: 0.5, cx: 540, cy: 2080, z: 1.08 }, { t: 2.55, from: 1.75, cx: 540, cy: 880, z: 1.05 }, { t: 4.5, from: 3.25, cx: 540, cy: 1400, z: 0.78 }];
kit.scene('banks', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="ghost" style="left:-80px;top:2030px;font-size:380px">Banks</div>' +
      UI.img(kit, 'bank.webp', '', 'left:20px;top:2420px;width:1040px') +
      '<div class="banks-noir" style="position:absolute;left:820px;top:2640px;width:130px">' + UI.img(kit, 'noir.webp', '', 'left:0;top:0;width:130px') + '</div>' +
      '<div class="words" style="left:0;top:1800px;width:1080px;align-items:center;gap:0"><h2 class="blk banks-m1" style="font-size:170px">Morgan</h2><h2 class="blk banks-m2" style="font-size:170px">Stanley</h2></div>' +
      '<div class="stamp banks-s1" style="left:370px;top:2080px">Blocking</div>' +
      '<div class="words" style="left:0;top:530px;width:1080px;align-items:center;gap:6px"><h2 class="blk banks-c" style="font-size:240px">Citi</h2><p class="sub banks-and">and</p><h2 class="blk banks-j" style="font-size:160px">JPMorgan</h2></div>' +
      '<div class="stamp banks-s2" style="left:220px;top:965px">Restricting</div>', 3200);
    const q = this.v.q;
    this.noir = q('.banks-noir').style; this.s1 = q('.banks-s1').style; this.s2 = q('.banks-s2').style; this.and = q('.banks-and').style;
    this.M = UI.letters(q('.banks-m1'), 2, 0.35, 0.35).concat(UI.letters(q('.banks-m2'), 3, 0.5, 0.35));
    this.J = UI.letters(q('.banks-j'), 4, 1.75, 0.35).concat(UI.letters(q('.banks-c'), 5, 2.1, 0.25));
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.008);
    UI.reveal(this.M, t); UI.reveal(this.J, t);
    this.and.opacity = eo(seg(t, 1.9, 2.2));
    UI.slam(this.s1, t, 1.05, 0.2, -10, 1.9); if (t >= 1.05) this.s1.opacity = 0.92;
    UI.slam(this.s2, t, 2.75, 0.2, 7, 1.9); if (t >= 2.75) this.s2.opacity = 0.92;
    const push = t < 1.05 ? 0 : 70 * eo(seg(t, 1.05, 1.17)) * (1 - 0.5 * eo(seg(t, 1.17, 1.6)));
    const walk = lerp(150, 0, eo(seg(t, 0, 1.0)));
    this.noir.transform = 'translateX(' + (walk + push) + 'px) rotate(' + push * 0.06 + 'deg)';
    UI.glitch(kit, t, 4.5, 14);
  },
});