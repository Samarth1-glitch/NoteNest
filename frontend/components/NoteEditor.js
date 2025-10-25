import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

export default function NoteEditor({ onCreate }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')

  async function submit(e) {
    e.preventDefault()
    if (!title.trim()) return
    const payload = { title: title.trim(), content, tags: tags.split(',').map(t=>t.trim()).filter(Boolean) }
    await onCreate(payload)
    setTitle(''); setContent(''); setTags('')
  }

  return (
    <form onSubmit={submit} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
      <input className="w-full p-2 border rounded mb-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea className="w-full p-2 border rounded mb-2" rows={6} placeholder="Content (markdown supported)" value={content} onChange={e=>setContent(e.target.value)} />
      <input className="w-full p-2 border rounded mb-2" placeholder="Tags (comma separated)" value={tags} onChange={e=>setTags(e.target.value)} />
      <div className="flex gap-3 items-start">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Add Note</button>
        <div className="flex-1">
          <p className="text-sm mb-1">Preview</p>
          <div className="p-2 border rounded bg-gray-50 dark:bg-gray-700">
            <ReactMarkdown>{content || '_Nothing to preview_'}</ReactMarkdown>
          </div>
        </div>
      </div>
    </form>
  )
}
