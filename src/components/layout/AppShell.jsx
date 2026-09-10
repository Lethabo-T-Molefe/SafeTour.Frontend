import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function AppShell({ children, withSidebar = true }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-4 px-4 py-6">
        {withSidebar && <Sidebar />}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
