import { Button } from "@chakra-ui/react";
// hooks
import useMetaTx from "../../hooks/mutations/useMetaTx.ts/useMetaTx";

export default function GaslessTxTest() {
  const { handleListItem } = useMetaTx();
  return <Button onClick={handleListItem}>Meta Tx test</Button>;
}
