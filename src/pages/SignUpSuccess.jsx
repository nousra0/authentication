import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import AuthBrand from '../components/AuthBrand'
import Button from '../components/Button'

export default function SignUpSuccess() {
  return (
    <AuthLayout>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
        <AuthBrand className="justify-center mb-8" />
        <div className="w-20 h-20 rounded-2xl bg-[#4ecdc4]/10 border border-[#4ecdc4]/30 flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-[#4ecdc4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold text-white tracking-tight">Congratulations!</h1>
        <p className="mt-4 text-[#a0a0b0] text-lg leading-relaxed max-w-sm mx-auto">
          Your account has been created. We've sent a confirmation link to your email — click it to verify your account. You won't be able to sign in until you've confirmed.
        </p>
        <p className="mt-6 text-[#6b6b7b] text-sm">
          Didn't receive the email? Check your spam folder or try signing up again.
        </p>
        <Link to="/login" className="block mt-8">
          <Button className="w-full">Go to sign in</Button>
        </Link>
      </div>
    </AuthLayout>
  )
}
