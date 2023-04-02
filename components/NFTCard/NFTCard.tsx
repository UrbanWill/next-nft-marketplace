import { FC } from "react";
import { Box } from "@chakra-ui/react";
import Image from "next/image";

// hooks
import { useGetTokenById } from "../../hooks/queries/useGetTokenById";
import { useGetTokenByURI } from "../../hooks/queries/useGetTokenByURI";

// types
import { ActiveItem } from "../../generated/theGraph";
interface INFTCard {
  activeItem: ActiveItem;
}

const NFTCard: FC<INFTCard> = ({ activeItem }) => {
  const { tokenId } = activeItem;
  const { data: tokenURI, isLoading: isTokenByIdLoading } =
    useGetTokenById(tokenId);
  const { data: tokenData, isLoading: isTokenDataLoading } =
    useGetTokenByURI(tokenURI);

  const { name, image } = tokenData ?? {};

  if (isTokenByIdLoading || isTokenDataLoading) return <Box>Loading...</Box>;

  return (
    <Box border="1px solid" my="1">
      <Box>{name}</Box>
      <Box>{`TokenId: ${tokenId}`}</Box>
      <Image src={image} alt="NFT Image" width={300} height={300} />
    </Box>
  );
};

export default NFTCard;
