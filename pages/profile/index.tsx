import { useEffect, useState, useCallback, useMemo } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { ethers } from "ethers";
import type { Network } from "@ethersproject/networks";

// hooks
import { useAuth } from "../../contexts/useAuth";

export default function Profile() {
  const [chain, setChain] = useState<Network>();
  const { user } = useAuth();
  const provider = useMemo(
    () => new ethers.providers.Web3Provider(window.ethereum, "any"),
    []
  );

  const getChain = useCallback(async () => {
    const currentChain = await provider.getNetwork();
    setChain(currentChain);
  }, [provider]);

  useEffect(() => {
    getChain();
  }, [getChain, provider]);

  provider.on("network", (newNetwork) => {
    setChain(newNetwork);
  });

  return (
    <Box>
      <Heading as="h3">Profile</Heading>

      <Box>{`Wallet: ${user.id}`}</Box>
      <Box>{`Chain: ${chain?.name}`}</Box>
    </Box>
  );
}
