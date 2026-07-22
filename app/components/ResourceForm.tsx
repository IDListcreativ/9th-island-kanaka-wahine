'use client'

import { FormEvent } from 'react'
import { X } from 'lucide-react'
import { resourceConfig, ResourceItem, ResourceKind } from '@/app/data/mock'
import { useMockApp } from '@/app/providers'

type ResourceFormProps = { kind: ResourceKind; item?: ResourceItem; onClose: () => void; onSaved?: (item: ResourceItem) => void }

export default function ResourceForm({ kind, item, onClose, onSaved }: ResourceFormProps) {
  const config = resourceConfig[kind]
  const { createItem, updateItem } = useMockApp()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const tags = String(form.get('tags') || '').split(',').map((tag) => tag.trim()).filter(Boolean)
    const highlights = String(form.get('highlights') || '').split('\n').map((line) => line.trim()).filter(Boolean)
    const draft = {
      name: String(form.get('name') || ''),
      subtitle: String(form.get('subtitle') || ''),
      category: String(form.get('category') || config.categories[0]),
      description: String(form.get('description') || ''),
      location: String(form.get('location') || ''),
      date: String(form.get('date') || '') || undefined,
      time: String(form.get('time') || '') || undefined,
      price: String(form.get('price') || '') || undefined,
      phone: String(form.get('phone') || '') || undefined,
      website: String(form.get('website') || '') || undefined,
      organizer: String(form.get('organizer') || '') || undefined,
      tags,
      highlights,
    }

    if (item) {
      updateItem(kind, item.slug, draft)
      onClose()
      return
    }

    const created = createItem(kind, draft)
    onSaved?.(created)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-gray-950/60 px-4 py-6">
      <div className="mx-auto max-w-2xl rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 p-4 sm:p-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{item ? `Edit ${config.singular}` : config.createLabel}</h2>
            <p className="text-sm text-gray-600">Changes are saved locally on this device.</p>
          </div>
          <button className="btn-secondary px-3" onClick={onClose} aria-label="Close"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4 p-4 sm:p-6">
          <label className="grid gap-2"><span className="field-label">Name</span><input required name="name" defaultValue={item?.name} className="field-input" /></label>
          <label className="grid gap-2"><span className="field-label">Short description</span><input required name="subtitle" defaultValue={item?.subtitle} className="field-input" /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2"><span className="field-label">Category</span><select name="category" defaultValue={item?.category || config.categories[0]} className="field-input">{config.categories.map((category) => <option key={category}>{category}</option>)}</select></label>
            <label className="grid gap-2"><span className="field-label">Location</span><input required name="location" defaultValue={item?.location} className="field-input" /></label>
          </div>
          {(kind === 'events' || kind === 'gatherings') && <div className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2"><span className="field-label">Date</span><input name="date" type="date" defaultValue={item?.date} className="field-input" /></label><label className="grid gap-2"><span className="field-label">Time</span><input name="time" defaultValue={item?.time} className="field-input" /></label></div>}
          {kind === 'listings' && <label className="grid gap-2"><span className="field-label">Price</span><input name="price" defaultValue={item?.price} className="field-input" placeholder="$75" /></label>}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2"><span className="field-label">Contact phone</span><input name="phone" defaultValue={item?.phone} className="field-input" /></label>
            <label className="grid gap-2"><span className="field-label">Website</span><input name="website" defaultValue={item?.website} className="field-input" /></label>
          </div>
          <label className="grid gap-2"><span className="field-label">Organizer / seller / owner</span><input name="organizer" defaultValue={item?.organizer} className="field-input" /></label>
          <label className="grid gap-2"><span className="field-label">Full description</span><textarea required name="description" defaultValue={item?.description} rows={5} className="field-input" /></label>
          <label className="grid gap-2"><span className="field-label">Tags, comma separated</span><input name="tags" defaultValue={item?.tags.join(', ')} className="field-input" /></label>
          <label className="grid gap-2"><span className="field-label">Highlights, one per line</span><textarea name="highlights" defaultValue={item?.highlights.join('\n')} rows={3} className="field-input" /></label>
          <div className="sticky bottom-0 -mx-4 -mb-4 flex gap-3 border-t border-gray-200 bg-white p-4 sm:-mx-6 sm:-mb-6 sm:p-6">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" className="btn-primary flex-1">{item ? 'Save Changes' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
