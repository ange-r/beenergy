/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Para deployment en GitHub Pages o hosting estático
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
}

export default nextConfig
