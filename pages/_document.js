import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render () {
    const randomColorClass = (Math.random() > 0.5) ? 'bg-gradient-to-l' : 'bg-gradient-to-bl'

    return (
      <Html className={`${randomColorClass} from-gray-700 via-gray-900 to-black`} lang='en'>
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
        <body className='overflow-hidden'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
