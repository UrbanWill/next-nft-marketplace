/** @type {import('next').NextConfig} */

require("dotenv").config();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NFT_API_URL: process.env.NFT_API_URL,
  },
};

module.exports = nextConfig;
