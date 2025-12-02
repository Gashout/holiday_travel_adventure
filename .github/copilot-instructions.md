# AI Coding Agent Instructions

## Project Overview

**Holiday Travel Adventure** is a Next.js 16 web application for a Southeast Asian travel agency. It provides travel packages, visa assistance, and study admission services with full Arabic/English support, WhatsApp integration, and Google Analytics tracking.

## Architecture & Key Patterns

### Tech Stack

- **Framework**: Next.js 16 with App Router and dynamic localization via next-intl
- **Language**: TypeScript 5 with strict mode enabled
- **Styling**: Tailwind CSS 4 with PostCSS, responsive design, RTL support
- **Localization**: next-intl 4.5.6 with middleware-based routing for `/en` and `/ar` locales
- **UI Icons**: React Icons 5.5.0 (FaPlane, FaPassport, FaGraduationCap, FaWhatsapp, FaStar)
- **Analytics**: @next/third-parties with GA4 integration (environment variable: `NEXT_PUBLIC_GA_ID`)

### Project Structure

```
app/
  [locale]/                # Dynamic locale routes (en, ar)
    layout.tsx            # Locale layout with i18n provider, RTL direction
    page.tsx              # Landing page with Hero, Services, Testimonials, CTA
  components/             # Reusable UI components
    LanguageSwitcher.tsx  # Language toggle button (en/ar)
    WhatsAppButton.tsx    # Fixed floating WhatsApp button
    ServiceCard.tsx       # Service display cards (Travel, Visa, Study)
    TestimonialCard.tsx   # Client testimonial cards with star ratings
    Analytics.tsx         # GA4 integration wrapper
  config/
    whatsapp.ts          # WhatsApp phone & message configuration
  globals.css            # Global styles, CSS vars, RTL support
  layout.tsx             # Root layout with i18n redirect
messages/
  en.json               # English translations for all content
  ar.json               # Arabic translations for all content
middleware.ts           # i18n routing: detects locale from URL, defaults to /en
i18n.ts                # getRequestConfig for message loading per locale
next.config.ts         # withNextIntl plugin wrapper
```

## Critical Patterns & Conventions

### Localization (next-intl)

- Routes are `/en/*` and `/ar/*` - middleware redirects root `/` to `/en` by default
- Use `useTranslations()` hook in client components to access message keys
- Use `useLocale()` to detect current locale for RTL/styling adjustments
- Message structure in JSON: `{ "section": { "key": "value" } }` - access via `t("section.key")`
- Example: `t("services.travel.name")` returns "Travel & Tourism" (en) or "السفر والسياحة" (ar)

### RTL Support

- `html[dir="rtl"]` CSS selector in globals.css applies direction for Arabic
- Layout passes `dir={isRTL ? "rtl" : "ltr"}` to `<html>` element
- Tailwind's directional utilities auto-flip (e.g., `ml-4` becomes `mr-4` in RTL)
- Components must be RTL-aware: don't hardcode left/right positioning

### Component Patterns

- **Page Component** (`app/[locale]/page.tsx`): Server component by default, imports client components as needed
- **Client Components**: Marked with `"use client"` (LanguageSwitcher, WhatsAppButton, ServiceCard, TestimonialCard)
- **Props with Translations**: Pass translation keys (e.g., `titleKey="services.travel.name"`) to components; they call `t()` internally
- **Icon Usage**: Import from `react-icons/fa` (FaPlane, FaPassport, FaGraduationCap, FaStar, FaWhatsapp, FaArrowRight)

### WhatsApp Integration

- Phone: `+60 17-904 0344` (Malaysia) stored as `60179040344` in `app/config/whatsapp.ts`
- Button is a floating fixed element (`fixed bottom-8 right-8`) with `target="_blank"`
- URL format: `https://wa.me/{PHONE}?text={ENCODED_MESSAGE}`
- All WhatsApp links automatically open the WhatsApp app or web client

### Google Analytics

- Enabled via `NEXT_PUBLIC_GA_ID` environment variable (GA4 property ID: `G-XXXXXXXXXX`)
- Set in `.env.local` for development and deploy environment for production
- Integrated via `<Analytics>` component in `app/[locale]/layout.tsx`
- Auto-tracks page views; no manual event setup required unless needed

### Styling Approach

- **Tailwind-first**: All styles use utility classes; no CSS modules or styled-components
- **Responsive**: Mobile-first with `sm:`, `md:`, `lg:` breakpoints (640px, 768px, 1024px)
- **Colors**: Gradient blues/teals (blue-500, blue-600, indigo-600) inspired by Wanderly design
- **Sections**: Hero (hero with stats), Services (3-card grid), Testimonials (3-card grid), CTA (gradient background), Footer

## Developer Workflows

### Development

```bash
npm run dev          # Runs Next.js dev server on http://localhost:3000
npm run build        # Production build to .next/
npm start            # Start production server
npm run lint         # ESLint validation
```

### Testing

- Test both locales: `http://localhost:3000/en` and `http://localhost:3000/ar`
- Verify WhatsApp button links open correctly
- Check GA4 real-time dashboard during dev (if GA ID set)
- RTL layout should flip horizontally for Arabic

### Adding Translations

1. Edit `messages/en.json` and `messages/ar.json`
2. Add new keys following nested structure: `{ "section": { "key": "value" } }`
3. Use in components: `t("section.key")`
4. Restart dev server if structure changes

### Adding New Services or Sections

1. Add translations to both `messages/*.json`
2. Create corresponding component in `app/components/` if needed
3. Import and use in `app/[locale]/page.tsx`
4. Ensure responsive grid layout with Tailwind (`md:grid-cols-3`, etc.)

## Integration Points

### External Dependencies

- **@next/third-parties**: Provides `<GoogleAnalytics>` component for GA4
- **next-intl**: Handles all i18n routing, message loading, and locale context
- **react-icons/fa**: FontAwesome icons (all icons used are FA brands/solid)

### Environment Variables

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX    # GA4 Property ID (required for analytics)
```

### Build Output

- Builds to `.next/` directory (gitignored)
- Static assets in `public/` directory (referenced as `/next.svg`, `/vercel.svg`)
- ESLint ignores: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`

## When Adding Features

1. **New Page/Route**: Create file in `app/[locale]/` (automatically inherits locale)
2. **New Component**: Add to `app/components/`, use `"use client"` if needed, accept `useTranslations()` internally
3. **New Translations**: Add keys to `messages/en.json` and `messages/ar.json` in same structure
4. **New Integrations**: Use environment variables for config (prefix with `NEXT_PUBLIC_` if needed client-side)
5. **Styling**: Use Tailwind classes only; edit `app/globals.css` for global styles or CSS variables
6. **Icons**: Import from `react-icons/fa`; check [react-icons.github.io/react-icons](https://react-icons.github.io/react-icons) for available icons

## Key Files Reference

- **`app/[locale]/layout.tsx`**: Root locale layout, GA integration, RTL direction
- **`app/[locale]/page.tsx`**: Main landing page with all sections (hero, services, testimonials, CTA)
- **`app/components/`**: Reusable components (LanguageSwitcher, WhatsAppButton, ServiceCard, TestimonialCard, Analytics)
- **`messages/en.json` & `messages/ar.json`**: All translatable content
- **`middleware.ts`**: Handles locale detection and routing
- **`app/config/whatsapp.ts`**: WhatsApp phone and message configuration
- **`app/globals.css`**: Global styles, CSS variables, RTL support, Tailwind imports

## Immediate Setup for Agents

1. Understand locale routing: `/en/*` and `/ar/*` are separate routes handled by middleware
2. All translations are in `messages/` directory—structure changes require server restart
3. Components use translation keys (not hardcoded strings) for reusability
4. RTL is automatic—don't hardcode left/right positioning
5. WhatsApp URL is pre-built in `app/config/whatsapp.ts`; change phone number there if needed
6. GA4 requires `NEXT_PUBLIC_GA_ID` environment variable; test in GA4 real-time dashboard

---

**Version**: 0.2.0 (with i18n, WhatsApp, GA4, and landing page)  
**Last Updated**: November 2025
