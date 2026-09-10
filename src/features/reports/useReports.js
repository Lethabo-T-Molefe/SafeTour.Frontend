import { useApi } from '../../hooks/useApi'
import * as reportService from '../../services/reportService'

export const useSubmitReport = () => useApi(reportService.submitReport)
export const useReportsList = () => useApi(reportService.listReports)
export const useConfirmReport = () => useApi(reportService.confirmReport)
