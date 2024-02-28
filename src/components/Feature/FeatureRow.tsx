import { toggleVote } from '@/app/feature.actions'
import { FeatureVote } from '@/components/Feature/FeatureVote'
import {
  DiscussionRow,
  DiscussionContent,
  DiscussionActions,
  DiscussionTitle,
  DiscussionSubTitle,
} from '@comcert/ui'

export function FeatureRow({ feature }: { feature: Feature }) {
  return (
    <DiscussionRow>
      <DiscussionContent>
        <DiscussionTitle>{feature.title}</DiscussionTitle>
        <DiscussionSubTitle>{feature.description}</DiscussionSubTitle>
      </DiscussionContent>

      <DiscussionActions>
        <div className="transition group-hover:translate-y-0 group-hover:opacity-100 lg:translate-y-8 lg:opacity-0">
          {/* TODO: show feedback button */}
          <button className="invisible text-xs text-cyan-600 underline dark:text-cyan-500">
            Feedback
          </button>
        </div>
        <FeatureVote feature={feature} onClick={toggleVote} />
      </DiscussionActions>
    </DiscussionRow>
  )
}
