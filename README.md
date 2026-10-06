# Zion Creative: Squarespace → Astro

Astro static website for Zion Creative, hosted at:
https://zioncreative-astro.weathered-art-4995.workers.dev/

## Current status

The homepage, contact, portfolio index and Villas case study are approved.
The remaining 17 case studies, four detailed service pages, Services, About,
Testimonials, Brand Management, Consultation, Jobs and supporting pages are built
for preview review. All portfolio cards now lead to local pages.

**Not ready for the main-domain launch.** Previews remain noindexed. The existing
Squarespace site and domain remain unchanged. Nick confirmed contact-form delivery.

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

## Remaining launch work

1. Receive Elfsight install codes for **Branding Onboarding** and **Website
   Onboarding**. Public field schemas are archived in
   `migration/onboarding-form-fields.json`. The new `/onboarding/` page currently
   links to the existing Squarespace questionnaires. Replace those links with the
   two widgets before switching the domain; otherwise they would loop back.
2. Review new pages on desktop and mobile. Confirm original pricing and metrics.
3. Confirm management-form delivery and scheduler behavior. Contact form already
   tested by Nick; never submit unsolicited test leads.
4. Verify live redirects and custom 404 behavior in Cloudflare. `_redirects`
   preserves nine legacy routes (with and without trailing slash). `/cart` was
   an empty Squarespace commerce route; it is intentionally not a fake checkout.
5. Confirm analytics requirements and licensed brand-font files, if changing fonts.
6. Obtain explicit launch approval before DNS/domain changes, indexing, or
   Squarespace cancellation. Set `PUBLIC_SITE_LIVE=true` only for final production;
   preview deployments stay false. Onboarding, sample, consultation and 404 remain
   noindexed regardless. Utility pages are excluded from the sitemap.

The `sample` route preserves the existing Elfsight widget and is not in navigation.
