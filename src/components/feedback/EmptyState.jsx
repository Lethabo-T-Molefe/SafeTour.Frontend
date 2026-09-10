export default function EmptyState({ title, description }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-700 p-5 text-slate-300">
      <h3 className="text-sm font-semibold">{title}</h3>
      {description && <p className="mt-1 text-xs text-slate-400">{description}</p>}
    </div>
  )
}
