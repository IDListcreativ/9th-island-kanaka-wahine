'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Calendar, Flag, Heart, Mail, MapPin, Pencil, Phone, Star, Trash2, Users } from 'lucide-react'
import { resourceConfig, ResourceKind } from '@/app/data/mock'
import { useMockApp } from '@/app/providers'
import ResourceForm from '@/app/components/ResourceForm'
import { EmptyState, SkeletonGrid } from '@/app/components/States'

export default function ResourceDetail({ kind, slug }: { kind: ResourceKind; slug: string }) {
  const config = resourceConfig[kind]
  const router = useRouter()
  const { resources, loading, isFavorite, toggleFavorite, deleteItem, addNotification, addReport } = useMockApp()
  const [editing, setEditing] = useState(false)
  const item = resources[kind].find((candidate) => candidate.slug === slug)

  if (loading) return <main className="container-primary min-h-screen py-8"><SkeletonGrid /></main>
  if (!item) return <main className="min-h-screen bg-gray-50"><section className="container-primary py-12"><EmptyState title="This page is not available" body="The item may have been deleted from local prototype state." action={<Link href={config.path} className="btn-primary">Back to {config.plural}</Link>} /></section></main>

  const currentItem = item

  function handleDelete() {
    deleteItem(kind, currentItem.slug)
    router.push(config.path)
  }

  function handleContact() {
    addNotification({ title: `Message started with ${currentItem.name}`, body: 'A mock message flow was created for prototype validation.', type: 'message' })
    router.push('/messages')
  }

  function handleReport() {
    addReport(currentItem, 'Community member requested a moderation review from the detail page.')
    router.push('/admin')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className={`bg-gradient-to-br ${currentItem.image} text-white`}>
        <div className="container-primary py-10 md:py-16">
          <Link href={config.path} className="mb-6 inline-flex text-sm font-semibold text-white/90 hover:text-white">Back to {config.plural}</Link>
          <div className="max-w-3xl">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide">{currentItem.category}</span>
            <h1 className="mt-4 text-4xl font-bold md:text-5xl">{currentItem.name}</h1>
            <p className="mt-3 text-lg text-white/90 md:text-xl">{currentItem.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="container-primary -mt-6 pb-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <article className="card">
            <h2 className="text-2xl font-bold text-gray-900">Details</h2>
            <p className="mt-4 text-gray-700 leading-7">{currentItem.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">{currentItem.tags.map((tag) => <span key={tag} className="pill">{tag}</span>)}</div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {currentItem.highlights.map((highlight) => <div key={highlight} className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm font-medium text-gray-700">{highlight}</div>)}
            </div>
          </article>

          <aside className="card self-start">
            <div className="space-y-4 text-sm text-gray-700">
              <p className="flex items-center gap-2"><MapPin size={18} />{currentItem.location}</p>
              {currentItem.date && <p className="flex items-center gap-2"><Calendar size={18} />{currentItem.date}{currentItem.time ? ` at ${currentItem.time}` : ''}</p>}
              {currentItem.rating && <p className="flex items-center gap-2"><Star size={18} className="text-yellow-500" />{currentItem.rating} from {currentItem.reviews} reviews</p>}
              {(currentItem.attendees || currentItem.members) && <p className="flex items-center gap-2"><Users size={18} />{currentItem.attendees || currentItem.members} people connected</p>}
              {currentItem.phone && <p className="flex items-center gap-2"><Phone size={18} />{currentItem.phone}</p>}
              {currentItem.website && <p className="flex items-center gap-2"><Mail size={18} />{currentItem.website}</p>}
              {currentItem.price && <p className="text-2xl font-bold text-ocean-700">{currentItem.price}</p>}
            </div>
            <div className="mt-6 grid gap-3">
              <button className="btn-primary" onClick={handleContact}>Message / Contact</button>
              <button className="btn-secondary" onClick={() => toggleFavorite(kind, currentItem.slug)}><Heart size={18} fill={isFavorite(kind, currentItem.slug) ? 'currentColor' : 'none'} />{isFavorite(kind, currentItem.slug) ? 'Saved' : 'Save'}</button>
              <button className="btn-secondary" onClick={handleReport}><Flag size={18} />Report / Review</button>
              <button className="btn-secondary" onClick={() => setEditing(true)}><Pencil size={18} />Edit</button>
              <button className="btn-secondary text-red-600" onClick={handleDelete}><Trash2 size={18} />Delete</button>
            </div>
          </aside>
        </div>
      </section>
      {editing && <ResourceForm kind={kind} item={currentItem} onClose={() => setEditing(false)} />}
    </main>
  )
}
