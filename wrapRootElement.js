import React from 'react'
import { AuthProvider } from "./src/components/Contexts/AuthContext"
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from "./src/components/Contexts/ThemePalletteContext"
import { client } from './src/apollo/client';

const wrapRootElement = ({ element }) => (
    <ApolloProvider client={client}>
        <AuthProvider>
            <ThemeProvider>
                {element}
            </ThemeProvider>
        </AuthProvider>
    </ApolloProvider>
)

export default wrapRootElement