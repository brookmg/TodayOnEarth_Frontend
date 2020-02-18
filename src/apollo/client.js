import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './schemaQuery/fragmentTypes.json';
import { getToken } from '../services/auth.js';

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

export const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    fetch,
    cache: new InMemoryCache({ fragmentMatcher }),
    request: (operation) => {
        const token = getToken()
        if (token && token.length > 0) {
            operation.setContext({
                headers: {
                    Authorization: token
                }
            })
        }

    }
});