import { Box, Heading } from "@chakra-ui/react";

// hooks
import { useAuth } from "../contexts/useAuth";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <Box>
      {isAuthenticated ? (
        <Heading as="h3">You are logged in</Heading>
      ) : (
        <Heading as="h3">Please login</Heading>
      )}
    </Box>
  );
}
