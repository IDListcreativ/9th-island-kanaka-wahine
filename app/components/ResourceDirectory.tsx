'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Calendar, Heart, MapPin, Pencil, Plus, Search, Star, Trash2, Users } from 'lucide-react'
import { resourceConfig, ResourceItem, ResourceKind } from '@/app/data/mock'
import { useMockApp } from '@/app/providers'
import ResourceForm from '@/app/components/ResourceForm'
import { EmptyState, SkeletonGrid } from '@/app/components/States'

function matches(item: ResourceItem, query: string) {
  const haystack = [item.name, item.subtitle, item.description, item.location, item.category, ...item.tags].join(' ').toLowerCase()
  return haystack.includes(query.toLowerCase())
}

export default function ResourceDirectory({ kind, title, subtitle }: { kind: ResourceKind; title: string; subtitle: string }) {
  const config = resourceConfig[kind]
  const { resources, loading, isFavorite, toggleFavorite, deleteItem } = useMockApp()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('featured')
  const [editing, setEditing] = useState<ResourceItem | null>(null)
  const [creating, setCreating] = useState(false)

  const items = useMemo(() => {
    return resources[kind]
      .filter((item) => (category === 'All' || item.category === category) && matches(item, query))
      .sort((a, b) => {
        if (sort === 'name') return a.name.localeCompare(b.name)
        if (sort === 'rating') return (b.rating || 0) - (a.rating || 0)
        if (sort === 'date') return String(a.date || a.createdAt).localeCompare(String(b.date || b.createdAt))
        return (b.favoriteCount || 0) - (a.favoriteCount || 0)
      })
  }, [category, kind, query, resources, sort])

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="border-b border-gray-200 bg-white py-8 md:py-12">
        <div className="container-primary">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="pill mb-3">Frontend prototype</p>
              <h1 className="section-title">{title}</h1>
              <p className="mt-2 max-w-2xl text-lg text-gray-600">{subtitle}</p>
            </div>
            <button className="btn-primary w-full md:w-auto" onClick={() => setCreating(true)}><Plus size={18} />{config.createLabel}</button>
          </div>
          <div className="mt-6 grid gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 md:grid-cols-[1fr_auto_auto]">
            <label className="relative block"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${config.plural.toLowerCase()}`} className="field-input pl-10" /></label>
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="field-input md:w-48"><option>All</option>{config.categories.map((option) => <option key={option}>{option}</option>)}</select>
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="field-input md:w-48"><option value="featured">Most saved</option><option value="name">Name</option><option value="rating">Rating</option><option value="date">Date</option></select>
          </div>
        </div>
      </section>

      <section className="container-primary py-8 md:py-10">
        {loading ? <SkeletonGrid /> : items.length === 0 ? <EmptyState title="No matches found" body="Try a different search, clear filters, or create a new community record." action={<button className="btn-primary" onClick={() => setCreating(true)}>Create one</button>} /> : <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">{items.map((item) => <article key={item.id} className="card overflow-hidden p-0"><Link href={`${config.path}/${item.slug}`} className={`block h-32 bg-gradient-to-br ${item.image}`} aria-label={item.name} /><div className="p-5"><div className="mb-3 flex items-start justify-between gap-3"><div><span className="pill">{item.category}</span><h2 className="mt-3 text-xl font-bold text-gray-900">{item.name}</h2><p className="mt-1 text-sm text-gray-600">{item.subtitle}</p></div><button className={`rounded-full border p-2 ${isFavorite(kind, item.slug) ? 'border-sand-300 bg-sand-100 text-gray-900' : 'border-gray-200 text-gray-500'}`} onClick={() => toggleFavorite(kind, item.slug)} aria-label="Toggle favorite"><Heart size={18} fill={isFavorite(kind, item.slug) ? 'currentColor' : 'none'} /></button></div><div className="space-y-2 text-sm text-gray-600"><p className="flex items-center gap-2"><MapPin size={16} />{item.location}</p>{item.date && <p className="flex items-center gap-2"><Calendar size={16} />{item.date}{item.time ? ` at ${item.time}` : ''}</p>}{item.rating && <p className="flex items-center gap-2"><Star size={16} className="text-yellow-500" />{item.rating} ({item.reviews} reviews)</p>}{(item.attendees || item.members) && <p className="flex items-center gap-2"><Users size={16} />{item.attendees || item.members} people</p>}{item.price && <p className="text-lg font-bold text-ocean-700">{item.price}</p>}</div><div className="mt-5 grid grid-cols-3 gap-2"><Link href={`${config.path}/${item.slug}`} className="btn-primary col-span-1 text-sm">View</Link><button className="btn-secondary px-3" onClick={() => setEditing(item)} aria-label="Edit"><Pencil size={16} /></button><button className="btn-secondary px-3 text-red-600" onClick={() => deleteItem(kind, item.slug)} aria-label="Delete"><Trash2 size={16} /></button></div></div></article>)}</div>}
      </section>

      {creating && <ResourceForm kind={kind} onClose={() => setCreating(false)} />}
      {editing && <ResourceForm kind={kind} item={editing} onClose={() => setEditing(null)} />}
    </main>
  )
}
