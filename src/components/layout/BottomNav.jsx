import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../../constants/site'
import { NAV_ICONS } from '../ui/icons'

// Native-app-style tab bar for phones (hidden from md up, where the Sidebar
// rail/column takes over). Fixed to the viewport bottom for one-thumb reach;
// Emergency is tinted red at rest so it stays instantly findable, matching
// FR-EMG-1's "one interaction" intent even when it isn't the active tab.
export default function BottomNav() {
  const location = useLocation()

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-slate-800 bg-slate-900/95 backdrop-blur md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {NAV_LINKS.map((item) => {
        const Icon = NAV_ICONS[item.icon]
        const active = location.pathname === item.path
        const isEmergency = item.path === '/emergency'
        const colorClass = active
          ? isEmergency
            ? 'text-red-400'
            : 'text-emerald-400'
          : isEmergency
            ? 'text-red-500/80'
            : 'text-slate-400'

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] leading-tight ${colorClass}`}
          >
            <Icon className="h-5 w-5" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
