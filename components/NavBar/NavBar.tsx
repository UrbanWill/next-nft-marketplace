import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { Box, Flex, Button, Link as ChakraLink } from "@chakra-ui/react";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

// hooks
import { useAuth } from "../../contexts/useAuth";

const NavBar: FC = () => {
  const [isClientConnected, setIsClientConnected] = useState(false);
  const { handleAuthLogin, handleAuthLogout, isAuthenticated, isLoading } =
    useAuth();

  const { isConnected } = useAccount();

  // Hydrates client UI connection state
  useEffect(() => {
    setIsClientConnected(isConnected);
  }, [isConnected]);

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  return (
    <Flex backgroundColor="blue.400" height="4rem" alignItems="center" px={5}>
      <Link href="/" passHref legacyBehavior>
        <ChakraLink
          fontWeight="bold"
          textColor="white"
          _hover={{ textDecoration: "none" }}
        >
          My app
        </ChakraLink>
      </Link>

      <Flex ml={5} gap={5} fontWeight="bold" textColor="lime">
        <Link href="/" passHref legacyBehavior>
          <ChakraLink>Home</ChakraLink>
        </Link>
        <Link href="/activeItems" passHref legacyBehavior>
          <ChakraLink>Active Items</ChakraLink>
        </Link>
        {isAuthenticated && (
          <>
            <Link href="/myItems" passHref legacyBehavior>
              <ChakraLink>My Items</ChakraLink>
            </Link>
            <Link href="/profile" passHref legacyBehavior>
              <ChakraLink>Profile</ChakraLink>
            </Link>
            <Link href="/gaslessTxTest" passHref legacyBehavior>
              <ChakraLink>Gasless Tx Test</ChakraLink>
            </Link>
          </>
        )}
      </Flex>
      {isAuthenticated && isClientConnected ? (
        <Box ml="auto">
          <Button onClick={handleAuthLogout}>Logout</Button>
        </Box>
      ) : (
        <Box ml="auto">
          {!isClientConnected ? (
            <Button onClick={() => connect()}>Connect Wallet</Button>
          ) : (
            <Button onClick={handleAuthLogin} isLoading={isLoading}>
              Login
            </Button>
          )}
        </Box>
      )}
    </Flex>
  );
};

export default NavBar;
