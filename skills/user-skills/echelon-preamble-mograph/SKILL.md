---
name: echelon-preamble-mograph
description: >
  Build broadcast-quality motion graphics for Echelon podcast preambles in After Effects
  via Bridge MCP, with Higgsfield MCP generating cutaway visuals. Takes a raw speaker edit
  (no graphics) and builds a full AE composition: keyword typography with slam/scale animations,
  Higgsfield-generated concept cutaways, ECHELON watermark, and smooth transitions.
  Trigger on "preamble", "podcast intro graphics", "preamble motion graphics", "keyword overlays",
  "add graphics to this cut", "MoGraph this edit", "Echelon preamble", or when the user uploads
  a raw podcast cut and asks for motion graphics or broadcast-style overlays. Also trigger when
  a user references this skill by name or asks to "build a preamble" or "do the preamble treatment."
  This skill requires After Effects connected via Bridge MCP. If AE is not connected, tell the
  user to open AE and connect the Bridge panel first. Always use this skill for Echelon preamble
  work — do NOT improvise a different style or use Python/moviepy compositing.
---

# Echelon Preamble Motion Graphics — AE + Higgsfield Pipeline

## Prerequisites

Before starting, verify:
1. `Bridge:get_host_status` → After Effects must show "connected"
2. If not connected, tell user: "Open AE and connect the Bridge/Higgsfield panel"
3. Higgsfield MCP must be available for cutaway generation

Read `references/visual-system.md` BEFORE building anything.
Read `references/ae-build-guide.md` BEFORE making any AE calls.

---

## Pipeline

```
CLEAN CUT (.mp4)
     │
     ▼
PHASE 1: ANALYSE ─── extract frames (ffmpeg) → build transcript → identify keywords
     │
     ▼
PHASE 2: PLAN ─────── present keyword map + cutaway plan → user confirms
     │
     ▼
PHASE 3: GENERATE ─── Higgsfield: generate cutaway video(s) for concept screens
     │
     ▼
PHASE 4: BUILD ────── After Effects via Bridge MCP: full composition
     │
     ▼
PHASE 5: QC ────────── ae_export_frame / ae_export_contact_sheet → review → iterate
```

---

## PHASE 1 — ANALYSE

### 1.1 Get Source Info
Ask user for the **local file path** on their machine (AE needs the local path to import).

### 1.2 Extract Frames
Use ffmpeg in the sandbox to extract frames at 3-4fps from the uploaded file:
```bash
ffmpeg -v error -i "<uploaded_file>" -vf "fps=3" /tmp/preamble/frames/f_%04d.png
```
View frames sequentially to understand the edit structure — who's speaking when, cut points, gestures.

### 1.3 Get Transcript
Claude cannot hear audio. Ask the user:
> "Paste the transcript or key talking points with rough timestamps."

If user provides a .txt transcript file, parse it for timecodes and dialogue.

### 1.4 Identify Keywords
From transcript + frame analysis, pick **6-10 keyword moments** for a 20-30s clip.
Select: power words, emotional peaks, industry terms, statistics, turning points.
Restraint matters — not every word gets a graphic.

---

## PHASE 2 — PLAN

Present a structured plan. **This is mandatory — get user confirmation before building.**

### Ask:
1. **Episode color theme** — Echelon Red (#E31937) default, or brand color, or match studio lighting
2. **End card** — brand name + tagline, or skip
3. **Any specific cutaway concepts** — or let Claude decide based on content

### Present Keyword Map:

| # | Time | Speaker Says | Keyword | Style |
|---|------|-------------|---------|-------|
| 1 | 1.2s | "hugely interesting" | HUGELY / INTERESTING | Compound |
| 2 | 3.5s | "my father" | MY FATHER | Slam |
| ... | ... | ... | ... | ... |

### Keyword Styles:
- **Slam** — single huge word (primary text layer only)
- **Compound** — small context word above + large keyword below (two layers)
- **Counter** — animated number + label

### Cutaway Plan:
Propose 1-2 concept cutaways (Higgsfield-generated video, 3-5s each).

---

## PHASE 3 — GENERATE CUTAWAYS (Higgsfield MCP)

Use `Higgsfield:generate_video` with `model: "seedance_2_5"` and `aspect_ratio: "9:16"`.

Craft prompts that reflect the episode's THEMATIC CONTENT — not generic abstract backgrounds.
The cutaway should visually tell part of the story.

Example for a literary duality theme:
```
"Cinematic abstract concept, an old handwritten page slowly splitting into two halves,
one side warm golden light, the other cold blue shadow, particles of ink floating,
dark moody background, shallow depth of field, editorial style, vertical 9:16"
```

After generation completes, use `Higgsfield:jobs_wait` to get the result URL.

---

## PHASE 4 — BUILD IN AFTER EFFECTS

### Read `references/ae-build-guide.md` for exact parameters.

### 4.1 Create Composition
```
ae_create_composition:
  name: "Preamble_<GuestName>"
  width: 1080, height: 1920
  frameRate: 30 (or match source)
  duration: <match source>
```
**IMPORTANT**: Do NOT use special characters (#, >, etc.) in composition or layer names.

### 4.2 Import Source Video
```
ae_import_image:
  compositionName: "<comp>"
  name: "Source_Video"
  path: "<LOCAL path on user's machine>"
  scaleToFit: true
```

### 4.3 Import Cutaway
```
ae_import_image:
  compositionName: "<comp>"
  name: "Cutaway_<concept>"
  url: "<Higgsfield result URL>"
  scaleToFit: true
```

### 4.4 Add ECHELON Watermark
```
ae_add_text_layer:
  name: "WM_Echelon"
  text: "ECHELON"
  fontSize: 28
  position: [540, 50]
  fillColor: {r:1, g:1, b:1}
```
Then set opacity keyframe: 0→75 over 0.5s.

### 4.5 Add Keyword Text Layers

For each keyword moment, create text layers:

**Primary keyword (slam):**
```
ae_add_text_layer:
  name: "KW<N>_<Word>"
  text: "<WORD>"
  fontSize: 110-140
  position: [540, 1740]    ← CRITICAL: Y must be 1680-1770 for bottom placement
  fillColor: {r:1, g:1, b:1}
```

**Context/qualifier (small text above):**
```
ae_add_text_layer:
  name: "KW<N>_<Context>"
  text: "<CONTEXT>"
  fontSize: 40-55
  position: [540, 1680]
  fillColor: {r:0.784, g:0.588, b:0.243}   ← amber accent
```

### 4.6 Trim All Keyword Layers
Each keyword pair gets trimmed to its timecode:
```
ae_trim_layer:
  layerName: "KW1_Interesting"
  inPoint: 1.1
  outPoint: 3.0
```

### 4.7 Animate Keywords (Keyframes)

Use `ae_set_keyframes` to set ALL keyframes in one call.

For each PRIMARY keyword layer (the big slam word):
```
Scale:  time=inPoint → [115,115]  |  time=inPoint+0.13 → [100,100] (influence:75)
Opacity: time=inPoint → 0  |  time=inPoint+0.13 → 100 (influence:80)
Opacity: time=outPoint-0.13 → 100  |  time=outPoint → 0
```

For each CONTEXT layer (smaller word above):
```
Opacity: time=inPoint → 0  |  time=inPoint+0.1 → 100 (influence:80)
Opacity: time=outPoint-0.13 → 100  |  time=outPoint → 0
```

### 4.8 Position Cutaway

The cutaway video layer needs manual startTime adjustment — Bridge API cannot
set layer startTime directly. After import:
1. `ae_trim_layer` to set in/out points
2. Tell user: "Drag the Cutaway layer to start at <time>s on the timeline"

Alternatively, add text overlay layers on top of the cutaway for the concept words.

### 4.9 Source Video Zoom (Selective)

For the **3 strongest keyword moments only** (~30% of clip), scale the source:
```
ae_set_keyframes on "Source_Video":
  Scale: time=kw_start → [100,100]  |  time=kw_start+0.3 → [108,108] (influence:70)
  Scale: time=kw_end-0.3 → [108,108]  |  time=kw_end → [100,100]
```
Do NOT zoom on every keyword. Pick only the emotional peaks.

### 4.10 Easy Ease All Keyframes
```
ae_apply_easy_ease on each animated layer
```

### 4.11 Finalize
```
ae_finalize_build: <comp_name>
```

---

## PHASE 5 — QC & ITERATE

### 5.1 Render Contact Sheet
```
ae_export_contact_sheet:
  compositionName: "<comp>"
  times: [<one time per keyword moment>]
  columns: 3
  label: true
```

### 5.2 Review
Check each frame for:
- [ ] Text in bottom 15% of frame (Y 1680-1770)
- [ ] Text never overlaps speaker's face
- [ ] Keyword visible and readable
- [ ] Animation timing matches speech
- [ ] Cutaway properly placed
- [ ] Watermark visible at top

### 5.3 Iterate
Adjust positions, timing, or add/remove keywords based on review.

---

## CRITICAL AE POSITIONING RULES

These were learned through testing and are NON-NEGOTIABLE:

| Element | X | Y | Notes |
|---------|---|---|-------|
| Watermark "ECHELON" | 540 (center) | 50 | Top center, small |
| Context text (small) | 540 (center) | **1680** | Above keyword |
| Primary keyword (big) | 540 (center) | **1740** | Main slam word |
| Cutaway concept text | 540 (center) | 780-1100 | Center of frame (on cutaway bg) |

**Y values below 1680 WILL overlap the speaker.** This is the #1 mistake to avoid.

---

## COLOR PRESETS

| Theme | Primary (fillColor) | Accent (fillColor) |
|-------|--------------------|--------------------|
| Echelon Red | {r:0.89, g:0.10, b:0.22} | {r:1, g:0.30, b:0.42} |
| Warm Amber/Gold | {r:0.784, g:0.588, b:0.243} | {r:1, g:0.96, b:0.90} |
| Purple (Santani) | {r:0.48, g:0.18, b:0.56} | {r:0.784, g:0.663, b:0.435} |
| Blue (StanChart) | {r:0, g:0.20, b:0.63} | {r:1, g:1, b:1} |

Primary keyword text is always **white** {r:1, g:1, b:1}.
Context/qualifier text uses the **accent** color.

---

## WHAT THIS SKILL DOES NOT DO

- Does not edit the raw cut (timing, audio) — that's done before this skill
- Does not create end cards automatically — ask the user for brand/tagline
- Does not render final video — user exports from AE
- Does not work without AE connected via Bridge MCP
