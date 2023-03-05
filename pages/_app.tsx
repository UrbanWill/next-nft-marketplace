import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { polygon, polygonMumbai } from "@wagmi/chains";

// hooks
import { useApollo } from "../hooks/useApollo";
import { AuthProvider } from "../contexts/useAuth/useAuth";

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

  const { chains, provider, webSocketProvider } = configureChains(
    [IS_DEV_MODE ? polygonMumbai : polygon],
    [publicProvider()]
  );

  const wagmiClient = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <QueryClientProvider client={queryClient}>
        {IS_DEV_MODE && <ReactQueryDevtools initialIsOpen={false} />}
        <ChakraProvider>
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
        </ChakraProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
