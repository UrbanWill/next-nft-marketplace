import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// constants
import { NFTS_BY_WALLET } from "../../../utils/queryKeys";
import { ALCHEMY_API_URL } from "../../../utils/constants";

interface NftMetadata {
  name: string;
  description: string;
  image: string;
}

interface Nft {
  title: string;
  id: {
    tokenId: string;
  };
  metadata: NftMetadata;
}

interface NftResponse {
  blockNumber: string;
  ownedNfts: Nft[];
}

export const fetchNfts = async (
  walletAddress: string
): Promise<NftResponse> => {
  const { data } = await axios.get(
    `${ALCHEMY_API_URL}/getNFTs/?owner=${walletAddress}`
  );
  return data;
};

const useGetNftsByWallet = (walletAddress: string) => {
  return useQuery([NFTS_BY_WALLET, walletAddress], () =>
    fetchNfts(walletAddress)
  );
};

export default useGetNftsByWallet;
