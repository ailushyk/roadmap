'use server'

import { api } from '@/api/api'
import { revalidateTag } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { UnauthorizedError } from '@/lib/UnauthorizedError'

export async function toggleVote({
  featureId,
  hasMyVote,
}: {
  featureId: string
  hasMyVote: boolean
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    // throw error with 401 status code if not authenticated
    throw new UnauthorizedError(
      'You are not authorized to access this resource',
    )
  }

  if (hasMyVote) {
    await api().features.deleteVote({ featureId })
  } else {
    await api().features.addVote({ featureId })
  }

  revalidateTag(`votes`)
}
