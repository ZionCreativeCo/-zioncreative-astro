import pages from '../data/pages.json';
const migrated = new Set(['/', '/contact', '/portfolio', '/the-villas', '/colossus', '/koke-mill-church', '/pf-flyers', ...pages.map(page => `/${page.slug}`)]);
export const siteLink = (path: string) => migrated.has(path) ? path : `https://www.zioncreative.co${path}`;
