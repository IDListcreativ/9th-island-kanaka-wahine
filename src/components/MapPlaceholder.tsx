import React from 'react'

export default function MapPlaceholder({items}:{items?:any[]}){
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="h-64 sm:h-96 bg-gradient-to-br from-sky-200 to-slate-200 flex items-center justify-center text-slate-700">
        <div className="text-center">
          <div className="text-xl font-semibold">Interactive map placeholder</div>
          <div className="text-sm mt-2">Map will show vendors, gatherings, and events (Mapbox/Leaflet integration later)</div>
        </div>
      </div>
      <div className="p-3">
        <div className="text-sm text-slate-600">Nearby highlights</div>
        <ul className="mt-2 space-y-2">
          {(items||[]).slice(0,4).map((it:any)=> (
            <li key={it.id} className="flex items-center gap-3">
              <img src={it.image} alt="" className="w-12 h-12 rounded object-cover" />
              <div>
                <div className="font-medium">{it.name}</div>
                <div className="text-xs text-slate-500">{it.category || it.type}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
