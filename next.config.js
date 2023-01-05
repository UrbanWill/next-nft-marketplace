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
    ALCHEMY_API_URL: process.env.ALCHEMY_API_URL,
  },
};

module.exports = nextConfig;
