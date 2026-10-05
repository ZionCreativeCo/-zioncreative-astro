import type { APIRoute } from 'astro';
export const GET: APIRoute = () => new Response(
  import.meta.env.PUBLIC_SITE_LIVE === 'true'
    ? 'User-agent: *\nAllow: /\nSitemap: https://www.zioncreative.co/sitemap-index.xml\n'
    : 'User-agent: *\nDisallow: /\n',
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
