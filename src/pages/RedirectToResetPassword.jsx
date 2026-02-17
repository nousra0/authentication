import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * If the reset-password email link lands on /login/reset-password (e.g. wrong Site URL in Supabase),
 * redirect to /reset-password and preserve the hash (tokens).
 */
export default function RedirectToResetPassword() {
  const navigate = useNavigate()
  useEffect(() => {
    const hash = window.location.hash || ''
    navigate(`/reset-password${hash}`, { replace: true })
  }, [navigate])
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f14]">
      <div className="w-10 h-10 border-2 border-[#4ecdc4]/50 border-t-[#4ecdc4] rounded-full animate-spin" />
    </div>
  )
}
