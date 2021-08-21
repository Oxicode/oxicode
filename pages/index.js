/* eslint-disable @next/next/no-img-element */
import React, { useEffect, createRef, useState } from 'react'
import Head from 'next/head'
import { Octokit } from '@octokit/core'
import ReCAPTCHA from 'react-google-recaptcha'
import { FaLinkedin, FaInbox, FaWhatsapp, FaRobot } from 'react-icons/fa'
import { HiOutlineDocumentDownload as IconDonwload } from 'react-icons/hi'

const Home = ({ profile }) => {
  const recaptchaRef = createRef()
  const [showHuman, setShowHuman] = useState(false)
  const [errorCaptcha, setErrorCaptcha] = useState(false)
  const email = (
    <a
      title={showHuman ? 'christian.quispeh@gmail.com' : 'MailTo, Click for contact info'}
      className="hover:cursor-pointer hover:text-red-500"
      href={showHuman ? 'mailto:christian.quispeh@gmail.com' : '#'}
      onClick={() => { if (!showHuman) { recaptchaRef.current.execute() } }}
    >
      <FaInbox size="1.5em" />
    </a>
  )

  const whatsapp = (
    <a title='Whatsapp' target="_blank"
      onClick={() => { if (!showHuman) { recaptchaRef.current.execute() } }}
      href={showHuman ? 'https://api.whatsapp.com/send?phone=51944466353' : '#'}
      className="hover:cursor-pointer hover:text-green-500" rel="noreferrer">
      <FaWhatsapp size="1.5em" />
    </a>
  )

  const resumePdf = (
    <a
    title='Resume' target="_blank"
    href={showHuman ? 'https://pdf.oxicode.io/' : '#'}
    onClick={() => { if (!showHuman) { recaptchaRef.current.execute() } }}
    className="hover:cursor-pointer hover:text-red-600" rel="noreferrer">
      <IconDonwload size="1.5em" />
    </a>
  )

  useEffect(() => {
    recaptchaRef.current.execute()
  }, [])

  return (
    <>
      <Head>
        <title>Profile Oxicode.io</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Resume Christian Quispe" />
        <meta property="og:description" content={profile.bio} />
        <meta property="og:image" content={profile.avatar_url} />
        <meta property="og:url" content={profile.blog} />
      </Head>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.RECAPTCHA_SITE_KEY}
        onChange={() => setShowHuman(true)}
        onErrored={() => { setErrorCaptcha(true) }
        }
      />
      <div className="min-h-screen flex flex-col">
        <div className="m-auto">
          <div className="flex flex-col bg-gray-200 max-w-sm shadow-md py-7 px-10 md:px-7 rounded-md">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                className="rounded-full border-4 border-gray-800 h-28 w-28 mx-auto"
                src={profile.avatar_url} alt=""
              />
              <div className="flex flex-col text-center md:text-left">
                <div className="font-medium text-lg text-gray-800">Christian Quispe</div>
                <div className="text-gray-500 mb-3 whitespace-nowrap">{profile.bio}</div>
                <div className="flex flex-row gap-4 text-gray-800 my-auto text-2xl mx-auto md:mx-0">
                  {resumePdf}
                  <a title='Linkedin' target="_blank" href='https://cv.oxicode.io' className="hover:cursor-pointer hover:text-blue-600" rel="noreferrer">
                    <FaLinkedin size="1.5em" />
                  </a>
                  {whatsapp}
                  {email}
                </div>
              </div>
            </div>
          </div>

          {errorCaptcha
            ? (<div className="alert flex flex-row items-center bg-red-200 p-5 rounded border-b-2 border-red-300 mt-2">
            <div className="alert-icon flex items-center bg-red-100 border-2 border-red-500 justify-center flex-shrink-0 rounded-full">
              <span className="text-red-500">
                <FaRobot size={'1.5em'} />
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
            : ''}

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

  return {
    props: {
      profile: response.data
    }
  }
}

export default Home
