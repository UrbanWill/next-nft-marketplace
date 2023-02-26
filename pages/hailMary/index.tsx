import useHailMaryList from "./useHailMaryList";
import { Button } from "@chakra-ui/react";

export default function HailMary() {
  const { handleListItem } = useHailMaryList();
  return <Button onClick={handleListItem}>Hail Mary</Button>;
}
