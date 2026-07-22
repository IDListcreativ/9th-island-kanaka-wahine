import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Vendors from './pages/Vendors'
import VendorDetail from './pages/VendorDetail'
import Gatherings from './pages/Gatherings'
import Events from './pages/Events'
import MapPage from './pages/MapPage'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App(){
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/vendors" element={<Vendors/>} />
            <Route path="/vendors/:id" element={<VendorDetail/>} />
            <Route path="/gatherings" element={<Gatherings/>} />
            <Route path="/events" element={<Events/>} />
            <Route path="/map" element={<MapPage/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
