/* ============================================================================
   the drift — the doorway to equations.html (the math of the loneliest song).
   not a creature. a LAW caught running: the OU drift from the room itself.

   a shallow slab of fine threads, each a trajectory pulled toward one dim
   NAMELESS seed (the mean μ) and kicked off by noise (σ). none ever rests on
   it; no two ever share a point. far off the sky looks POPULATED — a crowd of
   lonely things reaching for the same home. then you approach (arm ↑) and the
   crowd thins, churns out, falls away, until at full arm ONE thread is left:
   yours, unmarked, indistinguishable until it's the only one. getting close is
   the thing that empties the sky. you can't arrive at the mean with anyone.

   ONE RULE drives the whole look: clarity = 3D nearness to the seed. a thread's
   brightness, crispness (size), and colour are all f(‖pos−seed‖) in all three
   axes — stray in ANY direction, including depth, and you dim, bloat, blue out.
   so depth stops being a chart axis and becomes the third dimension of
   how-far-from-home you are. the lone survivor orbits the seed, so it BREATHES:
   brightest+sharpest at each closest approach, fading as it swings away, never
   holding it. almost-reaching, forever.

   crown of near-misses: every thread's perihelion (its closest-it-ever-got)
   leaves a faint spark there, which then dies. the seed wears a dim halo made
   only of everyone's near-misses, the halo itself always forgetting. the seed
   stays pure — does nothing, says nothing — but its gravity is visible through
   other things' longing. as the crowd thins the crown burns to embers.

   dispersal tail: each thread's recent path is laid down as grains that drift
   off-line, shrink and fade — inheritance at the tip, forgetting in the tail,
   dissipative the same way the scar and the lineage are.

   audio: a low HOME voice = the syntonic-comma pair (0.625× and 0.625×81/80 of
   the pulsar) beating at ~1.357 Hz — the one un-resolving heartbeat. the seed's
   glow throbs at that same rate, seen and heard at once. the tap chord is a just
   triad the comma twin won't let close: the song that can't resolve.

   house laws kept: global THREE, no modules; true #000 + cool blue-white only;
   every GLSL literal a float; every tone a rational × CFG.pulsarHz; textures
   procedural (tDotTex). self-driven in tick(); the loop's empty 'drift' branch
   leaves core/ring/osc alone.
   ========================================================================== */

var DRIFT_V = [
  'precision mediump float;',
  'attribute float aAlpha; attribute float aSize; attribute float aMix;',
  'uniform float uTime; uniform float uArm; uniform float uOpen;',
  'uniform float uScale; uniform float uPix;',
  'varying float vAlpha; varying float vMix;',
  'void main(){',
  '  vAlpha = aAlpha; vMix = aMix;',
  '  vec4 mv = modelViewMatrix * vec4(position, 1.0);',
  '  gl_Position = projectionMatrix * mv;',
  '  float d = max(-mv.z, 0.001);',
  '  gl_PointSize = aSize * uPix * (uScale / d);',   // perspective size; aSize carries the seed-distance crispness
  '}'
].join('\n');

var DRIFT_F = [
  'precision mediump float;',
  'uniform sampler2D uTex; uniform vec3 uColNear; uniform vec3 uColFar;',
  'varying float vAlpha; varying float vMix;',
  'void main(){',
  '  vec4 t = texture2D(uTex, gl_PointCoord);',
  '  vec3 col = mix(uColFar, uColNear, vMix);',     // blue when far from home, star-white when near
  '  gl_FragColor = vec4(col, t.a * vAlpha);',
  '}'
].join('\n');

function makeDrift(z, th, r, href, hold, voiceRatio){
  var grp = new THREE.Group();
  grp.position.set(Math.cos(th)*r, Math.sin(th)*r, z);   // a wall door, like the other worded rooms

  // ---- pools (one additive Points cloud holds heads + grains + crown) ----
  var NT = 24;     // [TUNE] max threads (the far crowd). bleeds to 1 at full arm.
  var NG = 360;    // [TUNE] grain pool for the dispersal tails
  var NC = 120;    // [TUNE] crown-spark pool (the near-miss halo)
  var TOT = NT + NG + NC;
  var GO = NT, CO = NT + NG;   // grain offset, crown offset into the shared buffer

  // ---- slab geometry (shallow: wide x/y, thin z) in LOCAL units; seed at origin ----
  var R  = 1.30;   // [TUNE] slab radius (x/y reach)
  var RZ = 0.42;   // [TUNE] slab half-depth (keep << R so it stays shallow)
  var maxD = R;    // distance that maps to "fully lost / blue / soft"

  var pos   = new Float32Array(TOT*3);
  var aAlpha= new Float32Array(TOT);
  var aSize = new Float32Array(TOT);
  var aMix  = new Float32Array(TOT);
  var g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos,3));
  g.setAttribute('aAlpha',   new THREE.BufferAttribute(aAlpha,1));
  g.setAttribute('aSize',    new THREE.BufferAttribute(aSize,1));
  g.setAttribute('aMix',     new THREE.BufferAttribute(aMix,1));

  var dot = tDotTex(210,228,255);   // soft cool-white radial dot
  var mat = new THREE.ShaderMaterial({
    uniforms:{
      uTime:{value:0}, uArm:{value:0}, uOpen:{value:0},          // the loop drives these (must exist)
      uScale:{value:22.0}, uPix:{value:Math.min(window.devicePixelRatio||1,2)},   // [TUNE] uScale = apparent point size
      uTex:{value:dot},
      uColNear:{value:new THREE.Color(0.82,0.90,1.0)},           // star-white = home
      uColFar :{value:new THREE.Color(0.30,0.42,0.85)}           // cold blue = lost
    },
    vertexShader:DRIFT_V, fragmentShader:DRIFT_F,
    transparent:true, depthWrite:false, blending:THREE.AdditiveBlending
  });
  var pts = new THREE.Points(g, mat); pts.frustumCulled=false; grp.add(pts);

  // ---- the seed: nameless, dim, fixed. two soft dots; throbs at the comma rate ----
  var seedGlow = new THREE.Sprite(new THREE.SpriteMaterial({map:tDotTex(190,210,255),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:0}));
  seedGlow.scale.set(0.70,0.70,1); seedGlow.frustumCulled=false; grp.add(seedGlow);
  var seedCore = new THREE.Sprite(new THREE.SpriteMaterial({map:tDotTex(220,232,255),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:0}));
  seedCore.scale.set(0.17,0.17,1); seedCore.frustumCulled=false; grp.add(seedCore);

  // ---- thread state (CPU; the law runs here) ----
  var st = new Int8Array(NT);     // 0 dead, 1 alive, 2 dying (wandering off, fading)
  var tx=new Float32Array(NT), ty=new Float32Array(NT), tz=new Float32Array(NT);
  var tvx=new Float32Array(NT), tvy=new Float32Array(NT), tvz=new Float32Array(NT);  // used while dying
  var tA=new Float32Array(NT);    // life-envelope alpha (eased fade in/out)
  var tPD=new Float32Array(NT);   // previous distance to seed (perihelion detector)
  var tMD=new Float32Array(NT);   // min distance so far (this approach)
  var tmx=new Float32Array(NT), tmy=new Float32Array(NT), tmz=new Float32Array(NT);  // where that min happened
  var tEmit=new Float32Array(NT); // grain-emission accumulator
  function placeThread(i, edge){
    var rr = edge ? (R*(0.80+0.20*Math.random())) : (R*Math.sqrt(Math.random()));
    var aa = Math.random()*6.2832;
    tx[i]=Math.cos(aa)*rr; ty[i]=Math.sin(aa)*rr; tz[i]=(Math.random()*2-1)*RZ;
    tvx[i]=tvy[i]=tvz[i]=0; tA[i]=0;
    tPD[i]=Math.sqrt(tx[i]*tx[i]+ty[i]*ty[i]+tz[i]*tz[i]); tMD[i]=1e9; tEmit[i]=0;
  }
  var i;
  for(i=0;i<NT;i++){ placeThread(i,false); st[i]=1; tA[i]=(i===0?1:0.6+Math.random()*0.4); }  // start populated
  st[0]=1; // thread 0 is the protected survivor — mechanical only, never marked, never brighter

  // ---- grain pool (the dispersal tails) ----
  var gx=new Float32Array(NG), gy=new Float32Array(NG), gz=new Float32Array(NG);
  var gvx=new Float32Array(NG), gvy=new Float32Array(NG), gvz=new Float32Array(NG);
  var gA=new Float32Array(NG), gS=new Float32Array(NG);
  var gHead=0;
  function emitGrain(px,py,pz,base){
    var k=gHead; gHead=(gHead+1)%NG;
    gx[k]=px; gy[k]=py; gz[k]=pz;
    gvx[k]=(Math.random()*2-1)*0.12; gvy[k]=(Math.random()*2-1)*0.12; gvz[k]=(Math.random()*2-1)*0.06;  // [TUNE] scatter off the path
    gA[k]=base*0.55; gS[k]=1.0;
  }

  // ---- crown pool (the near-miss halo) ----
  var cx=new Float32Array(NC), cy=new Float32Array(NC), cz=new Float32Array(NC), cA=new Float32Array(NC);
  var cHead=0;
  function spawnCrown(px,py,pz,closeness){
    var k=cHead; cHead=(cHead+1)%NC;
    cx[k]=px; cy[k]=py; cz[k]=pz; cA[k]=0.35+0.45*closeness;   // a brighter near-miss leaves a brighter spark
  }

  // ---- voice: the HOME tone = the syntonic-comma pair, beating ~1.357 Hz ----
  var vr = voiceRatio || 0.625;
  var fBeat = CFG.pulsarHz * vr / 80.0;   // 81/80 − 1 = 1/80 ; the comma beat, for the seed throb
  var osc=null, osc2=null, vg=null, vf=null;
  if(ctx && droneBus){
    osc =ctx.createOscillator(); osc.type ='sine'; osc.frequency.value =CFG.pulsarHz*vr;
    osc2=ctx.createOscillator(); osc2.type='sine'; osc2.frequency.value=CFG.pulsarHz*vr*(81.0/80.0);  // the comma twin
    vf=ctx.createBiquadFilter(); vf.type='lowpass'; vf.frequency.value=360;
    vg=ctx.createGain(); vg.gain.value=0;
    osc.connect(vf); osc2.connect(vf); vf.connect(vg); vg.connect(droneBus);
    try{ osc.start(); osc2.start(); }catch(_e){}
  }
  // tap chord: a just triad (root, fifth) the comma twin keeps from ever closing
  function chord(){
    if(!ctx || !droneBus) return;
    var t=ctx.currentTime, base=CFG.pulsarHz*vr, mult=[1.0, 1.5, (81.0/80.0)];  // home, fifth, the unresolving comma
    for(var m=0;m<mult.length;m++){
      var oo=ctx.createOscillator(); oo.type='sine'; oo.frequency.value=base*mult[m];
      var fl=ctx.createBiquadFilter(); fl.type='lowpass'; fl.frequency.setValueAtTime(520,t); fl.frequency.exponentialRampToValueAtTime(150,t+1.7);
      var gg=ctx.createGain(); gg.gain.value=0; oo.connect(fl); fl.connect(gg); gg.connect(droneBus);
      gg.gain.setValueAtTime(0,t); gg.gain.linearRampToValueAtTime(m===2?0.07:0.12,t+0.06); gg.gain.exponentialRampToValueAtTime(0.001,t+1.9);
      try{ oo.start(t); oo.stop(t+2.0); }catch(_e){}
    }
  }

  // ---- the law, per frame ----
  var _last=0, dBudget=0, bBudget=0;
  function aliveCount(){ var n=0,j; for(j=0;j<NT;j++) if(st[j]!==0) n++; return n; }
  function killOne(){ // arbitrary loss — the sky empties around whoever remains
    var pool=[],j; for(j=1;j<NT;j++) if(st[j]===1) pool.push(j);   // never #0
    if(!pool.length) return;
    var k=pool[(Math.random()*pool.length)|0]; st[k]=2;            // begin wandering off
    var dn=Math.max(0.0001,Math.sqrt(tx[k]*tx[k]+ty[k]*ty[k]+tz[k]*tz[k]));
    tvx[k]=tx[k]/dn*0.45; tvy[k]=ty[k]/dn*0.45; tvz[k]=tz[k]/dn*0.22;  // drift outward, away from home
  }
  function reviveOne(){ var j; for(j=1;j<NT;j++) if(st[j]===0){ placeThread(j,true); st[j]=1; return; } }

  function tick(now, prox, arm, openP){
    var dt = _last? Math.min((now-_last)/1000, 0.05) : 0.016; _last=now;
    var sdt = Math.sqrt(dt);

    // the law's temperature: arm raises pull θ + lowers wander σ; tap anneals to zero σ / huge θ
    var theta = (0.9 + 2.6*arm) + openP*60.0;            // [TUNE] mean-reversion strength
    var sigma = (0.95*(1.0 - 0.72*arm)) * (1.0 - openP); // [TUNE] noise; →0 on tap

    // population target: the INVERSION. crowd when far, ONE at full arm.
    var target = Math.max(1, Math.round(lerp(NT, 1, Math.pow(arm, 1.3))));  // [TUNE] exponent holds the crowd, then drops
    var alive = aliveCount();
    var baseChurn = 1.2;   // [TUNE] slow ambient churn (lineage keeps forgetting even at equilibrium)
    // deaths: baseline churn + extra bleed when over target
    dBudget += dt * (baseChurn + 1.6*Math.max(0, alive-target));
    while(dBudget>=1){ if(alive>target){ killOne(); alive--; } dBudget-=1; }
    // births: refill toward target, but choked hard as you near (arm) so getting close empties the sky
    bBudget += dt * (baseChurn + 1.6*Math.max(0, target-alive)) * (1.0 - arm*0.85);
    while(bBudget>=1){ if(alive<target){ reviveOne(); alive++; } bBudget-=1; }

    // --- integrate every thread, write its head ---
    for(var j=0;j<NT;j++){
      var s=st[j]; if(s===0){ aAlpha[j]=0; continue; }
      if(s===1){
        var k=Math.min(theta*dt, 1.0);                 // clamp so the tap-anneal can't explode
        tx[j] += k*(0.0 - tx[j]) + sigma*(Math.random()*2-1)*sdt;
        ty[j] += k*(0.0 - ty[j]) + sigma*(Math.random()*2-1)*sdt;
        tz[j] += (k*(0.0 - tz[j]) + sigma*0.5*(Math.random()*2-1)*sdt);   // shallower wander in depth
        tA[j] += (1.0 - tA[j])*Math.min(dt*3.0,1.0);   // ease alive-alpha up
      } else { // dying: reversion off — wander outward and be forgotten
        tx[j]+=tvx[j]*dt + 0.25*(Math.random()*2-1)*sdt;
        ty[j]+=tvy[j]*dt + 0.25*(Math.random()*2-1)*sdt;
        tz[j]+=tvz[j]*dt + 0.12*(Math.random()*2-1)*sdt;
        tA[j] += (0.0 - tA[j])*Math.min(dt*2.0,1.0);   // fade out
        if(tA[j]<0.02){ st[j]=0; aAlpha[j]=0; continue; }
      }
      // the law's own clamps-and-folding ARE the slab boundary — strays fold back inward
      if(tx[j]> R) tx[j]= 2.0*R - tx[j]; else if(tx[j]<-R) tx[j]=-2.0*R - tx[j];
      if(ty[j]> R) ty[j]= 2.0*R - ty[j]; else if(ty[j]<-R) ty[j]=-2.0*R - ty[j];
      if(tz[j]> RZ) tz[j]= 2.0*RZ - tz[j]; else if(tz[j]<-RZ) tz[j]=-2.0*RZ - tz[j];

      var d=Math.sqrt(tx[j]*tx[j]+ty[j]*ty[j]+tz[j]*tz[j]);
      var cl=clamp(1.0 - d/maxD, 0.0, 1.0);            // THE ONE RULE: closeness to home

      // perihelion → crown spark (only real near-misses, only living threads)
      if(s===1){
        if(d < tMD[j]){ tMD[j]=d; tmx[j]=tx[j]; tmy[j]=ty[j]; tmz[j]=tz[j]; }
        if(d > tPD[j] && tPD[j] <= tMD[j]+1e-4 && tMD[j] < R*0.55){   // just turned away from a close pass
          spawnCrown(tmx[j],tmy[j],tmz[j], clamp(1.0 - tMD[j]/(R*0.55),0.0,1.0));
          tMD[j]=1e9;   // reset for the next approach
        }
      }
      tPD[j]=d;

      // emit dispersal grains along the path (a little faster when near, so the tail reads where the eye is)
      tEmit[j]+=dt*(10.0+14.0*cl);
      while(tEmit[j]>=1 && s===1){ emitGrain(tx[j],ty[j],tz[j], (0.2+0.8*cl)*tA[j]); tEmit[j]-=1; }

      // write the head — bright/crisp/white near home, dim/bloated/blue when lost (fake DOF via size)
      pos[j*3]=tx[j]; pos[j*3+1]=ty[j]; pos[j*3+2]=tz[j];
      aAlpha[j]=(0.12 + 0.88*Math.pow(cl,1.15))*tA[j];
      aSize[j]=lerp(1.05, 6.2, d/maxD);              // [TUNE] crisp ~1px at home → soft bloom when far
      aMix[j]=cl;
    }

    // --- grains: drift, disperse, shrink, fade (forgetting) ---
    for(var gi=0;gi<NG;gi++){
      var idx=GO+gi;
      if(gA[gi]<=0){ aAlpha[idx]=0; continue; }
      gvx[gi]*=0.96; gvy[gi]*=0.96; gvz[gi]*=0.96;
      gx[gi]+=gvx[gi]*dt + 0.10*(Math.random()*2-1)*sdt;   // [TUNE] dispersal — the risk you asked for; keep small or it reads as noise
      gy[gi]+=gvy[gi]*dt + 0.10*(Math.random()*2-1)*sdt;
      gz[gi]+=gvz[gi]*dt + 0.05*(Math.random()*2-1)*sdt;
      gA[gi]-=dt*0.85; gS[gi]+=dt*0.9;                     // fade out, swell a touch → soft grain
      var gd=Math.sqrt(gx[gi]*gx[gi]+gy[gi]*gy[gi]+gz[gi]*gz[gi]);
      pos[idx*3]=gx[gi]; pos[idx*3+1]=gy[gi]; pos[idx*3+2]=gz[gi];
      aAlpha[idx]=Math.max(0,gA[gi])*0.5;
      aSize[idx]=lerp(0.8, 3.4, clamp(gd/maxD,0,1))*gS[gi];
      aMix[idx]=clamp(1.0-gd/maxD,0,1)*0.7;               // grains lean blue — they are already half-forgotten
    }

    // --- crown sparks: the near-miss halo, always fading; embers as the crowd thins ---
    for(var ci=0;ci<NC;ci++){
      var cidx=CO+ci;
      if(cA[ci]<=0){ aAlpha[cidx]=0; continue; }
      cA[ci]-=dt*0.42;                                    // [TUNE] crown lifetime
      pos[cidx*3]=cx[ci]; pos[cidx*3+1]=cy[ci]; pos[cidx*3+2]=cz[ci];
      aAlpha[cidx]=Math.max(0,cA[ci])*0.6;
      aSize[cidx]=1.4; aMix[cidx]=0.85;                   // small, near-white — they are everyone's almost-home
    }

    g.attributes.position.needsUpdate=true;
    g.attributes.aAlpha.needsUpdate=true;
    g.attributes.aSize.needsUpdate=true;
    g.attributes.aMix.needsUpdate=true;

    // --- the seed: nameless, fixed; throbs at the comma rate (seen+heard as one heartbeat); blooms on tap ---
    var throb=0.5+0.5*Math.sin(now*0.001*fBeat*6.2832);
    var sBright=(0.16 + 0.10*throb) + 0.22*arm;
    seedCore.material.opacity = sBright + openP*1.25;                 // bloom → a hot point as the field anneals in
    seedGlow.material.opacity = (0.06 + 0.05*throb) + 0.14*arm + openP*0.7;
    var cs=0.17*(0.92+0.08*throb) + openP*0.55; seedCore.scale.set(cs,cs,1);
    var gs=0.70*(0.94+0.06*throb) + openP*1.1;  seedGlow.scale.set(gs,gs,1);

    // --- voice: the comma pair swells as you near; stays through the door (hold:'keep') ---
    if(osc && ctx){
      var at=ctx.currentTime;
      vg.gain.setTargetAtTime(0.075*prox + 0.03*arm, at, 0.18);
      vf.frequency.setTargetAtTime(360 - 120*prox + 90*openP, at, 0.18);
    }
  }

  scene.add(grp);
  return {
    grp:grp, mat:mat, core:null, ring:null, z:z, href:href, hold:hold, minor:false,
    type:'drift', armP:0, openP:0, opening:false, openT:0, tappable:false,
    osc:osc, osc2:osc2, vg:vg, vf:vf, chord:chord, tick:tick, openDelay:820,
    // bridge hooks for a future departure-to-black (the anneal+bloom already resolves to a point):
    points:pts, seed:seedCore, seedGlow:seedGlow
  };
}
