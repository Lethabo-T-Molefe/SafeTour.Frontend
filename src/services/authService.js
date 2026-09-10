import { ENDPOINTS } from '../constants/api'
import { api, clearTokens, setTokens } from '../lib'

export const register = async ({ email, password, consent }) => {
  const { data } = await api.post(ENDPOINTS.AUTH.REGISTER, { email, password, consent })
  return data
}

export const login = async ({ email, password }) => {
  const { data } = await api.post(ENDPOINTS.AUTH.LOGIN, { email, password })
  setTokens(data)
  return data
}

export const logout = async () => {
  try {
    await api.post(ENDPOINTS.AUTH.LOGOUT)
  } finally {
    clearTokens()
  }
}
