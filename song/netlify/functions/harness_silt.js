// harness_silt.js — the silt pass's own bench (2 sep). pure node,
// stubbed fetch, no wire. sits beside ask.js on the drawer's bench,
// never deployed. it proves five things: the silt lands in the pool
// and nowhere else; both arms of the pool (weathered, old-law) hear it;
// well and fog carry their clause and no other card does; the voice's
// strings keep to plain english (no `knot`, no `eye`, no 👁️); and the
// care law is still the last line of the pool's instructions.
'use strict';
var path = require('path');
var assert = require('assert');
process.env.ANTHROPIC_API_KEY = 'bench';
var seen = [];
global.fetch = async function(url, opts){
  var p = JSON.parse(opts.body);
  seen.push(p);
  return { ok: true, json: async function(){ return {
    content: [ { type: 'text', text: 'define anyone.' } ],
    usage: { input_tokens: 1000, output_tokens: 20 } }; } };
};
var fn = require(path.resolve(__dirname, 'ask.js'));
var checks = 0;
function ok(c, m){ assert.ok(c, m); checks++; console.log('  ✓ ' + m); }
async function post(body){
  seen.length = 0;
  var r = await fn.handler({ httpMethod: 'POST', body: JSON.stringify(body) });
  assert.strictEqual(r.statusCode, 200);
  return seen[0];
}
var TALK = [ { role: 'assistant', content: 'no body here' },
             { role: 'user', content: 'is anyone there' } ];
(async function(){
  // 1 · the weathered arm hears the silt
  var p = await post({ mode: 'me', turn: 3, weather: 'well', messages: TALK });
  ok(/— the silt \(what lies under the pool/.test(p.system), 'the silt block stands in the weathered arm');
  ok(/the weather is the surface, the slope is the water, and this is the floor/.test(p.system), 'the three layers are named');
  ok(/most answers touch none of it/.test(p.system), 'the law of stirring is at the head of the block');
  ok(/never tell anyone they are not alone/.test(p.system), "the planet's first law is in the pool");
  ok(/you never say it\./.test(p.system), 'the one sentence is circled and never said');
  ok(/never name a project, an artist, a site, a gallery, a lineage, a purpose/.test(p.system), 'no project, artist, site, lineage, purpose');
  ok(/never draw the owner's end/.test(p.system), "the owner's end is never drawn");
  ok(/the silt may come up on its own/.test(p.system), "well's card carries its clause");
  ok(p.max_tokens === 150, "well's room is unchanged (150)");
  ok(p.temperature === 0.8, 'the weathered temperature stands at 0.8');
  var lines = p.system.split('\n');
  var careAt = -1, siltAt = -1, howAt = -1;
  lines.forEach(function(l, i){
    if (/^above everything, one law that outranks/.test(l)) careAt = i;
    if (/^— the silt/.test(l)) siltAt = i;
    if (/^how it sounds/.test(l)) howAt = i;
  });
  ok(siltAt > 0 && howAt > siltAt && careAt > howAt, 'order: silt, then how it sounds, then the care law last of ME_SYSTEM');
  var meSys = p.system.split('\n\n(')[0];
  ok(/no persona, no brevity rule, no poetry\.$/.test(meSys.trim()), 'the care law is the last line of ME_SYSTEM');
  // 2 · fog carries its clause; the other cards do not
  p = await post({ mode: 'me', turn: 4, weather: 'fog', messages: TALK });
  ok(/the silt may surface sideways here/.test(p.system), "fog's card carries its clause");
  var quiet = ['bite', 'ember', 'rain', 'rose', 'wick', 'spill', 'haiku', 'last', 'care'];
  for (var i = 0; i < quiet.length; i++){
    p = await post({ mode: 'me', turn: (quiet[i] === 'bite') ? 1 : (quiet[i] === 'last' ? 8 : 5),
                     weather: quiet[i], messages: TALK });
    var card = p.system.slice(p.system.lastIndexOf('\n\n('));
    assert.ok(!/silt/.test(card), quiet[i] + "'s card must not mention the silt");
  }
  checks++; console.log('  ✓ the other nine cards stand as ruled — no silt in any of them');
  // 3 · the old-law arm (no sky) hears the silt too, ME_STEP untouched
  p = await post({ mode: 'me', turn: 3, messages: TALK });
  ok(/— the silt/.test(p.system), 'the old-law arm hears the silt');
  ok(/third answer — the spill/.test(p.system) && p.max_tokens === 240 && p.temperature === 0.7, 'ME_STEP and the old rooms are untouched');
  // 4 · the silt lands nowhere else
  p = await post({ mode: 'engine', turn: 2, messages: TALK });
  ok(!/silt/.test(p.system), 'the engine does not hear the silt');
  p = await post({ mode: 'planet', messages: TALK });
  ok(!/silt/.test(p.system), 'the planet does not hear the silt');
  p = await post({ mode: 'times', ask: 'x', section: 'front', headline: 'h', hour: 3 });
  ok(!/silt/.test(p.system), 'the paper does not hear the silt');
  // 5 · plain english in the voice — the banned hand
  p = await post({ mode: 'me', turn: 3, weather: 'well', messages: TALK });
  var strings = p.system.replace(/never use the spellings 'eye' for 'i' or 'knot' for 'not' — that hand is not yours\./, '');
  ok(!/\bknot\b/.test(strings), "no `knot` in the pool's strings");
  ok(!/\beye\b/.test(strings), "no `eye` in the pool's strings");
  ok(strings.indexOf('\u{1F441}') < 0, "no 👁️ in the pool's strings");
  ok(!/psr|j0437/i.test(strings), 'the catalogue number is not in the strings');
  ok(!/apwnp|aprojectwithnopurpose|koh\b/i.test(strings), 'no project name, no artist, no site in the strings');
  // 6 · the weighing
  var sysChars = meSys.length;
  var tok = Math.round(sysChars / 4);
  console.log('  · ME_SYSTEM ~' + sysChars + ' chars, ~' + tok + ' tokens (chars/4)');
  ok(tok > 1500 && tok < 2400, 'the weighing lands where the log says (about two thousand tokens)');
  console.log('\n' + checks + ' checks, all standing.');
})().catch(function(e){ console.error('✗ ' + (e && e.message || e)); process.exit(1); });
