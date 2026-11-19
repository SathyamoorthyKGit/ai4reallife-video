const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [{ t: 0, cx: 1700, cy: 960, z: 1.05, r: 5 }, { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox }, { t: 7.05, from: 0.4, cx: 540, cy: 975, z: 1.03, r: 1 }, { t: 7.4, from: 7.05, cx: 540, cy: 2600, z: 1.05, r: 3, ease: kit.ei }];
kit.scene('versus', {
  init(kit) {
    this.v = UI.build(kit,
      '<div class="words" style="left:0;top:300px;width:1080px;align-items:center;gap:4px"><h1 class="line vs-l" style="font-size:110px">Chatbot</h1><p class="sub vs-k">vs</p><h1 class="line pink vs-l2" style="font-size:110px">Agent</h1></div>' +
      // left: a chatbot answers
      '<div class="chat vs-ch" style="left:70px;top:640px;width:450px;height:430px"><div class="hd">Chatbot</div><div class="msg me vs-q" style="font-size:30px">How do I fix the colour?</div><div class="msg ai vs-a" style="font-size:30px">Try curves, then...</div></div>' +
      '<div class="words vs-t1" style="left:70px;top:1100px;width:450px;align-items:center"><span class="node" style="font-size:36px">Answers</span></div>' +
      // right: an agent does the steps
      '<div class="chat vs-ag" style="left:560px;top:640px;width:450px;height:430px"><div class="hd">Agent</div></div>' +
      UI.anim(kit, 'robomouse', 'vs-rb', 'left:600px;top:700px', 330) +
      [0, 1, 2].map(i => '<svg class="art" viewBox="0 0 1080 1200" style="height:1200px"><path class="pk-line vs-tick" d="M' + (900) + ' ' + (760 + i * 90) + ' l16 18 l30 -36" style="stroke-width:10"/></svg>').join('') +
      '<div class="words vs-t2" style="left:560px;top:1100px;width:450px;align-items:center"><span class="node" style="font-size:36px;background:var(--main)">Does the steps</span></div>',
      2000, '', 'soft', UI.ghost('Versus', -60, 1450, 420));
    const q = this.v.q;
    this.L = UI.letters(q('.vs-l'), 921, 0.6, 0.35).concat(UI.letters(q('.vs-l2'), 922, 2.9, 0.3)); this.k = q('.vs-k').style;
    this.ch = q('.vs-ch').style; this.qq = q('.vs-q').style; this.a = q('.vs-a').style; this.t1 = q('.vs-t1').style;
    this.ag = q('.vs-ag').style; this.rb = q('.vs-rb').style; this.tk = [...kit.stage.querySelectorAll('.vs-tick')].map(e => UI.draw(e)); this.t2 = q('.vs-t2').style;
  },
  render(t, kit) {
    UI.view(this.v.world, KEYS, t, 0.004);
    UI.reveal(this.L, t); this.k.opacity = eo(seg(t, 2.6, 2.8));
    UI.pop(this.ch, t, 0.5, -2, 300); this.qq.opacity = eo(seg(t, 0.9, 1.1)); this.a.opacity = eo(seg(t, 1.4, 1.6));
    UI.slam(this.t1, t, 1.6, 0.2, -2, 1.4);
    UI.pop(this.ag, t, 2.9, 2, 300); UI.pop(this.rb, t, 3.2, -4); UI.frame(this.rb, t);
    // the agent clicks through three steps by itself
    this.rb.transform += ' translate(' + Math.sin(t * 6) * 8 * seg(t, 3.6, 6.4) + 'px,' + (seg(t, 3.6, 6.4) * 160) + 'px)';
    this.tk.forEach((f, i) => f(eio(seg(t, 4.3 + i * 0.6, 4.55 + i * 0.6))));
    UI.slam(this.t2, t, 4.9, 0.2, 2, 1.4);
    UI.punch(this.v.roll, t, [1.6, 2.9, 4.9], 0.04);
  },
});
