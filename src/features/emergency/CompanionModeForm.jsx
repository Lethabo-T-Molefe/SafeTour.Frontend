import { useState } from 'react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Loader from '../../components/feedback/Loader'
import { TRANSPORT_MODES } from '../../constants/site'
import { useToast } from '../../hooks/useToast'
import { validateLonLat } from '../../utils/validators'
import { useCompanionMode } from './useEmergency'

const emptyForm = {
  originLon: '', originLat: '', destinationLon: '', destinationLat: '', mode: 'walking',
  contactName: '', channel: 'sms', contactAddress: '', expectedArrivalMinutes: 30,
}

// FR-EMG-4: live sharing + a check-in + a safer-route preference, in one call.
export default function CompanionModeForm({ onStarted }) {
  const [form, setForm] = useState(emptyForm)
  const { data, loading, run } = useCompanionMode()
  const toast = useToast()

  const setField = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    const originLon = Number(form.originLon)
    const originLat = Number(form.originLat)
    const destinationLon = Number(form.destinationLon)
    const destinationLat = Number(form.destinationLat)

    if (!validateLonLat(originLon, originLat) || !validateLonLat(destinationLon, destinationLat) || !form.contactName || !form.contactAddress) {
      toast('Fill in both points and a trusted contact.', 'warning')
      return
    }

    const expectedArrivalAt = new Date(Date.now() + Number(form.expectedArrivalMinutes) * 60000).toISOString()

    try {
      const result = await run({
        origin_lon: originLon, origin_lat: originLat,
        destination_lon: destinationLon, destination_lat: destinationLat,
        mode: form.mode, contact_name: form.contactName, channel: form.channel,
        contact_address: form.contactAddress, expected_arrival_at: expectedArrivalAt,
      })
      toast('Companion mode started — your contact has been notified.', 'success')
      onStarted?.(result)
    } catch {
      toast('Could not start companion mode.', 'critical')
    }
  }

  return (
    <Card title="Companion mode">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2 text-sm">
        <input className="rounded border border-slate-700 bg-slate-950 px-2 py-1.5" placeholder="Origin lon" value={form.originLon} onChange={setField('originLon')} />
        <input className="rounded border border-slate-700 bg-slate-950 px-2 py-1.5" placeholder="Origin lat" value={form.originLat} onChange={setField('originLat')} />
        <input className="rounded border border-slate-700 bg-slate-950 px-2 py-1.5" placeholder="Destination lon" value={form.destinationLon} onChange={setField('destinationLon')} />
        <input className="rounded border border-slate-700 bg-slate-950 px-2 py-1.5" placeholder="Destination lat" value={form.destinationLat} onChange={setField('destinationLat')} />
        <select className="col-span-2 rounded border border-slate-700 bg-slate-950 px-2 py-1.5" value={form.mode} onChange={setField('mode')}>
          {TRANSPORT_MODES.map((mode) => (
            <option key={mode.value} value={mode.value}>{mode.label}</option>
          ))}
        </select>
        <input className="rounded border border-slate-700 bg-slate-950 px-2 py-1.5" placeholder="Contact name" value={form.contactName} onChange={setField('contactName')} />
        <select className="rounded border border-slate-700 bg-slate-950 px-2 py-1.5" value={form.channel} onChange={setField('channel')}>
          <option value="sms">SMS</option>
          <option value="email">Email</option>
          <option value="push">Push</option>
        </select>
        <input className="rounded border border-slate-700 bg-slate-950 px-2 py-1.5" placeholder="Contact number or email" value={form.contactAddress} onChange={setField('contactAddress')} />
        <label className="flex items-center gap-2 text-xs text-slate-400">
          Expected arrival in
          <input
            type="number"
            min="1"
            className="w-16 rounded border border-slate-700 bg-slate-950 px-2 py-1"
            value={form.expectedArrivalMinutes}
            onChange={setField('expectedArrivalMinutes')}
          />
          minutes
        </label>
        <Button type="submit" disabled={loading}>Start companion mode</Button>
      </form>
      {loading && <Loader label="Starting companion mode…" />}
      {data && <p className="mt-2 text-xs text-emerald-400">Sharing expires {new Date(data.share.expires_at).toLocaleString()}.</p>}
    </Card>
  )
}
