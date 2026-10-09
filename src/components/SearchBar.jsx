import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
  const nav = useNavigate()
  const [status, setStatus] = useState('sale')
  const [q, setQ] = useState('')
  const [type, setType] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams({ status })
    if (q.trim()) params.set('q', q.trim())
    if (type) params.set('type', type)
    nav(`/properties?${params}`)
  }

  return (
    <form onSubmit={submit} className="rounded-2xl bg-white p-3 text-ink shadow-xl shadow-ink/20">
      <div className="mb-3 flex gap-1 rounded-lg bg-mist p-1 sm:w-fit">
        {[['sale', 'Buy'], ['rent', 'Rent']].map(([v, t]) => (
          <button type="button" key={v} onClick={() => setStatus(v)} className={`flex-1 rounded-md px-6 py-1.5 text-sm font-semibold transition sm:flex-none ${status === v ? 'bg-ink text-white' : 'text-slate2'}`}>{t}</button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-[1fr_200px_auto]">
        <input className="input" placeholder="City, area or property name" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Location" />
        <select className="input" value={type} onChange={(e) => setType(e.target.value)} aria-label="Property type">
          <option value="">Any type</option>
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
          <option value="house">House</option>
          <option value="studio">Studio</option>
        </select>
        <button className="btn-brass px-8">Search</button>
      </div>
    </form>
  )
}
