/* ===WATCHROOM BEGIN===
   what it is:        the secret room at the very top — above the bell, above
                      the star. a vast candle-lit keeper's room the throat-
                      stair delivers you into through an oculus in its floor.
                      the tower's own upper works (helm, lantern, needle, the
                      gilded figure) rise through its heart as a monument; the
                      vault soars over the needle's tip. fourteen empty
                      niches wait for the clocks. one grand door on the −z
                      face (the founding dial's side) opens to the OUTSIDE —
                      the bird. the oculus rail keeps one gate, facing +z,
                      where the stair steps out onto the floor.
   idiom:             bones-of-light walls + solid worn stone floor
   footprint:         octagon r 12 · floor y 24 · vault apex y 40.5
   draw calls:        ~14 line/mesh bodies + 12 candle-flame sprite pairs
   uses env:          tS, pO, pW, lit, fl, reduced
   the laws:          nothing printed; candles are the light the crown's
                      windows glow with (law 6); dark until first entered —
                      discovery lights the tower's top.
*/
function buildWatchRoom(THREE, opts){
  var TAU=Math.PI*2, ROT=TAU/16, N8=8;
  /* ---------- TUNE ---------- */
  var FLOOR_Y=24.0, R_WALL=12.0, R_OCC=2.75, WALL_TOP=31.0, APEX_Y=40.5;
  var FR=R_WALL*Math.cos(Math.PI/8);                        /* face-plane distance */
  var DOOR_FACE=5;                                          /* the −z face: the founding dial's side */
  var WR_STEEL=0.55, WR_GOLD=0.85, WR_DIM=0.30, WR_WARM=0.50;   /* rest opacities, ×lit×ignite */
  var LEAF_AJAR=[0.46,0.26];                                /* the two leaves, left further open */

  function clamp(v,a,b){ return v<a?a:(v>b?b:v); }
  function lerp(a,b,t){ return a+(b-a)*t; }
  function mulb(seed){ return function(){ seed|=0; seed=(seed+0x6D2B79F5)|0;
    var t=Math.imul(seed^(seed>>>15),1|seed); t=(t+Math.imul(t^(t>>>7),61|t))^t;
    return ((t^(t>>>14))>>>0)/4294967296; }; }
  var Rnd=mulb(opts.seed||1516);

  var group=new THREE.Group();
  var pieces=[];                                            /* {obj, fy} — for the reversed collapse */
  var hooks=[];                                             /* where the clocks will hang */
  var candles=[];                                           /* {f,h,ph} sprite pairs */

  /* the room's own light-materials — cloned idiom, gated by ignite */
  var mS=new THREE.LineBasicMaterial({ color:0xbfd4ff, transparent:true, opacity:0, blending:THREE.AdditiveBlending, depthWrite:false });
  var mG=new THREE.LineBasicMaterial({ color:0xe8c466, transparent:true, opacity:0, blending:THREE.AdditiveBlending, depthWrite:false });
  var mD=new THREE.LineBasicMaterial({ color:0x6f83b8, transparent:true, opacity:0, blending:THREE.AdditiveBlending, depthWrite:false });
  var mW=new THREE.LineBasicMaterial({ color:0xffb545, transparent:true, opacity:0, blending:THREE.AdditiveBlending, depthWrite:false });
  var leafMat=new THREE.MeshBasicMaterial({ color:0x070a12 });
  var doorGlow=new THREE.MeshBasicMaterial({ color:0x9fc4ff, transparent:true, opacity:0, blending:THREE.AdditiveBlending, depthWrite:false, side:THREE.DoubleSide });

  /* ----- line shards, tower idiom: buffer → LineSegments piece ----- */
  var buf=[];
  function sg(ax,ay,az,bx,by,bz){ buf.push(ax,ay,az,bx,by,bz); }
  function endPiece(fy,mat,parent){
    if(!buf.length) return null;
    var g=new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(buf,3));
    var o=new THREE.LineSegments(g, mat||mS);
    (parent||group).add(o); if(!parent) pieces.push({obj:o, fy:fy});
    buf=[]; return o;
  }
  function octPt(k,r,y){ var a=(k/N8)*TAU+ROT; return [Math.cos(a)*r, y, Math.sin(a)*r]; }
  function ringOct(r,y){ var k,p,q; for(k=0;k<N8;k++){ p=octPt(k,r,y); q=octPt(k+1,r,y); sg(p[0],p[1],p[2],q[0],q[1],q[2]); } }
  function ringCirc(r,y,n){ var k,a,b; n=n||48; for(k=0;k<n;k++){ a=k/n*TAU; b=(k+1)/n*TAU;
    sg(Math.cos(a)*r,y,Math.sin(a)*r, Math.cos(b)*r,y,Math.sin(b)*r); } }
  function faceAng(k){ return ((k+0.5)/N8)*TAU+ROT; }

  /* every face has a local frame: U along the face, +y up, at plane FR (inset dz) */
  function facePt(k,u,y,dz){
    var a=faceAng(k), cx=Math.cos(a), sx=Math.sin(a);
    var ux=-sx, uz=cx, d=FR-(dz||0);
    return [cx*d+ux*u, y, sx*d+uz*u];
  }
  function fseg(k,u0,y0,u1,y1,dz){ var A=facePt(k,u0,y0,dz), B=facePt(k,u1,y1,dz);
    sg(A[0],A[1],A[2],B[0],B[1],B[2]); }
  function farch(k,uC,hw,ySpring,dz,n){ var m,prev=null;                /* round head between jambs */
    for(m=0;m<=n;m++){ var t=m/n, a=Math.PI*(1-t);
      var P=facePt(k, uC+Math.cos(a)*hw, ySpring+Math.sin(a)*hw, dz);
      if(prev) sg(prev[0],prev[1],prev[2],P[0],P[1],P[2]); prev=P; } }

  /* ==========================================================================
     the FLOOR — solid worn stone, an octagonal annulus from the oculus to the
     walls, blocks laid in three rings. vertex-lit like the weave's mason:
     jittered quarry batches, warm memory pooled near the oculus candles.
     ========================================================================== */
  var occCand=[], sillCand=[], k, j, ri;
  for(k=0;k<4;k++){ var oa=((k*2+1)/N8)*TAU+ROT;             /* four flames guard the oculus, on the diagonals */
    occCand.push([Math.cos(oa)*3.35, FLOOR_Y, Math.sin(oa)*3.35]); }
  for(k=0;k<N8;k++){ if(k===DOOR_FACE) continue;             /* one flame on every window sill */
    var sc=facePt(k, 0, FLOOR_Y+1.5, 0.55); sillCand.push(sc); }

  (function(){
    var sb=[], scl=[], uvA=[], TS=0.55;
    function pushTri(A,B,C,mt,vm,warm){
      sb.push(A[0],A[1],A[2], B[0],B[1],B[2], C[0],C[1],C[2]);
      var ux=B[0]-A[0],uy=B[1]-A[1],uz=B[2]-A[2], vx=C[0]-A[0],vy=C[1]-A[1],vz=C[2]-A[2];
      var nx=uy*vz-uz*vy, ny=uz*vx-ux*vz, nz=ux*vy-uy*vx;
      var ax2=Math.abs(nx),ay2=Math.abs(ny),az2=Math.abs(nz);
      function uvOf(P){ if(ay2>=ax2&&ay2>=az2) return [P[0]*TS,P[2]*TS];
        if(ax2>=az2) return [P[2]*TS,P[1]*TS]; return [P[0]*TS,P[1]*TS]; }
      var U=uvOf(A), V2=uvOf(B), W2=uvOf(C);
      uvA.push(U[0],U[1], V2[0],V2[1], W2[0],W2[1]);
      var q2, base=mt*0.92;
      for(q2=0;q2<3;q2++){ var jj=(1+(Rnd()*2-1)*0.06)*((vm&&vm[q2]!==undefined)?vm[q2]:1)*base;
        scl.push(jj*(1+0.85*warm), jj*(1+0.50*warm), jj*(1+0.12*warm)); }
    }
    var RB=[2.90,5.90,8.90,11.85], NB=[5,7,9], TH=0.55, GAP=0.012;
    for(ri=0;ri<3;ri++){ var r0=RB[ri], r1=RB[ri+1], nb=NB[ri];
      for(k=0;k<N8;k++){
        var I0=octPt(k,r0,0), I1=octPt(k+1,r0,0), O0=octPt(k,r1,0), O1=octPt(k+1,r1,0);
        for(j=0;j<nb;j++){ var t0=j/nb+GAP, t1=(j+1)/nb-GAP;
          function P4(tA,ring,yy){ var A2=ring?O0:I0, B2=ring?O1:I1;
            return [lerp(A2[0],B2[0],tA), yy, lerp(A2[2],B2[2],tA)]; }
          var mt=0.82+0.36*Rnd();
          /* warm memory: the nearest flame breathes into the stone */
          var mid=P4((t0+t1)/2,0.5,FLOOR_Y), wL=0, ci, all=occCand.concat(sillCand);
          for(ci=0;ci<all.length;ci++){ var cp=all[ci],
            dx=mid[0]-cp[0], dy2=mid[1]-cp[1], dz2=mid[2]-cp[2];
            var w2=(1.25/(1+(dx*dx+dy2*dy2+dz2*dz2)*0.85))*0.5; if(w2>wL) wL=w2; }
          var a1=P4(t0,0,FLOOR_Y), b1=P4(t1,0,FLOOR_Y), c1=P4(t1,1,FLOOR_Y), d1=P4(t0,1,FLOOR_Y);
          var a2=P4(t0,0,FLOOR_Y-TH), b2=P4(t1,0,FLOOR_Y-TH), c2=P4(t1,1,FLOOR_Y-TH), d2=P4(t0,1,FLOOR_Y-TH);
          pushTri(a1,b1,c1, mt,[1.06,1.00,1.00],wL); pushTri(a1,c1,d1, mt,[1.06,1.00,1.00],wL);
          pushTri(a2,c2,b2, mt*0.78,null,0);          pushTri(a2,d2,c2, mt*0.78,null,0);
          pushTri(a1,a2,b2, mt,[0.90,0.62,0.62],wL*0.5); pushTri(a1,b2,b1, mt,[0.90,0.62,0.90],wL*0.5);
          pushTri(c1,c2,d2, mt,[0.90,0.62,0.62],wL*0.5); pushTri(c1,d2,d1, mt,[0.90,0.62,0.90],wL*0.5);
          pushTri(d1,d2,a2, mt,[0.90,0.62,0.62],0);   pushTri(d1,a2,a1, mt,[0.90,0.62,0.90],0);
          pushTri(b1,b2,c2, mt,[0.90,0.62,0.62],0);   pushTri(b1,c2,c1, mt,[0.90,0.62,0.90],0);
        }
      }
    }
    var g2=new THREE.BufferGeometry();
    g2.setAttribute('position', new THREE.Float32BufferAttribute(sb,3));
    g2.setAttribute('color', new THREE.Float32BufferAttribute(scl,3));
    g2.setAttribute('uv', new THREE.Float32BufferAttribute(uvA,2));
    g2.computeVertexNormals();
    var mesh=new THREE.Mesh(g2, opts.stoneMat);
    group.add(mesh); pieces.push({obj:mesh, fy:FLOOR_Y});
  })();

  /* ----- the oculus rail — you emerged through this hole; it is guarded.
     one gap faces +z: the GATE, where the stair steps out onto the floor,
     held open by two gold gateposts. ----- */
  var GATE_A=Math.PI/2, GATE_HW=0.34;                        /* block-polar (+z) · half-width of the gap */
  function angD(aa,bb){ var d2=Math.abs((((aa-bb)%TAU)+TAU)%TAU); return Math.min(d2,TAU-d2); }
  (function(){
    for(k=0;k<24;k++){ var a=k/24*TAU+ROT;
      if(angD(a,GATE_A)<GATE_HW) continue;
      var px=Math.cos(a)*3.05, pz=Math.sin(a)*3.05;
      sg(px,FLOOR_Y,pz, px,FLOOR_Y+0.92,pz); }
    var n=48, m2;
    for(m2=0;m2<n;m2++){ var a0=m2/n*TAU, a1=(m2+1)/n*TAU;
      if(angD((a0+a1)/2,GATE_A)<GATE_HW) continue;
      sg(Math.cos(a0)*3.05,FLOOR_Y+0.50,Math.sin(a0)*3.05, Math.cos(a1)*3.05,FLOOR_Y+0.50,Math.sin(a1)*3.05); }
    endPiece(24.4, mD);
    for(m2=0;m2<n;m2++){ var b0=m2/n*TAU, b1=(m2+1)/n*TAU;
      if(angD((b0+b1)/2,GATE_A)<GATE_HW) continue;
      sg(Math.cos(b0)*3.05,FLOOR_Y+0.92,Math.sin(b0)*3.05, Math.cos(b1)*3.05,FLOOR_Y+0.92,Math.sin(b1)*3.05); }
    var s2; for(s2=-1;s2<=1;s2+=2){ var ga=GATE_A+s2*GATE_HW,
      gx=Math.cos(ga)*3.05, gz=Math.sin(ga)*3.05;
      sg(gx,FLOOR_Y,gz, gx,FLOOR_Y+1.06,gz);
      sg(gx-0.07,FLOOR_Y+1.06,gz, gx+0.07,FLOOR_Y+1.06,gz); }
    endPiece(24.9, mG);
  })();

  /* ----- the candlesticks — the weave's own drawn idiom ----- */
  (function(){
    var all=occCand.concat(sillCand), c;
    for(c=0;c<all.length;c++){ var P=all[c], hgt=0.34;
      sg(P[0]-0.06,P[1],P[2], P[0]+0.06,P[1],P[2]);
      sg(P[0],P[1],P[2]-0.06, P[0],P[1],P[2]+0.06);
      sg(P[0],P[1],P[2], P[0],P[1]+hgt,P[2]);
      sg(P[0]-0.03,P[1]+hgt*0.55,P[2], P[0],P[1]+hgt*0.40,P[2]);
    }
    endPiece(24.3, mW);
  })();

  /* ==========================================================================
     the WALLS — eight faces of drawn light: corner columns, courses, a tall
     dark window on each face (its sill carries a flame — the very light the
     crown's copper windows glow with, seen from the other side), and two
     empty gold-limned niches flanking each window: the museum of faces,
     waiting for its clocks.
     ========================================================================== */
  (function(){                                               /* frame: columns + courses (steel) */
    for(k=0;k<N8;k++){ var V=octPt(k,R_WALL,0);
      sg(V[0],FLOOR_Y,V[2], V[0],WALL_TOP,V[2]);
      var V2=octPt(k,R_WALL-0.14,0);
      sg(V2[0],FLOOR_Y,V2[2], V2[0],WALL_TOP,V2[2]); }
    ringOct(R_WALL, FLOOR_Y); ringOct(R_WALL, WALL_TOP);
    endPiece(26.0, mS);
    ringOct(R_WALL, 27.5);
    endPiece(27.5, mD);
    ringOct(R_WALL-0.06, 30.35);                             /* a gold string course under the vault */
    endPiece(30.3, mG);
  })();

  (function(){                                               /* windows (steel) + sills (gold) */
    var SILL=FLOOR_Y+1.5, SPR=FLOOR_Y+4.9, HW=1.35;
    for(k=0;k<N8;k++){ if(k===DOOR_FACE) continue;
      fseg(k,-HW,SILL,-HW,SPR,0.02); fseg(k,HW,SILL,HW,SPR,0.02);
      fseg(k,-HW,SILL,HW,SILL,0.02);
      farch(k,0,HW,SPR,0.02,10);
      fseg(k,0,SILL,0,SPR+0.35,0.02);                        /* mullion */
      for(j=1;j<=4;j++){ var yy=SILL+j*(SPR-SILL)/5; fseg(k,-HW,yy,HW,yy,0.02); }
    }
    endPiece(26.6, mS);
    for(k=0;k<N8;k++){ if(k===DOOR_FACE) continue;
      fseg(k,-HW-0.18,SILL-0.05, HW+0.18,SILL-0.05, 0.10); } /* the sill ledge the flame stands on */
    endPiece(25.4, mG);
  })();

  (function(){                                               /* niches — gold arches, empty, waiting */
    var NB=FLOOR_Y+1.3, NT=FLOOR_Y+3.3, NHW=0.62;
    for(k=0;k<N8;k++){ if(k===DOOR_FACE) continue;
      var s2; for(s2=-1;s2<=1;s2+=2){ var uC=s2*3.35;
        fseg(k,uC-NHW,NB, uC-NHW,NT, 0.03); fseg(k,uC+NHW,NB, uC+NHW,NT, 0.03);
        fseg(k,uC-NHW,NB, uC+NHW,NB, 0.03);
        farch(k,uC,NHW,NT,0.03,8);
        fseg(k,uC,NT+NHW-0.10, uC,NT+NHW-0.28, 0.06);        /* the hook, above the arch's heart */
        var a=faceAng(k), HP=facePt(k,uC,FLOOR_Y+2.35,0.30);
        hooks.push({ x:HP[0], y:HP[1], z:HP[2], rotY:Math.atan2(-Math.cos(a),-Math.sin(a)) });
      }
    }
    endPiece(26.9, mG);
  })();

  /* ==========================================================================
     the DOOR — on the founding dial's side. taller than any window, its two
     dark leaves left ajar; through the gap, a cold pale light: the outside.
     step through, and you are the bird.
     ========================================================================== */
  var doorHit=null, doorHalo=null;
  (function(){
    var DHW=1.70, JT=FLOOR_Y+6.0, APX=JT+DHW;
    fseg(DOOR_FACE,-DHW,FLOOR_Y, -DHW,JT, 0.02); fseg(DOOR_FACE,DHW,FLOOR_Y, DHW,JT, 0.02);
    farch(DOOR_FACE,0,DHW,JT,0.02,12);
    fseg(DOOR_FACE,-DHW-0.22,FLOOR_Y, -DHW-0.22,JT+0.2, 0.02); fseg(DOOR_FACE,DHW+0.22,FLOOR_Y, DHW+0.22,JT+0.2, 0.02);
    endPiece(27.2, mS);
    fseg(DOOR_FACE,-DHW+0.14,FLOOR_Y, -DHW+0.14,JT-0.1, 0.04); fseg(DOOR_FACE,DHW-0.14,FLOOR_Y, DHW-0.14,JT-0.1, 0.04);
    farch(DOOR_FACE,0,DHW-0.14,JT-0.1,0.04,12);
    endPiece(27.0, mG);

    var a=faceAng(DOOR_FACE), cx=Math.cos(a), sx=Math.sin(a), ux=-sx, uz=cx;
    function leafAt(side,open){
      var hw=1.48, hh=3.30, hingeU=side*1.55;
      var piv=new THREE.Group();
      piv.position.set(cx*FR+ux*hingeU, FLOOR_Y+hh, sx*FR+uz*hingeU);
      piv.rotation.y=Math.atan2(-uz,ux);                     /* local +x runs along the face; local +z faces the room */
      var leaf=new THREE.Mesh(new THREE.BoxGeometry(hw,hh*2,0.10), leafMat);
      leaf.position.x=-side*hw*0.5;
      var lp=[], p2;                                          /* drawn panels on the inner skin */
      for(p2=0;p2<2;p2++){ var py=-hh*0.62+p2*hh*0.85, ph2=hh*0.62, pw=hw*0.30;
        lp.push(-side*hw*0.5-pw,py-ph2*0.5,0.07, -side*hw*0.5+pw,py-ph2*0.5,0.07);
        lp.push(-side*hw*0.5-pw,py+ph2*0.5,0.07, -side*hw*0.5+pw,py+ph2*0.5,0.07);
        lp.push(-side*hw*0.5-pw,py-ph2*0.5,0.07, -side*hw*0.5-pw,py+ph2*0.5,0.07);
        lp.push(-side*hw*0.5+pw,py-ph2*0.5,0.07, -side*hw*0.5+pw,py+ph2*0.5,0.07); }
      var lg=new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.Float32BufferAttribute(lp,3));
      piv.add(leaf); piv.add(new THREE.LineSegments(lg, mD));
      piv.rotation.y+=side*open;                             /* ajar, inward */
      group.add(piv); pieces.push({obj:piv, fy:26.2});
      return piv;
    }
    leafAt(-1, LEAF_AJAR[0]); leafAt(1, LEAF_AJAR[1]);

    var gp=new THREE.PlaneGeometry(2.6, 6.4);                /* the cold beyond, standing in the opening */
    var gm=new THREE.Mesh(gp, doorGlow);
    gm.position.set(cx*(FR+0.42), FLOOR_Y+3.4, sx*(FR+0.42));
    gm.rotation.y=Math.atan2(-uz,ux);
    group.add(gm); pieces.push({obj:gm, fy:26.3});

    var coolT=opts.coolTex?opts.coolTex():(opts.flameTex?opts.flameTex():null);
    doorHalo=new THREE.Sprite(new THREE.SpriteMaterial({ map:coolT,
      transparent:true, depthWrite:false, blending:THREE.AdditiveBlending, opacity:0 }));
    doorHalo.position.set(cx*(FR-0.3), FLOOR_Y+3.6, sx*(FR-0.3)); doorHalo.scale.set(3.2,5.2,1);
    group.add(doorHalo);

    doorHit=new THREE.Mesh(new THREE.BoxGeometry(3.6,7.8,1.2), new THREE.MeshBasicMaterial({visible:false}));
    doorHit.position.set(cx*(FR-0.2), FLOOR_Y+3.9, sx*(FR-0.2));
    doorHit.rotation.y=Math.atan2(-uz,ux);
    group.add(doorHit);
  })();

  /* ==========================================================================
     the VAULT — ribs from every corner sweeping to a small gold ring high
     over the needle's tip: the room's sky. the spire the whole world sees
     stands free in the middle of the air, a monument inside its own tower.
     ========================================================================== */
  (function(){
    function rib(Rv,mat){ var kk;
      for(kk=0;kk<N8;kk++){ var a=(kk/N8)*TAU+(mat===mS?ROT:ROT+TAU/16), prev=null, m;
        for(m=0;m<=12;m++){ var t=m/12;
          var rr=0.9+(Rv-0.9)*Math.pow(1-t,1.35), yy=WALL_TOP+(APEX_Y-WALL_TOP)*Math.pow(t,0.85);
          var P=[Math.cos(a)*rr, yy, Math.sin(a)*rr];
          if(prev) sg(prev[0],prev[1],prev[2],P[0],P[1],P[2]); prev=P; } }
    }
    rib(R_WALL, mS); endPiece(33.5, mS);
    rib(FR, mD);
    var t2, tt=[0.25,0.5,0.75];
    for(t2=0;t2<3;t2++){ var t=tt[t2],
      rr=0.9+(R_WALL-0.9)*Math.pow(1-t,1.35), yy=WALL_TOP+(APEX_Y-WALL_TOP)*Math.pow(t,0.85);
      ringOct(rr,yy); }
    endPiece(34.5, mD);
    ringCirc(0.9, APEX_Y, 32);
    (function(){ var n=20,kk;                                /* a small gold sphere of light at the crown of the vault */
      for(kk=0;kk<n;kk++){ var a=kk/n*TAU, b=(kk+1)/n*TAU, r2=0.24, cy=APEX_Y+0.42;
        sg(Math.cos(a)*r2,cy+Math.sin(a)*r2,0, Math.cos(b)*r2,cy+Math.sin(b)*r2,0);
        sg(Math.cos(a)*r2,cy,Math.sin(a)*r2, Math.cos(b)*r2,cy,Math.sin(b)*r2);
        sg(0,cy+Math.cos(a)*r2,Math.sin(a)*r2, 0,cy+Math.cos(b)*r2,Math.sin(b)*r2); } })();
    endPiece(40.4, mG);
  })();

  /* ----- the flames themselves ----- */
  (function(){
    var all=occCand.concat(sillCand), c;
    for(c=0;c<all.length;c++){ var P=all[c];
      var fm=new THREE.SpriteMaterial({ map:opts.flameTex?opts.flameTex():null, transparent:true, depthWrite:false, blending:THREE.AdditiveBlending, opacity:0 });
      var fS=new THREE.Sprite(fm); fS.position.set(P[0],P[1]+0.44,P[2]); fS.scale.set(0.22,0.44,1);
      var hm=new THREE.SpriteMaterial({ map:opts.flameTex?opts.flameTex():null, transparent:true, depthWrite:false, blending:THREE.AdditiveBlending, opacity:0 });
      var hS=new THREE.Sprite(hm); hS.position.copy(fS.position); hS.scale.set(1.6,1.6,1);
      group.add(fS); group.add(hS);
      candles.push({f:fS, h:hS, ph:Rnd()*TAU});
    }
  })();

  /* ----- the room's own warmth — real light, ignited by discovery ----- */
  var roomL=new THREE.PointLight(0xffb545, 0.0, 34, 2);
  roomL.position.set(0, FLOOR_Y+3.2, 0); group.add(roomL);

  /* ----- ignition + breath ----- */
  var IG=0, igT=0, lastTS=-1;
  function ignite(v){ igT=(v===undefined)?1:v; }
  function update(env){
    var dt=(lastTS<0)?0.016:clamp(env.tS-lastTS,0,0.05); lastTS=env.tS;
    IG += (igT-IG)*(1-Math.exp(-dt*1.1));
    var L=env.lit*IG, c;
    mS.opacity=L*(WR_STEEL+0.15*env.pO);
    mG.opacity=L*(WR_GOLD +0.10*env.pW)+0.30*env.fl*IG;
    mD.opacity=L*WR_DIM;
    mW.opacity=L*WR_WARM;
    doorGlow.opacity=L*(0.085+0.05*env.pO)+0.16*env.fl*IG;
    if(doorHalo) doorHalo.material.opacity=L*(0.10+0.05*env.pO);
    for(c=0;c<candles.length;c++){ var cd=candles[c];
      var flk=0.62+0.24*Math.sin(env.tS*13+cd.ph)+0.10*Math.sin(env.tS*37+cd.ph*2.3);
      if(env.reduced) flk=0.62;
      cd.f.material.opacity=L*flk;
      cd.f.scale.set(0.22*(0.9+0.2*flk), 0.44*(0.85+0.3*flk), 1);
      cd.h.material.opacity=L*0.14*flk;
    }
    var gfl=0.80+0.14*Math.sin(env.tS*11.7)+0.06*Math.sin(env.tS*29.3);
    if(env.reduced) gfl=0.85;
    roomL.intensity=L*1.35*gfl;
  }
  function dispose(){
    group.traverse(function(o){ if(o.geometry) o.geometry.dispose(); });
    mS.dispose(); mG.dispose(); mD.dispose(); mW.dispose(); leafMat.dispose(); doorGlow.dispose();
  }

  return { group:group, pieces:pieces, hooks:hooks, doorHit:doorHit,
           floorY:FLOOR_Y, occR:R_OCC, wallR:R_WALL,
           ignite:ignite, update:update, dispose:dispose,
           mats:{steel:mS, gold:mG, dim:mD, warm:mW} };
}
/* ===WATCHROOM END=== */
