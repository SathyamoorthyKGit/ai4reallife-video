#!/usr/bin/env python3
"""Estimate voice-over duration and flag common script problems for a reel.

Usage:
  python scripts/script_timer.py script.txt [--wpm 165] [--target 45] [--max-sentence 12]
  cat script.txt | python scripts/script_timer.py - --target 60

Script conventions (same as the script template):
  [SQUARE BRACKETS]  = stage directions / beat labels -> ignored (not spoken)
  {curly braces}     = placeholders for numbers still to verify -> counted as spoken
  Lines starting with '#' are ignored.

Sinhala or mixed-language VO: word counts still work, but calibrate --wpm
by timing one real read of your voice (Sinhala words are often longer).
"""
import argparse
import re
import sys

REHOOK_HINTS = [
    "here's the catch", "but here's", "it gets worse", "it gets bigger",
    "now look", "look closer", "this is where", "nobody mentions", "but wait",
    "so who", "here's why", "and that's not all",
]


def load_text(path):
    raw = sys.stdin.read() if path == "-" else open(path, encoding="utf-8").read()
    kept = []
    for line in raw.splitlines():
        s = line.strip()
        if not s or s.startswith("#"):
            continue
        s = re.sub(r"\[[^\]]*\]", " ", s)          # drop stage directions
        s = re.sub(r"\{([^}]*)\}", r"\1", s)        # keep placeholder words
        s = re.sub(r"\s+", " ", s).strip()
        if s:
            kept.append(s)
    return " ".join(kept)


def words_of(text):
    return [w for w in text.split() if re.search(r"\w", w)]


def sentences_of(text):
    parts = re.split(r"(?<=[.!?])\s+", text)
    return [p.strip() for p in parts if words_of(p)]


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("path", help="script file, or - for stdin")
    ap.add_argument("--wpm", type=float, default=165, help="speaking rate (default 165)")
    ap.add_argument("--target", type=float, default=None, help="target length in seconds")
    ap.add_argument("--max-sentence", type=int, default=12, help="flag sentences longer than this")
    args = ap.parse_args()

    text = load_text(args.path)
    words = words_of(text)
    n = len(words)
    if n == 0:
        print("No spoken words found.")
        return 1

    sents = sentences_of(text)
    hook = sents[0] if sents else ""
    hook_n = len(words_of(hook))
    numbers = [w for w in words if re.search(r"\d", w)]
    lower = text.lower()
    rehooks = [h for h in REHOOK_HINTS if h in lower]

    def dur(wpm):
        return n / wpm * 60

    print("=== SCRIPT TIMER ===")
    print(f"Spoken words      : {n}")
    print(f"Duration @150 wpm : {dur(150):5.1f} s")
    print(f"Duration @{int(args.wpm)} wpm : {dur(args.wpm):5.1f} s   <- planning rate")
    print(f"Duration @180 wpm : {dur(180):5.1f} s")
    print(f"Sentences         : {len(sents)}  (avg {n / max(len(sents), 1):.1f} words)")
    print(f"Hook (sentence 1) : {hook_n} words -> \"{hook}\"")
    print(f"Numeric tokens    : {len(numbers)} {numbers[:8]}")
    print(f"Rehook phrases    : {len(rehooks)} {rehooks}")

    warnings = []
    if hook_n > 12:
        warnings.append(f"Hook is {hook_n} words; aim for 12 or fewer so it lands inside ~2 s.")
    long_s = [s for s in sents if len(words_of(s)) > args.max_sentence]
    for s in long_s:
        warnings.append(f"Long sentence ({len(words_of(s))} words): \"{s[:90]}...\"")
    planned = dur(args.wpm)
    if args.target:
        if planned > args.target + 3:
            cut = int((planned - args.target) / 60 * args.wpm) + 1
            warnings.append(f"Over target by {planned - args.target:.1f} s; cut about {cut} words.")
        elif planned < args.target - 5:
            warnings.append(f"Under target by {args.target - planned:.1f} s; fine if the payoff lands, otherwise add one evidence beat.")
    if planned > 20 and len(rehooks) == 0:
        warnings.append("No rehook phrase found; add one roughly every 8-12 s.")
    if planned > 60:
        warnings.append("Longer than 60 s; only keep if retention data for this series supports it.")

    print("\n=== WARNINGS ===" if warnings else "\nNo warnings.")
    for w in warnings:
        print("- " + w)
    return 0


if __name__ == "__main__":
    sys.exit(main())
