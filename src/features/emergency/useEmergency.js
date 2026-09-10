import { useApi } from '../../hooks/useApi'
import * as emergencyService from '../../services/emergencyService'

export const useQuickHelp = () => useApi(emergencyService.fetchQuickHelp)
export const useCompanionMode = () => useApi(emergencyService.startCompanionMode)
export const useConfirmCheckin = () => useApi(emergencyService.confirmCheckin)
export const useCheckinStatus = () => useApi(emergencyService.fetchCheckinStatus)
