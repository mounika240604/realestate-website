import AgentCard from '../components/AgentCard'
import { Loader, ErrorMsg } from '../components/Loader'
import useFetch from '../hooks/useFetch'
import { getAgents } from '../services/api'

export default function Agents() {
  const { data, loading, error } = useFetch(getAgents)
  return (
    <div className="container-x py-10">
      <h1 className="text-3xl font-bold sm:text-4xl">Our agents</h1>
      <p className="mt-2 max-w-xl text-slate2">Licensed professionals who know their neighbourhoods street by street.</p>
      <div className="mt-8">
        {loading ? <Loader /> : error ? <ErrorMsg>{error}</ErrorMsg> : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{data.map((a) => <AgentCard key={a.id} a={a} />)}</div>
        )}
      </div>
    </div>
  )
}
