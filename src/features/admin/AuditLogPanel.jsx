import { useEffect } from 'react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/feedback/EmptyState'
import { formatTimestamp } from '../../utils/dateHelpers'
import { useToast } from '../../hooks/useToast'
import { useAuditLog, usePurgeExpired } from './useAdmin'

// FR-ADM-4: every administrative action is audit-logged.
export default function AuditLogPanel() {
  const { data: entries, run: loadLog } = useAuditLog()
  const { run: purge } = usePurgeExpired()
  const toast = useToast()

  useEffect(() => {
    loadLog().catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePurge = async () => {
    try {
      const result = await purge()
      toast(`Purged ${result.trip_shares} trip shares and ${result.checkins} check-ins.`, 'success')
      loadLog().catch(() => {})
    } catch {
      toast('Could not purge expired data.', 'critical')
    }
  }

  return (
    <Card title="Audit log">
      <Button variant="ghost" onClick={handlePurge}>
        Purge expired emergency data
      </Button>
      {entries && entries.length === 0 && <EmptyState title="No admin actions recorded yet" />}
      {entries && entries.length > 0 && (
        <ul className="mt-3 space-y-1 text-xs text-slate-300">
          {entries.map((entry) => (
            <li key={entry.id} className="border-b border-slate-800 pb-1">
              {formatTimestamp(entry.created_at)} · {entry.action} · {entry.subject_type}:{entry.subject_id}
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
