import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const AuthContext = createContext(null)

const NOT_CONFIGURED_MSG =
  'Auth is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel (Project → Settings → Environment Variables), then redeploy.'

// Use VITE_APP_URL in production so confirmation/password-reset emails point to your deployed app, not localhost
function getAuthRedirectBase() {
  const envUrl = import.meta.env.VITE_APP_URL
  if (envUrl) return envUrl.replace(/\/$/, '') // trim trailing slash
  return typeof window !== 'undefined' ? window.location.origin : ''
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    if (!supabase) throw new Error(NOT_CONFIGURED_MSG)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  const signUp = async (email, password, options = {}) => {
    if (!supabase) throw new Error(NOT_CONFIGURED_MSG)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: options.userMetadata,
        emailRedirectTo: options.emailRedirectTo || `${getAuthRedirectBase()}/auth/callback`,
      },
    })
    if (error) throw error
    return data
  }

  const signOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  const resetPassword = async (email) => {
    if (!supabase) throw new Error(NOT_CONFIGURED_MSG)
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${getAuthRedirectBase()}/reset-password`,
    })
    if (error) throw error
    return data
  }

  const updatePassword = async (newPassword) => {
    if (!supabase) throw new Error(NOT_CONFIGURED_MSG)
    const { data, error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw error
    return data
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isConfigured: isSupabaseConfigured(),
        signIn,
        signUp,
        signOut,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
