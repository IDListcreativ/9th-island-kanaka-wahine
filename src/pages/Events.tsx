import React from 'react'
import { events } from '../data/mock'

export default function Events(){
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Events</h1>
        <button className="px-3 py-2 bg-emerald-500 text-white rounded">Create Event</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {events.map(e=> (
          <article key={e.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
            <img src={e.image} className="w-full h-40 object-cover" />
            <div className="p-3">
              <div className="font-semibold">{e.title}</div>
              <div className="text-sm text-slate-500">{new Date(e.start_at).toDateString()}</div>
              <p className="mt-2 text-sm text-slate-700">{e.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
