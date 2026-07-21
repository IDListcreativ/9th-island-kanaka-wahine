# 9th Island Kanaka Wahine

Community platform for 9th Island.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Supabase** for backend and authentication (schema in `/supabase`)
- **Vercel Speed Insights** for performance monitoring

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, pnpm, yarn, or bun

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Vercel Speed Insights

This project includes Vercel Speed Insights for monitoring real-world performance metrics. The `<SpeedInsights />` component is integrated in the root layout (`app/layout.tsx`).

Speed Insights will automatically track:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)
- Time to First Byte (TTFB)

Metrics are available in the Vercel dashboard after deployment.

## Database

Database schema and seed data are available in the `/supabase` directory. See `/supabase/README.md` for setup instructions.

## Deployment

Deploy to Vercel:

```bash
vercel deploy
```

## License

Private repository
