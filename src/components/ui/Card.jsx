export default function Card({ title, children }) {
  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      {title && <h3 className="mb-2 text-sm font-semibold text-slate-300">{title}</h3>}
      <div className="text-sm text-slate-100">{children}</div>
    </section>
  )
}
