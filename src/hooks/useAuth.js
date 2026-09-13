/**
 * Wires authService into the global store so any component can read
 * isAuthenticated / email and trigger login, register or logout.
 */
import { useCallback } from 'react'
import * as authService from '../services/authService'
import * as profileService from '../services/profileService'
import { useStore } from '../store'

export const useAuth = () => {
  const { state, dispatch } = useStore()

  // Populates state.auth.profile (persona etc.) so nav chrome that depends
  // on it — the admin sidebar/rail entry and the mobile admin shortcut —
  // actually has something to read instead of staying null forever.
  const loadProfile = useCallback(async () => {
    const profile = await profileService.fetchMyProfile()
    dispatch({ type: 'auth/profileLoaded', payload: profile })
    return profile
  }, [dispatch])

  const login = useCallback(
    async (email, password) => {
      await authService.login({ email, password })
      dispatch({ type: 'auth/loggedIn', payload: { email } })
      await loadProfile().catch(() => {})
    },
    [dispatch, loadProfile]
  )

  const register = useCallback(async (email, password, consent) => {
    await authService.register({ email, password, consent })
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    dispatch({ type: 'auth/loggedOut' })
  }, [dispatch])

  return { ...state.auth, login, register, logout, loadProfile }
}
