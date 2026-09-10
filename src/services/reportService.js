import { ENDPOINTS } from '../constants/api'
import { api } from '../lib'

export const submitReport = async ({ unitId, reportType, description }) => {
  const { data } = await api.post(ENDPOINTS.REPORTS.SUBMIT, { unit_id: unitId, report_type: reportType, description })
  return data
}

export const listReports = async (unitId) => {
  const { data } = await api.get(ENDPOINTS.REPORTS.LIST, { params: { unit_id: unitId } })
  return data
}

export const confirmReport = async (id) => {
  const { data } = await api.post(ENDPOINTS.REPORTS.CONFIRM(id))
  return data
}
