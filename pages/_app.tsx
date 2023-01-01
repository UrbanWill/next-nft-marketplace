import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// hooks
import { useApollo } from "../hooks/useApollo";
import { AuthProvider } from "../contexts/useAuth/useAuth";

// components
import { Layout } from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";

const noAuthRequired = ["/", "/activeItems"];

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const { pathname } = useRouter();

  const queryClient = new QueryClient();

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={apolloClient}>
          <AuthProvider>
            <Layout>
              {noAuthRequired.includes(pathname) ? (
                <Component {...pageProps} />
              ) : (
                <ProtectedRoute>
                  <Component {...pageProps} />
                </ProtectedRoute>
              )}
            </Layout>
          </AuthProvider>
        </ApolloProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
