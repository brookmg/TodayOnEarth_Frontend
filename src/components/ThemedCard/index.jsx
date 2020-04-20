/**
 * This component is the themed variant of the card used throughout the site
 */
import React from "react";
import ThemePalletteContext from "../../contexts/ThemePalletteContext";
import { Card } from "shards-react";


/**
 * 
 * @param {React.StyleHTMLAttributes} style This component's style 
 * @param {React.StyleHTMLAttributes} children This component's children 
 */
const ThemedCard = ({ style, children, ...rest }) => {
    const theme = React.useContext(ThemePalletteContext)

    return (
        <Card {...rest} style={{
            ...style,
            backgroundColor: theme.color_background,
            color: theme.color_text,
        }}>
            {children}
        </Card>
    );
}

export default ThemedCard;