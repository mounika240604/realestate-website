import axios from 'axios'

// Data lives in /public/data. Swap baseURL for a real backend later.
const api = axios.create({ baseURL: import.meta.env.BASE_URL })

export const getProperties = () => api.get('data/properties.json').then((r) => r.data)
export const getProperty = (id) => getProperties().then((l) => l.find((p) => p.id === Number(id)))
export const getAgents = () => api.get('data/agents.json').then((r) => r.data)
