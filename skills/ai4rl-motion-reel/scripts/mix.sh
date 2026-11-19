#!/bin/bash
# SFX stem + VO mix -> two MP3 deliverables (no music). ~-14 LUFS, peak ~-3 dBFS.
#   ./mix.sh sfx_stem.wav VO.mp3 DURATION OutName
set -e; STEM=$1; VO=$2; DUR=$3; N=$4; O=${OUT:-/mnt/user-data/outputs}; mkdir -p "$O"
ffmpeg -y -loglevel error -i "$STEM" -c:a libmp3lame -b:a 256k "$O/${N}_SFX_stem.mp3"
ffmpeg -y -loglevel error -i "$STEM" -i "$VO" -filter_complex "[1:a]aresample=48000,apad=whole_dur=$DUR,asplit=2[vo][key];[0:a]volume=-11dB[s];[s][key]sidechaincompress=threshold=0.03:ratio=4:attack=10:release=300[duck];[vo][duck]amix=inputs=2:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=11,atrim=0:$DUR,volume=2.5dB,alimiter=limit=0.7:attack=1:release=40:level=disabled[m]" -map "[m]" -ar 48000 -c:a libmp3lame -b:a 256k "$O/${N}_VO_SFX_mix.mp3"
for f in "$O/${N}_"*.mp3; do echo "$f"; ffmpeg -hide_banner -i "$f" -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+(I:|Peak:)"; done
