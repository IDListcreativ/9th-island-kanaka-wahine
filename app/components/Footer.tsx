import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="container-primary py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-ocean-600 to-island-green text-lg font-bold text-white">9</div>
              <span className="font-bold text-white">9th Island</span>
            </div>
            <p className="text-sm text-gray-400">A mobile-first prototype for validating community discovery, listings, and connection flows before backend development.</p>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-white">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/vendors" className="hover:text-ocean-500">Vendors</Link></li>
              <li><Link href="/events" className="hover:text-ocean-500">Events</Link></li>
              <li><Link href="/gatherings" className="hover:text-ocean-500">Gatherings</Link></li>
              <li><Link href="/map" className="hover:text-ocean-500">Map</Link></li>
              <li><Link href="/marketplace" className="hover:text-ocean-500">Marketplace</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-white">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/feed" className="hover:text-ocean-500">Community Feed</Link></li>
              <li><Link href="/organizations" className="hover:text-ocean-500">Organizations</Link></li>
              <li><Link href="/resources" className="hover:text-ocean-500">Resources</Link></li>
              <li><Link href="/about" className="hover:text-ocean-500">About</Link></li>
              <li><Link href="/admin" className="hover:text-ocean-500">Admin</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-white">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2"><Mail size={18} className="mt-0.5 flex-shrink-0" /><span>hello@9thisland.local</span></li>
              <li className="flex gap-2"><Phone size={18} className="mt-0.5 flex-shrink-0" /><span>(702) 9TH-ISLE</span></li>
              <li className="flex gap-2"><MapPin size={18} className="mt-0.5 flex-shrink-0" /><span>Las Vegas, Nevada</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-gray-800 pt-8 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 9th Island Community Platform. Frontend prototype.</p>
          <div className="flex gap-4"><Link href="/privacy" className="hover:text-ocean-500">Privacy</Link><Link href="/terms" className="hover:text-ocean-500">Terms</Link></div>
        </div>
      </div>
    </footer>
  )
}
