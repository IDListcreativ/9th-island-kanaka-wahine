'use client'

import { FormEvent, useMemo, useState } from 'react'
import { Megaphone, Pencil, Pin, PinOff, Trash2 } from 'lucide-react'
import PageShell from '@/app/components/PageShell'
import { MockAnnouncement } from '@/app/data/mock'
import { useMockApp } from '@/app/providers'

const audiences = ['Everyone', 'Families', 'Vendors', 'Volunteers', 'Organizers']

export default function AnnouncementsPage() {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement, toggleAnnouncementPinned } = useMockApp()
  const [editing, setEditing] = useState<MockAnnouncement | null>(null)
  const sortedAnnouncements = useMemo(() => [...announcements].sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.createdAt.localeCompare(a.createdAt)), [announcements])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const draft = {
      title: String(form.get('title') || ''),
      body: String(form.get('body') || ''),
      audience: String(form.get('audience') || 'Everyone'),
    }

    if (editing) {
      updateAnnouncement(editing.id, draft)
      setEditing(null)
    } else {
      addAnnouncement(draft)
    }

    event.currentTarget.reset()
  }

  return (
    <PageShell>
      <main className="min-h-screen bg-gray-50">
        <section className="border-b border-gray-200 bg-white py-8 md:py-12">
          <div className="container-primary">
            <p className="pill mb-3"><Megaphone size={14} />Community announcements</p>
            <h1 className="section-title">Announcements</h1>
            <p className="mt-2 max-w-2xl text-lg text-gray-600">Share important updates without turning the platform into a social feed. Notices are mocked and saved locally for prototype validation.</p>
          </div>
        </section>

        <section className="container-primary grid gap-6 py-8 md:py-10 lg:grid-cols-[380px_1fr]">
          <form className="card self-start" onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold text-gray-900">{editing ? 'Edit announcement' : 'Create announcement'}</h2>
            <div className="mt-5 grid gap-4">
              <label className="grid gap-2"><span className="field-label">Title</span><input key={editing?.id || 'new-title'} name="title" required defaultValue={editing?.title} className="field-input" /></label>
              <label className="grid gap-2"><span className="field-label">Audience</span><select key={editing?.id || 'new-audience'} name="audience" defaultValue={editing?.audience || 'Everyone'} className="field-input">{audiences.map((audience) => <option key={audience}>{audience}</option>)}</select></label>
              <label className="grid gap-2"><span className="field-label">Message</span><textarea key={editing?.id || 'new-body'} name="body" required defaultValue={editing?.body} rows={5} className="field-input" /></label>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <button type="submit" className="btn-primary">{editing ? 'Save changes' : 'Publish'}</button>
                {editing && <button type="button" className="btn-secondary" onClick={() => setEditing(null)}>Cancel</button>}
              </div>
            </div>
          </form>

          <div className="grid gap-4">
            {sortedAnnouncements.map((announcement) => (
              <article key={announcement.id} className={`card ${announcement.pinned ? 'border-ocean-200 bg-ocean-50/40' : ''}`}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2"><span className="pill">{announcement.audience}</span>{announcement.pinned && <span className="rounded-full bg-sand-100 px-3 py-1 text-xs font-bold text-gray-900">Pinned</span>}</div>
                    <h2 className="mt-3 text-xl font-bold text-gray-900">{announcement.title}</h2>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-secondary px-3" onClick={() => toggleAnnouncementPinned(announcement.id)} aria-label={announcement.pinned ? 'Unpin announcement' : 'Pin announcement'}>{announcement.pinned ? <PinOff size={16} /> : <Pin size={16} />}</button>
                    <button className="btn-secondary px-3" onClick={() => setEditing(announcement)} aria-label="Edit announcement"><Pencil size={16} /></button>
                    <button className="btn-secondary px-3 text-red-600" onClick={() => deleteAnnouncement(announcement.id)} aria-label="Delete announcement"><Trash2 size={16} /></button>
                  </div>
                </div>
                <p className="mt-4 leading-7 text-gray-700">{announcement.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  )
}
