"""Build a static, server-less preview of the site for a claude.ai artifact.

Usage: python3 scripts/build-preview.py <base_url> <out_dir>
Requires a running `next start` of a build made with NEXT_PUBLIC_PREVIEW=1 and NEXT_DIST_DIR=.next-preview.
Pages are flattened to the root (servicii/x -> servicii-x.html) and every absolute path is made relative,
so the preview works whatever path prefix the host serves it under.
"""
import json, re, shutil, sys, urllib.request
from pathlib import Path

BASE, OUT = sys.argv[1].rstrip('/'), Path(sys.argv[2])
import os
DIST = os.environ.get('NEXT_DIST_DIR', '.next-preview')
NO_MEDIA = os.environ.get('NEXT_PUBLIC_PREVIEW_NO_MEDIA') == '1'  # share build: no video/audio files
ROOT = Path(__file__).resolve().parent.parent
SLUGS = ['social-media-marketing', 'sedinte-foto-video', 'editare-reels', 'creare-site-web-design', 'campanii-ads']
ROUTES = ['/', '/servicii', *[f'/servicii/{s}' for s in SLUGS], '/portofoliu', '/despre-noi', '/apel-gratuit', '/multumim',
          '/politica-de-confidentialitate', '/politica-cookies', '/termeni-si-conditii']


def page_file(route: str) -> str:
    return 'index.html' if route == '/' else route.strip('/').replace('/', '-') + '.html'


MAP = {r: page_file(r) for r in ROUTES} | {'/contact': 'apel-gratuit.html'}

ASSET = re.compile(r'(["\'`(\s,=]|\\")/(_next|video|audio|img|fonts)/')


def rel_assets(text: str, prefix: str = '') -> str:
    return ASSET.sub(lambda m: f'{m.group(1)}{prefix}{m.group(2)}/', text)


def map_href(m: re.Match) -> str:
    path, hash_ = m.group(2), m.group(3) or ''
    key = path.rstrip('/') or '/'
    target = MAP.get(key)
    if target is None:
        return m.group(0)
    return f'{m.group(1)}"{target}{hash_}"'


HREF = re.compile(r'(href=)"(/[^"#?]*)(#[^"]*)?"')

NAV_SCRIPT = """<script>(function(){var M=%s;var b=new URL('./',location.href);var P=b.pathname;window.__hsP=P;
window.TURBOPACK_CHUNK_BASE_PATH=P+'_next/';
var R=/(\\\\?["'(])\\/(_next|video|audio|img|fonts)\\//g;function rw(x){if(x&&typeof x[1]==='string'){x=x.slice();x[1]=x[1].replace(R,function(_,q,d){return q+P+d+'/'})}return x}
var arr=[],np=Array.prototype.push,cur=function(){for(var i=0;i<arguments.length;i++)np.call(arr,rw(arguments[i]));return arr.length};
Object.defineProperty(arr,'push',{configurable:true,get:function(){return cur},set:function(f){cur=function(){return f.apply(arr,Array.prototype.map.call(arguments,rw))}}});self.__next_f=arr;
function m(p){var h='',i=p.indexOf('#');if(i>=0){h=p.slice(i);p=p.slice(0,i)}p=p.replace(/\\/$/,'')||'/';return (M[p]||'404.html')+h}
window.__hsNav=function(p){location.href=new URL(m(p),b).href};
addEventListener('click',function(e){if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey)return;
var a=e.target&&e.target.closest&&e.target.closest('a[href]');if(!a||a.target==='_blank')return;
var h=a.getAttribute('href');if(!h||h[0]==='#'||/^[a-z]+:/i.test(h))return;
e.preventDefault();e.stopImmediatePropagation();
if(h[0]==='/'&&h[1]!=='/'){window.__hsNav(h)}else{location.href=new URL(h,location.href).href}},true);})();</script>"""


def fetch(url: str) -> str:
    try:
        with urllib.request.urlopen(url) as r:
            return r.read().decode()
    except urllib.error.HTTPError as e:  # 404 page
        return e.read().decode()


if OUT.exists():
    shutil.rmtree(OUT)
OUT.mkdir(parents=True)

# Static assets
shutil.copytree(ROOT / DIST / 'static', OUT / '_next/static')
for item in (ROOT / 'public').iterdir():
    if item.is_dir():
        shutil.copytree(item, OUT / item.name, ignore=shutil.ignore_patterns('*.mp4', '*.m4a') if NO_MEDIA else None)
    else:
        shutil.copy2(item, OUT / item.name)
shutil.copy2(ROOT / 'src/app/icon.svg', OUT / 'icon.svg')

for css in (OUT / '_next/static').rglob('*.css'):
    depth = len(css.relative_to(OUT).parts) - 1
    css.write_text(re.sub(r'url\(/', 'url(' + '../' * depth, css.read_text()))
for js in (OUT / '_next/static').rglob('*.js'):
    t = js.read_text()
    js.write_text(re.sub(r'([`"\'])/(video|audio|img|fonts)/', r'\1\2/', t))

nav = NAV_SCRIPT % json.dumps(MAP)
for route, name in [*((r, page_file(r)) for r in ROUTES), ('/__preview-404', '404.html')]:
    html = fetch(BASE + route)
    html = HREF.sub(map_href, html)
    parts = re.split(r'(<script>.*?</script>)', html, flags=re.S)
    html = ''.join(p if p.startswith('<script>') else rel_assets(p) for p in parts)
    html = re.sub(r'(srcSet|srcset)="([^"]*)"', lambda m: m.group(1) + '="' + re.sub(r'(^|,\s*)/', r'\1', m.group(2)) + '"', html)
    html = html.replace('href="/icon.svg', 'href="icon.svg')
    # Script tags must carry the same absolute URL as the flight data, so they are written at runtime with the prefix.
    def dw(m):
        tag = m.group(0).replace('src="_next/', 'src="\'+__hsP+\'_next/').replace('</script>', '<\\/script>')
        return '<script>document.write(\'' + tag + '\')</script>'
    html = re.sub(r'<script src="_next/[^"]*"[^>]*></script>', dw, html)
    html = html.replace('<head>', '<head>' + nav, 1)
    (OUT / name).write_text(html)
    print(f'{route:40} -> {name} ({len(html)//1024} KB)')

files = [p for p in OUT.rglob('*') if p.is_file()]
print(f'{len(files)} files, {sum(p.stat().st_size for p in files)/1e6:.1f} MB')

# Artifact hosting constraints: "_" prefixed paths are reserved and .m4a is not served.
(OUT / '_next').rename(OUT / 'nx')
import subprocess
if not NO_MEDIA:  # public sharing accepts MP3/WAV audio only
    src = OUT / 'audio/heart-social-showreel.m4a'
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(src), '-c:a', 'libmp3lame', '-b:a', '128k', str(OUT / 'audio/heart-social-showreel.mp3')], check=True)
    src.unlink()
# public sharing accepts JPEG/PNG/GIF/WebP images only: render the favicon to PNG and drop SVG files
subprocess.run(['google-chrome', '--headless', '--disable-gpu', '--no-sandbox', '--hide-scrollbars', '--default-background-color=00000000',
                '--window-size=64,64', f'--screenshot={OUT / "icon.png"}', f'file://{ROOT / "src/app/icon.svg"}'], check=True, capture_output=True)
for svg in OUT.rglob('*.svg'):
    svg.unlink()
for f in [*OUT.glob('*.html'), *(OUT / 'nx').rglob('*.js')]:
    t = f.read_text()
    t = t.replace('heart-social-showreel.m4a', 'heart-social-showreel.mp3')
    if f.suffix == '.html':
        t = t.replace('_next/', 'nx/').replace('(_next|', '(nx|')
        t = re.sub(r'<link rel="icon"[^>]*>', '<link rel="icon" href="icon.png" type="image/png"/>', t)
    f.write_text(t)
# Artifact public sharing does not accept font files: inline them into the CSS as data: URIs.
import base64
for css in (OUT / 'nx').rglob('*.css'):
    t = css.read_text()
    def inline(m):
        font = OUT / 'fonts' / m.group(1)
        return 'url(data:font/woff2;base64,' + base64.b64encode(font.read_bytes()).decode() + ')'
    css.write_text(re.sub(r'url\((?:\.\./)+fonts/([^)]+\.woff2)\)', inline, t))
shutil.rmtree(OUT / 'fonts')
for f in OUT.glob('*.html'):
    f.write_text(re.sub(r'<link rel="preload" href="fonts/[^"]+"[^>]*>', '', f.read_text()))
print('renamed _next -> nx, soundtrack -> .mp3, favicon -> png, fonts inlined')
