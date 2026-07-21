import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Header(){
  const { user, openAuth } = useAuth()
  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="9th Island" className="w-10 h-10 rounded-md" />
          <div className="hidden sm:block">
            <div className="font-semibold">9th Island</div>
            <div className="text-sm text-slate-500">Kanaka Wahine Community</div>
          </div>
        </Link>
        <nav className="flex items-center gap-3">
          <Link to="/vendors" className="text-sm px-3 py-2 rounded hover:bg-slate-100">Vendors</Link>
          <Link to="/gatherings" className="text-sm px-3 py-2 rounded hover:bg-slate-100">Gatherings</Link>
          <Link to="/events" className="text-sm px-3 py-2 rounded hover:bg-slate-100">Events</Link>
          <Link to="/map" className="text-sm px-3 py-2 rounded hover:bg-slate-100">Map</Link>
          {user ? (
            <button className="text-sm px-3 py-2 bg-emerald-500 text-white rounded">{user.name}</button>
          ) : (
            <button onClick={openAuth} className="text-sm px-3 py-2 bg-emerald-500 text-white rounded">Sign in</button>
          )}
        </nav>
      </div>
    </header>
  )
}
