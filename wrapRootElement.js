/**
 * This component is the root element wrapper for both SSR and browser renders
 */
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { AuthProvider } from "./src/contexts/AuthContext";
import { ThemeProvider } from "./src/contexts/ThemePalletteContext";
import { ScreenSizeProvider } from "./src/contexts/ScreenSizeContext";
import { client } from "./src/apollo/client";


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