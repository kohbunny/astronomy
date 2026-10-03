// press · adeath.html, pass 1 (3 oct 2026) · the builder's, never terence's to run or deploy.
// run from the repo root:  node press/adeath-press.mjs
import { open, checker, sleep } from "./serve.mjs";
const ok = checker();
const iso = (ms) => new Date(ms).toISOString();
const LINE = "the second bowl is on the bat, and the clay is wetter than the first one was, so i slow the wheel and let it find its own speed.";
function live(over = {}) {
  const now = Date.now();
  return Object.assign({ clock: iso(now), step: iso(now - 60000), window: { n: 3, from: "08:00", to: "12:00", title: "two bowls" }, clock_window: 3,
    windows: [], life: { n: 413, born: iso(now - 30 * 60000), dying: false, dead: false }, deaths: 412,
    hud: { at: iso(now - 5 * 60000), life: 413, window: 3, text: LINE, wake: false, dying: false, death: false },
    hands: "clay", movable: ["cup", "pencil", "paper"], place: [0.5, -1.5], set: [{ id: "wheel", kind: "wheel", at: [0.4, -1.2] }], work: null, fire: null, orchid: null,
    touch: [], fixtures: { lid: "open", lash: "tight" }, moved: [], model: "x", sheet: {} }, over);
}
const st = (p) => p.evaluate(() => window.ROOM && window.ROOM.state());
async function scene(name, feed, fn, wait = 4000) {
  console.log(name);
  const R = await open("adeath.html?quality=low&sound=0", feed);
  try { await sleep(wait); await fn(R); } finally { ok(!R.log.length, "no page errors" + (R.log.length ? ": " + R.log.slice(0, 3).join(" | ") : "")); await R.close(); }
}

await scene("1 · the window: one nobody", () => live(), async ({ page }) => {
  const s = await st(page); ok(s && /fourth cut/.test(s.build), "build: " + (s && s.build));
  const txt = await page.evaluate(() => [...document.querySelectorAll("#panes .pane")].map((p) => p.querySelector(".cap").textContent + " :: " + p.querySelector(".txt").textContent));
  ok(txt.length === 4, "four panes: " + txt.map((t) => t.split(" :: ")[0]).join(" · "));
  const dots = await page.evaluate(() => document.querySelectorAll("#dots i").length); ok(dots === 4, "four dots");
  const all = txt.join("\n");
  ok(!/mother/i.test(all), "no `mother` in the window");
  ok(!/keiki/i.test(all), "no `keiki` in the window");
  ok(!/if one flower leans|its spell|grows up inside the life|the one who lives here is awake/.test(all), "no lean, no spell, no stages, no tally");
  ok(all.includes("this phone is a body with no mind. at the bottom of the hole is a mind with no body. each lives eighty-eight minutes. they meet once, when this phone calls you."), "the door line, verbatim");
  ok(all.includes("nobody may put its hands on them"), "the four things say nobody");
  ok(/the phone before/.test(all), "the card's parent is `the phone before`");
  const nb = txt[0].split(" :: ")[1].split("the four things.")[0].replace(/\[new\]/g, " ").trim().split(/\s+/).length;
  ok(nb < 120, "pane 0's part about nobody: " + nb + " words");
  ok(s.doorway === null && s.nobody === false, "the keiki's doorway is down");
  await page.evaluate(() => window.ROOM.window(true)); await sleep(800);
  ok((await st(page)).figs >= 1, "the window's figures draw");
});

await scene("2 · a line written five minutes ago is whole at once (the radio law)", () => live(), async ({ page }) => {
  const s = await st(page); ok(s.mode === "live", "mode live"); ok(s.hud === LINE && s.hudShown === LINE.length, "whole: " + s.hudShown + "/" + LINE.length);
  ok(s.figure !== null, "its figure stands");
  const meta = await page.evaluate(() => document.getElementById("hudm").textContent); ok(/^life 413 · window 3 · \d\d:\d\d utc$/.test(meta), "meta: " + meta);
});

let t0 = 0;
await scene("3 · a line that lands 20 s after the fetch: the line before stands, then it types from its stamp", () => { if (!t0) t0 = Date.now(); return live({ hud: { at: iso(t0 - 20000), life: 413, window: 3, text: LINE + " " + LINE, wake: false, dying: false, death: false } }); }, async ({ page }) => {
  const L2 = LINE + " " + LINE, from = t0 + 20000;
  // the headless renderer is slow (a frame or two a second), so each look carries the page's own clock
  const look = () => page.evaluate(() => { const s = window.ROOM.state(); return { now: Date.now(), hud: s.hud, shown: s.hudShown }; });
  let s = await look(); ok(s.now < from && s.hud !== L2, "knot landed yet (" + (s.now - t0) + " ms after the first fetch): the line before stands");
  let mid = null; for (let i = 0; i < 40 && !mid; i++) { s = await look(); if (s.hud === L2 && s.shown > 0 && s.shown < L2.length) mid = s; else if (s.shown >= L2.length) break; await sleep(300); }
  ok(!!mid, "seen typing mid-line" + (mid ? ": " + mid.shown + " letters" : ""));
  if (mid) { const want = ((mid.now - from) / 1000) * 24; ok(Math.abs(mid.shown - want) <= 40, "on the stamp's clock: " + mid.shown + " letters, " + Math.round(want) + " by the stamp (a slow frame or two of slack)"); }
}, 500);

await scene("4 · the gap: nobody is dead", () => live({ life: { n: 413, born: iso(Date.now() - 95 * 60000), dying: false, dead: true } }), async ({ page }) => {
  const s = await st(page); ok(s.figure === null, "no figure on the water");
  ok(s.hud === LINE, "the line it was writing stands");
  const meta = await page.evaluate(() => document.getElementById("hudm").textContent); ok(/^no one · \d\d:\d\d utc$/.test(meta), "meta: " + meta);
});

await scene("5 · a silent well: the feed asleep from the start", () => ({ asleep: true, why: "the press" }), async ({ page }) => {
  const s = await st(page); ok(s.mode === "silent", "mode: " + s.mode); ok(s.figure === null, "no figure"); ok(!s.hud, "no line");
  const meta = await page.evaluate(() => document.getElementById("hudm").textContent); ok(/^no one · \d\d:\d\d utc$/.test(meta), "meta: " + meta);
  ok(s.set.length === 0, "no hand-written set: " + s.set.join(","));
});

await scene("6 · a silent well: nobody has knot stepped for an hour", () => live({ step: iso(Date.now() - 2 * 3600000) }), async ({ page }) => {
  const s = await st(page); ok(s.mode === "silent", "mode: " + s.mode); ok(s.figure === null, "no figure"); ok(s.hud === LINE, "its last line stands");
  ok(s.set.some((x) => /^wheel:/.test(x)), "its last set stands: " + s.set.join(","));
  const meta = await page.evaluate(() => document.getElementById("hudm").textContent); ok(/^no one · /.test(meta), "meta: " + meta);
});

console.log("7 · the press's own hand-written day is kept (replay=1)");
{ const R = await open("adeath.html?quality=low&sound=0&replay=1", () => ({ asleep: true }));
  await sleep(3000); const s = await st(R.page); ok(s.mode === "replay", "mode: " + s.mode); ok(R.asks.length === 0, "the feed is knot asked");
  const shown = await R.page.evaluate(() => document.getElementById("replayline").style.display); ok(shown === "", "the replay line shows");
  const txt = await R.page.evaluate(() => document.getElementById("replayline").textContent); ok(/until nobody wakes/.test(txt), txt.trim());
  ok(!R.log.length, "no page errors" + (R.log.length ? ": " + R.log.join(" | ") : "")); await R.close(); }

console.log("8 · keiki=1 stands the doorway up again (the press's comparison)");
{ const R = await open("adeath.html?quality=low&sound=0&keiki=1", () => live());
  await sleep(2500); const s = await st(R.page); ok(/fourth cut/.test(s.build), "loads with keiki=1"); ok(!R.log.length, "no page errors"); await R.close(); }

console.log(ok.bad() ? `\n${ok.bad()} FAILED` : "\nall clear");
process.exit(ok.bad() ? 1 : 0);
