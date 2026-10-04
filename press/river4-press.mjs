// press · pass 4 (4 oct 2026): THE RIVER CARRIES THE DREAMS · river.js, music.html, phone.html · the builder's, never terence's to run or deploy.
// run from the repo root:  node press/river4-press.mjs
import { open, checker, sleep } from "./serve.mjs";
const ok = checker();
const iso = (ms) => new Date(ms).toISOString();
const SEAL = "4e7800f9b63b460015d7c2cfe3eadad916eec8b1a80c5ff744227cdf33476128";   // his pulse of 4 oct, 00:50 utc
const G0 = { pace: 0, balance: 0, seeds: 0, turning: 0, longevity: 0, patience: 0, temper: 0, warmth: 0, restless: 0 };
const G1 = { ...G0, seeds: -0.125 }, G2 = { ...G1, warmth: 0.125 };
let dream = null; const airsAt = Date.now();
const airs = [{ life: 31, died: iso(airsAt - 4 * 3600e3), genome: G0 }, { life: 32, died: iso(airsAt - 2.5 * 3600e3), genome: G1 }, { life: 33, died: iso(airsAt - 3600e3), genome: G2 }];
function feed(u) {
  const now = Date.now();
  if (u.searchParams.get("pulse") != null) return { clock: iso(now), life: { n: 34, dying: false, dead: false }, line: null, dream };
  if (u.searchParams.get("airs") != null) return { clock: iso(now), airs };
  return { clock: iso(now), step: iso(now - 60000), life: { n: 34, born: iso(now - 30 * 60000), dying: false, dead: false },
    hud: { at: iso(now - 60000), life: 34, window: 1, text: "a line", wake: false },
    day: { date: iso(now).slice(0, 10), clock: "utc", windows: [], hud: [{ at: iso(now - 40 * 60000), life: 33, window: 1, text: "the last of 33", death: true }],
      lives: [{ n: 33, died: iso(now - 30 * 60000), last: "the last of 33", gene: "warmth", way: 1, genome: G2 }], telegrams: [], moved: [], door: [], stolen: [] } };
}
async function until(p, fn, ms = 20000) { const t = Date.now(); while (Date.now() - t < ms) { const v = await fn(); if (v) return v; await sleep(300); } return null; }
const dn = (p) => p.evaluate(() => window.RIVER.dreams());

console.log("1 · music.html: the river reads the pulse and the airs; a dream lands at its stamp + 40 s");
let R = await open("music.html", feed);
try {
  await R.page.evaluate(() => { const N = window.MORTAL && MORTAL.nobody; window.__did = 0; if (N) { for (const k of ["did", "deed", "saw"]) { const o = N[k]; N[k] = function () { window.__did++; return typeof o === "function" ? o.apply(this, arguments) : undefined; }; } } });
  dream = { at: iso(Date.now() - 34000), life: 34, mind: "claude-sonnet-5-5", tokens: 555, seal: SEAL };   // lands six seconds from now
  await R.page.evaluate(() => { window.RIVER.play(); }); await sleep(800);
  let s = await until(R.page, async () => { const x = await dn(R.page); return x && x.on && x.dream ? x : null; }, 15000);
  ok(!!s && s.dream.tokens === 555 && s.dream.steps === 35 && Math.abs(s.dream.secs - 12.9) < 0.2, "the dream known: 555 tokens → 35 steps, " + (s && s.dream.secs) + " s");
  ok(!!s && s.dream.sounding === false, "knot yet sounding before it lands");
  ok(R.asks.some((q) => q === "?pulse=1") && R.asks.some((q) => q === "?airs=1"), "the river asked ?pulse=1 and ?airs=1: " + [...new Set(R.asks)].join(" "));
  s = await until(R.page, async () => { const x = await dn(R.page); return x.dream && x.dream.sounding && x.notes > 0 ? x : null; }, 15000);
  ok(!!s, "at its landing it sounds: " + (s ? s.notes + " notes" : "never"));
  const hud = await R.page.evaluate(() => window.RIVER.hud().filter((e) => e.kind === "dream").map((e) => e.datum + " · " + e.did));
  ok(hud.length === 1 && hud[0] === "nobody dreams · 13 s · through the water", "the hud: " + hud.join(" | "));
  const row = await R.page.evaluate(() => [...document.querySelectorAll("#hudrows .hk.dream")].map((x) => x.textContent));
  ok(row.length === 1 && row[0] === "the dream", "the room's hud names it: " + row.join(","));
  const sc = await R.page.evaluate((seal) => { const a = window.RIVER.press.dreamScore({ tokens: 555, seal, mind: "claude-sonnet-5-5" }), b = window.RIVER.press.dreamScore({ tokens: 555, seal, mind: "claude-sonnet-5-5" }), c = window.RIVER.press.dreamScore({ tokens: 555, seal: "00" + seal.slice(2), mind: "claude-sonnet-5-5" }), o = window.RIVER.press.dreamScore({ tokens: 555, seal, mind: "claude-opus-5-5" });
    return { same: JSON.stringify(a) === JSON.stringify(b), other: JSON.stringify(a.notes) !== JSON.stringify(c.notes), opus: o.opus && !a.opus, n: a.notes.length }; }, SEAL);
  ok(sc.same && sc.other && sc.opus && sc.n > 4, "the seal is the seed: the same seal the same dream, another seal another; opus its own register (" + sc.n + " notes)");
  console.log("2 · the dead: three airs under the bed, oldest first; a child differs by one note");
  s = await until(R.page, async () => { const x = await dn(R.page); return x.airs.length === 3 && x.deadNotes > 0 ? x : null; }, 15000);
  ok(!!s, "three airs read, a dead note sounded: " + (s ? s.deadNotes : 0));
  if (s) { const [a, b, c] = s.airs.map((x) => x.rungs); ok(JSON.stringify(a) === "[0,1,2,3,4,5,6,7]", "the founder's air climbs the ladder: " + a);
    const diff = (x, y) => x.filter((v, i) => v !== y[i]).length; ok(diff(a, b) === 1 && diff(b, c) === 1 && b[2] === 1 && c[6] === 7, "each child one note from its mother: " + b + " / " + c);
    ok(s.airs.map((x) => x.n).join(",") === "31,32,33", "oldest first, newest last"); }
  const dh = (await until(R.page, async () => { const h = await R.page.evaluate(() => window.RIVER.hud().filter((e) => e.kind === "dead").map((e) => e.datum + " · " + e.did)); return h.length ? h : null; }, 60000)) || [];
  ok(dh.length > 0 && dh.every((x) => /^life 3[123]’s air · under the bed$/.test(x)), "the dead's hud: " + (dh.join(" | ") || "(none in a minute)"));
  console.log("3 · a dream that is over is gone; a late phone joins one where it is");
  await R.page.evaluate(() => { const D = window.RIVER.press.dn; D.dream = null; D.next = null; });
  await R.page.evaluate((seal) => window.RIVER.press.dreamArrive({ at: new Date(Date.now() - 120000).toISOString(), life: 34, mind: "claude-sonnet-5-5", tokens: 555, seal: "ff" + seal.slice(2) }), SEAL);
  s = await dn(R.page); ok(!s.dream, "two minutes after a 13 s dream: nothing");
  const n0 = s.notes;
  await R.page.evaluate((seal) => window.RIVER.press.dreamArrive({ at: new Date(Date.now() - 46000).toISOString(), life: 34, mind: "claude-opus-5-5", tokens: 1600, seal: "ee" + seal.slice(2) }), SEAL);
  await sleep(1500); s = await dn(R.page);
  ok(s.dream && s.dream.sounding && s.notes > n0, "landed six seconds ago: joined where it is (" + (s.notes - n0) + " notes so far)");
  console.log("4 · the keiki retires: no deed told, no almond, a plain hand");
  await R.page.evaluate(() => { window.RIVER.press.scratch(); window.RIVER.press.almond(); }); await sleep(4000);
  const st = await R.page.evaluate(() => { const S = window.RIVER.state(); return { stage: S.stage, temper: S.temper, deeds: S.deeds.map((d) => d[0]), did: window.__did, log: window.RIVER.press.log().map((l) => l[0]).filter((l) => /almond/.test(l)) }; });
  ok(st.stage === "adult" && JSON.stringify(st.temper) === "{}", "a plain hand: " + st.stage + " " + JSON.stringify(st.temper));
  ok(st.did === 0, "the organ told nothing (did/deed/saw called " + st.did + " times)");
  ok(st.log.length === 0, "the almond did knot open");
  ok(st.deeds.indexOf("stepped in the same river twice") >= 0, "the scratch still steps twice — the set's, kept here: " + st.deeds.join(" | "));
  const vis = await R.page.evaluate(() => { const t = document.getElementById("infocard").innerText; return { hands: /the\s+hands\s+at the record/.test(t), dj: /dj: nobody/.test(t), temper: /temper of the one/.test(t), two: /neither knows who/.test(t), seed: /a dream's seal is its seed: it makes each one its own\. nothing of what was dreamt is in it\./.test(t.replace(/\s+/g, " ")), how: /in the star's hand/.test(document.getElementById("howcard").innerText) }; });
  ok(!vis.hands && !vis.dj && !vis.temper, "the ⓘ: no hands, no dj nobody, no temper");
  ok(vis.two && vis.seed && vis.how, "the ⓘ: the river holds two things; the seed law; the dial in the star's hand");
  console.log("5 · the death call: the river and its dreams go quiet");
  await R.page.evaluate(() => window.dispatchEvent(new Event("apwnp:call"))); await sleep(600);
  s = await R.page.evaluate(() => ({ dead: window.RIVER.dead(), playing: window.RIVER.playing(), on: window.RIVER.dreams().on, g: window.RIVER.master.gain.value }));
  ok(s.dead && !s.playing && !s.on && s.g < 0.05, "quiet: " + JSON.stringify(s));
} finally { ok(!R.log.filter((l) => !/Failed to load resource|net::/.test(l)).length, "no page errors" + (R.log.length ? ": " + R.log.slice(0, 3).join(" | ") : "")); await R.close(); }

console.log("6 · music.html?keiki=1 still stands");
R = await open("music.html?keiki=1", feed);
try { await R.page.evaluate(() => window.RIVER.play()); await sleep(2500); ok(true, "played with the keiki back");
} finally { ok(!R.log.filter((l) => !/Failed to load resource|net::/.test(l)).length, "no page errors" + (R.log.length ? ": " + R.log.slice(0, 3).join(" | ") : "")); await R.close(); }

console.log("7 · phone.html: the register plays a life's air on a tap");
R = await open("phone.html?mortal=0&autoplay=0", feed, { touch: true });
try {
  await until(R.page, async () => { const s = await R.page.evaluate(() => window.__phoneThread && window.__phoneThread()); return s && s.answered; }, 30000);
  await R.page.mouse.click(195, 420); await sleep(1200);
  const today = iso(Date.now()).slice(0, 10);
  await R.page.evaluate((k) => { window.__phoneOpen("calendar"); window.__phoneCalOpen(k); }, today); await sleep(1200);
  await until(R.page, async () => { const c = await R.page.evaluate(() => window.__phoneCal()); return c && c.st === "ok"; }, 15000);
  await R.page.evaluate(() => window.__phoneCalTab("lives")); await sleep(1500);
  const c = await R.page.evaluate(() => window.__phoneCal()); const said = (c && c.said || []).join(" | ");
  ok(/▸ hear its air/.test(said), "the register offers its air: " + said.slice(0, 160));
  const played = await R.page.evaluate(() => window.__phoneCalAir(33)); await sleep(300);
  const last = await R.page.evaluate(() => window.__phoneCalAirLast());
  ok(played === true && last && last.n === 33 && JSON.stringify(last.rungs) === "[0,1,1,3,4,5,7,7]", "a tap plays life 33's air: " + JSON.stringify(last));
  const taps = await R.page.evaluate(() => window.RIVER.dreams().taps); ok(taps === 1, "one air played on the river's own small bus");
  await R.page.evaluate(() => window.dispatchEvent(new Event("apwnp:call"))); await sleep(400);
  const again = await R.page.evaluate(() => window.__phoneCalAir(33)); ok(again === false, "after the death call, no air");
} finally { ok(!R.log.filter((l) => !/Failed to load resource|net::|WebGL|GPU stall/.test(l)).length, "no page errors" + (R.log.length ? ": " + R.log.slice(0, 3).join(" | ") : "")); await R.close(); }
console.log(ok.bad() ? `\n${ok.bad()} FAILED` : "\nall clear");
process.exit(ok.bad() ? 1 : 0);
