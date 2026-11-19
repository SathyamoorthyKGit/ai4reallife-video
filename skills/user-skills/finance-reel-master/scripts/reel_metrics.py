#!/usr/bin/env python3
"""Compute per-reach ratios for reels and diagnose each one against the
account's own median and rough industry heuristics.

Usage:
  python scripts/reel_metrics.py analytics_log.csv [--last 20] [--out scored.csv]

Input: a CSV using the header in assets/analytics_log_template.csv. Blank
cells are fine. Required for useful output: reach, views, length_s, plus
whatever of skip_rate_pct, avg_watch_s, shares_sends, saves, likes, follows
you have.

Heuristics are directional (third-party benchmarks, not Instagram rules):
  skip rate: industry averages ~60-66%; beat your own median first
  avg watch: aim for >= 50% of length on 30-60 s reels
  sends/reach: >= 1% strong, < 0.5% weak share value
  follows per 1k views: 10-20 healthy
"""
import argparse
import csv
import statistics
import sys


def num(v):
    try:
        return float(str(v).replace(",", "").strip())
    except (TypeError, ValueError):
        return None


def pct(a, b):
    return None if a is None or not b else a / b * 100


def fmt(v, d=1):
    return "-" if v is None else f"{v:.{d}f}"


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("csv")
    ap.add_argument("--last", type=int, default=0, help="only score the last N rows")
    ap.add_argument("--out", default=None, help="write scored CSV here")
    args = ap.parse_args()

    with open(args.csv, newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    if not rows:
        print("No rows.")
        return 1
    if args.last:
        rows = rows[-args.last:]

    for r in rows:
        reach, views, length = num(r.get("reach")), num(r.get("views")), num(r.get("length_s"))
        avg_watch = num(r.get("avg_watch_s"))
        r["sends_per_reach_pct"] = pct(num(r.get("shares_sends")), reach)
        r["saves_per_reach_pct"] = pct(num(r.get("saves")), reach)
        r["likes_per_reach_pct"] = pct(num(r.get("likes")), reach)
        fol = num(r.get("follows"))
        r["follows_per_1k_views"] = None if fol is None or not views else fol / views * 1000
        r["avg_watch_pct"] = pct(avg_watch, length)
        r["_skip"] = num(r.get("skip_rate_pct"))

    def median(key):
        vals = [r[key] for r in rows if isinstance(r.get(key), (int, float))]
        return statistics.median(vals) if vals else None

    med = {k: median(k) for k in ["_skip", "avg_watch_pct", "sends_per_reach_pct",
                                  "saves_per_reach_pct", "likes_per_reach_pct", "follows_per_1k_views"]}

    print("ACCOUNT MEDIANS (this set): skip {}% | avg watch {}% | sends/reach {}% | saves/reach {}% | follows/1k {}".format(
        fmt(med["_skip"]), fmt(med["avg_watch_pct"]), fmt(med["sends_per_reach_pct"], 2),
        fmt(med["saves_per_reach_pct"], 2), fmt(med["follows_per_1k_views"])))
    print()

    for r in rows:
        label = r.get("reel_id") or r.get("topic") or "?"
        notes = []
        skip, aw, sp = r["_skip"], r["avg_watch_pct"], r["sends_per_reach_pct"]
        fk = r["follows_per_1k_views"]
        if skip is not None and med["_skip"] is not None and skip > med["_skip"] + 3:
            notes.append("HOOK: skip rate above your median -> rework first frame + text hook")
        if aw is not None and aw < 50:
            notes.append("RETENTION: avg watch < 50% of length -> check retention graph drop point; cut or rehook there")
        if sp is not None and sp < 0.5:
            notes.append("SHARE VALUE: sends/reach < 0.5% -> add a 'who to send this to' angle or a more useful payoff")
        if sp is not None and sp >= 1 and fk is not None and fk < 10:
            notes.append("CONVERSION: shared but few follows -> strengthen series identity, cover template, bio")
        if not notes:
            notes.append("OK vs heuristics; compare against the series' best reel")
        print(f"[{label}] skip {fmt(skip)}% | watch {fmt(aw)}% | sends/reach {fmt(sp, 2)}% | "
              f"saves/reach {fmt(r['saves_per_reach_pct'], 2)}% | follows/1k {fmt(fk)}")
        for n in notes:
            print("   - " + n)

    if args.out:
        keys = [k for k in rows[0].keys() if not k.startswith("_")]
        with open(args.out, "w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=keys)
            w.writeheader()
            for r in rows:
                w.writerow({k: (round(r[k], 3) if isinstance(r[k], float) else r[k]) for k in keys})
        print(f"\nWrote {args.out}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
