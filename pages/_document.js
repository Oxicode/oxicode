import Document, { Head, Html, Main, NextScript } from 'next/document'

import { classNames } from '@/components/helper'

class MyDocument extends Document {
  render () {
    const randomColorClass = (Math.random() > 0.5) ? 'bg-gradient-to-l' : 'bg-gradient-to-bl'
    const randomBGClass = (Math.random() > 0.5) ? 'bg-[url("/svg/circuit-board.svg")]' : ''

    return (
      <Html className={classNames(randomColorClass, 'from-gray-800 to-gray-900')} lang='en'>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Chilanka&display=swap"
            rel="stylesheet"
          />
          <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className={classNames('overflow-hidden', randomBGClass)}>
          <Main />
          <NextScript />
          {randomBGClass === ''
            ? <>
              <div id="stars1"></div>
              <div id="stars2"></div>
              <div id="stars3"></div>
            </>
            : <></>}
        </body>
      </Html>
    )
  }
}

export default MyDocument
