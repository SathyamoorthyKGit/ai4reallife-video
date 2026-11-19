# Style guide - the AI for Real Life reel look

Copied from a reference video Sathya supplied, then branded. Every reel must look like it belongs next to reels 01-09.

## The world

- **Paper wall**: `UI.wall()` puts `paper2.webp` (multiply) over a radial grey ground (`--ground #D6D6D6`, lighter centre, darker edges). Never a flat colour background.
- **Light**: every scene picks one light mode in `UI.build(..., mode)`: `window` (drifting window-blind shadows + hot spot), `spot` (stage beam from above), `soft` (wandering light leak), `dark` (heavy vignette for tension). Lights move slowly by themselves (`UI.lit`).
- **Ghost word**: a huge outlined Allenoire word behind the action (`UI.ghost('Agent', -60, 1240, 440)`) on the parallax back plane - one per scene, the scene's theme word.
- **Stickers**: Sathya's own sticker cut-outs (B&W halftone early reels, full-colour pop-art from reel 7 on) with a heavy soft drop shadow (`.cut` = `drop-shadow(20px 28px 16px rgba(0,0,0,.36))`). Animated GIF stickers play as 6-frame loops (`UI.anim` + `UI.frame`, 0.24 s per frame). Stickers **pop** in with overshoot (`UI.pop`), never fade in politely.
- **Stock clips**: B&W, torn-paper frame (`UI.vid`), halftone overlay - only clips Sathya supplies.

## Type system (classes in base.css)

| Role | Class | Font | Use |
|---|---|---|---|
| Kicker | `.sub` | Morven-400, 46 px, letter-spacing .14em, uppercase, 70% ink | the half-sentence above a headline ("Nearly everything was about") |
| Headline | `.line` (`.xl` 260, `.m` 150, `.s` 110) | Allenoire-400, 200 px, uppercase | the big word; revealed **letter by letter in random order** (`UI.letters(el, seed, t0, span)` + `UI.reveal`) with keyboard SFX per letter |
| Pink headline | `.line.pink` | | the punch word |
| Tape | `.tape` (`.pk` pink, `.bl` blue, default ink) | Regarn-900 | section labels ("01 · An agent in every app"), slammed in with `UI.slam` and a small rotation |
| Stamp | `.stamp` (`.solid` = cream filled) | Regarn-900, pink border, multiply | verdicts ("In beta", "Approve", "Already there") - slammed from scale 1.7-1.8 |
| Node | `.node` | Regarn-900 on ink / pink / blue | short labels and steps |
| Tag | `.tag` | Regarn-700 | small notes, sources ("Preview · reported for early 2027") |
| Lower third | `.lt` | Regarn 900/700 | event / place / date ("Adobe MAX / Miami Beach · Nov 10-12") |
| Big number | `.num` / Allenoire in pink or blue | | stats, counted up (68%, 77%) |
| Headline strip | `.hs` | Regarn-900 34 px on cream | flying news-headline strips |

Rules: uppercase everywhere except body-like lines; one idea per frame; text sits on the safe zone (see rules); Western European glyphs only.

## Colour

Grey/ink world + **pink `#FB3779` (`--main`)** and **blue `#3C46FD` (`--accent`)** as the only accents (from the AI for Real Life logo: blue background, white lettering, pink speech-bubble sparkle). Alternate pink/blue for items in a row. Hand-drawn pink marks (`.pk-line`, `UI.draw` to animate the stroke): ticks, arrows (`UI.arrowHead`), underlines, circles.

## Camera (pro rig)

Every scene has a camera key list `KEYS` over a tall world (`h` = 2000-3400 px) - the camera **travels** instead of cutting:

```js
const KEYS = [
  { t: 0, cx: 540, cy: -500, z: 1.05, r: 3 },                      // enter: whip down from above
  { t: 0.35, cx: 540, cy: 960, z: 1.0, r: 0, ease: kit.eox },       // land on part A
  { t: 7.6, from: 0.35, cx: 540, cy: 962, z: 1.01, r: 0 },          // slow push / hold
  { t: 7.95, from: 7.6, cx: 540, cy: 1960, z: 1.0, r: 1 },          // tilt down to part B (world y + 1000)
  { t: 17.0, from: 16.65, cx: -700, cy: 1970, z: 1.05, r: -5, ease: kit.ei }, // whip out sideways
];
UI.view(this.v.world, KEYS, t, drift);   // adds handheld noise, auto motion blur on fast moves, parallax back plane
UI.punch(this.v.roll, t, [hitTimes], 0.04);  // snap punch-ins on every slam/stamp
```

- Entrances/exits alternate direction scene to scene (down, side, side) so cuts feel like one continuous whip.
- Dutch tilt `r` of 1-5 degrees on moves; settle to 0 on holds.
- Punch-in (`UI.punch`) on every big hit, synced with the SFX hit.
- Hook scene starts **mid-action at frame 0** (no build-up), zoomed in (z 1.2-1.7) and pulls out.

## Motion vocabulary

- `UI.slam(st, t, at, dur, rot, fromScale)` - tapes, stamps, nodes land hard.
- `UI.pop(st, t, at, rot, dy)` - stickers spring up from below.
- `UI.card(st, t, in, out, rot, dy)` - name cards bounce in and shrink out.
- `UI.type(el, text, t, at, cps)` - typed text in chat boxes / UI.
- `UI.letters` + `UI.reveal` - random-letter headline reveal.
- `UI.draw(path)` - pink strokes draw on.
- `UI.glitch(kit, t, at, seed)` - glitch blocks at hard cuts (keep under 3 flashes/s).
- Numbers count up with `eo` easing; things that "go wrong" glitch/shake; things that are "done" get a stamp.

## Story shape (what worked)

1. **Hook (0-5 s)**: a visual that stops the scroll in the first frame (headline avalanche freezing grey, a password typing itself, a hammer dropping), the topic's promise on a stamp ("3 changes that matter").
2. **Setup** with a real-world anchor (event lower third, news headline cards with date stamp).
3. **Numbered sections** "01 · ...", "02 · ...", "03 · ..." each with its own sticker metaphor (jukebox = pick a model, travel adapter + power strip = MCP, snail = late, dart = 68%, gavel = final call).
4. **The catch / twist** with stats.
5. **Payoff / CTA** in one line ("Brief + judgement").
6. **Brand end card** (2.4 s).
