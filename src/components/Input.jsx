export default function Input({ label, type = 'text', name, placeholder, autoComplete, error, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-[#e8e8f0]">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`
          w-full px-4 py-3 rounded-xl border bg-[#16161d]/80 text-[#e8e8f0] placeholder-[#6b6b7b]
          focus:outline-none focus:ring-2 focus:ring-[#4ecdc4]/50 focus:border-[#4ecdc4]/50
          transition-all duration-200
          ${error ? 'border-[#ff6b6b]/60' : 'border-[#2a2a36]'}
        `}
        {...props}
      />
      {error && <p className="text-sm text-[#ff6b6b]">{error}</p>}
    </div>
  )
}
