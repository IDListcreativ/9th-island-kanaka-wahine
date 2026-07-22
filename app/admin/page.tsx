'use client'

import Link from 'next/link'
import { CheckCircle, Clock, Eye, ShieldCheck, Trash2 } from 'lucide-react'
import PageShell from '@/app/components/PageShell'
import { resourceConfig, ResourceKind } from '@/app/data/mock'
import { useMockApp } from '@/app/providers'

function parseResourceKey(key: string): { kind: ResourceKind; slug: string } | null {
  const [kind, slug] = key.split(':')
  if (!kind || !slug) return null
  return { kind: kind as ResourceKind, slug }
}

export default function AdminPage() {
  const { reports, resources, updateReportStatus } = useMockApp()
  const openReports = reports.filter((report) => report.status === 'open' || report.status === 'reviewing')
  const totalRecords = Object.values(resources).flat().length
  const recentlyAdded = Object.values(resources).flat().slice(0, 6)

  return (
    <PageShell>
      <main className="min-h-screen bg-gray-50">
        <section className="border-b border-gray-200 bg-white py-8 md:py-12">
          <div className="container-primary">
            <p className="pill mb-3"><ShieldCheck size={14} />Mock admin tools</p>
            <h1 className="section-title">Moderation Dashboard</h1>
            <p className="mt-2 max-w-2xl text-lg text-gray-600">Frontend-only moderation workflows for validating how trusted community admins review reports, verify listings, and keep information useful.</p>
          </div>
        </section>

        <section className="container-primary py-8 md:py-10">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="card"><p className="text-sm font-semibold text-gray-600">Open reports</p><p className="mt-2 text-3xl font-bold text-gray-900">{openReports.length}</p></div>
            <div className="card"><p className="text-sm font-semibold text-gray-600">Published records</p><p className="mt-2 text-3xl font-bold text-gray-900">{totalRecords}</p></div>
            <div className="card"><p className="text-sm font-semibold text-gray-600">Admin mode</p><p className="mt-2 text-3xl font-bold text-gray-900">Mock</p></div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
            <section className="card">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Moderation queue</h2>
                  <p className="mt-1 text-sm text-gray-600">Report decisions persist locally in this browser.</p>
                </div>
                <Clock className="text-ocean-600" />
              </div>

              <div className="mt-6 grid gap-4">
                {reports.map((report) => {
                  const target = parseResourceKey(report.resourceKey)
                  const href = target ? `${resourceConfig[target.kind].path}/${target.slug}` : '/admin'
                  return <article key={report.id} className="rounded-lg border border-gray-200 bg-white p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${report.status === 'open' ? 'bg-red-50 text-red-700' : report.status === 'reviewing' ? 'bg-sand-100 text-gray-900' : 'bg-green-50 text-green-700'}`}>{report.status}</span>
                        <h3 className="mt-3 text-lg font-bold text-gray-900">{report.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">Reported by {report.reporter}</p>
                      </div>
                      <Link href={href} className="btn-secondary text-sm"><Eye size={16} />View</Link>
                    </div>
                    <p className="mt-4 text-gray-700">{report.reason}</p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-3">
                      <button className="btn-secondary text-sm" onClick={() => updateReportStatus(report.id, 'reviewing')}>Reviewing</button>
                      <button className="btn-secondary text-sm text-green-700" onClick={() => updateReportStatus(report.id, 'resolved')}><CheckCircle size={16} />Resolve</button>
                      <button className="btn-secondary text-sm text-red-600" onClick={() => updateReportStatus(report.id, 'dismissed')}><Trash2 size={16} />Dismiss</button>
                    </div>
                  </article>
                })}
              </div>
            </section>

            <aside className="card self-start">
              <h2 className="text-xl font-bold text-gray-900">Recent records</h2>
              <p className="mt-1 text-sm text-gray-600">Quick review links across the mocked content library.</p>
              <div className="mt-5 grid gap-3">
                {recentlyAdded.map((item) => <Link key={`${item.type}-${item.slug}`} href={`${resourceConfig[item.type].path}/${item.slug}`} className="rounded-lg border border-gray-200 p-3 hover:border-ocean-300 hover:bg-ocean-50"><span className="text-xs font-bold uppercase text-ocean-700">{resourceConfig[item.type].singular}</span><h3 className="mt-1 font-bold text-gray-900">{item.name}</h3><p className="text-sm text-gray-600">{item.location}</p></Link>)}
              </div>
            </aside>
          </div>
        </section>
      </main>
    </PageShell>
  )
}
