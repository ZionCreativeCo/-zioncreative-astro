// Until each secondary page is migrated, keep its existing live destination working.
const migrated = new Set(['/', '/contact']);
export const siteLink = (path: string) => migrated.has(path) ? path : `https://www.zioncreative.co${path}`;
