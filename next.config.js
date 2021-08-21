/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    poweredByHeader: false,
    env: {
        TOKEN_GITHUB: process.env.TOKEN_GITHUB
    },
    webpack: (config, { webpack }) => {
        config.plugins.push(
            new webpack.BannerPlugin("You're a little curious!, By Oxicode")
        );

        return config
      },
}

module.exports = nextConfig