import { FC } from "react";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { ethers } from "ethers";

// hooks
import { useRequestApproval } from "../../hooks/mutations/useRequestApproval";
import { useIsApproved } from "../../hooks/mutations/useIsApprovedForAll";

// types
import { INft } from "../../utils/types";

interface IMyNFTCard {
  nft: INft;
  handleMetaTx: ({
    functionName,
    values,
  }: {
    functionName: string;
    values: any[];
  }) => void;
}

const MyNFTCard: FC<IMyNFTCard> = ({ nft, handleMetaTx }) => {
  const {
    title,
    id: { tokenId },
    metadata: { image },
    contract: { address: tokenContractAddress = "" },
  } = nft;

  /*
   * useRequestApproval is instantiated here so NFTs
   * from different ERC721 contracts can be approved for marketplace
   */
  const price = ethers.utils.parseEther("0.1");
  const { requestApproval } = useRequestApproval({
    tokenContractAddress,
    handleSuccess: () =>
      handleMetaTx({
        functionName: "listItem",
        values: [tokenContractAddress, tokenId, price],
      }),
  });
  const { mutate: requestApprovalMutation } = requestApproval;
  const { data: isApproved } = useIsApproved({
    address: tokenContractAddress,
    tokenId,
  });

  const handleListItem = async () => {
    if (!isApproved) {
      console.log("REQUESTING APPROVAL");
      return requestApprovalMutation({
        id: tokenId,
      });
    }
    handleMetaTx({
      functionName: "listItem",
      values: [tokenContractAddress, tokenId, price],
    });
  };

  return (
    <Box
      key={tokenId + tokenContractAddress}
      p={2}
      my={2}
      border="2px solid black"
    >
      <Box>{`Title: ${title}`}</Box>
      <Box>{`Token ID: ${tokenId}`}</Box>
      <Box>{`Approved: ${isApproved}`}</Box>
      <Image src={image} alt="NFT Image" width={300} height={300} />
      <Flex gap={2}>
        <Button onClick={handleListItem}>List item</Button>
        <Button
          onClick={() =>
            handleMetaTx({
              functionName: "cancelListing",
              values: [tokenContractAddress, tokenId],
            })
          }
        >
          Cancel item listing
        </Button>
      </Flex>
    </Box>
  );
};

export default MyNFTCard;
