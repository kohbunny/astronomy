/* rite22.js — the rite for deeming 22 (the taint, the blob door, the
   knobs). a stub phone: no dom, no wire, no clock but ours. run:
     node rite22.js nestflix.js
   every check prints PASS or FAIL; the exit code is the count of
   failures. the manner of the last desk's rite, rebuilt on this one. */
'use strict';
const fs=require('fs'), path=require('path');
const FILE=process.argv[2]||'nestflix.js';
let fails=0, checks=0;
function ok(name,cond,extra){ checks++;
  if(cond){ console.log('PASS  '+name); }
  else{ fails++; console.log('FAIL  '+name+(extra?('  — '+extra):'')); } }

/* the house clock, ours */
let T=1000; const now=()=>T;

/* timers, collected and flushed by hand; the 45s dead clocks are held,
   never fired, so no door is murdered mid-rite */
let TQ=[], tid=1;
global.setTimeout=(fn,ms)=>{ const id=tid++; TQ.push({id,fn,ms:ms||0}); return id; };
global.clearTimeout=(id)=>{ TQ=TQ.filter(q=>q.id!==id); };
async function pump(rounds){
  for(let r=0;r<(rounds||60);r++){
    await new Promise(res=>setImmediate(res));
    const run=TQ.filter(q=>q.ms<=1000); TQ=TQ.filter(q=>q.ms>1000);
    run.forEach(q=>{ try{ q.fn(); }catch(e){ console.log('timer threw: '+e); fails++; } });
    T+=0.06;
  }
}

/* the recorder every mock reports to */
const REC={ fetches:[], objMade:0, objGone:0, srcSet:[], gid:{}, veil:0 };
const CVS=[];

/* a 2d context, by proxy: sets stick, unknown calls are air */
let GIDMODE='dark';   /* 'dark' | 'bright' | 'throw' */
function mk2d(cv){
  const store={ canvas:cv };
  return new Proxy(store,{
    get(t,p){
      if(p in t) return t[p];
      if(p==='measureText') return ()=>({width:10});
      if(p==='createLinearGradient'||p==='createRadialGradient'||p==='createConicGradient')
        return ()=>({addColorStop(){}});
      if(p==='createPattern') return ()=>({});
      if(p==='getImageData') return (x,y,w,h)=>{
        const k=w+'x'+h; REC.gid[k]=(REC.gid[k]||0)+1;
        if(GIDMODE==='throw'){ const e=new Error('rite: the canvas refuses'); e.name='SecurityError'; throw e; }
        const n=Math.max(1,w*h*4), a=new Uint8ClampedArray(n);
        const v=GIDMODE==='dark'?18:210;
        for(let i=0;i<n;i+=4){ a[i]=v; a[i+1]=v; a[i+2]=v; a[i+3]=255; }
        return { data:a, width:w, height:h }; };
      if(p==='drawImage') return (...a)=>{ cv._drawn.push(a[0]); };
      const f=()=>{}; t[p]=f; return f;
    },
    set(t,p,v){ t[p]=v; return true; }
  });
}
function mkcv(w,h){
  const cv={ width:w, height:h, _drawn:[] };
  const q=mk2d(cv); cv.getContext=()=>q; CVS.push(cv); return cv;
}

/* the eye's stream, and the door's element */
function fakeStream(){ return { getTracks:()=>[{stop(){}}] }; }
class FakeVid{
  constructor(){ this.ls={}; this.videoWidth=64; this.videoHeight=48;
    this.duration=10; this._t=0; this._src=''; FakeVid.all.push(this); }
  canPlayType(){ return 'maybe'; }
  setAttribute(){} removeAttribute(){ this._src=''; }
  addEventListener(n,f){ (this.ls[n]=this.ls[n]||[]).push(f); }
  fire(n){ (this.ls[n]||[]).slice().forEach(f=>{ try{ f(); }catch(e){ console.log('vid handler threw: '+e); fails++; } }); }
  load(){ if(this._src&&String(this._src).indexOf('blob:')===0)
      queueMicrotask(()=>this.fire('loadeddata')); }
  play(){ return Promise.resolve(); }
  set src(u){ this._src=u; REC.srcSet.push(u); }
  get src(){ return this._src; }
  set srcObject(s){ this._so=s; } get srcObject(){ return this._so; }
  set currentTime(x){ this._t=x; queueMicrotask(()=>this.fire('seeked')); }
  get currentTime(){ return this._t; }
}
FakeVid.all=[];

/* one true tiny gif, 1x1, for the hand decoder */
const GIF1=Uint8Array.from([0x47,0x49,0x46,0x38,0x39,0x61,1,0,1,0,0x80,0,0,
  0,0,0,255,255,255,0x21,0xF9,4,1,0,0,0,0,0x2C,0,0,0,0,1,0,1,0,0,2,2,0x44,1,0,0x3B]);

/* the wire, answered from this desk */
global.fetch=(url,opts)=>{
  REC.fetches.push({url:String(url), mode:opts&&opts.mode});
  const u=String(url);
  if(u.indexOf('commons.wikimedia.org/w/api.php')>=0){
    const m=/titles=([^&]*)/.exec(u), titles=decodeURIComponent(m?m[1]:'').split('|');
    const pages={};
    titles.forEach((t2,i)=>{ pages['p'+u.length+'_'+i]={ title:t2.replace(/^File:/,'').replace(/_/g,' '),
      videoinfo:[{ url:'https://upload.rite/orig'+i+'.webm',
        thumburl:'https://upload.rite/t'+i+'.gif',
        derivatives:[{src:'https://upload.rite/d'+i+'.webm',type:'video/webm',height:240},
                     {src:'https://upload.rite/big'+i+'.webm',type:'video/webm',height:1080}] }]}; });
    return Promise.resolve({ ok:true, json:()=>Promise.resolve({query:{pages}}) });
  }
  if(u.indexOf('big')>=0)
    return Promise.resolve({ ok:true,
      headers:{get:k=>k==='content-length'?String(60e6):null},
      blob:()=>Promise.resolve({size:60e6,_rite:1}) });
  return Promise.resolve({ ok:true,
    headers:{get:k=>k==='content-length'?'1000':null},
    blob:()=>Promise.resolve({size:1000,_rite:1}),
    arrayBuffer:()=>Promise.resolve(GIF1.buffer.slice(0)) });
};

/* objectURL, recorded; Image loads blobs and refuses the street */
const RealURL=global.URL;
global.URL=function(u,b){ return new RealURL(u,b); };
global.URL.createObjectURL=()=>{ REC.objMade++; return 'blob:rite'+REC.objMade; };
global.URL.revokeObjectURL=()=>{ REC.objGone++; };
global.Image=class{ set src(u){ this._u=u; this.naturalWidth=4; this.naturalHeight=4;
  const good=String(u).indexOf('blob:')===0;
  queueMicrotask(()=>{ const f=good?this.onload:this.onerror; f&&f(); }); } };

/* the seam */
function mkctx(withSilver){
  const cvq={ width:390, height:844, _drawn:[] };
  const sq=mk2d(cvq);
  let app='nestflix';
  return {
    sq, UIW:390, UIH:844,
    ink:a=>'rgba(230,230,230,'+a+')', red:a=>'rgba(229,9,20,'+a+')', grn:a=>'rgba(0,200,0,'+a+')',
    txt(){}, wrap(){ return 1; }, hair(){},
    roundRectPath(){}, mkcv,
    H(){}, setApp:a=>{app=a;}, getApp:()=>app,
    eggAvatar(){},
    F:{sans:'s',serif:'f',mono:'m'}, P:32, SEED:20260828, LOW:false,
    mulberry32:a=>()=>{ a|=0; a=a+0x6D2B79F5|0; let t2=Math.imul(a^a>>>15,1|a);
      t2=t2+Math.imul(t2^t2>>>7,61|t2)^t2; return ((t2^t2>>>14)>>>0)/4294967296; },
    scrollPos:()=>0, scrollMax(){},
    now, repaint(){}, taDum(){},
    askCam:()=>Promise.resolve(fakeStream()), stopStream(){},
    silver: withSilver?{ E:()=>0.6, step:()=>1, keep:f=>f(), veil:()=>{REC.veil++;} }:undefined
  };
}
function fresh(loc){
  T=1000;
  global.window={ APWNP:undefined, addEventListener(){}, removeEventListener(){}, innerWidth:390, innerHeight:844 };
  if(loc) global.window.location={ search:loc };
  global.document={ createElement:t2=>t2==='video'?new FakeVid():mkcv(2,2), addEventListener(){} };
  FakeVid.all.length=0; CVS.length=0;
  REC.fetches.length=0; REC.objMade=0; REC.objGone=0; REC.srcSet.length=0; REC.veil=0;
  for(const k in REC.gid) delete REC.gid[k];
}
async function walk(mod,ctx,frames){
  const room=mod.build(ctx);
  room.watch('home','nestflix'); room.draw('nestflix'); await pump(6);
  room.watch('nestflix','nfxwall');
  for(let i=0;i<(frames||10);i++){ room.draw('nfxwall'); await pump(4); }
  room.draw('nfxtitle'); room.draw('nfxplay'); await pump(2);
  return room;
}
const measureReads=()=>Object.keys(REC.gid)
  .filter(k=>k==='1x1'||k==='2x2'||k==='4x4'||k==='64x48')
  .reduce((s,k)=>s+REC.gid[k],0);

(async()=>{
  const src=fs.readFileSync(path.resolve(FILE),'utf8');
  const boot=()=>{ new Function('window','document','fetch','URL','Image','setTimeout','clearTimeout',src)
    (global.window,global.document,global.fetch,global.URL,global.Image,global.setTimeout,global.clearTimeout);
    return global.window.APWNP.modules.nestflix; };

  /* build 1 — yesterday's phone: no silver, no location. the library
     loads through the blob door; the measure lands, dark. */
  fresh(null); GIDMODE='dark';
  const mod=boot();
  ok('the module registers at the seam', !!mod&&typeof mod.build==='function');
  let room=await walk(mod,mkctx(false),10); await pump(300);
  ok('no film is ever asked of the wire by street address',
    REC.srcSet.length>0&&REC.srcSet.every(u=>String(u).indexOf('blob:')===0),
    'non-blob src: '+REC.srcSet.filter(u=>String(u).indexOf('blob:')!==0).slice(0,3).join(', '));
  const vidFetches=REC.fetches.filter(f=>/\/d\d+\.webm/.test(f.url));
  ok('the blob door fetches the film with cors',
    vidFetches.length>0&&vidFetches.every(f=>f.mode==='cors'),
    JSON.stringify(vidFetches.slice(0,2)));
  ok('every blob made is revoked (no leak)', REC.objMade>0&&REC.objMade===REC.objGone,
    REC.objMade+' made, '+REC.objGone+' gone');
  const doorVids=FakeVid.all.filter(v=>v.ls&&v.ls.seeked);
  const oneVid=doorVids.find(v=>CVS.some(c=>c._drawn.indexOf(v)>=0));
  const frameN=oneVid?CVS.filter(c=>c._drawn.indexOf(oneVid)>=0).length:0;
  ok('the twelve-instant walk lands twelve frames', frameN===12, String(frameN));
  ok('the measure ran at the door', measureReads()>0, String(measureReads()));
  ok('the small derivative satisfies; the big is never fetched',
    !REC.fetches.some(f=>f.url.indexOf('big')>=0), '');
  room.dispose&&room.dispose();

  /* build 2 — the poisoned glass: every read throws. the room must
     load, draw, and say nothing. */
  fresh(null); GIDMODE='throw';
  const mod2=boot();
  let threw=0, room2=null;
  try{ room2=await walk(mod2,mkctx(true),10); await pump(300); }catch(e){ threw=1; console.log('  escaped: '+e); }
  ok('a glass that refuses every read still stands (the catches hold)',
    !threw&&measureReads()>0, 'measure attempts: '+measureReads());
  ok('the veil is worn on the silvered wall', REC.veil>0, String(REC.veil));
  room2&&room2.dispose&&room2.dispose();

  /* build 3 — grace comparison: the knob down vs the knob absent,
     same clock, same rounds; the grace's read is a 96x144 like the
     posteriser's, so the honest check is FEWER, knot none. */
  fresh(null); GIDMODE='dark';
  const modB=boot();
  let roomB=await walk(modB,mkctx(true),14); await pump(40);
  const readsGraceOn=REC.gid['96x144']||0;
  roomB.dispose&&roomB.dispose();
  fresh('?grace=0'); GIDMODE='dark';
  const modA=boot();
  let roomA=await walk(modA,mkctx(true),14); await pump(40);
  const readsGraceOff=REC.gid['96x144']||0;
  roomA.dispose&&roomA.dispose();
  ok('?grace=0 stands the grace down (fewer small reads, same walk)',
    readsGraceOff<readsGraceOn, readsGraceOff+' with knob vs '+readsGraceOn+' without');

  /* build 4 — the other knobs: cinema dark, wall bare. */
  fresh('?cine=0&veil=0'); GIDMODE='dark';
  const mod4=boot();
  let room4=await walk(mod4,mkctx(true),10); await pump(60);
  ok('?cine=0 keeps the cinema dark (no wire at all)', REC.fetches.length===0, String(REC.fetches.length));
  ok('?veil=0 runs the wall bare (the phone\'s veil never asked)', REC.veil===0, String(REC.veil));
  room4&&room4.dispose&&room4.dispose();

  /* build 5 — knobs absent, silver absent: 26 aug's wall exactly,
     nothing anywhere that says so. */
  fresh(null); GIDMODE='dark';
  const mod5=boot();
  let room5=await walk(mod5,mkctx(false),8); await pump(40);
  ok('absent knobs, absent silver: the room runs and asks no veil', REC.veil===0, String(REC.veil));
  ok('the wire is asked when the cinema is lit', REC.fetches.length>0, String(REC.fetches.length));
  room5&&room5.dispose&&room5.dispose();

  console.log((fails?'\nTHE RITE REFUSES: ':'\nTHE RITE PASSES: ')+(checks-fails)+'/'+checks);
  process.exit(fails);
})().catch(e=>{ console.log('THE RITE ITSELF FELL: '+(e&&e.stack||e)); process.exit(99); });
