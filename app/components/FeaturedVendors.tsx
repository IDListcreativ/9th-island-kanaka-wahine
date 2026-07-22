'use client'

import Link from 'next/link'
import { Star, MapPin } from 'lucide-react'
import { useMockApp } from '@/app/providers'

export default function FeaturedVendors() {
  const { resources } = useMockApp()
  const vendors = resources.vendors.slice(0, 3)

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container-primary">
        <div className="mb-12">
          <h2 className="section-title mb-2">Featured Vendors</h2>
          <p className="text-lg text-gray-600">
            Support local businesses in our community
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vendors.map((vendor) => (
            <article key={vendor.id} className="card">
              <span className="pill">{vendor.category}</span>

              <h3 className="mt-3 text-xl font-bold text-gray-900">
                {vendor.name}
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                {vendor.subtitle}
              </p>

              {vendor.rating && (
                <div className="mt-4 flex items-center gap-2">
                  <Star
                    className="fill-yellow-400 text-yellow-400"
                    size={18}
                  />
                  <span className="font-semibold text-gray-900">
                    {vendor.rating}
                  </span>
                  <span className="text-sm text-gray-600">
                    ({vendor.reviews} reviews)
                  </span>
                </div>
              )}

              <div className="mt-3 flex items-center gap-2 text-gray-600">
                <MapPin size={18} />
                <span className="text-sm">{vendor.location}</span>
              </div>

              <Link
                href={`/vendors/${vendor.id}`}
                className="btn-primary block w-full text-center"
              >
                View Details
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/vendors" className="btn-secondary">
            Browse All Vendors
          </Link>
        </div>
      </div>
    </section>
  )
}