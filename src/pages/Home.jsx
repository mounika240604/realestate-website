import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SearchBar from '../components/SearchBar'
import PropertyCard from '../components/PropertyCard'
import AgentCard from '../components/AgentCard'
import SectionTitle from '../components/SectionTitle'
import { Loader, ErrorMsg } from '../components/Loader'
import useFetch from '../hooks/useFetch'
import { getProperties, getAgents } from '../services/api'

const CITIES = ['Madurai', 'Chennai', 'Coimbatore', 'Bengaluru', 'Mumbai']

export default function Home() {
  const props = useFetch(getProperties)
  const agents = useFetch(getAgents)

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=70" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30" />
        <div className="container-x py-20 sm:py-28 lg:py-36">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">Find the home that fits your life, not just your budget.</h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">Browse verified listings with clear prices, real photos and agents who pick up the phone.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="mt-10 max-w-4xl">
            <SearchBar />
          </motion.div>
        </div>
      </section>

      <section className="container-x pt-20">
        <SectionTitle title="Featured homes" sub="Hand-picked listings our team has visited in person." action={<Link to="/properties" className="btn-outline">View all properties</Link>} />
        {props.loading ? <Loader /> : props.error ? <ErrorMsg>{props.error}</ErrorMsg> : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {props.data.filter((p) => p.featured).slice(0, 6).map((p) => <PropertyCard key={p.id} p={p} />)}
          </div>
        )}
      </section>

      <section className="container-x pt-20">
        <SectionTitle title="Browse by city" />
        <div className="flex flex-wrap gap-3">
          {CITIES.map((c) => (
            <Link key={c} to={`/properties?city=${c}`} className="rounded-full border border-ink/15 px-6 py-3 font-medium transition hover:border-sea hover:bg-sea hover:text-white">{c}</Link>
          ))}
        </div>
      </section>

      <section className="container-x pt-20">
        <SectionTitle title="Talk to a local agent" sub="Every agent below handles listings in their own city." action={<Link to="/agents" className="btn-outline">All agents</Link>} />
        {agents.data && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {agents.data.map((a) => <AgentCard key={a.id} a={a} />)}
          </div>
        )}
      </section>

      <section className="container-x pt-20">
        <div className="rounded-3xl bg-mist px-6 py-14 text-center sm:px-12">
          <h2 className="text-3xl font-bold sm:text-4xl">Selling or renting out a property?</h2>
          <p className="mx-auto mt-3 max-w-lg text-slate2">Tell us about it and an agent will call you within one working day.</p>
          <Link to="/contact" className="btn-primary mt-6">Contact us</Link>
        </div>
      </section>
    </>
  )
}
