// press · pass 6, nestflix (4 oct 2026): nobody's screen · the builder's, never terence's to run or deploy.
// run from the repo root:  node press/nestflix-press.mjs   → press/shots/nfx-*.png
import { open, checker, sleep } from "./serve.mjs"; import fs from "node:fs";
const ok = checker(); const iso = (ms) => new Date(ms).toISOString();
fs.mkdirSync(new URL("./shots/", import.meta.url), { recursive: true });
const now0 = Date.now(), today = iso(now0).slice(0, 10), mid = Date.parse(today + "T00:00:00Z");
const G = { turning: 0.5, seeds: -0.125, warmth: 0.125 };
const asks = [];
function feed(u) {
  const now = Date.now(); asks.push(u.search);
  const film = u.searchParams.get("film");
  if (film) return { date: film, frames: [{ at: iso(now - 864e5), life: 30, frame: { work: { title: "the warm bed, chapter one" }, hud: { text: "the kettle is full. it is always full." } } },
    { at: iso(now - 864e5 + 600e3), life: 30, frame: { work: { title: "the warm bed, chapter one" }, hud: { text: "she put her hand on the kettle and it was warm." } } }] };
  if (u.searchParams.get("pulse") != null) return { life: { n: 42 }, wire: [{ title: "a storm crosses the coast at night" }, { title: "the fair opens in the wrong order" }] };
  if (u.searchParams.get("day")) return { date: u.searchParams.get("day"), empty: true };
  return { clock: iso(now), step: iso(now - 60000), life: { n: 42, dead: false }, deaths: 41, model: "claude-opus-5-5",
    hud: { at: iso(now - 90000), life: 42, text: "the foot is still soft, which is a good kind of wrong" }, window: { n: 1, title: "the second bowl" },
    day: { date: today, lives: [{ n: 41, died: iso(mid + 60e5), last: "cut it free", genome: G }, { n: 40, died: iso(mid + 1e6), last: "and", genome: { seeds: -0.125 } }],
      dreams: [{ at: iso(mid + 2e6), life: 41, mind: "claude-sonnet-5-5", tokens: 2400, seal: "4e7800f9b63b4600" }, { at: iso(mid + 3e6), life: 42, mind: "claude-opus-5-5", tokens: 555, seal: "a1b2c3d4e5f60718" }] } };
}
const R = await open("phone.html?mortal=0&autoplay=0", feed, { touch: true, init: "try{ sessionStorage.setItem('apwnp.here', JSON.stringify({ n: 2, t: Date.now() + 3600e3 })); }catch(_){}" });
const shot = async (n) => { await sleep(1200); await R.page.screenshot({ path: new URL("./shots/nfx-" + n + ".png", import.meta.url).pathname, timeout: 120000 }); };
try {
  for (let i = 0; i < 60; i++) { const w = await R.page.evaluate(() => window.__phoneWell && window.__phoneWell()); if (w && w.post) break; await sleep(500); }
  await R.page.mouse.click(195, 420); await sleep(800);
  await R.page.evaluate(() => { window.__dreams = []; const Rv = window.RIVER; if (Rv) { const a = Rv.dreamPlay; Rv.dreamPlay = function (d) { window.__dreams.push(d.seal); return (a && a.apply(this, arguments)) || { secs: 6 }; }; } });
  await R.page.evaluate(() => window.__phoneOpen("nestflix")); await sleep(3000);
  for (let i = 0; i < 6 && (await R.page.evaluate(() => window.__phoneApp())) !== "nfxwall"; i++) { await R.page.evaluate(() => window.__phoneTap(180 - 44, 340)); await sleep(1500); }
  ok(await R.page.evaluate(() => window.__phoneApp()) === "nfxwall", "the gate lets in to the wall");
  await shot("1-billboard");
  await R.page.evaluate(() => window.__phoneScrollTo("nfxwall", 420)); await shot("2-rows");
  await R.page.evaluate(() => window.__phoneScrollTo("nfxwall", 860)); await shot("3-rows-lower");
  await R.page.evaluate(() => window.__phoneScrollTo("nfxwall", 99999)); await shot("4-floor");
  const dr = await R.page.evaluate(() => window.__dreams);
  ok(dr.length >= 1 && dr.length <= 2 && new Set(dr).size === dr.length, "the dreams sound, each once: " + JSON.stringify(dr));
  ok(asks.some((q) => q === "?pulse=1"), "the wire is asked (?pulse=1)");
  ok(asks.some((q) => q.startsWith("?film=")), "a past day is asked when its window is drawn: " + asks.filter((q) => q.startsWith("?film=")).join(" "));
  const n0 = asks.length; await R.page.evaluate(() => window.dispatchEvent(new Event("apwnp:call"))); await R.page.evaluate(() => window.__phoneScrollTo("nfxwall", 0)); await sleep(2500);
  ok(!asks.slice(n0).some((q) => q.startsWith("?film=") || q === "?pulse=1"), "after the call, nestflix asks nothing: " + JSON.stringify(asks.slice(n0)));
} finally { const bad = R.log.filter((l) => !/Failed to load resource|net::/.test(l)); ok(!bad.length, "no page errors" + (bad.length ? ": " + bad.slice(0, 3).join(" | ") : "")); await R.close(); }
console.log(ok.bad() ? `\n${ok.bad()} FAILED` : "\nall clear"); process.exit(ok.bad() ? 1 : 0);
