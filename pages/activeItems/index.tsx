import { Box, Heading } from "@chakra-ui/react";

import { ethers } from "ethers";

// abis
import BasicNft from "../../contracts/abis/BasicNft.json";

// hooks
import { useActiveItemsQuery } from "../../generated/theGraph";

// components
import { NFTCard } from "../../components/NFTCard";

// constants
import {
  GOERLI_RPC_URL,
  BASIC_NFT_CONTRACT_ADDRESS,
} from "../../utils/constants";

export default function AllBooks() {
  const { data: { activeItems } = {}, loading, error } = useActiveItemsQuery();

  // Move this to custom hook, context or both
  const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL, 5);
  const basicNftContract = new ethers.Contract(
    BASIC_NFT_CONTRACT_ADDRESS,
    BasicNft.abi,
    provider
  );

  if (loading) {
    return <Heading as="h3">Loading...</Heading>;
  }

  if (error) {
    return <Box textColor="red">Error</Box>;
  }

  return (
    <Box>
      <Box>All Items</Box>
      {activeItems?.map((item) => (
        <NFTCard key={item.id} basicNftContract={basicNftContract} />
      ))}
    </Box>
  );
}
