const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 1700, cy: 960, z: 1.05, r: 5 }, { t: 0.4, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 3.3, from: 0.45, cx: 560, cy: 975, z: 1.05, r: 0 }, { t: 3.75, from: 3.3, cx: 540, cy: 1400, z: 1.06, r: -2 }, { t: 6.8, from: 3.8, cx: 540, cy: 1410, z: 1.12, r: -1 }, { t: 7.14, from: 6.8, cx: 540, cy: -300, z: 1.1, r: -4, ease: kit.ei }];
const MAX = 540, X0 = 220;
kit.scene('usjp', {
  init(kit) {
    const row = (id, flag, y, w, lab, bg) => '<div class="uj-row ' + id + '" style="position:absolute;left:0;top:' + y + 'px;width:1080px;height:140px">' +
      UI.img(kit, 'flag-' + flag + '.webp', '', 'left:70px;top:0;width:112px') +
      '<div class="bar uj-bar" style="left:' + X0 + 'px;top:30px;width:' + w + 'px;height:84px;background:' + bg + ';transform-origin:0 50%"></div>' +
      '<div class="words uj-val" style="left:' + (X0 + Math.min(w, MAX) + 18) + 'px;top:44px"><span class="blk" style="font-size:52px">' + lab + '</span></div></div>';
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:330px;width:1080px;align-items:center;gap:8px"><p class="sub uj-k">New robots installed · 2025</p><h1 class="line uj-l" style="font-size:96px">US passes Japan</h1></div>' +
      '<div class="uj-cn">' + row('uj-r0', 'cn', 600, 1400, '', 'color-mix(in srgb, var(--second) 40%, var(--ground))') +
      '<div class="words" style="left:690px;top:644px"><span class="blk" style="font-size:52px;color:#fff">354k</span></div></div>' +
      row('uj-us', 'us', 0, MAX, '38,400', 'var(--main)') +
      row('uj-jp', 'jp', 0, Math.round(MAX * 36219 / 38400), '36,219', 'var(--second)') +
      row('uj-kr', 'kr', 1120, Math.round(MAX * 30000 / 38400), '~30,000', 'color-mix(in srgb, var(--second) 70%, var(--ground))') +
      row('uj-de', 'de', 1280, Math.round(MAX * 24500 / 38400), '<25,000', 'color-mix(in srgb, var(--second) 55%, var(--ground))') +
      '<div class="stamp uj-st" style="left:300px;top:1440px;transform-origin:50% 50%">Now No. 2</div>' +
      '<div class="words" style="left:0;top:1580px;width:1080px;align-items:center;gap:20px"><h1 class="num uj-n" style="font-size:170px">38,400</h1><span class="tape pk uj-t" style="align-self:center;font-size:72px">+12% in a year</span></div>' +
      '<div class="words" style="left:0;top:1930px;width:1080px;align-items:center"><span class="tag uj-jt" style="align-self:center">Japan −19%</span></div>',
      2400, '', 'spot', UI.ghost('No. 2', -40, 1160) + '<div class="stripe" style="left:880px;top:520px;width:70px;height:1200px;opacity:.7;transform:skewX(-20deg)"></div>');
    const q = this.v.q;
    this.k = q('.uj-k').style; this.L = UI.letters(q('.uj-l'), 41, 0.4, 0.5);
    this.cn = q('.uj-cn').style; this.us = q('.uj-us').style; this.jp = q('.uj-jp').style;
    this.rows = ['.uj-r0', '.uj-us', '.uj-jp', '.uj-kr', '.uj-de'].map(s => ({ bar: q(s + ' .uj-bar').style, val: q(s + ' .uj-val').style }));
    this.kr = q('.uj-kr').style; this.de = q('.uj-de').style;
    this.st = q('.uj-st').style; this.n = q('.uj-n'); this.tp = q('.uj-t').style; this.jt = q('.uj-jt').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.006);
    this.k.opacity = eo(seg(t, 0.2, 0.5)); UI.reveal(this.L, t);
    const grow = [[0.35, 0.95], [0.6, 1.1], [0.55, 1.05], [0.7, 1.15], [0.8, 1.25]];
    this.rows.forEach((r, i) => { const p = eo(seg(t, grow[i][0], grow[i][1])); r.bar.transform = 'scaleX(' + p + ')'; r.val.opacity = eo(seg(t, grow[i][1] - 0.1, grow[i][1] + 0.15)); });
    // US starts behind Japan, then overtakes and swaps rows
    const us = t < 1.4 ? 0.88 * eo(seg(t, 0.6, 1.1)) : lerp(0.88, 1, eob(seg(t, 1.4, 1.8), 1.4));
    this.rows[1].bar.transform = 'scaleX(' + us + ')';
    const sw = eio(seg(t, 1.6, 2.1));
    this.jp.transform = 'translateY(' + lerp(800, 960, sw) + 'px)';
    this.us.transform = 'translateY(' + (lerp(960, 800, sw) - Math.sin(sw * Math.PI) * 40) + 'px) scale(' + (1 + Math.sin(sw * Math.PI) * 0.04) + ')';
    const fadeTop = 1 - eo(seg(t, 3.25, 3.6));
    this.cn.opacity = fadeTop; this.rows[0].val.opacity *= 1;
    UI.slam(this.st, t, 2.25, 0.22, -6, 1.8);
    const c = eo(seg(t, 3.5, 4.6));
    this.n.textContent = UI.num(lerp(34300, 38400, c)); this.n.style.opacity = t >= 3.45 ? 1 : 0;
    UI.slam(this.tp, t, 4.6, 0.22, -2, 1.6);
    this.jt.opacity = eo(seg(t, 5.4, 5.7)); this.jt.transform = 'rotate(-3deg) translateY(' + lerp(30, 0, eo(seg(t, 5.4, 5.7))) + 'px)';
    UI.punch(this.v.roll, t, [1.8, 2.25, 4.6], 0.035);
  },
});
