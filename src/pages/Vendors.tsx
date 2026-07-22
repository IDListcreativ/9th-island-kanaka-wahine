import React, { useState } from 'react'
import VendorCard from '../components/VendorCard'
import { vendors as MOCK } from '../data/mock'
import { Link } from 'react-router-dom'

export default function Vendors(){
  const [q, setQ] = useState('')
  const results = MOCK.filter(v => v.name.toLowerCase().includes(q.toLowerCase()) || v.category.toLowerCase().includes(q.toLowerCase()))
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search vendors or categories" className="flex-1 px-3 py-2 border rounded" />
        <Link to="/map" className="px-3 py-2 text-sm rounded border">Map</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {results.map(v=> (
          <Link to={`/vendors/${v.id}`} key={v.id} className="block">
            <VendorCard vendor={v} />
          </Link>
        ))}
      </div>
    </div>
  )
}
