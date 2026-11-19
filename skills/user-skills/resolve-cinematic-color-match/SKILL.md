---
name: resolve-cinematic-color-match
description: Transform raw footage to match a reference look using DaVinci Resolve. Upload a reference image and source footage; Claude analyzes the reference's cinematic character (color, contrast, mood, skin tones) and builds a professional node-tree workflow in Resolve via Bridge MCP. Uses scope-driven grading (waveform, RGB parade, vectorscope) for technical accuracy. Handles multi-camera matching and explains why simple LUT copy fails. Triggers on "match this look", "grade this to reference", "apply cinematic look", or requests to fix failed LUT grading.
compatibility: Bridge MCP connector (DaVinci Resolve), image analysis
---

# Resolve Cinematic Color Match — Professional Reference-Based Grading

## Overview
When a simple LUT or reference copy fails, it's because you're not accounting for **color management** and **professional node architecture**. This skill bridges that gap by:

1. **Analyzing the reference image** for cinematic characteristics (palette, contrast curve, saturation, mood, skin tone if present)
2. **Mapping reference characteristics to a DaVinci Resolve node tree** following the industry standard: Normalize → Balance → Secondaries → Look → Trim
3. **Using Bridge MCP** to build the tree in Resolve with measured, scope-driven adjustments (waveform, RGB parade, vectorscope)
4. **Matching your footage to the reference** by converting both to a common working space, neutralizing your footage, then applying the creative look with adaptations for your camera/lighting

## Part 1: Reference Image Analysis

When the user provides a reference image, perform this structured analysis:

### 1.1 Cinematic Characteristics to Extract

| Aspect | What to Look For | How it Translates to Resolve |
|--------|-----------------|------------------------------|
| **Color Palette** | Primary hues, secondary accents, dominant warm/cool bias | Primary color wheel adjustments + HSL qualifiers for key colors |
| **Contrast & Tone** | Is it flat/compressed or punchy/contrasty? Crushed blacks or lifted blacks? Blown highlights or held details? | Lift (shadows), Gamma (midtones), Gain (highlights) + Curves node for tone shape |
| **Saturation** | Highly saturated and vibrant, or muted/desaturated for film look? | Master saturation slider + per-hue saturation in Hue/Saturation wheel |
| **Skin Tones** | If skin is visible: hue (warm/cool shift), saturation (vivid or pastel), luminance (bright/dark) | Vectorscope 123° skin-tone line; HSL qualifier to isolate skin; nudge toward target saturation/angle |
| **Lighting Mood** | Warm sunset glow, cool daylight, harsh/soft, vignette presence | Color grading direction (shadows→warm, midtones→palette, highlights→cool or vice versa); vignette node if present |
| **Texture/Detail** | Grain/noise, sharpness, haziness/diffusion | Grain type/amount; softness assumptions for Power Window feather |

### 1.2 Analysis Template

Ask yourself and document:
- **Dominant color cast:** (e.g., "warm amber in shadows, cool blue in highlights")
- **Contrast character:** (e.g., "crushed blacks, lifted to ~20 IRE; compressed midtones; highlights preserved detail")
- **Saturation profile:** (e.g., "highly saturated throughout; especially warm reds/oranges")
- **Skin tone (if visible):** (e.g., "warm peachy tone, high saturation, sits at ~123° on vectorscope with ~30 IRE saturation radius")
- **Overall mood:** (e.g., "moody, cinematic, film emulation, slight desaturation in shadows")

---

## Part 2: DaVinci Resolve Node Architecture

### 2.1 Standard Node Template (CRITICAL ORDER)

The industry-standard workflow is **serial nodes left-to-right**:

| Node # | Name | Purpose | Example Adjustments |
|--------|------|---------|-------------------|
| **1** | Normalize / CST | Convert camera log/raw to working space | CST: Sony S-Log3 → DaVinci Wide Gamut (if YRGB) or Input Transform (if RCM/ACES) |
| **2** | Balance / Neutralize | Exposure, white balance, base contrast | RGB Parade: align shadows & highlights of R/G/B on neutral; Waveform: set black point ~40 IRE, white point ~940 (or scope equivalent); Lift/Gamma/Gain or Log Offset/Slope |
| **3a** | Secondaries — Skin | Isolate and grade skin tones | HSL Qualifier: sample skin, refine H/S/L ranges; nudge toward vectorscope 123° line; Power Window to protect other colors |
| **3b** | Secondaries — Sky/Bg | Isolate and enhance background | Power Window or HSL (blue channel); separate lift from subject |
| **3c** | Secondaries — Fixes | Blemishes, vignette, relighting | Power windows, tracking (Magic Mask if needed) |
| **4** | Creative Look | Stylization, film emulation, color palette | Color Wheels (Shadow/Midtone/Highlight) shaped per reference; optional 1D/3D LUT if reference is from a known LUT or film stock; saturation/hue tweaks per palette |
| **5** | Trim / Output | Final brightness, legal/broadcast limits | Slight lift/gain if output space is darker; Broadcast Safe limiter |

**Critical principle:** Every node is labeled and serves one function. Grade on scopes (Waveform/Parade/Vectorscope) for technical stages (1–3), and use eyes/monitor for creative (4–5) on a calibrated display.

### 2.2 Color Management Setup (PREREQUISITE)

Before building nodes, confirm:
- **Timeline working space:** DaVinci Wide Gamut / DaVinci Intermediate (YRGB) or ACEScct (ACES)
- **Output space:** Rec.709 Gamma 2.4 (broadcast), or DaVinci Intermediate if VFX-bound
- **Per-clip input transform:** Verify correct camera profile (Sony S-Log3 / S-Gamut3, ARRI LogC3/LogC4, RED Log3G10, etc.)

If input color space is wrong, **every downstream adjustment operates on mis-encoded data**; scopes and color matching become meaningless.

---

## Part 3: Bridge MCP Workflow — Building the Node Tree

### 3.1 Pre-Build Checks

1. **Confirm Resolve is open** with the target project/sequence.
2. **Verify Bridge connector is live** (use `get_host_status` if available to confirm AE/Blender/Resolve connectivity).
3. **Set color management:**
   - YRGB (default): Manually add CST nodes for normalize.
   - RCM: Enable in Preferences, set working/output spaces, verify per-clip input transforms.

### 3.2 Node-Building Sequence

Using Bridge MCP tool calls (e.g., `ae_*`, `pr_*`, `bl_*` — check which Resolve tools are available in Bridge), execute this order:

#### Step 1: Get Composition / Sequence Info
```
Call: Get current timeline/sequence (method depends on Bridge's Resolve support)
Goal: Confirm active timeline, frame size, fps, color space settings
```

#### Step 2: Add Normalize Node (if YRGB, not RCM)
```
Node Name: "1-Normalize"
Operation: Add CST node
Input Color Space: [camera format, e.g., "Sony S-Log3 / S-Gamut3.Cine"]
Output Color Space: [working space, e.g., "DaVinci Wide Gamut"]
Goal: All clips now in consistent, known encoding
```

#### Step 3: Add Balance Node
```
Node Name: "2-Balance"
Operation: Adjust Lift/Gamma/Gain (or Log Offset/Slope if input is log)
Scope-Driven Targets:
  - Waveform: Black point ~40 IRE (or code ~64 in 10-bit), white point ~940
  - RGB Parade: R/G/B aligned on neutral grays
Goal: Clean, neutral, balanced image with no color cast
```

#### Step 4: Add Secondaries Nodes (Skin, Sky, etc.)
```
Node Names: "3a-Skin", "3b-Sky", "3c-Fixes"
Operations: 
  - Skin: HSL Qualifier (sample skin hue, refine S/L) + Power Window (optional feather)
  - Sky: Power Window (radial/linear) or HSL (blue channel only)
  - Fixes: Vignette (Power Window with invert + Curve), tracking for moving subjects
Goal: Isolated, detailed corrections on defined regions
```

#### Step 5: Add Creative Look Node
```
Node Name: "4-CreativeLook"
Operation: 
  - Color Wheels shaped per reference analysis (warm shadows, cool highlights, etc.)
  - OR apply reference-derived LUT if available
  - Adjust master saturation and per-hue saturation to match reference palette
Goal: Cinematic palette and mood applied on top of neutral base
```

#### Step 6: Add Trim Node
```
Node Name: "5-Trim"
Operation: Final gain/lift, Broadcast Safe if needed
Goal: Output-ready signal
```

### 3.3 Scope Verification Loop

After each Balance/Secondary node, verify on scopes:
- **Waveform:** Is black well-defined? Highlights preserved? Clipping present?
- **RGB Parade:** Are the three channels aligned on neutrals (grays)?
- **Vectorscope:** If skin present, is it landing near 123° on the I-axis?

If any scope shows drift, return to the Balance node and re-trim.

---

## Part 4: Reference-to-Footage Translation

### 4.1 Why Simple LUT Copy Fails

A LUT is a **fixed input→output mapping** that assumes:
- Specific input color encoding (e.g., LogC3, not S-Log3)
- Specific gamma/transfer function
- Specific white point / sensor spectral response
- Specific exposure and ISO

Your footage almost never matches all these assumptions. **Result:** crushed shadows, blown highlights, wrong hue/saturation, or a look that doesn't survive shot-to-shot variation.

### 4.2 The Correct Path: Normalize, Then Adapt

1. **Normalize both footage and reference to a common working space** (e.g., DaVinci Wide Gamut).
2. **Balance your footage** (scopes-driven) to a clean, neutral base.
3. **Apply the reference's creative palette** (color wheels, saturation, hue shifts) to your footage, then **adjust for your camera/lighting differences**.
   - If your footage is underexposed vs. the reference, the color grading will look dark; lift the Balance node's Gamma first.
   - If your camera's skin tones render cooler than the reference, warm the shadows in the Creative Look node.
   - If your scene has mixed light (daylight + tungsten), isolate and color-correct each with a Power Window before applying the global look.

### 4.3 Multi-Camera / Multi-Shot Workflow

If grading multiple clips to the reference:
1. **Match the hero shot first** (the most prominent or best-lit clip).
2. **Analyze differences in the secondary clips** (cooler, darker, blown out?).
3. **Duplicate the hero's node tree** to secondary clips, then modify only the Balance node to neutralize the secondary's specific exposure/white-balance drift.
4. **Verify on scopes:** RGB Parade and Vectorscope skin-tone angles should align across all clips.

---

## Part 5: Practical Workflow in Claude

### When the User Provides a Reference Image + Footage:

1. **Receive the reference image and/or footage path.**
2. **Analyze the reference image** (Part 1) — extract color palette, contrast, saturation, mood, skin tones.
3. **Generate a reference dossier** — a markdown summary of the cinematic look for the user to review.
4. **Ask for confirmation:**
   - "Does this match the mood/palette you're targeting?"
   - "Any adjustments to the analysis (e.g., 'warmer shadows', 'less saturation')?"
5. **Build the Resolve node tree** (Part 3) using Bridge MCP, calling node-building operations in order.
6. **Verify on scopes** and surface any issues to the user.
7. **Generate adjustment recommendations** for multi-shot or lighting-variant clips.
8. **Provide a reference card** — a text summary of the node tree the user can screenshot or save for future projects.

### Example User Prompt Triggers:
- "I have a reference image of a cinematic look — can you grade my footage to match it?"
- "The LUT I tried didn't work. Here's the reference image and my raw footage. Help me build the right grade in Resolve."
- "Match this Fortune magazine aesthetic to our interview footage."
- "Apply the mid-century editorial look to these product shots."

---

## Part 6: Troubleshooting Reference Mismatches

| Problem | Diagnostic | Solution |
|---------|-----------|----------|
| Reference palette doesn't land on your footage | Input color space wrong on the Balance node | Verify camera profile in CST node; recheck RGB Parade alignment |
| Skin tones look unnatural (hue drifted) | Vectorscope 123° line doesn't align with sample skin | HSL Qualifier: adjust Hue range; may need Power Window to prevent color cast spillover |
| Highlights blown / shadows crushed | Waveform clipping at top/bottom after Creative Look applied | Reduce Creative Look node's Curves gain; lift/brighten on Balance node instead |
| Footage too dark/bright compared to reference | Exposure mismatch | Adjust Lift/Gamma on Balance node; then re-apply Creative Look |
| Look too saturated or flat | Saturation slider went too far one direction | Dial back master saturation; use per-hue saturation (Hue/Saturation wheel) for targeted fixes |

---

## Part 7: Key Takeaways

✅ **DO:**
- Normalize to a working space first; apply CST nodes or set input transforms.
- Balance on scopes; neutral base before any stylization.
- Build secondaries (skin, sky) before the creative look.
- Use Color Match chart if one was shot on set.
- Verify on multiple clips; use RGB Parade and Vectorscope for shot-to-shot consistency.

❌ **DON'T:**
- Apply a creative LUT directly to raw log footage.
- Skip white balance / white point alignment on RGB Parade.
- Assume a look from one camera transfers 1:1 to another camera/sensor.
- Grade to eyes alone; scope-driven balancing is non-negotiable for predictable, matchable results.

---

## References & Related Skills

- **cinedance:** If the footage is moving/dynamic, use this to ensure camera motion, character performance, and blocking are cinematic before grading.
- **tig-acting-task:** For interview/dialogue footage with skin tones.
- **higgsfield-content-factory:** If generating new reference footage or creative assets to match against.

---

## Notes on Bridge MCP & Resolve

- Bridge's Resolve support may vary; verify available tool calls (ae_*, pr_*, bl_*) in the MCP documentation or via `describe_tool`.
- If direct Resolve node calls aren't available, fall back to **manual instructions**: generate the node tree as a detailed, step-by-step guide the user can execute in the Resolve UI, with specific slider positions, color wheel inputs, and scope targets clearly documented.
- Save the project frequently; Resolve's undo history can be volatile with many node adjustments.

---

## Output Deliverables

When the skill completes, provide the user with:
1. **Reference Dossier** — analyzed characteristics of the reference image.
2. **Node Tree Card** — text/image summary of the built node structure, adjustment values, and scope targets.
3. **Multi-Shot Guidance** — if applicable, recommendations for adapting the hero grade to secondary clips.
4. **Before/After Comparison** — frame exports from the Resolve timeline (if Bridge MCP supports it) or a guidance screenshot.
5. **Troubleshooting Checklist** — common issues and how to address them.
