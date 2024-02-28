'use client'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { Session } from 'next-auth'

export const Providers = ({
  children,
  session,
}: {
  children: React.ReactNode
  session?: Session
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
