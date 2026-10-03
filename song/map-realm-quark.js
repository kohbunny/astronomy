/* map-realm-quark.js — THE QUARK REALM of THE VESICA (the atomic chat, 27 sep 2026). −19.0 … −13.0 · one unit is a femtometre ·
   anchor you (the heart is the origin, x east, y north, z up). it registers itself; the host finds it, or does knot.

   what it draws, rising from the floor: THE POINT THAT NEVER RESOLVES (s < −18.5: one quark, the same pixel at every zoom — it
   has no size that anyone has found, and the map has no floor), then the glue leaving it as flickering rays; then THE PROTON:
   three quarks as jittering points in the house's three colours (physicists call these "colour" and the house has three: gold,
   her blue, the machinery's blue), the gluon sea as additive strands re-dealt from the seed at their own lives, the whole
   seething on her count (P/128) inside a fuzz that is the proton's own 1.7 fm; then THE NUCLEUS OF CARBON: twelve nucleons
   packed as three alphas — three tetrahedra at the corners of a triangle, the triple-alpha picture of carbon-12 (six and six, the
   protons warm, the neutrons cool), each with its own three quarks and its own glue,
   breathing as one; and at the top the atom's cloud already faint all round it, ten thousand times its size (the seam at −13.3).
   no picture of any of this exists; the host's lines say so. everything here is a way of saying it (the wavelength law).

   THE CONTRACT (map-realm-template.js): the subject at the origin; the eye on +z at ctx.D(s) units, tilted and precessed by the
   host; nothing with a word in it; no document, no window beyond registering; no location, no history, no storage, no fetch, no
   Image, no audio of its own; three r128 only; nothing named nobody or UNKNOWN; no inhabitant. words are the host's — the
   landmarks below are DATA (the same rows as the host's own table, with cards for a later pass to type).

   BUDGET on the glass: 6 draw calls (the cores · the halos · the strands · the nucleons · the haze · the floor's own point),
   ≈ 4,000 triangles, 36 points, 220 line strands (LOW 110); build ≈ 5 ms; tick ≈ 0.3 ms (the strands are dealt on the cpu, a
   few hundred a frame). textures: the host's own radial ones only.

   [TUNE] seats, all his on glass: Q_R 0.42 (the quarks' triangle, fm) · Q_JIT 0.07 (their jitter, fm) · Q_WANDER 0.03 (the
   floor point's wander, a share of the frame) · N_STRANDS 220 (LOW 110) · STRAND_LIFE 0.45–1.1 s · ALPHA_R 1.5 · TET_R 0.92 (the nucleus's
   packing: the alphas' triangle and a tetrahedron's radius, fm) · NUC_R 0.85 (a nucleon's fuzz, fm) · BREATH_S 4.0 (the nucleus breathes) · HAZE_A 0.11 (the atom's cloud
   at the seam). */
(function(){
  var Q_R=0.42, Q_JIT=0.07, Q_WANDER=0.03, STRAND_LIFE=[0.45,1.1], NUC_R=0.85, BREATH_S=4.0, HAZE_A=0.11;
  var R={
    id:'quark', title:'the quark',
    span:[-19.0,-13.0],
    unit:-15,
    anchor:'you',
    landmarks:[
      { s:-19.0, name:'the quark', size:'no size found · smaller than 10⁻¹⁸ m', line:'no one has seen one. it has no size that anyone has found. the map has no floor. it turns here.', tone:4.5,
        card:['a point charge, to every test yet made: smaller than a thousandth of a proton.','three colours, never alone — pull two apart and the glue between them makes two more.','the map draws it as the same pixel at every zoom. that is all anyone has.'] },
      { s:-15.0, name:'a proton', size:'1.7 fm', line:'three quarks and the glue between them. nearly all of its weight is the glue.', tone:4.5,
        card:['two up, one down, and a sea of gluons and quark pairs that come and go.','the three quarks weigh one part in a hundred of it. the rest is the field\'s own energy.','it has never been seen to decay. every one in you is older than the sun.'] },
      { s:-14.3, name:'the nucleus of carbon', size:'5.5 fm', line:'six and six, packed. all the weight of the atom is here, in one part in ten thousand of its width.', tone:5,
        card:['six protons, six neutrons, held by the strong force\'s leftover, a hundred times gravity\'s.','made in a dying star, in the collision of three heliums at once.','carbon-12 is the kilogram\'s cousin: the atomic mass unit is a twelfth of it.'] }
    ],
    build:function(ctx){
      var T=ctx.THREE, self=this, LOW=ctx.LOW;
      var c3=function(rgb){ var c=rgb.split(',').map(function(x){ return +x/255; }); return new T.Color(c[0],c[1],c[2]); };
      this.cols=[c3(ctx.colours.gold),c3(ctx.colours.her),c3(ctx.colours.machine)];   // the three colours a quark can carry
      this.protonCol=new T.Color(1.0,0.86,0.58); this.neutronCol=new T.Color(0.70,0.78,0.95);
      this.t=0; this.pr=Math.min(window.devicePixelRatio||1,LOW?1.5:2);   // the one number read from the window: the glass's pixel ratio, for points that are the same px at every zoom (the host caps it the same way; pass C may hand it over as ctx.pr)
      /* THE NUCLEUS: twelve seats, three alphas; nucleon 0 is the proton the deep scales are inside */
      var ALPHA_R=1.5, TET_R=0.92;                                       // the alphas' triangle (circumradius, fm) · a tetrahedron's (fm) [TUNE]
      var tet=[[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]], tq=new T.Quaternion(), tv=new T.Vector3();
      this.nuc=[];
      for(var a=0;a<3;a++){
        var ac=new T.Vector3(Math.cos(a*ctx.TAU/3)*ALPHA_R,Math.sin(a*ctx.TAU/3)*ALPHA_R,0);
        tq.setFromAxisAngle(tv.set(ctx.rng()-0.5,ctx.rng()-0.5,ctx.rng()-0.5).normalize(),ctx.rng()*ctx.TAU);
        for(var v=0;v<4;v++){ var i=a*4+v; var seat=new T.Vector3(tet[v][0],tet[v][1],tet[v][2]).normalize().multiplyScalar(TET_R).applyQuaternion(tq).add(ac);
          this.nuc.push({ seat:seat, pos:new T.Vector3(), proton:(v<2), ax:new T.Vector3(ctx.rng()-0.5,ctx.rng()-0.5,ctx.rng()-0.5).normalize(), ang:ctx.rng()*ctx.TAU, w:(0.12+0.25*ctx.rng())*(ctx.rng()<0.5?1:-1), q:new T.Quaternion(), qk:[] }); }
      }
      /* the nucleus tumbles slowly as a whole, and each nucleon's quark triangle tumbles on its own */
      this.tumbleAx=new T.Vector3(0.3,0.9,0.2).normalize(); this.tumble=0; this.tumbleQ=new T.Quaternion();
      /* THE QUARKS: 36 points (three a nucleon) — cores and halos share one geometry, two materials */
      var n=36, pos=new Float32Array(n*3), col=new Float32Array(n*3), al=new Float32Array(n);
      for(var k=0;k<n;k++){ var cc=this.cols[k%3]; col[k*3]=cc.r; col[k*3+1]=cc.g; col[k*3+2]=cc.b; al[k]=0; }
      var g=new T.BufferGeometry(); g.setAttribute('position',new T.BufferAttribute(pos,3)); g.setAttribute('aCol',new T.BufferAttribute(col,3)); g.setAttribute('aA',new T.BufferAttribute(al,1));
      this.qPos=pos; this.qA=al; this.qGeo=g;
      var vsh='attribute vec3 aCol; attribute float aA; varying vec3 vC; varying float vA; uniform float uPx; uniform float uPR; void main(){ vC=aCol; vA=aA; vec4 mv=modelViewMatrix*vec4(position,1.0); gl_Position=projectionMatrix*mv; gl_PointSize=uPx*uPR; }';
      this.coreMat=new T.ShaderMaterial({ transparent:true, depthTest:false, depthWrite:false, blending:T.AdditiveBlending, uniforms:{ uPx:{ value:5.0 }, uPR:{ value:this.pr } },
        vertexShader:vsh, fragmentShader:'varying vec3 vC; varying float vA; void main(){ vec2 d=gl_PointCoord-0.5; float r=length(d)*2.0; float a=1.0-smoothstep(0.25,1.0,r); float core=1.0-smoothstep(0.0,0.45,r); gl_FragColor=vec4(mix(vC,vec3(1.0),0.55*core), a*vA); }' });
      this.haloMat=new T.ShaderMaterial({ transparent:true, depthTest:false, depthWrite:false, blending:T.AdditiveBlending, uniforms:{ uPx:{ value:46.0 }, uPR:{ value:this.pr } },
        vertexShader:vsh, fragmentShader:'varying vec3 vC; varying float vA; void main(){ vec2 d=gl_PointCoord-0.5; float r=length(d)*2.0; float a=pow(max(1.0-r,0.0),2.2)*0.28; gl_FragColor=vec4(vC, a*vA); }' });
      this.cores=new T.Points(g,this.coreMat); this.cores.frustumCulled=false; this.cores.renderOrder=6; ctx.scene.add(this.cores);
      this.halos=new T.Points(g,this.haloMat); this.halos.frustumCulled=false; this.halos.renderOrder=5; ctx.scene.add(this.halos);
      /* THE GLUE: strands, each with a life of its own, re-dealt from the seed when it ends; one line call, a colour and an alpha a vertex */
      var ns=LOW?110:220; this.ns=ns; this.strands=[];
      var sp=new Float32Array(ns*6), sc=new Float32Array(ns*6), sa=new Float32Array(ns*2);
      for(var j=0;j<ns;j++){ this.strands.push({ ray:(j<ns*0.4), n:0, a:0, b:1, u:0, du:0.2, t0:-10, life:1, dir:new T.Vector3(), lat:new T.Vector3(), amp:0, len:0, mix:0 }); }
      var sg=new T.BufferGeometry(); sg.setAttribute('position',new T.BufferAttribute(sp,3)); sg.setAttribute('aCol',new T.BufferAttribute(sc,3)); sg.setAttribute('aA',new T.BufferAttribute(sa,1));
      this.sPos=sp; this.sCol=sc; this.sA=sa; this.sGeo=sg;
      this.strandMat=new T.ShaderMaterial({ transparent:true, depthTest:false, depthWrite:false, blending:T.AdditiveBlending, uniforms:{ uK:{ value:0 } },
        vertexShader:'attribute vec3 aCol; attribute float aA; varying vec3 vC; varying float vA; void main(){ vC=aCol; vA=aA; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
        fragmentShader:'uniform float uK; varying vec3 vC; varying float vA; void main(){ float a=vA*uK; gl_FragColor=vec4(vC*0.9, a*0.7); }' });
      this.lines=new T.LineSegments(sg,this.strandMat); this.lines.frustumCulled=false; this.lines.renderOrder=4; ctx.scene.add(this.lines);
      /* THE NUCLEONS: twelve fuzzes, one instanced call — a soft body that seethes a little on its skin */
      var sgeo=new T.SphereGeometry(NUC_R,LOW?18:26,LOW?12:18);
      var icol=new Float32Array(12*3), ibr=new Float32Array(12);
      for(var m=0;m<12;m++){ var pc=this.nuc[m].proton?this.protonCol:this.neutronCol; icol[m*3]=pc.r; icol[m*3+1]=pc.g; icol[m*3+2]=pc.b; ibr[m]=0.6+0.4*ctx.rng(); }
      sgeo.setAttribute('aCol',new T.InstancedBufferAttribute(icol,3)); sgeo.setAttribute('aBr',new T.InstancedBufferAttribute(ibr,1));
      this.nucMat=new T.ShaderMaterial({ transparent:true, depthTest:false, depthWrite:false, blending:T.AdditiveBlending, side:T.FrontSide,
        uniforms:{ uT:{ value:0 }, uK:{ value:0 }, uSeethe:{ value:0 }, uR:{ value:NUC_R } },
        vertexShader:'attribute vec3 aCol; attribute float aBr; uniform float uR; varying vec3 vC; varying vec3 vN; varying vec3 vWp; varying vec3 vP; varying float vBr; varying float vNear; void main(){ vC=aCol; vBr=aBr; vP=normalize(position); mat4 im=modelMatrix*instanceMatrix; vN=normalize(mat3(im)*normal); vec4 wp=im*vec4(position,1.0); vWp=wp.xyz; vec3 cen=(im*vec4(0.0,0.0,0.0,1.0)).xyz; float dc=length(cameraPosition-cen)/uR; vNear=mix(0.22,1.0,smoothstep(0.85,2.0,dc)); gl_Position=projectionMatrix*viewMatrix*wp; }',
        fragmentShader:['uniform float uT; uniform float uK; uniform float uSeethe; varying vec3 vC; varying vec3 vN; varying vec3 vWp; varying vec3 vP; varying float vBr; varying float vNear;',
          'float hash3(vec3 p){ p=fract(p*0.3183099+vec3(0.1,0.2,0.3)); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }',
          'float vnoise(vec3 x){ vec3 i=floor(x), f=fract(x); f=f*f*(3.0-2.0*f); return mix(mix(mix(hash3(i),hash3(i+vec3(1.0,0.0,0.0)),f.x),mix(hash3(i+vec3(0.0,1.0,0.0)),hash3(i+vec3(1.0,1.0,0.0)),f.x),f.y),mix(mix(hash3(i+vec3(0.0,0.0,1.0)),hash3(i+vec3(1.0,0.0,1.0)),f.x),mix(hash3(i+vec3(0.0,1.0,1.0)),hash3(i+vec3(1.0,1.0,1.0)),f.x),f.y),f.z); }',
          'void main(){ vec3 V=normalize(cameraPosition-vWp); float mu=abs(dot(normalize(vN),V));',
          '  float sk=vnoise(vP*3.5+vec3(uT*0.35*vBr,uT*0.2,0.0)); float body=pow(mu,1.35)*(0.80+0.30*sk)*(0.85+0.25*uSeethe);',
          '  float a=body*0.58*uK*vNear; gl_FragColor=vec4(vC*(0.45+0.55*mu*mu), a); }'].join('\n') });
      this.nucMesh=new T.InstancedMesh(sgeo,this.nucMat,12); this.nucMesh.frustumCulled=false; this.nucMesh.renderOrder=3; ctx.scene.add(this.nucMesh);
      this._m=new T.Matrix4(); this._q=new T.Quaternion(); this._v=new T.Vector3(); this._v2=new T.Vector3(); this._v3=new T.Vector3(); this._s=new T.Vector3(1,1,1);
      /* THE ATOM'S CLOUD, from inside, at the seam: a haze that fills the glass — ten thousand times the nucleus, so nothing of its shape can show */
      this.haze=new T.Sprite(new T.SpriteMaterial({ map:ctx.TEX_SOFT, color:new T.Color(0.80,0.85,0.94), transparent:true, depthTest:false, depthWrite:false, blending:T.AdditiveBlending, opacity:0 })); this.haze.renderOrder=1; ctx.scene.add(this.haze);
      /* the floor's own point: what the map draws when it draws nothing else — a soft gold breath under the quark, sized from the frame */
      this.floor=new T.Sprite(new T.SpriteMaterial({ map:ctx.TEX_SOFT, color:c3(ctx.colours.gold), transparent:true, depthTest:false, depthWrite:false, blending:T.AdditiveBlending, opacity:0 })); this.floor.renderOrder=2; ctx.scene.add(this.floor);
      this.lastS=null;
      for(var z=0;z<this.strands.length;z++) this.deal(ctx,this.strands[z],-16,0.001);
    },
    /* one strand's new life: which nucleon, which two of its quarks, where along the line between them, how it bulges; a ray from the floor's quark if it is one */
    deal:function(ctx,st,s,W){
      var rng=ctx.rng;
      var pOther=ctx.ss((s+15.0)/0.7)*(11/12);                             // above the proton the glue spreads through all twelve
      st.n=(rng()<pOther)?(1+Math.floor(rng()*11)):0;
      st.a=Math.floor(rng()*3); st.b=(st.a+1+Math.floor(rng()*2))%3;
      st.u=rng()*0.85; st.du=0.10+0.22*rng();
      st.life=STRAND_LIFE[0]+(STRAND_LIFE[1]-STRAND_LIFE[0])*rng(); st.t0=this.t;
      st.lat.set(rng()-0.5,rng()-0.5,rng()-0.5).normalize(); st.amp=(rng()-0.5)*0.22;
      st.dir.set(rng()-0.5,rng()-0.5,rng()-0.5).normalize();
      st.len=Math.min(0.55,(0.35+0.65*rng())*W);                             // a ray is as long as the frame, and never longer than the proton
      if(st.ray){ st.n=0; st.a=0; }
    },
    tick:function(ctx,t,dt,s,k){
      var T=ctx.THREE, D=ctx.D(s), W=ctx.W(s), TAU=ctx.TAU, ss=ctx.ss;
      this.t=t;
      var count=ctx.count(), seethe=Math.pow(1-count,1.8);                  // her count: a flash and a fall, 1.357 a second
      var breath=0.5+0.5*Math.sin(t*TAU/BREATH_S);
      var silver=1-0.35*ctx.silver();
      /* the eases of the line (each applied only while it is live):
         e0 — the floor's quark leaves the origin for its seat in the triangle (−16.2 → −15.2)
         e1 — the proton leaves the origin for its seat in the nucleus, and the nucleus's middle comes to the origin (−15.0 → −14.2)
         kDeep — below −18.5 nothing but the point */
      var e0=ss((s+16.2)/1.0), e1=ss((s+15.0)/0.8), kDeep=ss((s+18.75)/0.5);
      var nucFrac=6.5/W, shrink=ctx.clamp(nucFrac/0.4,0.3,1), kGlue=k*kDeep, kNuc=k*ss((s+15.7)/0.7)*shrink;   // the fuzz: nothing while the eye is deep inside nucleon 0; thinner as the nucleus shrinks on the glass, so twelve overlapping fuzzes never burn white
      /* the nucleus tumbles; every nucleon breathes with it and turns its own triangle */
      this.tumble+=dt*0.05; this.tumbleQ.setFromAxisAngle(this.tumbleAx,this.tumble);
      var bs=1+0.045*(breath-0.5)*2;
      var shift=this._v3.copy(this.nuc[0].seat).applyQuaternion(this.tumbleQ).multiplyScalar(-bs*(1-e1));   // nucleon 0 at the origin below the nucleus's scale (its breathed seat, so the breath never moves it)
      for(var i=0;i<12;i++){
        var N=this.nuc[i];
        N.pos.copy(N.seat).applyQuaternion(this.tumbleQ).multiplyScalar(bs).add(shift);
        N.ang+=dt*N.w; N.q.setFromAxisAngle(N.ax,N.ang);
        for(var j=0;j<3;j++){
          var th=j*TAU/3, qv=this._v.set(Math.cos(th)*Q_R,Math.sin(th)*Q_R,0).applyQuaternion(N.q);
          /* the jitter: two sines of its own, and her count in the amplitude */
          var ph=i*1.7+j*2.3, ja=Q_JIT*(0.7+0.5*seethe);
          qv.x+=ja*Math.sin(t*4.1+ph)*Math.cos(t*1.3+ph*0.7); qv.y+=ja*Math.sin(t*3.3+ph*1.9); qv.z+=ja*Math.cos(t*4.7+ph*0.4)*Math.sin(t*0.9+ph);
          if(!N.qk[j]) N.qk[j]=new T.Vector3();
          N.qk[j].copy(qv);
        }
        if(i===0){
          /* the floor's quark: at the origin below e0, plus a wander that is the same share of the frame at every zoom — the point that never resolves */
          var q0=N.qk[0], off=this._v2.copy(q0).multiplyScalar(-(1-e0));
          for(var jj=0;jj<3;jj++) N.qk[jj].add(off);
          var wd=Q_WANDER*W*(1-ss((s+15.6)/1.2));
          N.qk[0].x+=wd*Math.sin(t*2.9+0.4)*Math.cos(t*0.7); N.qk[0].y+=wd*Math.cos(t*2.3+1.1); N.qk[0].z+=wd*0.3*Math.sin(t*1.7);
        }
        for(var jq=0;jq<3;jq++){ var P=this._v.copy(N.qk[jq]).add(N.pos); var ix=(i*3+jq); this.qPos[ix*3]=P.x; this.qPos[ix*3+1]=P.y; this.qPos[ix*3+2]=P.z;
          /* alpha: the floor's quark always; the other two of nucleon 0 once the floor's has left the origin; the others with the nucleus */
          var a=(i===0)?((jq===0)?1:e0):e1; a*=k*silver; if(i===0&&jq===0) a=Math.max(a,k*0.9);
          this.qA[ix]=a*(0.75+0.25*seethe)*shrink; }
        /* the fuzz's matrix */
        this._m.compose(N.pos,this._q.identity(),this._s); this.nucMesh.setMatrixAt(i,this._m);
      }
      this.qGeo.attributes.position.needsUpdate=true; this.qGeo.attributes.aA.needsUpdate=true;
      this.nucMesh.instanceMatrix.needsUpdate=true;
      this.nucMat.uniforms.uT.value=t; this.nucMat.uniforms.uK.value=kNuc*silver; this.nucMat.uniforms.uSeethe.value=seethe;
      /* the points: cores a few px, halos a hand — the halos swell a little on her count */
      this.coreMat.uniforms.uPx.value=(4.6+1.2*seethe)*(0.6+0.4*shrink); this.haloMat.uniforms.uPx.value=(40+14*seethe)*(0.7+0.3*kDeep)*(0.4+0.6*shrink);
      /* THE GLUE, dealt: a strand lives its life between two quarks of its nucleon (a bulge to the side), or as a ray from the floor's quark, and is dealt again */
      var mixRay=1-ss((s+15.9)/0.9);                                          // rays below the proton's scale; strands between quarks above it
      for(var z=0;z<this.ns;z++){
        var st=this.strands[z], age=t-st.t0;
        if(age>st.life||age<0){ this.deal(ctx,st,s,W); age=0; }
        var env=Math.sin(Math.PI*Math.min(age/st.life,1)); env*=env;
        var N2=this.nuc[st.n], A=N2.qk[st.a], B=N2.qk[st.b];
        var p0=this._v.copy(A).lerp(B,st.u), p1=this._v2.copy(A).lerp(B,Math.min(1,st.u+st.du));
        var bulge=Math.sin(Math.PI*st.u)*st.amp; p0.addScaledVector(st.lat,bulge); p1.addScaledVector(st.lat,Math.sin(Math.PI*Math.min(1,st.u+st.du))*st.amp);
        if(st.ray&&mixRay>0){ var r0=N2.qk[0], r1=this._v3.copy(r0).addScaledVector(st.dir,st.len); p0.lerp(r0,mixRay); p1.lerp(r1,mixRay); }
        p0.add(N2.pos); p1.add(N2.pos);
        var b6=z*6; this.sPos[b6]=p0.x; this.sPos[b6+1]=p0.y; this.sPos[b6+2]=p0.z; this.sPos[b6+3]=p1.x; this.sPos[b6+4]=p1.y; this.sPos[b6+5]=p1.z;
        var ca=this.cols[st.a], cb=this.cols[st.b];
        this.sCol[b6]=ca.r; this.sCol[b6+1]=ca.g; this.sCol[b6+2]=ca.b; this.sCol[b6+3]=cb.r; this.sCol[b6+4]=cb.g; this.sCol[b6+5]=cb.b;
        var na=(st.n===0)?1:e1, aa=env*(0.55+0.45*seethe)*na*shrink;
        this.sA[z*2]=aa; this.sA[z*2+1]=aa*0.6;
      }
      this.sGeo.attributes.position.needsUpdate=true; this.sGeo.attributes.aCol.needsUpdate=true; this.sGeo.attributes.aA.needsUpdate=true;
      this.strandMat.uniforms.uK.value=kGlue*silver;
      /* the haze of the atom at the top; the floor's breath at the bottom */
      var hz=D*7; this.haze.scale.set(hz,hz,1); this.haze.material.opacity=k*HAZE_A*ss((s+14.3)/0.9)*(0.85+0.15*seethe);
      var fs=W*0.55*(1+0.1*seethe); this.floor.scale.set(fs,fs,1); this.floor.position.copy(this.nuc[0].qk[0]).add(this.nuc[0].pos); this.floor.material.opacity=k*(1-kDeep)*0.22*silver;
      /* the realm's small voices, once per approach, as the mileposts were */
      if(this.lastS!==null){ for(var L=0;L<this.landmarks.length;L++){ var lm=this.landmarks[L]; if(lm.s<=-18.9) continue; var was=Math.abs(this.lastS-lm.s)>0.12, now=Math.abs(s-lm.s)<=0.12; if(was&&now&&k>0.5) ctx.tone(lm.tone,1.1,0.035,'sine'); } }
      this.lastS=s;
    },
    enter:function(ctx){ ctx.log('entered'); },
    leave:function(ctx){ ctx.log('left'); },
    dispose:function(){}
  };
  window.APWNP=window.APWNP||{}; (window.APWNP.mapRealms=window.APWNP.mapRealms||[]).push(R);
})();
