import { ENDPOINTS } from '../constants/api'
import { api } from '../lib'

export const askAssistant = async ({ message, precinctId, timeBand }) => {
  const { data } = await api.post(ENDPOINTS.ASSISTANT.PLAN, { message, precinct_id: precinctId, time_band: timeBand })
  return data
}
