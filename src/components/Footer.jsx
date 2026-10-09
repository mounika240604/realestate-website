import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-white/80">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-extrabold text-white">Hearth<span className="text-brass">&amp;</span>Key</p>
          <p className="mt-3 max-w-xs text-sm">Verified homes, honest agents and clear pricing across South India and beyond.</p>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-white">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/properties?status=sale" className="hover:text-brass">Buy a home</Link></li>
            <li><Link to="/properties?status=rent" className="hover:text-brass">Rent a home</Link></li>
            <li><Link to="/agents" className="hover:text-brass">Meet our agents</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-white">Account</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="hover:text-brass">Log in</Link></li>
            <li><Link to="/signup" className="hover:text-brass">Create account</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold text-white">Contact</h4>
          <p className="text-sm">12 Race Course Road, Madurai<br />hello@hearthandkey.in<br />+91 98400 00000</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs">© {new Date().getFullYear()} Hearth &amp; Key. All rights reserved.</div>
    </footer>
  )
}
