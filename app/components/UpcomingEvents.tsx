'use client'

import Link from 'next/link'
import { Calendar, MapPin, Users } from 'lucide-react'
import { events } from '@/app/data'

const UPCOMING_EVENTS = events.slice(0, 3)

export default function UpcomingEvents() {
  const { resources } = useMockApp()
  const events = resources.events.slice(0, 3)

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-primary">
        <div className="mb-12">
          <h2 className="section-title mb-2">Upcoming Events</h2>
          <p className="text-lg text-gray-600">Join the community for celebrations, meetups, and activities</p>
        </div>

        <div className="space-y-4">
          {UPCOMING_EVENTS.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`} className="card hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer block">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <span className="px-3 py-1 bg-ocean-100 text-ocean-700 rounded text-xs font-semibold inline-flex mb-2">{event.category}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{event.name}</h3>
                  <div className="flex flex-col sm:flex-row gap-4 text-gray-600">
                    <span className="flex items-center gap-2"><Calendar size={18} />{event.date}</span>
                    <span className="flex items-center gap-2"><MapPin size={18} />{event.location}</span>
                    <span className="flex items-center gap-2"><Users size={18} />{event.attendees} attending</span>
                  </div>
                </div>
                <span className="btn-primary self-start md:self-center whitespace-nowrap">Learn More</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/events" className="btn-secondary">View All Events</Link>
        </div>
      </div>
    </section>
  )
}
