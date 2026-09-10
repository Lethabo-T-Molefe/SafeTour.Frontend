import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/feedback/EmptyState'
import { formatTimestamp } from '../../utils/dateHelpers'
import { useConfirmReport } from './useReports'

const STATUS_TO_BADGE = { verified: 'success', pending: 'info', rejected: 'critical' }

export default function ReportList({ reports, onConfirmed }) {
  const { run: confirm } = useConfirmReport()

  if (reports.length === 0) {
    return <EmptyState title="No reports for this precinct yet" description="Be the first to share a safety condition." />
  }

  const handleConfirm = async (id) => {
    await confirm(id)
    onConfirmed?.()
  }

  return (
    <ul className="space-y-2">
      {reports.map((report) => (
        <li key={report.id} className="rounded-lg border border-slate-800 bg-slate-900 p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold capitalize text-slate-100">{report.report_type.replace('_', ' ')}</span>
            <Badge status={STATUS_TO_BADGE[report.status]}>{report.status}</Badge>
          </div>
          <p className="mt-1 text-sm text-slate-300">{report.description}</p>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>{formatTimestamp(report.created_at)} · {report.confirmations} confirmation(s)</span>
            <Button variant="ghost" onClick={() => handleConfirm(report.id)}>
              Confirm
            </Button>
          </div>
        </li>
      ))}
    </ul>
  )
}
