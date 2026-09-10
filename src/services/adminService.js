import { ENDPOINTS } from '../constants/api'
import { api } from '../lib'

export const ingestCrimeStatistics = async ({ period, rows }) => {
  const { data } = await api.post(ENDPOINTS.ADMIN.INGEST, { period, rows })
  return data
}

export const triggerRetrain = async ({ label }) => {
  const { data } = await api.post(ENDPOINTS.ADMIN.RETRAIN, { label })
  return data
}

export const recordEvaluation = async (versionId, { rocAuc, prAuc, baseRate }) => {
  const { data } = await api.post(ENDPOINTS.ADMIN.RECORD_EVALUATION(versionId), {
    roc_auc: rocAuc,
    pr_auc: prAuc,
    base_rate: baseRate,
  })
  return data
}

export const recordBiasAudit = async (versionId, { passed, summary, findings }) => {
  const { data } = await api.post(ENDPOINTS.ADMIN.RECORD_BIAS_AUDIT(versionId), { passed, summary, findings })
  return data
}

export const promoteModel = async (versionId) => {
  const { data } = await api.post(ENDPOINTS.ADMIN.PROMOTE(versionId))
  return data
}

export const fetchPendingReports = async (limit = 50) => {
  const { data } = await api.get(ENDPOINTS.ADMIN.PENDING_REPORTS, { params: { limit } })
  return data
}

export const moderateReport = async (reportId, { approve }) => {
  const { data } = await api.post(ENDPOINTS.ADMIN.MODERATE_REPORT(reportId), { approve })
  return data
}

export const fetchAuditLog = async (limit = 100) => {
  const { data } = await api.get(ENDPOINTS.ADMIN.AUDIT_LOG, { params: { limit } })
  return data
}

export const purgeExpiredData = async () => {
  const { data } = await api.post(ENDPOINTS.ADMIN.PURGE_EXPIRED)
  return data
}
