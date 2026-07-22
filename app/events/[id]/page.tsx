import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { events } from '@/app/data'

export function generateStaticParams() { return events.map((event) => ({ id: event.id })) }

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = events.find((item) => item.id === params.id)
  if (!event) notFound()
  return (
    <main className="min-h-screen bg-white"><Header /><section className="bg-gray-50 py-16 md:py-24"><div className="container-primary max-w-4xl"><Link href="/events" className="text-ocean-600">← Back to events</Link><article className="card mt-6"><p className="mb-2 text-sm font-semibold uppercase tracking-wide text-ocean-600">{event.category}</p><h1 className="section-title mb-4">{event.name}</h1><p className="mb-6 text-lg text-gray-600">{event.description}</p><dl className="grid gap-4 sm:grid-cols-2"><div><dt className="font-semibold text-gray-900">Date & time</dt><dd className="text-gray-600">{event.date} at {event.time}</dd></div><div><dt className="font-semibold text-gray-900">Location</dt><dd className="text-gray-600">{event.location}</dd></div><div><dt className="font-semibold text-gray-900">Host</dt><dd className="text-gray-600">{event.host}</dd></div><div><dt className="font-semibold text-gray-900">Attendees</dt><dd className="text-gray-600">{event.attendees} community members</dd></div></dl><button className="btn-primary mt-8">{event.rsvpOpen ? 'RSVP now' : 'Join waitlist'}</button></article></div></section><Footer /></main>
  )
}
