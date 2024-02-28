'use client'

import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { PowerIcon } from '@heroicons/react/24/solid'

export const LoginButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="hover:underline" onClick={() => signIn('keycloak')}>
      {children}
    </button>
  )
}

export const LogoutButton = () => {
  const { data: session } = useSession()
  return (
    <span className="group flex items-center">
      <span className="pl-3 text-neutral-400 transition-colors group-hover:text-neutral-900 group-hover:dark:text-neutral-100">
        {session?.user.name}
      </span>
      <button
        onClick={() => signOut()}
        className="p-3 text-neutral-400 transition-colors hover:text-red-500"
      >
        <PowerIcon className="h-5 w-5 transition-transform group-hover:rotate-180" />
      </button>
    </span>
  )
}
