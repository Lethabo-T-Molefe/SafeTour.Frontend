import { useCallback } from 'react'
import { useStore } from '../store'

export const useToast = () => {
  const { dispatch } = useStore()

  return useCallback(
    (message, severity = 'info') => {
      dispatch({ type: 'toast/push', payload: { message, severity } })
    },
    [dispatch]
  )
}
