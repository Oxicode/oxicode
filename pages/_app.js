import 'tailwindcss/tailwind.css'
import '@/css/style.css'

import Head from 'next/head'

function MyApp ({ Component, pageProps }) {
  return <>
    <Head>
      <title>Profile Oxicode.io</title>
      <meta name="keywords" content={process.env.KEYWORDS}/>
      <meta name="author" content="Oxicode" />
      <meta name="theme-color" content="#1b2735" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
