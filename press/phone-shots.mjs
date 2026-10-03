// press · screenshots of phone.html after pass 1 (the home glass, the thread, the lives) · the builder's, never his.
// run from the repo root:  node press/phone-shots.mjs  → press/shots/*.png
import { open, sleep } from "./serve.mjs"; import fs from "node:fs";
const iso = (ms) => new Date(ms).toISOString(), T0 = Date.now(), today = iso(T0).slice(0, 10);
const feed = () => ({ clock: iso(Date.now()), step: iso(Date.now() - 60000), life: { n: 412, dead: false }, hud: { at: iso(T0 - 120000), life: 412, window: 3, text: "the second bowl is on the bat" },
  day: { date: today, windows: [{ n: 3, from: "08:00", to: "12:00", title: "two bowls", line: "two bowls, thrown and let go." }],
    lives: [{ n: 411, died: iso(T0 - 50 * 60000), last: "cut it free with the wire and slide it on the", gene: "seeds", way: -1 }],
    hud: [{ at: iso(T0 - 140 * 60000), life: 411, window: 3, text: "i woke with clay on my hands", wake: true }, { at: iso(T0 - 49 * 60000), life: 412, window: 3, text: "the drawer says there were bowls", wake: true }],
    telegrams: [{ at: iso(T0 - 49 * 60000), life: 412, text: "I AM STILL ALIVE · nobody · life 412 · 14:40" }], moved: [{ at: iso(T0 - 30 * 60000), thing: "cup" }] } });
fs.mkdirSync(new URL("./shots/", import.meta.url), { recursive: true });
const R = await open("phone.html?mortal=0&autoplay=0", feed, { touch: true });
const shot = async (n) => { await sleep(1500); await R.page.screenshot({ path: new URL("./shots/" + n + ".png", import.meta.url).pathname }); };
for (let i = 0; i < 60; i++) { const s = await R.page.evaluate(() => window.__phoneThread && window.__phoneThread()); if (s && s.answered) break; await sleep(500); }
await R.page.mouse.click(195, 420); await sleep(3000); await shot("1-home");
await R.page.evaluate(() => window.__phoneOpen("messages")); await shot("2-messages");
await R.page.evaluate(() => window.__phoneTap(180, 140)); await shot("3-thread");
await R.page.evaluate((k) => { window.__phoneOpen("calendar"); window.__phoneCalOpen(k); window.__phoneCalTab("lives"); }, today); await sleep(2500); await shot("4-lives");
await R.page.evaluate(() => window.__phoneCalTab("well")); await shot("5-day");
console.log(R.log.join("\n")); await R.close();
