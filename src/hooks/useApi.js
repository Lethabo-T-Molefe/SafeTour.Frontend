/**
 * Generic async hook wrapper for loading/data/error lifecycle.
 */
import { useCallback, useState } from 'react'

export const useApi = (requestFn) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const run = useCallback(
    async (...args) => {
      setLoading(true)
      setError(null)
      try {
        const response = await requestFn(...args)
        setData(response)
        return response
      } catch (requestError) {
        setError(requestError)
        throw requestError
      } finally {
        setLoading(false)
      }
    },
    [requestFn]
  )

  return { data, loading, error, run }
}
