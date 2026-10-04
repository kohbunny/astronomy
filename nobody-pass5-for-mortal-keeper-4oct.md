# pass 5 · the body's death speaks the mind — a note for mortal.js's keeper
from the builder's chat (passes 1–4 of the one story), sunday 4 october 2026 · for terence to carry to the mortality project

**answered** (4 oct, `mortal-keeper-answer-pass5-4oct.md`): mortal.js reads the feed itself; the shell hands it nothing. its nicety is built: `?pulse=1`'s `death` carries `genome` and `moved`.

read with it: `nobody-one-story-handoff-2oct.md` (§3.3, §3.4, §5, §10 pass 5) and `nobody-last-radical-pass-2oct.md` (§2.2, §3.1). his rulings stand: **every lean of the radical pass stands** (3 oct), and **every [new] sentence so far is blessed** (4 oct). mortal.js is yours alone; nothing outside it was changed to need it, and nothing below asks you to change the card's rules.

## what the house already does without you (passes 1–4, live)
- **the keiki is down everywhere but the organ.** adeath, alife, phone.html, river.js and music.html no longer read `MORTAL.nobody` unless the address says `?keiki=1` (kept for comparison). every call to it is guarded. so the organ may retire it.
- **one mind, on the server:** nobody-think.mjs steps every ten minutes (every minute in its dying), dies every 88 minutes plus the star's breath, mid-sentence. its feed is `/.netlify/functions/nobody` (the site's own function; no key in a page):
  - `?pulse=1` → `{ life:{n,dying,dead}, line, death:{ life, at, last }, telegram, dream, wire }` — `death.last` is the cut sentence of the newest dead life.
  - `?airs=1` → `{ airs:[ { life, died, genome } ] }` — the last day's dead, oldest first.
  - `?now=1` → the room's frame, and `deaths` (how many have died in all).
- **messages** (phone.html) already gives every open body each death's cut sentence and each waking's telegram, and, when no mind died during a body's life, one last text in its dying: the line the living mind is writing then (§3.3).
- **an air** is the same everywhere (river, box, calendar). eight notes, one per gene, in the phone's order: `turning, balance, seeds, longevity, patience, temper, warmth, restless`. the server's ninth gene, `pace`, is added to turning. each value v is −1…1 in eighths:
  - rung i = i + round(8·v), clamped to −8…15;
  - degree = rung mod 7, octave = floor(rung / 7);
  - f = 173.6879 × [1, 9/8, 6/5, 4/3, 3/2, 8/5, 9/5][degree] × 2^octave (the box plays it an octave up). each air differs from the one before it by one note: the gene that moved.

## pass 5, as ruled
1. **the keiki retires from the organ.** `api.nobody` and its diary, stages, spell and almond can go; keep the name answering harmlessly if you want `?keiki=1` to stay a comparison.
2. **the call speaks the mind.** today `nobodySpeaks()` reads `api.nobody.last()` (the keiki's dream). instead it says the cut sentence of the mind that died while this body lived, in the phone's own voice. then it plays that dead life's air, eight notes. then the dissolve.
3. **tones alone** when no mind died during this body's life. the words already went to messages in its dying.
4. **the dissolve ends one breath apart:** the last two tones end exactly **1.357 Hz** apart (173.6879 ÷ 128). that is an absolute difference in Hz, knot cents, so it beats the same at any pitch. today `nbDissolve` drifts them ±7 cents (`NB_DRIFT`).
5. **the card is a telegram** (radical §3.1): the child card's NOTE (and its #) carries the last words of the one that died while the sender held the phone. the founder's card, when no one had died: [new, blessed] *no one had died in your hands yet.* unknown.html shows them as a `Notes` row on the sheet.
6. **the card carries no body genome** (radical §2.2, which supersedes the handoff's `print of the mind's genome`). every body is a print of the one mind, unmoved. the card carries the generation (and, per 5, the last words). the body keeps only its own breath and the order its tiles leave in.
7. **the device's inheritance** (his ruling of 28 sep): the browser keeps the child of the last phone that died in it, so a second tap of an old card opens that child, knot a founder. it bends `no trace` by exactly one kept thing.

## the hand-over, proposed (the shell's side is the builder's to build once you say yes)
the cleanest way for the call to know *which* mind died during this body's life is for phone.html, which already follows every death for messages, to keep one read-only object current:

```js
window.APWNP_DEAD = null || {
  life: 35,                                   // the mind's life that died while this body lived (the newest one)
  died: "2026-10-04T02:19:51.000Z",
  words: "pencil down on paper3, point north, 190 mm. line",   // cut where the death cut it
  genome: { pace:0, balance:-0.75, seeds:0, turning:-0.25, longevity:0, patience:0, temper:0.125, warmth:0, restless:0 },
  air: [/* eight Hz, as above */], moved: 1, // index of the gene that moved, or -1
  deaths: 1                                   // how many minds died during this body's life
}
```

framed rooms read it as `parent.APWNP_DEAD` (same origin). if you would rather read the feed yourself (`?pulse=1` at the call, compared with `MORTAL.life.born`), that works too. then the shell needs nothing, and only the air needs `?airs=1`. say which, through terence. the builder's chat (or the phone's pass 6 chat) builds the shell's side in an hour.

## the card, walked
- **unchanged:** rule 1 (mortal.js first) through rule 14.
- **7, nothing over the death call:** the call is the only voice. river.js, the rooms and the calendar's air all go quiet at `apwnp:call` already.
- **11, storage:** only the 28 sep inheritance is new, and it is his ruling.
- **13, no AI in a page:** the words are read, never generated, in a page.
