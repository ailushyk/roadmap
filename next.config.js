/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // transpilePackages: ['@comcert/ui'],
  // modularizeImports: {
  //   '@comcert/ui': {
  //     transform: '@comcert/ui/{{member}}',
  //   },
  // },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
