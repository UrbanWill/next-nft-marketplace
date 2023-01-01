import { useMemo } from "react";

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  from,
  NormalizedCacheObject,
} from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import type { AppProps } from "next/app";

import merge from "deepmerge";

import { AUTH_URI, THE_GRAPH_URI } from "../../utils/constants";

const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";
const AUTH_OPERATIONS = ["GetNonceToSign", "LoginWithWallet", "getBooks"];

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
  uri: AUTH_URI, // Server URL (must be absolute)
  credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
});

const httpTheGraphLink = new HttpLink({
  uri: THE_GRAPH_URI,
  credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

/** TODO: This would be better handled on BE through supergraph federation */
const directionalLink = new RetryLink().split(
  ({ operationName }) => {
    return AUTH_OPERATIONS.includes(operationName);
  },
  authLink.concat(from([errorLink, httpLink])),
  httpTheGraphLink.concat(from([errorLink, httpTheGraphLink]))
);

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: directionalLink,
    cache: new InMemoryCache(),
  });
}

type InitialState = NormalizedCacheObject | undefined;

interface IInitializeApollo {
  initialState?: InitialState | null;
}

export function initializeApollo(initialState: IInitializeApollo) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") {
    return _apolloClient;
  }
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps["pageProps"]
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(initialState: AppProps["pageProps"]) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
