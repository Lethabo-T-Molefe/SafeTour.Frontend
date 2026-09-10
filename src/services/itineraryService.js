import { ENDPOINTS } from '../constants/api'
import { api } from '../lib'

export const generateItinerary = async ({ precinctId, interests, timeBand } = {}) => {
  const { data } = await api.post(ENDPOINTS.ITINERARIES.LIST, {
    precinct_id: precinctId,
    interests,
    time_band: timeBand,
  })
  return data
}

export const listMyItineraries = async () => {
  const { data } = await api.get(ENDPOINTS.ITINERARIES.LIST)
  return data
}

export const fetchItinerary = async (id) => {
  const { data } = await api.get(ENDPOINTS.ITINERARIES.BY_ID(id))
  return data
}

export const saveItinerary = async (id) => {
  const { data } = await api.put(ENDPOINTS.ITINERARIES.SAVE(id))
  return data
}
