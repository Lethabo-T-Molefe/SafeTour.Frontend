/**
 * Lightweight global store: React context + useReducer, combining the auth
 * and toast slices. No Redux/Zustand dependency is installed, so this stays
 * the shared pattern until one is added.
 */
import { createContext, useContext, useMemo, useReducer } from 'react'
import { authInitialState, authReducer } from './slices/authSlice'
import { toastInitialState, toastReducer } from './slices/toastSlice'
import { getAccessToken } from '../lib'

const StoreContext = createContext(null)

const rootInitialState = {
  auth: { ...authInitialState, isAuthenticated: Boolean(getAccessToken()) },
  toast: toastInitialState,
}

const rootReducer = (state, action) => ({
  auth: authReducer(state.auth, action),
  toast: toastReducer(state.toast, action),
})

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, rootInitialState)
  const value = useMemo(() => ({ state, dispatch }), [state])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used within StoreProvider')
  return context
}
