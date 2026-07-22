import PageShell from '@/app/components/PageShell'

export default function Page() {
  return <PageShell><main className="min-h-screen bg-gray-50"><section className="container-primary py-10 md:py-16"><article className="card max-w-3xl"><p className="pill mb-4">Frontend prototype</p><h1 className="section-title">Privacy</h1><p className="mt-4 text-lg leading-8 text-gray-700">Prototype privacy note: data entered in this version is stored locally in your browser only. No backend is connected.</p></article></section></main></PageShell>
}
