const express = require('express')
const router = express.Router()
const Note = require('../models/Note')
const auth = require('../middleware/auth')
const mongoose = require('mongoose')

// GET all - only user's notes
router.get('/', auth, async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 })
  res.json(notes)
})

// POST create
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


// GET single
router.get('/:id', auth, async (req, res) => {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'invalid id' })
  const note = await Note.findOne({ _id: id, user: req.user.id })
  if (!note) return res.status(404).json({ error: 'not found' })
  res.json(note)
})

// PUT update
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'invalid id' })
  const updated = await Note.findOneAndUpdate({ _id: id, user: req.user.id }, req.body, { new:true })
  res.json(updated)
})

// DELETE
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'invalid id' })
  await Note.findOneAndDelete({ _id: id, user: req.user.id })
  res.status(204).end()
})

module.exports = router
