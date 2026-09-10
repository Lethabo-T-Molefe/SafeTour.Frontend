import { useApi } from '../../hooks/useApi'
import * as riskService from '../../services/riskService'

export const useRiskLookup = () => useApi(riskService.fetchRisk)
export const useHeatmap = () => useApi(riskService.fetchHeatmap)
