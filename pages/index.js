/* eslint-disable @next/next/no-img-element, camelcase, react-hooks/exhaustive-deps */
import { Transition } from '@headlessui/react'
import { Octokit } from '@octokit/core'
import Head from 'next/head'
import React, { createRef, useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import ReCAPTCHA from 'react-google-recaptcha'
import { FaAngleDoubleDown, FaAngleDoubleUp, FaGithub } from 'react-icons/fa'
import TypeIt from 'typeit-react'
import { createApi } from 'unsplash-js'

import { classNames, randomElement, removeBanned } from '@/components/helper'
import {
  AlertRobotComponent,
  Calendly,
  LinkedinComponent,
  MailComponent,
  Paypal,
  ResumePdfComponent,
  WhatsappComponent
} from '@/components/navbar'
import useScript from '@/components/useScript'

const Home = ({ bio, avatar_url, blog, email, randomE }) => {
  const recaptchaRef = createRef()
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [showHuman, setShowHuman] = useState(false)
  const [errorCaptcha, setErrorCaptcha] = useState(false)

  useEffect(() => {
    ReactGA.initialize(process.env.TRACKING_ID)
    recaptchaRef.current.execute()
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  }, [])

  const statusScript = useScript(
    'https://adrianotiger.github.io/web-esheep/dist/esheep.min.js'
  )

  useEffect(() => {
    const DEFAULT_XML = window?.location?.origin + '/pets/neko.xml'

    if (statusScript === 'ready') {
      // eslint-disable-next-line no-undef, new-cap
      new eSheep({ allowPets: 'none', allowPopup: 'no' }).Start(DEFAULT_XML)
    }
  }, [statusScript])

  const isOnline = () => {
    const hours = new Date().getHours()
    return hours > 8 && hours < 20
  }

  return (
    <>
      <Head>
        <title>Profile Christian Quispe | Oxicode</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={bio} />
        <meta property="og:title" content="Resume Christian Quispe" />
        <meta property="og:description" content={bio} />
        <meta property="og:image" content={avatar_url} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:url" content={blog} />
        <meta property="og:type" content="website" />
        <meta property="og:profile:username" content="oxicode" />
      </Head>

      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.RECAPTCHA_SITE_KEY}
        onChange={() => setShowHuman(true)}
        onErrored={() => setErrorCaptcha(true)}
      />

      <div className="absolute right-0 z-10 text-center origin-top rotate-45 translate-x-1/2 bg-white mt-9 mr-9 w-72" >
        <div className="py-1 lg:text-xl">
          <a href="https://github.com/oxicode" target='_blank' rel="noreferrer">
            <FaGithub className={'align-sub inline-block'} /> Github
          </a>
        </div>
      </div>
      <div
        style={{ '--bg-url': `url(${randomE})` }}
        className="flex flex-col min-h-screen bg-cover bg-[image:var(--bg-url)]" >
        <div className="relative m-auto">
          <div className="absolute top-0 left-0 w-full h-6 bg-zz-bottom bg-[length:1rem]"></div>
          <div className="absolute bottom-0 left-0 w-full h-6 bg-zz-top bg-[length:1rem]"></div>

          <div className="px-6 pb-5 my-6 bg-white pt-7 zigzag">
            <div className="flex flex-col max-w-sm ">
              <div className="flex flex-col gap-5 bg-white md:flex-row">

                <span className="relative inline-block">
                  <img
                    className="w-24 h-24 mx-auto border-gray-800 rounded-md"
                    src={avatar_url}
                    alt=""
                  />
                  <span className="absolute bottom-0 right-0 block transform translate-x-1/2 border-2 border-white rounded-full">
                    <span className={classNames('block w-4 h-4  rounded-full', isOnline() ? 'bg-green-400' : 'bg-gray-300')} />
                  </span>
                </span>
                <div className="flex flex-col mb-3 text-center select-all md:text-left">
                  <div className="pt-2 pb-1 text-2xl font-medium text-stone-800 font-nunito-sans">
                    <h1>Christian Quispe</h1>
                  </div>
                  <div className='text-neutral-800 font-chilanka'>
                    <h2>{bio} </h2>
                    <h2>Artificial Intelligence 🤖</h2>
                  </div>

                </div>
              </div>
              <Transition
                show={!showMoreOptions}
                enter="transition duration-500 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-200 opacity-100"
                leave="transition duration-300 ease-out"
                leaveFrom="transform scale-200 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <div className={'max-w-[18rem] my-3 select-none'}>
                  <p className='text-sm text-justify md:pt-1'>
                    I am a full-stack developer focused on WS integrations with Artificial Intelligence from the cloud. {' '}
                    <TypeIt
                      options={{
                        speed: 50,
                        waitUntilVisible: true,
                        afterComplete: function (instance) {
                          try {
                            instance.destroy()
                          } catch (e) {
                          }
                        }
                      }}
                      getBeforeInit={(instance) => {
                        instance
                          .type('I have solid experience in technologies like Javascript/NodeJS (7 ')
                          .pause(750)
                          .delete(2)
                          .pause(500)
                          .type('8 years), Python (4 years), PHP (10 ')
                          .pause(750)
                          .delete(2)
                          .pause(500)
                          .type('1 years), also other technologies <span class="font-bold">awesome.!</span>')

                        return instance
                      }}
                    />

                  </p>
                </div>

              </Transition>
              <div className="flex items-center justify-between gap-3 mt-2">

                <ResumePdfComponent showHuman={showHuman} email={email} recaptchaRef={recaptchaRef} ReactGA={ReactGA} />
                <LinkedinComponent showHuman={showHuman} email={email} recaptchaRef={recaptchaRef} ReactGA={ReactGA} />

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
                enter="transition duration-700 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-200 opacity-100"
                leave="transition duration-500 ease-out"
                leaveFrom="transform scale-200 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >

                <hr className='h-px my-4 border-0 bg-gradient-to-l from-gray-200 via-gray-800 to-gray-200' />

                <div className="flex flex-col space-y-5">
                  <WhatsappComponent showHuman={showHuman} email={email} recaptchaRef={recaptchaRef} ReactGA={ReactGA} />
                  <Calendly />
                  <MailComponent showHuman={showHuman} email={email} recaptchaRef={recaptchaRef} ReactGA={ReactGA} />
                  <Paypal />
                </div>
              </Transition>

            </div>
          </div>

          <AlertRobotComponent errorCaptcha={errorCaptcha} />

        </div>

      </div>
    </>
  )
}

export async function getStaticProps () {
  const octokit = new Octokit({ auth: process.env.TOKEN_GITHUB })

  const response = await octokit.request('GET /user')
  const { bio, avatar_url, blog, email } = response.data

  const unsplash = createApi({ accessKey: process.env.KEY_UNSPLASH })
  const result = await unsplash.search.getPhotos({
    query: randomElement(['dev', 'nodejs', 'python', 'php']),
    orderBy: 'relevant',
    orientation: 'landscape'
  })

  const filterResults = randomElement(removeBanned(result.response.results))

  const randomE = (result.type === 'success')
    ? filterResults.urls.full
    : ''

  return {
    props: {
      bio, avatar_url, blog, email, randomE
    }
  }
}

export default Home
