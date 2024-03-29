/* eslint-disable @next/next/no-img-element, camelcase */
import { FaGithub, FaInbox, FaLinkedin, FaRobot, FaWhatsapp } from 'react-icons/fa'
import { RiPaypalFill } from 'react-icons/ri'
import { VscCalendar as CalendarIcon, VscFilePdf as IconDonwload } from 'react-icons/vsc'

const MailComponent = ({ showHuman, email, recaptchaRef, ReactGA }) => (
  <a
    title={showHuman ? email : 'MailTo, Click for contact info'}
    className=" hover:cursor-pointer hover:text-red-500"
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

const WhatsappComponent = ({ ReactGA, showHuman, recaptchaRef }) => (
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
    className="hover:text-[#128C7E] " rel="noreferrer">
    <FaWhatsapp className='inline-block text-3xl transform hover:scale-125' /> Whatsapp
  </a>
)

const ResumePdfComponent = ({ showHuman, recaptchaRef, ReactGA }) => (
  <a
    title='Resume'
    href={showHuman ? '/pdf' : '#'}
    onClick={() => {
      if (!showHuman) { recaptchaRef.current.execute() }
      ReactGA.event({
        category: 'Navigation',
        action: 'Click',
        label: 'resumePdf'
      })
    }}
    className="w-1/2 px-3 py-2 text-white bg-red-600 border rounded-lg whitespace-nowrap" rel="noreferrer">
    <IconDonwload className='inline-block mb-1' /> {' '} Resume
  </a>
)

const Paypal = () => (
  <>
    <form action="https://www.paypal.com/donate" method="post"
      target="_top"
      className="hover:cursor-pointer hover:text-blue-600">
      <input type="hidden" name="hosted_button_id" value={process.env.TOKEN_PAYPAL} />
      <button type="submit">
        <RiPaypalFill title='Buy a Coffee' className='inline-block text-3xl transform hover:scale-125' /> {' '} Paypal
      </button>
      <img alt="" border="0" src="https://www.paypal.com/en_PE/i/scr/pixel.gif" style={{ width: 1, height: 1 }} />
    </form>
  </>
)

const LinkedinComponent = ({ showHuman, recaptchaRef, ReactGA }) => (
  <a
    title='Linkedin'
    target="_blank"
    href={showHuman ? 'https://www.linkedin.com/in/oxicode' : '#'}
    onClick={() => {
      if (!showHuman) { recaptchaRef.current.execute() }
      ReactGA.event({
        category: 'Navigation',
        action: 'Click',
        label: 'Linkedin'
      })
    }}
    className="whitespace-nowrap w-1/2 px-3 py-2 text-white bg-[#0e76a8] border rounded-lg"
    rel="noreferrer">
    <FaLinkedin className='inline-block mb-1' /> {' '} Linkedin
  </a>
)

const Github = () => (<a title='Calendly' target="_blank"
  href='https://github.com/oxicode'
  className="hover:cursor-pointer hover:text-yellow-800" rel="noreferrer">
  <FaGithub className='inline-block text-3xl transform hover:scale-125' /> {' '} Github
</a>)

const Calendly = () => (<a title='Calendly' target="_blank"
  href='https://calendly.com/christian-quispeh/15min'
  className="hover:cursor-pointer hover:text-yellow-800" rel="noreferrer">
  <CalendarIcon className='inline-block text-3xl transform hover:scale-125' /> {' '} Calendly
</a>)

const AlertRobotComponent = ({ errorCaptcha }) => (
  errorCaptcha &&
  (<div className="flex flex-row items-center max-w-sm p-5 mt-2 bg-red-200 border-b-2 border-red-300 rounded alert">
    <div className="flex items-center justify-center flex-shrink-0 bg-red-100 border-2 border-red-500 rounded-full alert-icon">
      <span className="p-1 text-red-600">
        <FaRobot size={'1.5em'} className='animate-pulse' />
      </span>
    </div>
    <div className="ml-4 alert-content">
      <div className="text-lg font-semibold text-gray-800 alert-title">
        ¿Robot...?
      </div>
      <div className="text-sm text-gray-800 alert-description">
        <p>Por alguna razón no pude comprobar que eres humano. Igual puedes acceder al Linkedin.</p>
      </div>
    </div>
  </div>)
)

export {
  AlertRobotComponent,
  Calendly,
  Github,
  LinkedinComponent,
  MailComponent,
  Paypal,
  ResumePdfComponent,
  WhatsappComponent
}
