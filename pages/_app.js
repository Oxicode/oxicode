import Head from 'next/head'

import 'tailwindcss/tailwind.css'
import '@/css/style.css'

function MyApp ({ Component, pageProps }) {
  return <>
    <Head>
      <meta name="keywords" content="oxicode, Juan Christian, Juan Christian Quispe Huanca, Christian QH"/>
      <meta name="author" content="Oxicode" />
      <meta name="theme-color" content="#1b2735" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
