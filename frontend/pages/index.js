import api from '../utils/api'
import { useEffect, useState } from 'react'
import NoteEditor from '../components/NoteEditor'
import NoteCard from '../components/NoteCard'
import { useRouter } from 'next/router'

export default function Home({ user }) {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => { fetchNotes() }, [])

  async function fetchNotes() {
    setLoading(true)
    try {
      const res = await api.get('/api/notes')
      setNotes(res.data || [])
    } catch (err) {
      if (err.response && err.response.status === 401) router.push('/auth/login')
    }
    setLoading(false)
  }

  async function handleCreate(note) {
    await api.post('/api/notes', note)
    fetchNotes()
  }

  async function handleDelete(id) {
    await api.delete(`/api/notes/${id}`)
    fetchNotes()
  }

  const tags = Array.from(new Set(notes.flatMap(n => n.tags || [])))
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">NoteNest</h1>
        </header>
        <NoteEditor onCreate={handleCreate} />
        <section className="mt-6 grid grid-cols-1 gap-4">
          {loading ? <p>Loading…</p> : notes.map(n => <NoteCard key={n._id} note={n} onDelete={handleDelete} />)}
        </section>
      </div>
    </main>
  )
}
