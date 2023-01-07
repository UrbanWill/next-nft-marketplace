import { useQuery } from "@tanstack/react-query";
import { ethers } from "ethers";

// abis
import BasicNft from "../../../contracts/abis/BasicNft.json";

// constants
import {
  MATIC_RPC_URL,
  BASIC_NFT_CONTRACT_ADDRESS,
  MATIC_NETWORK_ID,
} from "../../../utils/constants";

// query keys
import { TOKEN_BY_ID } from "../../../utils/queryKeys";

const provider = new ethers.providers.JsonRpcProvider(
  MATIC_RPC_URL,
  MATIC_NETWORK_ID
);
const basicNftContract = new ethers.Contract(
  BASIC_NFT_CONTRACT_ADDRESS,
  BasicNft.abi,
  provider
);
const fetchTokenById = async (id: number) => {
  const tokenURI = await basicNftContract.tokenURI(id);
  return tokenURI;
};

const useGetTokenById = (id: number) => {
  return useQuery([TOKEN_BY_ID, id], () => fetchTokenById(id));
};

export default useGetTokenById;
