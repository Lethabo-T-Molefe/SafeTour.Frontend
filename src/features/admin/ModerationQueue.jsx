import { useEffect } from 'react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/feedback/EmptyState'
import { useToast } from '../../hooks/useToast'
import { useModerateReport, usePendingReports } from './useAdmin'

export default function ModerationQueue() {
  const { data: reports, run: loadPending } = usePendingReports()
  const { run: moderate } = useModerateReport()
  const toast = useToast()

  useEffect(() => {
    loadPending().catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleModerate = async (reportId, approve) => {
    try {
      await moderate(reportId, { approve })
      toast(approve ? 'Report verified.' : 'Report rejected.', 'success')
      loadPending().catch(() => {})
    } catch {
      toast('Could not moderate this report.', 'critical')
    }
  }

  return (
    <Card title="Pending community reports">
      {reports && reports.length === 0 && <EmptyState title="Nothing pending moderation" />}
      {reports && reports.length > 0 && (
        <ul className="space-y-2">
          {reports.map((report) => (
            <li key={report.id} className="rounded border border-slate-800 bg-slate-950 p-3 text-sm">
              <p className="font-semibold capitalize text-slate-100">{report.report_type.replace('_', ' ')}</p>
              <p className="mt-1 text-slate-300">{report.description}</p>
              <div className="mt-2 flex gap-2">
                <Button onClick={() => handleModerate(report.id, true)}>Verify</Button>
                <Button variant="danger" onClick={() => handleModerate(report.id, false)}>
                  Reject
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
