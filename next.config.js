// next.config.js
const withSass = require('@zeit/next-sass')
const withFonts = require('next-fonts')


module.exports = withSass(withFonts({
  enableSvg: true,
  webpack(config, options) {
    return config;
  }
}))
