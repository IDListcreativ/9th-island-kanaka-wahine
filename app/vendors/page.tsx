import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { MapPin, Star } from 'lucide-react'

const VENDORS = [
  { id: '1', name: 'Ono Hawaiian Plate Lunch', category: 'Food', rating: 4.8, reviews: 142, location: 'Downtown', status: 'open' },
  { id: '2', name: 'Kailua Poke & Sushi', category: 'Poke', rating: 4.6, reviews: 89, location: 'Arts District', status: 'open' },
  { id: '3', name: 'Malolo Handmade Crafts', category: 'Crafts', rating: 4.9, reviews: 56, location: 'Market', status: 'open' },
]

export const metadata = {
  title: 'Vendors | 9th Island',
  description: 'Browse local Hawaiian and Pacific Islander vendors in Las Vegas.',
}

export default function VendorsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-primary">
          <h1 className="section-title mb-2">Local Vendors</h1>
          <p className="text-gray-600 text-lg mb-12">Discover and support Hawaiian and Pacific Islander owned businesses</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VENDORS.map((vendor) => (
              <div key={vendor.id} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{vendor.name}</h3>
                    <p className="text-sm text-gray-600">{vendor.category}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Open
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Star className="text-yellow-400 fill-yellow-400" size={18} />
                  <span className="font-semibold">{vendor.rating}</span>
                  <span className="text-gray-600 text-sm">({vendor.reviews})</span>
                </div>

                <div className="flex items-center gap-2 mb-4 text-gray-600">
                  <MapPin size={18} />
                  <span className="text-sm">{vendor.location}</span>
                </div>

                <button className="btn-primary w-full">View Profile</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}