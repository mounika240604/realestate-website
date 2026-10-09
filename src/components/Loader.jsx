export function Loader() {
  return <div className="container-x py-24 text-center text-slate2" role="status">Loading…</div>
}
export function ErrorMsg({ children }) {
  return <div className="container-x py-24 text-center text-red-700" role="alert">{children}</div>
}
