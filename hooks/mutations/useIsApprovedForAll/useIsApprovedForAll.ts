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

const basicNftContract = new ethers.Contract(
  BasicNft.contract.address,
  BasicNft.contract.abi,
  provider
);

const fetchIsApprovedForAll = async ({ address }: { address?: string }) => {
  const isMarketplaceApproved = await basicNftContract.isApprovedForAll(
    address,
    NftMarketplace.contract.address
  );
  return isMarketplaceApproved;
};

/** Checks if NftMarketplace contract is approved to transact the token */
export const useIsApprovedForAll = ({ address }: { address?: string }) => {
  return useQuery(
    [IS_APPROVED_FOR_ALL, address],
    () => fetchIsApprovedForAll({ address }),
    {
      enabled: !!address,
    }
  );
};
