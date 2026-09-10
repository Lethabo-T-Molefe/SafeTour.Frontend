import { useState } from 'react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { useToast } from '../../hooks/useToast'
import { useIngest } from './useAdmin'

const SAMPLE_ROWS = JSON.stringify(
  [{ precinct_id: '00000000-0000-0000-0000-000000000000', category: 'contact_crime', count: 12, rate_per_100k: 340.5 }],
  null,
  2
)

// FR-ADM-1: a validated, idempotent quarterly loader — re-submitting the
// same period upserts rather than duplicating rows.
export default function IngestPanel() {
  const [period, setPeriod] = useState('2025Q4')
  const [rowsJson, setRowsJson] = useState(SAMPLE_ROWS)
  const { loading, run } = useIngest()
  const toast = useToast()

  const handleSubmit = async (event) => {
    event.preventDefault()
    let rows
    try {
      rows = JSON.parse(rowsJson)
    } catch {
      toast('Rows must be valid JSON.', 'warning')
      return
    }
    try {
      const result = await run({ period, rows })
      toast(`Ingested ${result.rows_ingested} rows for ${result.period}.`, 'success')
    } catch {
      toast('Ingestion failed — check the row values.', 'critical')
    }
  }

  return (
    <Card title="Ingest crime statistics">
      <form onSubmit={handleSubmit} className="space-y-2 text-sm">
        <input
          className="w-40 rounded border border-slate-700 bg-slate-950 px-2 py-1.5"
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
          placeholder="Period, e.g. 2025Q4"
        />
        <textarea
          className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1.5 font-mono text-xs"
          rows={8}
          value={rowsJson}
          onChange={(event) => setRowsJson(event.target.value)}
        />
        <Button type="submit" disabled={loading}>
          Ingest
        </Button>
      </form>
    </Card>
  )
}
