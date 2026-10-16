import {nextLocationCities} from './next-location-pages';
import {locationPages} from './location-pages';
import {regionalCities} from './regional-pages';
import {expansionCities} from './expansion-pages';
const cities=[
 ...nextLocationCities.map(city=>({...city,region:city.state==='Florida'?'Florida':'Illinois & Missouri'})),
 ...regionalCities.map(city=>({...city,displayName:city.name,region:'Illinois & Missouri'})),
 ...expansionCities.map(city=>({...city,region:city.state==='Florida'?'Florida':'Illinois & Missouri'})),
 ...['New Smyrna Beach','Port Orange','Ormond Beach'].map(name=>({name,displayName:name,state:'Florida',region:'Florida'}))
];
export const serviceAreas=[
 {name:'Springfield',state:'Illinois',region:'Illinois & Missouri',id:'springfield',links:[{href:'/web-design-springfield-il',label:'Springfield website design'},{href:'/logo-design-springfield-il',label:'Springfield logo & brand design'},{href:'/brand-management-services',label:'Springfield marketing services'}]},
 ...cities.map(city=>({name:city.displayName,state:city.state,region:city.region,id:city.name.toLowerCase().replaceAll('.','').replaceAll('’','').replaceAll("'",'').replaceAll(' ','-'),links:Object.values(locationPages).filter(page=>page.areaServed[0].name===city.name).sort((a,b)=>['web-design','logo-design','marketing'].findIndex(prefix=>a.slug.startsWith(prefix))-['web-design','logo-design','marketing'].findIndex(prefix=>b.slug.startsWith(prefix))).map(page=>({href:`/${page.slug}`,label:'directoryLabel' in page?page.directoryLabel:city.displayName+' '+(page.slug.startsWith('web-design')?'website design':page.slug.startsWith('logo-design')?'logo & brand design':'marketing services')}))}))
];
