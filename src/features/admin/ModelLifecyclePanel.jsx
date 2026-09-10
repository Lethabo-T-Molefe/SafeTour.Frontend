import { useState } from 'react'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { useToast } from '../../hooks/useToast'
import { useRecordBiasAudit, useRecordEvaluation, usePromoteModel, useTriggerRetrain } from './useAdmin'

// MLR-2/MLR-5, FR-ADM-2/3: promotion is blocked server-side unless both an
// evaluation meeting the quality gate (ROC-AUC ≥ 0.80) and a passing bias
// audit are on record for the version being promoted.
export default function ModelLifecyclePanel() {
  const [label, setLabel] = useState('')
  const [version, setVersion] = useState(null)
  const [evalForm, setEvalForm] = useState({ rocAuc: '0.82', prAuc: '0.4', baseRate: '0.2' })
  const [auditForm, setAuditForm] = useState({ passed: true, summary: '' })
  const { run: retrain } = useTriggerRetrain()
  const { run: recordEvaluation } = useRecordEvaluation()
  const { run: recordBiasAudit } = useRecordBiasAudit()
  const { run: promote } = usePromoteModel()
  const toast = useToast()

  const handleRetrain = async (event) => {
    event.preventDefault()
    const created = await retrain({ label })
    setVersion(created)
    toast(`Registered model version "${created.label}".`, 'success')
  }

  const handleEvaluation = async () => {
    await recordEvaluation(version.id, {
      rocAuc: Number(evalForm.rocAuc), prAuc: Number(evalForm.prAuc), baseRate: Number(evalForm.baseRate),
    })
    toast('Evaluation recorded.', 'success')
  }

  const handleBiasAudit = async () => {
    await recordBiasAudit(version.id, { passed: auditForm.passed, summary: auditForm.summary, findings: {} })
    toast('Bias audit recorded.', 'success')
  }

  const handlePromote = async () => {
    try {
      const promoted = await promote(version.id)
      setVersion(promoted)
      toast('Model promoted.', 'success')
    } catch (error) {
      toast(error.response?.data?.detail ?? 'Promotion blocked.', 'critical')
    }
  }

  return (
    <Card title="Model lifecycle">
      <form onSubmit={handleRetrain} className="flex items-center gap-2 text-sm">
        <input
          className="flex-1 rounded border border-slate-700 bg-slate-950 px-2 py-1.5"
          placeholder="Version label"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
        />
        <Button type="submit">Register version</Button>
      </form>

      {version && (
        <div className="mt-4 space-y-3 border-t border-slate-800 pt-3 text-sm">
          <p>
            {version.label} <Badge status={version.status === 'promoted' ? 'success' : 'info'}>{version.status}</Badge>
          </p>

          <div className="flex flex-wrap items-end gap-2">
            <label className="text-xs text-slate-400">
              ROC-AUC
              <input className="mt-0.5 block w-20 rounded border border-slate-700 bg-slate-950 px-2 py-1" value={evalForm.rocAuc} onChange={(e) => setEvalForm({ ...evalForm, rocAuc: e.target.value })} />
            </label>
            <label className="text-xs text-slate-400">
              PR-AUC
              <input className="mt-0.5 block w-20 rounded border border-slate-700 bg-slate-950 px-2 py-1" value={evalForm.prAuc} onChange={(e) => setEvalForm({ ...evalForm, prAuc: e.target.value })} />
            </label>
            <label className="text-xs text-slate-400">
              Base rate
              <input className="mt-0.5 block w-20 rounded border border-slate-700 bg-slate-950 px-2 py-1" value={evalForm.baseRate} onChange={(e) => setEvalForm({ ...evalForm, baseRate: e.target.value })} />
            </label>
            <Button variant="ghost" onClick={handleEvaluation}>Record evaluation</Button>
          </div>

          <div className="flex flex-wrap items-end gap-2">
            <label className="flex items-center gap-1.5 text-xs text-slate-400">
              <input type="checkbox" checked={auditForm.passed} onChange={(e) => setAuditForm({ ...auditForm, passed: e.target.checked })} />
              Passed
            </label>
            <input
              className="flex-1 rounded border border-slate-700 bg-slate-950 px-2 py-1.5 text-xs"
              placeholder="Bias audit summary"
              value={auditForm.summary}
              onChange={(e) => setAuditForm({ ...auditForm, summary: e.target.value })}
            />
            <Button variant="ghost" onClick={handleBiasAudit}>Record bias audit</Button>
          </div>

          <Button onClick={handlePromote}>Promote this version</Button>
        </div>
      )}
    </Card>
  )
}
