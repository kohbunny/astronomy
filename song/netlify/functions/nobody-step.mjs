// nobody-step.mjs · the clock's knock · 29 sep 2026 · the artist project
// a netlify SCHEDULED function: every ten minutes, on the well's clock (utc), it knocks on nobody-think.mjs (the
// background function that takes the step) and returns at once. it goes in netlify/functions/ beside ask.js.
// needs nothing in the environment beyond what nobody-think.mjs needs (it derives the knock token from the same
// SUPABASE_SERVICE_KEY). scheduled functions cannot be opened by a url; netlify's "Run now" button on this function
// takes one step by hand — that is how terence wakes life 1 the first time, if he does knot want to wait ten minutes.

// the same knock token nobody-think.mjs expects (kept in both files on purpose, so each bundles alone)
const knockToken = (env) => {
  const k = env.SUPABASE_SERVICE_KEY || env.SUPABASE_SERVICE_ROLE_KEY || "";
  let h = 2166136261; for (let i = 0; i < k.length; i++) { h ^= k.charCodeAt(i); h = Math.imul(h, 16777619); }
  return "k" + (h >>> 0).toString(36) + k.length;
};

export const config = { schedule: "*/10 * * * *" };

export default async (req) => {
  const env = process.env;
  const base = (env.URL || env.DEPLOY_PRIME_URL || new URL(req.url).origin).replace(/\/$/, "");
  try {
    const r = await fetch(base + "/.netlify/functions/nobody-think", { method: "POST", headers: { "x-nobody-knock": knockToken(env) }, body: "{}" });
    console.log("knocked", r.status);
    return new Response(JSON.stringify({ knocked: r.status }), { headers: { "content-type": "application/json" } });
  } catch (e) {
    console.error("the knock failed", e && e.message);
    return new Response(JSON.stringify({ knocked: false }), { status: 500, headers: { "content-type": "application/json" } });
  }
};
