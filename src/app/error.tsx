'use client'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  // @ts-ignore
  if (error.statusCode && error.statusCode === 401) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <h2 className="text-4xl font-bold">You must be signed in to vote!</h2>

        <div className="my-8">
          <button
            className="rounded-md bg-black px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-black"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h2 className="text-4xl font-bold">Something went wrong!</h2>

      <p className="">{error.message}</p>

      <div className="my-8">
        <button
          className="rounded-md bg-black px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-black"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  )
}
