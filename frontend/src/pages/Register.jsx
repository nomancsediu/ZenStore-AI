import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faSpinner, faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'

export default function Register({ register }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await register(form.username, form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      const data = err.response?.data
      const msg = data
        ? Object.values(data).flat().join(' ')
        : 'Registration failed.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-base-200">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

      <div className="card bg-base-100 w-full max-w-sm shadow-2xl z-10">
        <div className="card-body gap-5 p-8">

          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight">
              ZenStore <span className="text-primary">AI</span>
            </h1>
            <p className="text-sm text-base-content/50 mt-1">AI-powered product management</p>
          </div>

          <div className="divider text-xs text-base-content/40 my-0">CREATE ACCOUNT</div>

          {error && (
            <div className="alert alert-error text-sm py-2">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="input input-bordered flex items-center gap-2">
              <FontAwesomeIcon icon={faUser} className="text-base-content/40 text-sm" />
              <input
                type="text"
                placeholder="Username"
                className="grow"
                value={form.username}
                onChange={set('username')}
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-base-content/40 text-sm" />
              <input
                type="email"
                placeholder="Email"
                className="grow"
                value={form.email}
                onChange={set('email')}
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <FontAwesomeIcon icon={faLock} className="text-base-content/40 text-sm" />
              <input
                type="password"
                placeholder="Password"
                className="grow"
                value={form.password}
                onChange={set('password')}
                required
              />
            </label>
            <button type="submit" className="btn btn-primary w-full mt-1" disabled={loading}>
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                <>
                  <FontAwesomeIcon icon={faUserPlus} />
                  Create Account
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/50">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
