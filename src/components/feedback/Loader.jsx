export default function Loader({ label = 'Loading…' }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-300">
      <span className="h-3 w-3 animate-pulse rounded-full bg-emerald-500" />
      <span>{label}</span>
    </div>
  )
}
