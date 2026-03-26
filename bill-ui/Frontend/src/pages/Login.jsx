import { useState } from 'react'
import './Login.css'

function Login({ onLogin, loading }) {
  const [formData, setFormData] = useState({ name: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    const trimmedName = formData.name.trim()
    if (!trimmedName || !formData.password) {
      setError('Please enter both name and password')
      return
    }

    const result = await onLogin(trimmedName, formData.password)

    if (!result.ok) {
      setError(result.message || 'Invalid credentials')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Selvam Motors</h1>
          <p>Billing System Login</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              autoComplete="username"
              disabled={loading}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              disabled={loading}
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" disabled={loading} className="login-submit-btn">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
