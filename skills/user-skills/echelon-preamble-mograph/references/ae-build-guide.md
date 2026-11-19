# AE Build Guide — Bridge MCP Patterns & Gotchas

## Before You Start

1. Run `Bridge:get_host_status` — AE must be "connected"
2. Connection drops frequently — if a call fails, ask user to reconnect the Bridge panel
3. Load tool definitions with `tool_search` BEFORE calling any ae_* tool directly

## Naming Rules

- **NO special characters** in comp or layer names: no #, >, <, /, \, quotes
- Use underscores: `Preamble_GuestName`, `KW1_Interesting`
- Keep names short and descriptive

## Composition Creation

```
ae_create_composition:
  name: "Preamble_<GuestName>"
  width: 1080
  height: 1920
  frameRate: 30
  duration: <source duration>
  backgroundColor: {r:0, g:0, b:0}
```

## Importing Media

### Local file (source video):
```
ae_import_image:
  compositionName: "<comp>"
  name: "Source_Video"
  path: "<FULL LOCAL PATH on user's machine>"
  scaleToFit: true
```
Always ask user for the local path — Claude cannot guess it.

### URL (Higgsfield output):
```
ae_import_image:
  compositionName: "<comp>"
  name: "Cutaway_<Name>"
  url: "<Higgsfield CDN URL>"
  scaleToFit: true
```
Note: The Bridge plugin downloads from the URL on the user's machine, not from Claude's sandbox.

## Adding Text Layers

```
ae_add_text_layer:
  compositionName: "<comp>"
  name: "<unique_name>"
  text: "<TEXT IN CAPS>"
  fontSize: <size>
  position: [<x>, <y>]
  fillColor: {r:<0-1>, g:<0-1>, b:<0-1>}
```

### Font Handling
- Do NOT specify fontFamily unless you know the exact font is installed
- If omitting fontFamily, AE uses its default (usually Arial/Helvetica)
- Safe fonts: "Arial", "Helvetica", "Impact", "Georgia"
- If user has custom fonts, ask which are installed

### Position Y Values (CRITICAL)
In a 1920-tall comp:
- Y=50 → top of frame (watermark)
- Y=960 → vertical center
- Y=1680 → bottom zone start (context text)
- Y=1740 → bottom zone main (primary keyword)
- Y=1800+ → risk of being cut off by platform UI

**Text placed at Y < 1600 WILL overlap the speaker in most podcast framing.**

## Trimming Layers

```
ae_trim_layer:
  compositionName: "<comp>"
  layerName: "<name>"
  inPoint: <seconds>
  outPoint: <seconds>
```
This sets when the layer is visible. Every keyword layer MUST be trimmed.

## Setting Keyframes

Use `ae_set_keyframes` to set ALL keyframes in ONE call for efficiency:

```
ae_set_keyframes:
  compositionName: "<comp>"
  keys: [
    {layerName: "KW1_Word", propertyName: "Scale", time: 1.1, value: [115,115]},
    {layerName: "KW1_Word", propertyName: "Scale", time: 1.23, value: [100,100], influence: 75},
    {layerName: "KW1_Word", propertyName: "Opacity", time: 1.1, value: 0},
    {layerName: "KW1_Word", propertyName: "Opacity", time: 1.23, value: 100, influence: 80},
    ...
  ]
```

### Standard Keyword Animation Pattern:
For a keyword at time T with duration D:
```
// Slam in
Scale:   T → [115,115]  |  T+0.13 → [100,100] influence:75
Opacity: T → 0          |  T+0.13 → 100 influence:80

// Hold...

// Fade out
Opacity: T+D-0.13 → 100  |  T+D → 0
```

### Source Video Zoom Pattern (selective — 3 moments max):
```
Scale: kw_start → [100,100]  |  kw_start+0.3 → [108,108] influence:70
Scale: kw_end-0.3 → [108,108]  |  kw_end → [100,100] influence:70
```

## Modifying Layer Position

If text is in the wrong place after creation:
```
ae_modify_layer:
  compositionName: "<comp>"
  layerName: "<name>"
  position: [<new_x>, <new_y>]
```

## Layer Ordering

After all layers are added:
```
ae_reorder_layers:
  compositionName: "<comp>"
  moves: [
    {layerName: "WM_Echelon", position: 1},
    {layerName: "Source_Video", position: "bottom"}
  ]
```
Watermark must be layer 1 (top). Source video must be bottom.

## Exporting Frames for QC

### Single frame:
```
ae_export_frame:
  compositionName: "<comp>"
  time: <seconds>
  maxWidth: 540
```

### Contact sheet (multiple frames):
```
ae_export_contact_sheet:
  compositionName: "<comp>"
  times: [1.5, 4, 8, 11, 14, 17, 20]
  columns: 3
  label: true
  maxWidth: 1200
```

Returns a URL — may not be downloadable from Claude's sandbox.
If blocked, ask user to open the URL in their browser and screenshot it.

## Known Issues

1. **ae_batch often fails** — prefer individual tool calls over batch
2. **Connection drops** — if any call returns "not connected", ask user to reconnect Bridge panel
3. **Cutaway startTime** — ae_trim_layer cannot shift a layer's startTime to a later point in the comp.
   User must manually drag the cutaway layer to the correct position on the timeline.
4. **Font not found** — if fontFamily is wrong, the text layer may not render. Omit fontFamily to use default.
5. **CDN URLs** — Higgsfield outputs are on cloudfront.net. Claude's sandbox can't download them,
   but AE (via Bridge) can import them directly since it runs on the user's machine.
6. **R2 CDN URLs** — ae_export_frame returns URLs on r2.dev which Claude's sandbox also can't access.
   Ask user to view/screenshot them.

## Finalization

After all layers, trims, and keyframes:
```
ae_finalize_build: <comp_name>
```
This enables motion blur and cleans up the comp.
