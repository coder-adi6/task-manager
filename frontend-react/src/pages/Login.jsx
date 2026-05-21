import { useState } from 'react'
import api from '../api'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login/', { username, password })
      onLogin(res.data.token)
    } catch {
      setError('Invalid credentials')
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: 10, background: '#4f46e5', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>Login</button>
      </form>
      <p style={{ marginTop: 12, textAlign: 'center' }}>No account? <a href="/register">Register</a></p>
    </div>
  )
}
