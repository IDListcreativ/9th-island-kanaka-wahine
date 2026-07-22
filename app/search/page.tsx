'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import PageShell from '@/app/components/PageShell'
import { resourceConfig, ResourceKind } from '@/app/data/mock'
import { useMockApp } from '@/app/providers'
import { EmptyState } from '@/app/components/States'

const kinds: ResourceKind[] = ['vendors', 'events', 'gatherings', 'businesses', 'organizations', 'listings']

export default function SearchPage() {
  const { resources } = useMockApp()
  const [query, setQuery] = useState('')
  const items = useMemo(() => kinds.flatMap((kind) => resources[kind]).filter((item) => [item.name, item.subtitle, item.description, item.location, item.category, ...item.tags].join(' ').toLowerCase().includes(query.toLowerCase())), [query, resources])
  return <PageShell><main className="min-h-screen bg-gray-50"><section className="border-b border-gray-200 bg-white py-8 md:py-12"><div className="container-primary"><h1 className="section-title">Search 9th Island</h1><p className="mt-2 text-gray-600">Search all mocked vendors, events, gatherings, businesses, organizations, and marketplace listings.</p><label className="relative mt-6 block"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try poke, hula, mutual aid, notary..." className="field-input pl-10" autoFocus /></label></div></section><section className="container-primary py-8">{items.length === 0 ? <EmptyState title="No search results" body="Try a broader term or browse one of the directories." /> : <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{items.map((item) => <Link key={`${item.type}-${item.slug}`} href={`${resourceConfig[item.type].path}/${item.slug}`} className="card"><span className="pill">{resourceConfig[item.type].singular}</span><h2 className="mt-3 text-lg font-bold text-gray-900">{item.name}</h2><p className="mt-1 text-sm text-gray-600">{item.subtitle}</p><p className="mt-3 text-sm font-medium text-gray-700">{item.location}</p></Link>)}</div>}</section></main></PageShell>
}
