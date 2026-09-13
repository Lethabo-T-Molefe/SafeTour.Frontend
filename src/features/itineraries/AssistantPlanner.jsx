import { useState } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Loader from '../../components/feedback/Loader'
import { ROUTES } from '../../constants/routes'
import { useToast } from '../../hooks/useToast'
import { useApi } from '../../hooks/useApi'
import * as assistantService from '../../services/assistantService'

// FR-ITIN-5: turns free text into an explained, generated itinerary. The
// assistant is a contained orchestrator — every place and risk figure it
// shows still comes from the itinerary it generates, never invented text.
export default function AssistantPlanner() {
  const [message, setMessage] = useState('')
  const { data: result, loading, run } = useApi(assistantService.askAssistant)
  const toast = useToast()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!message.trim()) return
    try {
      await run({ message })
    } catch {
      toast('The assistant could not plan that right now.', 'critical')
    }
  }

  return (
    <Card title="Ask the assistant">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          placeholder='e.g. "Something with markets and museums this afternoon"'
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <Button type="submit">Ask</Button>
      </form>
      {loading && <Loader label="Thinking…" />}
      {result && (
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <p className="text-slate-200">{result.reply_text}</p>
            <Badge status={result.used_llm ? 'success' : 'info'}>{result.used_llm ? 'AI-assisted' : 'keyword match'}</Badge>
          </div>
          <Link to={ROUTES.ITINERARY_DETAIL(result.itinerary.id)} className="text-emerald-400 hover:underline">
            View the generated itinerary →
          </Link>
        </div>
      )}
    </Card>
  )
}
