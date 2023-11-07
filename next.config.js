// @ts-nocheck
/** @type {import('next').NextConfig} */
const nextConfig = {

  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  env: {
    TOKEN_GITHUB: process.env.TOKEN_GITHUB ?? '',
    TOKEN_PAYPAL: process.env.TOKEN_PAYPAL ?? '',
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY ?? '',
    PHONE_NUMBER: process.env.PHONE_NUMBER ?? '',
    KEYWORDS: process.env.KEYWORDS ?? '',
    TRACKING_ID: process.env.TRACKING_ID ?? false
  },
  webpack: (config, { webpack, dev }) => {
    config.plugins.push(
      new webpack.BannerPlugin("You're a little curious!, By Oxicode")
    )

    return config
  }
}

module.exports = nextConfig
