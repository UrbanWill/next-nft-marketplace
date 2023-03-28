import { Contract } from "ethers";
import { useMutation } from "@tanstack/react-query";
import { useContract, useSigner } from "wagmi";

// abis
import BasicNft from "../../../contracts/abis/BasicNft.json";
import NftMarketplace from "../../../contracts/abis/NftMarketplace.json";

const fetchRequestApproval = async ({
  contract,
  id,
}: {
  contract: Contract;
  id: number;
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
  handleSuccess,
}: {
  tokenContractAddress: string;
  handleSuccess: () => void;
}) => {
  const { data: signer } = useSigner();
  const BasicNftContract = useContract({
    address: tokenContractAddress,
    abi: BasicNft.contract.abi,
    signerOrProvider: signer,
  }) as Contract;

  const requestApproval = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await fetchRequestApproval({ contract: BasicNftContract, id });
    },
    onSuccess: (data) => {
      console.log("Request approval success", data);
      handleSuccess();
    },
    onError: (error) => {
      console.log("Request approval error", error);
    },
  });

  return { requestApproval };
};
