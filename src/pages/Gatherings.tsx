import React from 'react'
import { gatherings } from '../data/mock'

export default function Gatherings(){
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Community Gatherings</h1>
        <button className="px-3 py-2 bg-emerald-500 text-white rounded">Create Gathering</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {gatherings.map(g=> (
          <article key={g.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
            <img src={g.image} className="w-full h-40 object-cover" />
            <div className="p-3">
              <div className="font-semibold">{g.title}</div>
              <div className="text-sm text-slate-500">{g.host} · {new Date(g.start_at).toDateString()}</div>
              <p className="mt-2 text-sm text-slate-700">{g.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
