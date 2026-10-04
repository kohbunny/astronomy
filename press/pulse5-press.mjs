// press · nobody.mjs, the keeper's nicety (4 oct 2026): ?pulse=1's death carries its genome and its moved note · the builder's, never terence's to run.
// run from the repo root:  node press/pulse5-press.mjs
import { handle, rungsOf } from "../song/netlify/functions/nobody.mjs";
let bad = 0; const ok = (c, m) => { console.log((c ? "  ok   " : "  FAIL ") + m); if (!c) bad++; };
const now = Date.now(), iso = (ms) => new Date(ms).toISOString();
const G35 = { pace: 0, balance: -0.75, seeds: 0, turning: -0.25, longevity: 0, patience: 0, temper: 0.125, warmth: 0, restless: 0 }, G36 = { ...G35, patience: 0.125 };
function fake(airs) { return async (url) => { const t = new URL(url).pathname.split("/").pop(); const rows = {
  nobody_state: [{ id: 1, day: iso(now).slice(0, 10), life: 37, born: iso(now - 20 * 60000), founder_seed: 7, today: {}, updated: iso(now) }],
  nobody_deaths: [{ at: "2026-10-04T03:49:23.149Z", life: 36, last: "the line, cut" }], nobody_hud: [], nobody_telegrams: [], nobody_dreams: [], nobody_airs: airs };
  return new Response(JSON.stringify(rows[t] || []), { status: 200, headers: { "content-type": "application/json" } }); }; }
const ENV = { SUPABASE_URL: "https://x.supabase.co", SUPABASE_SERVICE_KEY: "sb_secret_" + "x".repeat(31) };
const ask = async (airs) => (await handle(new Request("https://s/.netlify/functions/nobody?pulse=1"), ENV, fake(airs))).json();
let j = await ask([{ life: 36, genome: G36 }, { life: 35, genome: G35 }]);
ok(j.death && j.death.life === 36 && JSON.stringify(j.death.genome) === JSON.stringify(G36), "the death carries its genome");
ok(j.death.moved === 4, "and its moved note: patience (index 4), as the keeper read it live: " + j.death.moved);
ok(JSON.stringify(rungsOf(G36)) === "[-2,-5,2,3,5,6,6,7]", "the air's rule, the river's: " + JSON.stringify(rungsOf(G36)));
j = await ask([{ life: 36, genome: G36 }]); ok(j.death.genome && j.death.moved === -1, "with none before it, -1");
j = await ask([{ life: 35, genome: G35 }]); ok(j.death && !("genome" in j.death), "an air of another life is knot hung on this death");
j = await ask(null); ok(j.death && j.death.last === "the line, cut" && !("genome" in j.death), "no airs table: the death as before");
console.log(bad ? `\n${bad} FAILED` : "\nall clear"); process.exit(bad ? 1 : 0);
