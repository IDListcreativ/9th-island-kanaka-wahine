'use client'

import PageShell from '@/app/components/PageShell'
import { useMockApp } from '@/app/providers'

export default function NotificationsPage() {
  const { notifications, markNotificationsRead } = useMockApp()
  return <PageShell><main className="min-h-screen bg-gray-50"><section className="container-primary py-8 md:py-12"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="section-title">Notifications</h1><p className="mt-2 text-gray-600">Local mock alerts for RSVPs, favorites, messages, and prototype activity.</p></div><button className="btn-secondary" onClick={markNotificationsRead}>Mark all read</button></div><div className="mt-6 grid gap-3">{notifications.map((notification) => <article key={notification.id} className={`card ${notification.read ? 'opacity-75' : 'border-ocean-200 bg-ocean-50/40'}`}><div className="flex items-start justify-between gap-3"><div><span className="pill">{notification.type}</span><h2 className="mt-3 font-bold text-gray-900">{notification.title}</h2></div>{!notification.read && <span className="rounded-full bg-sand-300 px-2 py-1 text-xs font-bold text-gray-900">New</span>}</div><p className="mt-2 text-gray-700">{notification.body}</p></article>)}</div></section></main></PageShell>
}
