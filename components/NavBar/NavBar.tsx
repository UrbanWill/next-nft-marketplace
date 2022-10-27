import { FC } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";

// hooks
import { useGetNonceToSignLazyQuery } from "../../generated/graphql";

const NavBar: FC = () => {
  const [getNonceToSign] = useGetNonceToSignLazyQuery();

  const handleLogin = () => {
    getNonceToSign({ variables: { walletAddress: "0x123" } }).then((res) => {
      const { data: { nonceToSign = "" } = {} } = res;
      console.log("nonceToSign", nonceToSign);
    });
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
