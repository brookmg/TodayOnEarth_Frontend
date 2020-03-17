import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { AuthProvider } from "./src/components/Contexts/AuthContext";
import { ThemeProvider } from "./src/components/Contexts/ThemePalletteContext";
import { ScreenSizeProvider } from "./src/components/Contexts/ScreenSizeContext";
import { client } from './src/apollo/client';


const wrapRootElement = ({ element }) => (
    <ApolloProvider client={client}>
        <AuthProvider>
            <ThemeProvider>
                <ScreenSizeProvider>
                    {element}
                </ScreenSizeProvider>
            </ThemeProvider>
        </AuthProvider>
    </ApolloProvider>
)

export default wrapRootElement