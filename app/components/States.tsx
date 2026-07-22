export function SkeletonGrid() {
  return <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="card animate-pulse"><div className="mb-4 h-28 rounded-lg bg-gray-200" /><div className="mb-3 h-5 w-2/3 rounded bg-gray-200" /><div className="mb-2 h-4 rounded bg-gray-200" /><div className="h-4 w-1/2 rounded bg-gray-200" /></div>)}</div>
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: React.ReactNode }) {
  return <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center"><h3 className="text-lg font-bold text-gray-900">{title}</h3><p className="mx-auto mt-2 max-w-md text-gray-600">{body}</p>{action && <div className="mt-5">{action}</div>}</div>
}
