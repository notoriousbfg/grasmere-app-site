#!/usr/bin/env python3
"""Puts every reading page of grasmere.app (all but index.html) in the site's frame: the nav,
the footer and style.css around the page's own <title> and <main>. Safe to run again: it only
ever reads a page's title and main. Run from the site's folder: python3 tools/restyle.py"""
import pathlib, re

STORE = "https://apps.apple.com/app/id6821596298"
root = pathlib.Path(__file__).resolve().parent.parent

def frame(title, main, up):
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<link rel="icon" type="image/png" href="{up}assets/favicon.png">
<link rel="apple-touch-icon" href="{up}assets/apple-touch-icon.png">
<link rel="stylesheet" href="{up}style.css">
</head>
<body>
<div class="doc">
<nav class="nav">
<a href="{up}index.html" class="brand"><img src="{up}assets/grasmere-icon.png" alt="" width="32" height="32">Grasmere</a>
<div class="nav-links">
<a href="{up}guides/index.html" class="keep">Guides</a>
<a href="{STORE}" class="btn-ghost">Download</a>
</div>
</nav>
{main}
<footer class="foot"><a href="{up}index.html">Grasmere</a><a href="{up}guides/index.html">Guides</a><a href="{up}whats-new.html">What’s New</a><a href="{up}support.html">Support</a><a href="{up}privacy.html">Privacy</a></footer>
</div>
</body>
</html>
"""

for page in sorted(root.rglob("*.html")):
    rel = page.relative_to(root)
    if rel.parts[0] in ("tools", ".git") or rel == pathlib.Path("index.html"):
        continue
    text = page.read_text(encoding="utf-8")
    title = re.search(r"<title>(.*?)</title>", text, re.S)
    main = re.search(r"<main>.*?</main>", text, re.S)
    if not (title and main):
        print("skipped", rel); continue
    up = "../" * (len(rel.parts) - 1)
    page.write_text(frame(title.group(1).strip(), main.group(0), up), encoding="utf-8")
    print("framed", rel)
