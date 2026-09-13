import { Link, useNavigate } from 'react-router-dom'
import { SITE } from '../../constants/site'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'
import { AdminIcon, ProfileIcon } from '../ui/icons'

// Brand + account controls only — primary navigation lives in Sidebar
// (tablet/desktop) and BottomNav (phone), so it isn't duplicated here.
// Admin gets a shortcut here (rather than in BottomNav) since it's an
// account/management surface, not one of the five primary task flows.
export default function Navbar() {
  const { isAuthenticated, email, logout, profile } = useAuth()
  const navigate = useNavigate()
  const isAdmin = profile?.persona === 'administrator'

  const handleLogout = async () => {
    await logout()
    navigate(ROUTES.HOME)
  }

  return (
    <header className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2.5 sm:px-4 sm:py-3">
        <Link to={ROUTES.HOME} className="min-w-0">
          <p className="text-xs uppercase tracking-widest text-emerald-400">{SITE.shortName}</p>
          <p className="hidden text-sm text-slate-300 sm:block">AI Sentinel</p>
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-3 text-sm">
            {isAdmin && (
              <Link to={ROUTES.ADMIN} aria-label="Admin" title="Admin" className="text-slate-300 hover:text-emerald-400 md:hidden">
                <AdminIcon className="h-6 w-6" />
              </Link>
            )}
            <Link
              to={ROUTES.PROFILE}
              aria-label="Profile"
              className="flex items-center gap-2 text-slate-300 hover:text-emerald-400"
            >
              <ProfileIcon className="h-6 w-6 sm:hidden" />
              <span className="hidden sm:inline">{email}</span>
            </Link>
            <Button variant="ghost" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to={ROUTES.LOGIN} className="rounded px-2.5 py-2 text-sm text-slate-200 hover:bg-slate-800 sm:px-3">
              Log in
            </Link>
            <Link
              to={ROUTES.REGISTER}
              className="rounded bg-emerald-600 px-2.5 py-2 text-sm font-semibold hover:bg-emerald-700 sm:px-3"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
