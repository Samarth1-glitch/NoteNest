import '../styles/globals.css'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState('light')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const t = localStorage.getItem('theme') || 'light'
    setTheme(t)
    if (t === 'dark') document.documentElement.classList.add('dark')
    const raw = localStorage.getItem('user')
    if (raw) setUser(JSON.parse(raw))
  }, [])

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    window.location.href = '/auth/login'
  }

  return (
    <div>
      <nav className="p-4 bg-white dark:bg-gray-800 shadow">
        <div className="max-w-4xl mx-auto flex justify-between">
          <Link href="/"><a className="font-bold">NoteNest</a></Link>
          <div className="flex gap-3 items-center">
            {user ? (
              <>
                <span className="text-sm">Hi, {user.email}</span>
                <button onClick={logout} className="px-3 py-1 border rounded">Logout</button>
              </>
            ) : (
              <>
                <Link href="/auth/login"><a className="px-3 py-1 border rounded">Login</a></Link>
                <Link href="/auth/register"><a className="px-3 py-1 border rounded">Register</a></Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <Component {...pageProps} setUser={setUser} user={user} theme={theme} setTheme={setTheme} />
    </div>
  )
}
