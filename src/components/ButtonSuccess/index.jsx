/**
 * This component is used to indicate positive actions (accept, apply, etc.)
 */
import React from "react";
import ThemePalletteContext from "../../contexts/ThemePalletteContext";
import { Button } from "shards-react";


/**
 * 
 * @param {React.StyleHTMLAttributes} style This component's style 
 * @param {React.ElementType} children This component's children
 */
const ButtonSuccess = ({ style, children, ...rest }) => {
    const theme = React.useContext(ThemePalletteContext)

    return (
        <Button {...rest}
            style={{
                ...style,
                color: theme.color_background,
            }} theme={`success`}> {children} </Button>
    );
}

export default ButtonSuccess;