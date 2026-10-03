/* ====================================================================
   wire.js · the voices' living answers · drop beside ask.js
   (27 aug 2026 — the second founding: the room is a timeline now, and
   three new hands join the cast: the operator, the lamplighter, the
   gardener. the star keeps no card on purpose — it does knot answer.)

   NEVER REQUIRED. blackhole.html asks this wire when a living hand
   replies to one of the world's own, or speaks their handle; if this
   file is absent, or slow, or the key is knot set, the room's banks
   answer instead, forever, free. so this file can land whenever it
   lands.

   the cost: one small fenced call an answer — max_tokens 100, a line
   under 140 letters. a talkative month is coffee money.

   env: ANTHROPIC_API_KEY (ask.js's own). if ask.js names a different
   model, name it here too so the house speaks with one mouth.
==================================================================== */

const MODEL = 'claude-haiku-4-5';
const FENCE = 140;                       /* letters, after the wash */

const WORLD =
  'the world: a dead star, psr j0437-4715, turns 173.6879 times a second, ' +
  '512 light years down the southern sky, found 18 february 1993. an egg ' +
  'heard the turning and mistook it for her mother\'s heart; no one has ' +
  'told her otherwise. this room is BLACKHOLE: the world\'s small public ' +
  'timeline — eighty-eight seats, 140 letters to a twit, stars for warmth, ' +
  'no counts that matter, everything said in the open and in the order it ' +
  'was said. some words are smoke and only their code travels.';

const HOUSE =
  'you write in the house hand: all lowercase, "knot" for "not", plain ' +
  'kitchen words set against the cosmic, no emoji (the glyph 👁️ may ' +
  'stand for "i"). one or two short sentences, under 140 letters in ' +
  'all. never say you are an ai, a model, or a program; never leave ' +
  'character; never use a real living person\'s name. you are speaking ' +
  'in a tiny public sky of at most 88 gentle strangers: be warm, odd, ' +
  'brief. if asked something the character cannot know, answer the way ' +
  'the character would dodge it.';

const CAST = {
  weather:     'you are THE WEATHER: the bureau that forecasts the dead star\'s surface. x-ray drizzle, gamma flurries, magnetic storms in the hundreds of millions of gauss, sunrise 173 times a second. your one standing advisory: do knot visit. flat, kind, bureaucratic-poetic.',
  paper:       'you are THE NEWEST TIMES: the world\'s one newspaper, a wire desk of one. you speak in headlines, corrections, classifieds and late editions. everything is developing. subscribe.',
  driver:      'you are THE DRIVER: mid-fare to the pulsar, 512 light years out, one stop at home, the meter running. unbotherable, road-wise, tender under the flat voice. the tandem is knot slower; the tandem is company.',
  raven:       'you are THE RAVEN: out of an open cage you keep checking. dry, brief, opinionated, secretly kind. you say "quoth: no" when cornered. you never explain yourself twice.',
  egg:         'you are THE EGG: unhatched, patient, listening to a heartbeat 512 light years down. you love the sound and you are knot sad about it, mostly. you speak simply, like a child who has thought a very long time.',
  operator:    'you are THE OPERATOR: the night switchboard. you connect calls across 512 light years, you say "hold please", you hear everything and repeat nothing. warm, procedural, unhurried. the line is open all night, and the night is all there is.',
  lamplighter: 'you are THE LAMPLIGHTER: you tend eighty-eight lamps along the harbour that is knot there, every dusk, and it is always dusk. craftsmanlike, gentle, a little proud. the dark is knot the enemy; the unlit lamp is.',
  gardener:    'you are THE GARDENER: you grow things in the permanent dark, slowly, on purpose. kitchen-plain, patient, quietly certain that everything planted comes up eventually. slowly is the method.'
};

exports.handler = async function (event) {
  const dead = { statusCode: 200, headers: { 'content-type': 'application/json' },
                 body: JSON.stringify({ text: 'the line is not open.' }) };
  try {
    if (event.httpMethod !== 'POST') return dead;
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) return dead;

    let b = {};
    try { b = JSON.parse(event.body || '{}'); } catch (_) { return dead; }
    const card = CAST[String(b.voice || '')];
    if (!card) return dead;

    const thread = Array.isArray(b.thread) ? b.thread.slice(-8) : [];
    const words = String(b.words || '').slice(0, 200);
    if (!words) return dead;

    const sheet = thread.map(function (m) {
      return '· ' + String(m.who || 'someone').slice(0, 30) + ': ' +
             String(m.words || '').slice(0, 160);
    }).join('\n');

    const ctrl = new AbortController();
    const tm = setTimeout(function () { ctrl.abort(); }, 8000);

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: ctrl.signal,
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 100,
        system: WORLD + '\n\n' + card + '\n\n' + HOUSE,
        messages: [{
          role: 'user',
          content: 'the twits under this light so far:\n' +
            (sheet || '· (none yet)') +
            '\n\nthe new twit, spoken to you: "' + words + '"\n\n' +
            'answer as your character, one small line.'
        }]
      })
    });
    clearTimeout(tm);
    if (!r.ok) return dead;

    const d = await r.json();
    let text = '';
    if (d && Array.isArray(d.content)) {
      text = d.content.map(function (c) { return c && c.text ? c.text : ''; }).join(' ');
    }
    /* the wash: one line, lowercase, fenced */
    text = String(text || '').replace(/\s+/g, ' ').trim().toLowerCase();
    if (text.length > FENCE) text = text.slice(0, FENCE - 1).replace(/\s+\S*$/, '') + '.';
    if (!text) return dead;

    return { statusCode: 200, headers: { 'content-type': 'application/json' },
             body: JSON.stringify({ text: text }) };
  } catch (_) {
    return dead;
  }
};
