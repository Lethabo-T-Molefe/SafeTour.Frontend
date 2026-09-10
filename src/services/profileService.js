import { ENDPOINTS } from '../constants/api'
import { api } from '../lib'

export const fetchMyProfile = async () => {
  const { data } = await api.get(ENDPOINTS.USERS.ME)
  return data
}

export const updateMyPreferences = async (payload) => {
  const { data } = await api.put(ENDPOINTS.USERS.PREFERENCES, payload)
  return data
}

export const exportMyData = async () => {
  const { data } = await api.get(ENDPOINTS.USERS.EXPORT)
  return data
}

export const deleteMyAccount = async () => {
  await api.delete(ENDPOINTS.USERS.ME)
}
