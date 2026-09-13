import { useEffect, useState } from 'react'
import * as geoService from '../../services/geoService'

export default function PrecinctSelect({ value, onChange }) {
  const [precincts, setPrecincts] = useState([])

  useEffect(() => {
    geoService.fetchPrecincts().then(setPrecincts).catch(() => {})
  }, [])

  return (
    <select
      className="rounded border border-slate-700 bg-slate-950 px-2 py-1.5 text-sm"
      value={value ?? ''}
      onChange={(event) => onChange(event.target.value || null)}
    >
      <option value="">Select a precinct…</option>
      {precincts.map((precinct) => (
        <option key={precinct.id} value={precinct.id}>
          {precinct.name}
        </option>
      ))}
    </select>
  )
}
