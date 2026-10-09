import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Filters from '../components/Filters'
import PropertyCard from '../components/PropertyCard'
import { Loader, ErrorMsg } from '../components/Loader'
import useFetch from '../hooks/useFetch'
import { getProperties } from '../services/api'

export default function Properties() {
  const [params, setParams] = useSearchParams()
  const { data, loading, error } = useFetch(getProperties)

  const setParam = (k, v) => {
    const next = new URLSearchParams(params)
    v ? next.set(k, v) : next.delete(k)
    setParams(next, { replace: true })
  }
  const reset = () => setParams({}, { replace: true })

  const cities = useMemo(() => (data ? [...new Set(data.map((p) => p.city))].sort() : []), [data])

  const list = useMemo(() => {
    if (!data) return []
    const q = (params.get('q') || '').toLowerCase()
    const [min, max] = (params.get('price') || '0-999999999').split('-').map(Number)
    let out = data.filter((p) =>
      (!q || `${p.title} ${p.area} ${p.city}`.toLowerCase().includes(q)) &&
      (!params.get('status') || p.status === params.get('status')) &&
      (!params.get('city') || p.city === params.get('city')) &&
      (!params.get('type') || p.type === params.get('type')) &&
      (!params.get('beds') || p.beds >= Number(params.get('beds'))) &&
      p.price >= min && p.price <= max
    )
    const sort = params.get('sort')
    if (sort === 'low') out = [...out].sort((a, b) => a.price - b.price)
    else if (sort === 'high') out = [...out].sort((a, b) => b.price - a.price)
    else if (sort === 'new') out = [...out].sort((a, b) => b.year - a.year)
    else out = [...out].sort((a, b) => b.featured - a.featured)
    return out
  }, [data, params])

  return (
    <div className="container-x py-10">
      <h1 className="text-3xl font-bold sm:text-4xl">Properties</h1>
      <p className="mt-2 text-slate2">{loading ? 'Loading listings…' : `${list.length} ${list.length === 1 ? 'home' : 'homes'} match your search`}</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <Filters params={params} setParam={setParam} reset={reset} cities={cities} />
        <div>
          {loading ? <Loader /> : error ? <ErrorMsg>{error}</ErrorMsg> : list.length === 0 ? (
            <div className="rounded-2xl bg-mist p-12 text-center">
              <p className="font-display text-xl font-bold">No homes match these filters</p>
              <p className="mt-2 text-slate2">Widen the price range or remove a filter to see more listings.</p>
              <button onClick={reset} className="btn-primary mt-5">Clear filters</button>
            </div>
          ) : (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence>{list.map((p) => <PropertyCard key={p.id} p={p} />)}</AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
