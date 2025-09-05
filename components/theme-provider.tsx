'use client'

import type { ReactNode } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

interface AnyThemeProviderProps {
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  children?: ReactNode
}

export function ThemeProvider({ children, ...props }: AnyThemeProviderProps) {
  return <NextThemesProvider {...(props as any)}>{children}</NextThemesProvider>
}
