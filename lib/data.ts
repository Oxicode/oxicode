'use server'

import axios from 'axios'
import { createApi } from 'unsplash-js'

import { randomElement, removeBanned } from '@/utils/helpers'

async function getData() {
  const { data, status } = await axios.get('https://api.github.com/users/oxicode')

  if (status !== 200) {
    throw new Error('Cannot fetch user data')
  }

  const { bio, avatar_url: avatarUrl, blog } = data

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
    bio, avatarUrl, blog, randomE, tracking
  }
}

export default getData
