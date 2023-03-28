import { Box } from "@chakra-ui/react";

// graphql
import { initializeApollo } from "../../hooks/useApollo/useApollo";
import { ActiveItemsDocument, ActiveItem } from "../../generated/theGraph";

// components
import { NFTCard } from "../../components/NFTCard";

// constants
import { DEAD_ADDRESS } from "../../utils/constants";

export default function ActiveItems({
  activeItems,
}: {
  activeItems: ActiveItem[];
}) {
  return (
    <Box>
      <Box>All Items</Box>
      {activeItems?.map((item) => (
        <NFTCard key={item.id} activeItem={item} />
      ))}
    </Box>
  );
}

export async function getServerSideProps() {
  const client = initializeApollo();

  const { data: { activeItems } = {} } = await client.query({
    query: ActiveItemsDocument,
    variables: {
      buyer_not: DEAD_ADDRESS,
    },
  });

  return {
    props: {
      activeItems,
    },
  };
}
