import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// constants
import { NFTS_BY_WALLET } from "../../../utils/queryKeys";
import { MATIC_RPC_URL } from "../../../utils/constants";

// types
import { INft } from "../../../utils/types";
interface NftResponse {
  blockNumber: string;
  ownedNfts: INft[];
}

export const fetchNfts = async (
  walletAddress: string
): Promise<NftResponse> => {
  const { data } = await axios.get(
    `${MATIC_RPC_URL}/getNFTs/?owner=${walletAddress}`
  );
  return data;
};

const useGetNftsByWallet = (walletAddress: string) => {
  return useQuery([NFTS_BY_WALLET, walletAddress], () =>
    fetchNfts(walletAddress)
  );
};

export default useGetNftsByWallet;
