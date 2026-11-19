> Reference for Stage 9 of the `finance-reel-master` skill. Paths like `scripts/...` and `assets/...` are relative to the master skill folder. Handoff names (`finance-reel-0X-...`) refer to the next stage's reference file `references/0X-...md`.

# Stage 9: Analytics & Iteration

This stage outputs a **per-reel diagnosis**, an updated **analytics log** and **hook library**, and a **monthly pattern review** with concrete changes for the next batch.

The loop is: publish → measure at 24 h / 72 h / 7 d → diagnose → change one variable → repeat. Accounts that grow are the ones that learn faster, not the ones that post more.

## Core principles

- **Ratios over raw counts.** Instagram's top signals are ratios: watch time, likes per reach, sends per reach. Compare reels on per-reach rates.
- **Your median is the benchmark.** Industry averages describe other accounts. Beat your own median first.
- **Change one variable per test** (the hook, length, preset or language), or you can't learn anything.
- **Claude can't open Instagram Insights.** Work from numbers or screenshots the user provides, or from an exported CSV.

## Metrics: what they mean

| Metric (Insights) | What it tells you | Fix area |
|---|---|---|
| Skip rate (% who left in the first 3 s) | Hook strength | First frame, text hook, first VO line |
| Average watch time / % watched | Overall retention | Pacing, rehooks, length |
| Retention graph (drop points) | *Where* attention dies | Cut or rehook at that second |
| Shares (sends) per reach | Share value; the strongest signal for reaching non-followers | Utility, "send to" angle, social currency |
| Saves per reach | Reference value | Practical takeaways, checklists |
| Likes per reach | Approval among connected viewers | Overall quality |
| Follows per 1,000 views | Conversion to audience | Series identity, cover consistency, bio |
| Non-follower reach % | Discovery | Hook, sends, originality |
| Replays / watch time > length | Loop strength | Loop endings |

## Checkpoints

- **24 h:** trial-reel results (skip rate, average watch, sends), and early momentum on main posts.
- **72 h:** the main read for most reels. Trial reels can auto-share to followers by now if you chose that.
- **7 d:** the final row in the log, plus a long-tail and search-discovery check.

## Benchmarks (directional, third-party)

| Metric | Weak | OK | Strong |
|---|---|---|---|
| Skip rate | above your median +5 pts | around your median (industry ~60–66%) | 10+ pts below your median |
| Avg watch, % of length (30–60 s) | under 35% | 35–50% | over 50% |
| Sends per reach | under 0.5% | 0.5–1% | over 1% |
| Follows per 1k views | under 5 | 5–10 | 10–20+ |

These heuristics come from analytics vendors and case studies, not Instagram. Use them as directional guides only.

## Diagnosis table

| Pattern | Likely cause | Next action |
|---|---|---|
| High skip rate | Hook states a topic, not a tension; slow first frame | Rewrite with a different formula (H1–H7); move the hero visual to frame 0 |
| Cliff at second *t* | Dead beat, long sentence, context dump | Cut or compress beat *t*; add a rehook and visual change before *t* |
| Slow steady decline | Too long, too little escalation | Shorten 10–20%; add a scale jump at the midpoint |
| Good watch, low sends | Interesting but not useful or social | Add a named "send to" person, a practical takeaway, a sharper verdict |
| Good sends, low follows | One-off value, weak identity | Make it a series; consistent cover and opener; a "Part 2" tease |
| High saves, low reach | Useful but hook too dry | Keep the body, test a more emotional hook |
| Strong non-follower reach, weak followers | Viral topic outside your niche | Make a niche-relevant follow-up quickly |

## Hook A/B protocol (trial reels)

1. Pick 2–3 hook variants of the same reel (different formulas, identical body).
2. Post the variants as trial reels (shown to non-followers only, not on your grid). Trial reels need a public professional account.
3. At 24 h, compare skip rate, average watch time and sends per reach.
4. Share or publish the winner to followers. Log all variants in the hook library with the lesson learned.
5. After about 10 tests, rank the hook formulas by median skip rate for your audience, and make the top 2 the defaults in Stage 2.

## Logging

- `assets/analytics_log_template.csv`: one row per published reel.
- `assets/hook_library_template.csv`: one row per hook variant tested.
- Score a log:

```
python scripts/reel_metrics.py analytics_log.csv --last 20 --out scored.csv
```

  This computes the per-reach ratios, compares each reel with the account median, and prints a diagnosis per reel.

If the user keeps the log elsewhere (a Google Sheet, Excel, a ClickUp list), work from their file and use the same columns.

## Monthly pattern review

1. Take the top 10% and bottom 10% of reels by sends per reach and by average watch %.
2. For each group, tabulate: topic archetype, hook formula, preset, length, language, posting day, news-hook (yes/no).
3. Write 3 "keep doing" rules and 3 "stop doing" rules, each tied to evidence.
4. Update the Stage 1 idea-scoring weights. For example, if timeliness clearly predicts sends, weight it ×1.5.
5. Plan next month's tests, still changing one variable per test.

**Language test** (for Sri Lankan audiences):
- Run the same topics in EN, SI and bilingual versions as trial reels for about 8 weeks.
- Compare skip rate, sends and follows by language before committing a series to one language.
- Remember that Facebook reaches a much larger Sri Lankan audience than Instagram. Cross-post and compare.

## Output format

```
PERFORMANCE REPORT: {period / reel}
Headline: {one sentence: what happened and why}
| Reel | Skip % | Avg watch % | Sends/reach % | Saves/reach % | Follows/1k | Verdict |
Diagnosis: {per reel, from the table}
What we learned: {3 bullets max}
Next tests: {variable → hypothesis → how measured}
Changes to the pipeline: {Stage 1/2/3 defaults to update}
```

## Handoff

Feed the learnings back into Stage 1 (`finance-reel-01-ideation-research`) and Stage 2 (`finance-reel-02-script`).
