import React from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { FeatureRow } from '@/components/Feature/FeatureRow'
import { Feedback } from '@/components/feedback/Feedback'
import { api } from '@/api/api'
import ccLogo from '@/assets/comcert-full-logo.svg'
import cfLogo from '@/assets/cyberfortress-logo.svg'
import { LoginButton, LogoutButton } from '@/components/auth'
import { getServerSession } from 'next-auth'
import { addFeedback } from '@/app/feedback.actions'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import {
  Landing,
  LandingTopBar,
  LandingTopBarLeft,
  LandingTopBarRight,
  LandingHeader,
  LandingContainer,
} from '@comcert/ui'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const [started, planned, session] = await Promise.all([
    api().features.getStarted(),
    api().features.getPlanned(),
    getServerSession(authOptions),
  ])

  return (
    <Landing>
      <LandingTopBar>
        <LandingTopBarLeft>
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://www.comcert.pl?utm_source=roadmap&utm_medium=roadmap&utm_campaign=roadmap"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={ccLogo}
              alt="ComCERT Logo"
              height={30}
              priority
              className="h-full"
            />
          </a>
        </LandingTopBarLeft>

        {session ? (
          <LandingTopBarRight>
            <div className="-mb-4 -mt-3 border border-transparent">
              <LogoutButton />
            </div>
          </LandingTopBarRight>
        ) : (
          <LandingTopBarRight>
            <code className="border-b border-none font-mono font-bold underline-offset-2 hover:underline">
              <LoginButton>Sign in</LoginButton>
            </code>
            &nbsp;to leave your vote
          </LandingTopBarRight>
        )}
      </LandingTopBar>

      <LandingHeader>
        <h1 className="text-5xl font-bold">Roadmap</h1>
        <p>Submit feedback or upvote existing features.</p>

        <Image
          // className="relative mb-4 dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
          src={cfLogo}
          alt="Cyber Fortress Logo"
          className="relative mb-4"
          height={160}
          priority
        />

        <Feedback onSubmit={addFeedback} />
      </LandingHeader>

      <LandingContainer>
        {started.length === 0 ? null : (
          <div className="mb-20 w-full">
            <h2 className="px-6 text-xl font-semibold">Started</h2>
            {started.map((feature) => (
              <FeatureRow key={feature.id} feature={feature} />
            ))}
          </div>
        )}

        {planned.length === 0 ? (
          <div className="mb-20 w-full text-center">
            <h2 className="px-6 text-xl font-semibold">Coming soon!</h2>
            <p>Soon you will see more features here</p>
          </div>
        ) : (
          <div className="mb-20 w-full">
            <h2 className="px-6 text-xl font-semibold">Planned</h2>

            {planned.map((feature) => (
              <FeatureRow key={feature.id} feature={feature} />
            ))}
          </div>
        )}
      </LandingContainer>
    </Landing>
  )
}
