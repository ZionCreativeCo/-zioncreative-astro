# Zion Creative: Squarespace → Astro

## What is ready

This checkpoint includes the first refined homepage, reusable header and footer,
responsive styles, optimized local imagery, and a contact page containing Nick’s
supplied Elfsight form. Nick approved keeping the existing visual identity while
optimizing and elevating its execution.

The Astro production build passes. Static asset, metadata and local-link checks
pass. **Rendered desktop/mobile review and actual form delivery are still pending**:
the available cloud browser could not access the local preview. No domain changes have been made. The deployable project is being connected to
GitHub; original Squarespace HTML and capture assets remain in the migration ZIP.

Secondary pages intentionally link to the existing live website via
`src/lib/links.ts` while their replacements are built. This checkpoint is not
launch-ready. Previews remain noindexed.

## Preview without installing anything

The ZIP includes a `zion-homepage-preview` folder. Unzip the whole package and
open `zion-homepage-preview/index.html` in a desktop browser. Keep its images,
fonts, and supporting files together. This portable preview has relative asset
paths and an inlined menu script; the Astro source remains the canonical version.
The contact form requires an internet connection, and Elfsight may restrict local
file previews. Verify the form on the eventual hosted preview before launch.

## Design refinements in this checkpoint

- Keep the lime, cream and charcoal palette and original Zion logo.
- Tighten the hero and preserve the project-image collage.
- Make service links easier to scan with numbered rows and concise descriptions.
- Use consistent project image proportions and visible, readable captions.
- Replace the crowded testimonial carousel with one existing quote and a link to all reviews.
- Pair the existing family photo with concise studio copy and the original site statistics.
- Add a large closing project CTA, a simpler footer, mobile navigation and reduced-motion support.
- Store the used images as local WebP files; the phone collage uses Nick’s supplied animated GIF with a static reduced-motion alternative.
- Restore the original 129-frame Brand Identities GIF on its homepage card, with a still-image alternative for reduced motion.
- Replace all stock arrow glyphs with a shared custom curved SVG arrow component.
- Add gentle, opposing scroll movement to the hero collage (up to 28px desktop / 12px mobile in each direction).
- Reveal services, projects, testimonial, studio section, metrics, CTA and footer once with a subtle fade and 18px rise.
- Correct portable-preview responsive image paths, including all candidates in srcset. Rebuild the portable version with `python migration/build-preview.py` after `npm run build`.

The original CSS references ES Rebond Grotesque TRIAL and PolySans font files.
The new draft uses locally bundled DM Sans under its SIL Open Font License;
see `migration/licenses/DM-Sans-OFL.txt`. Replace with original brand webfonts
once their licensed files are confirmed. Existing project metrics (355+, 225+, 8+)
are preserved from the site and should be reviewed before launch.

Captured on October 5, 2026 UTC (October 4 Central time):
- The homepage plus 34 sitemap-listed URLs.
- Eight additional paths found in internal links, including three that resolve
  to other routes and four portfolio summary entries absent from the sitemap.
- Existing HTML, page text, title/description/canonical values, headings,
  image references, script dependencies and link references.
- 224 distinct image URLs referenced by the initial 35 page captures.

Assets used on the new homepage have been downloaded and optimized. Remaining
site assets, videos and original licensed font files still need review. New
JavaScript behavior has not yet been visually tested. Existing server-side redirects,
hidden/password-protected pages, analytics settings and submission destinations
cannot be fully established from a public crawl.

## Your first steps

1. Sign in to or create a GitHub account: https://github.com
2. Create a **private, empty** repository named `zioncreative-astro`.
   Leave README, license and .gitignore initialization unchecked because these
   project files will be imported together.
3. Sign in to or create a Cloudflare account: https://dash.cloudflare.com
   Do not transfer the domain, change nameservers, or purchase a plan yet.
4. Repository selected: https://github.com/ZionCreativeCo/-zioncreative-astro.git.
   GitHub is connected. Cloudflare hosting connection is the next setup step.
   A URL alone does not grant push access; connect GitHub or perform the local
   push below when needed. Never send passwords or access tokens in chat.

No paid editor is required. If you want to run this project on your computer,
install Node.js 24 and optionally VS Code. Codex can help edit the repository.

## Local preview

Unzip the package and open the `zion-astro` folder in Terminal:

```bash
npm ci
npm run dev
```

Open the localhost URL printed by Astro (normally http://localhost:4321).

```bash
npm run build
npm run preview
```

Build output is `dist/`. Dependencies are pinned in package-lock.json. The
preview is unindexed by default. Noindex does not make a preview private.

## Import to GitHub from your computer

Run these commands inside `zion-astro`, substituting your actual repository URL:

```bash
git init -b main
git add .
git commit -m "Start Zion Creative Astro migration"
git remote add origin https://github.com/ZionCreativeCo/-zioncreative-astro.git
git push -u origin main
```

Authenticate through GitHub's normal sign-in flow. If Git asks for author
identity, configure your own name and email before committing. The build
workflow checks the project on pushes and pull requests; it does not publish.

## Who handles what

| Work | Lead |
| --- | --- |
| Route/content inventory and dependency audit | Codex |
| Header/footer, homepage and responsive recreation | Codex |
| Content collections and project/SEO page templates | Codex |
| Asset capture and optimization | Codex, with your original files when necessary |
| Elfsight form embed and submission checks | Codex; you provide install code and confirm widget delivery settings |
| Build, link, metadata and responsive checks | Codex |
| GitHub/Cloudflare account ownership and sign-in | You |
| Visual review, source assets and business decisions | You |
| Hosting connection and domain cutover | Together, after launch review |

## Migration findings and decisions still needed

- Main navigation uses `/portfolio`, `/services`, `/about-us`, `/contact`.
- Observed resolving paths: `/about` → `/about-us`, `/work` → `/portfolio`,
  `/management-services` → `/brand-management-services`. Preserve these mappings.
- `/home-work-examples/the-villas`, `/home-work-examples/blog-post-title-one-l6n9d6`,
  `/home-work-examples/blog-post-title-two-axd54`, and
  `/home-work-examples/various-logo-design-amp-branding` are live linked entries.
  Decide whether to preserve them or consolidate with verified equivalent pages.
- `/home-old`, `/sample`, `/jobs`, `/cart`, `/home`, `/onboarding`, and
  `/consultation` need purpose/retention review; do not silently delete them.
- No literal HTML `<form>` was found by the parser, but Squarespace JavaScript
  configuration includes forms. The contact configuration names a Start a Project
  form, and onboarding includes Branding Onboarding. Capture all configured
  fields and required flags before implementing replacements.
- Form decision: Nick already subscribes to Elfsight and prefers its Form Builder.
  His supplied widget is implemented in `src/components/ContactForm.astro`
  (ID `0abc5d1d-e8df-4176-b176-ab5bd73def80`). Import and render this component
  on the recreated contact page. The embed has not yet been tested in a browser
  or for actual delivery. Do not build a custom backend or add another form
  subscription. Verify configured recipient, success/error behavior and actual
  submission delivery. Review the existing Squarespace forms only to preserve
  needed fields; confirm whether onboarding forms are also needed.
- `/consultation` embeds Calendly at
  `https://calendly.com/zioncreative/discovery`. Confirm it is still in use.
- Ghost Plugins and SQS Mods scripts add loading, animation, icon and sliding
  panel behavior. Recreate needed interactions without Squarespace dependencies.
- Preserve the existing www canonical host during migration unless intentionally
  changing it with appropriate redirects.
- Ask for Squarespace URL mappings and existing form storage/email settings.
  Ask for original logo/font/video files if the public versions are insufficient.

## Hosting

The output is portable static HTML, CSS and JavaScript. Cloudflare Pages can
build this repository with `npm run build`, output directory `dist`, branch
`main`. Cloudflare's current framework guide recommends Workers for new
projects; choose between Pages and Workers Static Assets before connecting
hosting. The Astro build does not require a server adapter for static output.

Official references:
- https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- https://developers.cloudflare.com/pages/framework-guides/
- https://docs.astro.build/en/install-and-setup/

Do not treat this inventory dashboard as the production site. Keep
`PUBLIC_SITE_LIVE=false` for previews. Enable it only for the approved completed
production build. Configure preview access restrictions if needed.

## Next milestone

Review the homepage visually on desktop and mobile. Confirm original font
licenses, project metrics, and Elfsight behavior. Then build portfolio, services,
about and case-study templates and migrate the remaining routes. Connect GitHub
and Cloudflare when access is available.

Before launch: verify redirects, all internal links, optimized images, actual
form delivery, analytics, metadata, sitemap, canonical behavior, accessibility,
mobile layouts and rollback. Change DNS only after you approve the completed
site. Confirm the new site and email work before canceling Squarespace.

## Capture files

- `migration/url-inventory.csv`: initial URL/metadata table.
- `migration/inventory.json`: initial detailed capture.
- `migration/additional-inventory.json`: eight linked paths outside the sitemap.
- `migration/pages/`: individual parsed page records.
- `migration/source/`: raw HTML and original sitemap for reference only.
- `migration/capture.py`: standard-library capture script. Re-running requires
  network access and overwrites the initial capture.

The crawl is a starting inventory, not a complete backup of Squarespace.

## Repository scope

GitHub contains the Astro source, optimized public assets, build workflow and migration notes/scripts. The original HTML snapshots, raw source assets and full parsed page records remain in the downloadable migration ZIP rather than the deployable repository. Capture and asset scripts require those archived inputs when rerun.
