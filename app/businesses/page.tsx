import PageShell from '@/app/components/PageShell'
import ResourceDirectory from '@/app/components/ResourceDirectory'

export default function Page() {
  return <PageShell><ResourceDirectory kind="businesses" title="Local Businesses" subtitle="Browse professional services, wellness providers, restaurants, and creative businesses." /></PageShell>
}
