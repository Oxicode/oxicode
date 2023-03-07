/* eslint-disable @next/next/no-img-element, camelcase, react-hooks/exhaustive-deps */
import { Transition } from '@headlessui/react'
import { Octokit } from '@octokit/core'
import Head from 'next/head'
import { NextSeo } from 'next-seo'
import React, { createRef, useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import ReCAPTCHA from 'react-google-recaptcha'
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa'
import { annotate } from 'rough-notation'
import TypeIt from 'typeit-react'
import { createApi } from 'unsplash-js'

import { classNames, randomElement, removeBanned } from '@/components/helper'
import {
  AlertRobotComponent,
  Calendly,
  Github,
  LinkedinComponent,
  MailComponent,
  Paypal,
  ResumePdfComponent,
  WhatsappComponent
} from '@/components/navbar'
import useScript from '@/components/useScript'

const Home = ({ bio, avatar_url, blog, email, randomE, tracking = false }) => {
  const recaptchaRef = createRef()

  const [isLoadPet, setIsLoadPet] = useState(0)
  const [showHuman, setShowHuman] = useState(false)
  const [errorCaptcha, setErrorCaptcha] = useState(false)
  const [showMoreOptions, setShowMoreOptions] = useState(false)

  useEffect(() => {
    tracking && ReactGA.initialize(tracking)
    recaptchaRef.current.execute()
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  }, [])

  const statusScript = useScript(
    'https://adrianotiger.github.io/web-esheep/dist/esheep.min.js'
  )

  useEffect(() => {
    const DEFAULT_XML = window?.location?.origin + '/pets/neko.xml'

    if (statusScript === 'ready' && isLoadPet < 2) {
      setIsLoadPet(old => old + 1)
      // eslint-disable-next-line no-undef, new-cap
      new eSheep({ allowPets: 'none', allowPopup: 'no' }).Start(DEFAULT_XML)
    }
  }, [statusScript])

  const isOnline = () => {
    const hours = new Date().getHours() - 5
    return hours > 8 && hours < 20
  }

  return (
    <>
      <Head>

        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:type" content="website" />
        <meta property="og:profile:username" content="oxicode" />
      </Head>

      <NextSeo
        title="Profile Christian Quispe | Oxicode"
        description={bio}
        canonical={'https://www.oxicode.com'}
        openGraph={{
          url: blog,
          title: 'Profile Christian Quispe',
          description: bio,
          images: [
            { url: '/images/oxicode.io.png' },
            { url: avatar_url }
          ],
          site_name: 'Oxicode Portfolio'
        }}

      />
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.RECAPTCHA_SITE_KEY}
        onChange={() => setShowHuman(true)}
        onErrored={() => setErrorCaptcha(true)}
      />
      {/*
      <div className="absolute z-10 inline w-full rotate-45 translate-x-1/2 translate-y-full bg-white right-16">
        <div className="py-1 mx-auto text-center lg:text-xl ">
          <a href="https://github.com/oxicode" target='_blank' rel="noreferrer" >
            <FaGithub className={'align-sub inline-block'} /> Github
          </a>
        </div>
      </div>
     */}
      <div
        style={{ '--bg-url': `url(${randomE})` }}
        className="bg-cover bg-[image:var(--bg-url)] absolute inset-0 blur-sm"
      />

      <div className="flex flex-col h-screen">
        <div className="relative m-auto">
          <div className="absolute top-1 left-0 w-full h-7 bg-zz-bottom border-0 bg-[length:1rem]" />

          <div className="px-6 pb-5 my-6 bg-white">
            <div className="flex flex-col max-w-sm pt-6">
              <div className="flex flex-col gap-5 bg-white md:flex-row">

                <span className="relative inline-block mx-auto">
                  <img
                    className="w-24 h-24 border-gray-800 rounded-md"
                    src={avatar_url}
                    alt=""
                  />
                  <span className="absolute bottom-0 right-0 block transform translate-x-1/2 translate-y-1/2 border-2 border-white rounded-full md:translate-y-0">
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
                    I am a Solution Architect focused on WS integrations with <span id="animate-01">Artificial Intelligence</span> from the cloud. {' '}
                    from the cloud. {' '}
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
                          .exec(() => {
                            const annotation1 = annotate(document.querySelector('#animate-01'), { type: 'highlight', color: '#FFD700' })
                            annotation1.show()
                          })
                          .pause(500)
                          .type('I have solid experience in technologies like <span id="animate-02">Javascript/NodeJS</span> (7 ')
                          .pause(750)
                          .delete(2)
                          .pause(500)
                          .type('8 years), <span id="animate-03">Python</span> (4 years), <span id="animate-04">PHP</span> (10 ')
                          .pause(750)
                          .delete(2)
                          .pause(500)
                          .type('1 years), also other technologies <span class="font-bold">awesome.!</span>')
                          .exec(() => {
                            const annotation = annotate(document.querySelector('#animate-02'), { type: 'circle', color: '#F44336' })
                            annotation.show()
                          })
                          .pause(1000)
                          .exec(() => {
                            const annotation = annotate(document.querySelector('#animate-03'), { type: 'circle', color: '#F44336' })
                            annotation.show()
                          })
                          .pause(1000)
                          .exec(() => {
                            const annotation = annotate(document.querySelector('#animate-04'), { type: 'circle', color: '#F44336' })
                            annotation.show()
                          })

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
                  <Github />
                  <Calendly />
                  <MailComponent showHuman={showHuman} email={email} recaptchaRef={recaptchaRef} ReactGA={ReactGA} />
                  <Paypal />
                </div>
              </Transition>

            </div>
            <AlertRobotComponent errorCaptcha={errorCaptcha} />
          </div>

          <div className="absolute bottom-1 left-0 w-full h-7 bg-zz-top border-0 bg-[length:1rem]" />

        </div>

      </div>
    </>
  )
}

export async function getStaticProps() {
  const octokit = new Octokit({ auth: process.env.TOKEN_GITHUB })

  const response = await octokit.request('GET /user')
  const { bio, avatar_url, blog, email } = response.data

  const unsplash = createApi({ accessKey: process.env.KEY_UNSPLASH })
  const result = await unsplash.search.getPhotos({
    query: randomElement(['dev', 'nodejs', 'python', 'php', 'code']),
    orderBy: 'relevant',
    orientation: 'landscape'
  })

  const filterResults = randomElement(removeBanned(result.response.results))

  const randomE = (result.type === 'success')
    ? filterResults.urls.full
    : ''

  const tracking = process.env.TRACKING_ID ?? false

  return {
    props: {
      bio, avatar_url, blog, email, randomE, tracking
    }
  }
}

export default Home
