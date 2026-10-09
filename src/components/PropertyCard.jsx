import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { formatPrice, cap } from '../utils/format'

export default function PropertyCard({ p }) {
  return (
    <motion.article layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="group overflow-hidden rounded-2xl border border-ink/10 bg-white">
      <Link to={`/properties/${p.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-mist">
          <img src={p.images[0]} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <span className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-xs font-semibold ${p.status === 'rent' ? 'bg-sea text-white' : 'bg-brass text-ink'}`}>
            For {p.status}
          </span>
        </div>
        <div className="p-5">
          <p className="font-display text-2xl font-bold">{formatPrice(p.price, p.status)}</p>
          <h3 className="mt-1 line-clamp-1 text-base font-semibold">{p.title}</h3>
          <p className="mt-0.5 text-sm text-slate2">{p.area}, {p.city}</p>
          <div className="mt-4 flex gap-4 border-t border-ink/10 pt-4 text-sm text-slate2">
            <span>{p.beds} {p.beds === 1 ? 'bed' : 'beds'}</span>
            <span>{p.baths} baths</span>
            <span>{p.sqft} sq ft</span>
            <span className="ml-auto">{cap(p.type)}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
