import { FC } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";

// hooks
import { useAuth } from "../../contexts/useAuth";

const NavBar: FC = () => {
  const { handleAuthLogin, handleAuthLogout, isAuthenticated } = useAuth();

  console.log({ isAuthenticated });

  return (
    <Flex backgroundColor="blue.400" height={"4rem"} alignItems="center" px={5}>
      <Box textColor="white" fontWeight="bold">
        Navigation Bar
      </Box>
      {isAuthenticated ? (
        <Box ml="auto">
          <Button onClick={handleAuthLogout}>Logout</Button>
        </Box>
      ) : (
        <Box ml="auto">
          <Button onClick={handleAuthLogin}>Login</Button>
        </Box>
      )}
    </Flex>
  );
};

export default NavBar;
