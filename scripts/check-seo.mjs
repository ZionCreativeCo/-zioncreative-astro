import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
const root='dist';
const errors=[];
async function files(dir){const result=[];for(const item of await readdir(dir,{withFileTypes:true})){const full=path.join(dir,item.name);if(item.isDirectory())result.push(...await files(full));else result.push(full);}return result;}
const built=await files(root);
const htmlFiles=built.filter(f=>f.endsWith('.html'));
const titles=new Set();const descriptions=new Set();
const attrs=tag=>Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m=>[m[1],m[2]]));
const xml=await readFile(path.join(root,'sitemap-0.xml'),'utf8');
const sitemap=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname.replace(/\/$/,'')||'/');
for(const file of htmlFiles){
 const text=await readFile(file,'utf8');
 const route='/'+path.relative(root,file).replace(/index\.html$/,'').replace(/\.html$/,'').replace(/\/$/,'');
 const routePath=route||'/';
 const fail=message=>errors.push(`${routePath}: ${message}`);
 const meta=Object.fromEntries([...text.matchAll(/<meta\s[^>]*>/g)].map(m=>{const a=attrs(m[0]);return [a.name||a.property,a.content];}));
 const title=text.match(/<title>([\s\S]*?)<\/title>/)?.[1];
 if(!title||titles.has(title))fail('missing or duplicate title');titles.add(title);
 if(!meta.description||descriptions.has(meta.description))fail('missing or duplicate description');descriptions.add(meta.description);
 if((text.match(/<h1[\s>]/g)||[]).length!==1)fail('expected exactly one H1');
 const canonical=[...text.matchAll(/<link\s[^>]*>/g)].map(m=>attrs(m[0])).filter(a=>a.rel==='canonical');
 if(canonical.length!==1||!canonical[0].href.startsWith('https://www.zioncreative.co/'))fail('invalid canonical');
 for(const name of ['og:image','og:image:alt','og:image:width','og:image:height','twitter:card'])if(!meta[name])fail(`missing ${name}`);
 const shouldIndex=process.env.PUBLIC_SITE_LIVE==='true'&&sitemap.includes(routePath);
 if(shouldIndex&&meta.robots?.startsWith('noindex'))fail('public sitemap page is noindexed');
 if(!shouldIndex&&!meta.robots?.startsWith('noindex'))fail('preview or utility page is indexable');
 for(const script of text.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)){try{JSON.parse(script[1]);}catch{fail('invalid structured data JSON');}}
 for(const img of text.matchAll(/<img\s[^>]*>/g))if(!Object.hasOwn(attrs(img[0]),'alt'))fail('image missing alt attribute');
 for(const tag of text.matchAll(/<(?:img|source|video|script)\s[^>]*>/g)){
  const a=attrs(tag[0]);for(const src of [a.src,a.poster,...(a.srcset||'').split(',').map(v=>v.trim().split(/\s+/)[0])].filter(Boolean)){
   if(src.startsWith('/')&&!src.startsWith('//')){const asset=path.join(root,decodeURI(src.split('?')[0]));try{await stat(asset);}catch{fail(`missing asset ${src}`);}}
  }
 }
}
if(sitemap.length!==new Set(sitemap).size)errors.push('Duplicate sitemap URLs');
const directory=await readFile(path.join(root,'sitemap','index.html'),'utf8');
const directoryMain=directory.match(/<main[\s>][\s\S]*?<\/main>/)?.[0]??'';
const directoryLinks=new Set([...directoryMain.matchAll(/<a\s[^>]*>/g)].map(tag=>attrs(tag[0]).href).filter(href=>href?.startsWith('/')).map(href=>new URL(href,'https://www.zioncreative.co').pathname.replace(/\/$/,'')||'/'));
for(const route of sitemap)if(route!=='/sitemap'&&!directoryLinks.has(route))errors.push(`HTML sitemap missing public page: ${route}`);
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`SEO checks passed: ${htmlFiles.length} pages, ${sitemap.length} public URLs, unique metadata, valid schema, image descriptions and local media references.`);
