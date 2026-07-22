import PageShell from '@/app/components/PageShell'
import ResourceDirectory from '@/app/components/ResourceDirectory'

export default function Page() {
  return <PageShell><ResourceDirectory kind="gatherings" title="Gatherings" subtitle="Join recurring meetups, park days, coffee hours, and smaller community circles." /></PageShell>
}
