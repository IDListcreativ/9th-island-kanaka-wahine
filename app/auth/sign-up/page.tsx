'use client'

import { useRouter } from 'next/navigation'
import PageShell from '@/app/components/PageShell'
import { useMockApp } from '@/app/providers'

export default function SignUpPage() {
  const router = useRouter()
  const { signUp } = useMockApp()
  return <PageShell><main className="min-h-screen bg-gray-50"><section className="container-primary flex min-h-[70vh] items-center justify-center py-10"><form className="card w-full max-w-md" onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); signUp(String(form.get('name')), String(form.get('email'))); router.push('/profile') }}><p className="pill mb-4">Mock account</p><h1 className="text-2xl font-bold text-gray-900">Create account</h1><p className="mt-2 text-gray-600">Create a local prototype profile for testing flows on mobile.</p><div className="mt-6 grid gap-4"><label className="grid gap-2"><span className="field-label">Full name</span><input name="name" className="field-input" required /></label><label className="grid gap-2"><span className="field-label">Email</span><input name="email" type="email" className="field-input" required /></label><label className="grid gap-2"><span className="field-label">Password</span><input name="password" type="password" className="field-input" required /></label><button className="btn-primary" type="submit">Create profile</button></div></form></section></main></PageShell>
}
