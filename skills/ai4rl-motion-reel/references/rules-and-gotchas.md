# Rules and gotchas (learned the hard way across reels 01-09)

## Company names and logos

- Never draw or embed a company's logo, app icon, wordmark, proprietary UI or key visual (Adobe, OpenAI, Google, Anthropic/Claude spark, Slack, Canva, ElevenLabs, Kling...). This includes logos inside Sathya's own sticker GIFs: paint them out of the sprite strip (flatten the banner/podium/app-icon tiles to the surrounding colour, keep people and text that is plain words).
- Do **not** offer "logo slots + timing sheet". Sathya said: "i cant add logos manually, so can you add the logos places interesting instead of boaring".
- Instead, each company/product **name** is set in our own type on a designed object that fits the story beat, in pink/blue. Examples from reel 09 (`reels/09-adobe-max-3-changes/film/modules/`, CSS at the end of `base.css`):
  - **Conference pass** on a pin that swings to rest (`.bdg`) - event name.
  - **App windows** with a title bar + "Agent" toggle; a blue cursor labelled "AI agent" clicks each and the toggle turns pink (`.awin`, `.cur`, `.cring`) - "an agent in every app".
  - **Spinning vinyl records** with the maker's name on a tape (`.vin`) next to a jukebox - "pick your model".
  - **Plugs** pushing up into one power strip, a pink LED lights per app (`.plg`, `.sock`) - MCP.
  - **Flip-down step cards** with folded corner + pink arrows between them (`.dc`) - a workflow chain.
  - **Race bibs** "MCP ready 01/02" at the finish line (`.bib`) - competitors already there, Adobe the snail is late.
- Fact-sensitive labels: mark previews/reports as such on screen ("Preview · reported for early 2027").

## Instagram Reels safe zone (1080x1920)

- Every text box: x 44-1029, y 234-1675.
- Notch rule (IG buttons, bottom right): if a text box's bottom > 1172 then its right edge must be <= 900.
- Run the zone audit over the whole film (step 0.1 s) and fix anything held >= 0.4 s: move text down from the top (top >= 330 when the camera zoom is about 1.03), shrink type, fade part-A text before a camera tilt, move labels left.

## Glyphs / fonts

- Allenoire, Morven, Regarn have Western European letters only. Never use `→ √ π ƒ ∞ … –`. Use `-` for dashes. `’` and `·` are fine. A missing glyph shows a fallback font and the page warns "typefaces lack a letter".

## Runtime

- Assets only via `<img src="' + kit.assets.url('x.webp') + '">`. CSS `url()` that is not `data:` is refused -> stickers invisible ("i can see the complete video, images are not showing" was this bug).
- `render(t)` must be a pure function of t. Set every animated property every frame (including resets), or scrubbing breaks.
- `UI.draw` hides the undrawn round cap with `opacity` - keep that.
- Class-name clashes with base.css silently restyle elements (`.bar`, `.clip`, `.pin`, `.ring`, `.panel`, `.card` exist). Prefix new classes.
- `SPR` must contain every animated sticker name with its cell size, or `UI.anim` throws and the scene shows its name card instead.
- No flashes > 3/s, no scene < 1 s.
- Store writes: `if_version` required on existing docs; batch <= 50 writes and <= 1 MB; one bad write refuses the whole batch.

## Sticker cutting

- Animated GIF sheets: upscale 2x LANCZOS, mask per frame (alpha for transparent GIFs, background distance for flat grey/white), assign each quadrant an anchor component, keep per-frame components touching the dilated anchor (R=40), clip to quadrant +-40-60 px.
- Problems seen: light beams bleeding into neighbours (smaller R per sticker), moving parts touching a neighbour (freeze frame 0 for both), enclosed background holes (fill/remove large holes), two stickers merged into one component (fall back to quadrant box).
- Drop stickers that end up unused before uploading.

## Colour requests

- "Our pink" / "our color" = `var(--main)` #FB3779; "our blue" = `var(--accent)` #3C46FD. Do not switch to a third-party brand colour even if asked to "match their logo" - Sathya corrected this to "No use our pink color".

## Fact-checking

- Search before stating any current fact (event dates, product names, versions, stats). Note the population behind a stat on screen ("of AI-using creators"), source on a `.tag` when it matters, and flag secondary reports.

## Delivery close (Motion type requirement)

> Here's your animation. <film url> It starts muted: the speaker button turns the sound on. Tell me if the music doesn't fit, or what else to change.

then: "I couldn't use your recording, but any video editor can add it to the video that Export saves." Plus one line max of anything else that matters.
