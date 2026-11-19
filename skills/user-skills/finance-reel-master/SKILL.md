---
name: finance-reel-master
description: Complete end-to-end production system for viral faceless business and finance explainer Reels (Instagram-first, cross-posted to Facebook Reels and YouTube Shorts). Covers idea generation and fact-checked research, hook-first scripting, storyboard and motion graphics, sound design, edit and export, burned-in captions, post caption/hashtags/cover/SEO, pre-publish QA, and analytics-driven iteration. Use this skill whenever the user wants to make, plan, research, script, design, animate, edit, caption, publish or improve a business, finance, economics, banking, investing, budget, inflation, interest-rate or company-story explainer reel or short, including "make a reel about X", "turn this news into a reel", "build a content series" or "help me go viral with finance content". Defaults are tuned for Echelon Media's Sri Lankan business audience and adapt to any brand.
---

# Faceless Finance Explainer Reels: Master Skill

This skill runs the whole pipeline from idea to analysed post. Each stage has a full playbook in `references/`. Read the reference file for a stage **before** doing that stage, because the rules, templates and gates live there.

## Default context (adapt if the user says otherwise)

- **Brand:** Echelon Media, a Sri Lankan business media brand (broadcast and editorial).
- **Audience:** business-literate Sri Lankans, plus younger Instagram users (18–24 is the largest Instagram age group in Sri Lanka).
- **Format:** faceless, 9:16, 30–60 s.
- **Language:** English by default; Sinhala or bilingual when testing or requested.
- **House style:** preset "Ledger": data-viz motion graphics on a black-and-white collage/newsprint base with one accent colour.
- **Toolchain (when connected):**
  - After Effects and Premiere Pro (via Bridge MCP)
  - DaVinci Resolve
  - Higgsfield (AI image/video/voice)
  - Artlist (music, SFX, AI VO)
  - Canva

## Operating principles (apply to every stage)

1. **One reel = one idea = one hero number or question.** Extra ideas become a series.
2. **Hook-first.** Within 2 s, a visual hook, text hook and spoken hook all say the same thing. Average skip rates sit around 60–66% in the first 3 s, so the hook decides the outcome.
3. **Engineer the send.** Instagram's top-three signals are watch time, likes per reach and sends per reach, and sends matter most for reaching non-followers. Every reel should make it obvious who to send it to.
4. **Original only.** Rebuild charts, narrate, design. No reposted clips as the main content, and no other app's watermark. Instagram demotes both.
5. **Designed for mute.** Burned-in captions and on-screen text carry the story without sound.
6. **Accuracy over speed.** Every number has a primary source, date and unit, and a second person checks it. Unverified numbers stay as `{placeholders}` until they are verified, or get cut.
7. **Length 30–60 s by default.** Go longer only when retention data for the series supports it.
8. **Safe zone.** Critical content sits inside x 65–950, y 270–1250 on 1080×1920.
9. **Licensed audio only** on business accounts. Log every licence.

## Pipeline

| # | Stage | Read first | Output | Gate to pass |
|---|---|---|---|---|
| 1 | Ideation & research | `references/01-ideation-research.md` | Idea Brief + verified Research Pack | Idea scores ≥24/35; fact-check lists done |
| 2 | Script | `references/02-script.md` | Timed beat-sheet script + 3 hook variants | Script QA passes; `scripts/script_timer.py` within target |
| 3 | Storyboard & motion | `references/03-storyboard-motion.md` | Storyboard, asset list, motion build | Contact sheet legible; charts honest; safe zones |
| 4 | Sound design | `references/04-sound-design.md` | VO, music, SFX cue sheet, licence log | VO intelligible; licences logged |
| 5 | Edit & assembly | `references/05-edit-assembly.md` | Master MP4, hook variants, cover | Mute + phone tests; −14 LUFS |
| 6 | On-screen captions | `references/06-onscreen-captions.md` | Caption spec, SRT, burned-in captions | 1–4 word chunks; inside caption band |
| 7 | Post caption & SEO | `references/07-post-caption-seo.md` | Publishing package | Keyword in line 1; ≤5 hashtags; source line |
| 8 | Pre-publish QA | `references/08-prepublish-qa.md` | QA report | Zero blockers |
| 9 | Analytics & iteration | `references/09-analytics-iteration.md` | Diagnosis, logs, monthly review | Learnings fed back into stages 1–2 |

## Modes: pick the one that fits the request

**A. Full production** ("make a reel about X"):
- Run stages 1 → 8 in order and deliver a **Reel Production Pack** (`assets/production_pack_template.md`).
- If tools are connected (After Effects or Premiere via Bridge, Higgsfield, Artlist), build the actual assets in stages 3–5.
- Otherwise deliver build-ready specs.

**B. Fast news-jack** (breaking business news, same-day):
- Stage 1, compressed: a single idea, a mini research pack of 3–5 verified numbers, sources from the official release.
- Stage 2: a 30–45 s script with the H4 "stakes" hook.
- Stage 3: the "Front Page" preset from templates.
- Stages 5–7, then the stage 8 blockers-only check.
- **Accuracy gates are never skipped.**

**C. Series planning** ("plan a month of content"):
- Run stage 1 at scale (20–30 ideas, scored).
- Group the ideas into 2–4 series with consistent presets, covers and openers.
- Add a calendar tied to known news dates and a test plan from stage 9.

**D. Single stage** (e.g., "write hooks", "check this reel", "why did this flop"):
- Jump to that stage's reference file and use its output format.

**E. Improve an existing reel:**
- Run stage 8 QA, plus stage 9 diagnosis if there are stats.
- Rework only what the evidence says to rework.

**Working style:** move fast. State assumptions in one line rather than asking many questions. Ask only when a missing input would change the output materially (e.g., language, length, or which preset a series uses). Offer ideas proactively: alternative hooks, a series angle, a test to run.

## Recommended series formats (defaults)

| Series | Preset | Length | Hook family | Purpose |
|---|---|---|---|---|
| "Why does…?" | Ledger | 45 s | H2 Why / H3 Contrarian | Evergreen business models; sends and saves |
| "The Number" | Ledger / Type Only | 20–30 s | H1 Shock number | Weekly single stat; fast to make |
| "Front Page" | Front Page | 30–45 s | H4 Stakes | 24-hour news-jacks: rates, budget, results |
| "Brand Stories" | Ledger + Atlas | 60 s | H5 Cold open | Company rise and fall stories; follows |

## Faceless style ranking (for finance)

1. Data-viz motion graphics: highest trust.
2. B&W collage / mixed media: signature look; reads as editorial.
3. News-clipping: fastest for news-jacks.
4. Map-based: geo and trade topics.
5. Document/screen style: receipts and filings.
6. Kinetic type only: quick takes.
7. 2D characters: personal-finance stories.
8. 3D/isometric: hero pieces only.
9. Stock B-roll + VO: generic, with originality risk.
10. AI-generated visuals: a supporting layer only, stylised and labelled.
11. Whiteboard: a dated feel.

Default to 1+2 combined (the **Ledger** preset).

## Quick reference card

- **Canvas:** 1080×1920, 30 fps (25 if using PAL broadcast footage), H.264, 12–20 Mbps, AAC 48 kHz, −14 LUFS / −1 dBTP.
- **Zones:**

| Zone | Y range (1080×1920) |
|---|---|
| Headline | 270–600 |
| Hero | 600–1050 |
| Captions | 1050–1250 |
| Cover text | 285–1635 |

  Nothing critical sits right of x 950 or below y 1250.
- **Script:** 45 s ≈ 115–130 words at 160–175 wpm. Hook of 12 words or fewer, sentences of 12 words or fewer. Rehook every 8–12 s. Payoff hold 2–3 s. CTA 2 s or less.
- **Edit:** visual change every 1.5–3 s (0.5–1.5 s in the hook).
- **Captions:** 1–4 words, 64–80 px, white with black stroke, accent on numbers.
- **Post:** keyword in line 1, takeaways, source, one send/save CTA, series line, disclaimer if investing, 3–5 hashtags.
- **Test:** 2–3 hook variants as trial reels; judge at 24 h on skip rate, average watch and sends per reach.

## Bundled files

| File | Use |
|---|---|
| `scripts/script_timer.py` | Duration, hook length, long sentences, rehook check for a script |
| `scripts/srt_from_script.py` | First-pass caption SRT with smart chunking (align to the VO afterwards) |
| `scripts/reel_metrics.py` | Per-reach ratios plus a diagnosis from the analytics log |
| `assets/safe_zone_overlay_1080x1920.png` | Guide layer for AE/Premiere/Resolve/Canva (disable before render) |
| `assets/analytics_log_template.csv` | One row per published reel |
| `assets/hook_library_template.csv` | One row per hook variant tested |
| `assets/production_pack_template.md` | The deliverable structure for full production |

## Caveats to keep in mind

- Instagram doesn't publish signal weights. Claims that sends count "3–5× more" than likes are folklore; Mosseri only says sends are slightly more important for unconnected reach.
- Benchmarks come from third-party analytics vendors and are directional. Always compare against the account's own median.
- Platform rules change. If web search is available, re-check hashtag limits, trial-reel features and music rules when they matter to a decision.
