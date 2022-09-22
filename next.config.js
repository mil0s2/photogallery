/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  async redirects() {
    return [
      {
        source: '/login',
        destination: '/photos/1',
        permanent: true,
      },
    ];
  },
};

module.exports = {
  images: {
    domains: ['via.placeholder.com'],
  },
};

module.exports = {
  trailingSlash: true,
};

module.exports = nextConfig;
