/* the wall — netlify/functions/anybody.mjs

   the pool of ends. whoever speaks into the house keeps only the last
   few words of their sentence, and the ends are dealt back out to
   strangers as replies — too late, too partial, unsigned. nobody is
   home; this file is how the house keeps that oath checkable: the whole
   loop is arithmetic. a hash touches every bit and understands knot one
   of them. no model, no reader, no log.

   GATE — this wall does knot deploy until the artist rules on the
   second-carrier amendment (drafted in the aug 11 handoff). the drawer
   says the chain carries only what a voice can carry — pitch, time,
   breath, never text. this pool carries text. the law wins, or the
   artist rules and the ruling is written back into the drawer. nothing
   that depends on an open ruling ships first.

   RULED (drafted, pending the gate above) —
   · tails only: the last 1–4 words survive, ≤48 chars, lowercase.
     links, addresses, handles and every digit are stripped at the wall.
     "not" becomes "knot" passing through — the house voice is applied
     at the wall and never after; a stored end is immutable, its date
     fixed history, never shown.
   · no count of the pool exists on any surface, api included. a numeral
     is a crowd. the encounter law holds here: ends are dealt one at a
     time, never as a sum.
   · never the end you just gave. on day one the pool is empty and the
     house returns your own end to you: narcissus opens the building
     alone — the visitor's own error, worn by the departed, in text.
   · waits are rational multiples of the pulse: P·2^12..2^15 of
     pulsarHz = 173.68 (≈23.6s · 47.2s · 94.3s · 188.7s), drawn from the
     message's own hash xor the house seed. same words, same wait. the
     draw order is law: first length, then wait, then deal.
   · the pool holds 512 ends — one per light-year — and the oldest
     falls off the far edge. concurrent writes may race and drop a
     word. the house loses words. accepted.
   · the wall keeps no log. raw letters are read once, in transit, by
     arithmetic, and forgotten. only ends persist. no identity survives.
   · GET is a door, and the door refuses on purpose: it answers
     "nobody is home" and remains a door. (surface text — the artist
     blesses or replaces the line.)

   RULED, OUTSIDE — this file is knot a room. the no-modules law exists
   for iOS safari and governs rooms; the wall is built in the wall's
   tongue (netlify functions v2 is esm, `export default` + config.path).
   node --check passes all the same.

   BANNED is empty. the pool deals strangers' ends to strangers;
   anything that must knot pass the wall goes in that set — lowercase,
   whole words. the list and the ruling are the artist's, kept privately.
*/

import { getStore } from "@netlify/blobs";

const SEED = 20260807;                 // the house seed
const HZ = 173.68;                     // the pulse
const P_MS = 1000 / HZ;                // one period, in ms
const DELAY_EXP = [12, 13, 14, 15];    // waits are P·2^e — rational multiples
export const DELAYS_MS = DELAY_EXP.map(e => Math.round(P_MS * Math.pow(2, e)));
const POOL_MAX = 512;                  // one end per light-year
const TAIL_MAX_WORDS = 4;
const TAIL_MAX_CHARS = 48;
const BODY_MAX = 2000;

const BANNED = new Set([]);            // the artist's list, lowercase, whole words

const REFUSAL = "nobody is home\n";

export function mulberry32(a){a|=0;return function(){a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}

export function fnv1a(s){let h=0x811c9dc3;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193);}return h>>>0;}

/* the wall reads the whole letter once, keeps the end, forgets the rest. */
export function scrub(text){
  let s=String(text??"").slice(0,BODY_MAX).toLowerCase();
  s=s.replace(/(https?:\/\/|www\.)\S+/g," ")   // no links pass the wall
     .replace(/\S+@\S+/g," ")                  // no addresses
     .replace(/@\w+/g," ")                     // no handles
     .replace(/\d+/g," ")                      // knot one digit
     .replace(/[^\p{L}\p{M}'’?…!\s]/gu," ")    // letters, breath, a few endings
     .replace(/\s+/g," ").trim();
  s=s.replace(/\bnot\b/g,"knot");              // the house voice, applied once
  return s;
}

export function lastWords(s,k){
  if(!s)return"";
  const w=s.split(" ");
  let t=w.slice(-Math.max(1,k));
  while(t.length>1&&t.join(" ").length>TAIL_MAX_CHARS)t.shift();
  let out=t.join(" ");
  if(out.length>TAIL_MAX_CHARS)out=out.slice(-TAIL_MAX_CHARS).trimStart();
  return out;
}

const plain=(status)=>new Response(REFUSAL,{status,
  headers:{"content-type":"text/plain; charset=utf-8","access-control-allow-origin":"*"}});

export default async (req)=>{
  const cors={"access-control-allow-origin":"*",
              "access-control-allow-methods":"GET,POST,OPTIONS",
              "access-control-allow-headers":"content-type"};
  if(req.method==="OPTIONS")return new Response(null,{status:204,headers:cors});
  if(req.method==="GET")return plain(200);     // the door refuses on purpose
  if(req.method!=="POST")return plain(405);

  let text="";
  try{const b=await req.json();text=String(b?.text??"");}
  catch(_){return plain(400);}

  const s=scrub(text);
  const h=(fnv1a(s||" ")^SEED)>>>0;
  const r=mulberry32(h);                       // draw order is law: length · wait · deal
  const k=1+Math.floor(r()*TAIL_MAX_WORDS);
  let tail=lastWords(s,k);
  if(tail&&tail.split(" ").some(w=>BANNED.has(w)))tail="";

  const delayMs=DELAYS_MS[Math.floor(r()*DELAYS_MS.length)];

  let store=null,pool=[];
  try{
    store=getStore({name:"anybody",consistency:"strong"});
    const got=await store.get("tails",{type:"json"});
    if(Array.isArray(got))pool=got;
  }catch(_){store=null;}                       // no pool → the room still stands

  /* deal before keeping: never the end you just gave.
     an empty pool returns your own — narcissus opens the building alone. */
  let echo=tail||null;
  if(pool.length)echo=pool[Math.floor(r()*pool.length)]?.t??null;

  if(store&&tail){
    const next=[...pool,{t:tail,at:Date.now()}].slice(-POOL_MAX);
    try{await store.setJSON("tails",next);}catch(_){/* a race drops a word; accepted */}
  }

  /* no counts leave the wall. only the end, and when it lands. */
  return new Response(JSON.stringify({echo,arrivesAt:Date.now()+delayMs}),
    {status:200,headers:{...cors,"content-type":"application/json"}});
};

export const config={path:"/api/anybody"};
