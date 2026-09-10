import { ENDPOINTS } from '../constants/api'
import { api } from '../lib'

export const planRoutes = async ({ originLon, originLat, destinationLon, destinationLat, mode, timeBand }) => {
  const { data } = await api.post(ENDPOINTS.ROUTES.PLAN, {
    origin_lon: originLon,
    origin_lat: originLat,
    destination_lon: destinationLon,
    destination_lat: destinationLat,
    mode,
    time_band: timeBand,
  })
  return data
}
