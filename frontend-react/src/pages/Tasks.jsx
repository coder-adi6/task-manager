import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api'

export default function Tasks({ onLogout }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState('')

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks/?project=${id}`)
      setTasks(res.data)
    } catch {
      setError('Failed to load tasks')
    }
  }

  useEffect(() => { fetchTasks() }, [id])

  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      await api.post('/tasks/', { title, project: id, status: 'todo' })
      setTitle('')
      fetchTasks()
    } catch {
      setError('Failed to create task')
    }
  }

  const handleStatus = async (taskId, status) => {
    try {
      await api.patch(`/tasks/${taskId}/`, { status })
      fetchTasks()
    } catch {
      setError('Failed to update task')
    }
  }

  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.status === filter)

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => navigate('/projects')} style={{ padding: '8px 16px', background: '#6b7280', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>← Back</button>
        <h2 style={{ margin: 0 }}>Tasks</h2>
        <button onClick={onLogout} style={{ padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Logout</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: 8, margin: '24px 0' }}>
        <input placeholder="New task title" value={title} onChange={e => setTitle(e.target.value)} style={{ flex: 1, padding: 8 }} />
        <button type="submit" style={{ padding: '8px 16px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Add</button>
      </form>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['all', 'todo', 'in_progress', 'done'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #e5e7eb', cursor: 'pointer', background: filter === s ? '#4f46e5' : 'white', color: filter === s ? 'white' : 'black' }}>
            {s === 'all' ? 'All' : s === 'in_progress' ? 'In Progress' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
      {filtered.length === 0 && <p style={{ color: '#888' }}>No tasks found.</p>}
      {filtered.map(t => (
        <div key={t.id} style={{ padding: 16, marginBottom: 12, border: '1px solid #e5e7eb', borderRadius: 8, background: '#f9fafb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>{t.title}</strong>
            <select value={t.status} onChange={e => handleStatus(t.id, e.target.value)}
              style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #e5e7eb' }}>
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  )
}
