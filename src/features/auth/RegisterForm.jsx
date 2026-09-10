import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { validateEmail, validatePassword } from '../../utils/validators'

export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [consent, setConsent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { register, login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validateEmail(email) || !validatePassword(password) || !consent) {
      toast('Enter a valid email, a password of at least 10 characters, and give consent.', 'warning')
      return
    }
    setSubmitting(true)
    try {
      await register(email, password, consent)
      await login(email, password)
      navigate(ROUTES.ONBOARDING, { replace: true })
    } catch (error) {
      toast(error.response?.status === 409 ? 'An account with this email already exists.' : 'Registration failed.', 'critical')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-3 rounded-lg border border-slate-800 bg-slate-900 p-6">
      <h1 className="text-lg font-semibold text-white">Create an account</h1>
      <input
        type="email"
        required
        className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        required
        minLength={10}
        className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
        placeholder="Password (at least 10 characters)"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <label className="flex items-start gap-2 text-xs text-slate-400">
        <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5" />
        I consent to SafeTour processing my account data as described in the privacy notice (POPIA).
      </label>
      <Button type="submit" disabled={submitting}>
        Sign up
      </Button>
    </form>
  )
}
