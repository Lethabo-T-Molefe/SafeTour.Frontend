import { useEffect } from 'react'
import AppShell from '../components/layout/AppShell'
import Alert from '../components/feedback/Alert'
import EmptyState from '../components/feedback/EmptyState'
import Loader from '../components/feedback/Loader'
import AssistantPlanner from '../features/itineraries/AssistantPlanner'
import GenerateItineraryForm from '../features/itineraries/GenerateItineraryForm'
import ItineraryCard from '../features/itineraries/ItineraryCard'
import { useMyItineraries } from '../features/itineraries/useItineraries'

export default function ItinerariesPage() {
  const { data: itineraries, loading, error, run: loadItineraries } = useMyItineraries()

  useEffect(() => {
    loadItineraries().catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AppShell>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Itineraries</h1>
        <GenerateItineraryForm />
        <AssistantPlanner />
        {loading && <Loader label="Loading your itineraries…" />}
        {error && <Alert message="Could not load your itineraries." severity="warning" />}
        {itineraries && itineraries.length === 0 && (
          <EmptyState title="No itineraries yet" description="Generate one above to get started." />
        )}
        {itineraries && itineraries.length > 0 && (
          <div className="grid gap-3 md:grid-cols-2">
            {itineraries.map((itinerary) => (
              <ItineraryCard key={itinerary.id} itinerary={itinerary} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}
