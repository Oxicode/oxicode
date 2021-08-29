/* eslint-disable @next/next/no-img-element, camelcase */
import { Transition } from '@headlessui/react'
import { Octokit } from '@octokit/core'
import Head from 'next/head'
import React, { createRef, useEffect, useState } from 'react'
import ReactGA from 'react-ga'
import ReCAPTCHA from 'react-google-recaptcha'
import { FaAngleDoubleDown, FaAngleDoubleUp, FaInbox, FaLinkedin, FaRobot, FaWhatsapp } from 'react-icons/fa'
import { RiPaypalFill } from 'react-icons/ri'
import { VscCalendar as CalendarIcon, VscFilePdf as IconDonwload } from 'react-icons/vsc'

const Home = ({ bio, avatar_url, blog, email }) => {
  const recaptchaRef = createRef()
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [showHuman, setShowHuman] = useState(false)
  const [errorCaptcha, setErrorCaptcha] = useState(false)
  const mail = (
    <a
      title={showHuman ? email : 'MailTo, Click for contact info'}
      className="my-2 hover:cursor-pointer hover:text-red-500"
      href={showHuman ? `mailto:${email}` : '#'}
      onClick={() => {
        if (!showHuman) { recaptchaRef.current.execute() }
        ReactGA.event({
          category: 'Navigation',
          action: 'Click',
          label: 'Mail'
        })
      }}
    >
      <FaInbox className='inline-block text-3xl transform hover:scale-125' /> Contact by email
    </a>
  )

  const whatsapp = (
    <a title='Whatsapp' target="_blank"
      onClick={() => {
        if (!showHuman) { recaptchaRef.current.execute() }
        ReactGA.event({
          category: 'Navigation',
          action: 'Click',
          label: 'Whatsapp'
        })
      }}
      href={showHuman ? `https://api.whatsapp.com/send?phone=${process.env.PHONE_NUMBER}` : '#'}
      className="my-2 hover:cursor-pointer hover:text-green-500" rel="noreferrer">
      <FaWhatsapp className='inline-block text-3xl transform hover:scale-125' /> Whatsapp
    </a>
  )

  const resumePdf = (
    <a
      title='Resume' target="_blank"
      href={showHuman ? 'https://pdf.oxicode.io/' : '#'}
      onClick={() => {
        if (!showHuman) { recaptchaRef.current.execute() }
        ReactGA.event({
          category: 'Navigation',
          action: 'Click',
          label: 'resumePdf'
        })
      }}
      className="my-2 hover:cursor-pointer hover:text-red-600" rel="noreferrer">
      <IconDonwload className='inline-block text-3xl transform hover:scale-125' /> {' '} Download resume
    </a>
  )

  const paypal = (
    <>
      <form action="https://www.paypal.com/donate" method="post"
        target="_top"
        className="mt-2 hover:cursor-pointer hover:text-blue-600">
        <input type="hidden" name="hosted_button_id" value={process.env.TOKEN_PAYPAL} />
        <button type="submit">
          <RiPaypalFill title='Buy a Coffee' className='inline-block text-3xl transform hover:scale-125' /> {' '} Paypal
        </button>
        <img alt="" border="0" src="https://www.paypal.com/en_PE/i/scr/pixel.gif" style={{ width: 1, height: 1 }} />
      </form>
    </>
  )

  const linkedin = (<a title='Linkedin' target="_blank" href='https://www.linkedin.com/in/oxicode'
    className="my-2 hover:cursor-pointer hover:text-blue-600"
    rel="noreferrer">
    <FaLinkedin className='inline-block text-3xl transform hover:scale-125' /> {' '} Linkedin
  </a>)

  const calendly = (<a title='Calendly' target="_blank"
    href='https://calendly.com/christian-quispeh/15min'
    className="my-2 hover:cursor-pointer hover:text-yellow-800" rel="noreferrer">
    <CalendarIcon className='inline-block text-3xl transform hover:scale-125' /> {' '} Calendly
  </a>)

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
      <div className="min-h-screen flex flex-col">
        <div className="m-auto relative">
          <nav className="absolute z-0 rounded-md right-0 bottom-0">
            <a
              href="#"
              onClick={() => setShowMoreOptions((old) => !old)}
              className={'z-10 bg-gray-800 border-white rounded border relative inline-flex items-right px-3 py-3 text-white'}>
              {!showMoreOptions ? <FaAngleDoubleDown className='animate-bounce' /> : <FaAngleDoubleUp />}
            </a>
          </nav>
          <div className="flex flex-col bg-gray-200 max-w-sm shadow-md pt-7 pb-5 px-6 rounded-md">
            <div className="flex flex-col md:flex-row gap-5">
              <img
                className="rounded-full border-4 border-gray-800 h-24 w-24 mx-auto"
                src={avatar_url} alt="Me"
              />
              <div className="flex flex-col text-center md:text-left mb-3">
                <div className="font-medium text-2xl text-gray-800 pt-2 pb-1" style={{ fontFamily: 'Nunito' }}>
                  <h1>Christian Quispe</h1>
                </div>
                <div className='text-gray-500'>
                  <h2>{bio} </h2>
                  <h2>Artificial Intelligence</h2>
                </div>

              </div>
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

              <hr className='h-px mt-3 sm:mt-0 md:mt-5 mb-2 border-0 bg-gradient-to-l from-gray-200 via-gray-800 to-gray-200' />
              <div className="flex flex-col">
                {linkedin}
                {resumePdf}
                {whatsapp}
                {calendly}
                {mail}
                {paypal}
              </div>
            </Transition>

          </div>

          <AlertRobot errorCaptcha={errorCaptcha} />

        </div>
        <div id="stars0"></div>
        <div id="stars1"></div>
        <div id="stars2"></div>
      </div>
    </>
  )
}

const AlertRobot = ({ errorCaptcha }) => (errorCaptcha
  ? (<div className="alert flex flex-row items-center bg-red-200 p-5 rounded border-b-2 border-red-300 mt-2">
    <div className="alert-icon flex items-center bg-red-100 border-2 border-red-500 justify-center flex-shrink-0 rounded-full">
      <span className="text-red-600">
        <FaRobot size={'1.5em'} className='animate-pulse' />
      </span>
    </div>
    <div className="alert-content ml-4">
      <div className="alert-title font-semibold text-lg text-red-800">
        ¿Robot...?
      </div>
      <div className="alert-description text-sm text-red-600">
        <p>Por alguna razón no pude comprobar que <br /> eres humano. Igual puedes acceder al Linkedin</p>
      </div>
    </div>
  </div>)
  : <></>)

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
