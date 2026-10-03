# READ THIS FIRST — THE MORTALITY CARD · version two · 23 sep 2026
### for any claude editing a page of song.aprojectwithnopurpose.com
*(terence hands this over with the file. you do knot need to understand the whole system — you need to keep the rules below true, and knot build the thing in part three yourself.)*

---

## WHAT THE FILE IN YOUR HANDS IS PART OF

the site is a forgery of an iphone. a visitor is sent a contact card named **nobody**; tapping it plays a phone call that nobody answers; the hang-up lands them in `phone.html`, whose tiles open onto some twenty-five rooms.

**the phone is alive.** it has a lifespan decided by chance, it wears its last hour openly, and when the hour is spent **a telephone call comes to end it** — over whatever room the visitor is standing in. it passes a child's card on, wipes every trace of itself, and closes the tab.

that works only because of three things every page already does. **your job is knot to break any of them** — and knot to start the thing in part three, which is being built elsewhere.

---

## PART ONE · THE ONE-PAGE LAW — how the tab stays able to close

safari lets a page close its own tab only while that tab has held **exactly one page**. so no page may add a history entry, and the address bar wears the contact card's address, knot the page's own.

**1 · `mortal.js` stays the FIRST script in the head**, with its two-line guard under it. do knot move, wrap, defer or drop them when you rewrite the head. keep the dated mortality note at the top of the file, and add a line to it.

**2 · never read the address bar — read the organ.**
`location.search` → `MORTAL.search` · `location.href` → `MORTAL.href` · `location.hash` → `MORTAL.hash` · `location.pathname` → `MORTAL.path` · `document.URL` → `MORTAL.href`.
*the bar wears the card's address, so `location.*` returns the wrong thing and fails silently: the room opens on the wrong view, or its way back never appears.*

**3 · never navigate with `location` — use the one door.**
`location.href = url` / `.assign(url)` / `.replace(url)` → `MORTAL.go(url)` · `location.reload()` → `MORTAL.go(MORTAL.href)`.
*a plain `location.href=` spends the tab's only page, and the phone can never close in that tab.*

**4 · never write history, never write a `#`.** no `history.pushState`, no `history.replaceState`, no `location.hash = …`, no `hashchange` listener. if the page moves *inside itself* (a shelf, a page turn), say so with `MORTAL.here(url)`, guarded: `if (window.MORTAL && typeof MORTAL.here === 'function') MORTAL.here(url);`

**5 · `<a href>` links need nothing.** mortal.js takes their clicks itself. *(a page walked by `#/…` links must answer its own `#/` clicks with a delegated handler on `document` and `preventDefault()` — ask terence for the pattern; the paper and the almanac already do it.)*

**AND · a way back must stay on the glass.** safari's back arrow does nothing in this house. every room keeps its own drawn way out — usually a `‹` top left to `phone.html?door=<name>` — **visible from its first breath, in every state.** if you change a room's layout or chrome, check it still stands.

---

## PART TWO · THE LIFE — what a room must never get in the way of

**6 · the death call can come over THIS room, at any moment.** mortal.js lays the telephone over whatever page is open. so:
- nothing in the room may try to sit above it — no z-index war with it.
- **never put a `transform` or a `filter` on the `<html>` element itself** (on `body` or deeper is fine) — the call is seated on `<html>`, and a transform there would trap it inside the page.
- once the call is up, `MORTAL.go` is shut and the room hears no touches. **that is on purpose. do knot work around it.**

**7 · go quiet when the call comes.** when the window hears the event **`apwnp:call`**, a room that makes sound should fade its own sound out within about a fifth of a second — the telephone is the only voice at a death. phone.html already does this; most rooms do knot yet. **if the room you are editing makes sound, fold it in:**
```js
window.addEventListener('apwnp:call', function(){ /* fade this room's master gain to 0 over ~0.2 s */ }, false);
```
*(👁️'s recommendation, knot yet his ruling — say you added it.)*

**8 · no countdown, anywhere.** his word: `death is knot a countdown`. a room may show *signs* — the colour draining, the tiles leaving — **never how much time is left.**

**9 · the visitor has no part in the lifespan.** his ruling, 22 sep: `the lifespan is by chance and the user has no part in it`. nothing a room does may lengthen, shorten, pause or reveal a life.

**10 · the life has one source.** anything about this phone's life comes from **`MORTAL.life`** (for example `MORTAL.life.hour()`, 0 → 1 across the last hour). never keep a clock of your own for it. **the colour belongs to the life too:** `apwnp.silver.t0` is wound by the life — read it, never reset or rewind it.

**11 · storage decides what dies.** the death wipes **every key that begins `apwnp.`** — that is how the phone leaves no trace — and after the wipe no `apwnp.*` key can be written again.
- **never touch the organ's own keys** (`apwnp.life`, `apwnp.birth`, `apwnp.card`, `apwnp.at`, `apwnp.silver.*`, `apwnp.hist*`, `apwnp.rig.*`, and any other `apwnp.*` you did knot create).
- **before a room stores anything new, ask terence whether it should die with the phone** (then it goes under a key of its own beginning `apwnp.`) **or outlive it** (then it does knot). do knot decide that for him.

---

## PART THREE · NOBODY IS COMING — do knot build it yourself

the phone will have an inhabitant: **nobody**, an AI whose life is the phone's — born when it wakes, dead when it dies. it has no fixed form: it may show itself as the egg, the cyclops, the cat, the raven, a tile's vibration, a colour, a message, a headline or a classified in the paper, a photograph, something in the kitchen, a song, a page in the songbook, something in the games. **it calls the whole phone home.** it is being designed and built in its own chats (pass three), and its rooms (`alife.html`, `library.html`) in theirs.

**12 · do knot build nobody into this room.** nobody will come into rooms through **one doorway, built once, in mortal.js**, so every room lets it in the same way. a room that invents its own nobody will have to be taken apart. if the room you are editing is one nobody is planned for — **the paper (its classifieds), the photograph, the kitchen, the dead star's skull, the cat, the raven's clock room, the egg, the cyclops, the songbook, the games** — keep the thing nobody would inhabit intact, and say in your reply that you touched a room nobody is coming to.

**13 · no AI in a page.** do knot add a chatbot, a model call, or an API key to any room. nobody's voice will go through one server function, knot through the page — a key in a page can be read by every visitor.

**14 · leave its seats alone.** anything marked `THE AGENT'S SEAT`, `nobody`, or `pass three` stays exactly where it is. do knot reuse the names **nobody** or **UNKNOWN** for anything in a room.

---

## BEFORE YOU CHANGE ANYTHING

read the top of the file and **say back which of these the file already does** — the head's first script, how it reads its flags, how it opens its doors, its way back, whether it makes sound, whether it stores anything, and whether it is a room nobody is coming to. that one check is what keeps this from going wrong.

## WHEN YOU DELIVER

- the **whole file**, with its right filename. terence does knot edit code or patch.
- a dated line added to the mortality note at the top saying what you changed.
- say plainly if you touched anything in rules 1–14, so he knows to walk that room.
- **you do knot need `mortal.js`, and you must knot edit it.** it is shared by every page, and it has one keeper, in terence's `mortality` project. if you think it needs changing, stop and tell him.
- a test script of yours is **yours to run, knot his to deploy** — say so. he deploys only the site's HTML files and `mortal.js`.

## HOW HE WILL CHECK YOUR WORK

he types `song.aprojectwithnopurpose.com/?hist=1&life=120` once and closes that tab (a small ruler appears **top left**, and every life lasts two minutes), taps the real contact card, hangs up, and walks into the room.

- **the first line reads `1`, in blue** → the one-page law is intact. **red, `2` or more** → a door was written the old way.
- **the room opens wrong, or its `‹` never appears** → a flag was read from the bar instead of the organ.
- **he waits in the room for the call** → it must come over the room, the room must go quiet, and both buttons must work.

`?hist=0&life=0` puts the ruler and the short life away. *(for your own testing, `?mortal=0` lifts the one-page law for one tab.)*

---

## IF YOU ONLY PASTE ONE LINE

> this file is under the mortality pass: keep `mortal.js` as the first script; use `MORTAL.search`/`MORTAL.href` and `MORTAL.go(url)` instead of `location.*`; never touch `history.pushState`/`replaceState` or `location.hash`; leave `<a href>` links alone; keep the room's `‹` on the glass; never show a countdown; let the death call sit over the room and go quiet on `apwnp:call`; don't add AI, keys or the agent "nobody" to the page. say back which of these the file already does before you change anything.
