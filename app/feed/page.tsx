'use client'

import { Trash2 } from 'lucide-react'
import PageShell from '@/app/components/PageShell'
import { useMockApp } from '@/app/providers'

export default function FeedPage() {
  const { posts, addPost, deletePost } = useMockApp()
  return <PageShell><main className="min-h-screen bg-gray-50"><section className="container-primary py-8 md:py-12"><h1 className="section-title">Community Feed</h1><p className="mt-2 text-gray-600">Mock posts for validating lightweight community discussion flows.</p><form className="card mt-6" onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); addPost(String(form.get('content')), String(form.get('topic') || 'General')); event.currentTarget.reset() }}><div className="grid gap-3 sm:grid-cols-[180px_1fr_auto]"><input name="topic" placeholder="Topic" className="field-input" /><input name="content" placeholder="Ask a question or share an update" className="field-input" required /><button className="btn-primary">Post</button></div></form><div className="mt-6 grid gap-4">{posts.map((post) => <article key={post.id} className="card"><div className="flex items-start justify-between gap-3"><div><span className="pill">{post.topic}</span><h2 className="mt-3 font-bold text-gray-900">{post.author}</h2></div><button className="btn-secondary px-3 text-red-600" onClick={() => deletePost(post.id)} aria-label="Delete post"><Trash2 size={16} /></button></div><p className="mt-3 text-gray-700">{post.content}</p><p className="mt-4 text-sm text-gray-500">{post.likes} likes · {post.comments} comments</p></article>)}</div></section></main></PageShell>
}
