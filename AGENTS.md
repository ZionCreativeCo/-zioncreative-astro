# Zion Creative migration

## Goal and current status
Keep the existing Squarespace site’s visual identity while optimizing and elevating sections, as explicitly authorized by Nick. Tighten typography, spacing, readability, responsive behavior and presentation.
This repository contains the complete portfolio, case studies, services, About, reviews, consultation, and supporting public pages. The onboarding page still links to the existing Squarespace questionnaires pending two Elfsight widget IDs; replace those links before switching domains. It is not launch-ready. Cloudflare previews remain noindexed; the main domain is still on Squarespace. See README.md for remaining review and launch work.

## Working rules
- Preserve the existing paths, substantive page copy, titles and descriptions unless a change is agreed.
- Do not publish captured Squarespace HTML as the replacement site. It contains proprietary runtime dependencies.
- Extract content into structured collections; recreate presentation with reusable Astro components.
- Keep static output unless a concrete feature requires server code.
- Do not add a CMS or database without a demonstrated need.
- Validate real font and asset licenses; do not infer font choices from appearances alone.
- Download and optimize owned assets; don't depend on Squarespace CDN URLs after cancellation.
- Investigate sitemap-omitted internal routes before calling the crawl complete.
- Use the existing Elfsight Form Builder subscription for needed forms. Request the widget install code. Do not add a custom form backend unless explicitly requested. Test the embed, submission delivery and success/error behavior.
- Do not assume no HTML form means no form: embedded and JavaScript-rendered forms need review.
- Keep previews noindexed. Noindex is not access control; use host access restrictions if privacy is needed.
- Never place service keys, account credentials or private lead data in source control.
- Maintain responsive layouts, keyboard navigation, visible focus and appropriate image alt text.

## Review before launching
- Run npm ci and npm run build.
- Inspect desktop and mobile pages against the original.
- Check internal links, metadata, image loading, sitemap, canonical URLs, 404 behavior and redirects.
- Test actual form delivery and analytics on the target deployment.
- Get explicit launch authorization before changing DNS, switching the domain or canceling Squarespace.
- Only then enable PUBLIC_SITE_LIVE=true for production; previews remain false.
