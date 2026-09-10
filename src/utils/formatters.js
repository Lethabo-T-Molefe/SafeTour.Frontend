/**
 * Pure formatting helpers for risk, route and itinerary values.
 */
import { RISK_BAND_LABELS } from '../constants/site'

export const formatRiskBand = (band) => RISK_BAND_LABELS[band] ?? band ?? 'Unknown'

export const formatRiskScore = (score) => (score == null ? '—' : `${Math.round(score * 100)}%`)

export const formatDistance = (metres) => {
  if (metres == null) return '—'
  return metres >= 1000 ? `${(metres / 1000).toFixed(1)} km` : `${Math.round(metres)} m`
}

export const formatDuration = (seconds) => {
  if (seconds == null) return '—'
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes} min`
  return `${Math.floor(minutes / 60)} h ${minutes % 60} min`
}

export const formatDataDate = (value) => (value ? value : 'no data yet')
