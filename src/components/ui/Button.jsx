export default function Button({ children, onClick, variant = 'primary', type = 'button', disabled = false }) {
  const variantClass =
    variant === 'danger'
      ? 'bg-red-600 hover:bg-red-700'
      : variant === 'ghost'
        ? 'bg-transparent border border-slate-500 hover:bg-slate-800'
        : 'bg-emerald-600 hover:bg-emerald-700'

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 ${variantClass}`}
    >
      {children}
    </button>
  )
}
