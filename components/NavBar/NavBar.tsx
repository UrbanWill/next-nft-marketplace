import { FC } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";

const NavBar: FC = () => {
  const handleLogin = () => {
    console.log("Clicked login");
  };
  return (
    <Flex backgroundColor="blue.400" height={"4rem"} alignItems="center" px={5}>
      <Box textColor="white" fontWeight="bold">
        Navigation Bar
      </Box>
      <Box ml="auto">
        <Button onClick={handleLogin}>Login</Button>
      </Box>
    </Flex>
  );
};

export default NavBar;
