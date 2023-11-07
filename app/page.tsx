import { createApi } from 'unsplash-js'

import { randomElement, removeBanned } from '@/utils/helpers'
import { Octokit } from '@octokit/core'
import HomeComponent from '@/components/HomeComponent'
import Head from 'next/head'

const Home = async () => {
  const { bio, avatar_url, blog, email, randomE, tracking } = await getData()

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
      avatar_url={avatar_url}
      blog={blog ?? ''}
      email={email ?? ''}
      randomE={randomE}
      tracking={`${tracking ?? false}`}
    />
  </>
}

async function getData() {
  const octokit = new Octokit({ auth: process.env.TOKEN_GITHUB })

  const response = await octokit.request('GET /user')
  const { bio, avatar_url, blog, email } = response.data

  const unsplash = createApi({ accessKey: process.env.KEY_UNSPLASH ?? '' })
  const result = await unsplash.search.getPhotos({
    query: randomElement(['dev', 'nodejs', 'python', 'php', 'code']),
    orderBy: 'relevant',
    orientation: 'landscape'
  })

  const filterResults = randomElement(removeBanned(result?.response?.results ?? []))

  const randomE = (result.type === 'success')
    ? filterResults.urls.full
    : ''

  const tracking = process.env.TRACKING_ID ?? false

  return {
    bio, avatar_url, blog, email, randomE, tracking
  }
}

export default Home
