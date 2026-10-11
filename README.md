# Zion Creative: Squarespace → Astro

Astro static website for Zion Creative, hosted at:
https://zioncreative-astro.weathered-art-4995.workers.dev/

## Current status

The approved site contains 31 pages with responsive case studies, portfolio filters,
service pages, and local image/video assets. The full source is published to GitHub
and deployed through Cloudflare Workers static assets.

Launch authorized October 11, 2026. Contact and consolidated onboarding delivery
are confirmed. Cloudflare nameservers are active. The custom domain, HTTPS enforcement, root-to-www
redirect, and replacement DNSSEC are verified. The live site is https://www.zioncreative.co/.
`PUBLIC_SITE_LIVE=true` is configured for production builds. Preview hosts carry
an `X-Robots-Tag: noindex, nofollow` header. Squarespace hosting has not been canceled.

## Development

Use Node 24, then `npm ci` and `npm run dev`. Run `npm run build` for production.
Cloudflare builds from GitHub main and serves `dist` as static assets.

New media is stored in `assets/media/part-*.json.gz`. These are gzip-compressed
maps of filename to base64 WebP data. `scripts/prepare-media.mjs` unpacks them before
build/dev into ignored `public/images/migrated/`. This avoids hundreds of separate
connector uploads while keeping every deployed image in Git, independent of the
Squarespace CDN. No network calls are needed to prepare the images.

`migration/rest-media-sources.json` records original owned assets. To regenerate
packs, download the listed sources into `migration/assets/rest/{id}`, then run
`node migration/pack-media.mjs`. Do not commit raw Squarespace captures: they can
contain old preview links and native form configuration.

## Content and layout

- `src/data/pages.json`: preserved source page copy, metadata, project credits,
  service pricing and timelines, FAQs, and curated local-image references.
- `src/data/media.json`: optimized image dimensions and reduced-motion posters.
- `CaseStudy`, `ServiceDetail`, and `EditorialPage`: reusable Astro layouts.
- Custom curved SVG arrows and subtle, reduced-motion-aware scroll reveals.
- Long website screenshots have keyboard-accessible expand/collapse controls.
- Original artwork and animation; no generated replacement project imagery.
- Locally bundled DM Sans under SIL OFL; see `migration/licenses/DM-Sans-OFL.txt`.

## Launch verification

- Contact and consolidated onboarding delivery confirmed by Nick.
- All 30 regular routes return 200 with titles and correct indexing rules.
- Robots and sitemap publish the canonical www domain; utility pages stay noindexed.
- Root redirects preserve paths and query strings; HTTP redirects to HTTPS.
- Legacy portfolio/About routes return permanent redirects.
- Custom missing-page response returns 404 and renders the designed page.
- Live mobile portfolio and related cards navigate on one tap; no horizontal overflow.
- Google email MX records and verification TXT preserved. DNSSEC restored and
  confirmed active by Cloudflare and the domain registry.
- Existing DNS caches may continue showing the previous site during propagation.

No dedicated visitor analytics identifier has been configured. Add one when Nick
chooses a tracking provider. Squarespace hosting cancellation remains a separate,
explicitly authorized action.

The `sample` route preserves the existing Elfsight widget and is not in navigation.
