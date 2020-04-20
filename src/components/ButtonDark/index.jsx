/**
 * This component is a dark button on light theme, but a light one on dark theme
 */
import React from "react";
import ThemePalletteContext from "../../contexts/ThemePalletteContext";
import { Button } from "shards-react";


/**
 * 
 * @param {React.StyleHTMLAttributes} style This component's style
 * @param {React.ElementType} children This component's children
 */
const ButtonDark = ({ style, children, ...rest }) => {
    const theme = React.useContext(ThemePalletteContext)

    return (
        <Button {...rest}
            style={{
                ...style,
                color: theme.color_background,
                backgroundColor: theme.color_text,
                borderColor: theme.color_text
            }}> {children} </Button>
    );
}

export default ButtonDark;