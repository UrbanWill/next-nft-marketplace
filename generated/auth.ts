import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  loginWithWallet: UserWithToken;
};


export type MutationLoginWithWalletArgs = {
  message: Scalars['String'];
  signedMessage: Scalars['String'];
  walletAddress: Scalars['String'];
};

export type Nonce = {
  __typename?: 'Nonce';
  nonce: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  nonceToSign: Nonce;
};


export type QueryNonceToSignArgs = {
  walletAddress: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  Master = 'MASTER',
  User = 'USER'
}

export type Token = {
  __typename?: 'Token';
  token: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  profilePicture?: Maybe<Scalars['String']>;
  role: Role;
};

export type UserWithToken = {
  __typename?: 'UserWithToken';
  token: Scalars['String'];
  user: User;
};

export type LoginWithWalletMutationVariables = Exact<{
  walletAddress: Scalars['String'];
  message: Scalars['String'];
  signedMessage: Scalars['String'];
}>;


export type LoginWithWalletMutation = { __typename?: 'Mutation', loginWithWallet: { __typename?: 'UserWithToken', token: string, user: { __typename?: 'User', id: string, email?: string | null, role: Role, profilePicture?: string | null } } };

export type GetNonceToSignQueryVariables = Exact<{
  walletAddress: Scalars['String'];
}>;


export type GetNonceToSignQuery = { __typename?: 'Query', nonceToSign: { __typename?: 'Nonce', nonce: number } };


export const LoginWithWalletDocument = gql`
    mutation LoginWithWallet($walletAddress: String!, $message: String!, $signedMessage: String!) {
  loginWithWallet(
    walletAddress: $walletAddress
    message: $message
    signedMessage: $signedMessage
  ) {
    user {
      id
      email
      role
      profilePicture
    }
    token
  }
}
    `;
export type LoginWithWalletMutationFn = Apollo.MutationFunction<LoginWithWalletMutation, LoginWithWalletMutationVariables>;

/**
 * __useLoginWithWalletMutation__
 *
 * To run a mutation, you first call `useLoginWithWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithWalletMutation, { data, loading, error }] = useLoginWithWalletMutation({
 *   variables: {
 *      walletAddress: // value for 'walletAddress'
 *      message: // value for 'message'
 *      signedMessage: // value for 'signedMessage'
 *   },
 * });
 */
export function useLoginWithWalletMutation(baseOptions?: Apollo.MutationHookOptions<LoginWithWalletMutation, LoginWithWalletMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginWithWalletMutation, LoginWithWalletMutationVariables>(LoginWithWalletDocument, options);
      }
export type LoginWithWalletMutationHookResult = ReturnType<typeof useLoginWithWalletMutation>;
export type LoginWithWalletMutationResult = Apollo.MutationResult<LoginWithWalletMutation>;
export type LoginWithWalletMutationOptions = Apollo.BaseMutationOptions<LoginWithWalletMutation, LoginWithWalletMutationVariables>;
export const GetNonceToSignDocument = gql`
    query GetNonceToSign($walletAddress: String!) {
  nonceToSign(walletAddress: $walletAddress) {
    nonce
  }
}
    `;

/**
 * __useGetNonceToSignQuery__
 *
 * To run a query within a React component, call `useGetNonceToSignQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNonceToSignQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNonceToSignQuery({
 *   variables: {
 *      walletAddress: // value for 'walletAddress'
 *   },
 * });
 */
export function useGetNonceToSignQuery(baseOptions: Apollo.QueryHookOptions<GetNonceToSignQuery, GetNonceToSignQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNonceToSignQuery, GetNonceToSignQueryVariables>(GetNonceToSignDocument, options);
      }
export function useGetNonceToSignLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNonceToSignQuery, GetNonceToSignQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNonceToSignQuery, GetNonceToSignQueryVariables>(GetNonceToSignDocument, options);
        }
export type GetNonceToSignQueryHookResult = ReturnType<typeof useGetNonceToSignQuery>;
export type GetNonceToSignLazyQueryHookResult = ReturnType<typeof useGetNonceToSignLazyQuery>;
export type GetNonceToSignQueryResult = Apollo.QueryResult<GetNonceToSignQuery, GetNonceToSignQueryVariables>;