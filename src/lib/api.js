/**
 * Axios API client for SafeTour AI Sentinel.
 *
 * Attaches the short-lived access token to every request and, on a 401,
 * makes one attempt to trade the rotating refresh token for a new pair
 * before retrying the original request (matching the backend's
 * access+refresh token design, FR-AUTH-2 / NFR-SEC-2).
 */

import axios from 'axios'
import { ENDPOINTS } from '../constants/api'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api/v1'

const ACCESS_TOKEN_KEY = 'safetour_access_token'
const REFRESH_TOKEN_KEY = 'safetour_refresh_token'

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY)
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY)

export const setTokens = ({ access_token, refresh_token }) => {
  if (access_token) localStorage.setItem(ACCESS_TOKEN_KEY, access_token)
  if (refresh_token) localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token)
}

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let refreshPromise = null

const refreshTokens = async () => {
  const refreshToken = getRefreshToken()
  if (!refreshToken) throw new Error('No refresh token available')
  const { data } = await axios.post(`${API_BASE_URL}${ENDPOINTS.AUTH.REFRESH}`, {
    refresh_token: refreshToken,
  })
  setTokens(data)
  return data
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error
    if (response?.status !== 401 || config._retried || config.url?.includes(ENDPOINTS.AUTH.REFRESH)) {
      return Promise.reject(error)
    }
    config._retried = true
    try {
      refreshPromise ??= refreshTokens().finally(() => {
        refreshPromise = null
      })
      await refreshPromise
      return api(config)
    } catch (refreshError) {
      clearTokens()
      return Promise.reject(refreshError)
    }
  }
)
