export default function Badge({ children, status = 'info' }) {
  const classes =
    status === 'success'
      ? 'bg-emerald-900 text-emerald-300'
      : status === 'critical'
        ? 'bg-red-900 text-red-200'
        : status === 'warning'
          ? 'bg-amber-900 text-amber-200'
          : 'bg-sky-900 text-sky-200'

  return <span className={`rounded px-2 py-1 text-xs font-semibold ${classes}`}>{children}</span>
}
