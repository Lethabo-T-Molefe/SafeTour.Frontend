/**
 * Pure validation helpers for forms.
 */

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

export const validateEmail = (value) => EMAIL_RE.test(String(value ?? '').trim())

// Mirrors the backend's FR-AUTH-1 minimum (at least ten characters).
export const validatePassword = (value) => String(value ?? '').length >= 10

export const validateLonLat = (lon, lat) =>
  Number.isFinite(lon) && Number.isFinite(lat) && lon >= -180 && lon <= 180 && lat >= -90 && lat <= 90

export const validateRating = (value) => Number.isInteger(value) && value >= 1 && value <= 5
