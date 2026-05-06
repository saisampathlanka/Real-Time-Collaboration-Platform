const { v4: uuidv4 } = require('uuid')
const repository = require('../repositories/NoteRepository')

class NoteService {
  async createNote(data) {
    const now = new Date().toISOString()
    const note = {
      id: uuidv4(),
      title: data.title || '',
      content: data.content || '',
      created_at: now,
      updated_at: now
    }
    return await repository.create(note)
  }
  async getAll() {
    return await repository.findAll()
  }
  async getById(id) {
    return await repository.findById(id)
  }
  async updateNote(id, data) {
    const payload = {}
    if (data.title !== undefined) payload.title = data.title
    if (data.content !== undefined) payload.content = data.content
    if (Object.keys(payload).length === 0) return null
    return await repository.update(id, payload)
  }
  async deleteNote(id) {
    return await repository.delete(id)
  }
}

module.exports = new NoteService()
