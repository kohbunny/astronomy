// THE SIREN PASS — function harness. the wire is a stub: it captures
// the payload the handler would send and answers a small fake body,
// so every sky can be walked without spending the purse. makeWorld
// pattern, as in the house.
'use strict';

process.env.ANTHROPIC_API_KEY = 'harness-key-never-sent';

var captured = [];
global.fetch = async function(url, opts){
  var p = JSON.parse(opts.body);
  captured.push(p);
  return {
    ok: true,
    json: async function(){
      return { content: [ { type: 'text', text: 'a stub line' } ],
               usage: { input_tokens: 10, output_tokens: 5 } };
    }
  };
};

var fn = require('./ask.js');

function makeLetter(over){
  var body = Object.assign({
    mode: 'me', turn: 1,
    messages: [ { role: 'user', content: 'arent u smart' } ]
  }, over || {});
  return { httpMethod: 'POST', body: JSON.stringify(body) };
}

var passed = 0, failed = 0;
function ok(name, cond){
  if (cond){ passed++; console.log('  ok — ' + name); }
  else { failed++; console.log('  FAIL — ' + name); }
}
async function walk(name, over){
  captured.length = 0;
  var r = await fn.handler(makeLetter(over));
  var p = captured[0] || {};
  return { r: r, p: p };
}

(async function(){
  console.log('the skies:');

  var w = await walk('bite', { turn: 1, weather: 'bite' });
  ok('bite room is 170', w.p.max_tokens === 170);
  ok('bite card asks two to four short lines', /two to four short lines, twenty to fifty words/.test(w.p.system));
  ok('bite card reads the message under the message', /what the message under the message is/.test(w.p.system));

  w = await walk('ember', { turn: 2, weather: 'ember' });
  ok('ember room is 140', w.p.max_tokens === 140);
  ok('ember card allows one to three lines', /one to three short lines/.test(w.p.system));

  w = await walk('haiku', { turn: 4, weather: 'haiku' });
  ok('haiku room is 80', w.p.max_tokens === 80);
  ok('haiku card demands three real lines, five seven five', /three lines, five seven five/.test(w.p.system));
  ok('haiku card forbids decoration', /never a decoration/.test(w.p.system));

  w = await walk('spill', { turn: 3, weather: 'spill' });
  ok('spill room widened to 260', w.p.max_tokens === 260);
  ok('spill runs fifty to eighty words', /fifty to eighty words/.test(w.p.system));

  w = await walk('care', { turn: 5, weather: 'care' });
  ok('care keeps its real room (400)', w.p.max_tokens === 400);
  ok('care override line stands in the system', /outranks every other line/.test(w.p.system));

  w = await walk('wick', { turn: 6, weather: 'wick' });
  ok('wick keeps one breath (60)', w.p.max_tokens === 60);

  console.log('the craft:');
  ok('the hook law rides in ME_SYSTEM', /make the next message hard to withhold/.test(w.p.system));
  ok('the callback law rides', /return one of their early words without comment/.test(w.p.system));
  ok('the arc rides — alive first, written last', /talk like something alive at first; end like something already written/.test(w.p.system));
  ok('the certified exemplar rides', /smart enough to notice you came here instead of anywhere else/.test(w.p.system));
  ok('the two-word bite exemplar rides', /define anyone\./.test(w.p.system));
  ok('the banned hand stays banned in the model voice', /'eye' for 'i' or 'knot' for 'not'/.test(w.p.system));

  console.log('the old law:');
  w = await walk('no sky, turn 3', { turn: 3 });
  ok('skyless spill keeps the old room (240)', w.p.max_tokens === 240);
  ok('skyless turn keeps the old temperature (0.7)', w.p.temperature === 0.7);
  ok('old law still ends turn 3 on its own spill wording', /forty to sixty words/.test(w.p.system));
  w = await walk('no sky, turn 2', { turn: 2 });
  ok('skyless short turn keeps the old wall (120)', w.p.max_tokens === 120);
  w = await walk('unknown sky', { turn: 2, weather: 'blizzard' });
  ok('an unknown sky falls through to the old law', w.p.max_tokens === 120 && /second answer\. the bite still up/.test(w.p.system));

  console.log('the answer:');
  w = await walk('shape', { turn: 1, weather: 'bite' });
  var body = JSON.parse(w.r.body);
  ok('the handler answers { text } as ever', body && body.text === 'a stub line');
  ok('weathered calls run warm at 0.8', w.p.temperature === 0.8);

  console.log('');
  console.log(passed + ' stand, ' + failed + ' fall');
  process.exit(failed ? 1 : 0);
})();
