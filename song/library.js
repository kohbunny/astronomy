/* library.js · THE SOUND BOOK'S LIBRARY, LENT TO THE RIVER (29 sep 2026)
   ==========================================================================
   songbook.html's sound book — the band of 124 stations that tunes in time
   (the first sound … this afternoon) and the small audio kit every station
   is built from — LIFTED OUT so the river (river.js) may borrow a station
   as a COLOUR under its bed, one at a time, his ruling of 29 sep: "the
   library's colour: all". nothing here sounds on its own and nothing here
   opens a context: the river hands this file its context and a bus
   (LIBRARY.use(ctx)), asks for a station (LIBRARY.play(id, out, seed)),
   walks its loops from its own tick (LIBRARY.tick()) and kills it
   (LIBRARY.stop(handle)). one line in the head, AFTER river.js:

       <script src="library.js"></script>

   with this file missing the river's own small bank of eras stands in
   (river.js, ERAS) and nothing says so.
   [SYNC] songbook.html: the STATIONS (between the markers <STATIONS> and
   </STATIONS>) and the kit (makeKit · noiseBuf · irBuf · VOWEL · midi · nn ·
   hz · seqPlay · morseKey) are the book's own, copied here by the bench's
   script (lib/extract.js) — the book is the one copy; re-run the script when
   the book changes. the long articles (note · pic · card · how) stay in the
   book: the river borrows sound, knot prose.
   THE ONE DELIBERATE CHANGE: midi() asks LIBRARY.tune first — the river
   hands it the star's just ladder, so every note a station makes in the
   river is a rung of hers (a half-step at most). in the book, untouched.
   no Math.random where the wheel exists: the kit's own seeded hand (R) is
   the stations' die; noiseBuf keeps Math.random for its grains, as the book
   does (a grain is knot a choice).
   ========================================================================== */
(function(){
'use strict';
const LIB={ build:'library 29sep2026 · 1', tune:null, ctx:null };
let ctx=null;
const midi=n=>{ const f=440*Math.pow(2,(n-69)/12); return (LIB.tune&&typeof LIB.tune==='function')?LIB.tune(f):f; };
function nn(s){ const m=/^([A-Ga-g])([#b]?)(-?\d+)$/.exec(s); if(!m) return 60; const base={c:0,d:2,e:4,f:5,g:7,a:9,b:11}[m[1].toLowerCase()]; return 12*(+m[3]+1)+base+(m[2]==='#'?1:(m[2]==='b'?-1:0)); }
const hz=s=>midi(typeof s==='number'?s:nn(s));
function clamp(v,a,b){ return v<a?a:(v>b?b:v); }
function seqPlay(list,at,unit,fn){ let t=at; for(const n of list){ if(n[0]) fn(n[0],t,n[1]*unit); t+=n[1]*unit; } return t; }
const MORSE={a:'.-',b:'-...',c:'-.-.',d:'-..',e:'.',f:'..-.',g:'--.',h:'....',i:'..',j:'.---',k:'-.-',l:'.-..',m:'--',n:'-.',o:'---',p:'.--.',q:'--.-',r:'.-.',s:'...',t:'-',u:'..-',v:'...-',w:'.--',x:'-..-',y:'-.--',z:'--..',' ':' '};
function morseKey(text,at,dot,fn){ let t=at; for(const ch of text.toLowerCase()){ const c=MORSE[ch]; if(c==null) continue; if(c===' '){ t+=dot*4; continue; } for(const s of c){ const d=s==='.'?dot:dot*3; fn(t,d); t+=d+dot; } t+=dot*2; } return t; }
function mulberry32(a){ return function(){ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
function hashStr(s){ let h=2166136261; for(let i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); } return h>>>0; }
const TAU=Math.PI*2;   /* the book's own constant, two of its stations reach for it */
/* ---- the kit, the book's own (songbook.html, THE AUDIO KIT) ---- */
const NOISE={};                                   // noise buffers by colour
const IRS={};                                     // impulse responses by seconds
function noiseBuf(color){
  if(NOISE[color]) return NOISE[color];
  const sr=ctx.sampleRate, n=sr*2, b=ctx.createBuffer(2,n,sr);
  for(let ch=0;ch<2;ch++){
    const d=b.getChannelData(ch);
    let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0,last=0;
    for(let i=0;i<n;i++){
      const w=Math.random()*2-1;
      if(color==='white'){ d[i]=w; }
      else if(color==='pink'){
        b0=0.99886*b0+w*0.0555179; b1=0.99332*b1+w*0.0750759; b2=0.96900*b2+w*0.1538520;
        b3=0.86650*b3+w*0.3104856; b4=0.55000*b4+w*0.5329522; b5=-0.7616*b5-w*0.0168980;
        d[i]=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.11; b6=w*0.115926;
      }else{ last=(last+0.02*w)/1.02; d[i]=last*3.5; }   // brown
    }
  }
  NOISE[color]=b; return b;
}
function irBuf(sec){
  const key=Math.round(sec*10);
  if(IRS[key]) return IRS[key];
  const sr=ctx.sampleRate, n=Math.max(1,Math.floor(sr*sec)), b=ctx.createBuffer(2,n,sr);
  const k=6.9/sec;
  for(let ch=0;ch<2;ch++){ const d=b.getChannelData(ch);
    for(let i=0;i<n;i++){ const t=i/sr; d[i]=(Math.random()*2-1)*Math.exp(-k*t)*(i<200?i/200:1); } }
  IRS[key]=b; return b;
}
const VOWEL={ a:[800,1150,2900], e:[400,1600,2700], i:[300,2300,3000], o:[450,800,2830], u:[325,700,2530], m:[250,1000,2400] };

function makeKit(out,seed){
  const K={ out:out, nodes:new Set(), timers:[], loops:[], alive:true };
  const R=mulberry32(seed|0);
  K.r=()=>R(); K.rr=(a,b)=>a+(b-a)*R(); K.pick=a=>a[Math.floor(R()*a.length)];
  K.now=()=>ctx.currentTime;
  K.reg=n=>{ K.nodes.add(n); return n; };
  /* `to` is where a node goes: a node, nothing (the station's out), or
     false (left unconnected, for a station wiring its own loop). */
  K.gain=(v,to)=>{ const g=ctx.createGain(); g.gain.value=(v==null?1:v); if(to!==false) g.connect(to||out); return K.reg(g); };
  K.filt=(type,f,q,to)=>{ const b=ctx.createBiquadFilter(); b.type=type; b.frequency.value=f; b.Q.value=(q==null?0.8:q); if(to!==false) b.connect(to||out); return K.reg(b); };
  K.pan=(x,to)=>{ if(!ctx.createStereoPanner) return K.gain(1,to); const p=ctx.createStereoPanner(); p.pan.value=x; if(to!==false) p.connect(to||out); return K.reg(p); };
  K.delay=(t,to)=>{ const d=ctx.createDelay(4); d.delayTime.value=t; if(to!==false) d.connect(to||out); return K.reg(d); };
  K.shape=(amt,to)=>{ const s=ctx.createWaveShaper(); const n=1024, c=new Float32Array(n);
    for(let i=0;i<n;i++){ const x=i*2/n-1; c[i]=(1+amt)*x/(1+amt*Math.abs(x)); } s.curve=c; s.connect(to||out); return K.reg(s); };
  /* attack · decay · sustain · release on a param. dur = seconds from `at`
     to the release; null = until kill. */
  K.adsr=(p,at,peak,a,d,s,r,dur)=>{
    a=a==null?0.01:a; d=d||0; s=s==null?1:s; r=r==null?0.08:r;
    try{ p.cancelScheduledValues(at); }catch(_){}
    p.setValueAtTime(0.0001,at);
    p.linearRampToValueAtTime(peak,at+a);
    if(d>0) p.setTargetAtTime(peak*s,at+a,Math.max(0.005,d/3));
    if(dur!=null) p.setTargetAtTime(0.0001,at+dur,Math.max(0.005,r/3));
  };
  K.osc=o=>{ o=o||{}; const at=o.at==null?ctx.currentTime:o.at;
    const x=ctx.createOscillator(); x.type=o.type||'sine'; x.frequency.value=o.f||220; if(o.det) x.detune.value=o.det;
    const g=ctx.createGain(); g.gain.value=0; x.connect(g); g.connect(o.to||out); K.reg(x); K.reg(g);
    const r=o.r==null?0.08:o.r;
    K.adsr(g.gain,at,o.g==null?0.2:o.g,o.a,o.d,o.s,r,o.dur);
    if(o.glide){ x.frequency.setValueAtTime(o.f||220,at); x.frequency.exponentialRampToValueAtTime(Math.max(1,o.glide[0]),at+o.glide[1]); }
    x.start(at);
    if(o.dur!=null){ x.stop(at+o.dur+r*4+0.05); x.onended=()=>{ try{ x.disconnect(); g.disconnect(); }catch(_){} K.nodes.delete(x); K.nodes.delete(g); }; }
    return { o:x, g:g };
  };
  K.note=(f,at,dur,o)=>K.osc(Object.assign({},o||{},{ f:(typeof f==='string'?hz(f):f), at:at, dur:dur }));
  K.chord=(fs,at,dur,o)=>fs.map(f=>K.note(f,at,dur,o));
  /* a note with a body: fundamental + a few partials falling off, so a
     "string" or "reed" is one call. part = [[mult,amp],...] */
  K.rich=(f,at,dur,o)=>{ o=o||{}; f=(typeof f==='string'?hz(f):f);
    const part=o.part||[[1,1],[2,0.5],[3,0.25],[4,0.12]]; const g=o.g==null?0.2:o.g;
    return part.map(p=>K.osc(Object.assign({},o,{ f:f*p[0], at:at, dur:dur, g:g*p[1], type:o.type||'sine' }))); };
  K.noise=o=>{ o=o||{}; const at=o.at==null?ctx.currentTime:o.at;
    const s=ctx.createBufferSource(); s.buffer=noiseBuf(o.color||'white'); s.loop=true; if(o.rate) s.playbackRate.value=o.rate;
    let head=s;
    if(o.bp){ const b=K.filt('bandpass',o.bp,o.q==null?1:o.q,null); head.connect(b); head=b; }
    if(o.lp){ const b=K.filt('lowpass',o.lp,o.q==null?0.7:o.q,null); head.connect(b); head=b; }
    if(o.hp){ const b=K.filt('highpass',o.hp,o.q==null?0.7:o.q,null); head.connect(b); head=b; }
    const g=ctx.createGain(); g.gain.value=0; head.connect(g); g.connect(o.to||out); K.reg(s); K.reg(g);
    const r=o.r==null?0.08:o.r;
    K.adsr(g.gain,at,o.g==null?0.2:o.g,o.a,o.d,o.s,r,o.dur);
    s.start(at,K.r()*1.5);
    if(o.dur!=null){ s.stop(at+o.dur+r*4+0.05); s.onended=()=>{ try{ s.disconnect(); g.disconnect(); }catch(_){} K.nodes.delete(s); K.nodes.delete(g); }; }
    return { s:s, g:g, head:head };
  };
  /* drums */
  K.kick=(at,g,o)=>{ o=o||{}; const x=K.osc({ f:o.f||150, at:at, dur:o.dur||0.28, g:g==null?0.7:g, a:0.002, d:0.25, s:0.0, r:0.05, to:o.to });
    x.o.frequency.setValueAtTime(o.f||150,at); x.o.frequency.exponentialRampToValueAtTime(o.f2||42,at+0.09); return x; };
  K.snare=(at,g,o)=>{ o=o||{}; K.noise({ at:at, dur:0.16, g:(g==null?0.35:g), bp:o.bp||1800, q:0.6, a:0.001, d:0.14, s:0, r:0.04, to:o.to });
    K.osc({ f:o.f||190, at:at, dur:0.09, g:(g==null?0.35:g)*0.6, a:0.001, d:0.08, s:0, r:0.03, to:o.to }); };
  K.hat=(at,g,open,o)=>{ o=o||{}; K.noise({ at:at, dur:open?0.32:0.045, g:(g==null?0.18:g), hp:o.hp||7000, q:0.7, a:0.001, d:open?0.3:0.04, s:0, r:0.02, to:o.to }); };
  K.clap=(at,g,o)=>{ for(let i=0;i<3;i++) K.noise({ at:at+i*0.011, dur:0.03, g:(g==null?0.3:g)*(i===2?1:0.5), bp:1400, q:0.9, a:0.001, d:0.02, s:0, r:0.01, to:o&&o.to });
    K.noise({ at:at+0.03, dur:0.14, g:(g==null?0.3:g)*0.7, bp:1300, q:0.8, a:0.001, d:0.12, s:0, r:0.03, to:o&&o.to }); };
  K.tom=(at,f,g,o)=>{ const x=K.osc({ f:f, at:at, dur:0.3, g:g==null?0.5:g, a:0.002, d:0.28, s:0, r:0.05, to:o&&o.to });
    x.o.frequency.setValueAtTime(f,at); x.o.frequency.exponentialRampToValueAtTime(f*0.55,at+0.25); return x; };
  /* a plucked string: bright at the pick, closing fast */
  K.pluck=(f,at,dur,o)=>{ o=o||{}; f=(typeof f==='string'?hz(f):f);
    const lp=K.filt('lowpass',f*6,0.5,o.to); lp.frequency.setValueAtTime(Math.min(12000,f*9),at); lp.frequency.exponentialRampToValueAtTime(Math.max(200,f*1.6),at+(o.close||0.5));
    return K.osc({ f:f, at:at, dur:dur||1.2, g:o.g==null?0.25:o.g, type:o.type||'sawtooth', a:0.003, d:o.d==null?(dur||1.2):o.d, s:0.05, r:0.12, to:lp, det:o.det }); };
  /* a formant voice: a buzz (or breath) through three throats.
     set(vowel, at, glide) walks the throats. */
  K.voice=o=>{ o=o||{}; const at=o.at==null?ctx.currentTime:o.at;
    const g=ctx.createGain(); g.gain.value=0; g.connect(o.to||out); K.reg(g);
    const src=o.breath?null:ctx.createOscillator();
    let head;
    if(src){ src.type=o.type||'sawtooth'; src.frequency.value=o.f||120; head=src; K.reg(src); }
    else{ const s=ctx.createBufferSource(); s.buffer=noiseBuf('white'); s.loop=true; head=s; K.reg(s); s.start(at); }
    const pre=ctx.createGain(); pre.gain.value=1; head.connect(pre); K.reg(pre);
    const bands=VOWEL[o.vowel||'a'].map((f,i)=>{ const b=ctx.createBiquadFilter(); b.type='bandpass'; b.frequency.value=f; b.Q.value=o.q||(o.breath?6:9);
      const bg=ctx.createGain(); bg.gain.value=[1,0.55,0.25][i]; pre.connect(b); b.connect(bg); bg.connect(g); K.reg(b); K.reg(bg); return b; });
    const r=o.r==null?0.1:o.r;
    K.adsr(g.gain,at,o.g==null?0.3:o.g,o.a==null?0.06:o.a,o.d,o.s,r,o.dur);
    if(src){ src.start(at); if(o.dur!=null) src.stop(at+o.dur+r*4+0.05); }
    else if(o.dur!=null) head.stop(at+o.dur+r*4+0.05);
    const V={ g:g, src:src, bands:bands,
      set:(v,t,gl)=>{ const ff=VOWEL[v]||VOWEL.a; bands.forEach((b,i)=>{ b.frequency.setTargetAtTime(ff[i],t,(gl||0.06)/3); }); },
      pitch:(f,t,gl)=>{ if(src){ if(gl) src.frequency.exponentialRampToValueAtTime(f,t+gl); else src.frequency.setValueAtTime(f,t); } } };
    return V;
  };
  /* rooms */
  K.verb=(sec,mix,to)=>{ const inp=ctx.createGain(); const dry=ctx.createGain(); dry.gain.value=1-mix; const wet=ctx.createGain(); wet.gain.value=mix;
    const cv=ctx.createConvolver(); cv.buffer=irBuf(Math.min(12,Math.max(0.2,sec))); inp.connect(dry); inp.connect(cv); cv.connect(wet);
    dry.connect(to||out); wet.connect(to||out); [inp,dry,wet,cv].forEach(K.reg); return inp; };
  K.echo=(time,fb,mix,to,tone)=>{ const inp=ctx.createGain(); const dry=ctx.createGain(); dry.gain.value=1; const wet=ctx.createGain(); wet.gain.value=mix;
    const dl=ctx.createDelay(4); dl.delayTime.value=time; const f=ctx.createGain(); f.gain.value=fb; const lp=ctx.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=tone||2600;
    inp.connect(dry); inp.connect(dl); dl.connect(lp); lp.connect(f); f.connect(dl); lp.connect(wet); dry.connect(to||out); wet.connect(to||out);
    [inp,dry,wet,dl,f,lp].forEach(K.reg); return inp; };
  K.lfo=(param,f,depth,type,at)=>{ const o=ctx.createOscillator(); o.type=type||'sine'; o.frequency.value=f; const g=ctx.createGain(); g.gain.value=depth; o.connect(g); g.connect(param); o.start(at==null?ctx.currentTime:at); K.reg(o); K.reg(g); return o; };
  /* a buffer the station computes itself (a chirp, a code, a scan) */
  K.buf=(sec,fill,chans)=>{ const sr=ctx.sampleRate, n=Math.floor(sr*sec), b=ctx.createBuffer(chans||1,n,sr);
    for(let ch=0;ch<(chans||1);ch++){ const d=b.getChannelData(ch); for(let i=0;i<n;i++) d[i]=fill(i/sr,i,ch); } return b; };
  K.play=(b,o)=>{ o=o||{}; const at=o.at==null?ctx.currentTime:o.at; const s=ctx.createBufferSource(); s.buffer=b; s.loop=!!o.loop; if(o.rate) s.playbackRate.value=o.rate;
    const g=ctx.createGain(); g.gain.value=o.g==null?1:o.g; s.connect(g); g.connect(o.to||out); K.reg(s); K.reg(g); s.start(at);
    if(!o.loop){ s.onended=()=>{ try{ s.disconnect(); g.disconnect(); }catch(_){} K.nodes.delete(s); K.nodes.delete(g); }; } return { s:s, g:g }; };
  /* the clock: fn(i, t, L) is called once per iteration, t the absolute
     time to schedule at; L.period may be changed from inside. */
  K.loop=(period,fn,o)=>{ const L={ i:0, next:(o&&o.at!=null)?o.at:ctx.currentTime+0.06, period:period, fn:fn }; K.loops.push(L); return L; };
  K.after=(s,fn)=>{ const id=setTimeout(()=>{ if(K.alive){ try{ fn(); }catch(e){ console.warn('station timer',e); } } },s*1000); K.timers.push(id); };
  K.kill=()=>{ K.alive=false; K.timers.forEach(clearTimeout); K.timers.length=0; K.loops.length=0;
    K.nodes.forEach(n=>{ try{ if(n.stop) n.stop(); }catch(_){} try{ n.disconnect(); }catch(_){} }); K.nodes.clear(); };
  return K;
}

/* ---- the stations, the book's own (id · name · tick · ago · hue · kind · scene · prog) ---- */
const STATIONS=[
{ id:"bigbang", name:"the first sound", tick:"13.8 bya", ago:13800000000, hue:275, kind:"physics", scene:"the plasma rings",
  prog:K=>{
    const room=K.verb(6,0.5);
    const lp=K.filt('lowpass',900,0.5,room);
    const bands=[[1,1],[2.45,0.5],[3.6,0.33]].map(b=>{ const n=K.noise({ color:'pink', bp:140*b[0], q:5, g:0.0, a:0.01, to:lp }); return { n:n, m:b[0], a:b[1] }; });
    const sub=K.osc({ type:'sine', f:36, g:0.0, to:room, a:0.01 });
    const CYC=96;
    K.loop(CYC,(i,t)=>{
      bands.forEach(b=>{ const f=b.n.head.frequency; f.cancelScheduledValues(t); f.setValueAtTime(150*b.m,t); f.exponentialRampToValueAtTime(48*b.m,t+CYC*0.9);
        const g=b.n.g.gain; g.cancelScheduledValues(t); g.setValueAtTime(0.0001,t); g.exponentialRampToValueAtTime(0.9*b.a,t+9); g.setValueAtTime(0.9*b.a,t+CYC*0.55); g.exponentialRampToValueAtTime(0.02*b.a,t+CYC*0.98); });
      const s=sub.g.gain; s.cancelScheduledValues(t); s.setValueAtTime(0.0001,t); s.exponentialRampToValueAtTime(0.35,t+12); s.setValueAtTime(0.35,t+CYC*0.6); s.exponentialRampToValueAtTime(0.001,t+CYC*0.98);
      sub.o.frequency.setValueAtTime(40,t); sub.o.frequency.exponentialRampToValueAtTime(24,t+CYC*0.9);
    });
  } },
{ id:"clear", name:"the universe goes clear", tick:"+380 ky", ago:13799620000, hue:262, kind:"physics", scene:"the fog lifts",
  prog:K=>{
    const room=K.verb(5,0.4);
    const bands=[[1,0.6],[2.45,0.3],[3.6,0.2]].map(b=>K.noise({ color:'pink', bp:60*b[0], q:6, g:b[1]*0.8, a:0.5, to:room }));
    const hiss=K.noise({ color:'pink', g:0.0, a:0.01, hp:200, to:room });
    const whisper=K.osc({ type:'sine', f:160, g:0.0, a:0.01, to:room });
    K.lfo(whisper.o.frequency,0.05,4);
    const CYC=70;
    K.loop(CYC,(i,t)=>{
      bands.forEach((n,k)=>{ const g=n.g.gain; g.cancelScheduledValues(t); g.setValueAtTime(0.0001,t); g.exponentialRampToValueAtTime([0.5,0.25,0.16][k],t+4); g.setValueAtTime([0.5,0.25,0.16][k],t+10); g.exponentialRampToValueAtTime(0.0005,t+CYC*0.6); });
      const h=hiss.g.gain; h.cancelScheduledValues(t); h.setValueAtTime(0.0001,t); h.setValueAtTime(0.0001,t+8); h.exponentialRampToValueAtTime(0.16,t+CYC*0.6); h.setValueAtTime(0.16,t+CYC*0.9); h.exponentialRampToValueAtTime(0.001,t+CYC);
      const w=whisper.g.gain; w.cancelScheduledValues(t); w.setValueAtTime(0.0001,t+CYC*0.3); w.exponentialRampToValueAtTime(0.05,t+CYC*0.7); w.exponentialRampToValueAtTime(0.0005,t+CYC);
    });
  } },
{ id:"firststars", name:"the first stars light", tick:"13.6 bya", ago:13600000000, hue:250, kind:"physics", scene:"the first star lights",
  prog:K=>{
    const room=K.verb(8,0.45);
    K.loop(24,(i,t)=>{ const f0=K.rr(38,64);
      for(let h=1;h<=9;h++){ const at=t+h*0.45; K.osc({ type:h<3?'sine':'triangle', f:f0*h, at:at, dur:15-h*0.6, g:0.26/(h*0.9), a:2.2+h*0.2, d:6, s:0.5, r:4, to:room, det:K.rr(-6,6) }); }
      for(let k=0;k<7;k++){ K.osc({ type:'sine', f:K.rr(1800,5200), at:t+K.rr(3,14), dur:K.rr(2,5), g:0.012, a:1.2, r:1.5, to:room }); }
    });
    const wind=K.noise({ color:'brown', g:0.10, lp:90, a:2 });
    K.lfo(wind.g.gain,0.07,0.05);
  } },
{ id:"sun", name:"the sun hums", tick:"4.6 bya", ago:4600000000, hue:45, kind:"physics", scene:"the sun, ringing",
  prog:K=>{
    const room=K.verb(3,0.3);
    const f0=3.0e-3*65536, df=136e-6*65536;
    for(let k=-6;k<=6;k++){ const amp=0.055*Math.exp(-(k*k)/9);
      const o=K.osc({ type:'sine', f:f0+k*df, g:amp, a:3+Math.abs(k)*0.4, to:room });
      K.lfo(o.g.gain,K.rr(0.03,0.11),amp*0.6); }
    const gran=K.noise({ color:'brown', g:0.06, lp:120, a:3, to:room });
    K.lfo(gran.g.gain,0.2,0.03);
  } },
{ id:"earth", name:"the earth forms", tick:"4.54 bya", ago:4540000000, hue:22, kind:"evocation", scene:"the earth is built",
  prog:K=>{
    const room=K.verb(10,0.5);
    K.noise({ color:'brown', g:0.14, lp:70, a:3, to:room });
    const hiss=K.noise({ color:'pink', g:0.035, hp:2500, a:3, to:room }); K.lfo(hiss.g.gain,0.13,0.02);
    K.loop(0.25,(i,t)=>{ if(K.r()<0.11){ const big=K.r()<0.2; const x=K.osc({ type:'sine', f:big?70:52, at:t, dur:big?2.5:1.2, g:big?0.8:0.4, a:0.004, d:big?2.4:1.1, s:0, r:0.3, to:room });
        x.o.frequency.setValueAtTime(big?70:52,t); x.o.frequency.exponentialRampToValueAtTime(big?22:28,t+0.35);
        K.noise({ color:'brown', at:t, dur:big?1.4:0.5, g:big?0.5:0.22, lp:240, a:0.003, d:big?1.2:0.4, s:0, r:0.2, to:room }); } });
  } },
{ id:"theia", name:"the moon is made", tick:"theia", ago:4500000000, hue:14, kind:"evocation", scene:"theia strikes",
  prog:K=>{
    const room=K.verb(12,0.55);
    K.noise({ color:'brown', g:0.06, lp:60, a:2, to:room });
    K.loop(40,(i,t)=>{ const at=t+4;
      K.noise({ color:'brown', at:at, dur:6, g:1.1, lp:300, a:0.01, d:5, s:0, r:1, to:room });
      K.noise({ color:'white', at:at+0.05, dur:2.5, g:0.45, hp:1800, a:0.005, d:2.2, s:0, r:0.5, to:room });
      const s=K.osc({ type:'sine', f:34, at:at, dur:9, g:0.9, a:0.01, d:8, s:0, r:1, to:room }); s.o.frequency.setValueAtTime(48,at); s.o.frequency.exponentialRampToValueAtTime(30,at+3);
      [43.4,53.9,61.0,71.2,80.5].forEach((f,k)=>{ K.osc({ type:'sine', f:f, at:at+0.3, dur:30-k*3, g:0.22/(k+1), a:0.6, d:22, s:0.15, r:3, to:room }); });
      for(let k=0;k<40;k++) K.noise({ color:'white', at:at+0.4+K.r()*12, dur:0.03, g:0.05*K.r(), bp:K.rr(2500,7000), q:4, a:0.001, d:0.02, s:0, r:0.02, to:room });
    });
  } },
{ id:"rain", name:"the first rain", tick:"the rain", ago:4400000000, hue:200, kind:"evocation", scene:"the first rain",
  prog:K=>{
    const room=K.verb(4,0.35);
    const rain=K.noise({ color:'white', g:0.20, hp:1400, a:4, to:room }); K.lfo(rain.g.gain,0.09,0.07); K.lfo(rain.g.gain,0.31,0.04);
    const rock=K.noise({ color:'pink', g:0.10, lp:700, a:4, to:room }); K.lfo(rock.g.gain,0.05,0.04);
    K.loop(0.06,(i,t)=>{ if(K.r()<0.8) K.noise({ color:'white', at:t+K.r()*0.05, dur:0.012, g:0.09*K.r(), bp:K.rr(3000,9000), q:3, a:0.001, d:0.01, s:0, r:0.005, to:room }); });
    K.loop(11,(i,t)=>{ if(K.r()<0.7){ const at=t+K.r()*8; K.noise({ color:'brown', at:at, dur:5, g:0.55, lp:180, a:0.4, d:4.5, s:0.1, r:1.5, to:room }); K.noise({ color:'brown', at:at+0.2, dur:1.2, g:0.3, lp:500, a:0.01, d:1, s:0, r:0.3, to:room }); } });
    const sea=K.noise({ color:'pink', g:0.0, lp:260, a:1, to:room }); K.lfo(sea.g.gain,0.045,0.09); sea.g.gain.setTargetAtTime(0.10,K.now(),20);
  } },
{ id:"soup", name:"the soup", tick:"the soup", ago:3900000000, hue:150, kind:"evocation", scene:"the soup",
  prog:K=>{
    const room=K.verb(3,0.3);
    const water=K.filt('lowpass',1400,0.6,room);
    K.noise({ color:'brown', g:0.16, lp:200, a:3, to:room });
    const boil=K.noise({ color:'pink', g:0.10, bp:500, q:0.8, a:3, to:water }); K.lfo(boil.g.gain,0.6,0.05); K.lfo(boil.g.gain,0.04,0.04);
    K.loop(0.09,(i,t)=>{ if(K.r()<0.75){ const f=K.rr(260,1500); const x=K.osc({ type:'sine', f:f, at:t, dur:0.09, g:0.12*K.r()+0.03, a:0.004, d:0.08, s:0, r:0.02, to:water }); x.o.frequency.setValueAtTime(f,t); x.o.frequency.exponentialRampToValueAtTime(f*2.1,t+0.08); } });
    [55,82.4,98].forEach((f,k)=>{ const o=K.osc({ type:'triangle', f:f, g:0.05, a:6, to:room }); K.lfo(o.g.gain,0.03+k*0.01,0.03); });
    K.loop(17,(i,t)=>{ const at=t+K.r()*10; K.noise({ color:'white', at:at, dur:0.08, g:0.6, hp:900, a:0.001, d:0.06, s:0, r:0.03, to:room }); K.noise({ color:'brown', at:at+0.15, dur:4, g:0.5, lp:220, a:0.05, d:3.5, s:0, r:1, to:room }); });
  } },
{ id:"cell", name:"the first cell divides", tick:"first cell", ago:3700000000, hue:140, kind:"evocation", scene:"one becomes two",
  prog:K=>{
    const room=K.verb(2.5,0.3);
    const lp=K.filt('lowpass',2200,0.7,room);
    K.noise({ color:'brown', g:0.07, lp:150, a:3, to:room });
    K.loop(2,(i,t)=>{ const step=i%9; if(step===8) return; const n=1<<step; const g=0.5/Math.sqrt(n);
      for(let k=0;k<n;k++){ const at=t+(n===1?0.3:K.r()*1.9); const x=K.osc({ type:'sine', f:900, at:at, dur:0.07, g:g, a:0.002, d:0.06, s:0, r:0.02, to:lp }); x.o.frequency.setValueAtTime(K.rr(700,1100),at); x.o.frequency.exponentialRampToValueAtTime(300,at+0.06); } });
  } },
{ id:"breath", name:"the first breath", tick:"oxygen", ago:2400000000, hue:170, kind:"evocation", scene:"the first breath",
  prog:K=>{
    const room=K.verb(3,0.35);
    const lung=K.filt('lowpass',300,1.2,room);
    const br=K.noise({ color:'pink', g:0.22, a:1, to:lung });
    K.loop(9.5,(i,t)=>{ lung.frequency.cancelScheduledValues(t); lung.frequency.setValueAtTime(220,t); lung.frequency.exponentialRampToValueAtTime(1300,t+4); lung.frequency.exponentialRampToValueAtTime(200,t+9.3);
      br.g.gain.cancelScheduledValues(t); br.g.gain.setValueAtTime(0.10,t); br.g.gain.linearRampToValueAtTime(0.30,t+4); br.g.gain.linearRampToValueAtTime(0.10,t+9.3);
      for(let k=0;k<70;k++){ const at=t+K.r()*9; K.noise({ color:'white', at:at, dur:0.02, g:0.06*Math.sin(Math.PI*(at-t)/9.5), bp:K.rr(2500,8000), q:5, a:0.001, d:0.015, s:0, r:0.005, to:room }); } });
    [65.4,98,130.8].forEach((f,k)=>K.osc({ type:'sine', f:f, g:0.05/(k+1), a:8, to:room }));
  } },
{ id:"ear", name:"the sea learns to hear", tick:"the ear", ago:500000000, hue:195, kind:"evocation", scene:"the sea learns to hear",
  prog:K=>{
    const room=K.verb(2,0.3);
    const water=K.filt('lowpass',900,0.7,room);
    K.noise({ color:'pink', g:0.16, a:3, to:water });
    K.loop(0.12,(i,t)=>{ if(K.r()<0.5) K.noise({ color:'white', at:t+K.r()*0.1, dur:0.02, g:0.15*K.r(), bp:K.rr(400,2800), q:4, a:0.001, d:0.015, s:0, r:0.01, to:water });
      if(K.r()<0.07) K.noise({ color:'pink', at:t, dur:0.4, g:0.12, bp:K.rr(300,900), q:1.5, a:0.05, d:0.35, s:0, r:0.1, to:water }); });
    const ear=K.filt('bandpass',330,1,room);
    const tone=K.noise({ color:'white', g:0.0, a:0.01, to:ear });
    K.loop(10,(i,t)=>{ const q=1+(i%7)*6; ear.Q.setValueAtTime(q,t); ear.frequency.setValueAtTime(330,t);
      tone.g.gain.cancelScheduledValues(t); tone.g.gain.setValueAtTime(0.0001,t); tone.g.gain.exponentialRampToValueAtTime(0.16+0.06*(i%7),t+2.5); tone.g.gain.exponentialRampToValueAtTime(0.0005,t+7);
      if(i%7===6) K.osc({ type:'sine', f:330, at:t+0.5, dur:5, g:0.14, a:2, r:2, to:room }); });
  } },
{ id:"step", name:"the first footstep on land", tick:"first step", ago:375000000, hue:110, kind:"evocation", scene:"the first step on land",
  prog:K=>{
    const room=K.verb(1.5,0.2);
    const wind=K.noise({ color:'pink', g:0.14, lp:1200, a:3, to:room }); K.lfo(wind.g.gain,0.11,0.07); K.lfo(wind.g.gain,0.37,0.03);
    K.noise({ color:'brown', g:0.06, lp:120, a:3, to:room });
    K.loop(4.5,(i,t)=>{ const at=t+K.r()*1.5; const n=2+Math.floor(K.r()*3);
      for(let k=0;k<n;k++){ const a=at+k*K.rr(0.7,1.1); K.noise({ color:'white', at:a, dur:0.08, g:0.35, lp:600, a:0.003, d:0.07, s:0, r:0.03, to:room }); K.osc({ type:'sine', f:70, at:a, dur:0.15, g:0.35, a:0.003, d:0.13, s:0, r:0.03, to:room });
        K.noise({ color:'pink', at:a+0.12, dur:0.45, g:0.12, bp:900, q:0.8, a:0.05, d:0.4, s:0, r:0.1, to:room }); } });
  } },
{ id:"wing", name:"the first song on land was a wing", tick:"the wing", ago:300000000, hue:100, kind:"evocation", scene:"the wing",
  prog:K=>{
    const room=K.verb(2.5,0.3);
    const wind=K.noise({ color:'pink', g:0.10, lp:900, a:3, to:room }); K.lfo(wind.g.gain,0.08,0.05);
    K.loop(9,(i,t)=>{ const dur=4.5; const pan=K.pan(-1,room); pan.pan.setValueAtTime(-1,t); pan.pan.linearRampToValueAtTime(1,t+dur);
      const g=K.gain(0,pan); g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(0.5,t+dur*0.45); g.gain.exponentialRampToValueAtTime(0.001,t+dur);
      const wb=K.osc({ type:'sawtooth', f:48, at:t, dur:dur, g:0.35, a:0.3, r:0.5, to:g }); wb.o.frequency.setValueAtTime(52,t); wb.o.frequency.exponentialRampToValueAtTime(40,t+dur);
      const nz=K.noise({ color:'white', at:t, dur:dur, g:0.5, bp:700, q:0.7, a:0.3, r:0.5, to:g }); K.lfo(nz.g.gain,24,0.45,'square',t);
      const lp=K.filt('lowpass',1800,1,g); nz.head.disconnect(); nz.head.connect(lp); });
    K.loop(0.7,(i,t)=>{ if(K.r()<0.5){ const f=K.rr(140,320); const o=K.osc({ type:'sawtooth', f:f, at:t, dur:K.rr(0.3,1.2), g:0.02, a:0.1, r:0.2, to:K.pan(K.rr(-1,1),room) }); K.lfo(o.g.gain,f/2.5,0.018,'square',t); } });
    K.loop(2.3,(i,t)=>{ const x=K.osc({ type:'sine', f:1400, at:t+K.r()*2, dur:0.08, g:0.08, a:0.002, d:0.07, s:0, r:0.02, to:room }); x.o.frequency.setValueAtTime(1400,t); x.o.frequency.exponentialRampToValueAtTime(2200,t+0.07); });
  } },
{ id:"dino", name:"the crested one calls", tick:"dinosaur", ago:76000000, hue:85, kind:"physics", scene:"the crested one calls",
  prog:K=>{
    const room=K.verb(5,0.4);
    function call(at,dur,g,pan,far){ const p=K.pan(pan,room); const lp=K.filt('lowpass',far?300:900,0.8,p);
      const bank=[86,143,200,258].map((f,k)=>K.filt('bandpass',f,14,lp));
      const src=K.osc({ type:'sawtooth', f:29, at:at, dur:dur, g:0, a:0.01, to:K.gain(0.001,room) });
      bank.forEach((b,k)=>{ const bg=K.gain(0,b); src.o.connect(bg); K.adsr(bg.gain,at,g*[1,0.7,0.45,0.25][k],0.6,0,1,0.5,dur); });
      src.o.frequency.setValueAtTime(28,at); src.o.frequency.linearRampToValueAtTime(31,at+dur*0.6); src.o.frequency.linearRampToValueAtTime(27.5,at+dur);
      const breath=K.noise({ color:'pink', at:at, dur:dur, g:g*0.35, bp:400, q:0.5, a:0.4, r:0.5, to:lp }); }
    K.loop(11,(i,t)=>{ const at=t+K.r()*3; call(at,K.rr(1.8,3.2),0.9,-0.3,false); if(K.r()<0.8) call(at+K.rr(3.5,5),K.rr(1.5,2.5),0.5,0.7,true); });
    K.noise({ color:'pink', g:0.06, bp:600, q:0.6, a:3, to:room });
    K.loop(0.5,(i,t)=>{ if(K.r()<0.6){ const f=K.rr(2600,4200); const o=K.osc({ type:'sawtooth', f:f, at:t+K.r()*0.4, dur:K.rr(0.15,0.5), g:0.012, a:0.05, r:0.1, to:K.pan(K.rr(-1,1),room) }); K.lfo(o.g.gain,K.rr(18,40),0.01,'square',t); } });
    K.loop(1.9,(i,t)=>{ if(K.r()<0.5) K.noise({ color:'white', at:t+K.r(), dur:0.15, g:0.08, lp:700, a:0.01, d:0.12, s:0, r:0.05, to:room }); });
  } },
{ id:"asteroid", name:"the day the sky fell", tick:"66 mya", ago:66000000, hue:25, kind:"evocation", scene:"the day the sky fell",
  prog:K=>{
    const room=K.verb(9,0.5);
    K.loop(45,(i,t)=>{
      for(let k=0;k<26;k++){ const at=t+K.r()*10; const f=K.rr(2200,4200); const o=K.osc({ type:'triangle', f:f, at:at, dur:K.rr(0.2,0.6), g:0.03, a:0.05, r:0.1, to:K.pan(K.rr(-1,1),room) }); K.lfo(o.g.gain,K.rr(12,30),0.025,'square',at); }
      for(let k=0;k<6;k++){ const at=t+K.r()*10; const b=K.osc({ type:'sine', f:K.rr(1800,3000), at:at, dur:0.12, g:0.05, a:0.01, d:0.1, s:0, r:0.02, to:room }); b.o.frequency.exponentialRampToValueAtTime(K.rr(2500,4500),at+0.1); }
      const flash=K.osc({ type:'sine', f:9000, at:t+11, dur:3, g:0.03, a:0.05, d:2.5, s:0, r:0.5, to:room }); flash.o.frequency.exponentialRampToValueAtTime(4000,t+14);
      const boom=t+22;
      K.noise({ color:'brown', at:boom, dur:8, g:1.4, lp:220, a:0.02, d:7, s:0.1, r:2, to:room });
      const s=K.osc({ type:'sine', f:30, at:boom, dur:10, g:1.0, a:0.02, d:9, s:0.1, r:2, to:room }); s.o.frequency.setValueAtTime(44,boom); s.o.frequency.exponentialRampToValueAtTime(26,boom+3);
      K.noise({ color:'pink', at:boom+0.3, dur:14, g:0.6, lp:800, a:1, d:12, s:0.2, r:3, to:room });
      for(let k=0;k<160;k++) K.noise({ color:'white', at:boom+3+K.r()*12, dur:0.02, g:0.08*K.r(), bp:K.rr(3000,9000), q:6, a:0.001, d:0.015, s:0, r:0.005, to:room });
      [38,47,56].forEach((f,k)=>K.osc({ type:'sine', f:f, at:boom+2, dur:20, g:0.18/(k+1), a:1, d:16, s:0.2, r:3, to:room }));
      const wind=K.noise({ color:'pink', at:boom+12, dur:30, g:0.12, lp:500, a:6, r:6, to:room }); K.lfo(wind.g.gain,0.1,0.06,'sine',boom+12);
    });
  } },
{ id:"birds", name:"the dawn chorus", tick:"dawn", ago:55000000, hue:120, kind:"evocation", scene:"the dawn chorus",
  prog:K=>{
    const room=K.verb(2.5,0.3);
    const dawn=K.noise({ color:'pink', g:0.02, lp:500, a:20, to:room }); dawn.g.gain.setTargetAtTime(0.07,K.now(),25);
    const birds=[]; for(let b=0;b<6;b++) birds.push({ f:K.rr(2000,4800), pan:K.rr(-0.9,0.9), gap:K.rr(2,6), two:K.r()<0.4, spd:K.rr(0.05,0.11) });
    birds.forEach(b=>{ const p=K.pan(b.pan,room);
      K.loop(b.gap,(i,t)=>{ const n=3+Math.floor(K.r()*6); let at=t+K.r()*(b.gap*0.4);
        for(let k=0;k<n;k++){ const f0=b.f*K.rr(0.8,1.25), f1=f0*K.rr(0.7,1.5), d=b.spd*K.rr(0.8,1.6);
          const o=K.osc({ type:'sine', f:f0, at:at, dur:d, g:0.07, a:0.008, d:d, s:0.3, r:0.02, to:p }); o.o.frequency.setValueAtTime(f0,at); o.o.frequency.exponentialRampToValueAtTime(f1,at+d);
          if(b.two){ const o2=K.osc({ type:'sine', f:f0*1.5, at:at, dur:d, g:0.035, a:0.008, d:d, s:0.3, r:0.02, to:p }); o2.o.frequency.setValueAtTime(f0*1.5,at); o2.o.frequency.exponentialRampToValueAtTime(f1*1.5,at+d); }
          at+=d+K.rr(0.02,0.12); } }); });
  } },
{ id:"tool", name:"stone on stone", tick:"first tool", ago:3300000, hue:35, kind:"evocation", scene:"stone on stone",
  prog:K=>{
    const room=K.verb(1.2,0.18);
    const wind=K.noise({ color:'pink', g:0.07, lp:1500, hp:200, a:3, to:room }); K.lfo(wind.g.gain,0.13,0.04);
    function strike(at,g){ K.noise({ color:'white', at:at, dur:0.03, g:g, bp:2600, q:3, a:0.001, d:0.025, s:0, r:0.01, to:room });
      K.osc({ type:'sine', f:1850, at:at, dur:0.06, g:g*0.5, a:0.001, d:0.05, s:0, r:0.01, to:room });
      K.osc({ type:'sine', f:420, at:at, dur:0.04, g:g*0.35, a:0.001, d:0.03, s:0, r:0.01, to:room });
      if(K.r()<0.6){ const fa=at+K.rr(0.08,0.2); K.noise({ color:'white', at:fa, dur:0.02, g:g*0.35, bp:K.rr(3500,6000), q:4, a:0.001, d:0.015, s:0, r:0.005, to:room }); } }
    K.loop(1.05,(i,t)=>{ if(K.r()<0.85){ strike(t+K.r()*0.2,0.55); if(K.r()<0.3) strike(t+0.35+K.r()*0.2,0.4); } });
    K.loop(7,(i,t)=>{ if(K.r()<0.6){ const at=t+K.r()*5; for(let k=0;k<3;k++){ const o=K.osc({ type:'sine', f:2800, at:at+k*0.18, dur:0.1, g:0.02, a:0.01, d:0.09, s:0, r:0.02, to:K.pan(0.8,room) }); o.o.frequency.exponentialRampToValueAtTime(2200,at+k*0.18+0.09); } } });
  } },
{ id:"fire", name:"making fire", tick:"fire", ago:1000000, hue:24, kind:"evocation", scene:"making fire",
  prog:K=>{
    const room=K.verb(2,0.3);
    K.loop(60,(i,t)=>{
      for(let k=0;k<7;k++){ const at=t+k*K.rr(1.2,2.2); K.noise({ color:'white', at:at, dur:0.02, g:0.45, bp:3200, q:3, a:0.001, d:0.015, s:0, r:0.005, to:room }); K.noise({ color:'white', at:at+0.01, dur:0.05, g:0.2, hp:7000, a:0.001, d:0.04, s:0, r:0.01, to:room });
        if(k>2){ const b=K.noise({ color:'pink', at:at+0.5, dur:1.4, g:0.18, lp:1200, a:0.3, d:1, s:0.4, r:0.3, to:room }); K.lfo(b.head.frequency,1.5,300,'sine',at+0.5); } }
      const take=t+14;
      const roar=K.noise({ color:'pink', at:take, dur:44, g:0.0, lp:500, a:0.01, r:5, to:room }); roar.g.gain.setValueAtTime(0.0001,take); roar.g.gain.exponentialRampToValueAtTime(0.42,take+10); roar.g.gain.setValueAtTime(0.42,take+30); roar.g.gain.exponentialRampToValueAtTime(0.12,take+44);
      K.lfo(roar.g.gain,0.9,0.05,'sine',take); K.lfo(roar.head.frequency,0.3,150,'sine',take);
      for(let k=0;k<220;k++){ const at=take+Math.pow(K.r(),0.6)*44; const big=K.r()<0.15; K.noise({ color:big?'brown':'white', at:at, dur:big?0.06:0.015, g:(big?0.5:0.25)*K.r(), bp:big?K.rr(150,500):K.rr(1500,6000), q:big?1:3, a:0.001, d:big?0.05:0.01, s:0, r:0.01, to:room }); }
    });
  } },
{ id:"grunt", name:"the first word", tick:"first word", ago:300000, hue:30, kind:"evocation", scene:"the first word",
  prog:K=>{
    const room=K.verb(1.8,0.3);
    function say(f,at,n,g,pan){ const p=K.pan(pan,room); let t=at; const V=K.voice({ f:f, vowel:'a', at:at, dur:n*0.42, g:g, a:0.05, r:0.15, to:p });
      for(let k=0;k<n;k++){ const v=K.pick(['a','o','u','e','a','m']); V.set(v,t,0.08); V.pitch(f*K.rr(0.85,1.25),t,0.18); t+=K.rr(0.25,0.5); } }
    K.loop(4.8,(i,t)=>{ say(115,t+K.r(),2+Math.floor(K.r()*3),0.35,-0.4); if(K.r()<0.7) say(165,t+2.4+K.r(),1+Math.floor(K.r()*3),0.28,0.5); });
    K.noise({ color:'pink', g:0.04, lp:400, a:3, to:room });
    K.loop(0.9,(i,t)=>{ if(K.r()<0.4) K.noise({ color:'white', at:t+K.r()*0.8, dur:0.01, g:0.05, bp:K.rr(2000,5000), q:5, a:0.001, d:0.01, s:0, r:0.005, to:room }); });
  } },
{ id:"lullaby", name:"the first lullaby", tick:"lullaby", ago:100000, hue:40, kind:"evocation", scene:"the first lullaby",
  prog:K=>{
    const room=K.verb(1.2,0.25);
    K.loop(60/70,(i,t)=>{ K.kick(t,0.22,{ f:80, f2:38, to:room }); K.kick(t+0.28,0.14,{ f:70, f2:36, to:room }); });
    const notes=[64,67,64,67,64,62,64,67,69,67,64,62,60];
    K.loop(1.15,(i,t,L)=>{ const k=i%(notes.length+3); if(k>=notes.length) return;
      const V=K.voice({ f:midi(notes[k]-12), vowel:'m', at:t, dur:1.0, g:0.5, a:0.12, r:0.2, to:room, q:7 });
      V.pitch(midi(notes[k]-12)*1.01,t+0.5,0.4); if(k%4===3) K.noise({ color:'pink', at:t+1.0, dur:0.25, g:0.06, bp:1500, q:0.6, a:0.1, r:0.1, to:room }); });
  } },
{ id:"flute", name:"the bone flute of hohle fels", tick:"bone flute", ago:40000, hue:45, kind:"evocation", scene:"the bone flute",
  prog:K=>{
    const room=K.verb(3.2,0.45);
    const scale=[62,64,67,69,71,74,76];
    let last=2;
    K.loop(0.7,(i,t,L)=>{ if(i%9>6) return; if(K.r()<0.2) return;
      last=clamp(last+Math.floor(K.rr(-2,3)),0,scale.length-1); const f=midi(scale[last]); const d=K.pick([0.5,0.6,0.9,1.3]);
      K.noise({ color:'white', at:t-0.03, dur:d+0.05, g:0.08, bp:f*2, q:2, a:0.04, r:0.1, to:room });
      const o=K.osc({ type:'sine', f:f, at:t, dur:d, g:0.32, a:0.06, d:0.2, s:0.85, r:0.12, to:room }); K.lfo(o.o.frequency,5,f*0.006,'sine',t+0.3);
      K.osc({ type:'sine', f:f*2, at:t, dur:d, g:0.05, a:0.06, r:0.12, to:room }); });
    K.noise({ color:'pink', g:0.03, lp:300, a:3, to:room });
    K.loop(3.1,(i,t)=>{ const x=K.osc({ type:'sine', f:1600, at:t+K.r()*2.5, dur:0.1, g:0.05, a:0.002, d:0.09, s:0, r:0.02, to:room }); x.o.frequency.exponentialRampToValueAtTime(2600,t+K.r()*2.5+0.08); });
  } },
{ id:"beat", name:"the first beat", tick:"the beat", ago:30000, hue:35, kind:"evocation", scene:"the first beat",
  prog:K=>{
    const room=K.verb(1.6,0.25);
    const bpm=96, q=60/bpm, s=q/2;
    K.loop(q*4,(i,t)=>{ const bar=i%16;
      for(let k=0;k<8;k++){ const at=t+k*s; if([0,3,4,6].includes(k)) K.clap(at,0.3,{ to:room }); if(bar>=2&&[0,2,4,5,7].includes(k)) K.clap(at+0.012,0.2,{ to:K.pan(0.5,room) }); }
      if(bar>=4) for(let k=0;k<8;k++){ if(k===0||k===5||(bar%2&&k===3)) K.tom(t+k*s,92,0.6,{ to:room }); }
      if(bar>=8) for(let k=0;k<16;k++){ const at=t+k*s/2; K.noise({ color:'white', at:at, dur:0.05, g:(k%4===2?0.16:0.07), hp:5000, a:0.002, d:0.04, s:0, r:0.01, to:K.pan(-0.5,room) }); }
      if(bar>=12&&bar%4===3){ for(let v=0;v<4;v++){ K.voice({ f:K.rr(140,220), vowel:'e', at:t+6*s, dur:0.3, g:0.18, a:0.02, r:0.1, to:K.pan(K.rr(-0.8,0.8),room) }); } }
    });
  } },
{ id:"cave", name:"the painted cave's echo", tick:"lascaux", ago:17000, hue:30, kind:"evocation", scene:"the painted cave",
  prog:K=>{
    const room=K.verb(5,0.55);
    const flutter=K.echo(0.108,0.62,0.5,room,2200);
    K.loop(6,(i,t)=>{ const at=t+K.r()*2; if(i%3===2){ const f=K.pick([131,147,165,196]); const V=K.voice({ f:f, vowel:'o', at:at, dur:2.2, g:0.5, a:0.3, r:0.4, to:flutter }); V.set('a',at+1,0.4); V.pitch(f*1.06,at+1.6,0.5); }
      else { K.clap(at,0.6,{ to:flutter }); if(K.r()<0.5) K.clap(at+0.55,0.5,{ to:flutter }); } });
    K.loop(1.7,(i,t)=>{ const at=t+K.r()*1.5; const x=K.osc({ type:'sine', f:2200, at:at, dur:0.09, g:0.06, a:0.002, d:0.08, s:0, r:0.02, to:room }); x.o.frequency.exponentialRampToValueAtTime(3400,at+0.07); });
    K.noise({ color:'brown', g:0.05, lp:110, a:3, to:room });
  } },
{ id:"lyre", name:"the lyres of ur", tick:"ur", ago:4526, hue:50, kind:"evocation", scene:"the lyres of ur",
  prog:K=>{
    const room=K.verb(1.8,0.28);
    const mode=[52,54,55,57,59,61,62,64,66,67];
    K.rich('E2',K.now()+0.1,null,{ g:0.06, part:[[1,1],[2,0.4],[3,0.2]], a:2, type:'triangle', to:room });
    let last=3;
    K.loop(0.42,(i,t)=>{ const bar=Math.floor(i/8); if(bar%5===4&&i%8>2) return; if(K.r()<0.22) return;
      last=clamp(last+Math.floor(K.rr(-2,3)),0,mode.length-1); K.pluck(midi(mode[last]),t,1.4,{ g:0.22, close:0.25, to:K.pan(K.rr(-0.3,0.3),room) });
      if(K.r()<0.25) K.pluck(midi(mode[Math.max(0,last-4)]),t+0.02,1.2,{ g:0.14, close:0.3, to:room }); });
    K.loop(0.42*4,(i,t)=>{ K.tom(t,110,0.25,{ to:room }); K.noise({ color:'white', at:t+0.84, dur:0.08, g:0.1, bp:900, q:1, a:0.002, d:0.06, s:0, r:0.02, to:room }); });
  } },
{ id:"hurrian", name:"the oldest written song", tick:"ugarit", ago:3426, hue:48, kind:"evocation", scene:"the hymn to nikkal",
  prog:K=>{
    const room=K.verb(2.2,0.32);
    const mode=[57,59,60,62,64,65,67,69];
    K.rich('A2',K.now()+0.1,null,{ g:0.05, part:[[1,1],[2,0.35],[3,0.15]], a:2, type:'triangle', to:room });
    K.loop(1.0,(i,t)=>{ const k=i%10; if(k>7) return; const a=mode[Math.floor(K.r()*5)], b=a+K.pick([4,5,7]);
      K.pluck(midi(a),t,1.6,{ g:0.16, close:0.3, to:room }); K.pluck(midi(b),t+0.03,1.6,{ g:0.12, close:0.3, to:room });
      if(k<6){ const f=midi(mode[Math.floor(K.r()*6)+2]-12); const V=K.voice({ f:f, vowel:K.pick(['a','e','i','o']), at:t+0.05, dur:0.8, g:0.32, a:0.08, r:0.15, to:room }); V.set(K.pick(['a','e','o']),t+0.45,0.1); V.pitch(f*K.pick([1,1.122,0.944]),t+0.5,0.25); } });
  } },
{ id:"pythagoras", name:"number is sound", tick:"pythagoras", ago:2556, hue:55, kind:"physics", scene:"the hammers agree",
  prog:K=>{
    const room=K.verb(2.4,0.3);
    function anvil(at,f,g){ [1,2.76,5.4,8.9].forEach((m,k)=>K.osc({ type:'sine', f:f*m, at:at, dur:1.4/(k+1), g:g*[1,0.5,0.3,0.15][k], a:0.001, d:1.2/(k+1), s:0, r:0.1, to:room })); K.noise({ color:'white', at:at, dur:0.02, g:g*0.5, hp:4000, a:0.001, d:0.015, s:0, r:0.005, to:room }); }
    const F0=220;
    K.loop(22,(i,t)=>{ const R=[1,4/3,3/2,2]; let at=t;
      for(let k=0;k<12;k++){ anvil(at,F0*R[k%4],0.35); at+=K.pick([0.35,0.5,0.7]); }
      at=t+8; [1,2,1.5,4/3,1].forEach((m,k)=>{ K.pluck(F0*m,at+k*1.1,1.6,{ g:0.3, close:0.6, to:room }); });
      at=t+14; for(let h=1;h<=8;h++) K.osc({ type:'sine', f:F0*0.5*h, at:at+h*0.55, dur:5-h*0.4, g:0.16/Math.sqrt(h), a:0.05, d:3, s:0.3, r:0.5, to:room }); });
  } },
{ id:"guqin", name:"the oldest song still played", tick:"the qin", ago:2527, hue:150, kind:"evocation", scene:"the qin",
  prog:K=>{
    const room=K.verb(3.4,0.30);
    const P=[nn('C3'),nn('D3'),nn('E3'),nn('G3'),nn('A3'),nn('C4'),nn('D4'),nn('E4'),nn('G4'),nn('A4')];
    K.loop(13,(i,t)=>{
      let at=t+K.rr(0,0.5);
      const n=3+Math.floor(K.r()*4);
      for(let k=0;k<n;k++){
        const m=K.pick(P), f=midi(m);
        if(K.r()<0.35) K.noise({ at:at-0.035, dur:0.05, g:0.05, hp:3200, q:0.8, a:0.002, d:0.04, s:0, r:0.01, to:room });
        const p=K.pluck(f,at,2.8,{ g:0.20, type:'triangle', close:1.5, to:room });
        if(K.r()<0.45){ const f2=midi(m+(K.r()<0.5?2:-2));
          p.o.frequency.setValueAtTime(f,at+0.16); p.o.frequency.exponentialRampToValueAtTime(f2,at+0.8); }
        at+=K.rr(0.6,1.8);
      }
      for(let k=0;k<2;k++) K.osc({ type:'sine', f:midi(K.pick(P))*2, at:t+K.rr(4,11), dur:2.6, g:0.09, a:0.012, d:2.4, s:0.05, r:0.7, to:room });
    });
  } },
{ id:"seikilos", name:"the oldest complete song", tick:"seikilos", ago:1926, hue:52, kind:"evocation", scene:"while you live, shine",
  prog:K=>{
    const room=K.verb(2.6,0.34);
    const mode=[64,65,67,69,71,72,74,76];
    const reed=K.filt('bandpass',900,1.5,room);
    const ph=[[7,1],[6,0.5],[5,0.5],[4,1],[5,0.5],[4,0.5],[2,1],[3,0.5],[4,0.5],[2,1],[1,0.5],[0,1.5]];
    K.loop(14,(i,t)=>{ let at=t+0.5;
      ph.forEach(n=>{ const f=midi(mode[n[0]]), d=n[1]*0.62; K.pluck(f,at,1.2,{ g:0.16, close:0.3, to:room });
        const o=K.osc({ type:'sawtooth', f:f, at:at, dur:d*0.92, g:0.22, a:0.04, r:0.06, to:reed }); K.lfo(o.o.frequency,5.5,f*0.008,'sine',at+0.2); at+=d; });
      K.pluck(midi(mode[0]),at+0.1,2.5,{ g:0.2, close:0.6, to:room }); K.pluck(midi(mode[4]),at+0.14,2.5,{ g:0.14, close:0.6, to:room }); });
  } },
{ id:"raga", name:"the drone that never stops", tick:"the drone", ago:1826, hue:30, kind:"evocation", scene:"the drone",
  prog:K=>{
    const room=K.verb(2.6,0.26);
    const S=[midi(nn('G2')),midi(nn('C3')),midi(nn('C3')),midi(nn('C2'))];
    K.loop(1.05,(i,t)=>{ const f=S[i%4];
      [[1,0.16],[2,0.10],[3,0.07],[4,0.05],[5,0.035],[6,0.03],[8,0.02]].forEach(p=>{
        const x=K.osc({ type:'sine', f:f*p[0]*(1+K.rr(-0.001,0.001)), at:t, dur:4.4, g:p[1], a:0.02, d:0.6, s:0.75, r:1.2, to:room });
        x.g.gain.setTargetAtTime(p[1]*1.25,t+0.35,0.5); x.g.gain.setTargetAtTime(p[1]*0.2,t+2.4,1.1);
      });
      if(i%4===1) K.noise({ at:t, dur:0.05, g:0.05, hp:2600, a:0.002, d:0.045, s:0, r:0.01, to:room });
    });
    /* the alap: yaman, no pulse */
    const Y=[nn('C4'),nn('D4'),nn('E4'),nn('F#4'),nn('G4'),nn('A4'),nn('B4'),nn('C5')];
    let prev=nn('G4');
    K.loop(6.5,(i,t)=>{
      const m=Y[Math.max(0,Math.min(Y.length-1,Y.indexOf(prev)+Math.floor(K.rr(-2.6,2.6))))]||prev;
      const f0=midi(prev), f1=midi(m); prev=m;
      const dur=K.rr(2.6,4.4);
      const x=K.osc({ type:'triangle', f:f0, at:t, dur:dur, g:0.13, a:0.35, d:0.5, s:0.85, r:0.7, to:K.filt('lowpass',2400,0.7,room) });
      x.o.frequency.setValueAtTime(f0,t); x.o.frequency.exponentialRampToValueAtTime(f1,t+K.rr(0.35,0.9));
      K.lfo(x.o.frequency,5.2,f1*0.006,'sine',t+1);
    });
  } },
{ id:"gamelan", name:"the bronze wave", tick:"gamelan", ago:1226, hue:48, kind:"evocation", scene:"the bronze wave",
  prog:K=>{
    const room=K.verb(3.2,0.34);
    const F0=midi(nn('C4'))/2, step=k=>F0*Math.pow(2,k/5);
    const PART=[[1,1],[2.34,0.42],[3.76,0.18]];
    /* bronze, in as few nodes as it can be said: three inharmonic partials, and
       the fundamental doubled a couple of hertz off, which is the ombak. */
    function strike(f,at,g,dur){
      K.osc({ type:'sine', f:f, at:at, dur:dur, g:g*0.5, a:0.004, d:dur*0.7, s:0.12, r:dur*0.4, to:room });
      K.osc({ type:'sine', f:f+2.1, at:at, dur:dur, g:g*0.5, a:0.004, d:dur*0.7, s:0.12, r:dur*0.4, to:room });
      for(let k=1;k<3;k++) K.osc({ type:'sine', f:f*PART[k][0], at:at, dur:dur*0.8, g:g*PART[k][1], a:0.004, d:dur*0.6, s:0.1, r:dur*0.3, to:room });
    }
    const BAL=[2,3,4,3,2,1,0,1,2,3,4,5,4,3,2,1], beat=0.42;
    K.loop(beat*4,(i,t)=>{
      if(i%4===0){ const gong=step(0)/4;                                   // the great gong closes the round
        PART.forEach(p=>[0,1.3].forEach(det=>K.osc({ type:'sine', f:gong*p[0]+det, at:t, dur:9, g:0.30*p[1]*0.5, a:0.02, d:7, s:0.1, r:2.5, to:room }))); }
      for(let k=0;k<4;k++){ const b=(i*4+k)%16, at=t+k*beat;
        strike(step(BAL[b]),at,0.16,1.6);                                  // the melody underneath
        if(b%4===0&&b) strike(step(BAL[b])/2,at,0.22,3.2);                 // the kettle
        if(b%2===1) strike(step(BAL[b])*2,at+beat*0.5,0.07,0.7);           // the elaboration
        strike(step(BAL[(b+1)%16])*2,at+beat*0.25,0.06,0.5);
        if(b%4===0) K.noise({ at:at, dur:0.03, g:0.05, bp:2600, q:1.2, a:0.001, d:0.025, s:0, r:0.01, to:room });
      }
    });
  } },
{ id:"khoomei", name:"two notes in one throat", tick:"khoomei", ago:1126, hue:190, kind:"evocation", scene:"two notes in one throat",
  prog:K=>{
    const room=K.verb(4.5,0.4);
    const f0=110;
    const wide=K.filt('lowpass',3000,0.6,room);
    const drone=K.osc({ type:'sawtooth', f:f0, g:0.10, a:1.6, to:wide });
    const whistle=K.filt('bandpass',f0*8,30,null); const wg=K.gain(0.9,room); whistle.connect(wg);
    const src=K.osc({ type:'sawtooth', f:f0, g:0.55, a:1.6, to:whistle });
    const growl=K.osc({ type:'sine', f:f0/2, g:0.0, a:0.01, to:room });
    K.noise({ color:'pink', g:0.045, hp:900, a:3, to:room });
    const H=[6,8,9,10,12,10,9,8];
    K.loop(1.35,(i,t)=>{
      const h=H[i%H.length]+(K.r()<0.2?1:0);
      whistle.frequency.setTargetAtTime(f0*h,t,0.09);
      wg.gain.setTargetAtTime(i%16===15?0.2:0.9,t,0.2);
      if(i%16===8){ growl.g.gain.setTargetAtTime(0.16,t,0.4); growl.g.gain.setTargetAtTime(0.0001,t+5,0.8); }
      drone.o.frequency.setTargetAtTime(f0*(1+K.rr(-0.004,0.004)),t,0.3);
      src.o.frequency.setTargetAtTime(f0*(1+K.rr(-0.004,0.004)),t,0.3);
    });
  } },
{ id:"guido", name:"the notes get names", tick:"ut re mi", ago:1001, hue:50, kind:"quotation", scene:"ut re mi",
  prog:K=>{
    const room=K.verb(6,0.5);
    const syl=[['u',60],['e',62],['i',64],['a',65],['o',67],['a',69]];
    function sing(at,oct,g,n){ syl.forEach((s,k)=>{ for(let v=0;v<n;v++){ const f=midi(s[1]+oct)*(1+K.rr(-0.006,0.006)); const V=K.voice({ f:f, vowel:s[0], at:at+k*0.9+v*0.01, dur:0.85, g:g, a:0.08, r:0.2, to:K.pan(K.rr(-0.6,0.6),room), q:8 }); } });
      const f=midi(60+oct); for(let v=0;v<n;v++) K.voice({ f:midi(60+oct)*(1+K.rr(-0.005,0.005)), vowel:'a', at:at+5.6, dur:2.2, g:g*0.9, a:0.2, r:0.6, to:room, q:8 }); }
    K.loop(30,(i,t)=>{ sing(t,-12,0.62,1); sing(t+9.5,0,0.42,1); sing(t+19,-12,0.3,3); sing(t+19,0,0.22,3); });
  } },
{ id:"hildegard", name:"a voice like a feather on the breath of god", tick:"hildegard", ago:876, hue:55, kind:"evocation", scene:"a feather on the breath of god",
  prog:K=>{
    const room=K.verb(6.5,0.55);
    [62,69].forEach((n,k)=>{ const V=K.voice({ f:midi(n-12), vowel:'o', g:0.10-k*0.03, a:3, to:room, q:6 }); });
    const mode=[62,64,65,67,69,71,72,74,76,77,79];
    let cur=4, phraseEnd=0;
    K.loop(0.55,(i,t)=>{ if(i%14>10){ return; }
      const leap=K.r()<0.25; cur=clamp(cur+(leap?K.pick([-4,4,5,7,-5]):Math.floor(K.rr(-2,3))),0,mode.length-1);
      const d=K.pick([0.5,0.5,1,1.5,2.5]); const f=midi(mode[cur]);
      const V=K.voice({ f:f, vowel:K.pick(['a','e','o','i']), at:t, dur:d, g:0.42, a:0.09, r:0.25, to:room, q:8 });
      if(d>1){ V.set(K.pick(['a','e','o']),t+d*0.5,0.3); V.pitch(f*1.004,t+d*0.5,0.3); } K.lfo(V.src.frequency,4.5,f*0.004,'sine',t+0.3); });
  } },
{ id:"perotin", name:"the voices divide", tick:"notre-dame", ago:826, hue:48, kind:"evocation", scene:"the voices divide",
  prog:K=>{
    const room=K.verb(7.5,0.6);
    const chant=[62,60,62,65,64,62];
    K.loop(8,(i,t)=>{ const n=chant[i%chant.length]; const T=K.voice({ f:midi(n-24), vowel:'o', at:t, dur:7.6, g:0.34, a:0.4, r:0.5, to:room, q:6 }); K.voice({ f:midi(n-12)*1.003, vowel:'o', at:t+0.05, dur:7.5, g:0.18, a:0.5, r:0.5, to:room, q:6 });
      const up=[n+12,n+17,n+19,n+21,n+19,n+17]; let at=t+0.3;
      for(let k=0;k<6;k++){ const a=up[(k+i)%6], b=a+(k%2?5:7);
        [[a,0.66],[b,0.66]].forEach(pr=>{ const V=K.voice({ f:midi(pr[0]), vowel:K.pick(['a','e']), at:at, dur:0.6, g:0.24, a:0.03, r:0.1, to:K.pan(pr[0]===a?-0.4:0.4,room), q:8 }); });
        const V2=K.voice({ f:midi(a-2), vowel:'i', at:at+0.7, dur:0.28, g:0.2, a:0.03, r:0.08, to:room, q:8 }); K.voice({ f:midi(b-2), vowel:'i', at:at+0.7, dur:0.28, g:0.16, a:0.03, r:0.08, to:room, q:8 });
        at+=1.2; } });
  } },
{ id:"griot", name:"the keeper of the song", tick:"the griot", ago:791, hue:38, kind:"evocation", scene:"the keeper of the song",
  prog:K=>{
    const room=K.verb(1.8,0.22);
    const BELL=[0,2,4,5,7,9,11], p=0.155;
    const S=[nn('F3'),nn('G3'),nn('A3'),nn('C4'),nn('D4'),nn('F4'),nn('G4'),nn('A4'),nn('C5'),nn('D5')];
    K.loop(p*12,(i,t)=>{
      BELL.forEach(b=>{ const at=t+b*p;
        [1,2.7,4.4].forEach((m,k)=>K.osc({ type:'sine', f:820*m, at:at, dur:0.22, g:0.10/(k+1), a:0.001, d:0.2, s:0.05, r:0.06, to:room }));
        K.noise({ at:at, dur:0.02, g:0.05, hp:5000, a:0.001, d:0.018, s:0, r:0.006, to:room }); });
      /* the calabash */
      [0,3,6,9].forEach(b=>K.osc({ type:'sine', f:96, at:t+b*p, dur:0.16, g:0.22, a:0.002, d:0.14, s:0, r:0.04, to:room }));
      [2,5,8,11].forEach(b=>K.noise({ at:t+b*p, dur:0.05, g:0.07, bp:2400, q:1, a:0.001, d:0.04, s:0, r:0.01, to:room }));
    });
    /* the kora: an ostinato of seven against the bell's twelve */
    K.loop(p*12*7/6,(i,t)=>{
      const base=[0,2,4,1,3,5,2][i%7];
      for(let k=0;k<7;k++){ const at=t+k*(p*12*7/6)/7;
        K.pluck(midi(S[(base+k*2)%S.length]),at,1.1,{ g:0.13, type:'triangle', close:0.5, to:room });
        if(k%2===0) K.pluck(midi(S[(base+k)%4])/2,at,1.3,{ g:0.11, type:'triangle', close:0.6, to:room }); }
    });
    K.loop(9.4,(i,t)=>{ if(i%2) return;
      const V=K.voice({ f:midi(nn('F3')), vowel:'e', at:t, dur:2.6, g:0.16, a:0.12, r:0.4, to:room, q:8 });
      V.pitch(midi(nn('A3')),t+0.9,0.5); V.set('a',t+1.1,0.3); V.pitch(midi(nn('F3')),t+1.9,0.6); V.set('o',t+2.0,0.3);
    });
  } },
{ id:"diesirae", name:"the tune that never died", tick:"dies irae", ago:776, hue:40, kind:"quotation", scene:"dies irae",
  prog:K=>{
    const room=K.verb(6,0.55);
    const ph=[[65,1],[64,1],[65,1],[62,1],[64,1],[60,1],[62,1],[62,2],[0,1.5]];
    const vow=['i','e','i','e','i','e','i','a'];
    function bell(at,g){ [1,2.0,2.4,3.0,4.2,5.4].forEach((m,k)=>K.osc({ type:'sine', f:98*m, at:at, dur:6/(k*0.5+1), g:g*[0.6,1,0.5,0.4,0.25,0.15][k], a:0.002, d:5/(k*0.5+1), s:0, r:0.5, to:room })); }
    K.loop(16.5,(i,t)=>{ bell(t,0.5); let k=0;
      seqPlay(ph,t+2.2,0.72,(n,at,d)=>{ for(let v=0;v<3;v++) K.voice({ f:midi(n-24)*(1+K.rr(-0.006,0.006))*(i%2?1.03:1), vowel:vow[k%vow.length], at:at+v*0.02, dur:d*0.95, g:0.3, a:0.06, r:0.18, to:K.pan((v-1)*0.5,room), q:7 }); k++; });
      k=0; seqPlay(ph,t+2.2+0.72*10.5,0.72,(n,at,d)=>{ for(let v=0;v<3;v++) K.voice({ f:midi(n-24)*(1+K.rr(-0.006,0.006))*(i%2?1.03:1), vowel:vow[k%vow.length], at:at+v*0.02, dur:d*0.95, g:0.26, a:0.06, r:0.18, to:K.pan((v-1)*0.5,room), q:7 }); k++; }); });
  } },
{ id:"press", name:"the press", tick:"gutenberg", ago:576, hue:35, kind:"evocation", scene:"the press",
  prog:K=>{
    const room=K.verb(1.4,0.22);
    K.loop(4.2,(i,t)=>{ const at=t+K.r()*0.3;
      const cr=K.noise({ color:'pink', at:at, dur:0.7, g:0.22, bp:700, q:6, a:0.05, r:0.1, to:room }); cr.head.frequency.setValueAtTime(500,at); cr.head.frequency.exponentialRampToValueAtTime(1400,at+0.65);
      K.noise({ color:'brown', at:at+0.75, dur:0.14, g:0.6, lp:400, a:0.002, d:0.12, s:0, r:0.03, to:room }); K.osc({ type:'sine', f:60, at:at+0.75, dur:0.18, g:0.4, a:0.002, d:0.15, s:0, r:0.03, to:room });
      const cr2=K.noise({ color:'pink', at:at+1.3, dur:0.5, g:0.16, bp:1400, q:6, a:0.05, r:0.1, to:room }); cr2.head.frequency.setValueAtTime(1400,at+1.3); cr2.head.frequency.exponentialRampToValueAtTime(500,at+1.75);
      K.noise({ color:'white', at:at+2.1, dur:0.35, g:0.12, hp:2500, a:0.08, d:0.3, s:0, r:0.05, to:room });
      K.noise({ color:'pink', at:at+2.8, dur:0.06, g:0.18, lp:900, a:0.003, d:0.05, s:0, r:0.02, to:room }); K.noise({ color:'pink', at:at+3.05, dur:0.06, g:0.18, lp:900, a:0.003, d:0.05, s:0, r:0.02, to:room }); });
    K.loop(23,(i,t)=>{ [1,2.0,2.4,3.0,4.2].forEach((m,k)=>K.osc({ type:'sine', f:147*m, at:t+K.r()*10, dur:4/(k*0.6+1), g:0.05*[0.6,1,0.5,0.35,0.2][k], a:0.002, d:3.5/(k*0.6+1), s:0, r:0.4, to:K.pan(0.7,room) })); });
  } },
{ id:"violin", name:"the shape nobody improved", tick:"cremona", ago:471, hue:24, kind:"evocation", scene:"the shape nobody improved",
  prog:K=>{
    const hall=K.verb(2.8,0.34);
    const hill=K.filt('peaking',2500,1.2,hall); hill.gain.value=9;
    const wood=K.filt('peaking',460,1.6,hill); wood.gain.value=6;
    const air=K.filt('peaking',280,1.8,wood); air.gain.value=5;
    const body=K.filt('lowpass',5200,0.6,air);
    function bow(f,at,dur,g){
      const x=K.osc({ type:'sawtooth', f:f, at:at, dur:dur, g:g==null?0.14:g, a:0.09, d:0.25, s:0.85, r:0.28, to:body });
      K.lfo(x.o.frequency,5.5,f*0.0055,'sine',at+0.35);
      K.noise({ at:at, dur:0.09, g:0.05, hp:2000, q:0.7, a:0.008, d:0.08, s:0, r:0.03, to:body });
      return x;
    }
    const LINE=[['D4',1.1],['A4',0.9],['B4',0.5],['C5',0.5],['D5',1.6],['C5',0.6],['A4',1.0],['F4',1.4]];
    K.loop(16,(i,t)=>{
      let at=t+0.4;
      LINE.forEach(n=>{ bow(hz(n[0]),at,n[1]*0.95); at+=n[1]; });
      bow(hz('D4'),at+0.3,3.2,0.12); bow(hz('A4'),at+0.3,3.2,0.10);      // the double stop
    });
  } },
{ id:"tallis", name:"forty voices", tick:"40 voices", ago:456, hue:56, kind:"evocation", scene:"forty voices",
  prog:K=>{
    const room=K.verb(9,0.55);
    /* one throat for all forty: three formants, and eight seats round the room */
    const bank=[[520,1],[1250,0.5],[2700,0.2]].map(b=>{ const f=K.filt('bandpass',b[0],1.5,null); const g=K.gain(b[1],room); f.connect(g); return f; });
    const seats=[]; for(let k=0;k<8;k++){ const p=K.pan(-0.9+1.8*(k/7),false); bank.forEach(f=>p.connect(f)); seats.push(p); }
    const CH=[[0,4,7,11,14],[0,3,7,10,14],[-1,4,7,11,16],[0,5,9,12,17]];
    const base=nn('C3'), CYC=68;
    const sing=(deg,at,dur,g,seat,det)=>K.osc({ type:'sawtooth', f:midi(base+deg)*(1+(det||0)), at:at, dur:dur, g:g, a:0.9, d:1.2, s:0.8, r:1.8, to:seats[seat] });
    K.loop(CYC,(i,t)=>{
      /* the wave: forty entries, one at a time, round the room. each voice is
         made a moment before it sings, so no frame ever builds more than one. */
      for(let v=0;v<40;v++){
        const at=t+1+v*1.05, ch=CH[Math.floor(v/10)%4], deg=ch[v%5]+12*((v%15<5)?0:(v%15<10?1:0)), dur=K.rr(7,12);
        K.after(Math.max(0.05,at-ctx.currentTime-0.5),()=>sing(deg,at,dur,0.05,v%8,K.rr(-0.004,0.004)));
      }
      /* and then, once, all forty at the same instant — built in four handfuls
         a second before, so the instant itself costs nothing. */
      const tut=t+CYC*0.74;
      for(let c=0;c<4;c++) K.after(Math.max(0.05,tut-ctx.currentTime-1.4+c*0.25),()=>{
        for(let v=c*10;v<c*10+10;v++) sing([0,4,7,12,16][v%5]+12*Math.floor(v/20),tut,6.5,0.045,v%8,K.rr(-0.004,0.004));
      });
    });
  } },
{ id:"toilet", name:"the first flush", tick:"the flush", ago:430, hue:195, kind:"evocation", scene:"the first flush",
  prog:K=>{
    const room=K.verb(1.6,0.25);
    K.loop(26,(i,t)=>{ const at=t+1;
      K.noise({ color:'white', at:at, dur:0.03, g:0.35, bp:2500, q:3, a:0.001, d:0.02, s:0, r:0.01, to:room }); K.osc({ type:'sine', f:800, at:at, dur:0.05, g:0.2, a:0.001, d:0.04, s:0, r:0.01, to:room });
      const rush=K.noise({ color:'white', at:at+0.3, dur:4.5, g:0.7, bp:1000, q:0.5, a:0.15, d:4, s:0.35, r:0.6, to:room }); rush.head.frequency.setValueAtTime(1400,at+0.3); rush.head.frequency.exponentialRampToValueAtTime(350,at+4.5);
      for(let k=0;k<40;k++){ const a=at+1.2+K.r()*3.4; const f=K.rr(180,700); const o=K.osc({ type:'sine', f:f, at:a, dur:0.12, g:0.14, a:0.004, d:0.1, s:0, r:0.02, to:room }); o.o.frequency.setValueAtTime(f,a); o.o.frequency.exponentialRampToValueAtTime(f*0.55,a+0.11); }
      const fill=K.noise({ color:'white', at:at+5, dur:13, g:0.16, bp:3000, q:2, a:0.5, r:0.4, to:room }); fill.head.frequency.setValueAtTime(2200,at+5); fill.head.frequency.exponentialRampToValueAtTime(5200,at+18);
      K.noise({ color:'brown', at:at+18.2, dur:0.12, g:0.35, lp:500, a:0.002, d:0.1, s:0, r:0.03, to:room }); K.osc({ type:'sine', f:110, at:at+18.2, dur:0.15, g:0.2, a:0.002, d:0.12, s:0, r:0.03, to:room });
      for(let k=0;k<4;k++){ const a=at+8+K.r()*14; const o=K.osc({ type:'sine', f:2600, at:a, dur:0.1, g:0.03, a:0.01, d:0.09, s:0, r:0.02, to:K.pan(0.8,room) }); o.o.frequency.exponentialRampToValueAtTime(3400,a+0.09); } });
  } },
{ id:"orfeo", name:"opera begins with a fanfare", tick:"orfeo", ago:419, hue:50, kind:"evocation", scene:"orfeo",
  prog:K=>{
    const room=K.verb(2.4,0.35);
    const brass=K.filt('bandpass',1600,0.7,room);
    const call=[[72,0.5],[72,0.5],[72,0.5],[76,1.5],[74,0.5],[72,0.5],[74,0.5],[76,1.5],[79,0.5],[76,0.5],[74,0.5],[72,1.5],[0,1]];
    K.loop(24,(i,t)=>{ for(let rep=0;rep<3;rep++){ const at=t+rep*7.2;
        K.noise({ color:'white', at:at-0.4, dur:6.5, g:0.12, bp:2600, q:0.8, a:0.3, r:0.6, to:room }); K.lfo(K.noise({ color:'white', at:at-0.4, dur:6.5, g:0.14, bp:600, q:1.2, a:0.3, r:0.6, to:room }).g.gain,18,0.12,'square',at);
        seqPlay(call,at,0.42,(n,a,d)=>{ [0,-12,-7].forEach((tr,k)=>K.osc({ type:'sawtooth', f:midi(n+tr)*(1+K.rr(-0.003,0.003)), at:a, dur:d*0.9, g:[0.26,0.16,0.12][k], a:0.02, d:0.1, s:0.8, r:0.06, to:brass })); }); } });
  } },
{ id:"piano", name:"soft and loud", tick:"the piano", ago:326, hue:42, kind:"evocation", scene:"soft and loud",
  prog:K=>{
    const room=K.verb(2.2,0.28);
    const board=K.filt('lowpass',7000,0.6,room);
    function key(f,at,dur,vel){
      const B=0.0004;
      for(let n=1;n<=9;n++){
        const fn=f*n*Math.sqrt(1+B*n*n);
        const g=(0.20/Math.pow(n,1.35))*Math.pow(vel,1+n*0.16);
        if(g<0.0015) continue;
        K.osc({ type:'sine', f:fn, at:at, dur:dur, g:g, a:0.002, d:dur*0.6, s:0.18, r:0.35, to:board });
      }
      K.noise({ at:at, dur:0.035, g:0.05*vel, bp:2200+3000*vel, q:0.9, a:0.001, d:0.03, s:0, r:0.012, to:board });
    }
    const PH=[['C4',0.5],['E4',0.5],['G4',0.5],['C5',0.9],['B4',0.4],['G4',0.4],['E4',0.4],['D4',1.2]];
    K.loop(19,(i,t)=>{
      let at=t+0.5;
      PH.forEach(n=>{ key(hz(n[0]),at,n[1]*1.9,0.22); at+=n[1]; });     // piano
      at+=1.2;
      PH.forEach(n=>{ key(hz(n[0]),at,n[1]*2.2,1.0); at+=n[1]; });      // e forte
      [ 'C3','G3','C4','E4','G4' ].forEach(s=>key(hz(s),at+0.5,7,0.8)); // the dampers off
    });
  } },
{ id:"bach", name:"the well-tempered clavier", tick:"bach", ago:304, hue:52, kind:"quotation", scene:"the well-tempered clavier",
  prog:K=>{
    const room=K.verb(2,0.3);
    const bars=[[60,64,67,72,76],[60,62,69,74,77],[59,62,67,74,77],[60,64,67,72,76],[60,64,69,76,81],[60,62,66,69,74],[59,62,67,74,79],[59,60,64,67,72]];
    const s=0.23;
    K.loop(s*16,(i,t)=>{ const b=bars[i%bars.length]; const pat=[0,1,2,3,4,2,3,4];
      for(let rep=0;rep<2;rep++) pat.forEach((p,k)=>{ const n=b[p]; K.pluck(midi(n),t+(rep*8+k)*s,p<2?s*8:s*1.6,{ g:p<2?0.22:0.2, close:0.08, d:p<2?s*8:s*1.5, to:room }); }); });
  } },
{ id:"mozart", name:"a little night music", tick:"mozart", ago:239, hue:55, kind:"quotation", scene:"a little night music",
  prog:K=>{
    const room=K.verb(2.2,0.3);
    const strings=K.filt('lowpass',3200,0.6,room);
    const ph=[[67,0.75],[62,0.25],[67,0.75],[62,0.25],[67,0.25],[62,0.25],[67,0.25],[71,0.25],[74,1],[0,0.5],[72,0.75],[69,0.25],[72,0.75],[69,0.25],[72,0.25],[69,0.25],[66,0.25],[69,0.25],[62,1],[0,1.5]];
    K.loop(9.2,(i,t)=>{ seqPlay(ph,t,0.5,(n,at,d)=>{ [[0,0.22],[-12,0.14],[-24,0.1]].forEach(v=>{ const o=K.osc({ type:'sawtooth', f:midi(n+v[0]), at:at, dur:d*0.92, g:v[1], a:0.03, d:0.1, s:0.85, r:0.05, to:strings }); if(d>0.4) K.lfo(o.o.frequency,5.5,midi(n+v[0])*0.005,'sine',at+0.15); }); }); });
  } },
{ id:"beethoven", name:"the ninth, from inside", tick:"beethoven", ago:202, hue:45, kind:"quotation", scene:"the ninth, from inside",
  prog:K=>{
    const room=K.verb(3.2,0.4);
    const inside=K.filt('lowpass',260,1.5,room), hall=K.filt('lowpass',5000,0.5,room);
    const ode=[[64,1],[64,1],[65,1],[67,1],[67,1],[65,1],[64,1],[62,1],[60,1],[60,1],[62,1],[64,1],[64,1.5],[62,0.5],[62,2],[64,1],[64,1],[65,1],[67,1],[67,1],[65,1],[64,1],[62,1],[60,1],[60,1],[62,1],[64,1],[62,1.5],[60,0.5],[60,2]];
    const bar=0.56;
    const floor=K.noise({ color:'brown', g:0.08, lp:90, a:2, to:room });
    K.loop(bar*34,(i,t)=>{ const open=i%2===1;
      seqPlay(ode,t,bar,(n,at,d)=>{ if(open){ [[0,0.2,'sawtooth'],[-12,0.14,'sawtooth'],[-24,0.12,'triangle'],[7,0.06,'sawtooth']].forEach(v=>{ const o=K.osc({ type:v[2], f:midi(n+v[0]), at:at, dur:d*0.95, g:v[1], a:0.05, d:0.1, s:0.9, r:0.08, to:hall }); K.lfo(o.o.frequency,5,midi(n+v[0])*0.004,'sine',at+0.2); });
            K.rich(midi(n-24),at,d,{ g:0.12, part:[[1,1],[2,0.4]], a:0.02, to:hall }); }
        else { K.rich(midi(n-12),at,d*0.95,{ g:0.35, part:[[1,1],[2,0.3]], a:0.03, to:inside }); K.osc({ type:'sine', f:midi(n-24), at:at, dur:d*0.95, g:0.25, a:0.03, r:0.1, to:inside }); } });
      if(open) for(let k=0;k<32;k+=2) K.kick(t+k*bar,0.35,{ f:90, f2:50, dur:0.5, to:hall });
      floor.g.gain.setTargetAtTime(open?0.03:0.10,t,1); });
  } },
{ id:"morse", name:"what hath god wrought", tick:"morse", ago:182, hue:60, kind:"quotation", scene:"what hath god wrought",
  prog:K=>{
    const room=K.verb(0.8,0.15);
    K.osc({ type:'sine', f:60, g:0.02, a:1, to:room });
    K.loop(22,(i,t)=>{ morseKey('what hath god wrought',t+1,0.09,(at,d)=>{ K.osc({ type:'sine', f:800, at:at, dur:d, g:0.3, a:0.004, r:0.01, to:room });
        K.noise({ color:'white', at:at, dur:0.008, g:0.4, bp:3000, q:2, a:0.001, d:0.006, s:0, r:0.002, to:room }); K.noise({ color:'white', at:at+d, dur:0.008, g:0.3, bp:2200, q:2, a:0.001, d:0.006, s:0, r:0.002, to:room }); }); });
  } },
{ id:"phonautograph", name:"the first recorded voice", tick:"1860", ago:166, hue:40, kind:"quotation", scene:"the first recorded voice",
  prog:K=>{
    const room=K.verb(0.6,0.15);
    const chan=K.filt('bandpass',900,0.5,room);
    const tune=[[60,1],[60,1],[60,1],[62,1],[64,2],[62,2],[60,1],[64,1],[62,1],[62,1],[60,4],[0,2]];
    K.loop(26,(i,t)=>{ [[t+1,2,0.28],[t+9,1,0.36]].forEach(pass=>{ const at0=pass[0], sp=pass[1], g=pass[2]; const unit=0.55/sp;
        const hiss=K.noise({ color:'pink', at:at0-0.5, dur:14*unit+1, g:0.2, hp:600, a:0.3, r:0.3, to:chan }); K.lfo(hiss.g.gain,1.4/sp,0.08,'sine',at0);
        seqPlay(tune,at0,unit,(n,at,d)=>{ const f=midi(n-12)*sp*(1+K.rr(-0.02,0.02)); const V=K.voice({ f:f, vowel:K.pick(['a','o','e','i','u']), at:at, dur:d*0.9, g:g, a:0.03, r:0.05, to:chan, q:6 }); K.lfo(V.src.frequency,1.6*sp,f*0.03,'sine',at); }); }); });
  } },
{ id:"tristan", name:"the chord that waits", tick:"tristan", ago:161, hue:300, kind:"quotation", scene:"the chord that waits",
  prog:K=>{
    const hall=K.verb(3.6,0.4);
    const strings=K.filt('lowpass',3600,0.6,hall);
    function bowed(f,at,dur,g,type){
      const x=K.osc({ type:type||'sawtooth', f:f, at:at, dur:dur, g:g==null?0.09:g, a:0.22, d:0.4, s:0.8, r:0.6, to:strings });
      K.lfo(x.o.frequency,5,f*0.004,'sine',at+0.4); return x;
    }
    K.loop(26,(i,t)=>{
      for(let rep=0;rep<2;rep++){
        const s=rep*1, at=t+rep*10+0.5;                                   // the second statement, a step higher
        bowed(midi(nn('A2')+s),at,1.5,0.13);                              // the rising sixth, alone
        bowed(midi(nn('F3')+s),at+1.5,1.4,0.13);
        const ch=[nn('F2'),nn('B2'),nn('D#3'),nn('G#3')].map(n=>midi(n+s));
        ch.forEach((f,k)=>bowed(f,at+3.2,3.4,0.085,k===3?'triangle':'sawtooth'));   // the chord
        bowed(midi(nn('G#3')+s),at+5.0,0.7,0.09,'triangle');
        bowed(midi(nn('A3')+s),at+5.7,1.6,0.10,'triangle');               // the oboe's rise
        [nn('E2'),nn('G#2'),nn('D3'),nn('B3')].map(n=>midi(n+s)).forEach(f=>bowed(f,at+6.6,2.6,0.075));  // and no answer
      }
    });
  } },
{ id:"waltz", name:"the blue danube", tick:"the waltz", ago:159, hue:55, kind:"quotation", scene:"the blue danube",
  prog:K=>{
    const room=K.verb(3,0.35);
    const strings=K.filt('lowpass',3800,0.5,room);
    const ph=[[62,1],[66,1],[69,1],[69,2],[0,1],[81,1],[81,2],[0,1],[78,1],[78,2],[62,1],[66,1],[69,1],[69,2],[0,1],[81,1],[81,2],[0,1],[79,1],[79,2],[62,1],[67,1],[71,1],[71,2],[0,1],[83,1],[83,2],[0,1],[79,1],[79,2],[0,3]];
    const beat=0.36;
    K.loop(beat*3,(i,t)=>{ const chords=[[38,[62,66,69]],[38,[62,66,69]],[38,[62,66,69]],[38,[62,66,69]],[45,[61,64,69]],[45,[61,64,69]],[45,[61,64,69]],[45,[61,64,69]],[38,[62,66,69]],[38,[62,66,69]],[43,[62,67,71]],[43,[62,67,71]]]; const c=chords[i%12];
      K.rich(midi(c[0]),t,beat*0.9,{ g:0.16, part:[[1,1],[2,0.4]], a:0.01, type:'triangle', to:room });
      for(let k=1;k<3;k++) c[1].forEach(n=>K.osc({ type:'sawtooth', f:midi(n), at:t+k*beat, dur:beat*0.5, g:0.05, a:0.01, d:0.15, s:0.3, r:0.05, to:strings })); });
    K.loop(beat*39,(i,t)=>{ seqPlay(ph,t,beat,(n,at,d)=>{ [[0,0.2],[-12,0.1]].forEach(v=>{ const o=K.osc({ type:'sawtooth', f:midi(n+v[0]), at:at, dur:d*0.9, g:v[1], a:0.04, d:0.1, s:0.85, r:0.08, to:strings }); K.lfo(o.o.frequency,5.5,midi(n+v[0])*0.005,'sine',at+0.1); }); }); });
    const trem=K.osc({ type:'sawtooth', f:midi(62), g:0.05, a:2, to:strings }); K.lfo(trem.g.gain,11,0.04,'sine');
  } },
{ id:"telephone", name:"mr watson, come here", tick:"telephone", ago:150, hue:60, kind:"evocation", scene:"mr watson, come here",
  prog:K=>{
    const room=K.verb(0.9,0.15);
    const line=K.filt('bandpass',1000,0.35,room);
    const dist=K.shape(6,line);
    K.osc({ type:'sine', f:120, g:0.015, a:1, to:room });
    function ring(at){ for(let k=0;k<30;k++){ const a=at+k*0.05; [1,2.7,4.1].forEach((m,j)=>K.osc({ type:'sine', f:1350*m, at:a, dur:0.06, g:0.12*[1,0.4,0.2][j], a:0.001, d:0.05, s:0, r:0.01, to:room })); } }
    K.loop(18,(i,t)=>{ ring(t+0.5); ring(t+3.5);
      const syl=[0,0.28,0.5,0.9,1.35,1.55,1.75,2.0,2.2,2.55]; const f0=125;
      syl.forEach((s,k)=>{ const at=t+7+s; const V=K.voice({ f:f0*K.rr(0.85,1.2), vowel:K.pick(['a','e','o','i','u']), at:at, dur:0.22, g:0.7, a:0.02, r:0.05, to:dist, q:7 }); });
      K.noise({ color:'white', at:t+6.5, dur:4, g:0.06, hp:1500, a:0.2, r:0.3, to:line }); for(let k=0;k<12;k++) K.noise({ color:'white', at:t+6.5+K.r()*4, dur:0.01, g:0.2, bp:2500, q:2, a:0.001, d:0.008, s:0, r:0.003, to:line }); });
  } },
{ id:"edison", name:"mary had a little lamb", tick:"edison", ago:149, hue:45, kind:"quotation", scene:"mary had a little lamb",
  prog:K=>{
    const room=K.verb(0.5,0.12);
    const horn=K.filt('bandpass',1300,0.6,room);
    const tune=[[64,1],[62,1],[60,1],[62,1],[64,1],[64,1],[64,2],[62,1],[62,1],[62,2],[64,1],[67,1],[67,2],[64,1],[62,1],[60,1],[62,1],[64,1],[64,1],[64,1],[64,1],[62,1],[62,1],[64,1],[62,1],[60,4]];
    K.loop(24,(i,t)=>{ const at0=t+2, unit=0.3;
      const crank=K.noise({ color:'pink', at:t, dur:22, g:0.12, bp:180, q:1.5, a:0.5, r:0.5, to:room }); K.lfo(crank.g.gain,1.7,0.08,'sine',t);
      const foil=K.noise({ color:'white', at:at0-0.3, dur:16, g:0.09, hp:2500, a:0.2, r:0.3, to:horn }); for(let k=0;k<60;k++) K.noise({ color:'white', at:at0+K.r()*15, dur:0.006, g:0.25*K.r(), bp:3000, q:2, a:0.001, d:0.005, s:0, r:0.002, to:horn });
      seqPlay(tune,at0,unit,(n,at,d)=>{ const f=midi(n-12)*(1+K.rr(-0.015,0.015)); const V=K.voice({ f:f, vowel:K.pick(['a','e','i','a']), at:at, dur:d*0.85, g:0.9, a:0.02, r:0.04, to:horn, q:6 }); K.lfo(V.src.frequency,1.7,f*0.02,'sine',at); }); });
  } },
{ id:"satie", name:"gymnopédie", tick:"satie", ago:138, hue:50, kind:"quotation", scene:"gymnopédie",
  prog:K=>{
    const room=K.verb(3,0.4);
    const piano=(n,at,d,g)=>K.rich(midi(n),at,d,{ g:g, part:[[1,1],[2,0.3],[3,0.12],[4,0.05]], a:0.004, d:d*0.9, s:0.35, r:0.3, to:room });
    const beat=0.85;
    const chords=[[43,[59,62,66]],[38,[57,61,66]]];
    K.loop(beat*3,(i,t)=>{ const c=chords[i%2]; piano(c[0],t,beat*2.8,0.14); c[1].forEach(n=>piano(n,t+beat,beat*1.9,0.07)); });
    const tune=[[78,1],[81,1],[79,1],[78,1],[73,1],[71,1],[73,1],[74,1],[69,6],[0,3]];
    const mode=[69,71,73,74,76,78,79,81];
    K.loop(beat*3*12,(i,t)=>{ const at0=t+beat*12;
      if(i%2===0) seqPlay(tune,at0,beat,(n,at,d)=>piano(n,at,d,0.16));
      else { let cur=5; for(let k=0;k<15;k++){ if(K.r()<0.25) continue; cur=clamp(cur+Math.floor(K.rr(-2,3)),0,mode.length-1); piano(mode[cur],at0+k*beat,beat*K.pick([1,1,2,3]),0.14); } } });
  } },
{ id:"joplin", name:"ragtime", tick:"ragtime", ago:127, hue:45, kind:"evocation", scene:"ragtime",
  prog:K=>{
    const room=K.verb(1.2,0.2);
    const piano=(n,at,d,g)=>{ const f=midi(n); [[1,1],[2,0.35],[3,0.15]].forEach(p=>K.osc({ type:p[0]===1?'sawtooth':'sine', f:f*p[0]*(1+K.rr(-0.003,0.003)), at:at, dur:d, g:g*p[1]*(p[0]===1?0.5:1), a:0.003, d:d, s:0.2, r:0.08, to:room })); };
    const prog=[[44,[56,60,63]],[44,[56,60,63]],[51,[58,63,67]],[51,[58,63,67]],[44,[56,60,63]],[49,[56,61,65]],[51,[58,63,67]],[44,[56,60,63]]];
    const e=0.16;
    K.loop(e*8,(i,t)=>{ const c=prog[i%prog.length];
      [0,4].forEach((k,j)=>{ piano(c[0]-12,t+k*e,e*1.8,0.32); piano(c[0]-(j?5:0),t+k*e,e*1.8,0.2); });
      [2,6].forEach(k=>c[1].forEach(n=>piano(n,t+k*e,e*1.5,0.1)));
      const tones=c[1].concat(c[1].map(n=>n+12)); const acc=[0,3,4,6,7]; let last=K.pick(tones);
      for(let k=0;k<8;k++){ if(K.r()<0.3) continue; last=K.pick(tones); piano(last+12,t+k*e,e*1.4,acc.includes(k)?0.26:0.16); if(K.r()<0.4) piano(last+16,t+k*e,e*1.2,0.12); } });
  } },
{ id:"fessenden", name:"the first radio song", tick:"first radio", ago:120, hue:30, kind:"evocation", scene:"the first radio song",
  prog:K=>{
    const room=K.verb(0.8,0.15);
    const chan=K.filt('bandpass',1100,0.45,room);
    const stat=K.noise({ color:'pink', g:0.16, hp:300, a:1, to:chan }); K.lfo(stat.g.gain,0.23,0.06);
    const het=K.osc({ type:'sine', f:900, g:0.03, a:1, to:chan }); K.lfo(het.o.frequency,0.05,600); K.lfo(het.g.gain,0.4,0.02);
    K.loop(0.4,(i,t)=>{ if(K.r()<0.35) K.noise({ color:'white', at:t+K.r()*0.3, dur:0.01, g:0.25, bp:2200, q:2, a:0.001, d:0.008, s:0, r:0.003, to:chan }); });
    const mode=[60,62,64,65,67,69,71,72,74];
    K.loop(0.9,(i,t)=>{ const k=i%16; if(k>12) return; if(K.r()<0.15) return; const n=mode[clamp(Math.floor(4+Math.sin(i*0.7)*3+K.rr(-1,2)),0,mode.length-1)]; const f=midi(n); const d=K.pick([0.8,1.6,1.6,2.4]);
      const o=K.osc({ type:'sawtooth', f:f, at:t, dur:d, g:0.28, a:0.12, d:0.2, s:0.85, r:0.15, to:chan }); K.lfo(o.o.frequency,5.8,f*0.007,'sine',t+0.25); });
  } },
{ id:"russolo", name:"the art of noises", tick:"russolo", ago:113, hue:20, kind:"evocation", scene:"the art of noises",
  prog:K=>{
    const room=K.verb(2.2,0.3);
    K.loop(60,(i,t)=>{
      const u=K.osc({ type:'sine', f:220, at:t+2, dur:40, g:0.25, a:2, r:3, to:room }); K.lfo(u.o.frequency,0.7,80,'sine',t+2); K.lfo(u.o.frequency,0.09,60,'sine',t+2);
      for(let k=0;k<160;k++) K.noise({ color:'white', at:t+10+K.r()*30, dur:0.02, g:0.3*K.r(), bp:K.rr(800,3000), q:3, a:0.001, d:0.015, s:0, r:0.005, to:K.pan(-0.5,room) });
      const r=K.osc({ type:'sawtooth', f:95, at:t+18, dur:30, g:0.18, a:3, r:3, to:K.filt('lowpass',900,4,K.pan(0.4,room)) }); K.lfo(r.g.gain,9,0.12,'square',t+18); K.lfo(r.o.frequency,0.2,12,'sine',t+18);
      const s=K.noise({ color:'white', at:t+26, dur:24, g:0.2, bp:3000, q:12, a:2, r:2, to:room }); K.lfo(s.head.frequency,0.15,1800,'sine',t+26);
      for(let k=0;k<6;k++){ const at=t+34+k*3.5; K.noise({ color:'brown', at:at, dur:3, g:0.7, lp:200, a:0.1, d:2.6, s:0, r:0.5, to:room }); }
      K.noise({ color:'pink', at:t+52, dur:6, g:0.3, bp:1200, q:1, a:0.5, d:4, s:0.2, r:1, to:room }); });
  } },
{ id:"rite", name:"the riot", tick:"the rite", ago:112.8, hue:8, kind:"evocation", scene:"the riot",
  prog:K=>{
    const hall=K.verb(2.4,0.3);
    const str=K.filt('lowpass',4200,0.6,hall);
    const q=60/160;
    const CH=[nn('E3'),nn('G#3'),nn('B3'),nn('E4'),nn('F4'),nn('Ab4'),nn('C5')];   // two triads, crushed
    const ACC=[0,3,5,9,10,14,17,21,22,26];                                        // the radio's own accents
    const reed=K.filt('lowpass',2600,1.4,hall), horns=K.filt('lowpass',1800,0.7,hall);
    K.loop(q*4,(i,t)=>{                                                           // one bar at a time
      const bar=i%8;
      if(bar<2){ if(bar===0){ let at=t+0.1;                                        // the reed, too high for comfort
          [nn('C6'),nn('D6'),nn('Bb5'),nn('C6'),nn('Eb6'),nn('D6')].forEach(n=>{
            K.osc({ type:'square', f:midi(n), at:at, dur:0.55, g:0.05, a:0.05, d:0.3, s:0.5, r:0.2, to:reed }); at+=K.rr(0.45,0.85); }); }
        return; }
      for(let k=0;k<8;k++){ const b=(bar-2)*8+k, at=t+k*q*0.5, acc=ACC.indexOf(b)>=0;
        CH.forEach((n,j)=>K.osc({ type:'sawtooth', f:midi(n)*(1+K.rr(-0.003,0.003)), at:at, dur:0.22, g:(acc?0.11:0.045)/(1+j*0.25), a:0.004, d:0.18, s:0.1, r:0.06, to:str }));
        if(acc){ K.kick(at,0.6,{ f:110, f2:44, to:hall });
          [nn('E2'),nn('B2'),nn('E3')].forEach(n=>K.osc({ type:'sawtooth', f:midi(n), at:at, dur:0.3, g:0.09, a:0.01, d:0.26, s:0.2, r:0.08, to:horns })); }
        K.noise({ at:at, dur:0.05, g:acc?0.10:0.03, bp:3000, q:0.8, a:0.001, d:0.04, s:0, r:0.015, to:hall });
      }
    });
  } },
{ id:"jazz", name:"the first jazz record", tick:"jazz", ago:109, hue:45, kind:"evocation", scene:"the first jazz record",
  prog:K=>{
    const room=K.verb(0.7,0.12);
    const disc=K.filt('bandpass',1500,0.35,room);
    const stat=K.noise({ color:'pink', g:0.10, hp:800, a:0.5, to:disc }); K.lfo(stat.g.gain,1.3,0.04);
    K.loop(0.3,(i,t)=>{ if(K.r()<0.5) K.noise({ color:'white', at:t+K.r()*0.25, dur:0.008, g:0.3, bp:2500, q:2, a:0.001, d:0.006, s:0, r:0.002, to:disc }); });
    const bpm=210, q=60/bpm;
    const blues=[46,46,46,46,51,51,46,46,53,51,46,53];
    K.loop(q*4,(i,t)=>{ const bar=i%12, root=blues[bar]; const c=[root+12,root+16,root+19,root+22];
      [0,2].forEach(k=>K.rich(midi(root),t+k*q,q*0.8,{ g:0.25, part:[[1,1],[2,0.5],[3,0.2]], a:0.01, type:'triangle', to:disc }));
      [1,3].forEach(k=>{ c.forEach(n=>K.pluck(midi(n),t+k*q,q*0.5,{ g:0.08, close:0.05, to:disc })); K.noise({ color:'white', at:t+k*q, dur:0.03, g:0.12, bp:3000, q:1, a:0.001, d:0.025, s:0, r:0.01, to:disc }); });
      if(K.r()<0.7){ const f=midi(K.pick(c)+12); const o=K.osc({ type:'sawtooth', f:f*0.7, at:t+K.r()*q*2, dur:q*1.6, g:0.16, a:0.03, r:0.05, to:disc }); o.o.frequency.exponentialRampToValueAtTime(f,t+K.r()*q*2+q*0.6); K.lfo(o.o.frequency,7,f*0.01,'sine',t); }
      if(bar%4===3&&K.r()<0.6){ const at=t+2*q; const o=K.osc({ type:'sawtooth', f:1400, at:at, dur:0.5, g:0.14, a:0.01, r:0.05, to:disc }); o.o.frequency.setValueAtTime(1100,at); o.o.frequency.exponentialRampToValueAtTime(1700,at+0.12); o.o.frequency.exponentialRampToValueAtTime(900,at+0.45); }
      for(let k=0;k<4;k++){ if(K.r()<0.35) K.osc({ type:'sawtooth', f:midi(K.pick(c)), at:t+k*q, dur:q*0.4, g:0.12, a:0.01, r:0.04, to:K.filt('bandpass',1800,1,disc) }); } });
  } },
{ id:"theremin", name:"the instrument you do not touch", tick:"theremin", ago:106, hue:190, kind:"evocation", scene:"the instrument you do not touch",
  prog:K=>{
    const room=K.verb(2.5,0.3);
    const amp=K.shape(1.5,room);
    const o=K.osc({ type:'sine', f:440, g:0.32, a:1.5, to:amp }); const o2=K.osc({ type:'sine', f:880, g:0.05, a:1.5, to:amp });
    K.lfo(o.o.frequency,6,10); K.lfo(o2.o.frequency,6,20);
    const mode=[57,60,62,64,67,69,72,74,76,79];
    let cur=4;
    K.loop(1.4,(i,t)=>{ if(i%7===6){ o.g.gain.setTargetAtTime(0.02,t,0.3); o.g.gain.setTargetAtTime(0.32,t+1.2,0.2); return; }
      cur=clamp(cur+Math.floor(K.rr(-3,4)),0,mode.length-1); const f=midi(mode[cur]); const gl=K.rr(0.25,0.8);
      o.o.frequency.exponentialRampToValueAtTime(f,t+gl); o2.o.frequency.exponentialRampToValueAtTime(f*2,t+gl);
      o.g.gain.setTargetAtTime(K.rr(0.18,0.36),t,0.4); });
  } },
{ id:"twelve", name:"twelve tones, none of them home", tick:"the row", ago:103.5, hue:265, kind:"evocation", scene:"twelve tones",
  prog:K=>{
    const room=K.verb(2.6,0.3);
    const row=[0,1,2,3,4,5,6,7,8,9,10,11];
    for(let i=11;i>0;i--){ const j=Math.floor(K.r()*(i+1)); const s=row[i]; row[i]=row[j]; row[j]=s; }
    const P=row.slice(), I=row.map(n=>(row[0]*2-n+24)%12), R=P.slice().reverse(), RI=I.slice().reverse();
    const base=nn('C4');
    function ping(f,at,g){
      [[1,1],[2.01,0.4],[3.02,0.16]].forEach(p=>K.osc({ type:'sine', f:f*p[0], at:at, dur:1.6, g:(g||0.16)*p[1], a:0.002, d:1.3, s:0.06, r:0.4, to:room }));
      K.noise({ at:at, dur:0.02, g:0.03, hp:5000, a:0.001, d:0.018, s:0, r:0.008, to:room });
    }
    K.loop(6.4,(i,t)=>{
      let at=t+0.3;
      [P,I,R,RI][i%4].forEach((n,k)=>{ ping(midi(base+n+(k%3===2?12:0)),at,0.15); at+=0.42; });
      if(i%8===7) P.forEach((n,k)=>ping(midi(base+n+(k%2?12:0)),at+0.9,0.07));    // and all twelve at once
    });
  } },
{ id:"clave", name:"the pattern that crossed", tick:"the clave", ago:96.5, hue:20, kind:"evocation", scene:"the pattern that crossed",
  prog:K=>{
    const room=K.verb(1.4,0.2);
    const p=60/186/2, CL=[0,3,6,10,12];
    const CH=[[nn('C4'),nn('E4'),nn('G4')],[nn('D4'),nn('F4'),nn('A4')]];
    K.loop(p*16,(i,t)=>{
      CL.forEach(b=>{ const at=t+b*p;
        K.noise({ at:at, dur:0.03, g:0.30, bp:2400, q:2.2, a:0.0008, d:0.025, s:0, r:0.008, to:room });
        K.osc({ type:'sine', f:2350, at:at, dur:0.05, g:0.12, a:0.0008, d:0.04, s:0, r:0.01, to:room }); });
      for(let b=0;b<16;b+=2) K.noise({ at:t+b*p, dur:0.06, g:0.05, bp:5200, q:0.9, a:0.002, d:0.05, s:0, r:0.015, to:room });  // the gourd
      [6,12].forEach(b=>{ const f=midi(nn('C2')+(b===6?7:0));
        K.osc({ type:'sine', f:f, at:t+b*p, dur:0.5, g:0.42, a:0.006, d:0.4, s:0.2, r:0.1, to:room }); });                     // the anticipated bass
      [2,5,8,11,14].forEach((b,k)=>CH[k%2].forEach(n=>K.pluck(midi(n),t+b*p,0.5,{ g:0.09, type:'triangle', close:0.2, to:room })));
      [7,15].forEach(b=>{ K.osc({ type:'sine', f:midi(nn('G2')), at:t+b*p, dur:0.3, g:0.3, a:0.003, d:0.25, s:0, r:0.06, to:room });
        K.noise({ at:t+(b-1)*p, dur:0.08, g:0.12, bp:800, q:1.4, a:0.002, d:0.07, s:0, r:0.02, to:room }); });                 // congas
      if(i%4===3){ let at=t+8*p; [nn('G4'),nn('A4'),nn('C5'),nn('A4')].forEach(n=>{
        K.rich(midi(n),at,0.5,{ part:[[1,1],[2,0.7],[3,0.45],[4,0.2],[5,0.1]], g:0.07, type:'sawtooth', a:0.02, d:0.3, s:0.6, r:0.12, to:K.filt('lowpass',3200,0.8,room) }); at+=0.42; }); }
    });
  } },
{ id:"swing", name:"the band that swung", tick:"swing", ago:94.5, hue:44, kind:"evocation", scene:"the band that swung",
  prog:K=>{
    const room=K.verb(1.9,0.26);
    const q=60/168, sw=q*0.66;
    const soft=K.filt('lowpass',2800,0.7,room), brass=K.filt('lowpass',5200,0.7,room), reedy=K.filt('lowpass',3400,1.1,room);
    const WALK=[nn('C2'),nn('E2'),nn('G2'),nn('A2'),nn('F2'),nn('A2'),nn('C3'),nn('B2')];
    const SAX=[[nn('C4'),nn('E4'),nn('G4'),nn('Bb4')],[nn('D4'),nn('F4'),nn('A4'),nn('C5')]];
    K.loop(q*8,(i,t)=>{
      for(let b=0;b<8;b++){ const at=t+b*q;
        K.pluck(midi(WALK[(i*8+b)%WALK.length]),at,q*0.9,{ g:0.26, type:'triangle', close:0.18, to:room });   // the bass, walking
        K.noise({ at:at, dur:0.24, g:0.09, hp:6500, q:0.7, a:0.002, d:0.2, s:0.1, r:0.05, to:room });          // the ride
        if(b%2===0) K.noise({ at:at+sw, dur:0.16, g:0.05, hp:7000, q:0.7, a:0.002, d:0.14, s:0, r:0.04, to:room });
        if(b===2||b===6) K.noise({ at:at, dur:0.18, g:0.10, bp:2000, q:0.6, a:0.004, d:0.15, s:0, r:0.05, to:room }); // brushes
      }
      /* the sections, answering */
      const call=(i%2===0);
      const set=SAX[i%2], at0=t+(call?0:q*4);
      set.forEach((n,k)=>{
        const bright=!call;
        K.rich(midi(n+(bright?12:0)),at0+k*sw*0.5,q*1.6,{ part:bright?[[1,1],[2,0.75],[3,0.5],[4,0.28],[5,0.14]]:[[1,1],[2,0.4],[3,0.22],[4,0.08]],
          g:bright?0.045:0.05, type:'sawtooth', a:bright?0.02:0.06, d:q, s:0.6, r:0.18, to:bright?brass:soft, det:K.rr(-7,7) });
      });
      /* the clarinet on top */
      if(i%4===3){ let at=t+q*4; [nn('G5'),nn('A5'),nn('Bb5'),nn('A5'),nn('F5')].forEach(n=>{
        K.osc({ type:'square', f:midi(n), at:at, dur:sw*0.9, g:0.045, a:0.02, d:0.1, s:0.6, r:0.08, to:reedy }); at+=sw; }); }
    });
  } },
{ id:"blues", name:"the crossroads", tick:"the blues", ago:90, hue:30, kind:"evocation", scene:"the crossroads",
  prog:K=>{
    const room=K.verb(0.6,0.12);
    const bpm=84, q=60/bpm;
    const roots=[43,43,43,43,48,48,43,43,50,48,43,50];
    K.loop(q*4,(i,t)=>{ const root=roots[i%12];
      for(let k=0;k<4;k++){ K.pluck(midi(root-12),t+k*q,q*0.9,{ g:0.28, close:0.2, to:room }); K.noise({ color:'brown', at:t+k*q, dur:0.05, g:0.12, lp:300, a:0.002, d:0.04, s:0, r:0.01, to:room }); if(k%2) K.pluck(midi(root-5),t+k*q+q*0.5,q*0.4,{ g:0.16, close:0.15, to:room }); }
      if(K.r()<0.8){ const n=K.pick([root+12,root+15,root+17,root+19,root+22,root+24]); const at=t+K.r()*q*2; const f=midi(n); const x=K.pluck(f*0.94,at,q*2.2,{ g:0.3, close:0.8, to:room }); x.o.frequency.setValueAtTime(f*0.94,at); x.o.frequency.exponentialRampToValueAtTime(f,at+0.18); K.lfo(x.o.frequency,5.5,f*0.012,'sine',at+0.4); }
      if(i%4===3&&K.r()<0.6){ const V=K.voice({ f:110, vowel:'m', at:t+q*2, dur:q*1.5, g:0.2, a:0.1, r:0.2, to:room, q:6 }); V.pitch(120,t+q*3,0.4); } });
  } },
{ id:"bebop", name:"too fast to dance to", tick:"bebop", ago:81.5, hue:58, kind:"evocation", scene:"too fast to dance to",
  prog:K=>{
    const room=K.verb(1.2,0.2);
    const q=60/272, sw=q*0.63;
    const alto=K.filt('lowpass',4200,0.9,room);
    const CH=[[0,4,7,11],[2,5,9,12],[7,11,14,17],[0,4,7,11]];
    const bass=[0,4,7,9,2,5,9,11,7,11,2,5,0,7,4,0];
    let last=nn('C5');
    K.loop(q*4,(i,t)=>{
      const ch=CH[i%4], root=nn('C3');
      for(let b=0;b<4;b++){ const at=t+b*q;
        K.pluck(midi(root+bass[(i*4+b)%16]-12),at,q*0.85,{ g:0.24, type:'triangle', close:0.16, to:room });
        K.noise({ at:at, dur:0.2, g:0.075, hp:7000, q:0.7, a:0.002, d:0.18, s:0.1, r:0.05, to:room });
        if(b%2===0) K.noise({ at:at+sw, dur:0.12, g:0.05, hp:7500, q:0.7, a:0.002, d:0.1, s:0, r:0.03, to:room });
        if(b===1||b===3) K.noise({ at:at, dur:0.1, g:0.09, hp:5000, q:0.8, a:0.001, d:0.08, s:0, r:0.02, to:room });
        if(K.r()<0.22) K.kick(at+(K.r()<0.5?0:sw),0.4,{ f:130, f2:52, dur:0.2, to:room });
      }
      /* the line */
      let at=t;
      for(let k=0;k<8;k++){
        const target=nn('C4')+ch[Math.floor(K.r()*4)]+(K.r()<0.45?12:0);
        let n=(K.r()<0.3)?target-1:(last+(target>last?1:-1)*Math.max(1,Math.round(Math.abs(target-last)/2)));
        if(K.r()<0.15) n=target+7;
        last=n;
        K.rich(midi(n),at,sw*0.95,{ part:[[1,1],[2,0.6],[3,0.42],[4,0.18]], g:0.055, type:'sawtooth',
          a:0.012, d:sw*0.5, s:0.55, r:0.06, to:alto });
        at+=(k%2===0)?sw:(q-sw);
      }
    });
  } },
{ id:"boom", name:"the sound barrier", tick:"mach 1", ago:79, hue:210, kind:"evocation", scene:"mach 1",
  prog:K=>{
    const room=K.verb(7,0.45);
    K.loop(40,(i,t)=>{
      const eng=K.noise({ color:'pink', at:t, dur:12, g:0.35, bp:600, q:0.8, a:0.5, r:2, to:room }); eng.g.gain.setValueAtTime(0.35,t+4); eng.g.gain.exponentialRampToValueAtTime(0.02,t+12); eng.head.frequency.exponentialRampToValueAtTime(220,t+12);
      const wl=K.noise({ color:'pink', at:t, dur:12, g:0.18, bp:1800, q:2, a:0.5, r:2, to:room }); wl.head.frequency.setValueAtTime(2600,t+3); wl.head.frequency.exponentialRampToValueAtTime(400,t+12);
      const c=t+18;
      [0,0.11].forEach(dt=>{ K.noise({ color:'white', at:c+dt, dur:0.03, g:1.5, lp:4000, a:0.001, d:0.025, s:0, r:0.005, to:room }); K.noise({ color:'brown', at:c+dt, dur:0.25, g:1.2, lp:400, a:0.001, d:0.2, s:0, r:0.03, to:room }); const s=K.osc({ type:'sine', f:60, at:c+dt, dur:0.4, g:1.0, a:0.001, d:0.35, s:0, r:0.05, to:room }); s.o.frequency.exponentialRampToValueAtTime(25,c+dt+0.3); });
      K.noise({ color:'brown', at:c+0.3, dur:9, g:0.6, lp:250, a:0.05, d:8, s:0.05, r:1, to:room });
      const wind=K.noise({ color:'pink', at:c+6, dur:16, g:0.12, lp:900, a:4, r:5, to:room }); K.lfo(wind.g.gain,0.12,0.06,'sine',c+6); });
  } },
{ id:"schaeffer", name:"a study of railways", tick:"concrète", ago:78, hue:200, kind:"evocation", scene:"a study of railways",
  prog:K=>{
    const room=K.verb(1.5,0.22);
    const chuff=(at,g,d)=>K.noise({ color:'pink', at:at, dur:d||0.18, g:g, bp:400, q:0.7, a:0.01, d:(d||0.18)*0.9, s:0, r:0.04, to:room });
    const clack=at=>{ K.noise({ color:'white', at:at, dur:0.02, g:0.4, bp:2000, q:2, a:0.001, d:0.015, s:0, r:0.005, to:room }); K.noise({ color:'white', at:at+0.09, dur:0.02, g:0.3, bp:1800, q:2, a:0.001, d:0.015, s:0, r:0.005, to:room }); };
    const whistle=(at,d)=>[622,830].forEach(f=>K.osc({ type:'sine', f:f, at:at, dur:d, g:0.18, a:0.08, r:0.1, to:room }));
    K.loop(34,(i,t)=>{ let at=t;
      for(let k=0;k<20;k++){ chuff(at+k*0.36,0.5); chuff(at+k*0.36+0.18,0.25); if(k%4===0) clack(at+k*0.36); } whistle(t+3,1.2);
      at=t+8; for(let rep=0;rep<8;rep++){ const a=at+rep*0.6; chuff(a,0.5); clack(a+0.2); chuff(a+0.36,0.3); }
      at=t+13.5; for(let k=0;k<6;k++){ const a=at+k*1.3; const r=K.noise({ color:'pink', at:a, dur:1.1, g:0.5, bp:500, q:0.7, a:1.0, d:0.05, s:1, r:0.01, to:room }); r.head.frequency.setValueAtTime(300,a); r.head.frequency.exponentialRampToValueAtTime(900,a+1.05); }
      at=t+22; for(let k=0;k<8;k++){ const stretch=1+k*0.25; chuff(at,0.45,0.18*stretch); at+=0.36*stretch; if(k%3===0) clack(at); }
      whistle(t+29,0.6); whistle(t+30,1.4); for(let k=0;k<8;k++){ chuff(t+31+k*0.36,0.4); } });
  } },
{ id:"hydrogen", name:"hydrogen sings", tick:"hydrogen", ago:75, hue:230, kind:"physics", scene:"hydrogen sings",
  prog:K=>{
    const room=K.verb(4,0.35);
    const f21=1420405751/Math.pow(2,21);
    const h=K.osc({ type:'sine', f:f21, g:0.22, a:4, to:room }); K.lfo(h.o.frequency,0.03,f21*0.003); K.lfo(h.g.gain,0.11,0.05);
    const base=300; [1,1.35,1.512,1.6,1.653].forEach((r,k)=>{ const o=K.osc({ type:'sine', f:base*r, g:0.06/(k*0.5+1), a:6+k, to:K.pan(K.rr(-0.7,0.7),room) }); K.lfo(o.g.gain,K.rr(0.05,0.2),0.03); });
    K.loop(11,(i,t)=>{ K.noise({ color:'white', at:t+3, dur:0.006, g:0.5, bp:4000, q:3, a:0.001, d:0.005, s:0, r:0.002, to:room }); });
    K.noise({ color:'pink', g:0.03, hp:3000, a:5, to:room });
  } },
{ id:"cage", name:"four minutes thirty-three seconds", tick:"4′33″", ago:74, hue:0, kind:"evocation", scene:"4′33″",
  prog:K=>{
    const room=K.verb(1.8,0.3);
    K.noise({ color:'brown', g:0.03, lp:160, a:3, to:room });
    const lid=at=>{ K.noise({ color:'brown', at:at, dur:0.08, g:0.28, lp:600, a:0.002, d:0.07, s:0, r:0.02, to:room }); K.osc({ type:'sine', f:180, at:at, dur:0.1, g:0.12, a:0.002, d:0.08, s:0, r:0.02, to:room }); };
    K.loop(273,(i,t)=>{ lid(t+0.5); lid(t+30); lid(t+30.6); lid(t+173); lid(t+173.6); lid(t+272);
      for(let k=0;k<5;k++){ const at=t+10+K.r()*250; const V=K.voice({ f:K.rr(90,150), vowel:'a', at:at, dur:0.18, g:0.16, a:0.01, r:0.05, to:K.pan(K.rr(-0.8,0.8),room), q:5 }); V.set('u',at+0.1,0.05); }
      for(let k=0;k<7;k++){ const at=t+5+K.r()*260; K.noise({ color:'pink', at:at, dur:0.6, g:0.05, bp:K.rr(400,1200), q:2, a:0.15, d:0.5, s:0, r:0.1, to:K.pan(K.rr(-0.8,0.8),room) }); }
      for(let k=0;k<4;k++){ const at=t+20+K.r()*240; K.noise({ color:'white', at:at, dur:0.4, g:0.05, hp:3000, a:0.1, d:0.35, s:0, r:0.1, to:room }); } });
  } },
{ id:"rock", name:"rock and roll", tick:"rock", ago:71, hue:10, kind:"evocation", scene:"rock and roll",
  prog:K=>{
    const room=K.verb(0.9,0.2);
    const slap=K.echo(0.12,0.25,0.5,room,4000);
    const bpm=168, q=60/bpm, tr=q/3;
    const roots=[40,40,40,40,45,45,40,40,47,45,40,47];
    K.loop(q*4,(i,t)=>{ const root=roots[i%12];
      for(let k=0;k<4;k++){ const at=t+k*q; K.kick(at,0.5,{ to:room }); if(k%2) K.snare(at,0.35,{ to:slap }); K.noise({ color:'white', at:at, dur:0.06, g:0.08, hp:6000, a:0.002, d:0.05, s:0, r:0.01, to:room }); K.noise({ color:'white', at:at+tr*2, dur:0.04, g:0.05, hp:6000, a:0.002, d:0.03, s:0, r:0.01, to:room });
        const bn=[root,root+4,root+7,root+9][k]; K.rich(midi(bn-12),at,q*0.8,{ g:0.3, part:[[1,1],[2,0.4],[3,0.1]], a:0.005, d:q*0.7, s:0.4, type:'triangle', to:room });
        [0,2].forEach(j=>{ [root+12,root+16,root+19].forEach(n=>K.osc({ type:'sawtooth', f:midi(n), at:at+j*tr, dur:tr*0.9, g:0.05, a:0.003, d:tr, s:0.2, r:0.03, to:slap })); }); }
      if(i%2===0) K.chord([midi(root+12),midi(root+19),midi(root+24)],t+q*3+tr*2,q*0.5,{ type:'sawtooth', g:0.1, a:0.003, d:0.25, s:0.3, r:0.05, to:K.shape(4,slap) }); });
  } },
{ id:"stockhausen", name:"song of the youths", tick:"stockhausen", ago:70, hue:250, kind:"evocation", scene:"song of the youths",
  prog:K=>{
    const room=K.verb(3.5,0.4);
    K.loop(4,(i,t)=>{ const kind=i%4;
      if(kind===0||kind===2){ const n=6+Math.floor(K.r()*7); const f0=K.rr(300,2400); for(let k=0;k<n;k++){ const at=t+K.r()*3; K.osc({ type:'sine', f:f0*K.rr(0.9,1.6), at:at, dur:K.rr(0.08,0.9), g:0.08, a:K.rr(0.005,0.2), d:0.3, s:0.4, r:0.1, to:K.pan(K.rr(-1,1),room) }); } }
      if(kind===1||kind===3){ for(let k=0;k<50;k++){ const at=t+Math.pow(K.r(),1.5)*3.5; K.noise({ color:'white', at:at, dur:0.015, g:0.2, bp:K.rr(600,6000), q:8, a:0.001, d:0.01, s:0, r:0.005, to:K.pan(K.rr(-1,1),room) }); } }
      if(K.r()<0.8){ const n=2+Math.floor(K.r()*4); let at=t+K.r()*2; for(let k=0;k<n;k++){ const f=midi(K.pick([67,69,71,72,74,76,79])); const V=K.voice({ f:f, vowel:K.pick(['u','i','e','a','o']), at:at, dur:K.rr(0.12,0.4), g:0.32, a:0.02, r:0.06, to:K.pan(K.rr(-1,1),room), q:9 }); at+=K.rr(0.15,0.5); } }
      if(K.r()<0.4){ const nz=K.noise({ color:'white', at:t+K.r()*2, dur:K.rr(0.5,2), g:0.12, bp:K.rr(800,4000), q:14, a:0.3, r:0.3, to:K.pan(K.rr(-1,1),room) }); K.lfo(nz.head.frequency,K.rr(0.5,4),600,'sine',t); } });
  } },
{ id:"sputnik", name:"beep", tick:"sputnik", ago:69, hue:215, kind:"physics", scene:"beep",
  prog:K=>{
    const room=K.verb(0.7,0.12);
    const rx=K.filt('bandpass',1200,0.5,room);
    const stat=K.noise({ color:'pink', g:0.14, hp:200, a:1, to:rx }); K.lfo(stat.g.gain,0.17,0.05);
    const het=K.osc({ type:'sine', f:2400, g:0.02, a:1, to:rx }); K.lfo(het.o.frequency,0.021,1500);
    const fade=K.gain(1,rx); K.lfo(fade.gain,0.06,0.45);
    K.loop(0.6,(i,t)=>{ const o=K.osc({ type:'sine', f:1005, at:t, dur:0.3, g:0.42, a:0.01, r:0.02, to:fade }); K.osc({ type:'sine', f:2010, at:t, dur:0.3, g:0.05, a:0.01, r:0.02, to:fade }); });
    K.loop(0.5,(i,t)=>{ if(K.r()<0.4) K.noise({ color:'white', at:t+K.r()*0.4, dur:0.01, g:0.2, bp:2500, q:2, a:0.001, d:0.008, s:0, r:0.003, to:rx }); });
  } },
{ id:"radiophonic", name:"the radiophonic workshop", tick:"radiophonic", ago:68, hue:280, kind:"evocation", scene:"the radiophonic workshop",
  prog:K=>{
    const room=K.verb(2,0.3);
    const tape=K.echo(0.33,0.45,0.45,room,3000);
    K.loop(10,(i,t)=>{ const kind=i%3;
      if(kind===0){ for(let k=0;k<4;k++){ const at=t+k*2.3; const f0=K.rr(200,600); const o=K.osc({ type:'sine', f:f0, at:at, dur:1.6, g:0.28, a:0.05, r:0.2, to:tape }); o.o.frequency.exponentialRampToValueAtTime(f0*K.pick([4,0.25,3]),at+1.4); } }
      if(kind===1){ for(let k=0;k<3;k++){ const at=t+k*3; const f=midi(K.pick([48,50,53,55,58])); const r=K.osc({ type:'sawtooth', f:f, at:at, dur:2.2, g:0.3, a:2.1, d:0.02, s:1, r:0.01, to:K.filt('lowpass',f*4,1,tape) }); } }
      if(kind===2){ const sq=K.filt('lowpass',1200,6,tape); K.lfo(sq.frequency,0.4,800,'sine',t); for(let k=0;k<32;k++){ K.osc({ type:'square', f:midi(K.pick([57,60,64,67,69,72])), at:t+k*0.22, dur:0.15, g:0.1, a:0.005, d:0.12, s:0.2, r:0.02, to:sq }); } }
      if(K.r()<0.6){ const at=t+K.r()*6; [1,1.62,2.3,3.1].forEach((m,k)=>K.osc({ type:'sine', f:520*m*K.pick([1,2,0.5]), at:at, dur:1.2/(k+1), g:0.15/(k+1), a:0.001, d:1/(k+1), s:0, r:0.1, to:tape })); }
      if(K.r()<0.5){ /* the dalek's ring modulator: the voice times a low sine */
        const at=t+K.r()*7; const rm=K.gain(0,tape); const V=K.voice({ f:K.rr(110,170), vowel:'a', at:at, dur:1.2, g:0.5, a:0.03, r:0.1, to:rm });
        const car=K.osc({ type:'sine', f:K.rr(30,90), at:at, dur:1.2, g:1, a:0.01, r:0.05, to:K.gain(0.0001,false) }); car.o.connect(rm.gain);
        V.set('i',at+0.4,0.1); V.set('o',at+0.8,0.1); } });
  } },
{ id:"young", name:"to be held for a long time", tick:"the fifth", ago:66, hue:260, kind:"evocation", scene:"to be held for a long time",
  prog:K=>{
    const room=K.verb(4,0.3);
    const B=246.94, Fs=B*1.5;
    [[B,0.22],[Fs,0.18],[B*2,0.05],[Fs*2,0.04],[B*0.5,0.12]].forEach((n,k)=>{ const o=K.osc({ type:'sine', f:n[0], g:n[1], a:6+k, to:room }); K.lfo(o.g.gain,K.rr(0.02,0.06),n[1]*0.35); });
    [[B,0.04],[Fs,0.03]].forEach(n=>{ const o=K.osc({ type:'sawtooth', f:n[0], g:n[1], a:12, to:K.filt('lowpass',1200,0.7,room) }); K.lfo(o.g.gain,0.017,n[1]*0.6); });
  } },
{ id:"gagarin", name:"\"let's go\"", tick:"gagarin", ago:65, hue:205, kind:"evocation", scene:"poyekhali",
  prog:K=>{
    const room=K.verb(2.5,0.3);
    const radio=K.filt('bandpass',1200,0.5,room);
    K.loop(45,(i,t)=>{
      const ig=K.noise({ color:'brown', at:t, dur:14, g:1.0, lp:150, a:2, d:8, s:0.5, r:3, to:room }); ig.head.frequency.setValueAtTime(80,t); ig.head.frequency.exponentialRampToValueAtTime(600,t+3); ig.head.frequency.exponentialRampToValueAtTime(120,t+14);
      K.noise({ color:'pink', at:t+1, dur:12, g:0.5, bp:700, q:0.6, a:1.5, d:8, s:0.3, r:2, to:room });
      for(let k=0;k<80;k++) K.noise({ color:'white', at:t+2+K.r()*9, dur:0.02, g:0.2*K.r(), bp:K.rr(200,900), q:2, a:0.001, d:0.015, s:0, r:0.005, to:room });
      const stat=K.noise({ color:'pink', at:t+2.5, dur:12, g:0.12, hp:400, a:0.3, r:1, to:radio });
      [0,0.22,0.45,0.62].forEach((s,k)=>{ const at=t+3+s; K.voice({ f:118*[1,1.1,1.25,1.0][k], vowel:['o','e','a','i'][k], at:at, dur:0.2, g:0.9, a:0.02, r:0.04, to:K.shape(5,radio), q:7 }); });
      for(let k=0;k<12;k++) K.osc({ type:'sine', f:1200, at:t+6+k*0.5, dur:0.08, g:0.14, a:0.005, r:0.01, to:radio });
      K.noise({ color:'pink', at:t+16, dur:28, g:0.05, lp:400, a:4, r:3, to:room });
      for(let k=0;k<6;k++){ const at=t+18+k*4.2; const b=K.noise({ color:'pink', at:at, dur:3.6, g:0.16, lp:900, a:1.4, d:0.4, s:0.6, r:1.6, to:room }); b.head.frequency.setValueAtTime(400,at); b.head.frequency.exponentialRampToValueAtTime(1400,at+1.4); b.head.frequency.exponentialRampToValueAtTime(400,at+3.4); }
      K.osc({ type:'sine', f:98, at:t+16, dur:28, g:0.06, a:4, r:4, to:room }); K.osc({ type:'triangle', f:2400, at:t+16, dur:28, g:0.008, a:4, r:4, to:room }); });
  } },
{ id:"fluxus", name:"drip music", tick:"fluxus", ago:64, hue:55, kind:"evocation", scene:"drip music",
  prog:K=>{
    const room=K.verb(1.5,0.3);
    let fill=0;
    K.loop(0.85,(i,t,L)=>{ L.period=K.rr(0.45,1.4); fill=(fill+0.012)%1; const at=t; const bowl=900+fill*900;
      const d=K.osc({ type:'sine', f:1500, at:at, dur:0.05, g:0.2, a:0.002, d:0.04, s:0, r:0.01, to:room }); d.o.frequency.exponentialRampToValueAtTime(3200,at+0.04);
      [1,2.4,3.9].forEach((m,k)=>K.osc({ type:'sine', f:bowl*m, at:at+0.01, dur:0.9/(k+1), g:0.14/(k+1), a:0.002, d:0.8/(k+1), s:0, r:0.05, to:room }));
      K.noise({ color:'white', at:at, dur:0.02, g:0.06, bp:4000, q:3, a:0.001, d:0.015, s:0, r:0.005, to:room }); });
    K.loop(8,(i,t)=>{ const at=t+K.r()*4; const n=3+Math.floor(K.r()*5); for(let k=0;k<n;k++){ const a=at+k*0.28; const s=K.noise({ color:'white', at:a, dur:0.22, g:0.12, bp:3500, q:10, a:0.02, r:0.03, to:K.pan(0.6,room) }); s.head.frequency.setValueAtTime(K.rr(2500,4500),a); s.head.frequency.exponentialRampToValueAtTime(K.rr(2500,5000),a+0.2); } });
    K.loop(30,(i,t)=>{ const at=t+20; K.noise({ color:'white', at:at, dur:2.5, g:0.25, hp:1000, a:0.01, r:0.01, to:K.pan(-0.7,room) }); K.osc({ type:'sine', f:15734, at:at, dur:2.5, g:0.03, a:0.01, r:0.01, to:room }); K.noise({ color:'white', at:at+2.5, dur:0.03, g:0.3, bp:3000, q:2, a:0.001, d:0.02, s:0, r:0.005, to:room }); });
  } },
{ id:"coltrane", name:"a love supreme", tick:"coltrane", ago:61.7, hue:40, kind:"evocation", scene:"a love supreme",
  prog:K=>{
    const room=K.verb(2.2,0.32);
    const bpm=112, q=60/bpm, tr=q/3;
    const mode=[53,55,56,58,60,62,63,65,67,68,70,72,74,75,77];
    K.loop(q,(i,t)=>{ K.hat(t,0.16,false,{ hp:6000, to:K.pan(0.5,room) }); K.hat(t+tr*2,0.10,false,{ hp:7000, to:K.pan(0.5,room) }); if(i%2) K.noise({ color:'white', at:t,dur:0.12,g:0.08,hp:2000,a:0.01,d:0.1,s:0,r:0.03,to:room }); if(i%4===0) K.kick(t,0.25,{ f:110, f2:50, to:room });
      const bn=K.pick([41,43,44,46,48,50,51]); K.rich(midi(bn-12),t,q*0.9,{ g:0.3, part:[[1,1],[2,0.35],[3,0.12]], a:0.01, d:q*0.8, s:0.5, type:'triangle', to:room });
      if(i%4===0||K.r()<0.2){ const r=K.pick([53,55,58,60]); [r,r+5,r+10,r+15].forEach(n=>K.rich(midi(n),t+0.01,q*1.5,{ g:0.05, part:[[1,1],[2,0.2]], a:0.005, d:q*1.4, s:0.3, to:room })); } });
    const reed=K.filt('bandpass',1100,1.2,room), reed2=K.filt('bandpass',2600,2,room);
    K.loop(tr,(i,t)=>{ const ph=Math.floor(i/24)%4; if(ph===3&&i%24>8) return; if(K.r()<0.25) return;
      const n=mode[clamp(Math.floor(7+Math.sin(i*0.31)*5+K.rr(-2,3)),0,mode.length-1)]; const f=midi(n); const d=K.pick([tr,tr,tr*2,q*2]);
      const o=K.osc({ type:'sawtooth', f:f, at:t, dur:d*0.95, g:0.3, a:0.02, r:0.05, to:reed }); K.osc({ type:'sawtooth', f:f, at:t, dur:d*0.95, g:0.12, a:0.02, r:0.05, to:reed2 }); if(d>q) K.lfo(o.o.frequency,5,f*0.008,'sine',t+0.3);
      K.noise({ color:'white', at:t, dur:d*0.5, g:0.05, bp:f*3, q:2, a:0.01, r:0.05, to:room }); });
  } },
{ id:"shea", name:"the loudest audience", tick:"shea", ago:61.1, hue:30, kind:"evocation", scene:"the loudest audience",
  prog:K=>{
    const room=K.verb(3,0.4);
    const crowd=K.gain(1,room); K.lfo(crowd.gain,0.16,0.35); K.lfo(crowd.gain,0.045,0.25);
    K.noise({ color:'pink', g:0.3, bp:2200, q:0.6, a:2, to:crowd });
    for(let v=0;v<18;v++){ const V=K.voice({ f:K.rr(520,980), vowel:'i', g:0.05, a:2+K.r()*3, to:K.pan(K.rr(-1,1),crowd), q:6 }); K.lfo(V.src.frequency,K.rr(3,8),K.rr(20,60)); K.lfo(V.g.gain,K.rr(0.1,0.5),0.03); }
    const band=K.filt('lowpass',380,0.7,room);
    const q=60/140; K.loop(q,(i,t)=>{ K.kick(t,0.3,{ to:band }); if(i%2) K.snare(t,0.3,{ to:band }); });
    K.loop(9,(i,t)=>{ if(K.r()<0.5){ const at=t+K.r()*6; const o=K.osc({ type:'sine', f:2800, at:at, dur:0.9, g:0.08, a:0.2, r:0.2, to:room }); o.o.frequency.exponentialRampToValueAtTime(3600,at+0.8); } });
  } },
{ id:"reich", name:"two loops, drifting", tick:"phase", ago:60, hue:60, kind:"evocation", scene:"two loops, drifting",
  prog:K=>{
    const room=K.verb(1.4,0.22);
    const pat=[64,67,71,72,67,74,71,64,72,67,71,74];
    const base=0.16;
    [[-0.7,base],[0.7,base/1.007]].forEach(side=>{ const p=K.pan(side[0],room); K.loop(side[1],(i,t)=>{ const n=pat[i%12]; K.rich(midi(n),t,0.28,{ g:0.16, part:[[1,1],[4,0.25],[10,0.05]], a:0.002, d:0.26, s:0.05, r:0.03, to:p }); }); });
  } },
{ id:"funk", name:"everything on the one", tick:"the one", ago:59.5, hue:14, kind:"evocation", scene:"everything on the one",
  prog:K=>{
    const room=K.verb(1.1,0.18);
    const q=60/104, s=q/4;
    const low=K.filt('lowpass',1100,1.2,room), keys=K.filt('lowpass',4600,0.8,room),
          scratch=K.filt('bandpass',1900,2.6,room), horn=K.filt('lowpass',5200,0.8,room);
    K.loop(q*4,(i,t)=>{
      K.kick(t,0.85,{ f:120, f2:46, dur:0.34, to:room });
      K.osc({ type:'square', f:midi(nn('E1')), at:t, dur:0.42, g:0.34, a:0.004, d:0.3, s:0.25, r:0.1, to:low });
      [nn('E3'),nn('G3'),nn('B3'),nn('D4')].forEach(n=>K.rich(midi(n),t,0.3,{ part:[[1,1],[2,0.8],[3,0.5],[4,0.24],[5,0.1]], g:0.06, type:'sawtooth', a:0.008, d:0.22, s:0.3, r:0.08, to:keys, det:K.rr(-6,6) }));
      for(let k=0;k<16;k++){ const at=t+k*s;
        K.noise({ at:at, dur:0.04, g:k%2?0.05:0.085, hp:8000, q:0.7, a:0.001, d:0.035, s:0, r:0.01, to:room });
        if(k%4!==0){ const open=(k%8===3||k%8===7);
          K.pluck(midi(nn('E4')),at,0.09,{ g:open?0.07:0.035, type:'square', close:0.05, to:scratch }); }
        if(k===4||k===12) K.snare(at,0.45,{ bp:1700, to:room });
        if(k===7&&i%2===1) K.kick(at,0.5,{ f:110, f2:44, dur:0.2, to:room });
      }
      if(i%4===3){ let at=t+q*2.5; [nn('B3'),nn('D4'),nn('E4')].forEach(n=>{
        K.rich(midi(n),at,0.22,{ part:[[1,1],[2,0.9],[3,0.6],[4,0.3]], g:0.06, type:'sawtooth', a:0.006, d:0.16, s:0.2, r:0.06, to:horn }); at+=q*0.25; }); }
    });
  } },
{ id:"apollo", name:"the sea of tranquility", tick:"apollo 11", ago:57.1, hue:220, kind:"physics", scene:"the sea of tranquility",
  prog:K=>{
    const room=K.verb(1.2,0.2);
    const loop=K.filt('bandpass',1500,0.45,room);
    const quindar=(at,f)=>K.osc({ type:'sine', f:f, at:at, dur:0.25, g:0.35, a:0.005, r:0.01, to:loop });
    K.loop(60,(i,t)=>{
      const lift=K.noise({ color:'brown', at:t, dur:16, g:0.9, lp:120, a:3, d:6, s:0.6, r:4, to:room }); lift.head.frequency.setValueAtTime(60,t); lift.head.frequency.exponentialRampToValueAtTime(400,t+5); lift.head.frequency.exponentialRampToValueAtTime(90,t+16);
      for(let k=0;k<220;k++) K.noise({ color:'white', at:t+2+Math.pow(K.r(),0.7)*12, dur:0.012, g:0.35*K.r(), bp:K.rr(150,1200), q:1.5, a:0.001, d:0.01, s:0, r:0.003, to:room });
      const stat=K.noise({ color:'pink', at:t+18, dur:42, g:0.10, hp:300, a:1, r:2, to:loop });
      [20,27,33,44,52].forEach(s=>{ quindar(t+s,2525); const n=3+Math.floor(K.r()*6); let at=t+s+0.5; for(let k=0;k<n;k++){ K.voice({ f:K.rr(105,150), vowel:K.pick(['a','e','o','i','u']), at:at, dur:K.rr(0.12,0.3), g:0.8, a:0.02, r:0.04, to:K.shape(4,loop), q:7 }); at+=K.rr(0.18,0.45); } quindar(at+0.3,2475); });
      for(let k=0;k<50;k++){ const at=t+34+k*0.4; K.kick(at,0.18,{ f:70, f2:36, dur:0.2, to:room }); if(k%2) K.kick(at+0.2,0.1,{ f:60, f2:34, dur:0.15, to:room }); }
      K.osc({ type:'sine', f:1200, at:t+40, dur:0.6, g:0.06, a:0.01, r:0.05, to:loop }); });
  } },
{ id:"lucier", name:"i am sitting in a room", tick:"lucier", ago:57, hue:70, kind:"evocation", scene:"i am sitting in a room",
  prog:K=>{
    const room=K.verb(2.6,0.3);
    /* the room: the voice through five of its modes in series, and a
       delay fed back into the input — the loop gain kept under one, so
       the room rings but never runs away. */
    const inp=K.gain(1,false);
    const modes=[118,247,412,655,890].map(f=>{ const b=K.filt('peaking',f,10,false); b.gain.value=0; return b; });
    let head=inp; modes.forEach(m=>{ head.connect(m); head=m; }); head.connect(room);
    const dl=K.delay(0.21,false), fb=K.gain(0,false); head.connect(dl); dl.connect(fb); fb.connect(inp);
    K.loop(12,(i,t)=>{ const pass=i%9; const g=0.9*Math.pow(0.72,pass);
      fb.gain.setTargetAtTime(Math.min(0.49,0.2+pass*0.04),t,1);
      modes.forEach((m,k)=>m.gain.setTargetAtTime(Math.min(4.8,pass*0.6)*(1-k*0.1),t,1));
      let at=t+0.5; for(let k=0;k<15;k++){ const V=K.voice({ f:K.rr(100,140), vowel:K.pick(['a','e','i','o','u','m']), at:at, dur:K.rr(0.1,0.28), g:g, a:0.02, r:0.05, to:inp, q:7 }); at+=K.rr(0.16,0.42); if(k===6||k===11) at+=0.5; }
      if(pass>=5) modes.forEach((m,k)=>K.osc({ type:'sine', f:m.frequency.value, at:t+0.5, dur:9, g:0.06*(pass-4)/(k+1), a:1, r:2, to:room })); });
  } },
{ id:"jumbo", name:"the cabin", tick:"747", ago:56, hue:200, kind:"evocation", scene:"the cabin",
  prog:K=>{
    const room=K.verb(0.9,0.18);
    K.loop(64,(i,t)=>{
      const eng=K.noise({ color:'pink', at:t, dur:40, g:0.5, bp:400, q:0.6, a:0.5, r:4, to:room }); eng.head.frequency.setValueAtTime(250,t); eng.head.frequency.exponentialRampToValueAtTime(1400,t+18); eng.head.frequency.exponentialRampToValueAtTime(700,t+40);
      const wh=K.osc({ type:'sawtooth', f:200, at:t, dur:40, g:0.05, a:2, r:4, to:K.filt('lowpass',3000,2,room) }); wh.o.frequency.setValueAtTime(200,t+2); wh.o.frequency.exponentialRampToValueAtTime(2000,t+18); wh.o.frequency.exponentialRampToValueAtTime(1200,t+40);
      const roll=K.noise({ color:'brown', at:t+6, dur:14, g:0.5, lp:120, a:3, d:0.5, s:1, r:0.4, to:room }); K.lfo(roll.g.gain,9,0.2,'sine',t+6);
      K.osc({ type:'sine', f:1000, at:t+30, dur:0.5, g:0.14, a:0.005, d:0.4, s:0.2, r:0.1, to:room }); K.osc({ type:'sine', f:800, at:t+30.55, dur:0.7, g:0.14, a:0.005, d:0.6, s:0.2, r:0.1, to:room });
      K.noise({ color:'pink', at:t+34, dur:30, g:0.14, lp:500, a:6, r:6, to:room });
      K.osc({ type:'sine', f:1000, at:t+55, dur:0.5, g:0.1, a:0.005, d:0.4, s:0.2, r:0.1, to:room }); K.osc({ type:'sine', f:800, at:t+55.55, dur:0.7, g:0.1, a:0.005, d:0.6, s:0.2, r:0.1, to:room }); });
  } },
{ id:"dub", name:"the version", tick:"the version", ago:53.5, hue:118, kind:"evocation", scene:"the version",
  prog:K=>{
    const room=K.verb(2.6,0.3);
    const spring=K.echo(0.34,0.74,0.9,room,1900);
    const tone=K.filt('lowpass',6000,0.7,room);
    const q=60/72, e=q/2;
    const deep=K.filt('lowpass',420,1.1,room);
    const BASS=[nn('A1'),0,nn('A1'),nn('C2'),0,nn('D2'),0,nn('A1')];
    K.loop(q*4,(i,t)=>{
      const dropped=(i%4===2);
      K.snare(t+q*2,0.5,{ bp:1500, to:(i%2===1)?spring:room });
      K.kick(t+q*2,0.8,{ f:105, f2:42, dur:0.4, to:room });
      for(let k=0;k<8;k++){ const at=t+k*e;
        K.noise({ at:at, dur:0.05, g:k%2?0.055:0.03, hp:8500, q:0.7, a:0.001, d:0.04, s:0, r:0.012, to:room });
        if(!dropped&&BASS[k]) K.osc({ type:'sine', f:midi(BASS[k]), at:at, dur:e*0.9, g:0.5, a:0.01, d:e*0.7, s:0.35, r:0.12, to:deep });
        if(k%2===1){ const to=(i%4===3&&k===5)?spring:tone;
          [nn('A3'),nn('C4'),nn('E4')].forEach(n=>K.pluck(midi(n),at,0.24,{ g:0.075, type:'square', close:0.1, to:to })); }
      }
      tone.frequency.cancelScheduledValues(t);
      tone.frequency.setValueAtTime(dropped?900:6000,t);
      tone.frequency.exponentialRampToValueAtTime(dropped?6000:2400,t+q*3.6);
      if(i%8===7) K.noise({ color:'brown', at:t+q*3.5, dur:0.5, g:0.16, lp:2000, a:0.004, d:0.45, s:0, r:0.15, to:spring });   // the springs kicked
    });
  } },
{ id:"hiphop", name:"the merry-go-round", tick:"sedgwick ave", ago:53.1, hue:26, kind:"evocation", scene:"the merry-go-round",
  prog:K=>{
    const room=K.verb(1.5,0.24);
    const q=60/102, s=q/4;
    const sub=K.filt('lowpass',900,1.2,room), needle=K.filt('bandpass',1400,1.6,room);
    function bar(at,fill){
      K.kick(at,0.9,{ f:115, f2:44, dur:0.36, to:room });
      K.kick(at+q*1.5,0.7,{ f:115, f2:44, dur:0.3, to:room });
      K.snare(at+q,0.55,{ bp:1600, to:room });
      K.snare(at+q*3,0.55,{ bp:1600, to:room });
      if(fill){ K.tom(at+q*3.5,220,0.4,{ to:room }); K.tom(at+q*3.75,160,0.45,{ to:room }); }
      for(let k=0;k<16;k++) K.noise({ at:at+k*s, dur:0.04, g:k%2?0.04:0.07, hp:8200, q:0.7, a:0.001, d:0.035, s:0, r:0.01, to:room });
      [2,7,10,13].forEach(k=>K.noise({ at:at+k*s, dur:0.06, g:0.05, bp:3200, q:1.4, a:0.001, d:0.05, s:0, r:0.015, to:room }));
      const B=[nn('E1'),0,0,nn('E1'),0,nn('G1'),0,nn('A1')];
      for(let k=0;k<8;k++) if(B[k]) K.osc({ type:'square', f:midi(B[k]), at:at+k*(q/2), dur:0.3, g:0.3, a:0.005, d:0.25, s:0.2, r:0.08, to:sub });
    }
    K.noise({ color:'pink', g:0.03, bp:900, q:0.4, a:2, to:room });                     // the room, and the people in it
    K.loop(q*8,(i,t)=>{
      bar(t,false); bar(t+q*4,i%4===3);
      /* the needle goes back */
      const cut=t+q*8-0.09;
      K.noise({ at:cut, dur:0.09, g:0.22, bp:3600, q:1.1, a:0.002, d:0.08, s:0, r:0.02, to:room });
      const sc=K.osc({ type:'sawtooth', f:340, at:cut, dur:0.1, g:0.10, a:0.003, d:0.08, s:0.2, r:0.02, to:needle });
      sc.o.frequency.setValueAtTime(520,cut); sc.o.frequency.exponentialRampToValueAtTime(180,cut+0.09);
      if(i%4===3) K.noise({ color:'pink', at:t+q*7.5, dur:1.4, g:0.09, bp:1400, q:0.5, a:0.1, d:1.2, s:0.3, r:0.3, to:room });
    });
  } },
{ id:"kraftwerk", name:"the machine sings", tick:"kraftwerk", ago:52, hue:350, kind:"evocation", scene:"the machine sings",
  prog:K=>{
    const room=K.verb(1.2,0.2);
    const bpm=120, q=60/bpm;
    K.loop(q,(i,t)=>{ K.kick(t,0.55,{ f:120, f2:45, to:room }); K.noise({ color:'white', at:t+q/2, dur:0.05, g:0.12, hp:8000, a:0.001, d:0.04, s:0, r:0.01, to:room }); if(i%2) K.noise({ color:'white', at:t, dur:0.09, g:0.14, bp:2500, q:1, a:0.001, d:0.08, s:0, r:0.02, to:room });
      const bn=(i%8<6)?40:43; [0,0.5].forEach(o=>K.osc({ type:'sawtooth', f:midi(bn-12), at:t+o*q, dur:q*0.4, g:0.3, a:0.005, d:q*0.35, s:0.1, r:0.03, to:K.filt('lowpass',600,3,room) }));
      if(i%16===0){ [52,55,59].forEach(n=>K.osc({ type:'square', f:midi(n), at:t, dur:q*14, g:0.05, a:0.5, r:0.5, to:K.filt('lowpass',1800,0.7,room) })); }
      if(i%4===2){ [0,0.33,0.66].forEach((s,k)=>{ const V=K.voice({ f:110, vowel:['o','e','a'][k], at:t+s*q, dur:q*0.28, g:0.35, a:0.01, r:0.03, to:room, type:'square', q:8 }); }); } });
  } },
{ id:"eno", name:"discreet music", tick:"eno", ago:51, hue:160, kind:"evocation", scene:"discreet music",
  prog:K=>{
    const room=K.verb(9,0.6);
    [[65,19],[69,23],[72,29],[76,31],[79,37]].forEach((v,k)=>{ const p=K.pan(K.rr(-0.7,0.7),room); K.loop(v[1],(i,t)=>{ const f=midi(v[0]); K.osc({ type:k%2?'triangle':'sine', f:f, at:t, dur:v[1]*0.45, g:0.16, a:2.5, d:3, s:0.7, r:4, to:p }); K.osc({ type:'sine', f:f*2, at:t, dur:v[1]*0.4, g:0.03, a:3, r:3, to:p }); },{ at:K.now()+k*1.7 }); });
    const low=K.osc({ type:'sine', f:midi(41), g:0.12, a:8, to:room }); K.lfo(low.g.gain,0.02,0.08);
  } },
{ id:"abba", name:"the dancing floor", tick:"abba", ago:50, hue:320, kind:"evocation", scene:"the dancing floor",
  prog:K=>{
    const room=K.verb(1.6,0.25);
    const bpm=118, q=60/bpm;
    const prog=[[48,[60,64,67]],[57,[57,60,64]],[53,[53,57,60]],[55,[55,59,62]]];
    K.loop(q*4,(i,t)=>{ const c=prog[i%4];
      for(let k=0;k<4;k++){ const at=t+k*q; K.kick(at,0.55,{ to:room }); K.hat(at+q/2,0.2,true,{ to:room }); if(k%2) K.snare(at,0.32,{ to:room }); K.hat(at,0.08,false,{ to:room });
        [0,0.5].forEach(o=>K.osc({ type:'sawtooth', f:midi(c[0]-12), at:at+o*q, dur:q*0.4, g:0.25, a:0.005, d:q*0.4, s:0.2, r:0.03, to:K.filt('lowpass',900,1,room) })); }
      c[1].forEach(n=>{ const o=K.osc({ type:'sawtooth', f:midi(n+12), at:t, dur:q*3.8, g:0.05, a:0.3, r:0.2, to:K.filt('lowpass',2600,0.5,room) }); K.lfo(o.o.frequency,5.5,midi(n+12)*0.005,'sine',t); });
      [1,3].forEach(k=>c[1].forEach(n=>K.rich(midi(n+12),t+k*q,q*0.6,{ g:0.06, part:[[1,1],[2,0.4],[3,0.15]], a:0.003, d:q*0.5, s:0.2, to:room })));
      if(i%2===1){ const at=t+q*2; [c[1][0]+12,c[1][1]+12].forEach((n,k)=>{ const V=K.voice({ f:midi(n)*1.0, vowel:'u', at:at, dur:q*1.8, g:0.22, a:0.08, r:0.15, to:K.pan(k?0.4:-0.4,room), q:8 }); V.set('o',at+q,0.2); K.lfo(V.src.frequency,5.5,midi(n)*0.007,'sine',at+0.3); }); } });
  } },
{ id:"voyager", name:"flowing water, leaving", tick:"voyager", ago:49.3, hue:210, kind:"evocation", scene:"flowing water, leaving",
  prog:K=>{
    const room=K.verb(2.5,0.3);
    K.loop(70,(i,t)=>{
      const far=K.filt('lowpass',6000,0.5,room); far.frequency.setValueAtTime(6000,t+12); far.frequency.exponentialRampToValueAtTime(120,t+58);
      const lvl=K.gain(1,far); lvl.gain.setValueAtTime(1,t+12); lvl.gain.exponentialRampToValueAtTime(0.02,t+58); lvl.gain.setValueAtTime(0.0001,t+60);
      const w1=K.noise({ color:'white', at:t, dur:60, g:0.4, bp:1200, q:0.8, a:2, r:2, to:lvl }); K.lfo(w1.head.frequency,0.23,500,'sine',t); K.lfo(w1.g.gain,0.9,0.1,'sine',t);
      const w2=K.noise({ color:'pink', at:t, dur:60, g:0.3, bp:400, q:1, a:2, r:2, to:lvl }); K.lfo(w2.head.frequency,0.11,200,'sine',t);
      for(let k=0;k<360;k++){ const at=t+K.r()*58; const f=K.rr(500,2500); const o=K.osc({ type:'sine', f:f, at:at, dur:0.06, g:0.06, a:0.003, d:0.05, s:0, r:0.01, to:lvl }); o.o.frequency.exponentialRampToValueAtTime(f*1.8,at+0.05); }
      K.osc({ type:'sine', f:2300, at:t+40, dur:30, g:0.03, a:10, r:6, to:room }); K.osc({ type:'sine', f:2300*1.0004, at:t+40, dur:30, g:0.02, a:10, r:6, to:room });
      for(let k=0;k<6;k++) K.osc({ type:'sine', f:2300, at:t+58+k*1.5, dur:0.15, g:0.06, a:0.01, r:0.02, to:room }); });
  } },
{ id:"punk", name:"three chords", tick:"punk", ago:49.2, hue:350, kind:"evocation", scene:"three chords",
  prog:K=>{
    const room=K.verb(0.8,0.15);
    const amp=K.shape(9,K.filt('lowpass',3500,0.8,room));
    const bpm=180, q=60/bpm, e=q/2;
    const chords=[40,45,47,45];
    K.loop(q*4,(i,t)=>{ const r=chords[i%4];
      for(let k=0;k<8;k++){ const at=t+k*e; [r,r+7,r+12].forEach(n=>K.osc({ type:'sawtooth', f:midi(n)*(1+K.rr(-0.004,0.004)), at:at, dur:e*0.9, g:0.11, a:0.002, d:e, s:0.5, r:0.02, to:amp })); K.osc({ type:'sawtooth', f:midi(r-12), at:at, dur:e*0.85, g:0.22, a:0.002, d:e, s:0.5, r:0.02, to:K.filt('lowpass',700,1,room) }); }
      for(let k=0;k<4;k++){ const at=t+k*q; K.kick(at,0.5,{ to:room }); K.kick(at+e,0.35,{ to:room }); if(k%2) K.snare(at,0.6,{ bp:2200, to:room }); K.hat(at,0.2,false,{ to:room }); K.hat(at+e,0.15,false,{ to:room }); }
      if(i%4===3){ const at=t+q*2; for(let k=0;k<3;k++) K.voice({ f:K.rr(180,260), vowel:'a', at:at+k*0.22, dur:0.18, g:0.7, a:0.01, r:0.03, to:K.shape(6,room), q:6 }); }
      if(i%16===15){ const o=K.osc({ type:'sawtooth', f:1800, at:t+q*3, dur:q*3, g:0.14, a:0.2, r:0.1, to:amp }); o.o.frequency.exponentialRampToValueAtTime(2600,t+q*6); } });
  } },
{ id:"walkman", name:"the sound goes private", tick:"walkman", ago:47, hue:200, kind:"evocation", scene:"the sound goes private",
  prog:K=>{
    const room=K.verb(1,0.18);
    K.loop(50,(i,t)=>{
      const world=K.filt('lowpass',8000,0.5,room); world.frequency.setValueAtTime(8000,t+6); world.frequency.exponentialRampToValueAtTime(320,t+8); world.frequency.setValueAtTime(320,t+44); world.frequency.exponentialRampToValueAtTime(8000,t+46);
      const traffic=K.noise({ color:'pink', at:t, dur:50, g:0.22, lp:1500, a:1, r:1, to:world }); K.lfo(traffic.g.gain,0.2,0.08,'sine',t);
      for(let k=0;k<5;k++){ const at=t+K.r()*48; K.osc({ type:'sawtooth', f:K.pick([392,440,494]), at:at, dur:0.5, g:0.05, a:0.02, r:0.05, to:K.filt('lowpass',2000,1,world) }); }
      K.noise({ color:'white', at:t+5.5, dur:0.04, g:0.3, bp:2200, q:2, a:0.001, d:0.03, s:0, r:0.01, to:room }); K.noise({ color:'brown', at:t+6.2, dur:0.08, g:0.4, lp:700, a:0.002, d:0.07, s:0, r:0.02, to:room });
      const head=K.gain(0,room); head.gain.setValueAtTime(0,t+6.3); head.gain.linearRampToValueAtTime(1,t+8); head.gain.setValueAtTime(1,t+44); head.gain.linearRampToValueAtTime(0,t+44.3);
      K.noise({ color:'white', at:t+6.3, dur:38, g:0.05, hp:4000, a:0.5, r:0.2, to:head });
      const L=K.pan(-0.8,head), R=K.pan(0.8,head);
      const q=60/92; for(let b=0;b<64;b++){ const at=t+8+b*q; if(at>t+43) break; K.kick(at,0.35,{ f:100, f2:48, to:head }); if(b%2) K.snare(at,0.2,{ bp:1500, to:head }); K.hat(at+q/2,0.1,false,{ to:head }); }
      [[57,0],[60,1],[64,2],[62,3]].forEach(v=>{ for(let rep=0;rep<9;rep++){ const at=t+8+rep*q*4; if(at>t+40) break; [L,R].forEach((p,k)=>{ const o=K.osc({ type:'sawtooth', f:midi(v[0])*(1+(k?0.004:-0.004)), at:at+v[1]*0.05, dur:q*3.6, g:0.08, a:0.4, r:0.3, to:K.filt('lowpass',1800,0.6,p) }); K.lfo(o.o.frequency,1.1,midi(v[0])*0.006,'sine',at); }); } });
      K.noise({ color:'white', at:t+44, dur:0.05, g:0.35, bp:1800, q:2, a:0.001, d:0.04, s:0, r:0.01, to:room }); });
  } },
{ id:"eight08", name:"the 808", tick:"808", ago:46.5, hue:30, kind:"evocation", scene:"the 808",
  prog:K=>{
    const room=K.verb(1.3,0.2);
    const bpm=96, q=60/bpm, e=q/2;
    const cow=at=>{ const b=K.filt('bandpass',720,4,room); [587,845].forEach(f=>K.osc({ type:'square', f:f, at:at, dur:0.25, g:0.12, a:0.001, d:0.22, s:0, r:0.02, to:b })); };
    K.loop(q*4,(i,t)=>{ for(let k=0;k<8;k++){ const at=t+k*e; if([0,3,6].includes(k)||(i%4===3&&k===7)) K.kick(at,0.9,{ f:55, f2:44, dur:0.55, to:room });
        if(k===2||k===6){ K.snare(at,0.45,{ f:180, bp:1400, to:room }); K.clap(at,0.3,{ to:room }); }
        K.hat(at,k%2?0.12:0.2,false,{ hp:9000, to:room }); if(i%2===1&&k===5) K.hat(at,0.2,true,{ hp:8000, to:room }); if(i%4===2&&k===4) cow(at); }
      if(i%8===7){ const at=t+q*2; const s=K.noise({ color:'white', at:at, dur:0.5, g:0.25, bp:1200, q:3, a:0.01, r:0.05, to:room }); s.head.frequency.setValueAtTime(600,at); s.head.frequency.exponentialRampToValueAtTime(3000,at+0.2); s.head.frequency.exponentialRampToValueAtTime(500,at+0.48); }
      if(i%4===3){ [0,0.5].forEach((o,k)=>K.voice({ f:K.rr(130,190), vowel:k?'o':'e', at:t+q*3+o*q, dur:0.16, g:0.6, a:0.01, r:0.04, to:room, q:6 })); } });
  } },
{ id:"joydivision", name:"decades", tick:"decades", ago:46.4, hue:230, kind:"evocation", scene:"decades",
  prog:K=>{
    const room=K.verb(4.2,0.5);
    const bpm=84, q=60/bpm;
    const chords=[[45,[57,60,64]],[45,[57,60,64]],[41,[53,57,60]],[43,[55,59,62]]];
    K.loop(q*4,(i,t)=>{ const c=chords[i%4];
      for(let k=0;k<4;k++){ const at=t+k*q; K.tom(at,150,0.45,{ to:room }); if(k===1||k===3) K.snare(at,0.22,{ bp:1200, to:K.filt('lowpass',2500,0.5,room) }); K.hat(at+q/2,0.06,false,{ to:room });
        [0,0.5].forEach(o=>K.osc({ type:'triangle', f:midi(c[0]-12), at:at+o*q, dur:q*0.45, g:0.28, a:0.005, d:q*0.4, s:0.3, r:0.04, to:room })); }
      c[1].forEach(n=>{ const o=K.osc({ type:'sawtooth', f:midi(n+12), at:t, dur:q*3.9, g:0.07, a:0.6, r:0.6, to:K.filt('lowpass',1500,0.7,room) }); K.lfo(o.o.frequency,0.3,midi(n+12)*0.003,'sine',t); });
      if(i%2===1){ let at=t+q*0.5; for(let k=0;k<5;k++){ const V=K.voice({ f:K.rr(96,118), vowel:K.pick(['o','a','e','u']), at:at, dur:K.rr(0.3,0.7), g:0.4, a:0.05, r:0.15, to:room, q:7 }); at+=K.rr(0.45,0.8); } } });
  } },
{ id:"psychictv", name:"psychick television", tick:"psychic tv", ago:44, hue:300, kind:"evocation", scene:"psychick television",
  prog:K=>{
    const room=K.verb(2.6,0.35);
    const wob=K.filt('lowpass',900,0.9,room);
    [60,64,67,71].forEach((n,k)=>{ const o=K.osc({ type:'square', f:midi(n-12), g:0.035, a:2, to:wob }); K.lfo(o.o.frequency,0.31+k*0.07,midi(n-12)*0.012); });
    const cello=K.osc({ type:'sawtooth', f:midi(36), g:0.12, a:3, to:K.filt('lowpass',700,2,room) }); K.lfo(cello.o.frequency,5,midi(36)*0.006);
    const q=60/76;
    K.loop(q*4,(i,t)=>{ [0,2.5,3].forEach(k=>K.tom(t+k*q,90,0.5,{ to:room })); K.noise({ color:'white', at:t+q, dur:0.08, g:0.08, bp:3000, q:1, a:0.002, d:0.07, s:0, r:0.02, to:room });
      if(i%2===0){ [1,2.4,3.9].forEach((m,j)=>K.osc({ type:'sine', f:1760*m, at:t+q*3, dur:1.5/(j+1), g:0.08/(j+1), a:0.001, d:1.3/(j+1), s:0, r:0.1, to:room })); }
      if(i%4===1){ let at=t+q*0.25; [['a',0.3],['e',0.2],['o',0.35],['i',0.2],['a',0.4]].forEach(s=>{ K.voice({ f:128, vowel:s[0], at:at, dur:s[1], g:0.3, a:0.03, r:0.08, to:K.pan(K.rr(-0.5,0.5),room), q:7 }); at+=s[1]+0.08; }); } });
  } },
{ id:"burningman", name:"the man burns", tick:"the burn", ago:40, hue:20, kind:"evocation", scene:"the man burns",
  prog:K=>{
    const room=K.verb(6,0.4);
    K.loop(70,(i,t)=>{
      const wind=K.noise({ color:'pink', at:t, dur:70, g:0.10, lp:800, a:3, r:3, to:room }); K.lfo(wind.g.gain,0.1,0.05,'sine',t);
      const crowd=K.gain(0.0001,room); crowd.gain.setValueAtTime(0.0001,t); crowd.gain.exponentialRampToValueAtTime(0.5,t+20); crowd.gain.setValueAtTime(0.5,t+40); crowd.gain.exponentialRampToValueAtTime(1.6,t+42.5); crowd.gain.setValueAtTime(1.6,t+50); crowd.gain.exponentialRampToValueAtTime(0.2,t+68);
      K.noise({ color:'pink', at:t, dur:70, g:0.16, bp:1500, q:0.6, a:2, r:2, to:crowd });
      for(let v=0;v<12;v++){ const V=K.voice({ f:K.rr(180,420), vowel:K.pick(['a','o','e']), at:t+1, dur:66, g:0.03, a:5, r:3, to:K.pan(K.rr(-1,1),crowd), q:5 }); K.lfo(V.src.frequency,K.rr(2,6),K.rr(10,40),'sine',t); }
      for(let k=0;k<14;k++){ const at=t+8+K.r()*30; K.noise({ color:'brown', at:at, dur:0.5, g:0.4, lp:300, a:0.003, d:0.4, s:0, r:0.1, to:room }); for(let j=0;j<20;j++) K.noise({ color:'white', at:at+0.3+K.r()*1.5, dur:0.015, g:0.15*K.r(), bp:K.rr(2000,7000), q:4, a:0.001, d:0.01, s:0, r:0.005, to:room }); }
      const fire=K.noise({ color:'pink', at:t+14, dur:56, g:0.0001, lp:600, a:0.01, r:4, to:room }); fire.g.gain.setValueAtTime(0.0001,t+14); fire.g.gain.exponentialRampToValueAtTime(0.5,t+40); fire.g.gain.setValueAtTime(0.5,t+50); fire.g.gain.exponentialRampToValueAtTime(0.15,t+68); K.lfo(fire.g.gain,1.3,0.07,'sine',t+14);
      for(let k=0;k<90;k++){ const at=t+16+K.r()*50; K.noise({ color:'white', at:at, dur:0.02, g:0.2*K.r(), bp:K.rr(1500,6000), q:3, a:0.001, d:0.015, s:0, r:0.005, to:room }); }
      const fall=t+42; K.noise({ color:'brown', at:fall, dur:3, g:1.1, lp:200, a:0.02, d:2.6, s:0, r:0.4, to:room }); for(let k=0;k<12;k++) K.noise({ color:'white', at:fall+K.r()*1.2, dur:0.05, g:0.5, bp:K.rr(400,1400), q:2, a:0.001, d:0.04, s:0, r:0.01, to:room });
      const car=K.filt('lowpass',260,1,room); const q=60/128; for(let b=0;b<40;b++){ const at=t+52+b*q; K.kick(at,0.6*Math.min(1,(b+1)/12),{ f:90, f2:40, to:car }); if(b%2) K.hat(at,0.05,false,{ to:room }); } });
  } },
{ id:"acid", name:"acid", tick:"acid", ago:38.5, hue:60, kind:"evocation", scene:"acid",
  prog:K=>{
    const room=K.verb(1.4,0.2);
    const bpm=125, q=60/bpm, s=q/4;
    const lp=K.filt('lowpass',400,14,K.shape(2,room));
    const osc=K.osc({ type:'sawtooth', f:110, g:0.0, a:0.01, to:lp });
    const notes=[45,45,48,45,52,45,57,55,45,45,48,45,47,45,43,57];
    const acc=[1,0,0,1,0,0,1,0,1,0,0,0,1,0,0,1], slide=[0,0,1,0,0,1,0,0,0,0,1,0,0,0,1,0];
    K.loop(s,(i,t)=>{ const k=i%16; if(i%64>=56&&k>7) { osc.g.gain.setTargetAtTime(0,t,0.02); return; }
      const f=midi(notes[k]-12); if(slide[k]) osc.o.frequency.exponentialRampToValueAtTime(f,t+s*0.8); else osc.o.frequency.setValueAtTime(f,t);
      osc.g.gain.cancelScheduledValues(t); osc.g.gain.setValueAtTime(0.0001,t); osc.g.gain.linearRampToValueAtTime(0.28,t+0.004); osc.g.gain.setTargetAtTime(0.08,t+s*0.5,0.05);
      lp.frequency.cancelScheduledValues(t); lp.frequency.setValueAtTime(acc[k]?2400:900,t); lp.frequency.exponentialRampToValueAtTime(220,t+s*(acc[k]?1.4:0.8));
      if(k%4===0) K.kick(t,0.7,{ f:140, f2:48, dur:0.3, to:room }); if(k%4===2) K.hat(t,0.18,k===14,{ to:room }); if(k===4||k===12) K.clap(t,0.3,{ to:room });
      if(i%32===16){ [57,60,64].forEach(n=>K.osc({ type:'sawtooth', f:midi(n), at:t, dur:0.18, g:0.08, a:0.003, d:0.15, s:0.2, r:0.03, to:K.filt('lowpass',2000,2,room) })); } });
  } },
{ id:"techno", name:"the machine with soul", tick:"detroit", ago:38.4, hue:205, kind:"evocation", scene:"the machine with soul",
  prog:K=>{
    const room=K.verb(2.8,0.3);
    const q=60/128, s=q/4;
    const pad=K.filt('lowpass',600,3.5,room);
    const CH=[[nn('A3'),nn('C4'),nn('E4'),nn('G4')],[nn('F3'),nn('A3'),nn('C4'),nn('E4')]];
    const bassf=K.filt('lowpass',1400,1.4,room), far=K.echo(q*0.75,0.45,0.5,room,4000);
    K.loop(q*4,(i,t)=>{
      for(let b=0;b<4;b++){ const at=t+b*q;
        K.kick(at,0.85,{ f:135, f2:41, dur:0.4, to:room });
        if(b%2===1) K.clap(at,0.22,{ to:room });
        K.noise({ at:at+q*0.5, dur:0.16, g:0.07, hp:9000, q:0.7, a:0.001, d:0.14, s:0, r:0.03, to:room });
        K.noise({ at:at+q*0.25, dur:0.03, g:0.035, hp:10000, q:0.7, a:0.001, d:0.025, s:0, r:0.008, to:room });
        K.osc({ type:'square', f:midi([nn('A1'),nn('A1'),nn('E2'),nn('G1')][b]), at:at+s*2, dur:0.14, g:0.24, a:0.004, d:0.11, s:0.1, r:0.04, to:bassf });
      }
      const ch=CH[Math.floor(i/4)%2];
      if(i%4===0) ch.forEach(n=>[0,-9,9].forEach(d=>K.osc({ type:'sawtooth', f:midi(n)*(1+d*0.0006), at:t, dur:q*3.6, g:0.045, a:0.25, d:0.6, s:0.8, r:0.9, to:pad, det:d })));
      const open=(i%16)/16;
      pad.frequency.setTargetAtTime(500+3200*open*open,t,0.4);
      if(i%2===1){ let at=t+q*0.5; [0,2,3,2].forEach(k=>{
        K.osc({ type:'sine', f:midi(ch[k])*4, at:at, dur:0.22, g:0.028, a:0.002, d:0.2, s:0.05, r:0.08, to:far }); at+=q*0.5; }); }
    });
  } },
{ id:"oliveros", name:"the cistern", tick:"deep listening", ago:38.3, hue:180, kind:"evocation", scene:"the cistern",
  prog:K=>{
    const tail=K.verb(12,0.85);
    const fbin=K.echo(0.9,0.86,0.7,tail,1800);
    K.loop(20,(i,t)=>{ const at=t+K.r()*4; const root=K.pick([48,50,53,55]);
      if(i%3!==2) [root,root+7,root+12,root+16].forEach((n,k)=>{ const o=K.osc({ type:'sawtooth', f:midi(n)*(1+K.rr(-0.004,0.004)), at:at+k*0.15, dur:K.rr(3,6), g:0.13, a:1.5, r:1.5, to:K.filt('lowpass',1800,0.6,fbin) }); K.lfo(o.g.gain,4.5,0.02,'sine',at); });
      else { const V=K.voice({ f:midi(root-12), vowel:'o', at:at, dur:5, g:0.6, a:1.2, r:1.5, to:fbin, q:6 }); V.set('a',at+2.2,0.8); V.pitch(midi(root-12)*1.5,at+3,1.2); } });
  } },
{ id:"millivanilli", name:"the lip-sync", tick:"milli vanilli", ago:38.1, hue:330, kind:"evocation", scene:"the lip-sync",
  prog:K=>{
    const room=K.verb(1.8,0.3);
    const bpm=108, q=60/bpm, e=q/2;
    const prog=[[48,[60,63,67]],[53,[53,57,60]],[55,[55,58,62]],[48,[60,63,67]]];
    K.loop(q*4,(i,t)=>{ const c=prog[i%4];
      for(let k=0;k<4;k++){ const at=t+k*q; K.kick(at,0.6,{ f:130, f2:50, to:room }); if(k%2){ K.snare(at,0.5,{ bp:1600, to:room }); K.noise({ color:'white', at:at, dur:0.09, g:0.3, bp:2000, q:0.7, a:0.001, d:0.02, s:1, r:0.005, to:room }); } K.hat(at+e,0.14,false,{ to:room });
        const b=K.osc({ type:'sine', f:midi(c[0]-12), at:at, dur:e*0.8, g:0.4, a:0.003, d:e*0.7, s:0.1, r:0.03, to:room }); b.o.frequency.setValueAtTime(midi(c[0]-12)*1.5,at); b.o.frequency.exponentialRampToValueAtTime(midi(c[0]-12),at+0.05); }
      if(i%2===0){ c[1].forEach(n=>K.osc({ type:'sawtooth', f:midi(n), at:t+q*1.5, dur:0.2, g:0.09, a:0.005, d:0.18, s:0.2, r:0.03, to:K.filt('lowpass',3000,1,room) })); }
      const late=0.06; const stuck=i%8===7;
      let at=t+q*0.5+late; for(let k=0;k<4;k++){ const v=stuck?'e':K.pick(['a','e','o','i']); [0,-0.4,0.4].forEach(p=>K.voice({ f:midi(c[1][0])*(1+K.rr(-0.005,0.005)), vowel:v, at:at, dur:0.28, g:0.22, a:0.02, r:0.06, to:K.pan(p,room), q:8 })); at+=stuck?0.18:q*0.75; } });
  } },
{ id:"bangles", name:"eternal flame", tick:"eternal flame", ago:37.7, hue:20, kind:"evocation", scene:"eternal flame",
  prog:K=>{
    const room=K.verb(2.6,0.35);
    const bpm=76, q=60/bpm, s=q/2;
    const prog=[[51,[63,67,70]],[48,[60,63,67]],[56,[56,60,63]],[58,[58,62,65]]];
    const bell=(n,at,d,g)=>[[1,1],[2,0.4],[3,0.15],[5.4,0.06]].forEach(p=>K.osc({ type:'sine', f:midi(n)*p[0], at:at, dur:d, g:g*p[1], a:0.003, d:d*0.9, s:0.1, r:0.1, to:room }));
    K.loop(q*4,(i,t)=>{ const c=prog[i%4]; const arp=[c[1][0],c[1][1],c[1][2],c[1][1]+12,c[1][2],c[1][1],c[1][0],c[1][1]];
      arp.forEach((n,k)=>bell(n+12,t+k*s,s*1.8,0.14));
      K.rich(midi(c[0]-12),t,q*3.8,{ g:0.16, part:[[1,1],[2,0.3]], a:0.02, type:'triangle', to:room });
      c[1].forEach(n=>{ const o=K.osc({ type:'sawtooth', f:midi(n), at:t, dur:q*3.9, g:0.04, a:0.8, r:0.6, to:K.filt('lowpass',1800,0.6,room) }); K.lfo(o.o.frequency,5,midi(n)*0.004,'sine',t); });
      if(i%8>=4){ [1,3].forEach(k=>{ K.snare(t+k*q,0.4,{ bp:1500, to:room }); K.noise({ color:'white', at:t+k*q, dur:0.14, g:0.25, bp:1800, q:0.6, a:0.001, d:0.02, s:1, r:0.005, to:room }); }); [0,2].forEach(k=>K.kick(t+k*q,0.4,{ to:room })); }
      if(i%4!==3){ const n=c[1][2]; const V=K.voice({ f:midi(n), vowel:K.pick(['a','o','e']), at:t+q*0.5, dur:q*2.4, g:0.3, a:0.15, r:0.3, to:room, q:8 }); V.set(K.pick(['o','a']),t+q*1.8,0.3); K.lfo(V.src.frequency,5.2,midi(n)*0.008,'sine',t+q); } });
  } },
{ id:"johnston", name:"some things last a long time", tick:"johnston", ago:36, hue:50, kind:"evocation", scene:"some things last a long time",
  prog:K=>{
    const room=K.verb(0.7,0.15);
    const box=K.filt('bandpass',1400,0.35,room);
    K.noise({ color:'pink', g:0.07, hp:2500, a:0.5, to:box }); K.osc({ type:'sawtooth', f:55, g:0.02, a:1, to:K.filt('lowpass',200,1,box) }); K.noise({ color:'pink', g:0.03, bp:300, q:1, a:1, to:box });
    const bpm=72, q=60/bpm;
    const prog=[[48,[60,64,67]],[53,[53,57,60]],[55,[55,59,62]],[48,[60,64,67]]];
    K.loop(q*4,(i,t)=>{ const c=prog[i%4];
      for(let k=0;k<4;k++){ const at=t+k*q; c[1].forEach((n,j)=>K.osc({ type:'square', f:midi(n)*(1+[0.006,-0.004,0.008][j]), at:at, dur:q*0.85, g:0.045, a:0.03, d:0.2, s:0.7, r:0.08, to:K.filt('lowpass',1100,0.7,box) })); K.osc({ type:'square', f:midi(c[0]-12)*1.004, at:at, dur:q*0.85, g:0.07, a:0.03, r:0.08, to:K.filt('lowpass',600,0.7,box) }); }
      if(i%4!==3){ let at=t+q*0.3; for(let k=0;k<4;k++){ const n=K.pick(c[1]); const f=midi(n)*K.pick([1,1,1,0.97,1.02]); const V=K.voice({ f:f, vowel:K.pick(['a','e','o','i']), at:at, dur:K.rr(0.3,0.8), g:0.5, a:0.04, r:0.1, to:box, q:7 }); if(K.r()<0.3) V.pitch(f*0.96,at+0.25,0.1); at+=K.rr(0.5,0.9); } } });
  } },
{ id:"pulsar", name:"psr j0437−4715", tick:"psr j0437", ago:33.5, hue:200, kind:"physics", scene:"psr j0437−4715",
  prog:K=>{
    const room=K.verb(2,0.25);
    const f=173.6879;
    const band=K.filt('bandpass',900,0.6,room);
    const p=K.osc({ type:'sawtooth', f:f, g:0.16, a:2, to:band }); const p2=K.osc({ type:'square', f:f, g:0.05, a:2, to:K.filt('lowpass',3000,1,room) });
    K.lfo(p.g.gain,1/5.74,0.06); K.osc({ type:'sine', f:f/2, g:0.05, a:4, to:room });
    K.noise({ color:'pink', g:0.05, hp:1500, a:2, to:room });
    K.loop(2.4,(i,t)=>{ if(K.r()<0.7){ const at=t+K.r(); const s=K.noise({ color:'white', at:at, dur:0.5, g:0.14, bp:3000, q:10, a:0.01, r:0.05, to:room }); s.head.frequency.setValueAtTime(3800,at); s.head.frequency.exponentialRampToValueAtTime(260,at+0.45); }
      if(K.r()<0.12) K.noise({ color:'white', at:t+K.r(), dur:0.012, g:0.6, bp:1200, q:1, a:0.001, d:0.01, s:0, r:0.003, to:room }); });
  } },
{ id:"nokia", name:"the phrase in every pocket", tick:"nokia", ago:32.7, hue:120, kind:"quotation", scene:"the phrase in every pocket",
  prog:K=>{
    const room=K.verb(0.8,0.15);
    const spk=K.filt('bandpass',2400,0.9,room);
    const ph=[[76,0.5],[74,0.5],[66,1],[68,1],[73,0.5],[71,0.5],[62,1],[64,1],[71,0.5],[69,0.5],[61,1],[64,1],[69,2]];
    K.loop(26,(i,t)=>{ for(let r=0;r<3;r++){ const at0=t+r*3.6; seqPlay(ph,at0,0.19,(n,at,d)=>{ K.osc({ type:'square', f:midi(n), at:at, dur:d*0.85, g:0.22, a:0.003, r:0.01, to:spk }); K.osc({ type:'sine', f:midi(n)*3, at:at, dur:d*0.85, g:0.04, a:0.003, r:0.01, to:spk }); }); }
      const g0=t+12; seqPlay(ph,g0,0.42,(n,at,d)=>{ K.pluck(midi(n),at,1.2,{ g:0.24, close:0.35, to:room }); if(d>0.6){ K.pluck(midi(n-19),at,1,{ g:0.14, close:0.4, to:room }); } });
      [g0+0.42*2,g0+0.42*4,g0+0.42*6,g0+0.42*8].forEach((a,k)=>K.pluck(midi([45,45,40,45][k]),a,0.8,{ g:0.12, close:0.4, to:room }));
      const vb=K.noise({ color:'brown', at:t+19, dur:1.0, g:0.5, lp:400, a:0.01, r:0.05, to:room }); K.lfo(vb.g.gain,30,0.45,'square',t+19); K.osc({ type:'sine', f:170, at:t+19, dur:1.0, g:0.15, a:0.01, r:0.05, to:room });
      const vb2=K.noise({ color:'brown', at:t+20.6, dur:1.0, g:0.5, lp:400, a:0.01, r:0.05, to:room }); K.lfo(vb2.g.gain,30,0.45,'square',t+20.6); });
  } },
{ id:"jingle", name:"five notes that sell", tick:"the jingle", ago:32.5, hue:40, kind:"evocation", scene:"five notes that sell",
  prog:K=>{
    const room=K.verb(1.6,0.25);
    const logo=(at,g)=>[[62,0],[69,0.22],[62,0.44],[74,0.66],[69,0.88]].forEach(n=>{ [1,2,3].forEach((h,k)=>K.osc({ type:'sine', f:midi(n[0])*h, at:at+n[1], dur:1.4, g:g*[1,0.35,0.12][k], a:0.004, d:1.2, s:0.1, r:0.2, to:room })); });
    K.loop(30,(i,t)=>{ logo(t+0.5,0.28);
      const wh=[[79,0.3],[81,0.3],[83,0.3],[81,0.3],[79,0.6]]; seqPlay(wh,t+4,1,(n,at,d)=>{ const o=K.osc({ type:'sine', f:midi(n), at:at, dur:d*0.9, g:0.18, a:0.03, r:0.05, to:room }); K.lfo(o.o.frequency,6,midi(n)*0.01,'sine',at); K.noise({ color:'white', at:at, dur:d*0.9, g:0.03, bp:midi(n), q:8, a:0.03, r:0.05, to:room }); });
      let at=t+8; for(let k=0;k<40;k++){ K.voice({ f:K.rr(150,230), vowel:K.pick(['a','e','i','o','u']), at:at, dur:0.09, g:0.45, a:0.01, r:0.02, to:room, q:7 }); at+=0.11; }
      const bpm=128,q=60/bpm; for(let b=0;b<24;b++){ const a=t+13+b*q; K.kick(a,0.35*Math.min(1,b/8),{ to:room }); if(b%2) K.snare(a,0.2,{ to:room }); K.hat(a+q/2,0.08,false,{ to:room }); [60,64,67].forEach(n=>K.osc({ type:'sawtooth', f:midi(n+(b%8<4?0:5)), at:a, dur:q*0.4, g:0.05*Math.min(1,b/8), a:0.005, d:q*0.3, s:0.2, r:0.03, to:K.filt('lowpass',2500,1,room) })); }
      K.noise({ color:'white', at:t+24.5, dur:0.05, g:0.4, bp:3500, q:2, a:0.001, d:0.04, s:0, r:0.01, to:room }); [1,1.5,2.2].forEach((m,k)=>K.osc({ type:'sine', f:2200*m, at:t+24.55, dur:0.6, g:0.12/(k+1), a:0.002, d:0.5, s:0, r:0.05, to:room }));
      logo(t+26.5,0.3); });
  } },
{ id:"modem", name:"the handshake", tick:"the modem", ago:31.5, hue:90, kind:"evocation", scene:"the handshake",
  prog:K=>{
    const room=K.verb(0.6,0.12);
    const line=K.filt('bandpass',1500,0.4,room);
    const DT={ r:[697,770,852,941], c:[1209,1336,1477] };
    K.loop(34,(i,t)=>{ let at=t+0.5;
      [350,440].forEach(f=>K.osc({ type:'sine', f:f, at:at, dur:1.4, g:0.16, a:0.01, r:0.02, to:line })); at+=1.6;
      [5,5,5,0,1,2,1].forEach(d=>{ const r=Math.floor(d/3), c=d%3; K.osc({ type:'sine', f:DT.r[d===0?3:r], at:at, dur:0.09, g:0.18, a:0.005, r:0.01, to:line }); K.osc({ type:'sine', f:DT.c[d===0?1:c], at:at, dur:0.09, g:0.18, a:0.005, r:0.01, to:line }); at+=0.17; });
      at+=0.6; [440,480].forEach(f=>K.osc({ type:'sine', f:f, at:at, dur:1.6, g:0.12, a:0.01, r:0.02, to:line })); at+=2.6;
      K.noise({ color:'white', at:at, dur:0.05, g:0.3, bp:2000, q:2, a:0.001, d:0.04, s:0, r:0.01, to:line }); at+=0.3;
      for(let k=0;k<7;k++){ K.osc({ type:'sine', f:2100, at:at+k*0.45, dur:0.44, g:0.25, a:0.002, r:0.002, to:line }); } at+=3.3;
      K.osc({ type:'sine', f:1400,at:at,dur:0.4,g:0.2,a:0.005,r:0.01,to:line }); K.osc({ type:'sine', f:2000,at:at+0.45,dur:0.4,g:0.2,a:0.005,r:0.01,to:line }); at+=1.1;
      for(let k=0;k<3;k++){ const o=K.osc({ type:'sine', f:800, at:at, dur:0.5, g:0.22, a:0.005, r:0.01, to:line }); o.o.frequency.exponentialRampToValueAtTime(3200,at+0.48); at+=0.6; }
      for(let k=0;k<2;k++){ K.osc({ type:'sine', f:1200, at:at, dur:0.35, g:0.2, a:0.005, r:0.01, to:line }); K.osc({ type:'sine', f:2400, at:at+0.38, dur:0.35, g:0.2, a:0.005, r:0.01, to:line }); at+=0.8; }
      K.noise({ color:'white', at:at, dur:3.5, g:0.28, bp:1800, q:0.6, a:0.05, r:0.05, to:line }); K.osc({ type:'sine', f:1800, at:at, dur:3.5, g:0.06, a:0.05, r:0.05, to:line }); at+=3.7;
      K.noise({ color:'white', at:at, dur:1.2, g:0.35, bp:2400, q:0.5, a:0.02, r:0.02, to:line }); at+=1.3;
      K.noise({ color:'pink', at:at, dur:8, g:0.16, bp:2000, q:0.4, a:0.3, r:0.5, to:line }); at+=8.5;
      K.noise({ color:'white', at:at, dur:0.06, g:0.3, bp:1500, q:2, a:0.001, d:0.05, s:0, r:0.01, to:line }); [350,440].forEach(f=>K.osc({ type:'sine', f:f, at:at+0.4, dur:1.5, g:0.1, a:0.01, r:0.02, to:line })); });
  } },
{ id:"mp3", name:"the compressed song", tick:"mp3", ago:27.5, hue:140, kind:"evocation", scene:"the compressed song",
  prog:K=>{
    const room=K.verb(1.2,0.2);
    K.loop(24,(i,t)=>{ [[1,8000,0],[2,8000,0.35],[3,5000,0.7],[4,3200,1]].forEach((st,si)=>{ const at0=t+si*5.5; const lp=K.filt('lowpass',st[1],0.5,room); const bus=K.gain(1,lp);
        for(let b=0;b<8;b++){ const at=at0+b*0.5; [60,64,67,71].forEach(n=>K.rich(midi(n+(b%4<2?0:2)),at,0.45,{ g:0.08, part:[[1,1],[2,0.3],[3,0.1]], a:0.003, d:0.4, s:0.2, to:bus })); K.hat(at+0.25,0.1,false,{ to:bus }); if(b%2===0) K.kick(at,0.35,{ to:bus }); }
        if(st[2]>0){ for(let k=0;k<Math.floor(14*st[2]);k++){ const b=K.filt('bandpass',K.rr(1500,7000),20,room); const g=K.gain(0,b); bus.connect(g); const a=at0+K.r()*3.8; g.gain.setValueAtTime(0,a); g.gain.linearRampToValueAtTime(0.9*st[2],a+0.02); g.gain.setValueAtTime(0.9*st[2],a+K.rr(0.08,0.3)); g.gain.linearRampToValueAtTime(0,a+K.rr(0.1,0.32)); }
          const sh=K.shape(st[2]*6,room); const sg=K.gain(0.35*st[2],sh); bus.connect(sg); } }); });
  } },
{ id:"iphone", name:"the phone in your pocket", tick:"the phone", ago:19.5, hue:210, kind:"evocation", scene:"the phone in your pocket",
  prog:K=>{
    const room=K.verb(0.9,0.15);
    const wood=(n,at,g)=>[[1,1],[4,0.3],[9.2,0.08]].forEach(p=>K.osc({ type:'sine', f:midi(n)*p[0], at:at, dur:0.35/p[0], g:g*p[1], a:0.002, d:0.3/p[0], s:0, r:0.03, to:room }));
    K.loop(40,(i,t)=>{ const mar=[72,76,79,84,79,76]; for(let r=0;r<4;r++) mar.forEach((n,k)=>wood(n,t+1+r*1.6+k*0.14,0.22));
      [[81,0],[86,0.12],[93,0.24]].forEach(n=>[[1,1],[2,0.3]].forEach(p=>K.osc({ type:'sine', f:midi(n[0])*p[0], at:t+10+n[1], dur:0.5, g:0.2*p[1], a:0.003, d:0.45, s:0, r:0.05, to:room })));
      [13,14.2].forEach(s=>{ const vb=K.noise({ color:'brown', at:t+s, dur:0.8, g:0.5, lp:500, a:0.005, r:0.03, to:room }); K.lfo(vb.g.gain,30,0.45,'square',t+s); K.osc({ type:'sine', f:160, at:t+s, dur:0.8, g:0.12, a:0.005, r:0.03, to:room }); for(let k=0;k<12;k++) K.noise({ color:'white', at:t+s+k*0.066, dur:0.01, g:0.15, bp:2500, q:2, a:0.001, d:0.008, s:0, r:0.003, to:room }); });
      let at=t+17; for(let k=0;k<26;k++){ K.noise({ color:'white', at:at, dur:0.012, g:0.2, bp:K.rr(2500,4500), q:3, a:0.001, d:0.01, s:0, r:0.003, to:room }); at+=K.rr(0.07,0.22); if(k%7===6) at+=0.4; }
      const sw=K.noise({ color:'white', at:at+0.5, dur:0.35, g:0.2, bp:1500, q:2, a:0.05, r:0.05, to:room }); sw.head.frequency.setValueAtTime(800,at+0.5); sw.head.frequency.exponentialRampToValueAtTime(5000,at+0.82); K.osc({ type:'sine', f:1600, at:at+0.85, dur:0.15, g:0.1, a:0.005, d:0.12, s:0, r:0.02, to:room });
      const sh=t+28; K.noise({ color:'white', at:sh, dur:0.03, g:0.5, bp:3000, q:1.5, a:0.001, d:0.025, s:0, r:0.005, to:room }); K.noise({ color:'pink', at:sh+0.04, dur:0.12, g:0.25, bp:1200, q:1, a:0.005, d:0.1, s:0, r:0.02, to:room }); K.noise({ color:'white', at:sh+0.17, dur:0.03, g:0.4, bp:2600, q:1.5, a:0.001, d:0.025, s:0, r:0.005, to:room });
      [[81,0],[86,0.12],[93,0.24]].forEach(n=>[[1,1],[2,0.3]].forEach(p=>K.osc({ type:'sine', f:midi(n[0])*p[0], at:t+33+n[1], dur:0.5, g:0.2*p[1], a:0.003, d:0.45, s:0, r:0.05, to:room }))); });
  } },
{ id:"autotune", name:"the corrected voice", tick:"auto-tune", ago:18.5, hue:300, kind:"evocation", scene:"the corrected voice",
  prog:K=>{
    const room=K.verb(2.4,0.35);
    const bpm=70, q=60/bpm;
    const scale=[57,59,60,62,64,65,67,69,71,72];
    K.loop(q,(i,t)=>{ if(i%4===0) K.kick(t,0.7,{ f:60, f2:45, dur:0.6, to:room }); if(i%4===2) K.snare(t,0.3,{ bp:1500, to:room }); [0,0.25,0.5,0.75].forEach(o=>K.hat(t+o*q,o===0?0.14:0.08,false,{ to:room })); });
    K.loop(q*4,(i,t)=>{ const snap=i%8>=4; let at=t; const n=3+Math.floor(K.r()*3);
      for(let k=0;k<n;k++){ const d=K.rr(0.5,1.2); const target=midi(K.pick(scale)); const f0=snap?target:target*K.rr(0.95,1.05);
        const V=K.voice({ f:f0, vowel:K.pick(['a','o','e','i']), at:at, dur:d, g:0.4, a:0.04, r:0.12, to:room, q:8 });
        if(snap){ let tt=at+0.1; while(tt<at+d){ V.src.frequency.setValueAtTime(midi(K.pick(scale)),tt); tt+=K.rr(0.12,0.3); } }
        else { K.lfo(V.src.frequency,4.5,f0*0.02,'sine',at); V.pitch(f0*K.rr(0.93,1.07),at+d*0.6,d*0.35); }
        at+=d+0.05; } });
  } },
{ id:"kpop", name:"the factory of seoul", tick:"k-pop", ago:14.2, hue:320, kind:"evocation", scene:"the factory of seoul",
  prog:K=>{
    const room=K.verb(1.5,0.25);
    const bpm=130, q=60/bpm, e=q/2;
    const prog=[[57,[57,60,64]],[53,[53,57,60]],[60,[60,64,67]],[55,[55,59,62]]];
    const lp=K.filt('lowpass',600,1,room);
    K.loop(q*4,(i,t)=>{ const c=prog[i%4]; const open=(i%16)>=12; lp.frequency.setTargetAtTime(open?6000:900,t,0.5);
      for(let k=0;k<4;k++){ const at=t+k*q; K.kick(at,0.8,{ f:150, f2:48, to:room }); if(k%2){ K.snare(at,0.5,{ bp:1800, to:room }); K.clap(at,0.25,{ to:room }); } K.hat(at+e,0.16,false,{ to:room }); [0,0.25,0.75].forEach(o=>K.hat(at+o*q,0.07,false,{ to:room }));
        const duck=K.gain(1,lp); duck.gain.setValueAtTime(0.15,at); duck.gain.linearRampToValueAtTime(1,at+q*0.55);
        c[1].forEach(n=>[0,12].forEach(o=>K.osc({ type:'sawtooth', f:midi(n+o)*(1+K.rr(-0.004,0.004)), at:at, dur:q*0.95, g:0.06, a:0.01, r:0.05, to:duck })));
        K.osc({ type:'sawtooth', f:midi(c[0]-24), at:at, dur:q*0.9, g:0.28, a:0.005, r:0.03, to:K.filt('lowpass',300,1,room) }); }
      if(open){ const arp=[c[1][0]+24,c[1][1]+24,c[1][2]+24,c[1][1]+36]; for(let k=0;k<8;k++) K.osc({ type:'square', f:midi(arp[k%4]), at:t+k*e, dur:e*0.6, g:0.06, a:0.003, d:e*0.5, s:0.2, r:0.02, to:K.filt('lowpass',4000,1,room) }); }
      if(i%2===1){ const at=t+q*3; for(let v=0;v<5;v++) K.voice({ f:K.rr(200,330), vowel:'e', at:at+v*0.01, dur:0.22, g:0.3, a:0.01, r:0.05, to:K.pan(K.rr(-0.8,0.8),room), q:7 }); } });
  } },
{ id:"cloudrap", name:"kyoto", tick:"cloud rap", ago:13.3, hue:260, kind:"evocation", scene:"kyoto",
  prog:K=>{
    const room=K.verb(6,0.55);
    const bpm=68, q=60/bpm, s=q/4;
    const pad=K.filt('lowpass',900,0.8,room);
    const prog=[[57,[57,60,64,67]],[53,[53,57,60,64]],[55,[55,59,62,65]],[52,[52,55,59,62]]];
    const bell=K.echo(q*2,0.55,0.7,room,2500);
    K.loop(q*4,(i,t)=>{ const c=prog[i%4];
      c[1].forEach(n=>[0,12].forEach(o=>{ const x=K.osc({ type:'sawtooth', f:midi(n+o)*(1+K.rr(-0.005,0.005)), at:t, dur:q*3.9, g:0.05, a:1.2, r:1, to:pad }); }));
      K.kick(t,0.9,{ f:58, f2:42, dur:0.9, to:room }); if(i%2) K.kick(t+q*2.5,0.6,{ f:55, f2:40, dur:0.6, to:room });
      K.snare(t+q*2,0.4,{ bp:1400, to:room });
      for(let k=0;k<16;k++){ const at=t+k*s; K.hat(at,k%4===0?0.16:0.08,false,{ hp:9000, to:room }); if(i%4===3&&k>=12) for(let j=1;j<3;j++) K.hat(at+j*s/3,0.06,false,{ hp:9000, to:room }); }
      if(i%2===0) [c[1][2]+24,c[1][3]+24,c[1][1]+36].forEach((n,k)=>[[1,1],[3,0.2]].forEach(p=>K.osc({ type:'sine', f:midi(n)*p[0], at:t+k*q*0.75, dur:1.2, g:0.1*p[1], a:0.003, d:1.1, s:0.05, r:0.1, to:bell })));
      if(i%4===2){ let at=t+q; for(let k=0;k<4;k++){ const V=K.voice({ f:midi(K.pick([52,55,57])), vowel:K.pick(['a','o','u','m']), at:at, dur:K.rr(0.2,0.5), g:0.28, a:0.03, r:0.1, to:K.filt('lowpass',2500,0.5,room), q:7 }); at+=K.rr(0.3,0.6); } } });
  } },
{ id:"ligo", name:"two black holes", tick:"ligo", ago:11, hue:240, kind:"physics", scene:"two black holes",
  prog:K=>{
    const room=K.verb(3,0.35);
    const chirp=(shift)=>K.buf(1.2,(tt)=>{ const tc=0.98; if(tt>=tc){ const d=tt-tc; return Math.sin(TAU*(250+shift)*d)*Math.exp(-d/0.012)*0.9; }
      const f=35*Math.pow(1-tt/tc,-3/8); if(f>250) return 0; const ph=TAU*(35*tc*8/5*(1-Math.pow(1-tt/tc,5/8))+shift*tt); const amp=Math.pow(f/35,2/3)*0.12; return Math.sin(ph)*amp*Math.min(1,tt*20); });
    const c0=chirp(0), c1=chirp(400);
    K.osc({ type:'sine', f:60, g:0.03, a:2, to:room }); K.noise({ color:'pink', g:0.04, hp:800, a:2, to:room }); K.osc({ type:'sine', f:120, g:0.012, a:2, to:room });
    K.loop(22,(i,t)=>{ K.play(c0,{ at:t+2, g:2.4, to:room }); K.play(c0,{ at:t+5, g:2.4, to:room }); K.play(c1,{ at:t+9, g:0.9, to:room }); K.play(c1,{ at:t+12, g:0.9, to:room });
      K.noise({ color:'white', at:t+2, dur:1, g:0.06, bp:200, q:2, a:0.5, d:0.4, s:0, r:0.2, to:room }); });
  } },
{ id:"tadum", name:"ta-dum", tick:"ta-dum", ago:10.9, hue:0, kind:"evocation", scene:"ta-dum",
  prog:K=>{
    const room=K.verb(3.2,0.4);
    K.loop(9,(i,t)=>{ const at=t+1;
      K.tom(at,110,0.8,{ to:room }); K.noise({ color:'brown', at:at, dur:0.1, g:0.5, lp:600, a:0.001, d:0.08, s:0, r:0.02, to:room });
      const k2=K.osc({ type:'sine', f:80, at:at+0.42, dur:1.2, g:1.0, a:0.002, d:1.1, s:0, r:0.1, to:room }); k2.o.frequency.exponentialRampToValueAtTime(45,at+0.6);
      K.noise({ color:'white', at:at+0.42, dur:0.03, g:0.35, bp:2400, q:3, a:0.001, d:0.025, s:0, r:0.005, to:room }); [1,2.3,3.7].forEach((m,k)=>K.osc({ type:'sine', f:880*m, at:at+0.43, dur:0.5, g:0.12/(k+1), a:0.001, d:0.4, s:0, r:0.05, to:room }));
      const sw=K.filt('bandpass',400,4,room); sw.frequency.setValueAtTime(400,at+0.5); sw.frequency.exponentialRampToValueAtTime(2400,at+2.3);
      K.osc({ type:'sawtooth', f:110, at:at+0.5, dur:1.9, g:0.5, a:1.2, d:0.2, s:1, r:0.15, to:sw }); K.osc({ type:'sawtooth', f:165, at:at+0.5, dur:1.9, g:0.3, a:1.2, d:0.2, s:1, r:0.15, to:sw }); });
  } },
{ id:"blackstar", name:"★", tick:"★", ago:10.6, hue:0, kind:"evocation", scene:"★",
  prog:K=>{
    const room=K.verb(4,0.45);
    const reed=K.filt('bandpass',1000,1.3,room), reed2=K.filt('bandpass',2400,2.5,room);
    const mode=[60,62,63,65,67,69,70,72,74,75,77];
    const bpm=72, q=60/bpm;
    K.loop(q,(i,t)=>{ const acc=[0,2,3,1,2,0,3,1][Math.floor(i/4)%8]; if(i%4===0) K.kick(t,0.35,{ f:90, f2:40, dur:0.5, to:room });
      if(i%4===acc) K.noise({ color:'white', at:t, dur:0.3, g:0.18, bp:2000, q:0.7, a:0.05, d:0.25, s:0, r:0.05, to:room });
      const br=K.noise({ color:'pink', at:t, dur:q*0.9, g:0.07, hp:3000, a:q*0.3, d:q*0.5, s:0, r:0.05, to:room });
      K.osc({ type:'triangle', f:midi(36), at:t, dur:q*0.5, g:0.22, a:0.01, d:q*0.45, s:0.2, r:0.05, to:room });
      if(i%16===0) [60,63,67].forEach(n=>{ for(let v=0;v<3;v++){ const V=K.voice({ f:midi(n-12)*(1+K.rr(-0.006,0.006)), vowel:'o', at:t, dur:q*14, g:0.05, a:3, r:3, to:K.pan(K.rr(-0.8,0.8),room), q:6 }); } }); });
    let cur=4;
    K.loop(q*0.5,(i,t)=>{ if(i%32>24) return; if(K.r()<0.3) return; cur=clamp(cur+Math.floor(K.rr(-2,3)),0,mode.length-1); const f=midi(mode[cur]); const d=K.pick([q*0.5,q,q*1.5,q*3]);
      const o=K.osc({ type:'sawtooth', f:f, at:t, dur:d*0.95, g:0.3, a:0.04, r:0.08, to:reed }); K.osc({ type:'sawtooth', f:f, at:t, dur:d*0.95, g:0.1, a:0.04, r:0.08, to:reed2 }); if(d>q) K.lfo(o.o.frequency,4.8,f*0.009,'sine',t+0.3);
      K.noise({ color:'white', at:t, dur:d*0.6, g:0.06, bp:f*3, q:2, a:0.02, r:0.05, to:room }); });
  } },
{ id:"asmr", name:"the whisper industry", tick:"whisper", ago:10.3, hue:20, kind:"evocation", scene:"the whisper industry",
  prog:K=>{
    const room=K.verb(0.5,0.1);
    K.loop(40,(i,t)=>{
      const pan=K.pan(-0.8,room); pan.pan.setValueAtTime(-0.8,t); pan.pan.linearRampToValueAtTime(0.8,t+18);
      let at=t+0.5; for(let k=0;k<26;k++){ const V=K.voice({ breath:true, vowel:K.pick(['i','e','a','u','o']), at:at, dur:K.rr(0.15,0.5), g:0.7, a:0.05, r:0.08, to:K.filt('highpass',900,0.6,pan), q:5 }); at+=K.rr(0.25,0.7); if(k%6===5) at+=0.8; }
      for(let k=0;k<30;k++){ const a=t+2+K.r()*16; [1,2.6,4.1].forEach((m,j)=>K.osc({ type:'sine', f:2400*m*K.rr(0.9,1.1), at:a, dur:0.25/(j+1), g:0.12/(j+1), a:0.001, d:0.2/(j+1), s:0, r:0.02, to:K.pan(K.rr(-0.9,0.9),room) })); }
      for(let k=0;k<5;k++){ const a=t+3+K.r()*14; const b=K.noise({ color:'white', at:a, dur:1.2, g:0.16, hp:2500, a:0.5, d:0.6, s:0.5, r:0.3, to:K.pan(K.rr(-0.9,0.9),room) }); }
      for(let k=0;k<40;k++) K.noise({ color:'white', at:t+1+K.r()*17, dur:0.008, g:0.12, bp:K.rr(3000,6000), q:4, a:0.001, d:0.006, s:0, r:0.002, to:K.pan(K.rr(-0.9,0.9),room) });
      const p0=t+20; [[64,0],[67,0.2],[71,0.4],[76,0.6]].forEach(n=>K.pluck(midi(n[0]),p0+n[1],1.5,{ g:0.16, close:0.3, to:room })); K.hat(p0+0.8,0.1,false,{ to:room });
      const mic=K.filt('lowshelf',250,1,room); mic.gain.value=8; at=p0+2.5; for(let k=0;k<44;k++){ const V=K.voice({ f:K.rr(95,125), vowel:K.pick(['a','e','o','u','i','m']), at:at, dur:K.rr(0.1,0.3), g:0.5, a:0.02, r:0.05, to:mic, q:6 }); at+=K.rr(0.14,0.4); if(k%9===8) at+=0.5; } });
  } },
{ id:"quiet", name:"the quiet year", tick:"2020", ago:6.4, hue:180, kind:"evocation", scene:"the quiet year",
  prog:K=>{
    const room=K.verb(3.5,0.4);
    K.noise({ color:'pink', g:0.035, lp:300, a:4, to:room });
    const birds=[]; for(let b=0;b<4;b++) birds.push({ f:K.rr(2200,4600), pan:K.rr(-0.9,0.9), gap:K.rr(2.5,5) });
    birds.forEach(b=>{ const p=K.pan(b.pan,room); K.loop(b.gap,(i,t)=>{ let at=t+K.r(); for(let k=0;k<3+Math.floor(K.r()*5);k++){ const f0=b.f*K.rr(0.85,1.2), d=K.rr(0.05,0.12); const o=K.osc({ type:'sine', f:f0, at:at, dur:d, g:0.09, a:0.008, d:d, s:0.3, r:0.02, to:p }); o.o.frequency.exponentialRampToValueAtTime(f0*K.rr(0.7,1.5),at+d); at+=d+K.rr(0.03,0.12); } }); });
    K.loop(60,(i,t)=>{ const s=t+K.r()*20; const o=K.osc({ type:'sine', f:700, at:s, dur:6, g:0.02, a:1, r:1, to:K.filt('lowpass',1200,1,room) }); for(let k=0;k<6;k++){ o.o.frequency.exponentialRampToValueAtTime(k%2?1000:700,s+k+1); }
      const clapT=t+30; const crowd=K.gain(0.0001,room); crowd.gain.setValueAtTime(0.0001,clapT); crowd.gain.exponentialRampToValueAtTime(1,clapT+6); crowd.gain.setValueAtTime(1,clapT+18); crowd.gain.exponentialRampToValueAtTime(0.001,clapT+26);
      for(let k=0;k<170;k++){ const at=clapT+K.r()*26; K.clap(at,0.26*K.r(),{ to:K.pan(K.rr(-1,1),crowd) }); }
      for(let k=0;k<20;k++){ const at=clapT+4+K.r()*18; [1,1.9,2.8].forEach((m,j)=>K.osc({ type:'sine', f:1300*m, at:at, dur:0.3/(j+1), g:0.08/(j+1), a:0.001, d:0.25/(j+1), s:0, r:0.02, to:K.pan(0.6,crowd) })); }
      for(let v=0;v<6;v++){ K.voice({ f:K.rr(180,400), vowel:K.pick(['o','e','a']), at:clapT+6+K.r()*14, dur:K.rr(0.4,1.2), g:0.12, a:0.1, r:0.2, to:K.pan(K.rr(-1,1),crowd), q:6 }); } });
  } },
{ id:"drones", name:"the lawnmower in the sky", tick:"drones", ago:4.5, hue:70, kind:"evocation", scene:"the lawnmower in the sky",
  prog:K=>{
    const room=K.verb(2,0.25);
    const wind=K.noise({ color:'pink', g:0.09, lp:700, a:3, to:room }); K.lfo(wind.g.gain,0.1,0.05);
    K.loop(16,(i,t)=>{ const dur=7; const p=K.pan(-1,room); p.pan.setValueAtTime(K.r()<0.5?-1:1,t); p.pan.linearRampToValueAtTime(-p.pan.value,t+dur);
      const g=K.gain(0.0001,p); g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(0.4,t+dur*0.5); g.gain.exponentialRampToValueAtTime(0.001,t+dur);
      const lp=K.filt('lowpass',2500,1,g); const f0=K.rr(180,240);
      for(let k=0;k<4;k++){ const o=K.osc({ type:'sawtooth', f:f0*(1+k*0.013), at:t, dur:dur, g:0.14, a:0.5, r:0.5, to:lp }); o.o.frequency.setValueAtTime(f0*(1+k*0.013)*1.12,t); o.o.frequency.exponentialRampToValueAtTime(f0*(1+k*0.013)*0.88,t+dur); } });
    K.loop(50,(i,t)=>{ const at=t+10, dur=36; const g=K.gain(0.0001,room); g.gain.setValueAtTime(0.0001,at); g.gain.exponentialRampToValueAtTime(0.5,at+dur*0.8); g.gain.exponentialRampToValueAtTime(0.001,at+dur);
      const lp=K.filt('lowpass',600,1,g); lp.frequency.setValueAtTime(300,at); lp.frequency.exponentialRampToValueAtTime(1600,at+dur*0.8);
      const o=K.osc({ type:'sawtooth', f:92, at:at, dur:dur, g:0.3, a:1, r:2, to:lp }); K.lfo(o.g.gain,11,0.12,'sine',at); K.lfo(o.o.frequency,0.3,3,'sine',at);
      const o2=K.osc({ type:'square', f:46, at:at, dur:dur, g:0.12, a:1, r:2, to:lp }); K.lfo(o2.g.gain,11,0.06,'sine',at); });
    K.loop(23,(i,t)=>{ if(K.r()<0.6){ const at=t+K.r()*15; for(let k=0;k<2;k++){ const V=K.voice({ f:K.rr(300,420), vowel:'a', at:at+k*0.4, dur:0.18, g:0.12, a:0.01, r:0.05, to:K.filt('lowpass',1500,0.7,K.pan(0.7,room)), q:5 }); V.pitch(V.src.frequency.value*0.7,at+k*0.4+0.08,0.08); } } });
  } },
{ id:"datacenter", name:"the hum of thinking", tick:"datacenter", ago:3.5, hue:190, kind:"evocation", scene:"the hum of thinking",
  prog:K=>{
    const room=K.verb(1.6,0.2);
    for(let k=0;k<6;k++){ const n=K.noise({ color:'pink', g:0.07, bp:K.rr(300,1200), q:1.2, a:3, to:K.pan(K.rr(-0.8,0.8),room) }); K.lfo(n.head.frequency,K.rr(0.05,0.3),K.rr(20,80)); K.lfo(n.g.gain,K.rr(0.1,0.5),0.02); }
    [60,120,180,240].forEach((f,k)=>K.osc({ type:'sine', f:f, g:0.06/(k+1), a:3, to:room }));
    K.osc({ type:'sine', f:8000, g:0.006, a:3, to:room });
    K.loop(40,(i,t)=>{ const ch=K.noise({ color:'brown', at:t+5, dur:20, g:0.25, lp:200, a:1.5, r:1.5, to:room }); K.lfo(ch.g.gain,25,0.05,'sine',t+5);
      const job=K.noise({ color:'white', at:t+18, dur:14, g:0.12, bp:1500, q:2, a:0.01, r:2, to:room }); job.head.frequency.setValueAtTime(900,t+18); job.head.frequency.exponentialRampToValueAtTime(2600,t+21); job.head.frequency.setValueAtTime(2600,t+28); job.head.frequency.exponentialRampToValueAtTime(900,t+32);
      job.g.gain.setValueAtTime(0.0001,t+18); job.g.gain.exponentialRampToValueAtTime(0.16,t+21); job.g.gain.setValueAtTime(0.16,t+28); job.g.gain.exponentialRampToValueAtTime(0.001,t+32); });
  } },
{ id:"tiktok", name:"the sped-up song", tick:"tiktok", ago:2.5, hue:330, kind:"evocation", scene:"the sped-up song",
  prog:K=>{
    const room=K.verb(1.4,0.22), wash=K.verb(6,0.7);
    const hook=[[76,0.5],[79,0.5],[81,1],[79,0.5],[76,0.5],[74,1],[72,0.5],[74,0.5],[76,2]];
    const play=(at0,rate,pitch,to,drums)=>{ const unit=0.36/rate; seqPlay(hook,at0,unit,(n,at,d)=>{ const f=midi(n+pitch); const V=K.voice({ f:f/2, vowel:K.pick(['a','e','o','i']), at:at, dur:d*0.85, g:0.5, a:0.02, r:0.05, to:to, q:8 }); K.osc({ type:'sine', f:f, at:at, dur:d*0.8, g:0.06, a:0.01, r:0.05, to:to }); });
      if(drums){ const q=unit*2; for(let b=0;b<8;b++){ const a=at0+b*q; if(b%2===0) K.kick(a,0.6,{ f:70, f2:45, dur:0.5, to:to }); if(b%2) K.snare(a,0.3,{ bp:1600, to:to }); for(let s=0;s<4;s++) K.hat(a+s*q/4,s===0?0.14:0.07,false,{ hp:9000, to:to }); } } };
    K.loop(22,(i,t)=>{ play(t+0.5,1.25,4,room,true);
      const sw=K.noise({ color:'white', at:t+6.5, dur:0.3, g:0.3, bp:1000, q:2, a:0.02, r:0.05, to:room }); sw.head.frequency.setValueAtTime(600,t+6.5); sw.head.frequency.exponentialRampToValueAtTime(6000,t+6.8);
      play(t+7.2,0.8,-3,K.filt('lowpass',2500,0.5,wash),true);
      const ex=t+17; ['o','o'].forEach((v,k)=>{ const V=K.voice({ f:k?200:260, vowel:v, at:ex+k*0.2, dur:0.18, g:0.6, a:0.01, r:0.04, to:room, q:7 }); });
      const pop=K.osc({ type:'sine', f:900, at:t+19, dur:0.1, g:0.3, a:0.002, d:0.08, s:0, r:0.02, to:room }); pop.o.frequency.exponentialRampToValueAtTime(1800,t+19.06);
      const sw2=K.noise({ color:'white', at:t+20.5, dur:0.3, g:0.3, bp:1000, q:2, a:0.02, r:0.05, to:room }); sw2.head.frequency.setValueAtTime(600,t+20.5); sw2.head.frequency.exponentialRampToValueAtTime(6000,t+20.8); });
  } },
{ id:"aimusic", name:"the machine's own pop", tick:"ai music", ago:2.3, hue:280, kind:"evocation", scene:"the machine's own pop",
  prog:K=>{
    const dry=K.gain(1);
    const bpm=112, q=60/bpm, e=q/2;
    const prog=[[48,[60,64,67]],[55,[59,62,67]],[57,[57,60,64]],[53,[53,57,60]]];
    const hook=[72,74,76,72,79,76,74,72];
    K.loop(q*4,(i,t)=>{ const c=prog[i%4]; const glitch=i%16===13;
      for(let k=0;k<4;k++){ const at=t+k*q; K.kick(at,0.6,{ f:120, f2:48, to:dry }); if(k%2){ K.snare(at,0.4,{ bp:1700, to:dry }); K.clap(at,0.2,{ to:dry }); } K.hat(at+e,0.14,false,{ to:dry }); K.hat(at,0.07,false,{ to:dry });
        K.osc({ type:'sine', f:midi(c[0]-24), at:at, dur:q*0.8, g:0.45, a:0.003, d:q*0.7, s:0.3, r:0.03, to:dry }); }
      c[1].forEach(n=>[0,12].forEach(o=>K.osc({ type:'sawtooth', f:midi(n+o), at:t, dur:q*3.95, g:0.04, a:0.01, r:0.02, to:K.filt('lowpass',3000,0.5,dry) })));
      if(!glitch) hook.forEach((n,k)=>{ const at=t+k*e; for(let v=0;v<3;v++) K.voice({ f:midi(n-12), vowel:['a','e','o','i','a','e','o','a'][k], at:at, dur:e*0.9, g:0.22, a:0.005, r:0.01, to:K.pan((v-1)*0.5,dry), q:9 }); });
      else { for(let r=0;r<6;r++){ const at=t+r*e*0.5; for(let v=0;v<3;v++) K.voice({ f:midi(hook[2]-12), vowel:'o', at:at, dur:e*0.4, g:0.3, a:0.002, r:0.005, to:K.pan((v-1)*0.5,dry), q:9 }); } K.noise({ color:'white', at:t+q*2, dur:0.08, g:0.3, bp:4000, q:1, a:0.001, r:0.01, to:dry }); } });
  } },
{ id:"fakemink", name:"the uk underground", tick:"fakemink", ago:1.3, hue:300, kind:"evocation", scene:"the uk underground",
  prog:K=>{
    const room=K.verb(1.6,0.25);
    const fuzz=K.shape(12,K.filt('lowpass',3000,0.6,K.gain(0.12,room)));
    const bpm=100, q=60/bpm, s=q/4;
    const bells=[[76,79,83,86],[74,78,81,86],[72,76,79,84],[71,74,79,83]];
    K.loop(q*4,(i,t)=>{ const b=bells[i%4];
      for(let k=0;k<16;k++){ const at=t+k*s; if([0,3,6,10,11].includes(k)) K.kick(at,0.8,{ f:110, f2:46, dur:0.4, to:room }); if(k===4||k===12){ K.clap(at,0.4,{ to:room }); K.snare(at,0.3,{ bp:2200, to:room }); }
        if(k%2===0) K.hat(at,k%4===0?0.16:0.09,false,{ hp:9000, to:room }); if(k===7||k===15) K.hat(at+s/2,0.1,false,{ hp:9000, to:room }); }
      for(let k=0;k<8;k++){ const n=b[k%4]+(k>=4?12:0); const at=t+k*s*2; [[1,1],[2,0.4],[3,0.15]].forEach(p=>{ const o=K.osc({ type:'sine', f:midi(n)*p[0]*(1+K.rr(-0.008,0.008)), at:at, dur:0.6/p[0], g:0.12*p[1], a:0.003, d:0.5/p[0], s:0.05, r:0.05, to:room }); if(p[0]===1) K.lfo(o.o.frequency,6,midi(n)*0.01,'sine',at+0.1); }); }
      K.noise({ color:'white', at:t, dur:q*4, g:0.5, bp:2500, q:0.8, a:0.05, r:0.05, to:fuzz });
      if(i%2===0){ let at=t+q*0.5; for(let k=0;k<8;k++){ K.voice({ breath:true, vowel:K.pick(['i','e','a','u']), at:at, dur:K.rr(0.08,0.2), g:0.6, a:0.01, r:0.03, to:K.filt('highpass',700,0.5,room), q:5 }); at+=K.rr(0.12,0.3); } }
      if(i%4===3){ [0,0.3].forEach((o,k)=>K.voice({ f:K.rr(300,420), vowel:k?'e':'a', at:t+q*3+o, dur:0.15, g:0.35, a:0.005, r:0.03, to:K.pan(0.6,room), q:8 })); } });
  } },
{ id:"ysl", name:"the simulacrum returns", tick:"ysl", ago:0.03, hue:40, kind:"evocation", scene:"the simulacrum returns",
  prog:K=>{
    const room=K.verb(2.4,0.35);
    const bpm=92, q=60/bpm, e=q/2;
    const prog=[[48,[60,63,67]],[53,[53,57,60]],[55,[55,58,62]],[48,[60,63,67]]];
    K.loop(q*4,(i,t)=>{ const c=prog[i%4];
      for(let k=0;k<4;k++){ const at=t+k*q; K.kick(at,0.55,{ f:120, f2:48, to:room }); if(k%2){ K.snare(at,0.45,{ bp:1500, to:room }); K.noise({ color:'white', at:at, dur:0.1, g:0.25, bp:1800, q:0.7, a:0.001, d:0.02, s:1, r:0.005, to:room }); } K.hat(at+e,0.1,false,{ to:room });
        const b=K.osc({ type:'sine', f:midi(c[0]-12), at:at, dur:e*0.8, g:0.35, a:0.003, d:e*0.7, s:0.1, r:0.03, to:room }); b.o.frequency.setValueAtTime(midi(c[0]-12)*1.5,at); b.o.frequency.exponentialRampToValueAtTime(midi(c[0]-12),at+0.05); }
      c[1].forEach(n=>[12,24].forEach(o=>{ const x=K.osc({ type:'sawtooth', f:midi(n+o)*(1+K.rr(-0.004,0.004)), at:t, dur:q*3.9, g:0.035, a:0.6, r:0.6, to:K.filt('highpass',600,0.5,room) }); K.lfo(x.o.frequency,5,midi(n+o)*0.004,'sine',t); }));
      const stuck=i%8===7; let at=t+q*0.5+0.07; for(let k=0;k<4;k++){ const v=stuck?'e':K.pick(['a','e','o','i']); [0,-0.4,0.4].forEach(p=>K.voice({ f:midi(c[1][0])*(1+K.rr(-0.005,0.005)), vowel:v, at:at, dur:0.3, g:0.2, a:0.02, r:0.06, to:K.pan(p,room), q:8 })); at+=stuck?0.18:q*0.75; }
      if(i%4===3){ const sh=t+q*3.5; K.noise({ color:'white', at:sh, dur:0.03, g:0.45, bp:3000, q:1.5, a:0.001, d:0.025, s:0, r:0.005, to:room }); K.noise({ color:'pink', at:sh+0.04, dur:0.1, g:0.2, bp:1200, q:1, a:0.005, d:0.08, s:0, r:0.02, to:room }); K.noise({ color:'white', at:sh+0.15, dur:0.03, g:0.35, bp:2600, q:1.5, a:0.001, d:0.025, s:0, r:0.005, to:room }); } });
  } },
{ id:"now", name:"am i alone?", tick:"now", ago:0, hue:200, kind:"physics", scene:"am i alone?",
  prog:K=>{
    const room=K.verb(1.5,0.2);
    K.osc({ type:'sawtooth', f:173.6879, g:0.05, a:6, to:K.filt('bandpass',700,0.7,room) }); K.osc({ type:'sine', f:173.6879/2, g:0.04, a:6, to:room });
    K.noise({ color:'pink', g:0.05, hp:600, a:3, to:room });
    K.loop(1,(i,t)=>{ K.noise({ color:'white', at:t, dur:0.012, g:0.16, bp:3200, q:3, a:0.001, d:0.01, s:0, r:0.003, to:room }); K.osc({ type:'sine', f:2400, at:t, dur:0.02, g:0.04, a:0.001, d:0.015, s:0, r:0.005, to:room }); });
    K.loop(19,(i,t)=>{ const at=t+K.r()*8; const kind=i%4; const g=K.gain(0.0001,room); g.gain.setValueAtTime(0.0001,at); g.gain.exponentialRampToValueAtTime(1,at+1.2); g.gain.setValueAtTime(1,at+2.2); g.gain.exponentialRampToValueAtTime(0.001,at+3.4);
      if(kind===0){ [62,64,67,69,71].forEach((n,k)=>{ K.osc({ type:'sine', f:midi(n), at:at+k*0.5, dur:0.7, g:0.2, a:0.05, r:0.1, to:g }); K.noise({ color:'white', at:at+k*0.5, dur:0.7, g:0.05, bp:midi(n)*2, q:3, a:0.05, r:0.1, to:g }); }); }
      if(kind===1){ for(let k=0;k<3;k++) K.voice({ f:110*(1+k*0.01), vowel:'a', at:at, dur:3, g:0.25, a:0.3, r:0.3, to:K.pan((k-1)*0.5,g), q:7 }); }
      if(kind===2){ const q=60/96; for(let b=0;b<6;b++){ K.kick(at+b*q,0.6,{ f:55, f2:44, dur:0.5, to:g }); if(b%2) K.snare(at+b*q,0.3,{ to:g }); } }
      if(kind===3){ K.play(K.buf(1.0,(tt)=>{ const tc=0.9; if(tt>=tc) return 0; const f=35*Math.pow(1-tt/tc,-3/8); if(f>250) return 0; return Math.sin(TAU*(35*tc*8/5*(1-Math.pow(1-tt/tc,5/8))+400*tt))*Math.pow(f/35,2/3)*0.12; }),{ at:at+0.5, g:1.6, to:g }); } });
  } },
{ id:"sundeath", name:"the sun swells", tick:"+5 by", ago:-5000000000, hue:18, kind:"physics", scene:"the sun swells",
  prog:K=>{
    const room=K.verb(4,0.4);
    const F0=3.0e-3*65536, DF=136e-6*65536;                 // 196.6 Hz, 8.91 Hz — station four's comb
    const comb=[]; for(let k=-6;k<=6;k++){ const f=F0+k*DF; const o=K.osc({ type:'sine', f:f, g:0.0, a:0.01, to:room }); K.lfo(o.g.gain,0.05+K.r()*0.08,0.012); comb.push({ o:o, f:f }); }
    const gran=K.noise({ color:'brown', g:0.0, a:0.01, lp:120, to:room });
    const steamLP=K.filt('lowpass',700,0.5,room);
    const steam=K.noise({ color:'white', g:0.0, a:0.01, hp:2500, to:steamLP });
    const rain=K.noise({ color:'white', g:0.0, a:0.01, hp:1800, to:room });
    const ember=K.osc({ type:'sine', f:41, g:0.0, a:0.01, to:room });
    const CYC=84;
    K.loop(CYC,(i,t)=>{
      /* the comb: every tooth and the spacing fall together as the density falls */
      comb.forEach(c=>{ const p=c.o.o.frequency; p.cancelScheduledValues(t); p.setValueAtTime(c.f,t); p.exponentialRampToValueAtTime(Math.max(6,c.f/16),t+CYC*0.8);
        const g=c.o.g.gain; g.cancelScheduledValues(t); g.setValueAtTime(0.0001,t); g.exponentialRampToValueAtTime(0.028,t+6); g.setValueAtTime(0.028,t+CYC*0.5); g.exponentialRampToValueAtTime(0.012,t+CYC*0.8); g.exponentialRampToValueAtTime(0.0001,t+CYC*0.86); });
      /* granulation: a hiss that becomes a few vast surges */
      const gg=gran.g.gain; gg.cancelScheduledValues(t); gg.setValueAtTime(0.0001,t); gg.exponentialRampToValueAtTime(0.12,t+8);
      let at=t+8, gap=0.9; while(at<t+CYC*0.82){ gg.setTargetAtTime(0.06,at,gap*0.3); gg.setTargetAtTime(0.22,at+gap*0.5,gap*0.3); at+=gap; gap*=1.18; }
      gg.setTargetAtTime(0.0001,t+CYC*0.86,1.5);
      const gl=gran.head.frequency; gl.cancelScheduledValues(t); gl.setValueAtTime(120,t); gl.exponentialRampToValueAtTime(48,t+CYC*0.8);
      /* the rain in reverse: it thins, the thunder stops, and the steam rises through a filter that opens */
      const rg=rain.g.gain; rg.cancelScheduledValues(t); rg.setValueAtTime(0.0001,t); rg.exponentialRampToValueAtTime(0.10,t+2); rg.exponentialRampToValueAtTime(0.0005,t+CYC*0.35);
      for(let k=0;k<3;k++){ const th=t+3+k*7+K.r()*3; K.noise({ color:'brown', at:th, dur:2.5-k*0.5, g:0.35-k*0.1, lp:150, a:0.05, d:2, s:0.2, r:0.5, to:room }); }
      const sg=steam.g.gain; sg.cancelScheduledValues(t); sg.setValueAtTime(0.0001,t); sg.setValueAtTime(0.0001,t+4); sg.exponentialRampToValueAtTime(0.14,t+CYC*0.45); sg.setValueAtTime(0.14,t+CYC*0.7); sg.exponentialRampToValueAtTime(0.0005,t+CYC*0.86);
      steamLP.frequency.cancelScheduledValues(t); steamLP.frequency.setValueAtTime(700,t); steamLP.frequency.exponentialRampToValueAtTime(9000,t+CYC*0.7);
      /* the shell thrown, and the ember */
      K.noise({ color:'pink', at:t+CYC*0.84, dur:5, g:0.3, lp:2400, a:2.5, d:2, s:0.3, r:1.5, to:room });
      const eg=ember.g.gain; eg.cancelScheduledValues(t); eg.setValueAtTime(0.0001,t); eg.setValueAtTime(0.0001,t+CYC*0.86); eg.exponentialRampToValueAtTime(0.16,t+CYC*0.9); eg.exponentialRampToValueAtTime(0.0005,t+CYC*0.995);
    });
  } },
{ id:"laststar", name:"the last star goes out", tick:"+100 ty", ago:-100000000000000, hue:355, kind:"evocation", scene:"the last star goes out",
  prog:K=>{
    const room=K.verb(9,0.5);
    const breath=K.noise({ color:'brown', g:0.09, a:4, lp:70, to:room }); K.lfo(breath.g.gain,0.045,0.05);
    const CYC=76;
    K.loop(CYC,(i,t)=>{
      /* five stars, each dimmer and further from the last, put out from the top down */
      [1,12,25,40,57].forEach((s0,n)=>{ const at=t+s0, f0=K.rr(34,58), np=8-n, gain=0.22*(1-n*0.15);
        for(let h=1;h<=np;h++){ const dur=3+(np-h)*1.6+n*0.5;
          K.osc({ type:h<3?'sine':'triangle', f:f0*h, at:at, dur:dur, g:gain/(h*0.9), a:0.4, d:0, s:1, r:2.5, to:room, det:K.rr(-5,5) }); } });
      /* the shimmer, thinning to one sine, then none */
      for(let k=0;k<5;k++){ K.osc({ type:'sine', f:K.rr(2200,5200), at:t+K.rr(0,10)+k*6, dur:K.rr(2,4), g:0.008*(1-k*0.18), a:1.5, r:1.5, to:room }); }
      K.osc({ type:'sine', f:3100, at:t+52, dur:6, g:0.006, a:2, r:3, to:room });
    });
  } },
{ id:"evaporate", name:"the last black hole", tick:"10^100", ago:-1e+100, hue:285, kind:"physics", scene:"the last black hole",
  prog:K=>{
    const room=K.verb(3,0.3);
    /* the detector's floor, because there is nothing else */
    K.osc({ type:'sine', f:60, g:0.012, a:4, to:room }); K.noise({ color:'pink', g:0.02, a:4, hp:300, to:room });
    /* the chirp: M ∝ (te−t)^(1/3), T ∝ 1/M, so f ∝ (te−t)^(−1/3) and the power ∝ (te−t)^(−2/3) */
    const TE=34.5, F0=28, LEN=36, sr=ctx.sampleRate;
    let ph=0;
    const chirp=K.buf(LEN,(tt)=>{ if(tt>=TE) return 0; const r=TE-tt, k=Math.pow(TE/r,1/3), f=F0*k; if(f>9000) return 0; ph+=TAU*f/sr; return Math.sin(ph)*Math.min(0.5,0.06*k); });
    const CYC=100;
    K.loop(CYC,(i,t)=>{
      K.play(chirp,{ at:t, g:1, to:room });
      K.noise({ color:'white', at:t+TE, dur:0.4, g:0.7, a:0.002, d:0.35, s:0, r:0.1, to:room });
      K.noise({ color:'pink', at:t+TE+0.05, dur:2.5, g:0.25, lp:600, a:0.01, d:2.2, s:0, r:0.4, to:room });
      /* a second hole, further off */
      const far=K.filt('lowpass',900,0.5,room);
      K.play(chirp,{ at:t+TE+22, rate:0.92, g:0.33, to:far });
      K.noise({ color:'white', at:t+TE+22+TE/0.92, dur:0.3, g:0.18, lp:1500, a:0.002, d:0.25, s:0, r:0.1, to:far });
    });
  } },
{ id:"aeon", name:"the end of the aeon", tick:"the end", ago:-1e+150, hue:275, kind:"evocation", scene:"the end of the aeon",
  prog:K=>{
    const room=K.verb(5,0.4);
    const lp=K.filt('lowpass',6000,0.5,room);
    const hiss=K.noise({ color:'pink', g:0.0, a:0.01, to:lp });
    const sub=K.osc({ type:'sine', f:48, g:0.0, a:0.01, to:room });
    const bands=[[1,1],[2.45,0.5],[3.6,0.33]].map(b=>({ n:K.noise({ color:'pink', bp:150*b[0], q:5, g:0.0, a:0.01, to:room }), a:b[1] }));
    const CYC=90;
    K.loop(CYC,(i,t)=>{
      const h=hiss.g.gain; h.cancelScheduledValues(t); h.setValueAtTime(0.0001,t); h.exponentialRampToValueAtTime(0.22,t+3); h.exponentialRampToValueAtTime(0.003,t+CYC*0.78); h.exponentialRampToValueAtTime(0.0001,t+CYC*0.9);
      lp.frequency.cancelScheduledValues(t); lp.frequency.setValueAtTime(6000,t); lp.frequency.exponentialRampToValueAtTime(40,t+CYC*0.8);
      const s=sub.g.gain; s.cancelScheduledValues(t); s.setValueAtTime(0.0001,t); s.exponentialRampToValueAtTime(0.14,t+6); s.exponentialRampToValueAtTime(0.0005,t+CYC*0.85);
      sub.o.frequency.cancelScheduledValues(t); sub.o.frequency.setValueAtTime(48,t); sub.o.frequency.exponentialRampToValueAtTime(16,t+CYC*0.85);
      /* the last electron meets the last positron */
      [20,41,58,69].forEach(k=>{ K.noise({ color:'white', at:t+k+K.r()*2, dur:0.02, g:0.12, bp:2600, q:4, a:0.001, d:0.015, s:0, r:0.005, to:room }); });
      /* the seam: the next aeon's plasma begins to ring */
      bands.forEach(b=>{ const g=b.n.g.gain; g.cancelScheduledValues(t); g.setValueAtTime(0.0001,t); g.setValueAtTime(0.0001,t+CYC*0.88); g.exponentialRampToValueAtTime(0.75*b.a,t+CYC); });
    });
  } },
];
/* ---- the river's doors ---- */
const LIVE=[];
function use(c){ ctx=c; LIB.ctx=c; return true; }
function station(id){ if(id==null) return null; if(typeof id==='number') return STATIONS[((id%STATIONS.length)+STATIONS.length)%STATIONS.length]||null; return STATIONS.find(s=>s.id===id)||null; }
/* play: a station built into `out` (a node of the lent context), its own kit seeded by its id (and a salt), its loops
   walked by tick(). the handle: { st, K, g } — g is the station's own gain (0 at birth; the river raises it). */
function play(id,out,salt){
  if(!ctx||!out) return null; const st=station(id); if(!st) return null;
  const g=ctx.createGain(); g.gain.value=0; g.connect(out);
  const K=makeKit(g,(hashStr(st.id)^((salt|0)*2654435761))>>>0); K.station=st;
  try{ st.prog(K); }catch(e){ try{ K.kill(); }catch(_){} try{ g.disconnect(); }catch(_){} return null; }
  LIVE.push(K);
  return { st:st, K:K, g:g, born:ctx.currentTime };
}
function stop(h,fade){
  if(!h||!ctx) return; fade=fade==null?0.5:fade; const t=ctx.currentTime, g=h.g, K=h.K;
  try{ g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(g.gain.value,t); g.gain.linearRampToValueAtTime(0,t+fade); }catch(_){}
  setTimeout(function(){ try{ K.kill(); }catch(_){} try{ g.disconnect(); }catch(_){} const i=LIVE.indexOf(K); if(i>=0) LIVE.splice(i,1); },fade*1000+80);
}
/* the clock: the book's own — every live loop walked 0.42 s ahead of the context's clock */
function tick(){
  if(!ctx) return; const horizon=ctx.currentTime+0.42;
  for(const K of LIVE){ if(!K.alive) continue;
    for(const L of K.loops){ let guard=0;
      while(L.next<horizon&&guard++<64){ try{ L.fn(L.i,L.next,L); }catch(e){ L.next+=1; } L.i++; L.next+=L.period; } } }
}
LIB.stations=STATIONS; LIB.use=use; LIB.play=play; LIB.stop=stop; LIB.tick=tick; LIB.station=station; LIB.kit=makeKit; LIB.midi=midi; LIB.hz=hz; LIB.live=function(){ return LIVE.length; };
window.LIBRARY=LIB;
})();
