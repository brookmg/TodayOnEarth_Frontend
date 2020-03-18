
import React from "react";
import ThemePalletteContext from "../contexts/ThemePalletteContext";
import { CardTitle } from "shards-react";


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