import SimplePage from '@/app/components/SimplePage'
import { messages } from '@/app/data'

export default function MessagesPage() {
  return <SimplePage title="Messages" eyebrow="Inbox"><div className="space-y-3">{messages.map((message) => <article key={message.id} className="rounded-lg border border-gray-200 p-4"><h2 className="font-semibold text-gray-900">{message.from}</h2><p className="mt-1 text-gray-600">{message.preview}</p></article>)}</div></SimplePage>
}
