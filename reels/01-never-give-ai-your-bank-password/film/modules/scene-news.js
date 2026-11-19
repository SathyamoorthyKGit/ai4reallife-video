const { seg, eo, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 480, cy: 1040, z: 1.1 }, { t: 1.4, from: 0.75, cx: 560, cy: 1480, z: 1.1 }, { t: 2.45, from: 1.7, cx: 560, cy: 1000, z: 0.88 }, { t: 4.5, from: 4.12, cx: 540, cy: 220, z: 1.0 }];
kit.scene('news', {
  init(kit) {
    kit.css('.news-hl{font-family:"Regarn-900", var(--sans, system-ui, sans-serif);font-size:62px;line-height:1;text-transform:uppercase}');
    this.v = UI.build(kit,
      '<div class="ghost" style="left:-100px;top:1650px">Scoop</div>' +
      '<div class="words" style="left:0;top:250px;width:1080px;align-items:center;gap:0"><p class="sub news-sub" style="margin-bottom:14px">US banks are</p><h1 class="line news-l1">Blocking</h1><h1 class="line xl news-l2" style="color:var(--main)">AI</h1></div>' +
      '<div class="clip news-a" style="left:60px;top:820px;width:840px"><span class="lbl">Axios · Scoop</span><span class="news-hl">Unvetted AI agents are accessing U.S. bank accounts</span></div>' +
      '<div class="clip news-b" style="left:160px;top:1300px;width:720px"><span class="lbl">Reuters · Oct 22, 2026</span><span class="news-hl">US banks are blocking third-party AI agents’ access to customer accounts</span></div>' +
      '<div class="stamp news-stamp" style="left:650px;top:760px">Oct 22</div>', 2000,
      '<div class="news-mag" style="position:absolute;left:0;top:0">' + UI.img(kit, 'magnifier.webp', '', 'left:0;top:0;width:520px') + '</div>');
    const q = this.v.q;
    this.a = q('.news-a').style; this.b = q('.news-b').style; this.stamp = q('.news-stamp').style; this.sub = q('.news-sub').style; this.mag = q('.news-mag').style;
    this.L1 = UI.letters(q('.news-l1'), 4, 1.85, 0.45); this.L2 = UI.letters(q('.news-l2'), 6, 2.35, 0.12);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.012);
    const slam = (st, p, rot) => { st.opacity = p > 0 ? 1 : 0; st.transform = 'rotate(' + rot + 'deg) scale(' + lerp(1.35, 1, eob(p, 1.5)) + ')'; };
    slam(this.a, seg(t, -0.2, 0.15), -4);
    slam(this.b, seg(t, 0.85, 1.15), 3);
    this.sub.opacity = eo(seg(t, 1.7, 2.0));
    UI.reveal(this.L1, t); UI.reveal(this.L2, t);
    UI.slam(this.stamp, t, 2.65, 0.2, -12, 1.8); if (t >= 2.65) this.stamp.opacity = 0.92;
    const mp = eio(seg(t, 2.8, 4.4));
    this.mag.opacity = t >= 2.8 ? 1 : 0;
    this.mag.transform = 'translate(' + lerp(1150, -560, mp) + 'px,' + (lerp(1300, 900, mp) + Math.sin(mp * Math.PI) * -260) + 'px) rotate(' + lerp(35, -25, mp) + 'deg)';
    UI.glitch(kit, t, 0, 12);
  },
});