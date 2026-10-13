# Website review: October 12, 2026

Scope: website source, rendered page output, live contact forms, shared navigation and presentation. This is a technical/content review, not certification of WCAG compliance or a legal opinion.

| Check | Result / action |
| --- | --- |
| Contrast | Improved gallery captions, scroll-region focus, and small browser-frame labels. Nick: removed faded career text; darkened button hover and brightened footer text. Zion: corrected project captions on light backgrounds. Full assistive-technology and device coverage remains a manual review task. |
| Image alt | All generated image elements have alt attributes. Improved service image text and added verified Springfield / Sherman context to relevant project descriptions. Decorative images retain empty alt. Some migrated gallery descriptions remain generic and need image-by-image editorial review. |
| Refunds | Added /refunds. No checkout exists. The page refers to the actual engagement agreement and does not invent refund deadlines, deposit forfeiture, or retroactive terms. Owner should supply the actual standard project cancellation terms. |
| Privacy | Added /privacy and persistent footer links. Covers hosting, voluntary inquiries, optional providers, and privacy requests. Owner must confirm operational retention, access, disclosures, legal business identity, and any off-site CRM/marketing workflow. |
| Accessibility | Existing skip links, headings, keyboard menus, gallery controls and video controls retained. Improved focus visibility and contrast; static alternatives used for image-only motion. Video autoplay remains muted/inline/looping with reduced-motion handling and pause controls. No blanket compliance claim. |
| Reviews | No evidence identified that the named testimonials are fabricated. Preserved them pending owner confirmation of original source, permission, and any incentive/material relationship. Removed unsupported aggregate rating and review count. |
| Terms | Added /terms: informational website use, separate engagement agreements, rights holders, external providers and accessibility contact. No invented arbitration, governing-law selection, liability waivers or legal entity type. |
| Embeds | Elfsight forms/reviews and Zion Calendly scheduler now require a clearly labeled allow action before loading. Direct contact/booking alternatives remain. Removed the Calendly parameter that hid its privacy banner. |
| Image copyright | Local storage is not proof of rights. Existing credits were retained. Obtain client/agency portfolio-display permissions, photographer/stock licenses and any required releases. Font license material exists in the repositories; no new fonts or images added. |
| Cookies | Added /cookies with per-page opt-in instructions. Declining requires no action. Reload reset stops the embedded service for the page, but does not erase previously set provider cookies or submitted data. |
| Tracking | No advertising pixel or dedicated analytics ID in source. Live Zion contact page injects a Cloudflare Insights beacon through hosting; disclosed separately. No equivalent beacon observed on Nick contact page. Hosting settings/server logs and provider-internal tracking remain outside this source review. |
| Form consent | Added plain-language explanation before loading/sending an inquiry, provider privacy links, and no unrelated marketing opt-in. No blanket mandatory marketing checkbox. Third-party form configuration and submission delivery were not changed or tested. |
| Local laws | Reviewed DOJ business web accessibility guidance, FTC review/testimonial and advertising-substantiation guidance, and Illinois PIPA security/breach guidance. Exact obligations depend on entity, customers, data, and jurisdictions served; legal review of actual operations remains necessary. |
| Button labels | Added explicit allow/load/reset labels. Existing native navigation/gallery labels retained. Elfsight's generic Submit label and duplicate Zion field wording need editing in the provider dashboard. |
| Business details | Existing Springfield, Illinois location and Zion email/telephone retained, with policy contact routes. No street address added. Exact legal trading name and verified Google Business Profile URL still needed from owner. |
| Necessary data | Zion contact: required inquiry type, email, message. Nick: required email/message plus optional first name, last name, phone. Recommend removing phone unless callback is needed and using one optional name field. Onboarding may need different fields; review in Elfsight with the actual workflow. |
| Keyboard forms | Main site navigation and native controls reviewed. Elfsight fields expose accessible labels; detailed third-party validation and keyboard behavior excluded as requested. No test leads submitted. |
| Unsupported claims | Removed displayed Anvil search metrics, Villas growth percentages, Zion aggregate ratings/review count, project/client totals and 400+ Squarespace claim. Replaced with documented deliverables. Original records remain in Git history for restoration if substantiated. |

## Validation

Astro page compilation succeeds. Generated HTML checked for alt attributes, filename-like alt text, automatic external script tags, and Nick em dashes. Source-only local checkout lacks binary images/fonts/videos: the existing Nick media-link verification cannot fully pass locally; full-repository CI is the deployment verification gate. Public build status and live verification are reported separately.

## Owner follow-up

1. Confirm the business's legal trading identity and Google Business Profile URL (no physical address requested).
2. Provide or confirm actual cancellation/refund terms, retention/deletion rules, and any marketing/CRM integrations.
3. Confirm testimonial sources and portfolio/photo/stock permissions; retain substantiation for any quantitative claims you want restored.
4. Review Elfsight field minimization and labels in the provider dashboard.
5. Zion hosting deployment was failing before this change. Inspect the Cloudflare build log to resolve it; do not assume a GitHub commit is live.

## Sources

- https://www.ada.gov/resources/web-guidance/
- https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers
- https://www.ftc.gov/legal-library/browse/ftc-policy-statement-regarding-advertising-substantiation
- https://www.ilga.gov/legislation/ilcs/fulltext?DocName=081505300K45
- https://illinoisattorneygeneral.gov/Consumer-Protection/For-Businesses/Data-Breach/
- https://elfsight.com/privacy-policy/
- https://calendly.com/legal/privacy-notice
- https://developers.cloudflare.com/web-analytics/about/
- https://developers.google.com/search/docs/appearance/google-images
- https://www.villasseniorcare.com/
- https://www.kokemillchurch.org/
