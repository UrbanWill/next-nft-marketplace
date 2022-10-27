import { FC, ReactNode } from "react";
import { Box } from "@chakra-ui/react";

// components
import { NavBar } from "../NavBar";

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <Box>
      <NavBar />
      <Box px={5}>{children}</Box>
    </Box>
  );
};

export default Layout;
