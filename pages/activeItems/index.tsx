import { Box, Heading } from "@chakra-ui/react";

// hooks
import { useActiveItemsQuery } from "../../generated/theGraph";

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
        <Box key={item.id} py={2} my={2} border="2px solid black">
          <Box>{`Price: ${item.price}`}</Box>
        </Box>
      ))}
    </Box>
  );
}
