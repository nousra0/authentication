import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import AuthBrand from '../components/AuthBrand'
import Input from '../components/Input'
import Button from '../components/Button'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const [invalidLink, setInvalidLink] = useState(false)
  const { updatePassword } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!supabase) {
      setInvalidLink(true)
      return
    }
    const checkSession = async () => {
      let { data: { session } } = await supabase.auth.getSession()
      if (!session && window.location.hash) {
        await new Promise((r) => setTimeout(r, 400))
        const next = await supabase.auth.getSession()
        session = next.data.session
      }
      if (session) {
        setReady(true)
      } else {
        setInvalidLink(true)
      }
    }
    checkSession()
  }, [])

  const passwordMatch = !confirmPassword || password === confirmPassword

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setError('')
    setLoading(true)
    try {
      await updatePassword(password)
      await supabase.auth.signOut()
      navigate('/login?reset=1', { replace: true })
    } catch (err) {
      setError(err?.message || 'Failed to update password.')
    } finally {
      setLoading(false)
    }
  }

  if (invalidLink) {
    return (
      <AuthLayout linkTo="/login" linkText="Back to sign in">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
          <AuthBrand className="mb-8" />
          <div className="p-4 rounded-xl bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 text-[#ff6b6b] text-sm mb-6">
            This link is invalid or has expired. Please request a new password reset.
          </div>
          <Link to="/forgot-password">
            <Button variant="secondary" className="w-full">
              Request new link
            </Button>
          </Link>
        </div>
      </AuthLayout>
    )
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f14] px-6">
        <div className="w-12 h-12 border-2 border-[#4ecdc4]/50 border-t-[#4ecdc4] rounded-full animate-spin mb-6" />
        <p className="text-[#e8e8f0] font-medium">Loading...</p>
      </div>
    )
  }

  return (
    <AuthLayout linkTo="/login" linkText="Back to sign in">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <AuthBrand className="mb-8" />
        <div className="w-14 h-14 rounded-2xl bg-[#1e1e28] border border-[#2a2a36] flex items-center justify-center mb-6">
          <svg className="w-7 h-7 text-[#4ecdc4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold text-white tracking-tight">Set new password</h1>
        <p className="mt-2 text-[#6b6b7b]">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <div className="p-4 rounded-xl bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 text-[#ff6b6b] text-sm">
              {error}
            </div>
          )}
          <Input
            label="New password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            label="Confirm new password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPassword && !passwordMatch ? 'Passwords do not match' : undefined}
            required
          />
          <Button type="submit" className="mt-6" disabled={!passwordMatch || loading}>
            {loading ? 'Updating...' : 'Update password'}
          </Button>
        </form>
      </div>
    </AuthLayout>
  )
}
