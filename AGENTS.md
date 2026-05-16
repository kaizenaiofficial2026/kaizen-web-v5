<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Kaizen Web Agent Notes

## Product Context

Kaizen Web is the marketing site for **Kaizen AI**, a service business selling AI chatbots, AI voice agents, missed-call recovery, appointment booking, and custom AI automations. The site should feel premium, fast, conversion-focused, and operationally trustworthy. The main audience is business owners and operators who need every customer call, website chat, WhatsApp message, Instagram DM, or Messenger conversation answered quickly and turned into qualified leads or bookings.

Core positioning:

- "Your AI Sales Team Never Sleeps."
- AI chatbots for website, WhatsApp, Instagram, and Messenger.
- AI voice agents for inbound calls, outbound follow-up, safe transfer, and missed-call recovery.
- Custom automations that connect CRMs, calendars, forms, notifications, and internal workflows.
- Strong emphasis on 24/7 availability, 30+ languages, booking outcomes, speed, and human handoff.

## Stack

- Next.js `16.2.4` App Router with React `19.2.4`.
- TypeScript throughout.
- Tailwind CSS v4 via `@import "tailwindcss"` and `@theme` blocks in `app/globals.css`.
- shadcn-style primitives in `components/ui`.
- Radix UI for primitives such as accordion, dialog, separator, slot, and switch.
- `motion` for animation.
- `lucide-react` for icons.
- Three.js / React Three Fiber for the animated hero background.

## Commands

- `npm run dev` starts local dev with `next dev --webpack`.
- `npm run build` creates a production build.
- `npm run start` serves the production build.
- `npm run lint` runs ESLint.

Run `npm run lint` after code changes when practical. For layout, animation, or visual work, also run the app and check the affected routes in a browser.

## Next.js Rules

Before writing or changing Next.js code, read the relevant local docs in `node_modules/next/dist/docs/`. Good starting points:

- App Router overview: `node_modules/next/dist/docs/01-app/index.md`
- Project structure: `node_modules/next/dist/docs/01-app/01-getting-started/02-project-structure.md`
- Layouts and pages: `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
- Server and Client Components: `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- Metadata: `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md`

Pages and layouts are Server Components by default. Add `"use client"` only when a component needs state, effects, event handlers, browser APIs, animation hooks, or client-only libraries. Keep client boundaries as small as the feature allows.

Dynamic App Router params may be Promise-based in current docs. Check local docs before editing dynamic routes.

## Project Structure

- `app/` contains routes and route-level metadata.
- `app/layout.tsx` sets fonts, metadata, theme provider, motion provider, header, footer, skip link, and chat widget.
- `app/page.tsx` is the homepage and composes the major marketing sections.
- `app/solutions/*`, `app/industries/[slug]`, `app/demo`, `app/pricing`, `app/book-demo`, `app/blog`, and `app/case-studies` are public marketing routes.
- `components/layout/` contains global shell pieces such as header, footer, mobile nav, brand mark, skip link, and scroll progress.
- `components/sections/` contains homepage and shared marketing sections.
- `components/sections/products/` contains reusable product detail page layouts.
- `components/primitives/` contains layout helpers such as `Container`, `SectionShell`, `SectionHeader`, `MarketingPage`, `Eyebrow`, and `Grain`.
- `components/ui/` contains shadcn-style primitives. Prefer extending these over inventing one-off base controls.
- `components/motion/` contains reusable animation wrappers.
- `components/backgrounds/` contains the hero background and fallback.
- `components/demo/VoiceDemoPanel.tsx` powers the demo experience.
- `components/theme/` contains dark/light theme logic.
- `lib/content/` is the source of truth for marketing copy, nav, pricing, product pages, industries, blog, FAQs, testimonials, logos, and footer.
- `lib/types.ts` holds shared TypeScript types.
- `lib/utils.ts` includes shared helpers such as `cn`.
- `public/brand-logos/` stores integration and partner logos.

## Content Model

Prefer editing structured content in `lib/content/*` rather than hard-coding repeated copy into components. Pages generally import content arrays and map over them. Keep copy concise, outcome-driven, and specific to business workflows.

When adding a new solution, industry, pricing item, FAQ, testimonial, logo, or nav item:

- Add or update the relevant `lib/content/*` file.
- Reuse existing section/page components where possible.
- Keep route metadata current in the matching `app/**/page.tsx`.
- Check that new slugs line up with links in `lib/content/nav.ts`.

## Design Direction

The visual language is dark, premium, and gold-accented:

- Main palette comes from CSS variables in `app/globals.css`: black surfaces, off-white text, gold primary/accent colors, muted gold secondary text.
- Light theme exists through `.light`; avoid hard-coded colors that break it unless there is a deliberate hero/brand reason.
- Typography uses Geist, Geist Mono, Instrument Serif, Syne, and DM Sans from `next/font/google`.
- CTAs should be direct and booking-oriented: demos, strategy calls, pricing, product exploration.
- Keep pages dense enough for operators to scan. Avoid generic SaaS filler copy.
- Use lucide icons for feature cards, process steps, and controls.
- Respect accessibility: semantic headings, useful alt text, keyboard focus, `aria-hidden` for decorative icons, and the existing skip link.

## Component Patterns

- Prefer composition through `MarketingHero`, `MarketingSection`, `SectionHeader`, `Container`, `Card`, `Button`, `Badge`, `FadeUp`, and `StaggerGrid`.
- Keep route files mostly as composition and metadata. Put reusable UI into `components`.
- Use `next/link` for internal links.
- Use `next/font` only from layout-level configuration unless there is a strong reason.
- For browser-only or heavy visual features, follow the existing pattern in `Hero.tsx`: dynamic import with `ssr: false` and a fallback where needed.
- For motion, account for reduced motion when appropriate.
- Do not nest cards inside cards unless the surrounding component is genuinely a framed tool or modal.

## Styling Notes

- Tailwind v4 tokens are defined in `app/globals.css` with `@theme`.
- Use semantic classes like `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`, and `text-primary` when possible.
- Existing custom utility classes include `gold-card` and `gold-card-bright`.
- Keep responsive layouts stable across mobile and desktop. Watch for long labels in buttons, nav, badges, and cards.
- Avoid adding a new unrelated palette. If new colors are needed, wire them through CSS variables or keep them narrowly scoped.

## Quality Bar

- Preserve existing user changes. Do not reset or revert unrelated edits.
- Keep changes focused on the requested feature or fix.
- Avoid broad refactors unless they clearly reduce local complexity.
- Check TypeScript types for content arrays and component props.
- Run lint/build when the change could affect compilation.
- For visual changes, inspect the relevant routes at desktop and mobile widths.
