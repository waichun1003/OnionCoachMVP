/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma']
  },
  // Skip static generation for pages that require database access during build
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  // Ensure database connections work properly in production
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret'
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static'
  },
  env: {
    SKIP_ENV_VALIDATION: process.env.SKIP_ENV_VALIDATION || '0'
  }
};

export default nextConfig;
