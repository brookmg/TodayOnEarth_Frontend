import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './schemaQuery/fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

export const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    fetch,
    cache: new InMemoryCache({ fragmentMatcher }),
    request: async operation => {
        operation.setContext({
            fetchOptions: {
                credentials: 'include'
            }
        })
    }
});