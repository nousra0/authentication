export default function Button({ children, variant = 'primary', type = 'button', className = '', disabled, ...props }) {
  const base = 'inline-flex items-center justify-center w-full px-6 py-3 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f0f14] disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-linear-to-r from-[#4ecdc4] to-[#44b5ad] text-[#0f0f14] hover:from-[#5ee7de] hover:to-[#4ecdc4] focus:ring-[#4ecdc4] shadow-lg shadow-[#4ecdc4]/20',
    secondary: 'bg-[#1e1e28] text-[#e8e8f0] border border-[#2a2a36] hover:bg-[#252532] focus:ring-[#4ecdc4]/50',
    ghost: 'text-[#a0a0b0] hover:text-[#e8e8f0] hover:bg-[#1e1e28] focus:ring-[#2a2a36]',
  }
  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
