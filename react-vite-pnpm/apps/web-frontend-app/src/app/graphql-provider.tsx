import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { FC, ReactNode } from 'react';

export const client = new ApolloClient({
  uri: 'https://flyby-gateway.herokuapp.com/',
  cache: new InMemoryCache(),
});

export const GraphQLProvider: FC<{ children: ReactNode }> = ({
    children
}) => {
    return (
        <ApolloProvider client={client}>
            { children }
        </ApolloProvider>
    )
}
