/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/certificate/:slug*',
        destination: '/id/certificate/:slug*',
      },
      {
        source: '/post/:slug*',
        destination: '/id/post/:slug*',
      },
    ];
  },
};

export default nextConfig;
