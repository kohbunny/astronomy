// press · pass 5, the front door (4 oct 2026): unknown.html's Notes row · the builder's, never terence's to run or deploy.
// run from the repo root:  node press/door5-press.mjs   → press/shots/door5-*.png
import { open, checker, sleep } from "./serve.mjs"; import fs from "node:fs";
const ok = checker();
fs.mkdirSync(new URL("./shots/", import.meta.url), { recursive: true });
const b64 = (s) => Buffer.from(s, "utf8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const W = "cut it free with the wire and slide it on the", U = "the bowl — still soft, “wrong” in a good way";
const text = (p) => p.evaluate(() => { const n = document.getElementById("notes"); return n ? (n.style.display === "none" ? "(hidden)" : document.getElementById("notesText").textContent) : "(gone)"; });
async function walk(path, init) {
  const R = await open(path, () => ({}), { init });
  await sleep(500); const t = await text(R.page); return { R, t };
}
let r = await walk("unknown.html?nocall#3." + b64(W));
ok(r.t === W, "a child card's words: " + r.t);
await r.R.page.screenshot({ path: new URL("./shots/door5-1-notes.png", import.meta.url).pathname });
await r.R.page.evaluate((h) => { location.hash = h; }, "#4." + b64(U)); await sleep(300);
ok((await text(r.R.page)) === U, "a new card's # change, utf-8 whole: " + (await text(r.R.page)));
ok(!r.R.log.filter((l) => !/Failed to load|net::/.test(l)).length, "no page errors"); await r.R.close();
for (const [h, why] of [["", "the founder's card (no #)"], ["#0", "a card with no words"], ["#0437471517368790.2", "an old card (16 hex)"]]) {
  r = await walk("unknown.html?nocall" + h); ok(r.t === "no one had died in your hands yet.", why + ": " + r.t); await r.R.close(); }
const keep = (child, from) => `try{ localStorage.setItem('apwnp-inheritance', JSON.stringify({ child: ${JSON.stringify(child)}, from: ${JSON.stringify(from)}, at: 1 })); }catch(_){}`;
r = await walk("unknown.html?nocall", keep("5." + b64(W), "4." + b64(U))); ok(r.t === W, "a kept child, a founder's tap: the child's words"); await r.R.close();
r = await walk("unknown.html?nocall#4." + b64(U), keep("5." + b64(W), "4." + b64(U))); ok(r.t === W, "a kept child, the card it was born from: the child's words"); await r.R.close();
r = await walk("unknown.html?nocall#9." + b64(U), keep("5." + b64(W), "4." + b64(U))); ok(r.t === U, "a kept child, another card: that card's own words"); await r.R.close();
r = await walk("unknown.html?nocall&notes=0#3." + b64(W)); ok(r.t === "(gone)", "?notes=0 takes the row out"); await r.R.close();
console.log(ok.bad() ? `\n${ok.bad()} FAILED` : "\nall clear");
process.exit(ok.bad() ? 1 : 0);
