import ReactMarkdown from 'react-markdown'
export default function NoteCard({ note, onDelete }) {
  return (
    <article className="p-4 bg-white dark:bg-gray-800 rounded shadow">
      <div className="flex justify-between items-start">
        <strong className="text-lg">{note.title}</strong>
        <button onClick={()=>onDelete(note._id)} className="text-sm text-red-600 dark:text-red-400">Delete</button>
      </div>
      <div className="mt-2 prose dark:prose-invert">
        <ReactMarkdown>{note.content || ''}</ReactMarkdown>
      </div>
      <div className="mt-3 flex gap-2">
        {(note.tags||[]).map(t=> <span key={t} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{t}</span>)}
      </div>
    </article>
  )
}
