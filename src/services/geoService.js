import { ENDPOINTS } from '../constants/api'
import { api } from '../lib'

export const fetchPrecincts = async () => {
  const { data } = await api.get(ENDPOINTS.GEO.PRECINCTS)
  return data
}

export const fetchAttractions = async ({ precinctId, category, nearLon, nearLat, radiusM } = {}) => {
  const { data } = await api.get(ENDPOINTS.GEO.ATTRACTIONS, {
    params: { precinct_id: precinctId, category, near_lon: nearLon, near_lat: nearLat, radius_m: radiusM },
  })
  return data
}
