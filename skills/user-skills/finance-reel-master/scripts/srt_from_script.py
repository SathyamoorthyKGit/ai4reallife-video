#!/usr/bin/env python3
"""Build a rough SRT of short caption chunks (1-4 words) from reel VO text.

Timing is ESTIMATED from the speaking rate. Always align it to the real
voice-over afterwards (Premiere/Resolve transcription, or nudge by hand).
The value of this script is the chunking: numbers stay with their units,
chunks don't end on weak words, and breaks follow punctuation.

Usage:
  python scripts/srt_from_script.py script.txt -o captions.srt
  python scripts/srt_from_script.py script.txt --wpm 170 --max-words 3 --offset 0.2 -o out.srt

Conventions: [STAGE DIRECTIONS] are dropped; {placeholders} are kept as text.
"""
import argparse
import re
import sys

UNITS = {
    "%", "percent", "per", "cent", "rupees", "rupee", "rs", "rs.", "lkr", "usd", "$",
    "bn", "billion", "mn", "million", "trillion", "crore", "crores", "lakh", "lakhs",
    "thousand", "k", "x", "times", "years", "year", "months", "weeks", "days",
}
CURRENCY_PREFIX = {"rs.", "rs", "lkr", "usd", "us$", "$"}
WEAK_END = {
    "the", "a", "an", "of", "to", "and", "or", "in", "on", "for", "your", "my",
    "is", "are", "was", "with", "at", "by", "from", "that", "this", "but", "so",
}
SENTENCE_END = (".", "!", "?")
CLAUSE_END = (",", ";", ":", "—", "-")


def clean(text):
    out = []
    for line in text.splitlines():
        s = line.strip()
        if not s or s.startswith("#"):
            continue
        s = re.sub(r"\[[^\]]*\]", " ", s)
        s = re.sub(r"\{([^}]*)\}", r"\1", s)
        out.append(s)
    return re.sub(r"\s+", " ", " ".join(out)).strip()


def is_number(tok):
    return bool(re.search(r"\d", tok)) or tok.strip("{}").upper() in {"X", "Y", "N"}


def group_tokens(tokens):
    """Glue currency + number + unit into one unbreakable unit."""
    units, i = [], 0
    while i < len(tokens):
        cur = [tokens[i]]
        low = tokens[i].lower().rstrip(",.")
        if low in CURRENCY_PREFIX and i + 1 < len(tokens) and is_number(tokens[i + 1]):
            cur.append(tokens[i + 1])
            i += 1
        if is_number(cur[-1]) and not cur[-1].endswith(SENTENCE_END + CLAUSE_END):
            while i + 1 < len(tokens) and tokens[i + 1].lower().strip(",.!?;:") in UNITS:
                cur.append(tokens[i + 1])
                i += 1
                if cur[-1].endswith(SENTENCE_END + CLAUSE_END):
                    break
        units.append(cur)
        i += 1
    return units


def chunk(units, max_words):
    """Pack token-units into chunks of <= max_words; returns list of lists of units."""
    chunks, cur = [], []

    def size(c):
        return sum(len(u) for u in c)

    for u in units:
        if cur and size(cur) + len(u) > max_words:
            # don't end a chunk on a weak word if we can push it forward
            if len(cur) > 1 and len(cur[-1]) == 1 and cur[-1][0].lower().strip(",.") in WEAK_END:
                carry = cur.pop()
                chunks.append(cur)
                cur = [carry]
            else:
                chunks.append(cur)
                cur = []
        cur.append(u)
        last = u[-1]
        if last.endswith(SENTENCE_END) or (last.endswith(CLAUSE_END) and size(cur) >= 2):
            chunks.append(cur)
            cur = []
    if cur:
        chunks.append(cur)

    # rebalance: avoid a one-word orphan at the end of a sentence/clause
    for i in range(1, len(chunks)):
        prev, this = chunks[i - 1], chunks[i]
        prev_ends = prev[-1][-1].endswith(SENTENCE_END + CLAUSE_END)
        if size(this) == 1 and not prev_ends and len(prev) >= 2 \
                and size(this) + len(prev[-1]) <= max_words + 1:
            this.insert(0, prev.pop())
    return [[w for u in c for w in u] for c in chunks if c]


def ts(sec):
    ms = int(round(sec * 1000))
    h, ms = divmod(ms, 3600000)
    m, ms = divmod(ms, 60000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("path", help="VO script file, or - for stdin")
    ap.add_argument("-o", "--out", default="-", help="output .srt (default stdout)")
    ap.add_argument("--wpm", type=float, default=165)
    ap.add_argument("--max-words", type=int, default=3, help="max words per chunk (1-4)")
    ap.add_argument("--offset", type=float, default=0.0, help="seconds before first word")
    ap.add_argument("--pause", type=float, default=0.25, help="pause after sentence end (s)")
    ap.add_argument("--min-dur", type=float, default=0.3, help="minimum chunk duration (s)")
    args = ap.parse_args()

    raw = sys.stdin.read() if args.path == "-" else open(args.path, encoding="utf-8").read()
    text = clean(raw)
    tokens = text.split()
    if not tokens:
        print("No spoken text found.", file=sys.stderr)
        return 1

    chunks = chunk(group_tokens(tokens), max(1, min(args.max_words, 4)))
    sec_per_word = 60.0 / args.wpm
    total_chars = sum(len(t) for t in tokens)
    total_words = len(tokens)
    speech_time = total_words * sec_per_word

    t = args.offset
    lines = []
    for idx, c in enumerate(chunks, 1):
        chars = sum(len(w) for w in c)
        d = max(args.min_dur, speech_time * chars / total_chars)
        caption = " ".join(c).rstrip(",;:")
        lines.append(f"{idx}\n{ts(t)} --> {ts(t + d)}\n{caption}\n")
        t += d
        if c[-1].endswith(SENTENCE_END):
            t += args.pause

    srt = "\n".join(lines)
    if args.out == "-":
        print(srt)
    else:
        with open(args.out, "w", encoding="utf-8") as f:
            f.write(srt)
        print(f"Wrote {len(chunks)} chunks, ~{t:.1f} s, to {args.out}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
