import { ENDPOINTS } from '../constants/api'
import { api } from '../lib'

export const fetchQuickHelp = async ({ lon, lat }) => {
  const { data } = await api.get(ENDPOINTS.EMERGENCY.QUICK_HELP, { params: { lon, lat } })
  return data
}

export const startTrip = async (payload) => {
  const { data } = await api.post(ENDPOINTS.EMERGENCY.START_TRIP, payload)
  return data
}

export const shareTrip = async (tripId, payload) => {
  const { data } = await api.post(ENDPOINTS.EMERGENCY.SHARE_TRIP(tripId), payload)
  return data
}

export const setCheckin = async (tripId, payload) => {
  const { data } = await api.post(ENDPOINTS.EMERGENCY.CHECKIN(tripId), payload)
  return data
}

export const confirmCheckin = async (checkinId) => {
  const { data } = await api.post(ENDPOINTS.EMERGENCY.CONFIRM_CHECKIN(checkinId))
  return data
}

export const fetchCheckinStatus = async (checkinId) => {
  const { data } = await api.get(ENDPOINTS.EMERGENCY.CHECKIN_STATUS(checkinId))
  return data
}

export const startCompanionMode = async (payload) => {
  const { data } = await api.post(ENDPOINTS.EMERGENCY.COMPANION_MODE, payload)
  return data
}
