> Reference for Stage 8 of the `finance-reel-master` skill. Paths like `scripts/...` and `assets/...` are relative to the master skill folder. Handoff names (`finance-reel-0X-...`) refer to the next stage's reference file `references/0X-...md`.

# Stage 8: Pre-Publish QA

This stage outputs a **QA report**: Pass / Fix list with **blockers** (must fix before posting) and **improvements** (fix if time allows).

QA protects the two things a finance explainer brand runs on: **trust** (accurate, sourced, compliant) and **distribution** (hook, retention, originality).

## How to run QA

1. Collect the materials:
   - Rendered reel (or script + storyboard if not rendered)
   - Research Pack
   - Publishing package
   - Cover
2. If you can view the video or frames, check them directly. Otherwise ask for, or work from:
   - Key frames, or a contact sheet (after the first 3 s, every 5 s, the payoff and the last frame)
   - The script
3. Run the three human tests below. Ask the user to run any that Claude can't run itself.
4. Go through the checklist. Mark each item ✅ pass, ❌ blocker or ⚠️ improvement.
5. Return the report in the format at the end.

## Three human tests

- **3-second test:** show only the first 3 seconds to someone who hasn't seen it. Can they say what the reel is about and why they'd keep watching? If not, the hook fails.
- **Mute test:** watch the whole reel with sound off. The story must still be clear.
- **Phone test:** watch on a phone at 50% brightness, at arm's length. Every word and number must be readable, and nothing important can sit under the Instagram UI.

## Checklist

### A. Accuracy & sources (all blockers)
- [ ] Every on-screen and spoken number matches a verified Research Pack row (value, unit, currency, period).
- [ ] Derived numbers have been recomputed.
- [ ] The latest available data is used, and the date is stated.
- [ ] A source line is on screen for every chart or hero number, and in the caption.
- [ ] No `{placeholders}` or "TO VERIFY" remain anywhere.
- [ ] Named companies and people: claims are factual, attributed and fair.
- [ ] No buy/sell/hold calls on securities. Investing topics carry the "educational, not financial advice" line.
- [ ] Charts are honest: zero baselines on bars, equal scales in comparisons, units shown.

### B. Hook & retention
- [ ] The first frame is already moving, and the subject is visible at 0 s. (blocker if not)
- [ ] Text, visual and spoken hook land within 2 s and say the same thing. (blocker if not)
- [ ] The hook is 12 words or fewer, with no greeting or logo intro.
- [ ] The open loop is set by 5 s and closed after ~70% of runtime.
- [ ] There is a rehook every 8–12 s, each with a visual change.
- [ ] A visual change happens at least every 3 s (except the payoff hold).
- [ ] The ending is a loop, save CTA, send CTA or series tease, lasting 2 s or less.
- [ ] Length is 30–60 s, or a longer length is justified by series data.

### C. Visuals
- [ ] All critical text, numbers and charts sit inside x 65–950, y 270–1250.
- [ ] Text is at least 48 px, with contrast of 4.5:1 or better and one accent colour used consistently.
- [ ] The preset and style are consistent with the series.
- [ ] No third-party app watermark; the logo bug is small or on the end frame only. (watermark = blocker)
- [ ] The safe-zone guide layer is disabled.
- [ ] No black frames, glitches, mismatched fonts or broken Sinhala/Tamil rendering.

### D. Audio
- [ ] VO is intelligible on a phone speaker at 50% volume.
- [ ] Music sits about 18–24 dB under the VO while speaking, and the payoff has a drop.
- [ ] Loudness is ≈ −14 LUFS integrated, −1 dBTP, with no clipping or pops.
- [ ] Every music track and SFX is licensed and logged. Business accounts can't use unlicensed commercial tracks. (blocker)

### E. Captions
- [ ] Captions are burned in, 1–4 words per chunk, and match the VO.
- [ ] Numbers appear as digits with units and are highlighted.
- [ ] Captions sit inside y 1050–1250, with no clash with headlines.
- [ ] Spelling has been proofread, including Sinhala.

### F. Compliance & originality
- [ ] The reel is original: rebuilt charts, own narration and design, no reposted clips as the main content. (blocker)
- [ ] Realistic AI imagery or a synthetic voice is labelled as Instagram requires. No fake documents, and no AI depictions of real people.
- [ ] Sponsored content uses the Paid partnership label.
- [ ] Logos are used for editorial reference only, with no implied endorsement.

### G. Publishing package
- [ ] The primary keyword is in caption line 1, the VO, on-screen text and alt text.
- [ ] The caption has takeaways, a source line, one CTA, and the series line.
- [ ] There are 3–5 relevant hashtags and no generic ones.
- [ ] Cover key text sits inside y 285–1635; the cover number matches the hook.
- [ ] The location tag and pinned comment are ready.
- [ ] Cross-post titles and captions are ready.

### H. Test setup
- [ ] 2–3 hook variants are exported (same body).
- [ ] The trial-reel plan is set: variants go to non-followers, results are reviewed at 24 h, and the winner is shared.
- [ ] A row has been added to the analytics log (Stage 9) with the hook formula, preset, language and length.

## QA report format

```
QA REPORT: {title}  |  Version: v{NN}  |  Verdict: READY / FIX BLOCKERS / REWORK

BLOCKERS (must fix):
1. [Section] Issue → exact fix (timecode if relevant)

IMPROVEMENTS (fix if time):
1. [Section] Issue → suggested fix

PASSED: A ✅  B ✅  C ⚠️  D ✅  E ✅  F ✅  G ⚠️  H ✅
Human tests: 3-sec {pass/fail}, Mute {pass/fail}, Phone {pass/fail}
Next: {publish / re-export / re-check numbers}
```

Be specific and actionable. "Hook is weak" is not useful. Instead: "Hook text 'Interest rates explained' states a topic, not a tension. Try 'Rate cut ≠ cheaper loan?' and show the frozen loan slip at 0 s."

## Handoff

After publishing, go to Stage 9 (`finance-reel-09-analytics-iteration`).
