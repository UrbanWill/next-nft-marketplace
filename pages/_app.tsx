import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "../contexts/useAuth/useAuth";

// hooks
import { useApollo } from "../hooks/useApollo";

// components
import { Layout } from "../components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ChakraProvider>
      <AuthProvider>
        <ApolloProvider client={apolloClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
