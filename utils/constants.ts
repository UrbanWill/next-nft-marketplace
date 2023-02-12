export const AUTH_URI = process.env.NFT_API_URL || "http://localhost:4000";
export const IS_DEV_MODE = process.env.NODE_ENV === "development";

export const THE_GRAPH_URI =
  process.env.THE_GRAPH_URL ||
  "https://api.thegraph.com/subgraphs/name/urbanwill/graph-nft-marketplace";

export const GOERLI_RPC_URL =
  "https://eth-goerli.g.alchemy.com/v2/aqz1LBXUFqx_-vK0i5He9wbAuZrknsHk";

export const MATIC_RPC_URL =
  "https://polygon-mumbai.g.alchemy.com/v2/miC3_l2pQRH-C53uvrVnqfqOhyd0wDXq";

export const MATIC_NETWORK_ID = 80001;

export const BASIC_NFT_CONTRACT_ADDRESS =
  "0x6F4344FB1354ffe3e08deC7fd0479Dc5FB0EF7FB";

// export const NFT_MARKETPLACE_CONTRACT_ADDRESS =
//   "0xf125768C0C180F3213F38AC0a4bbFBFe29717a84";
export const NFT_MARKETPLACE_CONTRACT_ADDRESS =
  "0x9a257926392E2b33a96C62F768fcbCd349EF3aFC";

export const IPFS_URL = "https://ipfs.io/ipfs/";

export const BICONOMY_API_KEY = process.env.NEXT_PUBLIC_BICONOMY_API_KEY || "";
