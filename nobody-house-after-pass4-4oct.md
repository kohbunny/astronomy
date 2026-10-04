# the house after passes 1–4 · a primer for each pass 6 chat
sunday 4 october 2026 (updated after the keeper's answer) · from the builder's chat · give this to every new chat, with the four files below

## what to hand a new chat
1. `THE-MORTALITY-CARD.md` (rules 1–14; `mortal.js` has its own keeper and is never edited elsewhere).
2. `nobody-one-story-handoff-2oct.md` (the story; §7 is each room's one question; §10 pass 6 lists the facets).
3. `nobody-last-radical-pass-2oct.md` (**every lean stands**, his ruling of 3 oct).
4. `nobody-the-mind-v1.3.md` (the mind's laws as it reads them).
5. this primer.
6. **only for the paper:** his latest handoff from the "newest times" project.

**his rulings since the handoff:**
- every [new] sentence written so far is blessed (4 oct);
- the small tree stays in adeath, holding the box, but no longer rises (the box keeps the count);
- adeath ducks the river.

## where the work is
- repository `kohbunny/astronomy`. all of passes 1–4 is on the branch **`claude/eager-curie-7d5u63`**; `main` is still the first upload. start each new chat from that branch, or merge it into main first.
- he deploys by dragging his `song` folder to netlify (the html, the js beside them, and `netlify/functions/`). no npm install, so add no dependency.

## what is built
- **the mind** (`netlify/functions/`):
  - `nobody-step.mjs` knocks every ten minutes, and `nobody-think.mjs` thinks: one model call a step, every minute in the last eight.
  - it dies every 88 minutes plus the star's breath, mid-sentence; its child follows.
  - each dream is kept as its length (thinking tokens), its seal's fingerprint and another mind's summary. the summaries are veiled from the feed until `NOBODY_DREAMS_PUBLIC=1`.
  - each death keeps its genome (an air), and each step keeps its frame (for replay).
- **the feed** (`nobody.mjs`, public, cached at netlify's edge):
  - `?now=1`: the room's frame, `deaths`, `genome`, and the day's drawer;
  - `?day=YYYY-MM-DD`: a day's drawer — windows, hud, lives with their first line, last words, gene moved and genome; dreams; telegrams;
  - `?pulse=1`: the light question — life, line, last death (its words, its genome and its moved note), telegram, last dream, wire;
  - `?airs=1`: the last day's dead airs;
  - `?film=YYYY-MM-DD`: a day's frames;
  - `?health=1`: plain words for terence.
- **the phone** (`phone.html`):
  - one page of eleven, a dock of four;
  - **messages:** nobody's thread, on the radio law (everything lands 40 s after its stamp, the same second on every phone);
  - **phone:** call nobody (it rings; in the gap, the dead-number tones);
  - **calendar:** ● the day and ☾ the lives, where a tap plays a life's air;
  - the keiki is down (`?keiki=1` and `?rooms=all` bring the old house back for comparison).
- **adeath:**
  - the knock and the caret, `no one came`, bare water, the slow last step, the gap `no one · HH:MM utc`, the two silences of the hum;
  - the box plays the mind's dead, with a pin of the count per death;
  - the river is ducked.
- **alife:** the door line, the rope answering nobody's hands below, the box playing the dead.
- **the river** (`river.js`, `music.html`):
  - each dream sounds muffled at its landing, as long as it was long;
  - the dead airs play faintly under the bed;
  - the hands, the dj and the temper retired.
- **an air:** eight notes, one per gene on the star's ladder. the rule is the same in `river.js` (`airOf`), the rooms (`rungsOf`) and the mortality note.

## how the house is built (the builder's way, kept by every chat)
- **patches:** python str_replace patches with uniqueness asserts. `node --check` on every inline script (`press/check-inline.py`).
- **notes:** a dated note at the top of each changed file saying what changed, and nothing else.
- **presses:** a headless press beside the work in `press/` (`press/serve.mjs` serves `song/` and answers the feed). the presses are the builder's to run, never terence's.
- **marks:** every sentence a visitor reads is marked [new] for his blessing; every choice of the builder's is marked [deemed].
- **the card:** walk rules 1–14 in the reply. never edit `mortal.js`.
- **no AI in a page.** a room reads the feed; only the server functions call a model.
- **storing:** ask before storing anything new.
- **the reply:** say what each changed file is for, push the branch, and send the changed `song` files so he can drag the folder to netlify. then stop; he tests on his iphone.

## open, for the chats that touch them
- **pass 5** (mortal.js, its keeper): see `nobody-pass5-for-mortal-keeper-4oct.md` and the keeper's answer, `mortal-keeper-answer-pass5-4oct.md`. **mortal.js reads the feed itself; phone.html hands it nothing.** at the call it asks `?pulse=1` (and `?airs=1`). since the keeper's answer, `?pulse=1`'s `death` also carries its `genome` and `moved`, so one ask is enough. no pass 6 chat needs to build anything for the call.
- **the set card** is still written in `ask.js` with a prompt that calls the writer nobody (the river's ⓘ now says the desk writes it). the raven's chat (`time.html`, `ask.js`) is the place to fix it. the raven's one law (radical §2.4): it knows only what messages holds.
- **the game** (`mommygame.html`): its line is [new, blessed] *this run is as long as nobody's last dream. nothing else of the dream is in it.* (radical §1.4).
- **notes:** one locked note per life. **nestflix:** dreams as films from the summaries (read the veil above), past performances from `?film=`.
