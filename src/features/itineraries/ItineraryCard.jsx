import { Link } from 'react-router-dom'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { ROUTES } from '../../constants/routes'

export default function ItineraryCard({ itinerary }) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <Link to={ROUTES.ITINERARY_DETAIL(itinerary.id)} className="font-semibold text-emerald-400 hover:underline">
          Itinerary · {itinerary.stops.length} stops
        </Link>
        <Badge status={itinerary.status === 'saved' ? 'success' : 'info'}>{itinerary.status}</Badge>
      </div>
      <p className="mt-1 text-xs text-slate-400">Created {new Date(itinerary.created_at).toLocaleDateString()}</p>
    </Card>
  )
}
