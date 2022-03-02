/* eslint-disable @next/next/no-img-element, camelcase */
import { Transition } from '@headlessui/react'
import { Octokit } from '@octokit/core'
import Head from 'next/head'
import React, { createRef, useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import ReCAPTCHA from 'react-google-recaptcha'
import { FaAngleDoubleDown, FaGithub, FaLinkedin } from 'react-icons/fa'
import { ScriptLoader } from 'react-use-scripts'

import {
  AlertRobotComponent,
  calendly,
  LinkedinComponent,
  MailComponent,
  paypal,
  ResumePdfComponent,
  WhatsappComponent
} from '@/components/navbar'

const Home = ({ bio, avatar_url, blog, email }) => {
  const recaptchaRef = createRef()
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [showHuman, setShowHuman] = useState(false)
  const [errorCaptcha, setErrorCaptcha] = useState(false)

  useEffect(() => {
    ReactGA.initialize(process.env.TRACKING_ID)
    recaptchaRef.current.execute()
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  })

  return (
    <>
      <Head>
        <title>Profile Christian Quispe | Oxicode</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="description" content={bio} />
        <meta property="og:title" content="Resume Christian Quispe" />
        <meta property="og:description" content={bio} />
        <meta property="og:image" content={avatar_url} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:url" content={blog} />
      </Head>

      <ScriptLoader
        onError={(err) => console.log({ err })}
        onReady={() => {
          const DEFAULT_XML = window?.location?.origin + '/pets/neko.xml'

          // eslint-disable-next-line no-undef, new-cap
          const sheep1 = new eSheep({ allowPets: 'none', allowPopup: 'no' })
          // eslint-disable-next-line no-undef, new-cap
          const sheep2 = new eSheep({ allowPets: 'none', allowPopup: 'no' })

          sheep1.Start(DEFAULT_XML)
          sheep2.Start(DEFAULT_XML)
        }}
        src='https://adrianotiger.github.io/web-esheep/dist/esheep.min.js'
      />

      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.RECAPTCHA_SITE_KEY}
        onChange={() => setShowHuman(true)}
        onErrored={() => setErrorCaptcha(true)}
      />

      <div className="min-h-screen ">
        <div className="relative max-w-5xl m-auto">
          <nav id="nav" className='relative flex h-16 p-0 pr-8 mt-16 overflow-hidden font-bold leading-loose text-white bg-gray-900 '>
            <ul className="flex list-none shrink grow">
              <li className="block pt-4 text-black align-middle bg-gray-200 active"><a className='block px-8' href="">About Me</a></li>
              <li className='block pt-4'><a className='block px-8' href="">CV</a></li>
            </ul>
            <ul className="hidden space-x-4 list-none md:flex shrink-0">
              <li className='block pt-4'><a href="https://www.linkedin.com/in/oxicode/" className="block"> <FaLinkedin size='1.5rem' /></a></li>
              <li className='block pt-4'><a href="https://github.com/oxicode" className="block"><FaGithub size='1.5rem' /> </a></li>
            </ul>
          </nav>
          <div className="bg-gray-200">
            <img
              className="w-24 h-24 mx-auto border-gray-800 rounded-lg"
              src={avatar_url} alt="Me"
            />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod consequuntur hic reprehenderit natus veniam et fugit corrupti, ab laborum reiciendis inventore laudantium dolorem odit eveniet minus sunt? Possimus, soluta fugiat!
          </div>
        </div>

      </div>
    </>
  )
}

export async function getStaticProps () {
  const octokit = new Octokit({ auth: process.env.TOKEN_GITHUB })

  const response = await octokit.request('GET /user')
  const { bio, avatar_url, blog, email } = response.data

  return {
    props: {
      bio, avatar_url, blog, email
    }
  }
}

export default Home
