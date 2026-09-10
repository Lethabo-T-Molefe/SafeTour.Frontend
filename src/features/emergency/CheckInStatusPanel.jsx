import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { formatTimestamp } from '../../utils/dateHelpers'
import { useCheckinStatus, useConfirmCheckin } from './useEmergency'

export default function CheckInStatusPanel({ checkin }) {
  const { data: status, run: refresh } = useCheckinStatus()
  const { run: confirm } = useConfirmCheckin()

  const current = status ?? checkin

  const handleConfirm = async () => {
    await confirm(current.id)
    await refresh(current.id)
  }

  return (
    <Card title="Check-in">
      <p className="text-sm text-slate-300">Expected by {formatTimestamp(current.expected_arrival_at)}</p>
      <div className="mt-2 flex items-center gap-2">
        <Badge status={current.confirmed_at ? 'success' : current.alert_sent ? 'critical' : 'info'}>
          {current.confirmed_at ? 'Arrived' : current.alert_sent ? 'Overdue — contact alerted' : 'In progress'}
        </Badge>
      </div>
      <div className="mt-3 flex gap-2">
        <Button onClick={handleConfirm} disabled={Boolean(current.confirmed_at)}>
          I've arrived safely
        </Button>
        <Button variant="ghost" onClick={() => refresh(current.id)}>
          Refresh status
        </Button>
      </div>
    </Card>
  )
}
