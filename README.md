# SafeTour AI Sentinel — Frontend

The web client for **SafeTour AI Sentinel** — a React + Vite PWA for the
safety-aware mobility and daily-decision platform described in
`Docs/SafeTour_Consolidated.pdf`. It talks to `SafeTour.Backend`'s
`/api/v1` REST API.

## Tech stack

| Layer | Technology |
|---|---|
| UI | React 19 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Routing | React Router DOM 7 |
| Map | Leaflet + React-Leaflet (OpenStreetMap tiles) |
| HTTP | Axios |

## Project structure

```
src/
├── components/          # Reusable, domain-agnostic UI (Button, Card, Badge,
│                         Alert, Loader, EmptyState, layout shell, RequireAuth)
├── constants/            # ROUTES, ENDPOINTS, SITE copy, persona/mode lists,
│                         risk-band colour+symbol tokens (NFR-USE-3)
├── features/             # One folder per backend module — components + a
│                         useXyz.js hook wrapping the matching service
│   ├── auth/  risk/  routing/  itineraries/  reports/  emergency/
│   └── profile/  admin/
├── hooks/                # Cross-cutting hooks: useApi, useAuth, useToast
├── lib/                  # Axios instance with token attach + silent refresh
├── pages/                # One page per route; composes features + AppShell
├── services/             # Thin API wrappers, one file per backend module
├── store/                # Lightweight Context+useReducer global store
│                         (auth session state, toast notifications)
├── styles/               # Design tokens + global CSS
└── utils/                # Pure formatting/validation/date helpers
```

Every `features/<name>/` folder pairs with the backend module of the same
name — `features/risk/useRisk.js` calls `services/riskService.js`, which
hits the endpoints documented in `SafeTour.Backend`'s README.

## Auth

JWT access + refresh tokens are stored in `localStorage` (`lib/api.js`).
The Axios response interceptor makes one silent refresh attempt on a 401
before retrying the original request; on refresh failure it clears the
tokens and the next protected-route navigation redirects to `/login`
(`components/RequireAuth.jsx`). Quick help (`/emergency`) and the risk map
(`/map`) work without an account — only account-bound features (saved
itineraries, community reports, companion mode, admin) are gated.

## Quick start

```bash
cp .env.example .env   # set VITE_API_BASE_URL if the backend isn't on :8000
npm install
npm run dev
```

- App: http://localhost:5173
- Requires `SafeTour.Backend` running (see its README) for anything beyond
  the static pages — every data-fetching component degrades to a visible
  error/empty state rather than hanging if the API is unreachable.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server (HMR) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |

## Conventions

- PascalCase for components and their files; camelCase for hooks, services,
  constants and utils.
- Every fire-and-forget `run()`/`fetch` call in a `useEffect` is followed by
  `.catch(() => {})`, and every page that depends on that data renders the
  hook's `error` state instead of leaving a loader spinning forever.
- Tailwind utility classes only — no separate component-level CSS files
  unless a page genuinely needs bespoke layout (see `styles/homepage.css`).
