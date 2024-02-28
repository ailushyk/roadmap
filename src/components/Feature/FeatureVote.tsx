'use client'
import { useSession } from 'next-auth/react'
import { VoteAction } from '@comcert/ui'

export const FeatureVote = ({
  feature,
  onClick,
}: {
  feature: Feature
  onClick(args: { featureId: string; hasMyVote: boolean }): Promise<void>
}) => {
  const session = useSession()
  return (
    <VoteAction
      selected={feature.hasMyVote}
      disabled={session?.status === 'unauthenticated'}
      onClick={async () => {
        await onClick({
          featureId: feature.id,
          hasMyVote: feature.hasMyVote,
        })
      }}
    >
      {feature.voteCount}
    </VoteAction>
  )
}
