import PageShell from '@/app/components/PageShell'
import ResourceDetail from '@/app/components/ResourceDetail'

export default function Page({ params }: { params: { slug: string } }) {
  return <PageShell><ResourceDetail kind="vendors" slug={params.slug} /></PageShell>
}
