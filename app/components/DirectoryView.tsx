'use client'

import Link from 'next/link'
import { Calendar, MapPin, Search, ShoppingBag, Star, Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Event, Listing, Vendor } from '@/app/data'

type DirectoryViewProps =
  | { type: 'vendors'; items: Vendor[] }
  | { type: 'events'; items: Event[] }
  | { type: 'marketplace'; items: Listing[] }

export default function DirectoryView(props: DirectoryViewProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(props.items.map((item) => item.category)))],
    [props.items],
  )

  const filtered = props.items.filter((item) => {
    const searchable = Object.values(item).join(' ').toLowerCase()
    return (category === 'All' || item.category === category) && searchable.includes(query.toLowerCase())
  })

  return (
    <div>
      <div className="mb-8 grid gap-4 md:grid-cols-[1fr_auto]">
        <label className="relative block">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none focus:border-ocean-600 focus:ring-2 focus:ring-ocean-100"
            placeholder={`Search ${props.type}...`}
          />
        </label>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-ocean-600 focus:ring-2 focus:ring-ocean-100"
        >
          {categories.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <p className="mb-6 text-sm font-medium text-gray-600">
        Showing {filtered.length} of {props.items.length} results
      </p>

      {props.type === 'events' ? (
        <div className="space-y-4">{filtered.map((item) => renderEvent(item as Event))}</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) =>
            props.type === 'vendors' ? renderVendor(item as Vendor) : renderListing(item as Listing),
          )}
        </div>
      )}
    </div>
  )
}

function renderVendor(vendor: Vendor) {
  return (
    <article key={vendor.id} className="card">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{vendor.name}</h3>
          <p className="text-sm text-gray-600">{vendor.category}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${vendor.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
          {vendor.status === 'open' ? 'Open' : 'Closed'}
        </span>
      </div>
      <div className="mb-3 flex items-center gap-2">
        <Star className="fill-yellow-400 text-yellow-400" size={18} />
        <span className="font-semibold">{vendor.rating}</span>
        <span className="text-sm text-gray-600">({vendor.reviews})</span>
      </div>
      <div className="mb-4 flex items-center gap-2 text-gray-600">
        <MapPin size={18} />
        <span className="text-sm">{vendor.location}</span>
      </div>
      <p className="mb-5 line-clamp-3 text-sm text-gray-600">{vendor.description}</p>
      <Link href={`/vendors/${vendor.id}`} className="btn-primary block w-full text-center">View Profile</Link>
    </article>
  )
}

function renderEvent(event: Event) {
  return (
    <article key={event.id} className="card">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <span className="mb-2 inline-flex rounded bg-ocean-100 px-3 py-1 text-xs font-semibold text-ocean-700">{event.category}</span>
          <h3 className="mb-3 text-xl font-bold text-gray-900">{event.name}</h3>
          <div className="flex flex-col gap-4 text-gray-600 sm:flex-row">
            <span className="flex items-center gap-2"><Calendar size={18} />{event.date} at {event.time}</span>
            <span className="flex items-center gap-2"><MapPin size={18} />{event.location}</span>
            <span className="flex items-center gap-2"><Users size={18} />{event.attendees} attending</span>
          </div>
        </div>
        <Link href={`/events/${event.id}`} className="btn-primary self-start whitespace-nowrap md:self-center">Details & RSVP</Link>
      </div>
    </article>
  )
}

function renderListing(listing: Listing) {
  return (
    <article key={listing.id} className="card">
      <div className="mb-4 flex h-48 w-full items-center justify-center rounded-lg bg-gray-200">
        <ShoppingBag size={48} className="text-gray-400" />
      </div>
      <h3 className="mb-2 text-lg font-bold text-gray-900">{listing.title}</h3>
      <p className="mb-3 text-sm text-gray-600">{listing.seller} · {listing.location}</p>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-2xl font-bold text-ocean-600">{listing.price}</span>
        <span className="rounded bg-sand-100 px-3 py-1 text-xs font-semibold text-gray-700">{listing.category}</span>
      </div>
      <Link href={`/marketplace/${listing.id}`} className="btn-primary block w-full text-center">View Details</Link>
    </article>
  )
}
