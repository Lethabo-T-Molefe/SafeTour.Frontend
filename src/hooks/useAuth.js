/**
 * Wires authService into the global store so any component can read
 * isAuthenticated / email and trigger login, register or logout.
 */
import { useCallback } from 'react'
import * as authService from '../services/authService'
import { useStore } from '../store'

export const useAuth = () => {
  const { state, dispatch } = useStore()

  const login = useCallback(
    async (email, password) => {
      await authService.login({ email, password })
      dispatch({ type: 'auth/loggedIn', payload: { email } })
    },
    [dispatch]
  )

  const register = useCallback(async (email, password, consent) => {
    await authService.register({ email, password, consent })
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    dispatch({ type: 'auth/loggedOut' })
  }, [dispatch])

  return { ...state.auth, login, register, logout }
}
