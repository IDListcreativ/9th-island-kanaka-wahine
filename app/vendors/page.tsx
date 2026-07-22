import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import DirectoryView from '@/app/components/DirectoryView'
import { vendors } from '@/app/data'

export const metadata = {
  title: 'Vendors | 9th Island',
  description: 'Browse local Hawaiian and Pacific Islander vendors in Las Vegas.',
}

export default function VendorsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container-primary">
          <h1 className="section-title mb-2">Local Vendors</h1>
          <p className="mb-12 text-lg text-gray-600">Discover and support Hawaiian and Pacific Islander owned businesses</p>
          <DirectoryView type="vendors" items={vendors} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
