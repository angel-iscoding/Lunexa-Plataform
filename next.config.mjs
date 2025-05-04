/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Make port configurable through environment variable
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  },
}

export default nextConfig
