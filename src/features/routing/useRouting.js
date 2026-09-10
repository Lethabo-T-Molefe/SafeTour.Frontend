import { useApi } from '../../hooks/useApi'
import * as routingService from '../../services/routingService'

export const useRoutePlanner = () => useApi(routingService.planRoutes)
