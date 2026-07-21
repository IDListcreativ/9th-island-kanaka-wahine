import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-primary py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-ocean-600 to-island-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">9</span>
              </div>
              <span className="font-bold text-white">9th Island</span>
            </div>
            <p className="text-sm text-gray-400">
              Connecting the Hawaiian and Pacific Islander community in Las Vegas.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/vendors" className="hover:text-ocean-500 transition-colors">Vendors</Link></li>
              <li><Link href="/events" className="hover:text-ocean-500 transition-colors">Events</Link></li>
              <li><Link href="/marketplace" className="hover:text-ocean-500 transition-colors">Marketplace</Link></li>
              <li><Link href="/meetups" className="hover:text-ocean-500 transition-colors">Meetups</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/feed" className="hover:text-ocean-500 transition-colors">Community Feed</Link></li>
              <li><Link href="/about" className="hover:text-ocean-500 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-ocean-500 transition-colors">Contact</Link></li>
              <li><Link href="/resources" className="hover:text-ocean-500 transition-colors">Resources</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail size={18} className="mt-0.5 flex-shrink-0" />
                <span>hello@9thisland.local</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={18} className="mt-0.5 flex-shrink-0" />
                <span>(702) 9TH-ISLE</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>Las Vegas, Nevada</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2024 9th Island Community Platform. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-ocean-500 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-ocean-500 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}