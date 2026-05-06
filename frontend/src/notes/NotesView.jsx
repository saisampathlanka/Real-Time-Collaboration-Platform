import React, { useEffect, useState } from 'react'
import NoteForm from './NoteForm.jsx'

const API_BASE = 'http://localhost:3000/notes'

export default function NotesView() {
  const [notes, setNotes] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [refresh])

  const deleteNote = async (id) => {
    await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
    setRefresh(r => !r)
  }

  const startEdit = (id) => setEditingId(id)

  return (
    <div>
      <NoteForm onCreated={() => setRefresh(r => !r)} />
      <h2>All Notes</h2>
      <ul>
        {notes.map(n => (
          <li key={n.id}>
            {editingId === n.id ? (
              <EditNote note={n} onDone={() => { setEditingId(null); setRefresh(r => !r) }} />
            ) : (
              <span>
                <strong>{n.title}</strong> - {n.content}
                <button onClick={() => startEdit(n.id)} style={{ marginLeft: 8 }}>Edit</button>
                <button onClick={() => deleteNote(n.id)} style={{ marginLeft: 4 }}>Delete</button>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function EditNote({ note, onDone }) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  const save = async () => {
    await fetch(`http://localhost:3000/notes/${note.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    })
    onDone && onDone()
  }

  return (
    <div>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <textarea value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={save}>Save</button>
      <button onClick={onDone} style={{ marginLeft: 4 }}>Cancel</button>
    </div>
  )
}
