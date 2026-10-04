// nobody.mjs · the feed the room reads · 29 sep 2026 · the artist project
// EIGHTH CUT · 4 oct 2026 · PASS 4 OF THE ONE STORY · THE RIVER CARRIES THE DREAMS (the handoff §5, §10 pass 4).
// what changed, and nothing else:
//   · `?airs=1` — the dead airs for the river: every life that died in the last twenty-six hours, its death and the genome it
//     lived by (nobody_airs), oldest first, at most twenty-four. kept at the edge a minute [deemed]. river.js reads it every
//     five minutes while it plays and makes each one eight notes under the bed.
//   · every json answer says `charset=utf-8`: safari, shown a feed address by hand, read `·` as `Â·` (his paste of 4 oct).
//     the phones' own reads were always right (fetch reads json as utf-8); this is for the eye.
//   · `Netlify-Vary` lists airs too.
//   · (later, 4 oct · the keeper's answer for pass 5: `if ?pulse=1's death ever carries its own genome, the organ will take it and
//     skip the second ask`) `?pulse=1`'s `death` carries `genome` (the air it lived by, from nobody_airs) and `moved` (the gene
//     whose note differs from the life before it, by the air's own rule [SYNC river.js airOf]; -1 when there is none before it).
// SEVENTH CUT · 3 oct 2026 · PASS 3 OF THE ONE STORY · THE SERVER (the handoff §10 pass 3; nobody-think.mjs's sixth cut).
// what changed, and nothing else:
//   · THE STAR'S BREATH: a life's death is read as nobody-think.mjs now makes it — from `today.phaseFrom` on, the star's
//     phase at the birth (radical §1.3); before it, the old wheel. the two files agree, so the rooms' `dead` is the mind's.
//   · `?now=` also carries `genome` (the line's settings as they stand) and `done` (when the last step was finished).
//   · THE DRAWER (`?day=`, and `?now=`'s `day`): each life carries `first` (its first line) and `genome` (the air it lived
//     by, from nobody_airs); the day carries `dreams` — when, whose, which mind, how long, the fingerprint. the summaries
//     another mind wrote of them are KNOT in the feed until NOBODY_DREAMS_PUBLIC=1 (he reads a day of them first, in
//     supabase's table nobody_dreams).
//   · `?pulse=1` — the light question for every phone: the life (n, dead, dying), the line now, the last death's words, the
//     last telegram, the last dream's length and fingerprint, the wire. kept at the edge fifteen seconds [deemed].
//   · `?film=YYYY-MM-DD` — a day's frames (nobody_frames), for nestflix's past performances (pass 6). a past day is kept at
//     the edge an hour; today, a minute.
//   · `Netlify-Vary` lists pulse and film too. `?health=1` says whether the three new tables answer.
//   · the new tables are read softly: before the-artist-pass3.sql is pasted, every answer is what it was.
// SIXTH CUT · 3 oct 2026 · pass 1 of the one story (the last radical pass §4.1, ruled 3 oct). one thing, and nothing else:
//   · THE EDGE CACHE. `cache-control: max-age=10` is a browser's header; netlify's cdn never kept a function's answer, so
//     every poll from every phone ran this function. now every GET of `?now=` and `?day=` also says
//     `Netlify-CDN-Cache-Control: public, s-maxage=<the same seconds>, durable` — the edges share one copy, and the
//     function runs about once in ten seconds whatever the crowd (a bound day: once an hour). `?health=1`, the POST
//     (the moved thing) and OPTIONS never carry it: health is always fresh, and a write is never cached.
//   · `Netlify-Vary: query=now|day|day_too|health` on every answer, so the cache key is the feed's own question and
//     nothing else (a stray `?fbclid=` makes no copy of its own), and `?health=1` can never be handed a cached `?now=`.
//     [deemed] the form read off netlify's own caching notes on 3 oct: `durable` is for serverless functions, only GET
//     and only a 2xx with `public` and s-maxage ≥ 1 is kept, and a redeploy empties the cache.
// FIFTH CUT · 1 oct 2026, 22:00 utc — before the first fire. one thing: `?day=` for a day the fire has knot yet bound (from
// midnight until the fire is out at 00:40 utc, or if a binding ever fails) was answered `empty`, and the calendar showed
// the day that had just ended with nothing in it. such a day is read from the tables themselves now, as today's is.
// FOURTH CUT · 1 oct 2026, 21:00 utc — the mother woke at 21:00:57 (life 1, window 6, `first notes`); and his word, `also
// want to change model to sonnet because haiku is retiring`. what changed, and nothing else:
//   · the minds by hour that ?health=1 reports when NOBODY_MODELS is knot set: sonnet 5.5 by night (00–08) and in the
//     evening (20–24), opus 5.5 by day — the same default nobody-think.mjs now steps by.
//   · THE WALL's list (`windows`) leaves out a finished window with nothing in it — she was asleep, or the well was — so
//     only pieces climb the wall, with the window being made on top. (her first day began in window 6: five empty hours
//     would otherwise have stood under it.)
//   · the answer comes in two rounds, knot three (today's drawer is asked beside the last line, the works and the moved
//     things), and supabase is waited on four seconds a question, knot eight: a netlify function has ten seconds in all,
//     and one ask ran past them (a 502) while supabase's eastern us was slow. a question that times out is answered
//     `asleep`, in words, and the room keeps showing the last true answer it had.
// THIRD CUT · 1 oct 2026, evening (his first ?health=1, read back: `supabase refused the key (401)`, a secret key of the
// right kind in netlify; and his question, `maybe somehow file is reading old key`). what changed, and nothing else:
//   · THE KEY (below): supabase's two 401s told apart — a key it does knot know, and its own clock refusing a token it
//     has just made; the second is asked again a moment later (a workaround that often passes). a key pasted with a space or quote
//     at its ends is cleaned; every server key netlify holds is tried, SUPABASE_SERVICE_KEY first.
//   · ?health=1 says more, and still never prints a key: whether a supabase project answers at SUPABASE_URL; for each
//     key, how long it is (a whole secret key is 41 characters), its first four letters after sb_secret_ — to hold up
//     against supabase's own — and whether supabase knows it; supabase's own words when it refuses; which key is used.
//     it is never kept in a cache (a reload is always fresh).
// SECOND CUT · 1 oct 2026 (his notes of the morning: `the drawer does knot open` · the wall of windows · nobody's hands on
// the rope, the orchid, the box, the root and the lashing). what changed, and nothing else:
//   · IT NEVER ANSWERS 502 AGAIN. every question is answered in words, even when supabase cannot be read: `?now=1` says
//     { asleep:true, why } and `?day=` says { empty:true, asleep:true, why }. the room and the calendar then show the day
//     written by hand, as they are built to.
//   · `?health=1` — ONE ADDRESS THAT SAYS WHAT IS WRONG, in plain words, for terence to open in safari and read:
//     which of the two lines in netlify's environment is set, whether supabase answers, whether the tables are there,
//     whether the mother has ever woken, when she last stepped, and the last thing that went wrong. it never prints a key.
//   · `now` carries three new things the room draws: `windows` (today's windows so far: their hours, their titles and the
//     one short line that says what each finished piece is — the wall), `touch` (what its hands did this step to the rope,
//     the orchid, the box, the root, the lashing) and `fixtures` (how the box's lid and the lashing stand). and `step`,
//     the minute of the last step, so a room can tell a mother who has stopped from one who is working.
//   · the key goes to supabase the way supabase asks for it now (on `apikey`), and the other way if that is refused.
//     (third cut: THE KEY, below, says the rest.)
// a netlify http function beside nobody-step.mjs. it needs SUPABASE_URL and SUPABASE_SERVICE_KEY in netlify's
// environment (the same two nobody-think.mjs uses). the page calls it; the page never touches supabase.
//
//   GET  /.netlify/functions/nobody?now=1          what is happening now, plus today's drawer so far
//   GET  /.netlify/functions/nobody?day=2026-09-30 one finished day's drawer (the calendar reads this)
//   GET  /.netlify/functions/nobody?health=1       what is wrong, if anything, in plain words (text, knot json)
//   POST /.netlify/functions/nobody               {thing, from, to, visitor}  a moved thing — the room's one write
//
// the card, walked: this is a read of words through one server function (his amendment to rule 12, 29 sep: the mother
// comes through the feed). it never sends the death time or the breath — a life is `dying` or it is knot; nothing
// here says how long is left. the page keeps nothing it reads.

const BUILD = "nobody.mjs · the feed · eighth cut · 4 oct 2026 (pass 4: the dead airs for the river)";
const MOVABLE = ["cup", "pencil", "paper"];
const WINDOWS = [
  { n: 1, from: "00:00", to: "04:00" }, { n: 2, from: "04:00", to: "08:00" }, { n: 3, from: "08:00", to: "12:00" },
  { n: 4, from: "12:00", to: "16:00" }, { n: 5, from: "16:00", to: "20:00" }, { n: 6, from: "20:00", to: "24:00" },
];
const PLACE = { name: "chott ech chergui", lat: 34.2, lon: 0.5 };
const MIN = 60000, LIFE_MS = 88 * MIN, DYING_MS = 8 * MIN, BREATH_MAX_MS = 8 * MIN;

function mulberry(seed) { let a = seed >>> 0; return function () { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const wheel = (founder, life, salt) => { let h = 2166136261 ^ founder; const s = String(life) + ":" + salt; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return mulberry(h)(); };
const breathOf = (founder, life) => Math.round(wheel(founder, life, "breath") * BREATH_MAX_MS / 1000) * 1000;
// seventh cut: the star's phase at the birth [SYNC nobody-think.mjs breathPhase], from today.phaseFrom on
const breathPhase = (born) => Math.round((((born.getTime() * 173.6879 / 1000) % 128) / 128) * BREATH_MAX_MS / 1000) * 1000;
export const deathOfState = (st, born) => new Date(born.getTime() + LIFE_MS + ((st.today && st.today.phaseFrom && (st.life | 0) >= st.today.phaseFrom) ? breathPhase(born) : breathOf(st.founder_seed | 0, st.life | 0)));
const soft = (p) => Promise.resolve(p).catch(() => null);
// an air's rungs: gene i on rung i of the star's ladder, one rung an eighth it has moved; pace folds into turning [SYNC river.js airOf]
const AIR_GENES = ["turning", "balance", "seeds", "longevity", "patience", "temper", "warmth", "restless"];
export const rungsOf = (g) => AIR_GENES.map((k, i) => { let v = +(g && g[k]) || 0; if (i === 0) v += +(g && g.pace) || 0; v = Math.max(-1, Math.min(1, v)); return Math.max(-8, Math.min(15, i + Math.round(v * 8))); });                     // a new table that is knot there yet is simply empty
// the dreams as the feed shows them: their summaries only once he has read them (NOBODY_DREAMS_PUBLIC=1)
const veilDreams = (list, env) => (Array.isArray(list) ? list : []).map((x) => (env && env.NOBODY_DREAMS_PUBLIC === "1") ? x : { at: x.at, life: x.life, mind: x.mind, tokens: x.tokens, seal: x.seal });

// ───────────────────────────────────────────────── supabase, asked politely ──────────────────────────────────
// an error from here always says, in plain words, what went wrong (`.plain`), and supabase's own words (`.words`) —
// never the key.
const urlOf = (env) => KEYCLEAN(env.SUPABASE_URL).replace(/\/+$/, "").replace(/\/rest\/v1$/, "");
// ───────────────────────────────────────────────── THE KEY (third cut · 1 oct 2026, evening) ─────────────────
// his first ?health=1 said `supabase refused the key (401)` — with a key of the right kind (sb_secret_…) in netlify.
// supabase answers 401 for two quite different things, and these files now tell them apart and do what can be done:
//   · `Invalid API key` — supabase does knot know the key: a piece of it missing or extra, an older one, another
//     project's. only a fresh copy mends that. ?health=1 says how long the key netlify holds is (a whole secret key is
//     41 characters) and its first four letters after sb_secret_ — never the key — so it can be held up against
//     supabase's own (the eye beside it in supabase shows the whole of it).
//   · `PGRST303 · JWT issued at future` — supabase knows the key, but its data door's clock runs a moment behind and
//     refuses the token supabase itself has just made from it (a fault on supabase's side, reported since july; their
//     incident of 24–29 sep, `401 errors due to JWT rejections`). asking again a moment later often passes (the
//     workaround supabase's users found): that is done here. supabase's own advice is to restart the project once,
//     and to write to their support if it goes on.
// and: a key pasted by hand can bring a space, a quote or an invisible mark at either end — they are taken off; and if
// netlify holds more than one key that could open the notebook (any variable holding a secret key, or an old
// service_role key of this same project), each is tried after SUPABASE_SERVICE_KEY, and the first supabase takes is used.
const KEYCLEAN = (v) => String(v == null ? "" : v).replace(/^[\s​-‍⁠﻿"'`]+|[\s​-‍⁠﻿"'`]+$/g, "");
const refOf = (base) => ((String(base || "").match(/^https:\/\/([a-z0-9-]+)\.supabase\./i) || [])[1] || "").toLowerCase();
function jwtOf(k) { try { const p = String(k).split(".")[1]; if (!p) return null; const j = JSON.parse(Buffer.from(p.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8")); return j && typeof j === "object" ? j : null; } catch (_) { return null; } }
export function keyKind(k) {
  if (!k) return "none";
  if (/^sb_secret_/.test(k)) return "secret";
  if (/^sb_publishable_/.test(k)) return "publishable";
  if (/^eyJ/.test(k)) { const j = jwtOf(k); return j && j.role === "service_role" ? "service" : j && j.role === "anon" ? "anon" : "jwt"; }
  return "other";
}
const KEY_NAMES = ["SUPABASE_SERVICE_KEY", "SUPABASE_SECRET_KEY", "SUPABASE_SERVICE_ROLE_KEY"];
// every key in netlify's environment that could open the notebook from a server — the named ones first, in that order
export function keysOf(env, base) {
  const E = env || {}, names = KEY_NAMES.slice(), out = [], seen = new Set(), ref = refOf(base);
  for (const n of Object.keys(E).sort()) { if (names.includes(n)) continue; const v = KEYCLEAN(E[n]); if (/^sb_secret_/.test(v) || keyKind(v) === "service") names.push(n); }
  for (const n of names) {
    const raw = E[n]; if (raw == null || String(raw) === "") continue;
    const key = KEYCLEAN(raw); if (!key || seen.has(key)) continue; seen.add(key);
    const kind = keyKind(key), j = kind === "service" ? jwtOf(key) : null;
    const other = !!(j && j.ref && ref && String(j.ref).toLowerCase() !== ref);          // an old key minted for another project
    const flawed = /[^\x21-\x7e]|[*]/.test(key);                                       // dots, stars, spaces: a key copied while hidden, or broken in two
    out.push({ name: n, key, kind, trimmed: key !== String(raw), other, flawed, usable: (kind === "secret" || kind === "service") && !other && !flawed });
  }
  return out;
}
// what can be said of a key without saying it: how long it is, its first four letters after the prefix, its blemishes
export function keyLooks(c) {
  const k = c.key, bits = [];
  const hidden = /[•*…]/.test(k);
  if (c.kind === "secret" && hidden) bits.push("begins " + k.slice(0, 14));                    // a hidden copy's length says nothing
  else if (c.kind === "secret") {
    bits.push(k.length === 41 ? "41 characters, as a whole one is" : k.length + " characters — a whole secret key is 41 (sb_secret_ and 31 more): this one is " + (k.length < 41 ? "CUT SHORT" : "LONGER — something came with it"));
    bits.push("begins " + k.slice(0, 14));
  } else if (c.kind === "service") { const j = jwtOf(k) || {}; bits.push("its role service_role" + (j.ref ? " · project " + j.ref : "")); }
  if (/\s/.test(k)) bits.push("HAS A SPACE INSIDE");
  if (hidden) bits.push("HAS DOTS OR STARS — it was copied while hidden");
  else if (/[^\x21-\x7e]/.test(k)) bits.push("HAS A CHARACTER NO KEY HAS");
  if (c.trimmed) bits.push("a space or quote at its ends was taken off");
  return bits.join(" · ");
}
const nap = (ms) => new Promise((r) => setTimeout(r, ms));
const clocky = (t) => /PGRST303|issued at future/i.test(String(t || ""));
// supabase's own words for an answer, short, and never a key
export function wordsOf(text) {
  let j = null; try { j = JSON.parse(text); } catch (_) {}
  const parts = j && typeof j === "object" && !Array.isArray(j) ? [j.code, j.message || j.msg || j.error_description || j.error, j.hint].filter((x) => x != null && x !== "").map(String) : [String(text || "")];
  return parts.join(" · ").replace(/sb_secret_[A-Za-z0-9_-]+|sb_publishable_[A-Za-z0-9_-]+|eyJ[A-Za-z0-9_.-]{20,}/g, "…").replace(/\s+/g, " ").trim().slice(0, 240);
}
// the one thing to say when a key cannot be used at all
function unusableWhy(c) {
  if (c.flawed) return c.name + " holds a key with " + (/[•*…]/.test(c.key) ? "dots or stars in it: it was copied while it was hidden" : /\s/.test(c.key) ? "a space inside it" : "a character no key has") + ". in supabase, click the copy button beside the secret key (knot the letters themselves), paste it into netlify's SUPABASE_SERVICE_KEY, and deploy again.";
  if (c.other) return "the key in " + c.name + " is an old service_role key of another supabase project. SUPABASE_SERVICE_KEY must be this project's SECRET key (sb_secret_…).";
  if (c.kind === "publishable") return "SUPABASE_SERVICE_KEY holds the PUBLISHABLE key (sb_publishable_…). it must be the SECRET one (sb_secret_…), from the same page in supabase.";
  if (c.kind === "anon") return "SUPABASE_SERVICE_KEY holds an old anon key, which cannot open nobody's tables. it must be the SECRET key (sb_secret_…).";
  return "SUPABASE_SERVICE_KEY holds something that is knot a supabase key this file knows. it must be the SECRET key, which begins sb_secret_.";
}

function plainOf(status, says) {
  const s = String(says || ""), w = wordsOf(s);
  if (status === 0) return "supabase could knot be reached (" + s.slice(0, 80) + "). is SUPABASE_URL the project's own address, and is the project awake (a free project sleeps after a week unused)?";
  if (status === 401 && clocky(s)) return "supabase knows the key, but its data door refused it all the same (401 · " + w + "): supabase's own clock running a moment behind — a fault on their side, knot the key's. it was asked again after a breath, and it tripped again. supabase's own advice: restart the project once (in supabase: settings → general → restart project), and write to their support if it goes on. if settings → infrastructure offers an upgrade, take it: their status page named an upgrade as the cure for a fault like this (29 sep).";
  if ((status === 401 || status === 403) && /invalid api key/i.test(s)) return "supabase does knot know the key netlify holds (" + status + " · invalid api key). it is knot this project's secret key as it stands today: a piece of it missing or extra, an older one, or another project's. in supabase, copy it again with its copy button; paste it whole into netlify's SUPABASE_SERVICE_KEY; and deploy again.";
  if (status === 401 || status === 403) return "supabase refused the key (" + status + " · " + w + "). SUPABASE_SERVICE_KEY must be this project's SECRET key (sb_secret_…), copied whole.";
  if (status === 404 || /PGRST205|does not exist|schema cache|relation/i.test(s)) return "supabase answers, but nobody's tables are knot there. open the supabase SQL editor, paste the whole of the-artist.sql, and run it once.";
  if (status === 400 || /PGRST204|column/i.test(s)) return "supabase answers, but a table is older than these files (" + w.slice(0, 90) + "). run the-artist.sql again; it is safe to run twice.";
  return "supabase said " + status + " (" + w.slice(0, 120) + ").";
}
let PICK = null;   // the key supabase took, and the way it took it — remembered while this function is warm
export function db(env, fetchFn, opts) {
  const F = fetchFn || globalThis.fetch, WAIT = (opts && opts.wait) || 8000;
  const base = urlOf(env), keys = keysOf(env, base), usable = keys.filter((c) => c.usable);
  const fail = (plain, status, words) => { const e = new Error(plain); e.plain = plain; e.status = status || 0; e.words = words || ""; return e; };
  const unasked = (plain) => { const e = fail(plain); e.unasked = true; return e; };   // said before supabase was asked anything
  // supabase's new keys go on `apikey` alone, as supabase asks; the old long ones (eyJ…) on both. a key refused one way is tried the other.
  const head = (key, style) => (style === "apikey" ? { apikey: key } : { apikey: key, Authorization: "Bearer " + key });
  const once = async (path, init, key, style) => {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), WAIT);
    try {
      const r = await F(base + "/rest/v1/" + path, { ...init, signal: ctl.signal, headers: { ...head(key, style), "Content-Type": "application/json", ...(init && init.headers) } });
      const text = await r.text();
      return { ok: r.ok, status: r.status, text };
    } catch (e) { return { ok: false, status: 0, text: String((e && e.message) || e) }; } finally { clearTimeout(t); }
  };
  // supabase's clock: a token it refuses as `issued at future` is asked for again after a breath, twice at most
  const ask = async (path, init, key, style) => {
    let r = await once(path, init, key, style);
    for (let i = 0; i < 2 && r.status === 401 && clocky(r.text); i++) { await nap(1100 + 600 * i); r = await once(path, init, key, style); }
    return r;
  };
  const styles = (c) => (c.kind === "secret" ? ["apikey", "both"] : ["both", "apikey"]);
  const call = async (path, init) => {
    if (!F) throw unasked("this site's functions run on a node too old to have fetch. in netlify: site configuration → environment → add AWS_LAMBDA_JS_RUNTIME = nodejs20.x, and deploy again.");
    if (!base) throw unasked("SUPABASE_URL is knot set in netlify's environment (site → environment variables).");
    if (!/^https:\/\/[a-z0-9-]+\.supabase\.(co|in|net)$/i.test(base)) throw unasked("SUPABASE_URL does knot look like a project's address. it should read https://<your project's letters>.supabase.co — knot the dashboard's address.");
    if (!keys.length) throw unasked("SUPABASE_SERVICE_KEY is knot set in netlify's environment.");
    if (!usable.length) throw unasked(unusableWhy(keys[0]));
    const tries = [], known = PICK ? usable.find((c) => c.key === PICK.key) : null;
    if (known) tries.push({ c: known, style: PICK.style });
    for (const c of usable) for (const st of styles(c)) if (!(known && c === known && st === PICK.style)) tries.push({ c, style: st });
    let refused = null; const clockKeys = new Set();
    for (const t of tries) {
      if (clockKeys.has(t.c.key)) continue;              // supabase's clock is the trouble, knot the way the key was given: the other way will knot help
      const r = await ask(path, init, t.c.key, t.style);
      if (r.status === 0) throw fail(plainOf(0, r.text), 0, wordsOf(r.text));
      if (r.status === 401 || r.status === 403) {
        if (clocky(r.text)) clockKeys.add(t.c.key);
        if (!refused || (clocky(r.text) && !clocky(refused.text))) refused = r;   // the first refusal speaks — unless a later one is supabase's clock
        continue;
      }
      PICK = { name: t.c.name, key: t.c.key, style: t.style };                      // supabase took this key, whatever it then said
      if (!r.ok) throw fail(plainOf(r.status, r.text), r.status, wordsOf(r.text));
      try { return r.text ? JSON.parse(r.text) : null; } catch (e) { throw fail("supabase answered something that is knot json (" + r.text.slice(0, 60) + "). is SUPABASE_URL the project's own address?"); }
    }
    if (!clocky(refused.text)) PICK = null;
    throw fail(plainOf(refused.status, refused.text), refused.status, wordsOf(refused.text));
  };
  return {
    get: (t, q) => call(t + "?" + q),
    insert: (t, rows) => call(t, { method: "POST", body: JSON.stringify(rows), headers: { Prefer: "return=representation" } }),
    picked: () => (PICK ? PICK.name : ""),
  };
}

const HEADS = { "access-control-allow-origin": "*", "access-control-allow-methods": "GET,POST,OPTIONS", "access-control-allow-headers": "content-type" };
const json = (obj, status = 200, cache = 10) => new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": `public, max-age=${cache}`, ...HEADS } });
const text = (s, status = 200, cache = 20) => new Response(s, { status, headers: { "content-type": "text/plain; charset=utf-8", "cache-control": cache ? `public, max-age=${cache}` : "no-store", ...HEADS } });

// the one short line that says what a finished piece is: the record's first line (nobody is asked to write it so);
// an older record with no such line gives its first sentence.
export function firstLine(record) {
  if (!record) return null;
  const s = String(record).trim(); if (!s) return null;
  const nl = s.indexOf("\n");
  let l = (nl > 0 ? s.slice(0, nl) : s).replace(/\s+/g, " ").trim();
  if (nl < 0 || l.length > 120) { const m = l.match(/^(.{12,118}?[.!?])(\s|$)/); if (m) l = m[1]; else if (l.length > 118) l = l.slice(0, 115).replace(/\s+\S*$/, "") + "…"; }
  return l || null;
}

export async function todayDrawer(d, day, st, env) {
  const [airs, dreams] = await Promise.all([soft(d.get("nobody_airs", `died=gte.${day}T00:00:00Z&died=lt.${day}T23:59:59.999Z&select=life,genome`)),
    soft(d.get("nobody_dreams", `day=eq.${day}&order=at.asc&select=at,life,mind,tokens,seal,summary`))]);
  const [works, hud, deaths, tele, moves, door] = await Promise.all([
    d.get("nobody_works", `day=eq.${day}&order=win.asc&select=win,title,kind,before,record,state,sheet,subtotal,model,burned_at`),
    d.get("nobody_hud", `day=eq.${day}&order=at.asc&limit=400&select=at,life,win,text,wake,dying,death`),
    d.get("nobody_deaths", `at=gte.${day}T00:00:00Z&at=lt.${day}T23:59:59.999Z&order=at.asc&select=at,life,last,gene,way`),
    d.get("nobody_telegrams", `at=gte.${day}T00:00:00Z&at=lt.${day}T23:59:59.999Z&order=at.asc&select=at,life,text`),
    d.get("nobody_moves", `at=gte.${day}T00:00:00Z&at=lt.${day}T23:59:59.999Z&accepted=eq.true&select=at,thing`),
    d.get("nobody_door", `at=gte.${day}T00:00:00Z&at=lt.${day}T23:59:59.999Z&select=at,signed`),
  ]);
  const flags = (st && st.today) || {};
  return {
    date: day, clock: "utc", place: PLACE,
    windows: (works || []).filter((w) => WINDOWS[w.win - 1]).map((w) => ({ n: w.win, from: WINDOWS[w.win - 1].from, to: WINDOWS[w.win - 1].to, title: w.title, kind: w.kind, line: firstLine(w.record), before: w.before, record: w.record, work: { kind: w.kind, title: w.title, state: w.state }, sheet: w.sheet, subtotal: w.subtotal, model: w.model, burned_at: w.burned_at })),
    lives: (deaths || []).map((x) => ({ n: x.life, died: x.at, last: x.last, gene: x.gene, way: x.way,
      first: ((hud || []).find((l) => l.life === x.life) || {}).text || null, genome: ((airs || []).find((a) => a.life === x.life) || {}).genome || null })),
    dreams: veilDreams(dreams, env),
    hud: (hud || []).map(({ win, ...l }) => ({ ...l, window: win })), telegrams: tele || [], orchid: st ? st.orchid : null,
    practice: flags.practiceAt ? st.practice : null, moved: moves || [], door: door || [],
    stolen: flags.stolen || [], total: (works || []).reduce((a, w) => a + (+w.subtotal || 0), 0), total_ever: st ? st.total : null,
  };
}

// ───────────────────────────────────────────────── ?health=1 ─────────────────────────────────────────────────
// plain words for terence, one fact a line. it never prints a key: of each, only its kind, how long it is, and its
// first four letters after sb_secret_ (what supabase's own page shows of a hidden key, and no more).
// a door of supabase's asked plainly: no retry, a short wait, the status and the words
async function door(F, url, headers, wait) {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), wait || 4000);
  try { const r = await F(url, { headers: headers || {}, signal: ctl.signal }); return { status: r.status, text: await r.text() }; }
  catch (e) { return { status: 0, text: String((e && e.message) || e) }; } finally { clearTimeout(t); }
}
const KIND_WORDS = { secret: "a secret key (sb_secret_…), the right kind", publishable: "a PUBLISHABLE key — the wrong kind: it must be the secret one (sb_secret_…)",
  service: "an old service_role key (eyJ…)", anon: "an old ANON key — the wrong kind: it must be the secret one (sb_secret_…)", jwt: "an old long key (eyJ…) of a role this file does knot know", other: "something that is knot a supabase key" };
async function health(env, fetchFn) {
  const F = fetchFn || globalThis.fetch;
  const L = [], put = (a, b) => L.push((a + "                        ").slice(0, 24) + b);
  const base = urlOf(env), keys = keysOf(env, base), akey = KEYCLEAN(env.ANTHROPIC_API_KEY || env.CLAUDE_API_KEY || env.ANTHROPIC_KEY || "");
  const shaped = !!base && /^https:\/\/[a-z0-9-]+\.supabase\.(co|in|net)$/i.test(base);
  L.push(BUILD); L.push("the well's clock: " + new Date().toISOString().slice(0, 16).replace("T", " ") + " utc"); L.push("");
  // asked at once, side by side: the address with no key (a supabase project answers `no api key`), each key at auth's
  // settings (a door that answers anyone whose key supabase knows, and does knot look at the clock), and anthropic's list
  const settings = shaped && F ? base + "/auth/v1/settings" : "";
  const anth = akey && F ? door(F, "https://api.anthropic.com/v1/models?limit=100", { "x-api-key": akey, "anthropic-version": "2023-06-01" }, 4500) : Promise.resolve(null);
  const [addr, probes, ar] = await Promise.all([
    settings ? door(F, settings, {}) : Promise.resolve(null),
    Promise.all(keys.map((c) => (settings && c.usable ? door(F, settings, c.kind === "secret" ? { apikey: c.key } : { apikey: c.key, Authorization: "Bearer " + c.key }) : Promise.resolve(null)))),
    anth,
  ]);
  put("SUPABASE_URL", !base ? "KNOT SET" : "set · " + base.replace(/^https:\/\//, "") + (!shaped ? " · KNOT A PROJECT'S ADDRESS (it should read https://<letters>.supabase.co)" : !addr ? "" : addr.status === 0 ? " · DOES KNOT ANSWER" : addr.status >= 500 ? " · answers, but with " + addr.status + " · " + wordsOf(addr.text) : " · a supabase project answers there"));
  if (!keys.length) put("SUPABASE_SERVICE_KEY", "KNOT SET");
  keys.forEach((c, n) => {
    const looks = keyLooks(c);
    put(c.name, "set · " + (KIND_WORDS[c.kind] || KIND_WORDS.other) + (c.other ? " — ANOTHER PROJECT'S" : "") + (looks ? " · " + looks : ""));
    const a = probes[n];
    c.known = !a ? null : a.status === 200 ? true : ((a.status === 401 || a.status === 403) && /invalid api key/i.test(a.text)) ? false : null;   // only supabase's own `invalid api key` is a no
    if (a && a.status) put("  supabase knows it?", c.known === true ? "yes" : c.known === false ? "NO — supabase's words: " + wordsOf(a.text) : "unclear (" + a.status + " · " + wordsOf(a.text) + ")");
  });
  if (!keys.some((c) => c.name === "SUPABASE_SERVICE_KEY") && keys.length) put("SUPABASE_SERVICE_KEY", "knot set (another variable holds a key: above)");
  put("ANTHROPIC_API_KEY", akey ? "set" : "KNOT SET (nobody-think needs it to think)");
  let say = "";
  let st = null;
  try {
    const d = db(env, fetchFn, { wait: 4500 });
    const rows = await d.get("nobody_state", "id=eq.1&select=*");
    st = rows && rows[0];
    put("the data door", "answers" + (keys.length > 1 && d.picked() ? " · with the key in " + d.picked() : ""));
    put("the tables", "answer");
    { const t3 = []; for (const t of ["nobody_dreams", "nobody_frames", "nobody_airs"]) { try { await d.get(t, "select=*&limit=1"); t3.push(t + " yes"); } catch (_) { t3.push(t + " KNOT THERE"); } }   // seventh cut
      put("pass 3's tables", t3.join(" · ") + (t3.some((x) => /KNOT/.test(x)) ? " — paste the-artist-pass3.sql into supabase's SQL editor" : "")); }
    if (!st) { put("the mother", "no row in nobody_state"); say = "the tables answer but hold no row. the-artist.sql did knot finish: run it again in supabase's SQL editor (it is safe to run twice)."; }
  } catch (e) {
    const missing = /tables are knot there/.test(e.plain || "");
    if (e.unasked) { put("the data door", "knot asked — there is no address or key it could use (below)"); }
    else if (missing) { put("the data door", "answers"); put("the tables", "KNOT THERE"); }
    else { put("the data door", e.status === 401 || e.status === 403 ? "REFUSED · " + (e.words || e.status) : e.status === 0 ? "DOES KNOT ANSWER" : "answers, with " + e.status + (e.words ? " · " + e.words : "")); put("the tables", "DO KNOT ANSWER"); }
    say = e.plain || String((e && e.message) || e);
    if ((e.status === 401 || e.status === 403) && !clocky(e.words)) {
      if (keys.some((c) => c.known === true)) say = "supabase knows the key at its front door, but its data door refused it (" + e.status + " · " + (e.words || "no words") + "). that is supabase's side, knot the key's. in supabase: settings → general → restart project. if it stays so, make a new secret key on supabase's api keys page, put it in netlify's SUPABASE_SERVICE_KEY and deploy again; if even that is refused, it is supabase's to mend (their support).";
      else if (keys.some((c) => c.kind === "secret")) say += " to see whether netlify is still giving the function an older key: the four letters after sb_secret_ above should be the same as supabase's own (in supabase: settings → api keys → secret keys — the eye beside the key shows it). if they differ, the function holds an older key: a changed variable reaches a function only with the next deploy.";
    }
  }
  if (st) {
    const now = Date.now(), flags = st.today || {};
    if (!st.day) { put("the mother", "asleep — she has never woken"); say = "everything is in place and she has never woken. in netlify: functions → nobody-step → Run now, once. that is life 1's first waking; after it she steps every ten minutes on her own."; }
    else {
      const upd = st.updated ? Date.parse(st.updated) : NaN, ago = isFinite(upd) ? Math.round((now - upd) / MIN) : null;
      put("the mother", "life " + st.life + " · " + st.deaths + " have died before it · day " + st.day + " · window " + st.win);
      put("her last step", ago == null ? "unknown" : (ago <= 1 ? "this minute" : ago + " minutes ago") + (st.model ? " · " + st.model : ""));
      if (ago != null && ago > 25) say = "she has knot stepped for " + ago + " minutes; a step is due every ten. in netlify → functions, look at nobody-step's log (it should say `knocked 202` every ten minutes) and at nobody-think's (it should say `nobody stepped`). if nobody-step is knot in the list, the deploy did knot carry the functions folder.";
      else say = "she is awake and stepping.";
    }
    if (flags.err && flags.err.msg) { put("the last thing wrong", String(flags.err.at || "").slice(0, 16).replace("T", " ") + " · " + String(flags.err.msg).slice(0, 300)); }
    else put("the last thing wrong", "nothing");
  }
  // the mind's key and the minds named, asked of anthropic's own list (a free question; nothing is thought)
  if (ar) {
    if (ar.status === 0) put("the mind's key", "anthropic could knot be reached just now");
    else if (ar.status === 401 || ar.status === 403) { put("the mind's key", "REFUSED by anthropic (" + ar.status + ")"); say = say && !/awake and stepping/.test(say) ? say : "anthropic refuses ANTHROPIC_API_KEY: the mother cannot think until the key is a live one."; }
    else if (ar.status === 200) {
      let ids = []; try { ids = ((JSON.parse(ar.text) || {}).data || []).map((m) => m.id); } catch (_) {}
      put("the mind's key", "answers");
      const spec = env.NOBODY_MODELS || "00-08:claude-sonnet-5-5,08-20:claude-opus-5-5,20-24:claude-sonnet-5-5";   // nobody-think.mjs's own default (fourth cut)
      const want = spec.split(",").map((p) => (p.split(":")[1] || "").trim()).filter(Boolean);
      const gone = want.filter((m) => ids.length && ids.indexOf(m) < 0);
      put("the minds by hour", spec + (gone.length ? "  ·  KNOT ON ANTHROPIC'S LIST: " + gone.join(", ") + " (the step falls back to another mind)" : "  ·  all on anthropic's list"));
    } else put("the mind's key", "anthropic said " + ar.status);
  }
  L.push(""); L.push(say || "nothing is wrong that this file can see.");
  L.push(""); L.push("(copy these lines to claude if anything says KNOT, NO, REFUSED or DO KNOT.)");
  return L.join("\n");
}

// ───────────────────────────────────────────────── the questions ─────────────────────────────────────────────
async function answer(req, env, fetchFn) {
  const u = new URL(req.url);
  if (req.method === "OPTIONS") return json({}, 200, 0);
  if (u.searchParams.get("health") != null) return text(await health(env, fetchFn), 200, 0);   // never cached: a reload is always fresh
  const d = db(env, fetchFn, { wait: 4000 });   // four seconds a question: the whole answer must come inside netlify's ten

  if (req.method === "POST") {
    let body = {};
    try { body = await req.json(); } catch (e) { return json({ accepted: false, why: "no json" }, 400, 0); }
    const thing = String(body.thing || "").toLowerCase();
    const visitor = String(body.visitor || "").slice(0, 64);
    const to = Array.isArray(body.to) ? body.to.slice(0, 2).map(Number) : null;
    const from = Array.isArray(body.from) ? body.from.slice(0, 2).map(Number) : null;
    if (!MOVABLE.includes(thing) || !visitor || !to || to.some((n) => !isFinite(n))) return json({ accepted: false, why: "knot a thing that moves" }, 400, 0);
    const st = ((await d.get("nobody_state", "id=eq.1&select=hands,fire")) || [])[0] || {};
    if (st.hands === thing) return json({ accepted: false, why: "its hands are on it" }, 200, 0);
    if (st.fire) return json({ accepted: false, why: "the fire" }, 200, 0);
    const before = await d.get("nobody_moves", `visitor=eq.${encodeURIComponent(visitor)}&accepted=eq.true&select=id&limit=1`);
    if (before && before.length) return json({ accepted: false, why: "one a life" }, 200, 0);
    await d.insert("nobody_moves", [{ thing, from_at: from, to_at: to.map((n) => Math.round(n * 100) / 100), visitor, accepted: true }]);
    return json({ accepted: true }, 200, 0);
  }

  // eighth cut · ?airs=1 — the dead airs of the last day, for the river
  if (u.searchParams.get("airs") != null) {
    const since = new Date(Date.now() - 26 * 3600e3).toISOString();
    const rows = await soft(d.get("nobody_airs", `died=gte.${since}&order=died.desc&limit=24&select=life,died,genome`));
    return json({ clock: new Date().toISOString(), airs: (rows || []).slice().reverse() }, 200, 60);
  }
  // seventh cut · ?pulse=1 — the light question for every phone
  if (u.searchParams.get("pulse") != null) {
    const st = ((await d.get("nobody_state", "id=eq.1&select=*")) || [])[0];
    if (!st || !st.day) return json({ asleep: true }, 200, 15);
    const now = new Date(), born = new Date(st.born), death = deathOfState(st, born);
    const [h, dd, tg, dr, ar] = await Promise.all([
      d.get("nobody_hud", "order=at.desc&limit=1&select=at,life,text,wake,dying,death"),
      d.get("nobody_deaths", "order=at.desc&limit=1&select=at,life,last"),
      d.get("nobody_telegrams", "order=at.desc&limit=1&select=at,life,text"),
      soft(d.get("nobody_dreams", "order=at.desc&limit=1&select=at,life,mind,tokens,seal")),
      soft(d.get("nobody_airs", "order=died.desc&limit=2&select=life,genome")),                 // eighth cut, later: the death's own air
    ]);
    const deathOut = dd && dd[0] ? { life: dd[0].life, at: dd[0].at, last: dd[0].last } : null;
    if (deathOut && ar && ar[0] && ar[0].life === deathOut.life && ar[0].genome) {
      deathOut.genome = ar[0].genome; deathOut.moved = -1;
      if (ar[1] && ar[1].life === deathOut.life - 1 && ar[1].genome) { const a = rungsOf(ar[0].genome), b = rungsOf(ar[1].genome); deathOut.moved = a.findIndex((r, i) => r !== b[i]); }
    }
    return json({ clock: now.toISOString(), step: st.updated || null, done: (st.today && st.today.done) || null,
      life: { n: st.life, dying: now >= new Date(death.getTime() - DYING_MS) && now < death, dead: now >= death },
      line: (h && h[0]) || null, death: deathOut,
      telegram: (tg && tg[0]) || null, dream: dr && dr[0] ? { at: dr[0].at, life: dr[0].life, mind: dr[0].mind, tokens: dr[0].tokens, seal: dr[0].seal } : null, wire: st.wire || [] }, 200, 15);
  }
  // seventh cut · ?film=YYYY-MM-DD — a day's frames, for nestflix's past performances
  const film = u.searchParams.get("film");
  if (film && /^\d{4}-\d{2}-\d{2}$/.test(film)) {
    const fr = await soft(d.get("nobody_frames", `day=eq.${film}&order=at.asc&limit=1000&select=at,life,frame`));
    const isToday = film === new Date().toISOString().slice(0, 10);
    return json({ date: film, frames: fr || [] }, 200, isToday ? 60 : 3600);
  }

  const day = u.searchParams.get("day");
  if (day && /^\d{4}-\d{2}-\d{2}$/.test(day)) {
    const rows = await d.get("nobody_days", `day=eq.${day}&select=drawer`);
    if (rows && rows[0]) {
      const dr = rows[0].drawer || {};
      if (Array.isArray(dr.windows)) dr.windows.forEach((w) => { if (w && w.line == null) w.line = firstLine(w.record); });   // a day bound before this cut has no lines: they are read off its records
      if (Array.isArray(dr.dreams)) dr.dreams = veilDreams(dr.dreams, env);   // seventh cut: a bound day's summaries stay veiled too
      return json(dr, 200, 3600);
    }
    const st = ((await d.get("nobody_state", "id=eq.1&select=*")) || [])[0];
    if (st && st.day === day) return json(await todayDrawer(d, day, st, env), 200, 10);
    // fifth cut: a day the fire has knot yet bound is read from the tables (its orchid and practice only while it is the
    // day the fire is burning: after that, the state holds a newer day's)
    if (st && st.day && day < st.day) {
      const dr = await todayDrawer(d, day, (st.today && st.today.fireDay === day) ? st : null, env);
      if ((dr.windows && dr.windows.length) || (dr.hud && dr.hud.length)) return json(dr, 200, 60);
    }
    return json({ date: day, empty: true }, 404, 60);
  }

  // ?now=1 — and the default
  const st = ((await d.get("nobody_state", "id=eq.1&select=*")) || [])[0];
  if (!st || !st.day) return json({ asleep: true, why: st ? "she has never woken: press Run now on nobody-step, once." : "no row in nobody_state." }, 200, 10);
  const now = new Date();
  const born = new Date(st.born);
  const death = deathOfState(st, born);                                          // seventh cut: the star's breath, as the mind reads it
  const win = WINDOWS[Math.floor(now.getUTCHours() / 4)];
  const dayToo = u.searchParams.get("day_too") !== "0";
  const [lastHud, works, moved, dayDrawer] = await Promise.all([
    d.get("nobody_hud", "order=at.desc&limit=1&select=at,life,win,text,wake,dying,death"),
    d.get("nobody_works", `day=eq.${st.day}&order=win.asc&select=win,title,kind,before,record,subtotal,model`),
    d.get("nobody_moves", "accepted=eq.true&order=at.desc&limit=3&select=at,thing"),
    dayToo ? todayDrawer(d, st.day, st, env) : Promise.resolve(null),       // asked side by side (fourth cut): two rounds, knot three
  ]);
  const flags = st.today || {};
  const byWin = {}; (works || []).forEach((x) => { byWin[x.win] = x; });
  const w = byWin[st.win] || {};
  const sameDay = st.day === now.toISOString().slice(0, 10);
  const out = {
    clock: now.toISOString(), place: PLACE, step: st.updated || null,
    window: { n: st.win, from: WINDOWS[(st.win || 1) - 1].from, to: WINDOWS[(st.win || 1) - 1].to, title: w.title || null, kind: w.kind || null, before: w.before || null },
    clock_window: win.n,
    // THE WALL: the well's day so far, a window a row — the finished ones with the one line that says what each piece is
    windows: WINDOWS.filter((W) => (sameDay ? W.n <= win.n : W.n <= (st.win || 0))).map((W) => { const r = byWin[W.n] || {}; return { n: W.n, from: W.from, to: W.to, title: r.title || null, kind: r.kind || null, line: firstLine(r.record), done: sameDay ? W.n < win.n : true }; })
      .filter((x) => !x.done || x.title),                                  // fourth cut: a finished window with nothing in it is knot written on the wall
    life: { n: st.life, born: st.born, dying: now >= new Date(death.getTime() - DYING_MS) && now < death, dead: now >= death },
    deaths: st.deaths,
    hud: lastHud && lastHud[0] ? (({ win, ...l }) => ({ ...l, window: win }))(lastHud[0]) : null,
    hands: st.hands, movable: MOVABLE.filter((m) => m !== st.hands), place: st.place,
    set: st.set_ || [], work: st.work || null, fire: st.fire || null, orchid: st.orchid || null,
    // what its hands did this step to the things that are knot the set, and how those things stand
    touch: Array.isArray(flags.touch) ? flags.touch : [],
    fixtures: Object.assign({ lid: "open", lash: "tight" }, flags.fix || {}),
    moved: moved || [], model: st.model,
    sheet: { window: w.subtotal || 0, day: flags.dayTotal || 0, ever: st.total, model: w.model || null },
  };
  out.genome = st.genome || null; out.done = flags.done || null;              // seventh cut
  if (dayDrawer) out.day = dayDrawer;
  return json(out, 200, 10);
}

// sixth cut · THE EDGE CACHE. a GET of ?now= or ?day= (and the bare address, which is ?now=) is kept at netlify's edge
// for as long as its own cache-control says; ?health=, POST and OPTIONS never are. the vary is the same on every answer.
const VARY = "query=now|day|day_too|health|pulse|film|airs";
export function edge(req, res) {
  try {
    res.headers.set("Netlify-Vary", VARY);
    let q = null; try { q = new URL(req.url).searchParams; } catch (_) {}
    if (req.method !== "GET" || !q || q.get("health") != null) return res;
    const m = /max-age=(\d+)/.exec(res.headers.get("cache-control") || "");
    const secs = m ? +m[1] : 0;
    if (secs >= 1 && res.status >= 200 && res.status < 300) res.headers.set("Netlify-CDN-Cache-Control", `public, s-maxage=${secs}, durable`);
  } catch (_) {}
  return res;
}

// netlify's door. whatever happens inside, the answer is words — never a 502.
export async function handle(req, env, fetchFn) {
  return edge(req, await handle0(req, env, fetchFn));
}
async function handle0(req, env, fetchFn) {
  try { return await answer(req, env, fetchFn); }
  catch (e) {
    const why = (e && e.plain) || ("the feed tripped: " + String((e && e.message) || e).slice(0, 160));
    try { console.error("nobody (the feed) could knot answer:", why); } catch (_) {}
    let q = null; try { q = new URL(req.url).searchParams; } catch (_) {}
    if (req.method === "POST") return json({ accepted: false, why: "the well is asleep" }, 200, 0);
    const day = q && q.get("day");
    if (day) return json({ date: day, empty: true, asleep: true, why }, 200, 10);
    return json({ asleep: true, why }, 200, 10);
  }
}
export default async (req) => handle(req, process.env);
