import { useEffect } from 'react'
import Alert from '../../components/feedback/Alert'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Loader from '../../components/feedback/Loader'
import { useToast } from '../../hooks/useToast'
import { useQuickHelp } from './useEmergency'

// Hardcoded so these render even if the location lookup or the backend call
// fails — FR-EMG-1 is one interaction, not one that depends on a network
// round trip. The backend serves the same numbers when it can be reached.
const FALLBACK_NUMBERS = {
  'SAPS (police)': '10111',
  Ambulance: '10177',
  'GBV Command Centre': '0800 428 428',
  'Cell emergency (any network)': '112',
}

// FR-EMG-1: an emergency action within one interaction.
export default function QuickHelpPanel() {
  const { data, loading, error, run } = useQuickHelp()
  const toast = useToast()

  const locateAndFetch = () => {
    if (!navigator.geolocation) {
      toast('Location is not available — showing emergency numbers only.', 'warning')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => run({ lon: position.coords.longitude, lat: position.coords.latitude }).catch(() => {}),
      () => toast('Could not get your location — showing emergency numbers only.', 'warning')
    )
  }

  useEffect(() => {
    locateAndFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const numbers = data?.numbers ?? FALLBACK_NUMBERS

  return (
    <Card title="Emergency numbers and nearest safe points">
      <ul className="grid grid-cols-2 gap-2 text-sm">
        {Object.entries(numbers).map(([label, number]) => (
          <li key={label} className="rounded bg-slate-800/60 px-2 py-1.5">
            <span className="block text-xs text-slate-400">{label}</span>
            <a href={`tel:${number.replace(/\s/g, '')}`} className="font-semibold text-emerald-400">
              {number}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-3">
        <p className="mb-1 text-xs text-slate-400">Nearest safe points</p>
        {loading && <Loader label="Finding nearby help…" />}
        {error && <Alert message="Could not load nearby safe points right now." severity="warning" />}
        {data && data.nearest_safe_points.length === 0 && <p className="text-xs text-slate-500">None recorded near you yet.</p>}
        {data && data.nearest_safe_points.length > 0 && (
          <ul className="space-y-1 text-sm">
            {data.nearest_safe_points.map((point, index) => (
              <li key={index} className="text-slate-200">
                {point.name} <span className="text-xs text-slate-500">({point.category.replace('_', ' ')})</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Button variant="ghost" onClick={locateAndFetch}>
        Refresh
      </Button>
      <p className="mt-3 text-xs text-slate-500">This complements the emergency services — it does not replace them.</p>
    </Card>
  )
}
