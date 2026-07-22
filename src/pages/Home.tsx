import React from 'react'
import { Link } from 'react-router-dom'
import { vendors, gatherings } from '../data/mock'

export default function Home(){
  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow-sm p-4">
        <h1 className="text-2xl font-bold">A place for Kanaka Wahine</h1>
        <p className="text-slate-600 mt-2">Connecting local vendors, hosts, and community gatherings—prototype for feedback.</p>
        <div className="mt-4 flex gap-2">
          <Link to="/vendors" className="px-4 py-2 bg-emerald-500 text-white rounded">Browse Vendors</Link>
          <Link to="/gatherings" className="px-4 py-2 border rounded">See Gatherings</Link>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Featured Vendors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {vendors.map(v=> (
            <Link key={v.id} to={`/vendors/${v.id}`} className="block">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <img src={v.image} className="w-full h-44 object-cover" />
                <div className="p-3">
                  <div className="font-semibold">{v.name}</div>
                  <div className="text-sm text-slate-500">{v.category} · {v.city}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Upcoming Gatherings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gatherings.map(g=> (
            <div key={g.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img src={g.image} className="w-full h-44 object-cover" />
              <div className="p-3">
                <div className="font-semibold">{g.title}</div>
                <div className="text-sm text-slate-500">{g.host} · {new Date(g.start_at).toDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
