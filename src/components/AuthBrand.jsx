export default function AuthBrand({ size = 'md', className = '' }) {
  const isSm = size === 'sm'
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`bg-linear-to-br from-[#4ecdc4] to-[#44b5ad] flex items-center justify-center text-[#0f0f14] font-bold ${
          isSm ? 'w-9 h-9 rounded-lg text-base' : 'w-10 h-10 rounded-xl text-lg'
        }`}
      >
        A
      </div>
      <span className={isSm ? 'font-semibold text-white' : 'text-xl font-semibold text-white'}>
        Auth
      </span>
    </div>
  )
}
