import { Box, Heading } from "@chakra-ui/react";

// hooks
import { useGetNftsByWallet } from "../../hooks/queries/useGetNftsByWallet";
import { useAuth } from "../../contexts/useAuth";
import { useMetaTx } from "../../hooks/mutations/useMetaTx";

// components
import { MyNFTCard } from "../../components/MyNFTCard";

export default function MyItems() {
  const { user } = useAuth();

  const { data: { ownedNfts = [] } = {}, isLoading } = useGetNftsByWallet(
    user.id
  );
  const { handleMetaTx } = useMetaTx();

  if (isLoading) {
    return <Heading as="h3">Loading...</Heading>;
  }

  return (
    <Box>
      <Heading as="h3">My Items</Heading>
      {ownedNfts.map((nft) => {
        const {
          id: { tokenId },

          contract: { address },
        } = nft;

        return (
          <MyNFTCard
            nft={nft}
            key={tokenId + address}
            handleMetaTx={handleMetaTx}
          />
        );
      })}
    </Box>
  );
}
