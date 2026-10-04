// press · pass 4b (4 oct 2026): THE BOX IS THE DEAD · alife.html and adeath.html · the builder's, never terence's to run or deploy.
// run from the repo root:  node press/box4-press.mjs
import { open, checker, sleep } from "./serve.mjs";
const ok = checker();
const iso = (ms) => new Date(ms).toISOString();
const G0 = { pace: 0, balance: 0, seeds: 0, turning: 0, longevity: 0, patience: 0, temper: 0, warmth: 0, restless: 0 };
const G33 = { ...G0, temper: 0.125, balance: -0.625, turning: -0.25 }, G34 = { ...G33, balance: -0.75 };   // his ?airs=1 of 4 oct: life 34's genome; 33 one step before
let airs = [{ life: 33, died: iso(Date.now() - 2.5 * 3600e3), genome: G33 }, { life: 34, died: iso(Date.now() - 1.5 * 3600e3), genome: G34 }];
let deaths = 34;
function feed(u) {
  const now = Date.now();
  if (u.searchParams.get("airs") != null) return { clock: iso(now), airs };
  return { clock: iso(now), step: iso(now - 60000), life: { n: 35, born: iso(now - 40 * 60000), dying: false, dead: false }, deaths,
    hud: { at: iso(now - 5 * 60000), life: 35, window: 1, text: "a line", wake: false }, hands: null, movable: [], place: [0.5, -1.5], set: [], work: null, fire: null,
    touch: [], fixtures: { lid: "open", lash: "tight" }, windows: [] };
}
const st = (p) => p.evaluate(() => window.ROOM && window.ROOM.state());
async function until(p, fn, ms = 30000) { const t = Date.now(); while (Date.now() - t < ms) { const v = await fn(); if (v) return v; await sleep(500); } return null; }

for (const room of ["alife", "adeath"]) {
  console.log(room + " · the box is the dead");
  airs = airs.slice(0, 2); deaths = 34;
  const R = await open(room + ".html?quality=low&sound=0", feed, { viewport: room === "adeath" ? { width: 160, height: 300 } : { width: 390, height: 700 } });
  try {
    let s = await until(R.page, async () => { const x = await st(R.page); return x && x.box && x.box.lives.length === 2 && x.box.n === 34 ? x : null; });
    ok(!!s, "the airs and the count read: " + JSON.stringify(s && s.box));
    if (s) {
      const b = s.box;
      ok(JSON.stringify(b.lives) === "[33,34]", "oldest first, newest last");
      ok(JSON.stringify(b.newest.rungs) === "[-2,-5,2,3,4,6,6,7]" && b.newest.moved === 1, "life 34's air on the ladder, its moved note balance: " + JSON.stringify(b.newest));
      ok(b.pins === 16 && b.count === 34 && b.blue && b.teeth === 24, "16 pins of the dead, 34 pins of the count, the blue pin, 24 teeth: " + b.pins + " · " + b.count + " · " + b.teeth);
      ok(s.airs === 2, "the room says two airs");
    }
    ok(R.asks.some((q) => q === "?airs=1"), "the room asked ?airs=1");
    const plate = await R.page.evaluate(() => { const c = [...document.querySelectorAll("canvas")]; return c.length; });
    ok(plate > 0, "the page draws");
    if (room === "adeath") { await R.page.mouse.click(80, 150); await sleep(1500); } else { await R.page.mouse.click(195, 350); await sleep(1500); }
    console.log("  a death while the room is open: the new air is pinned, and it glints");
    airs = airs.concat([{ life: 35, died: iso(Date.now()), genome: { ...G34, seeds: 0.125 } }]); deaths = 35;
    await R.page.evaluate(() => window.ROOM.airsNow());   // the five minutes, shortened by the press's hand
    s = await until(R.page, async () => { const x = await st(R.page); return x && x.box && x.box.lives.length === 3 && x.box.n === 35 ? x : null; }, 30000);
    ok(!!s && s.box.newest.life === 35 && s.box.newest.moved === 2 && s.box.pins === 24 && s.box.count === 35, "life 35 pinned, its moved note seeds: " + JSON.stringify(s && s.box));
    ok(!!s && s.box.glint >= 0 && s.box.blue, "the blue pin stands (it glinted at the pinning): " + (s && s.box.glint));
    if (room === "alife") {
      const pl = await until(R.page, async () => { const x = await st(R.page); return x && x.plucks > 0 ? x : null; }, 20000);
      ok(!!pl, "the box plays: " + (pl ? pl.plucks + " plucks, last " + JSON.stringify(pl.plucked[pl.plucked.length - 1]) : "none"));
      if (pl) ok(pl.plucked.every((p) => p.i >= 0 && p.i < 24 && [33, 34, 35].includes(p.life)), "every pluck a tooth of the comb, a life of the dead");
    }
    const txt = await R.page.evaluate(() => [...document.querySelectorAll("#panes .pane")].map((p) => p.textContent).join("\n"));
    ok(/the airs of nobody’s lives that ended in the last day/.test(txt) && !/the founder’s air, and the air of the phone before/.test(txt), "the pane `then` says the dead");
  } finally { ok(!R.log.filter((l) => !/Failed to load resource|net::/.test(l)).length, "no page errors" + (R.log.length ? ": " + R.log.slice(0, 3).join(" | ") : "")); await R.close(); }
}
console.log(ok.bad() ? `\n${ok.bad()} FAILED` : "\nall clear");
process.exit(ok.bad() ? 1 : 0);
