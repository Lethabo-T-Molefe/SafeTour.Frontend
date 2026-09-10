import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    try {
      await login(email, password)
      navigate(location.state?.from?.pathname ?? ROUTES.MAP, { replace: true })
    } catch (error) {
      const status = error.response?.status
      toast(status === 423 ? 'Account temporarily locked after repeated failed logins.' : 'Incorrect email or password.', 'critical')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-3 rounded-lg border border-slate-800 bg-slate-900 p-6">
      <h1 className="text-lg font-semibold text-white">Log in</h1>
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
        className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button type="submit" disabled={submitting}>
        Log in
      </Button>
    </form>
  )
}
