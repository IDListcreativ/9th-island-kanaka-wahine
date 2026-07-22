'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import PageShell from '@/app/components/PageShell'
import { useMockApp } from '@/app/providers'

export default function LoginPage() {
  const router = useRouter()
  const { signIn } = useMockApp()
  return <PageShell><main className="min-h-screen bg-gray-50"><section className="container-primary flex min-h-[70vh] items-center justify-center py-10"><form className="card w-full max-w-md" onSubmit={(event) => { event.preventDefault(); signIn(String(new FormData(event.currentTarget).get('email') || 'leilani@example.com')); router.push('/profile') }}><p className="pill mb-4">Mock authentication</p><h1 className="text-2xl font-bold text-gray-900">Sign in</h1><p className="mt-2 text-gray-600">Use any email and password. No provider or backend is contacted.</p><div className="mt-6 grid gap-4"><label className="grid gap-2"><span className="field-label">Email</span><input name="email" type="email" defaultValue="leilani@example.com" className="field-input" required /></label><label className="grid gap-2"><span className="field-label">Password</span><input name="password" type="password" defaultValue="prototype" className="field-input" required /></label><button className="btn-primary" type="submit">Sign in</button><div className="flex justify-between text-sm"><Link href="/auth/forgot-password" className="text-ocean-700 font-semibold">Forgot password?</Link><Link href="/auth/sign-up" className="text-ocean-700 font-semibold">Create account</Link></div></div></form></section></main></PageShell>
}
