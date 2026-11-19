# Sound - SFX only, no music

Sathya's standing rule: **no music, SFX only.** There are two layers of sound.

## 1. In-film score (`modules/score.js`)

Synth foley inside the Motion film so the preview has sound. Built from the type's sound kit (`S.fx` names: tick, click, doubleclick, pop, ding, chime, sparkle, whoosh, revswell, roll, boing, thud; `S.drum`: kick, snare, clap, sidestick, hat, openhat, shaker, tamb, woodblock, cowbell, tom, crash, ride; `S.ticks([...])`). Read the type's sound.md before writing it.

House macros (copy from `template/example_score_reel09.js`):

```js
const SUCK = (t,d,v) => fx('whoosh', t-(d||0.3), {dur:d||0.3, vel:v||42, into:1});   // air pulled in before a hit
const SLAM = (t,v,p) => { SUCK(t,0.22,36); fx('thud',t,{vel:v||92,pan:p||0}); dr('clap',t,50); dr('kick',t,70); };
const STAMP = (t,v) => { SUCK(t,0.25,40); fx('thud',t,{vel:v||112}); dr('snare',t,70); dr('crash',t+0.01,32); dr('kick',t,92); };
const LAND = (t,v,p) => { fx('thud',t,{vel:v||68,pan:p||0}); dr('tom',t,44); };      // sticker lands
const WHIP = (t,p) => { fx('whoosh',t,{dur:0.36,vel:64,pan:p||0}); dr('hat',t+0.02,18); }; // camera whips between scenes
const POP = (t,v,p) => fx('pop',t,{vel:v||46,pan:p||0});
const SLOT = t => { fx('pop',t,{vel:62}); dr('woodblock',t+0.02,34); fx('thud',t+0.05,{vel:46}); }; // name card arrives
const LETTERS = (at,txt,seed,t0,span) => {...}  // one key tick per revealed letter, same seed as UI.letters
S.master({ gain: -8, fadeOut: 0.6 });
```
Every effect sits **on the frame of its picture event** (same constants as the scene). Validate with `node scripts/scoretest.js score.js '{"hook":0,...,"END":<dur>}'`.

## 2. Library SFX mix (the delivered audio)

Sathya's own SFX library (`library/sfx/*.wav`, originals as MP3 in `source-uploads/sfx-mp3/`):
`1_Click_Mouse, Analog_Shutter, Camera_Focus__Shutter, Deep_Hit, Deep_Hit_2, Deep_Hit_3, Deep_Whoosh_1-4, Dramatic_Impact, Fast_Whoosh, Glitch_1, Glitch_2, Glitch_Bass, Glitch_Beat, Hit_1, Hit_2, Impact__Subdrop, Mechanical_Keyboard`.

`scripts/sfx_lib.py` has the sample bank + helpers: `put(name, t, at, db, pan, rate, trim, fade)` (places the sample so its transient `at` lands on film time t), `key` (one keyboard stroke from a pool of clean hits), `letters` (one key per letter, same seed as the film), `count`, `shutter`, `click`, `whip` (Deep_Whoosh peak on t), `big_whoosh`, `fast`, `slam`, `stamp`, `land`, `pop`, `glitch`, `sub`.

Per reel: copy `example_mix_reel09.py`, set `DUR` (film length), `T` (scene starts = cumulative `dur` from scenes.json), and rewrite the event list scene by scene mirroring score.js (same times). Run `SFX_WAV=library/sfx/ python3 mixNN.py sfx_stem.wav`.

Then `scripts/mix.sh sfx_stem.wav VO.mp3 <DUR> <ReelName>` makes:
- `<ReelName>_VO_SFX_mix.mp3` - VO + SFX, SFX at -11 dB sidechain-ducked under the voice, loudnorm -14 LUFS, limiter; target about **-14 LUFS, peak about -3 dBFS**.
- `<ReelName>_SFX_stem.mp3` - SFX alone (for re-balancing in their editor).

Both 256 kbps MP3, 48 kHz, exact film length (VO padded). Deliver both as file attachments.
