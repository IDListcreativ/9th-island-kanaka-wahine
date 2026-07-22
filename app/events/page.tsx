import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import DirectoryView from '@/app/components/DirectoryView'
import { events } from '@/app/data'

export const metadata = {
  title: 'Events | 9th Island',
  description: 'Discover community events and gatherings in Las Vegas.',
}

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container-primary">
          <h1 className="section-title mb-2">Community Events</h1>
          <p className="mb-12 text-lg text-gray-600">Join us for celebrations, meetups, and community activities</p>
          <DirectoryView type="events" items={events} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
