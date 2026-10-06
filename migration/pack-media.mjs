import sharp from 'sharp';
import {readFile,writeFile,mkdir,readdir,unlink} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';
const source=JSON.parse(await readFile('migration/rest-media-sources.json','utf8'));
await mkdir('public/images/migrated',{recursive:true});await mkdir('assets/media',{recursive:true});
const metadata={};let pack={};let size=0;let part=0;
async function flush(){if(!Object.keys(pack).length)return;await writeFile(`assets/media/part-${String(++part).padStart(2,'0')}.json.gz`,gzipSync(JSON.stringify(pack),{level:9}));pack={};size=0;}
for(const f of await readdir('assets/media'))if(/^part-\d+\.json\.gz$/.test(f))await unlink(`assets/media/${f}`);
for(const [index,item] of source.entries()){
 const input=`migration/assets/rest/${item.id}`;const meta=await sharp(input).metadata();const frames=meta.pages||1;
 const poster=item.pages.includes('kidkits')?frames-1:Math.floor((frames-1)/2);
 const still=await sharp(input,{page:poster}).resize({width:1440,withoutEnlargement:true}).webp({quality:78,effort:4}).toBuffer({resolveWithObject:true});
 const record={width:still.info.width,height:still.info.height,src:`/images/migrated/${item.id}.webp`,dark:['1fc7006146f4','587f796f8330'].includes(item.id)};
 const outputs=[[`${item.id}.webp`,still.data]];
 if(frames>1){const animation=await sharp(input,{animated:true}).resize({width:720,withoutEnlargement:true}).webp({quality:65,effort:3}).toBuffer();outputs.push([`${item.id}-animated.webp`,animation]);record.animated=`/images/migrated/${item.id}-animated.webp`;}
 for(const [name,bytes] of outputs){await writeFile(`public/images/migrated/${name}`,bytes);if(size+bytes.length>750000)await flush();pack[name]=bytes.toString('base64');size+=bytes.length;}
 metadata[item.id]=record;if(index%20===0)console.log('Optimized',index+1);
}
await flush();await writeFile('src/data/media.json',JSON.stringify(metadata,null,2)+'\n');console.log('Packed',Object.keys(metadata).length,'assets in',part,'files');
