import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import AuthBrand from '../components/AuthBrand'
import Input from '../components/Input'
import Button from '../components/Button'
import { useAuth } from '../contexts/AuthContext'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await resetPassword(email)
      setSent(true)
    } catch (err) {
      setError(err?.message || 'Failed to send reset link.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout linkTo="/login" linkText="Back to sign in">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <AuthBrand className="mb-8" />

        {!sent ? (
          <>
            <div className="w-14 h-14 rounded-2xl bg-[#1e1e28] border border-[#2a2a36] flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-[#4ecdc4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h1 className="text-3xl font-semibold text-white tracking-tight">Reset password</h1>
            <p className="mt-2 text-[#6b6b7b]">
              Enter your email and we'll send you a link to reset your password.
            </p>

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
              <Button type="submit" className="mt-6" disabled={loading}>
                {loading ? 'Sending...' : 'Send reset link'}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-[#4ecdc4]/10 border border-[#4ecdc4]/30 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#4ecdc4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-white">Check your email</h1>
            <p className="mt-2 text-[#6b6b7b]">
              We've sent a password reset link to <span className="text-[#e8e8f0] font-medium">{email}</span>.
            </p>
            <p className="mt-4 text-sm text-[#6b6b7b]">
              Didn't receive it?{' '}
              <button type="button" onClick={() => setSent(false)} className="text-[#4ecdc4] hover:underline">
                Try again
              </button>
            </p>
            <Link
              to="/login"
              className="inline-flex items-center justify-center w-full px-6 py-3 mt-8 rounded-xl font-semibold bg-[#1e1e28] text-[#e8e8f0] border border-[#2a2a36] hover:bg-[#252532] transition-all duration-200"
            >
              Back to sign in
            </Link>
          </div>
        )}
      </div>
    </AuthLayout>
  )
}
