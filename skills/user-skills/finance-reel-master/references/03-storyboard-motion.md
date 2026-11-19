> Reference for Stage 3 of the `finance-reel-master` skill. Paths like `scripts/...` and `assets/...` are relative to the master skill folder. Handoff names (`finance-reel-0X-...`) refer to the next stage's reference file `references/0X-...md`.

# Stage 3: Storyboard & Motion Graphics

This stage outputs a **shot-by-shot storyboard** plus an **asset list** and a **build plan**. With no face on screen, motion carries attention and credibility. The design job is to make one number or mechanism instantly understood on a phone, in under 3 seconds per shot.

## Core principles

- **Visual change every 1.5–3 s** (0.5–1.5 s in the hook). Holds of 2–3 s are only for the payoff number or a chart the viewer must read.
- **Original frames only.** Rebuild every chart. Place archival or stock footage *inside* designed frames (torn-paper masks, newspaper columns, TV/phone frames), never as generic full-screen filler. Never show another app's watermark.
- **Truthful data-viz.** Bar charts start at zero, comparisons share a scale, every chart shows its unit and a source line. Finance audiences notice manipulated axes.
- **Mobile-first legibility.** Text height is at least 48 px, contrast is 4.5:1 or better, there is one chart per screen, and each chart has 5 data points or fewer.
- **Safe zones.** Critical content stays inside x 65–950, y 270–1250 on 1080×1920. Use `assets/safe_zone_overlay_1080x1920.png` as a guide layer and disable it before render.

## Layout grid (1080×1920, 9:16)

| Zone | Y range | Contents |
|---|---|---|
| Top UI | 0–270 | Background only |
| Headline | 270–600 | 3–6 word headline / section label |
| Hero | 600–1050 | Chart, number, key visual |
| Caption band | 1050–1250 | Burned-in captions (Stage 6) |
| Bottom UI | 1250–1920 | Background only (Instagram caption, audio, username) |
| Right column | x 950–1080 | Background only (like/comment/send buttons) |

The grid crops the cover to 3:4 (y 240–1680) and the feed to 4:5 (y 285–1635).

## Style presets

Pick one preset per series and keep it consistent. A recognisable look is what turns a viewer into a follower.

### P1 "LEDGER" (default): data-viz on a B&W collage base
- **Base:** newsprint off-white (~#EDE9E0) or near-black (~#111111); choose one per series.
- **Imagery:** black-and-white high-contrast photos with halftone or grain, torn-paper edges, slight drop shadow, cut-out objects (coins, notes, buildings, people from archives).
- **Colour:** ONE accent, reserved for the key number, highlighter sweeps and the "answer". Use the brand accent if one exists; otherwise signal red (~#E5322D) or highlighter yellow (~#F2C230).
- **Type:**
  - Headlines: condensed heavy sans, all caps, tight tracking (e.g., Anton, Bebas Neue, Oswald, or the brand face).
  - Labels and sources: newspaper serif (e.g., Libre Baskerville, IBM Plex Serif).
  - Numbers: tabular figures.
- **Texture:** paper grain overlay at 8–15% opacity, subtle film grain.
- **Motion:**
  - Snappy in (6–8 frames, ease-out) and out (4–6 frames, ease-in).
  - Cut-outs land with ±2° rotation.
  - Optional stop-motion feel on collage layers (posterise time 12 fps) while the camera moves at full frame rate.
- **Transitions:** paper tear, cut-out slide-in, whip-pan, stamp.
- **If the `kinetic-collage-typography` skill is available,** use it for warped and layered collage word typography in this preset.

### P2 "FRONT PAGE" (news-jacks, 24-hour turnaround)
- Newspaper clippings (rebuilt, not photographed from rivals) fly in on a 3D tilt, with a push-in on the key paragraph and a highlighter sweep.
- Numbers are stamped in the accent colour, with a source chyron at the bottom of the hero zone.
- Fast to template, and it reads as "news" instantly.

### P3 "ATLAS" (trade, remittances, geopolitics, tourism)
- Dark map, muted landmasses, route lines drawing on in the accent colour, country fills, counters at endpoints.
- Use a consistent map projection and labels at least 40 px.

### P4 "TYPE ONLY" (under 30 s quick takes)
- Kinetic typography on a solid colour, plus counters.
- Cheapest to make. Use it for single-stat reels, not for complex mechanisms.

**Alternatives** (use only when the topic needs them):
- 2D characters for personal-finance stories.
- Isometric 3D for "how the system works" hero pieces (high cost).
- Document/screen style for filings, app walkthroughs and "receipts" (high trust).

## Data-viz library

| Device | Use when | Animation spec |
|---|---|---|
| Counter | Every hero number | 0.6–1.2 s ease-out to the final rounded value; hold ≥1.5 s; unit + currency always shown |
| Bar / bar race | Ranking, A vs B, over time | Grow from a zero baseline, staggered 3–4 frames; value labels on bars |
| Line draw | Trends, lags, "the moment it changed" | Trim-path draw 1–2 s; event marker and the post-event segment in the accent colour |
| Waterfall | "Where your money goes" | Steps drop in sequence with labels |
| Donut / pie | Shares of a whole (≤5 slices) | Sweep-on 0.8 s; label the biggest slice only |
| Dot grid | Scale ("1 dot = Rs. 1 bn") | Dots fill by row; legend first |
| Scale comparison | Big numbers vs familiar objects | Camera pull-out reveal |
| Split-screen | Then vs now, fixed vs floating | Vertical split; matching scales |
| Map route | Flows between places | Route draws on; counter at the destination |
| Ranked list | Top 5 | One item per 1–1.5 s, #1 last |

**Counter expression (After Effects):** add a Slider Control named "Count" to a text layer and keyframe it. AE slider controls cap at ±1,000,000, so for larger figures count in millions or billions and put the unit in text.

```
var v = Math.round(effect("Count")("Slider"));
var s = v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
"Rs. " + s + " bn";
```

## Typography & colour rules

**Text sizes:**
| Element | Size |
|---|---|
| Headline | 90–140 px |
| Hero number | 160–260 px |
| Labels | 48–60 px |
| Source line | 28–32 px, 70% opacity |

**Words per element:**
| Element | Max words |
|---|---|
| Headline | 6 |
| Labels | 3 |

**Colour:**
- Use one accent colour at a time.
- Use green and red for up and down only, and always pair them with an arrow or sign. Many viewers are colour-blind.

**Sinhala and Tamil:**
- Use well-hinted Unicode fonts, such as Noto Sans/Serif Sinhala or Noto Sans Tamil.
- Check that conjuncts (*bandi akuru*) render correctly at mobile size.
- Keep numerals as Western digits.

**Logo:**
- A small corner bug inside the safe zone, or on the end frame only.
- Never a large watermark.

## Storyboard template

```
| Shot | In–Out (s) | VO line | Visual description | Preset elements | Data/asset + source | On-screen text | Motion (in/out, easing) | Transition out | SFX cue |
|------|-----------|---------|--------------------|-----------------|---------------------|----------------|-------------------------|----------------|---------|
| 01 | 0.0–1.2 | "The Central Bank just cut rates." | Policy-rate counter ticks down on newsprint | Ledger, accent red | CBSL release {date} | RATE CUT | Counter ease-out 0.8 s | Whip | Tick + low boom |
```

Every shot is 3 s or shorter unless it is the payoff hold. Number shots to match the script beats.

## Asset list

For each asset, record: ID, type (photo / AI plate / icon / chart data / logo / footage), source and licence, a treatment note (e.g., "B&W halftone, torn edge"), and its status. Brand logos are for editorial reference only, and must not imply endorsement. For realistic AI-generated imagery, flag it for an AI label at publish.

## Build plan & tool mapping

**After Effects (directly, or via a Bridge MCP connection):**
1. Create the comp: 1080×1920, 30 fps (or 25 fps if reusing PAL broadcast footage), duration = script length + 0.5 s.
   - Via Bridge: `ae_create_composition`.
2. Add the safe-zone overlay as a guide layer.
3. Build the background, texture and grain.
   - Via Bridge: `ae_add_solid_layer`, `ae_apply_effect_template`, e.g., filmGrain.
4. Import plates and cut-outs.
   - Via Bridge: `ae_import_image`; use `ae_add_mask` for torn-edge masks.
5. Add headlines and labels.
   - Via Bridge: `ae_add_text_layer`, `ae_create_text_animator`, `ae_style_text`.
6. Add charts and bars as shape layers, and counters via the expression above.
   - Via Bridge: `ae_add_shape_layer`, `ae_add_expression_control`, `ae_set_expression`.
7. Animate.
   - Via Bridge: `ae_set_keyframes` / `ae_set_keyframe_advanced`, `ae_apply_easy_ease`, `ae_apply_expression_template`.
8. Verify the build.
   - Via Bridge: `ae_export_contact_sheet`, `ae_audit_frame` and `ae_audit_motion` to check legibility, safe zones and that things actually move, then `ae_finalize_build`.
9. Template it: save charts, counters and caption systems as precomps or MOGRTs with exposed controls (value, label, accent colour). Each new reel should be ~70% assembly and ~30% custom.

**AI generation (e.g., Higgsfield, Artlist):**
- Generate plates no archive has: historic recreations, abstract concepts, products.
- Prompt for a neutral, well-lit subject on a plain background so it cuts out cleanly.
- Then stylise it into the preset (B&W, halftone, grain), so it reads as collage material rather than "AI look".
- Never generate fake documents, fake charts or realistic depictions of real people saying things.

**Canva:** covers, carousel cut-downs and quick Type Only variants.

## QA before handing to edit

- [ ] Contact sheet: every frame is readable at phone size, and nothing critical is outside the safe zone.
- [ ] Charts: zero baselines, units, source line, and 5 data points or fewer.
- [ ] Visual change every 3 s or less; payoff hold 2–3 s.
- [ ] One accent colour used consistently for "the answer".
- [ ] Asset licences logged; AI plates flagged.

## Handoff

Pass the storyboard, assets and rendered motion (or project) to Stage 5 (`finance-reel-05-edit-assembly`). Pass the SFX cue column to Stage 4 (`finance-reel-04-sound-design`).
