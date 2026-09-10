import { useState } from 'react'
import Button from '../../components/ui/Button'
import Loader from '../../components/feedback/Loader'
import EmptyState from '../../components/feedback/EmptyState'
import { TRANSPORT_MODES } from '../../constants/site'
import { validateLonLat } from '../../utils/validators'
import { useToast } from '../../hooks/useToast'
import RouteOptionCard from './RouteOptionCard'
import { useRoutePlanner } from './useRouting'

const emptyForm = { originLon: '', originLat: '', destinationLon: '', destinationLat: '', mode: 'walking' }

export default function RoutePlannerForm() {
  const [form, setForm] = useState(emptyForm)
  const { data: options, loading, run } = useRoutePlanner()
  const toast = useToast()

  const setField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    const originLon = Number(form.originLon)
    const originLat = Number(form.originLat)
    const destinationLon = Number(form.destinationLon)
    const destinationLat = Number(form.destinationLat)

    if (!validateLonLat(originLon, originLat) || !validateLonLat(destinationLon, destinationLat)) {
      toast('Enter valid longitude/latitude for both points.', 'warning')
      return
    }

    try {
      await run({ originLon, originLat, destinationLon, destinationLat, mode: form.mode })
    } catch {
      toast('Could not plan a route right now.', 'critical')
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3 rounded-lg border border-slate-800 bg-slate-900 p-4 sm:grid-cols-4">
        <input
          className="col-span-1 rounded border border-slate-700 bg-slate-950 px-2 py-1.5 text-sm"
          placeholder="Origin longitude"
          value={form.originLon}
          onChange={setField('originLon')}
        />
        <input
          className="col-span-1 rounded border border-slate-700 bg-slate-950 px-2 py-1.5 text-sm"
          placeholder="Origin latitude"
          value={form.originLat}
          onChange={setField('originLat')}
        />
        <input
          className="col-span-1 rounded border border-slate-700 bg-slate-950 px-2 py-1.5 text-sm"
          placeholder="Destination longitude"
          value={form.destinationLon}
          onChange={setField('destinationLon')}
        />
        <input
          className="col-span-1 rounded border border-slate-700 bg-slate-950 px-2 py-1.5 text-sm"
          placeholder="Destination latitude"
          value={form.destinationLat}
          onChange={setField('destinationLat')}
        />
        <select
          className="col-span-2 rounded border border-slate-700 bg-slate-950 px-2 py-1.5 text-sm sm:col-span-3"
          value={form.mode}
          onChange={setField('mode')}
        >
          {TRANSPORT_MODES.map((mode) => (
            <option key={mode.value} value={mode.value}>
              {mode.label}
            </option>
          ))}
        </select>
        <Button type="submit">Plan route</Button>
      </form>

      {loading && <Loader label="Scoring route options…" />}

      {!loading && options && options.length > 0 && (
        <div className="grid gap-3 md:grid-cols-2">
          {options.map((option, index) => (
            <RouteOptionCard key={index} option={option} />
          ))}
        </div>
      )}

      {!loading && !options && (
        <EmptyState title="No route planned yet" description="Enter two points to see safety-aware route options." />
      )}
    </div>
  )
}
