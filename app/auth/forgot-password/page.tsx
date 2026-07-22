'use client'

import { useState } from 'react'
import PageShell from '@/app/components/PageShell'

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  return <PageShell><main className="min-h-screen bg-gray-50"><section className="container-primary flex min-h-[70vh] items-center justify-center py-10"><form className="card w-full max-w-md" onSubmit={(event) => { event.preventDefault(); setSent(true) }}><p className="pill mb-4">Mock recovery</p><h1 className="text-2xl font-bold text-gray-900">Reset password</h1><p className="mt-2 text-gray-600">This simulates the recovery flow without sending email.</p><div className="mt-6 grid gap-4"><label className="grid gap-2"><span className="field-label">Email</span><input type="email" className="field-input" required /></label><button className="btn-primary" type="submit">Send mock link</button>{sent && <p className="rounded-lg bg-green-50 p-3 text-sm font-medium text-green-700">Mock reset link generated. No email was sent.</p>}</div></form></section></main></PageShell>
}
