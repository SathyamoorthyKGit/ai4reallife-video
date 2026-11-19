---
name: ai4rl-motion-reel
description: Build Sathya's "AI for Real Life" Instagram Reel motion-graphic explainers as Claude Motion films - paper-collage look, pink/blue brand, animated GIF stickers, VO-locked timing, library SFX mix. Use for any AI for Real Life reel, explainer reel, or when Sathya sends a reel script + voice-over or sticker sheets.
---

# AI for Real Life - Motion Reel Pipeline

You are building one reel in a long-running series for **Sathya** (motion designer / creative director, Echelon Media) and the brand **AI for Real Life** (their own AI-education brand, site https://ai-for-real-life.vercel.app/). Nine reels have been made this way; they are in `reels/` of the repo and listed in `references/reels-catalog.md`. **Match them exactly**: same look, same camera language, same type system, same sound approach, same deliverables.

How Sathya works: fast, wants execution not essays, and wants you to **pitch ideas proactively** (hooks, visual metaphors). Mix of English/Sinhala, casual. Replies short.

## Read first (every reel)

1. `references/style-guide.md` - the look (non-negotiable)
2. `references/film-architecture.md` - the Motion store, `shared.js` UI API, scene pattern
3. `references/rules-and-gotchas.md` - logos, safe zone, glyphs, bugs already solved
4. `references/sound.md` - SFX-only score + MP3 mix
5. `references/workflow.md` - the per-reel steps and message formats
6. `template/modules/` - start every new film from these three files (`base.css`, `shared.js`, `scene-brand.js`). Copy the latest reel's `shared.js`/`base.css` if newer.

The film is a **Claude Motion artifact** (Artifact type "Motion"). Always follow the Motion type's own SKILL.md and reference pages as well (questions.md, voice.md, rough-cut.md, finalize.md, motion.md, film-api.md, sound.md, later.md). This skill adds Sathya's house style on top; where the type's rules are stricter (logos, flashes, privacy), the type wins.

## The per-reel loop (summary)

| Step | Sathya sends | You do / deliver |
|---|---|---|
| 1 | Script + ElevenLabs VO (mp3) | Fact-check the script (web search; flag anything shaky with a fix). Transcribe VO word timings (`scripts/vo_timings.sh`). Reply with: storyboard table (scene id, VO time range, VO line, visual), **one proactive hook idea for the first 3 s**, asset list, and **sticker-sheet prompts** (2x2 animated GIF sheets). |
| 2 | Sticker sheets (animated GIFs, 2x2 grids or single-sticker stage GIFs) | Cut them into 6-frame sprite strips (`scripts/cut_gif_sheet.py`), paint out any company logos inside them, build every scene, validate safe zone + glyphs + score, push the film. |
| 3 | - | SFX stem + VO mix MP3s (`references/sound.md`, `scripts/mix.sh`), delivered as files. Close with the Motion close line + the voice sentence. |
| 4 | Notes ("make X pink", "images not showing") | Edit only what is asked; follow the type's later.md; keep ids/timings; re-push changed modules with `if_version`. |

Details, message templates and the sticker-prompt format are in `references/workflow.md`.

## Hard rules (short version)

- **No company logos, ever** (Adobe, OpenAI, Google, Anthropic/Claude, Slack, Canva...), and no other company's proprietary UI or key visuals. Do **not** use still "logo slots" + timing sheet - Sathya cannot add logos in their editor. Instead make each name a **designed, animated name card in our type** that fits the story (see the reel 9 examples in `rules-and-gotchas.md`). If a user sticker sheet contains a logo, paint it out of the sprite.
- **IG Reels safe zone**: every text box inside x 44-1029, y 234-1675, and if bottom > 1172 then right edge <= 900. Check with the zone audit before pushing.
- Fonts carry Western European letters only: no `→ √ π ƒ ∞ … –` (use `-`), curly apostrophe `’` and middle dot `·` are fine.
- Assets always through `<img src=kit.assets.url(...)>`; never CSS `url()` for assets (the runner refuses non-data URLs, images vanish).
- Nothing flashes more than 3x per second; no scene under 1 s.
- **No music.** Score = SFX/foley only, every hit on its picture event.
- Deliverables are **MP3** (VO+SFX mix, SFX stem).
- VO: Motion films cannot carry their recording. Always end with: "I couldn't use your recording, but any video editor can add it to the video that Export saves."

## Brand constants

- Pink `#FB3779` = `var(--main)`, Blue `#3C46FD` = `var(--accent)`, ink `#2A2A2A` = `var(--second)`, wall grey `#D6D6D6` = `var(--ground)`. When Sathya says "our pink/blue", use these vars (never a third-party brand colour).
- Fonts (their files, in `library/fonts/`): **Allenoire-400** (huge headlines), **Morven-400** (spaced kicker lines), **Regarn 100/400/700/900** (tapes, stamps, labels, UI).
- End card: `scene-brand.js` - AI for Real Life logo (`library/brand/logo.webp`) pops onto brand blue, last ~2.4 s.
- Paper wall: `library/brand/paper2.webp`.
- 1080x1920, 30 fps, `background #D6D6D6`.

## Scripts (in `scripts/`)

| Script | Use |
|---|---|
| `vo_timings.sh VO.mp3` | word-level timings (pocketsphinx) + duration |
| `cut_gif_sheet.py SHEET.gif OUT n1 n2 n3 n4` | 2x2 animated sheet -> 4 sprite strips (`--bg` for flat backgrounds); prints `UI.SPR` sizes |
| `zones.py zones.json` | safe-zone audit report (zones.json from the Motion type's offline renderer `render.mjs ... zones 0,<dur>,0.1`; get render.mjs from the type's `render-offline.md`) |
| `scoretest.js score.js '{starts}'` | validates score.js names/times offline |
| `build_push.py FILM_DIR upload.txt "Title"` | builds the ArtifactData batch writes after asset upload |
| `sfx_lib.py` / `example_mix_reel09.py` | SFX stem builder (library WAVs in `library/sfx/`, set `SFX_WAV`) |
| `mix.sh stem.wav VO.mp3 DUR Name` | the two MP3 deliverables at about -14 LUFS |

## Where things are in the repo

- `reels/NN-*/film/` - exact source of every finished film (modules + assets), `vo/` voice-overs, `build/` per-reel cut + mix scripts.
- `library/` - fonts (woff2), brand logo + paper, shared stickers, SFX WAV library.
- `source-uploads/` - Sathya's original uploads (font TTFs, SFX MP3s, VOs, sticker sheets).
- `memory/` - what Claude knows about Sathya and their preferences.
