import { ethers, Contract } from "ethers";
import { useMutation } from "@tanstack/react-query";
import { useContract, useSigner } from "wagmi";

// abis
import BasicNft from "../../../contracts/abis/BasicNft.json";
import NftMarketplace from "../../../contracts/abis/NftMarketplace.json";

// constants
import { MATIC_RPC_URL, MATIC_NETWORK_ID } from "../../../utils/constants";

const fetchRequestApproval = async ({
  contract,
  id,
}: {
  contract: Contract;
  id: string;
}) => {
  const approvalRequest = await contract.approve(
    NftMarketplace.contract.address,
    id
  );
  return approvalRequest;
};
/*
 * Custom hook to request NFT contract to approve marketplace contract to transact NFT
 */
export const useRequestApproval = ({
  tokenContractAddress,
}: {
  tokenContractAddress: string;
}) => {
  const { data: signer } = useSigner();
  const BasicNftContract = useContract({
    address: tokenContractAddress,
    abi: BasicNft.contract.abi,
    signerOrProvider: signer,
  }) as Contract;

  const requestApproval = useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return fetchRequestApproval({ contract: BasicNftContract, id });
    },
  });

  return { requestApproval };
};
