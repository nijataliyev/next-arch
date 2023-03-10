/** @types {import('next').NextConfig} */
const path = require('path');
// const withVideos = require('next-videos')

const nextConfig = {
  jsconfigPaths: false,
  reactStrictMode: false,
  swcMinify: true,
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
  env: {
    API_URL: process.env.API_URL,
  },

}

module.exports = nextConfig
// module.exports = withVideos()
