// press · pass 6, facet 1 (4 oct 2026): SETTINGS · NOTES · EGGSTAGRAM · the builder's, never terence's to run or deploy.
// run from the repo root:  node press/facet1-press.mjs   → press/shots/f1-*.png
import { open, checker, sleep } from "./serve.mjs"; import fs from "node:fs";
const ok = checker();
const iso = (ms) => new Date(ms).toISOString();
fs.mkdirSync(new URL("./shots/", import.meta.url), { recursive: true });
const G0 = { pace: 0, balance: 0, seeds: 0, turning: 0, longevity: 0, patience: 0, temper: 0, warmth: 0, restless: 0 };
const now0 = Date.now(), today = iso(now0).slice(0, 10), yday = iso(now0 - 864e5).slice(0, 10);
const midnight = Date.parse(today + "T00:00:00Z");
// life 40 began yesterday and died just after midnight; 41 died today; 42 is alive
const L40 = { n: 40, died: iso(midnight + 5 * 60000), last: "the second bowl is on the bat and the wire", gene: "seeds", way: -1, first: "the drawer says a bowl.", genome: { ...G0, seeds: -0.125 } };
const L41 = { n: 41, died: iso(midnight + 97 * 60000), last: "cut it free with the wire and slide it on the", gene: "warmth", way: 1,
  first: "the bowl is dry enough to trim. i turn it over and the foot is still soft, which is a good kind of wrong, because it means there is still time to make it right before the fire.", genome: { ...G0, seeds: -0.125, warmth: 0.125, turning: 0.5, restless: -0.375 } };
const dreamsY = [{ at: iso(midnight - 40 * 60000), life: 40, mind: "claude-sonnet-5-5", tokens: 900, seal: "aa" }, { at: iso(midnight - 30 * 60000), life: 40, mind: "claude-sonnet-5-5", tokens: 300, seal: "ab" }];
const dreamsT = [{ at: iso(midnight + 1 * 60000), life: 40, mind: "claude-sonnet-5-5", tokens: 1200, seal: "ac" },
  { at: iso(midnight + 20 * 60000), life: 41, mind: "claude-sonnet-5-5", tokens: 2400, seal: "b1" }, { at: iso(midnight + 30 * 60000), life: 41, mind: "claude-opus-5-5", tokens: 600, seal: "b2" },
  { at: iso(midnight + 40 * 60000), life: 41, mind: "claude-opus-5-5", tokens: null, seal: "b3" }, { at: iso(midnight + 100 * 60000), life: 42, mind: "claude-opus-5-5", tokens: 444, seal: "c1", carried: true }];   // 42's first step carried 41's last moment
let asksDay = 0;
function feed(u) {
  const now = Date.now();
  const d = u.searchParams.get("day");
  if (d) { asksDay++; return d === yday ? { date: yday, lives: [{ n: 39, died: iso(midnight - 90 * 60000), last: "and", first: "x", genome: G0 }], dreams: dreamsY, telegrams: [] } : { date: d, empty: true }; }
  if (u.searchParams.get("pulse") != null) return { clock: iso(now), life: { n: 42, dying: false, dead: false } };
  if (u.searchParams.get("airs") != null) return { clock: iso(now), airs: [] };
  return { clock: iso(now), step: iso(now - 60000), model: "claude-opus-5-5", deaths: 41, genome: { ...L41.genome, patience: 0.125 },
    life: { n: 42, born: L41.died, dying: false, dead: false }, hud: { at: iso(now - 60000), life: 42, window: 1, text: "a line" },
    day: { date: today, lives: [L40, L41], telegrams: [], dreams: dreamsT } };
}
async function until(p, fn, ms = 20000) { const t = Date.now(); while (Date.now() - t < ms) { const v = await fn(); if (v) return v; await sleep(300); } return null; }
const well = (p) => p.evaluate(() => window.__phoneWell());
const R = await open("phone.html?mortal=0&autoplay=0", feed, { touch: true });
const shot = async (n) => { await sleep(900); await R.page.screenshot({ path: new URL("./shots/f1-" + n + ".png", import.meta.url).pathname, timeout: 120000 }); };
try {
  const w0 = await until(R.page, async () => { const w = await well(R.page); return w && w.yday ? w : null; }, 30000);
  ok(!!w0, "the thread's answer is kept, and yesterday's drawer asked: " + (w0 && w0.yday));
  await R.page.mouse.click(195, 420); await sleep(1200);
  let w = await well(R.page);
  ok(asksDay === 1, "yesterday asked once: " + asksDay);
  // turning 0.5 → 8+4=C; balance 8; seeds -1/8 → 7; longevity 8; patience +1/8 → 9; temper 8; warmth 9; restless -3/8 → 5
  ok(w.serial === "C878 9895", "C878 9895 exactly: " + w.serial);
  ok(w.mind === "opus 5.5", "the mind now: " + w.mind);
  ok(w.post && w.post.n === 41 && w.post.born === Date.parse(L40.died) && w.post.last === L41.last, "eggstagram's post: life 41, born at 40's death: " + JSON.stringify(w.post && { n: w.post.n, born: w.post.born }));
  ok(JSON.stringify(w.notes) === JSON.stringify([{ n: 42, dreams: 1, words: 330, opened: false }, { n: 41, dreams: 2, words: 2250, opened: true }, { n: 40, dreams: 3, words: 1800, opened: false }]), "notes: 42 · 41 · 40 (40 whole across midnight; a null dream is knot one; 41 opened by 42): " + JSON.stringify(w.notes));
  // settings
  await R.page.evaluate(() => window.__phoneOpen("settings")); await shot("1-settings");
  await R.page.evaluate(() => window.__phoneOpen("stabout")); await shot("2-about");
  await R.page.evaluate(() => window.__phoneOpen("stupdate")); await shot("3-update");
  await R.page.evaluate(() => window.__phoneOpen("stnobody")); await shot("4-pane-nobody");
  ok((await well(R.page)).app === "stnobody", "the pane opens");
  // notes
  await R.page.evaluate(() => window.__phoneOpen("notes")); await shot("5-notes");
  await R.page.evaluate(() => window.__phoneTap(180, 112 + 64 + 20)); await sleep(500);
  ok((await well(R.page)).app === "nbnote", "a tap opens life 41's locked note"); await shot("6-note");
  // eggstagram
  await R.page.evaluate(() => { window.__airs = []; window.__hush = 0; const R = window.RIVER; if (R) { const a = R.airPlay, h = R.airHush; R.airPlay = function (g) { window.__airs.push(JSON.stringify(g)); return a.apply(this, arguments) || { secs: 8 }; }; R.airHush = function () { window.__hush++; return h && h.apply(this, arguments); }; } });
  await R.page.evaluate(() => window.__phoneOpen("instagram"));
  // headless chromium draws about two frames a second here, and the room's leaving door hushes a post undrawn for 0.6 s; a phone draws sixty
  let airs = await until(R.page, async () => { const a = await R.page.evaluate(() => window.__airs); return a.length ? a : null; }, 30000) || [];
  await shot("7-eggstagram");
  ok(airs.length >= 1 && airs[0] === JSON.stringify(L41.genome), "settled on nobody's post, life 41's air plays: " + airs.length);
  await R.page.evaluate(() => window.__phoneTap(100, 104 + 8 + 21)); await sleep(800);
  ok((await well(R.page)).app === "egnobody", "its name opens its profile"); await shot("8-egnobody");
  const hush = await R.page.evaluate(() => window.__hush); ok(hush >= 1, "leaving the post hushes the air: " + hush);
  await R.page.evaluate(() => window.__phoneOpen("alife")); await sleep(300);
  // the old pad, behind its flag
} finally {
  const bad = R.log.filter((l) => !/Failed to load resource|net::/.test(l));
  ok(!bad.length, "no page errors" + (bad.length ? ": " + bad.slice(0, 3).join(" | ") : "")); await R.close();
}
const K = await open("phone.html?mortal=0&autoplay=0&keiki=1", feed, { touch: true });
try { await sleep(2500); await K.page.mouse.click(195, 420); await sleep(800); await K.page.evaluate(() => window.__phoneOpen("notes")); await sleep(800);
  await K.page.screenshot({ path: new URL("./shots/f1-9-notes-keiki.png", import.meta.url).pathname, timeout: 120000 });
  const bad = K.log.filter((l) => !/Failed to load resource|net::/.test(l)); ok(!bad.length, "?keiki=1: the old pad, no page errors" + (bad.length ? ": " + bad[0] : ""));
} finally { await K.close(); }
console.log(ok.bad() ? `\n${ok.bad()} FAILED` : "\nall clear");
process.exit(ok.bad() ? 1 : 0);
