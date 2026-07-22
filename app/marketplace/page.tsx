import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import DirectoryView from '@/app/components/DirectoryView'
import { listings } from '@/app/data'

export const metadata = {
  title: 'Marketplace | 9th Island',
  description: 'Buy and sell local handmade goods and products.',
}

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container-primary">
          <h1 className="section-title mb-2">Community Marketplace</h1>
          <p className="mb-12 text-lg text-gray-600">Buy and sell local handmade goods, services, and products</p>
          <DirectoryView type="marketplace" items={listings} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
