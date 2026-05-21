import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function Projects({ onLogout }) {
  const [projects, setProjects] = useState([])
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects/')
      setProjects(res.data)
    } catch {
      setError('Failed to load projects')
    }
  }

  useEffect(() => { fetchProjects() }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await api.post('/projects/', { name })
      setName('')
      fetchProjects()
    } catch {
      setError('Failed to create project')
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>My Projects</h2>
        <button onClick={onLogout} style={{ padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Logout</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input placeholder="New project name" value={name} onChange={e => setName(e.target.value)} style={{ flex: 1, padding: 8 }} />
        <button type="submit" style={{ padding: '8px 16px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Create</button>
      </form>
      {projects.length === 0 && <p style={{ color: '#888' }}>No projects yet. Create one above.</p>}
      {projects.map(p => (
        <div key={p.id} onClick={() => navigate(`/projects/${p.id}/tasks`)}
          style={{ padding: 16, marginBottom: 12, border: '1px solid #e5e7eb', borderRadius: 8, cursor: 'pointer', background: '#f9fafb' }}>
          <strong>{p.name}</strong>
          <p style={{ margin: 0, color: '#6b7280', fontSize: 14 }}>Click to view tasks →</p>
        </div>
      ))}
    </div>
  )
}
