import { useState } from 'react'
import api from '../../utils/api'
import { useRouter } from 'next/router'

export default function Login({ setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const router = useRouter()

  async function submit(e) {
    e.preventDefault()
    try {
      const res = await api.post('/api/auth/login', { email, password })
      const { token, user } = res.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      setUser && setUser(user)
      router.push('/')
    } catch (e) {
      setErr(e.response?.data?.error || 'Login failed')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Login</h2>
        {err && <p className="text-red-600">{err}</p>}
        <input className="w-full p-2 border rounded mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 border rounded mb-2" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded">Login</button>
      </form>
    </main>
  )
}
