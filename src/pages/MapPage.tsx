import React from 'react'
import MapPlaceholder from '../components/MapPlaceholder'
import { vendors } from '../data/mock'

export default function MapPage(){
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Map</h1>
      <MapPlaceholder items={vendors} />
    </div>
  )
}
