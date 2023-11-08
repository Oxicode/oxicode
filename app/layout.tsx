import './globals.css'

import type { Metadata } from 'next'
import { ReactNode } from 'react'

import { classNames } from '@/utils/helpers'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  keywords: process.env.KEYWORDS
}

export default function RootLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={classNames('overflow-hidden')}>{children}</body>
    </html>
  )
}