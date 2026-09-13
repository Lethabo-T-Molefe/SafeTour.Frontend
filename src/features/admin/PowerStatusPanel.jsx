import { useState } from 'react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import PrecinctSelect from '../../components/ui/PrecinctSelect'
import { useToast } from '../../hooks/useToast'
import { useSetPowerStatus } from './useAdmin'

// FR-POW-1: raise (or clear) contextual risk during a confirmed outage or
// load-reduction event. Confirmation is an administrative action.
export default function PowerStatusPanel() {
  const [precinctId, setPrecinctId] = useState(null)
  const { run: setPowerStatus, loading } = useSetPowerStatus()
  const toast = useToast()

  const handleSet = async (activeOutage) => {
    if (!precinctId) {
      toast('Select a precinct first.', 'warning')
      return
    }
    try {
      await setPowerStatus({ precinctId, activeOutage })
      toast(activeOutage ? 'Outage confirmed for this precinct.' : 'Outage cleared for this precinct.', 'success')
    } catch {
      toast('Could not update power status.', 'critical')
    }
  }

  return (
    <Card title="Power status">
      <div className="flex flex-wrap items-center gap-2">
        <PrecinctSelect value={precinctId} onChange={setPrecinctId} />
        <Button variant="danger" disabled={loading} onClick={() => handleSet(true)}>
          Confirm outage
        </Button>
        <Button variant="ghost" disabled={loading} onClick={() => handleSet(false)}>
          Clear outage
        </Button>
      </div>
    </Card>
  )
}
