import Link from 'next/link'
import { Star, MapPin } from 'lucide-react'
import { vendors } from '@/app/data'

const FEATURED_VENDORS = vendors.slice(0, 3)

export default function FeaturedVendors() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-primary">
        <div className="mb-12">
          <h2 className="section-title mb-2">Featured Vendors</h2>
          <p className="text-gray-600 text-lg">Support local businesses in our community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_VENDORS.map((vendor) => (
            <div key={vendor.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{vendor.name}</h3>
                  <p className="text-sm text-gray-600">{vendor.category}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  vendor.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {vendor.status === 'open' ? 'Open' : 'Closed'}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Star className="text-yellow-400 fill-yellow-400" size={18} />
                <span className="font-semibold text-gray-900">{vendor.rating}</span>
                <span className="text-gray-600 text-sm">({vendor.reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-2 mb-4 text-gray-600">
                <MapPin size={18} />
                <span className="text-sm">{vendor.location}</span>
              </div>

              <Link href={`/vendors/${vendor.id}`} className="btn-primary w-full text-center block">
                View Details
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/vendors" className="btn-secondary">Browse All Vendors</Link>
        </div>
      </div>
    </section>
  )
}
