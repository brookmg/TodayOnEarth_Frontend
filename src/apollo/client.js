import ApolloClient from 'apollo-client';
import fetch from 'isomorphic-fetch';
import ws from "ws";
import introspectionQueryResultData from './schemaQuery/fragmentTypes.json';
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { isBrowser } from '../utils/index.js';


const HTTP_LINK_URI = process.env.GATSBY_GQL_ENDPOINT
const WS_LINK_URI = process.env.GATSBY_SUBSCRIPTIONS_ENDPOINT

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

const fetchOptions = {
    credentials: `include`
}

const httpLink = new createUploadLink({
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
        return kind === `OperationDefinition` && operation === `subscription`;
    },
    wsLink,
    httpLink,
)

export const client = new ApolloClient({
    link,
    cache: new InMemoryCache({ fragmentMatcher }),
});
