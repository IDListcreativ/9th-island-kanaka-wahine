'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Calendar, MapPin, Navigation, Search, Store, Users } from 'lucide-react'
import PageShell from '@/app/components/PageShell'
import { resourceConfig, ResourceItem, ResourceKind } from '@/app/data/mock'
import { useMockApp } from '@/app/providers'

const visibleKinds: ResourceKind[] = ['vendors', 'events', 'gatherings', 'businesses', 'organizations', 'musicians']
const kindLabels: Record<ResourceKind, string> = {
  vendors: 'Vendors',
  events: 'Events',
  gatherings: 'Gatherings',
  businesses: 'Businesses',
  organizations: 'Organizations',
  musicians: 'Musicians',
  listings: 'Marketplace',
}

function pinPosition(item: ResourceItem, index: number) {
  const seed = Array.from(item.slug).reduce((sum, char) => sum + char.charCodeAt(0), index * 11)
  return {
    left: 14 + (seed % 72),
    top: 18 + ((seed * 7) % 62),
  }
}

function iconFor(kind: ResourceKind) {
  if (kind === 'events' || kind === 'gatherings') return <Calendar size={16} />
  if (kind === 'organizations') return <Users size={16} />
  return <Store size={16} />
}

export default function MapPage() {
  const { resources } = useMockApp()
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState<ResourceKind | 'all'>('all')
  const allItems = useMemo(() => visibleKinds.flatMap((resourceKind) => resources[resourceKind]), [resources])
  const items = useMemo(() => allItems.filter((item) => {
    const matchesKind = kind === 'all' || item.type === kind
    const haystack = [item.name, item.subtitle, item.location, item.category, ...item.tags].join(' ').toLowerCase()
    return matchesKind && haystack.includes(query.toLowerCase())
  }), [allItems, kind, query])
  const [selectedSlug, setSelectedSlug] = useState<string | null>(items[0]?.slug || null)
  const selected = items.find((item) => item.slug === selectedSlug) || items[0]

  return (
    <PageShell>
      <main className="min-h-screen bg-gray-50">
        <section className="border-b border-gray-200 bg-white py-8 md:py-12">
          <div className="container-primary">
            <p className="pill mb-3">Mock community map</p>
            <h1 className="section-title">Explore the Valley</h1>
            <p className="mt-2 max-w-2xl text-lg text-gray-600">A frontend-only map for discovering vendors, events, gatherings, businesses, and organizations across Las Vegas.</p>
            <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
              <label className="relative block"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input className="field-input pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search map" /></label>
              <select className="field-input md:w-56" value={kind} onChange={(event) => setKind(event.target.value as ResourceKind | 'all')}><option value="all">All map items</option>{visibleKinds.map((option) => <option key={option} value={option}>{kindLabels[option]}</option>)}</select>
            </div>
          </div>
        </section>

        <section className="container-primary py-8 md:py-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="relative min-h-[520px] overflow-hidden rounded-lg border border-gray-200 bg-gradient-to-br from-ocean-50 via-white to-emerald-50 shadow-sm">
              <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'linear-gradient(#d1d5db 1px, transparent 1px), linear-gradient(90deg, #d1d5db 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
              <div className="absolute left-6 top-6 rounded-lg bg-white/90 p-3 text-sm font-semibold text-gray-700 shadow-sm"><Navigation className="mb-1 text-ocean-600" size={20} />Las Vegas Valley</div>
              {items.map((item, index) => {
                const position = pinPosition(item, index)
                const active = selected?.slug === item.slug
                return <button key={`${item.type}-${item.slug}`} className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold shadow-sm transition ${active ? 'z-20 border-ocean-700 bg-ocean-600 text-white scale-105' : 'z-10 border-white bg-white text-gray-800 hover:border-ocean-300'}`} style={{ left: `${position.left}%`, top: `${position.top}%` }} onClick={() => setSelectedSlug(item.slug)}>{iconFor(item.type)}<span className="hidden sm:inline">{item.name}</span></button>
              })}
              {items.length === 0 && <div className="absolute inset-0 flex items-center justify-center p-8 text-center"><div className="rounded-lg bg-white p-6 shadow-sm"><h2 className="font-bold text-gray-900">No map results</h2><p className="mt-2 text-sm text-gray-600">Try a broader search or switch filters.</p></div></div>}
            </div>

            <aside className="card self-start">
              {selected ? <>
                <span className="pill">{resourceConfig[selected.type].singular}</span>
                <h2 className="mt-3 text-2xl font-bold text-gray-900">{selected.name}</h2>
                <p className="mt-2 text-gray-600">{selected.subtitle}</p>
                <div className="mt-5 space-y-3 text-sm text-gray-700"><p className="flex items-center gap-2"><MapPin size={18} />{selected.location}</p>{selected.date && <p className="flex items-center gap-2"><Calendar size={18} />{selected.date}{selected.time ? ` at ${selected.time}` : ''}</p>}</div>
                <div className="mt-5 flex flex-wrap gap-2">{selected.tags.map((tag) => <span key={tag} className="pill">{tag}</span>)}</div>
                <Link href={`${resourceConfig[selected.type].path}/${selected.slug}`} className="btn-primary mt-6 w-full">Open details</Link>
              </> : <><h2 className="text-xl font-bold text-gray-900">Select a pin</h2><p className="mt-2 text-gray-600">Tap a map marker to preview details.</p></>}
            </aside>
          </div>
        </section>
      </main>
    </PageShell>
  )
}
