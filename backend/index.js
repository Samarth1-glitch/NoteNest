require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const auth = require('./routes/auth')
const notes = require('./routes/notes')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', auth)
app.use('/api/notes', notes)

const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/notenest'

mongoose.connect(MONGODB_URI, { useNewUrlParser:true, useUnifiedTopology:true })
  .then(()=> {
    console.log('MongoDB connected')
    app.listen(PORT, ()=> console.log('Server running on', PORT))
  })
  .catch(err => {
    console.error('MongoDB connection error', err)
    process.exit(1)
  })
