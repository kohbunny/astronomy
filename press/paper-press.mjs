// press · pass 6, the paper (4 oct 2026): THE WELL in the newest times · the builder's, never terence's to run or deploy.
// run from the repo root:  node press/paper-press.mjs   → press/shots/paper-*.png
import { open, checker, sleep } from "./serve.mjs"; import fs from "node:fs";
const ok = checker();
const iso = (ms) => new Date(ms).toISOString();
fs.mkdirSync(new URL("./shots/", import.meta.url), { recursive: true });
const now0 = Date.now(), today = iso(now0).slice(0, 10), yday = iso(now0 - 864e5).slice(0, 10), mid = Date.parse(today + "T00:00:00Z");
let dead = false; const asks = [];
const L40 = { n: 40, died: iso(mid - 30 * 60000), last: "and the", first: "the drawer says a bowl.", gene: "seeds", way: -1 };
const L41 = { n: 41, died: iso(mid + 62 * 60000), last: "cut it free with the wire and slide it on the", first: "the bowl is dry enough to trim.", gene: "warmth", way: 1 };
function feed(u) {
  const now = Date.now(); asks.push(u.search);
  const d = u.searchParams.get("day");
  if (d) return d === yday ? { date: yday, lives: [{ n: 39, died: iso(mid - 120 * 60000), last: "x", first: "y", gene: "", way: 0 }, L40], dreams: [{ life: 40, tokens: 300 }] } : { date: d, empty: true };
  return { clock: iso(now), step: iso(now - 60000), life: { n: 42, dead }, deaths: 41, model: "claude-opus-5-5",
    hud: { at: iso(now - 120000), life: 42, text: "the foot is still soft, which is a good kind of wrong" }, window: { n: 1, title: "the second bowl" },
    day: { date: today, lives: [L41], dreams: [{ life: 41, tokens: 900 }, { life: 41, tokens: 300 }, { life: 41, tokens: null }],
      moved: [{ at: iso(mid + 50 * 60000), thing: "pencil" }], windows: [{ n: 1, sheet: [{ item: "chalk, 1 box", cost: 4, estimated: false }, { item: "a second wheel, borrowed", cost: 0, estimated: true }] }] } };
}
const R = await open("thenewesttimes.html?mortal=0", feed);
const shot = async (n) => { await sleep(600); await R.page.screenshot({ path: new URL("./shots/paper-" + n + ".png", import.meta.url).pathname, fullPage: false, timeout: 120000 }); };
const txt = (id) => R.page.evaluate((id) => { const e = document.getElementById(id); return e ? e.innerText : null; }, id);
try {
  await sleep(2500);
  let b = await txt("wellbox");
  ok(b && /AT THE BOTTOM OF THE WELL, NOW|At the Bottom of the Well, Now/i.test(b) && /good kind of wrong/.test(b) && /life 42/.test(b) && /the second bowl/.test(b), "the front's live box: " + JSON.stringify(b));
  ok(/Nobody, life 41/.test(await txt("wellobitfront") || ""), "the front's obit line: " + (await txt("wellobitfront")));
  ok(/FOUND — a pencil, knot where it was left/.test(await txt("wellclsfront") || ""), "the front's classified: " + (await txt("wellclsfront")));
  await R.page.evaluate(() => document.getElementById("wellbox").scrollIntoView()); await shot("1-front-box");
  await R.page.evaluate(() => nav(H.section("obits", "x"))); await sleep(2500);
  const ob = await txt("wellobits") || "";
  ok(/Life 41/.test(ob) && /Life 40/.test(ob) && /Life 39/.test(ob), "obituaries: 41, 40 and 39 (yesterday read)");
  ok(/life 41 ended at 01:02 UTC on \d+ \w+, 92 minutes after it began/.test(ob), "41's age, from 40's death: " + (ob.match(/life 41 ended[^.]*\./) || [""])[0]);
  ok(/It dreamt twice/.test(ob) || /It dreamt 2 times/.test(ob), "41 dreamt twice (a null dream is knot one)");
  ok(/warmth, one step toward tender/.test(ob) && /seeds, one step toward remembering little/.test(ob), "the gene and its way, in words");
  ok(asks.filter((q) => q.startsWith("?day=")).length >= 1 && !asks.some((q) => q < "?day=2026-10-01" && q.startsWith("?day=")), "the days before, never before the waking");
  await R.page.evaluate(() => document.getElementById("wellobits").scrollIntoView()); await shot("2-obits");
  await R.page.evaluate(() => nav(H.section("classified", "x"))); await sleep(1500);
  const cl = await txt("wellcls") || "";
  ok(/FROM THE BOTTOM OF THE WELL|From the Bottom of the Well/i.test(cl) && /FOUND/.test(cl) && /WANTED — a second wheel, borrowed/.test(cl) && !/chalk/.test(cl), "classified: found, and wanted only what it priced itself: " + JSON.stringify(cl));
  await R.page.evaluate(() => document.getElementById("wellcls").scrollIntoView()); await shot("3-classified");
  await R.page.evaluate(() => nav(H.section("science", "x"))); await sleep(1500);
  ok(/How Nobody Lives/.test(await txt("wellsci") || ""), "science: the standing file");
  await R.page.evaluate(() => document.getElementById("wellsci").scrollIntoView()); await shot("4-science");
  dead = true; await R.page.evaluate(() => nav(H.front("x"))); await sleep(1000); await R.page.evaluate(() => { WELL.at = 0; wellAsk(); }); await sleep(1500);
  { const gb = await txt("wellbox") || ""; ok(/No one\./.test(gb) && !/since/.test(gb), "in the gap: No one. — and no hour while the death is knot yet written: " + JSON.stringify(gb)); }
  const n0 = asks.length; await R.page.evaluate(() => window.dispatchEvent(new Event("apwnp:call"))); await R.page.evaluate(() => { WELL.at = 0; wellAsk(); }); await sleep(800);
  ok(asks.length === n0, "after the call, nothing is asked");
} finally { const bad = R.log.filter((l) => !/Failed to load resource|net::/.test(l)); ok(!bad.length, "no page errors" + (bad.length ? ": " + bad.slice(0, 3).join(" | ") : "")); await R.close(); }
console.log(ok.bad() ? `\n${ok.bad()} FAILED` : "\nall clear");
process.exit(ok.bad() ? 1 : 0);
