> Reference for Stage 4 of the `finance-reel-master` skill. Paths like `scripts/...` and `assets/...` are relative to the master skill folder. Handoff names (`finance-reel-0X-...`) refer to the next stage's reference file `references/0X-...md`.

# Stage 4: Sound Design

This stage outputs a **VO direction sheet**, a **music brief and selection**, an **SFX cue sheet**, **mix targets** and a **licence log**.

Sound makes a faceless explainer feel premium and keeps pace. Most viewers watch muted, though, so sound must **enhance** the message and never carry information alone. Anything important is also on screen.

## Core principles

- **VO is king.** It is the loudest, clearest element. Music and SFX serve it.
- **Licensed only.** Business accounts can't legally use most trending commercial songs; Meta's library is for personal, non-commercial use. Use licensed libraries (e.g., Artlist) or Meta's Sound Collection. Log every licence.
- **Sound follows the edit's energy curve:** dense in the hook, lighter in context, rising into the twist, with a drop or silence under the payoff.

## Step 4.1: Voice-over

**Human or AI:**
- **Human house voice:** best for flagship series and brand recognition, and best for Sinhala.
- **AI voice:** fine for volume, drafts and quick news-jacks.
- Test AI Sinhala carefully. Quality varies, and mispronunciations destroy trust.

**Direction sheet:**

```
VO DIRECTION: {title}
Voice: {name / AI voice ID}   Language: {EN / SI / bilingual}
Persona: smart friend who reads the business pages; confident, curious, never preachy
Pace: 160–180 wpm (hook slightly faster; payoff slower)
Energy: lift on numbers and rehooks; 0.2 s pause before the payoff line
Emphasis words: {list the 5–8 words to stress, usually numbers and the twist}
Pronunciations: {company names, acronyms: e.g., "CBSL" = C-B-S-L; "AWPR" = A-W-P-R}
Avoid: news-anchor stiffness, upward inflection on statements, reading numbers digit by digit
```

**Recording spec:**
- 48 kHz / 24-bit WAV, quiet treated room, record 5 s of room tone.
- Clean-up: light noise reduction, de-ess, gentle compression (about 3:1, 3–6 dB gain reduction), high-pass around 80 Hz.

**AI VO tips:**
- Write numbers as words in the TTS input ("two point four trillion rupees") so they are pronounced correctly.
- Use commas and full stops to control pauses.
- Generate 2–3 takes and pick the most natural.
- Disclose synthetic voice if it imitates a real person (never clone a real person's voice without consent).
- Tools: e.g., Artlist `list_voices` → `generate_voiceover`, or Higgsfield `generate_audio`.

## Step 4.2: Music

| Arc / mood | Feel | BPM | Search terms |
|---|---|---|---|
| Why / mechanism | Curious, pulsing, light tension | 100–120 | "minimal pulse", "curious corporate", "documentary tension light" |
| Crisis / collapse | Dark, documentary, low drones | 80–100 | "dark documentary", "suspense pulse", "cinematic tension" |
| Growth / success story | Upbeat, driving, confident | 115–130 | "uplifting drive", "modern business", "confident beat" |
| News-jack | Urgent, newsroom, ticking | 110–130 | "news urgency", "ticking tension", "breaking pulse" |
| Myth-busting | Playful then serious | 100–120 | "quirky pluck", "playful minimal" |

**Music rules:**
- Instrumental only under VO (no lyrics fighting the words).
- Cut the track so a musical change lands on REHOOK 1 and a drop or stop lands under the PAYOFF.
- Fade out in the last 0.5 s, or loop-match the end to the start for loop endings.
- Keep one track per reel and one sonic signature per series.
- Tools: e.g., Artlist `search_music`, Meta Sound Collection; Premiere via Bridge `pr_detect_beats` to find cut points.

## Step 4.3: SFX palette

| SFX | Trigger | Level vs VO peak |
|---|---|---|
| Whoosh / swish | Transitions, whip-pans | −8 to −12 dB |
| Tick / click | Text pops, counter ticks | −10 to −14 dB |
| Typewriter | Headline type-on | −10 to −14 dB |
| Paper rustle + tear | Collage moves, paper-tear transition | −8 to −12 dB |
| Stamp / thud | Stamped numbers, verdicts | −6 to −10 dB |
| Coin / cash register | Money moments (sparingly) | −8 to −12 dB |
| Low boom / impact | Hook shock number, payoff | −6 to −8 dB |
| Riser | Into rehooks and the twist | −10 to −14 dB, ends on the cut |
| Glitch / static | Crisis, error, collapse | −10 to −14 dB |

**Density:** in the hook, up to 1–2 SFX per second. In the body, about one every 2–3 s on visual changes. Silence is also a tool: drop everything for 0.3 s before the payoff.

Tools: e.g., Artlist `search_sfx`.

## Step 4.4: SFX cue sheet

```
| Cue | Timecode | Trigger (word / visual) | Sound | Library / file ID | Level (dB vs VO) | Notes |
|-----|----------|-------------------------|-------|-------------------|------------------|-------|
| 01 | 00:00.00 | Counter starts | Tick roll | artlist:{id} | −12 | Sync ticks to digits |
| 02 | 00:00.90 | Number lands | Low boom | artlist:{id} | −7 | Tail under VO |
```

Build the cue sheet from the storyboard's SFX column and the script's stressed words.

## Step 4.5: Mix targets

| Element | Target |
|---|---|
| VO | Peaks around −6 to −3 dBFS; always intelligible on phone speakers |
| Music | 18–24 dB under VO while speaking; can rise 6–10 dB in VO gaps |
| SFX | Just under VO peaks (see palette) |
| Master loudness | ≈ −14 LUFS integrated |
| True peak | −1 dBTP |
| Format | AAC, 48 kHz, stereo |

**Phone check:** play through a phone speaker at 50% volume. If any VO word is masked, duck the music further. Premiere via Bridge: `pr_add_music_bed`, `pr_duck_music`, `pr_set_audio_level`, `pr_add_audio_fade`.

## Step 4.6: Licence log

Record for every audio item: item, library, track/SFX ID, licence type, licence holder account, date downloaded, and the project it was used in. Keep this with the project files, because platform claims are resolved with it.

## Output format

1. VO direction sheet.
2. Music brief, plus 2–3 track picks with reasons.
3. SFX cue sheet.
4. Mix targets (as above, with any deviations noted).
5. Licence log rows.

## Handoff

Pass the VO file, music, SFX and cue sheet to Stage 5 (`finance-reel-05-edit-assembly`).
