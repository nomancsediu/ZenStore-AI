import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faSpinner, faUser, faLock } from '@fortawesome/free-solid-svg-icons'

export default function Login({ login }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(form.username, form.password)
      navigate('/dashboard')
    } catch {
      setError('Invalid username or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-base-200">
      {/* BG blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

      <div className="card bg-base-100 w-full max-w-sm shadow-2xl z-10">
        <div className="card-body gap-5 p-8">

          {/* Brand */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight">
              ZenStore <span className="text-primary">AI</span>
            </h1>
            <p className="text-sm text-base-content/50 mt-1">AI-powered product management</p>
          </div>

          <div className="divider text-xs text-base-content/40 my-0">SIGN IN</div>

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
                onChange={(e) => setForm({ ...form, username: e.target.value })}
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
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </label>
            <button type="submit" className="btn btn-primary w-full mt-1" disabled={loading}>
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                <>
                  <FontAwesomeIcon icon={faRightToBracket} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/50">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}