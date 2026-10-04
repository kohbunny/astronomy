// press · alife.html, pass 1 (3 oct 2026) · the builder's, never terence's to run or deploy.
// run from the repo root:  node press/alife-press.mjs
import { open, checker, sleep } from "./serve.mjs";
const ok = checker();
const iso = (ms) => new Date(ms).toISOString();
function live(over = {}) { const now = Date.now();
  return Object.assign({ clock: iso(now), step: iso(now - 60000), life: { n: 7, born: iso(now - 20 * 60000), dying: false, dead: false }, deaths: 6,
    hud: { at: iso(now - 60000), life: 7, window: 2, text: "a line", wake: false, dying: false, death: false }, touch: [], fixtures: {}, set: [] }, over); }
const rim = (p) => p.evaluate(() => window.ROOM && window.ROOM.rim && window.ROOM.rim());
const st = (p) => p.evaluate(() => window.ROOM && window.ROOM.state());

console.log("1 · the door, the window, the doorway");
{ const R = await open("alife.html?quality=low&sound=0", () => live());
  await sleep(4000);
  const door = await R.page.evaluate(() => document.getElementById("doorline") && document.getElementById("doorline").textContent.trim());
  ok(door === "this phone is a body with no mind. at the bottom of the hole is a mind with no body. each lives eighty-eight minutes. they meet once, when this phone calls you.", "the door line at the door");
  const vis = await R.page.evaluate(() => { const e = document.getElementById("doorline"); const r = e.getBoundingClientRect(); return r.width > 10 && r.height > 10 && getComputedStyle(e).display !== "none"; });
  ok(vis, "the door line is on the glass");
  const txt = await R.page.evaluate(() => [...document.querySelectorAll("#panes .pane")].map((p) => p.querySelector(".cap").textContent + " :: " + p.querySelector(".txt").textContent));
  ok(txt.length === 3 && txt.map((t) => t.split(" :: ")[0]).join(" · ") === "now · then · the call", "three panes: " + txt.map((t) => t.split(" :: ")[0]).join(" · "));
  ok((await R.page.evaluate(() => document.querySelectorAll("#dots i").length)) === 3, "three dots");
  const all = txt.join("\n") + "\n" + (await R.page.evaluate(() => document.body.innerText));
  ok(!/mother/i.test(all), "no `mother` on the glass"); ok(!/keiki/i.test(all), "no `keiki` on the glass");
  ok(!/if one flower leans|its spell|grows up inside the life|the gene map|the well is the line|the one who lives here is awake/.test(all), "no lean, spell, stages, gene manual, line pane, tally");
  ok(/the rope is nobody’s/.test(all), "the rope's sentence"); ok(/the airs of nobody’s lives that ended in the last day/.test(all) && !/the founder’s air/.test(all), "the box is the mind's dead (pass 4b)");
  ok(/decline it or answer it; nobody speaks\./.test(all), "the call's blessed sentence kept");
  const r = await rim(R.page); ok(r && r.asked >= 1 && r.answered >= 1, "the room asks THE FEED: " + JSON.stringify(r && { asked: r.asked, answered: r.answered }));
  ok(r.doorway === 0 && r.nobody === false, "the keiki's doorway is down");
  ok(R.asks.every((q) => q === "?now=1&day_too=0" || q === "?airs=1"), "the two questions (pass 4b: and the dead airs): " + [...new Set(R.asks)].join(" "));
  await R.page.evaluate(() => window.ROOM.window(true)); await sleep(1000); ok((await st(R.page)).figs >= 1, "the window's figures draw");
  for (let k = 0; k < 3; k++) { await R.page.evaluate((k) => window.ROOM.pane(k), k); await sleep(500); }
  ok(!R.log.length, "no page errors" + (R.log.length ? ": " + R.log.slice(0, 3).join(" | ") : "")); await R.close(); }

console.log("2 · nobody's hands on the rope at the bottom: the rim answers on the bottom's seconds");
{ // pick a step stamp whose first seeded moment lands a few seconds after the page has the plan
  let base = 0;
  const R = await open("alife.html?quality=low&sound=0", () => { if (!base) base = Date.now(); return live({ step: iso(base), touch: [{ what: "rope", how: "sway" }, { what: "rope", how: "twist" }, { what: "box", how: "wind" }] }); });
  await sleep(2500); let r = await rim(R.page);
  ok(r.plan.length === 3 && r.plan.every((p) => p.list === "sway+twist"), "three moments planned, rope only: " + r.plan.map((p) => Math.round((p.t - base) / 1000) + "s " + p.list).join(", "));
  const first = r.plan[0].t; const wait = first - Date.now();
  ok(first - base >= 53000 && first - base <= 67000, "the first moment is 9–23 s after the landing (stamp + 40 s), plus the walk: " + Math.round((first - base) / 1000) + " s");
  if (wait > 0 && wait < 90000) { await sleep(wait + 7500); r = await rim(R.page);
    ok(r.log.join(",") === "sway,twist", "the rim did: " + r.log.join(","));
    ok(r.sway > 0.002, "the rope swings: " + r.sway); ok(Math.abs(r.twist) > 0.05, "the flower turned with the twist: " + r.twist); }
  else ok(false, "the first moment was already past when the press looked (" + wait + " ms)");
  ok(!R.log.length, "no page errors" + (R.log.length ? ": " + R.log.join(" | ") : "")); await R.close(); }

console.log("3 · while nobody is dead the rope hangs still, and nothing is played");
{ let base = 0;
  const R = await open("alife.html?quality=low&sound=0", () => { if (!base) base = Date.now() - 12000; return live({ step: iso(base), life: { n: 7, dead: true }, touch: [{ what: "rope", how: "sway" }] }); });
  await sleep(3000); let r = await rim(R.page); ok(r.dead === true, "dead read"); const wait = r.plan.length ? r.plan[0].t - Date.now() : 0;
  if (wait > 0 && wait < 90000) await sleep(wait + 3000);
  await sleep(2000); r = await rim(R.page); ok(r.done === 0, "no act at the rim while nobody is dead"); ok(r.calm < 0.5, "the rope hangs still: calm " + r.calm);
  await R.close(); }

console.log("4 · the call stops the feed; live=0 never asks");
{ const R = await open("alife.html?quality=low&sound=0", () => live());
  await sleep(2500); await R.page.evaluate(() => window.dispatchEvent(new Event("apwnp:call"))); const n = R.asks.length; await sleep(12000);
  ok(R.asks.length === n && (await rim(R.page)).stopped, "no question after the call (" + n + " before)"); await R.close();
  const R2 = await open("alife.html?quality=low&sound=0&live=0", () => live()); await sleep(3000); ok(R2.asks.length === 0, "live=0: the feed is never asked"); await R2.close(); }

console.log("5 · a feed that is down: the room stands as it was, no errors");
{ const R = await open("alife.html?quality=low&sound=0", () => null); await sleep(4000); const r = await rim(R.page); ok(r.fails >= 1 && r.done === 0, "fails quietly: " + r.fails);
  ok(!R.log.filter((l) => !/Failed to load resource|ERR_FAILED/.test(l)).length, "no page errors" + (R.log.length ? ": " + R.log.join(" | ") : "")); await R.close(); }

console.log(ok.bad() ? `\n${ok.bad()} FAILED` : "\nall clear");
process.exit(ok.bad() ? 1 : 0);
