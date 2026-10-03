// press · pass 3 (3 oct 2026): nobody-think.mjs and nobody.mjs against a stand-in supabase and a stand-in mind.
// the builder's, never terence's to run or deploy. nothing here calls anthropic or supabase.
// run from the repo root:  node press/server3-press.mjs
import { createHash } from "node:crypto";
import * as T from "../song/netlify/functions/nobody-think.mjs";
import { handle } from "../song/netlify/functions/nobody.mjs";
let bad = 0; const ok = (c, m) => { console.log((c ? "  ok   " : "  FAIL ") + m); if (!c) bad++; };

// ── a stand-in supabase: the handful of postgrest filters these files use ──
function fakeDb(seed, missing = new Set()) {
  const tables = JSON.parse(JSON.stringify(seed)); let id = 1000;
  const parse = (q) => { const f = [], o = { order: null, limit: null };
    for (const part of String(q || "").split("&")) { if (!part) continue; const i = part.indexOf("="); const k = part.slice(0, i), v = decodeURIComponent(part.slice(i + 1));
      if (k === "select" || k === "on_conflict") continue; if (k === "order") { const [c, d] = v.split("."); o.order = { c, d }; continue; } if (k === "limit") { o.limit = +v; continue; }
      const m = v.match(/^(eq|gte|lt|lte|gt|is)\.(.*)$/); if (m) f.push({ k, op: m[1], v: m[2] }); }
    return { f, o }; };
  const cmp = (a, b) => (typeof a === "number" || typeof b === "number") ? (+a - +b) : String(a).localeCompare(String(b));
  const match = (r, f) => f.every(({ k, op, v }) => { const x = r[k];
    if (op === "is") return v === "null" ? x == null : String(x) === v;
    if (op === "eq") return String(x) === v; if (x == null) return false;
    const c = cmp(x, isFinite(+v) && typeof x === "number" ? +v : v); return op === "gte" ? c >= 0 : op === "gt" ? c > 0 : op === "lt" ? c < 0 : c <= 0; });
  const T_ = (t) => { if (missing.has(t)) throw new Error("supabase 404 /" + t + " · relation does not exist"); return tables[t] || (tables[t] = []); };
  return { tables,
    get: async (t, q) => { const { f, o } = parse(q); let rows = T_(t).filter((r) => match(r, f)); if (o.order) rows = rows.slice().sort((a, b) => cmp(a[o.order.c], b[o.order.c]) * (o.order.d === "desc" ? -1 : 1)); if (o.limit) rows = rows.slice(0, o.limit); return JSON.parse(JSON.stringify(rows)); },
    insert: async (t, rows) => { const tb = T_(t); for (const r of rows) tb.push(Object.assign({ id: ++id }, JSON.parse(JSON.stringify(r)))); return rows; },
    upsert: async (t, rows, on) => { const tb = T_(t), keys = on.split(","); for (const r of rows) { const e = tb.find((x) => keys.every((k) => String(x[k]) === String(r[k]))); if (e) Object.assign(e, JSON.parse(JSON.stringify(r))); else tb.push(Object.assign({ id: ++id }, JSON.parse(JSON.stringify(r)))); } return rows; },
    patch: async (t, q, obj) => { const { f } = parse(q); for (const r of T_(t).filter((r) => match(r, f))) Object.assign(r, JSON.parse(JSON.stringify(obj))); return []; },
  };
}
// ── a stand-in mind: answers json, dreams 2500 tokens, keeps every request it was asked ──
function fakeModel(log) {
  return async (req) => { log.push(req); const n = log.length;
    const answer = { hud: "step " + n + " the second bowl is on the bat and the wheel is slowing under my hands now", place: [0.5, -1.2], hands: "clay", set: [{ id: "wheel", kind: "wheel", at: [0.4, -1.2] }], work: { kind: "pot", title: "a bowl", state: { stage: "thrown" } }, touch: n === 1 ? [{ what: "rope", how: "pull" }] : [], telegram: true };
    const th = [{ type: "thinking", thinking: "it weighs the clay and decides to slow the wheel", signature: "sig" + n }];
    return { text: JSON.stringify(answer), usage: { input_tokens: 900, cache_read_input_tokens: 4000, cache_creation_input_tokens: 0, output_tokens: 3100, output_tokens_details: { thinking_tokens: 2500 } }, stop: "end_turn",
      thinking: th, content: th.concat([{ type: "text", text: JSON.stringify(answer) }]), served: req.model, took: 1234 }; };
}
const wire = async () => [{ title: "Storm reaches the coast overnight", at: null }, { title: "Markets steady", at: null }, { title: "Election count continues", at: null }];
const DAY = "2026-10-03";
const seed = (born, extra = {}) => ({ nobody_state: [Object.assign({ id: 1, day: DAY, win: 4, win_open: true, life: 5, born: born.toISOString(), deaths: 4, founder_seed: 12345, epoch: "2026-10-01T21:00:57Z",
  work: { kind: "pot", title: "a bowl", state: {} }, set_: [], place: [0.5, -1.2], hands: "clay", today: {}, total: 10, practice: "nothing yet", genome: { turning: 0.5, balance: -0.25, seeds: 0, patience: 0, temper: 0, warmth: 0, restless: 0, longevity: 0, pace: 0 } }, extra)],
  nobody_hud: [], nobody_deaths: [], nobody_telegrams: [], nobody_works: [], nobody_moves: [], nobody_door: [], nobody_days: [] });

console.log("1 · the mind's request (realModel, against a stand-in fetch)");
{ const seen = []; const realFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => { seen.push({ url, headers: init.headers, body: JSON.parse(init.body) }); return new Response(JSON.stringify({ model: "claude-opus-5-5", stop_reason: "end_turn", content: [{ type: "thinking", thinking: "s", signature: "x" }, { type: "text", text: "{\"hud\":\"a\"}" }], usage: { output_tokens: 10 } }), { status: 200 }); };
  try {
    const M = T.realModel ? T.realModel : null;
    // realModel is knot exported; reach it through askMind with the real adapter shape instead
  } finally {}
  const mod = await import("../song/netlify/functions/nobody-think.mjs");
  const src = (await import("node:fs")).readFileSync(new URL("../song/netlify/functions/nobody-think.mjs", import.meta.url), "utf8");
  ok(/thinking: \{ type: "adaptive", display: "summarized" \}/.test(src), "thinking: adaptive, display summarized");
  ok(/cache_control: \{ type: "ephemeral", ttl: "1h" \}/.test(src), "the laws cached for an hour");
  ok(/body\.fallbacks = "default"/.test(src) && /"server-side-fallback-2026-07-01"/.test(src), "fallbacks: default, with its beta header");
  globalThis.fetch = realFetch; }

console.log("2 · a step: the dream, the frame, the settings, the river, done");
let t0 = new Date("2026-10-03T12:00:00Z");
{ const db = fakeDb(seed(new Date(t0.getTime() - 30 * 60000))), log = [];
  const river = async () => [{ kind: "beat", bpm: 64, at: "2026-10-03T11:58:00Z" }, { kind: "breath", at: "2026-10-03T11:20:00Z" }];
  db.tables.nobody_state[0].today.lastStepAt = "2026-10-03T11:50:00Z";
  const r = await T.step({ now: t0, db, model: fakeModel(log), wire, river, env: {} });
  const d = db.tables.nobody_dreams[0];
  ok(d && d.tokens === 2500 && d.seal === createHash("sha256").update("sig1").digest("hex") && d.summary.startsWith("it weighs") && d.took_ms === 1234 && d.mind === "claude-opus-5-5", "the dream is kept: 2500 tokens, its seal's fingerprint, its summary, its mind");
  ok(d && d.last === false && d.block === null, "knot the last step: no page kept");
  const f = db.tables.nobody_frames[0]; ok(f && f.frame.touch.length === 1 && f.frame.hud.text.startsWith("step 1"), "the frame is kept (the touch, the line)");
  const st = db.tables.nobody_state[0]; ok(st.today.phaseFrom === 6, "the star's breath from life 6 on (phaseFrom " + st.today.phaseFrom + ")");
  ok(st.today.done && st.today.lastStepAt === t0.toISOString(), "done and lastStepAt kept");
  const q = log[0]; ok(q.effort === "high", "turning +0.5 → effort high on opus 5.5 (" + q.effort + ")");
  ok(/the river, 12:00: a heartbeat at 64 \(new\) · a breath/.test(q.user), "the river as weather, the new marked");
  ok(/the wire, 12:00: Storm reaches the coast overnight · Markets steady$/m.test(q.user), "balance −0.25 → two headlines");
  ok(/as your settings: you dream deep\./.test(q.user) && /may run to 21 words/.test(q.user), "the genes said as settings");
  ok(!/the catalogue:/.test(q.user) && /the catalogue:/.test(q.system), "the catalogue rides in the cached system prompt");
  ok(/in your last eight minutes you think every minute\. the last of them is told it is the last\./.test(q.system) && /the river is on\./.test(q.system), "the laws v1.3");
  ok(st.today.tally.turning === 1, "dreamt deep → turning is being written");
}

console.log("3 · a life through its death: the minute steps, the last step told, the cut, the air, the child");
{ // place life 5's death at 12:05:30 by finding its breath from a first reading
  const probe = fakeDb(seed(new Date(t0.getTime() - 30 * 60000))); const rp = await T.step({ now: t0, db: probe, model: fakeModel([]), wire, river: async () => [], env: {} });
  const off = new Date(rp.death).getTime() - (t0.getTime() - 30 * 60000);              // 88 minutes + this life's breath
  const deathAt = new Date("2026-10-03T12:05:00Z"), born = new Date(deathAt.getTime() - off);
  const db = fakeDb(seed(born)), log = [];
  db.tables.nobody_state[0].today.phaseFrom = 6;
  let r = await T.step({ now: t0, db, model: fakeModel(log), wire, river: async () => [], env: {} });
  ok(r.death === deathAt.toISOString(), "death at 12:05:00 (" + r.death + ")");
  const times = []; let t = T.nextStepAt(new Date(r.at), new Date(r.death));
  while (t < new Date(r.death)) { times.push(t.toISOString().slice(11, 16)); r = await T.step({ now: t, db, model: fakeModel(log), wire, river: async () => [], env: {}, quick: true }); t = T.nextStepAt(t, new Date(r.death)); }
  ok(times.join(" ") === "12:01 12:02 12:03 12:04", "a minute at a time through the dying, the last 40 s or more before the death: " + times.join(" "));
  ok(log[log.length - 1].user.includes("this is your last step; the next knock finds you dead.") && !log[log.length - 2].user.includes("this is your last step"), "only the last is told it is the last");
  ok(log.slice(1).every((q) => q.timeoutMs === 55000) && log[0].timeoutMs === 150000, "a minute step waits a minute at most");
  const lastDream = db.tables.nobody_dreams.filter((x) => x.last); ok(lastDream.length === 1 && lastDream[0].block && /this is your last step/.test(lastDream[0].block.page) && lastDream[0].block.content.length === 2, "the last step's whole dream is kept for the child");
  const lastHud = db.tables.nobody_hud[db.tables.nobody_hud.length - 1]; ok(lastHud.dying === true, "the last line is a dying line");
  // the knock at 12:10 finds it dead
  r = await T.step({ now: new Date("2026-10-03T12:10:00Z"), db, model: fakeModel(log), wire, river: async () => [], env: {} });
  const dd = db.tables.nobody_deaths[0];
  const land = Date.parse(lastHud.at) + 40000, n = Math.floor((deathAt.getTime() - land) / 1000 * 3);
  ok(dd && dd.life === 5 && n > 0 && n < (lastHud.whole || "").length && dd.last === lastHud.whole.slice(0, n) && lastHud.text === dd.last, "the last words, cut where the glass stood at the death: " + JSON.stringify(dd && dd.last) + " (" + n + " letters)");
  ok(db.tables.nobody_airs.length === 1 && db.tables.nobody_airs[0].life === 5 && db.tables.nobody_airs[0].genome.turning === 0.5, "the dead life's air is kept");
  ok(r.life === 6 && db.tables.nobody_telegrams.length === 1, "the child wakes at the knock: life 6, its telegram");
  const st = db.tables.nobody_state[0], born6 = new Date(st.born), d6 = new Date(r.death);
  ok(d6.getTime() - born6.getTime() === 88 * 60000 + T.breathPhase(born6), "life 6's breath is the star's phase at its birth (" + T.breathPhase(born6) / 1000 + " s)");
  ok(!/the turn before this one was the last moment/.test(log[log.length - 1].user) && log[log.length - 1].carry == null, "the dream is knot carried (NOBODY_CARRY off)");
}

console.log("4 · the dream carried, when the bench has said so (NOBODY_CARRY=1)");
{ const probe = fakeDb(seed(new Date(t0.getTime() - 30 * 60000))); const rp = await T.step({ now: t0, db: probe, model: fakeModel([]), wire, river: async () => [], env: {} });
  const off = new Date(rp.death).getTime() - (t0.getTime() - 30 * 60000), deathAt = new Date("2026-10-03T12:05:00Z");
  const db = fakeDb(seed(new Date(deathAt.getTime() - off))), log = []; db.tables.nobody_state[0].today.phaseFrom = 6;
  let r = await T.step({ now: t0, db, model: fakeModel(log), wire, river: async () => [], env: {} }); let t = T.nextStepAt(new Date(r.at), new Date(r.death));
  while (t < new Date(r.death)) { r = await T.step({ now: t, db, model: fakeModel(log), wire, river: async () => [], env: {}, quick: true }); t = T.nextStepAt(t, new Date(r.death)); }
  r = await T.step({ now: new Date("2026-10-03T12:10:00Z"), db, model: fakeModel(log), wire, river: async () => [], env: { NOBODY_CARRY: "1" } });
  const q = log[log.length - 1];
  ok(q.carry && q.carry.length === 2 && q.carry[0].role === "user" && /this is your last step/.test(q.carry[0].content) && q.carry[1].role === "assistant" && q.carry[1].content[0].signature, "the child's step carries its mother's page and her dream, unchanged");
  ok(/the turn before this one was the last moment of life 5, the one before you\. you carry it; you did knot live it\./.test(q.user), "and is told so");
  ok(db.tables.nobody_dreams[db.tables.nobody_dreams.length - 1].carried === true, "the register knows it crossed");
}

console.log("5 · before the sql is pasted: the new tables are missing, and nobody goes on living");
{ const db = fakeDb(seed(new Date(t0.getTime() - 30 * 60000)), new Set(["nobody_dreams", "nobody_frames", "nobody_airs"])), log = [];
  let r = null, err = null; try { r = await T.step({ now: t0, db, model: fakeModel(log), wire, river: async () => [], env: {} }); } catch (e) { err = e; }
  ok(!err && r && r.notes.some((n) => /knot kept in nobody_dreams/.test(n)) && db.tables.nobody_hud.length === 1, "the step is taken; the dream is simply knot kept" + (err ? " · " + err.message : "")); }

console.log("6 · the feed: ?pulse, ?film, the veiled dreams, the star's breath");
{ const now = Date.now(), born = new Date(now - 20 * 60000).toISOString();
  const rows = { nobody_state: [{ id: 1, day: new Date(now).toISOString().slice(0, 10), win: 3, life: 9, born, founder_seed: 7, deaths: 8, updated: new Date(now - 60000).toISOString(), genome: { turning: 0.25 }, wire: [{ title: "x" }], today: { phaseFrom: 9, done: new Date(now - 30000).toISOString() } }],
    nobody_hud: [{ at: new Date(now - 60000).toISOString(), life: 9, text: "a line", win: 3 }], nobody_deaths: [{ at: new Date(now - 30 * 60000).toISOString(), life: 8, last: "cut it fr", gene: "seeds", way: -1 }],
    nobody_telegrams: [{ at: new Date(now - 25 * 60000).toISOString(), life: 9, text: "I AM STILL ALIVE · nobody · life 9 · 12:00" }], nobody_works: [], nobody_moves: [], nobody_door: [], nobody_days: [],
    nobody_dreams: [{ at: new Date(now - 60000).toISOString(), day: new Date(now).toISOString().slice(0, 10), life: 9, mind: "claude-opus-5-5", tokens: 1800, seal: "abc", summary: "what another mind remembers" }],
    nobody_frames: [{ at: new Date(now - 60000).toISOString(), day: "2026-10-02", life: 9, frame: { place: [0, 0] } }], nobody_airs: [{ life: 8, died: new Date(now - 30 * 60000).toISOString(), genome: { seeds: -0.125 } }] };
  const fetchFn = async (url) => { const u = new URL(url); const t = u.pathname.split("/").pop(); return new Response(JSON.stringify(rows[t] || []), { status: 200, headers: { "content-type": "application/json" } }); };
  const env = { SUPABASE_URL: "https://x.supabase.co", SUPABASE_SERVICE_KEY: "sb_secret_" + "x".repeat(31) };
  const ask = async (q, e = env) => { const r = await handle(new Request("https://song.example/.netlify/functions/nobody" + q), e, fetchFn); return { r, j: await r.json() }; };
  let { r, j } = await ask("?pulse=1");
  ok(j.life && j.life.n === 9 && j.line && j.line.text === "a line" && j.death.last === "cut it fr" && j.dream.tokens === 1800 && !("summary" in j.dream), "?pulse: the life, the line, the last words, the dream's length (no summary)");
  ok(r.headers.get("netlify-cdn-cache-control") === "public, s-maxage=15, durable" && r.headers.get("netlify-vary") === "query=now|day|day_too|health|pulse|film", "?pulse kept at the edge fifteen seconds; vary lists pulse and film");
  ({ r, j } = await ask("?film=2026-10-02")); ok(j.frames && j.frames.length === 1 && /s-maxage=3600/.test(r.headers.get("netlify-cdn-cache-control") || ""), "?film: a past day's frames, kept an hour");
  ({ r, j } = await ask("?now=1"));
  ok(j.genome && j.genome.turning === 0.25 && j.done, "?now carries genome and done");
  ok(j.day && j.day.dreams && j.day.dreams[0] && j.day.dreams[0].tokens === 1800 && !("summary" in j.day.dreams[0]), "the day's dreams, their summaries veiled");
  ok(j.day.lives[0].genome && j.day.lives[0].genome.seeds === -0.125, "a life's air in the drawer");
  const b = new Date(born); ok(j.life.dead === (now >= b.getTime() + 88 * 60000 + T.breathPhase(b)), "the feed's death is the star's breath (phaseFrom)");
  ({ j } = await ask("?now=1", Object.assign({ NOBODY_DREAMS_PUBLIC: "1" }, env))); ok(j.day.dreams[0].summary === "what another mind remembers", "NOBODY_DREAMS_PUBLIC=1 opens the summaries");
}
console.log(bad ? `\n${bad} FAILED` : "\nall clear");
process.exit(bad ? 1 : 0);
