import React from "react";
import DefaultThemeDefinition from "./DefaultThemeDefinition"

const ThemePalletteContext = React.createContext({
    ...DefaultThemeDefinition,
    setTheme: () => { }
})

export const ThemeProvider = (props) => {
    const [theme, setTheme] = React.useState({ ...DefaultThemeDefinition });

    return (
        <ThemePalletteContext.Provider value={{ ...theme, setTheme }}>
            {props.children}
        </ThemePalletteContext.Provider>
    )
}

export default ThemePalletteContext;
