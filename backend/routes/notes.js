const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const authMiddleware = require('../middleware/auth');

// GET /api/notes?tags=&folder=&pinned=&archived=
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { tags, folder, pinned, archived } = req.query;

    const filter = { user: req.user.id };
    if (tags) filter.tags = { $in: tags.split(',') };
    if (folder) filter.folder = folder;
    if (pinned) filter.pinned = pinned === 'true';
    if (archived) filter.archived = archived === 'true';

    const notes = await Note.find(filter).sort({ pinned: -1, updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/notes
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content, tags, pinned, archived, folder } = req.body;

    const newNote = new Note({
      user: req.user.id,
      title,
      content,
      tags: tags || [],
      pinned: pinned || false,
      archived: archived || false,
      folder: folder || 'Default',
    });

    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/notes/:id
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, content, tags, pinned, archived, folder } = req.body;

    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (tags !== undefined) note.tags = tags;
    if (pinned !== undefined) note.pinned = pinned;
    if (archived !== undefined) note.archived = archived;
    if (folder !== undefined) note.folder = folder;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/notes/:id
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
