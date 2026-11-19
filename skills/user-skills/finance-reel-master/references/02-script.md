> Reference for Stage 2 of the `finance-reel-master` skill. Paths like `scripts/...` and `assets/...` are relative to the master skill folder. Handoff names (`finance-reel-0X-...`) refer to the next stage's reference file `references/0X-...md`.

# Stage 2: Script

This stage outputs a **timed beat-sheet script**: VO, on-screen text and a visual note per beat, plus **3 hook variants**. The script is the spine of the reel. Editing, motion and sound all hang off its timing, so it gets written and timed before anything is designed.

## Core principles

- **The hook decides everything.** Studies of business-page Reels show average skip rates of roughly 60–66% within the first 3 seconds. The first 2 seconds must deliver a visual hook, a text hook and a spoken hook carrying the same message.
- **One idea.** Anything that doesn't serve the one-line promise from the Idea Brief gets cut, or saved for Part 2.
- **Designed for mute.** Most feed video is watched with the sound off. Every beat needs an on-screen text version that makes sense without audio.
- **Engineer the send.** The script should make it obvious who the viewer should send it to.
- **Only verified numbers.** Use figures from the Research Pack. Unverified figures stay as `{placeholders}`.

## Script conventions

- `[SQUARE CAPS]` = stage directions and beat labels (not spoken).
- `{curly}` = a number or name still to verify (spoken).
- Write numbers the way they will be **spoken** in the VO column ("nearly two trillion rupees") and as **digits** in the on-screen column ("Rs. 1.9 TN").

## Length & pacing targets

| Length | Words (at ~160–175 wpm) | Use for |
|---|---|---|
| 20–30 s | 55–85 | Single shock number, news flash |
| 45 s (default) | 115–130 | Most explainers |
| 60 s | 150–170 | Company stories, two-step mechanisms |
| 60–90 s | 170–250 | Only when series retention data supports it |

Natural conversational VO runs ~150 wpm, and energetic explainers run 160–180. Sentences should be **12 words or fewer**. Run `python scripts/script_timer.py script.txt --target 45` to check duration, hook length, long sentences and rehook coverage.

## Hook formulas (write 3 variants, each from a different formula)

| Code | Formula | Example (numbers illustrative) |
|---|---|---|
| H1 | Shock number | "Every Sri Lankan's share of public debt is {Rs. X}." |
| H2 | Why question | "Why does a Colombo bank pay you less than inflation?" |
| H3 | Contrarian | "Your 'safe' fixed deposit might be losing money." |
| H4 | Stakes / you | "If you have a home loan, today's rate cut matters." |
| H5 | Story cold-open | "In {year}, this company was worth {Rs. X}. Today, {Rs. Y}." |
| H6 | Comparison | "Rs. 1,000 in {2015} vs today." |
| H7 | Reveal tease | "Sri Lanka's most valuable brand isn't who you think." |

**Hook rules:**
- 12 words or fewer.
- No greeting, no logo sting, no "In this video…".
- The first frame is already moving.
- The text hook (3–6 words) paraphrases the spoken hook and stays on screen at least 1.5 s.
- The visual must show the subject of the hook immediately (the number counting up, the product, the headline).

## Choose an arc

| Arc | Best for | Beats |
|---|---|---|
| Question → context → twist → answer → implication | "Why" topics | Default |
| Rise → crisis → turn → today | Company stories | Use dates as anchors |
| Myth → evidence → truth → what to do | Personal finance | End on an action |
| Number → scale comparison → cause → so what | Data topics | Hero number first |

## Beat sheet (45 s default)

| Beat | Time | Purpose | Notes |
|---|---|---|---|
| HOOK | 0–2 s | Stop the scroll | Visual + text + VO hook together |
| OPEN LOOP | 2–5 s | Promise the payoff | "…and the reason isn't what you think." |
| CONTEXT | 5–15 s | Minimum setup | Define one term in 5 words or fewer; no history lessons |
| REHOOK 1 | ~15 s | Re-grab attention | "But here's the catch…" plus a pattern interrupt |
| EVIDENCE | 15–30 s | Prove it | One data beat about every 3 s, one number per beat |
| REHOOK 2 | ~30 s | Escalate | "It gets bigger…" plus a scale comparison |
| PAYOFF | 30–40 s | Close the loop, give the "aha" | One line; hold the visual 2–3 s |
| SO WHAT + CTA | 40–45 s | Value + send/save | 2 s CTA or less; or loop back into the hook |

**30 s version:** HOOK 0–2, CONTEXT 2–8, EVIDENCE 8–18, PAYOFF 18–25, CTA 25–30.

**60 s version:** add a second evidence block and a third rehook at about 45 s.

Rule: open the loop by 5 s, and do not close it before ~70% of runtime.

## Rehooks & pattern interrupts

**Rehook lines:**
- "But here's the catch."
- "Now look closer."
- "It gets worse."
- "This is where it gets interesting."
- "Here's the part nobody mentions."
- "So who actually wins?"

Every rehook gets a `[VISUAL CHANGE]` note: a new scene, scale jump, colour flip or collage cut-in. The pattern interrupt is what resets attention, and the line justifies it.

## Writing rules

- Use "you" and concrete stakes. Use names, dates and exact figures rather than adjectives.
- Write one number per sentence. Compare big numbers to something familiar ("that's more than {X} per person").
- Remove jargon, or define it in-line in 5 words or fewer ("AWPR, the rate banks charge their best customers").
- Use active voice and present tense where possible.
- **Sinhala or bilingual VO:**
  - Write in natural spoken Sinhala, not formal written Sinhala.
  - Keep common English finance terms that people actually say: interest rate, FD, loan, inflation, share market.
  - Put numbers on screen as Western digits.
  - Calibrate wpm by timing one real read.
- **Compliance:** investing topics include "educational, not financial advice" in the caption (and in VO if the claim is specific). No buy/sell calls on named securities.

## Endings (pick one)

1. **Loop:** the last line flows into the first line, which drives replays.
2. **Save CTA tied to utility:** "Save this before your next FD renewal."
3. **Send CTA naming a person:** "Send this to someone with a home loan." This targets sends, the strongest discovery signal.
4. **Series tease:** "Part 2: how leasing companies really make money."

Keep CTAs to 2 seconds or less. Never use a 5-second end card. The follow ask lives in the caption or pinned comment.

## Output format

```
SCRIPT: {title}  |  Target: {45 s}  |  Words: {n}  |  Est: {s} @ {wpm}
Arc: {arc}   Promise: {one line}   Send-to: {person}

HOOK VARIANTS
A (H?): ...
B (H?): ...
C (H?): ...

| Beat | Time | VO (spoken) | On-screen text (≤6 words) | Visual note |
|------|------|-------------|---------------------------|-------------|
| HOOK | 0–2 | ... | ... | ... |
...
Sources used: #1, #3, #4 (Research Pack rows)
Open placeholders: {list}
```

## Worked example (illustrative; verify every claim in the Research Pack)

| Beat | Time | VO | On-screen | Visual |
|---|---|---|---|---|
| HOOK | 0–2 | The Central Bank just cut rates. Your loan didn't notice. | RATE CUT ≠ CHEAPER LOAN? | Policy rate counter ticks down; loan slip stays frozen |
| OPEN LOOP | 2–5 | Here's how long the cut really takes to reach you. | HOW LONG? | Clock cut-out spins |
| CONTEXT | 5–15 | The policy rate is what banks pay to borrow overnight. When it drops, their money gets cheaper. But your loan isn't priced on that rate. | POLICY RATE ↓ | Collage: bank building, overnight moon, arrow down |
| REHOOK 1 | ~15 | Here's the catch. | THE CATCH | Paper tear to red |
| EVIDENCE | 15–30 | Most floating loans track AWPR, the rate banks charge their best customers. AWPR follows the policy rate, but with a lag of {X weeks}. Fixed-rate loans? They don't move at all. | AWPR LAG: {X} WEEKS | Two line charts drawing on; gap highlighted |
| REHOOK 2 | ~30 | So who wins first? | WHO WINS? | Scale jump: bank vs borrower |
| PAYOFF | 30–40 | {Deposit rates fall fast. Loan rates fall slowly.} | BANKS WIN FIRST | Hold on split chart 2.5 s |
| CTA | 40–45 | Check if your loan is fixed or floating. Send this to someone with a home loan. | FIXED OR FLOATING? | Loan slip stamped "CHECK" |

About 115 words, roughly 42–45 s at 165 wpm.

## Script QA (all must pass)

- [ ] Hook is 12 words or fewer, with matching text and visual, and no greeting.
- [ ] Loop opens by 5 s and closes after ~70% of runtime.
- [ ] Rehook every 8–12 s, each with a visual change.
- [ ] One idea; nothing outside the promise.
- [ ] Every number traces to a Research Pack row; open `{placeholders}` are listed.
- [ ] Sentences are 12 words or fewer, and the script reads aloud within target ±3 s.
- [ ] Ending is a loop, save, send or series tease, 2 s or less.
- [ ] Mute test: the on-screen column alone tells the story.

## Handoff

Pass the locked script and the chosen hook (keep the other two for trial reels) to Stage 3 (`finance-reel-03-storyboard-motion`) and Stage 4 (`finance-reel-04-sound-design`).
