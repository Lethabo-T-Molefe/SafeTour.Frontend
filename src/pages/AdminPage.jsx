import AppShell from '../components/layout/AppShell'
import AuditLogPanel from '../features/admin/AuditLogPanel'
import IngestPanel from '../features/admin/IngestPanel'
import ModelLifecyclePanel from '../features/admin/ModelLifecyclePanel'
import ModerationQueue from '../features/admin/ModerationQueue'

export default function AdminPage() {
  return (
    <AppShell>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Administration</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <IngestPanel />
          <ModelLifecyclePanel />
          <ModerationQueue />
          <AuditLogPanel />
        </div>
      </div>
    </AppShell>
  )
}
