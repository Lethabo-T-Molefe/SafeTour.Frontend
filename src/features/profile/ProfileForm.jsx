import { useEffect, useState } from 'react'
import Alert from '../../components/feedback/Alert'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Loader from '../../components/feedback/Loader'
import { PERSONAS, TRANSPORT_MODES } from '../../constants/site'
import { useToast } from '../../hooks/useToast'
import * as profileService from '../../services/profileService'
import { useMyProfile, useUpdatePreferences } from './useProfile'

export default function ProfileForm() {
  const { data: profile, loading, error, run: loadProfile } = useMyProfile()
  const { run: updatePreferences } = useUpdatePreferences()
  const [form, setForm] = useState(null)
  const toast = useToast()

  useEffect(() => {
    loadProfile().catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (profile) setForm(profile)
  }, [profile])

  if (loading) return <Loader label="Loading your profile…" />
  if (error || !form) return <Alert message="Could not load your profile." severity="critical" />

  const toggleMode = (mode) => {
    setForm((prev) => ({
      ...prev,
      transport_modes: prev.transport_modes.includes(mode)
        ? prev.transport_modes.filter((m) => m !== mode)
        : [...prev.transport_modes, mode],
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await updatePreferences({
        persona: form.persona,
        interests: form.interests,
        transport_modes: form.transport_modes,
        mobility_needs: form.mobility_needs || null,
        heightened_safety: form.heightened_safety,
      })
      toast('Preferences saved.', 'success')
    } catch {
      toast('Could not save preferences.', 'critical')
    }
  }

  const handleExport = async () => {
    const data = await profileService.exportMyData()
    toast(`Your data: ${JSON.stringify(data.profile)}`, 'info')
  }

  const handleDelete = async () => {
    if (!confirm('Delete your account and all associated data? This cannot be undone.')) return
    await profileService.deleteMyAccount()
    toast('Account deleted.', 'success')
  }

  return (
    <Card title="Persona and preferences">
      <form onSubmit={handleSubmit} className="space-y-3 text-sm">
        <label className="block">
          Persona
          <select
            className="mt-1 w-full rounded border border-slate-700 bg-slate-950 px-2 py-1.5"
            value={form.persona}
            onChange={(event) => setForm({ ...form, persona: event.target.value })}
          >
            {PERSONAS.map((persona) => (
              <option key={persona.value} value={persona.value}>{persona.label}</option>
            ))}
          </select>
        </label>

        <fieldset>
          <legend className="mb-1 text-slate-300">Transport modes</legend>
          <div className="flex flex-wrap gap-3">
            {TRANSPORT_MODES.map((mode) => (
              <label key={mode.value} className="flex items-center gap-1.5 text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={form.transport_modes.includes(mode.value)}
                  onChange={() => toggleMode(mode.value)}
                />
                {mode.label}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block">
          Interests (comma separated)
          <input
            className="mt-1 w-full rounded border border-slate-700 bg-slate-950 px-2 py-1.5"
            value={form.interests.join(', ')}
            onChange={(event) => setForm({ ...form, interests: event.target.value.split(',').map((i) => i.trim()).filter(Boolean) })}
          />
        </label>

        <label className="block">
          Mobility needs (optional)
          <input
            className="mt-1 w-full rounded border border-slate-700 bg-slate-950 px-2 py-1.5"
            value={form.mobility_needs ?? ''}
            onChange={(event) => setForm({ ...form, mobility_needs: event.target.value })}
          />
        </label>

        <label className="flex items-center gap-2 text-xs text-slate-300">
          <input
            type="checkbox"
            checked={form.heightened_safety}
            onChange={(event) => setForm({ ...form, heightened_safety: event.target.checked })}
          />
          Heightened-safety setting
        </label>

        <div className="flex flex-wrap gap-2 pt-2">
          <Button type="submit">Save preferences</Button>
          <Button variant="ghost" onClick={handleExport} type="button">Export my data</Button>
          <Button variant="danger" onClick={handleDelete} type="button">Delete my account</Button>
        </div>
      </form>
    </Card>
  )
}
