import Alert from '../feedback/Alert'
import { useOnlineStatus } from '../../hooks/useOnlineStatus'
import BottomNav from './BottomNav'
import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function AppShell({ children, withSidebar = true }) {
  const isOnline = useOnlineStatus()

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-4 px-3 py-4 sm:px-4 sm:py-6">
        {withSidebar && <Sidebar />}
        <main className="min-w-0 flex-1 space-y-3">
          {!isOnline && (
            <Alert
              severity="warning"
              message="You're offline — showing the last data saved to this device, which may be out of date."
            />
          )}
          {children}
        </main>
      </div>
      <Footer />
      {withSidebar && <BottomNav />}
    </div>
  )
}
