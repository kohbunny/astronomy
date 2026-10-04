// press · pass 6, the math room (4 oct 2026): nobody's numbers · the builder's, never terence's to run or deploy.
// run from the repo root:  node press/math-press.mjs   → press/shots/math-1.png
import { open, checker, sleep } from "./serve.mjs"; import fs from "node:fs";
const ok = checker(); const iso = (ms) => new Date(ms).toISOString();
fs.mkdirSync(new URL("./shots/", import.meta.url), { recursive: true });
let dead = false, down = false; const asks = [];
const feed = (u) => { asks.push(u.search); if (down) return null; const now = Date.now();
  return { clock: iso(now), step: iso(now - 60000), life: { n: 42, dead }, deaths: 41, sheet: { ever: 203.55 },
    day: { date: iso(now).slice(0, 10), lives: [{ n: 40 }, { n: 41 }], total: 41.17, total_ever: 203.55,
      dreams: [{ life: 41, tokens: 2400, took: 31000 }, { life: 41, tokens: 600, took: 24000 }, { life: 42, tokens: null, took: 12000 }, { life: 42, tokens: 444, took: 900000 }] } }; };
const R = await open("math.html?mortal=0", feed);
try {
  await sleep(2500);
  let w = await R.page.evaluate(() => window.__mathWell());
  ok(w.shown, "the block shows once the well answers");
  ok(JSON.stringify(w.lines) === JSON.stringify(["and at the bottom of the well, on its own day:", "life 42", "2 died", "it truly thought for 16 minutes", "it dreamt 2,580 words", "the sheet: $41.17 today · $203.55 ever", "the sun: $0.00", "it lives eighty-eight minutes and a breath. 88 is two eights, and an eight is two circles, touching."]), "the lines: " + JSON.stringify(w.lines));
  await R.page.evaluate(() => document.getElementById("well").scrollIntoView({ block: "center" })); await sleep(500);
  await R.page.screenshot({ path: new URL("./shots/math-1.png", import.meta.url).pathname, timeout: 120000 });
  dead = true; await R.page.evaluate(() => document.dispatchEvent(new Event("visibilitychange"))); await sleep(1200);
  w = await R.page.evaluate(() => window.__mathWell()); ok(w.lines[1] === "no one", "in the gap: no one");
  const n0 = asks.length; await R.page.evaluate(() => { window.dispatchEvent(new Event("apwnp:call")); document.dispatchEvent(new Event("visibilitychange")); }); await sleep(800);
  ok(asks.length === n0, "after the call, nothing is asked");
} finally { const bad = R.log.filter((l) => !/Failed to load resource|net::/.test(l)); ok(!bad.length, "no page errors" + (bad.length ? ": " + bad.slice(0, 3).join(" | ") : "")); await R.close(); }
down = true; const D = await open("math.html?mortal=0", feed);
try { await sleep(2000); ok(!(await D.page.evaluate(() => window.__mathWell())).shown, "the well silent: the block stays away"); } finally { await D.close(); }
console.log(ok.bad() ? `\n${ok.bad()} FAILED` : "\nall clear"); process.exit(ok.bad() ? 1 : 0);
