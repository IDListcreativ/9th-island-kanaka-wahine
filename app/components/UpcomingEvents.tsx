import Link from 'next/link'
import { Calendar, MapPin, Users } from 'lucide-react'

const UPCOMING_EVENTS = [
  {
    id: '1',
    name: 'Community BBQ & Networking',
    date: 'Aug 15, 2024',
    time: '5:00 PM',
    location: 'Downtown Park',
    attendees: 45,
    category: 'Social',
  },
  {
    id: '2',
    name: 'Hawaiian Cultural Night',
    date: 'Aug 22, 2024',
    time: '6:30 PM',
    location: 'Arts District',
    attendees: 120,
    category: 'Cultural',
  },
  {
    id: '3',
    name: 'Beach Cleanup & Picnic',
    date: 'Aug 29, 2024',
    time: '8:00 AM',
    location: 'Lake Las Vegas',
    attendees: 78,
    category: 'Service',
  },
]

export default function UpcomingEvents() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-primary">
        <div className="mb-12">
          <h2 className="section-title mb-2">Upcoming Events</h2>
          <p className="text-gray-600 text-lg">Join the community for celebrations, meetups, and activities</p>
        </div>

        <div className="space-y-4">
          {UPCOMING_EVENTS.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="card hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-ocean-100 text-ocean-700 rounded text-xs font-semibold">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{event.name}</h3>
                  <div className="flex flex-col sm:flex-row gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={18} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={18} />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                </div>
                <button className="btn-primary self-start md:self-center whitespace-nowrap">
                  Learn More
                </button>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/events" className="btn-secondary">
            View All Events
          </Link>
        </div>
      </div>
    </section>
  )
}