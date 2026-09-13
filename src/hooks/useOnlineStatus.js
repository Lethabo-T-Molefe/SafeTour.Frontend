import { useEffect, useState } from 'react'

// FR-LOC-2: the app must know when it has fallen back to cached data
// (see vite.config.js's NetworkFirst runtime caching) so it can show a
// staleness notice instead of presenting stale data as current.
export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(typeof navigator === 'undefined' ? true : navigator.onLine)

  useEffect(() => {
    const goOnline = () => setIsOnline(true)
    const goOffline = () => setIsOnline(false)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  return isOnline
}
