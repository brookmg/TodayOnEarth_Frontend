/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import React from 'react'
import { AuthProvider } from "./src/components/Contexts/AuthContext"
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from "./src/components/Contexts/ThemePalletteContext"
import { client } from './src/apollo/client';

export const wrapRootElement = ({ element }) => (
    <ApolloProvider client={client}>
        <AuthProvider>
            <ThemeProvider>
                {element}
            </ThemeProvider>
        </AuthProvider>
    </ApolloProvider>
)