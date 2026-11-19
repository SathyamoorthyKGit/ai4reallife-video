> Reference for Stage 6 of the `finance-reel-master` skill. Paths like `scripts/...` and `assets/...` are relative to the master skill folder. Handoff names (`finance-reel-0X-...`) refer to the next stage's reference file `references/0X-...md`.

# Stage 6: On-Screen Captions

This stage outputs a **caption style spec**, a **caption file** (SRT), and **burned-in captions** on the master.

In a 2019 Verizon Media/Publicis survey, 92% of US consumers said they regularly watch video with the sound off, and 80% said they were more likely to finish a video with captions. Sound-on use is higher on Reels today, but captions remain the cheapest retention gain available. For a faceless explainer, the captions carry half the story.

## Core principles

- **Always burn in.** Also turn on Instagram's auto-captions for accessibility, but styled burned-in captions do the retention work.
- **Short chunks.** 1–4 words per chunk, so the eye never has to read a sentence while a chart is animating.
- **Captions = VO.** Captions match the VO verbatim, except numbers, which are written as digits with units ("Rs. 2.4 TN", "8.5%").
- **Don't fight the headline.** When a big on-screen headline or hero number is showing the same words, hide the caption. Duplicated text adds cognitive load.

## Style spec (defaults)

| Property | Ledger preset | Front Page preset | Type Only preset |
|---|---|---|---|
| Font | Bold sans (e.g., Inter Bold / Montserrat ExtraBold / brand face) | Bold sans on a paper strip | Matches the kinetic type |
| Size | 64–80 px cap height | 60–72 px | 70–90 px |
| Colour | White #FFFFFF | Black on off-white strip | Brand colour |
| Contrast | 6–8 px black stroke or soft shadow, or 70% black box | Paper strip box | Solid background |
| Keyword highlight | Accent colour on numbers / key nouns | Highlighter sweep behind the word | Scale pop 105% |
| Lines | 1 preferred, max 2 | 1 | 1 |
| Max characters per line | ~18–20 | ~18–20 | ~14 |

**Emoji:** no more than one per key beat. Prefer none on serious topics (debt, crisis, losses), where emoji erode trust.

## Placement

- Caption band: **y 1050–1250** on 1080×1920, centred at x = 540, inside x 65–950.
- Never place captions below y 1250 (Instagram's caption, audio and username UI) or right of x 950 (the action buttons).
- If the hero chart needs the caption band, move captions up to y 280–420 for that shot, or hide them when the chart's labels already say it.

## Chunking rules

1. Break at punctuation and natural phrase boundaries.
2. Keep currency + number + unit together ("Rs. 2.4 trillion", "8.5 percent").
3. Don't end a chunk on a weak word (the, of, to, and, your…). Push it into the next chunk.
4. Each chunk is on screen for at least 0.3 s. A key number gets 0.6 s or more, plus an accent highlight.
5. On-beat reveal: chunks appear exactly on the first syllable. Word-by-word "karaoke" highlighting within a chunk is optional.

**Generate a first-pass SRT from the script:**

```
python scripts/srt_from_script.py script.txt --wpm 165 --max-words 3 -o captions.srt
```

The timing is an estimate. Align it to the real VO using Premiere's Speech to Text, Resolve's subtitle tools, or by nudging by hand. The script's value is the chunking rules above.

## Language rules

- **English VO:** English captions.
- **Sinhala VO:**
  - Sinhala Unicode captions (Noto Sans Sinhala or the brand's Sinhala face).
  - Keep spoken English finance terms in English script if that's how they're said.
  - Western digits for numbers.
  - Check conjunct rendering at mobile size.
- **Bilingual test:** VO in one language and captions in the other, or a bilingual hook only. Test this as a trial reel before committing to it as a series format.
- Auto-transcription in Sinhala is unreliable. Always proofread every caption against the script.

## Implementation

- **Premiere Pro:** import the SRT as a caption track (via Bridge: `pr_create_caption_track`), apply a caption style preset, then burn in at export. For keyword colour, split the key-number captions onto graphic layers.
- **DaVinci Resolve:** import the subtitle track, set the style, and "Burn into video" on the Deliver page.
- **After Effects:** one text layer per chunk (or Source Text keyframes), with an animator for a 105% scale pop on entry over 3–4 frames. Use the `ae_add_text_layer` / `ae_create_text_animator` Bridge tools when connected.

## Caption QA

- [ ] Every chunk is 4 words or fewer and on screen for at least 0.3 s; numbers are digits with units.
- [ ] Captions sit inside y 1050–1250 (or move deliberately), never under the UI.
- [ ] Spelling and figures are proofread against the script and Research Pack.
- [ ] No duplicate caption while the same words are shown as a headline.
- [ ] Mute test passes.

## Handoff

Pass the captioned master to Stage 8 (`finance-reel-08-prepublish-qa`).
