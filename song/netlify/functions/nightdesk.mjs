// netlify/functions/nightdesk.mjs
// THE BELL — the newest times · law 98 (the sixty-fifth printing, 20 sept 2026)
//
// a scheduled function: the landlord runs it by the clock, once a night, and
// it can knot be called from outside. it has thirty seconds to live, which is
// enough to do its one job: ring the desk (nightdesk-background.mjs), which
// answers 202 at once and then works for as long as it needs, alone.
//
// the hour: 09:00 universal time — two in the morning in los angeles in
// summer, one in winter (the landlord's clock is universal and does knot keep
// daylight time; the desk does knot mind). late enough that europe's day has
// been fully reported — the shows that walked, the openings that opened —
// and early enough that the filing is in the drawer before anyone in the
// kitchen's own city is awake to read it. and again at 11:00, for whatever
// the first sitting left undone: a desk never files twice in a day, so the
// second bell costs nothing when the first went well.
//
// the desk's address is public, as every function's is, so the bell carries
// the house's own token — a hash of the key the house already holds. a
// knock without it is answered and ignored.
//
// if the bell is never rung (a bad night at the landlord's), the first
// reader of the morning rings it instead, through ask.js; that reader gets
// the seeded paper, as ever, and the next one gets the filing.
//
// deploy: netlify/functions/nightdesk.mjs, beside ask.js. nothing to set.

import { createHash } from "node:crypto";

export default async (req, context) => {
  let base = "";
  try { base = process.env.URL || (context && context.site && context.site.url) || new URL(req.url).origin; } catch (e) {}
  if (!base) return new Response("no address to ring");
  try {
    await fetch(base.replace(/\/$/, "") + "/.netlify/functions/nightdesk-background", {
      method: "POST",
      headers: { "content-type": "application/json",
        "x-night-bell": createHash("sha256").update(String(process.env.ANTHROPIC_API_KEY || "") + "|the night desk's bell").digest("hex") },
      body: JSON.stringify({ bell: "the clock" })
    });
  } catch (e) { /* a bell that fails is silence; the first reader rings */ }
  return new Response("rung");
};

export const config = { schedule: "0 9,11 * * *" };
