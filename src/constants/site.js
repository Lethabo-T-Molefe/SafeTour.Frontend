/**
 * Site copy and nav config for SafeTour AI Sentinel.
 */

export const SITE = {
  name: 'SafeTour AI Sentinel',
  shortName: 'SafeTour',
  tagline: 'Move and plan with a clearer sense of relative safety.',
  copyright: `© ${new Date().getFullYear()} SafeTour AI Sentinel. Guidance is relative and advisory — it is never a safety guarantee.`,
}

// Single source of truth for primary nav — used by the desktop sidebar, the
// tablet icon rail and the phone bottom-tab bar so the three device-specific
// chrome variants can never drift out of sync with each other.
export const NAV_LINKS = [
  { label: 'Map', path: '/map', icon: 'map' },
  { label: 'Routes', path: '/routes', icon: 'route' },
  { label: 'Itineraries', path: '/itineraries', icon: 'itinerary' },
  { label: 'Reports', path: '/reports', icon: 'report' },
  { label: 'Emergency', path: '/emergency', icon: 'emergency' },
]

export const PROFILE_LINK = { label: 'Profile', path: '/profile', icon: 'profile' }
export const ADMIN_LINK = { label: 'Admin', path: '/admin', icon: 'admin' }

export const PERSONAS = [
  { value: 'commuter', label: 'Commuter' },
  { value: 'at_risk_individual', label: 'At-risk individual' },
  { value: 'domestic_traveller', label: 'Domestic traveller' },
  { value: 'informal_trader', label: 'Informal trader' },
  { value: 'gig_worker', label: 'Gig worker' },
  { value: 'newcomer_student', label: 'Newcomer or student' },
  { value: 'inbound_visitor', label: 'Inbound visitor' },
  { value: 'administrator', label: 'Administrator' },
]

// FR-LOC-1: matches the backend's SUPPORTED_LANGUAGES. Only English strings
// are actually translated anywhere in this UI today — selecting another
// language here records the *preference* (used by /assistant/plan and any
// future translated UI) without pretending the interface is translated yet.
export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'af', label: 'Afrikaans' },
  { value: 'zu', label: 'isiZulu' },
  { value: 'xh', label: 'isiXhosa' },
  { value: 'st', label: 'Sesotho' },
  { value: 'tn', label: 'Setswana' },
]

export const TRANSPORT_MODES = [
  { value: 'walking', label: 'Walking' },
  { value: 'minibus_taxi', label: 'Minibus taxi' },
  { value: 'bus_rapid_transit', label: 'Bus rapid transit' },
  { value: 'rail', label: 'Rail' },
  { value: 'e_hailing', label: 'E-hailing' },
]

export const RISK_BAND_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  insufficient_data: 'Insufficient data',
}

// NFR-USE-3: risk bands must be distinguishable without relying on colour
// alone, so every band pairs a colour with a distinct symbol.
export const RISK_BAND_STYLES = {
  low: { color: '#16a34a', symbol: '●', textClass: 'text-emerald-300', bgClass: 'bg-emerald-950' },
  medium: { color: '#d97706', symbol: '▲', textClass: 'text-amber-300', bgClass: 'bg-amber-950' },
  high: { color: '#dc2626', symbol: '■', textClass: 'text-red-300', bgClass: 'bg-red-950' },
  insufficient_data: { color: '#6b7280', symbol: '?', textClass: 'text-slate-300', bgClass: 'bg-slate-800' },
}

export const DEFAULT_MAP_CENTER = { lat: -25.7461, lon: 28.1881 } // Tshwane pilot area
