import React from "react";
import DefaultThemeDefinition from "./DefaultThemeDefinition";
import { isBrowser } from "../../utils";


const localStorageTheme = JSON.parse(!isBrowser() ? `{}` : localStorage.getItem(`theme`) || `{}`)

// This will give precedence to local storage theme over default theme
const themeToUse = { ...DefaultThemeDefinition, ...localStorageTheme }

const ThemePalletteContext = React.createContext({
    ...themeToUse,
    setTheme: () => { }
})

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = React.useState({ ...themeToUse });

    return (
        <ThemePalletteContext.Provider value={{ ...theme, setTheme }}>
            {children}
        </ThemePalletteContext.Provider>
    )
}

export default ThemePalletteContext;
