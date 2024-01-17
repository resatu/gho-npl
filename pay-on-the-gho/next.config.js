/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // next.config.js
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.tls = false;
    }
    return config;
  },

}

module.exports = nextConfig
