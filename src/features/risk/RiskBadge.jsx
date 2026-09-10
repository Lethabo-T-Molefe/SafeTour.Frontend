import { RISK_BAND_STYLES } from '../../constants/site'
import { formatRiskBand } from '../../utils/formatters'

// NFR-USE-3: risk bands must be distinguishable without relying on colour
// alone, so every badge pairs a colour with a distinct symbol and label.
export default function RiskBadge({ band, score }) {
  const style = RISK_BAND_STYLES[band] ?? RISK_BAND_STYLES.insufficient_data

  return (
    <span className={`inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs font-semibold ${style.bgClass} ${style.textClass}`}>
      <span aria-hidden="true">{style.symbol}</span>
      <span>{formatRiskBand(band)}</span>
      {score != null && <span className="opacity-70">({Math.round(score * 100)}%)</span>}
    </span>
  )
}
