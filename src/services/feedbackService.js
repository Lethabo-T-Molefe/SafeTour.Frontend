import { ENDPOINTS } from '../constants/api'
import { api } from '../lib'

export const submitFeedback = async ({ subjectType, subjectId, rating, comment }) => {
  const { data } = await api.post(ENDPOINTS.FEEDBACK.SUBMIT, {
    subject_type: subjectType,
    subject_id: subjectId,
    rating,
    comment,
  })
  return data
}
