// netlify/functions/say.js
// the song's voice, spoken — server-side proxy to elevenlabs text-to-speech.
//
// holds ELEVENLABS_API_KEY and your voice ids so the browser never sees them.
//
// deploy: netlify/functions/say.js
//   env (netlify > project configuration > environment variables, scope functions):
//     ELEVENLABS_API_KEY          = your elevenlabs key
//     ELEVENLABS_VOICE_ID         = your v3 voice id (planet-ar + the house voice)
//     ELEVENLABS_VOICE_ID_UNISONG = unisong's own v3 voice id  <-- the one you just added
//     ELEVENLABS_VOICE_ID_GUIDE   = the starmaps guide's v3 voice id (THE GUIDE
//                                   PASS — optional; unset, the guide speaks in
//                                   the house voice)
//     ELEVENLABS_MODEL_ID         = optional. defaults to eleven_v3.
//   the page posts { text }; unisong posts { text, vox:"unisong" }; the guide
//   posts { text, vox:"guide" }; all get mp3 audio.
//
// which voice:
//   - a request with vox:"unisong" speaks in ELEVENLABS_VOICE_ID_UNISONG
//     (falls back to ELEVENLABS_VOICE_ID if that var is ever empty — never silence).
//   - a request with vox:"guide" speaks in ELEVENLABS_VOICE_ID_GUIDE
//     (same fallback — never silence for want of a var).
//   - every other room keeps ELEVENLABS_VOICE_ID. planet-ar is untouched.
//
// notes:
//   - no voice_settings is sent. v3 reads emotion from the text + the voice's own
//     stored settings; the old stability/style block makes v3 reject the request.
//     tune the voice's feel in the elevenlabs voice page.
//   - if the key/voice are missing, returns 204 -> the page uses the browser voice.
//   - if elevenlabs errors, returns the reason as json (not audio) -> the page still
//     falls back to the browser voice, and logs the reason to the console so we can
//     see exactly what v3 didn't like.

'use strict';

var ELEVEN_URL = "https://api.elevenlabs.io/v1/text-to-speech/";
var DEFAULT_MODEL = "eleven_v3";
var MAX_CHARS = 900;

exports.handler = async function(event){
  var cors = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type"
  };

  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: cors, body: "" };
  if (event.httpMethod !== "POST")    return { statusCode: 405, headers: cors, body: "post only" };

  var key = process.env.ELEVENLABS_API_KEY;
  if (!key) return { statusCode: 204, headers: cors, body: "" };   // not configured -> browser voice

  // read the line + which room asked
  var text = "", vox = "";
  try{
    var body = JSON.parse(event.body || "{}");
    text = String(body.text || "").slice(0, MAX_CHARS);
    vox  = String(body.vox  || "");
  }catch(e){ text = ""; vox = ""; }
  if (!text.trim()) return { statusCode: 204, headers: cors, body: "" };

  // the voice: unisong has its own; the guide (THE GUIDE PASS) may have
  // its own; every other room keeps the house voice. an unset pocket
  // falls to the house voice — never silence for want of a var.
  var voice = (vox === "unisong")
      ? (process.env.ELEVENLABS_VOICE_ID_UNISONG || process.env.ELEVENLABS_VOICE_ID)
      : (vox === "guide")
      ? (process.env.ELEVENLABS_VOICE_ID_GUIDE || process.env.ELEVENLABS_VOICE_ID)
      : process.env.ELEVENLABS_VOICE_ID;
  if (!voice) return { statusCode: 204, headers: cors, body: "" };   // not configured -> browser voice

  var model = process.env.ELEVENLABS_MODEL_ID || DEFAULT_MODEL;

  try{
    var r = await fetch(ELEVEN_URL + encodeURIComponent(voice), {
      method: "POST",
      headers: {
        "xi-api-key": key,
        "content-type": "application/json",
        "accept": "audio/mpeg"
      },
      body: JSON.stringify({ text: text, model_id: model })
    });

    if (!r.ok){
      var detail = "";
      try{ detail = await r.text(); }catch(e){ detail = ""; }
      return {
        statusCode: 200,
        headers: Object.assign({}, cors, { "content-type": "application/json" }),
        body: JSON.stringify({ error: true, status: r.status, model: model, detail: (detail || "").slice(0, 500) })
      };
    }

    var buf = Buffer.from(await r.arrayBuffer());
    return {
      statusCode: 200,
      headers: Object.assign({}, cors, { "content-type": "audio/mpeg", "cache-control": "no-store" }),
      body: buf.toString("base64"),
      isBase64Encoded: true
    };
  }catch(e){
    return {
      statusCode: 200,
      headers: Object.assign({}, cors, { "content-type": "application/json" }),
      body: JSON.stringify({ error: true, status: 0, detail: String(e && e.message || e).slice(0, 300) })
    };
  }
};
