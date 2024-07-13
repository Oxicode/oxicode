'use client'
/* eslint-disable react-hooks/exhaustive-deps */

import { Transition } from '@headlessui/react'
import Image from 'next/image'
import { createRef, useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import ReCAPTCHA from 'react-google-recaptcha'
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa'
import { annotate } from 'rough-notation'
import TypeIt from 'typeit-react'

import { iHomeComponent } from '@/types/types'
import { classNames } from '@/utils/helpers'

import { fontChilanka, fontNunito } from '../fonts'
import {
  AlertRobotComponent,
  Github,
  LinkedinComponent,
  ResumePdfComponent
} from './Navbar'

const HomeComponent = ({ bio, avatarUrl, tracking }: iHomeComponent) => {
  const recaptchaRef = createRef<ReCAPTCHA>()

  const [showHuman, setShowHuman] = useState(false)
  const [errorCaptcha, setErrorCaptcha] = useState(false)
  const [showMoreOptions, setShowMoreOptions] = useState(false)

  useEffect(() => {
    if (tracking !== '') {
      ReactGA.initialize(tracking)
      ReactGA.set({ page: window.location.pathname })
      ReactGA.pageview(window.location.pathname)
    }

    recaptchaRef.current?.execute()
  }, [])

  const isOnline = () => {
    const hours = new Date().getHours() - 5
    return hours > 8 && hours < 20
  }

  const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY ?? ''

  return (
    <>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={RECAPTCHA_SITE_KEY}
        onChange={() => setShowHuman(true)}
        onErrored={() => setErrorCaptcha(true)}
      />

      <div className="px-6 pb-5 my-6 bg-white">
        <div className="flex flex-col max-w-sm pt-6">
          <div className="flex flex-col gap-5 bg-white md:flex-row">

            <span className="relative inline-block mx-auto">
              <Image
                width={96}
                height={96}
                className="w-24 h-24 border-gray-800 rounded-md"
                src={avatarUrl}
                alt=""
              />
              <span className="absolute bottom-0 right-0 block transform translate-x-1/2 translate-y-1/2 border-2 border-white rounded-full md:translate-y-0">
                <span className={classNames('block w-4 h-4 rounded-full', isOnline() ? 'bg-green-400' : 'bg-gray-300')} />
              </span>
            </span>
            <div className="flex flex-col mb-3 text-center select-all md:text-left">
              <div className={'pt-2 pb-1 text-2xl font-medium text-stone-800'}>
                <h1 className={fontNunito.className}>Christian Quispe</h1>
              </div>
              <div className={`text-neutral-800 ${fontChilanka.className}`}>
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
              <p className={`text-sm text-justify md:pt-1 ${fontNunito.className}`}>
                      I am a Solution Architect focused on WS integrations with <span id="animate-01">Artificial Intelligence</span> {' '}
                      from the cloud. <br />
                <TypeIt
                  options={{
                    speed: 50,
                    waitUntilVisible: true,
                    afterComplete: function (instance:any) {
                      try {
                        instance.destroy()
                      } catch (e) {
                      }
                    }
                  }}
                  getBeforeInit={(instance) => {
                    instance
                      .exec(() => {
                        const annotation1 = annotate(document.querySelector('#animate-01')!, { type: 'highlight', color: '#FFD700' })
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
                      .type('1 years), also other technologies <span class="font-bold">awesome.!</span> <br />')
                      .exec(() => {
                        const annotation = annotate(document.querySelector('#animate-02')!, { type: 'circle', color: '#F44336' })
                        annotation.show()
                      })
                      .pause(750)
                      .exec(() => {
                        const annotation = annotate(document.querySelector('#animate-03')!, { type: 'circle', color: '#F44336' })
                        annotation.show()
                      })
                      .pause(750)
                      .exec(() => {
                        const annotation = annotate(document.querySelector('#animate-04')!, { type: 'circle', color: '#F44336' })
                        annotation.show()
                      })
                      .type('And Cloud technologies like <span id="animate-05">AWS</span> (+3 years), <span id="animate-06">Azure</span> (+6 years), <span id="animate-07">GCP</span> (1 year), and others. <br />')
                      .type('<br /><span class="font-bold">I love learning new technologies and always look for new challenges.')

                    return instance
                  }}
                />

              </p>
            </div>
          </Transition>
          <div className="flex items-center justify-between gap-3 mt-2">

            <ResumePdfComponent showHuman={showHuman} recaptchaRef={recaptchaRef} />
            <LinkedinComponent showHuman={showHuman} recaptchaRef={recaptchaRef} />

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
            <div>
              <hr className='h-px my-4 border-0 bg-gradient-to-l from-gray-200 via-gray-800 to-gray-200 animate-jump animate-infinite' />

              <div className="flex flex-col space-y-5">
                <Github />
                {/* <Calendly /> */}
                {/* <PaypalComponent /> */}
              </div>
            </div>
          </Transition>

        </div>
        <AlertRobotComponent errorCaptcha={errorCaptcha} />
      </div>

    </>
  )
}

export default HomeComponent
