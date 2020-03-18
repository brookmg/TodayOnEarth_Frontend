import React from "react";
import ThemePalletteContext from "../contexts/ThemePalletteContext";
import { Button } from "shards-react";


const ButtonDark = (props) => {
    const theme = React.useContext(ThemePalletteContext)

    return (
        <Button {...props}
            style={{
                ...props.style,
                color: theme.color_background,
                backgroundColor: theme.color_text,
                borderColor: theme.color_text
            }}> {props.children} </Button>
    );
}

export default ButtonDark;