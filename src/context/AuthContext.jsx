import { createContext, useContext, useState } from 'react'

// Demo auth stored in localStorage. Replace with real API calls (axios) in production.
const AuthContext = createContext(null)
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => read('hk_session', null))

  const signup = ({ name, email, password }) => {
    const users = read('hk_users', [])
    if (users.some((u) => u.email === email)) throw new Error('An account with this email already exists.')
    users.push({ name, email, password })
    localStorage.setItem('hk_users', JSON.stringify(users))
    login({ email, password })
  }
  const login = ({ email, password }) => {
    const found = read('hk_users', []).find((u) => u.email === email && u.password === password)
    if (!found) throw new Error('Email or password is incorrect.')
    const session = { name: found.name, email: found.email }
    localStorage.setItem('hk_session', JSON.stringify(session))
    setUser(session)
  }
  const logout = () => { localStorage.removeItem('hk_session'); setUser(null) }

  return <AuthContext.Provider value={{ user, signup, login, logout }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
