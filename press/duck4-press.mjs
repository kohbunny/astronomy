// press · pass 4c (4 oct 2026, later): the bottom of the well ducks the river · phone.html · the builder's, never terence's to run or deploy.
// run from the repo root:  node press/duck4-press.mjs
import { open, checker, sleep } from "./serve.mjs";
const ok = checker();
const iso = (ms) => new Date(ms).toISOString();
const feed = () => ({ clock: iso(Date.now()), step: iso(Date.now() - 60000), life: { n: 36, dead: false }, deaths: 35, hud: { at: iso(Date.now() - 60000), life: 36, text: "a line" }, day: { date: iso(Date.now()).slice(0, 10), lives: [], telegrams: [] } });
const R = await open("phone.html?mortal=0&autoplay=0", feed, { touch: true });
try {
  await sleep(6000); await R.page.mouse.click(195, 420); await sleep(1500);
  for (const [app, want] of [["adeath", "duck"], ["alife", "duck"], ["music", "keep"]]) {
    await R.page.evaluate((a) => window.__phoneOpenRoom(a + ".html"), app); await sleep(5000);   // the shell frames the room, as a tap on its tile does
    const s = await R.page.evaluate(() => ({ hold: window.__phoneSong && window.__phoneSong().hold, river: window.RIVER && window.RIVER.held() }));
    ok(s.hold === want && (want === "keep" || s.river === want), app + " → the song " + s.hold + ", the river " + s.river);
    await R.page.evaluate(() => window.__phoneShellHome()); await sleep(2000);
  }
} finally { ok(!R.log.filter((l) => !/Failed to load resource|net::|WebGL|GPU/.test(l)).length, "no page errors" + (R.log.length ? ": " + R.log.slice(0, 2).join(" | ") : "")); await R.close(); }
console.log(ok.bad() ? `\n${ok.bad()} FAILED` : "\nall clear");
process.exit(ok.bad() ? 1 : 0);
