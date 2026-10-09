import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

export default function AuthForm({ mode }) {
  const isSignup = mode === 'signup'
  const { login, signup } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [err, setErr] = useState('')
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    try {
      isSignup ? signup(form) : login(form)
      nav('/properties')
    } catch (ex) { setErr(ex.message) }
  }

  return (
    <div className="container-x flex justify-center py-14">
      <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} className="w-full max-w-md space-y-4 rounded-2xl border border-ink/10 p-6 sm:p-8">
        <h1 className="text-2xl font-bold">{isSignup ? 'Create your account' : 'Welcome back'}</h1>
        {err && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{err}</p>}
        {isSignup && <div><label className="label" htmlFor="name">Full name</label><input id="name" className="input" required value={form.name} onChange={set('name')} /></div>}
        <div><label className="label" htmlFor="email">Email</label><input id="email" type="email" className="input" required value={form.email} onChange={set('email')} /></div>
        <div><label className="label" htmlFor="pw">Password</label><input id="pw" type="password" minLength={6} className="input" required value={form.password} onChange={set('password')} /></div>
        <button className="btn-primary w-full">{isSignup ? 'Create account' : 'Log in'}</button>
        <p className="text-center text-sm text-slate2">
          {isSignup ? 'Already registered?' : 'New here?'}{' '}
          <Link className="font-medium text-sea hover:underline" to={isSignup ? '/login' : '/signup'}>{isSignup ? 'Log in' : 'Create an account'}</Link>
        </p>
      </motion.form>
    </div>
  )
}
