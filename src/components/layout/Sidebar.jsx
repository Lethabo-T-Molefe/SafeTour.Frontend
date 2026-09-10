import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'

const NAV_ITEMS = [
  { label: 'Risk map', path: ROUTES.MAP },
  { label: 'Plan a route', path: ROUTES.ROUTE_PLANNER },
  { label: 'Itineraries', path: ROUTES.ITINERARIES },
  { label: 'Community reports', path: ROUTES.REPORTS },
  { label: 'Emergency', path: ROUTES.EMERGENCY },
  { label: 'Profile', path: ROUTES.PROFILE },
]

export default function Sidebar() {
  const location = useLocation()
  const { profile } = useAuth()
  const items = profile?.persona === 'administrator' ? [...NAV_ITEMS, { label: 'Admin', path: ROUTES.ADMIN }] : NAV_ITEMS

  return (
    <aside className="w-56 shrink-0 rounded-lg border border-slate-800 bg-slate-900 p-3">
      <ul className="space-y-1">
        {items.map((item) => {
          const active = location.pathname === item.path
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block rounded px-3 py-2 text-sm ${
                  active ? 'bg-emerald-900 text-emerald-200' : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
