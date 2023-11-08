import './globals.css'
import './style.css'

import type { Metadata } from 'next'
import { ReactNode } from 'react'

import { classNames } from '@/utils/helpers'

export const metadata: Metadata = {
  title: 'Profile Christian Quispe | Oxicode',
  description: 'Christian Quispe is a software developer who specializes in building (and occasionally designing) exceptional digital experiences. Currently, he is focused on building accessible, human-centered products at @Oxicode.',
  keywords: process.env.KEYWORDS
}

export default function RootLayout({
  children
}: {
  children: ReactNode
}) {
  const randomColorClass = (Math.random() > 0.5) ? 'bg-gradient-to-l' : 'bg-gradient-to-bl'
  const randomBGClass = (Math.random() > 0.5) ? 'bg-[url("/svg/circuit-board.svg")]' : ''

  return (
    <html className={classNames(randomColorClass, 'from-gray-900 to-black')} lang='en'>
      <body className={classNames('overflow-hidden', randomBGClass)}>
        {children}
        {randomBGClass === ''
          ? <>
            <div id="stars1"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
          </>
          : <></>
        }
      </body>
    </html>
  )
}
