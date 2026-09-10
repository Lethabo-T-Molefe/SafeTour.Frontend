import { Link } from 'react-router-dom'
import RegisterForm from '../features/auth/RegisterForm'
import { ROUTES } from '../constants/routes'

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 px-4 text-white">
      <RegisterForm />
      <p className="text-xs text-slate-400">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="text-emerald-400 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  )
}
