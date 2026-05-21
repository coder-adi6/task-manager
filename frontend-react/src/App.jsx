import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Projects from './pages/Projects'
import Tasks from './pages/Tasks'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))

  const handleLogin = (t) => {
    localStorage.setItem('token', t)
    setToken(t)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!token ? <Login onLogin={handleLogin} /> : <Navigate to="/projects" />} />
        <Route path="/register" element={!token ? <Register onLogin={handleLogin} /> : <Navigate to="/projects" />} />
        <Route path="/projects" element={token ? <Projects onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/projects/:id/tasks" element={token ? <Tasks onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={token ? "/projects" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
