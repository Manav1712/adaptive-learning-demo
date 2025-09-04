"use client"

import * as Sentry from '@sentry/nextjs'

export default function SentryDebugPage() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-4">
      <h1 className="text-2xl font-bold">Sentry Debug</h1>
      <button
        className="px-4 py-2 rounded bg-destructive text-white"
        onClick={() => {
          try {
            throw new Error('Manual Sentry test error')
          } catch (e) {
            Sentry.captureException(e)
          }
        }}
      >
        Capture handled error
      </button>
      <button
        className="px-4 py-2 rounded border"
        onClick={() => {
          throw new Error('Uncaught Sentry test error')
        }}
      >
        Throw uncaught error
      </button>
    </div>
  )
}


