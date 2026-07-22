'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-ocean-600 to-island-teal text-white py-16 md:py-24">
      <div className="container-primary">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to 9th Island
          </h1>
          <p className="text-lg md:text-xl text-ocean-50 mb-8">
            Your digital hub for Hawaiian and Pacific Islander businesses, events, and community connections in Las Vegas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/vendors" className="btn-primary bg-white text-ocean-600 hover:bg-ocean-50">
              Browse Vendors
            </Link>
            <Link href="/events" className="btn-secondary bg-ocean-500 text-white border-0 hover:bg-ocean-700">
              Explore Events
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-16 pt-16 border-t border-ocean-500">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold">150+</div>
            <div className="text-ocean-100 text-sm md:text-base">Local Vendors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold">50+</div>
            <div className="text-ocean-100 text-sm md:text-base">Monthly Events</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold">10k+</div>
            <div className="text-ocean-100 text-sm md:text-base">Community Members</div>
          </div>
        </div>
      </div>
    </section>
  )
}