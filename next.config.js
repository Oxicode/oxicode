const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  poweredByHeader: false,
  swcMinify: true,
  async redirects () {
    return [
      {
        source: '/pdf',
        destination: process.env.REDIRECT_CV,
        permanent: false
      }
    ]
  },
  env: {
    TOKEN_GITHUB: process.env.TOKEN_GITHUB,
    TOKEN_PAYPAL: process.env.TOKEN_PAYPAL,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    PHONE_NUMBER: process.env.PHONE_NUMBER,
    KEYWORDS: process.env.KEYWORDS,
    TRACKING_ID: process.env.TRACKING_ID
  },
  webpack: (config, { webpack, dev }) => {
    config.plugins.push(
      new webpack.BannerPlugin("You're a little curious!, By Oxicode")
    )
    if (dev) {
      config.plugins.push(
        new DuplicatePackageCheckerPlugin()
      )
    }

    return config
  }
}

module.exports = nextConfig
