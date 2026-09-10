import { Link } from 'react-router-dom'
import LoginForm from '../features/auth/LoginForm'
import { ROUTES } from '../constants/routes'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 px-4 text-white">
      <LoginForm />
      <p className="text-xs text-slate-400">
        No account?{' '}
        <Link to={ROUTES.REGISTER} className="text-emerald-400 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}
