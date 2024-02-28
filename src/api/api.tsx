import { API_URL } from '@/constants'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export function api() {
  return {
    features: {
      getStarted: async () => {
        const { data } = await fetcher<{ data: Feature[] }>(
          `${API_URL}/features/started`,
          {
            headers: await getHeaders(),
            next: { tags: ['votes'] },
          },
        )
        return data
      },
      getPlanned: async () => {
        const { data } = await fetcher<{ data: Feature[] }>(
          `${API_URL}/features/planned`,
          {
            headers: await getHeaders(),
          },
        )
        return data
      },
      addVote: async ({ featureId }: { featureId: string }) => {
        const { data } = await fetcher<{ data: Feature }>(
          `${API_URL}/features/${featureId}/votes`,
          {
            method: 'POST',
            headers: await getHeaders(),
          },
        )
        return data
      },
      deleteVote: async ({ featureId }: { featureId: string }) => {
        const { data } = await fetcher<{ data: Feature }>(
          `${API_URL}/features/${featureId}/votes`,
          {
            method: 'DELETE',
            headers: await getHeaders(),
          },
        )
        return data
      },
    },
    feedback: {
      getAll: async () => {
        const { data } = await fetcher<{ data: Feedback[] }>(
          `${API_URL}/feedbacks`,
          {
            method: 'GET',
            headers: await getHeaders(),
          },
        )
        return data
      },
      add: async (feedback: { content: string; email?: string }) => {
        const { data } = await fetcher<{ data: Feedback }>(
          `${API_URL}/feedbacks`,
          {
            method: 'POST',
            headers: await getHeaders(),
            body: JSON.stringify(feedback),
          },
        )
        return data
      },
    },
    // auth: {
    //   userinfo: async () => {
    //     const { data } = await fetcher<{ data: User }>(`${API_URL}/userinfo`, {
    //       headers: await getHeaders(),
    //     })
    //     return data
    //   },
    // },
  }
}

const fetcher = async <T,>(...args: Parameters<typeof fetch>): Promise<T> => {
  const [url, init] = args
  const res = await fetch(url, {
    cache: 'no-cache',
    ...init,
  })

  if (!res.ok) {
    const error = new Error(
      `Failed to fetch ${url}. Status: ${res.status} ${res.statusText}`,
    )
    console.log(error)
    throw error
  }

  if (res.status === 204) {
    return {} as T
  }

  if (res.status === 401) {
    const error = new Error(
      `Unauthorized. Status: ${res.status} ${res.statusText}`,
    )
    console.log(error)
    throw error
  }

  return res.json()
}

async function getHeaders() {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  const session = await getServerSession(authOptions)
  // @ts-ignore
  const { accessToken } = session || {}
  if (accessToken) {
    headers.append('Authorization', `Bearer ${accessToken}`)
  }
  return headers
}
