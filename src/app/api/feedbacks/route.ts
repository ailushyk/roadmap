import { api } from '@/api/api'

export async function GET(request: Request) {
  return new Response(JSON.stringify(await api().feedback.getAll()))
}
