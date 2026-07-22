import SimplePage from '@/app/components/SimplePage'

export default function LoginPage() {
  return <SimplePage title="Sign in" eyebrow="Account"><p className="text-gray-600">Mock authentication is ready for wiring to Supabase. Use this route for sign-in and account creation flows.</p><button className="btn-primary mt-6">Continue with email</button></SimplePage>
}
