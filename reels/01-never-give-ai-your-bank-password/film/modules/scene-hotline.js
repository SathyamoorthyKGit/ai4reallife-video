const { seg, eo, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 540, cy: 820, z: 1.0 }, { t: 2.6, from: 1.9, cx: 540, cy: 1350, z: 1.02 }, { t: 4.4, from: 2.8, cx: 540, cy: 1700, z: 0.9 }, { t: 7, from: 5.4, cx: 540, cy: 1640, z: 0.82 }];
kit.scene('hotline', {
  init(kit) {
    kit.css('.hot-rc{position:absolute;left:200px;top:1120px;width:520px;height:960px;background:color-mix(in srgb, var(--ground) 10%, #fff);box-shadow:20px 28px 30px rgba(0,0,0,.28);padding:30px 34px;box-sizing:border-box;clip-path:polygon(0 0,100% 0,100% 98%,92% 100%,84% 98.6%,74% 100%,64% 98.4%,52% 100%,40% 98.6%,28% 100%,16% 98.4%,6% 100%,0 98.6%)}' +
      '.hot-row{height:100px;border-bottom:2px dashed color-mix(in srgb, var(--second) 25%, var(--ground));display:flex;flex-direction:column;justify-content:center;gap:4px;font-size:34px}' +
      '.hot-who{font-family:"Regarn-700", var(--sans, system-ui, sans-serif);font-size:24px;letter-spacing:.1em;text-transform:uppercase;color:color-mix(in srgb, var(--second) 55%, var(--ground))} .hot-red .hot-who{color:var(--main)}');
    const items = ['Transfer out −$500', 'New payee added', 'Card limit raised', 'Address changed', 'Support call: 4 min', 'Transfer out −$1,200', 'Password reset', 'New device linked', 'Transfer out −$300', 'Transfer out −$900'];
    let rows = ''; for (const s of items) rows += '<div class="hot-row"><span>' + s + '</span><span class="hot-who">by alex.m</span></div>';
    this.v = UI.build(kit,
      '<div class="ghost" style="left:-80px;top:2250px">Your name</div>' +
      '<div class="words" style="left:80px;top:300px;gap:6px"><p class="sub hot-k">Calling customer support</p><h2 class="blk hot-num" style="font-size:104px;min-height:92px"></h2><p class="b7 hot-st" style="font-size:40px;color:var(--accent);min-height:48px"></p></div>' +
      '<div class="hot-desk" style="position:absolute;left:60px;top:640px;width:460px;transform-origin:50% 90%">' + UI.img(kit, 'deskphone.webp', '', 'left:0;top:0;width:500px') + '</div>' +
            '<div class="hot-hand" style="position:absolute;left:600px;top:700px;width:520px;transform-origin:50% 100%">' + UI.img(kit, 'handset.webp', '', 'left:0;top:0;width:520px;transform:scaleX(-1)') + '</div>' +
      '<div class="hot-rc"><div class="hot-in">' + rows + '</div></div>' + '<div class="words" style="left:120px;top:1800px;gap:14px"><span class="tape hot-sub" style="font-size:52px;transform:rotate(-3deg)">Nobody asked</span><span class="tape hot-tape" style="font-size:70px">Under your name</span></div>' +
      '<svg class="art" viewBox="0 0 1080 2900" style="height:2900px"><g class="stroke" style="stroke-width:6"><path class="hot-w1" d="M540 700 a40 40 0 0 1 0 70"/><path class="hot-w2" d="M565 680 a66 66 0 0 1 0 110"/><path class="hot-w3" d="M590 660 a92 92 0 0 1 0 150"/></g></svg>', 2900);
    const q = this.v.q;
    this.desk = q('.hot-desk').style; this.hand = q('.hot-hand').style; this.num = q('.hot-num'); this.st = q('.hot-st'); this.k = q('.hot-k').style;
    this.w = [1, 2, 3].map(i => q('.hot-w' + i).style); this.rc = q('.hot-rc'); this.inn = q('.hot-in').style; this.sub = q('.hot-sub').style; this.tape = q('.hot-tape').style;
    this.typ = kit.typist('1-800-555-0199', 0.4, 14, 3);
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.008);
    this.k.opacity = eo(seg(t, -0.1, 0.25));
    this.num.textContent = this.typ.at(t);
    const secs = Math.max(0, Math.floor(t - 1.9));
    this.st.textContent = t < this.typ.end ? '' : t >= 1.9 ? 'Connected · 00:0' + secs : 'Ringing…';
    const ring = t > 0.3 && t < 1.9;
    this.desk.transform = 'rotate(' + (ring ? Math.sin(t * 46) * 1.8 : 0) + 'deg)';
    this.w.forEach((s, i) => { s.opacity = !ring ? 0 : 0.25 + 0.75 * Math.max(0, Math.sin((t - i * 0.2) * Math.PI / 0.6)); });
    const up = eob(seg(t, 1.9, 2.4), 1.4);
    this.hand.transform = 'translate(' + lerp(300, 0, eo(seg(t, 0, 0.6))) + 'px,' + lerp(80, -60, up) + 'px) rotate(' + (lerp(16, -6, up) + Math.sin(t * 1.4) * 1.5) + 'deg)';
    this.inn.transform = 'translateY(' + (-Math.max(0, t - 1.0) * 30) + 'px)';
    this.rc.classList.toggle('hot-red', t >= 4.7);
    this.rc.style.opacity = eo(seg(t, 1.9, 2.3)); this.rc.style.transform = 'translateY(' + lerp(80, 0, eo(seg(t, 1.9, 2.4))) + 'px)';
    this.sub.opacity = eo(seg(t, 4.0, 4.3));
    UI.slam(this.tape, t, 4.4, 0.22, -6, 1.6);
    UI.glitch(kit, t, 0, 22);
    UI.glitch(kit, t, 7, 23);
  },
});