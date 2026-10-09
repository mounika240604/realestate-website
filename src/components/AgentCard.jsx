export default function AgentCard({ a }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5 text-center">
      <img src={a.photo} alt={a.name} loading="lazy" className="mx-auto h-24 w-24 rounded-full object-cover" />
      <h3 className="mt-4 text-lg font-bold">{a.name}</h3>
      <p className="text-sm text-slate2">{a.role} · {a.city}</p>
      <p className="mt-2 text-sm">{a.deals}+ homes closed</p>
      <div className="mt-4 flex flex-col gap-2 text-sm">
        <a href={`tel:${a.phone.replace(/\s/g, '')}`} className="btn-outline">{a.phone}</a>
        <a href={`mailto:${a.email}`} className="text-sea hover:underline">{a.email}</a>
      </div>
    </div>
  )
}
