"""Read-only capture of sitemap URLs. Requires only Python's standard library."""
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urlsplit
import csv, json, xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ''; self.description = ''; self.canonical = ''
        self.headings = []; self.images = []; self.links = []; self.forms = []
        self.scripts = []; self.stylesheets = []; self.text = []
        self.current = None; self.parts = []; self.skip = 0
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ('script', 'style'): self.skip += 1
        if tag in ('title', 'h1', 'h2', 'h3'): self.current = tag; self.parts = []
        if tag == 'meta' and a.get('name') == 'description': self.description = a.get('content', '')
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href', '')
        if tag == 'link' and a.get('rel') == 'stylesheet': self.stylesheets.append(a.get('href', ''))
        if tag == 'img': self.images.append({k:a.get(k,'') for k in ('src','data-src','alt','srcset')})
        if tag == 'a' and a.get('href'): self.links.append(a['href'])
        if tag == 'form': self.forms.append(a)
        if tag in ('input','select','textarea') and self.forms:
            self.forms[-1].setdefault('fields', []).append(a)
        if tag == 'script' and a.get('src'): self.scripts.append(a['src'])
    def handle_endtag(self, tag):
        if tag in ('script','style'): self.skip = max(0,self.skip-1)
        if tag == self.current:
            value = ' '.join(' '.join(self.parts).split())
            if tag == 'title': self.title = value
            else: self.headings.append({'level':tag,'text':value})
            self.current = None
    def handle_data(self, data):
        if not self.skip:
            if self.current: self.parts.append(data)
            if data.strip(): self.text.append(data.strip())

def capture(url):
    path = urlsplit(url).path or '/'
    name = path.strip('/').replace('/', '__') or 'index'
    try:
        with urlopen(Request(url, headers={'User-Agent':'Zion migration inventory/1.0'}), timeout=35) as res:
            raw = res.read().decode('utf-8',errors='replace'); status = res.status; final = res.url
        (ROOT/'source'/f'{name}.html').write_text(raw)
        p = Page(); p.feed(raw)
        data = {'url':url,'path':path,'status':status,'final_url':final,**p.__dict__}
        data = {k:v for k,v in data.items() if k in ('url','path','status','final_url','title','description','canonical','headings','images','links','forms','scripts','stylesheets','text')}
        (ROOT/'pages'/f'{name}.json').write_text(json.dumps(data,indent=2))
        print(f'{status} {path}',flush=True)
        return data
    except Exception as exc:
        print(f'ERROR {path}: {exc}',flush=True)
        return {'url':url,'path':path,'status':'error','error':str(exc)}

if __name__ == '__main__':
    (ROOT/'pages').mkdir(exist_ok=True)
    urls = ['https://www.zioncreative.co/'] + [e.text for e in ET.parse(ROOT/'source'/'sitemap.xml').findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}url/{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
    with ThreadPoolExecutor(max_workers=4) as pool: pages = list(pool.map(capture,urls))
    (ROOT/'inventory.json').write_text(json.dumps(pages,indent=2))
    with (ROOT/'url-inventory.csv').open('w',newline='') as f:
        fields = ['path','url','status','final_url','title','description','canonical','h1_count','image_count','form_count']
        writer = csv.DictWriter(f,fieldnames=fields); writer.writeheader()
        for p in pages:
            writer.writerow({**{k:p.get(k,'') for k in fields[:7]},'h1_count':sum(h['level']=='h1' for h in p.get('headings',[])),'image_count':len(p.get('images',[])),'form_count':len(p.get('forms',[]))})
