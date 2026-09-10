import AppShell from '../components/layout/AppShell'
import ProfileForm from '../features/profile/ProfileForm'

export default function ProfilePage() {
  return (
    <AppShell>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Profile</h1>
        <ProfileForm />
      </div>
    </AppShell>
  )
}
