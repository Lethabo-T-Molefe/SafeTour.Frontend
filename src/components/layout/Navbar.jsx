import { Link, useNavigate } from 'react-router-dom'
import { NAV_LINKS, SITE } from '../../constants/site'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'

export default function Navbar() {
  const { isAuthenticated, email, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate(ROUTES.HOME)
  }

  return (
    <header className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to={ROUTES.HOME}>
          <p className="text-xs uppercase tracking-widest text-emerald-400">{SITE.shortName}</p>
          <p className="text-sm text-slate-300">AI Sentinel</p>
        </Link>

        <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
          {NAV_LINKS.map((link) => (
            <Link key={link.path} to={link.path} className="hover:text-emerald-400">
              {link.label}
            </Link>
          ))}
        </nav>

        {isAuthenticated ? (
          <div className="flex items-center gap-3 text-sm">
            <Link to={ROUTES.PROFILE} className="text-slate-300 hover:text-emerald-400">
              {email}
            </Link>
            <Button variant="ghost" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to={ROUTES.LOGIN} className="rounded px-3 py-2 text-sm text-slate-200 hover:bg-slate-800">
              Log in
            </Link>
            <Link to={ROUTES.REGISTER} className="rounded bg-emerald-600 px-3 py-2 text-sm font-semibold hover:bg-emerald-700">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
