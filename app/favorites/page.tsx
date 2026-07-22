'use client'

import Link from 'next/link'
import PageShell from '@/app/components/PageShell'
import { resourceConfig, ResourceKind } from '@/app/data/mock'
import { useMockApp } from '@/app/providers'
import { EmptyState } from '@/app/components/States'

const kinds: ResourceKind[] = ['vendors', 'events', 'gatherings', 'businesses', 'organizations', 'musicians', 'listings']

export default function FavoritesPage() {
  const { resources, favorites } = useMockApp()
  const items = kinds.flatMap((kind) => resources[kind].filter((item) => favorites.includes(`${kind}:${item.slug}`)))
  return <PageShell><main className="min-h-screen bg-gray-50"><section className="container-primary py-8 md:py-12"><h1 className="section-title">Favorites</h1><p className="mt-2 text-gray-600">Saved vendors, events, groups, musicians, and listings stored locally on this device.</p><div className="mt-6">{items.length === 0 ? <EmptyState title="Nothing saved yet" body="Tap the heart button on any listing to save it here." action={<Link href="/search" className="btn-primary">Find something</Link>} /> : <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{items.map((item) => <Link key={`${item.type}-${item.slug}`} href={`${resourceConfig[item.type].path}/${item.slug}`} className="card"><div className={`mb-4 h-24 rounded-lg bg-gradient-to-br ${item.image}`} /><span className="pill">{resourceConfig[item.type].singular}</span><h2 className="mt-3 text-lg font-bold text-gray-900">{item.name}</h2><p className="mt-1 text-sm text-gray-600">{item.subtitle}</p></Link>)}</div>}</div></section></main></PageShell>
}
