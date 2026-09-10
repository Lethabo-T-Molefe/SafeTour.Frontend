import { ENDPOINTS } from '../constants/api'
import { api } from '../lib'

export const fetchRisk = async ({ lon, lat, timeBand }) => {
  const { data } = await api.get(ENDPOINTS.RISK.LOOKUP, { params: { lon, lat, time_band: timeBand } })
  return data
}

export const fetchHeatmap = async ({ timeBand } = {}) => {
  const { data } = await api.get(ENDPOINTS.RISK.HEATMAP, { params: { time_band: timeBand } })
  return data
}
