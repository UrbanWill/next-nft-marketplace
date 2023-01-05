export const AUTH_URI = process.env.NFT_API_URL || "http://localhost:4000";
export const IS_DEV_MODE = process.env.NODE_ENV === "development";
export const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL;

export const THE_GRAPH_URI =
  process.env.THE_GRAPH_URL ||
  "https://api.studio.thegraph.com/query/36731/nft-marketplace/v0.0.3";

export const GOERLI_RPC_URL =
  "https://eth-goerli.g.alchemy.com/v2/aqz1LBXUFqx_-vK0i5He9wbAuZrknsHk";

export const BASIC_NFT_CONTRACT_ADDRESS =
  "0xFc9a7b7337c98B02949F8Ce5a9Dc1BA2a38aff6B";

export const IPFS_URL = "https://ipfs.io/ipfs/";
