const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String },
  tags: [{ type: String }],       // New field: tags array
  pinned: { type: Boolean, default: false },   // New field: pinned/favorite
  archived: { type: Boolean, default: false }, // New field: archived
  folder: { type: String, default: 'Default' }, // New field: folder/notebook
}, { timestamps: true });

module.exports = mongoose.model('Note', noteSchema);
