/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Head from 'next/head'
import { Octokit } from "@octokit/core";
import { FaLinkedin,FaInbox,FaWhatsapp } from "react-icons/fa";
import { HiOutlineDocumentDownload as IconDonwload } from "react-icons/hi";

const Home = ({ profile }) => {
  const [showingEmail,setShowingEmail] = React.useState(false);
  return (
    <>
      <Head>
        <title>Profile Oxicode.io</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <div className="m-auto">
          <div className="flex flex-col bg-gray-200 max-w-sm shadow-md py-7 px-10 md:px-7 rounded-md">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                className="rounded-full border-4 border-gray-300 h-28 w-28 mx-auto"
                src={profile.avatar_url} alt=""
              />
              <div className="flex flex-col text-center md:text-left">
                <div className="font-medium text-lg text-gray-800">Christian Quispe</div>
                <div className="text-gray-500 mb-3 whitespace-nowrap">{profile.bio}</div>
                <div className="flex flex-row gap-4 text-gray-800 my-auto text-2xl mx-auto md:mx-0">
                  <a title='Resume' target="_blank" href='https://pdf.oxicode.io/' className="hover:cursor-pointer hover:text-red-600" rel="noreferrer">
                    <IconDonwload size="1.5em" />
                  </a>
                  <a title='Linkedin' target="_blank" href='https://cv.oxicode.io' className="hover:cursor-pointer hover:text-blue-600" rel="noreferrer">
                    <FaLinkedin size="1.5em" />
                  </a>
                  <a title='Whatsapp' target="_blank" href='https://api.whatsapp.com/send?phone=51944466353' className="hover:cursor-pointer hover:text-green-500" rel="noreferrer">
                    <FaWhatsapp size="1.5em" />
                  </a>
                  {showingEmail ? (
                    <a title='christian.quispeh@gmail.com' className="hover:cursor-pointer hover:text-red-500" href='mailto:christian.quispeh@gmail.com'>
                      <FaInbox size="1.5em" />
                    </a>
                  ) : (
                    <a title='MailTo, Click for contact info' className="hover:cursor-pointer hover:text-red-500"
                      onClick={() => setShowingEmail(true)}>
                      <FaInbox size="1.5em" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export async function getStaticProps () {
  const octokit = new Octokit({ auth: `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` });

  const response = await octokit.request('GET /user')

  return {
    props: {
      profile: response.data
    }, // will be passed to the page component as props
  }
}

export default Home