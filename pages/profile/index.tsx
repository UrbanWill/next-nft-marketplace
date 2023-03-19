import { Box, Heading } from "@chakra-ui/react";
import { useAccount, useNetwork } from "wagmi";

export default function Profile() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  return (
    <Box>
      <Heading as="h3">Profile</Heading>
      {isConnected ? (
        <Box>
          <Box>{`Wallet: ${address}`}</Box>
          <Box>{`Chain: ${chain?.name}`}</Box>
        </Box>
      ) : (
        <Box>Connected your wallet</Box>
      )}
    </Box>
  );
}
