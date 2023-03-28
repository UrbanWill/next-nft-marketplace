import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";

// abis
import BasicNft from "../../../contracts/abis/BasicNft.json";
import NftMarketplace from "../../../contracts/abis/NftMarketplace.json";

// constants
import { MATIC_RPC_URL, MATIC_NETWORK_ID } from "../../../utils/constants";

// query keys
import { IS_APPROVED_FOR_ALL } from "../../../utils/queryKeys";

const provider = new ethers.providers.JsonRpcProvider(
  MATIC_RPC_URL,
  MATIC_NETWORK_ID
);
const fetchIsApproved = async ({
  address,
  tokenId,
}: {
  address: string;
  tokenId: number;
}) => {
  const basicNftContract = new ethers.Contract(
    address,
    BasicNft.contract.abi,
    provider
  );
  const approvedAddress = await basicNftContract.getApproved(tokenId);
  const isMarketplaceApproved =
    approvedAddress === NftMarketplace.contract.address;
  return isMarketplaceApproved;
};

/** Checks if NftMarketplace contract is approved to transact the token */
export const useIsApproved = ({
  address,
  tokenId,
}: {
  address: string;
  tokenId: number;
}) => {
  return useQuery(
    [IS_APPROVED_FOR_ALL, address, tokenId],
    () => fetchIsApproved({ address, tokenId }),
    {
      enabled: !!address,
    }
  );
};
