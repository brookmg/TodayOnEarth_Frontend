
import React from 'react';
import { Card } from "shards-react";
import ThemePalletteContext from "../Contexts/ThemePalletteContext"


const ThemedCard = (props) => {
    const theme = React.useContext(ThemePalletteContext)

    return (
        <Card {...props} style={{
            ...props.style,
            backgroundColor: theme.color_background,
            color: theme.color_text,
        }}>
            {props.children}
        </Card>
    );
}

export default ThemedCard;