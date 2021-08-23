/* eslint-disable @next/next/no-img-element, camelcase */
import React, { useEffect, createRef, useState } from 'react'
import Head from 'next/head'
import { Octokit } from '@octokit/core'
import ReCAPTCHA from 'react-google-recaptcha'
import { FaLinkedin, FaInbox, FaWhatsapp, FaRobot } from 'react-icons/fa'
import { RiPaypalFill } from 'react-icons/ri'
import { HiOutlineDocumentDownload as IconDonwload } from 'react-icons/hi'

const Home = ({ bio, avatar_url, blog, email }) => {
  const recaptchaRef = createRef()
  const [showHuman, setShowHuman] = useState(false)
  const [errorCaptcha, setErrorCaptcha] = useState(false)
  const mail = (
    <a
      title={showHuman ? email : 'MailTo, Click for contact info'}
      className="hover:cursor-pointer hover:text-red-500"
      href={showHuman ? `mailto:${email}` : '#'}
      onClick={() => { if (!showHuman) { recaptchaRef.current.execute() } }}
    >
      <FaInbox />
    </a>
  )

  const whatsapp = (
    <a title='Whatsapp' target="_blank"
      onClick={() => { if (!showHuman) { recaptchaRef.current.execute() } }}
      href={showHuman ? `https://api.whatsapp.com/send?phone=${process.env.PHONE_NUMBER}` : '#'}
      className="hover:cursor-pointer hover:text-green-500" rel="noreferrer">
      <FaWhatsapp />
    </a>
  )

  const resumePdf = (
    <a
      title='Resume' target="_blank"
      href={showHuman ? 'https://pdf.oxicode.io/' : '#'}
      onClick={() => { if (!showHuman) { recaptchaRef.current.execute() } }}
      className="hover:cursor-pointer hover:text-red-600" rel="noreferrer">
      <IconDonwload />
    </a>
  )

  const paypal = (
    <>
      <form action="https://www.paypal.com/donate" method="post"
        target="_top"
        className="hover:cursor-pointer hover:text-blue-600">
        <input type="hidden" name="hosted_button_id" value={process.env.TOKEN_PAYPAL} />
        <button type="submit">
          <RiPaypalFill title='Buy a Coffee' />
        </button>
        <img alt="" border="0" src="https://www.paypal.com/en_PE/i/scr/pixel.gif" style={{ width: 1, height: 1 }} />
      </form>
    </>
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
        <meta property="og:description" content={bio} />
        <meta property="og:image" content={avatar_url} />
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
        <div className="m-auto">
          <div className="flex flex-col bg-gray-200 max-w-sm shadow-md py-7 px-7 rounded-md">
            <div className="flex flex-col md:flex-row gap-4">
              <img
                className="rounded-full border-4 border-gray-800 h-28 w-28 mx-auto"
                src={avatar_url} alt=""
              />
              <div className="flex flex-col text-center md:text-left">
                <div className="font-medium text-lg text-gray-800" style={{ fontFamily: 'Nunito' }}>Christian Quispe</div>
                <div className="text-gray-500 mb-3 whitespace-nowrap">{bio}</div>
                <div className="flex flex-row gap-2 text-gray-800 my-auto text-4xl mx-auto md:mx-0">
                  {resumePdf}
                  <a title='Linkedin' target="_blank" href='https://cv.oxicode.io' className="hover:cursor-pointer hover:text-blue-600" rel="noreferrer">
                    <FaLinkedin />
                  </a>
                  {whatsapp}
                  {mail}
                  {paypal}
                </div>
              </div>

            </div>
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
