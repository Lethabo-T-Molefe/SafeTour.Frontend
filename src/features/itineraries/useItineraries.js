import { useApi } from '../../hooks/useApi'
import * as itineraryService from '../../services/itineraryService'

export const useGenerateItinerary = () => useApi(itineraryService.generateItinerary)
export const useMyItineraries = () => useApi(itineraryService.listMyItineraries)
export const useItinerary = () => useApi(itineraryService.fetchItinerary)
export const useSaveItinerary = () => useApi(itineraryService.saveItinerary)
