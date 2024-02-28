import { useRef, useTransition } from 'react'
import { Loader } from '@comcert/ui'

export function FeedbackForm({ onSubmit, onClose }) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()

  return (
    <form
      className="flex flex-col gap-4"
      action={async (formData) => {
        const content = formData.get('content') as string
        const email = formData.get('email') as string

        startTransition(async () => {
          await onSubmit({ content, email })
          formRef.current.reset()
          onClose()
        })
      }}
      ref={formRef}
    >
      <fieldset disabled={isPending}>
        <label className="flex flex-col">
          <textarea
            name="content"
            className="mt-2 rounded-md px-4 py-2 outline outline-2 outline-neutral-300 transition-colors placeholder:text-sm placeholder:text-neutral-400 focus:outline-neutral-500 dark:bg-black/70 dark:outline-neutral-700 dark:placeholder:text-neutral-600"
            rows={4}
            placeholder="Enter your feedback"
            required
          />
        </label>
      </fieldset>

      <fieldset disabled={isPending} className="hidden">
        <label className="flex flex-col">
          <span className="text-sm">Email</span>
          <input
            name="email"
            className="mt-2 rounded-md px-4 py-2 outline outline-2 outline-neutral-300 transition-colors placeholder:text-sm placeholder:text-neutral-400 focus:outline-neutral-500 dark:bg-black/70 dark:outline-neutral-700 dark:placeholder:text-neutral-600"
            type="text"
            placeholder="Enter your email"
          />
        </label>
      </fieldset>

      <div className="mt-4 text-right">
        <button
          className={`w-40 rounded-md bg-black py-3 text-center text-sm font-semibold text-white dark:bg-white dark:text-black ${
            isPending ? 'cursor-wait opacity-80' : ''
          }`}
          disabled={isPending}
        >
          {isPending ? <Loader /> : 'Submit'}
        </button>
      </div>
    </form>
  )
}
