import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Providers } from '@/app/providers'
import './globals.css'

export const metadata: Metadata = {
  title: '9th Island | Hawaiian & Pacific Islander Community Hub',
  description: 'Discover local vendors, events, gatherings, businesses, and community resources in Las Vegas.',
  viewport: 'width=device-width, initial-scale=1',
  keywords: ['Hawaiian', 'Pacific Islander', 'Community', 'Las Vegas', 'Local Business', 'Events'],
  openGraph: {
    title: '9th Island',
    description: 'Community platform for the Hawaiian and Pacific Islander community in Las Vegas.',
    url: 'https://9th-island-kanaka-wahine.vercel.app',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  )
}
