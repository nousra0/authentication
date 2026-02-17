import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Supabase sometimes redirects to /login/auth/callback (e.g. when Site URL ends with /login).
 * Redirect to /auth/callback and preserve the hash (tokens) so the real callback can run.
 */
export default function RedirectToAuthCallback() {
  const navigate = useNavigate()
  useEffect(() => {
    const hash = window.location.hash || ''
    navigate(`/auth/callback${hash}`, { replace: true })
  }, [navigate])
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f14]">
      <div className="w-10 h-10 border-2 border-[#4ecdc4]/50 border-t-[#4ecdc4] rounded-full animate-spin" />
    </div>
  )
}
