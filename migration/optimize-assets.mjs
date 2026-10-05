import sharp from 'sharp';
import { readdir,writeFile } from 'node:fs/promises';
const names=await readdir('migration/assets');
const sizes=[];
for(const name of names){
 const input=`migration/assets/${name}`;
 const meta=await sharp(input).metadata();
 if(['logo','wordmark','footer-mark'].includes(name)){
  const result=await sharp(input).resize({width:name==='logo'?360:1600,withoutEnlargement:true}).webp({quality:90}).toFile(`public/images/${name}.webp`);sizes.push({name,...result});
 }else{
  for(const width of [640,1280]){
   const result=await sharp(input, name === 'branding' ? {page:55} : {}).resize({width,withoutEnlargement:true}).webp({quality:82}).toFile(`public/images/${name}-${width}.webp`);sizes.push({name,width,bytes:result.size});
  }
 }
 console.log(name,meta.width,meta.height,meta.pages??1);
}
await writeFile('migration/optimized-assets.json',JSON.stringify(sizes,null,2));
