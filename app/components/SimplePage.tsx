import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

export default function SimplePage({ title, eyebrow, children }: { title: string; eyebrow?: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container-primary max-w-4xl">
          {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-ocean-600">{eyebrow}</p>}
          <div className="card">
            <h1 className="section-title mb-6">{title}</h1>
            {children}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
