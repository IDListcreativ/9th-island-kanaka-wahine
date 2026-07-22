'use client'

import Link from 'next/link'
import { ArrowRight, Heart, Map, Megaphone, MessageCircle, Music, Search, ShieldCheck } from 'lucide-react'
import PageShell from '@/app/components/PageShell'
import { resourceConfig, ResourceKind } from '@/app/data/mock'
import { useMockApp } from '@/app/providers'

const sections: ResourceKind[] = ['vendors', 'events', 'gatherings', 'businesses', 'organizations', 'musicians', 'listings']

export default function Home() {
  const { resources, notifications, favorites, loading, announcements } = useMockApp()
  const featured = sections.flatMap((kind) => resources[kind].slice(0, 1)).slice(0, 6)

  return (
    <PageShell>
      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-ocean-700 via-island-teal to-emerald-500 text-white">
          <div className="container-primary py-12 md:py-20">
            <div className="max-w-3xl">
              <p className="mb-4 inline-flex rounded-full bg-white/20 px-3 py-1 text-sm font-bold">Mobile-first community prototype</p>
              <h1 className="text-4xl font-bold md:text-6xl">9th Island</h1>
              <p className="mt-4 text-lg text-white/90 md:text-xl">Find Hawaiian and Pacific Islander vendors, events, gatherings, businesses, organizations, and marketplace listings across Las Vegas.</p>
              <div className="mt-7 grid gap-3 sm:flex"><Link href="/search" className="btn-primary bg-white text-ocean-700 hover:bg-ocean-50"><Search size={18} />Search the community</Link><Link href="/map" className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20"><Map size={18} />Open map</Link><Link href="/events" className="btn-secondary border-white/30 bg-white/10 text-white hover:bg-white/20">Explore events<ArrowRight size={18} /></Link></div>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-white/20 pt-8 text-center">
              <div><div className="text-2xl font-bold">{loading ? '-' : Object.values(resources).flat().length}</div><div className="text-sm text-white/80">Mock records</div></div>
              <div><div className="text-2xl font-bold">{favorites.length}</div><div className="text-sm text-white/80">Saved</div></div>
              <div><div className="text-2xl font-bold">{notifications.filter((item) => !item.read).length}</div><div className="text-sm text-white/80">Alerts</div></div>
            </div>
          </div>
        </section>
        <section className="container-primary py-10 md:py-14">
          <div className="mb-6 flex items-end justify-between gap-4"><div><h2 className="text-2xl font-bold text-gray-900">Start here</h2><p className="text-gray-600">Every card links to a working page with local-state interactions.</p></div><Link href="/feed" className="btn-secondary hidden sm:inline-flex">Community feed</Link></div>
          <div className="grid gap-4 md:grid-cols-3">{featured.map((item) => <Link key={`${item.type}-${item.slug}`} href={`${resourceConfig[item.type].path}/${item.slug}`} className="card"><div className={`mb-4 h-24 rounded-lg bg-gradient-to-br ${item.image}`} /><span className="pill">{resourceConfig[item.type].singular}</span><h3 className="mt-3 text-lg font-bold text-gray-900">{item.name}</h3><p className="mt-1 text-sm text-gray-600">{item.subtitle}</p></Link>)}</div>
        </section>
        <section className="bg-white py-10 md:py-14"><div className="container-primary"><div className="mb-6 flex items-end justify-between gap-4"><div><h2 className="text-2xl font-bold text-gray-900">Announcements</h2><p className="text-gray-600">Pinned updates for vendors, families, and organizers.</p></div><Link href="/announcements" className="btn-secondary hidden sm:inline-flex">View all</Link></div><div className="grid gap-4 md:grid-cols-2">{announcements.slice(0, 2).map((announcement) => <Link href="/announcements" key={announcement.id} className="card"><div className="flex flex-wrap gap-2"><span className="pill">{announcement.audience}</span>{announcement.pinned && <span className="rounded-full bg-sand-100 px-3 py-1 text-xs font-bold text-gray-900">Pinned</span>}</div><h3 className="mt-3 text-lg font-bold text-gray-900">{announcement.title}</h3><p className="mt-2 text-sm text-gray-600">{announcement.body}</p></Link>)}</div></div></section>
        <section className="bg-gray-50 py-10 md:py-14"><div className="container-primary grid gap-4 md:grid-cols-5"><Link href="/announcements" className="card"><Megaphone className="mb-4 text-ocean-600" /><h3 className="font-bold text-gray-900">Announcements</h3><p className="mt-1 text-sm text-gray-600">Read practical community updates.</p></Link><Link href="/musicians" className="card"><Music className="mb-4 text-ocean-600" /><h3 className="font-bold text-gray-900">Musicians</h3><p className="mt-1 text-sm text-gray-600">Find performers and DJs.</p></Link><Link href="/messages" className="card"><MessageCircle className="mb-4 text-ocean-600" /><h3 className="font-bold text-gray-900">Messages</h3><p className="mt-1 text-sm text-gray-600">Try local message threads.</p></Link><Link href="/favorites" className="card"><Heart className="mb-4 text-ocean-600" /><h3 className="font-bold text-gray-900">Favorites</h3><p className="mt-1 text-sm text-gray-600">Saved records persist.</p></Link><Link href="/admin" className="card"><ShieldCheck className="mb-4 text-ocean-600" /><h3 className="font-bold text-gray-900">Moderation</h3><p className="mt-1 text-sm text-gray-600">Review reports.</p></Link></div></section>
      </main>
    </PageShell>
  )
}
