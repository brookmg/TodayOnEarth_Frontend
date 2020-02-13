import React from "react";
import ColorPalletteDefinition from "./ColorPalletteDefinition"

const ThemePalletteContext = React.createContext({
    ...ColorPalletteDefinition,

    setBackgroundColor: () => { },
    setTextColor: () => { },
    setFadedTextColor: () => { }
})

export const ThemeProvider = (props) => {
    const [theme, setTheme] = React.useState({ ...ColorPalletteDefinition });

    return (
        <ThemePalletteContext.Provider value={{ ...theme, setTheme }}>
            {props.children}
        </ThemePalletteContext.Provider>
    )
}

export default ThemePalletteContext;
