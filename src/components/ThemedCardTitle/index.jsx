
/**
 * This component is the themed variant of the card title used throughout the site
 */
import React from "react";
import ThemePalletteContext from "../../contexts/ThemePalletteContext";
import { CardTitle } from "shards-react";


/**
 * 
 * @param {React.StyleHTMLAttributes} style This component's style 
 * @param {React.ElementType} children  This component's children
 */
const ThemedCardTitle = ({ style, children, ...rest }) => {
    const theme = React.useContext(ThemePalletteContext)

    return (
        <CardTitle {...rest} style={{
            ...style,
            color: theme.color_text,
        }}>
            {children}
        </CardTitle>
    );
}

export default ThemedCardTitle;