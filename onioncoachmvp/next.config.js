/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn2.psychologytoday.com',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'hbr.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.mindful.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.verywellmind.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.psychologytoday.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ggsc.s3.us-west-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'greatergood.berkeley.edu',
        pathname: '/article/item/**',
      },
      {
        protocol: 'https',
        hostname: '**.berkeley.edu',
        pathname: '/**',
      }
    ],
    domains: [
      'psychologytoday.com',
      'hbr.org',
      'mindful.org',
      'verywellmind.com',
      'ggsc.s3.us-west-2.amazonaws.com',
      'res.cloudinary.com',
      'images.unsplash.com',
      'greatergood.berkeley.edu',
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  }
}

module.exports = nextConfig