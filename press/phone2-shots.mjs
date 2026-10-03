// press · screenshots of phone.html after pass 2 (the phone app, calling nobody) · the builder's, never his.
// run from the repo root:  node press/phone2-shots.mjs  → press/shots/*.png
import { open, sleep } from "./serve.mjs"; import fs from "node:fs";
const iso = (ms) => new Date(ms).toISOString();
const feed = () => ({ clock: iso(Date.now()), step: iso(Date.now() - 60000), life: { n: 7, dead: false }, hud: { at: iso(Date.now() - 60000), life: 7, text: "a line" }, day: { date: iso(Date.now()).slice(0, 10), lives: [], telegrams: [] } });
fs.mkdirSync(new URL("./shots/", import.meta.url), { recursive: true });
const R = await open("phone.html?mortal=0&autoplay=0", feed, { touch: true });
const shot = async (n) => { await sleep(1500); await R.page.screenshot({ path: new URL("./shots/" + n + ".png", import.meta.url).pathname }); };
for (let i = 0; i < 60; i++) { const s = await R.page.evaluate(() => window.__phoneThread && window.__phoneThread()); if (s && s.answered) break; await sleep(500); }
await R.page.mouse.click(195, 420); await sleep(2000);
await R.page.evaluate(() => window.__phoneOpen("phone")); await shot("6-phone");
await R.page.evaluate(() => window.__phoneTap(180, 160)); await sleep(2500); await shot("7-calling-nobody");
console.log(R.log.filter((l) => !/Failed to load/.test(l)).join("\n")); await R.close();
