import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AuthBrand from '../components/AuthBrand'
import Button from '../components/Button'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login', { replace: true })
  }

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'

  return (
    <div className="min-h-screen bg-[#0f0f14]">
      <header className="border-b border-[#2a2a36] bg-[#16161d]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <AuthBrand size="sm" />
          <div className="ml-auto shrink-0">
            <Button variant="ghost" type="button" onClick={handleSignOut} className="w-auto! min-w-0">
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Welcome back, {displayName}
          </h1>
          <p className="mt-2 text-[#6b6b7b]">You're signed in. Here's your dashboard.</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <section className="rounded-2xl border border-[#2a2a36] bg-[#16161d]/60 p-6">
              <h2 className="text-lg font-medium text-white">Your account</h2>
              <p className="mt-2 text-sm text-[#a0a0b0]">
                Signed in as <span className="text-[#e8e8f0]">{user?.email}</span>
              </p>
              <p className="mt-1 text-xs text-[#6b6b7b]">
                Email confirmed at {user?.email_confirmed_at ? new Date(user.email_confirmed_at).toLocaleDateString() : '—'}
              </p>
            </section>
          </div>

          <div className="mt-10 rounded-2xl border border-[#2a2a36] bg-[#16161d]/40 p-8 text-center">
            <p className="text-[#a0a0b0]">
              This is a protected page. Only signed-in users can see it.
            </p>
            <p className="mt-2 text-sm text-[#6b6b7b]">
              You completed the full flow: sign up → confirm email → sign in → dashboard.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
