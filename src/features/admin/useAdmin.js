import { useApi } from '../../hooks/useApi'
import * as adminService from '../../services/adminService'

export const useIngest = () => useApi(adminService.ingestCrimeStatistics)
export const useTriggerRetrain = () => useApi(adminService.triggerRetrain)
export const useRecordEvaluation = () => useApi(adminService.recordEvaluation)
export const useRecordBiasAudit = () => useApi(adminService.recordBiasAudit)
export const usePromoteModel = () => useApi(adminService.promoteModel)
export const usePendingReports = () => useApi(adminService.fetchPendingReports)
export const useModerateReport = () => useApi(adminService.moderateReport)
export const useAuditLog = () => useApi(adminService.fetchAuditLog)
export const usePurgeExpired = () => useApi(adminService.purgeExpiredData)
export const useSetPowerStatus = () => useApi(adminService.setPowerStatus)
