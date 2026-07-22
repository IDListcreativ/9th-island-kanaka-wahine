import SimplePage from '@/app/components/SimplePage'
import { notifications } from '@/app/data'

export default function NotificationsPage() {
  return <SimplePage title="Notifications" eyebrow="Activity"><ul className="space-y-3">{notifications.map((item) => <li key={item} className="rounded-lg border border-gray-200 p-4 text-gray-600">{item}</li>)}</ul></SimplePage>
}
