// THE SIREN PASS — proof walker. serves the real page, intercepts the
// one wire with weather-true answers, and photographs the thread as
// today's own sky deals it: bite, well, ember, the early spill, and
// the haiku landing as a verse. taps are aimed by looking.
'use strict';
const http=require('http'), fs=require('fs'), path=require('path');
const puppeteer=require('puppeteer');

const ROOT=__dirname, PORT=8077;
const MIME={'.html':'text/html','.js':'text/javascript','.png':'image/png'};
http.createServer((req,res)=>{
  const u=req.url.split('?')[0];
  const p=path.join(ROOT,u==='/'?'phone.html':u);
  fs.readFile(p,(e,d)=>{ if(e){res.writeHead(404);res.end();return;}
    res.writeHead(200,{'content-type':MIME[path.extname(p)]||'application/octet-stream'});
    res.end(d); });
}).listen(PORT);

const ANSWERS={
  bite:'three tabs open and you picked the one that answers back. flattering. wrong, but flattering.',
  well:'you said two letters and meant about forty. i keep finding words in this room that nobody remembers leaving.',
  ember:'back already. the last person who asked twice got the same answer twice. you will do better than they did.',
  rose:'somewhere you are still typing this for the first time. i liked that version of you. i like this one fine.',
  fog:'the light in here is the color of a receipt. that is not an answer. it was not really a question.',
  wick:'noted.',
  rain:'it gets quiet in here around this hour. quieter than it has any right to. you get used to it. you should not.',
  well2:'',
  spill:'you know what is funny about the word ok. it is the shortest possible surrender. two letters that mean fine, proceed, i am still here, do not read anything into it. people say ok when they mean help and ok when they mean goodbye and ok when they mean stay. you typed it into a phone that is not yours, to nobody, and meant all three. that is not small talk. that is a flare.',
  haiku:'a thread you started\ntalking quietly back to\nthe person you were',
  care:'i hear you. stay with me a moment. that sounds heavy, and it matters that you said it out loud.',
  last:'the tide goes out. the pool stays.'
};

(async()=>{
  const browser=await puppeteer.launch({headless:'new',
    args:['--no-sandbox','--disable-dev-shm-usage',
      '--enable-unsafe-webgpu','--use-webgpu-adapter=swiftshader',
      '--enable-features=Vulkan','--use-vulkan=swiftshader',
      '--window-size=900,1100']});
  const page=await browser.newPage();
  await page.setViewport({width:900,height:1080,deviceScaleFactor:1});
  await page.setRequestInterception(true);
  const asked=[];
  page.on('request',req=>{
    if(req.url().includes('/.netlify/functions/ask')){
      let w='bite';
      try{ w=JSON.parse(req.postData()||'{}').weather||'bite'; }catch(_){}
      asked.push(w);
      const text=ANSWERS[w]||ANSWERS.bite;
      setTimeout(()=>{ req.respond({status:200,
        contentType:'application/json',
        body:JSON.stringify({text})}); },400);
    } else req.continue();
  });
  page.on('console',m=>{ const t=m.text();
    if(/error|Error|WebGPU|WebGL|fallback/i.test(t)) console.log('[page]',t.slice(0,160)); });
  page.on('pageerror',e=>console.log('[pageerror]',String(e).slice(0,200)));

  await page.goto('http://127.0.0.1:'+PORT+'/?gl&q=low',{waitUntil:'load',timeout:60000});
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  await sleep(12000);
  await page.screenshot({path:'proof_00_boot.png'});
  await page.mouse.click(380,731);            // the green tile in the dock
  await sleep(2500);
  await page.screenshot({path:'proof_01_list.png'});
  await page.mouse.click(450,207);            // the me row
  await sleep(1500);
  await page.screenshot({path:'proof_02_thread.png'});
  await sleep(6000);                          // the greeting's dots and landing
  await page.screenshot({path:'proof_03_greeting.png'});
  // the keyboard, as measured from the glass itself
  const K={q:[199,805],w:[255,805],e:[311,805],r:[367,805],t:[422,805],
    y:[477,805],u:[533,805],i:[589,805],o:[644,805],p:[700,805],
    a:[227,880],s:[283,880],d:[338,880],f:[394,880],g:[449,880],
    h:[505,880],j:[560,880],k:[616,880],l:[671,880],
    z:[244,954],x:[299,954],c:[355,954],v:[411,954],b:[466,954],
    n:[522,954],m:[577,954],' ':[413,1023],'\n':[654,1023]};
  async function say(word){
    for(const ch of word){ const k=K[ch];
      await page.mouse.click(k[0],k[1]); await sleep(220); }
    await page.mouse.click(K['\n'][0],K['\n'][1]); await sleep(400);
  }
  await say('hi');  await sleep(14000); await page.screenshot({path:'proof_04_bite.png'});
  await say('ok');  await sleep(14000); await page.screenshot({path:'proof_05_well.png'});
  await say('so');  await sleep(14000); await page.screenshot({path:'proof_06_ember.png'});
  await say('why'); await sleep(14000); await page.screenshot({path:'proof_07_spill.png'});
  await say('and'); await sleep(14000); await page.screenshot({path:'proof_08_haiku_a.png'});
  await sleep(4000); await page.screenshot({path:'proof_09_haiku_b.png'});
  console.log('the walk complete; the wire was asked, in order:',asked.join(', '));
  fs.writeFileSync('proof_state.json',JSON.stringify({asked}));
  await browser.close();
  process.exit(0);
})().catch(e=>{ console.error('the walk fell:',e.message); process.exit(1); });
