import Head from 'next/head'

import HomeComponent from '@/components/HomeComponent'
import getData from '@/lib/data'

const Home = async () => {
  const { bio, avatarUrl, blog, randomE, tracking } = await getData()

  return <>
    <Head>
      <meta name="author" content="Oxicode" />
      <meta name="theme-color" content="#1b2735" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:type" content="website" />
      <meta property="og:profile:username" content="oxicode" />
    </Head>

    <HomeComponent
      bio={bio ?? ''}
      avatarUrl={avatarUrl}
      blog={blog ?? ''}
      randomE={randomE}
      tracking={`${tracking ?? false}`}
    />
  </>
}

export default Home
