import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RequireAuth from './components/RequireAuth'
import ToastStack from './components/feedback/ToastStack'
import { ROUTES } from './constants/routes'
import { useAuth } from './hooks/useAuth'
import AdminPage from './pages/AdminPage'
import EmergencyPage from './pages/EmergencyPage'
import HomePage from './pages/HomePage'
import ItineraryDetailPage from './pages/ItineraryDetailPage'
import ItinerariesPage from './pages/ItinerariesPage'
import LoginPage from './pages/LoginPage'
import MapPage from './pages/MapPage'
import OnboardingPage from './pages/OnboardingPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import ReportsPage from './pages/ReportsPage'
import RoutePlannerPage from './pages/RoutePlannerPage'

function App() {
  const { isAuthenticated, profile, loadProfile } = useAuth()

  // Covers a returning session (token already in localStorage on page load)
  // where login() never ran this tick, so the store's profile would
  // otherwise stay null and the admin nav entries would never appear.
  useEffect(() => {
    if (isAuthenticated && !profile) {
      loadProfile().catch(() => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return (
    <BrowserRouter>
      <ToastStack />
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.MAP} element={<MapPage />} />
        <Route path={ROUTES.ROUTE_PLANNER} element={<RoutePlannerPage />} />
        <Route path={ROUTES.EMERGENCY} element={<EmergencyPage />} />

        <Route
          path={ROUTES.ONBOARDING}
          element={
            <RequireAuth>
              <OnboardingPage />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.ITINERARIES}
          element={
            <RequireAuth>
              <ItinerariesPage />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.ITINERARY_DETAIL_PATTERN}
          element={
            <RequireAuth>
              <ItineraryDetailPage />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.REPORTS}
          element={
            <RequireAuth>
              <ReportsPage />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.ADMIN}
          element={
            <RequireAuth>
              <AdminPage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
