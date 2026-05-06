const express = require('express')
const router = express.Router()
const service = require('../services/NoteService')

router.post('/', async (req, res) => {
  const data = req.body || {}
  const note = await service.createNote(data)
  res.status(201).json(note)
})

router.get('/', async (req, res) => {
  const notes = await service.getAll()
  res.json(notes)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const note = await service.getById(id)
  if (!note) return res.status(404).json({ error: 'Not found' })
  res.json(note)
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const updated = await service.updateNote(id, req.body || {})
  if (!updated) return res.status(404).json({ error: 'Not found or no data' })
  res.json(updated)
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const ok = await service.deleteNote(id)
  if (!ok) return res.status(404).json({ error: 'Not found' })
  res.status(204).send()
})

module.exports = router
