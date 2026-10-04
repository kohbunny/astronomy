// press · pass 6, the raven (4 oct 2026): ask.js mode raven reads what messages holds · the builder's, never terence's.
// run from the repo root:  node press/raven-press.mjs   (no network: the feed and anthropic are both answered here)
import { createRequire } from "node:module"; import { checker } from "./serve.mjs";
const require = createRequire(import.meta.url); const ok = checker(); const iso = (ms) => new Date(ms).toISOString();
process.env.ANTHROPIC_API_KEY = "press"; process.env.URL = "https://press.example"; delete process.env.ANTHROPIC_BASE_URL;
let feedAnswer = null; const sent = [];
globalThis.fetch = async (url, opt) => {
  url = String(url);
  if (url.startsWith("https://press.example/.netlify/functions/nobody")) return feedAnswer ? new Response(JSON.stringify(feedAnswer), { status: 200 }) : new Response("no", { status: 503 });
  if (url.endsWith("/v1/messages")) { sent.push(JSON.parse(opt.body)); return new Response(JSON.stringify({ content: [{ type: "text", text: "a raven." }], usage: { input_tokens: 10, output_tokens: 3 } }), { status: 200 }); }
  return new Response("{}", { status: 404 });
};
const ask = require("../song/netlify/functions/ask.js");
const raven = async () => { sent.length = 0; const r = await ask.handler({ httpMethod: "POST", headers: { host: "press.example" }, body: JSON.stringify({ mode: "raven", turn: 1, rite: "open", messages: [{ role: "user", content: "what is down there?" }] }) }); return { r, sys: sent[0] && sent[0].system }; };
const now = Date.now();
feedAnswer = { day: { date: iso(now).slice(0, 10),
  lives: [{ n: 40, died: iso(now - 3 * 3600e3), last: "the second bowl is on the" }, { n: 41, died: iso(now - 20000), last: "too new to have landed" }],
  telegrams: [{ at: iso(now - 3 * 3600e3 + 600e3), life: 41, text: "I AM STILL ALIVE · nobody · life 41 · 09:40" }],
  hud: [{ text: "SECRET: what it is making now" }], windows: [{ title: "SECRET TITLE" }] } };
let x = await raven();
ok(x.r && x.r.statusCode === 200, "the raven answers");
ok(/\(the phone's messages today, from nobody/.test(x.sys || ""), "the bird is handed the thread");
ok(/“the second bowl is on the”\nI AM STILL ALIVE · nobody · life 41\)/.test(x.sys), "verbatim, oldest first, the telegram without its hour: " + JSON.stringify((x.sys || "").split("from nobody")[1]));
ok(!/too new to have landed/.test(x.sys), "a death knot yet landed (stamp + 40 s) is knot told");
ok(!/SECRET/.test(x.sys), "nothing of the drawer: knot the line, knot the window's title");
ok(/you never carry anything down the well/.test(x.sys) && !/the tenant:/.test(x.sys), "the re-cut paragraph, the tenant gone");
feedAnswer = null; x = await raven();
ok(x.r.statusCode === 200 && !/from nobody, oldest first/.test(x.sys), "the feed down: the same bird, told nothing");
const src = require("node:fs").readFileSync(new URL("../song/netlify/functions/ask.js", import.meta.url), "utf8");
ok(/system: DESK_SET,/.test(src) && /model: DESK_SET_MODEL/.test(src) && !/system: NOBODY_SYSTEM \+ NOBODY_SET/.test(src), "the set card is the desk's, on sonnet 5.5, no temperature");
console.log(ok.bad() ? `\n${ok.bad()} FAILED` : "\nall clear"); process.exit(ok.bad() ? 1 : 0);
