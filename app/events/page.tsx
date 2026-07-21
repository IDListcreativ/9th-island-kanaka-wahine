import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { Calendar, MapPin, Users } from 'lucide-react'

const EVENTS = [
  { id: '1', name: 'Community BBQ & Networking', date: 'Aug 15, 2024', time: '5:00 PM', location: 'Downtown Park', attendees: 45, category: 'Social' },
  { id: '2', name: 'Hawaiian Cultural Night', date: 'Aug 22, 2024', time: '6:30 PM', location: 'Arts District', attendees: 120, category: 'Cultural' },
  { id: '3', name: 'Beach Cleanup & Picnic', date: 'Aug 29, 2024', time: '8:00 AM', location: 'Lake Las Vegas', attendees: 78, category: 'Service' },
]

export const metadata = {
  title: 'Events | 9th Island',
  description: 'Discover community events and gatherings in Las Vegas.',
}

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-primary">
          <h1 className="section-title mb-2">Community Events</h1>
          <p className="text-gray-600 text-lg mb-12">Join us for celebrations, meetups, and community activities</p>

          <div className="space-y-4">
            {EVENTS.map((event) => (
              <div key={event.id} className="card hover:shadow-lg transition-all">
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
                        <span>{event.date} at {event.time}</span>
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
                    RSVP
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}