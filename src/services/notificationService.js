import { ENDPOINTS } from '../constants/api'
import { api } from '../lib'

export const subscribeToPush = async ({ endpoint, keys }) => {
  await api.post(ENDPOINTS.NOTIFICATIONS.SUBSCRIBE, { endpoint, keys })
}

export const fetchAlertPreferences = async () => {
  const { data } = await api.get(ENDPOINTS.NOTIFICATIONS.PREFERENCES)
  return data
}

export const updateAlertPreferences = async ({ nonSafetyOptIn }) => {
  const { data } = await api.put(ENDPOINTS.NOTIFICATIONS.PREFERENCES, { non_safety_opt_in: nonSafetyOptIn })
  return data
}
