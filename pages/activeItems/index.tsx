import { Box, Heading } from "@chakra-ui/react";

// hooks
import { useActiveItemsQuery } from "../../generated/theGraph";

// components
import { NFTCard } from "../../components/NFTCard";

export default function AllBooks() {
  const { data: { activeItems } = {}, loading, error } = useActiveItemsQuery();

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
        <NFTCard key={item.id} />
      ))}
    </Box>
  );
}
