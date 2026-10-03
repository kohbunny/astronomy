// press · adeath.html, pass 2 (3 oct 2026) · the builder's, never terence's to run or deploy.
// run from the repo root:  node press/adeath2-press.mjs
// (headless chromium draws this room a frame every few seconds at phone size; the press looks at it through a small window)
import { open, checker, sleep } from "./serve.mjs";
const ok = checker();
const iso = (ms) => new Date(ms).toISOString();
const KN = 600000, K = () => Math.floor(Date.now() / KN) * KN;
const LINE = "the second bowl is on the bat, and the clay is wetter than the first one was, so i slow the wheel and let it find its own speed, and wait.";
function frame(step, over = {}) {
  return Object.assign({ clock: iso(Date.now()), step: iso(step), window: { n: 3, title: "two bowls" }, windows: [], life: { n: 413, dead: false }, deaths: 412,
    hud: { at: iso(step), life: 413, window: 3, text: LINE, wake: false, dying: false, death: false },
    hands: "clay", movable: ["cup"], place: [0.5, -1.5], set: [{ id: "wheel", kind: "wheel", at: [0.4, -1.2] }], touch: [], fixtures: {} }, over);
}
const p2 = (p) => p.evaluate(() => Object.assign(window.ROOM.pass2(), { now: Date.now() }));
const once = (fn) => { let v; return () => (v === undefined ? (v = fn()) : v); };   // a stand-in step is fixed at its first reading
async function enter(p) { await p.mouse.click(80, 150); await sleep(1500); }
async function scene(name, feed, fn) { console.log(name); const R = await open("adeath.html?quality=low", feed, { viewport: { width: 160, height: 300 } }); try { await sleep(3500); await fn(R); }
  finally { ok(!R.log.length, "no page errors" + (R.log.length ? ": " + R.log.slice(0, 2).join(" | ") : "")); await R.close(); } }

await scene("1 · the knock: the step of this knock has knot come — flat water, the caret, unison", () => frame(K() - 120000), async ({ page }) => {
  await enter(page); const s = await p2(page);
  ok(s.knock === true && s.missed === false, "the knock stands");
  ok(s.line.trim() === "▍" || s.line.trim() === "", "the line is a caret: " + JSON.stringify(s.line));
  ok(s.meta === "", "nothing under it");
  ok(s.drips === false && s.feet === false, "no drips, no feet");
  ok(s.hum === "unison", "the hum: " + s.hum);
});

await scene("2 · a knock passed with no step at all: `no one came`", () => frame(K() - KN - 120000), async ({ page }) => {
  const s = await p2(page); ok(s.knock && s.missed && s.meta === "no one came", "meta: " + s.meta);
});

let land = 0;
await scene("3 · the step lands whole at its stamp + 40 s: the caret goes, the line types, the beat comes back, a minute of feet", () => {
  if (!land) land = Date.now() + 5000 + 40000;   // a step stamped five seconds after the first reading: it lands forty-five seconds on
  return Date.now() < land - 40000 ? frame(K() - 120000) : frame(land - 40000);
}, async ({ page }) => {
  await enter(page); let s = await p2(page);
  ok(s.knock === true, "before the landing the knock stands (" + Math.round((land - Date.now()) / 1000) + " s to go)");
  const t = Date.now(); while (Date.now() < land + 4000 && Date.now() - t < 60000) await sleep(500);
  s = await p2(page);
  ok(s.knock === false && s.landings >= 2, "landed: knock " + s.knock + ", landings " + s.landings);
  ok(s.line.length > 0 && LINE.indexOf(s.line.replace("▍", "")) === 0, "the new line types: " + JSON.stringify(s.line.slice(0, 40)));
  ok(s.hum === "beat", "the beat is back: " + s.hum);
  ok(s.feet === true && s.standUntil > 40, "its feet stand a minute: " + s.standUntil + " s left");
  ok(s.cur === iso(land - 40000), "the frame is the new step's");
});

const st4 = once(() => Date.now() - 46000);
await scene("4 · the last step: a dying line at three letters a second", () => frame(st4(), { hud: { at: iso(st4()), life: 413, window: 3, text: LINE + " " + LINE, dying: true } }), async ({ page }) => {
  const s = await p2(page); ok(s.cps === 3, "gait: " + s.cps + " a second");
  const want = (s.now - (st4() + 40000)) / 1000 * 3, got = s.line.replace("▍", "").length;
  ok(Math.abs(got - want) <= 6, "slow, on the stamp's clock: " + got + " letters, " + Math.round(want) + " by the stamp");
});

let deadAt = 0; const st5 = once(() => Date.now() - 41000);
await scene("5 · nobody dies while its line is being typed: the line stops where the death fell, and stays cut", () => {
  if (!deadAt) deadAt = Date.now() + 9000; const st = st5();
  const dead = Date.now() > deadAt; return frame(st, { life: { n: 413, dead }, hud: { at: iso(st), life: 413, window: 3, text: LINE, dying: true } });
}, async ({ page }) => {
  await enter(page);
  const t = Date.now(); let s; while (Date.now() - t < 40000) { s = await p2(page); if (s.cut) break; await sleep(500); }
  ok(s && s.cut, "cut");
  const a = s.line; await sleep(4000); s = await p2(page);
  ok(s.line === a && a.length < LINE.length && LINE.indexOf(a) === 0, "it stays where the death fell: " + JSON.stringify(a));
  ok(/^no one · \d\d:\d\d utc$/.test(s.meta), "no one: " + s.meta); ok(s.hum === "solo", "the hum is one thin note: " + s.hum);
});

const st6 = once(() => Date.now() - 50000);
await scene("6 · bare water between acts: a minute after the landing its feet go", () => frame(st6()), async ({ page }) => {
  let s = await p2(page); ok(s.feet === true, "feet at the landing");
  const t = Date.now(); while (Date.now() - t < 75000) { s = await p2(page); if (!s.feet) break; await sleep(2000); }
  ok(s.feet === false && s.knock === false, "bare water after a minute (no act, no knock)");
});

const st7 = once(() => Date.now() - 2 * 3600000);
await scene("7 · a silent well plays no knock", () => frame(st7()), async ({ page }) => {
  await enter(page); const s = await p2(page); ok(s.knock === false && s.hum === "solo", "silent: knock " + s.knock + ", hum " + s.hum);
});

console.log(ok.bad() ? `\n${ok.bad()} FAILED` : "\nall clear");
process.exit(ok.bad() ? 1 : 0);
