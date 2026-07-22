import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { listings } from '@/app/data'

export function generateStaticParams() { return listings.map((listing) => ({ id: listing.id })) }

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = listings.find((item) => item.id === params.id)
  if (!listing) notFound()
  return (
    <main className="min-h-screen bg-white"><Header /><section className="bg-gray-50 py-16 md:py-24"><div className="container-primary max-w-4xl"><Link href="/marketplace" className="text-ocean-600">← Back to marketplace</Link><article className="card mt-6"><p className="mb-2 text-sm font-semibold uppercase tracking-wide text-ocean-600">{listing.category}</p><h1 className="section-title mb-4">{listing.title}</h1><p className="mb-4 text-3xl font-bold text-ocean-600">{listing.price}</p><p className="mb-6 text-lg text-gray-600">{listing.description}</p><dl className="grid gap-4 sm:grid-cols-2"><div><dt className="font-semibold text-gray-900">Seller</dt><dd className="text-gray-600">{listing.seller}</dd></div><div><dt className="font-semibold text-gray-900">Location</dt><dd className="text-gray-600">{listing.location}</dd></div><div><dt className="font-semibold text-gray-900">Condition</dt><dd className="text-gray-600">{listing.condition}</dd></div></dl><button className="btn-primary mt-8">Message seller</button></article></div></section><Footer /></main>
  )
}
