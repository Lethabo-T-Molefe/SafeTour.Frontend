export default function Alert({ message, severity = 'info' }) {
  const tone =
    severity === 'critical'
      ? 'border-red-700 bg-red-950 text-red-200'
      : severity === 'warning'
        ? 'border-amber-600 bg-amber-950 text-amber-200'
        : 'border-sky-700 bg-sky-950 text-sky-200'

  return <div className={`rounded border px-3 py-2 text-sm ${tone}`}>{message}</div>
}
