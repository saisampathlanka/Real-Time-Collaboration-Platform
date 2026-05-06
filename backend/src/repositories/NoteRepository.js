const fs = require('fs')
const path = require('path')
const dataFile = path.resolve(__dirname, '../../notes.json')

class NoteRepository {
  constructor() {
    this.backend = process.env.DB_TYPE === 'mysql' ? null : null
    this._ensureStore()
  }
  _ensureStore() {
    if (!fs.existsSync(dataFile)) {
      fs.writeFileSync(dataFile, JSON.stringify([]))
    }
  }
  _readAll() {
    const raw = fs.readFileSync(dataFile, 'utf8')
    try { return JSON.parse(raw) } catch { return [] }
  }
  _writeAll(notes) {
    fs.writeFileSync(dataFile, JSON.stringify(notes, null, 2))
  }
  async create(note) {
    const notes = this._readAll()
    notes.push(note)
    this._writeAll(notes)
    return note
  }
  async findAll() {
    return this._readAll()
  }
  async findById(id) {
    return this._readAll().find(n => n.id === id) || null
  }
  async update(id, updated) {
    const notes = this._readAll()
    const idx = notes.findIndex(n => n.id === id)
    if (idx === -1) return null
    notes[idx] = { ...notes[idx], ...updated, updated_at: new Date().toISOString() }
    this._writeAll(notes)
    return notes[idx]
  }
  async delete(id) {
    const notes = this._readAll()
    const idx = notes.findIndex(n => n.id === id)
    if (idx === -1) return false
    notes.splice(idx, 1)
    this._writeAll(notes)
    return true
  }
}

module.exports = new NoteRepository()
