import React from "react";
import { Button } from "shards-react";


const ButtonCustom = (props) => {
    return (
        <Button {...props}
            style={{
                ...props.style,
                color: props.color,
                backgroundColor: props.backgroundColor,
                borderColor: props.borderColor
            }}>{props.children} </Button>
    );
}

export default ButtonCustom;