# 9th Island Kanaka Wahine

Community platform prototype for the Hawaiian and Pacific Islander community in Las Vegas.

## About

9th Island is a mobile-first frontend prototype that serves as a central digital hub for Hawaiian and Pacific Islander community discovery in Las Vegas. The current build is intentionally frontend-only so users can validate navigation, content, and workflows before backend development begins.

The prototype supports:

- Vendors: discover local food, craft, wellness, and service providers.
- Events: browse community events and RSVP-style flows.
- Gatherings: find recurring meetups, park days, coffee hours, and family circles.
- Businesses: explore local professional services and island-owned businesses.
- Organizations: connect with nonprofits, cultural groups, youth programs, and mutual aid teams.
- Musicians: find performers, DJs, bands, and instructors for events and family celebrations.
- Announcements: read practical community updates without turning the app into a social feed.
- Marketplace: browse and create local listings for goods and services.

## Tech Stack

- Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS
- State: mocked data with localStorage persistence
- Icons: Lucide React
- Deployment: Vercel
- Performance: Vercel Speed Insights

## Current Prototype Features

- Functional frontend routing for all major navigation links
- Dynamic detail pages for vendors, events, gatherings, businesses, organizations, and marketplace listings
- Musician directory and profile pages
- Community announcements with create, edit, delete, and pin interactions
- Local CRUD-style create, edit, and delete flows
- Mock authentication screens for sign in, sign up, forgot password, and profile editing
- Search, filtering, sorting, and favorites
- Interactive frontend map for vendors, events, gatherings, businesses, and organizations
- Mock notifications and mock messaging
- Mock admin moderation dashboard with report review actions
- Community feed with local post creation and deletion
- Mobile-first responsive navigation and layouts
- Loading skeletons and empty states

## Backend Status

No backend is connected in the current prototype. Supabase SQL files are present as planning assets only. The application does not call Supabase, APIs, databases, or authentication providers yet.

All interactive state is mocked and stored locally in the browser.

## Quick Start

### Prerequisites

- Node.js 18+
- npm, pnpm, yarn, or bun

### Installation

```bash
git clone https://github.com/IDListcreativ/9th-island-kanaka-wahine.git
cd 9th-island-kanaka-wahine
npm install
cp .env.example .env.local
```

### Development

```bash
npm run dev
```

Open http://localhost:3000.

### Production Build

```bash
npm run build
npm start
```

## Design System

- Ocean: blues for primary actions
- Sand: warm accent color
- Island green and teal: highlights and brand accents
- Mobile-first layouts for users arriving from Facebook or other social apps on their phones

## Deployment

```bash
vercel deploy
```

Environment variables are reserved for future backend work:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

They are not required for the current frontend-only prototype.

## License

Private repository.

Built for the Hawaiian and Pacific Islander community in Las Vegas.
