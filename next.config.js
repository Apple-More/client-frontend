/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'applemoreimages.blob.core.windows.net',
            port: '',
            pathname: '/applemoreimagecontainer/**'
          },
        ],
    },
}

module.exports = nextConfig
