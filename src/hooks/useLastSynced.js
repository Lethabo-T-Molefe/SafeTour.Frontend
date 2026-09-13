import { useCallback, useState } from 'react'
import { isStale } from '../utils/dateHelpers'

const keyFor = (name) => `safetour_last_synced_${name}`

const readStored = (name) => {
  try {
    return localStorage.getItem(keyFor(name))
  } catch {
    return null
  }
}

// FR-LOC-2's "offline cache with a staleness notice": remembers when a page
// last successfully loaded live data, so it can tell the difference between
// "current" and "showing what we had before we went offline."
export const useLastSynced = (name, staleAfterMinutes = 15) => {
  const [lastSyncedAt, setLastSyncedAt] = useState(() => readStored(name))

  const markSynced = useCallback(() => {
    const now = new Date().toISOString()
    try {
      localStorage.setItem(keyFor(name), now)
    } catch {
      // Private browsing / storage disabled — the notice just won't
      // persist across reloads, which is not fatal.
    }
    setLastSyncedAt(now)
  }, [name])

  return { lastSyncedAt, stale: isStale(lastSyncedAt, staleAfterMinutes), markSynced }
}
