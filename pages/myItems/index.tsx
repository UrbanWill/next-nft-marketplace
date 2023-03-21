import { ethers } from "ethers";
import { Box, Heading, Image, Button, Flex } from "@chakra-ui/react";

// hooks
import { useGetNftsByWallet } from "../../hooks/queries/useGetNftsByWallet";
import { useAuth } from "../../contexts/useAuth";
import useMetaTx from "../../hooks/mutations/useMetaTx/useMetaTx";

export default function MyItems() {
  const { user } = useAuth();
  const { data: { ownedNfts } = {}, isLoading } = useGetNftsByWallet(user.id);
  const { handleMetaTx } = useMetaTx();

  const price = ethers.utils.parseEther("0.1");

  if (isLoading) {
    return <Heading as="h3">Loading...</Heading>;
  }

  return (
    <Box>
      <Heading as="h3">My Items</Heading>
      {ownedNfts?.map((nft) => {
        const {
          title,
          id: { tokenId },
          metadata: { image },
          contract: { address },
        } = nft;

        return (
          <Box key={tokenId + address} p={2} my={2} border="2px solid black">
            <Box>{`Title: ${title}`}</Box>
            <Box>{`Token ID: ${tokenId}`}</Box>
            <Image src={image} alt="NFT Image" width={300} height={300} />
            <Flex gap={2}>
              <Button
                onClick={() =>
                  handleMetaTx({
                    functionName: "listItem",
                    values: [address, tokenId, price],
                  })
                }
              >
                List item
              </Button>
              <Button
                onClick={() =>
                  handleMetaTx({
                    functionName: "cancelListing",
                    values: [address, tokenId],
                  })
                }
              >
                Cancel item listing
              </Button>
            </Flex>
          </Box>
        );
      })}
    </Box>
  );
}
