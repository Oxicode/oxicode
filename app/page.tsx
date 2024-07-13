import { Metadata } from 'next'

import getData from '@/app/actions'

import HomeComponent from './_components/HomeComponent'

export const metadata: Metadata = {
  authors: [{ name: 'Oxicode' }],
  themeColor: '#1b2735',
  openGraph: {
    type: 'profile',
    username: 'oxicode'

  }
}

const Home = async () => {
  const { bio, avatarUrl, randomE, tracking } = await getData()

  return <>
    <div
      style={{ backgroundImage: `url(${randomE})` }}
      className="bg-cover absolute inset-0 blur-sm"
    />
    <div className="flex flex-col h-screen">
      <div className="relative m-auto">
        <div className="absolute top-1 left-0 w-full h-7 bg-zz-bottom border-0 bg-[length:1rem]" />

        <HomeComponent
          bio={bio ?? ''}
          avatarUrl={avatarUrl}
          tracking={tracking}
        />

        <div className="absolute bottom-1 left-0 w-full h-7 bg-zz-top border-0 bg-[length:1rem]" />

      </div>
    </div>
  </>
}

export default Home
