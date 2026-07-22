'use client'

import Link from 'next/link'
import { Calendar, MapPin, Users } from 'lucide-react'
import { useMockApp } from '@/app/providers'

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
          {events.map((event) => (
            <Link key={event.id} href={`/events/${event.slug}`} className="card block hover:-translate-y-1">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <span className="pill">{event.category}</span>
                  <h3 className="mt-3 text-xl font-bold text-gray-900">{event.name}</h3>
                  <div className="mt-3 flex flex-col gap-3 text-gray-600 sm:flex-row sm:flex-wrap">
                    {event.date && (
                      <span className="flex items-center gap-2">
                        <Calendar size={18} />
                        {event.date}
                      </span>
                    )}
                    <span className="flex items-center gap-2">
                      <MapPin size={18} />
                      {event.location}
                    </span>
                    {event.attendees && (
                      <span className="flex items-center gap-2">
                        <Users size={18} />
                        {event.attendees} attending
                      </span>
                    )}
                  </div>
                </div>
                <span className="btn-primary self-start md:self-center">Learn More</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/events" className="btn-secondary">
            View All Events
          </Link>
        </div>
      </div>
    </section>
  )
}
