import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import AuthBrand from '../components/AuthBrand'
import Input from '../components/Input'
import Button from '../components/Button'
import GoogleIcon from '../components/icons/GoogleIcon'
import GitHubIcon from '../components/icons/GitHubIcon'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, user } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const confirmed = searchParams.get('confirmed') === '1'

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true })
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      const msg = err?.message || 'Sign in failed.'
      if (msg.toLowerCase().includes('email') && msg.toLowerCase().includes('confirm')) {
        setError('Please confirm your email first. Check your inbox for the confirmation link.')
      } else {
        setError(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout linkTo="/signup" linkText="Don't have an account? Sign up">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <AuthBrand className="mb-8" />
        <h1 className="text-3xl font-semibold text-white tracking-tight">Sign in</h1>
        <p className="mt-2 text-[#6b6b7b]">Enter your credentials to access your account.</p>

        {confirmed && (
          <div className="mt-6 p-4 rounded-xl bg-[#4ecdc4]/10 border border-[#4ecdc4]/30 text-[#4ecdc4] text-sm">
            Email confirmed! You can sign in now.
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <div className="p-4 rounded-xl bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 text-[#ff6b6b] text-sm">
              {error}
            </div>
          )}
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-[#e8e8f0]">
                Password
              </label>
              <Link to="/forgot-password" className="text-sm text-[#4ecdc4] hover:text-[#5ee7de] transition-colors">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-[#2a2a36] bg-[#16161d]/80 text-[#e8e8f0] placeholder-[#6b6b7b] focus:outline-none focus:ring-2 focus:ring-[#4ecdc4]/50 focus:border-[#4ecdc4]/50 transition-all duration-200"
            />
          </div>
          <Button type="submit" className="mt-6" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#2a2a36]">
          <p className="text-center text-[#6b6b7b] text-sm">Or continue with</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button variant="secondary" type="button" className="flex items-center justify-center gap-2">
              <GoogleIcon />
              Google
            </Button>
            <Button variant="secondary" type="button" className="flex items-center justify-center gap-2">
              <GitHubIcon className="w-5 h-5 text-[#e8e8f0]" />
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
