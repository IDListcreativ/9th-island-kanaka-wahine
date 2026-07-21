import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { ShoppingBag } from 'lucide-react'

const LISTINGS = [
  { id: '1', title: 'Traditional Hawaiian Quilts', price: '$450', category: 'Handmade', seller: 'Kumu Arts' },
  { id: '2', title: 'Fresh Local Honey', price: '$25', category: 'Food', seller: 'Island Bees' },
  { id: '3', title: 'Ukulele Lessons Set', price: '$200', category: 'Services', seller: 'Music Ohana' },
]

export const metadata = {
  title: 'Marketplace | 9th Island',
  description: 'Buy and sell local handmade goods and products.',
}

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-primary">
          <h1 className="section-title mb-2">Community Marketplace</h1>
          <p className="text-gray-600 text-lg mb-12">Buy and sell local handmade goods, furniture, and products</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LISTINGS.map((listing) => (
              <div key={listing.id} className="card">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <ShoppingBag size={48} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{listing.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{listing.seller}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-ocean-600">{listing.price}</span>
                  <span className="px-3 py-1 bg-sand-100 text-gray-700 rounded text-xs font-semibold">
                    {listing.category}
                  </span>
                </div>
                <button className="btn-primary w-full">View Details</button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}