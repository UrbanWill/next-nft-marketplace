import { FC } from "react";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { ethers } from "ethers";

// hooks
import { useRequestApproval } from "../../hooks/mutations/useRequestApproval";

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
  const { requestApproval } = useRequestApproval({ tokenContractAddress });
  const { mutate: requestApprovalMutation } = requestApproval;

  const price = ethers.utils.parseEther("0.1");

  return (
    <Box
      key={tokenId + tokenContractAddress}
      p={2}
      my={2}
      border="2px solid black"
    >
      <Box>{`Title: ${title}`}</Box>
      <Box>{`Token ID: ${tokenId}`}</Box>
      <Image src={image} alt="NFT Image" width={300} height={300} />
      <Flex gap={2}>
        <Button
          onClick={() =>
            requestApprovalMutation({
              id: tokenId,
            })
          }
        >
          Approve marketplace
        </Button>
        <Button
          onClick={() =>
            handleMetaTx({
              functionName: "listItem",
              values: [tokenContractAddress, tokenId, price],
            })
          }
        >
          List item
        </Button>
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
