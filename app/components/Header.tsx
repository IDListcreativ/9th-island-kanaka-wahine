'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="container-primary flex justify-between items-center h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-ocean-600 to-island-green rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">9</span>
          </div>
          <span className="font-bold text-lg hidden sm:inline text-gray-900">9th Island</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/vendors" className="text-gray-600 hover:text-ocean-600 transition-colors">
            Vendors
          </Link>
          <Link href="/events" className="text-gray-600 hover:text-ocean-600 transition-colors">
            Events
          </Link>
          <Link href="/marketplace" className="text-gray-600 hover:text-ocean-600 transition-colors">
            Marketplace
          </Link>
          <Link href="/auth/login" className="btn-primary">
            Sign In
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="container-primary py-4 flex flex-col gap-4">
            <Link href="/vendors" className="text-gray-600 hover:text-ocean-600">
              Vendors
            </Link>
            <Link href="/events" className="text-gray-600 hover:text-ocean-600">
              Events
            </Link>
            <Link href="/marketplace" className="text-gray-600 hover:text-ocean-600">
              Marketplace
            </Link>
            <Link href="/auth/login" className="btn-primary w-full text-center">
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}