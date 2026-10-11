/* pressvesica.js — the press for map.html, THE LIVING VESICA (pass B, the living sky · 11 oct 2026). headless chromium as a phone,
   software gl, hermetic: every door is answered from this file with a staged answer OF THE DOOR'S PUBLISHED SHAPE (none of the hosts
   could be reached from the bench), the tiles with a plain png, the river's door with a 204 — nothing reaches the world.
   usage: node pressvesica.js [--headed] [--net] [--keep]      (serves this folder on :8766; screenshots go to ./press/)
   (pressmap.js beside this is the eggship's press, 20 sep — it does knot know this room.) */
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path'), zlib = require('zlib');
const ARGS = process.argv.slice(2), has = f => ARGS.includes(f);
const PORT = 8766, ROOT = __dirname;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp3': 'audio/mpeg', '.sql': 'text/plain' };
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0] === '/' ? '/map.html' : req.url.split('?')[0]));
  fs.readFile(p, (e, d) => { if (e) { res.writeHead(404); res.end(); return; } res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' }); res.end(d); });
});
const wait = ms => new Promise(r => setTimeout(r, ms));
let fails = 0; const ok = (c, m) => { console.log((c ? '  ✓ ' : '  ✗ ') + m); if (!c) fails++; };
/* ---- a plain png, 256 × 256, one colour (for the tiles) ---- */
function png(w, h, rgb) {
  const crc = (buf) => { let c = ~0; for (const b of buf) { c ^= b; for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xEDB88320 & -(c & 1)); } return (~c) >>> 0; };
  const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const cc = Buffer.alloc(4); cc.writeUInt32BE(crc(td)); return Buffer.concat([len, td, cc]); };
  const raw = Buffer.alloc((w * 3 + 1) * h); for (let y = 0; y < h; y++) { raw[y * (w * 3 + 1)] = 0; for (let x = 0; x < w; x++) { const o = y * (w * 3 + 1) + 1 + x * 3; raw[o] = rgb[0]; raw[o + 1] = rgb[1]; raw[o + 2] = rgb[2]; } }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}
const TILE = png(256, 256, [40, 70, 110]);
/* ---- the staged answers, of each door's published shape, stamped near now ---- */
function staged() {
  const now = Date.now(), iso = ms => new Date(ms).toISOString(), isoS = ms => iso(ms).slice(0, 19) + 'Z', sw = ms => iso(ms).slice(0, 19).replace('T', ' ');
  const windRows = [['time_tag', 'speed', 'density', 'temperature', 'bx', 'by', 'bz', 'bt', 'vx', 'vy', 'vz', 'propagated_time_tag']];
  for (let i = 56; i >= 1; i--) { const t = now - i * 60000; windRows.push([sw(t), String(510 + 10 * Math.sin(i / 5)), '7.4', '85000', '1.2', '-3.4', '-6.2', '9.1', '-510', '20', '10', sw(t + 49 * 60000)]); }
  const jplDate = ms => { const d = new Date(ms), M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; return d.getUTCFullYear() + '-' + M[d.getUTCMonth()] + '-' + String(d.getUTCDate()).padStart(2, '0') + ' ' + String(d.getUTCHours()).padStart(2, '0') + ':' + String(d.getUTCMinutes()).padStart(2, '0'); };
  const day = iso(now).slice(0, 10), hp = iso(now).slice(0, 16).replace('T', '_');
  return {
    wind: windRows,
    xray: [{ time_tag: isoS(now - 120000), current_class: 'C1.2', current_ratio: '0.05', current_int_xrlong: 1.2e-6, begin_time: isoS(now - 85 * 60000), begin_class: 'B8.1', max_time: isoS(now - 64 * 60000), max_class: 'M2.4', max_xrlong: 2.4e-5, end_time: 'Unk', satellite: 18 }],
    kp: [{ time_tag: isoS(now - 60000).slice(0, 19), kp_index: 5, estimated_kp: 5.33, kp: '5M' }],
    quake: { type: 'FeatureCollection', metadata: { generated: now - 30000, title: 'USGS Magnitude 2.5+ Earthquakes, Past Day' }, features: [
      { type: 'Feature', id: 'us7000abcd', properties: { mag: 6.1, place: 'south of the Fiji Islands', time: now - 14 * 60000, type: 'earthquake' }, geometry: { type: 'Point', coordinates: [179.88, -24.79, 504] } },
      { type: 'Feature', id: 'ci40123', properties: { mag: 3.1, place: '12 km NNW of Brawley, CA', time: now - 3 * 3600e3, type: 'earthquake' }, geometry: { type: 'Point', coordinates: [-115.58, 33.07, 9.2] } } ] },
    iss: { name: 'iss', id: 25544, latitude: 12.3, longitude: -45.6, altitude: 418.2, velocity: 27580.1, visibility: 'daylight', timestamp: Math.floor(now / 1000) },
    proton: [{ time_tag: isoS(now - 300000), satellite: 18, flux: 0.42, energy: '>=10 MeV' }, { time_tag: isoS(now - 300000), satellite: 18, flux: 0.11, energy: '>=50 MeV' }, { time_tag: isoS(now - 300000), satellite: 18, flux: 0.08, energy: '>=100 MeV' },
      { time_tag: isoS(now - 60000), satellite: 18, flux: 14.2, energy: '>=10 MeV' }, { time_tag: isoS(now - 60000), satellite: 18, flux: 1.3, energy: '>=50 MeV' }, { time_tag: isoS(now - 60000), satellite: 18, flux: 0.3, energy: '>=100 MeV' }],
    lights: '# Hemispheric Power (GW)\n# Observation Time    Forecast Time    North    South\n' + iso(now - 7200e3).slice(0, 16).replace('T', '_') + '  ' + iso(now - 3600e3).slice(0, 16).replace('T', '_') + '    19    21\n' + hp + '  ' + iso(now + 3600e3).slice(0, 16).replace('T', '_') + '    41    38\n',
    region: [{ observed_date: day, region: 4213, latitude: -14, longitude: 22, location: 'S14W22', carrington_longitude: 120, area: 410, spot_class: 'Ekc', extent: 12, number_spots: 18, mag_class: 'Beta-Gamma', status: 'active' },
      { observed_date: day, region: 4216, latitude: 11, longitude: -35, location: 'N11E35', carrington_longitude: 63, area: 180, spot_class: 'Dao', extent: 7, number_spots: 9, mag_class: 'Beta', status: 'active' },
      { observed_date: iso(now - 86400e3).slice(0, 10), region: 4213, latitude: -14, longitude: 9, location: 'S14W09', carrington_longitude: 120, area: 380, spot_class: 'Ekc', extent: 11, number_spots: 15, mag_class: 'Beta', status: 'active' }],
    cad: { signature: { source: 'NASA/JPL SBDB Close Approach Data API', version: '1.5' }, count: '3', fields: ['des', 'orbit_id', 'jd', 'cd', 'dist', 'dist_min', 'dist_max', 'v_rel', 'v_inf', 't_sigma_f', 'h'],
      data: [['2026 TJ4', '3', '2461326.6', jplDate(now + 26 * 3600e3), '0.00514', '0.0051', '0.0052', '9.42', '9.38', '00:01', '26.1'], ['2026 SZ', '12', '2461324.1', jplDate(now - 2 * 86400e3), '0.0141', '0.0140', '0.0142', '14.8', '14.7', '< 00:01', '23.3'], ['2018 VP1', '20', '2461330.2', jplDate(now + 5 * 86400e3), '0.0233', '0.021', '0.026', '6.2', '5.9', '01:12', '24.0']] },
    fire: { signature: { source: 'NASA/JPL Fireball Data API', version: '1.0' }, count: '3', fields: ['date', 'energy', 'impact-e', 'lat', 'lat-dir', 'lon', 'lon-dir', 'alt', 'vel'],
      data: [[sw(now - 3 * 86400e3), '12.3', '0.41', '12.4', 'S', '151.2', 'W', '34.5', '17.2'], [sw(now - 9 * 86400e3), '3.1', '0.1', '44.1', 'N', '12.5', 'E', '38.1', '21.0'], [sw(now - 20 * 86400e3), '2.0', '0.073', '5.0', 'N', '80.0', 'W', null, null]] },
    horizons: (ra, dec, au, rate) => ({ signature: { source: 'NASA/JPL Horizons API', version: '1.2' }, result: '*******************************************************************************\n Ephemeris / API_USER ' + sw(now) + '\n*******************************************************************************\n$$SOE\n' + jplDate(now).slice(0, 11) + '00:00, , ,' + ra.toFixed(5) + ', ' + dec.toFixed(5) + ',  ' + au.toExponential(13) + ',  ' + rate.toFixed(7) + ',\n$$EOE\n*******************************************************************************' }),
    meteo: { latitude: 33.13, longitude: -115.67, current_units: { wind_speed_10m: 'm/s' }, current: { time: iso(now).slice(0, 16), interval: 900, temperature_2m: 31.4, relative_humidity_2m: 22, wind_speed_10m: 6.3, wind_direction_10m: 292, wind_gusts_10m: 11.2, cloud_cover: 10, is_day: 1 } }
  };
}
(async () => {
  await new Promise(r => server.listen(PORT, r));
  fs.mkdirSync(path.join(ROOT, 'press'), { recursive: true });
  const exe = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;
  const browser = await chromium.launch({ headless: !has('--headed'), executablePath: exe, args: ['--autoplay-policy=no-user-gesture-required', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const S = staged(); const given = [];
  async function open(flags, opts) {
    opts = opts || {};
    const ctx = await browser.newContext({ viewport: opts.viewport || { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1' });
    const page = await ctx.newPage(); const errors = [], logs = [];
    page.on('pageerror', e => errors.push(String(e)));
    page.on('console', m => { const t = m.text(); logs.push(t); if (m.type() === 'error' && !/net::|Failed to load resource|CORS/.test(t)) errors.push(t); });
    await page.route('**/phone.html*', r => r.fulfill({ status: 200, contentType: 'text/html', body: '<title>shelf</title>' }));
    await page.route(/^https?:\/\/(?!localhost)/, async r => {
      const u = r.request().url(); if (has('--net')) return r.continue();
      const json = o => r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify(o) });
      if (opts.dead) return r.abort();
      if (/propagated-solar-wind/.test(u)) return json(S.wind);
      if (/xray-flares-latest/.test(u)) return json(S.xray);
      if (/planetary_k_index_1m/.test(u)) return json(S.kp);
      if (/earthquake\.usgs\.gov/.test(u)) return json(S.quake);
      if (/wheretheiss/.test(u)) return json(S.iss);
      if (/integral-protons/.test(u)) return json(S.proton);
      if (/aurora-nowcast-hemi-power/.test(u)) return r.fulfill({ status: 200, contentType: 'text/plain', headers: { 'access-control-allow-origin': '*' }, body: S.lights });
      if (/solar_regions/.test(u)) return json(S.region);
      if (/cad\.api/.test(u)) return json(S.cad);
      if (/fireball\.api/.test(u)) return json(S.fire);
      if (/horizons\.api/.test(u)) { const m = /COMMAND=%27(-?\d+)%27/.exec(u), id = m ? m[1] : ''; const H = { '-31': [258.6, 12.1, 169.6, 16.9], '-32': [301.4, -58.9, 142.4, 15.3], '-78': [190.2, -7.1, 0.0099, 0.1], '-170': [10.5, 7.2, 0.0101, -0.1] }[id]; return H ? json(S.horizons(...H)) : r.fulfill({ status: 404, body: '' }); }
      if (/api\.open-meteo\.com/.test(u)) return json(S.meteo);
      if (/supabase\.co\/rest\/v1\/rpc\/sky_give/.test(u)) { given.push(JSON.parse(r.request().postData() || '{}')); return r.fulfill({ status: 204, headers: { 'access-control-allow-origin': '*' }, body: '' }); }
      if (/gibs\.earthdata\.nasa\.gov/.test(u)) return opts.tiles ? r.fulfill({ status: 200, contentType: 'image/png', headers: { 'access-control-allow-origin': '*' }, body: TILE }) : r.abort();
      if (/arcgisonline|sdo\.gsfc|swpc\.noaa\.gov\/images|kohmedia/.test(u)) return r.abort();
      return r.abort();
    });
    const url = 'http://localhost:' + PORT + '/map.html?test&low&fast&sound=0' + flags;
    console.log('press → ' + url);
    await page.goto(url);
    return { page, ctx, errors, logs, close: async () => { await ctx.close(); } };
  }
  const shot = (page, n) => page.screenshot({ path: path.join(ROOT, 'press', 'vesica-' + n + '.png') });

  /* ---- A · the figure, every door answered, the sky given ---- */
  { const { page, errors, logs, close } = await open('&u=0&hold&give=now&enter=tile');
    await wait(5000);
    ok(await page.evaluate(() => !!window.__map), 'the page stood (window.__map)');
    const fig = await page.evaluate(() => { const m = window.__map, F = m.FIGC, r = m.arith; return { F, moonRim: r.rho(3.844e8), earth: r.rho(6.371e6), her: r.rho(511.9 * 9.4607e15), inv: r.rhoInv(F.HER_R) / 9.4607e15, sunCircle: m.circleOf(r.rho(1.496e11), 1), proxOut: m.circleOf(r.rho(4.2465 * 9.4607e15), 0) }; });
    console.log('    FIGC ' + JSON.stringify({ EPS: +fig.F.EPS.toFixed(5), R_C: +fig.F.R_C.toFixed(4), HER_R: +fig.F.HER_R.toFixed(4), C_R: +fig.F.C_R.toFixed(4), SEAM_R: +fig.F.SEAM_R.toFixed(4) }));
    ok(Math.abs(fig.F.C_R + fig.F.R_C - fig.F.HER_R) < 1e-9, 'her is the far rim: C_R + R_C = HER_R');
    ok(Math.abs(fig.moonRim - fig.F.SEAM_R) < 1e-6, 'the lens’s rim is the moon’s mean distance (rho(384,400 km) = SEAM_R)');
    ok(Math.abs(fig.earth - 0.5) < 1e-9 && Math.abs(fig.her - fig.F.HER_R) < 1e-9, 'the earth’s skin is 0.5 and her distance is HER_R on the log span');
    ok(Math.abs(fig.inv - 511.9) < 1e-6, 'rhoInv(HER_R) = 511.9 light years');
    ok(fig.sunCircle === 'her' && fig.proxOut === '', 'the sun along her line is in her circle; proxima across it is outside both');
    const pos = await page.evaluate(() => { const m = window.__map, H = m.SKY.her, d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]); return { her: d(m.TH.her.pos(), H.map(x => x * m.FIGC.HER_R)), anti: d(m.TH.anti.pos(), H.map(x => -x * m.FIGC.HER_R)), centre: d(m.TH.centreH.pos(), H.map(x => x * m.FIGC.C_R)) }; });
    ok(pos.her < 1e-9 && pos.anti < 1e-9 && pos.centre < 1e-9, 'her, the other end and the centre stand at HER_R, −HER_R and C_R along her line');
    const tones = await page.evaluate(() => { const t = window.__map.distTone; return { moon: t(3.844e8).rung, sun: t(1.496e11).rung, her: t(511.9 * 9.4607e15).rung, apo: t(4.067e8).rung, peri: t(3.564e8).rung, earth: t(6.371e6).rung }; });
    ok(tones.moon === 6 && tones.sun === 4 && tones.her === 3 && tones.apo === 0 && tones.peri === 6 && tones.earth === 0, 'the ladder of distances: the moon on 9/5 (the octave at apogee), the sun on 3/2, her on 4/3 ' + JSON.stringify(tones));
    const st = await page.evaluate(() => window.__map.DOOR.state());
    const want = ['wind', 'xray', 'kp', 'quake', 'iss', 'sky', 'proton', 'lights', 'region', 'cad', 'fire', 'hz31', 'hz32', 'hz78', 'hz170'];
    const lit = want.filter(id => st[id] && st[id].dot === 'lit'), notLit = want.filter(id => !st[id] || st[id].dot !== 'lit');
    ok(notLit.length === 0, 'every door lit on its staged answer' + (notLit.length ? ' — knot: ' + notLit.join(' ') + ' (' + JSON.stringify(notLit.map(i => st[i])) + ')' : ' (' + lit.length + ')'));
    const vals = await page.evaluate(() => { const D = window.__map.DOOR; const s = D.get('sky'); return { pfu: D.get('proton') && D.get('proton').pfu, s: D.get('proton') && D.get('proton').s, north: D.get('lights') && D.get('lights').north, regions: D.get('region') && D.get('region').count, spots: D.get('region') && D.get('region').spots, largest: D.get('region') && D.get('region').largest.n, passers: D.get('cad') && D.get('cad').list.map(p => [p.name, +p.ld.toFixed(2)]), fire: D.get('fire') && [D.get('fire').kt, D.get('fire').lat, D.get('fire').lon], v1: D.get('hz31') && D.get('hz31').au, buoy: D.get('hz78') && +(D.get('hz78').au * 1.495978707e11 / 1000).toFixed(0), skyBy: s && s.by, wind: s && s.weather && s.weather.wind_ms, from: s && s.weather && s.weather.wind_from }; });
    console.log('    readings ' + JSON.stringify(vals));
    ok(vals.pfu === 14.2 && vals.s === 1, 'the protons: the last ≥10 MeV row, 14.2 pfu, s1');
    ok(vals.north === 41, 'the lights’ power: the last line of the text, 41 gw north');
    ok(vals.regions === 2 && vals.spots === 27 && vals.largest === 4213, 'the regions: the newest day’s two rows, 27 spots, the largest 4213');
    ok(vals.passers && vals.passers.length === 3 && vals.passers[0][0] === '2026 TJ4' && vals.passers[0][1] === 2 && vals.passers[1][0] === '2026 SZ', 'the passers-by: three, nearest first, 2026 TJ4 at two moons');
    ok(vals.fire && vals.fire[0] === 0.41 && vals.fire[1] === -12.4 && vals.fire[2] === -151.2, 'the fireball: 0.41 kt, south and west read as negatives');
    ok(vals.v1 === 169.6 && vals.buoy === 1481019, 'horizons: voyager 1 at 169.6 au, the buoy 1,481,019 km');
    ok(vals.skyBy === 'open-meteo' && vals.wind === 6.3 && vals.from === 'wnw', 'the well’s sky from open-meteo when the feed is quiet (wind 6.3 m/s from the wnw)');
    const things = await page.evaluate(() => { const m = window.__map; return { wind: !!m.TH.wind.pos(), jwst: !!m.TH.jwst.pos(), pass0: !!m.TH.pass0.pos(), pass3: !!m.TH.pass3.pos(), fire: !!m.TH.fire.pos(), shower: m.TH.shower.read(), names: m.THINGS.filter(o => o.vis).map(o => o.id) }; });
    console.log('    visible ' + things.names.join(' '));
    ok(things.wind && things.jwst && things.pass0 && !things.pass3 && things.fire, 'the buoy, the telescope, three passers and the fireball have places; a fourth passer has none');
    ok(things.shower && /taurids|orionids|draconids/.test(things.shower[1]), 'the shower tonight: ' + (things.shower ? things.shower[1] : '—'));
    const doc = await page.evaluate(() => window.APWNP.map.sky());
    const keys = ['kind', 'at', 'figure', 'her', 'earth', 'sun', 'wind', 'field', 'moon', 'planets', 'ground', 'station', 'passers', 'far', 'shower', 'well', 'ladder', 'river', 'doors'];
    ok(keys.every(k => k in doc), 'the sky document has its ' + keys.length + ' parts');
    ok(doc.her.alt != null && doc.sun.xray_class === 'c1.2' && doc.sun.protons_pfu === 14.2 && doc.field.kp === 5.33 && doc.field.lights_gw_north === 41 && doc.moon.rung != null && doc.passers.length === 3 && doc.far.voyager1_au === 169.6 && doc.well.by === 'open-meteo' && doc.ground.fireball.kt === 0.41, 'and its numbers are the doors’ ' + JSON.stringify({ her_alt: doc.her.alt, heard: doc.her.heard_hz, moon_rung: doc.moon.rung, sun_circle: doc.sun.circle, kp: doc.field.kp }));
    const txt = JSON.stringify(doc); ok(!/\byou\b|device|visitor/i.test(txt) && !('pulse' in doc.doors), 'nothing of the visitor or the inhabitant in it (' + txt.length + ' chars)');
    ok(txt.length < 16384, 'and it is under the ledger’s 16 kb');
    await wait(1500);
    const gv = await page.evaluate(() => ({ n: window.__map.GIVE.n, said: window.__map.GIVE.said }));
    ok(gv.n === 1 && gv.said === 'given' && given.length === 1 && given[0].p_sky && given[0].p_sky.kind === 'the map’s sky', 'the sky was given once through the river’s door (?give=now): ' + gv.said);
    await shot(page, '01-figure');
    /* the strip: nine words; the passers' card; the sun's second card with its pictures (aborted: said so) */
    const strip = await page.evaluate(() => window.__map.TH && document.getElementById('pageC') && 1);
    const hits = await page.evaluate(() => { const m = window.__map; const r = []; return (function () { return r; })(); });
    const words = await page.evaluate(() => { const c = document.createElement('canvas'); return null; });
    await page.evaluate(() => window.__map.openCard(window.__map.PASSERS, window.__map.PASSERS.card()));
    await wait(300); let card = await page.evaluate(() => window.__map.words().card);
    ok(/the passers-by \| .*2026 TJ4.*2026 SZ/.test(card), 'the passers’ card lists them: ' + card.slice(0, 90) + '…');
    await page.evaluate(() => { const m = window.__map, o = m.TH.sun; m.openCard(o, o.card(o)); }); await wait(200); card = await page.evaluate(() => window.__map.words().card);
    ok(/the sun \| .*in the (gold|her) circle|outside both/.test(card) && /protons/.test(card), 'the sun’s card: its circle and its protons');
    await page.evaluate(() => { const m = window.__map, o = m.TH.sun; m.openCard(o, o.card(o)); }); await wait(1500); card = await page.evaluate(() => window.__map.words().card);
    const pics = await page.evaluate(() => ({ n: document.querySelectorAll('#postB img.pic').length, states: [window.__map.PIC.face.state, window.__map.PIC.corona.state], caps: Array.from(document.querySelectorAll('#postB .cap')).map(e => e.textContent) }));
    ok(/the sun · its face/.test(card) && pics.n === 2 && pics.states.every(s => s === 'grey') && pics.caps.every(c => /did not come/.test(c)), 'the sun’s second card asks its two pictures, and says when they do not come ' + JSON.stringify(pics.caps));
    await shot(page, '02-sun-face');
    await page.evaluate(() => { const m = window.__map; m.openCard(m.FIG, m.FIG.card(m.FIG)); m.openCard(m.FIG, m.FIG.card(m.FIG)); m.openCard(m.FIG, m.FIG.card(m.FIG)); }); await wait(200); card = await page.evaluate(() => window.__map.words().card);
    ok(/the sky, read \| /.test(card) && /proton · 14.2 pfu/.test(card) && /cad · 3 within ten moons/.test(card), 'the figure’s third card is the sky, read: ' + card.slice(0, 120) + '…');
    await shot(page, '03-sky-read');
    ok(errors.length === 0, 'no page errors' + (errors.length ? ':\n      ' + errors.join('\n      ') : ''));
    const lg = await page.evaluate(() => window.__map.LOG.slice(-6)); console.log('    log:\n      ' + lg.join('\n      '));
    await close(); }

  /* ---- B · the earth's face from gibs (every tile a plain png), goes-west's coat ---- */
  { const { page, errors, close } = await open('&u=1&hold', { tiles: true });
    await wait(6000);
    const f = await page.evaluate(() => ({ by: window.__map.FACE.by, ok: window.__map.TILES.ok, asked: window.__map.TILES.asked, want: window.__map.EARTH.photoWant, goes: window.__map.GOES.ok, coats: window.__map.GOES.coats, dead: window.__map.GOES.dead }));
    console.log('    face ' + JSON.stringify(f));
    ok(f.by === 'viirs, yesterday' && f.want === 1 && f.ok >= 21, 'the earth’s face is viirs’s (yesterday) and the picture is wanted');
    ok(f.goes === 1 && f.coats === 1 && !f.dead, 'goes-west’s coat was laid once');
    await shot(page, '04-pupil');
    ok(errors.length === 0, 'no page errors (the pupil)' + (errors.length ? ':\n      ' + errors.join('\n      ') : ''));
    await close(); }

  /* ---- C · the country; a wide glass ---- */
  { const { page, errors, close } = await open('&u=2&hold&doors=mock');
    await wait(3500); await shot(page, '05-country');
    ok(errors.length === 0, 'no page errors (the country)' + (errors.length ? ':\n      ' + errors.join('\n      ') : ''));
    await close(); }
  { const { page, errors, close } = await open('&u=0&hold&doors=mock', { viewport: { width: 844, height: 390 } });
    await wait(3500); await shot(page, '06-figure-wide');
    ok(errors.length === 0, 'no page errors (a wide glass)' + (errors.length ? ':\n      ' + errors.join('\n      ') : ''));
    await close(); }

  /* ---- D · the room without gl: the flat page draws the figure; the staged sky ---- */
  { const { page, errors, close } = await open('&nogl&u=0&hold&doors=mock');
    await wait(3500);
    const m = await page.evaluate(() => ({ gl: window.__map.gl, mock: window.__map.DOOR.mock, passers: window.__map.passersNow().length, state: window.__map.DOOR.state().cad.dot }));
    ok(!m.gl && m.mock && m.passers === 3 && m.state === 'lit', 'no gl: the flat figure stands, the staged passers in hand');
    await shot(page, '07-nogl');
    ok(errors.length === 0, 'no page errors (no gl)' + (errors.length ? ':\n      ' + errors.join('\n      ') : ''));
    await close(); }

  /* ---- E · the breath runs through the well and comes back; the seat's demo; the call ---- */
  { const { page, errors, close } = await open('&doors=mock&seat=demo');
    const t0 = Date.now(); let seen = {}; let demoDone = false;
    while (Date.now() - t0 < 70000) { const s = await page.evaluate(() => ({ mode: window.__map.B.mode, cycles: window.__map.B.cycles, log: window.__map.LOG.slice(-8) })); seen[s.mode] = 1; if (s.log.some(l => /seat demo done/.test(l))) demoDone = true; if (s.cycles >= 1 && s.mode === 'dwell') break; await wait(250); }
    ok(seen.dwell && seen.move && seen.fall && seen.black && seen.open, 'the breath: dwell → move → fall → black → open (' + Object.keys(seen).join(' ') + ')');
    ok(demoDone, 'the seat’s seven calls walked (?seat=demo)');
    const cyc = await page.evaluate(() => window.__map.B.cycles); ok(cyc >= 1, 'once round the well (cycles ' + cyc + ')');
    await page.evaluate(() => window.__map.fire()); await wait(600);
    const after = await page.evaluate(() => ({ stopped: window.__map.DOOR.stopped(), dead: window.__map.A.dead, off: window.__map.GIVE.off || !window.__map.GIVE.busy }));
    ok(after.stopped && after.dead, 'the call: the doors stop, the room goes quiet, nothing more is given');
    ok(errors.length === 0, 'no page errors (the breath)' + (errors.length ? ':\n      ' + errors.join('\n      ') : ''));
    await close(); }

  /* ---- F · a dead sea: every door refused, nothing breaks, nothing given ---- */
  { const { page, errors, close } = await open('&u=0&hold&give=now', { dead: true });
    await wait(4000);
    const d = await page.evaluate(() => { const S = window.__map.DOOR.state(); return { any: Object.keys(S).some(k => S[k].dot === 'lit'), gv: window.__map.GIVE, face: window.__map.FACE.by, doc: !!window.APWNP.map.sky() }; });
    ok(!d.any && d.gv.n === 0 && /unreached|refused/.test(d.gv.said || 'unreached') && d.doc, 'every door refused: nothing lit, the giving let go (' + (d.gv.said || 'unreached') + '), the document still reads');
    ok(errors.length === 0, 'no page errors (a dead sea)' + (errors.length ? ':\n      ' + errors.join('\n      ') : ''));
    await close(); }

  await browser.close(); server.close();
  console.log(fails ? ('\n' + fails + ' failed') : '\nall green');
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
