import { useApi } from '../../hooks/useApi'
import * as profileService from '../../services/profileService'

export const useMyProfile = () => useApi(profileService.fetchMyProfile)
export const useUpdatePreferences = () => useApi(profileService.updateMyPreferences)
export const useExportData = () => useApi(profileService.exportMyData)
