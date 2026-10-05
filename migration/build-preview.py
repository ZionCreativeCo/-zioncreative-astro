"""Create a portable file:// preview and validate every responsive image candidate."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import html
import re
import shutil

PROJECT = Path(__file__).resolve().parents[1]
SOURCE = PROJECT / 'dist'
DEST = PROJECT.parent / 'zion-homepage-preview'

def local_url(url, prefix):
    if url.startswith(('/images/', '/_astro/')):
        return prefix + url.lstrip('/')
    if url == '/':
        return prefix + 'index.html'
    if url in ('/contact', '/contact/'):
        return prefix + 'contact/index.html'
    return url

def rewrite_attribute(match, prefix):
    key, raw = match.groups()
    value = html.unescape(raw)
    if key == 'srcset':
        candidates = []
        for candidate in value.split(','):
            parts = candidate.strip().split()
            parts[0] = local_url(parts[0], prefix)
            candidates.append(' '.join(parts))
        value = ', '.join(candidates)
    else:
        value = local_url(value, prefix)
    return f'{key}="{html.escape(value, quote=True)}"'

class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.urls = []
        self.h1 = 0
    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        self.h1 += tag == 'h1'
        self.urls.extend(attrs[key] for key in ('src', 'href') if key in attrs)
        if 'srcset' in attrs:
            self.urls.extend(item.strip().split()[0] for item in attrs['srcset'].split(','))

# This directory contains generated preview output only; start clean so old
# hashed stylesheets cannot retain or accumulate rewritten relative paths.
if DEST.exists():
    shutil.rmtree(DEST)
shutil.copytree(SOURCE, DEST)
for page in DEST.rglob('*.html'):
    prefix = '../' * len(page.relative_to(DEST).parts[:-1]) or './'
    content = re.sub(r'\b(src|href|srcset)="([^"]*)"', lambda m: rewrite_attribute(m, prefix), page.read_text())
    # Astro may emit self-contained external entry scripts instead of inlining them.
    for path in re.findall(r'<script type="module" src="([^"]+)"></script>', content):
        if path.startswith(('./', '../')):
            code = (page.parent / path).resolve().read_text()
            if re.search(r'\b(?:import|export)\b', code):
                raise ValueError('Preview entry has module imports/exports; bundle it before inlining.')
            content = content.replace(f'<script type="module" src="{path}"></script>', f'<script type="module">{code}</script>')
    page.write_text(content)
for css in DEST.glob('_astro/*.css'):
    css.write_text(css.read_text().replace('/_astro/', './').replace('/images/', '../images/'))

checked = 0
for page in DEST.rglob('*.html'):
    parser = References()
    parser.feed(page.read_text())
    assert parser.h1 == 1, (page, 'Expected one H1')
    for url in parser.urls:
        parsed = urlsplit(url)
        if parsed.scheme or parsed.netloc or not parsed.path:
            continue
        assert not parsed.path.startswith('/'), (page, 'Unconverted root path', url)
        assert (page.parent / parsed.path).resolve().is_file(), (page, 'Missing resource', url)
        checked += 1
    print('PASS', page.relative_to(DEST))
for css in DEST.glob('_astro/*.css'):
    for url in re.findall(r'url\(["\']?([^\)"\']+)', css.read_text()):
        if urlsplit(url).scheme:
            continue
        assert not url.startswith('/'), (css, url)
        assert (css.parent / url).resolve().is_file(), (css, url)
        checked += 1
print(f'PASS: {checked} local URLs, including every srcset candidate and font file.')
