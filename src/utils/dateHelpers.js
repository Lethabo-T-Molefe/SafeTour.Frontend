/**
 * Date/time helpers for time-band resolution and staleness notices
 * (FR-LOC-2: an offline cache must carry a staleness notice).
 */

export const resolveTimeBand = (date = new Date()) => {
  const hour = date.getHours()
  if (hour >= 6 && hour < 10) return 'morning'
  if (hour >= 10 && hour < 16) return 'midday'
  if (hour >= 16 && hour < 20) return 'evening'
  return 'night'
}

export const formatTimestamp = (iso) => (iso ? new Date(iso).toLocaleString() : '—')

export const minutesSince = (iso) => (iso ? Math.round((Date.now() - new Date(iso).getTime()) / 60000) : null)

export const isStale = (iso, staleAfterMinutes = 15) => {
  const minutes = minutesSince(iso)
  return minutes == null ? false : minutes > staleAfterMinutes
}
