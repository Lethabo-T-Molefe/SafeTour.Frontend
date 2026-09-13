import { useState } from 'react'
import Button from '../../components/ui/Button'
import PrecinctSelect from '../../components/ui/PrecinctSelect'
import { useToast } from '../../hooks/useToast'
import { useSubmitReport } from './useReports'

const REPORT_TYPES = [
  { value: 'hotspot', label: 'Hotspot' },
  { value: 'unsafe_stop', label: 'Unsafe stop' },
  { value: 'closure', label: 'Closure' },
  { value: 'safe_corridor', label: 'Safe corridor' },
  { value: 'other', label: 'Other' },
]

export default function ReportForm({ onSubmitted }) {
  const [unitId, setUnitId] = useState(null)
  const [reportType, setReportType] = useState('hotspot')
  const [description, setDescription] = useState('')
  const { loading, run } = useSubmitReport()
  const toast = useToast()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!unitId || !description.trim()) {
      toast('Choose a precinct and describe the condition.', 'warning')
      return
    }
    try {
      await run({ unitId, reportType, description })
      setDescription('')
      toast('Report submitted for moderation.', 'success')
      onSubmitted?.(unitId)
    } catch {
      toast('Could not submit the report.', 'critical')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-slate-800 bg-slate-900 p-4">
      <div className="flex flex-wrap gap-3">
        <PrecinctSelect value={unitId} onChange={setUnitId} />
        <select
          className="rounded border border-slate-700 bg-slate-950 px-2 py-1.5 text-sm"
          value={reportType}
          onChange={(event) => setReportType(event.target.value)}
        >
          {REPORT_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
      <textarea
        className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
        placeholder="Describe the place or condition — never a person."
        rows={3}
        maxLength={1000}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <Button type="submit" disabled={loading}>
        Submit report
      </Button>
    </form>
  )
}
