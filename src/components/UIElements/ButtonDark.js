import React from "react";
import { Button } from "shards-react";
import ThemePalletteContext from "../Contexts/ThemePalletteContext"


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