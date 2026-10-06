import {readFile,writeFile,mkdir,readdir} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
await mkdir('public/images/migrated',{recursive:true});
let count=0;
for(const file of (await readdir('assets/media')).filter(f=>/^part-\d+\.json\.gz$/.test(f)).sort()){
 const files=JSON.parse(gunzipSync(await readFile(`assets/media/${file}`)).toString('utf8'));
 for(const [name,content] of Object.entries(files)){
  if(!/^[a-f0-9]{12}(-animated)?\.webp$/.test(name)||typeof content!=='string')throw new Error(`Invalid media entry: ${name}`);
  await writeFile(`public/images/migrated/${name}`,Buffer.from(content,'base64'));count++;
 }
}
console.log(`Prepared ${count} local images.`);
