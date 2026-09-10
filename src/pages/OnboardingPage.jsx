import { useNavigate } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import Button from '../components/ui/Button'
import ProfileForm from '../features/profile/ProfileForm'
import { ROUTES } from '../constants/routes'

export default function OnboardingPage() {
  const navigate = useNavigate()

  return (
    <AppShell withSidebar={false}>
      <div className="mx-auto max-w-lg space-y-4">
        <h1 className="text-xl font-semibold">Set up your persona</h1>
        <p className="text-sm text-slate-400">
          This shapes how risk and recommendations are presented to you (FR-AUTH-3/4).
        </p>
        <ProfileForm />
        <Button onClick={() => navigate(ROUTES.MAP)}>Continue to the risk map</Button>
      </div>
    </AppShell>
  )
}
