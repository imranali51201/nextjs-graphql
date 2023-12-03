import React, { ReactNode } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, ApolloLink, } from '@apollo/client';
import { API_BASE_URL } from '@src/config';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
    uri: `${API_BASE_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

// const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
//     if (graphQLErrors) {
//         for (let err of graphQLErrors) {
//             switch (err.extensions.code) {
//                 // Apollo Server sets code to UNAUTHENTICATED
//                 // when an AuthenticationError is thrown in a resolver
//                 case "UNAUTHENTICATED":
//                     // Modify the operation context with a new token
//                     const oldHeaders = operation.getContext().headers;
//                     operation.setContext({
//                         headers: {
//                             ...oldHeaders,
//                             authorization: (() => { })()// getNewToken(),
//                         },
//                     });
//                     // Retry the request, returning the new observable
//                     return forward(operation);
//             }
//         }
//     }

//     // To retry on network errors, we recommend the RetryLink
//     // instead of the onError link. This just logs the error.
//     if (networkError) {
//         console.log(`[Network error]: ${networkError}`);
//     }
// });

const link = ApolloLink.from([authLink, httpLink]);
// const link = ApolloLink.from([authLink, errorLink, httpLink]);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

type GraphqlProviderProps = {
    children: ReactNode
}
function GraphqlProvider(props: GraphqlProviderProps) {
    const { children } = props
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}

export default GraphqlProvider