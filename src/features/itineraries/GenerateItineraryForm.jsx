import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import Loader from '../../components/feedback/Loader'
import { ROUTES } from '../../constants/routes'
import { useToast } from '../../hooks/useToast'
import { useGenerateItinerary } from './useItineraries'

export default function GenerateItineraryForm() {
  const [interests, setInterests] = useState('')
  const { loading, run } = useGenerateItinerary()
  const toast = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const itinerary = await run({
        interests: interests
          .split(',')
          .map((i) => i.trim())
          .filter(Boolean),
      })
      navigate(ROUTES.ITINERARY_DETAIL(itinerary.id))
    } catch {
      toast('Could not generate an itinerary right now.', 'critical')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 p-4">
      <input
        className="min-w-[240px] flex-1 rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
        placeholder="Interests, comma separated (e.g. market, museum)"
        value={interests}
        onChange={(event) => setInterests(event.target.value)}
      />
      <Button type="submit" disabled={loading}>
        Generate itinerary
      </Button>
      {loading && <Loader label="Ranking safe, relevant stops…" />}
    </form>
  )
}
