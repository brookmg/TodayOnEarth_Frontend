
import React from 'react';
import { CardTitle } from "shards-react";
import ThemePalletteContext from "../Contexts/ThemePalletteContext"


const ThemedCardTitle = (props) => {
    const theme = React.useContext(ThemePalletteContext)

    return (
        <CardTitle {...props} style={{
            ...props.style,
            color: theme.color_text,
        }}>
            {props.children}
        </CardTitle>
    );
}

export default ThemedCardTitle;