import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
const sources=JSON.parse(await readFile('migration/secondary-assets.json','utf8'));
const dimensions={};
const projects=JSON.parse(await readFile('src/data/portfolio.json','utf8'));
for (const item of sources) {
  if(['villas-detail-02','villas-detail-05','villas-detail-17'].includes(item.name)) continue;
  const input=`migration/assets/secondary/${item.name}`;
  // KidKits builds letter by letter; its complete wordmark is in the final frame.
  const posterPage=item.name==='work-kidkits'?item.frames-1:(item.frames>1?Math.floor(item.frames/2):0);
  for (const width of [640,1280]) {
    const result=await sharp(input,{page:posterPage}).resize({width,withoutEnlargement:true}).webp({quality:82}).toFile(`public/images/${item.name}-${width}.webp`);
    if(width===1280) dimensions[item.name]={width:result.width,height:result.height};
  }
  if(item.frames>1){
    const animatedImage=`/images/${item.name}-animated.webp`;
    await sharp(input,{animated:true}).resize({width:720,withoutEnlargement:true}).webp({quality:72,effort:3}).toFile(`public${animatedImage}`);
    projects.find(p=>p.image===item.name).animatedImage=animatedImage;
  }
  console.log(item.name);
}
await writeFile('src/data/image-dimensions.json',JSON.stringify(dimensions,null,2)+'\n');
await writeFile('src/data/portfolio.json',JSON.stringify(projects,null,2)+'\n');
