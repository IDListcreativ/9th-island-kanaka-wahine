import Header from '@/app/components/Header'
import Hero from '@/app/components/Hero'
import FeaturedVendors from '@/app/components/FeaturedVendors'
import UpcomingEvents from '@/app/components/UpcomingEvents'
import Footer from '@/app/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FeaturedVendors />
      <UpcomingEvents />
      <Footer />
    </main>
  )
}