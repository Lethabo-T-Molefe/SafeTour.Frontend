import AppShell from '../components/layout/AppShell'
import RoutePlannerForm from '../features/routing/RoutePlannerForm'

export default function RoutePlannerPage() {
  return (
    <AppShell>
      <div className="space-y-3">
        <h1 className="text-xl font-semibold">Plan a safety-aware route</h1>
        <RoutePlannerForm />
      </div>
    </AppShell>
  )
}
