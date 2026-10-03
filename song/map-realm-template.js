/* map-realm-template.js — ONE REALM OF THE VESICA, the smallest that works: a single sprite that breathes on her count.
   copy it, rename it map-realm-<id>.js (quark · atom · cell · body · galaxy · cosmos — the ids the host knows), fill build and
   tick, and drop it beside map.html. the host finds it, or does knot; a file that is knot there changes nothing but the picture.
   this file's own id, 'template', is on no line: the host ignores it unless the bench asks for it (?only=template&s=…&test).

   THE CONTRACT (the brainstorm of 26 sep, and map.html's own four realms as worked examples — street · earth · sol · stars):
   · the realm's subject sits at the ORIGIN of ctx.scene. the eye is on +z at ctx.D(s) units, looking at the origin, +y up; the
     host tilts and precesses it (the helix) and slews the axis — a realm never touches a camera. "beyond" the subject is −z.
   · s is the log₁₀ of the eye's distance in metres from the point the map is about. span:[a,b] is where the realm is drawn;
     the host fades k over the outer 0.3 decade of it. unit is the log₁₀ of one realm unit in metres — keep the span within ±3.5
     decades of it, so nothing is ever more than a few thousand or less than a few thousandths of a unit from the eye.
   · anchor:'you' realms are built in the PLACE frame — x east, y north, z up, at the visitor's feet; their origin is the heart,
     1.3 m above the ground (the body's feet stand at −13 dm, its crown at +4). anchor:'sun' realms are built in the CELESTIAL
     frame — z the pole, x toward ra 0 — with the sun at the origin. ctx.toRealm(v) turns a celestial direction into the realm's
     frame; ctx.sun.dir · ctx.her.dir · ctx.moon.dir are already turned, and fresh every tick.
   · WORDS ARE THE HOST'S. landmarks are handed over as data (the host already types the line's own table); nothing with a word
     in it lives in a scene.
   · a realm NEVER: touches the document or the window beyond registering itself · reads location.* or history · stores anything
     · fetches, XMLHttpRequests, or sets an Image.src (only ctx.image / ctx.tile / ctx.voice — and the shelf is empty by his
     ruling 12, so ctx.image answers null and the realm draws procedural) · makes an AudioContext or an <audio> · asks any
     permission · draws a word · reaches another realm or the host's seat · touches mortal.js · uses three beyond r128 · names
     anything nobody or UNKNOWN · builds an inhabitant of its own (THE-MORTALITY-CARD, part three).
   · BUDGETS on the glass: ≤ 120k triangles + 150k points, ≤ 12 draw calls, ≤ 8 MB of decoded texture, build ≤ 200 ms, tick
     ≤ 1.5 ms on the iphone 16; ctx.LOW halves everything. build may be called late — on approach — never assume it ran at load.
   · the bench: pressrealm.js (claude's to run, knot his to deploy) loads the host with ?only=<id>&s=<from>&fast&test&jail,
     walks the span, and asserts k, the draw and triangle counts, no page errors, and that the realm touched nothing forbidden.

   ctx gives: THREE · scene (a THREE.Group) · P (173.68) · LOW · FAST · DEG · TAU · rng (mulberry32 seeded from the id) · hash01 ·
   fhash · clamp · lerp · ss · smoothstep · canvasTex(w,h,draw) · radialTex(size,stops) · TEX_SOFT · TEX_DOT · TEX_RING · colours
   { gold, her, machine, ink } · unit · span · D(s) · W(s) (the frame's width at the origin, units) · celQ · toRealm(v,out) ·
   sun.dir · her.dir · her.ly · moon.dir · gmst() · geo { lat, lon, have } · dirFromRaDec(ra,dec) · dirFromGal(l,b) · planet(i)
   (heliocentric metres, wound) · PLANETS · beat() (0..1, the visitor's heart) · count() (0..1, her P/128) · silver() (0..1, the
   life's last hour — drain your colour by it, never show it) · tone(mul,dur,gain,type) · partial(i,mul,tc) · voice(name) ·
   image(name,then) · tile(z,y,x,then) · log(msg). */
(function(){
  var R={
    id:'template', title:'the template',
    span:[-30.6,-29.0],      // drawn while s is inside. this one is off the line on purpose
    unit:-30,                // log10 of one realm unit in metres
    anchor:'you',            // 'you' (the heart) or 'sun'
    landmarks:[],            // data for the host, if any — { s, name, size, line, card:[…] }
    build:function(ctx){
      /* fill ctx.scene. ≤ 200 ms on the iphone. */
      var T=ctx.THREE, c=ctx.colours.gold.split(',').map(function(x){ return +x/255; });
      this.sp=new T.Sprite(new T.SpriteMaterial({ map:ctx.TEX_SOFT, color:new T.Color(c[0],c[1],c[2]), transparent:true, depthWrite:false, blending:T.AdditiveBlending, opacity:0 }));
      ctx.scene.add(this.sp);
      this.core=new T.Sprite(new T.SpriteMaterial({ map:ctx.TEX_DOT, color:0xffffff, transparent:true, depthWrite:false, blending:T.AdditiveBlending, opacity:0 }));
      ctx.scene.add(this.core);
      this.ph=ctx.rng()*ctx.TAU;
    },
    tick:function(ctx,t,dt,s,k){
      /* every frame while k>0. apply k (0..1) to your alphas. size things from ctx.D(s) if they must read at every scale of the span. */
      var D=ctx.D(s), br=Math.pow(1-ctx.count(),2.2), sz=D*0.28*(1+0.12*br);
      this.sp.scale.set(sz,sz,1); this.sp.material.opacity=k*(0.35+0.25*br)*(1-0.5*ctx.silver());
      var cs=D*0.05; this.core.scale.set(cs,cs,1); this.core.material.opacity=k*(0.6+0.4*br);
      this.sp.position.set(Math.sin(t*0.3+this.ph)*D*0.04,Math.cos(t*0.23+this.ph)*D*0.04,0);
    },
    enter:function(ctx){ ctx.log('entered'); },
    leave:function(ctx){ ctx.log('left'); },
    dispose:function(){}
  };
  window.APWNP=window.APWNP||{}; (window.APWNP.mapRealms=window.APWNP.mapRealms||[]).push(R);
})();
