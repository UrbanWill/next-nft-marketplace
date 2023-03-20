import { Button, Flex } from "@chakra-ui/react";
import { ethers } from "ethers";

// hooks
import useMetaTx from "../../hooks/mutations/useMetaTx/useMetaTx";

// abis
import BasicNft from "../../contracts/abis/BasicNft.json";

const tokenId = 16;
const price = ethers.utils.parseEther("0.1");

// Temporary page to test gasless transactions
export default function GaslessTxTest() {
  const { handleMetaTx } = useMetaTx();

  return (
    <Flex gap={2} py={2}>
      <Button
        onClick={() =>
          handleMetaTx({
            functionName: "listItem",
            values: [BasicNft.contract.address, tokenId, price],
          })
        }
      >
        Meta Tx listItem
      </Button>
    </Flex>
  );
}
