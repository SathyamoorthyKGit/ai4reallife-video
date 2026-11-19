# Bringing this memory into another Claude account

Claude memory can't be copied file-for-file between accounts. Use one of these:

1. **Paste**: open a new chat in the other account and send:
   "Remember these facts about me and my work:" followed by the contents of the .md files in this folder.
2. **Project knowledge**: create a Claude Project (e.g. "AI for Real Life Reels"), add these .md files plus
   `skills/ai4rl-motion-reel/SKILL.md` and its `references/` as project knowledge, and put the line below in the
   project's custom instructions.
3. **Import skill**: if the account has the "import-memory" skill, give it these files.

Suggested custom instructions:
> I'm Sathya (motion designer, Echelon Media). For AI for Real Life reels always use the ai4rl-motion-reel skill and
> follow it exactly. Be fast, short, and pitch ideas proactively.
