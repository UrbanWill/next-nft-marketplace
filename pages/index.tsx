import { Box, Heading } from "@chakra-ui/react";

// hooks
import { useGetBooksQuery } from "../generated/graphql";
import useAuth from "../contexts/useAuth/useAuth";

export default function Home() {
  const { data: { books } = {}, loading } = useGetBooksQuery();
  const { user } = useAuth();

  console.log({ user });

  if (loading) {
    return <Heading as="h3">Loading...</Heading>;
  }

  return (
    <Box>
      {books?.map((book) => (
        <Box key={book?.id} py={2} my={2} border="2px solid black">
          <Box>{`Author: ${book?.author}`}</Box>
          <Box>{`Title: ${book?.title}`}</Box>
        </Box>
      ))}
    </Box>
  );
}
