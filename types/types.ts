import type { RefObject } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

export type iHomeComponent = {
  bio: string
  avatarUrl: string
  tracking: string | ''
}

export interface AllPropsComponents {
  showHuman: boolean,
  email: string,
  recaptchaRef: RefObject<ReCAPTCHA>,
  errorCaptcha: boolean
}

export interface iResumePdfComponent extends Omit<AllPropsComponents, 'errorCaptcha' | 'email'> {}
export interface iLinkedinComponent extends Omit<AllPropsComponents, 'errorCaptcha' | 'email'> {}
export interface iAlertRobotComponent {
  errorCaptcha: boolean
}
