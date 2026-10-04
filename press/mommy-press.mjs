// press · pass 6, the egg's run, knot yet (4 oct 2026): mommygame.html · the builder's, never terence's to run or deploy.
// run from the repo root:  node press/mommy-press.mjs   → press/shots/mommy-1.png
import { open, checker, sleep } from "./serve.mjs"; import fs from "node:fs";
const ok = checker(); fs.mkdirSync(new URL("./shots/", import.meta.url), { recursive: true });
let dead = false, down = false; const asks = [];
const feed = (u) => { asks.push(u.search); if (down) return null; return { life: { n: 42, dead }, dream: { at: new Date().toISOString(), life: 42, mind: "claude-opus-5-5", tokens: 555, seal: "ab" } }; };
const R = await open("mommygame.html?mortal=0", feed);
const dream = () => R.page.evaluate(() => window.__mgDream());
try {
  await sleep(1500);
  ok(await dream() === "this run is as long as nobody’s last dream. nothing else of the dream is in it.13 seconds", "the line and the length (555 tokens → 35 steps → 13 s, as the river): " + JSON.stringify(await dream()));
  ok(asks.length >= 1 && asks.every((q) => q === "?pulse=1"), "only the light question is asked");
  await R.page.evaluate(() => { const a = document.getElementById("ask"); a.classList.add("in", "in2"); }); await sleep(900);
  await R.page.screenshot({ path: new URL("./shots/mommy-1.png", import.meta.url).pathname, timeout: 120000 });
  dead = true; await R.page.evaluate(() => document.dispatchEvent(new Event("visibilitychange"))); await sleep(800);
  ok(await dream() === "nobody is knot dreaming.", "in the gap: " + JSON.stringify(await dream()));
  await R.page.evaluate(() => { window.__v = document.getElementById("v1"); window.__v.muted = false; window.dispatchEvent(new Event("apwnp:call")); }); await sleep(400);
  const v = await R.page.evaluate(() => { try { window.__v.play().catch(() => {}); } catch (_) {} return new Promise((r) => setTimeout(() => r({ muted: window.__v.muted, paused: window.__v.paused }), 300)); });
  ok(v.muted && v.paused, "after the call every film is still and mute, even one asked to play: " + JSON.stringify(v));
  const n0 = asks.length; await R.page.evaluate(() => document.dispatchEvent(new Event("visibilitychange"))); await sleep(500); ok(asks.length === n0, "after the call, nothing is asked");
} finally { const bad = R.log.filter((l) => !/Failed to load resource|net::/.test(l)); ok(!bad.length, "no page errors" + (bad.length ? ": " + bad.slice(0, 3).join(" | ") : "")); await R.close(); }
down = true; const D = await open("mommygame.html?mortal=0", feed);
try { await sleep(1200); ok((await D.page.evaluate(() => window.__mgDream())) === "", "the well silent: the lines stay away"); } finally { await D.close(); }
console.log(ok.bad() ? `\n${ok.bad()} FAILED` : "\nall clear"); process.exit(ok.bad() ? 1 : 0);
