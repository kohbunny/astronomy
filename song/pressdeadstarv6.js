/* press-deadstar-v6.js — the rig's walk of the v6 exercise.
   headless chromium + swiftshader (the WebGL2 backend) + a fake camera and
   a fake microphone, an iphone-shaped 393×852 window. it serves this folder
   itself (three.js must sit in ./node_modules/three beside deadstar.html —
   the cdn chain falls through to it), walks in through `?ex&bench=1`,
   watches every exercise step, and TAPS the two bubbles in turn:

     tune → meeting → the choice → [lie down] → floor → meeting → the
     choice again → [seashell] → shell → meeting → the after.

   proof frames land in ./frames-v6/. exit code 0 only when the whole chain
   was seen and the page threw nothing.

     node press-deadstar-v6.js            (the whole chain)
     node press-deadstar-v6.js floor      (?ex=floor — straight into a program)
     node press-deadstar-v6.js shell
*/
const {chromium}=require('playwright');
const http=require('http'), fs=require('fs'), path=require('path');
const ROOT=__dirname, PORT=8765, OUT=path.join(ROOT,'frames-v6');
const ONLY=process.argv[2]||'';
fs.mkdirSync(OUT,{recursive:true});
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript','.mjs':'text/javascript',
  '.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.mp3':'audio/mpeg','.webm':'video/webm'};
const server=http.createServer((req,res)=>{
  const u=decodeURIComponent(req.url.split('?')[0]);
  let f=path.join(ROOT,u==='/'?'deadstar.html':u);
  if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){res.writeHead(404);res.end();return;}
  res.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'application/octet-stream','Access-Control-Allow-Origin':'*'});
  fs.createReadStream(f).pipe(res);
});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  await new Promise(r=>server.listen(PORT,r));
  const browser=await chromium.launch({headless:true,args:[
    '--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist',
    '--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream',
    '--autoplay-policy=no-user-gesture-required','--disable-dev-shm-usage']});
  const ctx=await browser.newContext({viewport:{width:393,height:852},deviceScaleFactor:1,
    isMobile:true,hasTouch:true,permissions:['camera','microphone'],
    userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'});
  const page=await ctx.newPage();
  const errs=[], logs=[];
  page.on('pageerror',e=>{errs.push(String(e&&e.message||e));console.log('PAGE ERROR',e&&e.message);});
  const seen={};
  page.on('console',m=>{ const t=m.text(); if(t.startsWith('[deadstar]')){logs.push(t);console.log('  '+t);
      let mm=t.match(/two is now one · (\w+)/); if(mm)seen[mm[1]+'/met']=1;
      mm=t.match(/the hum stands open · (\w+)/); if(mm)seen[mm[1]+'/hum']=1;
      mm=t.match(/— the after · (\w+)/); if(mm)seen[mm[1]+'/after']=1; } else if(m.type()==='error'){console.log('  console.error:',t.slice(0,200));} });
  const q='?ex'+(ONLY?'='+ONLY:'')+'&bench=1&dslog';
  console.log('open',q);
  await page.goto('http://localhost:'+PORT+'/deadstar.html'+q,{waitUntil:'load'});
  let n=0;
  const shot=async(label)=>{ n++; const f=path.join(OUT,String(n).padStart(2,'0')+'-'+label+'.png');
    await page.screenshot({path:f,timeout:150000}); console.log('  frame',path.basename(f)); };
  const st=()=>page.evaluate(()=>{ try{ return window.__DEADSTAR.state(); }catch(e){ return null; } });
  /* the module under swiftshader takes a minute or more — wait for the bone */
  const t0=Date.now(); let s=null;
  while(Date.now()-t0<240000){ s=await st(); if(s&&s.ready&&s.ex&&s.ex.on)break; await sleep(1000); }
  console.log('bone ready + exercise on after',((Date.now()-t0)/1000).toFixed(0),'s', s&&JSON.stringify(s.ex));
  if(!s||!s.ready){ console.log('FAIL: the bone never stood'); await browser.close(); server.close(); process.exit(2); }
  await sleep(2500); await shot('exercise-opens');
  /* the watcher: a frame at every new pose / phase, and the taps */
  const want=ONLY?[ONLY]:['tune','floor','shell'];
  let lastKey='', tapped={}, chain=[], deadline=Date.now()+420000, framesByPose={};
  while(Date.now()<deadline){
    s=await st(); if(!s){await sleep(500);continue;}
    const ex=s.ex, key=ex.prog+'/'+ex.phase+'/'+ex.pose+'/'+ex.step;
    if(key!==lastKey){
      lastKey=key; chain.push(key); console.log('  state',key,'cents',ex.cents,'prox',ex.prox);
      /* let the pose ease before the proof frame, then shoot once per pose */
      const fk=ex.prog+'-'+ex.phase+'-'+ex.pose;
      if(!framesByPose[fk]){ framesByPose[fk]=1; await sleep(ex.phase==='instr'?2600:1800); await shot(fk); }
      seen[ex.prog+'/'+ex.phase]=1;
    }
    if(ex.phase==='choose'&&!tapped[ex.done]){
      tapped[ex.done]=1;
      await sleep(1800); await shot('the-choice-'+ex.done);
      const which=(ex.done===0)?'#ask':'#ask2';
      if(ONLY){ console.log('single program walk — done at the choice'); break; }
      if(ex.done>=2){ console.log('both deeper programs walked'); break; }
      console.log('  tap',which);
      try{ await page.tap(which,{force:true}); }catch(e){ console.log('  tap failed',e.message.split('\n')[0]); }
      await sleep(900);
      const s2=await st();
      if(s2.ex.phase==='choose'){ console.log('  the tap did not take — the console hand'); await page.evaluate(w=>{window.__DEADSTAR._p.exProg(w);},which==='#ask'?'floor':'shell'); }
    }
    if(ONLY&&ex.phase==='after'){ await sleep(2500); await shot(ex.prog+'-after'); break; }
    await sleep(400);
  }
  await sleep(1500); await shot('end');
  const s3=await st();
  console.log('\nchain:',chain.join(' → '));
  console.log('final',JSON.stringify(s3&&s3.ex));
  const need=ONLY?[ONLY+'/hum',ONLY+'/met',ONLY+'/after']:['tune/hum','tune/met','tune/after','tune/choose','floor/instr','floor/hum','floor/met','floor/choose','shell/instr','shell/hum','shell/met'];
  const missing=need.filter(k=>!seen[k]);
  console.log('page errors:',errs.length, errs.slice(0,3));
  console.log(missing.length?('MISSING: '+missing.join(', ')):'the whole chain was seen');
  await browser.close(); server.close();
  process.exit((errs.length||missing.length)?1:0);
})().catch(e=>{ console.error(e); process.exit(3); });
