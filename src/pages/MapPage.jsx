import { useState } from 'react'
import AppShell from '../components/layout/AppShell'
import RiskMap from '../features/risk/RiskMap'
import { resolveTimeBand } from '../utils/dateHelpers'

const TIME_BANDS = ['morning', 'midday', 'evening', 'night']

export default function MapPage() {
  const [timeBand, setTimeBand] = useState(resolveTimeBand())

  return (
    <AppShell>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Precinct risk map</h1>
          <select
            className="rounded border border-slate-700 bg-slate-950 px-2 py-1.5 text-sm"
            value={timeBand}
            onChange={(event) => setTimeBand(event.target.value)}
          >
            {TIME_BANDS.map((band) => (
              <option key={band} value={band}>
                {band}
              </option>
            ))}
          </select>
        </div>
        <RiskMap timeBand={timeBand} />
      </div>
    </AppShell>
  )
}
