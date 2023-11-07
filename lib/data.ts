'use server'

import { Octokit } from '@octokit/core'
import { createApi } from 'unsplash-js'

import { randomElement, removeBanned } from '@/utils/helpers'

async function getData() {
  console.log({ auth: process.env.TOKEN_GITHUB })
  const octokit = new Octokit({ auth: process.env.TOKEN_GITHUB })
  console.log('file: data.ts:11 ~ getData ~ octokit:', octokit)

  const response = await octokit.request('GET /user', {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.machine-man-preview+json'
    }
  })
  const { bio, avatar_url: avatarUrl, blog, email } = response.data

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
    bio, avatarUrl, blog, email, randomE, tracking
  }
}

export default getData
