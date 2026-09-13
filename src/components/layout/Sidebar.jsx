import { Link, useLocation } from 'react-router-dom'
import { ADMIN_LINK, NAV_LINKS, PROFILE_LINK } from '../../constants/site'
import { useAuth } from '../../hooks/useAuth'
import { NAV_ICONS } from '../ui/icons'

// Desktop (lg+): full icon+label column. Tablet (md–lg): the same items
// collapse to a centred icon-only rail so the map/form content underneath
// keeps most of the screen. Phone: hidden entirely — BottomNav takes over.
export default function Sidebar() {
  const location = useLocation()
  const { profile } = useAuth()
  const items = profile?.persona === 'administrator' ? [...NAV_LINKS, PROFILE_LINK, ADMIN_LINK] : [...NAV_LINKS, PROFILE_LINK]

  return (
    <aside className="hidden shrink-0 md:block md:w-16 lg:w-56">
      <ul className="sticky top-4 space-y-1 rounded-lg border border-slate-800 bg-slate-900 p-2 lg:p-3">
        {items.map((item) => {
          const Icon = NAV_ICONS[item.icon]
          const active = location.pathname === item.path
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                title={item.label}
                aria-label={item.label}
                className={`flex items-center justify-center gap-3 rounded px-2 py-2.5 text-sm lg:justify-start lg:px-3 ${
                  active ? 'bg-emerald-900 text-emerald-200' : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="hidden lg:inline">{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
