# Film architecture (Claude Motion artifact)

A reel is one **Motion** artifact. Its content lives in the artifact's store, written with the `ArtifactData` tool (never published as files). Create the film once with the Artifact tool: `type_url` = the Motion type link from `Artifact list scope:"types"`, `title` = reel title, `auto_open:"after_first_write"`.

## Store documents

| Doc | Content |
|---|---|
| `assets/<file>` | `{ref:"/_blob/<id>", mime, w, h}` - after uploading the file with Artifact `publish` + `url` + `asset:true` + `file_paths` (max 25 per call). Fonts: `mime:"font/woff2"`. |
| `film/meta` | `{v:1, title, updatedAt}` |
| `modules/base.css` | world, type and component styles (`#stage` holds the colour vars) |
| `modules/shared.js` | `window.UI = {...}` helper library (below). Must load before scenes. |
| `modules/scene-<id>.js` | one per scene, `kit.scene('<id>', {init, render})` |
| `modules/score.js` | `kit.score(function (S, T) {...})` - SFX only; `T.<id>` = scene start |
| `modules/scenes.json` | `{v, stage:"final", look, palettes, theirs:1, width:1080, height:1920, fps:30, background:"#D6D6D6", fonts, scenes:[{id,name,dur,desc}]}` |
| `film/script` | `{code:"window.CUT = kit.scenes();"}` - **written last** |

Push order in one `batch` (max 50 writes / 1 MB): assets, film/meta, base.css, shared.js, scenes in film order, score.js, scenes.json, film/script. Over 50 writes: two batches. Later edits: `set` with `if_version` (from the last list/get/write). `scripts/build_push.py` builds the write list. Writes can use `file_path` pointing at a local JSON file.

## Scene pattern

```js
const { seg, eo, ei, eio, eob, lerp } = kit;
const KEYS = [/* camera keys, see style-guide */];
kit.scene('max', {
  init(kit) {
    this.v = UI.build(kit,
      worldHtml,             // the tall world: words, stickers, panels (moves with the camera)
      2400,                  // world height
      fgHtml,                // foreground: screen-locked layer (name cards, cursors, overlays)
      'spot',                // light mode: window | spot | soft | dark
      UI.ghost('Stage', -60, 1550, 460)); // back plane (parallax)
    const q = this.v.q;
    this.k = q('.mx-k').style; /* cache styles */
  },
  render(t, kit) {          // pure function of t (seconds into the scene) - no state, no timers
    UI.view(this.v.world, KEYS, t, 0.004);
    this.k.opacity = eo(seg(t, 0.2, 0.45));
    UI.punch(this.v.roll, t, [1.0, 6.6], 0.04);
  },
});
```

Prefix every class in a scene with a 2-letter scene code (`mx-`, `ag-`) and **never reuse a class name that already exists in base.css** for a different look (`.bar`, `.clip`, `.pin`, `.ring` already exist - a clash silently restyles your element).

## `shared.js` UI API (latest: reel 09)

| Function | What |
|---|---|
| `build(kit, world, h, fg, mode, back)` | builds ground + paper + lights + world + fg, returns `{world, roll, q}` |
| `view(st, keys, t, drift)` | camera: keys + handheld noise + motion blur + parallax; also animates lights |
| `track(keys,t)`, `toScreen(keys,t,x,y)` | camera maths; world point -> screen point |
| `punch(st, t, times, amt)` | snap zoom on hits (apply to `v.roll`); set `roll.transform='none'` to hold dead still |
| `roll(st, t, dur, inA, outA)` | roll-in / roll-out transitions |
| `wall(kit)`, `lights(mode)`, `lit(L,t)` | paper + light rigs |
| `img(kit, file, cls, style)` | still sticker `<img class="cut">` |
| `anim(kit, name, cls, style, w)` + `frame(st, t, off)` | animated 6-frame sprite (needs `UI.SPR[name]=[cellW,cellH]`); call `frame` every render |
| `SPR: {...}` | sprite cell sizes - regenerate per reel from the cutter output |
| `pop(st,t,a,rot,dy,d)`, `out(st,t,a,d)` | sticker pop-in / fade-out |
| `slam(st,t,a,d,rot,from)` | hard landing (tapes, stamps, nodes) |
| `card(st,t,a,b,rot,dy)` | name card bounce in at a, shrink out at b |
| `letters(el,seed,t0,span)` + `reveal(list,t)` | random-letter headline reveal |
| `type(el, text, t, a, cps)` | typewriter |
| `draw(path)` -> `p => ...` | animate SVG stroke; `arrowHead(x,y,ang,cls)` |
| `glitch(kit,t,at,seed)` | glitch blocks |
| `vid(kit, host, name, seed)` | torn-paper B&W stock clip |
| `jag(...)`, `screen(...)`, `login(...)`, `you()`, `agent()`, `num(n)`, `ghost(...)`, `push(...)` | misc builders from earlier reels |
| `slot(...)`, `slotAnim(...)` | **legacy logo slot - do not use any more** (see rules) |

`kit` helpers used: `seg(t,a,b)` (0-1 progress), `eo/ei/eio` easings, `eob(p, overshoot)`, `eox`, `lerp`, `rng(seed)`, `vnoise(seed)`, `kit.assets.url(file)`, `kit.h(html)`, `kit.stage`.

## Sprites (animated GIF stickers)

```js
anim(kit, name, cls, style, w) // <div class="cut spr" overflow:hidden><img src=strip style="width:600%;transform:translateX(calc(var(--f)*-16.6667%))"></div>
frame(st, t, off)              // st.setProperty('--f', floor((t+off)/0.24) % 6)
```
This `<img>` approach is the fix for "images are not showing" - never use `background-image:url()`.
