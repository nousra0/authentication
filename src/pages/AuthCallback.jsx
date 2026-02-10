import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('Confirming...')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Supabase may need a moment to parse the session from the URL hash
        let { data: { session }, error } = await supabase.auth.getSession()
        if (!session && !error) {
          await new Promise((r) => setTimeout(r, 300))
          const next = await supabase.auth.getSession()
          session = next.data.session
          error = next.error
        }
        if (error) {
          setStatus('Something went wrong.')
          setTimeout(() => navigate('/login', { replace: true }), 2000)
          return
        }
        if (session?.user) {
          setStatus('Success! Redirecting...')
          navigate('/dashboard', { replace: true })
        } else {
          setStatus('Email confirmed! Redirecting to sign in...')
          navigate('/login?confirmed=1', { replace: true })
        }
      } catch {
        setStatus('Something went wrong.')
        setTimeout(() => navigate('/login', { replace: true }), 2000)
      }
    }

    handleCallback()
  }, [navigate])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f14] px-6">
      <div className="w-12 h-12 border-2 border-[#4ecdc4]/50 border-t-[#4ecdc4] rounded-full animate-spin mb-6" />
      <p className="text-[#e8e8f0] font-medium">{status}</p>
    </div>
  )
}
