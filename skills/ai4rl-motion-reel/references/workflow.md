# Per-reel workflow

## Turn 1 - Sathya sends the script + VO

1. **Fact-check** every claim with web search (dates, names, numbers, "just launched"). Give a short list: OK / fix (with the corrected line). Keep the script's voice.
2. **VO timings**: `scripts/vo_timings.sh Reel_NN.mp3` -> word start times + duration. Map each script line to a time range. Scene boundaries sit on sentence starts; film length = VO length + ~2.4 s brand card.
3. Reply (short, scannable):
   - **Storyboard table**: `# | scene id | VO time | VO line | visual (sticker metaphor + type + camera move)`.
   - **Hook idea** (proactive): what is on screen at frame 0 to stop the scroll; first 3 s must already be moving. If Sathya marks a sticker for the hook ("use the adobe max gif within first 3 seconds"), it goes in frame 0.
   - **Asset list**: stickers needed (one visual metaphor per beat), anything they must supply (stock clip, portrait).
   - **Sticker-sheet prompts** (below), 4 stickers per sheet, grouped by scene order.
4. Ask nothing else unless a fact can't be resolved.

### Sticker-sheet prompt format

Sathya generates the sheets with an AI image/GIF tool and sends animated GIFs back. Give one prompt per sheet:

```
Sheet A (hook + setup) - 2x2 grid sticker sheet, 4 separate die-cut paper stickers, each centred in its quadrant
with generous empty space between them, thick white sticker border, [full-colour pop-art | black-and-white halftone
print] style, bold black outlines, flat transparent (or plain light-grey) background, no text, no letters, no logos,
no brand marks. Subtle looping animation, 6 frames: 
  1 (top-left): a stock ticker machine spitting paper headline strips
  2 (top-right): a cartoon hand grabbing from above
  3 (bottom-left): ...
  4 (bottom-right): ...
```
Single big set pieces (a conference stage, a whole room) get their own one-sticker GIF. Ask for no text/logos so nothing has to be painted out.

## Turn 2 - sheets arrive -> build

1. `python3 scripts/cut_gif_sheet.py sheet.gif film name1 name2 name3 name4` per sheet (check each `proc/<name>.png`; fix bleed/merge cases per rules). Paint out any logo inside a sprite.
2. Collect assets into `film/assets/`: fonts (6 woff2), `paper2.webp`, `logo.webp`, plus stickers. Remove unused ones.
3. Copy `template/modules/*` (or the latest reel's) into `film/modules/`, paste `UI.SPR` from the cutter, write `scenes.json` (ids, names, durs from the VO map, desc), each `scene-<id>.js`, `score.js`.
4. Validate: syntax (`node -e "new Function('kit','UI',src)"`), safe-zone audit + `zones.py` (render.mjs from the Motion type's render-offline.md), a few stills of busy frames, `scoretest.js`.
5. Create the film (Artifact publish with the Motion `type_url`, title, `auto_open:"after_first_write"`), upload assets (`asset:true`, <= 25 per call), `scripts/build_push.py`, one `ArtifactData batch`.
6. SFX stem + mix MP3s (sound.md). Deliver both files.
7. Close (rules-and-gotchas.md "Delivery close"). Mention in one line anything replaced (e.g. logos painted out of their GIFs).

## Later turns - changes

- Follow the Motion type's later.md (list modules first, read later.md, change only what's asked, `if_version` on every write, keep ids/timings, re-fit `score.js` if timing changes).
- If timing doesn't change, the MP3s stay valid - say so.
- Keep the local copy and the repo (`reels/NN-*/film/`) in sync after pushes.
