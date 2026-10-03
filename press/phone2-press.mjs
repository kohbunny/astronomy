// press · phone.html, pass 2 (3 oct 2026): THE NUMBER · the builder's, never terence's to run or deploy.
// run from the repo root:  node press/phone2-press.mjs
import { open, checker, sleep } from "./serve.mjs";
const ok = checker();
const iso = (ms) => new Date(ms).toISOString();
let dead = false;
const feed = () => ({ clock: iso(Date.now()), step: iso(Date.now() - 60000), life: { n: 7, dead }, hud: { at: iso(Date.now() - 60000), life: 7, text: "a line" }, day: { date: iso(Date.now()).slice(0, 10), lives: [], telegrams: [] } });
const th = (p) => p.evaluate(() => window.__phoneThread());
async function until(p, fn, ms = 20000) { const t = Date.now(); while (Date.now() - t < ms) { const v = await fn(); if (v) return v; await sleep(400); } return null; }
const R = await open("phone.html?mortal=0&autoplay=0", feed, { touch: true });
try {
  await until(R.page, async () => { const s = await th(R.page); return s && s.answered; }, 30000);
  await R.page.mouse.click(195, 420); await sleep(1500);
  console.log("1 · the phone app: nobody first, the call at the door in recents");
  await R.page.evaluate(() => window.__phoneOpen("phone")); await sleep(800);
  await R.page.evaluate(() => window.__phoneTap(180, 160)); await sleep(1200);
  let s = await th(R.page); ok(s.app === "call" && s.call.who === "nobody" && s.call.state === "ring" && !s.call.dead, "favorites → calling nobody: " + JSON.stringify(s.call));
  await sleep(9000); s = await th(R.page); ok(s.call.state === "ring", "nine seconds on, still ringing — nobody answers");
  await R.page.evaluate(() => window.__phoneTap(180, 652)); await sleep(800); s = await th(R.page);
  ok(s.call.state === "idle" && s.app === "phone", "the red button is the only way out");
  await R.page.evaluate(() => window.__phoneTap(180, 330)); await sleep(800); s = await th(R.page);
  ok(s.call.who === "nobody", "recents → nobody"); await R.page.evaluate(() => window.__phoneTap(180, 652)); await sleep(600);
  console.log("2 · in the gap: the three rising tones, and the call ends itself");
  dead = true; await until(R.page, async () => (await th(R.page)).dead, 45000);
  await R.page.evaluate(() => window.__phoneTap(180, 160)); await sleep(800); s = await th(R.page);
  ok(s.call.dead === true && s.call.state === "ring", "a dead number at the dial");
  const t = Date.now(); let saw = 0; while (Date.now() - t < 9000) { s = await th(R.page); if (s.call.tones) saw = 1; if (s.call.state === "idle") break; await sleep(300); }
  ok(saw === 1, "the tones played"); ok(s.call.state === "idle" && s.app === "phone", "the call ended itself");
  const sfx = await R.page.evaluate(() => window.__phoneSfx && window.__phoneSfx()); ok(JSON.stringify(sfx || "").indexOf("call:sit") >= 0, "the sound log says call:sit");
} finally { ok(!R.log.filter((l) => !/Failed to load resource|net::/.test(l)).length, "no page errors" + (R.log.length ? ": " + R.log.slice(0, 3).join(" | ") : "")); await R.close(); }
console.log(ok.bad() ? `\n${ok.bad()} FAILED` : "\nall clear");
process.exit(ok.bad() ? 1 : 0);
