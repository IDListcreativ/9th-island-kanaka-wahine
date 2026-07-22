import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { vendors } from '@/app/data'

export function generateStaticParams() { return vendors.map((vendor) => ({ id: vendor.id })) }

export default function VendorDetailPage({ params }: { params: { id: string } }) {
  const vendor = vendors.find((item) => item.id === params.id)
  if (!vendor) notFound()
  return (
    <main className="min-h-screen bg-white"><Header /><section className="bg-gray-50 py-16 md:py-24"><div className="container-primary max-w-4xl"><Link href="/vendors" className="text-ocean-600">← Back to vendors</Link><article className="card mt-6"><p className="mb-2 text-sm font-semibold uppercase tracking-wide text-ocean-600">{vendor.category}</p><h1 className="section-title mb-4">{vendor.name}</h1><p className="mb-6 text-lg text-gray-600">{vendor.description}</p><dl className="grid gap-4 sm:grid-cols-2"><div><dt className="font-semibold text-gray-900">Location</dt><dd className="text-gray-600">{vendor.location}</dd></div><div><dt className="font-semibold text-gray-900">Hours</dt><dd className="text-gray-600">{vendor.hours}</dd></div><div><dt className="font-semibold text-gray-900">Phone</dt><dd className="text-gray-600">{vendor.phone}</dd></div><div><dt className="font-semibold text-gray-900">Rating</dt><dd className="text-gray-600">{vendor.rating} stars from {vendor.reviews} reviews</dd></div></dl><div className="mt-6 flex flex-wrap gap-2">{vendor.tags.map((tag) => <span key={tag} className="rounded-full bg-sand-100 px-3 py-1 text-sm text-gray-700">{tag}</span>)}</div></article></div></section><Footer /></main>
  )
}
