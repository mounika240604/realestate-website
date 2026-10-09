import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const links = [['/', 'Home'], ['/properties', 'Properties'], ['/agents', 'Agents'], ['/contact', 'Contact']]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const cls = ({ isActive }) => `text-sm font-medium transition hover:text-sea ${isActive ? 'text-sea' : 'text-ink'}`

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/90 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="font-display text-xl font-extrabold">Hearth<span className="text-brass">&amp;</span>Key</Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([to, t]) => <NavLink key={to} to={to} end={to === '/'} className={cls}>{t}</NavLink>)}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <span className="text-sm text-slate2">Hi, {user.name.split(' ')[0]}</span>
              <button className="btn-outline" onClick={() => { logout(); navigate('/') }}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline">Log in</Link>
              <Link to="/signup" className="btn-primary">Sign up</Link>
            </>
          )}
        </div>
        <button className="p-2 md:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d={open ? 'M5 5l14 14M19 5L5 19' : 'M3 6h18M3 12h18M3 18h18'} /></svg>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-ink/10 bg-white md:hidden">
            <div className="container-x flex flex-col gap-4 py-4" onClick={() => setOpen(false)}>
              {links.map(([to, t]) => <NavLink key={to} to={to} end={to === '/'} className={cls}>{t}</NavLink>)}
              {user ? (
                <button className="btn-outline" onClick={logout}>Log out ({user.name.split(' ')[0]})</button>
              ) : (
                <div className="flex gap-3"><Link to="/login" className="btn-outline flex-1">Log in</Link><Link to="/signup" className="btn-primary flex-1">Sign up</Link></div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
