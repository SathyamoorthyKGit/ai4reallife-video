const { seg, eo, eox, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: -420, cy: 980, z: 1.05, r: -3 }, { t: 0.4, cx: 540, cy: 980, z: 1.0, r: -1, ease: kit.eox }, { t: 3.8, from: 2.4, cx: 540, cy: 960, z: 1.02, r: 0 }];
kit.scene('sign', {
  init(kit) {
    kit.css('.sg-btn{position:absolute;left:520px;top:980px;width:440px;height:190px;border-radius:95px;background:var(--main);color:color-mix(in srgb, var(--ground) 10%, #fff);display:flex;align-items:center;justify-content:center;font-size:104px;box-shadow:16px 22px 26px rgba(0,0,0,.3)}');
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:300px;width:1080px;align-items:center;gap:0"><p class="sub sg-sub" style="margin-bottom:10px">Attackers took over</p><h1 class="line sg-line" style="font-size:110px">The signer</h1></div>' +
      '<div class="sg-btn"><span class="blk sg-txt">Sign</span></div>' +
      UI.img(kit, 'padlock.webp', '', 'left:120px;top:1290px;width:190px') +
      '<div class="words" style="left:330px;top:1460px"><span class="tag sg-tag" style="font-size:34px">Keys untouched</span></div>' +
      '<div class="sg-hand" style="position:absolute;left:-96px;top:999px;width:700px">' + UI.img(kit, 'point.webp', '', 'left:0;top:0;width:700px') + '</div>', 2000, '', 'window', '<div class="ghost" style="left:-60px;top:1560px">Sign</div>');
    const q = this.v.q;
    this.sub = q('.sg-sub').style; this.btn = q('.sg-btn').style; this.txt = q('.sg-txt'); this.tag = q('.sg-tag').style; this.hand = q('.sg-hand').style;
    this.L = UI.letters(q('.sg-line'), 9, 1.95, 0.45);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.008);
    this.sub.opacity = eo(seg(t, 1.7, 2.0));
    UI.reveal(this.L, t);
    const bp = seg(t, 0.15, 0.4);
    this.btn.opacity = bp > 0 ? 1 : 0;
    UI.slam(this.tag, t, 0.7, 0.22, -3, 1.5);
    const hp = eox(seg(t, 0.9, 1.9)), press = seg(t, 4.15, 4.28) * (1 - 0.6 * seg(t, 4.35, 4.7));
    this.hand.transform = 'translateX(' + ((1 - hp) * -900 + 24 * press + Math.sin(t * 2) * 6 * (1 - press)) + 'px)';
    const p = t >= 4.25;
    this.btn.transform = 'scale(' + lerp(1.4, 1, eob(bp, 1.6)) * (1 - 0.07 * seg(t, 4.2, 4.28) * (1 - seg(t, 4.3, 4.5))) + ')';
    this.btn.boxShadow = p ? '0 0 0 14px var(--accent), 16px 22px 26px rgba(0,0,0,.3)' : '';
    this.txt.textContent = p ? 'Signed' : 'Sign';
    const jolt = p ? Math.exp(-(t - 4.25) * 9) : 0;
    this.v.roll.transform = 'scale(' + (1 + 0.035 * jolt) + ')';
    UI.glitch(kit, t, 5.2, 46);
  },
});
