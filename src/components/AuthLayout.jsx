import { Link } from 'react-router-dom'

export default function AuthLayout({ children, linkTo, linkText }) {
  return (
    <div className="min-h-screen flex">
      {/* Left: decorative gradient + pattern */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[50%] relative overflow-hidden bg-[#0f0f14]">
        <div className="absolute inset-0 bg-linear-to-br from-[#1a1a24] via-[#16161d] to-[#0f0f14]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#ff6b6b]/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#4ecdc4]/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="relative z-10 flex flex-col justify-center px-16">
          <span className="font-mono text-sm tracking-widest text-[#4ecdc4]/80 uppercase">Welcome</span>
          <h2 className="mt-2 text-3xl xl:text-4xl font-semibold text-white/95 tracking-tight max-w-sm">
            Build something that matters.
          </h2>
          <p className="mt-4 text-[#a0a0b0] text-lg max-w-md leading-relaxed">
            Sign in to your account or create a new one to get started. Your journey begins here.
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 bg-[#0f0f14]">
        <div className="w-full max-w-md mx-auto">
          {children}
          {linkTo && linkText && (
            <p className="mt-8 text-center text-[#6b6b7b] text-sm">
              <Link to={linkTo} className="text-[#4ecdc4] hover:text-[#5ee7de] transition-colors font-medium">
                {linkText}
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
