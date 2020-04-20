/**
 * This component is a button that can be easily customized
 */
import React from "react";
import { Button } from "shards-react";


/**
 * 
 * @param {React.StyleHTMLAttributes} style This component's style
 * @param {string} color Text color to use for this component
 * @param {string} backgroundColor Background color to use for this component
 * @param {string} borderColor Border color to use for this component
 * @param {React.ElementType} children This component's children
 */
const ButtonCustom = ({ style, color, backgroundColor, borderColor, children, ...rest }) => {
    return (
        <Button {...rest}
            style={{
                ...style,
                color: color,
                backgroundColor: backgroundColor,
                borderColor: borderColor
            }}>{children} </Button>
    );
}

export default ButtonCustom;