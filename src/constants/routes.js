/**
 * Route path constants for <Link>, useNavigate, and route config.
 */

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  ONBOARDING: '/onboarding',
  MAP: '/map',
  ROUTE_PLANNER: '/routes',
  ITINERARIES: '/itineraries',
  ITINERARY_DETAIL_PATTERN: '/itineraries/:id',
  ITINERARY_DETAIL: (id) => `/itineraries/${id}`,
  REPORTS: '/reports',
  EMERGENCY: '/emergency',
  PROFILE: '/profile',
  ADMIN: '/admin',
}
