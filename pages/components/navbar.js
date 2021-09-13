/* eslint-disable @next/next/no-img-element, camelcase */
import { FaInbox, FaLinkedin, FaRobot, FaWhatsapp } from 'react-icons/fa'
import { RiPaypalFill } from 'react-icons/ri'
import { VscCalendar as CalendarIcon, VscFilePdf as IconDonwload } from 'react-icons/vsc'

const MailComponent = ({ showHuman, email, recaptchaRef, ReactGA }) => (
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
      className="my-2 hover:cursor-pointer hover:text-green-500" rel="noreferrer">
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

const AlertRobotComponent = ({ errorCaptcha }) => (errorCaptcha
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

export { AlertRobotComponent, calendly, linkedin, MailComponent, paypal, ResumePdfComponent, WhatsappComponent }
