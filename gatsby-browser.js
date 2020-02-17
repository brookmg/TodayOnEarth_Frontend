/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react'
import { AuthProvider } from "./src/components/Contexts/AuthContext"
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './src/apollo/client';

export const wrapRootElement = ({ element }) => (
    <ApolloProvider client={client}>
        <AuthProvider>{element}</AuthProvider>
    </ApolloProvider>
)