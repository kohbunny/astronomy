/* song.js · apwnp · THE SONG'S LIST AND ITS CLOCK (28 sep 2026; the list corrected and every duration inked 29 sep)
   ==========================================================================
   one small classic script, the same in every page that plays or mirrors the
   house's song — phone.html (the shell plays it) and music.html (the room shows
   it). one line in the <head>, after mortal.js:

       <script src="song.js"></script>

   THE RADIO LAW (his ruling, 28 sep): the song never stops; only the hearing
   does. the song is his own tracks, in this order, played end to end and round
   again; WHERE IT IS at any instant is a function of the world's clock
   (SONG.place), so everyone who opens the house hears the same track at the
   same place, and a visitor who comes back finds it where it has got to, knot
   where they left it.

   THE LIST is his (29 sep, corrected — the first list named files that did
   knot exist, and the clock walked into their silence): tock01 … tock17, then
   ticktock01 … ticktock18, then ticktock25 · 26 · 27, then squatmusic01 … 05
   — forty-three, on kohmedia (the house's one confessed origin for sound).
   THE DURATIONS (dur, seconds) are his, all forty-three inked (29 sep) — a
   round is 985 seconds, about sixteen and a half minutes — so the song starts
   at its true place with no reading at all. (a track whose figure were 0 would
   be read off its own header at the first play and kept for the sitting.)
   A DEAD TRACK (a file that is knot there, or will knot play) keeps its
   slot in the round — the round never changes under anyone's feet — and the
   next living track plays in its place: a missing file is a borrowed
   eighteen seconds, never a silence and never a jump.
   [SYNC] none: this is the one copy. music.html and phone.html both read it.

   nothing here plays anything. no Math.random, no network, no storage.
   ========================================================================== */
(function(){
  'use strict';
  var W=window; if(W.SONG&&W.SONG.list) return;
  var BASE='https://kohmedia.b-cdn.net/';
  var LIST=[];
  var i;
  function two(n){ return (n<10?'0':'')+n; }
  /* THE DURATIONS, INKED (his, 28–29 sep): every tock and ticktock is 18 seconds, but ticktock26 (9) and
     ticktock27 (11); the five squatmusic tracks are 1:08 · 1:27 · 0:53 · 0:44 · 1:05. the inked figures are THE LAW
     for the clock — everyone's round is the same round — and the voice re-seats itself to them at every boundary,
     so a file a few hundredths longer or shorter than its figure costs nothing. */
  for(i=1;i<=17;i++) LIST.push({ file:'tock'+two(i)+'.mp3', name:'tock '+two(i), dur:18 });
  for(i=1;i<=18;i++) LIST.push({ file:'ticktock'+two(i)+'.mp3', name:'ticktock '+two(i), dur:18 });
  LIST.push({ file:'ticktock25.mp3', name:'ticktock 25', dur:18 });
  LIST.push({ file:'ticktock26.mp3', name:'ticktock 26', dur:9 });
  LIST.push({ file:'ticktock27.mp3', name:'ticktock 27', dur:11 });
  var SQUAT=[68,87,53,44,65];                      /* his, 29 sep: 1:08 · 1:27 · 0:53 · 0:44 · 1:05 */
  for(i=1;i<=5;i++)  LIST.push({ file:'squatmusic'+two(i)+'.mp3', name:'squatmusic '+two(i), dur:SQUAT[i-1] });
  for(i=0;i<LIST.length;i++){ LIST[i].url=BASE+LIST[i].file; LIST[i].i=i; }
  var EPOCH=0;                                    /* [deemed] the song has been playing since the unix epoch — 1 january 1970, 00:00 utc */
  var GUESS=180;                                  /* a track whose length is knot yet read counts as three minutes */
  /* the lengths the clock walks with: measured (this sitting) over inked over the guess. A DEAD TRACK KEEPS ITS SLOT —
     the round never changes under anyone's feet (the radio law) — and its slot is FILLED by the next living track
     (fill), so a missing file is a borrowed eighteen seconds, never a silence and never a jump. */
  function durs(measured){
    var out=[], k;
    for(k=0;k<LIST.length;k++){ var m=measured&&measured[k];
      var d=(m>0)?m:(LIST[k].dur>0?LIST[k].dur:GUESS); out.push(d); }
    return out;
  }
  function total(d){ var s=0, k; for(k=0;k<d.length;k++) s+=d[k]; return s; }
  function dead(measured,k){ var m=measured&&measured[k]; return m<0; }
  function known(measured){ var k; for(k=0;k<LIST.length;k++){ var m=measured&&measured[k]; if(m<0) continue; if(!(m>0)&&!(LIST[k].dur>0)) return false; } return true; }
  function alive(measured){ var n=0, k; for(k=0;k<LIST.length;k++){ if(!dead(measured,k)) n++; } return n; }
  /* the track that PLAYS in slot k: k itself, or the next living one when k is dead; -1 when none lives */
  function fill(measured,k){ var n=LIST.length, j, t; if(!(k>=0)) return -1; for(t=0;t<n;t++){ j=(k+t)%n; if(!dead(measured,j)) return j; } return -1; }
  /* where the song is at the instant nowMs: the slot's index, the seconds into it, the seconds since the round began, and
     the track that plays there (play) with the seconds into THAT track (poff — the slot's offset folded into a shorter filler) */
  function place(nowMs,measured){
    var d=durs(measured), T=total(d); if(!(T>0)) return { i:-1, off:0, t:0, T:0, dur:0, play:-1, poff:0 };
    var t=(((nowMs-EPOCH)/1000)%T+T)%T, k, acc=0;
    for(k=0;k<d.length;k++){ if(t<acc+d[k]) break; acc+=d[k]; }
    if(k>=d.length){ k=d.length-1; acc=T-d[k]; }
    var off=t-acc, pl=fill(measured,k), poff=off;
    if(pl>=0&&pl!==k){ var pd=d[pl]; poff=(pd>0)?(off%pd):0; }
    return { i:k, off:off, t:t, T:T, dur:d[k], play:pl, poff:poff, pdur:(pl>=0?d[pl]:0) };
  }
  W.SONG={ list:LIST, epoch:EPOCH, artist:'nobody', durs:durs, total:total, known:known, alive:alive, dead:dead, fill:fill, place:place,
           name:function(k){ var t=LIST[k]; return t?t.name:''; } };
})();
