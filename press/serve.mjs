// press · a headless room for the house · the builder's, never terence's to run or deploy.
// serves song/ on a local port, opens a page in chromium, and answers /.netlify/functions/nobody from `feed()`, the press's own.
import http from "node:http"; import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module"; import { execSync } from "node:child_process";
// playwright: wherever this machine keeps it (a local install, or the global one)
const require = createRequire(import.meta.url);
let PW; try { PW = require("playwright"); } catch (_) { PW = require(path.join(execSync("npm root -g").toString().trim(), "playwright")); }
const { chromium } = PW;
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../song");
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".png": "image/png", ".json": "application/json", ".mp3": "audio/mpeg", ".svg": "image/svg+xml" };
export async function open(pagePath, feed, opts = {}) {
  const server = http.createServer((req, res) => {
    const u = new URL(req.url, "http://x"); const f = path.join(ROOT, decodeURIComponent(u.pathname));
    if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end("no"); }
    res.writeHead(200, { "content-type": TYPES[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res);
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const port = server.address().port;
  const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--autoplay-policy=no-user-gesture-required"] });
  const ctx = await browser.newContext({ viewport: opts.viewport || { width: 390, height: 844 }, deviceScaleFactor: 1, hasTouch: !!opts.touch });
  const page = await ctx.newPage();
  const log = []; page.on("pageerror", (e) => log.push("pageerror: " + e.message + " @ " + String(e.stack || "").split("\n").slice(1, 4).join(" "))); page.on("console", (m) => { if (m.type() === "error") log.push("console: " + m.text()); });
  const asks = [];
  await page.route("**/.netlify/functions/nobody**", async (route) => {
    const u = new URL(route.request().url()); asks.push(u.search);
    const out = await feed(u, route.request());
    if (out === null) return route.abort();
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(out) });
  });
  await page.route("**/.netlify/functions/**", (route) => { if (!/functions\/nobody/.test(route.request().url())) return route.fulfill({ status: 503, body: "{}" }); return route.fallback(); });
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) => route.abort());
  if (opts.init) await page.addInitScript(opts.init);
  await page.goto(`http://127.0.0.1:${port}/${pagePath}`, { waitUntil: "load" });
  return { page, log, asks, close: async () => { await browser.close(); server.close(); } };
}
export function checker() { let bad = 0; const ok = (c, m) => { console.log((c ? "  ok   " : "  FAIL ") + m); if (!c) bad++; }; ok.bad = () => bad; return ok; }
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
