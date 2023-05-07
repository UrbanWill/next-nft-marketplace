import { FC } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { ethers } from "ethers";

// hooks
import { useGetTokenById } from "../../hooks/queries/useGetTokenById";
import { useGetTokenByURI } from "../../hooks/queries/useGetTokenByURI";
import { useMetaTx } from "../../hooks/mutations/useMetaTx";

// types
import { ActiveItem } from "../../generated/theGraph";
interface INFTCard {
  activeItem: ActiveItem;
}

const NFTCard: FC<INFTCard> = ({ activeItem }) => {
  const { address, isConnected } = useAccount();
  const { handleMetaTx } = useMetaTx();
  const { tokenId, seller, price, nftAddress } = activeItem;
  const { data: tokenURI, isLoading: isTokenByIdLoading } =
    useGetTokenById(tokenId);
  const { data: tokenData, isLoading: isTokenDataLoading } =
    useGetTokenByURI(tokenURI);

  const { name, image } = tokenData ?? {};

  const priceInEth = ethers.utils.parseEther(price);

  // console.log({ activeItem });
  console.log({ priceInEth });
  console.log({ price });

  const isSeller =
    address?.toLowerCase() === seller.toLowerCase() && isConnected;

  if (isTokenByIdLoading || isTokenDataLoading) return <Box>Loading...</Box>;

  return (
    <Box border="2px solid black" p={2} my={2}>
      <Box>{name}</Box>
      <Box>{`TokenId: ${tokenId}`}</Box>
      <Image src={image} alt="NFT Image" width={300} height={300} />
      <Flex gap={2}>
        <Button
          onClick={() =>
            handleMetaTx({
              functionName: "buyItem",
              values: [nftAddress, tokenId],
            })
          }
          disabled={isSeller}
        >
          Buy Item
        </Button>
      </Flex>
    </Box>
  );
};

export default NFTCard;
