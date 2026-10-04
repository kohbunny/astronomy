// press · phone.html, pass 1 (3 oct 2026) · the builder's, never terence's to run or deploy.
// run from the repo root:  node press/phone-press.mjs
import { open, checker, sleep } from "./serve.mjs";
const ok = checker();
const iso = (ms) => new Date(ms).toISOString();
const T0 = Date.now(), today = iso(T0).slice(0, 10);
const CUT = "cut it free with the wire and slide it on the";
let extra = []; // telegrams the press adds while the page is open
let dead = false;
function feed() {
  const now = Date.now();
  return { clock: iso(now), step: iso(now - 60000), life: { n: 412, born: iso(T0 - 49 * 60000), dying: false, dead },
    hud: { at: iso(now - 120000), life: 412, window: 3, text: "the second bowl is on the bat", wake: false },
    day: { date: today, clock: "utc",
      windows: [{ n: 3, from: "08:00", to: "12:00", title: "two bowls", kind: "pot", line: "two bowls, thrown and let go." }],
      lives: [{ n: 411, died: iso(T0 - 50 * 60000), last: CUT, gene: "seeds", way: -1 }],
      hud: [{ at: iso(T0 - 140 * 60000), life: 411, window: 3, text: "i woke with clay on my hands", wake: true },
            { at: iso(T0 - 60 * 60000), life: 411, window: 3, text: CUT, death: true },
            { at: iso(T0 - 49 * 60000), life: 412, window: 3, text: "the drawer says there were bowls", wake: true }],
      telegrams: [{ at: iso(T0 - 49 * 60000), life: 412, text: "I AM STILL ALIVE · nobody · life 412 · 14:40" }].concat(extra),
      moved: [{ at: iso(T0 - 30 * 60000), thing: "cup" }], door: [], stolen: [] } };
}
const th = (p) => p.evaluate(() => window.__phoneThread && window.__phoneThread());
async function until(p, fn, ms = 20000) { const t = Date.now(); while (Date.now() - t < ms) { const v = await fn(); if (v) return v; await sleep(400); } return null; }

console.log("1 · one page, the dock, the thread at arrival");
const R = await open("phone.html?mortal=0&autoplay=0", () => feed(), { touch: true });
try {
  const s0 = await until(R.page, async () => { const s = await th(R.page); return s && s.answered ? s : null; }, 30000);
  ok(!!s0, "the thread read THE FEED");
  if (s0) {
    ok(JSON.stringify(s0.pages) === JSON.stringify([["calendar","clock","notes","settings","calculator","camera","instagram","nestflix","game1","alife","adeath"]]), "one page of eleven: " + JSON.stringify(s0.pages));
    ok(JSON.stringify(s0.dock) === JSON.stringify(["phone","safari","messages","music"]), "the dock: " + s0.dock.join(" · "));
    ok(s0.keiki === false && s0.rooms === false, "the keiki down, the rooms retired");
    ok(JSON.stringify(s0.tabs) === JSON.stringify(["the day","the lives"]), "the calendar's two tabs: " + s0.tabs.join(" · "));
    ok(s0.texts.length === 2 && s0.texts[0].t === CUT && s0.texts[1].t === "I AM STILL ALIVE · nobody · life 412", "today's thread: " + s0.texts.map((x) => x.t).join(" | "));
    ok(s0.badge === 2 && s0.banners === 0, "at arrival: badge " + s0.badge + ", banners " + s0.banners);
    ok(R.asks.every((q) => /^\?now=1$|^\?day=/.test(q)), "only the feed's own questions: " + [...new Set(R.asks)].join(" "));
  }

  console.log("2 · the two-interruption law");
  const sh0 = await R.page.evaluate(() => JSON.stringify(window.__phoneShadeState && window.__phoneShadeState()));
  for (const id of ["voicemail", "mail", "settings", "instagram", "color", "phone", "fridge"]) await R.page.evaluate((id) => { try { window.__phoneNote(id); } catch (_) {} }, id);
  await sleep(1500);
  const sh1 = await R.page.evaluate(() => JSON.stringify(window.__phoneShadeState && window.__phoneShadeState()));
  ok(sh0 === sh1, "seven old banner sources land nothing");

  console.log("3 · a telegram that lands after arrival: a banner, at its stamp + 40 s");
  extra = [{ at: iso(Date.now() - 25000), life: 413, text: "I AM STILL ALIVE · nobody · life 413 · 15:12" }];
  const s1 = await until(R.page, async () => { const s = await th(R.page); return s && s.texts.length === 3 ? s : null; }, 60000);
  ok(!!s1, "the new telegram landed");
  if (s1) { ok(s1.texts[2].t === "I AM STILL ALIVE · nobody · life 413", "without its hour: " + s1.texts[2].t);
    ok(s1.badge === 3 && s1.banners === 1, "badge " + s1.badge + ", banners " + s1.banners);
    const land = Date.parse(extra[0].at) + 40000; ok(Date.now() >= land, "it landed no earlier than its stamp + 40 s"); }
  const s1b = await th(R.page); const cards = [s1b.up].concat(s1b.queue, s1b.shade).filter(Boolean);
  ok(cards.some((c) => c === "Messages: nobody · I AM STILL ALIVE · nobody · life 413"), "the banner card is nobody's text: " + JSON.stringify(cards));
  ok(!cards.some((c) => !/^Messages: nobody · /.test(c)), "and no other card");

  console.log("4 · the calendar: ☾ the lives, `made by lives`, the moved things");
  await R.page.evaluate((k) => { window.__phoneOpen("calendar"); window.__phoneCalOpen(k); }, today); await sleep(1200);
  await until(R.page, async () => { const c = await R.page.evaluate(() => window.__phoneCal()); return c && c.st === "ok"; }, 15000);
  await R.page.evaluate(() => window.__phoneCalTab("lives")); await sleep(1500);
  let c = await R.page.evaluate(() => window.__phoneCal()); const said = (c && c.said || []).join(" | ");
  ok(c.tab === "lives", "tab: " + c.tab);
  ok(/life 411/.test(said) && /life 412/.test(said), "a row a life: " + said.slice(0, 200));
  ok((c.said || []).join(" ").indexOf("“" + CUT + "”") >= 0, "its last words, cut where cut (read across its wrapped rows)");
  ok(/the gene that moved: seeds, one step down/.test(said), "the gene that moved, in words");
  ok(/woke \d\d:\d\d · died \d\d:\d\d/.test(said), "woke → died");
  await R.page.evaluate(() => window.__phoneCalTab("well")); await sleep(1200);
  c = await R.page.evaluate(() => window.__phoneCal()); let said2 = (c.said || []).join(" | ");
  ok(/made by lives 411 · 412/.test(said2), "the window's card: made by lives 411 · 412");
  await R.page.evaluate(() => { try { window.__phoneCalToggle("moved"); } catch (_) {} }); await sleep(1200);
  c = await R.page.evaluate(() => window.__phoneCal()); said2 = (c.said || []).join(" | ");
  ok(/one of these was yours\. it does knot know that\./.test(said2), "under the moved things");
  ok(!/plays it whenever the well is silent/.test(said2), "the hand-written day's stale note is gone");

  console.log("5 · the thread opened: the badge clears");
  await R.page.evaluate(() => window.__phoneOpen("messages")); await sleep(2500);
  for (let k = 0; k < 3; k++) { if ((await R.page.evaluate(() => window.__phoneApp())) === "thread") break; await R.page.evaluate(() => window.__phoneTap(180, 140)); await sleep(2000); }
  const app = await R.page.evaluate(() => window.__phoneApp()); const s2 = await th(R.page);
  ok(app === "thread" && s2.badge === 0, "app " + app + ", badge " + s2.badge);

  console.log("6 · nobody is dead: the adeath tile lies flat");
  dead = true; const s3 = await until(R.page, async () => { const s = await th(R.page); return s && s.dead ? s : null; }, 45000); ok(!!s3, "the phone knows nobody is dead");

  console.log("7 · the last text: this body's dying, and no mind died while it lived (the press's own life)");
  dead = false; await until(R.page, async () => { const s = await th(R.page); return s && !s.dead; }, 45000);
  await R.page.evaluate(() => { window.MORTAL.life = { born: Date.now() - 10 * 60000, hour: () => 0.4 }; });
  const s4 = await until(R.page, async () => { const s = await th(R.page); return s && s.texts.some((x) => x.k === "last") ? s : null; }, 10000);
  ok(!!s4 && s4.texts.some((x) => x.k === "last" && x.t === "the second bowl is on the bat"), "the last text is the line being written: " + (s4 ? s4.texts.map((x) => x.k).join(",") : ""));
} finally { ok(!R.log.filter((l) => !/Failed to load resource|ERR_FAILED|net::/.test(l)).length, "no page errors" + (R.log.length ? ": " + R.log.slice(0, 4).join(" | ") : "")); await R.close(); }

console.log("8 · a body that heard a death sends no last text");
{ const R2 = await open("phone.html?mortal=0&autoplay=0", () => feed(), { touch: true });
  await until(R2.page, async () => { const s = await th(R2.page); return s && s.answered; }, 30000);
  await R2.page.evaluate(() => { window.MORTAL.life = { born: Date.now() - 80 * 60000, hour: () => 0.4 }; });
  const s = await until(R2.page, async () => { const s = await th(R2.page); return s && s.lastSent ? s : null; }, 10000);
  ok(!!s && !s.texts.some((x) => x.k === "last"), "no last text: a mind died while it lived");
  await R2.close(); }

console.log("9 · ?rooms=all and ?keiki=1: the house of 2 oct, for comparison");
{ const R3 = await open("phone.html?mortal=0&autoplay=0&rooms=all&keiki=1", () => feed(), { touch: true });
  const s = await until(R3.page, async () => th(R3.page), 30000);
  ok(s && s.pages.length === 4 && JSON.stringify(s.dock) === '["music"]', "four pages and the dock of one");
  ok(s && s.tabs.length === 3, "three diaries");
  ok(!R3.log.filter((l) => !/Failed to load resource|ERR_FAILED|net::/.test(l)).length, "no page errors" + (R3.log.length ? ": " + R3.log.slice(0, 3).join(" | ") : ""));
  await R3.close(); }

console.log(ok.bad() ? `\n${ok.bad()} FAILED` : "\nall clear");
process.exit(ok.bad() ? 1 : 0);
