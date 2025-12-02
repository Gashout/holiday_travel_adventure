# Holiday Travel Adventure - Setup & Deployment Guide

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure Google Analytics:**

   - Go to [Google Analytics](https://analytics.google.com)
   - Create a new property for your website
   - Copy your Property ID (format: `G-XXXXXXXXXX`)
   - Create `.env.local` file in project root:
     ```
     NEXT_PUBLIC_GA_ID=G-YOUR_PROPERTY_ID
     ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Project Structure

```
app/
├── [locale]/               # Localized routes for en and ar
│   ├── layout.tsx         # Root layout with i18n setup
│   └── page.tsx           # Landing page with all sections
├── components/            # Reusable React components
│   ├── LanguageSwitcher.tsx    # Language toggle button
│   ├── WhatsAppButton.tsx      # Fixed WhatsApp CTA
│   ├── ServiceCard.tsx         # Service display cards
│   ├── TestimonialCard.tsx     # Client testimonial cards
│   └── Analytics.tsx           # Google Analytics integration
├── config/
│   └── whatsapp.ts        # WhatsApp configuration
├── globals.css            # Global styles with RTL support
└── layout.tsx             # Root layout wrapper (redirects to locale)

messages/
├── en.json               # English translations
└── ar.json               # Arabic translations

middleware.ts             # i18n routing middleware
i18n.ts                   # i18n configuration
```

## 🌐 Features Implemented

### ✅ Multi-Language Support (Arabic & English)

- Automatic language detection from URL
- Language switcher button in navigation
- Full RTL support for Arabic
- Translations for all content sections

### ✅ WhatsApp Integration

- Fixed floating WhatsApp button
- Direct link to WhatsApp chat: +60 17-904 0344
- Pre-filled greeting message
- Mobile and desktop friendly

### ✅ Google Analytics

- GA4 integration via `@next/third-parties`
- Automatic page view tracking
- Set `NEXT_PUBLIC_GA_ID` environment variable to enable

### ✅ Responsive Design

- Mobile-first approach with Tailwind CSS
- Fully responsive across all devices
- Modern gradient design inspired by Wanderly
- Smooth animations and transitions

### ✅ Services Highlighted

1. **Travel & Tourism** - Indonesia (Bali), Malaysia, Thailand, Vietnam, Taiwan
2. **Visa Assistance** - Tourist, Business, Student visas
3. **Study Admission** - Malaysian universities

## 📝 Translations

All content is in `messages/` directory:

- `messages/en.json` - English content
- `messages/ar.json` - Arabic content

To update translations, edit these files and the changes will reflect immediately in development mode.

## 🎨 Customization

### Colors & Styling

- Edit `app/globals.css` for CSS variables and RTL support
- Tailwind CSS classes used throughout - modify `className` values in components

### WhatsApp Number

- Update `app/config/whatsapp.ts` - change `WHATSAPP_PHONE` value
- Format: country code + phone number without symbols (e.g., `60179040344` for Malaysia)

### Google Analytics

- Set `NEXT_PUBLIC_GA_ID` in `.env.local`
- All page views and events will be tracked automatically

## 🔗 URL Structure

- **English**: `http://localhost:3000` or `http://localhost:3000/en`
- **Arabic**: `http://localhost:3000/ar`

The app automatically redirects to the appropriate language based on browser settings or URL.

## 📦 Build & Deploy

### Production Build

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variable: `NEXT_PUBLIC_GA_ID=your_ga_property_id`
5. Deploy!

### Deploy to Other Platforms

- The app is fully compatible with any Node.js hosting (Netlify, AWS, DigitalOcean, etc.)
- Ensure `NEXT_PUBLIC_GA_ID` is set in production environment

## 🐛 Troubleshooting

### Google Analytics not tracking?

- Verify `NEXT_PUBLIC_GA_ID` is set correctly
- Check GA4 dashboard for real-time data
- Clear browser cache and reload

### Language not switching?

- Ensure middleware.ts is in the root directory
- Clear `.next` build cache: `rm -rf .next`
- Rebuild: `npm run dev`

### WhatsApp link not working?

- Verify phone number format in `app/config/whatsapp.ts`
- Test manually: `https://wa.me/60179040344?text=Hello`

## 📊 Google Analytics Setup (Step-by-Step)

1. Go to https://analytics.google.com
2. Click **"Create Account"**
3. Fill in account name (e.g., "Holiday Travel Adventure")
4. Select **"Web"** as tracking type
5. Enter your website URL
6. Copy the **Property ID** (G-XXXXXXXXXX)
7. Add to `.env.local`: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
8. Restart dev server

## 📱 Responsive Breakpoints

The design uses Tailwind's responsive prefixes:

- `sm:` - Mobile landscape (640px)
- `md:` - Tablets (768px)
- `lg:` - Desktops (1024px)
- `xl:` - Large desktops (1280px)

## 🔐 Security Notes

- WhatsApp number is not sensitive (it's meant to be public)
- GA ID is also public (prefixed with `NEXT_PUBLIC_`)
- Never commit `.env.local` - use `.env.example` as template
- Sensitive credentials should use non-public env variables

## 📞 Support

For questions about:

- **Next.js**: https://nextjs.org/docs
- **next-intl**: https://next-intl-docs.vercel.app
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Google Analytics**: https://support.google.com/analytics

---

**Version**: 0.1.0  
**Last Updated**: November 2025
