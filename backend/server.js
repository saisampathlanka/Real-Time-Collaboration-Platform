const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const notesRouter = require('./src/routes/notes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use('/notes', notesRouter)

app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Notes API – Phase 1 Monolith (Backend)' })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
