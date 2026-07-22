'use client'

import { useState } from 'react'
import PageShell from '@/app/components/PageShell'
import { useMockApp } from '@/app/providers'

export default function MessagesPage() {
  const { threads, sendMessage } = useMockApp()
  const [activeId, setActiveId] = useState(threads[0]?.id || '')
  const active = threads.find((thread) => thread.id === activeId) || threads[0]
  return <PageShell><main className="min-h-screen bg-gray-50"><section className="container-primary py-8 md:py-12"><h1 className="section-title">Messages</h1><p className="mt-2 text-gray-600">Mock conversations for contact and coordination flows.</p><div className="mt-6 grid gap-4 lg:grid-cols-[320px_1fr]"><aside className="grid gap-3 self-start">{threads.map((thread) => <button key={thread.id} className={`card text-left ${active?.id === thread.id ? 'border-ocean-300 bg-ocean-50' : ''}`} onClick={() => setActiveId(thread.id)}><div className="flex justify-between gap-3"><h2 className="font-bold text-gray-900">{thread.name}</h2>{thread.unread > 0 && <span className="rounded-full bg-sand-300 px-2 text-xs font-bold text-gray-900">{thread.unread}</span>}</div><p className="mt-1 text-sm text-gray-600">{thread.context}</p></button>)}</aside>{active && <article className="card"><h2 className="text-xl font-bold text-gray-900">{active.name}</h2><div className="mt-5 grid gap-3">{active.messages.map((message) => <div key={message.id} className={`max-w-[85%] rounded-lg p-3 text-sm ${message.sender === 'me' ? 'ml-auto bg-ocean-600 text-white' : 'bg-gray-100 text-gray-800'}`}>{message.body}</div>)}</div><form className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]" onSubmit={(event) => { event.preventDefault(); const input = event.currentTarget.elements.namedItem('body') as HTMLInputElement; if (input.value.trim()) sendMessage(active.id, input.value.trim()); event.currentTarget.reset() }}><input name="body" placeholder="Type a mock reply" className="field-input" /><button className="btn-primary">Send</button></form></article>}</div></section></main></PageShell>
}
