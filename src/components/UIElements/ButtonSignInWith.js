import React from "react";
import ButtonCustom from "./ButtonCustom";
import Margin from "../CompoundComponents/Margin";


const ButtonSignInWith = (props) => {
    return (<a
        {...props}
        style={{ ...props.style, display: 'inline-block' }}
        href={props.url}>
        <ButtonCustom borderColor={props.borderColor} backgroundColor={props.backgroundColor} color={props.color}>
            <Margin vertical="0" horizontal="0.25em">
                <img style={{
                    width: "16px",
                    height: "16px",
                    margin: 0
                }} src={props.imgSrc} />
                <span>
                    {props.value}
                </span>
            </Margin>
        </ButtonCustom>
    </a>);
};
export default ButtonSignInWith;