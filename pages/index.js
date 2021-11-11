/* eslint-disable @next/next/no-img-element, camelcase */
import { Transition } from '@headlessui/react'
import { Octokit } from '@octokit/core'
import Head from 'next/head'
import React, { createRef, useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import ReCAPTCHA from 'react-google-recaptcha'
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa'

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
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.RECAPTCHA_SITE_KEY}
        onChange={() => setShowHuman(true)}
        onErrored={() => setErrorCaptcha(true)}
      />
      <div className="flex flex-col min-h-screen">
        <div className="m-auto">
          <div className="flex flex-col max-w-sm px-6 pb-5 bg-white shadow-lg rounded-2xl pt-7">
            <div className="flex flex-col gap-5 md:flex-row">
              <img
                className="w-24 h-24 mx-auto border-gray-800 rounded-lg"
                src={avatar_url} alt="Me"
              />
              <div className="flex flex-col mb-3 text-center md:text-left">
                <div className="pt-2 pb-1 text-2xl font-medium text-gray-800 font-nunito-sans">
                  <h1>Christian Quispe</h1>
                </div>
                <div className='text-gray-500 font-chilanka'>
                  <h2>{bio} </h2>
                  <h2>Artificial Intelligence</h2>
                </div>

              </div>
            </div>

            <div className="flex items-center justify-between gap-3 mt-3">

              <LinkedinComponent showHuman={showHuman} email={email} recaptchaRef={recaptchaRef} ReactGA={ReactGA} />
              <WhatsappComponent showHuman={showHuman} email={email} recaptchaRef={recaptchaRef} ReactGA={ReactGA} />

              <a
                href="#"
                title='Click me!'
                onClick={() => setShowMoreOptions((old) => !old)}
                className={'bg-gray-800 border-white rounded border relative px-3 py-3 text-white'}>
                {!showMoreOptions ? <FaAngleDoubleDown className='animate-bounce' /> : <FaAngleDoubleUp />}
              </a>
            </div>

            <Transition
              show={showMoreOptions}
              enter="transition duration-500 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-200 opacity-100"
              leave="transition duration-300 ease-out"
              leaveFrom="transform scale-200 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >

              <hr className='h-px mt-3 mb-2 border-0 sm:mt-0 md:mt-5 bg-gradient-to-l from-gray-200 via-gray-800 to-gray-200' />
              <div className="flex flex-col">
                {calendly}
                <ResumePdfComponent showHuman={showHuman} email={email} recaptchaRef={recaptchaRef} ReactGA={ReactGA} />
                <MailComponent showHuman={showHuman} email={email} recaptchaRef={recaptchaRef} ReactGA={ReactGA} />
                {paypal}
              </div>
            </Transition>

          </div>

          <AlertRobotComponent errorCaptcha={errorCaptcha} />

        </div>
        <div id="stars0"></div>
        <div id="stars1"></div>
        <div id="stars2"></div>
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
