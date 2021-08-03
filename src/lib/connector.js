import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { useMemo } from "react";

import {
  APOLLO_STATE_PROP_NAME,
  initializeApollo,
} from "@/jikopoint/lib/apolloConfig";

// Define env vars.
export const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API;

let strapiApolloClient;

/**
 * Create a basic Apollo client for connecting to WP.
 *
 * @see https://www.apollographql.com/docs/react/api/core/ApolloClient/
 * @param  {boolean} auth Whether to include authentication via WP application password.
 * @return {object}       Apollo client instance.
 */
export function createStrapiApolloClient() {
  return new ApolloClient({
    ssrMode: false,
    link: new HttpLink({
      uri: `${strapiUrl}/graphql`,
      credentials: "",
    }),
    cache: new InMemoryCache(),
    onError: (e) => {
      console.log("graphQLErrors", e);
    },
  });
}

/**
 * Init Apollo for WP and merge with initial state.
 *
 * @param  {*}      initialState Initial Apollo state.
 * @return {object}              WP Apollo client instance.
 */
export function initializeStrapiApollo(initialState = null) {
  // Only run one instance of the Apollo client.
  const singletonApolloClient =
    strapiApolloClient ?? createStrapiApolloClient();

  const newApolloClient = initializeApollo(singletonApolloClient, initialState);

  // For SSG and SSR always create a new Apollo Client.
  if (typeof window === "undefined") return newApolloClient;

  // Create the Apollo Client once in the client.
  if (!strapiApolloClient) strapiApolloClient = newApolloClient;

  return newApolloClient;
}

/**
 * Only update when the cache value has changed.
 *
 * @param  {object} pageProps Props from getStaticProps().
 * @return {object}           WP Apollo client instance.
 */
export function useStrapiApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeStrapiApollo(state), [state]);
  return store;
}
