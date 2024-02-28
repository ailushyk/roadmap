'use client'
import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FeedbackForm } from '@/components/feedback/FeddbackForm'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'

export function Feedback({ onSubmit }) {
  const session = useSession()
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button
        className="rounded-md bg-black px-6 py-3 text-sm font-semibold text-white dark:bg-white dark:text-black"
        onClick={() => {
          if (session?.status === 'unauthenticated') {
            alert('You must be signed in to vote.')
            return
          }
          openModal()
        }}
      >
        Submit Feedback
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-lg border bg-neutral-100 p-6 text-left align-middle shadow-xl transition-all dark:border-neutral-800 dark:bg-neutral-900">
                  <button
                    className="absolute right-3 top-3 p-2 text-neutral-400 transition-colors hover:text-neutral-900 dark:text-neutral-500 hover:dark:text-neutral-300"
                    onClick={closeModal}
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="px-6 py-6 text-center text-2xl font-semibold leading-6"
                  >
                    Submit feedback
                  </Dialog.Title>

                  <FeedbackForm onSubmit={onSubmit} onClose={closeModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
