import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import CheckInStatusPanel from '../features/emergency/CheckInStatusPanel'
import CompanionModeForm from '../features/emergency/CompanionModeForm'
import QuickHelpPanel from '../features/emergency/QuickHelpPanel'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../hooks/useAuth'

// Quick help works without an account — FR-EMG-1 is one interaction, not one
// after a login wall. Companion mode needs an account to hold the trip/share.
export default function EmergencyPage() {
  const [companion, setCompanion] = useState(null)
  const { isAuthenticated } = useAuth()

  return (
    <AppShell withSidebar={isAuthenticated}>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Emergency</h1>
        <QuickHelpPanel />
        {isAuthenticated ? (
          <>
            <CompanionModeForm onStarted={setCompanion} />
            {companion && <CheckInStatusPanel checkin={companion.checkin} />}
          </>
        ) : (
          <p className="text-sm text-slate-400">
            <Link to={ROUTES.LOGIN} className="text-emerald-400 hover:underline">
              Log in
            </Link>{' '}
            to use companion mode (live sharing and timed check-ins).
          </p>
        )}
      </div>
    </AppShell>
  )
}
