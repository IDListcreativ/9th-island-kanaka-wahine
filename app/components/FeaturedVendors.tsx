import Link from 'next/link'
import { Star, MapPin } from 'lucide-react'

const FEATURED_VENDORS = [
  {
    id: '1',
    name: 'Ono Hawaiian Plate Lunch',
    category: 'Food',
    rating: 4.8,
    reviews: 142,
    status: 'open',
    location: 'Downtown Las Vegas',
  },
  {
    id: '2',
    name: 'Kailua Poke & Sushi',
    category: 'Poke',
    rating: 4.6,
    reviews: 89,
    status: 'open',
    location: 'Arts District',
  },
  {
    id: '3',
    name: 'Malolo Handmade Crafts',
    category: 'Crafts',
    rating: 4.9,
    reviews: 56,
    status: 'open',
    location: 'Local Market',
  },
]

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

              <Link href={`/vendors/${vendor.id}`} className="btn-primary w-full text-center">
                View Details
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/vendors" className="btn-secondary">
            Browse All Vendors
          </Link>
        </div>
      </div>
    </section>
  )
}