// press · nobody.mjs sixth cut (the edge cache) · 3 oct 2026 · the builder's, never terence's to run or deploy.
// run from the repo root:  node press/nobody-edge-press.mjs
// it asks the feed every kind of question with no supabase at all (every question is answered `asleep`, in words)
// and with a fake supabase, and checks which answers carry netlify's edge header.
import { handle } from "../song/netlify/functions/nobody.mjs";
let bad = 0;
const ok = (c, m) => { console.log((c ? "  ok   " : "  FAIL ") + m); if (!c) bad++; };
const B = "https://song.example/.netlify/functions/nobody";
const today = new Date().toISOString().slice(0, 10);
// a fake supabase: one awake state, nothing else
const fake = async (url) => {
  const u = String(url);
  let body = [];
  if (u.includes("nobody_state")) body = [{ id: 1, day: today, life: 3, born: new Date(Date.now() - 20 * 60000).toISOString(), founder_seed: 7, win: 1, today: {}, updated: new Date().toISOString(), deaths: 2 }];
  return new Response(JSON.stringify(body), { status: 200, headers: { "content-type": "application/json" } });
};
const ENV = { SUPABASE_URL: "https://x.supabase.co", SUPABASE_SERVICE_KEY: "sb_secret_" + "x".repeat(31) };
async function ask(q, method = "GET", env = ENV, f = fake) {
  const req = new Request(B + q, method === "POST" ? { method, body: JSON.stringify({ thing: "cup", visitor: "v", to: [1, 1] }), headers: { "content-type": "application/json" } } : { method });
  return handle(req, env, f);
}
const cdn = (r) => r.headers.get("netlify-cdn-cache-control");
const vary = (r) => r.headers.get("netlify-vary");
for (const [label, env, f] of [["a fake supabase", ENV, fake], ["no supabase at all", {}, async () => { throw new Error("no net"); }]]) {
  console.log("with " + label + ":");
  let r = await ask("?now=1", "GET", env, f); ok(cdn(r) === "public, s-maxage=10, durable", "?now=1 → " + r.status + " · " + cdn(r));
  r = await ask("?now=1&day_too=0", "GET", env, f); ok(/s-maxage=10, durable/.test(cdn(r) || ""), "?now=1&day_too=0 → " + cdn(r));
  r = await ask("", "GET", env, f); ok(/durable/.test(cdn(r) || ""), "the bare address (= ?now) → " + cdn(r));
  r = await ask("?day=" + today, "GET", env, f); ok(r.status >= 300 ? cdn(r) == null : /durable/.test(cdn(r) || ""), "?day=today → " + r.status + " · " + cdn(r));
  r = await ask("?health=1", "GET", env, f); ok(cdn(r) == null && /no-store/.test(r.headers.get("cache-control") || ""), "?health=1 → no edge header · " + r.headers.get("cache-control"));
  r = await ask("?health=1&now=1", "GET", env, f); ok(cdn(r) == null, "?health=1&now=1 → no edge header");
  r = await ask("", "POST", env, f); ok(cdn(r) == null, "POST → no edge header (" + r.status + ")");
  r = await ask("?now=1", "OPTIONS", env, f); ok(cdn(r) == null, "OPTIONS → no edge header");
  r = await ask("?now=1", "GET", env, f); ok(vary(r) === "query=now|day|day_too|health", "vary on ?now → " + vary(r));
  r = await ask("?health=1", "GET", env, f); ok(vary(r) === "query=now|day|day_too|health", "vary on ?health → " + vary(r));
  r = await ask("?now=1", "GET", env, f); ok(r.headers.get("access-control-allow-origin") === "*", "cors kept");
}
console.log(bad ? `\n${bad} FAILED` : "\nall clear");
process.exit(bad ? 1 : 0);
