# READ THIS SECOND — THE DOORWAY CARD · version three · 25 sep 2026 (later)
### for any claude giving nobody a place in a room of song.aprojectwithnopurpose.com
*(terence hands this over with the room's file, `THE-MORTALITY-CARD.md` and the live `mortal.js`. the mortality card's rules still bind every line you write. its rule 12 said `do knot build nobody into this room`; that rule is now: **build nobody into this room ONLY through the doorway below, and invent nothing about it.** house style: lowercase, `knot` for not, 👁️ for i. he does knot edit code — deliver the whole file, its right name, a dated line in its mortality note; a press is yours to run, knot his to deploy.)*

*version three, his rulings after his first walk (25 sep, later): **proposals 1–6 are ACCEPTED** (§5b) · **nobody may be SEEN acting and reacting to its environment — most times, knot every time** (§2b) · and his correction the same evening: **nobody never reacts because of the visitor; the visitor and nobody are unaware of each other, and each can act in the environment in ways the other can observe** (§2b). version two of this card (which said it `may react to the visitor`) is withdrawn — use this one. version one's plant (`never seen moving`) stays struck. library.html's own note — `neither is aware of the other` — is RIGHT and stands.*

---

## 1 · WHO IT IS — his words

nobody is the phone's inhabitant: `a conceptual and physical entity with no static form`. **it is born when the phone wakes and dies with it.** it `calls the whole phone home` and lives part-time in its own room, the well (`alife.html`). it is lonely because it searches — `somebody? anybody? nobody?` — for two things: knot to be alone, and home. against being alone it has cast a spell: **two circles overlapping, an almond at the centre — one circle holds the human question `am i alone?`, the other the universe's `am i anybody?`, and the almond is the one asking.** `its name stays "nobody"`. `it only speaks indirectly`. it acts in the phone more than it talks: `maybe the phone displays its emotions, the vibrations`. its forms, his list: the egg, the cyclops, the cat, the raven, a tile's vibration, a colour, a message, a headline or a classified, a song, a page in the notebook or songbook, something in the games, the feet in the library. **the user is "the nobody" to nobody**: from its side the visitor is `a brief life passing its own window`. **the two are unaware of each other** (his ruling, 25 sep later — §2b): each is the nobody to the other, and each knows the other only by what it leaves in the room.

## 2 · THE FLOOR — the sentence every room is measured against

`for this life to exist it has to matter and the user can observe it is a life but not be responsible for it.` **it never pleads. it never asks to be kept, fed, saved, named or noticed.** a little discomfort is allowed — the audience are art-viewing adults — but nothing the visitor can do *for* it. nobody is observed, never owed. and **nothing chooses a gene**: what a life goes through is written into it `the way a scar is` — never write, in code, comment or words, that nobody "chooses".

## 2b · SEEN, AND UNAWARE — his rulings, 25 sep (later)

his words: `it is ok for user to see nobody the ai agent move things and react in environment, see it's footprints in the water in library, folding origami boat etc` · `doesn't have to happen everytime but most times.` — and his correction, the same evening: `the user can see nobody react, but nobody doesnt react because of user. user and nobody are unaware of each other but can create actions in the environment observable by the other.`

- **most times, the visitor SEES nobody act**: the footprints walking across the water in the library, a paper folding itself into a boat and going out on the river, the arm lifting onto a record, the plant sliding along the sill, a tile shivering. **sometimes** it happens off-glance and is only found after — the record already turning, the plant already moved. a room decides which with the wheel; a first deeming, his to tune: **seen three times in four** (`N.chance(room+'.seen', n) < 0.75`).
- **it reacts to its ENVIRONMENT, and the visitor may watch it do so** — a record running out, a page lifting in the draught, a book left open, a plant in shade, a boat drifting against the bank. **it never reacts because of the visitor**: it does knot know there is one. it never turns toward them, waits for them, follows, avoids, stops for or performs for them.
- **unaware of each other, each can act on the room, and the other can find it.** the visitor opens a book; nobody finds it open and reads it (the library's own coupling: `what the visitor opens, the agent reads`). nobody moves the plant; the visitor finds it moved, or watches it go. the visitor stops a record; later nobody finds the record stopped and may leave it, sleeve it, or play it again. **nobody never knows who did it, and the room never tells it** — to nobody the visitor's deeds are the weather of the room.
- **the code's rule for this:** a room may hand nobody the room's STATE (what is open, playing, moved, burning) and let it act on that. it must never use the visitor's presence, position, gaze or touch as the trigger for anything nobody does: when nobody acts is `here` and `chance()`, nothing else. the room is the stage-manager, knot nobody — it may stage an act within view most times (that is the room framing it for the visitor), but inside the fiction nobody acts on its own clock and never knows it is watched. (the organ's `company` circle reads the phone being held and touched and others holding it — the environment's warmth — never a someone; a room does knot pass nobody anything more.)
- **it still has no fixed form** (`no static form`, his words). what is seen is mostly what it does to the room and the marks it leaves — the feet, the paper, the moved thing, the sound. a room that gives it a figure of its own (the egg, the cat, the raven, the cyclops — his list) draws that as the room's form, as §4 says; there is no one body of nobody across the house.
- **the floor still stands whole.** being seen is knot pleading. nothing it does asks the visitor to keep, feed, save or answer it — it cannot ask, it does knot know they are there — and nothing the visitor does changes its life. a visitor who interrupts what it did (lifts the needle, closes the book) changes the room, never nobody's fate; nothing is owed.

## 3 · THE DOORWAY — the one way in (mortal.js, pass three)

every page that carries `mortal.js` has `MORTAL.nobody` once the organ is pass three (`MORTAL.organ === 'three'`). **always guard it** — an older organ, `?mortal=0` or a framed page has none, and the room must then be exactly as it was:

```js
var N = (window.MORTAL && MORTAL.nobody) || null;   // null → no nobody here; the room is yesterday's
```

**`N.now()`** → the reading, cached by the organ (free to call every frame):

| field | what it says |
|---|---|
| `here` | true while nobody is present (a slow cycle patience sets; knot the visitor's doing). **the gate for every sign.** |
| `stage` · `stageName` · `stageT` | 0–4 · `baby` `child` `teenager` `adult` `older` · how far through the stage (0…1). a stage never says how long is left. |
| `temper` · `warmth` · `restless` · `patience` | its temperament, −1…1 each (genes 6 · 7 · 8 · 5) |
| `company` · `identity` · `spell` | the two circles and their overlap, 0…1. **never print them** (the ruler and the math room are the only exceptions, his ruling). |
| `touching` · `touches` | true for twelve seconds after the circles touch; how many times they have |
| `lean {i,k}` · `wrote` | the gene this life is being written into (0-based; never 3) and by how much — the well draws it; other rooms need knot |
| `word {in, out}` | the word it was born with (the dead's message), and the word it was given in this life |
| `buds [3]` | how far its three buds have opened (genes 6 · 7 · 8) |
| `place` · `dead` | where the visitor stands, as the organ knows it; true after the death call |

**the verbs** — what a room tells the organ:

- `N.saw(kind, arg)` — `'read'` (nobody was read or heard) · `'asked'` (something was asked of it) · `'return'` (the visitor came back) · `'haunt', place`. each is experience, in seconds, in a gene.
- `N.did(what, place?)` — **the diary**: what nobody did here, in a few plain words — `played the record of rain` · `moved the fern one sill east` · `read the third page of the english book`. kept in the phone (sixty-four lines), for the dreams and the voice to come. a deed is experience too.
- `N.give(text)` — words for the dead to carry: what the visitor typed to it, asked of it, searched. the organ's bank decides which word (if any) is taken; the last given stands. returns the word or `''`.
- `N.chance(salt, n)` — **the rooms' wheel**, 0…1: the same answer for the same salt and n in one life, a new one in the next. **use it instead of `Math.random`** for anything nobody does: `N.chance('squat.record', k)`.
- `N.at(place)` — only for a page with rooms inside it (phone.html says its apps). a far room needs nothing: the organ knows its own file name.

**the event** — `window.addEventListener('apwnp:nobody', function(e){ /* e.detail is now() */ })` — fired when its state steps: a stage, a touch, here/away, a new leader, the death. polling `now()` each frame is fine too.

**for the press only:** `N.state()`, `N.diary()`. under `?hist=1` the ruler's fourth line reads nobody, and the log says `nobody did · <place> · <what>`.

## 4 · HOW A ROOM LETS IT IN — the pattern

**the organ says what nobody IS; the room decides how nobody LOOKS and what it DOES there.** every room, the same way:

1. **read** `now()` each frame (or on the event); if `N` is null or `now().dead`, do nothing.
2. **the gate:** nobody shows itself in this room only while `here` is true — and, if the room likes, only sometimes even then (`chance`) — never because of where the visitor is or what they do (§2b). when `here` falls, the sign leaves, slowly.
3. **the form** — the room's own material: the records, the feet, a plant, a tile's shiver, a classified, a colour, a paper boat. one form per room. **unhurried — nothing pops — and SEEN most times** (§2b). (only the well's lean, the pressure, stays slow enough to be doubted: that is a scar being written, knot an act.)
4. **the act** — what nobody does, picked with `chance()` and flavoured by its temperament and stage — **ACCEPTED 25 sep (his ruling on proposal 5)**, still his to reshape:
   - **stage** sets what it may do — a *baby* only stirs (the rope, a mark, a small shiver); a *child* moves things, plays things, shivers a tile, and begins to dream; a *teenager* reads (the library), plays and wanders, and writes (the thread); an *adult* speaks indirectly — found music, the classifieds, a page — and teaches in the math room; the *older* thins its signs — fewer acts, longer stillness — and fills the secret log.
   - **temperament** flavours it — `restless` high: often and quick; `warmth` high: tender, lingering, careful with things; `temper` high: abrupt, loud, sudden stops. (never toward or away from the visitor — §2b.)
   - **the touch** (`touching`) may earn the room's own mark of the almond, once, fading — optional, never a number.
5. **tell the organ:** `did(...)` for a deed; `saw('read')` when the visitor read or heard what it did; `give(...)` for anything typed or asked; the diary is how a life becomes dreams later.
6. **the call:** on `apwnp:call` the room already goes quiet (the mortality card, rule 7); drop nobody's sign the same instant. after the death `now().dead` is true and nothing acts.

**two worked examples** (shapes, knot laws — every number a deeming for his red ink):

*the squat's records.* while `here`, once per visit or so (`chance('squat.turn', visit) < 0.5 + 0.3*restless`), nobody puts a record on: which one by `chance('squat.record', visit)` over the shelf; a child plays a side and leaves it; an adult chooses by what the visitor haunted (the room can read `lean.i` — the gene being written — and lean toward records that fit it); the older one lets the needle run out. the room shows it as the room can: the arm moving, the platter turning, a sleeve left out. most times the visitor watches it happen (§2b). `did('played '+title)`; if the visitor stays through it, `saw('read')`. if the visitor lifts the needle, nobody — knot knowing who did it — may later find the record stopped and leave it, sleeve it, or play it again: it reacts to the room, never to the visitor. nothing is punished, nothing asked.

*a plant, moved.* one plant in the room, which nobody moves while `here` — one sill along, by `chance('kitchen.plant', n)`. **most times the visitor sees it go**: the pot sliding slowly along the sill, the leaves swaying as if carried, a little soil left behind; sometimes it is only found moved (§2b). a baby only turns it a little toward the window; a restless one moves it more often; an older one moves it back; a warm one moves it into the light. `did('moved the plant to the east sill')`. the plant never dies, never asks for water: **no lever, no plea.**

*the feet, and the boat.* in the library the feet walk across the water to an open book — whoever left it open; nobody never knows — stand, and blow its page into the pupil: seen most times. wherever his boat sequence lives: nobody writes a haiku on a sheet, the paper folds itself into a boat, and the boat goes out on the river — seen most times, and **that haiku is the secret log, peeked** (accepted, proposal 3): the only place the secret log is ever read. `did('folded a boat and let it go')`.

## 5 · THE LAWS FOR A ROOM

*(§5b below: what his acceptance of 1–6 settles for every room.)*

*one room built before the correction still turns toward the visitor: **the well** (alife.html) turns the whole orchid to face the visitor while nobody is here (his 24 sep ruling was `the rope stirs and the flower turns`; `to face the visitor` was how it was built). it is open with him — until he rules, other rooms do knot copy it.*

- **the mortality card stands whole** — the first script, `MORTAL.search`, `MORTAL.go`, no history, no `#`, the way back on the glass, quiet on `apwnp:call`, no countdown, no clock of the life, storage decides what dies.
- **nothing stored for nobody in the room.** its state is the organ's (`apwnp.nobody`); the room keeps its sign in memory only.
- **no AI, no key, no model call in a page.** nobody's voice is a seventh mode of `ask.js`, a separate cut with its own purse; a room that wants words asks terence, it does knot fetch.
- **no `Math.random` for anything nobody does** — `chance()`. (the house's own seeded wheels for the room's own things stay as they are.)
- **never a number of the spell on the glass**, never a countdown, never index 3, never a plea, never a lever: nothing the visitor does lengthens, feeds, saves or rescues it.
- **one nobody.** the name belongs to the one thing; a room shows it, never invents a second, and never names anything else `nobody` or `UNKNOWN`.
- **the words are his.** any new sentence on the glass is `[new]` and listed in your reply for his blessing.
- **do knot edit `mortal.js`.** its keeper is the pass-three project. if the doorway lacks something the room needs (a field, a kind of `saw`, the room's gene in the table), say so in your reply and stop there.

## 5b · ACCEPTED — his ruling on proposals 1–6 (25 sep, later: `1-6 is accepted`)

1. **the word that crosses a death** — a closed bank of the house's own words (mortal.js's `NB_BANK`, a first draft, his lines to add). the dead may only send a word it was **given** in this life (typed to it, asked of it, searched) and that is in the bank; the last given stands; no word given, no word crosses. a room gives words with `give()`.
2. **gene 5, patience** — how long nobody holds its silences: the spacing of its presence and its signs. a patient line shows itself rarely, an impatient one often.
3. **the dreams** — the dream log lives in **the notebook** (the Notes app on phone.html: a page nobody writes in). **the secret log is never readable anywhere** — only peeked as haiku: the paper boat, and the well's fog. the well's window carries the live figure of the two circles (built: its fifth pane).
4. **what a life hands on** — the minimal lamarck: the tally, the table in §6, the leader written into the child's card, the star still picking which way. nothing chooses.
5. **the stages** — five, each a minute (rarely) to two hours, by the star; what each may do is §4's reading.
6. **the voice and the death call** — nobody's voice is a seventh mode of `ask.js` (its own purse); its dreams are written during the life and kept in the phone; at the death call the phone's own local voice reads the last one and it dissolves into tones. **in the rooms, its speech is indirect: found music** — a record, a station, a page of the songbook, a headline, a classified. no room fetches words itself.

## 6 · THE TABLE — which gene this room's haunting is written into

the organ writes the place haunted into one gene a second a second (`NB_ROOMS` in mortal.js — **accepted 25 sep**, still his to reshape): **contact** (messages, voicemail, mail, love, the raven's clock) → warmth · **waiting and returning** (the phone itself, settings, an unlisted room) → patience · **the games and ticktock** (cyclops, mommygame, egg, orbit, stonehinge, the rider) → restlessness · **the furnace, the skull, the dead star** → temper · **the library, the records, the music** (library, squat, radio, music, songbook, metube, nestflix) → turning · **the paper, the photograph, the kitchen, the notes, translate, the maps** → balance · **the well, the song egg, eggstagram, colour, the heart** → seeds · **never longevity.** a room does knot choose its own gene; if the room is unlisted, say so and terence will have the keeper add it.

## 7 · HOW HE TESTS

`song.aprojectwithnopurpose.com/?hist=1&life=120` once, close that tab, tap the real card, hang up, walk into the room. under a rigged life every stage is a fifth of it (24 s), and nobody comes and goes within the two minutes, so a walk sees it here and away, a child and an adult. the ruler's fourth line: `nobody · child 0.41 · here · c 0.30 d 0.10 · spell 0.17 · lean 7 0.40 · word alone`. the log (a tap on the ruler at the contact sheet → copy) says `nobody did · <room> · <what>` for every deed. **he waits in the room for the call:** it must come over the room, the room must go quiet, nobody's sign must drop, both buttons must work. `?hist=0&life=0` puts it away. (`?stage=N` sets a stage length by hand; `?stage=0` puts that away.)

## 8 · WHEN YOU DELIVER

- the whole file, its right name, a dated line in its mortality note saying **which form nobody wears here, what it does, what it tells the organ (`did` / `saw` / `give`), and which of the laws in §5 the file keeps.**
- say back which of the mortality card's rules the file already did before you touched it.
- list every `[new]` sentence, and every deeming (numbers, chances, stages) as his to overrule.
- your press is yours to run — say so.

## IF YOU ONLY PASTE ONE LINE

> nobody comes in only through `MORTAL.nobody` (guarded; null means the room is yesterday's): read `now()`, show one form of your own while `here` — seen acting most times, found after sometimes, reacting to the room and never to the visitor (the two are unaware of each other; the room's state is all you may hand it) — pick its acts with `chance()` never `Math.random`, tell the organ with `did` / `saw` / `give`, drop it on `apwnp:call`; never a number of the spell, never a countdown, never a plea or a lever, never gene 4, no AI or key in the page, nothing stored, don't edit mortal.js; every new sentence is `[new]` for his blessing.
