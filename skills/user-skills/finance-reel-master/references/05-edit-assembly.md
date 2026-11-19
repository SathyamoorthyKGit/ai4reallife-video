> Reference for Stage 5 of the `finance-reel-master` skill. Paths like `scripts/...` and `assets/...` are relative to the master skill folder. Handoff names (`finance-reel-0X-...`) refer to the next stage's reference file `references/0X-...md`.

# Stage 5: Edit & Assembly

This stage outputs a **finished master** (1080×1920 MP4), a **clean cover frame**, **cross-post versions** and a **project archive**.

The edit turns a good script and good graphics into retention. With no presenter, rhythm comes from cutting to the voice.

## Core principles

- **Lock the VO first, then cut the picture to it.** Visual changes land on stressed words and numbers.
- **No dead air.** No frame sits static for more than 3 s without motion (push-in, parallax, drift). The only long hold is the payoff (2–3 s).
- **Mute-proof.** Captions and on-screen text carry the story without sound.
- **Clean export.** Never upload a file carrying another app's watermark or logo, because Instagram distributes it less.

## Assembly order

1. Lock the VO (cleaned, timed). Trim breaths over 0.3 s and tighten gaps to about 0.1–0.2 s.
2. Lay the picture to the VO, beat by beat, from the storyboard.
3. Edit the music to the VO: a change at REHOOK 1, a drop under the PAYOFF.
4. Place SFX from the cue sheet.
5. Add captions (Stage 6).
6. Do a colour/texture pass: consistent grade, grain and paper overlay.
7. Mix to −14 LUFS / −1 dBTP.
8. QA, then export.

## Timeline structure

| Track | Contents |
|---|---|
| V1 | Background / texture |
| V2 | Footage & plates (inside masks or frames) |
| V3 | Motion graphics (charts, counters, collage) |
| V4 | Headlines / labels |
| V5 | Captions |
| V6 | Logo bug (if used) |
| V7 | Safe-zone guide (disabled for render) |
| A1 | VO |
| A2 | Music |
| A3–A4 | SFX |

## Pacing rules

- **Cut density:** hook 0.5–1.5 s per visual. Body 1.5–3 s, about 4–6 visual changes per 10 s.
- **Energy curve:** high (hook) → medium (context) → rising (evidence/twist) → hold (payoff) → quick exit or loop.
- **Rhythm:** cut on the stressed syllable or number, not between words. Use J/L cuts for audio so motion leads the word slightly (2–4 frames).
- **Rehooks** must coincide with a hard visual change (new scene, scale jump, colour flip).
- **Payoff:** hold 2–3 s with a subtle push-in so the viewer can read and feel it.
- **Loop endings:** match the last frame's composition or colour to the first frame and trim so the restart feels seamless.

## Faceless techniques toolbox

- Push-ins and scale moves (100→110% over 2 s) on stills and charts.
- Parallax: split collage layers by depth and move them at different speeds.
- Speed ramps on archival footage into the key moment.
- Whip-pans and match cuts between related shapes (coin → globe → chart dot).
- Masks into frames: footage inside a TV, phone, newspaper column or torn paper.
- Highlighter sweeps and circle-ins on key words in documents.
- Freeze frame + stamp for verdicts ("FALSE", "UP 40%").

## Export spec (master)

| Setting | Value |
|---|---|
| Resolution | 1080×1920, 9:16, square pixels, progressive |
| Frame rate | 30 fps CFR (25 fps if the project is built from PAL broadcast footage) |
| Codec | H.264 High profile (or HEVC if the pipeline prefers) |
| Bitrate | VBR 2-pass, 12–20 Mbps |
| Colour | Rec.709 |
| Audio | AAC-LC, 48 kHz, stereo, 320 kbps; −14 LUFS integrated, −1 dBTP |
| Length | 30–60 s default (Instagram allows up to 3 min) |

Also export a **cover frame** as a 1080×1920 PNG, with the key text inside y 285–1635 so it survives the 4:5 feed crop and the 3:4 grid crop.

## Versions & naming

`{BRAND}_{Series}_Ep{NN}_{topic-slug}_{LANG}_{len}s_v{NN}.mp4`, e.g., `ECH_WhyDoes_Ep04_fd-vs-inflation_EN_45s_v03.mp4`.

**Versions to export:**
- **IG master.**
- **Hook variants B and C** for trial reels: same body, swap the first 2–3 s.
- **YouTube Shorts:** same master. Remove any Instagram-specific spoken CTA such as "send this", or keep it generic ("share this").
- **Facebook Reels:** same master.
- **Language versions** (EN / SI / bilingual) if testing.

## Tool mapping

**Premiere Pro (directly, or via Bridge MCP):**
1. Create the sequence, then import media.
   - Via Bridge: `pr_create_sequence` (1080×1920), `pr_import_media`.
2. Lay out the timeline.
   - Via Bridge: `pr_assemble_edit` or `pr_apply_cut_plan` to lay the timeline from the storyboard.
3. Add music and duck it under the VO.
   - Via Bridge: `pr_add_music_bed`, `pr_duck_music`.
4. Add transitions.
   - Via Bridge: `pr_add_transition`.
5. Add captions.
   - Via Bridge: `pr_create_caption_track` from an SRT (Stage 6).
6. Check for gaps.
   - Via Bridge: `pr_audit_audio_gaps`, `pr_close_gaps`.
7. Export.
   - Via Bridge: `pr_export_sequence_frame` for a spot check, then `pr_export_sequence` or `pr_add_to_render_queue`.

**DaVinci Resolve:** a 1080×1920 timeline; Fairlight loudness meter set to −14 LUFS; subtitle track import; Deliver page with the spec above.

**After Effects:** for motion-heavy reels, assemble in AE and render via the Media Encoder queue with the same spec.

## QA before export

- [ ] Watch once muted: the story is fully understandable.
- [ ] Watch once on a phone at 50% brightness: everything is readable and inside the safe zone.
- [ ] No static frame longer than 3 s except the payoff; rehooks land on visual changes.
- [ ] No black frames, gaps, or audio pops; the music ends cleanly.
- [ ] Loudness ≈ −14 LUFS; VO is intelligible over music.
- [ ] Safe-zone guide layer disabled; no third-party watermark.

## Handoff

Pass the master, variants and cover to Stage 7 (`finance-reel-07-post-caption-seo`) and Stage 8 (`finance-reel-08-prepublish-qa`).
