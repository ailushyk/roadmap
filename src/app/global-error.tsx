'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
          <h2 className="text-4xl font-bold">Something went wrong!</h2>

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
      </body>
    </html>
  )
}
