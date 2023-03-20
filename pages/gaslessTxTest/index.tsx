import { Button, Flex } from "@chakra-ui/react";

// hooks
import useMetaTx from "../../hooks/mutations/useMetaTx/useMetaTx";
import useListItem from "../../hooks/mutations/useListItem/useListItem";

export default function GaslessTxTest() {
  const { handleSetQuote } = useMetaTx();
  const { handleListItem } = useListItem();
  return (
    <Flex gap={2} py={2}>
      <Button onClick={handleSetQuote}>Meta Tx Set Quote</Button>
      <Button onClick={handleListItem}>Meta Tx List Item</Button>
    </Flex>
  );
}
