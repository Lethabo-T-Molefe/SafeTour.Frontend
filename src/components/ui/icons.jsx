/**
 * Small inline stroke-icon set for the adaptive nav chrome (bottom tab bar
 * on phones, icon rail on tablets, icon+label sidebar on desktop). Kept as
 * plain SVG rather than an icon library dependency — there are only a
 * handful of nav destinations.
 */

const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

export function MapIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <polygon points="3 6 9 4 15 6 21 4 21 18 15 20 9 18 3 20 3 6" />
      <line x1="9" y1="4" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="20" />
    </svg>
  )
}

export function RouteIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="6" r="2.2" />
      <path d="M6.8 16.5 14 8.5" />
      <path d="M14 8.5h4.2" />
      <path d="M18.2 8.5V4.3" />
    </svg>
  )
}

export function ItineraryIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3.5" y="4.5" width="17" height="16" rx="2" />
      <line x1="3.5" y1="9.5" x2="20.5" y2="9.5" />
      <line x1="7.5" y1="2.5" x2="7.5" y2="6.5" />
      <line x1="16.5" y1="2.5" x2="16.5" y2="6.5" />
      <line x1="7.5" y1="13.5" x2="13" y2="13.5" />
      <line x1="7.5" y1="17" x2="11" y2="17" />
    </svg>
  )
}

export function ReportIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 21V4" />
      <path d="M5 4.5c1.4-1 3-1 4.5 0s3.1 1 4.5 0 3-1 4.5 0v9c-1.5-1-3-1-4.5 0s-3.1 1-4.5 0-3.1-1-4.5 0" />
    </svg>
  )
}

export function EmergencyIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 3 2.5 20h19L12 3Z" />
      <line x1="12" y1="9.5" x2="12" y2="14" />
      <circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function ProfileIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.4-3.6 4.3-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
    </svg>
  )
}

export function AdminIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 3.5 19 6v5.5c0 4.2-2.9 7.4-7 9-4.1-1.6-7-4.8-7-9V6l7-2.5Z" />
      <path d="M9 12l2 2 4-4.2" />
    </svg>
  )
}

export function MenuIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  )
}

export function CloseIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  )
}

export const NAV_ICONS = {
  map: MapIcon,
  route: RouteIcon,
  itinerary: ItineraryIcon,
  report: ReportIcon,
  emergency: EmergencyIcon,
  profile: ProfileIcon,
  admin: AdminIcon,
}
