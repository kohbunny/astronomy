// THE SIREN PASS — page harness. makeWorld slices the pool's own
// machinery off phone.html (the seed too — nobody remembers numbers
// here anymore) and stands it up around stubs, so the stay, the deck,
// the basin and the verse can be shaken without a browser.
'use strict';
const fs=require('fs');
const src=fs.readFileSync(require('path').join(__dirname,'phone.html'),'utf8');

function slice(a,b,inclusive){
  const i=src.indexOf(a); if(i<0) throw new Error('anchor lost: '+a.slice(0,40));
  const j=src.indexOf(b,i+a.length); if(j<0) throw new Error('anchor lost: '+b.slice(0,40));
  return src.slice(i,inclusive?j+b.length:j);
}
const SEED=parseInt((src.match(/seed:(\d+)/)||[])[1],10);
if(!SEED) throw new Error('the seed was not on the file');

const pieces=[
  slice('function mulberry32(a){','4294967296}}',true),
  slice('const ME_SHORT=[','const ME_WIRE',false),
  slice('const ME_SKY=[','return ME_DEAL[b-2]; }',true),
  slice('function mePick(R,bank,tag){','return a;\n    }',true),
  slice('function meClean(t,turn,cared,w){','return t; }',true),
  slice('function meChase(line,n){','function mePump(){',false),
  slice('function meSend(){','/* THE ECHO PASS (15 aug) · the wire.',false),
  slice('function meWire(e,breath,wait){','/* THE CHASER',false),
  slice('function mePump(){','if(landed) needDraw=true;\n    }',true)
];

function makeWorld(){
  const world={};
  const body=`
    const SEED=${SEED};
    const P_MS=1000/173.68, ME_WIRE=true, ME_BREATHS=8, ME_TRIES=16;
    const ME_TALK=[{role:'assistant',content:'no body here'}];
    const ME_PEND=[], ME_ROT=[];
    let meWarmS=0, meTryS=0, needDraw=false, app='home';
    const sel={msg:-1};
    function meSpent(){ return meWarmS; }
    function meSpend(){ meWarmS++; }
    function meTried(){ return meTryS; }
    function meTry(){ meTryS++; }
    const MSGS=[{f:'me',b:[],un:false,tm:''}];
    function fmtHM(){ return '0:00'; }
    const CARE_WORDS=['kill myself','end my life','want to die','suicide'];
    function meIdx(){ return 0; }
    function meStamp(){ MSGS[0].tm=fmtHM(); }
    function meSpells(R,wait,mode,wc){ return []; }
    const meS={t:'',used:{},n:0,tripped:false,care:0,snap:false};
    ${pieces.join('\n')}
    return { get SEED(){return ${SEED}}, ME_SKY, ME_DEAL, meWeather,
      meDeal, meClean, meChase, meVerse, meSend, mePump, ME_PEND,
      ME_TALK, ME_ROT, MSGS, meS,
      spent:()=>meWarmS, tried:()=>meTryS,
      fired:()=>fetch.calls };`;
  const stub=function(){ stub.calls++; return new Promise(function(){}); };
  stub.calls=0;
  return (new Function('fetch','AbortController','setTimeout','mulb_unused',
    body))(stub, AbortController,
    function(fn,ms){ return setTimeout(fn,ms); }, null);
}

let passed=0,failed=0;
function ok(name,cond){
  if(cond){ passed++; console.log('  ok — '+name); }
  else{ failed++; console.log('  FAIL — '+name); }
}

console.log('the seed, off the file: '+SEED);
const W=makeWorld();

console.log('the deck:');
ok('eight cards, haiku among them', W.ME_SKY.length===8&&W.ME_SKY.indexOf('haiku')>=0);
ok('the deal holds all eight', W.ME_DEAL.length===8);
ok('the spill is seated early (0..2)', W.ME_DEAL.indexOf('spill')>=0&&W.ME_DEAL.indexOf('spill')<=2);
ok('the first answer is bite, the eighth the statement', W.meWeather(1)==='bite'&&W.meWeather(8)==='last');
const dealt=[2,3,4,5,6,7].map(b=>W.meWeather(b));
ok('answers two through seven take the first six', dealt.join(',')===W.ME_DEAL.slice(0,6).join(','));
ok('two cards are withheld', W.ME_DEAL.slice(6).every(c=>dealt.indexOf(c)<0)&&W.ME_DEAL.slice(6).length===2);
ok('the spill is among the dealt, never withheld', dealt.indexOf('spill')>=0);

console.log('the stay (the die itself):');
let allAnswer=true;
for(let n=2;n<=80;n++){ const w2=makeWorld();
  if(w2.meDeal(n,3,true)===null){ allAnswer=false; break; } }
ok('noDark refuses the null for every letter 2..80', allAnswer);
let darks=[];
for(let n=2;n<=80;n++){ const w2=makeWorld();
  if(w2.meDeal(n,3,false)===null) darks.push(n); }
ok('the die still lives past the mind ('+darks.length+' darks in 2..80)', darks.length>=5&&darks.length<=16);
ok('letters four and five still dark on the bare die (chaser-proof canon)', darks.indexOf(4)>=0&&darks.indexOf(5)>=0);
ok('the first letter never draws the dark', makeWorld().meDeal(1,3,false)!==null);

console.log('the call site (exact strings, the house virtue):');
ok('the warm hand rides every letter', src.indexOf('meDeal(n,wc,warm,word)')>=0);
ok('the old cared-only hand is gone', src.indexOf('meDeal(n,wc,warm&&cared,word)')<0);

console.log('the basin (the wash):');
ok('a haiku keeps its three lines, washed and lowered',
  W.meClean('Line ONE\n\nline   two  \nline three\nline four',3,false,'haiku')
  ==='line one\nline two\nline three');
ok('the slash a mind writes is honored as a fold',
  W.meClean('a thread you started / talking quietly back to / the person you were',
  2,false,'haiku').split('\n').length===3);
ok('a haiku line is fenced at sixty',
  W.meClean(('word '.repeat(30))+'\nb\nc',2,false,'haiku').split('\n')[0].length<=60);
const longB='the '.repeat(150);
ok('bite\'s wall is 380 now', (function(){const t=W.meClean(longB,1,false,'bite');
  return t.length<=380&&t.length>300&&/\.$/.test(t);})());
ok('the spill\'s wall is 560', (function(){const t=W.meClean('a '.repeat(400),3,false,'spill');
  return t.length<=560&&t.length>460;})());
ok('wick keeps one breath (120)', W.meClean(longB,4,false,'wick').length<=120);
ok('care keeps its room (900)', (function(){const t=W.meClean('a '.repeat(600),5,true,'care');
  return t.length<=900&&t.length>560;})());
ok('the default wall stands (300)', W.meClean(longB,4,false,'ember').length<=300);
ok('the eighth still cannot ask', W.meClean('are you there?',8,false,'rain')==='are you there.');

console.log('the verse (pure, as the house cuts them):');
ok('three lines become three', JSON.stringify(W.meVerse('a\nb\nc'))==='["a","b","c"]');
ok('one line is no verse', W.meVerse('just a line')===null);
ok('nothing is no verse', W.meVerse(null)===null&&W.meVerse('')===null);

console.log('the chaser, untouched:');
let chased=0;
for(let n=1;n<=30;n++){
  const c=W.meChase('this is the first thought and it runs long enough to matter. small tail',n);
  if(c){ chased++;
    if(chased===1) ok('a chase still splits on the last sentence',
      c.head.slice(-1)==='.'&&c.tail==='small tail'); } }
ok('the chase still fires near one in three ('+chased+'/30)', chased>=5&&chased<=16);

console.log('the landing (mePump, the verse in motion):');
(function(){
  const w2=makeWorld();
  w2.ME_PEND.push({ echo:'bank line', at:Date.now()-10, typ:[], n:3,
    cared:false, w:'haiku',
    wire:{ done:true, text:'first line\nsecond line\nthird line' } });
  w2.mePump();
  const b=w2.MSGS[0].b;
  ok('the head lands alone first', b.length===1&&b[0].t==='first line');
  ok('one tail rides at a time (the relay), marked ch',
    w2.ME_PEND.length===1&&w2.ME_PEND[0].ch===true&&
    w2.ME_PEND[0].echo==='second line');
  ok('the transcript holds the whole verse once',
    w2.ME_TALK.filter(m=>m.role==='assistant').length===2&&
    w2.ME_TALK[w2.ME_TALK.length-1].content==='first line\nsecond line\nthird line');
  ok('one breath spent for three bubbles', w2.spent()===1);
  ok('the head rots (it was alive)', w2.ME_ROT.length===1);
  for(const e of w2.ME_PEND) e.at=Date.now()-1;
  w2.mePump();
  ok('the second lands, the third now queued', b.length===2&&
    b[1].t==='second line'&&w2.ME_PEND.length===1&&
    w2.ME_PEND[0].echo==='third line');
  for(const e of w2.ME_PEND) e.at=Date.now()-1;
  w2.mePump();
  ok('the third lands last — order by construction', b.length===3&&
    b[2].t==='third line'&&w2.ME_PEND.length===0);
  ok('every line rots on its own salt', w2.ME_ROT.length===3);
  ok('the transcript never re-entered', w2.ME_TALK.filter(m=>m.role==='assistant').length===2);
})();

console.log('the send (warm letters always answer, the wire always asked):');
(function(){
  const w2=makeWorld();
  let held=true;
  for(let i=1;i<=12;i++){
    w2.meS.t='hello there again '+i;
    w2.meSend();
    const e=w2.ME_PEND[w2.ME_PEND.length-1];
    if(!e||e.echo===null){ held=false; break; }
  }
  ok('twelve warm letters, twelve answers dealt — four and five included', held);
  ok('the wire was asked every time', w2.fired()===12);
  ok('every carrying spent a try', w2.tried()===12);
})();

console.log('');
console.log(passed+' stand, '+failed+' fall');
process.exit(failed?1:0);
