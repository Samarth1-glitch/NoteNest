export default function NoteCard({ note }) {
  return (
    <div className={`p-4 border rounded space-y-1 ${note.pinned ? 'border-yellow-400' : 'border-gray-300'}`}>
      <div className="flex justify-between items-center">
        <h3 className="font-bold">{note.title}</h3>
        {note.pinned && <span className="text-yellow-500">⭐</span>}
      </div>
      <p>{note.content}</p>
      {note.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {note.tags.map(tag => (
            <span key={tag} className="text-xs bg-gray-200 px-1 rounded">{tag}</span>
          ))}
        </div>
      )}
      <small className="text-gray-500">Folder: {note.folder}</small>
      {note.archived && <small className="text-red-500">Archived</small>}
    </div>
  );
}
