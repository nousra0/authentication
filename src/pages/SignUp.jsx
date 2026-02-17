import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import AuthBrand from '../components/AuthBrand'
import Input from '../components/Input'
import Button from '../components/Button'
import { useAuth } from '../contexts/AuthContext'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) return
    setError('')
    setLoading(true)
    try {
      await signUp(email, password, {
        userMetadata: { full_name: name },
      })
      navigate('/signup/success', { replace: true })
    } catch (err) {
      const msg = err?.message || 'Sign up failed.'
      if (msg.toLowerCase().includes('rate limit') || msg.toLowerCase().includes('rate_limit')) {
        setError('Too many sign-up attempts. Please wait a few minutes and try again, or sign in if you already have an account.')
      } else {
        setError(msg)
      }
    } finally {
      setLoading(false)
    }
  }

  const passwordMatch = !confirmPassword || password === confirmPassword

  return (
    <AuthLayout linkTo="/login" linkText="Already have an account? Sign in">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <AuthBrand className="mb-8" />
        <h1 className="text-3xl font-semibold text-white tracking-tight">Create account</h1>
        <p className="mt-2 text-[#6b6b7b]">Get started with your free account today.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <div className="p-4 rounded-xl bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 text-[#ff6b6b] text-sm">
              {error}
            </div>
          )}
          <Input
            label="Full name"
            name="name"
            type="text"
            placeholder="Jane Doe"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            label="Confirm password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPassword && !passwordMatch ? 'Passwords do not match' : undefined}
            required
          />
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-[#2a2a36] bg-[#16161d] text-[#4ecdc4] focus:ring-[#4ecdc4]/50"
            />
            <span className="text-sm text-[#a0a0b0] group-hover:text-[#e8e8f0] transition-colors">
              I agree to the{' '}
              <a href="#" className="text-[#4ecdc4] hover:underline">Terms of Service</a> and{' '}
              <a href="#" className="text-[#4ecdc4] hover:underline">Privacy Policy</a>.
            </span>
          </label>
          <Button type="submit" disabled={!agree || !passwordMatch || loading} className="mt-6">
            {loading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
      </div>
    </AuthLayout>
  )
}
