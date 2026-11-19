---
name: "kinetic-collage-typography"
description: "Build kinetic word-collage typography (white light + red heavy words, warped and layered behind the speaker) over talking-head or b-roll footage, in After Effects or a Motion film."
---

# Kinetic Collage Typography

A spoken-word typography style. Every spoken word lands on screen the instant it is said. The words pile up into a layered, warped collage around the speaker, and the screen clears on each cut. It reads as a high-end, editorial "creator ad" look: it should feel energetic and hand-placed, never a template or subtitle bar.

The style was learned from four reference films (960x720, 24fps, 25 to 47 s each). They show creators in dark, warm, tungsten-lit studios with one red accent per scene.

## 1. Core rules

1. **One word = one layer, synced to its own speech onset.** Never show a whole phrase at once. Short function words (the, a, of, to, and, I, it) appear within 1 to 2 frames of each other.
2. **Two voices of type.**
   - **Connector words:** small white sans, regular or medium weight, upright, tight tracking.
   - **Hero words:** the one or two words per phrase that carry meaning. Heavy geometric black, 3 to 5 times larger, usually red, sometimes white heavy.
3. **Words accumulate.** A shot builds a cluster of 3 to 10 words, all staying on screen. Clear everything on the next hard cut, or blur and dim the old cluster when a new thought starts in the same shot.
4. **Depth.** Hero words sit BEHIND the subject: behind the head, shoulder, mic arm or hands, using a subject matte. Small white words usually sit in front. This is the signature move, so use it in at least half the shots.
5. **Nothing is centred on a grid.** Words hug the subject's silhouette, filling negative space: above the head, beside the face, across the torso, along a table edge. The layout follows the composition of the shot.
6. **Overlap is allowed.** Leading is negative, so line boxes overlap by 10 to 30%. A small white word may sit on top of a red hero word. Partial occlusion and a word cropped by the frame edge are fine.

## 2. Palette

| Role | Hex | Notes |
|---|---|---|
| Hero red | `#C00000` (range `#B00000` to `#C80404`) | Pure deep red, no blue or green. Flat fill, no gradient, no stroke. |
| White type | `#FFFFFF` (warm `#FCF9FD` reads the same) | Flat. |
| Step or title card red | `#B40808` | Full-frame background. |
| Step card type | Mustard `#E8A33A` | Only on the red title cards. |
| Rare accents | Lime `#D4F01E`, ice cyan `#A8E0E0` | One word or one transition per film, at most. |
| Pixel-block accents | Same red | Small squares near hero words. |

The footage is graded dark and warm, with crushed blacks and orange practical lamps, so the red and white pop. Type never gets a drop shadow. Legibility comes from placement on dark areas.

## 3. Typefaces

- **Connector (white small):** a neutral grotesk. Use Inter Medium, SF Pro Display Medium or Helvetica Now Medium. Tracking -10 to -30 (AE units). Lowercase except a sentence-initial "You" or "I".
- **Hero (red or white big):** a geometric heavy with a double-story `a` and round `e`/`o`. Use Gilroy Black or Heavy (closest), with Poppins Black or ExtraBold as the free fallback. All lowercase, keeping the trailing punctuation (`perfect.`, `face,`, `going,`). Tracking -20 to -40.
- **Alternate hero:** a geometric regular or medium, for example red `clip.` under white heavy `raw`. Mix weights within one phrase.
- **Uppercase moments:** spaced caps for UI or button words (`GENERATE`, `KATANA` in quotes, `AUDIO SYNCS`), with tracking +100 to +300.
- **Step cards:** a condensed, distressed display face: Anton, Bebas Neue or Tusker with a rough edge texture. Mustard on red.
- **Handwriting accent:** thin monoline marker script, white or grey, drawn on stroke by stroke.

## 4. Sizes and spacing

Reference frames are 960x720. The ratios are what matter:

- **Connector font size:** about 5 to 7% of frame height (36 to 50 px at 720p).
- **Hero font size:** about 14 to 22% of frame height (100 to 160 px at 720p). The giant hero is 30 to 45% and may bleed off frame (`ending`, `this shot`).
- **Ratio:** hero is roughly 3 to 4 times the connector size.
- **Vertical 9:16 (1080x1920):** connector 56 to 72 px, hero 170 to 280 px, giant hero up to 420 px. Keep type inside the middle 80% of the width, and keep it clear of the bottom 18% and top 10% (platform UI).
- **Leading:** 0.75 to 0.85. Stacked words overlap.
- **Tiny fine print:** a 9 to 11 px line, top-right or bottom-left (a one-line summary of the film), plus a small brand mark bottom-right. Optional.

## 5. Shaping the words

About 60% of hero words are not set straight. Use one of these:

- **Arc or bend:** AE Warp > Arc 15 to 35%, or text on a curved path. For example `consistency`, `generated.`, `solution`.
- **Wave or bulge:** individual letters bounce up and down along the baseline (`simply`, `begin`, `exactly`, `typed`).
- **Rotation:** -15° to +20°, often matching the angle of the shot (a top-down shot gives rotated text).
- **Perspective:** the word lies on a surface (on the table or rug in top-down shots, on a laptop keyboard) via 3D layer or Corner Pin.
- **Scale squash:** non-uniform stretch, for example 110% x 90% for a slammed look.

Connector words stay straight, with occasional slight rotation.

## 6. Entrance animations

Timings below are at 24fps. Scale them for 30fps.

| Name | Use for | Recipe |
|---|---|---|
| **Tracking expand** | Connector words | Tracking from -150 to normal plus opacity 0 to 100 over 4 to 6 frames, easeOut. The letters start piled on top of each other ("Yougetthe") and spread apart. |
| **Char pop** | Red hero | Per-character reveal, 1 frame stagger. Each character scales 0 to 115 to 100% with a slight y-bounce, over 3 to 4 frames. |
| **Whip in** | Hero | Slides 300 to 600 px from the left or right in 2 to 3 frames with heavy directional motion blur (shutter 360), then settles with a 1 to 2 frame overshoot. |
| **Pixel resolve** | Hero | Mosaic 8 to 12 blocks resolving to sharp over 3 to 4 frames, plus opacity. |
| **Blur in** | Hero or white | Gaussian blur 40 to 0 plus scale 120 to 100% over 4 frames. |
| **Glitch slice** | Hero or transition | 2 to 4 frames of horizontal slice displacement and RGB split, then clean. |
| **Write on** | Handwriting | Stroke trim path 0 to 100% over 8 to 14 frames. |
| **Giant slide** | Giant uppercase word | The word crosses the frame at 300 to 400% scale over 6 to 8 frames, then lands into a pill button or outline. |

On the hold, add a tiny constant drift: 1 to 3% scale or 4 to 10 px position over the hold, linear. The collage should never look frozen. Hero words often have a soft wiggle on the arc amount.

On exit there is usually no exit animation, because the hard cut clears the layer. Within a shot, either blur the old cluster (20 px) and drop it to 20 to 30% opacity over 6 frames while the new cluster arrives, or wipe it with the transition.

## 7. Transitions between shots

Use these sparingly, about every 3 to 5 cuts. The rest are hard cuts on the beat.

- **White organic blob wipe:** an ink or paint shape floods the frame white in 3 frames, and the next shot appears.
- **Pixel-block dissolve:** large mosaic blocks plus red 8-bit squares.
- **Smear or pixel-sort streak:** a horizontal streak smear, 2 to 4 frames.
- **Halftone dot burst:** the image breaks into bokeh dots.
- **Text as matte:** footage seen inside giant letters on a red field (`Send`), then the next shot.
- **Full-frame red step card:** mustard condensed type, with a jittered stop-motion boil every 2 frames. Use it for chapters ("STEP 1").

## 8. Extra graphic devices

- Floating UI panels: a dark glass rounded rectangle (radius about 18 px, white 1.5 px stroke at 60% opacity) showing a prompt being typed character by character. Panels sit in 3D at a slight angle.
- A picture-in-picture rounded card with a white thin stroke, popping in with a slight 3D tilt.
- A thin white hand-drawn arrow plus a dashed outline box for callouts.
- A cursor or hand click, and a pill button press.
- A white rim or outline stroke around the cutout subject (2 to 4 px) when the background is stylised.
- Background treatment for heavy text beats: blur the plate 10 to 20 px and darken 30% while the subject stays sharp in front.
- Red scribbles or squiggles (marker) and small red pixel squares as punctuation near hero words.

## 9. Workflow

1. **Read the transcript and mark word timings** to the frame (onset of each word). For each phrase, pick 1 to 2 hero words (nouns, verbs, numbers, the payoff) and colour them red. A second hero in white heavy is optional.
2. **Read the shot.** Find the subject silhouette, the negative space and the surfaces. Decide which hero goes behind the subject.
3. **Plan the cluster layout per shot**, sketched as a word map: position, size, rotation and warp for every word, with no two consecutive heroes using the same shaping.
4. **Make the subject matte.** In AE, use Roto Brush or a precomputed alpha matte. For a Motion film, use a pre-rendered alpha video or PNG sequence of the subject placed above the hero layers.
5. **Animate the entrances** from section 6, keyed to the word onsets. Vary them: connector words always use tracking expand, and hero words rotate through char pop, whip, pixel and blur.
6. **Add the drift on hold,** then the accents (pixel squares, scribbles) and the transitions at chapter breaks.
7. **QA:**
   - Every word appears on its spoken frame, with no early reveals.
   - Red stays flat `#C00000`.
   - No word is unreadable for more than 1 frame after entering.
   - Nothing flashes more than 3 times per second.
   - Vertical safe zones are respected.

## 10. Adapting to footage that differs from the reference

- **Bright or saturated backgrounds** (for example a studio blue): keep red and white, but put the red hero over darker areas or behind the subject. Never place a red word on a saturated mid-tone without a darker zone behind it. A 15 to 25% vignette helps.
- **Short clips (under 10 s):** one cluster per shot, 6 to 12 words total, and at most one transition.
- **Vertical 9:16:** stack the words vertically down one side of the subject instead of across the frame. Use the headroom for the biggest hero.