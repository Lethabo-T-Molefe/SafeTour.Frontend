import { useState } from 'react'
import AppShell from '../components/layout/AppShell'
import EmptyState from '../components/feedback/EmptyState'
import ReportForm from '../features/reports/ReportForm'
import ReportList from '../features/reports/ReportList'
import { useReportsList } from '../features/reports/useReports'

export default function ReportsPage() {
  const [unitId, setUnitId] = useState(null)
  const { data: reports, run: loadReports } = useReportsList()

  const handleUnitSelected = (id) => {
    setUnitId(id)
    loadReports(id)
  }

  return (
    <AppShell>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Community reports</h1>
        <p className="text-sm text-slate-400">
          Describe places and conditions only — never a person. Reports are verified, weighted and decay over
          time before they influence risk (FR-REP-3).
        </p>
        <ReportForm onSubmitted={handleUnitSelected} />
        {unitId ? <ReportList reports={reports ?? []} onConfirmed={() => loadReports(unitId)} /> : (
          <EmptyState title="Select a precinct above" description="Submit or view reports for a specific precinct." />
        )}
      </div>
    </AppShell>
  )
}
