import RiskBadge from '../risk/RiskBadge'
import { formatDataDate } from '../../utils/formatters'

export default function ItineraryStopList({ stops }) {
  if (stops.length === 0) {
    return <p className="text-sm text-slate-400">No stops yet.</p>
  }

  return (
    <ol className="space-y-2">
      {stops.map((stop) => (
        <li key={stop.attraction_id} className="rounded-lg border border-slate-800 bg-slate-900 p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-slate-100">Stop {stop.order_index + 1}</span>
            <RiskBadge band={stop.risk_band} />
          </div>
          <p className="mt-1 text-xs text-slate-400">{stop.rationale}</p>
          <p className="mt-1 text-xs text-slate-500">{formatDataDate(stop.data_date)}</p>
        </li>
      ))}
    </ol>
  )
}
