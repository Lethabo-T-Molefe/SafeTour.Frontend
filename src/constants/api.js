/**
 * Central API endpoint definitions, mirroring the backend's /api/v1 routes
 * (see SafeTour.Backend README's "API surface" table).
 */

export const ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
  USERS: {
    ME: '/users/me',
    PREFERENCES: '/users/me/preferences',
    EXPORT: '/users/me/export',
  },
  GEO: {
    PRECINCTS: '/geo/precincts',
    PRECINCT_BY_ID: (id) => `/geo/precincts/${id}`,
    ATTRACTIONS: '/geo/attractions',
  },
  RISK: {
    LOOKUP: '/risk',
    HEATMAP: '/risk/heatmap',
  },
  ROUTES: {
    PLAN: '/routes',
  },
  ITINERARIES: {
    LIST: '/itineraries',
    BY_ID: (id) => `/itineraries/${id}`,
    SAVE: (id) => `/itineraries/${id}/save`,
  },
  ASSISTANT: {
    PLAN: '/assistant/plan',
  },
  REPORTS: {
    LIST: '/reports',
    SUBMIT: '/reports',
    CONFIRM: (id) => `/reports/${id}/confirm`,
  },
  EMERGENCY: {
    QUICK_HELP: '/emergency/quick-help',
    START_TRIP: '/trips',
    SHARE_TRIP: (tripId) => `/trips/${tripId}/share`,
    CHECKIN: (tripId) => `/trips/${tripId}/checkin`,
    CONFIRM_CHECKIN: (checkinId) => `/checkins/${checkinId}/confirm`,
    CHECKIN_STATUS: (checkinId) => `/checkins/${checkinId}/status`,
    COMPANION_MODE: '/trips/companion',
  },
  NOTIFICATIONS: {
    SUBSCRIBE: '/notifications/subscribe',
    PREFERENCES: '/notifications/preferences',
  },
  FEEDBACK: {
    SUBMIT: '/feedback',
  },
  ADMIN: {
    INGEST: '/admin/ingest',
    RETRAIN: '/admin/retrain',
    RECORD_EVALUATION: (versionId) => `/admin/models/${versionId}/evaluation`,
    RECORD_BIAS_AUDIT: (versionId) => `/admin/models/${versionId}/bias-audit`,
    PROMOTE: (versionId) => `/admin/models/${versionId}/promote`,
    PENDING_REPORTS: '/admin/reports/pending',
    MODERATE_REPORT: (reportId) => `/admin/reports/${reportId}/moderate`,
    AUDIT_LOG: '/admin/audit-log',
    PURGE_EXPIRED: '/admin/purge-expired',
  },
}
