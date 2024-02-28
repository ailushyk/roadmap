type User = {
  id: string
  name: string
  email: string
  image: string
}

type FeatureType = 'started' | 'planned' | 'completed'

type Feature = {
  id: string
  type: FeatureType
  title: string
  description: string
  voteCount: number
  hasMyVote: boolean
  createdAt: string
  updatedAt: string
}

type Feedback = {
  id: string
  content: string
  userId: string
  createdAt: string
  updatedAt: string
}
