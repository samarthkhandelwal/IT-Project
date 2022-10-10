/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.pexels.com"],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/exercises',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
