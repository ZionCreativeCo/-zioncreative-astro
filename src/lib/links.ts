// Until each secondary page is migrated, keep its existing live destination working.
const migrated = new Set(['/', '/contact', '/portfolio', '/the-villas']);
export const siteLink = (path: string) => migrated.has(path) ? path : `https://www.zioncreative.co${path}`;
