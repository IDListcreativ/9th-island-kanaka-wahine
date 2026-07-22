'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, Heart, Map, Menu, MessageCircle, Search, ShieldCheck, User, X } from 'lucide-react'
import { useState } from 'react'
import { useMockApp } from '@/app/providers'

const navItems = [
  { href: '/vendors', label: 'Vendors' },
  { href: '/events', label: 'Events' },
  { href: '/gatherings', label: 'Gatherings' },
  { href: '/businesses', label: 'Businesses' },
  { href: '/organizations', label: 'Organizations' },
  { href: '/musicians', label: 'Musicians' },
  { href: '/map', label: 'Map' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/announcements', label: 'Announcements' },
  { href: '/feed', label: 'Feed' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { user, notifications } = useMockApp()
  const unread = notifications.filter((notification) => !notification.read).length

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <nav className="container-primary flex min-h-16 items-center justify-between gap-3 py-2">
        <Link href="/" className="flex min-w-0 items-center gap-2" onClick={() => setIsOpen(false)}>
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-ocean-600 to-island-green text-lg font-bold text-white">9</div>
          <span className="truncate text-base font-bold text-gray-900 sm:text-lg">9th Island</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${pathname.startsWith(item.href) ? 'bg-ocean-50 text-ocean-700' : 'text-gray-600 hover:bg-gray-50 hover:text-ocean-700'}`}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/search" aria-label="Search" className="btn-secondary px-3"><Search size={18} /></Link>
          <Link href="/map" aria-label="Map" className="btn-secondary px-3"><Map size={18} /></Link>
          <Link href="/favorites" aria-label="Favorites" className="btn-secondary px-3"><Heart size={18} /></Link>
          <Link href="/messages" aria-label="Messages" className="btn-secondary px-3"><MessageCircle size={18} /></Link>
          <Link href="/notifications" aria-label="Notifications" className="btn-secondary relative px-3"><Bell size={18} />{unread > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-sand-300 px-1.5 text-xs font-bold text-gray-900">{unread}</span>}</Link>
          <Link href="/admin" aria-label="Admin moderation" className="btn-secondary px-3"><ShieldCheck size={18} /></Link>
          <Link href={user ? '/profile' : '/auth/login'} className="btn-primary"><User size={18} />{user ? 'Profile' : 'Sign In'}</Link>
        </div>

        <button className="btn-secondary px-3 lg:hidden" onClick={() => setIsOpen((open) => !open)} aria-label="Toggle menu">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-gray-200 bg-white lg:hidden">
          <div className="container-primary grid gap-2 py-4 safe-bottom">
            {[...navItems, { href: '/search', label: 'Search' }, { href: '/favorites', label: 'Favorites' }, { href: '/messages', label: 'Messages' }, { href: '/notifications', label: `Notifications${unread ? ` (${unread})` : ''}` }, { href: '/admin', label: 'Admin' }, { href: user ? '/profile' : '/auth/login', label: user ? 'Profile' : 'Sign In' }].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className={`rounded-lg px-3 py-3 text-base font-medium ${pathname.startsWith(item.href) ? 'bg-ocean-50 text-ocean-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
