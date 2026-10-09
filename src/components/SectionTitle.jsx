export default function SectionTitle({ title, sub, action }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
        {sub && <p className="mt-2 max-w-xl text-slate2">{sub}</p>}
      </div>
      {action}
    </div>
  )
}
