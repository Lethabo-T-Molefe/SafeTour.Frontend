import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useState } from 'react'
import { GeoJSON, MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import { DEFAULT_MAP_CENTER, RISK_BAND_STYLES } from '../../constants/site'
import * as geoService from '../../services/geoService'
import * as riskService from '../../services/riskService'
import Alert from '../../components/feedback/Alert'
import Loader from '../../components/feedback/Loader'
import { useLastSynced } from '../../hooks/useLastSynced'
import { formatTimestamp } from '../../utils/dateHelpers'
import RiskBadge from './RiskBadge'

function ClickToCheckRisk({ timeBand, onResult, onError }) {
  useMapEvents({
    click: async (event) => {
      const { lat, lng } = event.latlng
      try {
        const result = await riskService.fetchRisk({ lon: lng, lat, timeBand })
        onResult({ lat, lon: lng, ...result })
      } catch {
        onError('Could not look up risk for that point.')
      }
    },
  })
  return null
}

export default function RiskMap({ timeBand }) {
  const [loading, setLoading] = useState(true)
  const [features, setFeatures] = useState([])
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState(null)
  const { lastSyncedAt, stale, markSynced } = useLastSynced('risk-heatmap', 15)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const [precincts, heatmap] = await Promise.all([geoService.fetchPrecincts(), riskService.fetchHeatmap({ timeBand })])
        if (cancelled) return
        const byId = new Map(heatmap.map((cell) => [cell.precinct_id, cell]))
        setFeatures(
          precincts.map((precinct) => ({
            type: 'Feature',
            geometry: precinct.boundary_geojson,
            properties: {
              name: precinct.name,
              band: byId.get(precinct.id)?.band ?? 'insufficient_data',
              score: byId.get(precinct.id)?.score ?? null,
              dataDate: byId.get(precinct.id)?.data_date ?? null,
            },
          }))
        )
        markSynced()
      } catch {
        if (!cancelled) setError('Could not load the risk layer. The map still works — try again shortly.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeBand])

  const geojson = useMemo(() => ({ type: 'FeatureCollection', features }), [features])

  const styleFeature = (feature) => {
    const style = RISK_BAND_STYLES[feature.properties.band] ?? RISK_BAND_STYLES.insufficient_data
    return { color: style.color, weight: 1, fillColor: style.color, fillOpacity: 0.35 }
  }

  return (
    <div className="space-y-2">
      <div className="h-[340px] overflow-hidden rounded-lg border border-slate-800 sm:h-[420px] lg:h-[520px]">
        <MapContainer center={[DEFAULT_MAP_CENTER.lat, DEFAULT_MAP_CENTER.lon]} zoom={12} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {features.length > 0 && <GeoJSON key={timeBand} data={geojson} style={styleFeature} />}
          <ClickToCheckRisk timeBand={timeBand} onResult={setSelected} onError={setError} />
        </MapContainer>
      </div>

      {loading && <Loader label="Loading the precinct risk layer…" />}
      {error && <Alert message={error} severity="warning" />}
      {!loading && !error && stale && lastSyncedAt && (
        <Alert
          message={`Showing data last refreshed ${formatTimestamp(lastSyncedAt)} — reconnect to update it.`}
          severity="warning"
        />
      )}

      {selected && (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 p-3 text-sm">
          <span className="text-slate-300">
            {selected.lat.toFixed(4)}, {selected.lon.toFixed(4)}
          </span>
          <RiskBadge band={selected.band} score={selected.score} />
          <span className="text-xs text-slate-400">
            {selected.data_date ? `data as of ${selected.data_date}` : 'no crime data ingested for this precinct yet'}
          </span>
        </div>
      )}

      <p className="text-xs text-slate-500">
        Guidance is relative and advisory, and specific to this place and time band — it is never a safety
        guarantee. Click the map to check a point.
      </p>
    </div>
  )
}
