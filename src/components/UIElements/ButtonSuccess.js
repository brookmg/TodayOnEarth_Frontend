import React from "react";
import { Button } from "shards-react";
import ThemePalletteContext from "../Contexts/ThemePalletteContext"


const ButtonSuccess = (props) => {
    const theme = React.useContext(ThemePalletteContext)

    return (
        <Button {...props}
            style={{
                ...props.style,
                color: theme.color_background,
            }} theme="success"> {props.children} </Button>
    );
}

export default ButtonSuccess;