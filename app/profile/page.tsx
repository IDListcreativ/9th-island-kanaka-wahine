import SimplePage from '@/app/components/SimplePage'
import { currentProfile } from '@/app/data'

export default function ProfilePage() {
  return <SimplePage title={currentProfile.name} eyebrow={currentProfile.role}><p className="mb-2 text-gray-600">{currentProfile.location} · {currentProfile.joined}</p><div className="mt-6 flex flex-wrap gap-2">{currentProfile.interests.map((interest) => <span key={interest} className="rounded-full bg-sand-100 px-3 py-1 text-sm text-gray-700">{interest}</span>)}</div></SimplePage>
}
