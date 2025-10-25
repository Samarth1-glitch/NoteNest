import { useState, useEffect } from 'react';
import axios from '../utils/axios';

export default function NoteEditor({ note, onSaved, onCancel }) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [tags, setTags] = useState(note?.tags?.join(',') || '');
  const [folder, setFolder] = useState(note?.folder || 'Default');
  const [pinned, setPinned] = useState(note?.pinned || false);
  const [archived, setArchived] = useState(note?.archived || false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        title,
        content,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        folder,
        pinned,
        archived,
      };

      if (note?._id) {
        await axios.patch(`/notes/${note._id}`, payload);
      } else {
        await axios.post('/notes', payload);
      }

      onSaved(); // callback to refresh notes
    } catch (err) {
      console.error(err);
      alert('Failed to save note');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded space-y-3 bg-white shadow-sm">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded h-32"
      />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Folder / Notebook"
        value={folder}
        onChange={(e) => setFolder(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <div className="flex space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={pinned}
            onChange={(e) => setPinned(e.target.checked)}
          />
          <span>Pinned</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={archived}
            onChange={(e) => setArchived(e.target.checked)}
          />
          <span>Archived</span>
        </label>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
