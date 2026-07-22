import React from 'react'
import Button from './Button'

export default function VendorCard({vendor}:{vendor:any}){
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden">
      <img src={vendor.image} alt={vendor.name} className="w-full h-40 object-cover" />
      <div className="p-3">
        <h3 className="font-semibold">{vendor.name}</h3>
        <p className="text-sm text-slate-600">{vendor.category} · {vendor.city}</p>
        <p className="mt-2 text-sm text-slate-700 line-clamp-3">{vendor.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm text-slate-500">{vendor.distance || '—'} mi</div>
          <Button className="text-sm">View</Button>
        </div>
      </div>
    </article>
  )
}
