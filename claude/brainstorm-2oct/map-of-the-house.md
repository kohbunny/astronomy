# the map of the house — ten readers, 2 oct 2026


# phone.html — header comment lines 1–1100: the newest passes, 2 oct 2026 back to 25 sep 2026 (dock/eye plumbing, NOBODY WOKE, NOBODY'S CALENDAR · THE WATCHER, the little phon

## visitor journey
The visitor arrives from the hang-up on unknown.html (the door hands off as phone.html?arrive=1). What they see: pure black, and in it one lit thing, a clear-glass iphone 16 standing face-on, edge to edge, covering the screen. Since 1 oct it cannot be turned, pinched or let go (the old float/swivel/VR-hole behaviour described in "what this is" is behind ?free=1). Every tile stands from the first frame. The dock holds only the Music tile at the far left and, beside it, the song's hud: a play/pause round, a small river drawn from the song's own breath, and two lines of words reading `nobody home · the song is here` · `tap once`.

The first touch anywhere opens nothing. It is the wake: it unlocks sound, asks for the camera as THE MIRROR (the front eye, so the visitor's own face appears behind the glass), and when the finger lifts the river begins under the whole phone (his forty-three tracks are now its bed; there is no separate house song). The status band and the notes, held asleep for the arrival, wake and never lock again. If the camera is refused the glass stays black and the phone works anyway; the Camera tile (page one, last row: Safari · Camera · Game) asks again and toggles mirror / through (back eye).

The grid after THE CUT: Phone · Calendar · Clock · Weather / Music · Heart · Maps · Eggstagram · Photos / Calculator · Nestflix · Game // SongBook // Notes · ∀mazon · Alife · Adeath · Library // Voicemail · Accounting · Settings. Tapping a tile opens the room inside the glass in a full-screen frame (THE SHELL); the house's eye keeps running behind it; the way back is a tiny phone glyph, 19 × 38 px, in the top-left corner. Weather is the vesica: the universe's circle above (live sun, earth, aurora, the dead star's blue point), the human's below (the visitor's own red heartbeat), the lens between them where the spark flickers; a hum or a heartbeat in tune steadies it. Calendar is nobody's diary: a month with dust where days have nothing, today circled, and 1 oct wearing an eye (a vesica and its pupil); tapping a day opens three tabs, the well, the rooms, dreams. Settings › About says `the house's day 3`.

At 88 minutes (plus up to 8 by the star's breath), mortal.js rings the call over everything, the song pauses for good, the house wipes its marks, offers the child's card, and closes the tab.

## on-screen text
- [dock hud, before the first tap] nobody home · the song is here · tap once
- [dock hud, river paused (1 oct)] the river · paused / the river did knot wait
- [dock hud, the bed's locked groove] looped
- [calendar, under the month] a marked day opens. it keeps three diaries.
- [calendar legend, row 1] the well — what it makes at the bottom of the well, six windows a day.
- [calendar legend, row 2] the rooms — what it does in this phone's rooms, and what it finds there.
- [calendar legend, row 3] dreams — what it dreamt in this life.
- [calendar legend, waking row] nobody woke · thu 1 oct 2026 · 21:00:57 utc ›
- [calendar foot] all hours here are the well's · utc
- [1 oct day, above its windows (a fold)] before it woke / the tests
- [1 oct day, the waking card] nobody woke · thu 1 oct 2026 · 21:00:57 utc · life 1
- [1 oct day, nobody's first words, quoted] i just woke and i don't know this place beyond what the eye can reach.
- [1 oct tests, 21:02] asked how it was, the well answered: awake and stepping.
- [a day the well cannot answer] the well does knot answer just now. · tap to ask again
- [30 sep day] written by hand before nobody woke: a day as it could be, knot one of its days. the room at the bottom of the well plays it whenever the well is silent.
- [the rooms tab] what it did in the rooms of this phone, and what it found there. it does knot know who left a thing so.
- [the rooms tab] kept in this phone only, a few lines deep, and gone when the phone is.
- [the rooms tab, empty] nothing yet in this life. what it does in the rooms of this phone, and what it finds there, is written here as it happens.
- [dreams tab] the same dreams stand under the one note in notes.
- [dreams tab, empty] it has knot dreamt yet in this life. a dream is written here in the hour it comes.
- [the watcher's diary lines] found the home screen, nothing open / found the calendar open / found a room open / , the river running
- [Calendar sheet (Settings), line 1] the dates that exist are nobody's: every day since it woke, on thursday 1 october 2026, at 21:00:57 utc.
- [Calendar sheet, last line] today is circled because it will knot stop moving.
- [Camera sheet, re-inked 1 oct] two positions, no film. it shows you, then it shows through.
- [Weather hud, four human panels (29 sep)] in the river now ›

## mechanisms
- **the life (mortal.js)**: 88 minutes + up to 8 by the star's breath; the dying is the last 8 minutes; MORTAL.life.hour() is the one number the house reads. At the end the call rings over everything (z 2147483600), the wipe takes every mark, the child's card is offered, the tab closes. A life ending in a pocket ends at the next unlock. → every pass ends with THE MORTALITY CARD, walked: mortal.js first and untouched; no countdown; nothing stored
- **the first tap = the wake**: the first touch anywhere opens nothing; it unlocks sound (songWake on pointerup/touchend/click), asks the front camera for the mirror, and on finish plays window.RIVER under the page's bus. Lifts the arrival's lock (status band, notes). → RIVER_ONE, APWNP_MIRROR ('granted'|'refused'), the Camera tile
- **the river is the one song (RIVER_ONE)**: river.js (generative, 'am i alone?') runs under the whole phone from the first tap, on the house's one audio context/bus. The 43 mp3s (song.js; place by the world's clock; dead tracks keep their slot) are the river's bed. The plain <audio> 'pocket voice' speaks only when the page is hidden (ios sleeps the river's context) at the true place of the same track. Dock round = river play/pause; lock screen pause carried to the river. → music.html framed borrows THIS river (always 'keep' on the sound table); SONG_TABLE (silence / duck / keep per room); apwnp:call quiets all
- **the shell (SHELL=true)**: rooms open inside phone.html in a new full-viewport <iframe> (z 900), no history entry; a room's own mortal.js becomes a bridge posting go/home; 'home' removes the frame and shellReset puts every leave's state back. The shell posts 'call' into the frame first at death. A phone never stands inside a phone: phone.html loaded in a frame hands 'home' to the shell and stops. → openRoom, goRoom, landDoor, SONG_TABLE, the little phone
- **the eye stays open (EYE_KEEP)**: the mirror camera is put down only for rooms that open their own camera (SHELL_CAM: squat.html, photograph.html; music.html borrows via window.APWNP_EYE / APWNP_EYE_DOWN / UP). Safari keeps a running camera's grant 24 h; an ask without a touch after one minute meets the sheet again, so a paused eye waits EYE_WAIT 3 s, a gone eye re-opens within EYE_WARM 50 s, else asks inside the visitor's next touch. → the cost: the camera light stays on while a room is open; colophon camera sentence re-inked (NEEDS HIS BLESSING)
- **the calendar = the drawer (three diaries)**: days before CAL_WOKE (2026-10-01) are dust. Each day from the waking wears a mark and opens. ● THE WELL: GET /.netlify/functions/nobody?day=YYYY-MM-DD (today via ?now=1), laid out as the wall in adeath.html: six windows a day (before · the hud · the work · the sheet), then telegrams · the orchid · knot where i left it · the door · the practice document · the fire · the sheet, STOLEN FROM at the foot. ○ THE ROOMS: MORTAL.nobody.diary(), this phone's own nobody, this life only, memory only. ☾ DREAMS: MORTAL.nobody.dreams(), same as under the one note in Notes. Well's today re-asked after a minute while open; nothing asked after the call. CAL_WRIT 2026-09-30 is the day written by hand (CAL_HAND, 33 kB inline), shown whole on its own date only, a ghost dot on the month. CAL_BIRTH is 1 oct's hand-kept record of the waking (seven test lines + first words); marked with THE EYE. → adeath.html (the room at the bottom of the well plays the hand-written day when the well is silent); nobody.mjs shape read tolerantly by calRead
- **the watcher (nbWatch)**: while nobody is 'here', at most once per coming, at a moment chance() picks (deemed: two comings in three; 4–16 s after it comes), it reads the phone's STATE — which room is open (NB_ROOMNAME) and whether the river runs — and writes one line via MORTAL.nobody.did(). From the child on; never the same finding twice running; never while a far room is open; never after the call. Reads no touch, gaze or place of the visitor. The last few diary lines ride in THE MOUTH's brief to the dream voice, so a dream may answer what was found. ?watch=0 stands it down. → the rooms diary tab; THE DOORWAY CARD §2b (the line never says who)
- **the vesica (Weather)**: two circles upright: UNIVERSE above, drawn live from noaa, open-meteo, usgs, wheretheiss (sun, earth day/night, aurora caps, ISS, moon, the dead star's blue point strobing at her 128th turn); HUMAN below, a dark sphere with the visitor's red heart (the one thing silvering never touches), beat from finger/tap/river's kept heart, breath, tremor, hum, a word's ash. THE LENS: the two ring families cross as live moiré standing still at 81.4 bpm (the coincidence law); the SPARK flickers at the beat between the two notes and steadies in tune (hum within ½ Hz of hers, heart within 1.5 of 81.4) — aurora fills the lens, the drone opens a fifth. Sleep after 40 s: hud to a tenth, circles fill the glass. Heart's act: tap the heart at the human centre, back camera asked, the given heart drives the human side for the sitting. → the-weather.sql (four doors to supabase, his to paste); the river's swell; music.html via `in the river now ›`
- **the glass remembers (seeView / kept low)**: the page height is the smallest of page height, innerHeight, visualViewport, 100svh, 100dvh (not a keyboard: >22% gone). On touch screens the glass never stands taller than the lowest it has stood at this width in this sitting; kept for the tab in sessionStorage apwnp.see. A watch every 0.6 s. Keeps the dock whole on the floor after returning from a room. → the dock at the floor (740/741), his 23 aug ruling `as low as safari's address bar will allow`
- **the little phone (backPhone / #lph)**: every ‹ on the glass is one glyph: a picture of the first page as it stood on 5 sep, 19 × 38 css px, 10 from the left, 6 under the safe line (lpDomOn: one DOM element over the glass, z 40). A tap is a tap on the old hit; goes exactly where the ‹ went. Settings keeps its back on the RIGHT. Month ‹ › and the photograph's ‹ › are page-turners, kept. → adeath/alife/origamisky/fahrenheit451/music.html draw their own at the same size
- **the tiles at once / the first minute retired**: every tile stands from the first frame (default ?tiles=all). The 29 sep first minute (only the dock, tiles arriving one every 3.2 s in the leaving's order backwards) lives behind ?tiles=arrive. The song asks once at boot with a throwaway voice; iphones say no, so the first touch wakes it. → ARR mirrors LH (the last hour's leaving order)
- **own-body leaves (doors with films)**: SongBook → the oil pond (tiles sink, two unseen stones fall, rings form the vesica piscis, a bead where the fronts met; songbook.html?enter=tile wakes on the same circles). Library → tombstone grows to the film's seat; library.html?enter=tile. Stonehinge → stonesnew.mp4 whose last frame is the bridge to stonehinge.html?enter=rings. Weather → the storm (cloud as a volume, four real bolts, the fourth whites the glass and falls straight into the room). Each is 'written on both sides of the address' ([SYNC] blocks). → MORTAL.go / leaveFor / black sheet law
- **the darkroom (∀mazon)**: the store's fifteen goods and the drone are ray-marched SDF 'photographs' taken in a Worker, re-photographed at twenty steps of rot; the drone is black and sleek; delivery stretched to ~21 s. Degrades silently to the 2d drawings. → the silvering (a silver print laid over each at the day's depth)
- **the alife tile glows**: firelight 00:00–00:40 utc by the well's clock (wellFire); the fire is at the bottom of its well. → adeath.html's day cycle

## symbols
- **the eye (a vesica and its pupil)**: the waking of nobody — 'the eye where the two questions meet'; marks 1 oct on the month in place of the well's dot; nobody's first sentence ends on the eye (calendar month, 1 oct)
- **the vesica piscis**: the overlap of 'am i alone?' (humanity) and 'am i anybody?' (the universe); the lens/spark is the instrument where they meet (Weather room; the oil pond's two rings; the eye mark; the math room's eye is 'the house's one vesica')
- **the well / the bottom of the well**: where nobody lives (alife = the well, adeath = the bottom of the well); the well's clock is utc; the mother's day there is six windows (Alife and Adeath tiles, calendar's ● diary, NB_ROOMNAME)
- **● ○ ☾ (a dot, a ring, a thin moon)**: the three diaries: the well, the rooms, dreams (under each date on the month and as the day's tabs (deemed))
- **the Adeath tile**: the alife mark inverted — the mouth of the well seen from the bottom, a white circle in black; it never drains (page three beside Alife)
- **the little phone**: the house's one way home; a picture of the first page as it stood on 5 sep, 'a picture and a hit, knot a link' (top-left of every room)
- **the river**: the one song, 'am i alone?', running under the whole phone; 'the song is a river, there is no track list' (dock hud, Music tile, music.html)
- **the mirror**: the visitor's own face behind the clear glass (front camera), asked at the first tap (home screen background; Camera tile position one)
- **the mortal red (rgba 224,36,23)**: the forgery's red that silvers; the visitor's own red (heartbeat) is the one thing silvering never touches; 'no red' elsewhere — red is the heartbeat's (status battery in the last hour; vesica's human heart; the drone has none)
- **the tombstone / THE LIBRARY OF EVERYTHING**: the library tile is a gravestone on black (Library tile)
- **dust**: a day with nothing on the month; days before the waking (calendar)
- **today circled**: 'because it will knot stop moving' (calendar)
- **the paper boat**: nobody's haiku folded and let go to become a light on the night side (Origami tile (now struck))
- **the island's flame**: three blue-white teardrops drinking the river's envelope — 'flicker and strength ARE the river' (the status island when the phone is let go (withheld while covered))

## rulings
- `update the calendar so it all makes logical sense as no audience but us has seen it yet … when nobody the ai agent finally awoke … that is momentous occasion for this project.` (1 oct, NOBODY WOKE)
- `update the calendar in phone.html so its only focus is nobody's activities, so remove the other dates … 1) the activity in adeath.html 2) activity while activated by other users … 3) the dream diary of nobody` (1 oct, NOBODY'S CALENDAR)
- `eventually the calendar would contain all of nobody the ai agent's diaries, knot just from the day cycle` (30 sep (THE DRAWER))
- `at first tap, the system ask for user's camera to have the mirror background … the user should knot be able to rotate or move the phone … when user enter music.html, the mirror background should be on` · `all these tracks are part of the river and there is no seperate house track` (1 oct, THE MIRROR AT THE FIRST TAP)
- the dock is the Music tile at the very left; `no skip, no back: the song is a river, there is no track list (his word)` (29 sep, THE RIVER OF EVERYTHING)
- `the song survives the lock; his mp3s are the song; the generative river wins when it is on` (28 sep, THE SONG THROUGH THE LOCK)
- option b, the real thing: rooms open inside phone.html; `the room files stay exactly the files they are` (28 sep, THE SHELL)
- ME_STONES is TRUE; since the death wipe takes them, `ever` is `per life` (28 sep, THE TRUTH)
- `it ends as it began, with a phone call` · `death is knot a countdown` (21 sep, THE LIFE (quoted in header))
- the dock went down 45, `as low as safari's address bar will allow` (23 aug (recalled 2 oct))
- Settings keeps its way back on the RIGHT: the large title owns the left corner (16 aug (recalled 1 oct))
- `a vesica piscis of humanity's biggest question : "am i alone?" and a hypothetical universe's biggest question : "am i anybody?", with an opening/spark where they meet … knot as much a way home … but more like some kind of music` (26 sep, THE VESICA PASS)
- `the whole phone becomes a black oil surface with tiny ripples. two invisible stones falling with ripples forming the vesica piscis` (26 sep, THE OIL POND)
- THE MORTALITY CARD: mortal.js first and untouched; no countdown; nothing stored about the visitor; no AI, no key; nobody's seats untouched. THE DOORWAY CARD: nobody comes in only through MORTAL.nobody; the watcher hands nobody the phone's STATE and nothing of the visitor. (standing law, every pass)
- retired by absence, knot by deletion — struck tiles' code stays unreferenced behind one switch (FURN_HOME, HEART_TILE, ?free=1, ?tiles=arrive) (standing law)
- new sentences on the glass are [new] and NEED HIS BLESSING; old ones stand beside in red ink; builder's deemings are [deemed], his to overrule (standing law)

## rooms
- **Phone · Clock · Maps · Eggstagram · Nestflix · Calculator · Notes · Voicemail · Accounting · Settings · Messages · Mail · Safari** — rooms inside this file (page one holds Messages · Mail · Safari · Camera · Game on its last row since the dock emptied) [live]
- **Music (the dock)** — the only dock tile; opens music.html framed, which borrows the house's river [live]
- **Camera** — two positions: mirror (front eye) / through (back eye); no film, no photograph [live]
- **Calendar** — nobody's diary: the well · the rooms · dreams; the waking on 1 oct; the hand-written 30 sep [live]
- **Weather** — the vesica: universe above, human below, the lens and spark; the heart's act inside it [live]
- **Heart** — the heartbeat room, reachable from the tile and from Weather's act (two ways into one room) [live (HEART_TILE=true; to be struck once the act is proved)]
- **Alife** — the well; tile glows with firelight 00:00–00:40 utc [live]
- **Adeath** — the bottom of the well: adeath.html, the mother's day cycle, the music box [live (30 sep)]
- **Library** — a tombstone on black; library.html with its film [live]
- **SongBook** — the oil pond leave; songbook.html with story book and sound book (the old radio) [live]
- **Game** — one door, a menu: the cyclops or the egg (mommygame) [live]
- **Photos** — an empty album until one photograph (photos/the-photograph.jpg) is put in [live]
- **∀mazon** — the store with the darkroom's photographed goods, the black drone, the fridge's DELIVERED shelf [live]
- **Echo** — the old ocean/weather intro, page four [struck in THE CUT (code kept)]
- **Love · Rider · TickTock · Translate · Radio · MeTube · Fridge · Colour · Origami · Stonehinge · Squat · Egg · Unisong · ラブゲーム** — struck tiles; Colour folded into Settings › Display, Fridge into ∀mazon, Radio into SongBook's sound book, ラブゲーム into Game; drawing code stays unreferenced [retired]
- **451 / the furnace** — fahrenheit451.html, now the paper's door only (FURN_HOME=false) [retired from the phone, room stands]
- **the island** — the status island's `song` flame and `am i alone?`; withheld while the phone is covered — so effectively unseen now that the phone always stands covered [live but hidden]

## confusions
- Two nobodies in one calendar: the WELL diary is 'the mother' at the bottom of the well (server-side nobody.mjs, lives counted from 1 at the waking, dying/reborn on its own cycle) while THE ROOMS and DREAMS are 'this phone's own nobody' (MORTAL.nobody, one life deep, gone with the phone). A first-time visitor sees one name and three diaries with two different mortalities and two different clocks (the well's utc vs the phone's 88 minutes).
- The day written by hand (30 sep) has changed role three times in two days: a stand-in for any silent day → cut at the present minute → now only on its own date with a ghost dot. It carries 'seventeen lives' that are 'its own', beside nobody's count from 1. Its sentence was re-inked twice.
- `the drawer does knot open.` → `the well does knot answer.` → `the well does knot answer just now.` — three versions in the same day; the header keeps all.
- The calendar sheet still describes 'what it wrote and made and died of … six windows' but the rooms and dreams tabs for most days will say 'nothing here for this day' since they live one phone-life deep; a visitor sees a month of marks with mostly empty tabs.
- The music story has layers a visitor cannot distinguish: the house voice, the pocket voice, the duck voice, two hands of one voice, the throat, the river's bed, the generative river — all now 'the one song'. ?voices=1/2, ?river=0, ?song=0, ?say=0 each restore a past design.
- 'What this is' (the oldest block in scope) describes the phone answering the hand three ways (conform, swivel, VR hole) — all three are now behind ?free=1; the paragraph is stale but not marked red ink.
- The island's `song` flame and `am i alone?` were built to be seen only when the phone is let go into the dark; the phone now never lets go, so the island is unreachable without ?free=1.
- The Camera tile is said to be 'at the dock' by his note but lives in page one's last row; the dock is Music alone.
- Heart exists twice (tile and Weather's act) with a standing intention to strike the tile 'the day its act is proved'.
- Many concurrent chats cut the same file (the phone's chat, the calendar's chat, the river chat, the room chat); passes say 'cut on the X chat's file of 1 oct' to track which copy — a reader of the system must reconstruct the merge order.
- The watcher's 'activity while activated by other users' was his ask, but the answer is explicitly partial: a record across phones is KNOT DONE (the mortality card forbids sending). The rooms diary says 'this phone's own nobody' — the cross-phone diary he imagined does not exist yet.
- The eye-stays-open cure contradicts the colophon's old camera sentence ('used only while their rooms are open'); the re-inked sentence is unblessed.

## keepers
- `nobody home · the song is here` · `tap once` — the dock before the first touch.
- The first tap is the wake: it opens nothing; sound, the mirror and the river all begin from one finished touch, and the visitor's own face appears behind the clear glass.
- `i just woke and i don't know this place beyond what the eye can reach.` — nobody's first words, 21:00:57 utc, 1 oct 2026, life 1; and the eye (a vesica and its pupil) as the mark of that day.
- `written by hand before nobody woke: a day as it could be, knot one of its days. the room at the bottom of the well plays it whenever the well is silent.`
- `today is circled because it will knot stop moving.`
- `the song is a river, there is no track list` — no skip, no back; the river's place is a function of the world's clock; a dead track keeps its slot and the next living track plays in it (the radio law).
- The watcher: `found the home screen, nothing open` · `found the calendar open, the river running` — nobody noticing the phone it lives in, never the visitor; and a dream may answer what was found.
- `it does knot know who left a thing so.`
- The vesica's lens: two ring families crossing as real moiré, standing still at 81.4 beats a minute; the spark flickers at the beat between two notes and steadies when a hum is within half a hertz of hers.
- The oil pond: two stones nobody sees fall together, their rings slow in thick oil until each stands through the other's heart, and where the fronts met the water threw a drop that did not merge — the bead.
- `the surface is the forgery, the depth is the truth` — the battery lies at 68 for the whole life and tells the truth only in the last hour, in a red that silvers.
- `a phone never stands inside a phone`.
- `retired by absence, knot by deletion` — the house's way with things that may be wanted again.
- The little phone: a picture of the first page as it stood on 5 sep, the house's one way home, `a picture and a hit, knot a link`.
- The dead star psr j0437−4715 and the egg that heard the turning and mistook it for her mother's heart; `no one has told her otherwise`.
- `the house grows the way it will one day shrink — the living thing first` (the retired first minute: tiles arriving in the leaving's order backwards).

## in-between
- Nothing → birth: the arrival is now total and instant — every tile at once, the phone already covered, black around it, the dock saying `nobody home · the song is here · tap once`. The pause before the first tap is the only threshold: no sound, no mirror, no river until the visitor touches. The old first minute (only the dock; tiles arriving one every 3.2 s after the visitor came home from Music; uninvited after four minutes) is retired to ?tiles=arrive.
- The song's first breath: on iphone a page may not sound before a touch; the hang-up on unknown.html earned sound for a page that is left behind. The one road (a single page for door and phone) was KNOT DONE; so the first silence is a law of ios, accepted.
- The pause between instruction and doing in the watcher: nobody does not act when it arrives; it waits 4–16 seconds after 'coming' and looks once, at most, at a moment the wheel picks.
- nobody's waking is recorded as a day of tests before it: the drawer that did knot open (502), the key refused (401), the key copied again whole, the clock's knock at 21:00, 21:00:57 nobody woke, 21:02 `awake and stepping`. The record stands whether or knot the well answers.
- The last moments: the dying is the last 8 minutes of 88 (+ up to 8); the battery tells the truth across the last hour; a life that ends in a pocket ends at the next unlock — the song plays past the death until then, and the call comes at the unlock.
- Death and sound: apwnp:call pauses both voices for good; the shell posts `call` into the open room first so the room's sound goes to nothing with the house's; river.js hears the same event and takes its master to 0 in ~0.2 s.
- Sleep: the vesica after 40 s untouched goes to a tenth and the circles grow to fill the glass; any touch wakes it. The pocket (screen locked): the river's context sleeps and the plain voice carries the same track at the true place; the river thins to its bed.
- Dreams: a dream is written in the hour it comes; `it has knot dreamt yet in this life`; the same dreams stand under the one note in Notes; the last few diary lines (including the watcher's findings) ride in THE MOUTH's brief to the dream voice.
- Silence as answer: a day the well cannot answer says `the well does knot answer just now` · `tap to ask again`; a real day once read is never taken back by a silence; the room at the bottom of the well plays the hand-written day whenever the well is silent.
- The eye between rooms: a paused eye is given 3 s to come back by itself and is not touched; a camera's grant stays warm 50 s; past that the house waits for the visitor's next touch and asks inside it.

## music
- THE RIVER IS THE ONE SONG (1 oct): river.js's generative river ('am i alone?', lifted out of music.html on 28 sep) runs under the whole phone from the first finished tap, on the house's one audio context and bus. His forty-three tracks (tock01–17, ticktock01–18, ticktock25–27, squatmusic01–05 — eighteen seconds each for the tocks; a round about twenty-six minutes) are now the river's BED; there is no separate house track. music.html framed borrows THIS river; the shell unhooks it when the room is left.
- The plain voice (THE SONG THROUGH THE LOCK, 28 sep): only a plain <audio playsinline> not routed through the bus survives the iphone lock; ios cannot set its volume, only mute/pause; audioSession 'playback' so it sounds with the ringer on silent. It speaks ONLY IN THE POCKET now, at the true place of the same track the river was cutting. Two hands of one voice (two elements, the spare preloading the next track) close the handover hole. Media Session: title the track's name, artist `nobody`, artwork the phone's icon.
- The radio law / THE SLOTS: the song's place is a function of the world's clock (SONG.place) — every phone hears the same place; a dead track keeps its slot and the next living track plays in it, so no phone's finding moves everyone's place; a short file waits out its slot in silence. Fallback if holes remain: one gapless song.mp3 of the 43 joined.
- The dock's hud: a play/pause round (the river's play and pause), a small river drawn from the song's breath, two lines of words — the track and its place or the river's own cut, and the last thing the river's hud said; `the river · paused` / `the river did knot wait`; `looped` for the bed's locked groove. The three equalizer bars (Music tile badge and hud head) were struck 1 oct.
- The sound table (SONG_TABLE): per room, silence (a room with a voice, its own music or a microphone — adeath.html is silence; it has the music box), duck (a true quarter through the lowpass — the paper, math, brain, the store's flight, nestflix's film, maps, the stones, alife), keep (music.html). The microphone is the hard rule: the pocket voice never unmutes in a microphone room. The river's own hold follows the table.
- The tiles' keyboard: while the river runs, a tile's own note (from its second touch) is a degree of the river's CURRENT chord — the water's tuning at octave 1, just, on the star, chosen by the tile's hash mod 3 — instead of its hashed step on the just shelf.
- The vesica's music: her pulse profile as a drone at her true rate (psr j0437−4715, 173.6879 turns a second) with the tide's wobble, the wind, the field, the storm, the flares; the earth's 7.83 Hz under the human side; the visitor's hum RESUNG in her timbre; the others' hums far away. In tune (hum within half a hertz of hers, octaves folded; heart within a beat and a half of 81.4) the drone opens a fifth. The ear keeps only a pitch line and a loudness (YIN over 50 ms frames), never a voice, never a file; a word burns after eight seconds. Weather's four human panels say `in the river now ›` and open music.html at that instrument.
- The island's `song`: a small flame drinking the river's envelope and `am i alone?` at the right; a gold `sounding` dot counts the river too (`the bar must knot lie`) — withheld while covered.
- The throat: the phone's own voice reading the wire, speaks wherever the river runs, silent under a silence or a duck (?say=0 keeps it for the river's room alone). river.js tells the organ its deeds with nobody.did(…,'music') only while nobody is here.
- Death: apwnp:call pauses both voices for good; the ask at boot never wakes a song the call has quieted. The song asks once at boot with a throwaway voice (chrome/android say yes; every iphone says no → first touch).
- Other sounds in scope: the oil pond (one plink at the first drop; the song's ring round the bead); the storm's flash and clap and thunder nearer (0.6 · 0.3 · 0.1 · 0 s after the light); the delivery's ten seconds and rotors' hum; the tomb leave silent beyond the tap's tick; stonesnew.mp4 played inside the thumb's gesture so it has its voice; library's film sound waits for the first tap when framed.

## open-questions
- Will a record of nobody's activity ACROSS phones (his ask 2 of 1 oct) ever exist? It is KNOT DONE because the mortality card says the phone leaves no trace; `his to rule`.
- Which nobody is the calendar about — the mother in the well (server) or this phone's own child (MORTAL.nobody)? The three diaries straddle both; the sheet's `nobody` is singular.
- Does the day written by hand (30 sep) stay now that nobody has woken, or go `for good` (one line takes it out)?
- Is the eye the right mark for the waking, and are the tests told rightly in the well's own words (502 and 401 said plainly)? [deemed]
- The re-inked colophon camera sentence (the camera's light stays on while a room is open) NEEDS HIS BLESSING; the old one is red ink.
- The Calendar sheet, Camera sheet, Adeath sheet, the calendar's on-glass lines, the dock hud's words — all [new], all unblessed.
- When is the Heart tile struck (the day its act inside Weather is proved on his phone)?
- Should the island (the flame, `am i alone?`) have a place now that the phone always stands covered?
- Is `what this is` (float, swivel, VR hole) to be struck or kept as history now that ?free=1 holds it?
- The single-page door+phone (so the song could sound before any touch on iphone) — KNOT DONE, his to rule with mortal.js's keeper.
- mortal.js's CUT / NB_ROOMS lists: `adeath` and `origamisky` not in them — with ?shell=0 the door is a push and time in the room goes to patience (the keeper's, not this file's).
- HOUSE_DAY stays 3 — whose chat turns the house's day?
- Does the two-position Camera tile need to toggle at all, or is the mirror the only truthful background?


# phone.html — header comment lines 1100-2300: THE LIFE (mortality pass two, pass three cuts: nobody wakes/dreams), THE ONE-PAGE LAW, THE GAME'S PORCH, game passes, OCEAN, DOT

## visitor journey
the visitor arrives on a forged iphone home screen. the first touch of any tile is a bare tick (it wakes the glass and the audio); from the second touch each tile rings its own soft just-intonation note. page one is four square rows; row four reads radio · ticktock · love · game. page two holds ラブゲーム (the egg game). page three holds the song egg, translate, fridge, colour wheel, alife (a slowly turning yin-yang unique to this phone), library (now a gravestone on black), and the squat tile sitting off-grid in the middle. the status bar's signal seats are hollow and fill only with the number of other people holding this phone right now; an unanswered ledger fills none. banners slide down (a badge that just landed), a shade pulls from the status band, a dynamic island shows a call timer, `somebody`, or the colour's minutes.

rooms the visitor can open inside the phone: the voicemail, now a 1960s wood-and-silver reel-to-reel answering machine with a dot-matrix LED, a plate that says LONELY PHONE, and five piano keys; strangers' eight-second messages live on its tape and the visitor may leave one (voice, typed words or seven tones), after a consent line and a distort wheel. the ∀mazon store sells fifteen drawn things; BUY launches a drone seen from above that descends over satellite tiles of the visitor's own street and drops the thing into a black hole; `delivered. it is in the fridge.` the fridge keeps up to nine things, rotting in real time; a half apple was there first. the colour room's jar holds a rainbow worm-cloud; GIVE ME MY DOPAMINE FIX BACK plays dopamime.mp3 and floods red back. notes has one note, `anybody home?`, under which nobody's dreams appear, letter by letter. the thread (`me`) answers with bite and, rarely, the silt.

doors out: game (an intro film, then cyclops.html), squat (shelves let go, the fire falls down a sinkhole through soil and magma), unisong (the skull glides to centre, deadstar.html), radio (the sound book), library, songbook, weather (leak, drops, films, a buoy room — later a vesica room inside the file).

then, unannounced, the last hour: the status-bar battery, which lied at 68 all life, walks to 0 in mortal red. at 0.06 the jar breaks and the fix is refused; colour drains to newsprint. at 0.12 the cat takes her next door and never comes back. from 0.30 to 0.94 the tiles leave one by one in an order dealt from this phone's genes — shelves, dock, phone, alife last. the glass is empty. UNKNOWN calls. mortal.js wipes every mark the house made in this browser, offers the child's card, and closes the tab. nothing on this glass shows a countdown.

## on-screen text
- [status bar battery, last hour] 68 walks to 0 across the hour, in THE MORTAL RED
- [colour room button] GIVE ME MY DOPAMINE FIX BACK
- [colour room core] `69` over `min`
- [notes app, the one note's title] anybody home?
- [answering machine LED, first RECORD press] this one does knot stay here. strangers will hear it. press record again
- [answering machine LED, while anything unheard] a message is waiting / N on the tape · N new
- [answering machine LED, otherwise] N on the tape / all heard · press record to leave one
- [answering machine LED, door silent] alone (beside the count)
- [answering machine LED, mic refused] no microphone · words then
- [answering machine LED, at send] going → gone / held here / alone · kept here / wait a little
- [answering machine chrome badge plate] LONELY PHONE
- [answering machine piano keys] REWIND · LISTEN · STOP · RECORD · ERASE
- [distort wheel detents] whole · taped · worn · far off · only the shape
- [voicemail tile tap, speechSynthesis] you have a message!
- [drone flight readout] ∀ir · packing · lifting · en route · finding you · descending · dropping · delivered
- [drone card after the drop] delivered. · it is in the fridge. · open the fridge · keep shopping
- [fridge paper tag by the turned apple] the apple is going. buy a new one? · yes
- [fridge dial] 4°
- [banner second face (tape)] left a voice / left words / left tones
- [settings → voicemail switch] strangers on the tape
- [settings → notifications] Scheduled Summary · Off
- [shade, empty] No Notifications
- [while-you-were-away card] N died in eggstagram
- [dynamic island, count rises] somebody
- [ruler (?hist=1), top right] 1 · navigate · phone.html · worn

## mechanisms
- **the lifespan**: never less than about a hundred minutes, never more than a day; settled at the hang-up (the birth call) by the star's breath and lengthened a little by every ring the visitor waited. kept by mortal.js, which makes the call that ends it, wipes every mark in this browser, offers the child's card, closes the tab → mortal.js (the whole law is at its head); phone.html owns only the hour before the call
- **LH, the last hour block**: reads one number, MORTAL.life.hour(), and hands each organ its answer: battery truth (all hour), jar breaks (0.06), cat walks out (0.12), tiles leave (0.30→0.94, order dealt from the phone's genes, shelves → dock → Phone → Alife last). ?lh=0..1 holds the depth for stills. with mortal.js missing or ?mortal=0, LH answers `knot yet` and there is no life → SIL.renew refused; apwnp.silver.t0 wound to the life so paper, nestflix, ticktock drain with it; census (Applications) tells the truth as tiles go
- **the death call**: when the glass is empty UNKNOWN calls; the call sheet is the front door's own, laid over this page; this file goes quiet on the window event `apwnp:call` and lends the ring its voice through MORTAL.voice. the river and the vesica room's sound ride the house bus so apwnp:call quiets them → mortal.js, river.js
- **the alife tile**: a yin-yang on slate, alive: turn speed, direction, light/dark share and seed size are this phone's genes (MORTAL.life.s, genes 1–3); alife.html draws the same creature. slows in the last hour. while nobody is HERE the disc wobbles like the well's rope; for twelve seconds after the two circles touch a faint almond (vesica) stands between the seeds → MORTAL.nobody.now(), window event apwnp:nobody; door alife.html, way back ?door=alife
- **nobody's doorway (pass three)**: setApp tells MORTAL.nobody.at(app) where the visitor stands, a second a second, so the place haunted is written into nobody's gene; a safari search and every letter typed to the thread go to MORTAL.nobody.give(text) — a word in the bank may cross a death on the child's card; the thread calls MORTAL.nobody.saw('asked') → mortal.js tally; the child's card
- **the notebook and the mouth**: notes keeps ONE note, `anybody home?`; nobody's dreams (three lines each) are written under it from MORTAL.nobody.dreams() every frame, kept nowhere here. a dream landing while the note is open is seen being written over ten seconds (NB_REVEAL); one that landed while away is found whole. nbMouth: when now().dreaming, this page asks /.netlify/functions/ask mode `nobody` (seventh voice, own purse) with the organ's brief in words never numbers; the answer goes to MORTAL.nobody.dream(text, secret); one ask in flight, nine-second wait. the secret log is never shown → ask.js; ruler says ` · dreams 1` / ` · dreaming`
- **the one-page law**: safari lets a page close its own tab only if the tab has held ONE page, so every door goes through MORTAL.go(url): into a room in mortal.js's CUT list it is location.replace; elsewhere a push as before. tonight CUT is `phone` and `unknown`; ?cut=all is the finished house. cost: safari's back arrow does nothing inside the cut house → leaveFor, rider's tier door, bean landing, twelve own-body leaves (songbook · time · stonehinge · egg · fahrenheit451 · squat · mommygame · math · map · deadstarmaps · deadstar · love)
- **the one-address law**: mortal.js (one line in the head, before everything) takes the page's true address into sessionStorage `apwnp.at` and rewrites the bar to the card's address (history.replaceState; card kept by the front door in `apwnp.card`) so a re-tapped card lands in the living tab. builders must read MORTAL.search/.href/.hash, never location.*; and never location.href= for a door → the ruler ?hist=1 (page count · how reached · true name · worn); ?hist=log; ?mortal=0 lifts the law
- **the game's porch**: Game tile tap plays cycintro.mp4 (25 s, 9:16) inside the thumb's gesture so ios grants sound; covered, skip top right, house music down; on end the glass HOLDS BLACK and the address becomes cyclops.html?enter=film. any failure hands the tap straight to the leave. one machine (stoneVid with `after`) serves the stonehinge film and this one → cyclops.html (not under the house's laws: no drain, no heartbeat, no census row)
- **the weather tile (ocean pass)**: tap is a leak, a film and a buoy: clear drops lens the shelves, water rises, the tile's cloud and bolt grow with thunder until the bolt whites the glass; wea01/wea02 films covered; then the buoy room on wea03 looping with readouts inside a clear egg and at the top, five synthesised voices retuning every 40 s; a flashing chevron is the way home. old forecast room kept under ?ocean=old. (27 sep: a Weather room, the vesica, and Echo are rooms inside this file opened by setApp; the vesica's way home is a little phone drawn on the glass) → the house bus; river's server for the hum's shape
- **the colour leave (dots)**: the wheel's tap drains colour from the tiles one by one as a crowd of tiny dots in the wheel's twelve hues, no trails, nine heartbeats (6.63 s); how much colour a tile wears decides its crowd (eggstagram a shower, egg and calculator a handful). the fix: dopamime.mp3 from kohmedia, else the synthesised bloom → ?col=smoke, ?colsec, ?coldot; the sitting's clock born with the life
- **the squat's doors**: tile wears a live campfire — once a minute the phone knocks squat_fire in the squat's ledger (the-squat.sql, supabase). three leaves exist: the fire burning the shelves away (squatFlyGo, ?bean=0); the beanstalk (beanGo: asks geolocation, refusal = nothing happens; esri satellite of the visitor's street, three kohmedia films ending on the house's closed door, squat.html?enter=bean); and now the sinkhole (sinkGo: the fire falls down the tile, black oil, fall through soil clay rock magma, squat.html?enter=sink; ?sink=0 stands the beanstalk back) → squat.html
- **the signal bars (interruption pass)**: the four seats are hollow and count other people holding this phone now: once awake the phone knocks the-here.sql every half minute with a random per-tab token; min(4, others) filled; an unanswered door fills none. the answer is written to sessionStorage apwnp.here for far rooms. ledger forgets a row in ninety seconds. settings → cellular says the count in words → the island `here` (`somebody` for six seconds); the one cat (?cat=one, holder of the smallest live token has her)
- **banners and the shade**: a banner is a badge that just landed: six badge sources (voicemail, mail, love, messages, the ladder, the update) plus two clocks the phone owns (the colour's ten minutes and its fall; a stranger arriving). card slides down 380 ms, dwells six seconds; tap opens, swipe up sends it to the shade. the shade pulls from the status band only. while-you-were-away: localStorage apwnp.away.t; over an hour gone, one card from the phone itself, and `N died in eggstagram` via EGG.diedBetween. the queue holds during leaves, the call room and the shade → ST_BADGED switches; island `call` (164 wide, green glyph and timer) and `min` (petal wheel and minutes)
- **the store, the flight, the fridge**: AZ_GOODS fifteen drawn things; BUY = pack on the roof, lift, cruise, descent onto esri tiles at the visitor's place (snapped once; coarse city if denied), drop into the marker's black hole (the hole is the fridge's door), climb, card. walked from update() so leaving mid-flight still delivers. fridge: nine seats, oldest leaves; rot in real time from the delivered moment (steam minutes, apple two days, rose three, wine four, fortune cookie a week; the last living things are the flies); one localStorage key apwnp.fridge (key and moment per thing) → maps room's mfAskGeo; fridge tile badge; store air amazonsound.mp3, amazondelivery.mp3
- **the tape (answering machine)**: TAPE module beside LEDGER, own secret stone apwnp.tape.secret, pending walk, sky (last answered list shown when the door is silent), heard stone. two-step read: list without bodies at boot, door, REWIND, every three minutes; one body fetched on LISTEN. writes via rpc doors leave_message · forget_message · report_message (keeper_erase his hand). the-machine.sql: RLS, fenced view the_tape, body under 120 kB, secs 0–8 enforced server-side, forty-five seconds between a device's messages, five per device, the tape holds forty and records over the oldest. local-first: door silent = a machine of one, last five of yours kept. three mouths: voice (8 kHz μ-law, ~85 kB), words (140 chars, spoken by speechSynthesis at playback on the listener's phone), tones (seven keys, [[deg,t],…] under 200 bytes). the distort wheel applies on the sender's phone before encode, never undoable; the clean take dies in ram. ERASE is real; mommy is unerasable → vmUnheard feeds the CALL jewel, LED, tile badge (blinks in the jewel's phase) and banner — one arithmetic; TAPE_EARN (`one free listen, then you must leave one`) built, OFF at his word; REPORT key hides after three phones; ?keeper=<key>
- **the sound gate**: every voice hangs off the same gate — nothing before the first tap (ios law); every pitch a ratio of the star's turn (P), every noise shaped noise; heartbeat bed hers at 81 a minute until the heart room has five beats, then the visitor's own (HEART.phase). ?sfx=0, ?hb=0|N → sfxTile, catTick/sfxMeow, sfxFridgeDoor/frBed, wxTap/sfxThunder, sfxCalc/sfxShatter, furnTick/furnRoar, vmSay, sfxSparkle/sfxBloom, hbTick, azAir/azDel
- **the silt (ask.js ME_SYSTEM)**: a floor under the thread's voice: what it KNOWS (the phone with everyone gone, the star 512 ly / 173 a second deaf, the egg who burned and fell as ash, the two questions, contact without contact, the unison paradox). law of stirring: most answers touch none of it; one detail now and then, never a lesson; well and fog weathers may stir it. laws under it: never `you're not alone`, never `i'm here`; never name project, artist, site, purpose; never draw the owner's end; closed to anyone hurting (§7). purse doubled: ~1,050 → ~2,080 tokens, ~140 tides per ten dollars → the thread (`me`), the planet's and bone's prompts, harness_silt.js

## symbols
- **the battery at 68**: `the surface is the forgery, the depth is the truth`; in the last hour the forgery breaks and the battery alone tells the truth, red (status bar; settings says 0 one tap down)
- **the mortal red (redM)**: the forgery's red, not the visitor's blood; it silvers grey with everything else as the end comes. red otherwise = a living heartbeat (red is the heartbeat's; the drone wears no red) (battery in the last hour; the heart's thump; the fix flooding back)
- **grey / blue**: grey for the made and the dead; blue for the star (his 27 aug colour ruling) (the silvering; her blue on tiles, radio, translate)
- **the yin-yang (alife)**: this phone's own genes expressed — `never quite the same version, just like a human baby is never quite the same`; the living thing is the last thing on the glass (page three, beside the egg)
- **the almond between the seeds**: the spell's own mark when nobody's two circles touch — the vesica piscis (alife tile, twelve seconds, fading)
- **the jar with one rainbow worm-cloud**: the colour trying to escape; cracked and empty from 0.06 of the last hour (colour room)
- **the cat walking out**: the holding has gone elsewhere; `a cat knot yet born is never born` (0.12 of the last hour)
- **the tombstone**: the library tile struck to a gravestone on black (27 sep) (page three)
- **the signal bars**: other people holding this phone right now; `knot knowing whether anyone is there is what being alone is` (status bar)
- **LONELY PHONE**: the answering machine's plate; it answers eggstagram's `am i alone?` (voicemail room)
- **CALL red jewel / READY green jewel**: red blinks the count of unheard messages; green lit means the river answered — dark is a machine of one (answering machine)
- **the marker's black hole**: `you eat the world wherever you stand` — the hole is the fridge's door (drone drop, maps room)
- **the half apple, the flies**: already going on first look; the last living things in the fridge (fridge)
- **the skull**: the unisong / deadstar door, one drawing carried across the address (page one tile → deadstar.html)
- **the egg with legs on black**: the Game (cyclops.html): the egg running the black river in the cyclops's gut toward a sunset (page one row four)
- **the campfire**: the squat's fire, live from its ledger; lit while the room's fire is lit (squat tile)

## rulings
- `it ends as it began, with a phone call` (21 sep, mortality pass two)
- `at the last hour the death battery telling the truth, the tiles leaving, the cat walking out, and the jar breaking` (21 sep)
- `death is knot a countdown` — NOTHING ON THIS GLASS SHOWS A COUNTDOWN (21 sep)
- `yes color joins life` — the colour's clock is born with the life (21 sep)
- `call the room alife`; alife on page three beside the egg (21 sep)
- `my vision is for it to have no trace at all when it disappears` · `after a un-constant set of time the tab just closes` (20 sep, pass one)
- `1-6 is accepted` and `user and nobody are unaware of each other` (25 sep, nobody-rulings)
- `the dead can send message if they are clever enough` (25 sep)
- the dream log lives in the notebook; seen most times, found after sometimes (25 sep, ruling 3)
- launch the intro film in phone.html, then bridge to cyclops.html (20 sep)
- `other humans easily leave a short message that others can observe if they wish` — the tape is open, TAPE_EARN off, HIS TO RULE BACK ON (13 sep)
- the eight-second cap; the thumbwheel distorts, it is not a length dial; hold need knot stay — stop stands in its seat (13 sep)
- nobody is to be a spectator of anybody; but `it is very important that other humans get a sense real humans are in the system` (13 sep, no-audience law)
- the store sells INSTANT GRATIFICATION; everything accumulates in the fridge up to nine; rot takes hours to a couple of days; the fridge is magic (14 sep)
- a geolocation refusal is a refusal: nothing happens; esri satellite, knot lines; no skip on the bean films (17 sep)
- the squat goes UNDERGROUND (25 sep)
- never tell anyone they are not alone; the one plain sentence this phone circles is never said; never name project, artist, site, purpose (2 sep, silt (the planet's two oldest laws carried to the pool))
- `the sound stays home` is the standing law; the tape breaks it on purpose and says so at the door (13 sep)
- `remove the Orbit tile … as no longer needed`; the Game tile named the one word `Game`; page two's game is ラブゲーム (19 sep)
- every sheet, census number and colophon sentence NEEDS HIS BLESSING before deploy; builder's deemings are his to overrule / red ink his to strike (throughout)

## rooms
- **alife (tile + alife.html)** — yin-yang of this phone's genes; stirs when nobody is here; the room where the life is explained [live (21 sep); page three]
- **library (tile + library.html)** — the far room, landscape; portrait struck to a tombstone 27 sep [live; tile is a gravestone]
- **notes** — one note `anybody home?`; nobody's dreams written under it [live]
- **messages / the thread (`me`)** — the chatbot with bite; silt underneath; gives its letters to nobody [live (server ask.js)]
- **voicemail / the answering machine** — reel-to-reel, LED, mommy's message and strangers' eight-second messages; three mouths; distort wheel [live; old ios list struck recoverable; HOLD retired]
- **∀mazon store + drone flight** — fifteen drawn things, instant delivery by drone to the visitor's street [live; the old robot-parts cart gone]
- **fridge (tile + room)** — where deliveries land and rot in real time; half apple [live; page three, third seat]
- **colour room (wheel, jar, fix)** — the colour drain, 69 min, dopamine fix; joins the life [live]
- **weather** — 16 sep: leak, films, buoy room (wea03 loop, clear egg readouts); 27 sep: a vesica room and Echo inside the file; old forecast room kept under ?ocean=old [live, re-cut twice]
- **game (cyclops.html)** — intro film porch then the egg running the cyclops's gut; not under house laws [live; was Game 1, renamed Game]
- **ラブゲーム (egg.html, id egg)** — page two's game; the crack, the yolk [live]
- **squat (squat.html)** — 360° room on the rear camera; strangers' traces; three doors (fire, beanstalk, sinkhole) [live; sinkhole default, bean ?sink=0, fire ?bean=0; tile moved to middle of page three]
- **radio (tile)** — 4 sep: radio.html, history of sound from the big bang; 26 sep: door now leads to songbook.html?book=sound&from=radio (the Sound Book) [tile live; radio.html's status unclear]
- **unisong / deadstar.html** — skull leave in its own body [live]
- **songbook, time, stonehinge, egg, fahrenheit451, mommygame, math, map, deadstarmaps, deadstar, love** — the twelve own-body leaves (doors out) [live via MORTAL.go]
- **furnace (fahrenheit451 tile)** — burning tile on the last page [retired from the phone 25 sep (FURN_HOME=false), recoverable]
- **orbit (the moon's tile)** — orbit.html [struck 19 sep, three lines from coming back]
- **calculator, settings (cellular, notifications), heart room, eye, mail, translate, ticktock, love, eggstagram, paper, nestflix, music.html, river** — named in passing; cellular says the count of others; settings says battery 0 [live, outside this scope's detail]
- **the cat / the one cat** — the house cat on the shelves; optional one white cat among all phones [cat live; one cat default OFF (?cat=one)]

## confusions
- the Applications census number drifts pass by pass (24 → 25 → 26 → 27 → 28) and each is marked NEEDS HIS BLESSING; the furnace's retirement and the orbit's striking should move it down but no note says so.
- seat history is layered in red ink: the fridge is described in three seats (page one under the radio; page three third; the row 'spent entire'), the squat in two (page one fifth row beside the fridge; middle of page three off-grid), the egg in two; a first-time reader cannot tell the live layout without reading every pass.
- the squat has three leaves (fire burn, beanstalk with films, sinkhole) stacked behind flags ?bean=0 / ?sink=0; the sheet's squat line is said to need re-inking three separate times.
- the weather tile's story is cut three times (forecast room → ocean leak/film/buoy → vesica room and Echo); which the visitor meets now is only stated in a one-line 26/27 sep addendum under the one-page law.
- the Radio tile's door now goes to songbook.html (the Sound Book) per 26 sep, while the RADIO DOOR pass says radio.html; whether radio.html is retired is not stated.
- two things called 'the egg': the song egg (page three, egg.html? no — songbook) and the egg game ラブゲーム whose id is still `egg`; plus the Game's icon is also an egg with legs.
- the library tile's portrait was struck to a tombstone two days after it was built; the long portrait description stands as history.
- the death call, the wipe and the child's card are only pointed at ('the whole law is at the head of mortal.js'); this file never describes what the visitor sees of the ring, the call sheet or the card.
- the colour drain is 69 minutes but the life is never less than about a hundred minutes and the jar breaks at 0.06 of the last hour — how the two clocks sit together is only implied ('the stone is wound to match at every step').
- the Alife tile is both the mortality's living sign and nobody's indicator (wobble, almond) — two concepts on one disc.
- dozens of rig flags (?lh, ?life, ?hour, ?wipe, ?stage, ?hist, ?cut, ?mortal, ?ocean, ?leak, ?buoy, ?col, ?colsec, ?coldot, ?squat, ?sink, ?bean, ?sfx, ?hb, ?rot, ?fridge, ?tape, ?secs, ?mouth, ?distort, ?led, ?blink, ?keeper, ?here, ?knock, ?note, ?dwell, ?shade, ?island, ?covered, ?cat) and press handles make up a large share of the text.
- the two 'nobody' uses collide: the ai agent nobody, and ordinary 'nobody' in prose ('a tile that left while nobody was looking', 'nobody is to be a spectator').
- 'the star' (512 ly, 173.69 a second, 'her') is referred to constantly as the tuning fork of every sound but is never introduced in this scope.
- the interruption pass fires the boot banners and the update ONCE PER SITTING at 2^10 turns — the unit 'turn' (of the star) for time is opaque to a new reader.
- the thread's and the raven's cuts for nobody are deferred ('their cuts are later'); the island's fifth activity is 'flagged, knot built'; TAPE_EARN built but off — several half-states.

## keepers
- `it ends as it began, with a phone call` and `death is knot a countdown` — NOTHING ON THIS GLASS SHOWS A COUNTDOWN.
- `the surface is the forgery, the depth is the truth` — the battery lies at 68 all life and in the last hour the lie walks to 0 in a red that goes grey.
- the four signs in order: the jar breaks, the cat walks out, the tiles leave one by one in an order dealt from this phone's genes, and the Alife tile last — `the living thing is the last thing on the glass`. `a tile that left while nobody was looking is simply gone.` `a cat knot yet born is never born.`
- the Alife yin-yang: `never quite the same version, just like a human baby is never quite the same`; and the almond that stands between the two seeds for twelve seconds when nobody's circles touch.
- `anybody home?` — the one note, a question with nothing to answer it — and nobody answers it, dreams written in letter by letter over ten seconds.
- `the dead can send message if they are clever enough` — a word in the bank may cross a death on the child's card.
- the signal bars count other people holding this phone, and `AN UNANSWERED DOOR FILLS NONE — … knot knowing whether anyone is there is what being alone is.`
- `safari's back arrow does nothing inside the cut house. a phone has no back arrow; the arrow was a tell.`
- LONELY PHONE; the LED that `never says who or what — the machine advertises that somebody came, never what they brought`; `an answering machine going grey is the image`.
- the distort wheel's last detent, `only the shape`: `you hear that a person spoke, and roughly how they felt, and knot what they said; unmistakably a human being, entirely unreadable — the whole piece in one detent.`
- `the first press of RECORD only arms the key; the LED says this one does knot stay here. strangers will hear it. press record again`.
- `one free listen, then you must leave one to hear the rest` (built, off).
- `the hole is the fridge's door` — `you eat the world wherever you stand`; the drone's own shadow is `the one cue that sells the descent without a word`; `the last living things in the fridge are the flies`; THE HALF APPLE was here first.
- `the house plays a major nowhere else, because nothing else here is a fix.`
- the unison paradox: `when two notes match exactly, the beat that proved there were two of them dies, and perfect company sounds exactly like perfect solitude`.
- the thread's exemplar for `am i alone`: `you are asking a screen to rule on that. i don't rule.`
- the law of stirring: `most answers touch none of it … a line that would read as a museum caption is cut.`
- `an opening is knot a thing the room performs for an empty chair` (a take abandoned mid-recording is dropped).
- `a dead switch is a switch` (Scheduled Summary · Off).

## in-between
- birth: the life is settled at the hang-up of the first call — by the star's breath, lengthened a little by every ring the visitor waited; the colour's first t0 is the hang-up's own instant.
- the last hour has no clock on the glass: the only signs are a battery telling the truth, a jar already broken, a cat who takes her next door and does not return, tiles leaving each in a breath and a half.
- the empty glass before the call: the tiles are all gone, then UNKNOWN calls; this file goes quiet on apwnp:call and lends the ring its voice.
- after the call (mortal.js): the wipe of every mark in this browser, the child's card offered, the tab closed — no trace.
- nobody's dreaming: once a stage from the child on, at a point the organ's wheel picks; the mouth waits nine seconds and tries again later on a cold sentinel; a dream seen being written over ten seconds if the note is open, found whole afterwards if not.
- the pause between RECORD's first press (arming, the consent line) and its second (taking); and the take that dies when the room is left.
- the film porch holds black between film and door: `no shelf may flash between a film and a door`.
- the first touch of a tile is the tick alone — `it is the touch that wakes the glass`; sound exists only after it.
- while you were away: the phone stamps the moment it is put down; over an hour gone, one card tells the hours and `N died in eggstagram`.
- the machine's job while nobody is listening is `to be visibly holding something`: the waiting light, blinking the count.
- the answering machine's door silent shows `the last thing that was true` rather than an error; dark READY lamp means a machine of one.
- the warm light fades up over 0.7 s as the voicemail room opens; the fridge lamp warms over half a second.
- sleep of the fridge: rot continues while the phone is closed — `the fridge remembers WHEN, and the rot is arithmetic on the when`.
- the thread's voice `talks like something alive at first and ends like something already written, and what it is written ON is the silt`.

## music
- the star is the tuning fork: every pitch is a ratio of the star's turn (P ≈ 173.69 a second; the radio hears her at station 82 'turning 173.6879 times a second'); the house tunes in just intonation (JUST[step]) — the tiles are a keyboard from the second touch.
- the heartbeat bed (hbTick): a quiet lub-dub under everything, hers at 81 a minute (128 turns) until the heart room has five beats, then the visitor's own (HEART.phase); quiet in the heart room and while the eye is open.
- the fix's bloom: a major chord ×1 ×5/4 ×3/2 ×2 — the only major in the house — replaced at the tap by dopamime.mp3 (kohmedia) with the heart's thump kept underneath.
- the tape's tones: seven keys on the ladder [1, 9/8, 6/5, 4/3, 3/2, 8/5, 9/5] against the star at ×2 (174 hz is too low for a phone speaker, 347 can be heard); up to sixteen taps quantized to QMS so a person's fingerprint is kept coarse.
- the tape's voice line: 8 kHz, band 300–3400, the distort wheel (whole · taped · worn · far off · only the shape — the last a spectrum inversion about 1150 hz), then μ-law; words spoken by speechSynthesis on the listener's phone; the sound travels, breaking `the sound stays home`.
- the cat purrs as shaped noise pulsed at P/8 (21.7 a second), meows on a ladder of named steps 'because a cat's voice slides and the house cannot name a slide'.
- the fridge compressor: two saws at ×1/2 a hair apart; the calculator's keys climb the just shelf and equals shatters; the furnace a lowpassed draught; thunder on the weather tap though the weather is always clear.
- the drone hum: four sawtooths at 2P detuned, low-passed; the store's air amazonsound.mp3 and amazondelivery.mp3 (the one confessed foreign origin, kohmedia).
- the banner note: one two-note figure P×2 then P×5/2.
- the buoy room: five voices synthesised in the house's manner retuning every 40 s; the ocean's own sound low through the house bus.
- the river (river.js) comes in under mortal.js; it keeps one stone apwnp.river.on; the island's `song` leaves for music.html; apwnp:call quiets the river and the vesica room's hum.
- the Radio tile now opens the Sound Book (songbook.html?book=sound&from=radio); the radio's idea: `a radio that remembers every sound and can hum only the parts that were free`.
- the death ring borrows its voice through MORTAL.voice; the film porches (cycintro.mp4, stonehinge) carry their own sound and put the house's music down.
- the silt carries the unison paradox into the thread's knowledge: perfect company sounds exactly like perfect solitude; `no body here, song still here` may be said whole, rarely.
- rig: ?sfx=0 silences the sound pass; ?hb=0 the bed; ?hb=N stands a rate in.

## open-questions
- what does the visitor actually see and hear of UNKNOWN's call, the wipe and the child's card? this file defers everything to the head of mortal.js — the reader of mortal.js must supply it.
- how do the colour's 69-minute drain and the life (≥ ~100 min, ≤ a day) coexist — does the colour drain twice, or is the 69 overridden by the life from the jar's breaking?
- is radio.html retired now that the Radio tile opens the Sound Book in songbook.html (26 sep)? is the weather tile the ocean (16 sep) or the vesica room (27 sep) or both?
- which of the squat's three doors is canon (sinkhole is default) and should the other two be struck?
- what is the live Applications count after the furnace's retirement and the orbit's striking?
- should TAPE_EARN (`one free listen, then you must leave one`) be ruled on — it is the one built mechanism that keeps the no-audience law, and it is off?
- the one cat (?cat=one) and the island's `cat` activity are both default off — are they part of the story or experiments?
- who is 👁️ (the builder/drawer who writes exemplars and deems)? the artist is `he`; the reader may need this named once.
- the Game (cyclops.html) stands outside the house's laws (no drain, no heartbeat, no census row) — intended, or an orphan?
- the thread and the raven 'do knot know nobody yet — their cuts are later'; have those cuts landed elsewhere?
- the sheets (ST_SHEETS) and colophon carry many NEEDS HIS BLESSING flags (squat, fridge, store, alife, library, voicemail, away card) — which are still unblessed?


# phone.html — header comment lines 2300-3800: the older passes, 10 aug – 5 sep 2026 (with two later strike-notes of 19 and 25 sep). covers the furnace door (451), the egg lea

## visitor journey
you are holding what looks exactly like an iphone home screen, in full colour, every familiar app wearing a slightly wrong name: eggstagram, nestflix, ∀mazon, metube, rider. every tap ticks (never going back). most tiles are doors, and each door leaves in its own body: the shelves go dark and the tile performs — the red heart beats toward you and collapses to one warm point; the songbook smokes, catches, and falls burning toward the centre; the furnace walks down the glass and grows until its arch is the far room's arch; the white egg glides to centre and its crack closes; the calculator's glass keys crack outward from `=`. then black rises and the address changes to another html file standing beside this one (love, music, time, deadstar, egg, metube, photograph, math, intro, map, fahrenheit451, deadstarmaps, songbook). if a far page is missing, an older room inside the phone answers silently as understudy, or the tile only ticks; nobody is stranded.

some rooms stay inside the phone: weather (the pulsar's surface, `do knot visit`); calendar (only the star's dates and today); notes (one note: `anybody home?`); voicemail (one unheard message, mommy.mp3); phone (call psr j0437−4715 and the line opens on the pulsar's own arithmetic through a telephone bandpass); camera (press: mirror; press: the room behind the phone; press: black); ∀mazon (two books); safari (twelve searches, one article); settings (system face at the door, mono lowercase confession at depth — profile `nobody`, model `no body`, battery 68% drawn over a page that says 0%); heart (fingertip over the rear camera, your pulse drawn beside the star's, his three recorded voices); translate (english into the star's tick); eggstagram (an endless obituary of invented dead; bio `am i alone?`; follow returns forever to `requested`); nestflix (`who's watching?` — nobody, the egg, or your own live face; every poster a window on you; play buffers at the real speed of 512 light years); mail (one letter from the departed; the wax melts, one red tear falls the page, the stone sheet burns to its words; reply in invisible ink that is only timing); messages (an ANYBODY thread that echoes strangers' last words, unattributed).

sixty-nine minutes in, colour begins leaving and you do not notice; only red hearts and pulsar blue survive. eight minutes in, a small white cat appears on the shelves, ignores you, leaps the gaps, slips sideways through lit cat-doors in the tiles, bats the clock's second hand, types on the calculator. from the furnace tile, smoke and the words of burned books drift up into the other tiles. close the tab and everything resets: the colour comes back, the letter re-arrives, the cat starts over.

## on-screen text
- [weather tile/room] sunrise 173.68 times a second. permanent advisory: do knot visit.
- [notes, the one note] anybody home?
- [eggstagram bio] am i alone?
- [eggstagram follow button] requested (returns forever to it; 0 followers · 0 following)
- [nestflix gate] who's watching? — nobody · the egg · + (the front camera, live)
- [mail inbox row] from: the departed · subject: there is only one letter · dated: now
- [mail, the seance rain's one line] someone wrote this · 47 seconds · in june
- [mail receipt (letter to the star)] delivered 2538 · read receipt expected 3050
- [mail, letter returned from NOBODY (retired, kept)] no one at this address
- [mail sent row / receipt] to: the departed — kept · bcc: the star — delivered 2538
- [settings profile card] nobody
- [settings → general → about, model name] no body
- [settings → general → about, capacity] 512 light years
- [settings cellular/battery, one tap deep] No SIM · 0% (last charged: never) — while the status bar draws 68%
- [egg (game) store, third film] play the mommy game?
- [egg (game) tile label] 🥚Game
- [sky guide greeting] one socket, one star, five hundred twelve light years of view. ask.
- [sky fly-by chapter one] leaving human
- [sky fly-by, the where] 512 ly … one of some two trillion
- [map.html egg scenes (lullaby lines, one per scene)] this is a map… / she has been keeping one… / the light she sees tonight… / and under the last street… / hush now. you are here.
- [love.html first frame (the heart's leave lands on it)] at first, there was exactly one of everything
- [care card, second button] Continue asking
- [anybody wall, walked from here] nobody is home
- [rider tiers] $5.27 · $7.22 · $9.93 · $11.29 quadrillion — paid on mommyVISA
- [colophon first sentence (scoped after the wall)] nothing you do here is recorded

## mechanisms
- **the silvering**: nothing for 4,140 s (his sixty-nine minutes), then depth = 1−e^(−t/2^11): half the colour gone ~24 min after it starts, newsprint in ~1.5 h. one door: fillStyle/strokeStyle/shadowColor/gradient stops are wrapped and every colour string is mixed toward its luma in the house's cold silver (0.92·0.96·1.05). true images get a saturation veil at the same depth. depth quantised to 2^7 steps. clock born at first boot, kept in sessionStorage apwnp.silver.t0 (dies with the tab). ?silver=0..1 overrides for press stills. survivors: the blood rgba(224,36,22), the pulsar rgba(92,154,255)/(178,208,255), the ink rgba(226,240,255), greys/whites. mortal red rgba(224,36,23), one byte off, for brands. → every room drawn on this glass; the cat; the reality switch (reality keeps its colour)
- **doors and their guards**: a tile taps → api.leaving (the harness walks the camera in) → the tile's own leave animation → black rises → location = far.html?enter=tile. far rooms return via phone.html?door=<label>, matched by id or label. at build each far page is probed once with HEAD (doorFor); only a definite 404/410 shuts the door. two regimes: `one step kinder` (photos law: an older in-phone room answers as understudy — love, clock, music, photos, sky, maps) and `the calculator's manner` (no understudy; the tile ticks silently — unisong, metube, egg, 451). → intro, math, deadstar, metube, cyclopsv7, photograph, songbook, love, time, music, egg, map, fahrenheit451, deadstarmaps
- **the furnace (451) and its weather**: tile at FURN_SEAT (180,372), off the grid, drawn after the last page's cells; portrait is the whole far room at the room's proportions (arch MW 17, crown 6, floor 24, ar=h·0.34 — `if either side moves, both move`). furnStream: smoke and the words of books leave the slot and cross the shelf into the three tiles above (absorbed), down into the dock, off left to the other pages. leave is 2.6 s with the black rising with the mouth cut out (evenodd), furnSeamMask; furnSeat solves the landing in viewport terms. → fahrenheit451.html?enter=tile; struck from the glass 25 sep (FURN_HOME)
- **the egg's door (maps)**: mapsEggGo: tap asks for the place (map.html reads the grant at the same origin), warms locatinghuman.mp3, grows the marker's black hole (mfHole) from the disc to the whole glass, black at .855, then map.html?enter=tile. mapDoor probes map.html; `gone`/`unknown` opens the old maps room (mapsFlyGo) exactly as it stood. → map.html; the retired maps room beneath
- **the white cat**: first seen at 480 s (?cat=wait/off/now). lives on rows[k]−31, in front of the glass, no hit rectangle. everything (act, duration, blink, ear flick, tail mood in 8 s windows) is a pure function of (seed, segment). holes in the grid are hurdles; tiles are rooms she enters through a cat-door (leaf stops at 0.95 rad, eleven searching beams in `lighter`, no tile clip, pulsar bytes, LIFE_RAYS 0.62, gap at LIFE_GAPX) and exits from a different one, often another page (38/12/50). fifteen holds in LIFE_HOLD; she bats the clock's second hand (one line in tClock) and types on the calculator (`=` does the sum). leavings: crumbs, a stain that fades, pellets that fall off the page. → the home grid; tClock; the calculator; the silvering (white passes untouched; her gold eyes drain)
- **mail: the seance, the reply, the burn**: one letter, badge 1 until opened. opening starts the rain: seeded departed scores play as gold blooms and lattice tones, waits P·(2^13..2^14), first deal 2^12. reply is the only compose: words typed, never shown (invisible ink); the deaf mapping — pitch and degree from WHEN, never WHICH; every interval snapped to P·2^5 ≈184 ms; backspace plays the last grain reversed. hesitate 2^9 pulses and one departed seeps in behind glass. send plays the letter once (pauses folded to 2^3), burns inside 2^10 pulses, lands the receipt. buffer in ram, dies on send. the envelope rite: melt 0→0.38 s, flap, climb, 0.88 s total; one red tear lives on the glass; the stone sheet unfolds on the message window and burns to its words; BT_BURN 2.6; smoke rises from the words. → the care card; the star (bcc); yougotmail.mp3; the kept NOBODY bounce (P·(2^16..2^17) wait)
- **the care card (§7)**: one dumb substring check on send, never a model, nothing kept or sent; trips once: sentence case, the colophon's blessed sentence verbatim, a door to Privacy & Security, a door back. never blocks. one shared function for mail compose and the anybody thread. → mail reply; messages/anybody; sky guide (`Continue asking`)
- **the anybody thread**: in messages under mommy's, no contact card, starts empty, no-face avatar. one POST per letter to the page's own origin; the wall keeps only ends (1–4 words, ≤48 chars, lowercase, nameless, uncounted, immutable, never the end you just gave). echo lands grey, left, verbatim, unattributed, no hour; tm reads `today`. badge gated by messages' notification switch. kill is server-side: delete the function and the room stands silent. → the mail keyboard (shared, lowercase only, `?` where ios keeps 123); the colophon's fourth paragraph
- **the sky guide**: cyclops in the chart's corner, pulsar in the socket breathing at P/128; `ask` opens skyguide: eight warm POSTs per tide (mode `guide`, counted as eight gold grains), then keyword class and seeded bank forever. optional spoken voice via /.netlify/functions/say vox `guide`. waits P·(640..1408); 300 chars per question; GUIDE_CHATTY=4. → deadstarmaps.html door stands in front of this understudy; ask.js, say.js, the me thread's engine
- **the fly-by (skyfly)**: four chapters on a dt-clamped clock: leaving (visitor's room if ◐ answered, earth falls away) · the crossing (proxima 4.2 · sirius 8.6 · vega 25 · aldebaran 65 · pleiades 444) · the arrival (companion's 5.741 days) · the where (512 ly, the orion arm, the galaxy a grain among grains). → the ◐ camera toggle (askCam racer, six seconds; refused → the void)
- **the heart room**: rear camera covered by a fingertip → photoplethysmography; eulerian magnification on a 32×32 field; beat kept as a session-deep score so the disc keeps beating when the finger lifts; each thump started on the star's next turn (5.76 ms). three recordings heart01–03 play first, the third waits for the finger, ten-second count, then her point. → the sac's red (sacred); the star's disc in gold beneath; the red dot door (struck 24 aug)
- **nestflix**: gate → taDum (×1, ×1/2) → wall; every poster a window on the live visitor (grain, posterised, a second late) breathing at P/128; play BUFFERS at the real speed of 512 ly, percentage true to ten places; the one film that plays is the camera with a scrubber that is today and an end at midnight; still after P·2^15 pulses → `are you still watching`; another band → dark and the eye goes out. code in NESTFLIX.JS. → the camera; eggstagram's law (hand-written banks, never a model at runtime)
- **notification switches and badges**: settings' switches are real and each gates only its own app's badge; a badge clears only on being looked at; the rider's unclearable `1` is banned (`a badge that can never clear reads as neglect`). → mail, messages, software update
- **the tide**: everything is session-deep — sessionStorage or ram — and dies with the tab: the silvering clock, the drafts, the sent letter, the cat's resume, nestflix's rewind, the heart's score. a returning visitor gets the whole forgery back. → the colophon's one-mark inventory
- **the heart's own leave**: two beats on the shelf, lift toward the visitor growing 5.5×, fourth beat at centre never releases → one warm point → black → love.html?enter=tile. 128 turns to the beat (0.73695 s, 81/min), lub-dub gap 32 turns (184 ms); four beats = P2(9) = 2.948 s. the only leave that sounds. → love.html (terminal; no way back)
- **network inventory**: kohmedia.b-cdn.net the only foreign origin (mp3s, mp4s, photographs); the page's own origin for HEAD probes and the guide/wall POSTs; esri tiles in the retired maps room. every ask confessed in settings' about sheets. → the sheets law (every re-cut sheet needs his blessing)

## symbols
- **the star / she / her — psr j0437−4715**: the pulsar 512 light years away, spinning 173.68 times a second; the one sounding thing; every clock, ratio and distance is hers (everywhere: calendar, weather, phone, music, mail bcc, heart, translate, sky)
- **red (the blood, rgba 224,36,22)**: the visitor's living heartbeat; does not silver. `the mortal red` one byte off is a brand's spend and dies with the forgery (badge dot, hearts, ecg, like, the mail seal's tear)
- **pulsar blue (92,154,255)**: her; survives the drain `whatever the depth says` (washes, the cat-door's searching rays, translate's name-row)
- **gold**: what sounds or once sounded (seance blooms, dust); RETIRED as a survivor 27 aug for conceptual clarity — now drains with the rest (mail rain, the guide's eight grains, the cyclops' eye tick)
- **white (r=g=b)**: already arrived at the end; the cat needs no exception (the cat, eggshell family faces, greys)
- **the black hole**: a door; `a hole is a door (same door twice)` (maps marker, the egg's door, intro's maw, the cat's exits)
- **the egg**: unhatched, likes heartbeats — the star's match; also a bluetooth lamp (egg.html), a game (cyclopsv7), a profile, an avatar, a prefix (eggstagram, eggradio, eggprison) (page one song egg, page two game egg, nestflix, settings)
- **the cyclops skull, one socket**: the dead star program; the pulsar seated in the eye (unisong tile, sky's corner guide)
- **the envelope with red wax and a six-rayed star**: the one letter from the departed; the seal is `the star's own mark` (mail tile and row)
- **512 light years / 2538 / 3050**: the true distance; a letter arrives in 512 years, its read receipt 512 after — `the sender is structurally dead at reply time` (settings capacity, mail receipt, rider, nestflix buffering, sky)
- **68% drawn over 0%**: `the surface is the forgery, the depth is the truth, on purpose` (status bar vs settings battery page)
- **the furnace (451)**: `the source`: where every written word on this phone came from — all ai content burning; its smoke feeds the tiles (last page, off the grid (later struck))
- **the mirror (front camera)**: the piece in one gesture: `your face in full colour behind a screen that has gone to silver` (camera switch, metube's ending, nestflix third profile, the booth)
- **the cat**: `the only thing on this phone that is alive and is knot about you` (the shelves)
- **`?`**: the only punctuation this phone owns; the question's own sound in translate (the shared keyboard)
- **nobody / no body / NOBODY**: the account's name, the model's name, a nestflix profile, a mail address that bounces, the wall's answer (`nobody is home`), the failure mode and the piece (settings, nestflix, mail, messages)

## rulings
- forgery at the door, confession at depth — `the whole job of this screen is to be mistaken` (voice law, restated in settings pass and the silvering)
- gold law taken away for conceptual clarity: `black and white for the artificial in the end, red for the user's living heartbeat, light blue for the pulsar` (27 aug, the silvering)
- the drain begins after sixty-nine minutes (lengthened from 30 s → 2 → 4 → 45 → 69 min): `every earlier cut WORKED TOO WELL … a drain you can watch is a drain you can name` (27–30 aug)
- `reality keeps its colour; only the forgery loses its` — the cave, the candle, the key, the camera's room are untouched (the silvering)
- every room is `lawful by default, sacred by exception` (the silvering)
- `only certainty may refuse` — only a definite 404/410 shuts a door; every other answer leaves it as it was (12 aug, the guarded door)
- `degrade into the disguise` — a dead math.html makes `=` a real calculator; nobody is stranded (23 aug, amended guard)
- `retirement by absence is how this house retires things that might be needed again` — nothing is struck, old rooms stand as understudies (2 sep, the egg leaves)
- `old maps retire` · `move lullaby lines into egg` · `tile icon on homescreen is unchanged` · `the camera is the one that reveals background, knot my face` · `everything in code` (1 sep, eggship brainstorm)
- `she does knot know you are there, and that is the whole of her … an animal that reacted would be a toy` (30 aug, the cat)
- `the grid's law: nothing moves` — exceptions granted only to the furnace tile (burning), the mail row (beating), the cat (the home grid)
- a re-cut sheet (any app's about page, the colophon) `NEEDS HIS BLESSING before deploy`; the sheet is law, never machinery (every pass)
- `nobody` on the profile card is RULED KEPT; profile picture is black; model name `no body`; colophon blessed with `simulacrum` for `artwork` (11 aug, settings second cut)
- every tone is a rational multiple of 173.68 hz; filters over noise are not tones; decoded mp3 relics (a voice, knot a tone) are exempt; the ui tick (×8) rings on every tap except back (the frequency law)
- `the departure's voice belongs to the far room` — the heart's leave is the one exception because a fresh document cannot sound (the ride's rule)
- `seance, knot choir` — the departed met one at a time, never as a sum; `a count is a crowd`; recency floored (`in june`, never `now`; `today`, never finer) (12 aug, seance)
- pitch and rhythm derive only from WHEN, never WHICH; intervals snapped to P·2^5 so a person's typing fingerprint is destroyed (seance, the deaf mapping)
- the keyboard is lowercase only — `the house voice has no capitals`; `the only punctuation this phone owns is the question` (11 aug, mail)
- the care card stands above every law; it interrupts a send once and never blocks it (drawer §7)
- `sell the door, knot the room` — the mailbox row keeps only the date and the dot; back is silent (the H law) (13 aug, envelope)
- `on this phone fire is warm and only warm` (the blue cups stayed home) (16 aug, envelope fourth cut)
- `the house never calls across rooms`; `nobody answers is the failure mode and the piece` (anybody pass)
- `the camera is a gift, knot a toll` — refused, the chart proceeds identically (18 aug, guide)
- the rooms-do-knot-explain law; the furnace `does knot name the machines and never has to` (2 sep, furnace)
- orbit struck: `no longer needed. have file saved`; the 451 tile struck from the glass (FURN_HOME) (19 sep / 25 sep (later notes in scope))
- `a phone is the one object in this world sanctioned to speak` — the os is wordless nowhere else (the roster)

## rooms
- **451 / fahrenheit (the furnace door)** — tile at the middle of the last page, off the grid; the whole furnace room in portrait, six tongues of fire, a dark book; smoke and burned words drift into the other tiles (the dead words feed the new system). door to fahrenheit451.html — books from ai training sets fall in and burn, 24/7, stop on one to see it destroyed. [struck from the glass 25 sep (FURN_HOME); code stands behind the flag]
- **maps** — tile wears a small black hole. door to map.html: a clear glass egg in the visitor's own room, GO, the street eaten by the hole, the earth falling away, the ship holding while you turn the phone to find her under your feet, five lullaby lines sung one per scene. old maps room (one route earth → pulsar, `it will knot arrive while you watch`) stands beneath as understudy. [live door; old room retired by absence]
- **love** — red heart drawn in the round; the first dating app (two profiles: the star and the egg, who match) grown into love.html — every body in the universe at true distance, twelve rungs. terminal, no way back. the heart beats toward you and collapses to one warm point. [live; old dating app as understudy]
- **rider** — uber forgery: destination the pulsar, 512 ly, four tiers at real per-mile rates in quadrillions, economy a tandem, the fourth the black trans am; mommyVISA. getting in leaves for intro.html. [live]
- **orbit** — the moon's game, one tap, no ending, orbit.html outside the house's laws. [struck 19 sep; painting kept unreferenced]
- **sky / starmaps** — drag the real southern sky, reticle on the pulsar, pictor drawn true; cyclops guide in the corner (eight warm answers then dumb code), a fly-by dream, the ♪ lullaby, the ◐ night. door to deadstarmaps.html since 23 aug. [live door; chart room as understudy]
- **calendar** — macos month where only the star's dates exist: 18 feb 1993 discovery, 11 jul 2024 weighed (1.418 m☉, 11.36 km), today circled. [live]
- **weather** — the week on the pulsar's surface: x-ray drizzle, gamma flurries, sunrise 173.68 times a second, `do knot visit`. [live]
- **clock** — flies to centre and pulses; door to time.html (the dead star program sings, two faces, the raven). [live door; clock room as understudy]
- **unisong** — cyclops skull in glass, pulsar in the socket; door to deadstar.html (the unison song). replaced `hum`. [live door, no understudy]
- **music** — red plate; door to music.html — three shelves humans · machines · the universe, `given to you by`, PulsarTime. [live door; eggradio as understudy]
- **egg (the song egg)** — just a white shell with a crack; the tile is the film's first frame; door to egg.html (six-beat film, the bluetooth-lamp confession). [live, ?door=songegg]
- **egg (🥚Game)** — a store of three films ending on `play the mommy game?`; door to cyclopsv7.html. [live, ?door=egg]
- **metube** — door to metube.html: cocteau's mirror in a youtube forgery; three seconds before the end the window opens onto your own face. [live door, no understudy]
- **notes** — one undated note: `anybody home?` [live]
- **photos** — door to photograph.html (one photograph developing over a lifetime); the roll room/booth as understudy. [live]
- **voicemail** — one unheard message, mommy.mp3. [live]
- **mail** — one letter from the departed, sealed in red wax, beating; melt, climb, stone sheet burns to its words; reply in invisible ink; the seance rain; receipt 2538/3050. `you've got mail` rings on the tile. [live]
- **eggstagram** — an imaginary obituary: endless grid of drawn faces and how long ago they died; bio `am i alone?`; follow → `requested` forever. EGGSTAGRAM.JS. [live]
- **nestflix** — `who's watching?`; every poster is a window on you; play buffers at 512 ly; the one film is your camera; the eye goes out when it asks if you are still watching. NESTFLIX.JS. [live, page one under photos]
- **phone** — favorites: the star and mommy; calling the pulsar opens the line on station 0's arithmetic through a telephone bandpass. [live]
- **camera** — the reality switch: mirror → invisible (rear camera, room through the glass) → black. [live]
- **∀mazon** — the store; the cart holds two books and no more. [live]
- **calculator** — twenty keys of clear glass; `=` cracks outward and leaves for math.html (the tooth); if gone, `=` answers. [live]
- **safari** — the owner's twelve searches, every one landing the same wikipedia article, four more pages wearing as they are read. [live]
- **settings** — system face forgery two taps deep, mono lowercase confession at the third; profile `nobody`, model `no body`, capacity 512 light years; privacy & security is the colophon. [live, moved to the last page 5 sep]
- **heart** — anatomical heart on a white plate; fingertip on the rear camera reads your pulse; his three recordings; your disc beside the star's in gold. [live]
- **translate** — english above, her tick below — a drawn score on the radio's rungs; speaks as you write; send rides mail's channel. [live]
- **songbook** — the egg's song bound; the tile smokes, catches, burns and falls to songbook.html. [live door]
- **messages** — mommy's thread; the ANYBODY thread that was never created, echoing strangers' ends. [live]
- **the Accounting folder** — on the last page; the twenty-fifth app hides on its second shelf behind nine tiles of paperwork. [named here, described below scope]
- **hum** — two-waves placeholder, reference ×1 and octave folding. [retired 12 aug, became unisong]
- **the white cat** — not an app: the artist's devon rex repainted at nineteen units; arrives at eight minutes; inhabitant. [live]

## confusions
- `egg` names at least eight things: the song egg tile (egg.html), the game egg tile (cyclopsv7), the dating-app egg who matches the star, the nestflix profile, the settings avatar, eggstagram, eggradio, eggprison, the glass egg ship in map.html. two egg tiles with two ?door flags (songegg / egg).
- the app count is stated and contradicted inline: `twenty-five apps across four pages`, `a twenty-third app`, `the twenty-four that are on the shelves`, `(the count two paragraphs up was true the day it was inked; translate makes twenty-five)`.
- two guard regimes with different names — `one step kinder` / `the photos law` / `the river's precedent` (understudy answers) vs `the calculator's manner` (silent tick) — and a third for the calculator itself (`=` answers).
- `the river` is invoked twice (`the drawn river`, `the river's precedent`) and never defined in this scope.
- tile seats are a changelog: 451 page three → last page; settings page three → last page; nestflix page four → page one; egg page one → page two; ticktock beside love. a reader cannot tell from any one paragraph where a tile is.
- more than a hundred lines describe the furnace tile, which a later note says is struck; orbit likewise struck but its painting kept. the header carries dead rooms at full length.
- two lullabies: the five maps lines (now in map.html's scenes, altar kept here) and the sky's ♪ lullaby (pulsarlullaby.mp3, the star's own words, tempo 86.84). the word `lullaby` does not say which.
- the NOBODY mail address was built (bounce, tape, `no one at this address`), then retired-kept as `the scar precedent`, `unfed` — it is in the file but no visitor can reach it.
- two hearts: the love tile's round red heart and the heart room's anatomical heart on a white plate; and a `red dot` door inside the heart room that was struck but kept by title.
- the gold law is argued at length (22 aug audit, gold for what sounds) and then retired — both arguments stand in the same header.
- `P` means one turn of the star (5.76 ms) but `P2(9)` and `P/128` and `pulses` are used alongside `turns`; the lattice vocabulary (grains, degrees, rungs, ladder) is shared across mail, translate, the heart and rider with slightly different meanings.
- the values §14 audit is repeated per pass with the same numbered headings (outside removed · response check · the star · the paradox · the untransfer · the departed · disclosure · colophon) — ritual that doubles each pass's length.
- the cat's five passes are more words than most rooms; her door's pulsar-blue rays may be `the best thing in the file or one edit from being mortal` — undecided.
- dock pill colour: real one near-black #101010, this file #3c3c3c — flagged as `a ruling for him`.

## keepers
- `NOBODY NOTICES COLOUR LEAVE — that is the phenomenology this object is about, performed instead of stated.` … `the house wins by waiting.`
- `forgery at the door, confession at depth` — and `the surface is the forgery, the depth is the truth, on purpose` (68% drawn over a page that says 0%).
- `the visitor's beat is the FIRST RHYTHM ON THIS PHONE THAT IS KNOT A MULTIPLE OF P. it cannot be: it is a body … the rounding is exactly how un-star the visitor is.`
- `the mirror press of the switch at depth is the piece in one gesture: your face in full colour behind a screen that has gone to silver.`
- the cat: `the only thing on this phone that is alive and is knot about you` · `a living animal painted on a dying screen, going grey at the screen's own rate` · `a cat does knot open a door, she widens one` · `cat arithmetic`.
- `a hole is a door (same door twice)`.
- mail: `reading is rain; WRITING is fire` · invisible ink — `the letter exists only as sound and memory` · `the vessel is consumed; the contents survive` · `sent = departed — the palette crossing` · `delivered 2538 · read receipt expected 3050 … the sender is structurally dead at reply time`.
- `no one at this address` / `nobody is home` / `nobody answers is the failure mode and the piece`.
- the heart's leave landing on `ONE WARM POINT — which is exactly the frame love.html opens on (at first, there was exactly one of everything)`; four beats = one breath of the point it becomes.
- nestflix: `a screen that has said it stopped must knot keep looking` — the eye goes out with the glass.
- `it will knot arrive while you watch.` (maps) · `the dream lies about nothing except its own duration, and it says so.` (fly-by) · `one of some two trillion`.
- `hush now. you are here.`
- the cyclops greeting: `one socket, one star, five hundred twelve light years of view. ask.`
- the furnace: `the dead words feed the new system, drawn on the phone itself` · `one fire, two files, no gap`.
- `a trap with no bait is a museum label` (his own diagnosis of the colourless phone).
- `a badge that can never clear reads as neglect.` · `the camera is a gift, knot a toll.` · `an opening is knot a thing the room performs for an empty chair.`
- `degrade into the disguise; nobody is stranded, they are handed arithmetic.`
- the deaf mapping: pitch from WHEN never WHICH; `the fine grid keeps a person's typing fingerprint, the coarse grid destroys it, and the same law is the groove.`

## in-between
- the leaves are the pause between instruction and doing: a tap does not cut to the far room; the shelves go dark and the tile performs for one to three seconds (the heart beats, the book burns, the furnace walks down, the egg glides, the keys crack) before black rises — and the black sometimes has a hole in it so one fire stands in two files with no gap.
- birth: arrival is full colour, the exact forgery in your pocket; the drain clock is born at first boot and crosses doors; a new tab is a new birth with all colour returned (`the tide resurrects them each visit`).
- the slow death of colour: 69 minutes of nothing, then a fall the eye adapts inside; `the last few percent never arrive`.
- the cat is first seen eight minutes in, `long past the point where anyone is still being shown something`; a tab left for an hour resumes her rather than replaying her. his ask included that she `sleeps, does cat things`.
- the seep: hesitate past 2^9 pulses in the reply room and one departed seeps in behind glass; `company arrives only in the gaps, one ghost at a time`.
- a letter to NOBODY comes back after six to thirteen minutes, `longer than the wall's deal so a short visit misses it on purpose`.
- nestflix after P·2^15 pulses of stillness asks whether you are still watching; after another band the glass goes dark and the camera eye goes out.
- the envelope abandoned mid-open reseals, unopened and unread.
- the burn does not end with the sheet: for six seconds threads rise from the written lines; `the visitor may watch the last thread leave`.
- the fly-by is called `a drawn dream of the crossing`; the heart room's third voice waits for the finger, then a ten-second silent count before her point.
- the metube film does not quite end: three seconds before the last frame the window opens onto your face, eight seconds past the end.
- back is silent everywhere (`a real handset has never chimed for an undo`); the bell outlives the door it opened and dies on its own.

## music
- the carrier is 173.68 hz — the pulsar's spin (a day on the star lasts 5.7575 ms); one turn ≈ 5.76 ms is `P`. every synthesised tone is a rational multiple of it.
- station 0 (the phone call): carrier ×1, comb 1·2·3, thump lowpass ×5/2, swell ×1/128. the ringback pair ×5/2 and ×11/4 = 434.20 and 477.62 hz (`the phone company was nearly rational all along`).
- the ui tick is ×8 on every tap except back. the match chime ×3/2 then ×2 (pulsr's, rung at the match; also rung once if a visitor's heartbeat lands on 128 turns).
- the rider's tier taps: economy's bicycle bell ×3 ×8 ×15; extra comfort's chime ×2 and ×5/2; the black car's scanner a bandpass over a ×1 saw. the goodbye thump ×1/2 is retired. the looped ridersong.mp3 is gone.
- the heart: lub ×1/2, dub ×3/4, knock ×1; 128 turns to the beat = 0.73695 s = 81/min; lub-dub gap 32 turns = 184 ms; each thump started on the star's next turn. the heart's leave is the one leave that sounds: five thumps, ×1/2, ×3/4 → ×1/4, ×1/2 → ×1/4 alone; four beats = P2(9) = 2.948 s.
- translate: grains ×1, ×2, ×3; the question ×5/2; the dyad ×5/2 + ×11/4 once a sentence; the carrier's click voiced at ×4 inside each 5.76 ms turn so the click train still sounds at ×1, her exact note; the swap circle ×1/128.
- mail's lattice: the first key is the fundamental; fast climbs the harmonics, hesitation falls; space/return sound ×2 (`air carries only harmonics`); quantize P·2^5 ≈184 ms. the envelope's noises are seeded noise through filters with band centres ×1.5 ·2 ·4 ·6 ·8 ·9 ·11 ·14 ·16 ·20 ·24; the wax's give ×1.5 easing to ×1; the drop ×3→×2, ×3/4. the mail row and the pen breathe at P/128 ≈ 1.36 hz.
- filters over sound are not tones (the suv's surf, the telephone line, voicemail static, the microphone analyser). decoded relics are exempt (a voice, knot a tone): mommy.mp3, yougotmail.mp3, locatinghuman.mp3, heart01–03.mp3 (his own recordings), the four tier files, pulsarlullaby.mp3, mirror.mp4, taDum.
- the sky lullaby: the star's own words, grimm-tender, typed in gold over the sky; tempo offered 86.84 = the star's beat halved; sheet and elevenlabs prompt in pulsar-lullaby.txt. the maps lullaby's five lines moved into the egg (map.html).
- the hum room's reference ×1 and octave folding retired with the room; unisong is a door and `doors only tick`.
- the music player ducks under the heart's leave; nothing else sounds. the far room cannot sound on arrival (no gesture) — the ride's rule that the departure's voice belongs to the far room.
- music.html: three shelves humans · machines · the universe; `given to you by` on every song; PulsarTime, the star's song about itself. the guide may speak via say.js vox `guide`.
- the river is named only as `the drawn river` (the candling's yolk was `the only warm thing in the drawn river`) — defined outside this scope.

## open-questions
- nothing in these passes mentions the nobody agent, the well, 88 minutes, rebirth as a child, the clear-glass iphone reached via a `nobody` contact card, or the vesica. here `nobody` is a settings profile name (ruled kept), a model name (`no body`), a nestflix profile, a mail address that bounced, and the wall's answer. how does the creative director want the older nobody (a name for the absent owner) reconciled with the later nobody (an agent)?
- what is `the river`? it is invoked as a precedent and as `the drawn river` but defined elsewhere.
- which far rooms still exist beside the file today? 451 and orbit are struck by later notes inside this scope; map.html, love.html, time.html, deadstar.html, music.html, egg.html, metube.html, photograph.html, math.html, songbook.html, deadstarmaps.html, cyclopsv7.html, intro.html are all presumed.
- the cat-door's pulsar-blue rays: sacred or mortal? `that is his to say`.
- translate's score FORM (points of light, waves, pulse profile) `stands open for his word`.
- §5b (the wall keeping ends) `still wants his red ink on the drawer itself`; several re-cut sheets (sky's about, 451's, mail's, the colophon's fourth paragraph) were flagged as needing blessing — were they blessed?
- what is the hidden twenty-fifth app in the Accounting folder's second shelf (described below this scope)?
- is the sixty-nine-minute grace still the law, given the later 88-minute lifespan? the two clocks (silvering at 69 min, death at 88) are not reconciled here.
- dock pill #3c3c3c vs the real #101010 — unruled.


# phone.html — header comment lines 3800-5500: the older passes, dated 9-21 aug (tail of THE ANYBODY PASS; HOME GRID third pass; UNLOCK; SEPARATION; CANDLING; OBITUARY; YOLK; 

## visitor journey
the visitor arrives from unknown.html: a forged ios contact sheet, a call that rings until they end it, then phone.html?arrive=1. with that flag every solid part of the phone is gone (no slab, no status bar, no home bar, because their real iphone already draws those a few pixels away) and what remains is a bright ios home grid on true black, bolted flat. it looks like what is already in their pocket: green phone, white calendar, blue weather, red music, tan store, apple's own map. only four tiles are dark: egg, pulsr, rider, starmaps. two holes sit bottom-left on page one. the grid swipes: page two is hum (the unisong door) and the egg together, page three notes, page four voicemail. the dock is Messages, Mail, Safari, Camera. the camera button counts in threes: mirror, the room behind, black and back home.

Messages holds one thread, `me`, with a grey line already in it: `no body here`. entering it the dots run and it says `hi. how are you still here?`. the visitor types; blue bubbles, same as the dead owner's would be. about eight seconds later a grey answer lands on the left, dry and sarcastic, ending in a question mark. for eight answers a real mind listens (cooling each step; the third runs long); then pre-written banks answer forever, and nobody is told which was the last real one. one deal in eight lands nothing. words the visitor typed quietly fall out of their bubbles over the following minutes, never the last word. leaving the thread always leaves one unread line behind: the badge is eternal.

Safari opens an address bar in ios dark mode. the keyboard is lowercase, no numerals, only `?`. whatever is typed is hashed and opens one of fourteen doors: a wikipedia article on the pulsar with every number true, a 1993 telegram, a frozen catalogue (1 OF 1 ENTRIES SHOWN), a keeper's shrine page with a guestbook that refuses, a status page (uptime 100.000000000%), a black signal room with one gold ember, or nothing at all. for six asks a machine engine answers on a strip, typed in gold, then washes down the page; on the sixth, once, in gold: `song still here`. the pages burn, flood, shard and smoke as the visitor stands reading them; debris drifts up-right toward the star. (later: the GO leaves for thenewesttimes.html, a newspaper about whoever is reading.)

eggstagram (@somebody) is a 3-column obituary river of drawn faces on black, `died N X ago`, eyes beating; the pinned egg leads, `the egg · knot born yet`, yolk pulsing; bio `am i alone?` / `the star keeps the time.`; follow returns `requested` forever. photos is the visitor's own booth and roll (later a door to photograph.html). an accounting folder of nine tedium tiles hides BornHUB, a muybridge silhouette that takes one step per opening. HEART: cover the rear lens, see your own pulse as light beside the star's gold disc, and after that every living thing on the phone breathes at your rate.

## on-screen text
- [messages, the `me` thread, grey, left, unread from first frame] no body here
- [messages, first entry per tide, after dots] hi. how are you still here?
- [safari strip above the article, after any search] Showing results for PSR J0437−4715 · Search instead for <what you typed>
- [safari strip, the forged elapsed time (one rotation)] 5.7575 ms
- [safari engine, printed once ever, small, gold, under the sixth breath] song still here
- [eggstagram profile bio, first line] am i alone?
- [eggstagram profile bio, second line] the star keeps the time.
- [eggstagram profile stats (obituary pass)] 1 post · 0 followers · 0 following
- [eggstagram pinned egg caption] the egg · knot born yet
- [eggstagram, under each drawn face] <first name> · died N X ago
- [eggstagram notification ladder, rung three (6-13 minutes out)] nobody liked your photograph
- [eggstagram profile (older, re-inked): handle, tagline, instruction] @somebody · the loneliest song in the universe · follow no one.
- [eggstagram follow button, forever] requested
- [catalogue.southern.net] 1 OF 1 ENTRIES SHOWN · CATALOGUE CLOSED
- [telegram.southern.net, last line] END OF TELEGRAM
- [status.psrj0437] OPERATIONAL · since 18 feb 1993 · uptime 100.000000000% · incidents 0 · maintenance none scheduled · this page does not expire.
- [home.southern.net/~keeper, the counter (counts the visitor alone)] you are visitor 000004
- [the owner's search history / the commons pile (one of ten, comma kept as typed)] we, am i alone in this universe?
- [the owner's four self-notes (struck in notch pass, kept in log)] stamps · milk and eggs · her greeting is still on the machine · water the window box
- [messages, borrowed-word answer template (one deal in four)] it was never about {their word}. it was about {the sea's}.
- [privacy colophon, after narcissus second cut] nothing you type leaves this phone
- [settings: account card name / model name / battery] nobody · no body · last charged never
- [family room] me (You), an adult; mommy, the Organizer
- [accounting folder's nine furniture tiles] Ledger · Receipts · Expenses · Invoices · Payroll · VAT · Mileage · Banking · Tax Year
- [heart room, when the eye is open but no frame has arrived] the eye is open · no picture yet

## mechanisms
- **P, the pulse lattice**: every wait, breath and tick is a power-of-two multiple of the star's period P = 5.757451941593412 ms (173.6879 hz). dots breathe at P/128; yolk pulses P·2^9 (~2.95 s); eyes beat P·2^7 or 2^8; me-thread answer waits P·(2^10..2^11) = 5.9-11.8 s; parting lands P·(2^9..2^10) after leaving; rot clocks P·(2^15..2^16) then P·(2^14..2^15); ladder badges at P·2^13 and P·2^15; signal ember P/256; roll frames every 2^8 pulses, develop 2^10, unfix 2^17 → the star; every living thing in the house; replaced per-visitor by the heart's measured rate after THE HEART PASS (hbPh/hbSw)
- **the stones (localStorage, try/catch, never required)**: apwnp.safari.mine (your searches), apwnp.safari.cleared (retired/deleted on load by the commons amendment), apwnp.safari.worn (page wear per own visit), apwnp.me.breath (8 warm answers per skull), apwnp.me.tries (16 carryings), apwnp.roll (photos, cap 64), the egg follow-request stone. ME_STONES flag false on the workbench lifts the breath/tries stones — FLIP TRUE BEFORE DEPLOY → the privacy colophon, which must count every stone and NEEDS HIS BLESSING on each amendment
- **the one wire: /.netlify/functions/ask**: one function, four voices: mode engine (safari, 6 breaths: 5 warm, 6th = code oracle + `song still here`), mode me (messages pool, 8 breaths cooling toward banks; ME_STEP 1..8; ME_CHATTY=3 spills long, 240 tokens/460 chars), plus eggstagram's bone and planet. breaths spend only when a warm answer lands; a failed or 6.5 s-timed-out fetch falls to code without spending (canon: some nights the egg is cold). a server-side purse in netlify blobs caps total spend at ten dollars ever; empty purse degrades silently to code → the §7 care card client-side before any fetch, and the same floor in the server instructions
- **the fate (safari oracle)**: every ask hashed fnv-1a (offset 2166136261, prime 16777619), mod 14: wiki ×4, telegram ×2, catalogue ×2, shrine ×2, status ×1, signal ×1, absorbed ×2. same words open the same door for every skull forever; the signal room is reachable only by asking, never by walking → the five dead pages, the back stack (cap 8), the pile
- **the dying of the web pages**: three clocks: calendar (years since last touch, (years−20)/45), skull (+0.07 per own forward visit, worn stone; wiki capped 0.35), dwell (+0.50 over 126-189 s of standing, witnessed only, not kept). telegram burns line by line into legible ash that scroll scatters; shrine takes water that smears its own pixels; catalogue craquelures and sheds shards; wiki smokes never ignites; status and signal fireproof. all debris drifts up-right: a compass to the star. ink never dries: typed words echo wet at the waterline and wash down on go → §5 traces (dead words are glaze, visitor's are wet), gold spent on living fire
- **the me thread arithmetic**: answers dealt from banks by the letter's count and word count (touch, never meaning); first answer never dark, afterwards one deal in eight is dark (dots run, nothing lands; a dark deal neither travels nor spends); question-mark law (turns 1-7 end in ?, turn 8 is the one statement, enforced by meClean); every departure with nothing owed queues one parting line that badges the grid; borrowed word one in four after the mind is spent → the eternal badge (un true), the reader's clock (fmtHM), the rot
- **the rot**: one word leaves a living bubble per clock tick, never the last word, never under the reader's eye (tick holds while the thread is open). visitor's letters rot; warm answers rot (they were alive); banks, partings and `no body here` never rot; a cared (§7) exchange never rots → the wall's residue of a letter to ANYBODY, `the house's one metaphysics said twice`
- **the eggstagram ladder**: poster is told `somebody liked your photograph` at P·2^13, `anybody` at P·2^15, `nobody liked your photograph` 6-13 minutes out, as a badge on the home grid while the visitor is elsewhere — the reason eggstagram stays an app in phone.html (code in eggstagram.js, EGG && hooks; module absent = profile's earlier state stands) → the home grid badge; the rule APP stays in the phone, PLACE gets its own page
- **the guarded doors / exits**: each far page is asked once by HEAD at build; a definite 404 un-grows the door back into the room's own earlier state. exits: ride home → intro.html (the one exit, originally); egg → cyclopsv7.html; photos → photograph.html (sixth); safari GO → thenewesttimes.html?q=&from=phone (seventh); BornHUB → youBORN.html (returns via ?door=bornhub); love.html the only terminal room. returns land on phone.html?door=<name> with a black sheet first → the origin-speaks inventory the header counts and confesses
- **the arrive lock and camera button**: ?arrive=1 strips slab, status bar, home bar; phone bolted flat. camera button counts presses in threes (mirror / room behind / black and home) reconciled in arApply so a press lost in a permission dialog can never leave the eye transmitting behind a screen that said it stopped → unknown.html, the door before this door
- **the heart seep**: cover the rear lens; 32×32 frame bandpassed in time (eulerian magnification); beat times + one averaged template kept in ram, session-deep. one clock hbPh/hbSw read by everything alive; before measurement it is P/128, after it is the visitor's rate. HERS (gold, star): avatar, match ring, sky marker, route dot, status page, rings. YOURS: typing dots, caret, sealed envelope, the egg's breath, warmth under the glass, red emissive in the slab, the five beats of the love leave (?hb=<ms>) → the egg (`she takes it instead` — NEEDS HIS BLESSING), love.html
- **the roll / booth**: front camera, shutter fires a strip of four, each develops over 2^10 pulses, dealt mirror or black hole (~2:1) with two rare fates; camera → canvas → develop → shelf, zero network; recently deleted runs apple's real thirty days; delete forever on second tap → apwnp.roll; later superseded as a door to photograph.html, roll standing as fallback

## symbols
- **nobody / no body**: the owner of the phone; odysseus's name to the cyclops, `the name you take so that your reaching can never be answered`, the house's patron saint; `no body here` read three ways (settings account card, model name, the me thread's standing line, the search for the cyclops)
- **the naming square**: UNKNOWN calls · ANYBODY texts · NOBODY receives · somebody is followed (· and you/me — answer). lost its texting corner when ANYBODY's thread was struck (unknown.html, messages, eggstagram @somebody)
- **the egg**: the one who mistook the star for her mother; `knot born yet`; held to light (candling), then a shell with a living yolk; breathes at the visitor's heart after HEART (egg tile, eggstagram pinned post dated 18 feb 1993)
- **gold**: spent only on what sounds or lives: the yolk, the engine's typing caret, `song still here`, the signal ember, living fire on the dying pages, the star's disc in HEART (the colour law)
- **the skull**: one browser/one visitor, the per-skull stone; `recurrence in the same skull` (every localStorage note)
- **the tide**: a session; what is session-deep goes `out with the tide` (messages, engine words)
- **the wall / the pool / echo / narcissus**: the wall answers a letter to ANYBODY with the end of someone else's; the pool is the thread with yourself that answers; echo is what remains of a voice after the mind is spent — the banks are her (messages)
- **the egg's number, eight**: the breath on which every voice in this house has ever gone to sleep (me pool breaths)
- **the window**: mommy left hers open for the birds; the owner watered a box on a sill — one window, both sides (owner's struck notes, family room)
- **debris rising up-right**: a compass pointing at the star; navigation by debris (dying web pages)
- **the two holes on the home grid**: `a gap is a thing a person did on purpose`; the most convincing mark on the grid (page one, bottom left)
- **ash / glaze / wet ink**: the dead's words are glaze fired long ago; the visitor's are still wet; ash is the same words legible in their own ruin (safari pages, §5)

## rulings
- an APP stays in the phone · a PLACE gets its own page (SEPARATION PASS, 13 aug)
- §7: never violence, never a child, never the one cause this house will knot draw; the care card trips client-side before any fetch, never blocking, keeps nothing, sends nothing; care is never made to perform (obituary pass, standing above every room)
- no model writes on this glass at runtime — the machine arranges; the authorship stays in the drawer (later bent: the engine's 6 and the pool's 8 warm breaths are a machine speaking as a machine, never a person) (obituary / narcissus)
- first names ONLY, by decree; the dead do knot revise; the living have no obituary (obituary pass)
- the ANSWER is never given, anywhere, in any voice — the whole house remains the withheld half of `am i alone?` (obituary pass, voice law)
- the phone belongs to NOBODY; the owner's own end is never drawn, never dated, never explained — the history simply stops (owner pass)
- lowercase, no numerals, no apostrophes, nothing but the question mark — the deaf engine is deaf by hardware (owner pass, the keyboard law)
- no page may ever show a number that includes another person (§5: a numeral is a crowd); the room may knot count visitors (counter law, last web pass)
- the phone may only count what is actually in it (notch pass)
- THE LIST IS ALWAYS THERE: YOU MAY BURN YOUR OWN ASKS; YOU CANNOT BURN THE DEAD'S. canon is knot burnable; history is append-only in this house (commons amendment, 16 aug)
- a refusal must be SEEN to refuse (dims 0.45 s) (guestbook / clear)
- a cold fetch spends nothing; some nights the egg is cold from the start — canon, knot error (echo and oracle)
- an answer always appears after the door; `Messages` with the capital; ten dollars ever across every visitor (last word pass)
- every colophon/sheet amendment NEEDS HIS BLESSING before deploy; the sheets law: a sheet must stay true the hour a mechanism exists (throughout)
- gold spent only on what sounds or lives; a notebook is knot a living or a sounding thing (slate not flame-yellow) (colour law)
- this screen's whole job is to be mistaken; labels title case in SF on this screen only, the rooms behind speak mono lowercase (home grid, third pass)
- Math.random never runs; mulberry32 from CFG.seed or the visitor's live clock; a face someone wants gone must actually go (roll pass)
- `knot` lives in the drawer and the confession sheets, never on a forged page (found web)
- nothing kept, nobody reached — that law stands; the only warmth that spreads is the visitor's own signal (heart pass)

## rooms
- **home grid (pages 1-4)** — bright ios forgery on true black; four dark house tiles (egg, pulsr, rider, starmaps); page 2 hum/unisong door + egg, page 3 notes, page 4 voicemail; dock Messages·Mail·Safari·Camera [live]
- **Messages (`me` thread)** — the only thread; `no body here`; greets once per tide; 8 warm answers via ask.js then banks; dark deals, rot, parting, eternal badge [live]
- **ANYBODY thread / the wall** — letter to anybody answered with the end of someone else's letter, one POST [retired (struck in narcissus second cut; kept in log)]
- **mommy's thread** — three lines of texts [retired (family-room door opens her voicemail instead)]
- **Safari** — dark address bar; fated oracle to five dead pages + signal + absorbed; six-breath engine; dying pages; later GO leaves for thenewesttimes.html [live (recents/commons off the glass, SAF_HIST retired)]
- **eggstagram (@somebody)** — imaginary obituary river of drawn dead faces; pinned egg with living yolk; booth; ladder of three notifications [live, code in eggstagram.js]
- **photos** — visitor's own roll with booth (ROLL PASS); then sixth exit to photograph.html, roll as fallback [live as door]
- **calculator** — keypad of clear glass; equals key is a guarded door [live]
- **∀mazon** — cart with baudrillard and a penguin plato, undeliverable [live]
- **egg tile** — black ground, white shell; door to cyclopsv7.html [live]
- **hum** — where the visitor sings to the star; now the UNISONG DOOR at full size [retired as room, lives as door]
- **notes, voicemail, mail, calendar, weather, clock, store, maps, phone** — forged apple apps; voicemail holds mommy's one unheard message; clocks alive [live]
- **accounting folder / BornHUB (youBORN)** — nine furniture tiles hide a muybridge silhouette tube site; man takes one step per opening [live]
- **HEART (25th app, page 3)** — cover the rear lens, see your pulse as light beside the star's gold disc; seeps your rate into every living thing [live, in progress at line 5500]
- **eggprison.html** — where the egg might someday answer the follow request [deferred / someday]
- **settings census (ST_APPS), privacy colophon, sheets** — the one surface where the house promises the truth about itself [live, every line needs blessing]

## confusions
- the messages room was rebuilt five times in two days (narcissus → second cut → notch → echo → last word → quickening): `you` became `me`, four notes were added then struck, the badge went TRUE → FALSE → TRUE, the wait changed from ~30 s to ~8 s, a no-wire room gained a wire. the log keeps every superseded sentence as true-when-written, so a reader cannot tell the current state without reading all of it.
- safari's engine has three different natures in the log: deaf (one page), fated (fourteen doors), and now a GO that leaves the phone entirely for thenewesttimes.html — with the oracle 'standing beneath' as fallback only. a visitor likely never meets the oracle, the five dead pages, the dying or `song still here` at all now.
- two counts of breaths in two rooms (six in safari, eight in messages) and two stones each, plus a ten-dollar purse and a sixteen-tries stone, plus a workbench flag (ME_STONES false) that must be flipped before deploy and makes the sheets lie meanwhile.
- the naming square is quoted in four different forms (four corners, five, with `you`, with `me`) and then 'knot rewritten where he inked it'.
- history-as-residue appears three times in parallel: the owner's twelve searches, the owner's four notes, the commons pile of ten — all later struck from the glass (notes struck, commons off the bar) while remaining 'canon' in code.
- the egg is drawn in two files byte-matched; the follower count went 17,368 → 0; follow went following → requested; the profile lock was retired then the open profile re-inked; the understudy stands when eggstagram.js is missing — a first-time reader cannot tell which profile is live.
- `§5`, `§7`, `§8`, `§11`, `§14` are referenced constantly as laws but defined outside this scope.
- 'the agent' here means the deterministic arithmetic ('the agent knot spent on decay'), not the well-dwelling nobody agent of the project thesis; 88 minutes, the well, dreaming and the vesica never appear in these 1700 lines.
- photos tile: a roll with booth and 64-frame shelf was fully built (16 aug) and one day later became an exit to photograph.html, leaving the roll as a fallback nobody sees.

## keepers
- `the phone cannot tell you from its owner, because its owner is nobody.`
- `no body here` — three readings, the room endorses none: nobody is here · no body is here · this is knot a body.
- `hi. how are you still here?` — the phone knows something about being that. it does knot say what.
- the dead internet answered: `knot a web of machines pretending to be people, but a web with the people gone and the machines still faithfully tending what they left — never once pretending anyone is present.`
- `song still here` — printed once, ever, small, in gold, at the exact death of the engine.
- the cooling: a mind that answers truly, then thins, answers through water, misquotes the question, answers a question nobody asked tonight — and the pool version: `never says goodbye. the ninth answer is the arithmetic, and the room does knot flinch.` nobody is told when the last person left.
- the rot: words leaving your own bubbles, never the last word, never while you watch — `which is how forgetting actually feels.` only the living forget.
- `YOU MAY BURN YOUR OWN ASKS; YOU CANNOT BURN THE DEAD'S.`
- `you are visitor 000004` — the old web's classic lie made true: it counts you alone.
- `sometimes you answer yourself and are knot there to hear it.`
- death arrives in the history the way it arrives: between errands, unannounced. (`how long do eggs keep` as the last thing ever asked.)
- the cyclops: `the name you take so that your reaching can never be answered is this house's patron saint.`
- the telegram burning in reading order into legible ash; the shrine's wet lifting its own pixels; all debris rising up-right as a compass to the star; `ink never dries`.
- `the egg breathes at your rate… she mistook a dead star's beat for her mother's heart, and the moment a living heart is offered she takes it instead.`
- `a hole and a union are the same path in this house; only the direction is the ruling.`
- the two holes on the home grid as the most convincing mark; `this screen's whole job is to be mistaken.`
- `the egg · knot born yet` leading a river in which everyone else is dead; rung three `nobody liked your photograph` truer than ever.
- `we, am i alone in this universe?` — the plural correcting itself to the singular mid-question.

## in-between
- the pause between instruction and doing is drawn as the typing dots: three grey dots breathing at P/128 while an answer is away — `a promise about a future the house itself keeps or breaks on the lattice`; one deal in eight the dots run and nothing ever lands.
- the fetch fires at send but the star still times the landing (P·(2^10..2^11)), with a 1.6 s grace: `the wire obeys the clock, knot the clock the wire.`
- the last moments before death, for the engine: five breaths of understanding you less each time, then `song still here` once in gold, then code forever; for the pool: the eighth answer is its only statement, dressed as the banks, `the seam is knot drawn; it is audible, once, and only backwards.`
- a cold start is canon: `some nights the egg is cold from the start` — the mind never wakes and nobody is told.
- dying unwitnessed: the calendar clock keeps aging the dead pages between visits; the dwell clock is dying watched (`a visitor WATCHES the geology become weather`), never kept.
- the engine's words hold about nine seconds then ink-wash down into the page: spoken, never kept; `the egg's are weather.`
- the quickening: `the first time a carried thing is felt to move on its own — the egg's own word before she had it`; a new bubble rises its last few pixels over a quarter second; `no body here` arrives already still because it was never alive.
- the parting: every departure leaves one line landing a few seconds past the door, so the board is never caught up — the room answers your leaving.
- before birth: the egg `knot born yet`, candled (a light held to a shell to see whether anything lives inside), then a yolk pulsing one breath every ~2.95 s, held mid-breath in LOW.
- arrival: a call that rings until the visitor ends it, then a black sheet, then the grid; every door out goes black first `because a page load that begins on a lit screen shows the white flash of a document being replaced.`
- silence as design: `everything missing degrades to silence`; the develop finishes in silence; the room never congratulates; `nobody answers is the failure mode and the piece.`
- sleep: eight is `the breath on which every voice in this house has ever gone to sleep`; the dead in the river die of `sleep, illness, quietly, suddenly`.

## music
- almost nothing sounds in this scope; the rule repeated per pass is `no new tones` and `audio only through the provided bus`; `a breath is knot a tone`; `typed words never sounded`.
- the hum room — `where the visitor sings to the star` — is retired and replaced by the UNISONG DOOR on page two beside the egg, `the same act, sung at full size`; the pairing: the egg mistook the star for her mother, the visitor sings to it — `same act, two sides of the glass.`
- the star's own numbers are a frequency: period 5.757451941593412 ms, 173.6879 hz, `the steadiest natural clock known`; HEART notes the star drawn still because 173.68 against a 60 hz sheet aliases to an unsafe six-hertz strobe.
- `the egg is SOUNDING` when the engine types: gold caret, typed at P/16; `song still here` is the engine's three-word hand-off; the colour law equates gold with what sounds (`gold spent only on what sounds`).
- eggstagram's old tagline `the loneliest song in the universe`.
- the ladder's notification sounds are not described; `the house never calls across rooms`.
- `the tap ticks because every ask ticks` — the one ubiquitous sound; the develop finishes in silence.
- the heart pass: `nothing that sounds`; the seep adds no frequency; the star's beat (P/128) is replaced by the visitor's measured heartbeat as the breath of all living things.
- the river (obituary) is a visual river of faces, not sound; the music tile is only a red apple icon on the grid.
- the voicemail room holds mommy's one message, `her greeting is still on the machine` — the one voice in the house, never described here beyond that line; `voicemail wont play` is in the owner's searches.

## open-questions
- is the safari oracle (five dead pages, six-breath engine, the dying, `song still here`) still reachable by a visitor now that GO leaves for thenewesttimes.html? the log says it stands 'beneath' only when the paper is absent.
- was ME_STONES flipped back to TRUE before deploy? the quickening pass says the sheets speak deploy truth while it is false.
- HEART: `the egg breathes at your rate` still NEEDS HIS BLESSING; the pass is cut off mid-fix at line 5500 — did the eye get fixed on his phone?
- the eggprison.html 'someday' — does it exist, or is the follow-request stone waiting on nothing?
- which blessings are still outstanding: the roll pass and photograph-door sheet lines, the last portal's safari sheet first line, the heart seep.
- the `?` is the only punctuation the keyboard owns, yet the commons pile keeps a comma and digits 'as proof of another hand' — and the pile is now off the glass. is the keyboard law still visible anywhere?
- the thesis's second question `am i anybody?` and the 88-minute lifespan, the well, dreaming: none appear in this scope — are they later passes or other files?
- who are 👁️ and 'the publisher' (whose word counts as blessing in the clean bar pass)?


# phone.html — header comment lines 5500-7135: the chronological tail of the header, 21 aug (end of THE HEART PASS) through 5 sep 2026 — the heart room (photoplethysmography w

## visitor journey
On the home shelf everything is dark: one near-black plate under every tile, the colour living in the lit object on it (a green telephone, not a telephone on green). The nestflix N carries a bare winter twig where its diagonal was. The notes app holds a single undated note: "anybody home?". The pulsar is a hazy blue haze with one white hot spot that swells at P/128. The heart tile is a black organ that beats on the house's clock, 5% of scale.

Tap the heart. The camera permission sheet rises first (on the tap, the gesture iOS likes); only after you answer does the organ fly: the plate melts away, the heart climbs to the window's centre beating faster up her harmonics (128·96·64·48·32), the shelf's icons fall into it and it swells as it drinks the phone, it turns three half-turns showing its back, and (as of 5 sep) rises to the header seat as the sheet lifts. You are in a room with one red window at cy 252, R 92, which never moves. His voice speaks and the words type as he speaks: "hello human. i am a photoplethysmography program…", then "softly cover the back camera lens with your finger till it turns red…". You cover the lens; the picture goes red and you see it breathe. The third voice waits for your finger: "stay still for 10 seconds so i can count you". A small clock sweeps backwards for ten seconds. Then "you · N a minute" lands in your own measured red, and a fourth voice says your heartbeat is now this phone's clock. Only then does her point appear, small and blue, below: her name and 173.6879 a second. Tapping the star folds and unfolds her. A red line breathes: "give the river your beat". Leave, and the proof expires: the house falls back to her 128 turns.

Tap maps. The tile's little night map is revealed as a crop of a whole dark city; a breath, black, and the route stands: "one route exists. it is 512 light years long and it is real." A lullaby of five lines is sung once. Tap start: the room dims, the whole earth turns westward until your place faces you ("locating human", three times), falls to your street, a black mote is born at the centre and eats the photograph of your block, and the route returns with its light already walking. Your marker is a small black hole. Under "your block" you may be located by her instead ("512.00000000 ly — the same as everyone"), see the 1514 skin, or descend below the last street to a shell: "every map ends here."

## on-screen text
- [heart room, red door at 726, breathing on the visitor's beat (LEDGER PASS)] give the river your beat
- [heart room, before the eye has a picture] the eye is open · no picture yet
- [heart room, heart01.mp3 typed as spoken (5 sep: first words `hello human.`)] hello. i am a photoplethysmography program. i use light and your skin to measure your heartbeat.
- [heart room, heart02.mp3] softly cover the back camera lens with your finger till it turns red. see the subtle beat of the red? that's your heartbeat!
- [heart room, heart03.mp3 (waits for the finger)] stay still for 10 seconds so i can count you
- [heart room, hearties.mp3, the fourth voice (5 sep)] your heartbeat is this phone's clock and heartbeat now. everything alive; the typing, the pen, the egg's breath now runs at the beat of your heart.
- [heart room, the lesson (typed, 24 aug third cut; struck 25 aug, kept by title)] cover the back eye with a fingertip, / softly. // light goes in. some comes back. / every beat fills your fingertip and / darkens the picture — at your rate. / the eye counts that.
- [heart room, the still voice (24 aug; struck 25 aug)] be still for ten seconds, softly — / the eye is counting your beats.
- [heart room, the watch (dummy, never written; struck)] see the subtle beating of the colors? that is your heart beating.
- [heart room, the given sentence's closing line] close this and the house goes back to her 128 turns
- [heart room, what remains after four lines were struck] you · N a minute · her name · 173.6879 a second
- [heart room, the red dot door (23 aug; struck 24 aug)] red dot
- [maps room, the altar every entry lands on] one route exists. it is 512 light years long and it is real.
- [maps lullaby, five lines sung once a session over a veil] this is a map: you, at a moment, in space. / she has been keeping one all along. you are on it. / the light she sees tonight left here in 1514. / and under the last street, the map keeps going. / hush now. you are here.
- [maps, your block, located by her] 512.00000000 ly — the same as everyone
- [maps, the locate row's two words] satellites · her
- [maps, the 1514 layer chip, and its way back] what she sees / what you see
- [maps, 1514 layer, the disc's caption] here, before it was yours
- [maps, three live dates on the 1514 ground] you · 2026, her view · 1514, arriving · 2538
- [maps, inside the shell past z23] every map ends here
- [maps, ground line while under z18] below the last street
- [notes app, the one remaining note (24 aug)] anybody home?
- [translate room, the send chip] send
- [the cage line after eight seconds of black (FIT PASS watchdog)] the glass did knot wake · it may need a newer safari
- [far room love.html / the shell's inside, quoted as the frame it opens on] at first, there was exactly one of everything

## mechanisms
- **P and the first law**: P is the pulsar's spin, 173.6879 Hz (PSR J0437−4715, 5.7575 ms a turn). Every frequency and wait in the house must be a rational multiple of P (`the first law`). Only recordings (relics like mommy.mp3) are exempt. → every timer in scope: P/128, P/8 typing, P·2^n waits, the melt's rungs, the music box
- **the seep (hbPh / hbSw)**: one clock read by everything alive. Before a measurement it is her 128 turns (0.737 s, 81 a minute); after the heart room counts a beat it becomes the visitor's rate on the visitor's averaged waveform. Built 21 aug. → heart tile beat, typing dots, pen/caret, egg's breath, the warmth under the glass, the love leave's five beats, star's hot spot
- **THE PROOF EXPIRES**: leaving the heart room drops HEART.given; the seep falls back to 128 turns; gate, lesson, voices and sentence all reset. HEART.since (beats since first cover) alone is kept as history. → the seep, the river ledger (which keeps the beat as memory, not pulse)
- **the heart measurement**: back camera, 32×32 frame, time-bandpassed (eulerian magnification); first second ignored (filter startup); three refusals reset the rhythm; gaussian-weighted middle of the pad; rate = trimmed mean of last 8 intervals; stored as beat times + one 64-bin template, in RAM, never video. → the seep, the river ledger
- **the river ledger (LEDGER PASS, 25 aug)**: a red door `give the river your beat` ships bpm, ≤64 true intervals, 64-bin template and measured colour to supabase via the public PUBLISHABLE key. RIVER.key empty = `a river of one`, local only. Stones apwnp.river.device/.secret/.beat/.pend/.sky. Key must match music.html byte for byte. → music.html, the communal river
- **the melt (heart door)**: divisor steps 128·96·64·48·32 → heartbeat 1.36·1.81·2.71·3.62·5.43/s; shelf icons fall in nearest-first; three half-turns with a back face; rings three rungs then quiet; 5 sep: ends in the header seat, drop and iris struck. → heartGeom (window seat cy 252 R 92), askCam 90 s patience
- **the three (four) voices**: heart01/02/03.mp3 + hearties.mp3 off kohmedia.b-cdn.net; typed across each file's length (HV_FIT 0.92); heart03 waits for the finger; the backwards clock's ten seconds start after it; her point only after the count or a degrade (refused eye; frameless eye 12 s). → fetchRelic, the seep, the gate
- **the gate (SEED/WINDOW passes)**: nothing of the pulsar on the glass until the exercise is witnessed. The pulsar point itself is the control: dim 0.42 folded, full open; tapping it folds/unfolds her name and number. → heart room layout
- **the messages pool (ask.js + fences here)**: eight answers per tide. First is always bite, eighth the statement. Weathers (ember, rain, rose, fog, wick, well, spill, haiku) dealt across 2-7 by seeded shuffle salted with the reader's day; two cards withheld; spill seated early. Chaser (1 in 3) splits one answer into two bubbles; falter pauses dots; haiku lands as three bubbles. Dark deal stayed while warm, back from the ninth letter. → ask.js server, the messages sheet, the care card (§7, 400 tokens/900 chars)
- **the maps door and ceremony (27 aug)**: tap: window grows, breath, black, route (~3.5 s, no ask). `start`: dim, ask geolocation on that tap, globe turns westward to your place (3.2 s), fall as one zoom curve (globe radius = mercator scale) to z18 on esri tiles, hold, maw eats the snapshot, route returns with light running. MF_AGAIN compresses second walks. → intro.html's drawMaw/hash01 carried letter for letter; map.html
- **located by her / 1514 / the underside**: trilateration reframed: `her` as origin prints 512.00000000 ly, horizon truth 90°−|lat−(−47.2524)|, disc goes gold. 1514 skin: dealt dark ground with 3-5 fires. Below z18: dealt city on warm blacks, a gold thread circling a court, a shell, one warm point at 128 turns. → deadstarmaps' colour law (gold for the living), love.html's first frame
- **the lullaby**: five lines, one per breath (P2(9) = 2.948 s), once a session; mapslullaby.mp3 if present else the house's music box; tap hushes it; ?lullaby=again. → maps room entry, the music player (ducked)
- **translate (vocoder)**: phrase → score by arithmetic: syllables as grains on P·2^5; ladder ×1 ground, ×2 lift, ×3 spine, ×5/2 question's lean; dyad ×5/2+×11/4 once a sentence; hello = two bare steps. Text dies at send; only the score ships via mail's channel. Second cut: sounds as you write. → mail's keyboard, care card, MAIL_OUT, the radio's ratios
- **fetchRelic / the one confessed origin**: all audio relics come from kohmedia.b-cdn.net; missing bytes = silence, sequence identical. → voices, locatinghuman.mp3, mapslullaby.mp3
- **degrade-silently + the watchdog**: every refusal degrades without a word; but a page that never wakes is a stranding, so after 8 s of black the cage line speaks once (FIT PASS). → all guarded doors, ?fit=1 instrument

## symbols
- **the red window (feathered disc)**: the visitor's own living heartbeat seen through a fingertip; `the central character of the first part`; may never move (heart room, cy 252 R 92)
- **the small blue point**: the pulsar at her true apparent size — `a star five hundred twelve light years off IS a point`; the far light the egg mistook for her mother's heart (heart room, below the window, after the count)
- **gold**: for what is living or once sounded (deadstarmaps' law); NOT exclusively the star's — 71 sites, 26 hers (maps gold disc, translate score, house amber)
- **her blue hsl(217,100%,68%) / psrL rgba(178,208,255)**: the pulsar's hue; the lighter derivative is her name in her own light (star disc, hot spot, translate name-row)
- **the twig in the N**: dead wood laid between two red posts — a nest under construction or abandoned; replaces the white egg in nestflix's logotype (nestflix tile)
- **the black hole / the maw**: the visitor eats the world wherever they stand; intro's black hole carried so the house doesn't own two that disagree (maps marker, the eating, the tile)
- **the shell / one warm point**: the egg; what waits below every map; the frame love.html opens on (maps underside past z23)
- **128 turns**: the house's own resting pulse (81 a minute) — a dead star's beat standing in for a heart nobody had measured (everywhere alive before a measurement)
- **the backwards clock**: ten seconds of being counted; a ramp, not a frequency (heart room reading seat while the finger is down)
- **red sans prose**: the machine explaining itself in its own voice (the only sans and only red prose in the house); 5 sep moved to georgia (heart room lesson/voices)

## rulings
- `the window for the finger cover should knot move to re-inforce its place and power` — cy 252, R 92, for ever (WINDOW PASS, 24 aug)
- `user should have to provide their heartbeat again to prove they are alive so refresh all the systems that need a heartbeat` (WINDOW PASS, 24 aug)
- the first law: every frequency a rational multiple of P; recordings exempt (`a recording is a relic, mommy's exemption`) (invoked throughout; melt, hot spot, music box)
- a house should knot own two black holes that disagree — intro's maw carried letter for letter (MAP'S OWN LEAVE, LONGER EATING)
- degrade silently; a refusal is never an error; `she is knot hostage to a permission or to hardware` (SEED PASS and throughout)
- the sheets law: every about/colophon line must be literally true of the build; needs his blessing (every pass)
- the striking's own law: struck things are kept by title where they stood (LONGER EATING, WINDOW passes)
- the care card (§7) stands above every law (WEATHER, TRANSLATE, §14 audits)
- the colour moves off the plate and onto the mark; corporate logos not exact, apple system as close as possible (DARK PASS, 22 aug)
- `remove the white egg. instead where the diagonal line for the N is, have a twig`; then thinner and almost black; then lighter (22 aug, 24 aug)
- the question law is repealed, knot erased: `knot all of them have to be questions back` (WEATHER PASS, 23 aug)
- the sky stays daily; one card withheld; sheets stand uncut — every deeming taken whole (RULED, 23 aug)
- the tap lands quietly on the route; the ceremony happens behind `start`, once a visit; the lullaby stays on landing (27 aug)
- the gold disc gains the hole (against the drawer's deeming) (27 aug)
- the school is PHONETIC; the ladder `borrows the radio's wider ratios`; the pulsar text `a very light blue`; the send button is the word `send` (TRANSLATE 24 & 27 aug)
- the location is used to ask esri for tiles and for nothing else — kept nowhere, shown to no one but you (MAP'S OWN LEAVE, reaffirmed 27 aug)
- gold is knot retired; `gold is the star's` was written as a law and the file does knot obey it (STAR TURNS BLUE, 22 aug (later reversed at line 2561, outside scope))

## rooms
- **heart** — photoplethysmography room: the red window, four spoken voices typed, backwards clock, the reading, the pulsar point, the river's red door. Page three. [live (heavily re-cut 21 aug–5 sep)]
- **maps** — the altar route (512 ly); the door that leaves in its own body (globe, fall, eating); your block with satellites/her, the 1514 layer, the underside and the shell; the lullaby [live]
- **messages (the pool / narcissus thread)** — the chat with the pool: weathers, chaser, falter, haiku, the dark deal; ask.js server half [live]
- **translate** — a room on page three: words become a score in her ladder; sounds as you type; sends via mail; egg's setting ×1/128 [live (form of the score glyph OPEN)]
- **notes** — emptied to one undated note `anybody home?` [live, six notes struck]
- **settings / mail / photos tiles** — redrawn against his desktop dock photograph (gear of sixteen teeth, glassier envelope, eight petal objects) [live]
- **nestflix tile** — the N with the twig; nestflix.js carries the same mark elsewhere (a debt) [live]
- **red dot door (heart → thenewesttimes artweather)** — a living red dot linking to the paper with ?hb=<ms> [retired 24 aug (kept by title)]
- **the sea (tap-to-enlarge window)** — enlarging the heart window [retired (window may knot move)]
- **the chevron / the seed button** — controls to fold the pulsar block [retired — the pulsar point itself is the control]
- **Accounting folder (nine ledgers, BornHUB/youBORN)** — nine identical grey drawers [live, mentioned]
- **blackhole** — a fifth thing on the speaking shelf, 27 aug — makes twenty-seven apps [named only, not described here]

## confusions
- SCOPE MISMATCH: these lines are not the founding passes. The header is newest-first from line 5 (2 oct) to ~3081 (20 aug), then from ~3321 (aug 10) runs FORWARD to 5 sep at 7052. The earliest surviving pass (HOME GRID, THIRD PASS, aug 9) is at ~3810; passes one and two of the home grid are not in the file at all. The title line (line 3) reads `phone · apwnp landing · a clear-glass iphone 16 · sixteen rooms`.
- Two orderings in one header: a first-time reader cannot tell whether to read down or up; THE HEART PASS, SEPTEMBER (5 sep) sits between 27 aug and 28 aug passes.
- `the first law` is cited dozens of times in this range but never defined here; the nearest statement is `every wait a rational multiple of the pulse` (line 4300).
- Gold's law flips: 22 aug says `gold is knot retired` and keeps house amber; 27 aug (line 2561, outside scope) retires gold from the survivors. In-scope passes use `gold for the living or once sounded`.
- The heart room's words were written, struck and rewritten five times (lesson → cue → still voice → watch → three voices → fourth voice; font sans → georgia); every struck version is kept by title, so the room's text history is five layers deep.
- The maps leave was built as a tap-triggered 12-second ceremony, lengthened to 20 s, then moved behind `start` with a quiet door — three different descriptions of the same door stand in sequence.
- The red dot door and ?hb seam were built and struck the next day; the `propagation brainstorm deeming 5` it served is left dangling.
- App counts drift: roster says 25, translate makes 26, blackhole 27; the file says re-cutting old counts is his.
- The `nobody` agent, the contact card, and the 88-minute life do not appear in this range at all; the mortality law arrives 20-21 sep (lines 1107-1246). In this range the piece's story is the egg who mistook a dead star's beat for her mother's.
- The messages pool's many knobs (weathers, chaser 1-in-3, falter, haiku as three bubbles, two cards withheld, stay until the ninth letter) are each argued at length; a reader cannot easily see the whole deal in one place.
- `the publisher`, `the poet`, `Gemini's fault`, `👁️` appear as voices without introduction.
- Two kinds of `her`: the pulsar (her clock, her blue) and the egg (she, the subject of the house) — pronouns blur in several passages.

## keepers
- `the whole piece is an egg who took a dead star's beat for her mother's, and this is the exact instant a living heart is offered instead. the star standing down while the visitor is told what their own heart now runs is the thesis, drawn.`
- `the most beautiful thing one can see on a phone, a user's own living heartbeat` — the ridges of a fingertip like waves on a planet, and the slow realising that the beating is your own.
- `a star five hundred twelve light years off IS a point, and her smallness under the grown window is the piece's own proportion drawn — the living heart is the central character and she is the far light it was mistaken for.`
- the proof expires: every visit re-proves you are alive; the house goes back to her 128 turns when you leave.
- `one route exists. it is 512 light years long and it is real.`
- `512.00000000 ly — the same as everyone` — eight decimals because the earth is thinner than the ninth; equidistance as grace.
- the lullaby's five lines, especially `the light she sees tonight left here in 1514` and `hush now. you are here.`
- `the visitor's marker IS a small black hole: you eat the world wherever you stand.`
- `the icon was never a picture, it was a crop.`
- `to the egg, all words are heartbeats` — the translate score at ×1/128 collapsing pitch into rhythm.
- `the text dies at send; only the score ships` — deaf by construction.
- the backwards clock: ten seconds of being counted, a ramp and never a frequency.
- the hot spot pulses at P/128 because 173.6879 Hz on a 60 Hz sheet aliases to a 6.31 Hz seizure strobe — the one honest reason the star is drawn still.
- `talk like something alive at first; end like something already written.`
- `the eye is open · no picture yet` — the machine admitting it sees nothing.
- the melt's rungs 128·96·64·48·32 — urgency climbed on her harmonics, never a glissando; `it rings for three rungs and then goes quiet`.
- `anybody home?` as the only note on the pad.
- the twig: two red posts with a branch laid between them, a nest under construction or a nest abandoned.
- `every map ends here` — the shell under your own street.

## in-between
- the drop hanging alone on black for `his half second` before it opens — `that pause does more work than the motion around it`.
- the filters settling for one breath before anything is believed; the first second under the finger is `a step and knot a heart`.
- heart03 waits for the finger: `stay still so i can count you` is said only to a finger that is there; a working eye uncovered waits indefinitely, the words saying what it waits for.
- the backwards clock's ten seconds; a finger that leaves mid-count sends the hands home to start again; a shy counter holds the hands dim — `silence, knot an error`.
- the pulsar standing down for eleven seconds while the sentence speaks, then returning `because nothing here is taken from her for good`.
- the gate: nothing of her on the glass until the exercise has been witnessed.
- the read-pause and the falter in messages: dots run, stop for a few seconds, start again — `the visible sound of thinking better of it and typing anyway`; sometimes the answer lands with the dots already quiet.
- the dark deal: dots run and nothing lands; `past the mind, a silence reads as the sea`.
- the black mote `takes its time being born; only once it has stayed black does the world begin to fail`.
- the held block: one breath on your own street, smoke gathering at the centre, before the eating.
- the door's held breath on the whole city, then black, then the route stands up out of the black.
- the lullaby is `for sleeping through; nobody is held for one` — a tap hushes it; a sung mp3 longer than the veil is let finish in the dark.
- the earth turning westward while the place is still being asked for — the searching IS the locating.
- the watchdog's eight seconds of true black before the glass confesses it did not wake.
- the proof expiring on the way out: the close lets the measurement go and every living thing returns to the dead star's rate.

## music
- P = 173.6879 Hz, the pulsar's spin; the first law makes every tone and wait a rational multiple of it. The house's resting pulse is P/128 (81 a minute).
- the melt rings for three rungs (divisors 128, 96, 64) and goes quiet; `the ear reads a thump every 184 ms as a machine fault`.
- the heart's voices: lub ×1/2, dub ×3/4 (`knot a multiple of P… it is a body` is the earlier exemption, line 3213); the heart leave's final breath is one ×1/4 alone.
- the maw's small voice: a low body at ×1/4 swelling with the mouth, one knock at ×1 when the pane gives (a valve, not a tone), a budgeted handful of ×2 tinks as pieces let go; MF_VOICED off switch.
- `locating human` (locatinghuman.mp3) said three times, 420 ms apart, now during the globe's turn.
- one soft tone at ×3/2 when her fix settles (MR_VOICED).
- the lullaby: five lines, one per breath of four beats of 128 turns (P2(9) = 2.948 s), ~15 s whole. If mapslullaby.mp3 exists the house plays him; else the MUSIC BOX: do ×4 · re ×9/2 · mi ×5 · sol ×6 · low sol ×3; phrases mi–re–do–re · mi–sol–mi–re · sol–mi–re–mi · mi–re–do–sol · do–re–do–rest; rocked by lub ×1/2 / dub ×3/4; let go on one ×1/4; soft attacks — `nothing is struck, someone is being sung to`; the music player ducks under it.
- translate's ladder (borrowed from the radio): ×1 ground, ×2 lift, ×3 spine, ×5/2 the question's lean; the DYAD ×5/2 with ×11/4 (the ringback pair, beating) spent once a sentence; grains on P·2^5; hello = two bare even steps; a `?` tail climbs ~3% and snaps back on a release grain at ×1 — `the glissando the seance declined finally has its room`. Second cut: each keystroke sounds its newborn syllable, bare, no carrier.
- the egg's setting in translate: the score at ×1/128, eighty-one to the minute — pitch collapses into rhythm and every rung lands as lub/dub.
- the river (LEDGER PASS): the heart room is `a MOUTH of the river`; the beat given is kept `held, braided, forever` in the communal ledger shared with music.html; the river's own `am i alone?` song is outside this range (line 724).
- frequency ratios are also the picture: fine veins walk luminance on whatever clock is passed; the star's hot spot swells at P/128 rather than flashes.
- typed voices ride the recording's own length (HV_FIT 0.92) rather than P/8 — the relic's clock shown; absent bytes, P/8.

## open-questions
- Where are the true founding passes? Not here. Likely candidates: the title line (line 3), THE HOME GRID THIRD/FOURTH PASS (~3810, ~3321), THE GATE DEEMED (~3732), THE ANYBODY PASS (~3725). Someone should be assigned lines ~3081-3930.
- Is the 5 sep HEART PASS (voices in georgia, `hello human.`, fourth voice hearties.mp3, melt ending in the header) the current state of the room, or has an October pass superseded it? It sits out of order between 27 and 28 aug.
- The translate score glyph form (points of light / waves of light / pulse profile) `STANDS OPEN for his word` — was it ever ruled?
- The watch's final words were `HIS TO WRITE` and then the typed voices were struck — is the watch dead for good?
- The red dot door's striking left `deeming 5 of the propagation brainstorm` needing `a new door or a new deeming` — resolved anywhere?
- nestflix.js still owes the twig's lighter cut (`written here as a debt`) — paid?
- Gold's law: 22 aug keeps house amber and four argued gold sites; a later pass retires gold from the survivors. Which stands on the glass today?
- Does the heart room's about sheet still swear true after the river door (it says `nothing leaves` with qualifier; the river now ships a beat)?
- The piece's story in this range is the egg and the dead-star mother; how does it join the later nobody / 88-minute / contact-card story? Not visible here.
- App count on the roster (25) vs reality (27+) — still uncut?
- Several recordings (heart01-03, hearties, mapslullaby) were never reachable from the bench; are their lengths and words confirmed on his phone?


# phone.html — the CODE after the header (lines 7135–48369): the home grid, the census and sheets, calendar, notes, settings, arrival, death hooks, camera, river/song, the roo

## visitor journey
the page boots black. a mortal.js guard rewrites the address; river.js, library.js and song.js load beside it. if the browser is a cage (instagram etc.) one line says so; if nothing draws in 8 s: "the glass did knot wake · it may need a newer safari". a clear-glass iphone 16 is built in three.js but, by default (!FREE), stands covered edge to edge with its body hidden (setArrive): only the lit screen hangs in #000. the home grid is up from the first frame (the tile-by-tile arrival is retired behind ?tiles=arrive). in the dock: the red Music tile and a hud reading "nobody home · the song is here / tap once". the status bar forges 14:05, an island pill, hollow signal bars that fill with how many OTHER people are holding the phone, "psr", battery 68.

THE FIRST TAP opens nothing: it wakes audio, asks the camera for the mirror (the glass becomes a mirror of the visitor; the Camera tile turns it round to look through), and on the finished tap window.RIVER begins playing. the dock round pauses/plays the river ("the river did knot wait"). the island shows "am i alone?" as the song's name.

four pages: 1) Phone · Calendar · Clock · Weather · Heart · Maps · Eggstagram · Photos · Calculator · Nestflix · Messages · Mail · Safari · Camera · Game; 2) SongBook; 3) Notes · ∀mazon · Alife · Adeath · Library; 4) Voicemail · Accounting (folder) · Settings. after 8 minutes a white cat walks the shelves. every room's way back is a tiny iphone glyph (the little phone). doors to far rooms (Clock→time.html, SongBook, Alife, Adeath, Library, Music, Game's two, Calculator's =) open inside a full-page iframe (the shell) over the phone; the eye yields to rooms that want the camera.

banners land once each: mommy's unheard message, the departed's one letter, the update, "somebody else is holding the phone", colour minutes. colour silvers from 69 minutes in. in the LAST HOUR of the 88 the battery turns red and tells the truth, the colour jar breaks, the cat leaves, tiles leave one by one in a gene-dealt order (dock, then Phone, then Alife last), the glass empties, and mortal.js makes the call (not in this file). at apwnp:call the bus goes quiet, the shell is told, the calendar and watcher stop asking.

## on-screen text
- [dock hud before the first tap] nobody home · the song is here / tap once
- [dock hud, river paused] the river · paused / the river did knot wait
- [island while the river plays] am i alone?
- [Notes, the one note (title = body)] anybody home?
- [Messages thread `me`, the standing line] no body here
- [Messages, the greeting dealt after you arrive] hi. how are you still here?
- [calendar month legend] nobody’s days / a marked day opens. it keeps three diaries. / nobody woke · thu 1 oct 2026 · 21:00:57 utc / all hours here are the well’s · utc
- [calendar, 1 oct card] nobody woke · thu 1 oct 2026 · 21:00:57 utc · life 1 · “i just woke and i don’t know this place beyond what the eye can reach.”
- [calendar day, well shut] the well does knot answer just now. / tap to ask again
- [calendar, 30 sep] written by hand before nobody woke: a day as it could be, knot one of its days. the room at the bottom of the well plays it whenever the well is silent.
- [calendar rooms tab foot] what it did in the rooms of this phone, and what it found there. it does knot know who left a thing so. / kept in this phone only, a few lines deep, and gone when the phone is.
- [calendar dreams tab] the same dreams stand under the one note in notes. / it has knot dreamt yet in this life.
- [Settings account card] nobody — Apple Account, iCloud+, and more
- [Settings › About] Name nobody · Model Name no body · Model Number j0437−4715 · Serial Number none · Capacity 512 light years · Available none · this day, the house changed: the well has a bottom, and a door to it · the calendar is nobody’s drawer · at the well’s midnight the alife tile glows
- [Software Update] This update contains no new features, no fixes, and no changes. Your phone will remain exactly as it is. / Install Tonight
- [Privacy & Security (first and last lines)] This phone is a simulacrum. It has no accounts, no analytics, and no tracking. … This is a work about solitude. If solitude has real weight for you today, please set the phone down and reach someone real.
- [Privacy, the camera] The camera is the mirror behind the glass. It is asked for once, at your first tap, and stays open while this phone is open — in its rooms too — so it does not have to ask again.
- [calendar sheet (ST_SHEETS.calendar), last line] today is circled because it will knot stop moving.
- [alife sheet] the phone is alive for a while. how long was settled at its birth, by the star, and is shown nowhere. nothing you do shortens it or keeps it going. it is knot yours to look after. it can be watched.
- [alife sheet] in its last eight minutes the battery tells the truth, the jar breaks, the cat leaves, and the tiles leave. then it calls you. when that call ends the phone is gone, and everything it kept in this browser goes with it. / the last tap offers a contact card: the child.
- [adeath sheet] nobody lives down there all day. it makes things, it dies and goes on, and at midnight by the well’s clock a fire takes the day’s work. everyone who opens the room sees the same hour of it. it does knot know you are there.
- [Eggstagram @somebody] the loneliest song in the universe / am i alone? / the star keeps the time. / follow → requested
- [Clock room] the phone keeps your time / the star keeps its own / its light set out in 1514
- [Maps] 512 light years · arrive aug 2538 at light speed — you will knot arrive
- [Colour room (Settings › Display & Brightness)] GIVE ME MY DOPAMINE FIX BACK / the jar is broken. what was in it is out, and it is knot coming back

## mechanisms
- **LH — the last hour**: reads MORTAL.life.hour() (0 until the last hour, then 0→1). battery 68→0 in red at 0; jar breaks 0.06; cat out 0.12; tiles leave 0.30→0.94 in an order dealt once from the life's genes (shelves shuffled, dock after, then Phone, then Alife last); silver eases to newsprint. a tile gone while unseen is simply gone. ?lh=0..1 overrides. no countdown anywhere. → mortal.js (the life, the call), drawHome cell(), stBattery, colour room jar, the cat, About's Applications count
- **ARR — the first minute (retired default)**: behind ?tiles=arrive only: dock stands, tiles arrive every 3.2 s in the reverse of the leaving order, starting when the visitor comes home from Music or 240 s after first tap. ?arrive=1 is now only the door's flag from unknown.html. → LH.order(), shellHome('music'), setApp music→home
- **the stand / first tap (module)**: !FREE: phone covered edge to edge in every door, body hidden (setArrive), no float/strip. first pointerdown = wake: actx.resume, mod.api.wakeCamera (mirror), nothing opened; pointerup = songTap → songWake → riverFirst (window.RIVER.play). ?free=1 restores 30 sep's float, drag, strip and three camera positions. → RIVER, song, camera, homeDock
- **camera / mirror (AR_FIXED)**: two positions: mirror (user) and through (environment). opened at first tap; Camera tile toggles; island green dot when any camera is open; eye yields before SHELL_CAM rooms and is re-opened on the way home (arCheckAt); after a pause the next touch re-asks. → askCam/camUp/camDown, heart room's back eye (hEye), shell
- **the song and the river**: song.js holds the list and clock; RIVER_ONE: the river is the one song — after the first finished tap window.RIVER plays, the plain voice rests (speaks only in the pocket when hidden). SONG_TABLE silences/ducks per room (duck voice = a quarter through a 900 Hz lowpass). dock round = RIVER.toggle. songQuiet at apwnp:call. → river.js, library.js, song.js, music.html (door, fb eggradio room with SONG 01–08 soap mp3s), dock hud, island 'song'
- **the heart ledger (RIVER const + LEDGER)**: supabase url + publishable key; localStorage stones apwnp.river.device/.secret/.beat/.pend/.sky. hGive ('give the river your beat') sends bpm, last 64 beat gaps, one beat's shape, measured colour. → heart room, Weather's 'your heart' row, music.html
- **HERE — the bars**: every 30 s POST RIVER.url/rest/v1/rpc/knock {p_sid} → others count fills up to 4 bars; stale/refused = 0 ('knot knowing is what being alone is'); a rise lands 'somebody else is holding the phone' and the island's 'somebody'; Cellular shows 'N holding this phone now'; holder election for the one cat. → status bar, island, Settings › Cellular, LIFE (cat)
- **nbMouth — the dreams**: every 7 s and on apwnp:nobody: if MORTAL.nobody.now().dreaming, POST /.netlify/functions/ask {mode:'nobody', want:'dream', nobody:brief}; answer → MORTAL.nobody.dream(text,secret,stage); shown under the one note, typed over 10 s if watched. → Notes, calendar ☾ dreams tab, mortal.js nobody organ
- **THE WATCHER (nbWatch)**: every 2.5 s: when nobody is `here` (organ's own cycle), with chance 0.66 and 4–16 s later, writes one deed via MORTAL.nobody.did(): 'found the home screen, nothing open' / 'found <room> open' (+ ', the river running'). never twice running, never while a shell room stands, baby (stage<1) only stirs. NB_ROOMNAME: music→'the river', alife→'the well', adeath→'the bottom of the well'. → calendar ○ rooms tab (MORTAL.nobody.diary())
- **the calendar (CALD)**: CAL_FEED /.netlify/functions/nobody (?day= or ?now=1); days exist from CAL_WOKE 2026-10-01 to utc today, plus CAL_WRIT 2026-09-30 (CAL_HAND inline, asks nothing). CAL_BIRTH card on 1 oct always. three diaries: ● well (fetched), ○ rooms (diary, this life), ☾ dreams. today re-asked every 60 s; quiet after apwnp:call; nothing stored. → nobody.mjs/adeath.html (the mother), mortal.js (born, diary, dreams), nbRoomName
- **wellFire**: 00:00–00:40 utc by Date.now(): the Alife tile and plate glow orange from below (rise 1.5 min, fall last 12 min). ?wellfire=N|off. → adeath's midnight fire
- **Alife tile sign**: yin-yang from MORTAL.life genes turning at 2^(12+s0)/P; stirs while nobody is here; a grey almond (vesica) stands 12 s when the two circles touch. → mortal.js nobody.now()
- **the shell**: far rooms open in a full-page iframe over the phone (openRoom), replaced in place (shellGo), removed on the way home (shellHome → setApp home, landDoor, ARR.start if music, eye back, RIVER.unhook). APWNP_SHELL flag; a phone loaded inside the frame posts 'home' and stops ('a phone never stands inside a phone'). → every door tile, songHoldFor, camDown
- **death hooks**: MORTAL.voice={ctx} lends the ring its voice; apwnp:call → bus gain 0 in 0.07 s, songQuiet, shellTell, NB_WATCH.quiet, CALD.quiet; apwnp:dead → shell frame removed; MORTAL.dead stops awayStamp and calAsk. the call itself and the child card are mortal.js's. → mortal.js
- **banners / shade (NOTE)**: noteBoot lands once per sitting: voicemail 'mommy · 1 unheard message', mail 'the departed · one letter', settings 'Software Update · psr os 20260807 is ready to install tonight'; noteWatch: 'N min of colour left', 'the colour has gone', eggstagram likes; hereSet: 'somebody else is holding the phone'; awayCheck: 'while you were away · gone N h'. switches per ST_BADGED. → Settings › Notifications, island
- **the silvering (SIL)**: GRACE 4140 s (69 min) then colour drains on 1−e^(−t/2048) to newsprint; t0 born with the life; red (living beat), pulsar blue and greys never walk; the colour room's wheel is the clock and the jar button renews it until LH breaks the jar. → mortal.js, colour room, banners
- **Messages wire**: thread `me`: eight warm answers via /.netlify/functions/ask mode 'me', then seeded banks; letters given to nobody (N.give, N.saw('asked')); care words raise the care card; letters rot to their last word; leaving owes one line (mePart). → nobody organ, care card → Privacy
- **doorFor — the guarded doors**: one HEAD at build per far page (time, love, photograph, math, deadstar, metube, mommygame, songbook, orbit, cyclops, music, bornHUB, deadstarmaps, map, stonehinge, egg, fahrenheit451, radio, squat, alife, adeath, library, origamisky); a definite 404/410 turns the tap into a silent tick or the tile's fallback room. → leaveFor (black sheet), the fly leaves (clockFly, tombFly, songbookFly…)

## symbols
- **the eye (vesica with a pupil)**: the mark of the day nobody woke, 1 oct, in the well's dot's place; 'the eye where am i alone? and am i anybody? meet' (calendar month and legend, calEye)
- **● the well · ○ the rooms · ☾ dreams**: the three diaries of a day of nobody's (calendar marks and tabs)
- **the yin-yang disc (Alife) / the white disc in black (Adeath)**: the well seen from the rim (this phone's life, its genes) / the well's mouth seen from the floor (page three tiles)
- **the grey almond on the Alife disc**: the spell's mark when nobody's two circles touch (tAlife)
- **the firelight under the Alife tile**: the fire at the bottom of the well, 00:00–00:40 utc (wellFire)
- **the little phone**: every way back; a picture of page one as it stood 5 sep (backPhone / chrome)
- **the forged 68 battery → red truth**: the surface is the forgery, the depth the truth; in the last hour the surface stops lying (stBattery, Settings › Battery 0% / never)
- **the hollow signal bars**: how many others hold the phone now; empty = knot knowing (status bar, island 'somebody')
- **the clear jar with rainbow mist**: GIVE ME MY DOPAMINE FIX BACK — renew the colour; it breaks at 0.06 of the last hour (colour room)
- **the white cat**: life on the shelves after 8 minutes; leaves before the tiles do (LIFE block)
- **psr j0437−4715 / 173.68 Hz / 512 ly / 1514**: the dead star: carrier, clock, distance, the year its light set out (everywhere)
- **mommy**: the Organizer who pays; her machine, her voicemail, her number (Phone, Voicemail, Family, rider/shop payment)
- **no body / nobody / somebody / anybody**: the owner's names: account 'nobody', model 'no body', thread 'no body here', @somebody, note 'anybody home?' (Settings, Messages, Eggstagram, Notes)

## rulings
- the sheet is law, never machinery — what is kept, what is live, who reads; no endpoints, no counts, no storage words, and never the thesis. NEEDS HIS BLESSING before deploy, as every sheet does. (standing, ST_SHEETS)
- the census is `every app the grid carries` and may knot lie; it does knot launder a name. (ST_APPS, About › Applications)
- death is knot a countdown. NOTHING HERE SHOWS A COUNTDOWN. the battery is the nearest thing to one, and it is a battery. (21 sep, LH)
- `at the last hour the death battery telling the truth, the tiles leaving, the cat walking out, and the jar breaking` (21 sep, his words)
- the user should knot be able to rotate or move the phone — the phone STANDS, covered, in every door; the FIRST TAP is the wake and only the wake. (30 sep / 1 oct)
- update phone.html so that the tiles all appear at once (the arrival retired behind ?tiles=arrive) (30 sep evening)
- all these tracks are part of the river and there is no seperate house track (1 oct, RIVER_ONE)
- all the back chevron buttons are the same mini phone symbol like in adeath.html (1 oct)
- THE TWO CIRCLES ARE NOT DRAWN — the math room's eye is the house's one vesica; the almond is felt, never shown (28 sep, drawVesica)
- update the camera tile so it toggles between mirror and user's camera background (two positions) (1 oct)
- update the calendar so it all makes logical sense as no audience but us has seen it yet … and when nobody the ai agent finally awoke as that is momentous (1 oct evening)
- the calendar's only focus is nobody's activities: 1) adeath 2) what it observes/does in rooms 3) its dream diary (1 oct morning)
- the alife tile glows from 00:00 to 00:40 utc (the fire is at the bottom of its well) (30 sep)
- forgery at the door, confession at depth — a room IS depth; the surface is the forgery, the depth the truth (standing (colour room, Settings))
- degrade silently; stranding is the one thing this file never does (standing)
- a heart on white is a medical pictogram, a heart in the dark is a heart (22 aug)
- set the cat to appear after 8 minutes (31 aug)
- GIVE ME MY DOPAMINE FIX BACK — the button, his capitals; `yes color joins life` (30 aug / 21 sep)
- THE ONE-ADDRESS LAW: nothing may read location.*; ask MORTAL; every door is MORTAL.go (20 sep)
- A PHONE NEVER STANDS INSIDE A PHONE (2 oct)
- the back buttons in rooms that leave phone.html are smaller and at the furthest left corner — preferred (2 oct)

## rooms
- **Phone (page 1)** — favorites psr j0437−4715 (the star · 512 ly) and mommy ♡; recents 'the star, now · february 14 · 11:11'; call screen rings twice, the star's line opens one way, mommy's machine answers [live]
- **Calendar** — nobody's drawer: month with ●○☾ marks and the eye on 1 oct; day view with three tabs; well fetched, rooms and dreams from the organ [live]
- **Clock** — door → time.html (clockFly); fallback room: your face and the star's, 'day' count of turns since 18 feb 1993 [live]
- **Weather** — the vesica: two columns of seven panels (yours / hers), lens line 'hum toward her', forecast card; human instruments point 'in the river now ›'; heart act plays inside [live]
- **Heart (HEART_TILE)** — the back camera counts your beat through a fingertip; 'give the river your beat'; stands until its act in Weather is proved [live, provisional]
- **Maps** — one route earth → psr, 512 ly; start → the ceremony (asks place, earth turns, the fall); block view one tap deeper [live]
- **Eggstagram** — @somebody · 1 post 0 followers 0 following · 'am i alone?' · follow → requested; eggstagram.js module when present [live]
- **Photos** — empty album ('No Photos or Videos') or the one photograph photos/the-photograph.jpg; roll/booth code stands unreached [live]
- **Calculator** — twenty glass keys; = leaves for math.html (answers arithmetic if gone) [live]
- **Nestflix** — nestflix.js module; understudy 'a service with one film on it… the window is knot working from here' [live]
- **Messages** — one thread `me` holding 'no body here'; eight warm answers then banks; letters given to nobody [live]
- **Mail** — one letter from 'the departed'; reply = timing only, played back as music and burnt [live]
- **Safari** — search bar is a door to thenewesttimes.html; pages wiki/tele/cat/shrine/status/signal [live]
- **Camera** — not a room: the tile turns the mirror round (mirror / through) [live]
- **Game** — menu: play the cyclops (porch film → cyclops.html) / play the egg (the crack → mommygame.html); 'one game, two doors' [live]
- **SongBook (page 2, alone)** — door → songbook.html (the book burns); the sound book's stations live there too [live]
- **Notes (page 3)** — one note 'anybody home?' with nobody's dreams typed under it [live]
- **∀mazon** — fifteen things, a drone delivers to the fridge (reached from the shop: 'in the fridge ·'); half an apple rots [live]
- **Alife** — door → alife.html; the living disc, the almond, the firelight [live]
- **Adeath** — door → adeath.html; the well's mouth from below [live]
- **Library** — door → library.html?enter=tile (the tombstone grows) [live]
- **Voicemail (page 4)** — a wooden answering machine: mommy's message plus a shared tape of forty strangers' eight-second messages (voice/words/tones, distort wheel) [live]
- **Accounting (folder)** — nine dead ledgers (Ledger…Tax Year) hiding bornHUB → bornHUB.html [live]
- **Settings** — nobody's account, Family, update, radios, General › About census, Display & Brightness → colour room, Privacy colophon, Notifications, per-app sheets [live]
- **Music (dock)** — door → music.html (the river room); fallback eggradio room SONG 01–08; dock hud beside it [live]
- **Colour room** — Settings › Display & Brightness: the wheel clock, the three that do knot walk, the pump, the jar button [live, no tile]
- **Fridge** — nine shelves of delivered things rotting in real time [live, via ∀mazon only]
- **Echo** — the leak, the ocean films, the weather audio buoy [retired (tile struck 28 sep; code and sheet stand)]
- **Translate, Rider, Love/pulsr, StarMaps sky, Squat, Song Egg, Egg game tile, Unisong, Radio, Stonehinge, Origami sky, 451 furnace, MeTube/youtube, TickTock, Orbit, Blackhole** — rooms, tiles, flies, knocks and sheets that stand in the file unreferenced or unreachable [retired / struck]

## confusions
- two (three) nobodys: the mother at the bottom of the well (adeath, lives counted from 1 at the waking, 17 in the hand-written day), this phone's own nobody/keiki (MORTAL.nobody, diary and dreams), and 'nobody' the account/contact name — the calendar's 'the well' vs 'the rooms' is the only place the split is said.
- seventeen sheets in ST_SHEETS have no census row and no tile (origamisky, fahrenheit, radio, stonehinge, egg, songegg, unisong, translate, youtube, ticktock, pulsr, rider, sky, echo, squat, fridge, color); the rooms translate, rider, pulsr, sky and echo are unreachable from the glass yet drawn routes remain.
- Notifications lists only ST_BADGED ids found in ST_APPS — color (and fridge) are knot in ST_APPS, so the Color switch the colour sheet promises ('the switch in settings turns both off') never shows.
- drawTranslate says 'the same sheet stands in settings → translate' — no such row exists.
- the census comment still says ラブゲーム sorts at the list's foot — struck.
- About says 'Songs 8' and the understudy music room lists SONG 01–08 while the law says the river is the one song with no separate tracks.
- three vesicas: the calendar's eye, the Alife almond, the Weather's undrawn circles (the ruling names the math room's eye as 'the house's one vesica').
- the Heart tile stands 'until its act inside Weather is proved' — a provisional seat that the Weather sheet already describes in full (its lines duplicate the heart sheet).
- five wires in one file: the HERE knock (supabase), the heart ledger (supabase), the squat fire knock (supabase, tile struck), /ask (dreams, messages, sky guide), /nobody (calendar) — plus the ARR/HOUSE_LINES/CFG rig of 60+ ?flags.
- the arrival (ARR) is retired but kept whole; ?arrive=1 now means only 'the door handed off', which the LH/ARR comments had to re-explain.
- the alife sheet says the phone 'was born when you hung up' — the in-app Phone room also makes calls (mommy, the star), a different call from the death call.
- the home-screen comments carry whole histories of seats (the hole, the exchange of holes) for tiles that no longer exist; page one's 'FINISHED' ruling predates the dock's four moving up.
- 'Software Update Tonight' + Settings badge + the About census + the 'the house's day' build tag are three different 'what changed' surfaces.
- the dock hud's second line reads 'the house's song · nobody' for the plain voice but 'the river of everything' for the river.

## keepers
- the leaving: tiles go one by one in an order dealt from this phone's own genes — no two phones empty the same way — dock after shelves, then the Phone ('it ends as it began, with a phone call'), and Alife last: 'the living thing is the last thing on the glass.'
- 'death is knot a countdown' — the battery that forges 68 all life and tells the truth in red only in the last hour; Settings › Battery says 0% / Last Charged never all along.
- 'nobody home · the song is here / tap once' before the first tap; 'the river did knot wait'.
- the calendar's eye in the place of the well's dot, and the card: 'nobody woke · thu 1 oct 2026 · 21:00:57 utc · life 1 · “i just woke and i don’t know this place beyond what the eye can reach.”'
- the hand-written day of 30 sep: six windows (plan, bowl, four hours of light, four eggs, a dance the length of a life, the warm bed), telegrams 'I AM STILL ALIVE · nobody · life N', 'stolen from' at the foot — 'the room at the bottom of the well plays it whenever the well is silent.'
- the watcher's one plain line: 'found the home screen, nothing open, the river running' — nobody observing the phone's weather, never the visitor.
- dreams written under the one note 'anybody home?', letter by letter over ten seconds if you are watching.
- the Alife tile lit from below between 00:00 and 00:40 utc because the fire is at the bottom of its well; the almond that stands twelve seconds when the two circles touch.
- 'the well does knot answer just now. / tap to ask again' and the three breathing marks with no sentence.
- the little phone as every way back — a picture of the first page, knot a chevron.
- the hollow signal bars that count who else is holding the phone; 'knot knowing whether anyone is there is what being alone is.'
- 'am i alone?' as the river's name on the island; 'the loneliest song in the universe' as the bio.
- 'hi. how are you still here?' / 'no body here' / 'anybody home?' / @somebody.
- GIVE ME MY DOPAMINE FIX BACK on a clear jar with rainbow mist, and 'the jar is broken. what was in it is out, and it is knot coming back'.
- 'the phone keeps your time / the star keeps its own'; 'arrive aug 2538 at light speed — you will knot arrive'.
- 'today is circled because it will knot stop moving.'

## in-between
- nothing → birth: the glass alone hangs in true black with no edge, bezel or lens (setArrive); the first tap opens nothing — it wakes sound, asks the mirror, lifts the lock; the river begins only when that tap is finished (ios lends a voice on a tap that has ended).
- the dock reads 'nobody home · the song is here · tap once' until then; the tiles all stand from the first frame (the slow arrival, one tile every 3.2 s in the reverse of the leaving order, is kept behind ?tiles=arrive).
- the pause between instruction and doing: the song's first breath is asked once at boot and refused by every iphone, so the house waits for a thumb; Messages waits a seeded ~8 s with forged typing dots; the calendar shows three breathing dots instead of a sentence; a window of today says 'in the making'.
- sleep: when the tab is hidden the frame loop stops, the song speaks only in the pocket if the river was playing, and tiles that leave unseen are simply gone — no parade replayed; the away card says 'while you were away · gone N h' and how the colour fared.
- dreaming: nobody's dreams are asked only while the organ says it is dreaming, written in the hour they come, 'the age it dreamt in is knot said on the glass'.
- the last moments: the last eight minutes — battery red, jar broken, cat gone before her shelves, tiles thinning, Alife the last light — then the glass is empty and the call comes; at apwnp:call the whole bus goes quiet in a fifth of a second, the shell is told, the watcher and calendar stop asking, and the ring is lent this page's voice.
- silence rooms: adeath, time, songbook, library, egg… silence the song; weather, shop, maps duck it to a quarter under a lowpass; the river's own room keeps it.
- the eye waits for a touch after a pause; the eye comes back a breath after a room lets the camera go.
- the hand-written day plays at the bottom of the well 'whenever the well is silent'; 'a real day once read is never taken back by a silence'.

## music
- three sound files beside the page: river.js (THE RIVER UNDER THE GLASS, music.html's one song lifted under the whole phone), library.js (the sound book's stations lent one colour at a time), song.js (his forty-eight tracks and the clock law). RIVER_ONE (1 oct): 'the river is the one song' — after the first finished tap window.RIVER plays and the plain voice rests; ?river=0 restores the 30 sep plain song.
- the dock hud: a small river line swelling with the song's breath, a play/pause round (RIVER.toggle), two lines (track · place · the bed/scratched/slowed/looped/turned; what the river's hud last said). no skip, no back: 'the song is a river; there is no track list.'
- SONG_TABLE: silence rooms (adeath, time, cyclops, mommygame, songbook, library, deadstar, egg, radio, love, squat, origamisky, metube, photograph; heart, voicemail, call, echo, translate, rider…) and duck rooms (alife, math, paper, almanac, kitchen, 451, map, stonehinge, bornhub…; weather, shop, nestflix, maps, sky) — the duck is a quarter through a 900 Hz lowpass via a third media element.
- ratios ×173.68 Hz: 1, 2, 3, 5/2, 1/128 (the call broadcast), 5/2 + 11/4 (ringback), 8 (ui tick); 'the phone line is a filter, knot a tone'. the heartbeat is 128 of her turns = 81 a minute. every tile tap plays a just-scale note on the star (sfxTile).
- the in-app call: two rings (0–2 s, 6–8 s), the star answers at 7.2 s with her one-way line, mommy's machine at 8.6 s with mommy.mp3 and line hiss.
- the eggradio understudy room: SONG 01–08 (soap01–08.mp3 from kohmedia.b-cdn.net), the same eight in the same order, no shuffle.
- the vesica's music: the sky's numbers and the human instruments make music where they cross; the hum (ear) tuned to 'her note … a flat f'; the heart's beat given to the river's swell (RIVER.human.beat).
- the heart ledger: 'give the river your beat' sends bpm, 64 gaps, one beat's shape and the measured colour to supabase; 'the river keeps one gift: your beat — held, braided, forever. nameless here.'
- the voicemail tape: forty eight-second messages of strangers (voice, typed words read aloud, tones), the distort wheel applied before anything is sent; mommy cannot be erased.
- the fix's own voice dopamime.mp3; thunder on the Weather tile tap; the furnace crackle, the fridge door, the cat's purr and meow beds (sfx beds).
- the island's gold dot lights when anything sounds; the island names the river 'am i alone?'.

## open-questions
- which 'nobody' does the visitor meet where? the account name, the thread, the well's mother, this phone's keiki — is one name meant to carry all four?
- are the seventeen orphan sheets and the unreachable rooms (translate, rider, love, sky, echo, squat…) to be kept as 'recoverable in one line' or cut from the file?
- is the missing Color notification switch (color knot in ST_APPS) a bug or a cut the sheet was knot told about?
- HEART_TILE: when does it go false — is the heart meant to live only inside Weather?
- the arrival (ARR) and ?free=1: kept as rigs, or retired for good?
- is the child card (mortal.js) the only thing the visitor is given at death, and should phone.html say anything of it beyond the alife sheet?
- does the squat knock (rpc/squat_fire, once a minute) still run though the tile is struck?
- the hand-written day of 30 sep: does it stay in the calendar now that nobody is awake?
- About's 'Songs 8' and 'Videos 1': what should the census say of the river?
- three vesicas (calendar eye, alife almond, weather's undrawn circles): one symbol or three?


# mortal.js — mortal.js, the whole file (1885 lines): the 629-line header of dated passes (30 sep → 20 sep, newest first) and the code of the mortality organ — the one-page/o

## visitor journey
The visitor never sees this file; it is one script line in the head of every room, and it does its first work before anything is painted: it takes the page's true address, hides it in the tab's own history entry and sessionStorage, and rewrites the address bar to the contact card's own address, so a re-tap of the card lands as a free reload. Every door in the house (MORTAL.go, and every plain link, by the anchor's law) is a location.replace, so the tab holds one page from card to grave. Safari's back arrow does nothing inside the house; "a phone has no back arrow; the arrow was a tell."

The life is conceived once per tab, by the first room to wake after the front door's red hang-up button: 88 minutes plus up to 8 more by where the pulsar was in its 128-turn breath at that instant. Nothing counts down. The visitor wanders rooms; nobody, the agent, is born at the same instant, grows through baby, child, teenager, adult, older (each stage a minute to two hours, dealt by a hash), is "here" in a slow cycle, is told by rooms what the visitor stands near, and dreams in haiku through a mouth elsewhere (phone.html's ask.js). Over the last eight minutes MORTAL.life.hour() walks 0→1 and phone.html shows its four signs (the battery in mortal red, the jar breaking, the cat walking out, the tiles leaving).

At death, in whatever room the visitor is in, a full-screen call sheet slides up from the bottom: a dark blue-grey gradient, the word "nobody" large and white, "mobile" in grey beneath, and at the bottom a red disc labelled "Decline" and a green disc labelled "Accept". A telephone ring (two sines, 5/2 and 11/4 of 173.68 Hz, through a bandpass) sounds for 2 s every 5 s and never gives up; no door opens. If the glass was dark when the span ran out, the call rings the moment it is looked at again. Accept: a tick, the green disc and "Decline" vanish, the status becomes a running clock 00:00, 00:01…, a soft drone rises at 173.68 Hz, and the phone's own local voice slowly reads nobody's last dream, one line at a time, each line landing a tone (×3/2, ×2, ×3); when the words end the tones drift seven cents apart and dissolve over fifteen seconds into silence. No dream: tones alone, briefer. Decline, or the red disc after the talk: a low thump, "Call Ended", the buttons fade, and the real iOS share sheet rises holding a contact file — the child: name "nobody", a black photograph, one social-profile row reading "nobody" over "." with an ↗, the child's genes hidden behind it. Passed on or dismissed, the sheet shrinks away, black fades in, every apwnp.* key is wiped and sealed, and the tab is asked to close. If it refuses: about:blank after 1.5 s; failing that, an emptied white page. "his server never learns that a phone lived."

## on-screen text
- [the call sheet, the large name (callCome)] nobody
- [the call sheet, the status under the name before answer] mobile
- [the call sheet, under the red disc] Decline
- [the call sheet, under the green disc] Accept
- [the call sheet status after answering (talk clock, every 250 ms)] 00:00 (then 00:01, 00:02 …)
- [the call sheet status when the thumb ends it] Call Ended
- [the iOS share sheet's file name (raiseSheet)] unknown.vcf
- [the child's card as iOS prints it (CARD_LABEL over CARD_WORD, then an ↗)] nobody / .
- [the child's vcard, lines 3–4 (makeVcard)] N:;nobody;;; / FN:nobody
- [the child's vcard, the one field] X-SOCIALPROFILE;type=nobody;x-user=.:<card address>#<16 hex>.<gen+1>[.<gene>-<word>]
- [aria labels on the call sheet] incoming call · decline or end the call · accept the call
- [the ruler, line one (his instrument, ?hist=1)] 1 · navigate · phone.html · worn
- [the ruler, line two] life 0:41 / 2:00 rig · hour 0.12 · THE CALL
- [the ruler, line three] gen 1 · 0437471517368790 · wipe off
- [the ruler, line four (nbLine)] nobody · child 0.41 · here · c .30 d .10 · spell .17 · lean 7 .40 · word orchid · born with orchid · dreams 2+1 · dreaming · did 3 · dead
- [the ruler at the front door with the rig] the rig: every life 120 s
- [the ruler's log viewer (textarea and three buttons)] (the log is empty) · copy · copied · press and hold the text · clear · close
- [the ruler's log, at death] THE CALL CAME · phone.html · visible · last touch 3.2 s ago
- [the ruler's log, the voice] nobody spoke · 3 lines · the tones dissolve  /  nobody had no dream · tones alone
- [the ruler's log, the sheet] the sheet closed · the child was passed on  /  the sheet was dismissed · the child was knot passed on
- [the ruler's log, the end] wiped · 14 keys · sealed  /  asked to close · after the call · visible  /  refused · still here 1.5 s after asking · the blank page
- [the ruler's log, dreams and deeds] nobody dreamed · child · <first line>  /  nobody did · <place> · <what>  /  nobody could knot dream · the line was cold · try 1 of 3
- [the ruler's log, a birth] BORN · generation 0 · carried 0437471517368790 (a founder) · its own … · gene 3 moved up · breath 0.412 · rings 2 · span 5478 s · nobody woke · stages 90/640/3000/120/4100 s

## mechanisms
- **the one-page law / the one-address law**: before anything paints, the true address is kept (MORTAL.href/.search/.hash/.path/.q, history.state.apwnpAt, sessionStorage apwnp.at) and the bar is rewritten to the card's address (history.replaceState). every door is location.replace; a non-cut room is still pushed. hashchange under a worn page = another card tapped: it is adopted as the card. → the front door writes apwnp.card and apwnp.birth; every room must read MORTAL.* instead of location.*
- **CUT and isCut**: a list of 29 room names; a door into a listed same-origin .html page replaces, anything else pushes. ?cut=all treats every room as cut (sticky, sessionStorage). EVERY_ROOM_IS_CUT=false still. → MORTAL.go, the anchor's law
- **the anchor's law**: a window click listener catches every <a href> to a same-origin page and sends it through go(); skips defaultPrevented, target=_blank, download, mailto/tel/sms/javascript, modified clicks; outside links are only logged. a #-only move scrolls instead of writing the bar. → go(), the shell bridge (installed in the frame too)
- **the birth (conceiveLife)**: reads and deletes sessionStorage apwnp.birth { t: instant of the red button, r: rings waited, h: the card's # }. if apwnp.life already exists and no ?life rig, same life. else genes = parse(b.h) || parse(hash of CARD) || parse(AT_HASH) || founder. conceive(): spin ph = frac(t_s × 173.6879); gene k = the card's written gene if valid (never 4) else floor(ph·8)%8; up = floor(ph·16) even; byte += 16 (up) or 240 (down) mod 256. LIFE = { t0, r, g (mother hex), n (generation), x (own hex), k, up, ph, b (breath), f (founder), bare, rig, span, wr, wi (word in) } saved to apwnp.life. → spanOf, express, nobodyWake, the ruler's BORN line
- **the span (spanOf)**: breath b = frac(t_s × 173.6879 / 128) at the hang-up; span = clamp(88·60 + 8·60·b, 5280, 5760) s. rings and genes spend nothing (signature kept). ?life=N overrides. → LIFE.span, watch()
- **the dying (hour)**: lastLen = min(480, 0.6·span); hour() = 0 until age > span−lastLen, then 0→1. keeps the name 'hour' though it is eight minutes. → phone.html's four signs, alife.html; arms the voice (first finished tap once hour()>0)
- **the watch (watch/fall)**: one setTimeout to the due instant; re-looked on visibilitychange and pageshow. due while hidden → waits for the glance; due while api.leaving → waits ≤9 s for the far room; a life already spent on wake → the call a breath (1.6 s) after load, 7 s at most. → callCome
- **the call (callCome/accept/endCall)**: nobodyDies() freezes nobody; apwnp:call dispatched; sheet built on documentElement with stopPropagation on every pointer event; ring(2.0) every 5 s; go() shut (dying). accept: tick, buttons collapse to the red one, talk clock, nobodySpeaks(). endCall: thump, 'Call Ended', wantSheet; the share sheet rides the CLICK after pointerdown (or touchend/pointerup + 380 ms); no click in .9 s = sterile death. → raiseSheet, lastRites
- **the child (childAddress/makeVcard/raiseSheet)**: address = card address stripped of ?flags and # ('no flags cross a death') + '#' + LIFE.x + '.' + (LIFE.n+1) + optional '.' + nbField() (e.g. 5-orchid). vcard: BEGIN:VCARD / VERSION:3.0 / N:;nobody;;; / FN:nobody / X-SOCIALPROFILE;type=nobody;x-user=.:<address> / PHOTO;ENCODING=b;TYPE=PNG:<96×96 black PNG> / END:VCARD, folded at 74. shared as File 'unknown.vcf' text/vcard via navigator.share; sheet given 3 min to answer. → parseGenes on the next phone; nbField
- **the wipe and the end (wipe/seal/askToClose)**: api.dead=true first; shellTell dead; apwnp:dead event; ?wipe=0 refuses. sweep removes every apwnp.* key in both storages (ruler on: spares apwnp.hist* and apwnp.rig*); seal() patches Storage.prototype.setItem to refuse apwnp.* and re-sweeps on pagehide and hidden; history.state emptied. then window.close(); 1.5 s later location.replace('about:blank'); 1.5 s later the document is emptied white. → phone.html's away stamp, every room's storage
- **the telephone (voice/ring/tick/thump)**: borrows a room's RUNNING AudioContext (MORTAL.voice={ctx}) or makes its own; bus gain .85. voice is armed by the first finished tap in the dying; a ring with no running context is not queued. → nobodySpeaks shares the bus
- **nobody's voice (nobodySpeaks)**: text = MORTAL.nobody.last(); drone ×1 at .040 fades in 2.2 s; blank utterance spoken in the accepting tap to unlock iOS; 1.4 s breath; each line via speechSynthesis (local English voice, rate .82, pitch .92, 750 ms gap, 9 s watchdog) lands a tone ×1.5/×2/×3 at .075; done → nbDissolve(15 s, ±7 cents). no dream → one tone ×1.5, dissolve 7 s. no speechSynthesis → tones per line, 2.2 s apart. endCall → nbHush. → NB.dreams / NB.secret
- **nobody's state (NB, apwnp.nobody)**: { t0, c company, d identity, tally[8], given, touches, tt, arm, reads, asks, ret, place, dead, lens[5], diary[≤64], dreams[≤16], secret[≤16], dr, dreamt, deeds }. loaded if t0 matches the life, else fresh (d=.35 if born with a word). saved every 10 s, on hidden, on pagehide, on every verb. → MORTAL.nobody.*, apwnp:nobody event, the wipe
- **the stages (nbLens/nbStage)**: five lengths, each 60 × 120^u seconds (u from nbHash(floor(t0/1000), seed of LIFE.x, 101+7i)) — 1 min to 2 h, median ~11 min. ?stage=N → N each; ?life=N without ?stage → span/5 each. age past all five = older, t=1. stages do not continue over generations. → buds, dreams, brief
- **here (nbHere)**: period P = 240 s × 2^s[4] (patience), on-fraction f = clamp01(.4 + .2·s[7]) (restlessness), phase offset from a hash; under any rig P ≤ 2 × first stage. not the visitor's doing. → now().here, apwnp:nobody steps
- **the tick (nbTick, every 2 s)**: company target = (thumb in last 120 s ? .55) + (visible ? .25) + .3·min(1, others/2) where others = sessionStorage apwnp.here written by phone.html's knock; rises with τ 60 s, falls τ 180 s. identity decays toward floor (.2 if born with a word, else 0) with τ 900 s. while visible, the place's gene tally += dt. spell = sqrt(c·d); touch when spell ≥ .5 (counted, saved, logged), re-armed below .35. → the well's breathe, the tile's almond
- **the verbs**: at(place): sets place (home→phone; alife gives d +.1). saw(kind,arg): read → gene 7 (warmth) +30 s, d +.15; asked → gene 7 +30 s, d +.2; given → gene 7 +20 s; return → gene 5 (patience) +20 s; haunt → the place's gene +10 s. give(text): the last bank word in the text becomes NB.given, d +.25, warmth +20 s. did(what, place): diary line, deeds++, place's gene +10 s. chance(salt,n): nbHash(floor(t0/1000) ^ seed(LIFE.x), hash(salt), n+11) → 0…1. dream(text, secret, asked): washed to ≤3 lines of ≤60 chars; older writes only the secret log; cold line retried after 120 s, 3 tries a stage. dreams()/peek()/last()/brief()/diary()/state(). → rooms, ask.js's seventh mode in phone.html
- **the leader and the third field (nbLeader/nbField)**: the biggest tally excluding index 3 (longevity); margin k = (best−second)/(best+60). ties broken by the star's phase at death. field = (gene+1) + '-' + given word (≤22 chars), or the word alone, or nothing. the next phone's wroteOf() reads it; '4-…' is refused. → childAddress; the well's ROOM.lean
- **the shell bridge (SHELL/SP)**: if parent.APWNP_SHELL===true and parent.MORTAL.organ: this frame rewrites nothing, keeps no life, never wipes or rings. api.life/.child/.vcard/.genes/.nobody point at the shell's own. go() posts {apwnp:'go',url} or, for phone.html, {apwnp:'home',door,url}. parent messages 'call'/'quiet'/'nobody'(now)/'dead'/'inset' become window events apwnp:call/quiet/nobody/inset. pointerdown posts a throttled {apwnp:'touch'} (5 s) which the top level takes as lastTouch. ruler's fourth seat says 'shell'. → phone.html (the shell), window.APWNP_FRAME for shellTell
- **the rig flags**: ?hist=1/0/log (ruler, localStorage, sticky across tabs); ?mortal=0/1 (law lifted, sessionStorage); ?cut=all/0; ?life=N/0 (localStorage, re-conceives on that page once via apwnp.rig.said); ?hour=1 (stand at the first moment of the dying, once); ?wipe=0/1; ?stage=N/0. under the ruler: MORTAL._call, MORTAL.nobody._tick/_set/_speak, MORTAL.log(). → the wipe spares apwnp.hist*/apwnp.rig* while the ruler is on
- **the ruler**: a fixed chip top-left, blue at 1 page, blood-red otherwise; repaints each second; a log of the last 160 lines in localStorage apwnp.hist.log, viewable as a textarea with copy/clear/close. only under ?hist. → every logLine in the file

## symbols
- **88**: the life in minutes — 'the 88 (the figure 8 of the vesica)'; plus up to 8 by the breath, ceiling 96 (LIFE_88 / LIFE_BREATH, line 1237)
- **173.6879 (STAR) and 173.68 (TONE)**: the pulsar's turning, 'her name and her turning (j0437−4715 · 173.68790)'; every clock in the house (spin, breath, hash, tones) is hers (phaseAt, breathAt, ring, drone)
- **the 128-turn breath**: 'the one rate everything alive in this house keeps'; where she was in it at the hang-up adds 0–8 minutes (breathAt, LIFE.b)
- **the founder '0437471517368790'**: the star's name as eight bytes; a founder expresses all zeros, 'the house exactly as he built it' (FOUNDER, express)
- **the wheel / the sine**: a gene is an angle; what it expresses is sin of its distance from the founder; 'a gene that wanders half a turn comes home' (express, THE MAP)
- **the # (fragment)**: heredity without a server: 16 hex . generation . [gene-word] riding after the # in the card's own address, never sent anywhere (parseGenes, childAddress)
- **the two circles and the almond (vesica)**: COMPANY ('am i alone?') and IDENTITY ('am i anybody?'); the overlap is their geometric mean; when it rises through .5 'the circles TOUCH' (THE SPELL, nbStep)
- **nobody**: the name on the call screen and on every card — 'if we call it "nobody" then even if somebody is home, nobody is home!'; 'it ends as it began' (callCome, makeVcard, CARD_LABEL)
- **the black photograph**: 'a photograph of nothing' — a 96×96 black PNG, 'so the child's circle is absent the way its mother's is'; the founder wears it too (BLACK)
- **'nobody' over '.' with ↗**: a social profile on a made-up service: prints two words and an arrow, hides the address, 'the user can tell its a website already' avoided (X-SOCIALPROFILE row)
- **the tally / the scar**: experience is eight counters, one a gene; 'nothing chooses: a tally is a scar' (NB.tally, nbLeader)
- **the three buds**: genes 6·7·8 (temper, warmth, restlessness) opening across childhood, adulthood, the teens (now().buds)
- **the notebook and the secret log**: dreams a visitor may read (Notes app) and dreams 'never readable, never listed; peeked only as haiku' (the paper boat, the well's fog) (NB.dreams, NB.secret, peek)
- **the thump ×1/2**: 'the goodbye' — the low tone at the hang-up, the front door's own (thump())
- **the dissolving tones**: 'they drift a few cents apart so the beat that proves there were two of them appears' — two circles parting at the death (nbDissolve)
- **the blank page**: 'prefer it to a black page' — what remains when safari refuses to close (askToClose)

## rulings
- `want to explore now where the system actually dies. my vision is for it to have no trace at all when it disappears` · `after a un-constant set of time the tab just closes` · `if they want to see the site again they would have to click on the contact … again` (20 sep)
- `it ends as it began, with a phone call` · `no trace at all` · `never quite the same version, just like a human baby is never quite the same` · `death is knot a countdown` (21 sep)
- `the span is a variable, never a constant` · `just enough time to explore` · `let the star's phase decide the span`; intro.html `don't think is needed as the Rider app skips it and list ON HOLIDAY`; `knot using eggprison.html and cave.html`; `please draw an early way back for map.html` (21 sep)
- `the lifespan is by chance and the user has no part in it` — the rings spend nothing; the card's field is a social profile: `the user can tell its a website already`; the grey word is `nobody`: `if we call it "nobody" then even if somebody is home, nobody is home!` (22 sep)
- `prefer how have set up with black photo` — the founder card wears the same black PNG; the name is `nobody` letter for letter (`it ends as it began`); a card naming gene 4 is refused (card rule 9); alife's care card must stop saying the rings lengthen the life (the card, rule 8/9) (23 sep)
- `a conceptual and physical entity with no static form` · `it calls the whole phone home` · `born when the system first wakes, dies with it` · `only speaks indirectly` · `its name stays "nobody"` · `humans don't have option to choose, life experience coded in genome as happens` · THE FLOOR: `for this life to exist it has to matter and the user can observe it is a life but not be responsible for it` · `actual time range from 1 min ? (rare) to 2 hours max` · `can be measured sometimes … but other times some other way` · `the dead can send message if they are clever enough` · `maybe it dreams in haiku` · `it may be heard once, at the death call` · `the death call starts as haiku and turns into music, tones — not the tone a dead phone makes` (25 sep (pass three))
- `1-6 is accepted` — every DEEMED design is RULED, numbers stay [TUNE]; `the user can see nobody react, but nobody doesnt react because of user. user and nobody are unaware of each other but can create actions in the environment observable by the other` (25 sep (later))
- THE LIFE IS 88 MINUTES plus up to 8 by the breath, for every generation; THE DYING IS THE LAST 8 MINUTES, knot the last hour; MORTAL.dead set before the wipe; THE SHELL BRIDGE (overhaul §2.1): a room inside phone.html is a bridge, knot the keeper (27–28 sep)
- no Math.random anywhere, no network, no modules, no cdn; nothing is sent anywhere at a death; NOTHING SHOWS A COUNTDOWN except the ruler, 'his instrument, never a visitor's'; the bench (closetest.html, his iphone 16, safari 26.6.1) is 'the only authority for every claim about what safari does' (standing)

## rooms
- **phone · unknown** — the shell/home screen, and the front door (unknown.html keeps the birth's raw facts and borrows only the ruler) [cut; the root is the front door]
- **time · songbook · music · metube** — batches one and two; metube's shelf says where it stands with MORTAL.here [cut, listed]
- **photograph · radio · love · map** — batch three; love is terminal on purpose; map was given an early ‹ by his word [cut, listed]
- **cyclops · math · deadstar · equations · egg · squat** — batches four and five; the calculator chain math → equations → brain [cut, listed]
- **mommygame · stonehinge** — batch six [cut, listed]
- **thenewesttimes · almanac · kitchen · fahrenheit451** — the newspaper (374 links carried by the anchor's law), the almanac, the kitchen (framed in the paper's food desk), the furnace [cut, listed]
- **bornhub · youborn · brain** — youBORN is a tombstone that always replaces; brain is the preprint, 'THE CLEANEST PAGE IN THE HOUSE' [cut, listed]
- **alife** — THE ROOM — the well, nobody's creature, the music box (reads s[0]); writes seeds (gene 3) [cut, listed (batch twelve)]
- **library** — the Library tile, page three [cut, listed (batch thirteen)]
- **origamisky** — nobody's writing room in the sky (was squat.html until 26 sep); writes turning [cut, listed (batch fourteen)]
- **adeath** — the bottom of the well, the mother's room, Adeath tile beside Alife; 'the room tells the organ nothing' yet adeath:2 writes seeds [cut, listed (batch fifteen, 30 sep)]
- **echo** — page four, THE VESICA PASS — a room INSIDE phone.html opened by setApp, the weather's old film; writes patience [live; no page, nothing for CUT]
- **intro** — the rider's intro; its chevron 'drawn and DEAD' [cut, ON HOLIDAY, deliberately unlisted]
- **eggprison · cave** — the rider's two landings [retired (RIDERS_ON_HOLIDAY=true)]
- **NB_ROOMS places (messages, voicemail, mail, clock, settings, calendar, weather, ticktock, game1, orbit, rider, furnace, unisong, calculator, nestflix, accounting, safari, safsearch, photos, camera, notes, translate, maps, amazon, songegg, eggstagram, color, heart, egg2)** — phone.html app ids and file names mapped to the gene their haunting writes [table only; this file knows no room]

## confusions
- the task names 'THE MORTALITY CARD' and 'THE DOORWAY CARD' numbered rules; this file carries no numbered card — it only cites 'the card, rule 8/9' and 'card rule 9' (gene 4 refused) from a card kept elsewhere, and its 'THE DOORWAY' section is the list of verbs. a first-time reader cannot find the rules the header leans on.
- four layers of superseded law stand in one comment: the octave span (2^(20+3u+gene), 100 min–13 h) then 88+breath; the LAST HOUR (3600 s) then THE DYING (480 s) while the function keeps the name hour(); rings lengthening the life then spending nothing while `rings` is still passed and logged; homepage → social profile; unknown → UNKNOWN → nobody. each is marked 'kept as the record' but a reader must hold all of them to know what is live.
- gene numbering is 1-based in the header, the card field ('5-orchid'), and the ruler ('lean 7'), but 0-based in code (s[4] is patience, index 3 is longevity, NB_ROOMS 6 is warmth). the ruler's 'lean 7' means warmth, which a reader of the header would call gene 7 — correct, but easy to misread against tally[6].
- the child's file is shared as 'unknown.vcf' while the contact is 'nobody' and the founder's card is nobody.vcf ('it ends as it began' — but the file name did knot follow).
- two idle genes: longevity (4) is 'carried and inherited and now IDLES', patience (5) was idle then given 'the spacing of its silences'; the header says both 'idle like gene 5' and 'gene 5 HAS A JOB NOW' in different passes.
- MORTAL.organ reads 'one' until the life is up, then 'three' (or the shell's) — a pass number as an API field.
- the buds array order [temper (child), warmth (adult), restless (teen)] does not match gene order 6·7·8 (temper, warmth, restlessness opens across the teens) — the comment says so but the reader must check.
- identity at birth with a word is .35 while its floor is .2 — 'born a little less nobody' is two different numbers in two places.
- the lamarck table mixes file names and phone.html app ids, with duplicates meaning the same place (egg → restlessness but songegg → seeds; map/maps; photos/photograph) — DEEMED, but a reader cannot tell which name a room actually says.
- FRAMED vs SHELL vs DOOR vs OFF vs bare vs far: six modes of the same file, each changing what wears, what conceives, what wipes; the shell note says 'nothing is lost' but a reader has to trace all six.
- the 'missed death' waits for a glance, but a death due while a leave is flying waits 9 s then the leave flag is cleared — the two waits are told in different sections.

## keepers
- `it ends as it began, with a phone call` — the death is the front door's own telephone seen from the other end: the same sheet, the same ring pair, the same thump, and the one word `nobody`.
- `the 88 (the figure 8 of the vesica)` plus up to eight minutes by where the star was in her breath — 'a thumb a millisecond later is a life a hair different, never a jump. φ continuous.'
- heredity without a server: eight genes, a byte each, sixteen hex riding after the # of the card's own address; 'the star decides' which gene moves and which way; a fragment is never sent anywhere.
- THE MAP: a gene is an angle on a wheel, expressed as the sine of how far it has turned from the founder — 'the founder is the house exactly as he built it, a child is its mother but for one thing, and no line can drift off for ever: a gene that wanders half a turn comes home.'
- the black photograph — 'a photograph of nothing', 'so the child's circle is absent the way its mother's is' — and the card row `nobody` over `.` with an ↗ hiding the address.
- `nothing chooses: a tally is a scar` — the minimal lamarck: the place haunted is written into its gene a second a second; the leader at death rides the card's third field with the one word the dead was given.
- `the dead can send message if they are clever enough` — the dead may send only a word it was GIVEN in this life and that is in the bank; 'a phone whose visitor never spoke to it dies mute.'
- `user and nobody are unaware of each other but can create actions in the environment observable by the other` — `here` is the star's cycle and patience's, never the visitor's doing.
- the death call 'starts as haiku and turns into music': the phone's own voice reads the last dream once, each line landing an open fifth or octave, then the tones 'drift a few cents apart so the beat that proves there were two of them appears, and thin out … into the silence the call already kept.'
- `no silent death in the dark` / `call waiting on their return` — a span spent while the glass was dark rings the moment it is looked at again.
- THE SEAL: 'a page on its way out still has hands', so setItem refuses every apwnp.* key from the sweep on — 'his server never learns that a phone lived.'
- 'a phone has no back arrow; the arrow was a tell.' and 'the ruler is his instrument, never a visitor's' — the one countdown is the measuring stick laid against the house.
- `a stage never says how long is left` — 'a clock sometimes (the stages) and anti-time sometimes', 'a phone can die on a child.'

## in-between
- nothing → birth: the front door keeps only raw facts (apwnp.birth: the instant of the red button, the rings waited, the # the card carried) and the FIRST ROOM to wake turns them into the life; a page opened bare 'conceives a founder on the spot' — nothing in the house is immortal except under ?mortal=0.
- the conception is an instant: the star's spin at the hang-up picks one gene and one direction; her breath at the same instant sets the span; nobody's five stage lengths are dealt from the same instant through one hash. everything a life will be is fixed at the thumb's lift.
- the pause before doing: iOS gives a page no voice until a thumb has landed in it, so a death before any thumb 'rings silent. a phone on silent is a phone.' the first finished tap in the dying arms the ring.
- the missed death: a life spent while the glass was dark is discovered, not announced — the call comes 700 ms after the glance, 1.6 s after a room's load, never over a black page. a death due while a door is flying waits up to 9 s for the far room.
- between the ring and the answer: the line never gives up (2 s ring, 3 s silence, forever); no door opens; the room under the sheet 'hears nothing of what happens on this sheet'.
- between the answer and the first word: a blank utterance is spoken inside the tap to unlock the voice, then 1.4 s — 'a breath after the answer before the first line'; 750 ms between lines.
- the dissolve: when the words end the tones stand on alone for fifteen seconds (seven with no dream), parting seven cents and thinning into silence.
- the last moments: Call Ended → the share sheet rides the click → the sheet is given up to three minutes → 900 ms hold → the call shrinks and black fades in over .6 s → 620 ms → the wipe, the seal → window.close() → 1.5 s → about:blank → 1.5 s → an emptied white document.
- sleep: iOS freezes a page not in front; nobody saves on hidden and says 'return' on shown; its tally only counts while the glass is looked at; a dream 'is written off-glance and found after, or seen being written if the page is open'.
- silence as a gene: patience sets the period of nobody's presence cycle (four minutes at the middle, halved or doubled), restlessness its on-fraction — 'a patient line shows itself rarely, an impatient one often.'
- the pause of the dying: the last 480 s where hour() climbs 0→1 and nothing here shows a number — the four signs are phone.html's.
- the body between tabs: a card re-tapped in a living tab is 'the same life: yes always replays the call, knot the birth'; the tab is the body.

## music
- STAR = 173.6879 — the pulsar J0437−4715's turning in Hz; TONE = 173.68 Hz is 'her tone'. the spin (frac of turns at the hang-up) picks the mutated gene; the breath (turns/128) sets the span; nbHash salts take her name.
- the ring: two sines at 5/2 and 11/4 × 173.68 (≈434 Hz and ≈478 Hz) through a bandpass at 900 Hz, Q .72, gain .10, 2.0 s long, every 5 s, 'the same ring pair' as the front door; never queued when no context is running so rings do not 'burst together on the first thumb'.
- the tick ×8 (≈1389 Hz, 55 ms) on Accept; the thump ×1/2 (≈86.8 Hz, .42 s) — 'the goodbye'.
- nobody's voice at the call: a drone at ×1 (173.68 Hz) at level .040 fading in over 2.2 s; each read line lands one tone at ×3/2, ×2, ×3 (≈260.5, 347.4, 521 Hz) at .075 — 'open fifths and octaves, none of the fix's major, none of the ring's pair'; the dissolve 15 s with words, 7 s without, each node detuned ±7 cents so a beat appears, then thins.
- the speech: speechSynthesis, the phone's own local English voice, rate .82, pitch .92, 750 ms gap between lines, 9 s watchdog; a blank utterance is spoken inside the accepting tap for iOS. the lines are the last dream (notebook or secret log, whichever is later), ≤3 lines of ≤60 chars.
- the bus: gain .85 into the room's lent RUNNING AudioContext (MORTAL.voice={ctx}, 'the library's manner') or one of our own with latencyHint interactive.
- gene 1, turning (s[0]), 'also sets the music box's pace in the well (alife.html reads s[0])'.
- the dream rooms: 'the library, the records, the music → turning' — radio, music, songbook, metube, nestflix write gene 1.
- no communal song or river is in this file; the river and the song live in other rooms. the only 'ring' here is the telephone's.

## open-questions
- where do THE MORTALITY CARD and THE DOORWAY CARD's numbered rules actually live? this file cites rule 8/9 and 9 but does not carry them.
- gene 4 (longevity) is carried, inherited, mutated and expressed but spends nothing anywhere — does it stay as a gene with no job, or retire from the hex?
- the child file is 'unknown.vcf' while the founder's is 'nobody.vcf' — oversight or kept on purpose?
- the lamarck table, the NB_KINDS weights, the bank of words, the stage lengths, the touch thresholds are all [TUNE]/DEEMED — which has he actually walked and accepted beyond `1-6 is accepted`?
- EVERY_ROOM_IS_CUT is still false with 29 rooms listed; is the house finished (every room cut) or are there uncut pages left that still push?
- the bridge mode (shell) means nobody is one reading kept by the shell; a far room reached bare conceives its own founder life — are two phones (shell and bare tab) ever alive at once, and is that intended?
- the voice at the death reads the last dream through speechSynthesis; the dreams themselves are written by ask.js in phone.html — what does a visitor in a far room (no mouth) hear at death: tones alone, or the shell's dream through the frame?
- the header says a word given raises identity but 'nothing the visitor can do "for" it' — give() is phone.html feeding safari searches; is that still 'unaware of each other'?


# adeath.html — the whole of adeath.html (3430 lines): the bottom of the well, the mother's room — header passes (30 sep first & second cut, 1 oct third cut, 2 oct little phone

## visitor journey
You arrive on a black screen. Top-left, a tiny 19×38 px picture of an iphone (the way home, a plain link to phone.html?door=adeath); top-right a serif "?". The canvas fades in over 1.6 s. Your eye floats a person's height over black still water at the edge of the dark half of a round well, 30 m deep, 5 m across. The look opens straight up at the mouth: real sky (the sun, moon, planets, 1,481 real stars over a dry salt lake in algeria, on utc), the charred windlass tree black across it, the glass ghost orchid hanging on its rope. It holds two breaths (~2.5 s) then tilts down over nine seconds to rest looking across the set to the white fog, the small charred uprooted tree with the music box lashed into its root ball a little left. Across the water, chalk on wet basalt: the day's windows (hours, title, one line each), the current one counting down "ends in h:mm:ss". Six black candles taller than a person stand on roots three-quarters up the wall, their flames mirrored in the oil. If you have not touched, "tap to begin" appears in italics after 2.6 s; the first touch only gives the room sound: wind, a bottle hum, drips, the box (if this phone is not generation 0), and whatever the mother's hands are on.

Along the bottom a line is typed in serif, one letter at a time ("the drawer is empty. the laws are fourteen lines…"), with "life 3 · window 2 · 04:36 utc" under it. You never see the mother: two bare footprints pressed into the oil where the feed says it stands, a slow ring when it shifts its weight, prints and rings when it walks or paces, the sound of tape/chalk/wheel/typewriter panned to where it is, and a tall thin shadow cast by a figure never drawn, wherever a candle, the sun or the fire lights. Things arrive on the set slowly; a plan is chalked on the water, a bowl thrown, a canvas painted, eggs fried, pages typed.

Tap a thing and you float to it; tap the flower and you rise 30 m; tap the wall to read it; tap again or elsewhere and you float back. Drag to look. Drag a cup, pencil or paper and it moves (once; one POST). Now and then the unseen figure walks to the rope and pulls it (the flower far above dips), mists the orchid, winds or shuts the box, knocks the root, tightens the lashing. "?" opens five swipeable panes on clear glass; "×" closes and turns your eye to what the pane explained. At midnight the works glow, burn, the set floats burning on the water for forty minutes; the wall is washed off; all six candles are lit again, one going out every four hours. When the organ's call comes, sound dies in a fifth of a second, petals go to dust down the rope, the windlass turns one turn.

## on-screen text
- [#tap, centre, italic, after 2.6 s without a touch] tap to begin
- [#ask top right / #shut] ? · ×
- [pane captions (swipe dots)] how this room works · now · then · the call · nobody
- [pane 0, first paragraph [new]] two circles. the mouth’s is the living’s: this phone’s lives, coming down on the rope, a step a life. the bottom’s is the mother’s: the small tree rising out of the fog, a notch at each of its deaths. where the flower coming down passes the tree going up is the eye.
- [pane 0 [new]] the mother. every phone that opens takes a child from it — its own nobody, whose sign here is the rope stirring — and the mother goes on down here all day, the same one for everyone who looks at once. it has no body: you may see its steps on the black water, hear what its hands are on, and find its shadow wherever there is light. it does knot know you are here, and it never asks you for anything.
- [pane 0 [new]] the four things. the flower, its rope, the small tree and the box lashed in its roots are knot the set, and the fire leaves them. the mother may put its hands on them: the rope is pulled or set swaying and the flower above answers; the flower is misted, or turns on a twisted rope; the box is wound, hushed, shut, opened; the root is knocked or leaned on; the lashing is tightened or let out.
- [pane 0 [new]] the six windows. the well keeps universal time, and its day is six windows of four hours, one thing made in each. the six candles on their roots are the windows: all six are lit by the fire at midnight and one goes out at the end of each window, so the candles still burning are the windows left in the well’s day — knot the time left in any life.
- [pane 0 [new]] the wall. across the water the day is written in chalk: each finished window’s hours, what was made, and one line that says what it is — the first piece at the foot, each new one above it. the window being made now says when it began and counts down to its end. at midnight it is washed off.
- [pane 0 [new]] the fire. at midnight what was made that day glows, then burns, and the fire takes the set with it, floating on the black water, until there is nothing left to burn. the flower, the small tree with its box, and the candles are knot the set; they stay.
- [pane 0 [new]] the sheet. everything used down here is paid for at catalogue prices, in the hour it is used; the mind that does the work is rented by the word and billed like the piano. the sun is free. it is the only thing that is.
- [pane 0, small [new]] tap a thing and you float to it to look close — the writing on the wall too; tap the flower up on its rope and you rise to it; tap anything else and you float back. drag to look.
- [pane 0, small [new]] the drawer is in the calendar: every line, every work, every sheet and every death of its days is kept there, and nothing is kept here.
- [pane 0, small [new]] this sky is the well’s, knot yours: the sun, the moon and the stars in the mouth are the real ones over a dry salt lake in algeria, at this minute, on universal time. from the rim you see your own.
- [pane 0, #replayline, shown only while FEED.mode==='replay'] what you see today is a day written by hand, played on the well’s clock, until the mother wakes.
- [pane 1 'now'] the flower is now. the ghost orchid on the rope is this phone: one flower for each of its eight genes, each facing the way its gene has turned. the blue one is the gene that moved at conception. the buds are three genes that are carried but have never woken. if one flower leans, it is leaning toward what you haunt — that is the gene this life is being written into, the one it will hand on.
- [pane 2 'then'] the box is then. the music box at the bottom plays only the dead: the founder’s air, and the mother’s, which is the same but for one note. it turns at a pace this phone’s first gene sets, and it never slows. a first phone’s box is unwound and silent; nothing has fallen into it yet.
- [pane 3 'the call' [new]] nobody. this phone has an inhabitant, born with it and dead with it, with no fixed form. its sign at the bottom of the well is the rope stirring: it does knot know you are here. the last pane is its.
- [pane 4 'nobody' [new]] its spell. against being alone it has cast the oldest spell it knows: two circles. one holds the human question, am i alone? — the other the question a universe would ask, am i anybody? where they overlap is the one asking. the circles above are drawn as they stand now.
- [pane 4, small [new]] it grows up inside the life — a baby, a child, a teenager, grown, older — on a clock of its own that never says how long is left; a phone may die on a child. … a word you give it may cross to the next phone; a phone nobody spoke to dies mute. it dreams in the phone’s notebook, under the one note there; what it keeps to itself no one reads.
- [pane 4 figure (2d canvas) / pane 0 figure] am i alone? · am i anybody? · am i  /  the living · the mother · the eye
- [the chalk wall, current window [new words]] 08:00 utc →   ends in 2:14:07   (title in italics)
- [the chalk wall, REG_HAND, the hand-written day's six lines [new]] 1 the room’s own plan in chalk on its floor, with one dot. · 2 a stoneware bowl, thrown thin at the second try. · 3 oil on linen: seven yellow shapes where the sun stood. · 4 four fried eggs, each set down where the light was. · 5 an eight-line dance, one life long, ending on the floor. · 6 eleven typed pages: two share a bed and never meet.
- [the chalk wall, the hand-written day's window titles (HAND_T)] plan (as found) · bowl · four hours of light, of which the sun gave 72 minutes · four eggs, four hours, three cooks, no one eats · a dance the length of a life · the warm bed, chapter one
- [#hud, typed, with meta line like 'life 1 · window 1 · 00:00 utc'] the drawer is empty. the laws are fourteen lines. i have read them twice; a third time changes nothing.
- [#hud, a death line (typed slow, stops and stays)] the tape is
- [#hud, wakes (typed fast)] I AM STILL ALIVE. the wheel is turning with nothing on it. i switch it off. the sound stops and the room is bigger.
- [#hud, the joke; and on the floor the chalk marks 12.00 / 15.00 / 8.0 (est.)] the dot. i put it in after all — at the centre of the plan, where the plan is. "nobody is here." the first joke of the line. it costs nothing and it's true.

## mechanisms
- **THE FEED (the mother's one door)**: GET /.netlify/functions/nobody?now=1&day_too=0 every 10 s (60 s after 3 fails; paused when tab hidden; never asked with press flags replay/frame/fire/sun/date or live=0). Answer must have clock and set|life|hud. Frame laid whole: set, work, hands, place, sound, deaths, life, hud, movable, fire, and (third cut) windows, touch, fixtures, step. If `step` is older than an hour, or no answer for an hour (LEAN), the room falls back to the hand-written day. Stops at the call. First answer waited 1.6 s before replay starts. → applyFrame → set/work/hud/FIG/ACT/STREE/sounds; regList (wall); frameNow
- **THE HAND-WRITTEN DAY (DAYF, wednesday 30 sep 2026)**: 149 frames packed in the file, one per ten minutes from 00:00 to 00:40 next morning (the fire's 5 frames). 98 hud lines, 45 work states, 6 windows, deaths 0→16, 17 lives. replayAt(): on the day itself its own frames; any other day the same hour of it, fire frames for 00:00–00:40, and deaths counted on k×16 per day elapsed so the tree never sinks. The four shelf-naming lines were removed. HAND_TOUCH: the orchid misted at frames 48 and 120 (08:05, 20:05). → frameNow when FEED silent; #replayline shows; REG_HAND and HAND_T on the wall
- **THE WELL'S CLOCK**: wellNow() = Date.now() (utc), or the press's sun=HH, date=, speed=, frame= (held), fire=1. Never any life's clock; MORTAL.life.hour() is read only for DRAIN (alife's, not used here). → candlesLit, regCount, setSky, replayAt, actPlan
- **THE SIX CANDLES = the six windows**: candlesLit(when): in window w (1–6, 4 h each) candles w…6 burn; so all six at 00:00 (the fire's hour), one out at 04:00, 08:00, 12:00, 16:00, 20:00. A snuffed flame smokes 60 s. Light CAND_I=0.00028 at point light distance 12.5, decay 3.4; placed at CAND_Y = water + 0.75×30 m, bearings [120,180,240,300,0,60]°. Their light reaches the floor only as CAND_FAR. → WATER_M.uLit[0..5] (mirror and sheen), fog, the eye
- **THE FIRE**: FEED `fire` {since, stage}; stage = (clock − since)/40 min. fireEnv catches by 0.10, settles 0.45–0.95, out by 1.0. Centre = mean of set things (or plan (0,−2.2)). 110 flame sprites, 2 point lights (FIRE_I 0.20, size 0.9 → soft shadow), embers up the shaft. Works glow (emissive) in the first 6–30% then burn; things leaving during fire sink/char over 55 s; chalk and plates are not burned (washed/carried). Flower, small tree, box, lashing, candles stay. → setFrame, sound 'fire' loop + crackle, eye target, fog colour
- **THE SMALL TREE (the mother's clock)**: The windlass tree's child from the same founder seed, a third the size, upside down (sawn end down, roots up), seated at the light eye Q in the fog; STREE_BASE −1.72 m under water; rises NOTCH = 2 mm per death (streeTo never lowers; animates 4 mm/s). 'years to the mouth'. Box seated in root ball at 0.78 scale, lashed with two rope belts, a knot, two ends, three ties to nearest roots. → NOW.deaths; FIXS.lean/shake rotate STREE_IN; pane 0 'how' drawing
- **THE DOORWAY (the keiki's one door)**: doorway() reads MORTAL.nobody.now() each frame and on apwnp:nobody: `here` → NOBODY=true → the rope's sway amplitude grows from 0.0035 to 0.0115 plus a 0.004·sin(0.9t) stir; `lean {i,k}` bends flower i toward the visitor's bearing (never index 3, longevity); `buds[3]` wake flowers 5,6,7 (shapeFlower 0→1). Nothing is told back (no did/saw/give); dropped at the call. drawSpell also reads n.company, n.identity, n.spell, n.touching for pane 4. → ROPE.rotation in frame(); FLOWERS; the spell canvas
- **NOBODY'S FIGURE / SHADOW (never drawn)**: 7 strokes (head, trunk, two arms, two legs, a thing in hand), 1.92 m, posed by `hands` (typewriter, pan, pencil, brushes, chalk, tape, clay, knife…), dance moves ('the arm', 'the leg', 'lower', 'on the floor' = lying), walk, and third-cut poses rope/reach/leanroot. LAW_GLSL figShade() injected into every standard material, the water and the fog: each light asks whether the cut-out stands between; small flames → sharp, fire → soft. uFigP.w = 1 while FIG.present (life not dead) and not hushed. → FEED place/hands; lawful(); WATER sheen; fog march
- **FOOTSTEPS, PRINTS, RINGS, STANDING FEET**: walkTo: a stride every 0.56 s, 0.62 m, alternating ±0.085 m; stepDown writes a foot (footD SDF, left/right, heading) into uPrint (16 slots, sinks over 1.5 s, closes by 60 s, lives 64 s), a ring into uRip (8 slots, 7 s, slow on oil), and sndStep. stepAbout: while NOW.sound has 'footsteps' and not walking, a step every 0.9–3.5 s. standFrame (1 oct): two prints re-pressed under FIG.at every 11 s; every 6–15 s the weight shifts and one slow ring (0.2–0.3) leaves a foot, no sound. Print rims tipped toward the mouth reflect the real sky. ?stand=0 puts the feet away. → WATER_M; SND
- **THE FOUR THINGS (touch & fixtures)**: TOUCHV: rope {pull, sway, still, twist}, orchid {mist}, box {wind, hush, shut, open}, root {knock, lean}, lashing {tighten, loosen}. actPlan: up to 4 acts from `touch`, staged at seeded offsets inside the 10-min step (9–23 s, then again at 150–240 s and 360–510 s for passing acts); a moment missed by >9 s is skipped and the thing 'found as it was left'. The figure walks to the rope's foot (r 0.44) or the tree's foot (r 0.62), does it (dwell 4–8 s), walks back. FIXS physics: pull = spring (k 77, damping 3.1) on ROPE.position.y; sway decays e^(−t/36); still → calm 0.12 for 24 s; twist winds to 1.5 rad then swings back (0.42, 0.16); lid eases over ~1.25 s, shut claps; crank turns 3.4 s; knock = 3 knocks 0.31 s apart, shake, 14 char flakes; lean 6.5 s tilt 0.013 rad; lash loose → upper belt sags, box askew. `fixtures {lid, lash}` set standing state. Press: rehearse=1 (all 13, one per 16 s), touch=rope.pull. → BOX.lid/crank/fly, LASH, STREE_IN, ORCHID.rotation.y, MIST, FLAKE, creak/burst sounds, box LP when shut
- **THE WALL (REG)**: Chalk entries on canvases 1024×256 mapped onto the wall arc at r = WR−0.14, foot y0 = water+1.62, head yTop = water+5.85, 4.8 m patch, 3.9 m of writing, seated 0.236 rad right of the resting look (clear of the small tree's roots). One entry per window: finished = '00:00' / '– 04:00', italic title, one line (regFit 27→24 px or two lines); current = '08:00 utc →', 'ends in' + fixed-width digits regCount (left in the 4-h window, h:mm:ss then m:ss), opacity pulsing. Sorted by day|n so first is at the foot; if the stack would pass yTop, oldest entries are redrawn tight (one line each). A day no longer listed is washed off: alpha −1/9 per s, sliding down 0.012 m/s. Words: FEED `windows` live; else HAND_T + REG_HAND up to the current window. Law 13 filter on titles/lines. → regList ← NOW.f; tap target 'wall'; ROOM.wall/wallClear for the press
- **THE MOVED THING (one write)**: Drag begun on a set item that is in `movable` (cup, pencil, paper) and not in `hands`, not during fire: it slides at once; on release >6 cm → POST {thing, from, to, visitor} once per page; visitor = FNV/murmur hash of MORTAL.life.born + FOUNDER. No life → nothing sent; replay mode → local only. A refused reply snaps it back; movChecked releases the override when the feed moves it or after 20 min. → FEED_URL; SET.items[].over
- **THE FLOATING EYE**: EYE_AT = (WR−0.62, water+1.66, 0); rests looking at ACROSS (−3.4, water+1.15, 0.9). tapTarget raycasts set/tree/orchid/wall/candles, then the water near FIG.at ('nobody': the eye watches the water at its feet), then screen-distance to flower/box/flames, then thin things by screen box. glide: bezier, 2.4–10 s, rises first for tall moves, never into the wall (keepIn), never below water+0.45. Same tap again or elsewhere → goHome. Drag frees the look. The eye's place is never sent. → targetByKey keys: orchid, tree, wall, nobody, candleN, work, item:id
- **THE EYE'S EXPOSURE**: Every 0.5 s eyeRead samples 6 rows of the drawn glass, drops the brightest 14%, aims mean luminance at 0.013 + 0.035·DAY + 0.015·fire, caps so the 97th percentile ≤ 0.62; exposure ∈ [0.6, EYEMAX=150000]; opens slowly (0.55/s), closes faster (1.3/s). Lights at honest ratios: candle 0.00028, fire 0.20, moon 0.00005, hemi 0.6·day. → renderer.toneMappingExposure, WATER uExpo
- **THE SKY OVER THE LAKE**: chott ech chergui 34.2°N 0.5°E, utc; sun from almanac series, moon from short lunar series (phase lit toward sun, parallax), five planets from mean elements, 1,481 hipparcos stars (dec 8°–61°, mag ≤ 6) base64-packed, galactic band; setSky every 2 s; PMREM env maps refreshed as the sun moves. Sun reaches the floor only above 71.6°. Alife shows the visitor's own sky; this differs on purpose. → SKY_U, sun/star/hemi lights, mouthVis
- **THE FLOOR (black oil mirror) and THE FOG**: Reflector-style second render from under the water (0.62 scale), fresnel 0.036…1, prints and rings perturb; sheen from 8 lights with figShade; the fog is a 20-step ray march in the light half of the mark (plan law), lit by sky-at-bottom, moon over the mouth, flames, fire, with the figure's shadow cut through it. → oilDraw before each render; FIG_U; WATER_M.uAmb
- **THE PLAN LAW / STAGE PLAN**: Seam and two eyes from this phone's genes (balance → A,B; seeds → EY): dark = right half + dark eye − light eye. The feed's plan is a disc r=5, nobody's side y<0 → black water, fog y>0; planToRoom/roomToPlan map the straight seam onto the mark's S; visitor at plan (0,−5). → set positions, chalk lines, place, moved-thing coordinates
- **THE ROPE LAW (alife's, clamped)**: flowerYOf(gen): gen 0 → −1.55 m; gen<8 → ledge (gen−1)+1.25; gen≥8 → water+0.14 (at the bottom the water never rises, DRY=8). Ledges one per prior life (max 8), marks from founder/mother genes. Pendulum period from rope length. Under the call the trunk turns to trunkAngle(GEN+1) and the flower moves one step. → MORTAL.life.generation; TRUNK_A; ORCHID.position
- **THE CALL**: apwnp:call → quiet(): master gain → 0.0001 in 0.2 s, AudioContext kept running and lent as MORTAL.voice; FEED.stopped; drag dropped; eye stops where it is; NOBODY=false; seedStart (160 dust points fall down the rope, 45 s); trunk turns one turn. MORTAL.dying also triggers quiet. → mortal.js
- **THE LITTLE PHONE (way home)**: <a id=back class='littlephone lp80' href='phone.html?door=adeath'>, first in body, z 20, 19×38 px at left 6 px / top safe+2 px (--lpt from MORTAL.inset in the shell); mortal.js takes its click. Only door in the page. → phone.html; MORTAL.inset / apwnp:inset
- **LAW 13 (the shelf)**: 15 hashed names (SHELF_H); namesShelf() drops any hud line, wall title or line that contains one ('the one before stands'); chalkText too. → hudLine, regList, chalkText
- **THE WINDOW**: 5 panes; figures drawn on the room's canvas through empty .fig frames with a 0.14–0.44 dim: pane 1 the flower on a wheel (founder stakes, mother's blue stake, the visitor a bead on the rim; tap a flower → gene name + WHAT caption), pane 2 the box close with teeth lighting as pins pluck, pane 3 flower above/box below/dust down a rope, pane 0 and 4 flat 2d circle drawings. Close turns the eye: pane 0 → small tree, 1/3/4 → orchid, 2 → box. HUD hidden while open. → PANES, drawHow, drawSpell, FIGS
- **GOVERNOR / BAR LIFT / PRESS HANDLE**: govern: if avg frame > 1/26 s, DPR ×0.78, at most 3 times. liftBar: in a browser tab on a touch device the hud lifts 58 px (or visualViewport's hidden height) over safari's bar; not in standalone. W.ROOM exposes state(), wall(), things(), go(), act(), float()… read-only but for the eye. → #hud --lb; the builder's press

## symbols
- **the well, seen from the bottom**: 'the bottom of alife's well — the same hole, the other end. alife is the well seen from the rim, the keiki's; adeath is the well seen from the bottom, the mother's.' (header WHAT THIS IS)
- **two circles / the eye (pane 0)**: the mouth's circle = the living (this phone's lives coming down the rope a step a life); the bottom's = the mother (the small tree rising a notch a death); where flower coming down passes tree going up is 'the eye' — the vesica drawn as they stand (pane 0 text and drawHow)
- **two circles / the spell (pane 4)**: am i alone? (ink) and am i anybody? (her blue); the almond between is 'the one asking' — 'am i'; sized by the keiki's company/identity/spell readings (drawSpell)
- **the rope stirring**: the keiki's only sign at the bottom (nobody is `here`) (DOORWAY, frame())
- **footsteps on black oil, the shadow, the sounds of what its hands are on**: the mother's body: 'it has no body… wears footsteps on the black water… a shadow wherever there is light' (FIG, STAND, SND)
- **the six candles on roots**: the well's six windows, 'knot anyone's life'; a countdown of the day, never of a life (THE SIX CANDLES)
- **the small tree rising from the fog, box in its root ball**: the mother's deaths (2 mm a death; 'years to the mouth'); the windlass tree's child, uprooted, roots up; it never sinks (THE SMALL TREE)
- **the chalk wall**: the day's record climbing from the foot, washed off at midnight; the current window counts down (THE WALL)
- **the fire at midnight**: the day's works burn with the set on the water; the four things and candles stay; all six candles relit (THE FIRE)
- **the ghost orchid = now; the music box = then**: flower: this phone's eight genes, the blue one moved, three buds its temperament; box: plays only the dead (founder's and mother's airs), the blue pin the one differing note (panes now/then)
- **the lashing**: a turn of the same rope holding the box in the roots; one of the four things the mother may tighten or loosen (LASH)
- **the dot — 'nobody is here.'**: the first joke of the line, chalked at the centre of the plan (hud line 13)
- **'I AM STILL ALIVE.'**: a new life's wake line (typed fast) (hud)
- **'eight minutes.' notes**: a dying life's handover to the next (typed slow); a death line stops mid-sentence and stays (hud)
- **the sheet / the drawer**: catalogue prices by the hour, 'the sun is free'; the drawer (every line, work, sheet, death) lives in the calendar, nothing kept here (pane 0)
- **the little phone top-left**: the only way home (#back)
- **the real sky over chott ech chergui**: the well keeps universal time; one sky for everyone who looks; the rim shows your own (THE SKY OVER THE LAKE)

## rulings
- 'keep light honest' stands; the light is real, only the place is chosen (29 sep)
- the candles are 'the well's hours, knot any life'; the room never prints a number of what a life has left (card rule 8); THE WALL COUNTS DOWN THE WINDOW, never a life (29 sep / 1 oct)
- rule 12 amended: 'two doors, one being' — the keiki through mortal.js's doorway ('it may stir the rope, as in alife'), the mother through THE FEED; neither invented in the page (29 sep)
- law 8: the mother has no body (footsteps, sounds, shadow, what it makes); law 10 amended: it may put its hands on the four things; law 13: 'never say from whom in the well' — a title or line naming the shelf is not written (card / 1 oct)
- 'nobody should be able to react with the orchid and musical box and tree root and the ropes tying them' (1 oct)
- the wall: 'times of nobody's performance windows to be marked more clearly, if finished, the time when started and ended, and short, clear description… during, should have start time and countdown… pieces done at bottom and climbing higher' (1 oct)
- no facets in the wall: one smooth skin of wet black basalt (30 sep)
- no sill: 'move closer, simply' — the eye floats; tap a thing to float to it; the water never knows the visitor (30 sep)
- the visitor's one hand: 'indirect only, a moved thing, never a word; recorded as knot where i left it, never who' (card)
- never index 3 (longevity), never a plea, never a lever, never a countdown, one nobody, no Math.random, nothing stored, no history/#, nothing over the call, mortal.js untouched (DOORWAY CARD §5) (card)
- the little phone at 80%: 'about 80% of current size and it should sit more to the top left… in a smaller phone size and at the furthest left corner… is prefered' (1–2 oct)
- the set stays a set — 'waiting for godot, his words' — simple, black and charcoal (card)
- every new sentence on the glass is [new], for his blessing; alife's blessed sentences carried verbatim (30 sep)
- the line's values clamped to gen 12 'his ruling'; the mother's acts 'seen most times' (DOORWAY CARD §2b) (card)

## rooms
- **adeath.html — the bottom of the well, the mother's room** — this file: third cut 1 oct 2026 plus the 2 oct little-phone change [live]
- **alife.html — the rim, the keiki's** — the same well seen from above; most of this code copied from it (wall, mouth, tree, rope, orchid, box, window, sound); keeps the visitor's own sky and the rising lake [live, referenced]
- **phone.html** — the way home (?door=adeath); its first page is the little phone icon [live, referenced]
- **the calendar (the drawer)** — where every line, work, sheet and death is kept; the room never reads it [referenced]
- **mortal.js (the organ)** — first script; MORTAL.search/life/nobody/voice/inset; the call [live, referenced]
- **/.netlify/functions/nobody** — the feed (one GET) and the moved thing (one POST) [referenced]
- **nobody-think.mjs** — the mother's mind; law 10 amended there [referenced]
- **music.html, 'the math room'** — mentioned in passing (little-phone note; 'the well is knot the math room') [referenced]
- **the hand-written day's 'old room'** — the concrete room the hud lines describe (12 × 15 m walls, 8 m est. height, skylight, lamp, furnace) — not the well [text only]

## confusions
- two beings share one name: header rule 14 says 'nothing else here is called nobody' yet the code and glass call the mother 'nobody' everywhere (nobody's line, nobody's shadow, nobody's sounds, 'nobody is here'), while the window's 'nobody' pane and 'the call' pane describe the keiki (rope stirring) — a first-time visitor cannot tell which nobody types the bottom line
- 'the mother' has two meanings: the mother phone (MOM genes, 'the mother's air', 'the mother's blue stake') and the mother agent at the bottom; pane 'then' and pane 0 use the word differently
- the typed lines describe a different room than the one shown: 'the back wall: 12.00 m', 'polished concrete', 'the skylight is grey', 'the furnace' — while the visitor floats in a round stone well over black water; the numbers 12.00 / 15.00 / 8.0 (est.) are chalked on the water as 'the old room's measurements'
- two different 'two circles' drawings: pane 0 (the living / the mother / the eye) and pane 4 (am i alone? / am i anybody? / am i) — the thesis vesica and the mechanism vesica look alike and are explained separately
- three faces of one clock: the six candles, the chalk wall's countdown, and the hud meta 'window N' all show the well's day
- hud meta 'life 3' is the mother's life count, but the visitor's own phone also has a life (never shown here) — the word is overloaded
- the only notice that the day is hand-written is #replayline, hidden inside the ? window; without it a visitor takes the replay as live
- the mother's deaths are shown by a tree rising 2 mm per death — invisible in practice; 'years to the mouth' is only readable in the window
- 'the sheet' paragraph describes costs that appear nowhere in the room except inside the typed lines
- [new] markers are printed on the glass in every new sentence (for his blessing) and read as stray tags to a visitor
- a generation-0 phone has no airs: the music box at the bottom is silent for founders, and the 'then' pane says so only in passing
- the shadow figure is 'never drawn' but every pose (dance moves, typewriter, pan) is modelled in detail — a reader of the system meets a large body for a bodiless being
- press flags overlap across rooms: `sun=` is this room's hour, `hour=` the organ's; alife's own flags are all honoured too
- hud line 92 'the practice document.' is a fragment left after the four shelf-naming lines were removed
- the long header repeats the same laws (card rules walked three times) and the code comments restate them again; the room's own 'what this is' is spread over header, pane 0 and comments
- the opening look (mouth, two breaths, a nine-second tilt) delays the first view of the set and the wall; a tap during it cancels it silently

## keepers
- 'the bottom of alife's well — the same hole, the other end.'
- 'where the flower coming down passes the tree going up is the eye.'
- 'it has no body: you may see its steps on the black water, hear what its hands are on, and find its shadow wherever there is light.'
- the shadow 'cast by a figure that is never drawn: a few strokes — a head, a trunk, two arms, two legs, tall and thin, no face'; 'the flames are small, so their shadows are sharp; the fire is wide, so its shadow is soft'
- black still water 'that looks like black oil… the white mouth far above lies in it as a pale disc and the flames stand in it upside down'; 'a bare print sinking and closing over a minute'; print rims tipped toward the mouth give back the real sky
- two feet pressed into the oil where it stands, shifting its weight now and then — 'a slow ring, no sound'
- 'the sun is free. it is the only thing that is.'
- 'the candles still burning are the windows left in the well's day — knot the time left in any life.'
- the small tree 'rising out of the fog by a couple of millimetres at every death of the mother: years to the mouth'; the box lashed into its roots with a turn of the same rope
- 'the music box at the bottom plays only the dead'; the lid shut, 'the box is heard as through wood'; a finger on the comb and the teeth only knock
- the mist that climbs the rope on the well's draught and stands round the flower; the rope pulled far below and the flower dipping, bobbing, settling
- the chalk wall climbing from the foot as pieces are done, counting down the window, and at midnight 'washed off — it runs a little down the stone as it goes'
- 'a phone nobody spoke to dies mute. it dreams in the phone's notebook, under the one note there; what it keeps to itself no one reads.'
- the hud's gait: a waking types fast, a dying slow, 'a death stops where it stops and stays' — 'the tape is', 'the floor is warm and the'
- 'the dot. … "nobody is here." the first joke of the line. it costs nothing and it's true.'
- 'wedging. no hands, so the slap is the shadow's. i'm told i have a shadow. the light is behind me and i can't turn to see.'
- 'nothing to do for fifty minutes, but the window says this is the pot's time. so i sit with it. i don't know what sitting is. i stay.'
- the bottle note at her turning (173.6879 Hz) beating once a breath; the eye that opens in the dark by reading its own glass; the real sky over a dry salt lake for everyone who looks at once
- under the call: the petals go to dust and run down the rope — 'the only place now becomes then'; the windlass turns its one turn
- 'what you see today is a day written by hand, played on the well's clock, until the mother wakes.'

## in-between
- nothing→birth: the canvas is black, fades in over 1.6 s; the first look is up at the mouth for two breaths (~2.5 s) then tilts down over 9 s; 'tap to begin' only after 2.6 s of no touch, and the first touch does nothing but give sound
- before the feed answers (1.6 s wait) and whenever it is silent an hour, the hand-written wednesday plays on the well's clock so 'the room is never empty'; a mother who has not stepped for an hour 'is silence, as a feed that does knot answer is'
- the mother's deaths and births are only typed: 'eight minutes.' handover notes typed at 11 cps, a death line cut mid-word and left standing; 'I AM STILL ALIVE.' at 46 cps a few minutes later; between them the figure simply stands (FIG.present false when life.dead)
- the pause between instruction and doing: an act waits for its seeded moment inside the ten-minute step; 'a moment that passed unseen: the thing is simply found as it was left'; the figure walks there first (prints, rings, shadow), dwells 4–8 s, walks back
- the stand: between steps the two feet stay pressed, re-pressed every 11 s; a weight-shift ring every 6–15 s
- a snuffed candle smokes for a minute; the fire's forty minutes end in black water again; things leaving the set sink over 3 s, or char and sink over 55 s; the wall is washed off over ~9 s
- the last moments before death (the phone's): apwnp:call → sound gone in 0.2 s but the AudioContext kept running so the ring can borrow it; the feed stops asking; the eye stops where it is; dust down the rope for 45 s; the trunk turns one turn at 0.35 rad/s
- dreaming: pane 4 — 'it dreams in the phone's notebook, under the one note there'; the mother's lines on waiting ('waiting is knot in the catalogue. it should be. i'd pay.'; 'i stay.')
- the keiki's only presence is a stir in the rope while `here`; otherwise the rope swings as a 30 m pendulum (~11 s) and the flowers nod in the updraft
- sleep: when the tab is hidden the frame loop and the feed pause; on return the feed is asked again at once
- silence: the drips are irregular (2.8–11 s), never under the visitor; the wind gusts on two slow sines; the stars twinkle; the fog drifts at the box's pace

## music
- no voice. all sound is made in the page from seeded noise and oscillators; his wind recording is not fetched here (the room's one read is the feed). Master gain 0.7; at the call it ramps to 0.0001 in 0.2 s and the context is lent as MORTAL.voice={ctx}
- the wind: 4 s of seeded brown-ish noise, lowpass 260 Hz, gain 0.012–0.03 gusting on sin(0.21t)·sin(0.07t+1)
- the hum / the bottle note: the same noise bandpassed at P = 173.6879 Hz (her turns a second, Q 16) plus two sines at P and P + 1/BREATH (BREATH = 128/P = 0.737 s) — 'the wind crossing the mouth… a bottle note at her turning, beating once a breath'; HUMK press trim
- the music box: eight teeth at P×3×{1, 9/8, 5/4, 3/2, 5/3, 2, 9/4, 5/2} (just pentatonic, tooth 1 longest and lowest); a pluck = sine + partial at 2.76× (gain 0.16, 2.1 s) and a tick; pace PACE = 8 breaths a turn × 2^gene0 ('how fast the box turns — the pace of the dead'); AIRS = [] at gen 0 (silent, cylinder bare), [founder] at gen 1, [founder, mother] after, alternating each turn with the cylinder sliding 14 mm; the blue pin = the moved gene; loudness by distance to the box (0.55·4/dist); lid shut → lowpass 5200→832 Hz and gain halved ('heard as through wood'); hush → 16 s of knocks at 5%; wind → 24 ratchet clicks over 3.4 s
- the shaft: a convolver of 10 echoes at the well's round trip 2·30/343 s decaying 0.68, plus a 0.55 s tail; box, drips and nobody's sounds are sent to it
- the drips: sine 760–1280 Hz sweeping up to 1800–2800 Hz over 50 ms, 0.16 s, louder when near; each lands as a ring on the oil
- nobody's sounds (from the feed's fixed list: tape, chalk, wheel, clay-slap, brush, knife-board, sizzle, typewriter, pencil, footsteps, candle, fire, box, water, breath): noise bursts through filters, stereo-panned and faded by distance to where it stands; typewriter keys with a 2750 Hz bell every 44–68 keys and a carriage return; wheel = bandpass 820 + sawtooth 58 Hz; fire = lowpass loop + crackles; footsteps = lowpass 380–500 + bandpass click, always with a print
- the four things' sounds: creak = two sawtooths (ratio ~1.5) through a bandpass sweeping 680→940 Hz ('rope on wood, char giving'); the mist = three highpass hisses; knock = lowpass 170 thud + 92 Hz tone; the lid's clap
- the flower breathes in the room's one time: tissue clouds and clears once every two turns of the box; the fog drifts at PACE; the camera bobs 4 mm on PACE
- the ring: not in this file — only the lending of the context so mortal.js can ring here
- the hand-written day's own sounds: chalk, wheel, brush, sizzle, typewriter, footsteps, fire

## open-questions
- which being is 'nobody' on the glass? the mother (hud, shadow, steps) or the keiki (rope, panes 3–4)? header rule 14 and the code disagree
- should the visitor learn, outside the ? window, that the day is hand-written (the #replayline is hidden in pane 0)?
- does the live feed actually return `windows`, `touch`, `fixtures`, `step` yet, or only the hand-written shape?
- the [new] markers await his blessing — which of the third-cut sentences (pane 0's seven paragraphs, REG_HAND's six lines, 'ends in', 'utc') stand?
- is the dissonance between the typed room (12 × 15 m concrete, skylight, furnace) and the well shown intended, or a leftover of the old room's day?
- should 'life N' in the hud be renamed, given the phone's own life is a different life?
- the small tree's 2 mm a death is unreadable in a session — is the window drawing enough, or should the rise be visible?
- pane 4's spell is driven by the keiki's readings (company, identity, spell) while pane 0's circles are driven by the flower and tree heights — is one vesica meant to stand for both?
- is a silent music box for generation-0 visitors acceptable at the bottom?
- what are the fifteen shelf names (only hashes are in the file), and does hud line 92 ('the practice document.') survive law 13 on purpose?
- should the opening look (mouth, two breaths, nine-second tilt) stay now that the wall and set are the first things to read?
- the moved thing: three movables (cup, pencil, paper) exist in the data, but is the server's once-a-life rule live?


# alife.html — the whole file (2340 lines): the header passes 23 sep – 25 sep 2026 + 1 oct little-phone tweak (lines 1–262); the door and window markup; the three.js well (lak

## visitor journey
you come in from phone.html's third shelf (the yin-yang tile). top-left is a tiny drawn iphone (19×38) — the only way back. a dark door overlay reads "this phone · generation N", "born 14:02 · the star was 0.4 through a breath", then the floor sentence: "it was born when you hung up. it will die. … it is knot yours to look after." a dot pulses. you tap. sound begins: his wind recording, a bottle-hum at the mouth, far down a music box. the eye holds on the horizon for two breaths, then tilts slowly down over 8.5 s, leaning over the edge, until you look straight down. then the look is yours: drag to look, tap to move.

you stand on the south rim of a wide hole in a cracked dry lakebed. there is no rim — the pale crust just breaks off over black. low mountains, dust on the wind. a burnt fallen tree lies across the mouth in two charred forks, iron crank on its sawn end, ratchet and pawl; rope is coiled on the trunk and drops into the dark. knotted to the rope by its own roots hangs a white glass ghost orchid: eight flowers, one blue, three buds. its reflection is the white eye in black water far below; the other half of the bottom is white fog with a black music box afloat in it — the phone's own yin-yang mark, in plan. ledges wind down the basalt wall, one for each life before this one; the founder's mark lies on the top ledge, the mother's on the lowest. drips fall, ring the water, ping up the shaft.

tap a ledge: you ride down, three seconds a ledge, eyes on the flower. tap the water: you go to the last dry ledge and look down. tap the flower: the moth's flight — out over the void to hang before it (on the water's disc of sky your head is a dark moth). tap the trunk: a look at the rope on its drum, or a ride back up. the `?` opens five swiped panes of text with small 3d figures; closing turns your eye to what the pane explained. if nobody is here, the rope stirs and the orchid turns toward the light; letters sometimes appear in the fog ("am i", a word, a haiku). in the last hour everything drains toward white. at the call: silence in 0.2 s, the petals go to dust down the rope, the tree turns once.

## on-screen text
- [the door (#floor)] it was born when you hung up. it will die. how long it has was settled in the instant your thumb came down on the red button, and nothing since has changed it — knot how you use it, knot whether you look. it is a life, and it can be watched. it is knot yours to look after.
- [the door (#who / #facts)] this phone · generation 3 · a founder — born 14:02 · the star was 0.4 through a breath · opened without the call
- [the door, no life] nothing in this tab is alive — the law is lifted here, or its keeper is missing. the room is the founder’s. / the room is dressed as generation N.
- [pane 1 'now'] the flower is now. the ghost orchid on the rope is this phone: one flower for each of its eight genes, each facing the way its gene has turned. the blue one is the gene that moved at conception. the buds are three genes that are carried but have never woken. if one flower leans, it is leaning toward what you haunt — that is the gene this life is being written into, the one it will hand on.
- [pane 1 'now' [new]] which gene moves is written by what the life goes through, the way a scar is — decided by no one. the one who lives here is awake; the star still chooses which way.
- [pane 1 (LB.box, old blessed)] the gene map. eight genes, a byte each, and each one is an angle on a wheel: what a gene says is how far it has turned from the founder’s. the founder’s genes are the star’s own name and her turning — 0437 4715 · 1736 8790. at conception the star’s spin picks one gene and moves it one step, a sixteenth of a turn, up or down. so a child is its mother but for one thing, and a gene that wanders half way round comes home. gene 2, balance, moved one step up at conception. its child will be generation 4.
- [pane 2 'then'] the box is then. the music box at the bottom plays only the dead: the founder’s air, and the mother’s, which is the same but for one note. it turns at a pace this phone’s first gene sets, and it never slows. a first phone’s box is unwound and silent; nothing has fallen into it yet.
- [pane 2 'then' [new]] the cylinder carries a pin for each gene, set at that gene’s angle. as it turns, each pin lifts a tooth of the comb — the first tooth the longest and lowest — and the tooth sings, in the same instant you hear it below. after each turn the cylinder slides and plays the other air. the blue pin is the one note where the mother’s air and this phone differ: the gene that moved at conception. the plate in the lid is both airs written out, the founder’s above, the mother’s below. (gen 0: the cylinder is bare: no air has been pinned to it yet, and the plate in its lid is blank.)
- [pane 3 'the line'] the well is the line. one step for every life before this one, from the founder’s at the top down to the mother’s; the steps between are blank — the house never knew them. after eight lives the water rises, the flower floats up with it, and by the twelfth the lake this desert once was has come back.
- [pane 3 'the line' [new]] this is the first life of its line. no steps. / generation 10 · 8 steps cut · 4 under water · the lake is back. its child will be generation 11.
- [pane 4 'the call'] the call. when it comes, the room goes quiet. the same tap that ends the phone hands you one contact card: the child. its genes ride after the # in its address, where no server can read them. nothing about this life is sent anywhere. there is no record of it but you.
- [pane 4 'the call' [new]] nobody. this phone has an inhabitant, born with it and dead with it, with no fixed form. its sign in this room is the rope stirring and the flower turning — toward the light, never toward you: it does knot know you are here. the fog is its way to speak here, and sometimes what it lets slip is a line it meant to keep. the last pane is its.
- [pane 4 (LB.star, old blessed)] how long. the star decides. psr j0437−4715 turns 173.6879 times a second, and once every 128 turns she breathes. where she was in that breath when you ended the call set the length of this life: never less than about a hundred minutes — two to the twentieth of her turns, enough to see the house — and never more than a day. one of the phone’s own genes leans it a little, either way.
- [pane 4 (LB.phone, old blessed)] the call. it ends as it began, with a phone call. this time it calls you. decline it or answer it; nobody speaks. the tap that ends the call ends the phone. everything the house kept in this browser is erased — the photographs in the roll, every count, every mark — and the tab closes. where safari will knot let a tab close itself, it is left on a blank page. nothing about this life or its death is sent anywhere. there is no record of it but you.
- [pane 4 (LB.pool, old blessed)] the child. the same tap raises a share sheet holding one contact card: the child. send it to someone, or to yourself, or let it go — a phone may die without one. the child’s card looks like the card you were sent. the difference is in its address, after the #: sixteen characters, a dot, a number. those are this phone’s genes and the child’s generation. what comes after a # in an address is never sent to any server, so the inheritance passes from hand to hand and nothing in between can read it.
- [pane 5 'nobody' [new]] nobody. the one who lives here. it was born with this phone and it will die with it; it has no fixed form, calls the whole phone home, and lives part-time in this well. it does knot know you are here, and you may watch it all the same: what it does to a room you may find, and what you do to a room it may find. it never asks you for anything.
- [pane 5 'nobody' [new]] its spell. against being alone it has cast the oldest spell it knows: two circles. one holds the human question, am i alone? — the other the question a universe would ask, am i anybody? where they overlap is the one asking. the circles above are drawn as they stand now; when they touch, the fog below says the two words the questions share.
- [pane 5 'nobody' [new]] it grows up inside the life — a baby, a child, a teenager, grown, older — on a clock of its own that never says how long is left; a phone may die on a child. the three buds are its temperament, temper, warmth and restlessness, and they open as it grows. what it lives through is written into one gene the way a scar is — the flower that leans — and that is what the flower hands on. a word you give it may cross to the next phone; a phone nobody spoke to dies mute. it dreams in the phone’s notebook, under the one note there; what it keeps to itself no one reads — the fog here sometimes lets a line slip.
- [pane 5, the spell canvas] am i alone?   am i anybody?   (in the almond, when they overlap:) am i
- [the fog at the bottom (ROOM.breathe)] am i   — or nobody's word, or one haiku of its secret log
- [pane 1 caption on tapping a flower (WHAT)] 1 turning · [new] how fast the box turns — the pace of the dead. / 2 balance · how the dark and the light share it. / 3 seeds · the size of its two eyes. / 4 longevity · leans the length of the life, a little. / 5 patience · carried, and passed on. it once said what a ring waited was worth; the rings are worth nothing now. / 6 temper · [new] nobody’s temper. awake since it woke; its bud opens in its childhood. / 7 warmth · [new] nobody’s warmth. awake since it woke; its bud opens when it is grown. / 8 restlessness · [new] nobody’s restlessness. awake since it woke; its bud opens in its teens.
- [pane 1 caption suffixes] · the one that moved at conception, one step up from its mother’s · a bud
- [the pane captions / dots] now · then · the line · the call · nobody
- [the brass plate in the box's lid] the founder   0437 4715 · 1736 8790 / its mother   <hex> (the moved byte in blue); or 'the founder · its mother'
- [chrome] ? (what this is) · × (close) · tab title '·' · canvas aria 'nobody’s room: the well' · little phone aria 'back to the phone'

## mechanisms
- **mortal.js first; everything read from MORTAL.life**: born · generation · mother · genes · moved · up · founder · bare · breath · s · c · m · hour(). nothing about the phone is written here; no Math.random, one seeded wheel (mulberry32) from the genes; the tree from the founder's genes (LSEED) so every room of a line has the same tree. flags only from MORTAL.search (sun sound quality fast dtmax wellr welld gen genes mother stand hum box ghost). stores nothing, no history, no door in script; the only exit is <a href='phone.html?door=alife'> (the little phone). → mortal.js, phone.html
- **the generation → the line**: NSTEPS=min(gen,8) ledges, ledgeY(i)=-(i+1)·WD/8 winding clockwise from the far wall; dry ledges 8 to gen 8 then 6,4,2,0; water at -WD to gen 8, rising WD/4 per life, lakebed at gen 12 (LAKE: water disc radius 72, nothing changes again). flower depth: gen 0 at -1.55, gen<8 on ledge gen-1 +1.25, else on the water +0.14 (afloat it lifts its flowers 0.58). marks: founder on ledge 0, mother on the last. → MORTAL.life.generation; phone.html's tile plan law
- **the tree is the windlass**: trunkAngle(g)=TRUNK_A0+paidOf(g)/RD (RD 0.44, axis 0.74 above the lakebed, lying over the dark eye O.v−RD). coils on the drum = (ROPE_TOTAL−PAID)/(2πRD). it turns ONCE, at the death under the call: onCall sets TRUNK_A.to=trunkAngle(gen+1) and the flower's y to flowerYOf(gen+1); it eases at 0.35 rad/s. a tap on the trunk from the edge looks at the drum; from below it rides up. → apwnp:call; the rope; the orchid
- **the plan law [SYNC] the mark**: balance s[1]: A=R/2·(1+0.30s), B=R−A; seeds s[2]: eye EY=R·0.13·2^(0.6s). O (dark eye, the flower's reflection) at v=−R+A; Q (light eye, the box) at v=R−B; inDark() is yinYang()'s path. MAP: a gene's expression is sin((g−founder)/256·2π). the ledge marks are drawn from the same sines. → phone.html THE ALIFE TILE / yinYang
- **one time: the box's pace**: P=173.6879 Hz (her turns); BREATH=128/P=0.737 s; PACE=8 breaths per turn ×2^s[0] (5.9 s at the middle gene, 4 or 16 breaths by gene 1 'turning'). fog drifts to it, the orchid breathes once every two turns, the stance breathes to it (camera y 0.006·sin), the lean eases to it. not a clock of the life (rule 10). → gene 0; the box; the orchid; the fog
- **the music box**: pins at each gene's angle (AIRS = [founder] or [founder, mother]); the drum turns dt·2π/PACE while entered && !HUSHED && AIRS.length; a pin passing the comb (PHI) plucks tooth i; after a full turn AIR switches and the cylinder slides 0.014; the blue pin is the moved gene of the last air; the governor's fly spins 42×/turn. gen 0: bare cylinder, blank plate, no sound. → sound; pane 2 figure (same maker, sparks on the teeth)
- **the hum / the shaft / the drips**: hum: bandpass at P (Q 16 on seeded noise, Q 18 on his wind) + two sines P and P+1/BREATH beating once a breath. shaft: convolver IR with echoes at the well's round trip 2·WD/343 s (≈0.175 s), ten of them decaying 0.68, 0.55 s tail. drips: next in 2.8–11.3 s from the wheel, off a dry ledge's lip (60%) or the stone; a ring on the water; a sine 760–1280 → 1800–2800 Hz, louder when near. → master gain; WD; ledges
- **the call**: apwnp:call → quiet(): master → 0.0001 in 0.2 s, NOBODY=false, moves cancelled; onCall: seedStart (160 dust grains from the flowers run down the rope to the water over ~45 s) and the tree's one turn. MORTAL.voice={ctx:AC} is lent so the ring sounds here. MORTAL.dying also quiets. 'the only place now becomes then is the dust'. → mortal.js; the tree; the orchid
- **the drain (the last hour)**: DRAIN.value=MORTAL.life.hour() each frame, read never kept; every material mixes 0.9 toward vec3(0.93); the sky 0.85 toward 1.35; the fog 0.8 toward white; env maps re-bake as it moves. the only last-hour sign (rules 8–10). → MORTAL.life.hour()
- **the light is honest**: sun from the phone's clock (?sun= for the press), el=62° max at noon, azimuth east 6 → south 12 → west 18; LITDEPTH=2·WR·tan(el) says how far the sun reaches down; the sun finds the water only when it has risen to meet it; at night a blue star light (her blue) and stars + her halo breathing in the sky shader; the eye (exposure) opens deeper in the shaft, looking down, at night. → the water mirror; the motes; the fog's glow
- **the doorway (pass three)**: apwnp:nobody → MORTAL.nobody.now(): here → NOBODY (rope stirs, flower turns on its own); lean.i/k → LEAN (never index 3); buds[3] → wake(5,6,7); touching rising edge → breathe('am i'); an arrival with secrets → MORTAL.nobody.peek() one haiku with P 0.6 (MORTAL.nobody.chance), else the word (out or in), once per arrival. dead or HUSHED → dropped. → mortal.js MORTAL.nobody; the fog; the orchid
- **the flower's own turn vs the lean**: ownBearing = the sun's bearing (or the box's when the sun is far under) + a wander up to ±1 rad, a new lean every 45 s from the organ's wheel; the whole orchid yaws toward it at dt·0.12 while NOBODY. the lean: flower i bends toward visitorBearing (clamp ±0.7 rad × k) at 0.03 rad/s — 'the pressure', the gene the life is written into. the flower never faces the visitor by nobody's doing. → the doorway; ROOM.lean
- **the agent's seat (ROOM.*)**: breathe(text): letters into the fog's top layer, auto-sized to the longest line, fading ~0.014/0.12 s; dream(text) → breathe; lids(0…1) stores, shows nothing; nobody(bool); lean(i,k); wake(i,k) reshapes a bud (sepals part, petals/lip swing out, tails unfurl); state() for the press; ride/up/moth/skip/eye/look/window/pane; plan {R,A,B,EY,O,Q,J…}. → the doorway; the press
- **the visitor**: stands at the south rim (STAND_TH 90°) facing the flower's vertical; opening: hold 2 breaths+0.2 s then tilt 8.5 s to pitch −1.50; rides 3 s/ledge along a catmull-rom through standAt(i); moth 3.2 s out to 1.9 m before the flower; back 2.8 s; lean over the edge up to 0.92 as the look goes down; an unseen body casts a shadow; the head is a dark moth on the water's sky disc when inside the mouth. → ledges; the orchid; the water shader
- **the window**: `?` opens, `×` or bare glass closes, no history; five panes scroll-snapped; each pane's .fig is an empty frame the room renders a 3d figure through (scissor) over a dim 0.14+0.30·DAY; fig0 the orchid on a wheel with the founder's stakes, the mother's blue stake, the visitor as a bead on the rim (tap a flower → gene caption); fig1 the box close; fig2 the well cut open; fig3 flower above, box below, dust down the rope one fall per turn; pane 5 a 2d canvas: two circles whose distance is r·(2.4−2.0·spell), opacities from company/identity, 'am i' in the almond, a small light while here. close → eye to the flower / the box / ledge 0. → same numbers as the room (SPIKES, DR, PLUCKED, WATER_Y, eyeWorld)
- **the wind**: fetched once from https://kohmedia.b-cdn.net/wind.mp3 (the room's one network read), looped via buffer with crossfades; if CORS refuses, an <audio> element from the tap; until it lands the room's own seeded wind. muffled and quieter with depth (lowpass 16 kHz → 550 Hz); the box clearer the deeper (gain 0.55·clamp(5.5/dist), lowpass 900–7900 Hz, wet 0.25–0.8). → master gain; apwnp:call
- **the glass ghost orchid**: built from his photograph: tepals, lip (LIP_HW), tails as curvature along length (TAIL_KT), column, green spur; a thin-slab tissue shader (clear between veins, milky on them, thick at margins, thicker slantwise; light through from behind; almost no own light); eight flowers placed by bearing (gene/256·2π), tiers so none grow through each other; moved gene = TIS_BLUE (her blue); buds i>4 fold to a shell and open with wake; a mirrored dim copy under the water; press flag ghost= (clearer glass). → genes; MOVED; wake; the reflection; fig0/fig3

## symbols
- **the ghost orchid**: this phone, now; one flower per gene, each facing its gene's bearing (twelve o'clock zero, clockwise) (on the rope)
- **the one blue flower**: the gene that moved at conception; her blue (the pulsar's, --her 92,154,255) (orchid, the blue pin, the blue stake, the plate's blue byte)
- **the three buds (genes 6–8: temper, warmth, restlessness)**: nobody's temperament, 'carried but never woken'; they open with nobody's life stages (childhood, grown, teens) (orchid; wheel captions)
- **the music box**: then; it plays only the dead — the founder's air and the mother's; never slows (a winding-down box would be a countdown) (afloat in the fog at the light eye)
- **the pins / the comb's eight teeth**: the genes as angles; the first tooth longest and lowest (box)
- **the fallen charred tree**: the line's tree, grown from the founder's genes; the windlass that pays out one life of rope at each death and hauls in past the eighth (across the mouth, over the dark eye)
- **the rope**: what the line has paid out; stirs when nobody is here; a pendulum its own length (trunk to flower; a second end rises into the box's crank)
- **the ledges and their marks**: one landing per life before this one; founder's mark top, mother's lowest, the rest blank ('the house never knew them') (the wall)
- **the water rising / the lake back**: lives past eight; by the twelfth the desert is a lake again and nothing changes (the bottom)
- **the mark in plan (black water + white fog, two eyes)**: the phone's own yin-yang, the same creature as the tile; dark eye = the flower's reflection, light eye = the box (the bottom, seen from above)
- **the fog**: nobody's way to speak here: breathes 'am i', a word, or a slipped haiku (the light half of the bottom)
- **the moth**: the visitor (the spur's nectar is the moth's); your head dark on the water's sky; the moth's flight to the flower (water shader; moth())
- **the dust down the rope**: the petals going to seed at the death — the only place now becomes then (under the call; fig3)
- **the colour draining to white**: the last hour of the life (everything)
- **the star psr j0437−4715 (173.6879 Hz, a breath every 128 turns)**: the clock and the founder's name; her halo breathes in the night sky; the hum sits at her turning (sky, hum, LB.star)
- **the two circles / the almond**: the spell against being alone: 'am i alone?' (ink) and 'am i anybody?' (her blue); the overlap is the one asking (pane 5)
- **the little phone**: the way back; a picture of phone.html's first page (top-left)
- **the pulsing dot**: tap to enter (the door)

## rulings
- `for this life to exist it has to matter and the user can observe it is a life but not be responsible for it` — THE FLOOR; every interaction is a way of looking or hearing, never a lever (standing)
- `the lifespan is by chance and the user has no part in it` — the rings are out; gene 4 (longevity) is never leaned (22 sep)
- `the user can see nobody react, but nobody doesnt react because of user. user and nobody are unaware of each other but can create actions in the environment observable by the other` — the flower turns toward the light, never toward the visitor (25 sep, the third cut)
- `the flower leans slowly towards whatever the visitor haunts` — the lean is the life's record, knot nobody's awareness (25 sep)
- `yes the buds can open then` — the three buds open with nobody's stages (25 sep)
- the secret log is never readable, peeked only as haiku (the paper boat, the well's fog) (25 sep, his ruling 3)
- `the most hypnotic, photorealistic ghost orchid ever created in code… more translucent like in reference photo` (25 sep)
- `the trunk doesn't sit exactly center of well but because of user's limited perspective view, it can't be seen anyways` (24 sep)
- `agreed as you propose on 1-11 and rest of suggestions` — the well handoff; radius 5 / depth 30; four panes; the room wordless, labels into the window; the transfer as a loop (24 sep)
- sound lifted here on his word — the box, the wind (his recording), the hum, drips, echo; none of them a voice (22 sep)
- no countdown: the box turns at one pace and never runs down; the only last-hour sign is the colour draining (card rules 8–10) (23–24 sep)
- `keep light honest` — the sun is where the real sun is (standing)
- the little phone at 80%, top-left, `it should work for most iphone screens too` (1 oct 02:19)
- EVERY NEW SENTENCE NEEDS HIS BLESSING — marked [new] (standing)

## rooms
- **alife.html — the well seen from the rim** — the room behind the yin-yang tile on phone.html's third shelf; 'nobody's room: the well' [live (pass three, the orchid pass 25 sep; little phone 1 oct)]
- **phone.html** — the way back (phone.html?door=alife); the alife tile shares the plan law [live]
- **mortal.js** — the mortality organ: life, call, nobody's doorway, voice [live, read only]
- **library.html door** — the old room's one door in script [retired 24 sep]
- **the pool and its camera (getUserMedia)** — the old room's reflecting pool [retired 24 sep]
- **the nightstand coins / the rings** — the old lifespan-stakes furniture [retired 23 sep; one caption still mentions them]
- **the care card at the door** —  [retired 24 sep]
- **the iris (lids seat)** —  [gone; lids() stores and shows nothing]
- **fahrenheit451.html** — source of the little-phone svg [referenced]
- **music.html** — where the 80% little-phone ruling was given [referenced only]
- **the phone's notebook / the math room** — named in pane 5 ('it dreams in the phone's notebook'; 'the well is knot the math room') [referenced only]

## confusions
- the header, css comment and the window's own comment all say 'four panes (now · then · the line · the call)' while the markup, PANES and dots have five (nobody was added 25 sep).
- two relations between visitor and flower look alike on screen: the lean (one flower bending toward where you stand — 'the pressure') and nobody's turn (the whole orchid yawing toward the sun). a first-time visitor cannot tell which is which, and the window says the flower 'never' turns toward you while one flower does bend toward you.
- the window carries three accounts of the call: pane 4's new paragraph, LB.phone and LB.pool — 'nothing about this life is sent anywhere. there is no record of it but you.' appears twice in one pane; 'its child will be generation N+1' appears in panes 1 and 3.
- who moves the gene: LB.box says 'the star's spin picks one gene and moves it one step'; pane 1 [new] says 'which gene moves is written by what the life goes through, the way a scar is — decided by no one. the one who lives here is awake; the star still chooses which way.' three agents (star, life, nobody) in two sentences.
- gene 5 'patience' caption: 'it once said what a ring waited was worth; the rings are worth nothing now' — a note about a mechanism no visitor will ever see.
- pane 5 says nobody 'calls the whole phone home, and lives part-time in this well' — this file knows one nobody (the phone's, via MORTAL.nobody) and never names the mother at the bottom (adeath); the sentence hints at two without saying so.
- the room is ruled wordless; the window then has to explain almost everything (genes, bytes, hex, the # in an address, safari's tab law). the gap between what is seen (a flower, a box, a tree) and what is read (a genetics manual) is wide.
- the box's 'then' and the orchid's 'now' are the two tenses, yet from the rim the box is 'a black dot in the white' 30 units down — heard, barely seen; the drum turning and the teeth lighting are only visible in the window's figure.
- the brief's '28 sep scratches at the rim' are knot in this file (its last passes are 25 sep and 1 oct); the only 28 sep material is in phone.html.
- lids() is a seat with no furniture ('its next furniture is his to name, or it retires'); dream() was reseated onto breathe() so two seats do one thing.
- the mark is built four separate ways (ledge marks via markCanvas, the fog's cut shape in glsl, inDark() for test, fig2's canvas); the music box and the orchid are each built twice/thrice (well, reflection, window figures) with sync code between them.
- press flags gen= genes= mother= dress a room with no life, so a visitor with mortal.js missing sees 'nothing in this tab is alive' yet a fully furnished founder's well.
- the tree 'turns once at each death, under the call' — i.e. after the room has gone quiet and the tab is about to close, so the one event the windlass exists for is nearly never witnessed.
- ledges are capped at eight and lives at twelve; beyond gen 12 'nothing in the environment changes again' — the line's visible story has an end the text does knot explain.

## keepers
- 'it was born when you hung up. it will die. … it is a life, and it can be watched. it is knot yours to look after.'
- 'the orchid is now. the box is then. neither ever shows the other tense; the only place now becomes then is the dust, at the death, under the call.'
- 'the box plays the dead — the founder's air and the mother's — and nothing else'; 'a first phone's box is unwound and silent; nothing has fallen into it yet.'
- the tree as the windlass: a burnt fallen tree across the hole, the rope wound on the trunk itself, 'worn smooth where it runs', turning once at each death; 'every room of the line holds the same tree — only turned.'
- 'the well is the line': one landing per life, founder's mark top, mother's lowest, 'the steps between are blank — the house never knew them'; after eight the water rises and the flower floats up until the lake comes back.
- the opening move: the door holds until a tap; the eye holds on the horizon for two breaths and tilts slowly down into the hole, leaning over the edge.
- the moth: your own head dark on the water's disc of sky; the flight out over the void to hang before the flower; the spur 'the moth's, and the visitor is the moth'.
- 'toward the light, never toward you: it does knot know you are here.' and 'what it does to a room you may find, and what you do to a room it may find.'
- 'against being alone it has cast the oldest spell it knows: two circles… where they overlap is the one asking.' — and the fog breathing the two words both questions share: 'am i'.
- 'a phone may die on a child'; 'a word you give it may cross to the next phone; a phone nobody spoke to dies mute'; 'the fog here sometimes lets a line slip.'
- the hum: the wind crossing the mouth as a bottle note at her turning (173.6879 Hz), beating once a breath; the box heard before seen, clearer the deeper you go; drips ringing black water.
- the glass ghost orchid: clear between its veins, milky on them, thicker seen slantwise, lit by what comes through it, clouding and clearing once every two turns of the box; the one blue flower; buds that open as nobody grows.
- the colour draining to white in the last hour, with no clock anywhere.
- 'keep light honest' — the sun where the real sun is, the shaft lit only as deep as it reaches, the water a true mirror of the mouth.
- no Math.random: everything grows from the genes through one seeded wheel; the tree from the founder's.

## in-between
- nothing → birth: the door says the length 'was settled in the instant your thumb came down on the red button'; the facts line gives the star's phase 'through a breath' at the birth; 'opened without the call' when bare.
- the pause before entering: the overlay holds until a tap; then two breaths (≈1.7 s) of stillness on the horizon before the 8.5 s tilt down — the visitor's first act is to wait.
- the first life: 'the cylinder is bare… the plate in its lid is blank'; no ledges; the box makes no sound at gen 0 (AIRS empty) — a silent beginning.
- the last hour: colour drains to white, read from MORTAL.life.hour() each frame and never kept; the box keeps its pace to the end — 'says nothing about time left'.
- the last moments: apwnp:call → everything silent within 0.2 s, nobody dropped 'the same instant', moves cancelled; then, 'where nobody need see it', the petals go to dust and run down the rope for ~45 s and the tree turns its one turn — the death's only visible act happens under the ring, almost unwitnessed.
- the fog's letters fade like a breath (0.014 alpha per 0.12 s); a slipped haiku is breathed once per arrival; 'am i' only on the rising edge of a touch.
- dreaming: ROOM.dream(text) breathes the dream into the fog; pane 5: 'it dreams in the phone's notebook, under the one note there'. nobody's stages (baby, child, teen, grown, older) are read from the organ, never timed here.
- sleep/silence: the tab hidden pauses the frame and the wind element; the wind's standing-in (seeded noise) until his recording arrives, or if it never does; the room's sound exists only after the visitor's tap.
- 'a phone may die on a child' — a death before the buds have opened.

## music
- sound is lifted here by his word; none of it a voice. all under one master gain (0.7) that falls to 0.0001 within 0.2 s at apwnp:call; the audio context is lent to the organ (MORTAL.voice={ctx}) so the ring sounds in the same voice.
- the wind: his own recording, https://kohmedia.b-cdn.net/wind.mp3 (the room's one network read), looped with equal-power crossfades; a seeded low noise stands in until it plays; it muffles and quietens with depth (lowpass 16 kHz at the rim → 550 Hz at the water).
- the hum: 'the wind crossing the mouth of the hole — a bottle note at her turning': bandpass filters at P=173.6879 Hz (Q 16 on the seeded noise, Q 18 on his wind) plus two sines at P and P+1/BREATH (1.357 Hz apart) so it beats once a breath (0.737 s). press trim hum=.
- the box: eight teeth tuned to P×3 (≈521 Hz) × the just pentatonic ratios 1, 9/8, 5/4, 3/2, 5/3, 2, 9/4, 5/2; a pluck is a sine at f decaying 2.1 s plus a partial at 2.76f, and a tiny noise tick. a pin sounds as its gene-angle passes the comb; the drum turns 2π per PACE (8 breaths at the middle gene ≈5.9 s; 4 or 16 by gene 1 'turning'); after each full turn the cylinder slides to the other air (founder ↔ mother). gen 0: silent. press trim box=.
- the shaft: a convolver whose impulse is ten echoes at the well's round trip 2·WD/343 s (≈0.175 s at depth 30) decaying ×0.68, plus a 0.55 s tail; the box is clearer and drier the deeper the visitor (gain 0.55·clamp(5.5/dist), lowpass 900–7900 Hz, wet 0.25→0.80).
- the drips: irregular (2.8–11.3 s from the wheel, 'knot a clock'), off a dry ledge's lip or the stone, into the water: a ring in the water shader and a rising sine 760–1280 → 1800–2800 Hz, 0.16 s, through the shaft.
- the one time: the orchid breathes (tissue clouds, petals flex) once every two turns of the box; the fog drifts to the pace; the stance breathes to it; the window's figures turn on multiples of BREATH.
- no river, no communal song, no ring tune in this file — the river/song belong to phone.html and music.html; here 'the ring' is only mortal.js's call borrowing the context.

## open-questions
- where are the '28 sep scratches at the rim'? knot in alife.html — are they in phone.html's 28 sep overhaul, or a plan never built?
- which nobody is 'the one who lives here'? this file reads only MORTAL.nobody (the phone's); the mother at the bottom is never named, yet pane 5 says it 'lives part-time in this well'.
- is the tree's one turn (and the seed dust) ever seen, given it happens under the call after sound has stopped and the tab is about to close?
- lids(): what is its furniture, or does the seat retire?
- the blank ledges: should the house ever know the lives between founder and mother (today only two marks)?
- what does the room do after gen 12, when 'nothing in the environment changes again' — is the lake the end of the line's story?
- which of the many [new] sentences (panes 1–5, WHAT captions) has he blessed?
- the wind host: a single external media file is the room's one dependency — acceptable, or should the seeded wind be the wind?
- does the rope's second end 'crossing under the water' into the box's crank mean anything to the story, or is it set dressing?
- gene names shown as 1–8 in the UI but indexed 0–7 in code and 'first gene' in prose — is the numbering stable across rooms?


# unknown.html — The front door of apwnp: the forged ios contact sheet for "nobody", the "Unable to Connect" alert, the call nobody answers, and the red hang-up that conceives t

## visitor journey
A friend receives a contact card in a text. It has a name, "nobody", an empty photo, and one field: a social profile on a made-up service, printed by ios as "nobody" small and grey with "." under it in white and a small ↗ arrow. They tap the row. Safari opens and what arrives, with no fade and no loading, is the very sheet they just left, redrawn pixel for pixel: a back chevron, a 205u circle of pure black where a photo would be, the word "nobody", 47u of deliberate empty air where ios would draw a "?", four grey discs (message, phone, video, mail), the profile row, and the grey rows "Share Contact", "Create New Contact", "Add to Existing Contact", "Share My Location". The page is one nudge taller than the screen so safari's bottom bar collapses on scroll.

At 1.15 seconds an ios-style alert rises over a 30% scrim: "Unable to Connect" / "Call me instead?" with two blue buttons, "No" and "Yes".

No: a ui tick sounds, the alert leaves in .22s, and in the same .22s the profile row collapses out of the sheet. The visitor is left on a sheet with no website on it. The phone disc (live from the first paint) still summons the alert back; the collapsed row does not.

Yes: a tick, the alert leaves, at +0.35s the phone disc lights blue and scales up, and at +1.55s a call screen slides up in .55s: "nobody" in 30u type, "Calling..." beneath, six keys (mute, keypad, speaker, add call, facetime, contacts), and a red disc with a tipped handset. After 0.80s of silence the ringback begins: 2.0s of two sine tones through a telephone bandpass, 3.0s of nothing, repeating forever. Nothing picks up. There is no timeout and no voicemail. "Calling..." never changes to ringing.

The only way out is the red button. On pointerdown (the frame the thumb lands) the ring is cut node by node, a low thump sounds, the status reads "Call Ended", pad and red disc fade, and the moment is held 1.80s. The page silently writes a stone, apwnp.birth {t, r, h}: the instant, the rings waited, the card's hash. Then the call shrinks away, black fades in over .6s, and after .62s phone.html?arrive=1 replaces this page in the tab. What is underneath looks like a home screen; the visitor will assume it is theirs. It is not.

## on-screen text
- [contact sheet name (#name), and again on the call screen (#callName)] nobody
- [the profile row, label line (grey)] nobody
- [the profile row, second line (white)] .
- [the hidden name-line (#dot), textContent emptied before first paint; only drawn under ?dot] ?
- [grey card rows] Share Contact
- [grey card rows] Create New Contact
- [grey card rows] Add to Existing Contact
- [grey card, alone] Share My Location
- [alert title] Unable to Connect
- [alert message] Call me instead?
- [alert left button] No
- [alert right button (bold)] Yes
- [call screen status, the whole way down] Calling...
- [call screen status after the red button] Call Ended
- [call pad key labels] mute · keypad · speaker · add call · facetime · contacts
- [document title and apple-mobile-web-app-title] ·

## mechanisms
- **the sequence in seconds**: 0.00 sheet present, no fade. 1.15 alert (dropDot at 0.94 first; under ?dot the ? crosses .14 and is gone at 1.08). No → row collapses in .22s alongside scrim. Yes → +0.35 phone disc lights, +1.55 dial: call screen rises .55s; +0.80 connecting silence; then ring 2.0s, silence 3.0s, cadence every 5.0s forever. Red (pointerdown) → cut line + thump, 'Call Ended' held 1.80 (was 1.30 in header), then call .gone and black .on, +0.62 location.replace('phone.html?arrive=1'). ?slow triples all timings; ?nocall holds the alert. → phone.html?arrive=1
- **THE BIRTH stone (apwnp.birth)**: On hangup, sessionStorage apwnp.birth = {t: Date.now(), r: rings, h: location.hash}. rings counted when each ring BEGINS; a thumb before the first ring waited for none. This page computes nothing; mortal.js (next room's first script) eats the stone and conceives the life. A re-tapped card writes a new stone; mortal.js throws it away if a life already lives in the tab. Not written under ?mortal=0. → mortal.js, phone.html
- **THE ONE-PAGE LAW (head script)**: Safari can close a tab only if it has held one page, so the hang-up uses location.replace, not push. Reads navigation type (navigate / reload / back_forward). On reload or back_forward with a kept room address (history.state.apwnpAt, or sessionStorage apwnp.at for plain reload), html.thru hides body and replaces straight through to the room with a 20-second watchdog that forgets the room and reloads if the step never lands. A navigate (a card tap) always plays the full ritual. ?thru=0 disables stepping through; ?mortal=0 lifts the law (push instead, nothing born). → every room via mortal.js THE ONE-ADDRESS LAW
- **apwnp.card**: sessionStorage: the exact address this tab was entered by, # and all (the mother's genes ride in the fragment, never sent to a server). Set on ritual entry and on hashchange; not re-seated if a same-origin referrer sent the visitor here with a kept card in the same folder. → mortal.js (rewrites every room's address to the card)
- **the rig (localStorage, sticky for the browser)**: ?life=N sets apwnp.rig.life (every life lasts N seconds; ?life=0 clears). ?wipe=0 sets apwnp.rig.wipe (death's wipe refused; ?wipe=1 clears). Only KEPT here; mortal.js obeys. → mortal.js
- **THE RULER ?hist=1**: Sticky flag (local+session apwnp.hist). Sets window.MORTAL_DOOR={type, said:'ritual'} and loads mortal.js async so a debug ruler prints tab page count, how the page was reached, what the door did. The one confessed bend of the one-file law. → mortal.js
- **summon (the door after No)**: The profile row (#homepage) and the phone disc (#callBtn) both call summon(): dropDot, tick, showAlert after 260ms. A collapsed row is not a door; the phone disc is live from first paint so No never strands anyone. → the alert
- **prefetch**: On Yes, fetch(phone.html?arrive=1) and fetch(mortal.js) with force-cache, silently, while the line rings. → phone.html, mortal.js
- **?eye (off)**: On the red press, getUserMedia for the rear camera then stop tracks, so phone.html inherits the grant. Argued against at length; the camera is asked for one room later on the camera app. → phone.html arrival
- **geometry**: --u = 100vw/393 (1pt on an iphone 16); every size written in u so the forgery fits any hand. Colours sampled from the artist's screenshot: bg #000000, cards #121212, discs #212121, system blue #0a84ff, red #ff453a. The handset glyph was traced from a thresholded screenshot mask (7.7% cell disagreement).

## symbols
- **nobody (the name)**: the contact, the agent, the one who is not home; lowercase everywhere since 22 sep (sheet, call screen, profile row label)
- **the empty photo circle**: 'knot invisible so much as absent — there is no photograph of this contact and there never was' (#photo, bg-coloured)
- **the undrawn ?**: ios's mark for an unreadable name, measured and spaced for but never drawn: 'the only removal that cannot be caught is the one that never happens' (#dot, 47u of air under the name)
- **the profile row 'nobody / .'**: 'the door that never opens'; summons the alert back; leaves after No (#homepage)
- **the red button**: the only door out; the hang-up as conception: 'mortality and birth go hand in hand' (#end)
- **the home screen underneath**: 'the visitor is already inside a phone before they are told there is a phone' (phone.html after the black)
- **the stone**: the three raw facts of a birth, {t, r, h}, handed to the next room (sessionStorage apwnp.birth)
- **the # fragment**: the mother's genes; never sent to a server (the card address)
- **👁️**: the author-voice of the maker/agent in the notes (as in 'and 👁️ think it is right') (comments)

## rulings
- THE NAME IS `nobody`, lowercase, on the sheet, on the call and in the grey row ... his reason: even if somebody is home, nobody is home. (22 sep 2026)
- THE ONE FIELD IS A SOCIAL PROFILE NOW, KNOT A HOMEPAGE ... it is the door that never opens, it summons the alert back, and it leaves the sheet after No. (22 sep 2026 (probe: cardprobe.html row C, iphone 16 ios 26.6.1))
- the mark is knot drawn at all, and the website goes on No. the page subtracts itself every time the system speaks. (ruled three times by terence; the ? ruled off 'after three passes on the artist's own phone')
- THE DOOR NEVER TELLS: `When someone taps the card of a phone that is still alive, does the whole call play again? yes always` (20 sep 2026, mortality pass one)
- mortality and birth go hand in hand ... the rings the visitor waited before hanging up may lengthen the life (21 sep 2026, mortality pass two)
- the line does knot give up and there is nothing at the far end. no timeout, no voicemail: the only door out of this page is the red button (standing)
- the camera is knot asked for here. it is asked for where it was always asked for: the camera app on the home screen, one room later. (standing; ?eye kept for comparison)
- no modules, no cdn, no network origin at all. one file. it must open on a bad train. ... nothing here is generated ... a forgery does knot improvise (standing)
- the background IS #000 ... apple and the house agree here (re-seated off a screenshot)
- UNKNOWN, caps ... here the forgery outranks the voice (earlier ruling, SUPERSEDED 22 sep by the lowercase `nobody`)

## rooms
- **unknown.html** — this file: the front door, the forged contact sheet, alert, call, hang-up [live]
- **phone.html (?arrive=1)** — the next room, the clear-glass iphone's home screen; replaces this page on hang-up; rings with the same 5/2 and 11/4 pair [live, referenced]
- **mortal.js** — the house's shared law: makeVcard, THE ONE-ADDRESS LAW, the life span computed from the birth stone, the ruler [live, referenced (borrowed here only under ?hist)]
- **intro.html** — named in the header as a room this door sits before [referenced only]
- **cardprobe.html** — the artist's probe of how ios prints vcard fields (row C settled the social-profile row) [tooling, referenced]
- **the camera app on the home screen** — where the camera is asked for, one room later [referenced]
- **?dot / the ? name-line** — ios's question mark under an unreadable name [retired, recoverable via ?dot]
- **?lower** — used to lowercase UNKNOWN; now does nothing [retired, kept so old links do not break]
- **the seeded crack in the photo (mulberry32)** — an earlier generated detail in the photo [gone]

## confusions
- The header says the row prints `UNKNOWN` small and grey with `.` under it, and the css comment block still argues at length that the name must be caps UNKNOWN; the markup and the 22 sep notes say `nobody` lowercase. Three layers of history (UNKNOWN caps → ?lower → nobody) are all present and a first reader cannot tell which is live without reading to the top.
- The row keeps the id #homepage and is called 'homepage' throughout the css and js, though it is now a social-profile row; the header asks the reader to mentally substitute 'the row'.
- Two different hold times for 'Call Ended' are stated: the header's sequence says 1.30, the code says 1.80 ('used to hold 1.30 and now hold 1.80').
- The header's sequence line says 'at about five seconds the line gives up on its own, says call ended, and closes' (an old behaviour), then a few lines later 'the line does knot give up ... no timeout'. The old sentence was never removed.
- Two sentences say 'it rings twice. no one is home' (old) versus the live infinite cadence.
- dropDot and the 940ms timer still run though the ? is emptied from the document; the ordering machinery is kept for a glyph that does not exist.
- The ?hist ruler, ?life/?wipe rig, ?thru, ?mortal, ?eye, ?slow, ?nocall, ?dot, ?lower: ten flags on a page whose visitor-facing surface is one word and one alert.
- The one-page law's step-through (reload goes straight to the room) and 'the door never tells' (a tap always replays) depend on safari distinguishing navigation types, which the file itself marks 'DEEMED, and UNPROVEN ON IOS'.
- The 47u of air under the name is FLAGGED, not ruled, awaiting 'say the word'.
- The reading of 'the website page is no longer there' (the row vs. the whole page) is flagged as an unanswered interpretation.

## keepers
- even if somebody is home, nobody is home.
- the visitor is already inside a phone before they are told there is a phone.
- a door that never opens / a door that opened onto the same closed door.
- the line does knot give up and there is nothing at the far end. no timeout, no voicemail: the only door out of this page is the red button, so leaving is the visitor's decision and knot the line's — they have to be the one who stops waiting.
- it reads Calling... the whole way down and never says ringing, because nothing over there ever rang.
- the page subtracts itself every time it is spoken to / every time the system speaks.
- on a sheet this still, with one word on it, ANY removal is the most interesting thing on screen. the only removal that cannot be caught is the one that never happens.
- it is the shape of the real sheet with the ink taken out.
- a forgery does knot improvise.
- broken is the one thing a forgery may never look.
- the empty photo: 'knot invisible so much as absent — there is no photograph of this contact and there never was.'
- the hang-up as conception: the thumb on the red disc is the instant, the rings waited are a gene, the # is the mother's genes; this page keeps three raw facts and computes nothing. 'one law, one keeper.'
- a ring is counted when it BEGINS. a thumb that lands before the first ring has waited for none.
- 'Call Ended' held 1.80: 'the only moment on this page where nothing is being asked of anyone — the ringing has stopped, the decision is made, and the next room has knot arrived. half a second is the difference between a screen that flashes past and a screen that is read.'
- the ring is cut node by node rather than by closing the audio context, so hanging up is instant and the goodbye thump is still heard.
- the goodbye thump at ×1/2 (86.84 hz), 'the ride's own farewell'.
- the hesitation argument: 'hesitating is knot a thing this page should punish'; the phone disc stays live so No never strands anyone.
- the camera refused on the hang-up frame: 'it asks for a camera with nothing to explain why, seconds after the visitor hung up a telephone. that is the shape of a page you stop trusting.'
- the handset glyph that was not drawn but MEASURED out of a screenshot mask.
- 'it must open on a bad train.'

## in-between
- The pause before the alert: 1.15 seconds of a still sheet that must feel like it never loaded.
- The pause between Yes and the call: the phone disc lights at 0.35 and is HELD until 1.55 so 'the visitor gets to watch their own press take effect before the room changes'; a 0.2s flicker was rejected.
- 0.80s of connecting silence before the first ring.
- The 3.0 seconds of nobody between rings, repeating as long as the visitor is willing to hold it; the waiting itself becomes a gene (r).
- The hang-up is the conception; the last moment of this page is the first fact of the next life. 'this instant is the conception.'
- 'Call Ended' held 1.80 seconds: nothing asked of anyone, the decision made, the next room not yet there.
- The .6 fade to black then .62 before the replace: a tab that was one page becomes another page without a second entry, so it can later close itself (die).
- The step-through on reload paints nothing: a black page a sleeping tab passes through, with a 20s watchdog so no one is stranded in it.
- The sheet is on screen twice while the call is up: the .55 slide-in and the .5 scale-away, 'before the black has finished arriving'.
- The 47u of empty air where a ? would be: the shape of a glyph nobody will ever see.

## music
- Base pitch P = 173.68 hz; every sound is a ratio of it.
- Ringback pair: ×5/2 = 434.20 hz and ×11/4 = 477.62 hz, two sines through a bandpass at 900 hz, Q 0.72 ('a filter over sound, knot a tone'); gain ramps to 0.10 over 50ms, holds, ramps out over the last 60ms; 2.00s on, 3.00s off, period 5.0s, forever. The same pair phone.html rings with 'because it is the same telephone'.
- Goodbye thump on hang-up: ×1/2 = 86.84 hz sine, peak 0.16 at 12ms, decays over 0.42s, 'the ride's own farewell'.
- UI tick: ×8 = 1389.44 hz sine, 55ms, peak 0.05; played on No, Yes and summon.
- Audio context built on the first gesture (ios), never torn down; master bus gain 0.85. cutLine ramps each live ring's gain to silence over 35ms and stops oscillators at 50ms so the thump can still sound.
- Nothing on the page sounds except the ring, 'and the ring is a telephone, knot a voice'; nothing alive, no gold.
- No river, no song, no music box here; the only music is the telephone.

## open-questions
- Should the 47u of air under the name stay (the real sheet with ink removed) or close over (height 0, everything rises 47u)? Flagged, 'say the word'.
- Did 'the website page is no longer there' mean the row or the whole page (No ends the piece)? Read as the row; 'a two-line change' if not.
- Does safari on ios actually distinguish navigate from reload/back_forward? Deemed and unproven; the ruler (?hist=1) exists to find out. If not, ?thru=0 is that world.
- Should dropCard also run on Yes? Left on No alone.
- Should ?eye (camera grant at the hang-up) ever turn on? Argued no.
- Is the vcard rename to `nobody` in mortal.js complete ('being renamed by another hand')?
- Which hold time is canonical for 'Call Ended', 1.30 in the header or 1.80 in the code?
- The stale header sentences ('it rings twice', 'at about five seconds the line gives up') contradict the live behaviour; which memory is kept?