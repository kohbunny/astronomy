/* pressmap.js — the press for map.html. runs the whole excursion headless with fake glass:
   a fake camera (cam.y4m), a fake mic humming 174 hz (hum.wav), a fake fix, a synthetic gyro,
   and asserts each scene stands, no console error lands, and the last address is the shelf.
   usage: node pressmap.js [--headed] [--fast] [--scene=hold]   (serves this folder on :8765)
   flags land on map.html as ?test&fast… ; screenshots go to ./press/  */
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const ARGS = process.argv.slice(2), has = f => ARGS.includes(f), val = k => (ARGS.find(a => a.startsWith(k + '=')) || '').split('=')[1];
const PORT = 8765, ROOT = __dirname;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.png': 'image/png', '.mp3': 'audio/mpeg' };
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0] === '/' ? '/map.html' : req.url.split('?')[0]));
  fs.readFile(p, (e, d) => { if (e) { res.writeHead(404); res.end(); return; } res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' }); res.end(d); });
});
const wait = ms => new Promise(r => setTimeout(r, ms));
let fails = 0; const ok = (c, m) => { console.log((c ? '  ✓ ' : '  ✗ ') + m); if (!c) fails++; };
(async () => {
  await new Promise(r => server.listen(PORT, r));
  fs.mkdirSync(path.join(ROOT, 'press'), { recursive: true });
  const exe = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;
  const browser = await chromium.launch({
    headless: !has('--headed'), executablePath: exe,
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream',
      '--use-file-for-fake-video-capture=' + path.join(ROOT, 'cam.y4m'), '--use-file-for-fake-audio-capture=' + path.join(ROOT, 'hum.wav'),
      '--autoplay-policy=no-user-gesture-required', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
  });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, permissions: ['camera', 'microphone', 'geolocation'], geolocation: { latitude: 34.05, longitude: -118.24 }, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' });
  await ctx.grantPermissions(['camera', 'microphone', 'geolocation'], { origin: 'http://localhost:' + PORT });
  const page = await ctx.newPage();
  const errors = [], logs = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => { const t = m.text(); logs.push(t); if (m.type() === 'error' && !/net::|Failed to load resource|CORS|arcgisonline|kohmedia/.test(t)) errors.push(t); });
  // the shelf: intercept the way home so the press can read the address
  let home = null; await page.route('**/phone.html*', r => { home = r.request().url(); r.fulfill({ status: 200, contentType: 'text/html', body: '<title>shelf</title>' }); });
  // hermetic by default: the tiles and the relics are refused at once (the page degrades to the dealt earth and the silent shelf, as it must);
  // a hanging tile would hold the load event — and playwright's screenshots — hostage. --net lets them through.
  if (!has('--net')) await page.route(/^https?:\/\/(?!localhost)/, r => r.abort());
  const fast = has('--slow') ? '' : '&fast';
  const scene = val('--scene'); const url = 'http://localhost:' + PORT + '/map.html?test&low' + fast + '&enter=tile' + (scene ? '&scene=' + scene : '');
  console.log('press → ' + url);
  await page.goto(url); await wait(1200);
  const st = () => page.evaluate(() => window.__map && window.__map.S.state);
  const shot = n => page.screenshot({ path: path.join(ROOT, 'press', n + '.png') });
  const untilState = async (s, ms) => { const t0 = Date.now(); while (Date.now() - t0 < ms) { if (await st() === s) return true; await wait(150); } return false; };
  ok(await page.evaluate(() => !!window.__map), 'the page stood (window.__map)');
  if (!scene) ok(await st() === 'cold', 'cold, waiting for the boarding tap');
  await shot('01-cold');
  if (!scene) {
    await page.touchscreen.tap(195, 500); await wait(1600);
    ok(await st() === 'room', 'boarded → room'); await shot('02-room');
    const cam = await page.evaluate(() => document.getElementById('cam').classList.contains('on'));
    ok(cam, 'the room revealed (camera on)');
    // THE WAY (pass 1.2): the strip lights the room, the way-line says press GO and stays
    const wayRoom = await page.evaluate(() => ({ strip: document.getElementById('strip').classList.contains('on'), lit: (document.querySelector('#strip span.on') || {}).textContent, way: document.getElementById('way').classList.contains('on') && document.getElementById('way').textContent }));
    ok(wayRoom.strip && wayRoom.lit === 'room' && /GO/.test(wayRoom.way || ''), 'the strip lights "room" and the way says press GO (' + (wayRoom.way || '—').slice(0, 40) + '…)');
    ok(await page.evaluate(() => window.__map.rt()), 'the glass\'s target stands (a render target for the refraction)');
    // GO: the ring is at the console; the press presses it through the api (the ray needs the exact pixel; the tap path is exercised by hand)
    await page.evaluate(() => window.__map.go()); await wait(400);
    ok(await st() === 'dim', 'GO → dim (the place asked for)');
    ok(await untilState('rise', 40000), 'the street stands → rise'); await wait(600); await shot('03-rise');
    const geoState = await page.evaluate(() => window.__map.geo.state); ok(geoState === 'have' || geoState === 'coarse', 'the fix landed or the city stood in (' + geoState + ')');
    ok(await untilState('hold', 60000), 'the marble → hold'); await wait(800); await shot('04-hold');
    const fovHold = await page.evaluate(() => window.__map.fov()); ok(fovHold > 66, 'the glass opens wide from the hold on (fov ' + fovHold.toFixed(0) + '°)');
    const alt = await page.evaluate(() => window.__map.ship.alt); ok(alt > 2, 'the hold is high: the earth a marble (alt ' + alt.toFixed(2) + ' r)');
    // the gyro: the press turns the phone toward her by hand — first a wrong way, then the right way
    const dir = await page.evaluate(() => { const m = window.__map; return { below: m.S.below, angle: m.S.angle }; });
    console.log('    her: below=' + dir.below + ' angle=' + dir.angle.toFixed(1));
    await page.evaluate(() => window.__map.orient(0, 80, 0)); await wait(1500);   // held upright, facing north-ish
    const a1 = await page.evaluate(() => window.__map.S.angle); console.log('    upright: angle ' + a1.toFixed(1));
    await shot('05-hold-upright');
    // THE FINDER: with her off the glass the arrow stands at the edge and the way says turn toward it
    const fnd = await page.evaluate(() => ({ arrow: document.getElementById('finder').classList.contains('on'), deg: document.querySelector('#finder .deg').textContent, way: document.getElementById('way').textContent }));
    ok(fnd.arrow && /°/.test(fnd.deg) && /arrow/.test(fnd.way), 'the finder\'s arrow points the way (' + fnd.deg + ')');
    // sweep: find the orientation that points at her (the press brute-forces alpha/beta)
    let best = null;
    for (let b = -90; b <= 180; b += 30) for (let a = 0; a < 360; a += 30) {
      await page.evaluate(([a, b]) => window.__map.orient(a, b, 0), [a, b]); await wait(60);
      const ang = await page.evaluate(() => { const m = window.__map; return m.S.angleT; });
      if (!best || ang < best.ang) best = { a, b, ang };
    }
    console.log('    best sweep: α' + best.a + ' β' + best.b + ' → ' + best.ang.toFixed(1) + '°');
    // refine
    for (let k = 0; k < 4; k++) { let nb = best; for (let db = -12; db <= 12; db += 4) for (let da = -12; da <= 12; da += 4) { const a = best.a + da, b = best.b + db; await page.evaluate(([a, b]) => window.__map.orient(a, b, 0), [a, b]); await wait(120); const ang = await page.evaluate(() => window.__map.S.angleT); if (ang < nb.ang) nb = { a, b, ang }; } best = nb; }
    await page.evaluate(([a, b]) => window.__map.orient(a, b, 0), [best.a, best.b]); await wait(2500);
    const ang2 = await page.evaluate(() => window.__map.S.angle); console.log('    refined: α' + best.a + ' β' + best.b + ' → ' + ang2.toFixed(1) + '°');
    ok(ang2 < 6, 'the gyro can be turned onto her (angle < 6°)');
    await wait(900); await shot('06-hold-found');
    const lockOn = await page.evaluate(() => document.getElementById('lock').classList.contains('on')); ok(lockOn, 'the lock rose');
    const ret = await page.evaluate(() => ({ on: document.getElementById('reticle').classList.contains('on'), way: document.getElementById('way').textContent }));
    ok(ret.on && /LOCK/.test(ret.way), 'the ring closes on her and the way says press LOCK');
    await page.evaluate(() => window.__map.lock()); await wait(300);
    ok(await st() === 'card', 'lock → card'); await wait(1400); await shot('07-card');
    await page.evaluate(() => window.__map.hum()); const dep = await untilState('depart', 6000);
    ok(dep, 'hum → depart (the mic opened or the hold stood in)');
    // THE SEATS: the eye leaves through the nose to the seat ahead, looking back at the egg with the earth beyond, then comes round
    await wait(250);   // a frame or two: the seat is placed by the loop, knot by the state
    const orb1 = await page.evaluate(() => window.__map.S.orbit); ok(orb1 > 2.9, 'the eye stands on the far side of the egg from the earth — the earth shot (orbit ' + (orb1 * 57.3).toFixed(0) + '°)');
    await wait(300); await shot('08a-depart-ahead');
    await wait(2000); await shot('08-depart');
    const v1 = await page.evaluate(() => window.__map.ship.vel); ok(v1 > 0.2, 'the ship flies (vel ' + v1.toFixed(2) + ')');
    const thr = await page.evaluate(() => ({ thr: window.__map.ship.thr, cruise: window.__map.CRUISE })); ok(thr.thr >= thr.cruise - 0.05, 'THE AUTOPILOT holds at least the cruise (thr ' + thr.thr.toFixed(2) + ' ≥ ' + thr.cruise + ')');
    const wayFly = await page.evaluate(() => document.getElementById('way').classList.contains('on') && document.getElementById('way').textContent); ok(/flies itself/.test(wayFly || ''), 'the way says the ship flies itself');
    await wait(1200); const orb2 = await page.evaluate(() => window.__map.S.orbit); ok(orb2 < 0.3, 'the eye has come round behind (orbit ' + (orb2 * 57.3).toFixed(0) + '°)');
    ok(await untilState('tunnel', 90000), 'past the moon → tunnel'); await wait(1500); await shot('09-tunnel');
    // ride to the first mileposts
    await wait(2500); await shot('10-tunnel-mars');
    const armed = await page.evaluate(() => window.__map.S.armed && window.__map.S.armed.id); console.log('    armed: ' + armed);
    const chase = await page.evaluate(() => ({ k: window.__map.S.chase, egg: window.__map.S.eggScreen }));
    ok(chase.k > 0.9 && chase.egg && chase.egg.y > 422, 'the chase view stands, the egg below the middle of the glass (' + (chase.egg ? Math.round(chase.egg.x) + ',' + Math.round(chase.egg.y) : '—') + ')');
    const glass = await page.evaluate(() => ({ f: window.__map.egg.glassF.visible, k: window.__map.egg.glassFMat.uniforms.uK.value, old: window.__map.egg.hullF.visible })); ok(glass.f && glass.k > 0.95 && !glass.old, 'THE GLASS stands outside (uK ' + glass.k.toFixed(2) + '), the inner skins gone');
    // the hand on the egg: a held touch on it flies
    if (chase.egg) { await page.touchscreen.tap(Math.round(chase.egg.x), Math.round(chase.egg.y)); await wait(300); const et = await page.evaluate(() => window.__map.S.eggTouch); ok(et > 0.2, 'the egg answers the hand (eggTouch ' + (et || 0).toFixed(2) + ')'); }
    ok(await untilState('her', 240000), 'the tunnel ends → her'); await wait(2000); await shot('11-her');
    await wait(1500); await shot('12-her-card');
    const cardOn = await page.evaluate(() => document.getElementById('cardHer').classList.contains('on')); ok(cardOn, 'the first card stands');
    for (let i = 0; i < 5; i++) { await page.evaluate(() => window.__map.next()); await wait(250); }
    await shot('13-her-last');
    await page.evaluate(() => window.__map.next()); await wait(300);
    ok(await st() === 'maw', 'through the teeth → maw'); await wait(3500); await shot('14-maw');
    const face = await page.evaluate(() => document.getElementById('cam').classList.contains('face')); ok(face, 'the throat\'s mirror asked for the front camera');
    // read the hud before the way home takes the page
    try { const fpsLine = await page.evaluate(() => window.__map.S.fps); console.log('    fps (swiftshader): ' + fpsLine); const l = await page.evaluate(() => window.__map.log.slice(-12)); console.log('    log:\n      ' + l.join('\n      ')); } catch (e) {}
    { const t0 = Date.now(); while (!home && Date.now() - t0 < 30000) await wait(300); }
    ok(!!home && /phone\.html\?door=maps/.test(home), 'home: ' + home);
  } else {
    await wait(4000); await shot('scene-' + scene);
    console.log('    state: ' + await st());
  }
  if (scene) { try { const fpsLine = await page.evaluate(() => window.__map.S.fps); console.log('    fps (swiftshader): ' + fpsLine); const l = await page.evaluate(() => window.__map.log.slice(-12)); console.log('    log:\n      ' + l.join('\n      ')); } catch (e) {} }
  ok(errors.length === 0, 'no page errors' + (errors.length ? ':\n      ' + errors.join('\n      ') : ''));
  await browser.close(); server.close();
  console.log(fails ? ('\n' + fails + ' failed') : '\nall green');
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
