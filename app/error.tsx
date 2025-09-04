"use client"

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-10 space-y-4">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="text-muted-foreground break-all">{error?.message}</p>
      <button className="px-4 py-2 rounded border" onClick={() => reset()}>Try again</button>
    </div>
  )
}


