import { Link } from 'react-router-dom'
import CurvedLoop from '../components/CurvedLoop'
import BottomNav from '../components/layout/BottomNav'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { ROUTES } from '../constants/routes'
import { SITE } from '../constants/site'
import { useAuth } from '../hooks/useAuth'

export default function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <Navbar />
      <div className="flex-1">
        <CurvedLoop marqueeText={`${SITE.tagline} `} speed={2} />
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 pb-16 sm:px-6">
          <h1 className="text-2xl font-bold sm:text-3xl">Welcome to {SITE.name}</h1>
          <p className="max-w-2xl text-sm text-slate-300">
            {SITE.name} joins official crime data, contextual signals and moderated community reports into
            relative risk estimates for South Africa — used for safety-aware routing, itinerary planning and
            everyday safety features. Guidance is always relative and advisory; it never states that a place
            is safe.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to={ROUTES.MAP} className="rounded bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-700">
              Explore the risk map
            </Link>
            {!isAuthenticated && (
              <Link to={ROUTES.REGISTER} className="rounded bg-slate-800 px-4 py-2 text-sm font-semibold hover:bg-slate-700">
                Create an account
              </Link>
            )}
            <Link to={ROUTES.EMERGENCY} className="rounded bg-red-700 px-4 py-2 text-sm font-semibold hover:bg-red-600">
              Emergency help
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      <BottomNav />
    </div>
  )
}
