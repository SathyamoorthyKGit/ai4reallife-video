#!/bin/bash
# Run once from inside this folder on your computer (needs git + access to the repo):
#   bash push_to_github.sh
set -e
git init -q 2>/dev/null || true
git branch -M main
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/SathyamoorthyKGit/Animation-AI4RealLife.git
git add -A
git commit -qm "AI for Real Life reel pipeline: skill, reels 01-09, library, memory" || true
git push -u origin main
