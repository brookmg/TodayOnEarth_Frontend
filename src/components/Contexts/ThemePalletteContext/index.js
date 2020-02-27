import React from "react";
import DefaultThemeDefinition from "./DefaultThemeDefinition"

const localStorageTheme = JSON.parse(localStorage.getItem("theme") || "{}")

// This will give precedence to local storage theme over default theme
const themeToUse = { ...ColorPalletteDefinition, ...localStorageTheme }

const ThemePalletteContext = React.createContext({
    ...themeToUse,
    setTheme: () => { }
})

export const ThemeProvider = (props) => {
    const [theme, setTheme] = React.useState({ ...themeToUse });

    return (
        <ThemePalletteContext.Provider value={{ ...theme, setTheme }}>
            {props.children}
        </ThemePalletteContext.Provider>
    )
}

export default ThemePalletteContext;
