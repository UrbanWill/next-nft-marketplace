/** @type {import('next').NextConfig} */

require("dotenv").config();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["ipfs.io"],
  },
  env: {
    NFT_API_URL: process.env.NFT_API_URL,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      os: false,
      tls: false,
      request: false,
      bufferutil: false,
      "utf-8-validate": false,
      fs: false,
    };
    return config;
  },
};

module.exports = nextConfig;
