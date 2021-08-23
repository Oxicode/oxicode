/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  poweredByHeader: false,
  env: {
    TOKEN_GITHUB: process.env.TOKEN_GITHUB,
    TOKEN_PAYPAL: process.env.TOKEN_PAYPAL,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    PHONE_NUMBER: process.env.PHONE_NUMBER,
    TRACKING_ID: process.env.TRACKING_ID
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.BannerPlugin("You're a little curious!, By Oxicode")
    )

    return config
  }
}

module.exports = nextConfig
