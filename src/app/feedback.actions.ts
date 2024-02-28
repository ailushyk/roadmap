'use server'
import { api } from '@/api/api'

export async function addFeedback(feedback: {
  content: string
  email?: string
}) {
  await api().feedback.add(feedback)
}
