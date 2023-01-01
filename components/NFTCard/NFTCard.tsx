import { FC, useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { ethers } from "ethers";
import Image from "next/image";

// constants
import { IPFS_URL } from "../../utils/constants";

interface INFTCard {
  basicNftContract: ethers.Contract;
}

const NFTCard: FC<INFTCard> = ({ basicNftContract }) => {
  const [name, setName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const getTokenUri = async () => {
    const tokenURI = await basicNftContract.tokenURI(1);
    const requestURL = tokenURI.replace("ipfs://", IPFS_URL);
    const tokenURIResponse = await (await fetch(requestURL)).json();
    const imageURI = tokenURIResponse.image;
    const imageURIURL = imageURI.replace("ipfs://", IPFS_URL);
    setImageUrl(imageURIURL);
    setName(tokenURIResponse.name);
  };

  useEffect(() => {
    getTokenUri();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!name) return <Box>Loading...</Box>;

  return (
    <Box border="1px solid" my="1">
      <Box>{name}</Box>
      <Image src={imageUrl} alt="NFT Image" width={300} height={300} />
    </Box>
  );
};

export default NFTCard;
