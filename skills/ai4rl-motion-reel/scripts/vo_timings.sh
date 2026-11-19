#!/bin/bash
# Word timings from the user's voice-over:  ./vo_timings.sh Reel_10.mp3 > words.txt
# Needs: pip install pocketsphinx --break-system-packages ; ffmpeg
set -e; T=$(mktemp -d); ffmpeg -loglevel error -y -i "$1" -ac 1 -ar 16000 -f s16le "$T/vo.raw"
python3 "$(dirname "$0")/asr.py" "$T/vo.raw"; ffprobe -v error -show_entries format=duration -of csv=p=0 "$1" | sed 's/^/DURATION /'
