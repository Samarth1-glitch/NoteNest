const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// POST /register
router.post('/register', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'email and password required' })
  const exists = await User.findOne({ email })
  if (exists) return res.status(400).json({ error: 'email already registered' })
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  const user = new User({ email, password: hash })
  await user.save()
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.status(201).json({ token, user: { id: user._id, email: user.email } })
})

// POST /login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'email and password required' })
  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ error: 'invalid credentials' })
  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(400).json({ error: 'invalid credentials' })
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ token, user: { id: user._id, email: user.email } })
})

module.exports = router
