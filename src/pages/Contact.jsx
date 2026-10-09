import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <div className="container-x grid gap-12 py-10 lg:grid-cols-2">
      <div>
        <h1 className="text-3xl font-bold sm:text-4xl">Contact us</h1>
        <p className="mt-2 max-w-md text-slate2">Questions about a listing, or want to list your own property? Send a message and we reply within one working day.</p>
        <dl className="mt-8 space-y-5 text-sm">
          <div><dt className="font-semibold">Office</dt><dd className="text-slate2">12 Race Course Road, Madurai, Tamil Nadu 625002</dd></div>
          <div><dt className="font-semibold">Phone</dt><dd className="text-slate2">+91 98400 00000 (Mon–Sat, 9am–6pm)</dd></div>
          <div><dt className="font-semibold">Email</dt><dd className="text-slate2">hello@hearthandkey.in</dd></div>
        </dl>
      </div>
      <div className="rounded-2xl border border-ink/10 p-6 sm:p-8">
        {sent ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} role="status">
            <h2 className="text-xl font-bold">Message sent</h2>
            <p className="mt-2 text-slate2">Thanks for writing in. We will reply within one working day.</p>
            <button className="btn-outline mt-5" onClick={() => setSent(false)}>Send another message</button>
          </motion.div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className="label" htmlFor="n">Name</label><input id="n" className="input" required /></div>
              <div><label className="label" htmlFor="p">Phone</label><input id="p" type="tel" className="input" /></div>
            </div>
            <div><label className="label" htmlFor="e">Email</label><input id="e" type="email" className="input" required /></div>
            <div><label className="label" htmlFor="s">Topic</label>
              <select id="s" className="input"><option>I want to buy</option><option>I want to rent</option><option>I want to list a property</option><option>Something else</option></select></div>
            <div><label className="label" htmlFor="m">Message</label><textarea id="m" rows="4" className="input" required /></div>
            <button className="btn-primary w-full">Send message</button>
          </form>
        )}
      </div>
    </div>
  )
}
