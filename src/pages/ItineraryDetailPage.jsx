import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import Alert from '../components/feedback/Alert'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Loader from '../components/feedback/Loader'
import { useToast } from '../hooks/useToast'
import ItineraryStopList from '../features/itineraries/ItineraryStopList'
import { useItinerary, useSaveItinerary } from '../features/itineraries/useItineraries'

export default function ItineraryDetailPage() {
  const { id } = useParams()
  const { data: itinerary, loading, error, run: loadItinerary } = useItinerary()
  const { run: save } = useSaveItinerary()
  const toast = useToast()

  useEffect(() => {
    loadItinerary(id).catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleSave = async () => {
    try {
      await save(id)
      toast('Itinerary saved.', 'success')
      loadItinerary(id).catch(() => {})
    } catch {
      toast('Could not save this itinerary.', 'critical')
    }
  }

  if (loading) return <AppShell><Loader label="Loading itinerary…" /></AppShell>

  if (error || !itinerary) {
    return (
      <AppShell>
        <Alert message="Could not load this itinerary." severity="critical" />
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            Itinerary <Badge status={itinerary.status === 'saved' ? 'success' : 'info'}>{itinerary.status}</Badge>
          </h1>
          {itinerary.status !== 'saved' && <Button onClick={handleSave}>Save this itinerary</Button>}
        </div>
        <ItineraryStopList stops={itinerary.stops} />
      </div>
    </AppShell>
  )
}
