import SimplePage from '@/app/components/SimplePage'
import { feedPosts } from '@/app/data'

export default function FeedPage() {
  return <SimplePage title="Community feed" eyebrow="Updates"><div className="space-y-4">{feedPosts.map((post) => <article key={post.id} className="rounded-lg border border-gray-200 p-4"><h2 className="font-semibold text-gray-900">{post.author}</h2><p className="mt-2 text-gray-600">{post.text}</p><p className="mt-3 text-sm text-ocean-600">{post.likes} likes</p></article>)}</div></SimplePage>
}
