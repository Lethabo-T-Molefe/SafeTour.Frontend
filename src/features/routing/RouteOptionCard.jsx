import Card from '../../components/ui/Card'
import { formatDistance, formatDuration } from '../../utils/formatters'
import RiskBadge from '../risk/RiskBadge'

export default function RouteOptionCard({ option }) {
  return (
    <Card title={option.label === 'lower_risk' ? 'Lower-risk option' : 'Fastest option'}>
      <div className="mb-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
        <span>{formatDistance(option.total_distance_m)}</span>
        <span>{formatDuration(option.total_duration_s)}</span>
        <RiskBadge band={option.overall_risk_band} />
      </div>
      <p className="mb-3 text-xs text-slate-400">{option.rationale}</p>
      <ol className="space-y-1.5">
        {option.legs.map((leg, index) => (
          <li key={index} className="flex items-center justify-between gap-2 rounded bg-slate-800/60 px-2 py-1.5 text-xs">
            <span className="text-slate-300">
              {index + 1}. {leg.mode.replace('_', ' ')} · {formatDistance(leg.distance_m)}
              {leg.is_flagged_high_risk && <span className="ml-2 text-red-300">⚠ flagged</span>}
            </span>
            <RiskBadge band={leg.risk_band} />
          </li>
        ))}
      </ol>
    </Card>
  )
}
