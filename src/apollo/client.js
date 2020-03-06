import ApolloClient from 'apollo-client';
import fetch from 'isomorphic-fetch';
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './schemaQuery/fragmentTypes.json';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import ws from "ws"
import { isBrowser } from '../utils/index.js';

const HTTP_LINK_URI = `http://localhost:3400/graphql`
const WS_LINK_URI = `ws://localhost:3400/graphql`

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

const fetchOptions = {
    credentials: 'include'
}

const httpLink = new HttpLink({
    uri: HTTP_LINK_URI,
    fetch,
    fetchOptions
});

const wsForNode = isBrowser() ? null : ws

const wsLink = new WebSocketLink({
    uri: WS_LINK_URI,
    options: {
        reconnect: true
    },
    webSocketImpl: wsForNode
});

const link = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
)

export const client = new ApolloClient({
    link,
    cache: new InMemoryCache({ fragmentMatcher }),
});