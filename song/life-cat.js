/* ===LIFE cat BEGIN=== */
/*
  the white cat — first inhabitant of the tower.
  apwnp / withnopurpose.com — satellite block built to INHABITANT-SPEC-apwnp.md

  buildLife_cat(THREE, opts) -> {
    group, radius, update(env), reset(), glassMats:[], lineMats:[], dispose()
  }

  A white Devon Rex, yellow-eyed, portrait of the artist's own cat. One
  skinned body (38 bones) carries everything opaque — a torso with real
  anatomy (round rump, wide hips, a true waist tuck, deep keeled chest,
  soft withers; organic cross-sections, not stacked ellipses), a wedge
  head with cheekbones, whisker pads and a small chin, the enormous
  low-set ears, LARGE oval gold eyes with vertical slit pupils, lids
  that BLINK AS GEOMETRY, legs that root into the trunk through muscled
  thigh/shoulder masses then taper slim, small oval paws, a fine whippy
  10-joint tail. THE COAT IS A BABY LAMB'S: the skin itself carries a
  baked two-scale curl displacement (the silhouette is fleece even in
  silhouette LOD), and FOUR inflated shell copies share the skeleton,
  their alpha an astrakhan of little curl rings — two scales, periodic,
  seeded. Shells fade CONTINUOUSLY with distance (outer layers first)
  and vanish under REDUCED. Sparse crinkled whisker stubs (a true Devon
  has almost none) and two additive eyeshine points ride the head bone.
  Form shade is baked WARM in the local frame: bright spine, cream
  under-shadow, steel rim; shell tips brighten outward.

  THE FRAME LAW (spec s3): she lives entirely in her local frame. Origin
  between her paws at ground level, +Z her forward, +Y her own up. Tail
  gravity is LOCAL -Y. No world lookup anywhere in this block — the hub
  may parent her to any ribbon at any angle, upside down included.

  MOTION: four-beat lateral-sequence walk (LH-LF-RH-RF), duty 0.62,
  DIRECT REGISTER exact by construction (stride = anchor span / 0.75);
  blends to a diagonal trot above ~2.2 u/s and to a low stalk on mood.
  She walks nearly SINGLE-TRACK (paws pull to the midline with gait),
  each paw settles toe-down at touchdown and rolls heel-up at push-off
  (stance/swing pitch chained end-to-end — no snap), the swing arc
  peaks early and lands soft with a small inward arc, and each scapula
  rises as its leg takes the load. Head is stabilized to ~0.22 of body
  bob. Eyes DART in hashed micro-saccades; the seated tail tip TWITCHES
  in hashed windows. Gait phase INTEGRATES env.speed (env-driven);
  everything scheduled — idles, blinks, gaze wander, ear flicks,
  saccades, tail flicks — is a pure function of (seed, tS), so hard
  time jumps replay identically. Idle suite at speed 0: stand, sit tall,
  sphinx loaf, groom-an-ear, long stretch, slow look-around, and
  sometimes a CATNAP (~9 s: she folds into a loaf — or dozes off seated
  under mood 'sit' — head sinks, lids close as geometry, ears droop,
  breath slows deep; walking always wakes her), chosen per 13 s segment
  by seeded hash, crossfaded continuously. The tail is a
  spring/verlet chain under local gravity: never still, never snapping.
  Pupils dilate monotonically with (1 - lit); ears swivel independently
  toward gazeAt and flatten on the bell flare; eyeshine is gated on
  facing-dot times (1 - lit), and dies under REDUCED.

  BUDGET (measured in verify-cat.js): 7 draw calls full LOD (skin,
  4 shells, whiskers, eyeshine points), 2 in silhouette and REDUCED;
  ~5.6k verts total (38 bones); 2 canvas textures (256 px lamb-curl,
  64 px glint); update ~0.003 ms full and silhouette on Node — far
  under the 0.35 / 0.10 ms budgets.
  glassMats/lineMats returned EMPTY on purpose: her glint and whiskers
  are gated by her own senses, not the tower's breath.

  env used: tS (all schedules), speed (gait phase, integrated), turn
  (bank + spine flex), lit (pupils, coat brightness, eyeshine), fl (ear
  flatten, squint, pupil flinch), gazeAt (head/eyes/ears, shine facing),
  dist (shell + whisker fades, silhouette LOD), mood (walk/stalk/sit/
  follow hints), reduced (shells off, shine off, motion x0.62), pW (a
  slow breath in the chest bone). pO/nowMs are accepted, unused.

  morph — RESERVED name (spec s6, the raven to come). Not defined here;
  the shells' alphas are already built to stream when that movement asks.

  [TUNE] knobs (all inside, marked): SCALE 1.0 overall size ·
  BODY_L 0.30 anchor span (stride = /0.75) · SH_H 0.245 / HIP_H 0.262
  standing joint heights · DUTY_WALK 0.62 · TROT_V0/V1 2.0/2.6 blend band
  BOB_A 0.011 body bob · HEAD_STAB 0.22 residual head motion ·
  TAIL_G 0.55 local gravity · TAIL_K 55 spring · BLINK_WIN 3.6 s hash
  window (p 0.30) · PUP_MIN 0.16 slit fraction · SHELL_D 4 layers
  0.004..0.0175 · FLEECE_A/F baked curl displacement amp/freq ·
  SHELL_FADE 8..13 u · SIL_D 14 u silhouette · IDLE_PER 13 s segment
  (nap slice 10%) · SHINE 0.9 eyeshine gain · WAVE_UV 12 curl density.
*/
function buildLife_cat(THREE, opts){
  opts=opts||{};
  var TAU=Math.PI*2, HPI=Math.PI/2;
  function mulb(seed){ return function(){ seed|=0; seed=(seed+0x6D2B79F5)|0;
    var t=Math.imul(seed^(seed>>>15),1|seed); t=(t+Math.imul(t^(t>>>7),61|t))^t;
    return ((t^(t>>>14))>>>0)/4294967296; }; }
  var SEEDI=(opts.seed|0)||7, rng=mulb(SEEDI);
  function clamp(v,a,b){ return v<a?a:(v>b?b:v); }
  function lerp(a,b,t){ return a+(b-a)*t; }
  function sm01(t){ t=clamp(t,0,1); return t*t*(3-2*t); }
  function h01(k,s){ var x=(Math.imul(k|0,374761393)+Math.imul(s|0,668265263)+Math.imul(SEEDI,974711))|0;
    x=(x^(x>>>13))|0; x=Math.imul(x,1274126177); x=(x^(x>>>16))>>>0; return x/4294967296; }
  function vn1(t,cell,salt){ var u=t/cell, k=Math.floor(u), f=u-k;
    var w=f*f*f*(f*(f*6-15)+10);
    return h01(k,salt)+(h01(k+1,salt)-h01(k,salt))*w; }          /* 0..1, C2 smooth, pure */

  /* ---------------- [TUNE] ---------------- */
  var SCALE=1.0;
  var BODY_L=0.30, STRIDE=BODY_L/0.75;          /* direct register: 0.75*S = anchor span */
  var SH_H=0.245, HIP_H=0.262;                  /* standing shoulder / hip joint heights */
  var WALK_CROUCH=0.008;
  var DUTY_WALK=0.62, DUTY_TROT=0.42;
  var TROT_V0=2.0, TROT_V1=2.6, TROT_STRIDE=1.40;
  var BOB_A=0.011, HEAD_STAB=0.22;
  var TAIL_N=10, TAIL_G=0.55, TAIL_K=55.0, TAIL_DAMP=0.988;
  var BLINK_WIN=3.6, BLINK_P=0.30;
  var PUP_MIN=0.16, PUP_GAMMA=1.35;
  var SHELL_D=[0.004,0.0085,0.013,0.0175];      /* 4 fleece layers */
  var SHELL_O=[0.42,0.30,0.20,0.12];
  var SHELL_F0=8, SHELL_F1=13, SIL_D=14;
  var FLEECE_A1=0.0022, FLEECE_F1=72;           /* baked curl displacement */
  var FLEECE_A2=0.0015, FLEECE_F2=23;
  var IDLE_PER=13.0, SHINE=0.9, WAVE_UV=12;

  /* palette (warm white, never #ffffff; steel rim; tower gold eyes) */
  var C_COAT=[0.949,0.918,0.851], C_STEEL=[0.749,0.831,1.0];
  var C_FLESH=[0.878,0.671,0.608], C_NOSE=[0.859,0.608,0.561];
  var C_IRIS=[0.910,0.769,0.400], C_IRIS2=[1.0,0.851,0.541], C_LIMB=[0.478,0.361,0.133];
  var C_PUP=[0.040,0.036,0.024], C_LINER=[0.620,0.540,0.470];

  /* ---------------- skeleton rest layout (root space, +Z forward) -------- */
  var REST={
    pelvis:[0,0.275,-0.135], spine1:[0,0.272,0.0], chest:[0,0.268,0.105],
    neck1:[0,0.325,0.166], head:[0,0.372,0.222],
    earL:[0.0372,0.0225,-0.006], earR:[-0.0372,0.0225,-0.006],   /* head-local */
    eyeL:[0.0250,0.0092,0.0375], eyeR:[-0.0250,0.0092,0.0375],   /* head-local */
    shFL:[0.052,SH_H,0.150], shFR:[-0.052,SH_H,0.150],
    hipHL:[0.056,HIP_H,-0.155], hipHR:[-0.056,HIP_H,-0.155],
    pawFL:[0.052,0.012,0.150], pawFR:[-0.052,0.012,0.150],
    pawHL:[0.056,0.012,-0.150], pawHR:[-0.056,0.012,-0.150],
    tail0:[0,0.262,-0.185]
  };
  var L1F=0.132, L2F=0.120, L1H=0.150, L2H=0.145;
  var EYE_R=0.0236, EYE_DIV=0.10;              /* eye radius (LARGE, a Devon truth), rest divergence rad */
  var PAW_ANC=[REST.pawFL,REST.pawFR,REST.pawHL,REST.pawHR];
  var LEG_ANC=[REST.shFL,REST.shFR,REST.hipHL,REST.hipHR];
  var LEG_L1=[L1F,L1F,L1H,L1H], LEG_L2=[L2F,L2F,L2H,L2H];
  var LEG_BEND=[[0,0,-1],[0,0,-1],[0,0,1],[0,0,1]];   /* elbow back, knee forward */

  /* rest IK once, to found the geometry on the same solver the frames use */
  function ikSolve(A,P,l1,l2,bend,outK){
    var dx=P[0]-A[0], dy=P[1]-A[1], dz=P[2]-A[2];
    var d=Math.sqrt(dx*dx+dy*dy+dz*dz);
    var dMax=l1+l2-0.0025, dMin=Math.abs(l1-l2)+0.004;
    if(d>dMax){ var s=dMax/d; dx*=s; dy*=s; dz*=s; d=dMax; }
    if(d<dMin){ var s2=dMin/(d||1e-6); dx*=s2; dy*=s2; dz*=s2; d=dMin; }
    var ux=dx/d, uy=dy/d, uz=dz/d;
    /* perpendicular toward bend dir */
    var bd=bend[0]*ux+bend[1]*uy+bend[2]*uz;
    var px=bend[0]-bd*ux, py=bend[1]-bd*uy, pz=bend[2]-bd*uz;
    var pl=Math.sqrt(px*px+py*py+pz*pz);
    if(pl<1e-6){ px=0; py=1; pz=0; pl=1; }
    px/=pl; py/=pl; pz/=pl;
    var a=(l1*l1-l2*l2+d*d)/(2*d), h2=l1*l1-a*a, h=h2>0?Math.sqrt(h2):0;
    outK[0]=A[0]+ux*a+px*h; outK[1]=A[1]+uy*a+py*h; outK[2]=A[2]+uz*a+pz*h;
  }
  var REST_KNEE=[[0,0,0],[0,0,0],[0,0,0],[0,0,0]], li;
  for(li=0;li<4;li++) ikSolve(LEG_ANC[li],PAW_ANC[li],LEG_L1[li],LEG_L2[li],LEG_BEND[li],REST_KNEE[li]);

  /* tail rest chain: relaxed droop with a soft up-hooked tip */
  var TAIL_P0=[], TAIL_SEG=[], ti;
  (function(){
    var p=[REST.tail0[0],REST.tail0[1],REST.tail0[2]], i;
    TAIL_P0.push([p[0],p[1],p[2]]);
    for(i=0;i<TAIL_N;i++){
      var f=i/(TAIL_N-1), sl=lerp(0.037,0.026,f);
      var pit=-0.80+1.05*Math.pow(f,1.5);                  /* down-back, tip eases up */
      var dy=Math.sin(pit), dz=-Math.cos(pit);
      p=[p[0], p[1]+dy*sl, p[2]+dz*sl];
      TAIL_SEG.push(sl); TAIL_P0.push([p[0],p[1],p[2]]);
    }
  })();

  /* ---------------- bone index map ---------------- */
  var B_ROOT=0,B_PELV=1,B_SP1=2,B_CHEST=3,B_NECK=4,B_HEAD=5,
      B_EARL=6,B_EARR=7,B_EYEL=8,B_EYER=9,B_PUPL=10,B_PUPR=11,
      B_LUL=12,B_LLL=13,B_LUR=14,B_LLR=15,B_LEG0=16,B_TAIL0=28,NBONE=38;

  /* ---------------- geometry accumulator ---------------- */
  var G={p:[],uv:[],si:[],sw:[],idx:[],base:[],shade:[],steel:[],fur:[],n:0};
  function addV(x,y,z, u,v, w4, col, shade, steel, fur){
    G.p.push(x,y,z); G.uv.push(u,v);
    G.si.push(w4[0],w4[2],w4[4],w4[6]); G.sw.push(w4[1],w4[3],w4[5],w4[7]);
    G.base.push(col[0],col[1],col[2]); G.shade.push(shade); G.steel.push(steel); G.fur.push(fur);
    return G.n++;
  }
  function W1(b){ return [b,1,0,0,0,0,0,0]; }
  function W2(a,wa,b){ return [a,wa,b,1-wa,0,0,0,0]; }
  function quadI(a,b,c,d){ G.idx.push(a,b,c, a,c,d); }
  function norm3(v){ var l=Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2])||1; return [v[0]/l,v[1]/l,v[2]/l]; }
  function cross3(a,b){ return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]; }
  function sub3(a,b){ return [a[0]-b[0],a[1]-b[1],a[2]-b[2]]; }
  function frameOf(axis){                      /* two perpendiculars of a unit axis */
    var up=Math.abs(axis[1])>0.92?[1,0,0]:[0,1,0];
    var u=norm3(cross3(up,axis)), v=cross3(axis,u);
    return [u,v];
  }
  /* an elliptical ring around center c, in plane (u,v), radii rx,ry.
     Returns the vertex indices. uvV: texture v; per-vert color from colFn(az). */
  function ring(c,u,v,rx,ry,nSeg,w4,uvV,col,shade,steel,fur,fn){
    var out=[],k,circ=Math.PI*(rx+ry)*WAVE_UV;
    for(k=0;k<nSeg;k++){ var a=k/nSeg*TAU, ca=Math.cos(a), sa=Math.sin(a);
      var m=fn?fn(ca,sa):1, mx=rx*m, my=ry*m;
      out.push(addV(c[0]+u[0]*ca*mx+v[0]*sa*my, c[1]+u[1]*ca*mx+v[1]*sa*my, c[2]+u[2]*ca*mx+v[2]*sa*my,
        k/nSeg*circ, uvV, w4, col, shade, steel, fur));
    }
    return out;
  }
  /* organic cross-sections (a cat is not a stack of ellipses): bell =
     belly/keel/chin fullness low, side = lower-lateral muscle swell
     (haunch, shoulder); the top keeps a soft spine flat. */
  function shp(bell,side){ return function(ca,sa){ var p=Math.max(0,-sa);
    return 1+bell*Math.pow(p,1.6)+side*ca*ca*Math.pow(0.4+0.6*p,1.5)
            -0.028*Math.pow(Math.max(0,sa),3); }; }
  function tube(r0,r1){ var n=r0.length,k; for(k=0;k<n;k++) quadI(r0[k],r0[(k+1)%n],r1[(k+1)%n],r1[k]); }
  function capRing(r0,cIdx,flip){ var n=r0.length,k;
    for(k=0;k<n;k++){ if(flip) G.idx.push(r0[(k+1)%n],r0[k],cIdx); else G.idx.push(r0[k],r0[(k+1)%n],cIdx); } }

  /* ============ TORSO (slender, deep-chested; +Z forward) ============ */
  (function(){
    var XA=[1,0,0], YA=[0,1,0];
    var st=[  /* z, cy, w, h, shade, w4, bell, side — rump round, hips wide,
                 a true WAIST TUCK, deep keeled chest, soft withers */
      [-0.205,0.262,0.024,0.034,0.88, W1(B_PELV),0.05,0.02],
      [-0.193,0.265,0.043,0.055,0.93, W1(B_PELV),0.08,0.10],
      [-0.168,0.267,0.058,0.070,0.97, W1(B_PELV),0.10,0.21],
      [-0.128,0.268,0.0595,0.0715,0.99, W1(B_PELV),0.12,0.19],
      [-0.082,0.2665,0.0525,0.0635,1.00, W2(B_PELV,0.55,B_SP1),0.06,0.05],
      [-0.036,0.2635,0.0545,0.0685,1.00, W2(B_SP1,0.70,B_PELV),0.14,0.03],
      [ 0.010,0.2615,0.0565,0.0725,1.00, W2(B_SP1,0.72,B_CHEST),0.16,0.03],
      [ 0.058,0.2565,0.0575,0.0815,1.02, W2(B_SP1,0.35,B_CHEST),0.20,0.05],
      [ 0.100,0.2585,0.0555,0.0795,1.03, W2(B_CHEST,0.85,B_SP1),0.16,0.11],
      [ 0.138,0.2665,0.0475,0.0665,1.04, W1(B_CHEST),0.10,0.14],
      [ 0.166,0.2695,0.0345,0.0495,1.05, W1(B_CHEST),0.05,0.05],
      [ 0.179,0.2715,0.0185,0.0315,1.05, W1(B_CHEST),0.03,0.02]
    ];
    var rings=[],i,vlen=0,pz=st[0][0];
    for(i=0;i<st.length;i++){ var s=st[i]; vlen+=Math.abs(s[0]-pz)*WAVE_UV; pz=s[0];
      rings.push(ring([0,s[1],s[0]],XA,YA,s[2],s[3],18,s[5],vlen,C_COAT,s[4],1,1,shp(s[6],s[7]))); }
    for(i=0;i<rings.length-1;i++) tube(rings[i],rings[i+1]);
    var cb=addV(0,0.260,-0.209, 0,0, W1(B_PELV), C_COAT,0.84,1,1);
    capRing(rings[0],cb,true);
    var cf=addV(0,0.2725,0.184, 0,0, W1(B_CHEST), C_COAT,1.05,1,1);
    capRing(rings[rings.length-1],cf,false);
  })();

  /* ============ NECK (slim, rising forward) ============ */
  (function(){
    var a=[0,0.282,0.130], b=[0,0.356,0.210];
    var ax=norm3(sub3(b,a)), fr=frameOf(ax), i;
    var rr=[[0,0.0408,0.0430,W2(B_CHEST,0.8,B_NECK)],[0.33,0.0362,0.0386,W2(B_NECK,0.8,B_CHEST)],
            [0.66,0.0336,0.0350,W2(B_NECK,0.75,B_HEAD)],[1.0,0.0328,0.0342,W2(B_HEAD,0.7,B_NECK)]];
    var rings=[];
    for(i=0;i<rr.length;i++){ var t=rr[i][0];
      var c=[lerp(a[0],b[0],t),lerp(a[1],b[1],t),lerp(a[2],b[2],t)];
      rings.push(ring(c,fr[0],fr[1],rr[i][1],rr[i][2],14,rr[i][3],t*0.9,C_COAT,1.0,1,i===0?0.0:1,shp(0.06,0.02))); }
    for(i=0;i<rings.length-1;i++) tube(rings[i],rings[i+1]);
  })();

  /* ============ HEAD (elfin short wedge, high cheekbones, short muzzle,
                  slight nose upturn) — rings along head-local z ============ */
  var HED=REST.head;
  function hpt(l){ return [HED[0]+l[0],HED[1]+l[1],HED[2]+l[2]]; }
  (function(){
    var XA=[1,0,0], YA=[0,1,0];
    var st=[ /* zl, cyl, w, h, shade, furW, headBlend, bell(chin/jowl) —
                rounder skull, wider cheekbones, a real muzzle with
                whisker pads and a small chin instead of a cone */
      [-0.048, 0.000,0.0400,0.0415,0.95,0.9, W2(B_HEAD,0.8,B_NECK),0.05],
      [-0.032, 0.0052,0.0462,0.0470,0.99,1.0, W1(B_HEAD),0.04],
      [-0.014, 0.0064,0.0500,0.0490,1.01,1.0, W1(B_HEAD),0.04],
      [ 0.004, 0.0038,0.0538,0.0462,1.03,0.9, W1(B_HEAD),0.05],
      [ 0.014, 0.0008,0.0560,0.0432,1.045,0.8, W1(B_HEAD),0.06],  /* the cheekbones */
      [ 0.028,-0.0012,0.0480,0.0392,1.03,0.55, W1(B_HEAD),0.08],  /* eye band */
      [ 0.040,-0.0036,0.0370,0.0322,1.03,0.35, W1(B_HEAD),0.14],  /* muzzle break */
      [ 0.051,-0.0052,0.0300,0.0270,1.05,0.2, W1(B_HEAD),0.22],   /* whisker pads, chin */
      [ 0.061,-0.0044,0.0248,0.0225,1.06,0.1, W1(B_HEAD),0.20],   /* the upturn begins */
      [ 0.070,-0.0024,0.0150,0.0140,1.06,0.0, W1(B_HEAD),0.10]    /* nose tip, lifted */
    ];
    var rings=[],i,k;
    for(i=0;i<st.length;i++){ var s=st[i];
      var rr=ring(hpt([0,s[1],s[0]]),XA,YA,s[2],s[3],18,s[6],(s[0]+0.05)*WAVE_UV,C_COAT,s[4],s[5]>0.3?1:0,s[5],shp(s[7],0));
      rings.push(rr);
    }
    for(i=0;i<rings.length-1;i++) tube(rings[i],rings[i+1]);
    var cb=addV.apply(null,[HED[0],HED[1]+0.004,HED[2]-0.056, 0,0, W2(B_HEAD,0.85,B_NECK), C_COAT,0.94,1,0.9]);
    capRing(rings[0],cb,true);
    /* nose leather: recolor the upper-front of the tip ring + front cap */
    var tip=rings[rings.length-1];
    for(k=0;k<tip.length;k++){ var vy=G.p[tip[k]*3+1]-(HED[1]-0.0024), vx=G.p[tip[k]*3];
      if(vy>-0.004 && Math.abs(vx)<0.010){ G.base[tip[k]*3]=C_NOSE[0]; G.base[tip[k]*3+1]=C_NOSE[1]; G.base[tip[k]*3+2]=C_NOSE[2]; G.steel[tip[k]]=0; } }
    var cf=addV(HED[0],HED[1]-0.0026,HED[2]+0.0748, 0,0, W1(B_HEAD), C_NOSE,1.0,0,0);
    capRing(rings[rings.length-1],cf,false);
  })();

  /* ============ EARS — enormous, low-set, wide-based, rounded tips ====== */
  function buildEar(side){
    var eb=[side*0.0372,0.0225,-0.006];
    var T=norm3([side*0.74,0.62,-0.13]);           /* ear height axis: strongly outward = low-set */
    var Nr=[side*0.26,0.04,0.96];
    var d=Nr[0]*T[0]+Nr[1]*T[1]+Nr[2]*T[2];
    var N=norm3([Nr[0]-d*T[0],Nr[1]-d*T[1],Nr[2]-d*T[2]]);
    var Bs=cross3(T,N);
    var bone=side>0?B_EARL:B_EARR, NU=7, NV=8, layer, iu, iv;
    var lay=[[ 0.0011, C_FLESH, 0, 0.0],[-0.0011, C_COAT, 1, 0.55]];
    var grids=[];
    for(layer=0;layer<2;layer++){
      var grid=[];
      for(iv=0;iv<NV;iv++){ var v=iv/(NV-1);
        var hw=0.0372*Math.pow(Math.cos(Math.pow(v,1.12)*HPI),0.58);
        if(iv===NV-1) hw=0.004;                     /* rounded, never a spike */
        var row=[];
        for(iu=0;iu<NU;iu++){ var u=iu/(NU-1)*2-1;
          var bow=-0.0068*(1-u*u)*Math.sin(Math.min(1,v*1.05)*Math.PI*0.75+0.30);
          var off=lay[layer][0]+bow;
          var px=eb[0]+T[0]*v*0.0915+Bs[0]*u*hw+N[0]*off;
          var py=eb[1]+T[1]*v*0.0915+Bs[1]*u*hw+N[1]*off;
          var pz=eb[2]+T[2]*v*0.0915+Bs[2]*u*hw+N[2]*off;
          var wp=hpt([px,py,pz]);
          var col, mixv;
          if(layer===0){ mixv=sm01((Math.abs(u)-0.20)/0.50+v*0.45);
            col=[lerp(lay[0][1][0],C_COAT[0],mixv),lerp(lay[0][1][1],C_COAT[1],mixv),lerp(lay[0][1][2],C_COAT[2],mixv)];
          } else col=C_COAT;
          var w4=(iv===0)?W2(bone,0.55,B_HEAD):W1(bone);
          row.push(addV(wp[0],wp[1],wp[2], u*0.5+0.5, v*2.2, w4, col, layer===0?1.02:0.99, lay[layer][2], lay[layer][3]));
        }
        grid.push(row);
      }
      grids.push(grid);
      for(iv=0;iv<NV-1;iv++) for(iu=0;iu<NU-1;iu++){
        var A=grid[iv][iu],Bq=grid[iv][iu+1],Cq=grid[iv+1][iu+1],Dq=grid[iv+1][iu];
        if(layer===0) quadI(A,Bq,Cq,Dq); else quadI(Bq,A,Dq,Cq);
      }
    }
    for(iv=0;iv<NV-1;iv++){                        /* rim strips seal the sides */
      quadI(grids[1][iv][0],grids[0][iv][0],grids[0][iv+1][0],grids[1][iv+1][0]);
      quadI(grids[0][iv][NU-1],grids[1][iv][NU-1],grids[1][iv+1][NU-1],grids[0][iv+1][NU-1]);
    }
    for(iu=0;iu<NU-1;iu++)
      quadI(grids[0][NV-1][iu],grids[0][NV-1][iu+1],grids[1][NV-1][iu+1],grids[1][NV-1][iu]);
  }
  buildEar(1); buildEar(-1);

  /* ============ EYES — large wide-set ovals of tower gold ============ */
  var EYE_F=[], EYE_U=[], EYE_RT=[];               /* per-side eye frames (head-local) */
  function buildEye(side){
    var E=[side*0.0250,0.0092,0.0375];
    var F=norm3([Math.sin(EYE_DIV)*side,0.03,Math.cos(EYE_DIV)]);
    var U=[0,1,0]; var dd=U[0]*F[0]+U[1]*F[1]+U[2]*F[2];
    U=norm3([U[0]-dd*F[0],U[1]-dd*F[1],U[2]-dd*F[2]]);
    var Rt=cross3(U,F);
    if(side>0){ EYE_F[0]=F; EYE_U[0]=U; EYE_RT[0]=Rt; } else { EYE_F[1]=F; EYE_U[1]=U; EYE_RT[1]=Rt; }
    var bone=side>0?B_EYEL:B_EYER;
    var TH=[0.30,0.56,0.80,0.97,1.20,1.50], NA=12, i, k;
    var cap=addV.apply(null,(function(){ var w=hpt([E[0]+F[0]*EYE_R,E[1]+F[1]*EYE_R,E[2]+F[2]*EYE_R]);
      return [w[0],w[1],w[2], 0,0, W1(bone), C_IRIS2,1.0,0,0]; })());
    var rings=[];
    for(i=0;i<TH.length;i++){ var th=TH[i], ct=Math.cos(th), stq=Math.sin(th), row=[];
      var col, sh=1.0;
      if(th<0.62){ var mv=sm01((th-0.18)/0.40); col=[lerp(C_IRIS2[0],C_IRIS[0],mv),lerp(C_IRIS2[1],C_IRIS[1],mv),lerp(C_IRIS2[2],C_IRIS[2],mv)]; }
      else if(th<0.90) col=C_IRIS;
      else if(th<1.05){ col=C_LIMB; }
      else { col=[0.52,0.47,0.41]; sh=0.78; }      /* soft socket, not a hollow */
      for(k=0;k<NA;k++){ var a=k/NA*TAU, ca=Math.cos(a), sa=Math.sin(a);
        var g=(th<0.9)?(0.94+0.12*h01(k+i*31,side>0?77:78)):1.0;   /* iris striation */
        var dx=F[0]*ct+(Rt[0]*ca+U[0]*sa)*stq, dy=F[1]*ct+(Rt[1]*ca+U[1]*sa)*stq, dz=F[2]*ct+(Rt[2]*ca+U[2]*sa)*stq;
        var w=hpt([E[0]+dx*EYE_R,E[1]+dy*EYE_R,E[2]+dz*EYE_R]);
        row.push(addV(w[0],w[1],w[2], 0,0, W1(bone), [col[0]*g,col[1]*g,col[2]*g], sh, 0, 0));
      }
      rings.push(row);
    }
    capRing(rings[0],cap,false);
    for(i=0;i<rings.length-1;i++) tube(rings[i+1],rings[i]);
  }
  buildEye(1); buildEye(-1);

  /* ============ PUPILS — vertical slits, geometry, bone-scaled ========= */
  var PUP_W0=0.16;                                 /* bind half-width, radians */
  function buildPupil(side){
    var E=[side*0.0250,0.0092,0.0375];
    var F=side>0?EYE_F[0]:EYE_F[1], U=side>0?EYE_U[0]:EYE_U[1], Rt=side>0?EYE_RT[0]:EYE_RT[1];
    var bone=side>0?B_PUPL:B_PUPR, NR=9, NC=3, r=EYE_R+0.0013, ir, ic;
    var grid=[];
    for(ir=0;ir<NR;ir++){ var s=ir/(NR-1)*2-1, el=s*0.68;
      var hw=PUP_W0*Math.pow(Math.max(0,1-s*s),0.72)+0.004;
      var row=[];
      for(ic=0;ic<NC;ic++){ var t=ic/(NC-1)*2-1, az=t*hw;
        var ce=Math.cos(el), dx=F[0]*ce*Math.cos(az)+U[0]*Math.sin(el)+Rt[0]*ce*Math.sin(az);
        var dy=F[1]*ce*Math.cos(az)+U[1]*Math.sin(el)+Rt[1]*ce*Math.sin(az);
        var dz=F[2]*ce*Math.cos(az)+U[2]*Math.sin(el)+Rt[2]*ce*Math.sin(az);
        var w=hpt([E[0]+dx*r,E[1]+dy*r,E[2]+dz*r]);
        row.push(addV(w[0],w[1],w[2], 0,0, W1(bone), C_PUP, 1.0, 0, 0));
      }
      grid.push(row);
    }
    for(ir=0;ir<NR-1;ir++) for(ic=0;ic<NC-1;ic++)
      quadI(grid[ir][ic],grid[ir][ic+1],grid[ir+1][ic+1],grid[ir+1][ic]);
  }
  buildPupil(1); buildPupil(-1);

  /* ============ LIDS — geometry shells that CLOSE (law 6) ============ */
  var LID_RANGE={};                                /* vert index ranges for the harness raycast */
  function buildLid(side,upper){
    var E=[side*0.0250,0.0092,0.0375];
    var F=side>0?EYE_F[0]:EYE_F[1], U=side>0?EYE_U[0]:EYE_U[1], Rt=side>0?EYE_RT[0]:EYE_RT[1];
    var bone=upper?(side>0?B_LUL:B_LUR):(side>0?B_LLL:B_LLR);
    /* upper rows wrap the eye's whole crown, so a CLOSED lid leaves no
       gold sliver between its trailing edge and the brow at any angle;
       azimuth runs wide so the corners (canthi) seal too */
    var NA=9, ROWS=upper?[0,0.07,0.30,0.62,1.00,1.45,1.95]:[0,-0.05,-0.22,-0.46,-0.72];
    var i0=G.n, ia, irow, grid=[];
    for(irow=0;irow<ROWS.length;irow++){
      var row=[];
      for(ia=0;ia<NA;ia++){ var a=(ia/(NA-1)*2-1)*1.50;
        var m=upper? (0.66-0.50*Math.pow(Math.abs(a)/1.50,1.5))
                   : (-(0.46-0.40*Math.pow(Math.abs(a)/1.50,1.6)));
        var el=m+ROWS[irow], az=a;
        var rr=(irow===0)?EYE_R+0.0021:(irow===1?EYE_R+0.0016:EYE_R+0.0013+Math.min(irow,4)*0.0004);
        if(upper&&irow>=5) rr=EYE_R+(irow===5?0.0012:-0.0006);   /* crown rows tuck under the brow at rest */
        var ce=Math.cos(el);
        var dx=F[0]*ce*Math.cos(az)+U[0]*Math.sin(el)+Rt[0]*ce*Math.sin(az);
        var dy=F[1]*ce*Math.cos(az)+U[1]*Math.sin(el)+Rt[1]*ce*Math.sin(az);
        var dz=F[2]*ce*Math.cos(az)+U[2]*Math.sin(el)+Rt[2]*ce*Math.sin(az);
        var w=hpt([E[0]+dx*rr,E[1]+dy*rr,E[2]+dz*rr]);
        var col=(irow===0)?C_LINER:C_COAT, sh=(irow===0)?1.0:0.93;
        row.push(addV(w[0],w[1],w[2], 0,0, W1(bone), col, sh, 0, 0));
      }
      grid.push(row);
    }
    for(irow=0;irow<ROWS.length-1;irow++) for(ia=0;ia<NA-1;ia++){
      var A=grid[irow][ia],Bq=grid[irow][ia+1],Cq=grid[irow+1][ia+1],Dq=grid[irow+1][ia];
      if(upper) quadI(A,Bq,Cq,Dq); else quadI(Bq,A,Dq,Cq);
    }
    LID_RANGE[(upper?'U':'L')+(side>0?'L':'R')]=[i0,G.n];
  }
  buildLid(1,true); buildLid(1,false); buildLid(-1,true); buildLid(-1,false);

  /* ============ LEGS — long, slim; hind slightly longer ============ */
  function buildLeg(li){
    var A=LEG_ANC[li], K=REST_KNEE[li], P=PAW_ANC[li];
    var bu=B_LEG0+li*3, bl=bu+1, bf=bu+2, hind=li>=2;
    var trunk=hind?B_PELV:B_CHEST;
    var dU=norm3(sub3(K,A)), dL=norm3(sub3(P,K));
    var fU=frameOf(dU), fL=frameOf(dL), i;
    /* the leg tube now ROOTS INTO THE TRUNK: top rings ride up past the
       anchor as a muscled thigh / shoulder mass (weighted to the trunk
       bone, so they deform with the body), then taper to slim Devon
       legs. aspect (3rd) keeps the masses elliptical, muscle-deep. */
    /* SMOOTH JOINTS: rings crowd toward knee/elbow and ankle, and skin
       weights grade through the bend in small steps (0.85 -> 0.66 ->
       0.50 -> 0.70 -> 0.92) so a folded leg curves instead of creasing.
       The last ring bridges INTO the paw on the foot bone. */
    var stU=hind?[[-0.08,0.0300,1.20],[0.10,0.0280,1.18],[0.35,0.0250,1.14],[0.60,0.0206,1.10],[0.78,0.0180,1.07],[0.90,0.0163,1.05],[1.0,0.0151,1.04]]
                :[[-0.10,0.0238,1.12],[0.10,0.0218,1.10],[0.35,0.0194,1.08],[0.60,0.0174,1.07],[0.78,0.0159,1.06],[0.90,0.0148,1.05],[1.0,0.0141,1.04]];
    var UW=[W2(trunk,0.85,bu),W2(trunk,0.55,bu),W2(bu,0.72,trunk),W1(bu),W2(bu,0.85,bl),W2(bu,0.66,bl),W2(bu,0.50,bl)];
    var stL=[[0.08,0.0137,W2(bl,0.70,bu)],[0.24,0.0127,W2(bl,0.92,bu)],[0.52,0.0116,W1(bl)],
             [0.80,0.0105,W1(bl)],[0.95,0.0098,W2(bl,0.60,bf)],[1.0,0.0094,W2(bf,0.75,bl)]];
    var rings=[];
    for(i=0;i<stU.length;i++){ var t=stU[i][0];
      var c=[A[0]+dU[0]*t*LEG_L1[li],A[1]+dU[1]*t*LEG_L1[li],A[2]+dU[2]*t*LEG_L1[li]];
      rings.push(ring(c,fU[0],fU[1],stU[i][1],stU[i][1]*stU[i][2],10,UW[i],(t+0.3)*1.5,C_COAT,hind?1.0:1.01,1,i<2?0.0:(i<3?0.7:0.5)));
    }
    for(i=0;i<stL.length;i++){ var t2=stL[i][0];
      var c2=[K[0]+dL[0]*t2*LEG_L2[li],K[1]+dL[1]*t2*LEG_L2[li],K[2]+dL[2]*t2*LEG_L2[li]];
      rings.push(ring(c2,fL[0],fL[1],stL[i][1],stL[i][1],10,stL[i][2],(2.0+t2)*1.5,C_COAT,0.97,1,0.25));
    }
    for(i=0;i<rings.length-1;i++) tube(rings[i],rings[i+1]);
    /* the small oval paw, rigid on the foot bone */
    var XA=[1,0,0], ZA=[0,0,1], pc=[P[0],0.0105,P[2]+0.0045];
    var pr=hind?0.94:0.88;
    var r1=ring([pc[0],pc[1]+0.006,pc[2]-0.002],XA,ZA,0.0112*pr,0.0158*pr,8,W1(bf),0,C_COAT,1.0,0,0.1);
    var r2=ring([pc[0],pc[1]-0.0015,pc[2]],XA,ZA,0.0128*pr,0.0185*pr,8,W1(bf),0.3,C_COAT,1.0,0,0.05);
    var r3=ring([pc[0],pc[1]-0.0075,pc[2]],XA,ZA,0.0105*pr,0.0165*pr,8,W1(bf),0.6,C_COAT,0.9,0,0);
    tube(r1,r2); tube(r2,r3);
    var cb=addV(pc[0],pc[1]-0.0098,pc[2], 0,0, W1(bf), C_COAT,0.82,0,0);
    capRing(r3,cb,false);
    var ct=addV(pc[0],pc[1]+0.0095,pc[2]-0.003, 0,0, W1(bf), C_COAT,1.0,0,0.1);
    capRing(r1,ct,true);
  }
  buildLeg(0); buildLeg(1); buildLeg(2); buildLeg(3);

  /* ============ TAIL — long, fine, whippy, tapering; never plumed ====== */
  (function(){
    var i,rings=[];
    for(i=0;i<=TAIL_N;i++){
      var f=i/TAIL_N, r=lerp(0.0105,0.0032,Math.pow(f,0.85));
      var pJ=TAIL_P0[i];
      var dir=(i<TAIL_N)?norm3(sub3(TAIL_P0[i+1],TAIL_P0[i])):norm3(sub3(TAIL_P0[i],TAIL_P0[i-1]));
      var fr=frameOf(dir);
      var w4=(i===0)?W2(B_PELV,0.5,B_TAIL0):W1(B_TAIL0+Math.min(TAIL_N-1,i));
      rings.push(ring(pJ,fr[0],fr[1],r,r,8,w4,f*4.0,C_COAT,0.98-f*0.06,1,0.55*(1-f*0.65)));
    }
    for(i=0;i<TAIL_N;i++) tube(rings[i],rings[i+1]);
    var tp=TAIL_P0[TAIL_N];
    var ct=addV(tp[0],tp[1]-0.004,tp[2]-0.004, 0,0, W1(B_TAIL0+TAIL_N-1), C_COAT,0.9,1,0.1);
    capRing(rings[TAIL_N],ct,false);
  })();

  /* ---- final skin BufferGeometry ---- */
  var geoSkin=new THREE.BufferGeometry();
  geoSkin.setIndex(G.idx);
  geoSkin.setAttribute('position', new THREE.Float32BufferAttribute(G.p,3));
  geoSkin.setAttribute('uv', new THREE.Float32BufferAttribute(G.uv,2));
  geoSkin.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(G.si,4));
  geoSkin.setAttribute('skinWeight', new THREE.Float32BufferAttribute(G.sw,4));
  geoSkin.computeVertexNormals();
  /* THE FLEECE: a two-scale curl displacement baked into the skin itself,
     so the silhouette is lamb-soft even in silhouette LOD (and the shells,
     built from these positions, inherit the wave). Value noise on the
     rest position — seeded, deterministic, no seams (positional). */
  (function(){
    function lat(ix,iy,iz,salt){ var k=(Math.imul(ix,73856093)^Math.imul(iy,19349663)^Math.imul(iz,83492791))|0; return h01(k,salt); }
    function vn3(x,y,z,salt){
      var ix=Math.floor(x), iy=Math.floor(y), iz=Math.floor(z);
      var fx=x-ix, fy=y-iy, fz=z-iz;
      fx=fx*fx*(3-2*fx); fy=fy*fy*(3-2*fy); fz=fz*fz*(3-2*fz);
      var v000=lat(ix,iy,iz,salt),v100=lat(ix+1,iy,iz,salt),v010=lat(ix,iy+1,iz,salt),v110=lat(ix+1,iy+1,iz,salt);
      var v001=lat(ix,iy,iz+1,salt),v101=lat(ix+1,iy,iz+1,salt),v011=lat(ix,iy+1,iz+1,salt),v111=lat(ix+1,iy+1,iz+1,salt);
      var a=v000+(v100-v000)*fx, b=v010+(v110-v010)*fx, c=v001+(v101-v001)*fx, d=v011+(v111-v011)*fx;
      var e=a+(b-a)*fy, f=c+(d-c)*fy;
      return e+(f-e)*fz;
    }
    var pos=geoSkin.attributes.position.array, nrm=geoSkin.attributes.normal.array, i;
    for(i=0;i<G.n;i++){
      var fw=Math.min(G.fur[i],1); if(fw<=0.05) continue;
      var px=pos[i*3], py=pos[i*3+1], pz=pos[i*3+2];
      var d=(vn3(px*FLEECE_F1,py*FLEECE_F1,pz*FLEECE_F1,95)-0.5)*2*FLEECE_A1
           +(vn3(px*FLEECE_F2,py*FLEECE_F2,pz*FLEECE_F2,96)-0.5)*2*FLEECE_A2;
      d*=fw;
      pos[i*3]+=nrm[i*3]*d; pos[i*3+1]+=nrm[i*3+1]*d; pos[i*3+2]+=nrm[i*3+2]*d;
    }
    geoSkin.computeVertexNormals();
  })();
  /* colours: base * form-shade, then the cool steel rim impression baked in */
  (function(){
    var nrm=geoSkin.attributes.normal.array, col=new Float32Array(G.n*3), i;
    for(i=0;i<G.n;i++){
      var ny=nrm[i*3+1], nx=nrm[i*3], dn=Math.max(0,-ny);
      /* stronger sculptural form: brighter along the spine, a real
         under-shadow beneath belly, chin and inner legs — and the
         shadow is WARM (cream, not grey), so the white stays alive */
      var sh=G.shade[i]*(0.76+0.24*ny)+(rng()*2-1)*0.012;
      var r=G.base[i*3]*sh, g=G.base[i*3+1]*sh*(1-0.020*dn), b=G.base[i*3+2]*sh*(1-0.050*dn);
      var sK=G.steel[i]*(0.26*Math.pow(Math.max(ny,0),1.4)+0.12*nx*nx);
      col[i*3]  =clamp(lerp(r,C_STEEL[0]*(0.88+0.2*Math.max(ny,0)),sK),0,1);
      col[i*3+1]=clamp(lerp(g,C_STEEL[1]*(0.88+0.2*Math.max(ny,0)),sK),0,1);
      col[i*3+2]=clamp(lerp(b,C_STEEL[2]*(0.88+0.2*Math.max(ny,0)),sK),0,1);
    }
    geoSkin.setAttribute('color', new THREE.Float32BufferAttribute(col,3));
  })();

  /* ---- shell geometries: fur verts inflated along the smooth normal;
          outer layers a touch brighter (light lives in the tips) ---- */
  function shellGeo(d,br){
    var pos=geoSkin.attributes.position.array, nrm=geoSkin.attributes.normal.array;
    var col=geoSkin.attributes.color.array;
    var map=new Int32Array(G.n), i, n2=0;
    for(i=0;i<G.n;i++) map[i]=(G.fur[i]>0.05)?n2++:-1;
    var p=new Float32Array(n2*3), c=new Float32Array(n2*3), u=new Float32Array(n2*2);
    var si=new Uint16Array(n2*4), sw=new Float32Array(n2*4), idx=[];
    for(i=0;i<G.n;i++){ var m=map[i]; if(m<0) continue;
      var f=G.fur[i], dd=d*f;
      p[m*3]=pos[i*3]+nrm[i*3]*dd; p[m*3+1]=pos[i*3+1]+nrm[i*3+1]*dd; p[m*3+2]=pos[i*3+2]+nrm[i*3+2]*dd;
      c[m*3]=clamp(col[i*3]*(1.03+br)+0.02,0,1); c[m*3+1]=clamp(col[i*3+1]*(1.03+br)+0.02,0,1); c[m*3+2]=clamp(col[i*3+2]*(1.04+br)+0.04,0,1);
      u[m*2]=G.uv[i*2]; u[m*2+1]=G.uv[i*2+1];
      var k; for(k=0;k<4;k++){ si[m*4+k]=G.si[i*4+k]; sw[m*4+k]=G.sw[i*4+k]; }
    }
    for(i=0;i<G.idx.length;i+=3){
      var a=map[G.idx[i]], b=map[G.idx[i+1]], cc=map[G.idx[i+2]];
      if(a>=0&&b>=0&&cc>=0) idx.push(a,b,cc);
    }
    var gg=new THREE.BufferGeometry();
    gg.setIndex(idx);
    gg.setAttribute('position', new THREE.Float32BufferAttribute(p,3));
    gg.setAttribute('color', new THREE.Float32BufferAttribute(c,3));
    gg.setAttribute('uv', new THREE.Float32BufferAttribute(u,2));
    gg.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si,4));
    gg.setAttribute('skinWeight', new THREE.Float32BufferAttribute(sw,4));
    gg.computeVertexNormals();
    return gg;
  }
  var geoShells=[], gsi;
  for(gsi=0;gsi<SHELL_D.length;gsi++) geoShells.push(shellGeo(SHELL_D[gsi],gsi*0.012));

  /* ---------------- the two canvas textures ---------------- */
  function texFill(sz, fn){
    if(typeof document==='undefined') return null;
    var cv=document.createElement('canvas'); cv.width=sz; cv.height=sz;
    var cx=cv.getContext('2d'); if(!cx||!cx.createImageData) return null;
    var im=cx.createImageData(sz,sz), d=im.data, x,y;
    for(y=0;y<sz;y++) for(x=0;x<sz;x++){ var vv=fn(x/sz,y/sz,x,y), o=(y*sz+x)*4;
      d[o]=vv[0]; d[o+1]=vv[1]; d[o+2]=vv[2]; d[o+3]=255; }
    cx.putImageData(im,0,0);
    var t=new THREE.CanvasTexture(cv); t.wrapS=THREE.RepeatWrapping; t.wrapT=THREE.RepeatWrapping;
    return t;
  }
  /* the BABY-LAMB rex wave: astrakhan — two scales of small curl RINGS,
     centre and radius jittered per cell (periodic lattice, so the wrap
     is seamless), over a soft seeded speckle. alpha only. */
  function curlField(u,v,n,salt,w){
    var cu=u*n, cv=v*n, ix=Math.floor(cu), iy=Math.floor(cv), best=0, dx, dy;
    for(dy=-1;dy<=1;dy++) for(dx=-1;dx<=1;dx++){
      var jx=ix+dx, jy=iy+dy;
      var wx=((jx%n)+n)%n, wy=((jy%n)+n)%n;          /* periodic cell id */
      var kk=wx+wy*257;
      var ox=0.20+0.60*h01(kk,salt), oy=0.20+0.60*h01(kk,salt+1);
      var rr=0.24+0.18*h01(kk,salt+2);
      var px=cu-(jx+ox), py=cv-(jy+oy);
      var dd=Math.sqrt(px*px+py*py);
      var band=1-Math.abs(dd-rr)/w;
      if(band>best) best=band;
    }
    return best>0?best:0;
  }
  var shellTex=texFill(256,function(u,v,x,y){
    var c1=curlField(u,v,13,101,0.40);               /* the little curls */
    var c2=curlField(u,v,7,111,0.48)*0.75;           /* the mother wave */
    var curl=Math.max(c1,c2);
    var gr=h01(x+y*256,91), gr2=h01(x*7+y*3,92);
    var a=clamp(0.16+0.80*Math.pow(curl,1.35),0,1)*(0.50+0.37*gr+0.13*gr2);
    var b=Math.round(clamp(a,0,1)*255);
    return [b,b,b];
  });
  /* the tapetum glint: a soft warm spark */
  var glintTex=texFill(64,function(u,v){
    var dx=u-0.5, dy=v-0.5, r=Math.sqrt(dx*dx+dy*dy)*2;
    var core=Math.pow(Math.max(0,1-r),1.8);
    var star=0.5*Math.pow(Math.max(0,1-Math.abs(dx)*5.5),2.4)*Math.pow(Math.max(0,1-r),0.9)
            +0.5*Math.pow(Math.max(0,1-Math.abs(dy)*5.5),2.4)*Math.pow(Math.max(0,1-r),0.9);
    var a=clamp(core+star*0.6,0,1);
    return [Math.round(255*a),Math.round(232*a),Math.round(168*a)];
  });

  /* ---------------- materials ---------------- */
  var skinMat=new THREE.MeshBasicMaterial({ vertexColors:true, skinning:true });
  var shellMats=[], smi;
  for(smi=0;smi<SHELL_D.length;smi++){
    var sm=new THREE.MeshBasicMaterial({ vertexColors:true, skinning:true, transparent:true,
      opacity:SHELL_O[smi], depthWrite:false });
    if(shellTex) sm.alphaMap=shellTex;
    shellMats.push(sm);
  }
  var whiskMat=new THREE.LineBasicMaterial({ color:0xd8d2c2, transparent:true, opacity:0.42, depthWrite:false });
  var shineMat=new THREE.PointsMaterial({ color:0xffd98a, size:0.046, sizeAttenuation:true,
    transparent:true, opacity:0, depthWrite:false, blending:THREE.AdditiveBlending });
  if(glintTex) shineMat.map=glintTex;

  /* ---------------- bones ----------------
     Rest pose is all-identity rotations, so every bind inverse is a pure
     translation we can write down ourselves — the skeleton never needs a
     world matrix to be born (the local law, kept even at bind time). */
  var bones=[], boneAbs=[], bn=function(name,px,py,pz,parent){
    var b=new THREE.Bone(); b.name='cat_'+name; b.position.set(px,py,pz);
    var ax=px, ay=py, az=pz;
    if(parent){ parent.add(b);
      var pi=bones.indexOf(parent);
      if(pi>=0){ ax+=boneAbs[pi][0]; ay+=boneAbs[pi][1]; az+=boneAbs[pi][2]; }
    }
    bones.push(b); boneAbs.push([ax,ay,az]); return b;
  };
  var bRoot=bn('root',0,0,0,null);
  var bPelv=bn('pelvis',REST.pelvis[0],REST.pelvis[1],REST.pelvis[2],bRoot);
  var bSp1 =bn('spine1',REST.spine1[0],REST.spine1[1],REST.spine1[2],bRoot);
  var bChest=bn('chest',REST.chest[0],REST.chest[1],REST.chest[2],bRoot);
  var bNeck=bn('neck1',REST.neck1[0],REST.neck1[1],REST.neck1[2],bRoot);
  var bHead=bn('head',REST.head[0],REST.head[1],REST.head[2],bRoot);
  var bEarL=bn('earL',REST.earL[0],REST.earL[1],REST.earL[2],bHead);
  var bEarR=bn('earR',REST.earR[0],REST.earR[1],REST.earR[2],bHead);
  var bEyeL=bn('eyeL',REST.eyeL[0],REST.eyeL[1],REST.eyeL[2],bHead);
  var bEyeR=bn('eyeR',REST.eyeR[0],REST.eyeR[1],REST.eyeR[2],bHead);
  var bPupL=bn('pupL',0,0,0,bEyeL);
  var bPupR=bn('pupR',0,0,0,bEyeR);
  var bLidUL=bn('lidUL',REST.eyeL[0],REST.eyeL[1],REST.eyeL[2],bHead);
  var bLidLL=bn('lidLL',REST.eyeL[0],REST.eyeL[1],REST.eyeL[2],bHead);
  var bLidUR=bn('lidUR',REST.eyeR[0],REST.eyeR[1],REST.eyeR[2],bHead);
  var bLidLR=bn('lidLR',REST.eyeR[0],REST.eyeR[1],REST.eyeR[2],bHead);
  var bLegs=[], liB;
  for(liB=0;liB<4;liB++){
    var nm=['FL','FR','HL','HR'][liB];
    bLegs.push([
      bn('u'+nm,LEG_ANC[liB][0],LEG_ANC[liB][1],LEG_ANC[liB][2],bRoot),
      bn('l'+nm,REST_KNEE[liB][0],REST_KNEE[liB][1],REST_KNEE[liB][2],bRoot),
      bn('f'+nm,PAW_ANC[liB][0],PAW_ANC[liB][1],PAW_ANC[liB][2],bRoot)
    ]);
  }
  var bTail=[], tiB;
  for(tiB=0;tiB<TAIL_N;tiB++) bTail.push(bn('tail'+tiB,TAIL_P0[tiB][0],TAIL_P0[tiB][1],TAIL_P0[tiB][2],bRoot));

  var REST_DIR_U=[], REST_DIR_L=[], liD;
  for(liD=0;liD<4;liD++){
    REST_DIR_U.push(new THREE.Vector3().fromArray(sub3(REST_KNEE[liD],LEG_ANC[liD])).normalize());
    REST_DIR_L.push(new THREE.Vector3().fromArray(sub3(PAW_ANC[liD],REST_KNEE[liD])).normalize());
  }
  var REST_TDIR=[], tiD;
  for(tiD=0;tiD<TAIL_N;tiD++) REST_TDIR.push(new THREE.Vector3().fromArray(sub3(TAIL_P0[tiD+1],TAIL_P0[tiD])).normalize());

  /* ---------------- meshes ---------------- */
  var group=new THREE.Group(); group.name='life_cat';
  var skinMesh=new THREE.SkinnedMesh(geoSkin, skinMat); skinMesh.name='cat_skin';
  skinMesh.frustumCulled=false;
  skinMesh.add(bRoot);
  group.add(skinMesh);
  var inverses=[], ivi;
  for(ivi=0;ivi<bones.length;ivi++)
    inverses.push(new THREE.Matrix4().makeTranslation(-boneAbs[ivi][0],-boneAbs[ivi][1],-boneAbs[ivi][2]));
  var skeleton=new THREE.Skeleton(bones, inverses);
  var IDENT=new THREE.Matrix4();
  skinMesh.bind(skeleton, IDENT);
  var shellMs=[], smj;
  for(smj=0;smj<SHELL_D.length;smj++){
    var sM=new THREE.SkinnedMesh(geoShells[smj], shellMats[smj]);
    sM.name='cat_shell'+(smj+1);
    sM.frustumCulled=false; sM.renderOrder=smj+1;
    group.add(sM); sM.bind(skeleton, IDENT);
    shellMs.push(sM);
  }

  /* whiskers — short, sparse, crinkled (a true Devon has almost none) */
  var whisk;
  (function(){
    var P=[], s, wi, si2;
    for(s=-1;s<=1;s+=2){
      for(wi=0;wi<3;wi++){
        var px=s*0.0158, py=-0.0128-wi*0.0035, pz=0.0585;
        var dx=s*(0.72+0.2*rng()), dy=-0.12-0.18*rng()+wi*0.1, dz=0.50+0.2*rng();
        var dl=Math.sqrt(dx*dx+dy*dy+dz*dz); dx/=dl; dy/=dl; dz/=dl;
        var ln=0.040+0.020*rng(), nseg=4, k;
        for(k=0;k<nseg;k++){
          var qx=px+dx*ln/nseg, qy=py+dy*ln/nseg, qz=pz+dz*ln/nseg;
          P.push(px,py,pz, qx,qy,qz);
          px=qx; py=qy; pz=qz;
          var j=(k%2?1:-1)*(0.35+0.5*rng());          /* the crinkle */
          var ny2=dy+j*0.32*(rng()<0.5?1:-1)*0.5+ (k%2?0.22:-0.3);
          var nx2=dx+s*0.14*rng(), nz2=dz-0.12*rng();
          var nl=Math.sqrt(nx2*nx2+ny2*ny2+nz2*nz2)||1; dx=nx2/nl; dy=ny2/nl; dz=nz2/nl;
        }
      }
      /* one brow hair */
      var bx=s*0.0165, by=0.0255, bz=0.0335, bdx=s*0.5, bdy=0.62, bdz=0.3;
      var bl2=Math.sqrt(bdx*bdx+bdy*bdy+bdz*bdz); bdx/=bl2; bdy/=bl2; bdz/=bl2;
      for(si2=0;si2<3;si2++){
        var ex=bx+bdx*0.014, ey=by+bdy*0.014, ez=bz+bdz*0.014;
        P.push(bx,by,bz, ex,ey,ez); bx=ex; by=ey; bz=ez;
        bdy-=0.35; bdx+=s*(si2%2?0.3:-0.2); var bl3=Math.sqrt(bdx*bdx+bdy*bdy+bdz*bdz)||1; bdx/=bl3; bdy/=bl3; bdz/=bl3;
      }
    }
    var g=new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(P,3));
    whisk=new THREE.LineSegments(g, whiskMat); whisk.name='cat_whiskers';
    whisk.frustumCulled=false; whisk.renderOrder=5;
    bHead.add(whisk);
  })();

  /* eyeshine — two additive sparks on the head bone, gated in update */
  var shine;
  (function(){
    var P=[], s;
    for(s=0;s<2;s++){ var F=EYE_F[s], E=s===0?REST.eyeL:REST.eyeR;
      P.push(E[0]+F[0]*0.0208, E[1]+F[1]*0.0208, E[2]+F[2]*0.0208); }
    var g=new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(P,3));
    shine=new THREE.Points(g, shineMat); shine.name='cat_shine';
    shine.frustumCulled=false; shine.renderOrder=6;
    bHead.add(shine);
  })();

  /* rest radius, honest: the farthest rest vertex from the origin */
  var radius=0;
  (function(){ var i,pa=geoSkin.attributes.position.array;
    for(i=0;i<pa.length;i+=3){ var d=Math.sqrt(pa[i]*pa[i]+pa[i+1]*pa[i+1]+pa[i+2]*pa[i+2]); if(d>radius) radius=d; }
    radius=radius*SCALE+0.02;
  })();
  if(SCALE!==1) group.scale.set(SCALE,SCALE,SCALE);

  /* ================= the living state ================= */
  var IDLE_NAMES=['stand','sit','sphinx','groom','stretch','look','nap'];
  var ST={ lastTS:-1, vS:0, phase:0, turnS:0, trotB:0, stalkB:0, gaitW:0,
    flE:0, litE:-1, pupE:-1, gzYaw:0, gzPit:0, eyeYaw:0, eyePit:0, lockE:0,
    earL:0, earR:0, moodSit:0, moodFol:0, tAcc:0, tailMax:0,
    tp:[], tv:[], tf:[], tailT:[], sv:{ gzYaw:0,gzPit:0,eyeYaw:0,eyePit:0,pup:0.5,earL:0,earR:0 } };
  (function(){ var i; for(i=0;i<=TAIL_N;i++){
    ST.tp.push([TAIL_P0[i][0],TAIL_P0[i][1],TAIL_P0[i][2]]);
    ST.tv.push([TAIL_P0[i][0],TAIL_P0[i][1],TAIL_P0[i][2]]);
    ST.tf.push([TAIL_P0[i][0],TAIL_P0[i][1],TAIL_P0[i][2]]);
    ST.tailT.push([TAIL_P0[i][0],TAIL_P0[i][1],TAIL_P0[i][2]]); } })();
  var _vA=new THREE.Vector3(), _vB=new THREE.Vector3(), _vC=new THREE.Vector3(), _vD=new THREE.Vector3();
  var NECK_CTOP=[0,0.030,0.050], NECK_HBASE=[0,-0.020,-0.045];
  var REST_NDIR=new THREE.Vector3(0,0.054,0.022).normalize();
  var SH_OFF=[], liO;
  for(liO=0;liO<4;liO++){ var tr=(liO<2)?REST.chest:REST.pelvis;
    SH_OFF.push([LEG_ANC[liO][0]-tr[0],LEG_ANC[liO][1]-tr[1],LEG_ANC[liO][2]-tr[2]]); }

  /* ---------- pure schedules: identical at identical tS, any path ------- */
  function pickIdle(k){ if(k<0) k=0; var r=h01(k,11);
    if(r<0.24) return 0; if(r<0.44) return 1; if(r<0.59) return 2;
    if(r<0.71) return 3; if(r<0.80) return 4; if(r<0.90) return 5; return 6; }
  function blinkCover(tS){
    var k=Math.floor(tS/BLINK_WIN), r=h01(k,23);
    if(r>=BLINK_P) return 0;
    var slow=r>BLINK_P*0.8;
    var off=(0.12+0.5*h01(k,29))*BLINK_WIN, d=slow?0.92:0.34, amp=slow?0.55:1.0;
    var u=(tS-k*BLINK_WIN-off)/d;
    if(u<=0||u>=1) return 0;
    return (u<0.42? sm01(u/0.42) : 1-sm01((u-0.42)/0.58))*amp;
  }
  function earFlick(tS,side){
    var per=2.3, k=Math.floor(tS/per+side*0.37), r=h01(k,61+side);
    if(r>=0.18) return 0;
    var t0=(k-side*0.37)*per+0.2+1.6*h01(k,65+side);
    var u=(tS-t0)/0.13;
    if(u<=0||u>=1) return 0;
    return Math.sin(u*Math.PI)*0.35;
  }

  /* ---------- the idle suite: pure poses of (seed, k, p, tS) ---------- */
  function mkPose(){ return { pH:0,pPit:0,pZ:0,pX:0, cH:0,cPit:0,cZ:0,
    hX:0,hY:0,hZ:0,hYaw:0,hPit:0,hRoll:0,
    paw:[[0,0,0],[0,0,0],[0,0,0],[0,0,0]], fp:[0,0,0,0],
    tLift:0,tWrap:0,tSway:1,tUp:0, wipe:0,wipeSide:1, doze:0 }; }
  var poseA=mkPose(), poseB=mkPose(), P0=mkPose();
  function poseIdle(type,k,p,tS,o){
    var i;
    o.pH=0; o.pPit=0; o.pZ=0; o.pX=0.004*(vn1(tS,7.7,15)*2-1);
    o.cH=0; o.cPit=0; o.cZ=0;
    o.hX=0.003*(vn1(tS,6.1,16)*2-1); o.hY=0.002*(vn1(tS,5.3,17)*2-1); o.hZ=0;
    o.hYaw=0; o.hPit=0; o.hRoll=0;
    for(i=0;i<4;i++){ o.paw[i][0]=PAW_ANC[i][0]; o.paw[i][1]=0.012; o.paw[i][2]=PAW_ANC[i][2]; o.fp[i]=0; }
    o.tLift=0; o.tWrap=0; o.tSway=1; o.tUp=0; o.wipe=0; o.wipeSide=1; o.doze=0;
    if(type===1||type===3){                          /* sit tall (groom sits too) */
      var sd=(h01(k,17)<0.5)?1:-1;
      o.pH=-0.162; o.pPit=-1.12; o.pZ=-0.034;
      o.cH=0.030; o.cPit=0.62; o.cZ=-0.074;
      o.hY=0.048; o.hZ=-0.062;
      o.paw[0][2]=0.085; o.paw[1][2]=0.085;
      o.paw[2][0]=0.070; o.paw[3][0]=-0.070;
      o.paw[2][2]=-0.078; o.paw[3][2]=-0.078;
      o.tLift=-0.55; o.tWrap=1.7*sd; o.tSway=0.45;
      if(type===3){                                  /* groom: a paw over an ear */
        var gw=sm01((p-0.13)/0.10)*(1-sm01((p-0.80)/0.10));
        o.wipe=gw; o.wipeSide=sd;
        o.hPit=0.34*gw; o.hRoll=-sd*0.30*gw;
        o.hY-=0.030*gw;
        var wob=Math.sin(tS*TAU*1.35);
        o.hPit+=0.06*gw*wob;
      }
    } else if(type===2){                             /* sphinx loaf */
      o.pH=-0.150; o.pPit=-0.22; o.cH=-0.140; o.cPit=0.06; o.cZ=0.004;
      o.hY=-0.072; o.hZ=0.008; o.hPit=0.05;
      o.paw[0][2]=0.108; o.paw[1][2]=0.108; o.fp[0]=-1.1; o.fp[1]=-1.1;
      o.paw[0][0]=0.040; o.paw[1][0]=-0.040;
      o.paw[2][2]=-0.098; o.paw[3][2]=-0.098; o.paw[2][0]=0.066; o.paw[3][0]=-0.066;
      o.tLift=-0.62; o.tWrap=1.9*((h01(k,18)<0.5)?1:-1); o.tSway=0.32;
    } else if(type===4){                             /* the long stretch */
      var s1=sm01(p/0.30)*(1-sm01((p-0.60)/0.32));
      o.pH=0.026*s1; o.pPit=-0.30*s1; o.pZ=-0.012*s1;
      o.cH=-0.112*s1; o.cPit=0.10*s1; o.cZ=0.020*s1;
      o.hY=-0.108*s1; o.hZ=0.048*s1; o.hPit=0.30*s1;
      o.paw[0][2]=0.150+0.128*s1; o.paw[1][2]=0.150+0.128*s1;
      o.fp[0]=-0.5*s1; o.fp[1]=-0.5*s1;
      o.tLift=0.85*s1; o.tSway=0.7;
    } else if(type===5){                             /* slow look-around */
      o.hYaw=0.62*(vn1(tS,3.9,19)*2-1);
      o.hPit=0.16*(vn1(tS,5.2,20)*2-1);
      o.hRoll=0.06*(vn1(tS,6.8,21)*2-1);
    } else if(type===6){                             /* the CATNAP — she folds
        into a loaf, head sinks (the rest in update, doze-driven), lids
        close as geometry, breath slows deep; ~9 s with soft ends */
      var sd6=(h01(k,19)<0.5)?1:-1;
      var e6=sm01((p-0.10)/0.14)*(1-sm01((p-0.84)/0.12));
      o.pH=-0.150*e6; o.pPit=-0.20*e6;
      o.cH=-0.142*e6; o.cPit=0.05*e6; o.cZ=0.004*e6;
      o.hY=-0.062*e6+0.0045*Math.sin(TAU*(tS*0.21))*e6;
      o.hZ=0.012*e6; o.hPit=0.10*e6;
      o.hYaw=0.20*sd6*e6; o.hRoll=0.09*sd6*e6;
      o.paw[0][0]=lerp(o.paw[0][0],0.040,e6); o.paw[0][2]=lerp(o.paw[0][2],0.106,e6); o.fp[0]=-1.1*e6;
      o.paw[1][0]=lerp(o.paw[1][0],-0.040,e6); o.paw[1][2]=lerp(o.paw[1][2],0.106,e6); o.fp[1]=-1.1*e6;
      o.paw[2][0]=lerp(o.paw[2][0],0.066,e6); o.paw[2][2]=lerp(o.paw[2][2],-0.098,e6);
      o.paw[3][0]=lerp(o.paw[3][0],-0.066,e6); o.paw[3][2]=lerp(o.paw[3][2],-0.098,e6);
      o.tLift=-0.62*e6; o.tWrap=2.1*sd6*e6; o.tSway=lerp(1,0.15,e6);
      o.doze=e6;
    }
  }
  function mixPose(a,b,t,o){
    var i,j;
    o.pH=lerp(a.pH,b.pH,t); o.pPit=lerp(a.pPit,b.pPit,t); o.pZ=lerp(a.pZ,b.pZ,t); o.pX=lerp(a.pX,b.pX,t);
    o.cH=lerp(a.cH,b.cH,t); o.cPit=lerp(a.cPit,b.cPit,t); o.cZ=lerp(a.cZ,b.cZ,t);
    o.hX=lerp(a.hX,b.hX,t); o.hY=lerp(a.hY,b.hY,t); o.hZ=lerp(a.hZ,b.hZ,t);
    o.hYaw=lerp(a.hYaw,b.hYaw,t); o.hPit=lerp(a.hPit,b.hPit,t); o.hRoll=lerp(a.hRoll,b.hRoll,t);
    for(i=0;i<4;i++){ for(j=0;j<3;j++) o.paw[i][j]=lerp(a.paw[i][j],b.paw[i][j],t);
      o.fp[i]=lerp(a.fp[i],b.fp[i],t); }
    o.tLift=lerp(a.tLift,b.tLift,t); o.tWrap=lerp(a.tWrap,b.tWrap,t);
    o.tSway=lerp(a.tSway,b.tSway,t); o.tUp=lerp(a.tUp,b.tUp,t);
    o.wipe=lerp(a.wipe,b.wipe,t); o.wipeSide=t<0.5?a.wipeSide:b.wipeSide;
    o.doze=lerp(a.doze,b.doze,t);
  }

  /* ---------- tail carriage targets (pure of inputs given) ---------- */
  function tailTargets(tS,pose,upW,gaitW,phase,stalkB,red,ax,ay,az,out){
    var i, px=ax, py=ay, pz=az, mo=red?0.6:1.0;
    var wag=0.10*gaitW, nz=vn1(tS,1.15,71)*2-1, nz2=vn1(tS,2.9,72)*2-1;
    /* the seated tip-flick: a cat's tail tip TWITCHES while she sits —
       hashed windows, pure of tS, so any scrub replays it */
    var fk=Math.floor(tS/2.7), fr2=h01(fk,73), flick=0;
    if(fr2<0.32){ var fu=(tS-fk*2.7-(0.25+1.5*h01(fk,74)))/0.45;
      if(fu>0&&fu<1) flick=Math.sin(Math.PI*fu)*(1-gaitW)*mo; }
    var fSd=(h01(fk,75)<0.5)?1:-1;
    for(i=0;i<TAIL_N;i++){
      var f=i/(TAIL_N-1);
      var pitR=-0.80+1.05*Math.pow(f,1.5)+pose.tLift*(0.25+0.75*f);
      var pitU=0.35+1.9*f-1.35*f*f;
      var pit=lerp(pitR,pitU,upW);
      pit+=stalkB*(0.35*Math.pow(f,3)*Math.sin(TAU*(tS*2.6))-0.45*(1-f));
      pit+=0.30*flick*Math.pow(f,3);
      var yaw=pose.tWrap*f*1.15
        + pose.tSway*mo*(0.30*nz*Math.pow(f,1.2)+0.10*nz2*f)
        + wag*Math.sin(phase*TAU-f*2.2)
        + 0.85*flick*fSd*Math.pow(f,2.6)
        + 0.05*mo*Math.sin(TAU*(tS*0.53)+f*2.6);
      var cp=Math.cos(pit), sl=TAIL_SEG[i];
      px+=Math.sin(yaw)*cp*sl; py+=Math.sin(pit)*sl; pz+=-Math.cos(yaw)*cp*sl;
      out[i+1][0]=px; out[i+1][1]=py; out[i+1][2]=pz;
    }
    out[0][0]=ax; out[0][1]=ay; out[0][2]=az;
  }
  function ikPose(li,AX,AY,AZ,px,py,pz,fp){
    var l1=LEG_L1[li], l2=LEG_L2[li], bend=LEG_BEND[li];
    var dx=px-AX, dy=py-AY, dz=pz-AZ, d=Math.sqrt(dx*dx+dy*dy+dz*dz);
    var dMax=l1+l2-0.0025, dMin=Math.abs(l1-l2)+0.004, s;
    if(d>dMax){ s=dMax/d; dx*=s; dy*=s; dz*=s; d=dMax; px=AX+dx; py=AY+dy; pz=AZ+dz; }
    if(d<dMin){ s=dMin/(d||1e-6); dx*=s; dy*=s; dz*=s; d=dMin; px=AX+dx; py=AY+dy; pz=AZ+dz; }
    var ux=dx/d, uy=dy/d, uz=dz/d;
    var bd=bend[2]*uz+bend[1]*uy+bend[0]*ux;
    var qx=bend[0]-bd*ux, qy=bend[1]-bd*uy, qz=bend[2]-bd*uz;
    var ql=Math.sqrt(qx*qx+qy*qy+qz*qz);
    if(ql<1e-6){ qx=0; qy=1; qz=0; ql=1; }
    qx/=ql; qy/=ql; qz/=ql;
    var a=(l1*l1-l2*l2+d*d)/(2*d), h2v=l1*l1-a*a, h=h2v>0?Math.sqrt(h2v):0;
    var kx=AX+ux*a+qx*h, ky=AY+uy*a+qy*h, kz=AZ+uz*a+qz*h;
    var bU=bLegs[li][0], bL=bLegs[li][1], bF=bLegs[li][2];
    bU.position.set(AX,AY,AZ);
    _vA.set(kx-AX,ky-AY,kz-AZ).normalize();
    bU.quaternion.setFromUnitVectors(REST_DIR_U[li],_vA);
    bL.position.set(kx,ky,kz);
    _vA.set(px-kx,py-ky,pz-kz).normalize();
    bL.quaternion.setFromUnitVectors(REST_DIR_L[li],_vA);
    bF.position.set(px,py,pz);
    bF.rotation.set(fp,0,0);
  }

  var ud={ tS:0, phase:0, duty:DUTY_WALK, stride:STRIDE, vS:0, gaitW:0,
    idleK:0, idleName:'stand', idleBlend:0, lidCover:0, pupil:0.5, blink:0,
    stance:[true,true,true,true], pawY:[0,0,0,0], shineOp:0, silF:0, tailMax:0,
    trotB:0, stalkB:0, gzYaw:0, gzPit:0, offsets:[0,0.25,0.5,0.75] };
  ud.lidRange=LID_RANGE; ud.eyeRad=EYE_R;
  ud.eyeLC=REST.eyeL; ud.eyeRC=REST.eyeR; ud.eyeLF=EYE_F[0]; ud.eyeRF=EYE_F[1];
  ud.tailN=TAIL_N; ud.anchors={F:BODY_L/2,H:-BODY_L/2};
  group.userData.cat=ud;
  var lastEnvMood='walk';

  function update(env){
    env=env||{};
    var tS=env.tS||0;
    var dt=(ST.lastTS<0)?0.0166:clamp(tS-ST.lastTS,0,0.05); ST.lastTS=tS;
    var red=!!env.reduced, mo=red?0.62:1.0;
    var lit=(env.lit===undefined)?0.5:clamp(env.lit,0,1);
    var fl=env.fl||0, dist=(env.dist===undefined)?5:env.dist;
    var mood=env.mood||lastEnvMood; lastEnvMood=mood;
    var kv;

    /* --- eased senses (bounded, continuous) --- */
    var vTgt=Math.max(0,env.speed||0);
    var accel=vTgt-ST.vS;
    ST.vS+=accel*(1-Math.exp(-dt*7));
    kv=sm01((ST.vS-TROT_V0)/(TROT_V1-TROT_V0)); ST.trotB+=(kv-ST.trotB)*(1-Math.exp(-dt*5));
    kv=(mood==='stalk'&&ST.vS>0.02)?1:0; ST.stalkB+=(kv-ST.stalkB)*(1-Math.exp(-dt*2.2));
    ST.turnS+=((env.turn||0)-ST.turnS)*(1-Math.exp(-dt*6));
    if(ST.litE<0) ST.litE=lit; ST.litE+=(lit-ST.litE)*(1-Math.exp(-dt*4));
    if(fl>ST.flE) ST.flE+=(fl-ST.flE)*(1-Math.exp(-dt*22)); else ST.flE*=Math.exp(-dt*1.4);
    kv=(mood==='sit')?1:0; ST.moodSit+=(kv-ST.moodSit)*(1-Math.exp(-dt*1.8));
    kv=(mood==='follow')?1:0; ST.moodFol+=(kv-ST.moodFol)*(1-Math.exp(-dt*1.5));

    /* --- gait core: phase INTEGRATES env speed --- */
    var duty=DUTY_WALK+(DUTY_TROT-DUTY_WALK)*ST.trotB+0.09*ST.stalkB;
    var stride=STRIDE*(1+(TROT_STRIDE-1)*ST.trotB)*(1-0.35*ST.stalkB);
    ST.phase+=ST.vS*dt/stride; ST.phase-=Math.floor(ST.phase);
    var phase=ST.phase;
    ST.gaitW=sm01(ST.vS/0.12); var gaitW=ST.gaitW;
    var crouch=WALK_CROUCH*gaitW+0.030*ST.stalkB+0.010*Math.min(1,Math.abs(ST.turnS))*gaitW;
    var ampV=0.72+0.5*Math.min(ST.vS,2.4)/1.2;
    var bobA=BOB_A*ampV*gaitW*mo, bobPh=phase*TAU*2;
    var bobY=bobA*Math.sin(bobPh+0.4);
    var swayX=0.0065*gaitW*mo*Math.sin(phase*TAU);
    var roll=0.045*gaitW*mo*Math.sin(phase*TAU+0.5)*(1-0.5*ST.trotB);
    var cYaw=0.055*gaitW*mo*Math.sin(phase*TAU+Math.PI)*(1-0.4*ST.trotB);
    var pitchOsc=0.020*gaitW*mo*Math.sin(bobPh+1.2);
    var lean=clamp(accel*0.11,-0.16,0.16)*gaitW-0.10*ST.stalkB;
    var bank=clamp(ST.turnS*(0.06+0.05*Math.min(ST.vS,2)),-0.16,0.16);
    var hYawT=clamp(ST.turnS*0.30,-0.45,0.45), cYawT=clamp(ST.turnS*0.10,-0.2,0.2);

    /* --- idle suite (pure schedule) blended with locomotion --- */
    var ik=Math.floor(Math.max(0,tS)/IDLE_PER), ip=(Math.max(0,tS)-ik*IDLE_PER)/IDLE_PER;
    var cur=pickIdle(ik), prev=pickIdle(ik-1);
    var ibl=sm01(ip*IDLE_PER/2.4);
    poseIdle(prev,ik-1,1,tS,poseA);
    poseIdle(cur,ik,ip,tS,poseB);
    mixPose(poseA,poseB,ibl,P0);
    if(ST.moodSit>0.001){ var dzKeep=P0.doze; poseIdle(1,ik,ip,tS,poseA); mixPose(P0,poseA,ST.moodSit,P0);
      P0.doze=dzKeep; }                              /* she may doze off SEATED — the wait is where naps live */
    var idleW=1-gaitW;
    /* while she walks, the idle pose relaxes toward stand */
    var pw=idleW;
    P0.pH*=pw; P0.pPit*=pw; P0.pZ*=pw; P0.pX*=pw; P0.cH*=pw; P0.cPit*=pw; P0.cZ*=pw;
    P0.hX*=pw; P0.hY=P0.hY*pw; P0.hZ*=pw; P0.hYaw*=pw; P0.hPit*=pw; P0.hRoll*=pw;
    P0.tLift*=pw; P0.tWrap*=pw; P0.wipe*=pw; P0.doze*=pw;   /* walking wakes her */
    P0.tSway=lerp(1,P0.tSway,pw);
    var wake=1-P0.doze;

    /* --- body bones --- */
    var pelvX=swayX*0.85+P0.pX, pelvY=REST.pelvis[1]+P0.pH-crouch+bobY*0.85, pelvZ=REST.pelvis[2]+P0.pZ;
    var chX=swayX, chY=REST.chest[1]+P0.cH-crouch*1.1+bobY, chZ=REST.chest[2]+P0.cZ;
    bPelv.position.set(pelvX,pelvY,pelvZ);
    bPelv.rotation.set(P0.pPit+pitchOsc*0.7, -cYaw*0.85-ST.turnS*0.04, roll*0.9+bank);
    bChest.position.set(chX,chY,chZ);
    bChest.rotation.set(P0.cPit+pitchOsc+lean, cYaw+cYawT, roll+bank);
    var br=1+(0.015+0.007*Math.min(ST.vS,2))*(1+0.9*P0.doze)*Math.sin(TAU*(tS*0.42))+0.006*(env.pW||0);
    bChest.scale.set(br,br,1);
    bSp1.position.set((pelvX+chX)*0.5+0.009*gaitW*mo*Math.sin(phase*TAU+HPI),(pelvY+chY)*0.5,REST.spine1[2]+(P0.pZ+P0.cZ)*0.5);
    bSp1.quaternion.copy(bPelv.quaternion).slerp(bChest.quaternion,0.5);

    /* --- gaze + head (stabilized: it takes only HEAD_STAB of the bob) --- */
    var gx=env.gazeAt||null, tgYaw=0, tgPit=0, hasG=false, faceDot=0;
    var headX=REST.head[0]+P0.hX+swayX*HEAD_STAB;
    var headY=REST.head[1]+P0.hY-crouch*0.9+bobY*HEAD_STAB-0.085*ST.stalkB-0.050*P0.doze;
    var headZ=REST.head[2]+P0.hZ+0.030*ST.stalkB;
    if(gx&&gx.isVector3){ hasG=true;
      var ddx=gx.x-headX, ddy=gx.y-headY, ddz=gx.z-headZ;
      var hh=Math.sqrt(ddx*ddx+ddz*ddz)||1e-6;
      tgYaw=Math.atan2(ddx,ddz); tgPit=Math.atan2(ddy,hh);
      var dl=Math.sqrt(ddx*ddx+ddy*ddy+ddz*ddz)||1e-6;
      faceDot=ddz/dl;                                /* facing along her +Z toward the mark */
    }
    var wk=Math.floor(tS/7.5);
    var lockT=(hasG&&(h01(wk,41)<0.62||ST.moodFol>0.5)&&P0.doze<0.5)?1:0;   /* asleep, she locks on no one */
    ST.lockE+=(lockT-ST.lockE)*(1-Math.exp(-dt*3));
    var wYaw=0.45*(vn1(tS,5.1,51)*2-1)*(0.25+0.75*idleW)*wake;
    var wPit=0.16*(vn1(tS,6.7,52)*2-1)*(0.25+0.75*idleW)*wake;
    var gzYawT=lerp(wYaw,clamp(tgYaw,-1.05,1.05),ST.lockE);
    var gzPitT=lerp(wPit,clamp(tgPit,-0.55,0.6),ST.lockE);
    ST.gzYaw+=(gzYawT-ST.gzYaw)*(1-Math.exp(-dt*2.4));
    ST.gzPit+=(gzPitT-ST.gzPit)*(1-Math.exp(-dt*2.4));
    /* micro-saccades: the eyes DART in small hashed steps (the fast ease
       below turns each step into a flick) — half-suppressed on a lock */
    var sacK=Math.floor(tS/0.9), sacA=(red?0.5:1)*(1-0.55*ST.lockE)*wake;
    var eyeYawT=clamp(lerp(wYaw*0.35,clamp(tgYaw,-1.2,1.2),ST.lockE)-ST.gzYaw+0.055*sacA*(h01(sacK,81)*2-1),-0.55,0.55);
    var eyePitT=clamp(lerp(wPit*0.35,clamp(tgPit,-0.7,0.7),ST.lockE)-ST.gzPit+0.034*sacA*(h01(sacK,82)*2-1),-0.42,0.42);
    ST.eyeYaw+=(eyeYawT-ST.eyeYaw)*(1-Math.exp(-dt*9));
    ST.eyePit+=(eyePitT-ST.eyePit)*(1-Math.exp(-dt*9));
    bHead.position.set(headX,headY,headZ);
    bHead.rotation.set(P0.hPit+ST.gzPit*0.7+0.20*ST.stalkB+0.16*P0.doze, P0.hYaw+ST.gzYaw+hYawT, P0.hRoll-0.5*(roll+bank));
    bEyeL.rotation.set(-ST.eyePit,ST.eyeYaw,0);
    bEyeR.rotation.set(-ST.eyePit,ST.eyeYaw,0);
    /* neck follows the two ends it serves */
    _vA.set(NECK_CTOP[0],NECK_CTOP[1],NECK_CTOP[2]).applyQuaternion(bChest.quaternion);
    var ctx2=chX+_vA.x, cty=chY+_vA.y, ctz=chZ+_vA.z;
    _vA.set(NECK_HBASE[0],NECK_HBASE[1],NECK_HBASE[2]).applyQuaternion(bHead.quaternion);
    var hbx=headX+_vA.x, hby=headY+_vA.y, hbz=headZ+_vA.z;
    bNeck.position.set((ctx2+hbx)*0.5,(cty+hby)*0.5,(ctz+hbz)*0.5);
    _vA.set(hbx-ctx2,hby-cty,hbz-ctz).normalize();
    bNeck.quaternion.setFromUnitVectors(REST_NDIR,_vA);

    /* --- ears: independent swivel, flatten on the flare --- */
    var earT=clamp((hasG?tgYaw:wYaw)*0.7,-0.6,0.6)*(1-0.7*P0.doze);
    var fkL=(red?0:earFlick(tS,0))*(1-0.5*P0.doze), fkR=(red?0:earFlick(tS,1))*(1-0.5*P0.doze);
    ST.earL+=((earT+fkL)-ST.earL)*(1-Math.exp(-dt*12));
    ST.earR+=((earT-fkR)-ST.earR)*(1-Math.exp(-dt*12));
    var efl=ST.flE*mo;
    bEarL.rotation.set(-1.02*efl+0.03*gaitW*Math.sin(bobPh)+0.12*ST.gzPit+0.30*P0.doze, ST.earL*(1-0.7*efl), 0.85*efl+0.18*P0.doze);
    bEarR.rotation.set(-1.02*efl+0.03*gaitW*Math.sin(bobPh+0.4)+0.12*ST.gzPit+0.30*P0.doze, ST.earR*(1-0.7*efl), -0.85*efl-0.18*P0.doze);

    /* --- lids close as GEOMETRY; pupils obey the dark --- */
    var cv=blinkCover(tS);
    cv=clamp(cv+0.16*ST.flE+(0.03*ST.moodSit+0.97*P0.doze)*(1-cv),0,1);
    bLidUL.rotation.x=0.78*cv; bLidUR.rotation.x=0.78*cv;
    bLidLL.rotation.x=-0.40*cv; bLidLR.rotation.x=-0.40*cv;
    var lidCover=clamp((0.78+0.40)*cv/1.02,0,1);
    var apT=(PUP_MIN+(1-PUP_MIN)*Math.pow(1-lit,PUP_GAMMA))*(1-0.22*ST.flE);
    if(ST.pupE<0) ST.pupE=apT;
    ST.pupE+=(apT-ST.pupE)*(1-Math.exp(-dt*9));
    var hwRad=0.045+0.285*ST.pupE, psc=hwRad/PUP_W0;
    bPupL.scale.set(psc,1,1); bPupR.scale.set(psc,1,1);

    /* --- legs: idle targets vs gait targets, one continuous mix --- */
    var i2;
    var sweep=duty*stride, lift=(0.034+0.013*ST.trotB)*(1-0.55*ST.stalkB);
    for(i2=0;i2<4;i2++){
      var oW=[0.25,0.75,0.0,0.5][i2], oT=[0.5,1.0,0.0,0.5][i2];
      var off=lerp(oW,oT,ST.trotB);
      ud.offsets[i2]=off;
      var cyc=phase-off; cyc-=Math.floor(cyc);
      /* cats walk nearly SINGLE-TRACK: paws pull toward the midline as
         the gait takes over (trot a touch wider, stalk narrower) */
      var track=1-0.34*gaitW*(1-0.28*ST.trotB)-0.06*ST.stalkB;
      var zRel, py2, fpG=0, shape, inw=0;
      if(cyc<duty){ var s2=cyc/duty; shape=0.5-s2; zRel=sweep*shape; py2=0.012;
        /* toe-down settle at touchdown, heel-up push-off at stance end */
        fpG=0.10*(1-sm01(s2/0.22))-0.26*sm01((s2-0.68)/0.32); }
      else{ var u2=(cyc-duty)/(1-duty), e2=u2*u2*(3-2*u2);
        shape=-0.5+e2; zRel=sweep*shape;
        /* swing arc peaks EARLY and lands soft; the paw folds through,
           unfolds to meet the ground; a small inward arc mid-swing.
           end values chain the stance ends exactly — no snap (law 6) */
        py2=0.012+lift*Math.sin(Math.PI*Math.pow(u2,0.80));
        inw=0.12*Math.sin(Math.PI*u2);
        fpG=lerp(-0.26,0.10,sm01((u2-0.55)/0.45))-0.24*Math.sin(Math.PI*u2); }
      var gxp=PAW_ANC[i2][0]*(track-inw), gyp=py2, gzp=PAW_ANC[i2][2]+zRel;
      var tx=lerp(P0.paw[i2][0],gxp,gaitW), ty=lerp(P0.paw[i2][1],gyp,gaitW), tz=lerp(P0.paw[i2][2],gzp,gaitW);
      var fpv=lerp(P0.fp[i2],fpG,gaitW);
      /* groom: one fore paw rises to the ear it serves */
      if(P0.wipe>0.001&&i2===(P0.wipeSide>0?0:1)){
        var wob2=TAU*(tS*1.35);
        var wx=headX+P0.wipeSide*0.046, wy=headY-0.004+0.016*Math.sin(wob2), wz=headZ+0.020+0.008*Math.cos(wob2);
        tx=lerp(tx,wx,P0.wipe); ty=lerp(ty,wy,P0.wipe); tz=lerp(tz,wz,P0.wipe);
        fpv=lerp(fpv,-1.25,P0.wipe);
      }
      /* the anchor rides its trunk bone; fore shoulders glide with the
         reach, and the scapula RISES as its leg takes the load — the
         walking shoulder-blade roll every cat shows */
      var qq=(i2<2)?bChest.quaternion:bPelv.quaternion;
      var scap=((i2<2)?0.0070:0.0042)*gaitW*mo*Math.cos(TAU*(cyc-duty*0.5));
      _vA.set(SH_OFF[i2][0],SH_OFF[i2][1]+scap,SH_OFF[i2][2]+((i2<2)?0.18*zRel*gaitW:0)).applyQuaternion(qq);
      var AX=((i2<2)?chX:pelvX)+_vA.x, AY=((i2<2)?chY:pelvY)+_vA.y, AZ=((i2<2)?chZ:pelvZ)+_vA.z;
      ikPose(i2,AX,AY,AZ,tx,ty,tz,fpv);
      ud.stance[i2]=(gaitW<0.5)?true:(cyc<duty);
      ud.pawY[i2]=ty;
    }

    /* --- the tail: sprung chain under LOCAL gravity --- */
    var upW=clamp(ST.moodFol+ST.lockE*0.5*(1-ST.stalkB)-ST.stalkB*0.5,0,1)*(1-0.55*P0.tWrap*P0.tWrap);
    upW=clamp(upW+P0.tUp,0,1);
    _vA.set(REST.tail0[0]-REST.pelvis[0],REST.tail0[1]-REST.pelvis[1],REST.tail0[2]-REST.pelvis[2]).applyQuaternion(bPelv.quaternion);
    var tax=pelvX+_vA.x, tay=pelvY+_vA.y, taz=pelvZ+_vA.z;
    tailTargets(tS,P0,upW,gaitW,phase,ST.stalkB,red,tax,tay,taz,ST.tailT);
    ST.tAcc=Math.min(ST.tAcc+dt,0.05);
    var hstep=1/120, maxFrame=0, it, jj;
    for(it=0;it<=TAIL_N;it++){ ST.tf[it][0]=ST.tp[it][0]; ST.tf[it][1]=ST.tp[it][1]; ST.tf[it][2]=ST.tp[it][2]; }
    while(ST.tAcc>=hstep){
      ST.tAcc-=hstep;
      for(it=1;it<=TAIL_N;it++){
        var p=ST.tp[it], pv=ST.tv[it], tg=ST.tailT[it];
        var f2=it/TAIL_N, kk=TAIL_K*(1.35-f2*0.8);
        var vx=(p[0]-pv[0])*TAIL_DAMP, vy=(p[1]-pv[1])*TAIL_DAMP, vz=(p[2]-pv[2])*TAIL_DAMP;
        pv[0]=p[0]; pv[1]=p[1]; pv[2]=p[2];
        var axv=kk*(tg[0]-p[0]), ayv=kk*(tg[1]-p[1])-TAIL_G, azv=kk*(tg[2]-p[2]);
        p[0]+=vx+axv*hstep*hstep; p[1]+=vy+ayv*hstep*hstep; p[2]+=vz+azv*hstep*hstep;
      }
      ST.tp[0][0]=tax; ST.tp[0][1]=tay; ST.tp[0][2]=taz;
      ST.tv[0][0]=tax; ST.tv[0][1]=tay; ST.tv[0][2]=taz;
      for(jj=0;jj<2;jj++){
        for(it=1;it<=TAIL_N;it++){
          var p0=ST.tp[it-1], p1=ST.tp[it];
          var ddx2=p1[0]-p0[0], ddy2=p1[1]-p0[1], ddz2=p1[2]-p0[2];
          var dl2=Math.sqrt(ddx2*ddx2+ddy2*ddy2+ddz2*ddz2)||1e-6;
          var er=(dl2-TAIL_SEG[it-1])/dl2, w0=(it===1)?0:0.5, w1=(it===1)?1:0.5;
          p0[0]+=ddx2*er*w0; p0[1]+=ddy2*er*w0; p0[2]+=ddz2*er*w0;
          p1[0]-=ddx2*er*w1; p1[1]-=ddy2*er*w1; p1[2]-=ddz2*er*w1;
        }
      }
    }
    for(it=0;it<=TAIL_N;it++){
      var pa=ST.tp[it];
      if(it<TAIL_N){
        var pb=ST.tp[it+1];
        bTail[it].position.set(pa[0],pa[1],pa[2]);
        _vA.set(pb[0]-pa[0],pb[1]-pa[1],pb[2]-pa[2]).normalize();
        bTail[it].quaternion.setFromUnitVectors(REST_TDIR[it],_vA);
      }
      var mx=pa[0]-ST.tf[it][0], my=pa[1]-ST.tf[it][1], mz=pa[2]-ST.tf[it][2];
      var mv=Math.sqrt(mx*mx+my*my+mz*mz);
      if(mv>maxFrame) maxFrame=mv;
    }
    ST.tailMax=maxFrame;

    /* --- LOD, coat, senses of the skin --- */
    var silF=sm01((dist-12)/2);
    var litK=0.30+0.70*Math.pow(ST.litE,0.75);
    skinMat.color.setScalar(litK);
    var shk;
    for(shk=0;shk<shellMats.length;shk++){
      /* outer layers release a little sooner — the coat thins with range */
      var sf=(1-sm01((dist-(SHELL_F0-shk*0.7))/(SHELL_F1-SHELL_F0)))*(red?0:1);
      shellMats[shk].opacity=SHELL_O[shk]*sf;
      shellMats[shk].color.setScalar(litK);
      shellMs[shk].visible=shellMats[shk].opacity>0.004;
    }
    var wf=(1-sm01((dist-5)/4));
    whiskMat.opacity=0.42*wf*litK; whisk.visible=wf>0.01;
    var face=0.45;
    if(hasG){ _vA.set(0,0,1).applyQuaternion(bHead.quaternion);
      _vB.set(gx.x-headX,gx.y-headY,gx.z-headZ).normalize();
      face=sm01((_vA.dot(_vB)-0.15)/0.45); }
    var shineOp=red?0:SHINE*Math.pow(1-lit,1.5)*face*Math.pow(1-lidCover,3)*sm01((dist-1.2)/1.5);
    shineMat.opacity=clamp(shineOp,0,1); shine.visible=shineMat.opacity>0.004;

    /* --- save for reset + surface for the hub/harness --- */
    ST.sv.gzYaw=gzYawT; ST.sv.gzPit=gzPitT; ST.sv.eyeYaw=eyeYawT; ST.sv.eyePit=eyePitT;
    ST.sv.pup=apT; ST.sv.earL=earT; ST.sv.earR=earT;
    ud.tS=tS; ud.phase=phase; ud.duty=duty; ud.stride=stride; ud.vS=ST.vS; ud.gaitW=gaitW;
    ud.idleK=ik; ud.idleName=IDLE_NAMES[cur]; ud.idleBlend=ibl;
    ud.lidCover=lidCover; ud.pupil=ST.pupE; ud.blink=cv; ud.doze=P0.doze;
    ud.shineOp=shineMat.opacity; ud.silF=silF; ud.tailMax=maxFrame;
    ud.trotB=ST.trotB; ud.stalkB=ST.stalkB; ud.gzYaw=ST.gzYaw; ud.gzPit=ST.gzPit;
  }

  function reset(){
    var i;
    ST.vS=0; ST.turnS=0; ST.tAcc=0; ST.tailMax=0;
    ST.gzYaw=ST.sv.gzYaw; ST.gzPit=ST.sv.gzPit; ST.eyeYaw=ST.sv.eyeYaw; ST.eyePit=ST.sv.eyePit;
    ST.pupE=ST.sv.pup; ST.earL=ST.sv.earL; ST.earR=ST.sv.earR;
    for(i=0;i<=TAIL_N;i++){
      ST.tp[i][0]=ST.tailT[i][0]; ST.tp[i][1]=ST.tailT[i][1]; ST.tp[i][2]=ST.tailT[i][2];
      ST.tv[i][0]=ST.tailT[i][0]; ST.tv[i][1]=ST.tailT[i][1]; ST.tv[i][2]=ST.tailT[i][2];
    }
    ST.lastTS=-1;
  }

  function dispose(){
    var i;
    geoSkin.dispose();
    for(i=0;i<geoShells.length;i++) geoShells[i].dispose();
    whisk.geometry.dispose(); shine.geometry.dispose();
    skinMat.dispose();
    for(i=0;i<shellMats.length;i++) shellMats[i].dispose();
    whiskMat.dispose(); shineMat.dispose();
    if(shellTex) shellTex.dispose();
    if(glintTex) glintTex.dispose();
    if(group.parent) group.parent.remove(group);
  }

  return { group:group, radius:radius, update:update, reset:reset,
           glassMats:[], lineMats:[], dispose:dispose };
}
if(typeof module!=='undefined' && module.exports) module.exports=buildLife_cat;
/* ===LIFE cat END=== */
