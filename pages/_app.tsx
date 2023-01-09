import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// hooks
import { useApollo } from "../hooks/useApollo";

// providers
import { AuthProvider } from "../contexts/useAuth/useAuth";
import { BiconomyProvider } from "../contexts/useBiconomy/useBiconomy";

// components
import { Layout } from "../components/Layout";
import { ProtectedRoute } from "../components/ProtectedRoute";

// constants
import { IS_DEV_MODE } from "../utils/constants";

const noAuthRequired = ["/", "/activeItems"];

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const apolloClient = useApollo(pageProps.initialApolloState);
  const { pathname } = useRouter();

  // const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {IS_DEV_MODE && <ReactQueryDevtools initialIsOpen={false} />}
      <ChakraProvider>
        <ApolloProvider client={apolloClient}>
          <AuthProvider>
            <BiconomyProvider>
              <Layout>
                {noAuthRequired.includes(pathname) ? (
                  <Component {...pageProps} />
                ) : (
                  <ProtectedRoute>
                    <Component {...pageProps} />
                  </ProtectedRoute>
                )}
              </Layout>
            </BiconomyProvider>
          </AuthProvider>
        </ApolloProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
