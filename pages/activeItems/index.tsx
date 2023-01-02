import { Box } from "@chakra-ui/react";

// graphql
import { initializeApollo } from "../../hooks/useApollo/useApollo";
import { ActiveItemsDocument, ActiveItem } from "../../generated/theGraph";

// components
import { NFTCard } from "../../components/NFTCard";

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
  });

  return {
    props: {
      activeItems,
    },
  };
}
