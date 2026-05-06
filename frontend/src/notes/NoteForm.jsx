import React, { useState } from 'react'

const API_BASE = 'http://localhost:3000/notes'

export default function NoteForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!title && !content) return
    await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    })
    setTitle('')
    setContent('')
    onCreated && onCreated()
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 20 }}>
      <div>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
      </div>
      <button type="submit">Create Note</button>
    </form>
  )
}
