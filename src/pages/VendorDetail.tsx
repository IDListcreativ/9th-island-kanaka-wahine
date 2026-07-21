import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { vendors } from '../data/mock'

export default function VendorDetail(){
  const { id } = useParams()
  const vendor = vendors.find(v=>v.id === id)
  if(!vendor) return <div>Vendor not found</div>
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <img src={vendor.image} className="w-full h-64 object-cover" />
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold">{vendor.name}</h1>
              <div className="text-sm text-slate-500">{vendor.category} · {vendor.city}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-600">Contact</div>
              <div className="text-sm font-medium">{vendor.address || '—'}</div>
            </div>
          </div>
          <p className="mt-4 text-slate-700">{vendor.description}</p>

          <div className="mt-4 flex gap-2">
            <button className="px-4 py-2 bg-emerald-500 text-white rounded">Message</button>
            <Link to="/map" className="px-4 py-2 border rounded">View on map</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
