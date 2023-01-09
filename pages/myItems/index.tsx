import { Box, Heading, Image } from "@chakra-ui/react";

// hooks
import { useGetNftsByWallet } from "../../hooks/queries/useGetNftsByWallet";
import { useAuth } from "../../contexts/useAuth";
import { useBiconomy } from "../../contexts/useBiconomy";

export default function MyItems() {
  const { user } = useAuth();

  const { biconomy } = useBiconomy();

  console.log({ biconomy });

  const { data: { ownedNfts } = {}, isLoading } = useGetNftsByWallet(user.id);

  if (isLoading) {
    return <Heading as="h3">Loading...</Heading>;
  }

  return (
    <Box>
      <Heading as="h3">My Items</Heading>
      {ownedNfts?.map((nft) => {
        const { title, id, metadata } = nft;
        const { image } = metadata;
        return (
          <Box
            key={`${id.tokenId}${title}`}
            py={2}
            my={2}
            border="2px solid black"
          >
            <Box>{`Title: ${title}`}</Box>
            <Image src={image} alt="NFT Image" width={300} height={300} />
          </Box>
        );
      })}
    </Box>
  );
}
