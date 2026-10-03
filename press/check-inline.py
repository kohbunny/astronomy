#!/usr/bin/env python3
# press · `node --check` on every inline <script> of a page · the builder's, never terence's to run or deploy.
# run from the repo root:  python3 press/check-inline.py song/adeath.html song/alife.html song/phone.html
import re, subprocess, sys, tempfile, os
bad = 0
for path in sys.argv[1:]:
    s = open(path, encoding="utf-8").read()
    n = 0
    for m in re.finditer(r"<script(\s[^>]*)?>(.*?)</script>", s, re.S | re.I):
        attrs, body = m.group(1) or "", m.group(2)
        if re.search(r"\bsrc\s*=", attrs) or re.search(r"type\s*=\s*['\"](?!text/javascript|module)", attrs): continue
        n += 1
        line = s.count("\n", 0, m.start(2)) + 1
        with tempfile.NamedTemporaryFile("w", suffix=".mjs" if "module" in attrs else ".js", delete=False, encoding="utf-8") as f:
            f.write(body); tmp = f.name
        r = subprocess.run(["node", "--check", tmp], capture_output=True, text=True); os.unlink(tmp)
        if r.returncode: bad += 1; print(f"FAIL {path} script #{n} (line {line}):\n{r.stderr[:1500]}")
    print(f"{path}: {n} inline scripts checked")
print("all clear" if not bad else f"{bad} FAILED"); sys.exit(1 if bad else 0)
