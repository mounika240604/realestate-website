import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader, ErrorMsg } from '../components/Loader'
import PropertyCard from '../components/PropertyCard'
import useFetch from '../hooks/useFetch'
import { getProperties, getAgents } from '../services/api'
import { formatPrice, cap } from '../utils/format'

export default function PropertyDetails() {
  const { id } = useParams()
  const { data: all, loading, error } = useFetch(getProperties)
  const { data: agents } = useFetch(getAgents)
  const [img, setImg] = useState(0)
  const [sent, setSent] = useState(false)

  if (loading) return <Loader />
  if (error) return <ErrorMsg>{error}</ErrorMsg>
  const p = all.find((x) => x.id === Number(id))
  if (!p) return (
    <div className="container-x py-24 text-center">
      <h1 className="text-3xl font-bold">Property not found</h1>
      <p className="mt-2 text-slate2">This listing may have been sold or removed.</p>
      <Link to="/properties" className="btn-primary mt-6">Back to properties</Link>
    </div>
  )
  const agent = agents?.find((a) => a.id === p.agentId)
  const similar = all.filter((x) => x.id !== p.id && x.city === p.city).slice(0, 3)
  const facts = [['Bedrooms', p.beds], ['Bathrooms', p.baths], ['Area', `${p.sqft} sq ft`], ['Type', cap(p.type)], ['Built', p.year]]

  return (
    <div className="container-x py-8">
      <Link to="/properties" className="text-sm text-sea hover:underline">← Back to properties</Link>
      <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-mist">
            <AnimatePresence mode="wait">
              <motion.img key={img} src={p.images[img]} alt={`${p.title}, photo ${img + 1}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0 h-full w-full object-cover" />
            </AnimatePresence>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {p.images.map((src, i) => (
              <button key={i} onClick={() => setImg(i)} aria-label={`Show photo ${i + 1}`} className={`aspect-[4/3] overflow-hidden rounded-lg border-2 ${i === img ? 'border-sea' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold">{p.title}</h1>
              <p className="mt-1 text-slate2">{p.area}, {p.city}</p>
            </div>
            <p className="font-display text-3xl font-extrabold text-sea">{formatPrice(p.price, p.status)}</p>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-mist p-5 sm:grid-cols-5">
            {facts.map(([k, v]) => (<div key={k}><dt className="text-xs text-slate2">{k}</dt><dd className="font-semibold">{v}</dd></div>))}
          </dl>

          <h2 className="mt-8 text-xl font-bold">About this home</h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-slate2">{p.description}</p>

          <h2 className="mt-8 text-xl font-bold">Amenities</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {p.amenities.map((a) => <li key={a} className="flex items-center gap-2 text-sm"><span className="h-1.5 w-1.5 rounded-full bg-brass" />{a}</li>)}
          </ul>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {agent && (
            <div className="flex items-center gap-4 rounded-2xl border border-ink/10 p-5">
              <img src={agent.photo} alt={agent.name} className="h-16 w-16 rounded-full object-cover" />
              <div>
                <p className="font-semibold">{agent.name}</p>
                <p className="text-sm text-slate2">{agent.role}</p>
                <a href={`tel:${agent.phone.replace(/\s/g, '')}`} className="text-sm text-sea hover:underline">{agent.phone}</a>
              </div>
            </div>
          )}
          <div className="rounded-2xl border border-ink/10 p-5">
            <h2 className="text-lg font-bold">Book a visit</h2>
            {sent ? (
              <motion.p initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 rounded-lg bg-mist p-4 text-sm" role="status">
                Request sent. {agent?.name.split(' ')[0] || 'An agent'} will call you within one working day.
              </motion.p>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="mt-4 space-y-3">
                <input className="input" placeholder="Your name" required aria-label="Your name" />
                <input className="input" type="email" placeholder="Email" required aria-label="Email" />
                <input className="input" type="tel" placeholder="Phone" required aria-label="Phone" />
                <input className="input" type="date" required aria-label="Preferred visit date" />
                <button className="btn-primary w-full">Request visit</button>
              </form>
            )}
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">More homes in {p.city}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{similar.map((s) => <PropertyCard key={s.id} p={s} />)}</div>
        </section>
      )}
    </div>
  )
}
