import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="container-x py-28 text-center">
      <h1 className="text-5xl font-extrabold">404</h1>
      <p className="mt-3 text-slate2">That page does not exist.</p>
      <Link to="/" className="btn-primary mt-6">Go to home</Link>
    </div>
  )
}
